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


