const toString = Object.prototype.toString;
export function isDate(val) {
    return toString.call(val) === '[object Date]';
}
export function isObject(val) {
    return toString.call(val) === '[object Object]';
}
export function extend(to, from) {
    for (const key in from) {
        to[key] = from[key];
    }
    return to;
}
export function deepMerge(...objs) {
    const result = Object.create(null);
    for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        for (let key in obj) {
            assignValue(obj[key], key);
        }
    }
    function assignValue(val, key) {
        if (isObject(result[key]) && isObject(val)) {
            result[key] = deepMerge(result[key], val);
        }
        else if (isObject(val)) {
            result[key] = deepMerge({}, val);
        }
        else {
            result[key] = val;
        }
    }
    return result;
}
