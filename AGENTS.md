# AGENTS.md

## 项目定位

这是 `baymax-index` 前端仓库，主要负责个人主页、GitHub 展示、留言板和桌面端 Live2D 人物展示。

- 技术栈：Vite、React、TypeScript、Tailwind CSS、shadcn/radix 风格组件。
- 后端 API 独立在 `baymax-index-api` 仓库。
- 前端通过 `/api/*` 访问后端，不在浏览器中保存 GitHub token、GLM API key 或其他服务端密钥。

## 基本工作原则

- 先探索再修改，优先理解现有组件、配置、OpenSpec change 和部署边界。
- 做最小合理改动，避免无关重构。
- 保持现有命名、格式、目录结构和 UI 风格。
- Markdown 文档使用简体中文为主。
- 不主动提交、推送、合并、重置或改写历史，除非用户明确要求。
- 提交前必须检查暂存区和工作区，避免提交 `.env`、token、`.playwright-cli/`、`node_modules/`、`dist/`、`.vercel/` 等本地或敏感文件。

## 本地环境

系统环境默认是 Windows + PowerShell。

常用命令：

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

工具偏好：

- 使用 `rg` 搜索文本。
- 使用 `fd` 查找文件。
- 使用 `npm` 执行前端脚本。
- 不写入 `nul`、`NUL`、`/dev/null`。
- 不创建 Windows 保留文件名，如 `con`、`prn`、`aux` 等。

## CodeGraph

仓库包含 `.codegraph/` 时，理解代码优先使用 CodeGraph：

- 查询组件、服务和调用关系时先用 `codegraph_explore` 或 `codegraph explore "<query>"`。
- 如果 CodeGraph 没有覆盖到具体文件，再用 `rg` 或直接读取文件。
- 修改后以 TypeScript、lint、build 和浏览器验证为最终准绳。

## OpenSpec 工作流

中等及以上变更遵循：

1. Understand
2. Explore
3. Specify
4. Implement
5. Verify

项目的 OpenSpec 目录在 `openspec/`。

- 新能力或行为改变先创建 `openspec/changes/<change-name>/`。
- 常用流程：
  - `openspec list --json`
  - `openspec new change "<change-name>"`
  - `openspec status --change "<change-name>" --json`
  - `openspec validate "<change-name>" --strict`
- 实现完成后更新对应 `tasks.md` 勾选项。
- 已完成但未归档的 change 仍可能是当前设计依据；修改相关能力前要先读取对应 proposal、design、spec 和 tasks。

## 前后端 API 边界

前端 API 路径通过 `/api` 统一进入后端：

- 本地开发：`vite.config.ts` 将 `/api` proxy 到 `https://baymax-index-api.vercel.app`。
- 生产部署：`vercel.json` 将 `/api/:path*` rewrite 到 `https://baymax-index-api.vercel.app/api/:path*`。

约定：

- GitHub 聚合由后端 `GET /api/github/overview` 提供。
- Live2D LLM 回复由后端 `POST /api/llm/chat` 提供 SSE。
- 前端不得引入 `VITE_GITHUB_TOKEN`、`VITE_GLM_*` 或任何浏览器可见密钥。
- 如果需要改后端契约，必须切换到 `baymax-index-api` 仓库单独处理。

## Live2D 工作流

主要文件：

- `src/components/live2d/Live2DWidget.tsx`
- `src/components/live2d/Live2DChatPanel.tsx`
- `src/config/live2d.ts`
- `src/config/persona.ts`
- `src/services/llmChat.ts`

当前设计要点：

- Live2D 人物只在桌面断点加载和显示。
- 移动端不显示人物，也不加载 Pixi、Live2D runtime 或模型资源。
- 人物模型资源放在 `public/live2d/`，Cubism runtime 放在 `public/vendor/live2d/`。
- `src/config/live2d.ts` 集中管理模型路径、canvas 尺寸、模型位置和对话功能开关。
- `live2dWidgetConfig.chat.enabled` 控制对话功能；当前默认值为 `false`。
- 当对话功能关闭时，保留人物展示，但不渲染聊天面板、不响应人物点击、不触发 `/api/llm/chat`。
- 当对话功能开启时，应保持原有点击展开/收起、SSE 回复、persona system prompt 和提交门禁行为。

## Playwright 验证

需要浏览器验证 UI 或网络行为时使用 `playwright-cli`。

推荐流程：

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4178
playwright-cli open about:blank
playwright-cli run-code --filename temp/<verify-script>.js
playwright-cli close
```

注意：

- 临时验证脚本放在 `temp/`，该目录被 `.gitignore` 忽略；验证结束后清理脚本。
- `.playwright-cli/` 是本地浏览器验证产物，必须保持 ignored。
- Windows 环境下 `npm run dev` 或 `npm run preview` 可能因 Tailwind oxide / Vite 原生依赖出现 `spawn EPERM`，此时可在获得授权后用提升权限启动本地服务。
- 验证 Live2D 对话关闭时，至少确认：
  - `data-live2d-character` 存在。
  - `data-live2d-character-button` 不存在。
  - `data-live2d-chat-panel` 不存在。
  - `data-live2d-chat-input` 不存在。
  - 点击人物后 `/api/llm/chat` 请求数为 `0`。

## 校验要求

常规前端变更完成前至少运行：

```bash
npm run build
npm run lint
```

涉及 OpenSpec change 时还要运行：

```bash
openspec validate "<change-name>" --strict
```

涉及 UI、Live2D、SSE、路由或部署行为时，尽量用 Playwright 做浏览器验证。

## 部署约定

Vercel 已与 GitHub 仓库连接。

- 用户要求“部署”时，含义是提交并推送到 GitHub 仓库，由 Vercel 自动触发部署。
- 不使用 `vercel deploy` 或其他 Vercel CLI 手动部署命令。
- 推送前按变更范围运行必要校验，例如 `npm run build`、`npm run lint`、OpenSpec strict validate 或 Playwright 验证。
- 推送前必须检查 Git 暂存区和工作区。
- 提交信息使用 Conventional Commits，并使用简体中文描述，例如：

```bash
feat(live2d): 默认隐藏人物对话功能
chore(gitignore): 忽略 Playwright 本地产物
```

## Git 注意事项

- 提交前先运行：

```bash
git status --short --branch
git status --short --ignored
git diff --staged --name-status
```

- 如果 `git commit` 因 `.git/index.lock` 权限失败，不要手动删除锁文件；先重试一次，仍失败时请求提升权限执行同一提交。
- 如果 `git push` 因 Git 凭据脚本 `couldn't create signal pipe` 或无法读取 GitHub 用户名失败，请求提升权限重试同一 push。
- 不使用 `git reset --hard`、`git clean`、强推或历史改写，除非用户明确授权。
