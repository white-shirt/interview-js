const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        // 存放成功时的回调
        this.onResolveCallbacks = [];
        // 存放失败时的回调
        this.onRejectedCallbacks = [];
        this.resolve = (value) => {
            if (this.status === 'PENDING') {
                this.status = FULFILLED;
                this.value = value;
                this.onResolveCallbacks.forEach(fn => fn())
            }
        };
        this.reject = (reason) => {
            if (this.status === 'PENDING') {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        };
        try {
            executor(this.resolve, this.reject)
        } catch(e) {
            this.reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === 'FULFILLED') {
            onFulfilled(this.value)
        }
        if (this.status === 'REJECTED') {
            onRejected(this.reason)
        }
        if (this.status === 'PENDING') {
            this.onResolveCallbacks.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise;
