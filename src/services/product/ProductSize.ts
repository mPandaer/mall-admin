// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加商品尺寸 POST /admin/product/size/add */
export async function addSize(body: API.AddProductSizePO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/size/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有商品尺寸 GET /admin/product/size/all */
export async function all1(options?: { [key: string]: any }) {
  return request<API.RespListProductSizeVO>('/admin/product/size/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除商品尺寸 GET /admin/product/size/delete */
export async function deleteSize(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSizeParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/product/size/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询商品尺寸 GET /admin/product/size/page/query */
export async function pageQuerySize(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQuerySizeParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductSizeVO>('/admin/product/size/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新商品尺寸 POST /admin/product/size/update */
export async function updateSize(body: API.UpdateProductSizePO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/size/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
