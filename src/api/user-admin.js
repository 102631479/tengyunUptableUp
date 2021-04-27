import axios from '@/libs/api.request'
import platform from '@/config/platform'


// 获取用户列表
export const getUserList = () => {
  return axios.request({
    url: platform.SSO + '/user/page',
    method: 'get'
  })
}

// 查询所有角色
export const getAllRoleList = () => {
  return axios.request({
    url: platform.SSO + '/role/all',
    method: 'get'
  })
}

// 关联组角色
export const relateOrgs = data => {
  return axios.request({
    url: platform.SSO + '/user/relate-orgs',
    method: 'post',
    data
  })
}
// 关联组
export const relateRoles = data => {
  return axios.request({
    url: platform.SSO + '/user/relate-roles',
    method: 'post',
    data
  })
}

// 集团列表
export const blocList = () => {
  return axios.request({
    url: platform.SSO + '/bloc/list',
    method: 'get'
  })
}

// 集团列表
export const setPwd = data => {
  return axios.request({
    url: platform.SSO + '/user/reset-default-password',
    method: 'put',
    data
  })
}

/**
 * 获取应用列表
*/
export const applicationList = companyId => {
  return axios.request({
    url: platform.SSO + `/application/list/${companyId}`,
    method: 'get'
  })
}

/**
 * 获取平台权限列表
*/
export const permissionSelfList = () => {
  return axios.request({
    url: platform.SSO + `/permission/self-list`,
    method: 'get'
  })
}

/**
 * 获取应用的权限列表
*/
export const permissionList = applicationId => {
  return axios.request({
    url: platform.SSO + `/permission/list/${applicationId}`,
    method: 'get',
  })
}

/**
 * 应用授权权限
*/
export const relatePermissions = ({ id, appRelatePermissions, permissionIdList }) => {
  return axios.request({
    url: platform.SSO + `/user/${id}/relate-permissions`,
    method: 'post',
    data: { appRelatePermissions, permissionIdList }
  })
}

/**
 * 获取验证码
*/
export const senCode = params => {
  return axios.request({
    url: platform.SSO + `/verify-code`,
    method: 'get',
    params
  })
}

/**
 * 获取登录页
*/
export const getLoginPage = url => {
  return axios.request({
    url: platform.OPERATE + `/login/show-info?domain=` + url,
    method: 'get'
  })
}


// /user-manage/upgrade-application  身份升级申请
export const upgradeApplication = (params) => {
  return axios.request({
    url: platform.OPERATE + `/upgrade-application/page`,
    method: 'get',
    params
  })
}

// /application-info/audit/{id}/{applicationPeopleId}/{companyId}  同意 审核
export const agreeUpgrade = (id, applicationPeopleId, companyId) => {
  return axios.request({
    url: platform.OPERATE + `/upgrade-application/audit/${id}/${applicationPeopleId}/${companyId}`,
    method: 'put'
  })
}
export const refuseUpgrade = (id) => {
  return axios.request({
    url: platform.OPERATE + `/upgrade-application/refuse/${id}`,
    method: 'put'
  })
}


// http://192.168.1.88:811/platform-file/file/img/download/下载，传文件id

export const downloadAnnex = (data) => {
  return axios.request({
    url: platform.FILE + `/file/img/download`,
    method: 'post',
    data
  })
}


// /user-manage/user-list  用户列表

// export const getUserManageList = (params) => {
//   return axios.request({
//     url: platform.COMMON + `/user-manage/user-list/page`,
//     method: 'get',
//     params
//   })
// }

