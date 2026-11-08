# AGENTS.md

## 项目定位

这是 `baymax-index` 前端仓库，主要负责个人主页和留言板。

- 技术栈：Vite、React、TypeScript、Tailwind CSS、shadcn/radix 风格组件。
- 留言板通过 Giscus 接入 GitHub Discussions；首页和页脚保留 GitHub 个人主页外链。
- GitHub 数据板块、Live2D 和 LLM 对话已移除；前端不再依赖独立后端 API。

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
- 验证首页时确认 Hero、About、留言板、Footer 和 GitHub 外链正常。
- 桌面和移动端均不应出现 GitHub 数据板块、Live2D 或聊天控件，也不应请求 GitHub overview、LLM、模型或 Cubism/Pixi 资源。

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

涉及 UI、路由或部署行为时，尽量用 Playwright 做浏览器验证。

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
