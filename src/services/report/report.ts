import {request} from "@@/exports";

export async function getMarketReportData(options?: { [key: string]: any }) {
  return request<API.RespListMarkItemVO>('/admin/report/market', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function getPerformanceData(options?: { [key: string]: any }) {
  return request<API.RespListMarkItemVO>('/admin/report/performance', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function getTrafficData(options?: { [key: string]: any }) {
  return request<API.RespListTrafficVO>('/admin/report/traffic', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
