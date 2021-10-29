import { flattenHeaders } from "../helper/headers";
import { buildURL } from "../helper/url";
import { transform } from "./transform";
import { xhr } from "./xhr";
function dispatchRequest(config) {
    processConfig(config);
    return xhr(config).then(res => {
        return transformResponseData(res.data);
    });
}
function processConfig(config) {
    config.url = transformUrl(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeaders(config.headers, config.method);
}
// function transformRequestData(config: AxiosRequestConfig) {
//     const { data } = config
//     return transformRequest(data)
// }
function transformUrl(config) {
    const { url, params } = config;
    return buildURL(url, params);
}
function transformResponseData(res) {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}
export default dispatchRequest;
