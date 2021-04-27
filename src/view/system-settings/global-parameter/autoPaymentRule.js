import { maker } from '@form-create/iview'

export default [
  maker.input('打款金额', 'amount').validate([ {required: true, message: '请输入打款'} ]),
  maker.radio('是否自动打款', 'autoFlag', true).options([
    {value: true, label: '启用'},
    {value: false, label: '禁用'},
  ]).validate([ {required: true, message: '请选择是否启用'} ]),
]
