// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /file/upload */
export async function fileUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  data: FormData,
  options?: { [key: string]: any },
) {
  return request<API.RespString>('/file/upload', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
