// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加友情链接信息 POST /admin/link/add */
export async function addLink(body: API.AddFriendLinkPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/link/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除友情链接信息 GET /admin/link/delete */
export async function batchDeleteLink(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchDeleteLinkParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/link/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询友情链接信息 GET /admin/link/page/query */
export async function pageQueryLink(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryLinkParams,
  options?: { [key: string]: any },
) {
  return request<API.RespIPageFriendLinkVO>('/admin/link/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新友情链接信息 POST /admin/link/update */
export async function updateLink(body: API.UpdateFriendLinkPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/link/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
