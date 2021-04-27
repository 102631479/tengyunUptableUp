import { maker } from '@form-create/iview'

export default [
  maker.input('角色名', 'userCode').validate([ {required: true, message: '请输入登录账号'} ]),
  maker.input('角色权限', 'role').validate([ {required: true, message: '请输入登录账号'} ]),
  maker.input('描述', 'mone'),
  maker.radio('状态', 'userType', 1).options([
    {value:1,label:"启用"},
    {value:2,label:"禁用"},
  ]).validate([ {required: true, message: '请输入类型'} ])

]
