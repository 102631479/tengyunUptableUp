import axios from '@/libs/api.request'
import platform from '@/config/platform'


// 获取用户权限列表
export const getUserList = params => {
  return axios.request({
    url: platform.OPERATE + '/user-reserve/page',
    method: 'get',
    params
  })
}


// 获取用户权限列表
export const getDeleteUser = (data) => {
  return axios.request({
    url: platform.OPERATE + '/user-reserve/' + data,
    method: 'delete',
  })
}



// 沟通或备注
export const tokenORremarks = (data) => {
  return axios.request({
    url: platform.OPERATE + '/user-reserve',
    method: 'put',
    data
  })
}
