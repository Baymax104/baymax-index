## 1. 提案

- [x] 1.1 明确删除范围、共享依赖边界和保留功能
- [x] 1.2 编写 proposal、design 与行为规范

## 2. 实现

- [x] 2.1 清理 App 和 GitHub 数据链路
- [x] 2.2 清理 Live2D、聊天、模型和运行时资源
- [x] 2.3 清理无引用组件、依赖、样式与 API 转发
- [x] 2.4 更新当前开发说明，保留历史 change

## 3. 验证

- [x] 3.1 OpenSpec strict 校验
- [x] 3.2 build 和 lint
- [x] 3.3 桌面和移动视口验证剩余功能及网络请求
- [x] 3.4 检查最终差异及锁文件

## 验证记录

- OpenSpec strict 校验通过；`npm run build`、`npm run lint` 通过。
- 开发页和生产预览分别在 1440px、390px 检查：无 GitHub 数据标题、Live2D/聊天/canvas；两处个人主页链接保留；留言按钮触发滚动；留言板标题、Giscus 脚本和 Footer 存在；无横向溢出、无页面 JS 异常、无 API/Live2D/Pixi/Cubism 请求。
- Giscus 脚本 curl 下载成功（TLS 校验开启）；当前 Chromium 报 `ERR_CERT_AUTHORITY_INVALID`，留言 iframe 的完整远端交互未验证。未绕过证书校验。
- 锁文件删除 80 个依赖条目；保留包的版本、下载地址与完整性摘要未变。npm 同时刷新部分 dev/libc 元数据。
- 历史 OpenSpec change 保留；云环境草稿不在本次代码变更范围内。
