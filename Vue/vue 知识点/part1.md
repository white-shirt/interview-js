# 1. v-model 的原理  

v-model 实际上是一个语法糖等价于给 input 绑定一个 value，同时添加一个 input 事件  

```javascript
<input v-model="inpValue" />

// 等价于  
<input v-bind:value="inpValue" v-on:input="inpValue = $event.target.value" />
```

# 重置 data  

`vm/$options.data` 可以获取到组件初始化状态下的 data。  

```javascript
Object.assign(this.$data, this.$options.data)
```  

# vue渲染模板时怎么保留模板中的HTML注释  

```javascript
<template comments>
  ...
</template>
```  

# style加scoped属性的用途和原理  

用途：防止全局同名CSS污染  
原理：在标签加上 data-v-xxx 属性，再在选择器时加上对应 [data-v-xxx] ，即CSS带属性选择器，以此完成类似作用域的选择方式  

# vue 中的边界情况有那些  

1. 组件之间相互引用  
2. 子组件直接访问父组件、根实例
3. 递归组件  

# 强制组件刷新  

1. 在父组件中给子组件绑定一个 key，改变 key 值子组件重新加载
2. this.$forceUpdate()  

# vue如何优化首页的加载速度  

* webpack 压缩代码  
* 服务端渲染 SSR  
* 对静态资源进行缓存
* CDN 的使用

## vue能监听到数组变化的方法有哪些  

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()  

## provide inject  

```javascript
// parent component
// 在这个 vue 实例下的所有后代组件都能 拿到 return 出来的值
provide() {
  return {
    data: this.data
  }
}

// children
inject: ['data']

this.data // parent 实例中 provide 方法 return 出来的 data 值

```