import axios from '@/libs/api.request'

//获取产品模板分页数据
// export const getBoxedart = (currentPage,pageSize) => {
//   return axios.request({
//     url: 'product-template/page?limit.currentPage='+currentPage+'&limit.pageSize='+pageSize,
//     method: 'get',
//     currentPage,pageSize
//   })
// }
export const getBoxedart = (params) => {
  return axios.request({
    url: 'product-template/page',
    method: 'get',
    params
  })
}
//添加
export const addBoxedart = (data) => {
  return axios.request({
    url: '/product-template',
    method: 'post',
    data
  })
}
//删除
export const deleteBoxedart = (id) => {
  return axios.request({
    url: '/product-template/'+id,
    method: 'delete',
    id
  })
}
//查看附件
export const lookFiled = (id) => {
  return axios.request({
    url: '/product-template/file/'+id,
    method: 'get',
    id
  })
}

//下载图片
export const lookpicture = (ids) => {
  return axios.request({
    url:"http://192.168.1.88:811/platform-file/file/img/download/"+ids,
    method: 'get',
    ids
  })
}