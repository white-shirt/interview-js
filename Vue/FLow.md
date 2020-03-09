# 基本类型的类型标注语法  

```javascript
// @flow
const a: string = 'zhihu'
const b: number = 5
const c: boolean = false
const d: void = undefined
const e: null = null
```

# 函数类型标注  

```javascript
// @flow
// 函数声明
function getLength(str: string): number {
  return str.length
}
// 函数表达式
const greeting = function(welcome: string): void {
  console.log(welcome)
}
// 箭头函数
const addNumber = (a: number, b: number): number => a + b
```

# 数组类型标注  

```javascript
// @flow
const names: Array<string> = ['a', 'b', 'c']
const ages: number[] = [1, 2, 3, 4]

const recordItem: [number, string, boolean] = [1, 'First', true]
```  

# 对象类型的标注  

```javascript
// @flow
type BorderConfigType = {
  width: number,
  color: string,
  hasShadow: boolean
}

const borderConfig: BorderConfigType = {
  width: 10,
  color: 'red',
  hasShadow: true
}
```  

type 是 Flow 中的关键字，用来定义自定义的类型，并且可以在后面的类型标注中使用。  

```javascript
// @flow
type StringType = string;
const name: StringType = ‘zhihu’;

type TupleType = [ number, string ]
const record: TupleType = [ 1, ‘a’ ]
```  

# 类的标注  

Flow 支持对 ES6 中的类进行类型标注：包括类的属性和方法；类中用到的属性必须额外添加类型标注，并且是在与方法同一个层级（而不是在方法体内部）。  

```javascript
// @flow
class WrongClass1{
  method(){
    this.props = 1; // Flow 会报错，因为没有对 props 进行类型标注
  }
}

class WrongClass2{
  method(){
    this.props: number = 1; // Flow 还是会报错，对属性的类型标注必须与方法同一个层级
  }
}

class RightClass {
 props: number;            // 对，就像这样。
 method(){
   this.props = 1;
 }
}

class MyClass{}
const mc: MyClass = new MyClass();
```

# 使用Flow的优点  

* 轻且易学易用，它的学习曲线没有TypeScript来得高，虽然内容也很多，但半天学个大概，就可以渐进式地开始使用
* Flow从头到尾只是个检查工具，不是新的程序语言或超集语言，所以它可以与各种现有的JavaScript代码兼容，如果你哪天不想用了，就去除掉标记就是回到原来的代码，没什么负担
