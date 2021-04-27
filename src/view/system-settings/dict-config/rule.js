import { maker } from '@form-create/iview'

export default [
  maker.input('名称', 'typeName').validate([ {required: true, message: '请输入应用id'} ]),
  maker.textarea('备注', 'memo').validate([ {required: true, message: '请输入备注'} ]),
  maker.radio('启用', 'useFlag', true).options([
    {value: true, label: '启用'},
    {value: false, label: '禁用'},
  ]).validate([ {required: true, message: '请输入分配的应用密钥'} ]),
]


