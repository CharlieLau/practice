//reactive


function isobject(val) {
    return typeof val === 'object' && val !== null;
}


//vue 2.0



// const updateView = () => {
//     console.log('数据更新了~')

// }

// function observer(obj) {
//     if (!isobject(obj)) {
//         return;
//     }
//     for (let key in obj) {
//         defineReactive(obj, key, obj[key])
//     }

// }

// function defineReactive(obj, key, val) {
//     observer(val)
//     Object.defineProperty(obj, key, {
//         get() {
//             return val;
//         },
//         set(newVal) {
//             if (newVal !== val) {
//                 observer(newVal)
//                 val = newVal
//                 updateView();
//             }
//         }
//     })
// }


// let obj = {
//     name: 'charlie'
// }

// observer(obj)
// obj.name = 'tom'

// obj.name = {
//     prefix: 'charlie',
//     fix: 'liu'
// }

// obj.prefix = 3000

// console.log(obj.name)


// vue 3.0




const toProxy = new WeakMap();
const toRaw = new WeakMap();



function reactive(obj) {
    if (!isobject(obj)) {
        return;
    }
    if (toProxy.get(obj)) {
        return toProxy.get(obj)
    }


    if (toRaw.get(obj)) {
        return obj
    }

    return createReactiveObject(obj)

}

function createReactiveObject(obj) {

    let proxy = new Proxy(obj, {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            track(target, key)
            return isobject(result) ? reactive(result) : result
        },
        set(target, key, newVal, receiver) {
            let result = Reflect.set(target, key, newVal, receiver)
            //数据会触发两次 一个改值 一次改len
            if (!target.hasOwnProperty(key)) {
                trigger(target, 'add',key)
            } else if (result !== newVal) {
                trigger(target, 'update',key)
            }
            return result
        },
        deleteProperty() {
            return Reflect.deleteProperty(target, key)
        }

    })
    toProxy.set(obj, proxy)
    toRaw.set(proxy, obj)
    return proxy;
}

// let obj = {
//     name: 'charlie',
//     bb: {
//     }
// }

// let person = reactive(obj)

// // reactive(person)
// // reactive(person)
// // reactive(person)


// person.name = 'tom'
// obj.bb.cc = {dd:'xxx'}
// console.log(person)


let activeEffectStack = []

let targetsMap = new WeakMap();

function effect(fn) {
    let reactivefn = createReactiveEffect(fn)
    reactivefn();
}

function createReactiveEffect(fn) {
    let high = () => {
        return run(high, fn)
    }

    return high;
}

function run(effect, fn) {
    try {
        activeEffectStack.push(effect)
        fn()
    } finally {
        activeEffectStack.pop()
    }
}

function track(target, key) {
    let effect = activeEffectStack[activeEffectStack.length - 1]
    if (!effect) {
        return;
    }
    let depsMap = targetsMap.get(target)
    if (!depsMap) {
        targetsMap.set(target, depsMap = new Map())
    }
    let deps = depsMap[key]

    if (!deps) {
        depsMap.set(key, deps = new Set())
    }

    if (!deps.has(effect)) {
        deps.add(effect)
    }
}

function trigger(target,operater,key){

    if(!targetsMap.get(target)){
        return
    }

    let deps  = targetsMap.get(target).get(key)
    if(!deps){
        return
    }

    deps.forEach(effect=>effect())
}


let a ={'a':'hell'}

let p = reactive(a)

effect(() => {
    console.log(p.a,'effect')
})
p.a ='charlie'


let arr=[1,2,3]
let pp = reactive(arr)

effect(()=>{
    console.log(pp[1])
})

pp[1] =323333333