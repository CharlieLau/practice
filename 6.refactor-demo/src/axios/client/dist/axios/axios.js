import { Axios } from "./core/Axios";
import mergeConfig from "./core/mergeConfig";
import defaults from "./defaults";
import { extend } from "./helper/util";
function getAxios(config) {
    const context = new Axios(config);
    const axios = Axios.prototype.request.bind(context);
    extend(axios, context);
    return axios;
}
const axios = getAxios(defaults);
axios.create = function (config) {
    return getAxios(mergeConfig(defaults, config));
};
export default axios;
