import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { RequestConfig } from "@models/common";
import { RequestsConfig } from "@config/requestsConfig";
import { globalConfig } from "@config/globalConfig";
import { authService } from "@services/authService";
import { eventBusService } from "@services/eventBusService";

const requestsQueue: AxiosRequestConfig[] = [];
const loadingRequestsCounter = new Map<string, number>();

const showSuccessToast = (text: string) => {
  const message = text ?? 'با موفقیت انجام شد';
  eventBusService.emit("showToast", {message});
}

const showFailureToast = (text: string) => {
  const message = text ?? 'خطایی رخ داده است';
  eventBusService.emit("showToast", {message});
}

const getRequestConfig = (config: AxiosRequestConfig) => {
  if (!config) {
    return;
  }
  const url = config.url?.includes('http') ? config.url : `${config.baseURL}${config.url}`;
  const {pathname} = getUrlParts(url!);
  const requestPathMatch = ({pathTemplate, isCustomApi}: RequestConfig) => {
    const testCase = isCustomApi ? url : pathname;
    if (pathTemplate instanceof RegExp) {
      return pathTemplate.test(testCase);
    } else if (pathTemplate!.includes('*')) {
      const rep1 = pathTemplate!.replace(/\*/g, '.*');
      const rep2 = rep1.replace(/\//g, "\\\/");
      const regex = new RegExp(rep2, 'g');
      return regex.test(testCase);
    } else {
      return pathTemplate == testCase;
    }
  }
  const idx = RequestsConfig.findIndex(c => {
    const requestMethodMatch = c.method.toLowerCase() === config?.method?.toLowerCase();
    return requestMethodMatch && requestPathMatch(c);
  });
  return RequestsConfig[idx];
}

const getUrlParts = (url: string) => {
  if (!url) {
    return ''
  }
  const linkElement: any = document.createElement('a');
  const res: any = {};
  linkElement.href = url;
  ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'].forEach((k) => {
    res[k] = linkElement[k];
  });
  linkElement.remove();
  return res;
}

const removeRequestFromQueue = (config: InternalAxiosRequestConfig) => {
  const i = requestsQueue.indexOf(config);
  if (i >= 0) {
    requestsQueue.splice(i, 1);
  }
  eventBusService.emit("loading", requestsQueue.length > 0);
}

const getRequestProp = (config: InternalAxiosRequestConfig, response: AxiosResponse | null, prop: keyof RequestConfig) => {
  const requestConfig: any = getRequestConfig(config);
  if (!requestConfig) {
    return false;
  }
  if (typeof requestConfig[prop] === 'function') {
    return requestConfig[prop](config, response);
  } else {
    return requestConfig[prop];
  }
}

const handleTimeout = (request: InternalAxiosRequestConfig) => {
  const getQueryTimeout = (url: string) => {
    if (!url.includes('http')) {
      return 'none';
    }
    const requestSearchParams = new URL(url).search;
    return new URLSearchParams(requestSearchParams).get('timeout');
  }
  let configTimeout = getRequestProp(request, null, 'timeout');
  let queryTimeout = getQueryTimeout(request.url!);
  if (configTimeout == 'none' || queryTimeout == 'none') {
    return null;
  } else {
    return +queryTimeout! || configTimeout || globalConfig.requestTimeout;
  }
}

const appendAuthToken = (config: InternalAxiosRequestConfig) => {
  const storageToken = localStorage.getItem('token');
  if (!!storageToken) {
    config.headers.Authorization = `Bearer ${storageToken}`;
  }
  return config;
}

const handleHttpRequest = (config: InternalAxiosRequestConfig) => {
  config = appendAuthToken(config);
  const shouldLoading = getRequestProp(config, null, 'loading');
  config.timeout = handleTimeout(config);

  if (shouldLoading) {
    const pathTemplate = getRequestProp(config, null, 'pathTemplate');
    const loadingOnlyOnce = getRequestProp(config, null, 'loadingOnlyOnce');
    loadingRequestsCounter.set(pathTemplate, (loadingRequestsCounter.get(pathTemplate) ?? 0) + 1);
    if (!loadingOnlyOnce || (loadingOnlyOnce && loadingRequestsCounter.get(pathTemplate) == 1)) {
      requestsQueue.push(config);
      eventBusService.emit("loading", true);
    }
  }
  return config;
}

const handleHttpResponse = (response: AxiosResponse) => {
  const {config} = response;
  const successMessage = getRequestProp(config, response, 'successMessage');
  if (![false, undefined].includes(successMessage)) {
    showSuccessToast(successMessage)
  }
  removeRequestFromQueue(config);
  return response;
}

const handleHttpError = (error: AxiosError) => {
  const {config, response} = error;
  const failureMessage = getRequestProp(config!, response!, 'failureMessage');

  if (![false, undefined].includes(failureMessage)) {
    showFailureToast(failureMessage);
  }
  if (error.status === 403) {
    authService.logout();
  }
  removeRequestFromQueue(config!);
}

export const axiosInterceptor = (axiosInstance: Axios) => {
  axiosInstance.interceptors.request.use(
      (config) => handleHttpRequest(config),
      (error) => handleHttpError(error)
  );

  axiosInstance.interceptors.response.use(
      (response) => handleHttpResponse(response),
      (error) => handleHttpError(error)
  );
};
