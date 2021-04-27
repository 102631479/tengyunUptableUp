/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: 大司马
 * @LastEditTime: 2020-12-28 18:49:03
 */
import { maker } from '@form-create/iview'

export default [
  maker.input('用户名称：', 'userName').props({placeholder:'请输入用户名'}).col({span:4, labelWidth: 110}),
  // maker.input('名称', 'userName').col({span:4}),
  // maker.radio('状态', 'userType', ).options([
  //   { value: 1, label: '启用' },
  //   { value: 2, label: '停用' },
  // ]),
  
]
