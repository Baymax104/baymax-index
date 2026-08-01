import type { Live2DChatMessage } from '@/types/live2d'
import { live2dPersonaSystemPrompt } from '@/config/persona'

const LLM_CHAT_ENDPOINT = import.meta.env.DEV
  ? 'https://baymax-index-api.vercel.app/api/llm/chat'
  : '/api/llm/chat'

type LlmChatRole = 'system' | 'user' | 'assistant'

interface LlmChatMessage {
  role: LlmChatRole
  content: string
}

export type LlmChatStreamEvent =
  | {
      type: 'delta'
      content: string
    }
  | {
      type: 'done'
    }
  | {
      type: 'error'
      message: string
    }

export class LlmChatError extends Error {
  constructor(message = 'LLM chat request failed.') {
    super(message)
    this.name = 'LlmChatError'
  }
}

function toLlmMessages(messages: Live2DChatMessage[]): LlmChatMessage[] {
  const visibleMessages = messages
    .filter((message) => message.content.trim().length > 0)
    .map((message) => ({
      role: message.role,
      content: message.content,
    }))

  return [
    {
      role: 'system',
      content: live2dPersonaSystemPrompt,
    },
    ...visibleMessages,
  ]
}

function parseSseEvent(rawEvent: string): LlmChatStreamEvent | null {
  const lines = rawEvent.split(/\r?\n/)
  let eventName = 'message'
  const dataLines: string[] = []

  for (const line of lines) {
    if (line.startsWith('event:')) {
      eventName = line.slice('event:'.length).trim()
      continue
    }

    if (line.startsWith('data:')) {
      dataLines.push(line.slice('data:'.length).trim())
    }
  }

  if (!dataLines.length) {
    return null
  }

  let payload: unknown

  try {
    payload = JSON.parse(dataLines.join('\n'))
  } catch {
    throw new LlmChatError('LLM stream response is invalid.')
  }

  if (eventName === 'delta' && typeof payload === 'object' && payload !== null) {
    const content = (payload as { content?: unknown }).content
    return typeof content === 'string' && content.length > 0 ? { type: 'delta', content } : null
  }

  if (eventName === 'done') {
    return { type: 'done' }
  }

  if (eventName === 'error') {
    const message =
      typeof payload === 'object' && payload !== null && typeof (payload as { message?: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : 'LLM stream failed.'

    return { type: 'error', message }
  }

  return null
}

async function* parseSseStream(body: ReadableStream<Uint8Array>): AsyncGenerator<LlmChatStreamEvent> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const rawEvents = buffer.split(/\r?\n\r?\n/)
      buffer = rawEvents.pop() ?? ''

      for (const rawEvent of rawEvents) {
        const event = parseSseEvent(rawEvent)

        if (event) {
          yield event
        }
      }
    }

    buffer += decoder.decode()

    if (buffer.trim()) {
      const event = parseSseEvent(buffer)

      if (event) {
        yield event
      }
    }
  } finally {
    reader.releaseLock()
  }
}

export async function* streamLive2DChat(
  messages: Live2DChatMessage[],
  options: { signal?: AbortSignal } = {},
): AsyncGenerator<LlmChatStreamEvent> {
  let response: Response

  try {
    response = await fetch(LLM_CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: toLlmMessages(messages),
      }),
      signal: options.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }

    throw new LlmChatError()
  }

  if (!response.ok) {
    throw new LlmChatError(`LLM chat request failed with status ${response.status}.`)
  }

  if (!response.body) {
    throw new LlmChatError('LLM chat response stream is unavailable.')
  }

  yield* parseSseStream(response.body)
}
