import { transformRequest, transformResponse } from "./helper/data";
import { processHeaders } from "./helper/headers";
const defaults = {
    timeout: 0,
    headers: {
        common: {
            "Accept": "appliaction/json,text/plain,*/*"
        }
    },
    transformRequest: [
        function (data, headers) {
            processHeaders(headers, data);
            return transformRequest(data);
        }
    ],
    transformResponse: [
        function (data) {
            return transformResponse(data);
        }
    ]
};
const methodsNoData = ['delete', 'get', 'head', 'options'];
methodsNoData.forEach(method => {
    defaults.headers[method] = {};
});
const methodsWithData = ["post", "put", "patch"];
methodsWithData.forEach(method => {
    defaults.headers[method] = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
});
export default defaults;
