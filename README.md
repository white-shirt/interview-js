


## 1. 循环中的块作用域绑定
  在JavaScript中，由于var声明得到了变量提升，变量i在循环结束后还可以访问。
  
```javascript
var func = [];
for (var i = 0; i < 10; i++) {
  func.push(function () {
    console.log(i);
  })
}
func.forEach(function (fun) {
  fun() //在这里输出10个10
})
```

  之所以输出10个10，是因为循环里每次迭代都共享着变量i,循环体内部创建的函数全部保留了对相同变量的引用，待到循环结束时，变量i的值为10，所以每次执     行**console.log(i)** 时都会输出数字10。
  为了解决这个问题，可以使用**立即调用函数表达式（IIFE）** ，以强制生成计数器变量的副本。

```javascript
var func = [];
for (var i = 0; i < 10; i++) {
  func.push((function (value) {
    console.log(value);
  }(i)))
}
func.forEach(function (fun) {
  fun();  //在这里输出0,1,2,...9
})
```
  
  在循环内部，**IIFE**表达式为接收到的每一个变量i都创建了一个副本并存储为变量value，这个变量的值就是每次迭代创建的函数所使用的值，因此每次调用函数都会输出对应的值。
  
  **有了ES6中的let和const提供的块级绑定就不需要这么折腾了**
  
```javascript
var func = [];
for (let i = 0; i < 9; i++) {
  func.push(function () {
    console.log(i)
  })
}
func.forEach(function (fun) {
  fun();  //在这里依次输出0-9;
})
```

  let声明模仿上面的IIFE方式来做了一定的简化，每次迭代都会创建一个新的变量，并以之前迭代的同名变量的值作为其初始化的值。
  
  
## 2. 全局块作用域绑定
  
  let和const与var的另外一个区别就是它们在全局作用域中的行为，当var被用于全局作用域时，它会创建一个新的全局变量作为全局对象的属性，这意味着var很可能会无意覆盖一个已经存在的全局属性。
  
```javascript
var RegExp = "hello";
console.log(window.RegExp);  //"hello"

var test = "hello";
console.log(window.test);  //"test"
```

  如果在全局作用域中使用let和const，会在全局作用域下创建一个新的绑定，但该绑定不会添加为全局对象的属性，也就是说let和const不会覆盖全局变量。


## 3. 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

  ```javascript
    function buildArray(arr, length, min, max) {
      var num = Math.max(min, Math.ceil(Math.random() * max));
      if (!arr.includes(num)) { arr.push(num); }
      return arr.length === length ? arr : buildArray(arr, length, min, max);
    }
    var result = buildArray([], 5, 2, 32);
    console.log(result);
  ```


## 4. this

  this的指向是在执行时确定的，在默认情况下，this是指向全局对象的，比如在浏览器就是指向window。
  其次，如果函数被调用的位置存在上下文对象时，那么函数是被隐式绑定的。
  
  ```javascript
    function f() {
      console.log( this.name );
    }
    var obj = {
      name: "Mark",
      f: f
    };
    obj.f(); //Mark
  ```
  显式的改变this的指向，常见的方法就是call apply bind
  
  ### bind
  
```javascript
  function f() {
    console.log( this.name );
  }
  var obj = {
    name: "Mark",
   };
  var obj1 = {
    name: "Bale"
  };
  f.bind(obj)(); //Mark
```
  待补充。。。。。
  
  
## 5. 使用类进行面向对象编程

  ```javascript
    class Book {
      constructor(title, author) {
        this.title = title;
        this.author = author;
      }
      printAuthor() {
        console.log(this.author);
      }
    }
  ```
  只需要使用***class***关键字，声明一个有***constructor***函数和诸如***printAuthor***等函数。
  
  ### 5.1 继承
  
  ```javascript
    class ortherBook extends Book {
      constructor(title, author, pages) {
        super(title, author);
        this.pages = pages;
      }
      printPages() {
        console.log(this.pages);
      }
    }
  ```
  使用***extends***关键字扩展一个类并继承它的行为，在构造函数中使用***super***关键字引用父类的构造函数。
  
  
## 6. 模块
  
  待补充
  
  
## 7. TypeScript

  待补充
  
  
## 8. 数组

  ### 8.1 数组中常用的方法
  
  unshift push pop shift splice slice concat every filter forEach join indexOf lastIndexOf map some sort toString valueOf reduce
  
  ### 8.2 ES6中新增的数组的方法
  
  @@iterator copyWithin entries includes find findIndex fill from keys of values


## 9. Object.is() Object.assign() 方法

## 10. 修改对象的原型
  Object.create()  Object.getPrototypeOf()  Object.setPrototypeOf()

## 11. 对象的解构
  
  当使用解构赋值语句时，如果指定的本地变量在对象中没有找到同名属性，则该变量会被赋值为 ***undefined***
  
```javascript
  let node = {
    type: "string",
    name: "Mark"
  };
  let { type, name, value } = node;
  console.log(type); //"string"
  console.log(name); //"Mark"
  console.log(value); //undefined
```

  可以为value指定一个默认值 例如： 
  
```javascript
  let { type, name, value = 10 } = node;
```

  上述例子中声明的本地变量都与对象中的属性同名，**可以再给本地变量赋值时使用不同名称**
  
```javascript
  let node = {
    type: "string",
    name: "Mark"
  };
  let { type: localType, name: localName } = node;
```
  type: localType这种语法表示要读取对象名为type的属性，并把它的值存储在变量localType上。

  ### 11.1 嵌套的对象解构
  
```javascript
  let node = {
    type: "string",
    name: "Mark",
    value: {
      age: {
        num: 10
      }
    }
  };
  let { value: { age } } = node;
  console.log(age.num); //10
```

  上述例子的解构模式使用了花括号，表示在node对象的value属性内部去寻找age属性。每当有一个冒号在解构模式中出现，就意味着冒号之前的标识符代表代表要检查的位置，而冒号右侧则是赋值的目标，当冒号右侧存在花括号时，表示目标被嵌套在对象的更深一层中。

  ### 11.2 数组的解构赋值

    数组的解构赋值与对象的解构赋值类似，数组解构有一个独特的用例，能轻易的互换两个变量的值而不需要像ES5那样新建一个临时变量。

```javascript
  let a = 1,
      b = 2,
  [ a, b ] = [ b, a ];
  console.log(a)  //2
  console.log(b)  //1
```
  本例中数组解构赋值看起来像镜像，赋值语句右侧是为了互换而临时创建的数组字面量，b与a的值分别被复制到临时数组的第一个与第二个位置，并对该数组进行解构。

  同样的，数组解构也可以使用默认值

  ### 11.2.1 数组解构中的嵌套解构

  参考对象解构

  ### 11.2.2 剩余项

  **...** 语法来将剩余的项目赋值给一个指定的变量

```javascript
  let colors = [ "red", "green", "blue" ];
  let [ firstColor, ...restColor ] = colors;
  console.log(firstColor); //"red";
  console.log(restColor.length); //2;
  console.log(restColor[0]); //"green";
  console.log(restColor[1]); //"blue";
```
***剩余项必须是数组解构模式中最后的部分，之后不能再有逗号，否则就是语法错误***

***对象解构与数组解构能被用在一起***

***当给函数传递参数时也可以使用参数解构***

```javascript
  function setCookie(name, value, { path, domain, expires } = {}) {

  }
```
  此例为第三个参数提供了一个空对象作为其默认值


## 12. Object.defineProperty()

  待补充


## 13. Symbol 符号

  在JS已有的基本类型（字符串、数值、布尔类型、null、undefined）之外，ES6引入了一种新的基本类型： 符号（Symbol）。符号期初被设计用于创建对象私有成员，

```javascript
  let firstName = Symbol();
  let person = {};

  person[firstName] = "Mark";
  console.log(person[firstName]); //"Mark"
```

  **Symbol**函数还可以接收一个额外的参数用于描述符号值，该描述不用用来访问对应属性，但可以用来调试。

```javascript
  let firstName = Symbol("first name");
  let person = {};

  person[firstName] = "Mark";

  console.log(firstName);  //"Symbol(first name)"
```

  由于**Symbol**是基本类型的值，因此可以使用**typeof**运算符来判断一个变量是否为符号。

  ### 13.1 Symbol.for()  Symbol.keyFor()

  Symbol.for() 方法仅接受单个字符串类型的参数，作为目标符号值的标识符，同时此参数也会成为该符号的描述信息.

  Symbol.for() 方法首先会搜索全局符号注册表，看是否存在一个键值为 "uid" 的符号值。 若是，该方法会返回这个已存在的符号值；否则，会创建一个新的符号值，并使用该键值将 其记录到全局符号注册表中，然后返回这个新的符号值。这就意味着此后使用同一个键值去 调用 Symbol.for() 方法都将会返回同一个符号值

```javascript
  let uid = Symbol.for("uid"); 
  let object = { 
    [uid]: "12345" 
  };
  
  console.log(object[uid]); // "12345" 
  console.log(uid); // "Symbol(uid)" 
  
  let uid2 = Symbol.for("uid"); 
  console.log(uid === uid2); // true 
  console.log(object[uid2]); // "12345" 
  console.log(uid2); // "Symbol(uid)"
```

  Symbol.keyFor() 方法在全局符号注册表中根 据符号值检索出对应的键值

```javascript
  let uid = Symbol.for("uid"); 
  console.log(Symbol.keyFor(uid)); // "uid" 
  
  let uid2 = Symbol.for("uid"); 
  console.log(Symbol.keyFor(uid2)); // "uid" 
  
  let uid3 = Symbol("uid"); 
  console.log(Symbol.keyFor(uid3)); // undefined
```


## 14. 原型

  每个JavaScript对象（null除外）都与另一个对象相关联，“另一个对象”就是原型（ptototype），每个对象都从原型继承属性。对象以其原型为模板，从原型继承方法和属性，原型对象可可能拥有原型，并继承属性和方法，一层一层，以此类推。这种关系被称为原型链。
  每个函数都有 prototype 属性，除了 Function.prototype.bind()，该属性指向原型。

  每个对象都有 __proto__ 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]]，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 _proto_ 来访问。

  对象可以通过 __proto__ 来寻找不属于该对象的属性，__proto__ 将对象连接起来组成了原型链。

  ![prototype](./public/prototype.png)

  **prototype**是如何产生的

  当声明一个函数时，这个属性就会被自动创建

  ```javascript
    function Foo() {}
  ```

  这个属性的值是一个对象（原型），只有一个属性 `constructor`  
  `constructor`对应着构造函数，也就是`Foo`

  ### `__proto__`

  这是每个对象都有的隐式原型属性，指向了创造该对象的构造函数的原型。  
  因为在JS中没有类的概念，为了实现类似继承的方式，通过`__proto__`将对象和原型联系起来组成原型链，得以让对象可以访问不属于自己的属性。

  **实例对象的`__proto__`如何产生**  

  ```javascript
    function Foo() {}
    // 这个函数是 Function 的实例对象
    // function 就是一个语法糖
    // 内部调用 new Function()
  ```

  在 `new` 的过程中，新对象被添加了 `__proto__` 并且链接到了构造函数的原型上。  

  **new 的过程**

  1. 创建一个新对象，它继承自构造函数的prototype
  2. 构造函数被执行，同时上下文（this）会被指定为这个新对象
  3. 如果构造函数执行的返回结果是个“对象”，那么这个对象会被替代整个new出来的结果，如果构造函数没有返回对象，那么new出来的结果就是第一步创建的对象  

  ```javascript
    function new2(func) {
      var o = Object.create(func.protoype);
      var k = func.call(o);
      return typeof k === "object" ? k : o;
    }
  ```
  
  ### 总结

  * 所有对象都可以通过 `__proto__` 找到 `Object`  
  * 所有函数都可以通过 `__proto__` 找到 `Function`
  * `Function.prototype` 和 `Object.prototype` 是两个特殊的对象，它们是由引擎来创建的
  * 除了上面的两个对象，其它对象都是通过 `new` 出来的
  * 函数的 `prototype` 是一个对象，也就是原型
  * 对象的 `__proto__` 指向原型， `__proto__` 将对象和原型连接起来组成了原型链  

  
## 15. instanceof

  `instanceof` 是用来判断实例对象的 `__proto__` 属性和构造函数的 `prototype` 属性是不是同一个引用。 

  `instanceof` 的简单实现。  

  ```javascript
  function instanceof(left, right) {
    let prototype = right.prototype;
    let leftproto = left.__proto__;
    while(true) {
      if (leftproto === null) 
        return false
      if (leftproto === prototype) 
        return true
      leftproto = leftproto.__proto__
    }
  }
  ```   

  判断 `leftproto` 是不是强等于 `prototype`, 不等于就继续找 `leftproto.__proto__` 直到 `__proto__` 为null  


## 16. 闭包

  闭包的定义： 函数A返回一个函数B，并且函数B中使用了函数A的变量，函数B就被称为闭包。  

  ```javascript
  function A() {
    let a = 1;
    function B() {
      console.log(a)
    }
    return B
  }
  ```

  利用闭包解决 `var` 在循环中定义变量的问题  

  ```javascript
  for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i)
    }, i * 1000)
  }
  ```

  `setTimeout` 是一个异步函数， 所以会把同步的循环先执行完毕，这时 `i` 就是6了，所以会一直输出一堆6；  

  使用闭包解决方法一：  

  ```javascript
  for (var i = 1; i <= 5; i++) {
    (function(j) {
      setTimeout(function timer() {
        console.log(j);
      }, j * 1000);
    })(i);
  }
  ```

  方法二： 使用 `setTimeout` 的第三个参数  

  ```javascript
  for (var i = 0; i < 5; i++) {
    setTimeout(function timer(j) {
      console.log(j)
    }, i * 1000, i) //第三个参数i会被当作setTimeout中函数的参数
  }
  ```
  
  方法三： 使用 `let` 定义 `i`  

## 17. 深浅拷贝  

  可以通过 `Object.assign` 来解决  

  ```javascript
  let a = {
    age: 1
  }
  let b = Object.assign({}, a)
  a.age = 2
  console.log(b.age)  //1
  ```

  ### `Object.assign` 

  `Object.assign` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。并返回目标对象  

  ```javascript
  const target = { a: 1, b: 2 };
  const source = { b: 3, c: 4 };

  const returnedTarget = Object.assign(target, source);

  console.log(target); //{ a: 1, b: 3, c: 4 }

  console.log(returnedTarget); //{ a: 1, b: 3, c: 4 }
  ```

  `Object.assign(target, ...sources)`  

  `target` 目标对象。 `sources` 源对象  `返回值` 目标对象 

  `Object.assign` 方法只拷贝源对象自身并且可枚举的属性到目标对象，因为 `Object.assign` 拷贝的是属性值，针对深拷贝，假如源对象的属性值是一个对象的引用，那么他也只是那个引用。  

  **继承属性和不可枚举属性是不能被拷贝的**  

  ```javascript
  const obj = Object.create({ foo: 1 }, // foo 是一个继承属性
    bar: {
      value: 2  // bar 是一个不可枚举属性
    },
    baz: {
      value: 3,
      enumerable: true  // baz 是一个自身可枚举属性
    }
  )
  const copy = Object.assign({}, obj);
  console.log(copy);  // { baz: 3 }
  ```

  浅拷贝还可以通过展开运算符 (...) 来解决  

  ```javascript
  let a = {
    age: 1
  }
  let b = { ...a }
  a.age = 2;
  console.log(b.age)  // 1
  ```

  ### 深拷贝  

  深拷贝通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决  

  ```javascript
  let a = {
    age: 1,
    jobs: {
      first: "xxx"
    }
  }
  let b = JSON.parse(JSON.stringify(a))
  a.jobs.first = "zzz"
  console.log(b.jobs.first) // "xxx"
  ```

  该方法有局限性  

  *  会忽略 `undefined`
  *  会忽略 `symbol`
  *  不能序列化函数
  *  不能解决循环引用的对象

  ```javascript
  let obj = {
    a: 1,
    b: {
      c: 2,
      d: 3,
    },
  }
  obj.c = obj.b
  obj.e = obj.a
  obj.b.c = obj.c
  obj.b.d = obj.b
  obj.b.e = obj.b.c
  let newObj = JSON.parse(JSON.stringify(obj))
  console.log(newObj) // 会报错
  ```

  在遇到函数、 `undefined` 或者 `symbol` 的时候，该对象也不能正常的序列化  

  ```javascript
  let a = {
    age: undefined,
    sex: Symbol('male'),
    jobs: function() {},
    name: 'xxx'
  }
  let b = JSON.parse(JSON.stringify(a))
  console.log(b) // {name: "xxx"}
  ```

  `for .. in ..` 深拷贝,对象和数组

  ```javascript
  function deepcopy(target, source) {
    var target = target || {}
    for (var i in source) {
      if (typeof source[i] === "object") {
        target[i] = (source[i].constructor === "Array") ? [] : {}
        deepcopy(target[i], source[i])
      } else {
        target[i] = source[i]
      }
    }
    return target
  }
  ```

  如果所需拷贝的对象含有内置类型并且不包含函数，可以使用 `MessageChannel`  

  ```javascript
  let obj = {
    a: 1,
    b: 2,
    c: {
      c1: 1,
      c2: 2
    }
  }
  obj.d = c;
  
  function deepCopy(obj) {
    return new Promise((resolve) => {
      const {port1, port2} = new MessageChannel();
      port1.onmessage = ev => resolve(ev.data);
      port2.postMessage(obj);
    })
  }

  deepCopy(obj).then((res) => {
    console.log(res);
  })
  ```

  此方法可以深拷贝 `undefined` 和循环引用对象。但是当拷贝的对象有函数对象时还是会报错，可以用 **lodash** 函数库  


## 18. 模块化  

  在有 `Babel` 的情况下，可以使用 ES6 的模块化  

  ```javascript
  // file a.js
  export function a() {}
  export function b() {}

  // file b.js
  export default function () {}

  // file c.js
  import {a, b} from "./a.js"
  import xxx from "./b.js"
  ```

  ### `CommonJS`  

  `CommonJs` 是 Node 独有的规范，浏览器中需要使用到 `Browserify` 解析  

  ```javascript 
  // file a.js
  module.exports = {
    a: 1
  }

  // or
  export.a = 1

  // file b.js
  var module = require("./a,js")
  module.a  // 1
  ```

  在上述代码中， `module.exports` 和 `exports` 很容易混淆  

  `module` 和 `exports` 是 Node.js 给每个人 js 文件内置的两个对象，打印这两个对象  

  ```javascript
  console.log(module) // Module { ..., exports: {}, ... }
  console.log(exports) // {}
  ```

  从打印可以看出，`module.exports` 和 `exports` 一开始都是一个空对象，实际上这两个对象指向的是同一个内存地址。  

  但是， `require` 引入的对象本质上是 `module.exports` ，这就产生了一个问题，当 `module.exports` 和 `exports` 指向的不是同一个内存地址时， `exports` 就会失效。所以不能对 `exports` 直接赋值。  


  ```javascript
  module.exports = {
    name: "Mark"
  }

  exports = {
    name: "Mark1"
  }

  // main.js

  let people = require("./people.js")
  console.log(people) // {name: "Mark"}
  ```

  对于 `CommonJs` 和 ES6 中的模块化的区别  

  1. 前者支持动态导入， `require($(path)/xx.js)`, 后者不支持，但是已经有提案。
  2. 前者是同步导入，后者是异步导入。
  3. 前者在导出时是值的拷贝，就算导出的值变了，导入的值也不会啊，除非重新导入。后者采用的是实时绑定的方法，导入导出的值都指向同一个内存地址，所以导入的值会随导出的值变化。  
  4. 后者会编译成 `require/exports` 来执行。  


## 19. 防抖

  ### 防抖

  触发事件后在 n 秒内函数只执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行的时间  
  函数防抖分为 延迟执行 和 立即执行  

  延迟执行意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行的时间  

  ```javascript
  // func 是用户传入的需要防抖的函数
  // wait 是等待时间
  const debounce = (func, wait = 50) => {
    // 缓存一个定时器id
    let timer = 0;
    // 这里返回的函数是每次用户时间执行的函数
    // 如果已经设定了定时器就清空上一次的定时器
    // 开启一个新的定时器，延迟执行用户传入的方法
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, wait)
    }
  }
  // 用户在调用函数的间隔小于 wait 的情况下，上一次的时间还未到就被清除了，函数并不会执行
  ```

  带有立即执行参数 immediate 的防抖函数  

  ```javascript
  function debounce(func, wait = 50, immediate = true) {
    let timer, context, args;

    // 延迟执行函数
    const later = () => setTimeout(() => {
      // 延迟函数执行完毕，清空上一次的定时器序号
      timer = null
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = null
        args = null
      }
    }, wait)

    // 返回触犯后实际执行的函数
    return function (...params) {
      // 如果没有创建延迟执行函数 （later），就创建一个
      if (!timer) {
        timer = later()
        // 如果是立即执行，调用函数
        // 否则缓存参数和调用上下文
        if (immediate) {
          func.apply(this, params)
        } else {
          context = this
          args = params
        }
      } else {
        // 如果已经有了延迟函数，则清除原来的函数并重新设定一个定时器，延迟重新计时
        clearTimeout(timer);
        timer = later()
      }
    }
  }
  ```

  * 如果函数是立即执行的，就立即调用。如果函数是延迟执行的，就先缓存上下文和参数，放到延迟函数中去执行。一旦开始了一个定时器，并且定时器还在，每次点击都会清除当前定时器并重新计时。不点击后，定时器时间到，定时器被重置为 `null` ，就可以再次点击了。  


## 20. 节流  

节流与防抖动的本质是不一样的，防抖动是将多次执行变成最后一次执行，节流是将多次执行变成每隔一段时间执行。  

### 时间戳节流

```javascript
  let throttle = function (func, delay) {
    let pre = +Date.now();
    return function () {
      let context = this;
      let args = arguments;
      let now = +Date.now();
      if (now - pre >= delay) {
        func.apply(context, args);
        pre = +Date.now();
      }
    }
  }
```

### 定时器节流  

```javascript
let throttle = function (func, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args);
        timer = null;
      }, delay)
    }
  }
}
```

当触发事件时设置一个定时器，并执行函数，函数执行完成后重置定时器。再次触发事件时，判断定时器是否存在，如果存在则不执行函数。反之，设置一个定时器，执行函数。当最后一次停止执行函数后，由于定时器的 delay 延迟，可能下一次的函数还是会执行。  

### 时间戳+定时器节流  

```javascript
let throttle = function (func, delay) {
  let last, timer;
  return function () {
    let context = this;
    let args = argsments;
    let now = +Date.now();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        func.apply(context, args);
      }, delay)
    } else {
      last = now;
      func.apply(context, args);
    }
  }
}
```

## 21. 继承  

对象继承有5种方法  

1. 构造函数绑定  
2. prototype 模式  
3. 直接继承 prototype
4. 利用空对象作为中介继承 prototype
5. 对象拷贝  

### 构造函数绑定  

```javascript
function Animal() {
  this.species = "动物";
}
function Cat(name, color) {
  Animal.call(this, arguments);
  this.color = color;
  this.name = name;
}
```

### prototype模式  

如果“猫”的 prototype 对象指向 Animal 实例，那么所有“猫”的实例都能继承 Animal 了。  

```javascript
Cat.prototype = new Animal(); 
//  每个实例都有一个 constructor 属性
//  默认调用 prototype 对象的 constructor 属性
//  即 cat1.constructor == Cat.prototype.constructor
//  运行完上面一句后 Cat 实例的 constructor 指向了 Animal
//  这会导致继承链的紊乱，必须手动纠正
//  将 Cat 的 prototype 对象的 constructor 属性重新指向 Cat
Cat.prototype.constructor = Cat;
```

### 直接继承 prototype

```javascript
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
```

### 利用空对象继承 prototype  

```javascript
//  F 是空对象，几乎不占内存
//  不用向实例话 Animal 构造函数，节省内存
var F = function () {}
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;

//  封装成一个函数
function extend(child, parent) {
  var F = function () {};
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
}
```

### 对象拷贝  

参考之前的深浅拷贝


## 22. call、apply、bind 的区别  

`call` 和 `apply` 都是为了解决 `this` 的指向，作用都是相同的，只是传参的方式不同。  

除了第一个参数外， `call` 可以接受一个参数列表， `apply` 接受一个参数数组。  

```javascript
let a = {
  value: 1
}
function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
getValue.call(a, "Mark", "10");
getValue.apply(a, ["Mark", "10"]);
```

### 模拟实现 `call` `apply`  

* `call` 改变 `this` 的指向，指向传入的第一个参数
* 改变 `this` 的指向后，让新的对象可以执行该函数，思路可以变成给新的对象添加一个函数，然后执行完后删除这个函数  

```javascript
let foo = {
  value: 1
}

function bar() {
  console.log(this.value)
}

bar.call(foo)
```

**模拟实现第一步**  

把 foo 对象改造一下  

```javascript
let foo = {
  value: 1,
  bar: function () {
    console.log(this.value);
  }
}

foo.bar();
```

目前为止 `this` 指向了 foo ，相当于给 foo 添加了一个属性，用完可以删除掉这个属性。  

```javascript
foo.fn = bar; // 给 foo 添加一个属性
foo.fn(); // 执行这个属性
delete foo.fn;  // 删除这个属性
```

按照这个思路模拟重写 `call`  

```javascript
Function.prototype.call2 = function (context) {
  // context 为 call 函数的第一个参数，如果不传入默认为 window
  let context = context || window;
  // 获取调用 call2 的函数，this
  context.fn = this;
  // 执行函数
  context.fn();
  // 删除临时添加的属性
  delete context.fn;
}
```

上面的重写版本实现的是没有参数传入的情况  

重写带参数的 `call` 函数  

```javascript
Function.prototype.call3 = function (context) {
  let context = context || window;
  context.fn = this;
  // Array.from() 可以将类数组对象转变成真正的数组
  // Array.from().slice(1) 将 context 后面的参数取出来
  let args = Array.from(arguments).slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
}
```

**`apply` 的实现和 `call` 的实现类似**  

```javascript
Function.prototype.apply1 = function (context) {
  let context = context || window;
  context.fn = this;

  let result;
  // 判断是否存在第二个参数
  // apply 的第二个参数是一个数组，可以直接展开
  if (arguments[1]) result = context.fn(...arguments[1]);
  else context.fn();

  delete context.fn;
  return result;
}
```

**重写 `bind` 函数**  

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新的函数的 `this` 被指定为 `bind()` 的第一个参数，其余的参数将作为新函数的参数。  

```javascript
Function.prototype.bind1 = function (context) {
  // 只能是函数调用此方法，所以要进行判断
  // this 为调用这个方法的函数
  if (typeof this !== "function") {
    throw new TypeError(this + 'is not a function');
  }
  let _this = this;
  // 取出第一次传入的参数
  let args = Array.from(arguments).slice(1);
  // 返回一个新函数
  return function F() {
    // 取出返回的新函数中传递的参数
    let afterargs = Array.from(arguments).slice();
    // 因为 bind() 方法返回的是一个新的函数
    // 这个新的函数可能会被 new 出来一个实例
    // 新的实例执行的时候，之前重新绑定的 this 的指向就失效了
    // 判断返回函数是否被当作构造函数通过 new F() 创建一个实例
    // this 指的是创建的实例
    if (this instanceof F) return new _this(...args, ...afterargs);
    return _this.apply(context, args.concat(afterargs));
  }
}
```

## 23. `Promise` 实现  

`Promise` 是一种异步编程的解决方案。简单来说 `promise` 就是一个容器，里面装着某个未来才会结束的事件的结果， 从语法上来讲， `Promise` 是一个对象，从它可以获取异步操作的消息。  

`Promise` 的特点  

1. 对象的状态不受外界的影响。有三种状态 `pending` (进行中)、 `fulfilled` (已成功)、 `rejected` (已失败)。只有异步操作的结果可以决定当前是哪一种状态。  
2. 一旦状态改变，就不会再变。 `pending` -> `fulfilled` , `pending` -> `rejected` 。  

`Promise` 的缺点  

1. 无法取消，一旦新建就会立即执行，无法中途取消。
2. 如果不设置回调函数， `Promise` 内部抛出的错误，不会反应到外部。
3. 当处于 `pending` 状态时，无法得知目前进展到哪一步。

### `Promise.prototype.then()`  

`then` 方法的第一个参数是 `resolved` 状态的回调函数，第二个参数是（可选） `rejected` 状态的回调函数。  
采用链式的 `then`，前一个回调函数有可能返回的还是一个 `Promise` 对象，这时后一个回调函数就会等待该 `Promise` 对象的状态发生改变时才会被调用。  

```javascript
getJSON("/post/1.json").then(function (post) {
  return getJSON(post.url);
}).then(function (url) {
  console.log("resolved": url)
}, function (err) {
  console.log("rejected": err);
})
```

上面的代码中，第一个 `then` 返回会的另一个 `Promise` 对象。 这时第二个 `then` 方法指定的回调函数就会等这个新的 `Promise` 对象的状态发生改变。如果变成 `resolved` ,就调用第一个回调函数，反之调用第二个回调函数。  

### `Promise.prototype.catch()`  

`Promise.prototype.catch()` 是 `.then.(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数。  

```javascript
getJSON("/post/1.json").then(function (post) {
  return getJSON(post.url);
}).then(function (url) {
  // dosomething
}).catch(function (err) {
  // 处理前面三个 Promise 产生的错误
})
```

上述代码中，一共三个 Promise 对象，它们中任何一个抛出错误都会被最后一个 `catch` 捕获。  
建议总是要在 Promise 最后面添加 `catch` 方法。 
`catch` 方法返回的也是一个 Promise 对象，后面可以接 `catch` 或 `then` 方法。  

### `Promise.prototype.finally()`  

`finally` 方法不管 Promise 对象最后的状态如何，都会执行的操作。  

### `Promise.prototype.all()`  

`Promise.all()` 方法用于将多个 Promise 实例包装成一个新的 Promise 实例。  

```javascript
const p = Promise.all([p1, p2, p3]);
```

`Promise.all()` 方法接受一个数组作为参数，p1，p2，p3 都是 Promise 实例。  
`p` 的状态有 p1，p2，p3 决定。  
1. p1，p2，p3 的状态都为 `fulfilled`， `p` 的状态才会变成 `fulfilled` ，此时，p1，p2，p3，的返回值组成一个数组传递给 `p` 的回调函数。  
2. 只要 p1，p2，p3 之中有一个被 `rejected`, `p` 的状态就变成 `rejected`, 此时第一个被 `rejected` 的实例的返回值，会被传递给 `p` 的回调函数。  

如果作为参数的 Promise 实例自己定一个 `catch` 方法，那么它一旦被 `rejected`, 并不会触发 `Promise.all()` 的 `catch` 方法。  

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve("hello")
}).then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error("error!!")
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e))

// ["hello", Error: error!!]
```

上述代码中， p1 会 `resolved`, p2 首先会 `rejected`, 但是 p2 有自己的 `catch` 方法，该方法返回一个 Promise 实例， p2 实际上指向的就是这个实例， 该实例执行完 `catch` 方法后，也会变成 `resolved` 状态，导致 `Promise.all()` 中两个参数都进入到 `resolved` 状态，一次会调用 `then` 方法中的回调函数，而不会调用 `catch` 方法。 如果 p2 没有自己的 `catch` 方法，就会调用 `Promise.all()` 的 `catch` 方法。  


### `Promise.race()`  

该方法和 `Promise.all()` 方法类似，同样是将多个 Promise 实例包装成一个新的 Promise 实例。  

```javascript
const p = Promise.race([p1, p2, p3]);
```

上述代码中，只要 p1，p2，p3 之中有一个实例率先改变状态， `p` 的状态就改变。那个率先改变状态的 Promise 实例的返回值，就传递给 `p` 的回调函数。  

```javascript
const p = Promise.race([
  fetch("xxxxx"),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("reject timeout")), 5000)
  })
])

p.then(() => {
  
})
.catch(e => {
  console.log(e)
})
```

上面代码中，如果 5 秒内 fetch 方法无法返回结果，变量 `p` 的状态就会变成 `rejected`, 否则变成 `resolved`。  


### `Promise.allSettled()`  

`Promise.allSettled()` 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。当所有的参数实例都返回结果，不管是 `resolved` 还是 `rejected`，包装实例才会结束。 并且该包装实例一旦结束，状态总会是 `fulfilled`, 不会变成 `rejected`。  

```javascript
const promise = [fetch("xxxx"), fetch("xxxx")];

// Promise.allSettled() 方法返回的结果是一个数组
// 数组的每一个成员都是一个对象，每个对象对应方法的每个参数
// 每个对象都有 status 属性，该属性的只只可能是 fulfilled 或 rejected
// fulfilled 时，对象有 value 属性
// rejected 时，对象有 reason 属性
// 上述两个属性值对应两种状态的实例返回值
const result = await Promise.allSettled(promise);

// 过滤出成功的请求
const successPromise = result.filter(p => p.status === "fulfilled");

//过滤出失败的请求,并输出原因
const errors = result.filter(p => p.status === "rejected")
.map(p => p.reason)
```


### `Promise.any()` 

`Promise.any()` 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例，只要参数实例有一个变成 `fulfilled` ，包装实例就会变成 `fulfilled` 状态。如果所有参数实例都变成 `rejected` 状态，包装实例就会变成 `rejected` 状态。


## 24. `Generator` 实现  

`Generator` 函数有多种理解角度，语法上， `Generator` 函数是一个状态机，封装了多个内部状态。  
执行 `Generator` 函数会返回一个遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态。  
形式上， `Generator` 函数是一个普通函数，有两个特征。  

* `function` 关键字与函数名之间有一个星号。
* 函数体内部使用 `yield` 表达式，定义不同的内部状态 ( `yield` ‘产出’)  

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }
```

上面定义了一个 Generator 函数，内部有两个 yield 表达式，即该函数有三个状态： hello、 world 和 return 语句。  

调用 Generator 函数后，该函数并不会执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象。  
调用遍历器对象的 next 方法，使得指针指向该函数的下一个状态，也就是说每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始运行，直到遇到下一个 yield 表达式（或 return 语句）为止。Genaretor 函数是分段执行的， yield 表达式式暂停执行的标记，而 next 方法可以恢复执行。  

### next 方法的参数  

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

第一次运行时 `yield (x + 1)` 返回值是 6。  

第二次不带参数运行 next() 函数时导致 y 的值为 2 * undefined 即 NaN ，除以 3 后还是 NaN。因此返回的对象的 value 属性也是 NaN。  

第三次运行 next 方法时不带参数，所以 z 等于 undefined。所以结果为 5 + NaN + undefined，即 NaN。  

第二次调用 next 方法时传入了参数，将上一次 yield 表达式的值设定为参入的参数即 12，因此 y = 2 * 12，所以第二次调用 next 的值为 8。  

第三次调用 next 方法时将上次 yield 表达式的返回值设定为 13，即 yield(y / 3) 表达式的值为 13 （z =  13），因此 z = 13， x = 5， y = 24，所以 return 的值为 42。  


### for...of 循环  

`for...of` 循环可以自动遍历 Generator 函数运行时生成的遍历器对象，因此不需要调用 next 方法。  

```javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

一旦 next 方法返回的对象的 done 属性为 true, `for...of` 循环就会终止，且不包含该返回对象。  

```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```


## 25. Map、 FlatMap、 Reduce  

`Map`  

`Map()` 方法定义在 javascript 的 Array 中，它返回一个新的数组，这个新数组中的值为原始数组中的值调用函数后处理的值。  

```javascript
array.map(function callback(currentValue, index, arr) {}, thisArg)
```

`callback`  
  生成新数组元素的函数  
    `currentValue` 数组中正在处理的元素  
    `index` 正在处理的元素的索引  
    `arr` map 方法调用的数组  

`thisArg` 执行 callback 函数时值被用作 this  

```javascript
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// [1, 2, 3]
```

```javascript
var objArray = [
  {key: 1, value: 10},
  {key: 2, value: 20},
  {key: 3, value: 30}
]

var reformatObj = objArray.map(function (obj) {
  var newObj = {};
  newObj[obj.key] = obj.value;
  return newObj;
})

// [{1: 10}, {2: 20}, {3: 30}]
```

`FlatMap`  

FlatMap 和 Map 的作用几乎相同，但是对于多位数组来说，会将原数组降维。

```javascript
[1, [2], 3].flatMap((v) => v + 1)

// [2, 3, 4]
```

`reduce`  

将数组中的每一个元素执行一个reduce中的函数，其结果汇总为单个返回值。  

reduce 为数组中的每一个元素依次执行 callback 函数，不包括被删除的元素和未被赋值的元素，函数接受四个参数：  

* accumulator 累计器
* currentValue 当前值  
* currentIndex 当前索引 
* array 愿数组  

回调函数执行时，如果提供了 initialValue ，那么 accumulator 的取值为 initialValue， currentValue 取数组中的第一个值，如果没有提供 initialValue 那么 accumulator 取数组中的第一个值。currentValue 取数组中的第二个值。  

如果空数组没有 initialValue 则会抛出 TypeError 。如果数组中只有一个元素，且没有提供 initialValue 则 callback 不会执行，这个元素会被返回。如果提供了 initialValue 但是数组为空，那么 callback 不会执行，此唯一值会被返回。  


```javascript
const array1 = [1, 2, 3, 4]
const reducer = (accumulator, currentValue) => accumulator + currentValue

console.log(array1.reduce(reducer)) // 10  1 + 2 + 3 + 4

console.log(array1.reduce(reducer, 5)) // 15 5 + 1 + 2 + 3 + 4
```


## 26. async 和 await  

一个函数如果加上 async ，那么该函数就会返回一个 Promise  

```javascript
async function test() {
  return '1'
}

console.log(test()) // Promise {<resolved>: "1"}
```

可以把 async 看成将函数返回值使用 Promise.resolve() 包裹了下。  

```javascript
function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("finish")
      resolve("sleep")
    }, 2000)
  })
}

async function test() {
  await sleep()
  console.log("object")
}

// finish
// object
```

因为 await 会等待 sleep 函数 resolve， 所以即使后面是同步函数，也不会先执行同步函数再执行异步函数。  

await 可能会导致性能问题， 因为 awiat 会阻塞代码。  

```javascript
var a = 0
var b = async () => {
  a = a + await 10
  console.log('2', a)  // '2' 10
  a = (await 10) + a
  console.log('3', a)  // '3' 20
}

b()
a++
console.log('1', a)  // '1' 1
```

* 首先函数 b 先执行，函数 b 是一个异步函数，在执行到 await 10 之前变量 a 还是 0
* 因为 await 是异步操作，遇到 await 就会立即返回一个 pending 状态的 Promise 对象，暂时返回代码的控制权，使得函数外的代码得以继续执行，所以会先执行 `console.log('1', a)`  
* 同步的代码执行完毕，开始执行异步代码  


## 27. Proxy

ES6 中新增的功能，用来自定义对象中的操作。  

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此这种拦截机制可以对外界的访问进行过滤和改写。可以理解为“代理”。  

```javascript
var proxy = new Proxy(target, handler)
```

* `target` 参数表示要拦截的目标对象
* `handler` 参数是一个对象，用来定制拦截行为  

```javascript
var proxy = new Proxy({}, {
  get: function (target, propKey) {
    return 35;
  }
})

proxy.time  // 35
proxy.name  // 35
```

上述代码中， `Proxy` 接受两个参数，第一个参数就是要代理的对象，第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。上述方法中配置对象有一个 get 方法，用来拦截对目标对象属性的访问请求， get 方法的两个参数分别为目标对象和所要访问的属性。  

```javascript
let handler = {
  get: function (target, propKey) {
    return propKey in target ? target[propKey] : 37;
  }
}

let p = new Proxy({}, handler)

p.a = 1
p.b = 2

console.log(p.a, p.b)  // 1 2

console.log('c' in p, p.c)  // false 37
```

上述例子中，当对象不存在某一个属性时，返回值为 37  

通过代理可以轻松的验证向一个对象的传值，如下面的例子  

```javascript
var validator = {
  set: function (target, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer");
      }
      if (value > 200) {
        throw new TypeError("The age seems invalid");
      }
    }

    target[prop] = value;

    return true;
  }
}

var person = new Proxy({}, validator);

person.age = 100;

console.log(person.age);  // 100

person.age = "young";  // Uncaught TypeError: The age is not an integer
```











  
  
  
  
  
  
  
