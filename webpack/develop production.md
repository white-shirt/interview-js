# development production  

项目根目录下 新建 3 个 webpack config 文件。  

` webpack.dev.js `   
` webpack.prod.js `  
` webpack.common.js `  

在 packages.json 文件中分别配置 development 和 production 环境的打包命令。  

将 development 和 production 中公共的配置项提取出来放入 ` webpack.common.js ` 文件中。  

通过 ` webpack-merge ` 模块将 ` webpack.common.js ` 配置文件与 ` webpack.dev.js ` ` webpack.prod.js ` 配置文件合并。  

```javascript
const commonConfig  = require('./webpack.common.js')

const devConfig = {
    mode: ''
}

module.export = merge(commonConfig, devConfig)
```  


