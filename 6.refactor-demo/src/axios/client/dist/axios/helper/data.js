import { isObject } from "./util";
export function transformRequest(data) {
    if (isObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}
export function transformResponse(data) {
    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            // do nothing
        }
    }
    return data;
}
