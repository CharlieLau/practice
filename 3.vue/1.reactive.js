// 1.侦测变化
// function defineReactive(data, key, val) {
//     Object.defineProperty(data, key, {
//         enumerable: true,
//         configurable: true,
//         get() {
//             return val
//         },
//         set(newval) {
//             if (newval === val) {
//                 return;
//             }
//             val = newval
//         }
//     })
// }
// let a = {
//     b: 1,
//     c: {
//         a: 1
//     }
// }
// defineReactive(a, 'b', a.b)
// a.b = 2
// console.log(a.b)

// 2. 收集依赖
// 假设依赖 存在 window.target 的函数
// function defineReactive(data, key, val) {
//     let dep = [];
//     Object.defineProperty(data, key, {
//         configurable: true,
//         enumerable: true,
//         get() {
//             dep.push(window.target)
//             return val[key];
//         },
//         set(newval) {
//             if (val[key] === newval) {
//                 return;
//             }
//             for (let i = 0; i < dep.length; i++) {
//                 dep[i](newval, val);
//             }
//             val = newval;
//         }
//     })
// }

// 3. O-O 优化

// class Dep {
//     constructor() {
//         this.subs = []
//     }
//     addSub(sub) {
//         this.subs.push(sub)
//     }
//     removeSub(sub) {
//         remove(this.subs, sub)
//     }
//     depend() {
//         if (window.target) {
//             this.addSub(window.target)
//         }
//     }
//     notify() {
//         const subs = this.subs;
//         for (let i = 0; i < subs.length; i++) {
//             subs[i].update()
//         }
//     }
// }

// function remove(subs, sub) {
//     const index = subs.indexOf(sub)
//     if (index > -1) {
//         return subs.splice(index, 1)
//     }
// }

// function defineReactive(data, key, val) {
//     let dep = new Dep();

//     Object.defineProperty(data, key, {
//         configurable: true,
//         enumerable: true,
//         get() {
//             dep.depend()
//             return val[key];
//         },
//         set(newval) {
//             if (val[key] === newval) {
//                 return;
//             }
//             val[key] = newval;
//             dep.notify()
//         }
//     })
// }

// 4 watcher
// 4.1 window.target 是谁呢 
// 4.2 首先是个函数
// 4.3 来监听变化的回调函数
// 4.4 抽象成所谓的watcher

// watcher 啥样的呢

// vm.$watch('a.b.c',(newval,val)=>{
//     // ...
// })  翻译成  vm.a.b.c的变化


// class Watcher {
//     constructor(vm, expOrFn, cb) {
//         this.vm = vm;
//         this.getter = parsePath(expOrFn);
//         this.cb = cb;
//         this.val = this.get();
//     }
//     get() {
//         // 把 window.target 设置成当前watcher 依赖收集的当前watcher
//         window.target = this;
//         let value = this.getter.call(this.vm, this.vm)
//         window.target = null;
//         return value;
//     }
//     update() {
//         const oldvalue = this.value;
//         this.value = this.get();
//         this.cb.call(this.vm, this.value, oldvalue)
//     }
// }
// const bailRE = /[^\w.$]/

// function parsePath(exp) {
//     if (bailRE.test(exp)) {
//         return
//     }
//     const segments = exp.split('.');
//     return function (obj) {
//         for (let i = 0; i < segments.length; i++) {
//             if (!obj) {
//                 return;
//             }
//             obj = obj[segments[i]]
//         }
//         return obj
//     }
// }

// 5. 侦测所有的key

// class Observer {
//     constructor(value) {
//         this.value = value;
//         if (!Array.isArray(value)) {
//             this.walk(value)
//         }
//     }
//     walk(value) {
//         const keys = Object.keys(value)
//         for (let i = 0; i < keys.length; i++) {
//             defineReactive(value, keys[i], obj[keys[i]])
//         }
//     }
// }

// function defineReactive(data, key, val) {
//     if (typeof val === 'object') {
//         new Observer(val)
//     }
//     let dep = new Dep();

//     Object.defineProperty(data, key, {
//         configurable: true,
//         enumerable: true,
//         get() {
//             dep.depend()
//             return val;
//         },
//         set() {
//             if (val === newval) {
//                 return;
//             }
//             val = newval;
//             dep.notify()
//         }
//     })
// }
// 总结  data=> observer=> (getter,setter)=>dep=> watcher=> cb
// 问题  无法检测到 新增或者删除属性


// 6. Array  
// 拦截器
const arrayProto = Array.prototype;
//不全局污染 prototype
const arrayMethods = Object.create(arrayProto)['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
    const original = arrayProto[method];
    Object.defineProperty(arrayMethods, method, {
        value(...args) {
            return original.apply(this, args)
        },
        enumerable: false,
        writable: true,
        configurable: true
    })
})

class Observer {
    constructor(value) {
        this.value = value;
        if (!Array.isArray(value)) {
            this.walk(value)
        }else{
            // 重设Array的原型 不污染
            value.__proto__= arrayMethods;
        }
    }
}

// defineReactive 一样监听

// TODO:  array 的变化通知   __ob__ 对象