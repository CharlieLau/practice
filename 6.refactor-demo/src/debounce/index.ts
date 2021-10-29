

// 该函数会从上一次被调用后，延迟 wait 毫秒后调用 fn 方法
function debounce(fn, wait) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(()=>fn(...args), wait)
    }
}



