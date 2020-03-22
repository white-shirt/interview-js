# 1. 组件通信方式有哪些  

## 父子组件通信：  

1. prop 和 events  

2. v-model 指令  

v-model 是用来在表单控件或者组件上创建双向绑定的，他的本质是 v-bind 和 v-on 的语法糖，在一个组件上使用 v-model，默认会为组件绑定名为 value 的 prop 和名为 input 的事件。  

3. .sync 修饰符  

```javascript
<text-document v-bind:title.sync="doc.title"></text-document>  

this.$emit('update:title', newTitle)
```  

4. ref  

ref 特性可以为子组件赋予一个 ID 引用，通过这个 ID 引用可以直接访问这个子组件的实例。当父组件中需要主动获取子组件中的数据或者方法时，可以使用 $ref 来获取。  

```javascript
<template>
    <base-input ref="baseInput"></base-input>
</template>
<script>
    export default {
        methods: {
        focusInput: function () {
            this.$refs.usernameInput.focus()
        }
    }
}
</script>
```   

5. $parent 和 $children  

$parent 属性可以用来从一个子组件访问父组件的实例，$children 属性 可以获取当前实例的直接子组件  


## 非父子组件通信  

1. $attrs 和 $listeners  

$attrs 会包含父组件中没有被 prop 接收的所有属性（不包含class 和 style 属性），可以通过 v-bind="$attrs" 直接将这些属性传入内部组件  

$listeners 会包含所有父组件中的 v-on 事件监听器 (不包含 .native 修饰器的) ，可以通过 v-on="$listeners" 传入内部组件。  

2. provide 和 inject  

provide 和 inject 需要在一起使用，它可以使一个祖先组件向其所有子孙后代注入一个依赖，可以指定想要提供给后代组件的数据/方法，不论组件层次有多深，都能够使用。  


3. eventBus  

对于比较小型的项目，没有必要引入 vuex 的情况下，可以使用 eventBus。相比我们上面说的所有通信方式，eventBus 可以实现任意两个组件间的通信。  

它的实现思想也很好理解，在要相互通信的两个组件中，都引入同一个新的vue实例，然后在两个组件中通过分别调用这个实例的事件触发和监听来实现通信。  


```javascript
//eventBus.js
import Vue from 'vue';
export default new Vue();

// 组件A
<script>
import Bus from 'eventBus.js';
export default {
    methods: {
        sayHello() {
            Bus.$emit('sayHello', 'hello');
        }
    }
}
</script>

// 组件B
<script>
import Bus from 'eventBus.js';
export default {
    created() {
        Bus.$on('sayHello', target => {
            console.log(target);  // => 'hello'
        });
    }
}
</script>
```   

4. 通过 $root 访问根实例  

通过 $root，任何组件都可以获取当前组件树的根 Vue 实例，通过维护根实例上的 data，就可以实现组件间的数据共享。  


# 2. v-model是如何实现双向绑定的  

v-model 是用来在表单控件或者组件上创建双向绑定的，他的本质是 v-bind 和 v-on 的语法糖，在一个组件上使用 v-model，默认会为组件绑定名为 value 的 prop 和名为 input 的事件。  

# 3. Vuex和单纯的全局对象有什么区别  

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。  

# 4. computed 和 watch 有什么区别  

computed 计算属性，是依赖其他属性的计算值，并且有缓存，只有当依赖的值变化时才会更新。
watch 是在监听的属性发生变化时，在回调中执行一些逻辑。
所以，computed 适合在模板渲染中，某个值是依赖了其他的响应式对象甚至是计算属性计算而来，而 watch 适合监听某个值的变化去完成一段复杂的业务逻辑  


# 5. keep-alive 的作用是什么  

keep-alive 可以在组件切换时，保存其包裹的组件的状态，使其不被销毁，防止多次渲染。
其拥有两个独立的生命周期钩子函数 actived 和 deactived，使用 keep-alive 包裹的组件在切换时不会被销毁，而是缓存到内存中并执行 deactived 钩子函数，命中缓存渲染后会执行 actived 钩子函数。  

# 6. Vue 中 v-html 会导致什么问题  

在网站上动态渲染任意 HTML，很容易导致 XSS 攻击。所以只能在可信内容上使用 v-html，且永远不能用于用户提交的内容上。  

# 7. Object.defineProperty有哪些缺点  

1. Object.defineProperty 只能劫持对象的属性，而 Proxy 是直接代理对象
由于 Object.defineProperty 只能对属性进行劫持，需要遍历对象的每个属性。而 Proxy 可以直接代理对象。  

2. Object.defineProperty 对新增属性需要手动进行 Observe，由于 Object.defineProperty 劫持的是对象的属性，所以新增属性时，需要重新遍历对象，对其新增属性再使用 Object.defineProperty 进行劫持。
也正是因为这个原因，使用 Vue 给 data 中的数组或对象新增属性时，需要使用 vm.$set 才能保证新增的属性也是响应式的。

3. 新标准性能红利，Proxy 作为新标准，长远来看，JS引擎会继续优化 Proxy ，但 getter 和 setter 基本不会再有针对性优化。  

4. Proxy 兼容性差 目前并没有一个完整支持 Proxy 所有拦截方法的Polyfill方案

5. Proxy支持13种拦截操作，这是defineProperty所不具有的  

* get(target, propKey, receiver): 拦截对象属性的读取
* set(target, propKey, value, receiver): 拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。  
* has(target, propkey): 拦截propKey in proxy的操作，返回一个布尔值
* deleteProperty(target, propKey): 拦截delete proxy[propKey]的操作，返回一个布尔值
* ownKeys(target): 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性
* getOwnPropertyDescriptor(target, propKey):拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
* defineProperty(target, propKey, propDesc):
* getPrototypeOf(target):
* setPrototypeOf(target, proto):
* apply(target, object, args)
* construct(target, args):
* preventExtensions(target):


# 8. Vue中如何检测数组变化  

Vue 的 Observer 对数组做了单独的处理，对数组的方法进行编译，并赋值给数组属性的 __proto__ 属性上，因为原型链的机制，找到对应的方法就不会继续往上找了。编译方法中会对一些会增加索引的方法（push，unshift，splice）进行手动 observe。

# 9. 组件的 data 为什么要写成函数形式  

Vue 的组件都是可复用的，一个组件创建好后，可以在多个地方复用，而不管复用多少次，组件内的 data 都应该是相互隔离，互不影响的，所以组件每复用一次，data 就应该复用一次，每一处复用组件的 data 改变应该对其他复用组件的数据不影响。
为了实现这样的效果，data 就不能是单纯的对象，而是以一个函数返回新对象的形式，所以每个组件实例可以维护独立的数据拷贝，不会相互影响。


# 10. nextTick是做什么用的，其原理是什么  

在下次 DOM 更新循环结束后执行延迟回调，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。  
简单来说，Vue在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。  

```javascript
vm.message = 'changed'

console.log(vm.$el.textContent) // 并不会得到 ‘changed’

Vue.nextTick(function () {
    console.log(vm.$el.textContent) // changed
})
```



