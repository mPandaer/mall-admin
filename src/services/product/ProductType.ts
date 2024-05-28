// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加商品类型 POST /admin/product/type/add */
export async function addType(body: API.AddProductTypePO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/type/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有商品类型 GET /admin/product/type/all */
export async function all(options?: { [key: string]: any }) {
  return request<API.RespListProductTypeVO>('/admin/product/type/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除商品类型 GET /admin/product/type/delete */
export async function deleteType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/product/type/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询商品类型 GET /admin/product/type/page/query */
export async function pageQueryType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductTypeVO>('/admin/product/type/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新商品类型 POST /admin/product/type/update */
export async function updateType(body: API.UpdateProductTypePO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/type/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
