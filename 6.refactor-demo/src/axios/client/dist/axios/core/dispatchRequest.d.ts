import { AxiosRequestConfig, AxiosResponse } from "../types";
declare function dispatchRequest(config: AxiosRequestConfig): Promise<AxiosResponse<any>>;
export default dispatchRequest;
