# Code Splitting  

* 分离业务代码与第三方库 （ vendor ）
* 按需加载（利用 import() 语法）

业务代码更新频率大，相反第三方库代码更新迭代相对较慢且可以锁版本，所以可以充分利用浏览器的缓存来加载这些第三方库。  



```javascript
// webpack.config.js  
optimization: {
    splitChunks: {
        chunks: 'all'
    } 
}

// 打包后的 js 文件  
// main.js  业务
// vendor.js    第三方库文件
```

异步加载  

```javascript
// index.js  
function getComponent() {
    return import (/* webpackChunkName:'lodash' */ 'lodash').then(({ default: _ })) => {
        var element = document.createElement('div');
        element.innerHTML = _.join(['Mr', 'Z'], '-')
        return element
    })
}

getComponent().then(element => {
    document.body.appendChild(element)
})
```  

webpack 中实现代码分割，两种方式  

1.  同步代码，只需在 optimization 配置项中进行配置即可
2. 异步代码（import）无需做任何配置，会自动进行代码分割  

