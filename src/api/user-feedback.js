import axios from '@/libs/api.request'
import platform from '@/config/platform'


// 获取用户权限列表
export const getUserList = params => {
  return axios.request({
    url: platform.OPERATE + '/user-feedback/page',
    method: 'get',
    params
  })
}


// 获取用户权限列表
export const getDeleteUser = (data) => {
  return axios.request({
    url: platform.OPERATE + '/user-feedback/' + data,
    method: 'delete',
  })
}


// 回复
export const userReply = data => {
  return axios.request({
    url: platform.OPERATE + "/user-feedback/reply",
    method: "post",
    data
  })
}
