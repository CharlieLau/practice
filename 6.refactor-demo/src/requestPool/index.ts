const request = requestPool(2)

request('baidu1.com').then(console.log)
request('baidu2.com').then(console.log)
request('baidu3.com').then(console.log)
request('baidu4.com').then(console.log)
request('baidu5.com').then(console.log)

function requestPool(max) {
    const apiPool = []
    let count = 0

    function consumer() {
        if (apiPool.length <= 0 || count >= max) return

        count++
        const { api, resolve, reject } = apiPool.shift()

        mockFetch(api)
            .then(resolve, reject)
            .finally(() => {
                count--;
                consumer()
            })
    }

    function producer(api, resolve, reject) {
        apiPool.push({ api, resolve, reject })
    }

    return function (api) {
        return new Promise((resolve, reject) => {
            producer(api, resolve, reject)
            consumer()
        })
    }
}

function mockFetch(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, Math.random() * 2000)
    })
}
