import { SendHorizontal } from 'lucide-react'
import { useEffect, useRef, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { live2dWidgetConfig } from '@/config/live2d'
import { cn } from '@/lib/utils'
import type { Live2DChatMessage } from '@/types/live2d'

interface Live2DChatPanelProps {
  draft: string
  isReplying: boolean
  isOpen: boolean
  messages: Live2DChatMessage[]
  onDraftChange: (value: string) => void
  onSubmit: () => void
}

export function Live2DChatPanel({
  draft,
  isReplying,
  isOpen,
  messages,
  onDraftChange,
  onSubmit,
}: Live2DChatPanelProps) {
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const lastAutoScrolledReplyIdRef = useRef<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isReplying) {
      return
    }
    onSubmit()
  }

  useEffect(() => {
    const lastMessage = messages.at(-1)

    if (
      !lastMessage ||
      lastMessage.role !== 'assistant' ||
      lastMessage.status !== 'typing' ||
      !lastMessage.content ||
      lastAutoScrolledReplyIdRef.current === lastMessage.id
    ) {
      return
    }

    lastAutoScrolledReplyIdRef.current = lastMessage.id
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <section
      data-live2d-chat-panel
      aria-label="Live2D 对话"
      aria-hidden={!isOpen}
      className={cn(
        'pointer-events-none absolute origin-bottom-right transform-gpu rounded-xl border border-white/80 bg-white/96 p-3 text-sm text-slate-800 opacity-0 shadow-lg shadow-slate-900/12 ring-1 ring-slate-900/5 transition-[opacity,transform] duration-180 ease-out will-change-[opacity,transform] contain-paint [backface-visibility:hidden]',
        isOpen ? 'pointer-events-auto opacity-100' : 'opacity-0',
      )}
      style={{
        right: live2dWidgetConfig.chatPanel.offsetRight,
        bottom: live2dWidgetConfig.chatPanel.offsetBottom,
        width: live2dWidgetConfig.chatPanel.width,
        height: live2dWidgetConfig.chatPanel.height,
        transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(12px, 16px, 0)',
      }}
    >
      <div className="flex h-full flex-col gap-3">
        <div
          ref={messagesRef}
          className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1"
          data-live2d-chat-messages
        >
          {messages.map((message) => {
            const isThinking = message.status === 'thinking'
            const isTyping = message.status === 'typing'

            return (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <p
                className={cn(
                  'max-w-[78%] rounded-xl px-3 py-2 leading-relaxed shadow-sm',
                  message.role === 'user'
                    ? 'rounded-br-sm bg-slate-900 text-white'
                    : 'rounded-bl-sm bg-slate-100 text-slate-700',
                )}
              >
                {isThinking ? (
                  <span
                    data-live2d-chat-thinking
                    className="inline-flex items-center gap-1 text-slate-500"
                  >
                    <span>思考中</span>
                    <span className="flex gap-0.5" aria-hidden="true">
                      <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400" />
                    </span>
                  </span>
                ) : (
                  <>
                    {message.content}
                    {isTyping ? (
                      <span
                        data-live2d-chat-typing
                        className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-slate-400"
                        aria-hidden="true"
                      />
                    ) : null}
                  </>
                )}
              </p>
            </div>
            )
          })}
        </div>
        <form className="flex items-center gap-2 border-t border-slate-200/80 pt-3" onSubmit={handleSubmit}>
          <input
            data-live2d-chat-input
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            className="h-9 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-3 focus:ring-slate-200"
            placeholder="输入消息..."
            autoComplete="off"
            disabled={isReplying}
          />
          <Button
            data-live2d-chat-submit
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-lg bg-slate-900 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="发送消息"
            disabled={isReplying}
          >
            <SendHorizontal className="size-4" />
          </Button>
        </form>
      </div>
    </section>
  )
}
