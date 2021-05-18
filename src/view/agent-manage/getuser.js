/*
 * @Description:
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: 大司马
 * @LastEditTime: 2021-02-25 10:19:51
 */
//  编辑页面
import { maker } from '@form-create/iview'
import data from '@/libs/data.js'
export default [
  maker.hidden('id'),
  maker.hidden('identityType'),
  maker.hidden('companyId'),
  maker.hidden('roleIdList'),
  maker.hidden('orgIdList'),
  maker.input('用户名', 'userCode').validate([{ required: true, message: '请输入用户名' }]).props({ maxlength: 50 }),
  maker.input('姓名', 'userName').validate([{ required: true, message: '请输入姓名' }]).props({ maxlength: 50 }),
  maker.input('手机号', 'phone').validate([{ required: true, message: '请输入手机号' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
  ]),
  maker.input('密码', 'password').validate([{ required: true, message: '请输入密码' }]).props({
    type: 'password', maxlength: 50
  }),
  maker.input('邮箱', 'email').validate([
    { required: true, message: '请输入邮箱' },
    { pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' }
  ]),
  maker.input('微信', 'wechatAccount').validate([{ message: '请输入微信' }]).props({ maxlength: 50 }),
  maker.input('企业微信', 'wechatEnterprise').validate([{ message: '请输入企业微信' }]),
  maker.cascader('所在区域', 'areaId').validate([{ type: 'array', message: '请选择所在区域' }]).props({
    data: data[0].data
  }),
  maker.input('详细地址', 'detailsAddress').validate([{ required: false, message: '请输入详细地址' }]).props({ maxlength: 50 }),
  maker.input('账户余额', 'balance').validate([{ required: false, message: '请输入用户名' }]).props({ disabled: true }),
  // maker.select('用户身份', 'cate_id', ['104', '105', '106', '107', '108']).options([
  //   { 'value': '104', 'label': '生态蔬菜', 'disabled': false },
  //   { 'value': '105', 'label': '新鲜水果', 'disabled': false }
  // ]).props({
  //   multiple: false,
  //   disabled: false
  // }),
  // maker.radio('身份归属', 'userType', 1).options([
  //   { value: 1, label: '平台', disabled: true },
  //   { value: 3, label: '代理商', disabled: true }
  // ]).validate([{ required: true }]).emit(['on-change']).col({ span: 12 }),

  // maker.select('', 'supplierId').options([]).validate([{ required: true, message: '请选择代理' }]).props({
  //   clearable: true, filterable: true, disabled: true
  // }).col({ span: 10, labelWidth: 10 }),
  maker.radio('身份归属', 'userTypetypes', 1).options([
    { value: 1, label: '平台' },
    { value: 3, label: '代理商' }
  ]).validate([{ required: true }]).emit(['on-change']).col({ span: 12 }),
  maker.select('', 'supplierId').options([]).validate([{ required: false, message: '请选择代理' }]).props({
    clearable: true, filterable: true
  }).col({ span: 10, labelWidth: 10 }),
  maker.input('备注', 'remark').validate([{ required: false, message: '请输入备注' }]).props({ maxlength: 50 }),
  maker.radio('状态', 'userStatus', 1).options([
    { value: 1, label: '启用' },
    { value: 2, label: '禁用' },
    { value: 3, label: '拉黑' }
    // { value: 4, label: '注销' },
  ]).validate([{ required: true, message: '请输入状态' }])
]
