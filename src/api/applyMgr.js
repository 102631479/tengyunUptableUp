/*
 * @Author: 大司马
 * @Date: 2021-01-04 15:58:08
 * @LastEditors: 大司马
 * @LastEditTime: 2021-01-18 16:27:21
 * @FilePath: \open-platform-ui\platform-console\src\api\applyMgr.js
 */
import platform from '@/config/platform'
import axios from '@/libs/api.request'

// 获取申请分页 查询 初始化 
export const getInit = data => {
  return axios.request({
    url: platform.OPERATE + "/application-apply/page",
    method: "post",
    data
  })
}

// 获取应用列表

export const getAppList = () => {
  return axios.request({
    url: platform.OPERATE + "/application-apply/appl-all",
    method: "get",
  
  })
}

// 统一并授权

export const passAndAuth = data => {
  return axios.request({
    url: platform.OPERATE + "/application-apply/apply-agree",
    method: "post",
    data
  })
}

// 拒绝

export const noPass = data => {
  return axios.request({
    url: platform.OPERATE + `/application-apply/apply-refuse`,
    method: "post",
    data
  })
}

// 获取权限

export const getAuth = data => {
  return axios.request({
    url: platform.OPERATE + "/application-apply/permission-ist",
    method: "post",
    data
  })
}


// 添加备注

export const addRemark = data => {
  return axios.request({
    url: platform.OPERATE + "/application-apply/add-remark",
    method: "post",
    data
  })
}
