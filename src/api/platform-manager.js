/*
 * @Author: 大司马
 * @Date: 2021-02-21 17:33:55
 * @LastEditors: 大司马
 * @LastEditTime: 2021-02-22 14:11:44
 * @FilePath: \open-platform-ui\platform-console\src\api\platform-manager.js
 */
import axios from '@/libs/api.request'
import platform from '@/config/platform'

//  请求范例
// export const xx = params || data => {
//     return axios.request({
//         url: platform.OPERATE + '',
//         method: '',
//         params || data
//    })
// }

export const getPage = params => {
    return axios.request({
        url: platform.OPERATE + "/agent-management/list",
        method: 'get',
        params
    })
}

// 启用 或 停用
export const upOrDownagent = (userId, id) => {
    return axios.request({
        url: platform.OPERATE + `/agent-management/up-status/${userId}/${id}`,
        method: 'put'
    })
}

// 充值记录
export const getRecord = id => {
    return axios.request({
        url: platform.OPERATE + `/agent-management/recharge-record/${id}`,
        method: 'get'
    })
}

// 详情
export const getDetailsById = id => {
    return axios.request({
        url: platform.OPERATE + `/agent-management/detail?id=` + id,
        method: 'get'
    })
}

// 修改用户状态
export const updateFunc = data => {
    return axios.request({
        url: platform.OPERATE + `/agent-management/up-status`,
        method: 'post',
        data
    })
}

// 删除
export const delFunc = id => {
    return axios.request({
        url: platform.OPERATE + `/user-manage/delete/${id}`,
        method: 'delete'
    })
}


// 编辑
export const editFunc = data => {
    return axios.request({
        url: platform.OPERATE + '/agent-management/edit',
        method: 'put',
        data
    })
}

// 添加
export const addFunc = data => {
    return axios.request({
        url: platform.OPERATE + '/agent-management/agent',
        method: 'post',
        data
    })
}


// 授权 start

// 获取应用列表
export const getAuthList = params => {
    return axios.request({
        url: platform.OPERATE + '/agent-management/application',
        method: 'get',
        params
    })
}

// 获取应用权限列表
export const getAuthsList = params => {
    return axios.request({
        url: platform.OPERATE + '/agent-management/authorize',
        method: 'get',
        params
    })
}

// 关联权限
export const setAuth = (data,id) => {
    return axios.request({
        url: platform.OPERATE + '/agent-management/related-authorize?id='+id,
        method: 'post',
        data
    })
}


// 授权 end





// ---------产品商列表---------

// 获取应用权限列表
export const getProductlist = params => {
    return axios.request({
        url: platform.OPERATE + '/product-manage/agency-list',
        method: 'get',
        params
    })
}

// 详情
export const getProductID = id => {
    return axios.request({
        url: platform.OPERATE + `/product-manage/detail?id=` + id,
        method: 'get'
    })
}


// 编辑
export const editProduct = data => {
    return axios.request({
        url: platform.OPERATE + '/product-manage/edit',
        method: 'put',
        data
    })
}
// 添加
export const addProduct = data => {
    return axios.request({
        url: platform.OPERATE + '/product-manage/product-vendor',
        method: 'post',
        data
    })
}



// 拉黑
export const upOrDownProduct = (userId, id) => {
    return axios.request({
        url: platform.OPERATE + `/product-manage/up-status/${userId}/${id}`,
        method: 'put'
    })
}



// 删除
export const delProduct= id => {
    return axios.request({
        url: platform.OPERATE + `/product-manage/delete/${id}`,
        method: 'delete'
    })
}


// 充值记录
export const getRecordProduct = id => {
    return axios.request({
        url: platform.OPERATE + `/product-manage/recharge-record/${id}`,
        method: 'get'
    })
}



// ------------授权 开始-------------

// 获取应用列表
export const getProductLists = params => {
    return axios.request({
        url: platform.OPERATE + '/product-manage/application',
        method: 'get',
        params
    })
}

// 获取应用权限列表
export const getProductsList = params => {
    return axios.request({
        url: platform.OPERATE + '/product-manage/authorize',
        method: 'get',
        params
    })
}

// 关联权限
export const setProduct =(data,id)=> {
    return axios.request({
        url: platform.OPERATE + '/product-manage/related-authorize?id='+id,
        method: 'post',
        data
    })
}


// -----------------授权结束-------------
