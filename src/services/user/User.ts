// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加用户 POST /admin/user/add */
export async function addUser(body: API.AddUserPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /admin/user/delete */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  return request<API.RespObject>('/admin/user/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询用户 GET /admin/user/page/query */
export async function pageQueryUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageQueryUserParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageUserVO>('/admin/user/page/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页搜索用户 GET /admin/user/page/search */
export async function pageSearchUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageSearchUserParams,
  options?: { [key: string]: any },
) {
  return request<API.RespPageUserVO>('/admin/user/page/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据用户ID查询单个用户 GET /admin/user/query/${param0} */
export async function findUserBy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUserByParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RespUserVO>(`/admin/user/query/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据用户ID重置密码 GET /admin/user/reset/password/${param0} */
export async function resetPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPasswordParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RespObject>(`/admin/user/reset/password/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改用户 POST /admin/user/update */
export async function updateUser(body: API.UpdateUserPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/user/upload-avatar */
export async function uploadAvatar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadAvatarParams,
  options?: { [key: string]: any },
) {
  return request<API.RespString>('/admin/user/upload-avatar', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}



/** 获取当前登录用户信息 GET /user/current */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.RespUserVO>('/admin/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户登录 POST /user/login */
export async function login(body: API.LoginUserPO, options?: { [key: string]: any }) {
  return request<API.RespLoginUserVO>('/admin/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出 GET /user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新Token GET /user/refresh */
export async function refresh(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.refreshParams,
  options?: { [key: string]: any },
) {
  return request<API.RespTokenEntity>('/admin/user/refresh', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户注册 POST /user/register */
export async function register(body: API.RegisterUserPO, options?: { [key: string]: any }) {
  return request<API.RespObject>('/admin/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
