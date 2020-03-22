# Note  

1. Map Set WeakSet WeakMap 的区别  

`Set`  

* 成员不能重复
* 只有健值，没有健名，有点类似数组。
* 可以遍历，方法有add, delete,has
* Array.from 方法可以转换成数组  

`WeakSet`  

* 成员都是对象
* 成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
* 不能遍历，方法有add, delete,has

`Map` 

* 本质上是健值对的集合，类似集合
* “键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
* 可以遍历，方法很多，可以干跟各种数据格式转换

`WeakMap`  

* 只接受对象作为键名（ `null` 除外），不接受其他类型的值作为键名
* `WeakMap` 的键名所指向的对象，不计入垃圾回收机制  


2. 数组去重并排序  

```javascript
let arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

Array.from(new Set(arr.flat(Infinity).sort((a, b) => {
    return a - b;
})))
```

3. JS异步解决方案的发展历程以及优缺点  

1. 回调函数（callback）  

缺点：回调地狱，不能用 try catch 捕获错误，不能 return  

2. Promise  

Promise 实现了链式调用，也就是说每次 then 后返回的都是一个全新 Promise，如果我们在 then 中 return ，return 的结果会被 Promise.resolve() 包装  

优点：解决了回调地狱的问题  
缺点：无法取消 Promise ，错误需要通过回调函数来捕获  

3. Generator  

特点：可以控制函数的执行  

4. Async/await  

优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题

缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。