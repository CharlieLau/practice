// 给定一个指定数组，类似于 [1,3,4,9,19] ，数组数量不定，找出最接近平均数的数字
const  {memoize,minBy} =require('lodash')
const data = [1, 3, 4, 9, 19,30,33,33,33,4,33,5];


//1. 求平均值
//2. 绝对值 差值
//3. 上一步索引

const sum = arr => arr.reduce((p, c) => p += c, 0);
const avg = memoize(arr => sum(arr) / arr.length);
const minByIndex = arr => minBy(arr.map((v,i) =>({v:Math.abs(v - avg(arr)),i}) ),'v').i
const close = arr => arr[minByIndex(arr)]

const result = close(data)

console.log('close: ',result)