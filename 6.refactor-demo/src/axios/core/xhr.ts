import cookies from "../helper/cookies";
import { createError } from "../helper/error";
import { parseHeaders } from "../helper/headers";
import isURLSameOrigin from "../helper/isURLSameOrigin";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";

export function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers,
            responseType, timeout, cancelToken,
            withCredentials, xsrfCookieName, xsrfHeaderName } = config
        const request = new XMLHttpRequest()
        request.open(method.toUpperCase(), url, true)

        if (timeout) {
            request.timeout = timeout;
        }

        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            }
            request.setRequestHeader(name, headers[name])
        })

        if (responseType) {
            request.responseType = responseType
        }
        if (withCredentials) {
            request.withCredentials = true
        }

        let xsrfValue =
            (withCredentials || isURLSameOrigin(url)) && xsrfCookieName
                ? cookies.read(xsrfCookieName)
                : undefined;

        if (xsrfValue) {
            headers[xsrfHeaderName] = xsrfValue;
        }

        request.send(data)

        if (cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort()
                reject(reason)
            })
        }


        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 0) {
                return;
            }

            const responseHeaders = parseHeaders(request.getAllResponseHeaders());

            const responseData =
                responseType && responseType !== "text"
                    ? request.response
                    : request.responseText;
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };
            handleResponse(response)
        }

        request.onerror = function () {
            reject(createError(
                'Net Error',
                config,
                null,
                request
            ))
        }

        request.ontimeout = function () {

            reject(
                createError(
                    `Timeout of ${timeout} ms exceeded`,
                    config,
                    "TIMEOUT",
                    request
                )
            );
        }


        function handleResponse(response: AxiosResponse): void {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            } else {
                reject(
                    createError(
                        `Request failed with status code ${response.status}`,
                        config,
                        null,
                        request.status,
                        response
                    )
                );
            }
        }
    })
}
