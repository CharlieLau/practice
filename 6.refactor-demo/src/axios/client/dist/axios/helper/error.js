export class AxiosError extends Error {
    config;
    request;
    code;
    response;
    constructor(message, config, request, code, response) {
        super(message);
        this.config = config;
        this.request = request;
        this.code = code;
        this.response = response;
        Object.setPrototypeOf(this, AxiosError.prototype);
    }
}
export function createError(message, config, code, request, response) {
    const error = new AxiosError(message, config, code, request, response);
    return error;
}
