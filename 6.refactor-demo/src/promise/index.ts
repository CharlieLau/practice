const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function myPromise(exector) {
    const self = this
    self.status = PENDING
    self.onFulfilled = []
    self.onRejected = []

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULFILLED
            self.value = value
            self.onFulfilled.forEach(item => item())
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = FULFILLED
            self.reason = reason
            self.onRejected.forEach(item => item())
        }
    }
    try {
        exector(resolve, reject)
    } catch (err) {
        reject(err)
    }
}

myPromise.prototype.then =function (onFulfilled, onRejected)  {

    let self = this

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    const promise2 = new myPromise((resolve, reject) => {
        if (self.status === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            })

            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            })
        } else if (self.status === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (self.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }

    })
    return promise2
}


function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        reject(new TypeError('Chaining cycle'));
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (used) return;
                    used = true;
                    resolvePromise(promise, y, resolve, reject);
                }, (r) => {
                    if (used) return;
                    used = true;
                    reject(r);
                });

            } else {
                if (used) return;
                used = true;
                resolve(x);
            }
        } catch (e) {
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}





new myPromise((resolve, reject) => {
    resolve('hello')
}).then(res => {
    console.log(res)
})
