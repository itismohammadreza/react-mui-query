import axios, { AxiosRequestConfig } from "axios";
import { axiosInterceptor } from "@services/api/axiosInterceptor";
import { globalConfig } from "@config/globalConfig";

axios.defaults.baseURL = globalConfig.apiUrl;
axios.defaults.timeout = globalConfig.requestTimeout;

type RequestConfig = Exclude<AxiosRequestConfig, "method" | "url" | "data">;

const get = <T>(endpoint: string, config?: RequestConfig) =>
    request<T>({
      method: "get",
      url: endpoint,
      ...config,
    }).then(res => res?.data);

const post = <T>(endpoint: string, data: any, config?: RequestConfig) =>
    request<T>({
      method: "post",
      url: endpoint,
      data,
      ...config,
    }).then(res => res?.data);

const put = <T>(endpoint: string, data: any, config?: RequestConfig) =>
    request<T>({
      method: "put",
      url: endpoint,
      data,
      ...config,
    }).then(res => res?.data);

const patch = <T>(endpoint: string, data: any, config?: RequestConfig) =>
    request<T>({
      method: "patch",
      url: endpoint,
      data,
      ...config,
    }).then(res => res?.data);

const del = <T>(endpoint: string, config?: RequestConfig) =>
    request<T>({
      method: "delete",
      url: endpoint,
      ...config,
    }).then(res => res?.data);

const request = <T>(config: AxiosRequestConfig) => axios<T>(config);

axiosInterceptor(axios);

export const httpService = {
  request,
  get,
  post,
  put,
  patch,
  del,
};
