## Why

当前 Live2D 人物只承担展示作用，用户点击后没有反馈或承载轻量交流的界面。新增点击展开的对话框，可以让右下角人物从装饰元素升级为可交互入口，同时保持初版范围可控。

该变更需要在不破坏现有桌面端按需加载和移动端不加载策略的前提下，补齐聊天面板的展示、输入和展开/收起动画。

## What Changes

- 点击 Live2D 人物时，在人物左上角展开圆角矩形对话框。
- 再次点击 Live2D 人物时，收起对话框。
- 对话框展开和收起时提供轻量动画，使用 opacity、translate 和 scale 的 CSS transition。
- 对话框包含消息列表和输入框。
- 输入内容提交后追加到本地消息列表；初版不接入远程 AI/API。
- 对话框和人物点击区域支持交互，但悬浮层其他透明区域不得阻挡页面操作。
- 移动端继续不显示 Live2D 人物，也不显示或加载对话框相关交互。

## Capabilities

### New Capabilities

- `live2d-chat-panel`: 覆盖 Live2D 人物点击展开/收起聊天面板、面板位置、动画、消息列表、输入框和交互边界。

### Modified Capabilities

- 无。

## Impact

- 影响 `src/components/live2d/Live2DWidget.tsx` 的状态管理、点击命中区域和渲染结构。
- 可能新增 `src/components/live2d/Live2DChatPanel.tsx` 或等效子组件。
- 可能扩展 `src/config/live2d.ts`，增加对话框尺寸、位置、动画和默认消息配置。
- 不新增后端 API、环境变量或外部服务依赖。
