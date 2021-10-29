import Cancel from "./cancel/cancel";
import CancelToken from "./cancel/cancelToken";
import isCancel from "./cancel/isCancel";
import { Axios } from "./core/Axios";
import mergeConfig from "./core/mergeConfig";
import defaults from "./defaults";
import { extend } from "./helper/util";
import { AxiosRequestConfig, AxiosStatic } from "./types";


function getAxios(config:AxiosRequestConfig): AxiosStatic {
    const context = new Axios(config)
    const axios = Axios.prototype.request.bind(context)
    extend(axios, context)
    return axios
}

const axios = getAxios(defaults)

axios.create = function (config: AxiosRequestConfig) {
    return getAxios(mergeConfig(defaults, config));
};
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios