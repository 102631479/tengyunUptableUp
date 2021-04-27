/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfudn
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: 大司马
 * @LastEditTime: 2021-02-22 16:32:25
 */
import axios from '@/libs/api.request'
import platform from '@/config/platform'

// 登录
export const login = ({ userName, password, captchaVerification }) => {
  const data = {
    account: userName,
    password,
    captchaVerification
  }
  return axios.request({
    url: platform.OPERATE + '/login',
    // url: platform.SSO + '/login/front',
    data,
    method: 'post'
  })
}


/**
 * 获取用户身份信息
 */
export const identities = id => {
  return axios.request({
    url: platform.OPERATE + `/identities-permissions`,
    method: 'get'
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return axios.request({
    url: platform.OPERATE + '/user/token',
    method: 'get'
  })
}

// 获取用户信息
// export const getUserInfo = () => {
//   return axios.request({
//     url: '/user/info',
//     method: 'get'
//   })
// }

// 用户权限查询
export const getPermission = () => {
  return axios.request({
    url: '/user/permission',
    method: 'get'
  })
}

// 分页获取用户信息
export const userPage = (data) => {
  return axios.request({
    url: '/user/page',
    data,
    method: 'post'
  })
}

// 删除用户
export const delUser = id => {
  return axios.request({
    url: '/user/' + id,
    method: 'delete'
  })
}
// 新增用户
export const addUser = data => {
  return axios.request({
    url: '/user',
    data,
    method: 'post'
  })
}
// 更新用户
export const editUser = data => {
  return axios.request({
    url: '/user',
    data,
    method: 'put'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/logout',
    method: 'post'
  })
}

