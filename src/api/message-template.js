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

// 站内信删除
export const deletStandinside = data => {
  return axios.request({
    url: platform.OPERATE + "/notify-template/" + data,
    method: "delete",

  })
}



// 短信模板
// 请求页面数据 
export const getTemplateData = params => {
  return axios.request({
    url: platform.OPERATE + "/message-template/page",
    method: "get",
    params
  })
}

//短信模板Code修改
export const putMobileCode = data => {
  return axios.request({
    url: platform.OPERATE + "/message-template/update-template-id",
    method: "post",
    data
  })
}

// dele
export const deleTemplate = data => {
  return axios.request({
    url: platform.OPERATE + "/message-template/" + data,
    method: "delete",
  })
}

// 站内信添加
export const addTemplate = data => {
  return axios.request({
    url: platform.OPERATE + "/message-template",
    method: "post",
    data
  })
}
// 短信修改
export const putTemplate = data => {
  return axios.request({
    url: platform.OPERATE + "/message-template",
    method: "put",
    data
  })
}


// 邮件模板
// 邮件模板请求页面数据 
export const getMail = params => {
  return axios.request({
    url: platform.OPERATE + "/mail-template/page",
    method: "get",
    params
  })
}


//邮件模板添加
export const addtMail = data => {
  return axios.request({
    url: platform.OPERATE + "/mail-template",
    method: "post",
    data
  })
}


//邮件模板修改
export const puttMail = data => {
  return axios.request({
    url: platform.OPERATE + "/mail-template",
    method: "put",
    data
  })
}

//邮件模板删除
export const deletMail = data => {
  return axios.request({
    url: platform.OPERATE + "/mail-template/" + data,
    method: "delete",

  })
}




