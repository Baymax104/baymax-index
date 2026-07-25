# content-background-polish Spec

## Requirements

### Requirement: 内容区浅色装饰背景

Hero 之后的内容区 SHALL 渲染低对比度的浅色装饰背景，用于匹配线上截图中 About、GitHub 和留言板周围的网格、短线和散点效果。

#### Scenario: 装饰位于内容之后

- **WHEN** 用户浏览 About、GitHub 或留言板区域
- **THEN** 背景装饰 SHALL 显示在卡片和文本下方
- **AND** 背景装饰 SHALL NOT 遮挡文本、按钮、链接或 giscus 评论框

#### Scenario: 装饰不影响交互

- **WHEN** 用户点击 GitHub 项目、Hero 留言板按钮或 giscus 登录按钮
- **THEN** 背景装饰 SHALL NOT 捕获鼠标或触摸事件

#### Scenario: 装饰稳定

- **WHEN** 页面重新渲染
- **THEN** 背景装饰 SHALL 使用确定性位置
- **AND** 不应因为随机值产生布局抖动或视觉跳变
