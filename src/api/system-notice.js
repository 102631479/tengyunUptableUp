/*
 * @Author: 大司马
 * @Date: 2021-01-05 11:36:01
 * @LastEditors: 大司马
 * @LastEditTime: 2021-01-05 15:47:26
 * @FilePath: \open-platform-ui\platform-console\src\api\system-notice.js
 */
import platform from '@/config/platform'

import axios from '@/libs/api.request'


export const getPages = params => {
    return axios.request({
        url: platform.MSGS + "/content/page",
        method: "get",
        params
    })
}


// 添加

export const addNotice = data => {
    return axios.request({
        url: platform.MSGS + "/content",
        method: "post",
        data
    })
}