# Live2D 资源说明

## 初始模型

- 模型：Mao
- 来源：Live2D 官方 `CubismWebSamples` 仓库，路径 `Samples/Resources/Mao`
- 授权：Live2D Free Material License
- 使用条件：需遵守 Live2D Free Material License Agreement 和 Live2D Cubism Sample Data Terms of Use

## Cubism Core

- 文件：`public/vendor/live2d/live2dcubismcore.min.js`
- 来源：`@hazart-pkg/live2d-core@1.0.1` 包中提取的 Cubism Core 文件
- 授权：Live2D Proprietary Software License
- 再分发说明：`public/vendor/live2d/RedistributableFiles.txt` 列出 `live2dcubismcore.min.js` 为可再分发文件

## 替换模型

后续替换模型时，将新模型目录放入 `public/live2d/<model-name>/`，并更新 `src/config/live2d.ts` 中的模型路径、尺寸、缩放和位置参数。
