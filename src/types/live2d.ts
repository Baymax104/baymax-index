export type Live2DChatRole = 'assistant' | 'user'
export type Live2DChatMessageStatus = 'done' | 'thinking' | 'typing'

export interface Live2DChatMessage {
  id: string
  role: Live2DChatRole
  content: string
  status?: Live2DChatMessageStatus
}
