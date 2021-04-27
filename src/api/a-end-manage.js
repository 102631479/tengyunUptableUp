import axios from '@/libs/api.request'

import platform from '@/config/platform'
// const  DBurl="http://192.168.1.57:811/platform-operate"

// export async function getAdminInfoOption () {
//     let res = await axios.get(platform.COMMON +'/application-apply/page');
//     return res
//   }

  // 获取申请分页 查询 初始化 


// export const getInit = data => {
//     return axios.request({
//         url: platform.COMMON + "/application-apply/page",
//         method: "post",
//         data
//     })
// }
// 获取管理员列表（分页）
// export async function getUserlist (data) {
//     let res = await axios.get('/userlist', {params: data});
//     return res
//   }

// 收
// async getData() {
//     let res = await getCateList()
//     this.tableData = res.list;
//   },

//  export async function getUserimpower(){
//   let res = await axios.get(platform.COMMON +'/user-manage/application');
//     return res
// }
import config from '@/config'
let actionUrl = config.baseUrl.dev+platform.FILE+"/file/img/upload"

export const getUserimpower = () => {
  return axios.request({
    url: "http://192.168.1.57:811/platform-operate/user-manage/application",
    method: 'get',
    
  })
}