import dispatchRequest from "./dispatchRequest";
import { InterceptorManager } from "./interceptorManager";
import mergeConfig from "./mergeConfig";
export class Axios {
    defaults;
    constructor(defaultConfig) {
        this.defaults = defaultConfig;
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        };
    }
    interceptors;
    request(url, config) {
        if (typeof url === "string") {
            config = config ? config : {};
            config.url = url;
        }
        else {
            config = url;
        }
        config = mergeConfig(this.defaults, config);
        let arr = [
            {
                resolved: dispatchRequest,
                rejected: undefined
            }
        ];
        this.interceptors.request.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                arr.unshift(interceptor);
            }
        });
        this.interceptors.response.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                arr.push(interceptor);
            }
        });
        let promise = Promise.resolve(config);
        while (arr.length) {
            const { resolved, rejected } = arr.shift();
            promise = promise.then(resolved, rejected);
        }
        return promise;
    }
    get(url, config) {
        return this._requestMethodWithoutData("get", url, config);
    }
    delete(url, config) {
        return this._requestMethodWithoutData("delete", url, config);
    }
    head(url, config) {
        return this._requestMethodWithoutData("head", url, config);
    }
    options(url, config) {
        return this._requestMethodWithoutData("options", url, config);
    }
    post(url, data, config) {
        return this._requestMethodWithData("post", url, data, config);
    }
    put(url, data, config) {
        return this._requestMethodWithData("put", url, data, config);
    }
    patch(url, data, config) {
        return this._requestMethodWithData("patch", url, data, config);
    }
    _requestMethodWithoutData(method, url, config) {
        return this.request(Object.assign(config || {}, {
            method,
            url
        }));
    }
    _requestMethodWithData(method, url, data, config) {
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data
        }));
    }
}
