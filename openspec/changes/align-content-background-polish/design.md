# Design

## 方案

新增 `ContentBackground` 布局组件，挂载在 Hero 之后的内容容器中，使用 `absolute inset-0` 覆盖内容区背景。组件只渲染静态装饰元素：

- 低透明度点阵背景，模拟线上页面的浅色纹理。
- 若干确定位置的短线段，模拟截图中的细线装饰。
- 少量像素级散点，保持低对比度。

## 层级

- 内容区 section 保持 `relative z-10 overflow-hidden bg-slate-50`。
- `ContentBackground` 使用 `pointer-events-none absolute inset-0 z-0`。
- 主要内容和 Footer 继续使用 `relative z-10`。

这样装饰不会覆盖卡片、按钮、giscus iframe 或链接，也不会引发布局尺寸变化。

## 响应式

装饰使用百分比定位，桌面和移动端都保持背景性质。移动端隐藏部分远侧短线，减少视觉噪声。
