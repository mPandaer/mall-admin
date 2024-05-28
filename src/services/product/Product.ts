// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加商品 POST /admin/product/add */
export async function add(body: API.AddProductPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除商品 GET /admin/product/delete */
export async function deleteUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/product/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询商品 GET /admin/product/query */
export async function pageQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductVO>('/admin/product/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改商品 POST /admin/product/update */
export async function update(body: API.UpdateProductPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
