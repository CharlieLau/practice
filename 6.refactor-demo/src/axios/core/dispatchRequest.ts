import { flattenHeaders } from "../helper/headers";
import { buildURL } from "../helper/url";
import { AxiosRequestConfig, AxiosResponse } from "../types";
import { transform } from "./transform";
import { xhr } from "./xhr";


function dispatchRequest(config: AxiosRequestConfig) {
    throwIfCancellationRequested(config)
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponseData(res.data)
    })
}

function processConfig(config: AxiosRequestConfig) {
    config.url = transformUrl(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeaders(config.headers, config.method)
}

function transformUrl(config: AxiosRequestConfig) {
    const { url, params } = config
    return buildURL(url, params)
}


function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}

// 如果已经请求取消，则抛出异常。
function throwIfCancellationRequested(config:AxiosRequestConfig) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }

export default dispatchRequest