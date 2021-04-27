import platform from '@/config/platform'
import axios from '@/libs/api.request'


//列表
export const getDocumentList = (params) => {
    return axios.request({
        url: platform.OPERATE + '/document/page',
        params,
        method: 'get',
    })
}


// 添加
export const getDocumentadd = (data) => {
    return axios.request({
        url: platform.OPERATE + '/document',
        data,
        method: 'post',
    })
}

// 编辑
export const getDocumentput = (data) => {
    return axios.request({
        url: platform.OPERATE + '/document',
        data,
        method: 'put',
    })
}

// 删除
export const getDocumentdelete = (data) => {
    return axios.request({
        url: platform.OPERATE + '/document/'+data,
        method: 'delete',
    })
}

// 附件查看
export const getDocumentfiles = (data) => {
    return axios.request({
        url: platform.OPERATE + '/document/document-file/'+data,
        method: 'get',
    })
}
// 附件删除


export const getDocumentfiles_delete = (id) => {
    return axios.request({
        url: platform.OPERATE + "/document/delete-file/"+id,
        method: 'delete',
    })
}


