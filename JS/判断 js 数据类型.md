# 判断 JS 数据类型  

## 1. typeof()  

对于原始数据类型可以用 typeof()， 引用类型全部返回 object  

## 2. instanceof  

## 3. Object.prototype.toString.call()  

可以通用的来判断原始数据类型和引用数据类型  

```javascript
var arr = [];  
Object.prototype.toString.call(arr) == "[object Array]";        //true  
  
var func = function(){};  
Object.prototype.toString.call(func) == "[object Function]";   //true 
```  

## 4. constructor  

```javascript
console.log([].constructor == Array);  
console.log({}.constructor == Object);  
console.log("string".constructor == String);  
console.log((123).constructor == Number); 
```