import { createError } from "./helper/error";
import { parseHeaders } from "./helper/headers";
export function xhr(config) {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout } = config;
        const request = new XMLHttpRequest();
        request.open(method.toUpperCase(), url, true);
        if (timeout) {
            request.timeout = timeout;
        }
        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            }
            request.setRequestHeader(name, headers[name]);
        });
        if (responseType) {
            request.responseType = responseType;
        }
        request.send(data);
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 0) {
                return;
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders());
            const responseData = responseType && responseType !== "text"
                ? request.response
                : request.responseText;
            const response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };
            handleResponse(response);
        };
        request.onerror = function () {
            reject(createError('Net Error', config, null, request));
        };
        request.ontimeout = function () {
            reject(createError(`Timeout of ${timeout} ms exceeded`, config, "TIMEOUT", request));
        };
        function handleResponse(response) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            }
            else {
                reject(createError(`Request failed with status code ${response.status}`, config, null, request.status, response));
            }
        }
    });
}
