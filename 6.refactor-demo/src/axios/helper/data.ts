import { isObject } from "./util";


export function transformRequest(data: any): any {

    if (isObject(data)) {
        return JSON.stringify(data)
    }
    return data
}

export function transformResponse(data:any){

    if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (e) {
          // do nothing
        }
      }
      return data;

}