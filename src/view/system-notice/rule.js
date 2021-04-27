import { maker } from '@form-create/iview'

export default [
  maker.input('登录账号', 'userCode').validate([ { required: true, message: '请输入登录账号' } ]),
  maker.input('姓名', 'userName').validate([ { required: true, message: '请输入姓名' } ]),
  maker.input('密码', 'password').validate([ { required: true, message: '请输入密码' } ]),
  maker.input('邮箱', 'email').validate([
    { required: true, message: '请输入邮箱' },
    { pattern: /^\s*[a-zA-Z]+((?:\.{0,1})(?:\-{0,1})(?:\_{0,1})[a-zA-Z]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/, message: '邮箱格式不正确' }
  ]),
  maker.input('电话', 'phone').validate([
    { required: true, message: '请输入电话' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
  ]),
  maker.radio('状态', 'userStatus', 1).options([
    { value: 1, label: '正常' },
    { value: 2, label: '挂失' },
    { value: 3, label: '封禁' },
    { value: 4, label: '注销' }
  ]).validate([ { required: true, message: '请输入状态' } ]),
  maker.radio('类型', 'userType', 1).options([
    { value: 1, label: '平台用户' },
    { value: 2, label: '对接用户' },
    { value: 3, label: '注册用户' }
  ]).validate([ { required: true, message: '请输入类型' } ]),
  maker.radio('是否账号主体', 'adminFlag', true).options([
    { value: true, label: '是' },
    { value: false, label: '否' }
  ]).validate([ { required: true, message: '请输入账号主体' } ])
]
