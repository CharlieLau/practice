import { transformRequest, transformResponse } from "./helper/data";
import { processHeaders } from "./helper/headers";
import { AxiosRequestConfig } from "./types";


const defaults: AxiosRequestConfig = {
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        common: {
            "Accept": "appliaction/json,text/plain,*/*"
        }
    },
    transformRequest: [
        function(data: any, headers: any): any {
          processHeaders(headers, data);
          return transformRequest(data);
        }
      ],
      transformResponse: [
        function(data: any) {
          return transformResponse(data);
        }
      ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']


methodsNoData.forEach(method => {
    defaults.headers[method] = {}
})


const methodsWithData = ["post", "put", "patch"];

methodsWithData.forEach(method => {
    defaults.headers[method] = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
});

export default defaults;
