## ADDED Requirements

### Requirement: 桌面端 Live2D 人物展示

系统 SHALL 在桌面端视口右下角展示 Live2D 人物，并保持其悬浮在主要内容之上。

#### Scenario: 桌面端显示人物

- **WHEN** 用户使用宽度达到桌面断点的浏览器访问首页
- **THEN** 页面 MUST 在右下角显示 Live2D 人物

#### Scenario: 不改变主内容布局

- **WHEN** Live2D 人物完成加载
- **THEN** About、GitHub、留言板和 Footer 的文档流布局 MUST 保持不变

### Requirement: 移动端不加载 Live2D

系统 SHALL 在移动端和窄屏视口不显示且不初始化 Live2D runtime。

#### Scenario: 移动端隐藏人物

- **WHEN** 用户使用低于桌面断点的浏览器访问首页
- **THEN** 页面 MUST 不显示 Live2D 人物

#### Scenario: 移动端不初始化 runtime

- **WHEN** 用户使用低于桌面断点的浏览器访问首页
- **THEN** 页面 MUST 不加载 Live2D 模型资源和渲染 runtime

### Requirement: 模型资源可替换

系统 SHALL 将 Live2D 模型路径、尺寸和位置参数集中配置，便于后续替换模型。

#### Scenario: 更换模型路径

- **WHEN** 开发者需要替换 Live2D 模型
- **THEN** 开发者 MUST 能通过修改配置中的模型路径和显示参数完成替换，而不需要重写组件生命周期逻辑

### Requirement: 初版仅支持待机展示

系统 SHALL 在初版只展示模型默认待机状态，不提供额外用户交互能力。

#### Scenario: 默认待机

- **WHEN** Live2D 人物加载完成
- **THEN** 模型 MUST 保持默认待机展示

#### Scenario: 无额外交互控件

- **WHEN** 用户查看 Live2D 人物
- **THEN** 页面 MUST 不显示 Live2D 气泡、菜单、换装按钮或隐藏按钮

### Requirement: 生命周期清理

系统 SHALL 在组件卸载或退出桌面断点时清理 Live2D 渲染实例和事件监听。

#### Scenario: 退出桌面断点

- **WHEN** 浏览器视口从桌面断点缩小到非桌面断点
- **THEN** 系统 MUST 销毁 Live2D 渲染实例并移除相关事件监听

#### Scenario: 组件卸载

- **WHEN** Live2D 组件从页面卸载
- **THEN** 系统 MUST 清理 canvas、渲染器和模型实例引用
