/*
 * @Author: 大司马
 * @Date: 2021-01-07 16:28:38
 * @LastEditors: 大司马
 * @LastEditTime: 2021-01-07 19:46:46
 * @FilePath: \open-platform-ui\platform-console\src\view\app-apply-manager\rule.js
 */
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: huangfu
 * @LastEditTime: 2020-11-11 17:13:35
 */
import {
  maker
} from '@form-create/iview'
export default [
  // maker.hidden('fileId'),
  // maker.hidden('dataCreateTime'),
  maker.hidden('phone'),
  maker.hidden('userId'),
  maker.hidden('dataCreateTime'),
  maker.hidden( 'appListId', []),
  // maker.date('到期时间：', 'expireDateTime', {}).validate([{
  //   required: true,
  //   message: '请输入到期时间'
  // }]).props({
  //   "type": "daterange",
  //   // "format": "yyyy-MM-dd HH:mm:ss",
  // }),
  maker.date('到期时间：', 'expireDateTime').validate([{
    required: true,
    message: '请输入到期时间'
  }]).props({
    // "type": "daterange",
    "format": "yyyy-MM-dd 23:59:59",
  }),
  // maker.select('已申请应用：', 'appListId', []).validate([{
  //   required: true,
  //   message: '请输入申请应用'
  // }]).props({
  //   multiple: true
  // }),
  maker.tree('权限设置：', 'permissionIdList', []).emit(['on-check-change']).props({
    multiple: true,
    showCheckbox: false,
    checkStrictly: true,
    data: [],
  }),
]
