// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加广告信息 POST /admin/ad/add */
export async function addAd(body: API.AddADPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/ad/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除广告信息 GET /admin/ad/delete */
export async function batchDeleteAd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchDeleteADParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/ad/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询广告信息 GET /admin/ad/page/query */
export async function pageQueryAd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryADParams,
  options?: { [key: string]: any },
) {
  return request<API.RespIPageADVO>('/admin/ad/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新广告信息 POST /admin/ad/update */
export async function updateAd(body: API.UpdateADPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/ad/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
