import axios from '@/libs/api.request'
import platform from '@/config/platform'



// 获取用户权限列表
export const getImpowerList = params => {
    return axios.request({
        url: platform.OPERATE + '/user-manage/findByUserAppList',
        method: 'get',
        params
    })
}
// 取消用户权限列表
export const cancelImpowerList = params => {
    return axios.request({
        url: platform.OPERATE + '/user-manage/deleteUserApp',
        method: 'delete',
        params
    })
}


// 身份升级传值
export const getStatusupdate = data => {
    return axios.request({
        url: platform.OPERATE + '/user-manage/upGrade',
        method: 'post',
        data
    })
}


// agentManage_cancel agentManage_getList

// 代理商获取用户权限列表
export const agentManage_getList = params => {
    return axios.request({
        url: platform.OPERATE + '/agent-management/findByUserAppList',
        method: 'get',
        params
    })
}
// 代理商取消用户权限列表
export const agentManage_cancel = params => {
    return axios.request({
        url: platform.OPERATE + '/agent-management/deleteUserApp',
        method: 'delete',
        params
    })
}








// productManage_getList , productManage_cancel

// 产品商获取用户权限列表
export const productManage_getList = params => {
    return axios.request({
        url: platform.OPERATE + '/product-manage/findByUserAppList',
        method: 'get',
        params
    })
}
// 产品商取消用户权限列表
export const productManage_cancel = params => {
    return axios.request({
        url: platform.OPERATE + '/product-manage/deleteUserApp',
        method: 'delete',
        params
    })
}
