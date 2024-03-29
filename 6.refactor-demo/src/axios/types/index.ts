export interface AxiosRequestConfig {
    url?: string
    method?: Method
    data?: any
    params?: any
    headers?: any
    responseType?: XMLHttpRequestResponseType
    timeout?: number
    transformRequest?: AxiosTransformer | AxiosTransformer[]
    transformResponse?: AxiosTransformer | AxiosTransformer[]
    cancelToken?: CancelToken
    withCredentials?: boolean
    xsrfCookieName?: string
    xsrfHeaderName?: string
}

export type Method = 'get' | 'delete' | 'post' | 'put' | 'patch' | 'head' | 'options'

export interface AxiosTransformer {
    (data: any, headers?: any): any;
}

export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance
    CancelToken: CancelTokenStatic
    Cancel: CancelStatic;
    isCancel: (value: any) => boolean;
}

export interface CancelTokenStatic {
    new(executor: CancelExecutor): CancelToken
    source(): CancelTokenSource
}

export interface CancelTokenSource {
    token: CancelToken
    cancel: Canceler
}
export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

export interface AxiosError extends Error {
    config: AxiosRequestConfig,
    code?: string | null
    request?: any
    response?: AxiosResponse
}

export interface Axios {

    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };

    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosInterceptorManager<T> {

    use(resolved: ResolvedFn<T>, rejected: RejectedFn): number

    eject(id: number): void
}

export interface ResolvedFn<T = any> {
    (val: T): T | Promise<T>
}

export interface RejectedFn {
    (error: any): any
}

export interface CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel

    throwIfRequested(): void
}

export interface CancelExecutor {
    (cancel: Canceler): void
}

export interface Canceler {
    (message?: string): void
}
export interface Cancel {
    message?: string;
}
export interface CancelStatic {
    new(message?: string): Cancel
}