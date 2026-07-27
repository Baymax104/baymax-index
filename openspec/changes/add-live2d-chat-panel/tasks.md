## 1. 配置与类型

- [x] 1.1 扩展 Live2D 配置，加入聊天面板尺寸、左上角定位、动画参数和默认消息
- [x] 1.2 定义聊天消息类型，区分 assistant 和 user 消息

## 2. 对话框组件

- [x] 2.1 新增 `Live2DChatPanel` 组件，渲染圆角矩形面板、消息列表和输入框
- [x] 2.2 实现非空文本提交、追加用户消息和清空输入框
- [x] 2.3 固定面板高度并让消息列表内部滚动，避免消息增多导致布局跳动
- [x] 2.4 为展开和收起状态添加 opacity、translate、scale 动画

## 3. Live2D 组件集成

- [x] 3.1 在 `Live2DWidget` 中管理 `isChatOpen` 和本地消息列表状态
- [x] 3.2 调整人物点击区域，使点击人物可展开或收起面板
- [x] 3.3 保持悬浮层透明区域 `pointer-events-none`，仅人物点击区域和面板 `pointer-events-auto`
- [x] 3.4 将对话框定位到人物左上角，并保持不参与页面文档流

## 4. 行为验证

- [x] 4.1 使用 Playwright CLI 验证桌面端点击人物可展开对话框
- [x] 4.2 使用 Playwright CLI 验证再次点击人物可收起对话框
- [x] 4.3 使用 Playwright CLI 验证输入非空文本后消息追加且输入框清空
- [x] 4.4 使用 Playwright CLI 验证移动端不显示对话框且不加载 Live2D 资源

## 5. 工程验证

- [x] 5.1 运行 `npm run lint`
- [x] 5.2 运行 `npm run build`
- [x] 5.3 复核 OpenSpec 任务状态
