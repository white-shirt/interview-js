# tree shaking  

只支持 ES Module 模块引入  

Tree Shaking 在打包过程中会分析引入的模块导出了什么内容，那些内容被引用了，会将没用的引用的模块内容忽略掉，不会打包进最后的 bundle.js 中。

```javascript
import { add } from './math.js'  

add(1 ,2)
```

如上，只是道出了 math 模块的 add 方法，但是会将 math 模块的其它文件也打包起来。这样非常没有必要，也会造成最后的打包文件过大。   

在 webpack config 中配置 Tree Shaking 可以避免这种情况。  

```javascript
// webpack.config.js
export default {
    // mode: development 需要配置 optimization(优化)
    // mode: production 不需要配置此项
    optimization: {
        // 打包被使用的模块
        usedExports: true
    }
}

// packages.js
{
    "sideEffects": ['@babel/polly-fill', '*.css']
}

// index.js  
import '@babel/polly-fill';  
// @babel/polly-fill 包可以用来将 es6 语法中的函数转换成低版本浏览器可以解析的函数  
// 具体做法是申明全局变量，如： window.promise  
// 该包并不会导出内容，所以会被 Tree Shaking 忽略掉  
// 为了避免 @babel/polly-fill 被忽略掉，可以在 packages.json 中配置一个 sideEffects 属性，这个配置项可以用来接受一个数组，数组里面可以添加 Tree Shaking 需要忽略掉的包或模块， 如果没有需要忽略的模块，那么设置成 false 即可  
```  

```javascript

```

