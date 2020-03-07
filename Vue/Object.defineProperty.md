# Object.defineProperty的缺陷  

1. Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应  
2. Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。  
3. Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。  

# Proxy的优势  

1. Proxy可以直接监听对象而非属性  
2. Proxy可以直接监听数组的变化  
3. Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的  
4. Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改  
5. Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利