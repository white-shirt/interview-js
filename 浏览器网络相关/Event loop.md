# Event loop  

JS 在执行的过程中会产生执行环境，这些执行环境会被顺序放入执行栈中，如果遇到异步代码，这些异步代码会被挂起放入 Task 队列中，一旦执行栈为空，Event loop 就会从 Task 中拿出需要执行的代码放入到执行栈中。  

不同的任务源被分配到不同的 Task 队列中，任务源也分为 微任务（microtask）和宏任务（macrotask）  

```javascript
console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')

// script start > Promise > script end > promise1 > promise2 > setTimeout
```  

微任务包括 process.nextTick promise 等  
宏任务包括 setTimeout setInterval script 等  

Event loop 的执行顺序是  

1. 执行同步代码，这属于宏任务  
2. 执行栈为空，查询是否有微任务
3. 执行所有的微任务  
4. 看需要更新 UI
5. 开启下一轮的 Event loop，执行宏任务中的异步代码  


# 