import { transformRequest, transformResponse } from "../helper/data";
import { buildURL } from "../helper/url";
import { xhr } from "./xhr";
function axios(config) {
    processConfig(config);
    xhr(config).then(res => {
        return transformResponseData(res.data);
    });
}
function processConfig(config) {
    config.url = transformUrl(config);
    config.data = transformRequestData(config);
}
function transformRequestData(config) {
    const { data } = config;
    return transformRequest(data);
}
function transformUrl(config) {
    const { url, params } = config;
    return buildURL(url, params);
}
function transformResponseData(res) {
    res.data = transformResponse(res.data);
    return res;
}
export default axios;
