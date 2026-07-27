## Context

当前项目是 Vite + React + Tailwind 的纯前端首页。页面结构集中在 `App.tsx`，主要内容由 Hero、About、GitHub、留言板和 Footer 组成。

Live2D 人物属于悬浮视觉增强能力，不应改变现有内容区布局，也不应影响移动端性能。由于 Live2D runtime 和模型资源体积较大，桌面端展示必须同时控制“可见性”和“加载时机”。

## Goals / Non-Goals

**Goals:**

- 在桌面端右下角展示 Live2D 人物。
- 移动端不显示且不加载 Live2D runtime、模型和贴图资源。
- 模型资源本地托管，且后续替换模型只需要调整配置和资源路径。
- 初版仅保留待机动作，确保页面主要交互不被遮挡。
- 初始化和销毁逻辑完整，避免热更新、路由切换或断点变化时残留 canvas/WebGL context。

**Non-Goals:**

- 不实现气泡对话、点击动作、换装、菜单、拖拽或隐藏按钮。
- 不接入远程模型 CDN 作为生产依赖。
- 不在本次变更中新增后端 API。
- 不为移动端提供降级 Live2D 展示。

## Decisions

### 使用独立 `Live2DWidget` 组件

新增 `src/components/live2d/Live2DWidget.tsx`，由 `App.tsx` 在主页面挂载。组件内部负责桌面断点监听、runtime 动态加载、canvas 容器管理和资源销毁。

备选方案是在 `App.tsx` 内直接初始化 Live2D。放弃原因是 Live2D 生命周期复杂，直接写入页面组件会污染主布局逻辑，不利于后续替换和维护。

### 使用配置文件管理模型参数

新增 `src/config/live2d.ts`，集中定义模型 URL、容器尺寸、缩放、位置和桌面断点。后续更换模型时优先修改配置和 `public/live2d/` 资源，不修改组件主逻辑。

备选方案是把模型路径和尺寸写死在组件里。放弃原因是不同模型的画布比例、缩放和位置差异较大，硬编码会增加后续替换成本。

### 桌面端双重限制

CSS 层使用 Tailwind 桌面断点控制显示，例如 `hidden lg:block`。JS 层使用 `window.matchMedia('(min-width: 1024px)')` 判断是否初始化 runtime。

只使用 CSS 隐藏会导致移动端仍可能下载模型和创建 WebGL context；只使用 JS 判断则容易在样式层出现短暂布局或显示不一致。双重限制能同时保障显示行为和资源开销。

### 本地托管模型和 runtime 资源

模型资源放入 `public/live2d/<model-name>/`，生产代码通过站内路径加载。若所选 Live2D Cubism 版本需要额外 runtime 文件，也应放入 `public/vendor/` 或等效本地目录。

备选方案是使用远程 CDN 或第三方模型 URL。放弃原因是远程资源稳定性、授权边界和加载速度不可控。

### 使用 Live2D 渲染库而非博客插件脚本

优先使用 `pixi.js` 与 `pixi-live2d-display` 这类可组件化控制的方案。`live2d-widget` 一类博客插件适合快速接入，但全局脚本、资源配置和生命周期控制不符合当前 React 项目风格。

## Risks / Trade-offs

- 模型素材许可不清晰 → 仅选择明确允许公开展示和再分发的免费模型，并在资源目录或文档中记录来源。
- 构建和首屏体积增加 → 使用动态 import，只在桌面端进入组件初始化路径时加载 Live2D 相关依赖。
- WebGL context 泄漏 → 在组件卸载和断点退出时销毁 Pixi application、移除 canvas 和事件监听。
- 右下角遮挡内容 → 使用固定尺寸、透明容器和 `pointer-events` 控制；初版不覆盖留言板主要输入区。
- 不同模型显示比例差异大 → 将 scale、anchor、position 等参数配置化，实施时针对初始模型校准。

## Migration Plan

1. 安装 Live2D 渲染依赖。
2. 添加许可清晰的免费模型资源到 `public/live2d/`。
3. 新增配置文件和 `Live2DWidget` 组件。
4. 在 `App.tsx` 挂载组件，确保层级位于内容之上但不影响现有布局。
5. 运行 lint 和 build，并在桌面、移动视口分别验证显示和加载行为。

回滚策略：移除 `App.tsx` 中的组件挂载即可停止展示；如需彻底回滚，再移除新增依赖、组件、配置和模型资源。

## Open Questions

- 最终正式模型是否沿用初始免费模型，还是替换为自定义角色模型。
- 后续是否需要点击动作、表情、对话气泡或用户隐藏开关。
