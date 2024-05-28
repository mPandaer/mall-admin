// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加商品品牌 POST /admin/product/brand/add */
export async function addBrand(body: API.AddProductBrandPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/product/brand/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有商品品牌 GET /admin/product/brand/all */
export async function all3(options?: { [key: string]: any }) {
  return request<API.RespListProductBrandVO>('/admin/product/brand/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除商品品牌 GET /admin/product/brand/delete */
export async function deleteBrand(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBrandParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/product/brand/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询商品品牌 GET /admin/product/brand/page/query */
export async function pageQueryBrand(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryBrandParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageProductBrandVO>('/admin/product/brand/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新商品品牌 POST /admin/product/brand/update */
export async function updateBrand(
  body: API.UpdateProductBrandPO,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/product/brand/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
