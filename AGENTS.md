# AGENTS.md

## 部署约定

- Vercel 已与 GitHub 仓库连接。
- 当用户要求“部署”时，含义是将相关代码提交并推送到 GitHub 仓库，由 Vercel 自动触发部署。
- 不使用 `vercel deploy` 或其他 Vercel CLI 手动部署命令。
- 推送前需要按变更范围运行必要校验，例如 `npm run build`、`npm run lint` 或对应项目的类型检查。
- 推送前必须检查 Git 暂存区和工作区，避免提交 `.env`、token、`.playwright-cli/`、`node_modules/` 等本地或敏感文件。
