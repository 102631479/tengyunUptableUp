// 权限中心
const url = '/platform-auth'
import platform from '@/config/platform'

import axios from '@/libs/api.request'

// 登录
export const login = ({ userName, password }) => {
  const data = {
    account: userName,
    password
  }
  return axios.request({
    url: url + '/login',
    data,
    method: 'post'
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return axios.request({
    url: url + '/user/info',
    method: 'get'
  })
}

// 用户权限查询
export const getPermission = () => {
  return axios.request({
    url: url + '/user/permission',
    method: 'get'
  })
}

// 分页获取用户信息
export const userPage = (data) => {
  return axios.request({
    url: url + '/user/page',
    data,
    method: 'post'
  })
}

// 删除用户
export const delUser = id => {
  return axios.request({
    url: url + '/user/' + id,
    method: 'delete'
  })
}
// 新增用户
export const addUser = data => {
  return axios.request({
    url: url + '/user',
    data,
    method: 'post'
  })
}
// 更新用户  /user-manage/data-echo?userId=1253237792440455168
export const editUser = data => {
  return axios.request({
    url: platform.OPERATE + '/agent-manage/data-echo',
    data,
    method: 'put'
  })
}

export const logout = (token) => {
  return axios.request({
    url: url + '/logout',
    method: 'post'
  })
}

// 退出
export const LogOut = params => {
  return axios.request({
    url: platform.SSO + "/logout",
    method: "get",
    params
  })
}


// 分页获取权限列表
export const getAuthorityList = params => {
  return axios.request({
    url: platform.OPERATE + '/user-manage/user-list/page',
    method: 'get',
    params
  })
}

// /user-manage/recharge-record/{userId}  充值提现记录的路径
export const getRechargeRecord = userId => {
  return axios.request({
    url: platform.COMMON + `/agent-manage/recharge-record/${userId}`,
    method: 'get',
  })
}

// /user-manage/detail  详情的接口
export const getUserManageDetail = params => {
  return axios.request({
    url: platform.COMMON + `/user-manage/detail`,
    method: 'get',
    params
  })
}

// /user-manage/platform-account  新增用户的接口  
export const apiAddUser = data => {
  return axios.request({
    url: platform.OPERATE + '/user-manage/platform-account',
    data,
    method: 'post'
  })
}

// /user-manage/edit  用户编辑的接口
export const apiEditUser = data => {
  return axios.request({
    url: platform.OPERATE + '/user-manage/edit',
    data,
    method: 'put'
  })
}
// /user-manage/delete/{userId} 删除的接口 
export const apiDelUser = userId => {
  return axios.request({
    url: platform.OPERATE + `/user-manage/delete/${userId}`,
    method: 'delete'
  })
}

// /user-manage/get-agent  获取代理商 
export const getAgentList = (params) => {
  return axios.request({
    url: platform.OPERATE + '/user-manage/get-agent',
    params,
    method: 'get',
  })
}

// 获取所有权限列表
export const getAllAuthorityList = params => {
  return axios.request({
    url: url + '/permission/list',
    params,
    method: 'get',
  })
}

// 新增权限
export const addPermission = data => {
  return axios.request({
    url: url + '/permission',
    method: 'post',
    data
  })
}

// 编辑权限
export const editPermission = data => {
  return axios.request({
    url: url + '/permission',
    method: 'put',
    data
  })
}

// 删除权限
export const delAuthority = id => {
  return axios.request({
    url: url + '/permission/' + id,
    method: 'delete'
  })
}

// 查询所有角色
export const getAllRoleList = () => {
  return axios.request({
    url: url + '/role/all',
    method: 'get'
  })
}

// 查询角色
export const getRoleList = data => {
  return axios.request({
    url: url + '/role/page',
    data,
    method: 'post'
  })
}

// 删除角色
export const delRole = id => {
  return axios.request({
    url: url + '/role/' + id,
    method: 'delete'
  })
}

// 修改角色
export const editRole = data => {
  return axios.request({
    url: url + '/role',
    data,
    method: 'put'
  })
}

// 添加角色
export const addRoule = data => {
  return axios.request({
    url: url + '/role',
    data,
    method: 'post'
  })
}

// 获取所有应用列表
export const getAllAppList = () => {
  return axios.request({
    url: url + '/application/all',
    method: 'get'
  })
}

// 查询所有企业
export const getAllCompanyList = () => {
  return axios.request({
    url: url + '/company/all',
    method: 'get'
  })
}

// 查询所有用户组
export const getOrgAll = () => {
  return axios.request({
    url: url + '/org/all',
    method: 'get'
  })
}

// 用户管理 接口 -----
// 启用 或 停用
export const upOrDown = (userId, id) => {
  return axios.request({
    url: platform.OPERATE + `/user-manage/up-status/${userId}/${id}`,
    method: 'put'
  })
}

// 充值记录
export const rechargeRecord = id => {
  return axios.request({
    url: platform.OPERATE + `/user-manage/recharge-record/${id}`,
    method: 'get'
  })
}

// 编辑
export const editRecord = data => {
  return axios.request({
    url: platform.OPERATE + '',
    method: 'post',
    data
  })
}

// 新增
export const addRecord = data => {
  return axios.request({
    url: platform.OPERATE + '',
    method: 'post',
    data
  })
}

// 详情
export const getDetailsById = id => {
  return axios.request({
    url: platform.OPERATE + '/user-manage/detail?id=' + id,
    method: 'get',
  })
}

// 获取授权列表 ---
export const getLists = params => {
  return axios.request({
    url: platform.OPERATE + '/user-manage/application',
    method: 'get',
    params
  })
}

// 获取应用权限 ：/user-manage/authorize formdata
export const getAuths = params => {
  return axios.request({
    url: platform.OPERATE + '/user-manage/authorize',
    method: 'get',
    params
  })
}

// 授权
export const setAuth = (data,id) => {
  return axios.request({
    url : platform.OPERATE + `/user-manage/related-authorize?id=${id}`,
    method: 'post',
    data
  })
}
//  end-----

