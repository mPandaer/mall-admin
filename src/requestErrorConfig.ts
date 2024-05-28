import type { RequestOptions } from '@@/plugin-request/request';
import {history, request, RequestConfig} from '@umijs/max';
import { message, notification } from 'antd';
import {refresh} from "@/services/user/User";
import {useRequest} from "ahooks";
import axios from "axios";

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  baseURL: "http://localhost:8080",
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url ? config.url.concat('?token=123') : undefined;
      let realUrl = config?.baseURL && url ? config.baseURL.concat(url) : undefined;
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        // @ts-ignore
        config.headers.Authorization = accessToken;
      }
      return { ...config, realUrl };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    async (response) => {
      // 拦截响应数据，进行个性化处理
      const originRequest = response.config;
      // @ts-ignore
      if (response.status === 401 && !originRequest._retry) {
        // @ts-ignore
        originRequest._retry = true;
        const oldRefreshToken = localStorage.getItem("refreshToken") ?? "";
        console.log("refresh 哈啊哈")
        if (!oldRefreshToken) {
          message.warning("登录超时");
          history.push("/user/login");
          return response;
        }
        const resp = await refresh({refreshToken: oldRefreshToken})
        // @ts-ignore
        if (resp.message !== "Success") {
          message.warning("登录超时");
          history.push("/user/login");
          return response;
        }
        const accessToken = resp.data?.accessToken;
        // @ts-ignore
        const refreshToken = resp.data.refreshToken;
        localStorage.setItem("accessToken",accessToken ?? "")
        localStorage.setItem("refreshToken",refreshToken ?? "");
        // @ts-ignore
        response.config.headers.Authorization = accessToken;
        axios(response.config);

      }
      return response;
    },
  ],
};
