## Context

线上当前版本的编译产物位于 `temp/`，其中 `temp/index.html` 指向 `temp/assets/index-CZZsJqWO.js` 与 `temp/assets/index-Di-rCUgj.css`。该版本在 sticky Hero 后进入一个带背景装饰的内容区，并首先展示“关于我”卡片。本地当前 `src/App.tsx` 只在 Hero 后展示 GitHub 卡片，缺少 About 区块。

现有项目已经具备需要复用的基础：

- `useInView` 负责一次性视口进入检测。
- `sectionClass` 提供左右滑入与卡片外观。
- Tailwind v4 和 shadcn UI token 已配置。
- `public/banner.png` 与 `public/avatar.jpg` 已和线上资源一致。

## Goals / Non-Goals

**Goals:**

- 在 GitHub 区块之前新增线上版本的 About 区块。
- 复现线上 About 的主要信息层级、文本内容、标签卡、渐变背景与响应式布局。
- 在 App 层新增 About ref，并使用现有 `useInView` 驱动右侧进入动画。
- 让内容区具备线上版本的 `relative z-10 overflow-hidden bg-slate-50 pt-14 sm:pt-20` 结构，为后续背景装饰和留言板保留容器。

**Non-Goals:**

- 不改 GitHub 数据源、GitHub 项目数量或 pinned 查询。
- 不新增 giscus 留言板。
- 不复刻线上 bundle 中暴露的 GitHub token。
- 不新增路由或状态管理。

## Decisions

1. **新增独立 `AboutSection` 组件。**
   - 理由：About 是独立内容块，和 GitHub、留言板并列，放在 `components/sections` 符合当前目录边界。
   - 备选：直接写进 `App.tsx`。放弃原因是 App 会迅速膨胀，后续变更难以分块验证。

2. **复用 `sectionClass` 作为外层卡片。**
   - 理由：线上 About、GitHub、留言板共享同类白色外卡、边框、阴影和左右进入动画，本地已有相同抽象。
   - 备选：为 About 单独写外层动画类。放弃原因是会制造重复样式。

3. **把线上 About 数据内联在组件文件内。**
   - 理由：该内容是静态个人主页文案，不需要运行时请求或跨模块复用。
   - 备选：放入 `data/about.ts`。当前只有一个消费者，暂不拆分。

4. **保留线上文案中的 emoji。**
   - 理由：这是用户可见内容的一部分，截图与 bundle 均包含 emoji；本次允许引入非 ASCII。

## Risks / Trade-offs

- 线上产物是 minified bundle，不能完全还原源文件命名和细节 → 以截图和 bundle 可见文本/class 为准，保持源码结构符合当前项目风格。
- About 区块使用较多 Tailwind arbitrary/grid 类 → 通过 `npm run build` 验证 Tailwind v4 能生成所需样式。
- 只实现 About 后页面仍未完全等同线上 → 后续 OpenSpec 变更继续补齐 GitHub pinned 和留言板。
