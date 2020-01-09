


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

  
  
  
  
  


  
  
  
  
  
  
  
