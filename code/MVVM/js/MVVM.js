
// 消息订阅器
class Dep {
    constructor() {
        this.subs = []; // 存放所有的 watcher
    }
    // 订阅
    addSub(watcher) {  // 添加 watcher
        this.subs.push(watcher);
    }
    // 发布
    notify() {
        this.subs.forEach(watcher => watcher.update());    
    }
}

// 观察者
class watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 默认先存放一个老值
        this.oldValue = this.get()
    }
    get() {
        Dep.target = this;
        let value = CompileUtil.getVal(this.vm, this.expr);
        Dep.target = null;
        return value;
    }
    update() {  // 更新操作，数据变化后 会调用观察者的 update 方法
        let newVal = CompileUtil.getVal(this.vm, this.expr);
        if (newVal !== this.oldValue) {
            this.cb(newVal);
        }
    }
}


class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data();
        let computed = options.computed;
        // 如果存在根元素 编译模板
        if (this.$el) {
            for (let key in computed) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this);
                    }
                })
            }
            this.proxyVm(this.$data);
            // 用 Object.defineProperty 来做数据劫持
            new Observer(this.$data);
            new Compiler(this.$el, this)
        }
    }
    proxyVm(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                }
            })
        }
    }
}

// 数据监听
class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        if (data && typeof data == 'object') {
            for (let key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }        
    }
    defineReactive(obj, key, value) {
        this.observer(value);
        // 给每个属性都加上发布订阅功能
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: (newValue) => {
                if (newValue != value) {
                    this.observer(newValue);
                    value = newValue;
                    dep.notify()
                }
            }
        })
    }
}

// 编译模板 
class Compiler {
    constructor(el, vm) {
        // 判断 el 是不是一个元素， 如果不是就获取它
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        // 把当前节点中的元素获取后放到内存中
        this.vm = vm;
        let fragment = this.node2fragment(this.el);
        // 把节点中数据绑定的内容进行替换
        // 编译模板 
        this.compile(fragment);
        // 把替换好内容的节点重新放入页面渲染
        this.el.appendChild(fragment);
    }
    isElementNode(node) {   // 判断是不是元素
        return node.nodeType === 1;
    }
    node2fragment(node) {   // 将dom节点放入 内存中
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = node.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    isDirective(attrName) { // 判断是否是 指令
        return attrName.startsWith('v-');
    }
    compileElement(node) {  // 编译元素
        let attributes = node.attributes; //  类数组
        [...attributes].forEach(attr => {
            let { name, value: expr } = attr;
            //  判断是不是 带 v-model v-html v-bind 等 指令
            if (this.isDirective(name)) {
                let [,directive] = name.split('-');
                let [directiveName,EventName] = directive.split(':');
                // 需要调用不同的指令来处理
                CompileUtil[directiveName](node, expr, this.vm, EventName);     
            }  
        })
    }
    compileText(node) { // 编译文本 判断当前文本节点内容中是否包含 {{}}
        let content = node.textContent;
        if (/\{\{(.+?)\}\}/.test(content)) {
            CompileUtil['text'](node, content, this.vm)         
        }
    }
    // 核心编译方法
    compile(node) { // 编译内存中的dom节点
        // 获取文档碎片中子节点集合
        let childNodes = node.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child)
                // 如果是元素的话 再去遍历该元素的子节点
                this.compile(child);
            } else {
                this.compileText(child)
            }
        })
    }
}

CompileUtil = {
    getVal(vm, expr) {  // 根据 {{}} 中的表达式取出对应的数据
        // school.name  vm.$data.school.name
        return expr.replace(/(^\s*)|(\s*$)/g, "").split('.').reduce((data, current) => {
            return data[current];
        }, vm.$data);
    },
    setValue(vm, expr, value) {
        expr.replace(/(^\s*)|(\s*$)/g, "").split('.').reduce((data, current, index, arr) => {
            if (index == arr.length - 1) {
                data[current] = value;
            }
            return data[current];
        }, vm.$data);    
    },
    model(node, expr, vm) { // node 是节点 expr 是 {{}} 中的表达式 vm 是当前 Vue 实例
        // node.value
        let fn = this.updater['modelUpdater'];
        // 给输入框添加一个 观察者 watcher
        new watcher(vm, expr, (newVal) => { // 如果数据更新了会触发此方法，会拿新值给输入框赋值
            fn(node, newVal);    
        })
        node.addEventListener('input', (e) => {
            let value = e.target.value;
            this.setValue(vm, expr, value);
        })
        let value = this.getVal(vm, expr);
        fn(node, value);
    },
    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, () => {
            alert(expr)
        })    
    },
    html() {
        // node.innerHTML

    },
    getContentValue(vm, expr) {
        // 遍历表达式，将内容重新替换成一个完整的内容，返回
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1]);    
        })
    },
    text(node, expr, vm) {  // {{a}} {{b}}
        let fn = this.updater["textUpdater"];
        // replace 可以指定一个函数作为第二个参数。
        // 在这种情况下，当匹配执行后，该函数就会执行。 
        // 函数的返回值作为替换字符串。
        // 另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。
        // 函数中的参数为一个数组 数组的第二个参数为匹配到的字符串 school.name
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            // 表达式中的每个 {{}} 都加上观察者 任意一个 {{}} 中的值发生变化都触发更新
            new watcher(vm, args[1], () => {
                // 将同一个节点中多个表达式的值全部取出来，再更新视图
                fn(node, this.getContentValue(vm, expr));
            })
            return this.getVal(vm, args[1]);
        })
        fn(node, content);
    },
    updater: {  //  把数据插入到节点中
        modelUpdater(node, value) {
            node.value = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        },
        textUpdater(node, value) {
            node.textContent = value;
        }
    }
}