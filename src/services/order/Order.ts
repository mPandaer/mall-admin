// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /admin/order/detail/${param0} */
export async function getOrderDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.RespListOrderDetailVO>(`/admin/order/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取不同状态的订单数据 GET /admin/order/page/query */
export async function pageQueryOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryOrderParams,
  options?: { [key: string]: any },
) {
  return request<API.RespIPageOrderVO>('/admin/order/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /admin/order/status/${param0} */
export async function updateOrderStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateOrderStatusParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.RespObject>(`/admin/order/status/${param0}`, {
    method: 'PUT',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 订单状态流转 GET /flow/status */
export async function flowOrderStatus(orderId: string, curOrderStatus: number, options?: { [key: string]: any }) {
  return request<API.RespObject>(`/admin/order/flow/status?orderId=${orderId}&curOrderStatus=${curOrderStatus}`, {
    method: 'GET',
    ...(options || {}),
  });
}
