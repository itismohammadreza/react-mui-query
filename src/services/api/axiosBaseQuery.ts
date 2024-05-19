import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig } from "axios";
import { httpService } from "@services/api/httpService";

export const axiosBaseQuery = ({baseUrl}: { baseUrl: string }): BaseQueryFn<AxiosRequestConfig, unknown, unknown> => {
  return async ({url, method, data, params, headers}) => {
    try {
      const result = await httpService.request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return {data: result.data}
    } catch (error) {
      return {error}
    }
  }
}
