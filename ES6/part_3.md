
## Reflect  

1. 概述  

* 将 `Object` 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty` ），放到 `Reflect` 对象上。现阶段，某些方法同时在 `Object` 和 `Reflect` 对象上部署，未来的新方法将只部署在 `Reflect` 对象上。也就是说，从 `Reflect` 对象上可以拿到语言内部的方法。  
* 修改某些 `Object` 方法的返回结果，让其变得更合理。比如， `Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false` 。 
* 让 `Object` 操作都变成函数行为。某些 `Object` 操作是命令式，比如 `name in obj和delete obj[name]` ，而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。
* `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。  

```javascript
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```

2. 静态方法  

* Reflect.apply(target, thisArg, args)
* Reflect.construct(target, args)
* Reflect.get(target, name, receiver)
* Reflect.set(target, name, value, receiver)
* Reflect.defineProperty(target, name, desc)
* Reflect.deleteProperty(target, name)
* Reflect.has(target, name)
* Reflect.ownKeys(target)
* Reflect.isExtensible(target)
* Reflect.preventExtensions(target)
* Reflect.getOwnPropertyDescriptor(target, name)
* Reflect.getPrototypeOf(target)
* Reflect.setPrototypeOf(target, prototype)


## Iterator 和 for...of 循环  

1. Iterator（遍历器）的概念  

JavaScript 原有的表示“集合”的数据结构，主要是数组（ `Array` ）和对象（ `Object` ），ES6 又添加了 `Map` 和 `Set` 。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是 `Map` ，`Map` 的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。  

任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。  

Iterator 的遍历过程是这样的。  

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。  

```javascript
// 模拟next方法返回值

let it = makeIterator(["a", "b"]);

it.next()   // { value: a, done: false }
it.next()   // { value: b, done: false }
it.next()   // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

2. 默认 Iterator 接口  

当使用 `for...of` 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。一种数据结构只要部署了 `Iterator` 接口，我们就称这种数据结构是“可遍历的”（iterable）。  

ES6 规定，默认的 `Iterator` 接口部署在数据结构的 `Symbol.iterator` 属性，或者说，一个数据结构只要具有 `Symbol.iterator` 属性，就可以认为是“可遍历的”（iterable）。  

```javascript
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```

原生具备 `Iterator` 接口的数据结构如下。  

* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

对于原生部署 `Iterator` 接口的数据结构，不用自己写遍历器生成函数，`for...of` 循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 `Iterator` 接口，都需要自己在 `Symbol.iterator` 属性上面部署，这样才会被 `for...of` 循环遍历。  

对于类似数组的对象，部署 `Iterator` 接口，有一个简便方法，就是 `Symbol.iterator` 方法直接引用数组的 `Iterator` 接口。  

```javascript
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
```