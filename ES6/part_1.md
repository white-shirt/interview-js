
## 解构赋值  

ES6 允许按照一定的模式，从数组和对象中提取值，对变量进行赋值。这种成为解构。  

### 数组解构赋值

```javascript
let [a, b, c] = [1, 2, 3];

//本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

### 对象解构赋值

```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

//对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```javascript
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello
```

与数组一样，解构也可以用于嵌套结构的对象。

```javascript
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"

// 注意，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

### 字符串的解构赋值  

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```


## 数值的扩展  

`Number.isFinite()` 用来检查一个数值是否为有限的（finite），即不是Infinity。  
`Number.isNaN()` 用来检查一个值是否为NaN。  
ES6 将全局方法 `parseInt()` 和 `parseFloat()`，移植到Number对象上面，行为完全保持不变。  
`Number.isInteger()` 用来判断一个数值是否为整数。  
ES6 引入了 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` 这两个常量，用来表示这个范围的上下限。  
`Number.isSafeInteger()` 则是用来判断一个整数是否落在这个范围之内。  

### Math.trunc()  

`Math.trunc` 方法用于去除一个数的小数部分，返回整数部分。  
对于非数值，`Math.trunc` 内部使用 `Number` 方法将其先转为数值。  
对于空值和无法截取整数的值，返回 `NaN`。  

### Math.sign()  

`Math.sign` 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。  
* 参数为正数，返回+1；
* 参数为负数，返回-1；
* 参数为 0，返回0；
* 参数为-0，返回-0;
* 其他值，返回NaN。


## 函数的扩展  

函数的 length 属性  

指定了默认值以后，函数的 `length` 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length` 属性将失真。  

```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

### 作用域  

```javascript
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

上面代码中，参数 `y` 的默认值等于变量 `x`。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数 `x`，而不是全局变量 `x`，所以输出是2。  

```javascript
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

上面代码中，函数 `f` 调用时，参数 `y = x` 形成一个单独的作用域。这个作用域里面，变量 `x` 本身没有定义，所以指向外层的全局变量 `x`。函数调用时，函数体内部的局部变量x影响不到默认值变量 `x`。 

```javascript
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined
```

如果此时，全局变量x不存在，就会报错。  

```javascript
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined
```

上面代码中，参数 `x = x` 形成一个单独作用域。实际执行的是 `let x = x`，由于暂时性死区的原因，这行代码会报错”x 未定义“。  


```javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```

上面代码中，函数 `foo` 的参数形成一个单独作用域。这个作用域里面，首先声明了变量 `x`，然后声明了变量 `y`，`y` 的默认值是一个匿名函数。这个匿名函数内部的变量 `x`，指向同一个作用域的第一个参数 `x`。函数 `foo` 内部又声明了一个内部变量 `x`，该变量与第一个参数 `x` 由于不是同一个作用域，所以不是同一个变量，因此执行 `y` 后，内部变量 `x` 和外部全局变量 `x` 的值都没变。  

如果将 `var x = 3` 的 `var` 去除，函数 `foo` 的内部变量x就指向第一个参数 `x` ，与匿名函数内部的 `x` 是一致的，所以最后输出的就是 `2` ，而外层的全局变量 `x` 依然不受影响。  
```javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```


### rest 参数  

`...变量名`  

用于获取函数的多余参数，这样就不需要使用 `arguments` 对象了。`rest` 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。  

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10

// 上面代码的add函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。
```

```javascript
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

`arguments` 对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用`Array.prototype.slice.call` 先将其转为数组。`rest` 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。  

注意，`rest` 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。  


### name 属性  

函数的name属性，返回该函数的函数名。  

```javascript
function foo() {}
foo.name // "foo"
```

### 箭头函数  

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。  

```javascript
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

**使用注意点**  

* 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象。
* 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。
* 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
* 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。

箭头函数可以让 `this` 指向固定化，这种特性很有利于封装回调函数。下面是一个例子，`DOM` 事件的回调函数封装在一个对象里面。  

```javascript
var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
```

上面代码的 `init` 方法中，使用了箭头函数，这导致这个箭头函数里面的 `this`，总是指向 `handler` 对象。否则，回调函数运行时，`this.doSomething` 这一行会报错，因为此时this指向 `document` 对象。  

`this` 指向的固定化，并不是因为箭头函数内部有绑定 `this` 的机制，实际原因是箭头函数根本没有自己的 `this`，导致内部的 `this` 就是外层代码块的 `this`。正是因为它没有 `this`，所以也就不能用作构造函数。  
所以，箭头函数转成 ES5 的代码如下。  

```javascript
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

```javascript
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```

上面代码之中，只有一个 `this`，就是函数 `foo` 的 `this`，所以 `t1、t2、t3` 都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的 `this`，它们的this其实都是最外层 `foo` 函数的 `this`。  


### 不适用场合  

第一个场合是定义对象的方法，且该方法内部包括 `this`。  

```javascript
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
```

上面代码中，`cat.jumps()` 方法是一个箭头函数，这是错误的。调用 `cat.jumps()` 时，如果是普通函数，该方法内部的 `this` 指向 `cat` ；如果写成上面那样的箭头函数，使得 `this` 指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致 `jumps` 箭头函数定义时的作用域就是全局作用域。  

第二个场合是需要动态 `this` 的时候，也不应使用箭头函数。  

```javascript
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
```

上面代码运行时，点击按钮会报错，因为 `button` 的监听函数是一个箭头函数，导致里面的 `this` 就是全局对象。如果改成普通函数，`this` 就会动态指向被点击的按钮对象。  

### 嵌套的箭头函数


```javascript
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]

// 改写成箭头函数

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]
```


## 数组的扩展  

### 扩展运算符  

扩展运算符（spread）是三个点（ `...` ）。它好比 `rest` 参数的逆运算，将一个数组转为用逗号分隔的参数序列。  

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

扩展运算符后面还可以放置表达式。  

```javascript
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
```

### 替代函数的 apply 方法  

```javascript
// ES5 的写法
// apply 的第二个参数为数组
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
```

上面代码中，由于 `JavaScript` 不提供求数组最大元素的函数，所以只能套用 `Math.max` 函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用 `Math.max` 了。  

```javascript
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
```

### 扩展运算符的应用  

1. 复制数组  

```javascript
// ES5
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

//ES6
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

2. 合并数组  

```javascript
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

3. 与解构赋值结合  

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。  

```javascript
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

4. 字符串  

```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

### Array.from()  

`Array.from` 方法用于将两类对象转为真正的数组：类似数组的对象（`array-like object`）和可遍历（`iterable`）的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）。  

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

所谓类似数组的对象，本质特征只有一点，即必须有 `length` 属性。因此，任何有 `length` 属性的对象，都可以通过 `Array.from` 方法转为数组，而此时扩展运算符就无法转换。  

```javascript
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```

`Array.from` 还可以接受第二个参数，作用类似于数组的 `map` 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。  

```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

### Array.of()  

`Array.of` 方法用于将一组值，转换为数组。  

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

`Array.of` 基本上可以用来替代 `Array()` 或 `new Array()` ，并且不存在由于参数不同而导致的重载。它的行为非常统一。  

```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

// Array方法没有参数、一个参数、三个参数时，返回结果都不一样。

Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]

// Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
```

### 数组实例的 copyWithin()  

数组实例的 `copyWithin()` 方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。  

```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

它接受三个参数。  

* target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
* start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
* end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

### 数组实例的 find() 和 findIndex()  

数组实例的 `find` 方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 `true` 的成员，然后返回该成员。如果没有符合条件的成员，则返回 `undefined`。  

```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

上面代码中，`find` 方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。  

数组实例的 `findIndex` 方法的用法与 `find` 方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回 `-1`。  

```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

```javascript
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

上面的代码中，`find` 函数接收了第二个参数 `person` 对象，回调函数中的 `this` 对象指向  `person` 对象。  

### 数组实例的 fill()  

`fill` 方法使用给定值，填充一个数组。  

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

`fill` 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。  

```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

### 数组实例的 entries()，keys() 和 values()  

`ES6` 提供三个新的方法—— `entries()`，`keys()` 和 `values()` ——用于遍历数组。它们都返回一个遍历器对象，可以用 `for...of` 循环进行遍历，唯一的区别是 `keys()` 是对键名的遍历、`values()` 是对键值的遍历，`entries()` 是对键值对的遍历。  

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

### 数组实例的 includes()  

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

```javascript
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

### 数组实例的 flat()，flatMap()  

数组的成员有时还是数组，`Array.prototype.flat()` 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。  

```javascript
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```

`flat()` 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将 `flat()` 方法的参数写成一个整数，表示想要拉平的层数，默认为1。  
如果不管有多少层嵌套，都要转成一维数组，可以用 `Infinity` 关键字作为参数。  
如果原数组有空位，`flat()` 方法会跳过空位。  


`flatMap()` 方法对原数组的每个成员执行一个函数（相当于执行 `Array.prototype.map()` ），然后对返回值组成的数组执行 `flat()` 方法。该方法返回一个新数组，不改变原数组。  

```javascript
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
```

`flatMap()` 只能展开一层数组。  



## 对象的扩展  

### 属性的可枚举性和遍历  

#### 可枚举性  

对象的每个属性都有一个描述对象（`Descriptor`），用来控制该属性的行为 `Object.getOwnPropertyDescriptor` 方法可以获取该属性的描述对象。  

```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

描述对象的 `enumerable` 属性，称为“可枚举性”，如果该属性为 `false` ，就表示某些操作会忽略当前属性。  

* `for...in` 循环：只遍历对象自身的和继承的可枚举的属性。
* `Object.keys()` ：返回对象自身的所有可枚举的属性的键名。
* `JSON.stringify()` ：只串行化对象自身的可枚举的属性。
* `Object.assign()` ： 忽略 `enumerable` 为 `false` 的属性，只拷贝对象自身的可枚举的属性。  

```javascript
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
```

上面代码中，`toString` 和 `length` 属性的 `enumerable` 都是 `false` ，因此 `for...in` 不会遍历到这两个继承自原型的属性。  

#### 属性的遍历  

* `for...in` 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
* `Object.keys(obj)` 包括对象自身的（不含继承的）所有可枚举属性（不含 `Symbol` 属性）的键名。
* `Object.getOwnPropertyNames(obj)` 返回一个数组，包含对象自身的所有属性（不含 `Symbol` 属性，但是包括不可枚举属性）的键名。
* `Object.getOwnPropertySymbols(obj)` 返回一个数组，包含对象自身的所有 `Symbol` 属性的键名。
* `Reflect.ownKeys(obj)` 返回一个数组，包含对象自身的所有键名，不管键名是 `Symbol` 或字符串，也不管是否可枚举。  


### super 关键字  

ES6 又新增了另一个类似的关键字 `super` ，指向当前对象的原型对象。  

```javascript
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

上面代码中，对象 `obj.find()` 方法之中，通过 `super.foo` 引用了原型对象 `proto` 的 `foo` 属性。  
注意，`super` 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。  


## 链判断运算符  

编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取 `message.body.user.firstName`，安全的写法是写成下面这样。  

```javascript
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
```

这样的层层判断非常麻烦，因此 ES2020 引入了“链判断运算符”（optional chaining operator）`?.`，简化上面的写法。  

```javascript
const firstName = message?.body?.user?.firstName || 'default';
```

链判断运算符有三种用法。  
* `obj?.prop` // 对象属性
* `obj?.[expr]` // 同上
* `func?.(...args)` // 函数或对象方法的调用  



## 对象的新增方法  

### Object.is()  

`Object.is` 用来比较两个值是否严格相等，与严格比较运算符（ `===` ）的行为基本一致。  

```javascript
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```

### Object.assign()  

`Object.assign` 方法用于对象的合并，将源对象（ `source` ）的所有可枚举属性，复制到目标对象（ `target` ）。  
`Object.assign` 方法的第一个参数是目标对象，后面的参数都是源对象。  


```javascript
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

#### 数组的处理  

```javascript
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```

上面代码中，`Object.assign`把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。  

#### 取值函数的处理

```javascript
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```

上面代码中，`source` 对象的 `foo` 属性是一个取值函数，`Object.assign` 不会复制这个取值函数，只会拿到值以后，将这个值复制过去。  

#### 克隆对象  

```javascript
function clone(origin) {
  return Object.assign({}, origin);
}
```

采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。  

```javascript
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

### Object.getOwnPropertyDescriptors()  

返回指定对象所有自身属性（非继承属性）的描述对象。  

```javascript
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

### __proto__属性  

`__proto__` 属性（前后各两个下划线），用来读取或设置当前对象的 `prototype` 对象。目前，所有浏览器（包括 IE11）都部署了这个属性。  

```javascript
// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```

### Object.setPrototypeOf()  

`Object.setPrototypeOf` 方法的作用与 `__proto__` 相同，用来设置一个对象的 `prototype` 对象，返回参数对象本身。它是 `ES6` 正式推荐的设置原型对象的方法。  

```javascript
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);

// 该方法等同于下面的函数。
function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

```javascript
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```

### Object.getPrototypeOf()  

该方法与 `Object.setPrototypeOf` 方法配套，用于读取一个对象的原型对象。  

如果参数不是对象，会被自动转为对象。  

```javascript
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true
```

### Object.keys()，Object.values()，Object.entries()   

#### Object.keys()  

返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

ES2017 引入了跟 `Object.keys` 配套的 `Object.values` 和 `Object.entries` ，作为遍历一个对象的补充手段，供 `for...of` 循环使用。  

```javascript
let { keys, values, entries } = Object;

let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

#### Object.values()  

返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。  

`Object.values` 只返回对象自身的可遍历属性。  

```javascript
const obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []
```

因为 `p` 的属性描述对象的 `enumerable` 默认是 `false` ，`Object.values` 不会返回这个属性。只要把 `enumerable` 改成 `true` ，`Object.values` 就会返回属性p的值。  

```javascript
const obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]
```

#### Object.entries()  

返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。  

```javascript
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

`Object.entries()` 的实现。  

```javascript
// Generator
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}

// 非Generator
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}
```

### Object.fromEntries()  

`Object.fromEntries()` 方法是 `Object.entries()` 的逆操作，用于将一个键值对数组转为对象。  

```javascript
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 `Map` 结构转为对象。  

```javascript
// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
```

该方法的一个用处是配合 `URLSearchParams` 对象，将查询字符串转为对象。  

```javascript
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```


## Symbol  

ES6 引入的原始数据类型，表示独一无二的值  

```javascript
let a1 = Symbol()
let a2 = Symbol()

console.log(a1 === a2)  // false

// Symbol.for 接受一个字符串作为参数，然后搜索有没有以这个参数作为名称的 Symbol 值，如果有就返回这个 Symbol 值，如果没有就在全局注册一个以该字符串为名称的 Symbol 值
let a3 = Symbol.for("a3")
let a4 = Symbol.for("a3")

console.log(a3 === a4)  // true
```

### 作为属性名的 Symbol  

由于每个 Symbol 值都是不想等的，这意味着 Symbol 的值可以作为标示符用于对象的属性名，就能保证不会出现同名的属性。可以防止某一个键被覆盖或改写。  

```javascript
let mySymbol = Symbol()

// 第一种写法 

let a = {}
a[mySymbol] = "hello"

// 第二种写法

let a = {
  [mySymbol]: "hello"
  // mySymbol 必须放在方括号中，如果不放在方括号中，该属性的键名就是 mySymbol，而不是 mySymbol 代表的值。
}

// 第三种写法  

Object.defineProperty(a, mySymbol, { value: "hello" })
```

### Symbol.for()  Symbol.keyFor()  

有时希望重新使用一个 Symbol 值，Symbol.for() 方法可以做到这点。  

Symbol.for() 和 Symbol() 这两种写法，都会生成新的 Symbol，区别在于，前者会被登记在全局环境中供搜索，后者不会。  
调用 Symbol.for("a") 30 次，每次都会返回同一个 Symbol 值，但是调用 Symbol("a") 30 次，会返回 30 个不同的 Symbol 值。  

Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的 key。  

```javascript
let a1 = Symbol.for("foo")

Symbol.keyFor(a1)  // "foo"

let a2 = Symbol("foo")

Symbol.keyFor(a2) // undefined

// 因为 a2 属于未登记的 Symbol 值，所以返回的是 undefined 
```



