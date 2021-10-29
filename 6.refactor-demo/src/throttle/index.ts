// 节流函数，在 wait 秒内最多执行 fn 一次的函数。 与deboucne不同的是，throttle会有一个阀值，当到达阀值时，fn一定会执行。

// 第一种实现
// 设置一个对比时间戳，触发事件时，使用当前时间戳减去对比时间戳，如果差值大于设定的间隔时间，则执行函数，并用当前时间戳替换对比时间戳；如果差值小于设定的间隔时间，则不执行函数。

function throttle0(fn,wait){
    let lastTime
    return  function(...args){
        let current = new Date().getTime()
        if(current- lastTime >wait){
            fn(...args)
            lastTime = current
        }
    }
}


// 第二种实现
// 当首次触发事件时，设置定时器，wait毫秒后执行函数并将定时器置为null，之后触发事件时，如果定时器存在则不执行，如果定时器不存在则再次设置定时器。
function throttle1(fn, wait) {
    let timer
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer)
                fn(args)
            }, wait)
        }
    }
}
