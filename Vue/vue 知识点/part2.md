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

# 11. v-for 中 key 的作用是什么  

key 是给每个 vnode 指定的唯一 id，在同级的 vnode  diff 过程中，可以根据 key 快速的对比，来判断是否为相同节点，并且利用 key 的唯一性可以生成 map 来更快的获取相应的节点。
另外指定 key 后，就不再采用“就地复用”策略了，可以保证渲染的准确性。  

# 12. 为什么 v-for 和 v-if 不建议用在一起  

当 v-for 和 v-if 处于同一个节点时，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。如果要遍历的数组很大，而真正要展示的数据很少时，这将造成很大的性能浪费。
这种场景建议使用 computed，先对数据进行过滤。


# 13. Vue导航守卫  

导航守卫表示当导航开始变化到导航变化结束的那段时间里，根据导航的变化做出一些响应。  

### 13.1 全局守卫  

1. router.beforeEach(): 全局前置钩子，进入路由之前
2. router.beforeResolve():  全局解析钩子，在 beforeRouteEnter 调用之后调用
3. router.afterEach():  全局后置钩子，进入路由之后  

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import route from './router'

Vue.use(Router)

const router = new Router({
    routes: route
})

const HAS_LOGIN = true;

// 全局前置钩子
router.beforeEach((to, from, next) => {
    // to from 都是路由实例
    if (to.name !== 'login') {
        if (HAS_LOGIN) next();
        else next({ name: 'login' })
    } else {
        if (HAS_LOGIN) next({ name: 'home' });
        else next();
    }
})

// 全局解析钩子
router.beforeResolve((to, from, next) => {

})

// 全局后置钩子
router.afterEach((to, from) => {

})

export default router;
```

### 13.2 路由独享的守卫  

`beforeEnter`

```javascript
{
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
        if (from.name === 'xxx') {
            
        } else {

        }
        next()
    }
}
```

### 13.3 路由组件内的守卫  

* beforeRouteEnter(): 进入路由前
* beforeRouteUpdate(): 路由复用同一个组件时
* beforeRouteLeave(): 离开当前路由时  

```javascript
export default {
  // 组件内守卫
  // 因为这个钩子调用的时候，组件实例还没有被创建出来，因此获取不到this
  beforeRouteEnter (to, from, next) {
    console.log(to.name);
    // 如果想获取到实例的话
    // next(vm=>{
    //   // 这里的vm是组件的实例（this）
    // });
    next();
  },
  // 路由即将要离开的时候调用此方法
  // 比如说，用户编辑了一个东西，但是还么有保存，这时候他要离开这个页面，就要提醒他一下，还没保存，是否要离开
  beforeRouteLeave (to, from, next) {
    const leave = confirm("确定要离开吗？");
    if(leave) next()    // 离开
    else next(false)    // 不离开
  },
}
```

### 13.4 一个完整的导航解析流程  

1. 导航被触发。
2. 在失活的组件（即将离开的页面组件）里调用离开守卫。beforeRouteLeave
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用（路由独享的守卫） beforeEnter。
6. 解析异步路由组件
7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。所有的钩子都触发完了。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

# 14. 父组件监听子组件的生命周期  

```javascript
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}

//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
}, 

```






