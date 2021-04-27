import { maker } from '@form-create/iview'

export default [
  maker.input('	提现日期', 'withdrawalDate').validate([ {required: true, message: '请输入提现日期'} ]),
]
 