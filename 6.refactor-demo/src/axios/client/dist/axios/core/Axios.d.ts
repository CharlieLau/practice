import { AxiosPromise, AxiosRequestConfig, Method } from "../types";
export declare class Axios {
    defaults: AxiosRequestConfig;
    constructor(defaultConfig: AxiosRequestConfig);
    private interceptors;
    request(url: any, config?: any): AxiosPromise;
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    options(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise<any>;
    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any>;
}
