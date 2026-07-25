## ADDED Requirements

### Requirement: 首页展示 About 区块
首页内容区 SHALL 在 GitHub 区块之前展示一个“关于我”区块，并包含线上版本中的标题、个人介绍、状态信息和兴趣标签。

#### Scenario: About 区块出现在 GitHub 之前
- **WHEN** 用户从首屏向下滚动进入内容区
- **THEN** 页面 MUST 先展示标题为“关于我”的 About 区块，再展示标题为“GitHub”的区块

#### Scenario: About 区块展示固定文案
- **WHEN** About 区块渲染完成
- **THEN** 页面 MUST 展示 `ABOUT BAYMAX`、`Hello, 我是Baymax小振`、`研二在读，目前在一家 AI 公司做算法方向实习，持续打磨工程与模型落地能力。` 和 `喜欢把理性和热爱都放进生活里：写代码、听人声、玩魔方，保持稳定且长期的成长节奏。`

#### Scenario: About 区块展示信息块
- **WHEN** About 区块渲染完成
- **THEN** 页面 MUST 展示 `研究方向`、`状态`、`关键词`、`能量来源` 四个信息块，并分别显示 `大模型应用`、`AI算法实习中`、`代码 | 音乐 | 魔方`、`新技术和好旋律`

#### Scenario: About 区块展示兴趣标签
- **WHEN** About 区块渲染完成
- **THEN** 页面 MUST 展示 `# 程序员`、`# 阿巴阿巴人机`、`# 修仙键盘侠`、`# KTV野生麦霸`、`# 养生魔友` 五个标签卡

### Requirement: 内容区使用线上版本骨架
Hero 下方内容区 SHALL 使用线上版本的滚动结构，以承载 About、GitHub 和后续留言板区块。

#### Scenario: 内容区保持 sticky Hero 之后的层级
- **WHEN** 页面渲染首页结构
- **THEN** Hero MUST 保持在 `sticky top-0 z-0` 容器中，内容区 MUST 使用 `relative z-10 overflow-hidden bg-slate-50 pt-14 sm:pt-20`

#### Scenario: About 区块使用进入动画
- **WHEN** About 区块首次进入视口
- **THEN** About 区块 MUST 从右侧偏移透明状态过渡到可见状态
