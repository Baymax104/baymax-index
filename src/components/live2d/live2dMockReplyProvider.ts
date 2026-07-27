import { live2dWidgetConfig } from '@/config/live2d'
import type { Live2DChatMessage } from '@/types/live2d'

export function getLive2DMockReply(messages: Live2DChatMessage[]) {
  const userMessageCount = messages.filter((message) => message.role === 'user').length
  const replies = live2dWidgetConfig.mockReplies
  const replyIndex = Math.max(userMessageCount - 1, 0) % replies.length

  return replies[replyIndex]
}
