import axios from '@/libs/api.request'

// 获取权限列表
export const getAuthorityList = data => {
  return axios.request({
    url: '/permission/page',
    method: 'post',
    data
  })
}

// 新增权限
export const addPermission = data => {
  return axios.request({
    url: '/permission',
    method: 'post',
    data
  })
}

// 编辑权限
export const editPermission = data => {
  return axios.request({
    url: '/permission',
    method: 'put',
    data
  })
}

// 删除权限
export const delAuthority = id => {
  return axios.request({
    url: '/permission/' + id,
    method: 'delete'
  })
}


// 查询角色
export const getRoleList = data => {
  return axios.request({
    url: '/role/page',
    data,
    method: 'post'
  })
}

// 删除角色
export const delRole = id => {
  return axios.request({
    url: '/role/' + id,
    method: 'delete'
  })
}

// 修改角色
export const editRole = data => {
  return axios.request({
    url: '/role',
    data,
    method: 'put'
  })
}

// 添加角色
export const addRoule = data => {
  return axios.request({
    url: '/role',
    data,
    method: 'post'
  })
}


