import platform from '@/config/platform'
import axios from '@/libs/api.request'

// 获取企业微信 查询 初始化 
export const getWechatInt = params => {
  return axios.request({
    url: platform.OPERATE + "/wechat/page",
    method: "get",
    params
  })
}

// 获取企业微信 搜索企业 
export const getWechatKeyWord = params => {
  return axios.request({
    url: platform.OPERATE + "/wechat/list",
    method: "get",
    params
  })
}

// 获取企业微信 新增企业 
export const addWechat = data => {
  return axios.request({
    url: platform.OPERATE + "/wechat/add",
    method: "post",
    data
  })
}

// 获取企业微信 编辑企业 
export const editWechat = data => {
  return axios.request({
    url: platform.OPERATE + "/wechat/set-up",
    method: "put",
    data
  })
}

// 获取企业微信 删除企业 
export const deleteWechat = data => {
  return axios.request({
    url: platform.OPERATE + "/wechat/" + data,
    method: "delete"
  })
}


// message-Standinside      站内信api

// 请求页面数据 
export const getStandinside = params => {
  return axios.request({
    url: platform.OPERATE + "/notify-template/page",
    method: "get",
    params
  })
}

// 站内信添加
export const addtStandinside = data => {
  return axios.request({
    url: platform.OPERATE + "/notify-template",
    method: "post",
    data
  })
}

// 站内信修改
export const puttStandinside = data => {
  return axios.request({
    url: platform.OPERATE + "/notify-template",
    method: "put",
    data
  })
}

// 站内信修改
export const deletStandinside = data => {
  return axios.request({
    url: platform.OPERATE + "/notify-template/"+data,
    method: "delete",
    
  })
}
