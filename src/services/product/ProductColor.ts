// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加商品颜色 POST /admin/product/color/add */
export async function addColor(body: API.AddProductColorPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/color/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有商品颜色 GET /admin/product/color/all */
export async function all2(options?: { [key: string]: any }) {
  return request<API.RespListProductColorVO>('/admin/product/color/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除商品颜色 GET /admin/product/color/delete */
export async function deleteColor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteColorParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/product/color/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询商品颜色 GET /admin/product/color/page/query */
export async function pageQueryColor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryColorParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductColorVO>('/admin/product/color/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新商品颜色 POST /admin/product/color/update */
export async function updateColor(
  body: API.UpdateProductColorPO,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/product/color/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
