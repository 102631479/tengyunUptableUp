// 公共服务
import axios from '@/libs/api.request'

// 分页查询行政区
export const getAuthorityList = parmse => {
  return axios.request({
    url: '/canton/page',
    method: 'get',
    parmse
  })
}
