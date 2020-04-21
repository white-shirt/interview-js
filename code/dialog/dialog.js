(function () {
    
    class Dialog {
        constructor(options) {
            for (let key in options) {
                if (!options.hasOwnProperty(key)) break;
                this[key] = options[key];
            }
            this.init();
        }
        init() {
            if (this.status === 'message') {
                this.createMessage();
                this.open();
                return;
            }
        }
        createMessage() {
            this.messageBox = document.createElement('div');
            this.messageBox.className = `dp-message dp-${this.type}`;
            this.messageBox.innerHTML = `
                ${this.message}
                <i class='dp-close'>X<i>
            `
            document.body.appendChild(this.messageBox);
            this.messageBox.onclick = ev => {
                let target = ev.target;
                if (target.className = 'dp-close') {
                    this.close();
                }
            }

            
        }
        createDialog() {

        }
        open() {
            if (this.status === 'message') {
                // 创建元素与修改样式的代码是相连的，会等样式修改完后在渲染，所以阻断渲染机制
                this.messageBox.offsetHeight;
                let messageBox = document.querySelectorAll('.dp-message'),
                    len = messageBox.length;
                    console.log(len)
                this.messageBox.style.top = `${len === 1 ? 20 : 20 + (len - 1) * (20 + this.messageBox.offsetHeight)}px`;
                this.autoTimer = setTimeout(() => {
                    this.close();
                }, this.duration)
                return;
            }

        }
        close() {
            if (this.status === 'message') {
                clearTimeout(this.autoTimer);
                this.messageBox.style.top = '-200px';
                let _anonymous = () => {
                    document.body.removeChild(this.messageBox);
                    this.messageBox.removeEventListener('transitionend', _anonymous)
                }
                this.messageBox.addEventListener('transitionend', _anonymous)
                return;
            }
        }
    }

    // 匿名空函数
    let _anonymous = Function.prototype;

    window.messagePlugin = function messagePlugin(options = {}) {
        // init params
        if (options.constructor === String) {
            options = {
                message: options
            }
        }
        options = Object.assign({
            status: 'message',
            message: '',
            type: 'info',
            duration: 3000,
            oninit: _anonymous,
            onopen: _anonymous,
            onclose: _anonymous
        }, options)

        return new Dialog(options);
    }

    window.dialogPlugin = function dialogPlugin(options = {}) {
        return new Dialog(options);
    }
})();