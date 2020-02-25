
## Set 和 Map 数据结构  

### 1. Set  

#### 基本用法  

ES6 提供了新的数据结构 `Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set` 本身是一个构造函数，用来生成 `Set` 数据结构。  

```javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 去除数组的重复成员
[...new Set(array)]

[...new Set('ababbc')].join('')
// "abc"
```

#### Set 实例的属性和方法  

Set 结构的实例有以下属性。  

* `Set.prototype.constructor` ：构造函数，默认就是 `Set` 函数。
* `Set.prototype.size` ：返回 `Set` 实例的成员总数。  

Set 结构的实例方法。  

* `Set.prototype.add(value)` ：添加某个值，返回 `Set` 结构本身。
* `Set.prototype.delete(value)` ：删除某个值，返回一个布尔值，表示删除是否成功。
* `Set.prototype.has(value)` ：返回一个布尔值，表示该值是否为 `Set` 的成员。
* `Set.prototype.clear()` ：清除所有成员，没有返回值。 

`Array.from` 方法可以将 `Set` 结构转为数组。  

```javascript
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```

遍历操作  

* `Set.prototype.keys()` ：返回键名的遍历器
* `Set.prototype.values()` ：返回键值的遍历器
* `Set.prototype.entries()` ：返回键值对的遍历器
* `Set.prototype.forEach()`：使用回调函数遍历每个成员

`keys` 方法、`values` 方法、`entries` 方法返回的都是遍历器对象。由于 `Set` 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 `keys` 方法和 `values` 方法的行为完全一致。  

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

使用 `Set` 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。  

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```


#### 1.1. WeakSet  

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。  

* WeakSet 的成员只能是对象，而不能是其他类型的值。
* 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。  


### 2. Map  

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。  

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。  

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。  

```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```  

事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。  

```javascript
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。  

```javascript
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined

const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

#### 对象转为 Map  

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

### WeakMap  

`WeakMap` 与 `Map` 的区别有两点。  

* `WeakMap` 只接受对象作为键名（ `null` 除外），不接受其他类型的值作为键名。  
* `WeakMap` 的键名所指向的对象，不计入垃圾回收机制。


## Proxy  

### 1. 概述

`Proxy` 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。  

`Proxy` 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。`Proxy` 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。  

```javascript
var proxy = new Proxy(target, handler);
```

`Proxy` 对象的所有用法，都是上面这种形式，不同的只是 `handler` 参数的写法。其中，new Proxy()表示生成一个Proxy实例，`target` 参数表示所要拦截的目标对象，`handler` 参数也是一个对象，用来定制拦截行为。  

```javascript
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

注意，要使得 `Proxy` 起作用，必须针对 `Proxy` 实例（上例是 `proxy` 对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。  

```javascript
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

上面代码中，`handler` 是一个空对象，没有任何拦截效果，访问 `proxy` 就等同于访问 `target` 。  

### 2. Proxy 实例的方法  

#### get()   

`get` 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选  

#### set()  

`set` 方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。  

### apply()  

`apply` 方法拦截函数的调用、`call` 和 `apply` 操作。  

`apply` 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（ `this` ）和目标对象的参数数组。  

```javascript
var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};

//例子
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"
```

### has()  

`has` 方法用来拦截 `HasProperty` 操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。

`has` 方法可以接受两个参数，分别是目标对象、需查询的属性名。  

```javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

### construct()   

`construct` 方法用于拦截 `new` 命令，下面是拦截对象的写法。  

```javascript
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10
```

### deleteProperty()  

`deleteProperty` 方法用于拦截 `delete` 操作，如果这个方法抛出错误或者返回 `false`，当前属性就无法被 `delete` 命令删除。

### defineProperty()  

`defineProperty` 方法拦截了 `Object.defineProperty` 操作。  

```javascript
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

### defineProperty()  

`defineProperty` 方法拦截了 `Object.defineProperty` 操作。  

```javascript
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```  

### getOwnPropertyDescriptor()  

```javascript
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```  

### getPrototypeOf()  

```javascript
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```  

### setPrototypeOf()  

```javascript
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```  

### ownKeys()  

```javascript
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]

// 下面的例子是拦截第一个字符为下划线的属性名。
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"
``` 









