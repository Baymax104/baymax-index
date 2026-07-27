import type { Live2DChatRole } from '@/types/live2d'

export const live2dWidgetConfig = {
  desktopMediaQuery: '(min-width: 1024px)',
  modelPath: '/live2d/mao/Mao.model3.json',
  coreScriptPath: '/vendor/live2d/live2dcubismcore.min.js',
  defaultMessages: [
    {
      role: 'assistant' satisfies Live2DChatRole,
      content: '你好，我在这里。',
    },
  ],
  mockReplies: [
    '我先记录下来。这个功能目前使用 mock 回复，后续可以替换为真实模型接口。',
    '收到。我会按当前对话上下文给出简短回应，等 API 接入后这里会承载真实回复。',
    '好的。现在先验证思考状态和打字机效果，交互链路稳定后再接入大模型。',
  ],
  replyFlow: {
    thinkingDelayMs: 700,
    typingIntervalMs: 32,
  },
  canvas: {
    width: 220,
    height: 360,
  },
  chatPanel: {
    width: 320,
    height: 360,
    offsetRight: 178,
    offsetBottom: 232,
  },
  model: {
    scale: 0.055,
    x: 110,
    y: 356,
    anchorX: 0.5,
    anchorY: 1,
  },
} as const
