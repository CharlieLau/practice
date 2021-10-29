


let promises = [Promise.resolve(1), Promise.reject(new Error('ss')), Promise.resolve(2)]

function serial(arr: Promise<any>[]) {

    return new Promise((resolve, reject) => {
        let total = arr.length;
        let index = 0
        let result = []
        next(arr[index])
        function next(item) {
            return item
                .then(res => {
                    index++
                    result.push(res)

                    if (total === index) {
                        resolve(result)
                    }

                    next(arr[index])
                }).catch(reject)
        }
    })
}
function serial2(arr:Promise<any>[]){
    return arr.reduce((prev,next)=>prev.then(()=>next),Promise.resolve())
}


serial2(promises).then(res => console.log(res, 'done')).catch(res => {
    console.log(res)
})