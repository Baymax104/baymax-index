import { useCallback, useEffect, useRef, useState } from 'react'
import { Live2DChatPanel } from '@/components/live2d/Live2DChatPanel'
import { live2dWidgetConfig } from '@/config/live2d'
import { streamLive2DChat } from '@/services/llmChat'
import type { Live2DChatMessage } from '@/types/live2d'

declare global {
  interface Window {
    Live2DCubismCore?: unknown
    PIXI?: typeof import('pixi.js')
  }
}

let cubismCorePromise: Promise<void> | null = null
let messageIdCounter = 0
const EMPTY_REPLY_MESSAGE = '我暂时没有生成有效回复。'
const REPLY_ERROR_MESSAGE = '回复暂时不可用，请稍后再试。'

function createMessageId() {
  messageIdCounter += 1
  return `live2d-message-${Date.now()}-${messageIdCounter}`
}

function createInitialMessages(): Live2DChatMessage[] {
  return live2dWidgetConfig.defaultMessages.map((message, index) => ({
    id: `live2d-default-message-${index}`,
    role: message.role,
    content: message.content,
    status: 'done',
  }))
}

function loadCubismCore(src: string) {
  if (window.Live2DCubismCore) {
    return Promise.resolve()
  }

  if (cubismCorePromise) {
    return cubismCorePromise
  }

  cubismCorePromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Live2D Cubism Core 加载失败')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Live2D Cubism Core 加载失败'))
    document.head.appendChild(script)
  })

  return cubismCorePromise
}

export function Live2DWidget() {
  const canvasHostRef = useRef<HTMLDivElement | null>(null)
  const activeReplyControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)
  const [draft, setDraft] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [messages, setMessages] = useState<Live2DChatMessage[]>(() => createInitialMessages())

  const toggleChatPanel = useCallback(() => {
    setIsChatOpen((current) => !current)
  }, [])

  const updateAssistantMessage = useCallback(
    (messageId: string, patch: Partial<Pick<Live2DChatMessage, 'content' | 'status'>>) => {
      setMessages((current) =>
        current.map((message) => (message.id === messageId ? { ...message, ...patch } : message)),
      )
    },
    [],
  )

  const appendAssistantContent = useCallback((messageId: string, content: string) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? {
              ...message,
              content: `${message.content}${content}`,
              status: 'typing',
            }
          : message,
      ),
    )
  }, [])

  const releaseReplyLock = useCallback(() => {
    if (isMountedRef.current) {
      setIsReplying(false)
    }
  }, [])

  const startLlmReply = useCallback(
    async (assistantMessageId: string, nextMessages: Live2DChatMessage[]) => {
      activeReplyControllerRef.current?.abort()

      const controller = new AbortController()
      activeReplyControllerRef.current = controller
      let hasContent = false

      try {
        for await (const event of streamLive2DChat(nextMessages, { signal: controller.signal })) {
          if (!isMountedRef.current || controller.signal.aborted) {
            return
          }

          if (event.type === 'delta') {
            hasContent = true
            appendAssistantContent(assistantMessageId, event.content)
            continue
          }

          if (event.type === 'error') {
            updateAssistantMessage(assistantMessageId, {
              content: REPLY_ERROR_MESSAGE,
              status: 'done',
            })
            return
          }

          updateAssistantMessage(
            assistantMessageId,
            hasContent
              ? {
                  status: 'done',
                }
              : {
                  content: EMPTY_REPLY_MESSAGE,
                  status: 'done',
                },
          )
          return
        }

        if (isMountedRef.current && !controller.signal.aborted) {
          updateAssistantMessage(
            assistantMessageId,
            hasContent
              ? {
                  status: 'done',
                }
              : {
                  content: EMPTY_REPLY_MESSAGE,
                  status: 'done',
                },
          )
        }
      } catch {
        if (controller.signal.aborted) {
          return
        }

        updateAssistantMessage(assistantMessageId, {
          content: REPLY_ERROR_MESSAGE,
          status: 'done',
        })
      } finally {
        if (activeReplyControllerRef.current === controller) {
          activeReplyControllerRef.current = null
        }

        releaseReplyLock()
      }
    },
    [appendAssistantContent, releaseReplyLock, updateAssistantMessage],
  )

  const submitMessage = useCallback(() => {
    const content = draft.trim()

    if (!content || isReplying) {
      return
    }

    const userMessage: Live2DChatMessage = {
      id: createMessageId(),
      role: 'user',
      content,
      status: 'done',
    }
    const assistantMessage: Live2DChatMessage = {
      id: createMessageId(),
      role: 'assistant',
      content: '',
      status: 'thinking',
    }
    const nextMessages = [...messages, userMessage, assistantMessage]

    setMessages(nextMessages)
    setDraft('')
    setIsReplying(true)
    void startLlmReply(assistantMessage.id, nextMessages)
  }, [draft, isReplying, messages, startLlmReply])

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      activeReplyControllerRef.current?.abort()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(live2dWidgetConfig.desktopMediaQuery)
    let application: import('pixi.js').Application | null = null
    let isDisposed = false
    let isLoading = false

    const cleanupLive2D = () => {
      application?.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true,
      })
      application = null
      canvasHostRef.current?.replaceChildren()
    }

    const mountLive2D = async () => {
      if (isDisposed || isLoading || application || !mediaQuery.matches || !canvasHostRef.current) {
        return
      }

      isLoading = true

      try {
        await loadCubismCore(live2dWidgetConfig.coreScriptPath)

        if (isDisposed || !mediaQuery.matches || !canvasHostRef.current) {
          return
        }

        const [PIXI, { Live2DModel }] = await Promise.all([
          import('pixi.js'),
          import('pixi-live2d-display/cubism4'),
        ])

        if (isDisposed || !mediaQuery.matches || !canvasHostRef.current) {
          return
        }

        window.PIXI = PIXI

        const nextApplication = new PIXI.Application({
          width: live2dWidgetConfig.canvas.width,
          height: live2dWidgetConfig.canvas.height,
          backgroundAlpha: 0,
          antialias: true,
          autoDensity: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
        })

        const canvas = nextApplication.view as HTMLCanvasElement
        canvas.setAttribute('aria-hidden', 'true')
        canvas.style.display = 'block'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvasHostRef.current.replaceChildren(canvas)
        application = nextApplication

        const model = await Live2DModel.from(live2dWidgetConfig.modelPath, {
          autoInteract: false,
        })

        if (isDisposed || !mediaQuery.matches || !application) {
          model.destroy()
          return
        }

        model.anchor.set(live2dWidgetConfig.model.anchorX, live2dWidgetConfig.model.anchorY)
        model.scale.set(live2dWidgetConfig.model.scale)
        model.position.set(live2dWidgetConfig.model.x, live2dWidgetConfig.model.y)
        model.interactive = false

        application.stage.addChild(model)
      } catch (error) {
        cleanupLive2D()
        console.warn('Live2D 初始化失败', error)
      } finally {
        isLoading = false
      }
    }

    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        void mountLive2D()
        return
      }

      cleanupLive2D()
    }

    handleMediaChange()
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      isDisposed = true
      mediaQuery.removeEventListener('change', handleMediaChange)
      cleanupLive2D()
    }
  }, [])

  return (
    <div
      data-live2d-widget
      className="pointer-events-none fixed right-2 bottom-0 z-50 hidden select-none lg:block xl:right-4"
      style={{
        width: live2dWidgetConfig.canvas.width,
        height: live2dWidgetConfig.canvas.height,
      }}
    >
      <Live2DChatPanel
        draft={draft}
        isReplying={isReplying}
        isOpen={isChatOpen}
        messages={messages}
        onDraftChange={setDraft}
        onSubmit={submitMessage}
      />
      <button
        data-live2d-character-button
        type="button"
        aria-label={isChatOpen ? '收起 Live2D 对话框' : '展开 Live2D 对话框'}
        aria-pressed={isChatOpen}
        className="pointer-events-auto h-full w-full cursor-pointer bg-transparent p-0 text-left outline-none focus-visible:ring-3 focus-visible:ring-slate-300/80"
        onClick={toggleChatPanel}
      >
        <span ref={canvasHostRef} className="block h-full w-full" aria-hidden="true" />
      </button>
    </div>
  )
}
