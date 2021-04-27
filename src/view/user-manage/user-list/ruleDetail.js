import { maker } from '@form-create/iview'
export default [
  // maker.input('用户名', 'userCode').validate([ { required: false, message: '请输入用户名' } ]).props({ disabled: true }),
  maker.input('自建应用', 'selfBuiltApplication').validate([{ required: false, message: '请输入用户名' }]).props({ disabled: true }),
  maker.input('提交工单', 'workOrderNumber').validate([{ required: false, message: '请输入用户名' }]).props({ disabled: true }),
  maker.input('下单数量', 'ordersNumber').validate([{ required: false, message: '请输入用户名' }]).props({ disabled: true }),
  maker.input('消费金额', 'consumptionAmount').validate([{ required: false, message: '请输入用户名' }]).props({ disabled: true }),
  maker.input('账户余额', 'balance').validate([{ required: false, message: '请输入用户名' }]).props({ disabled: true }),
  maker.input('提现总额', 'withdrawAmount').validate([{ required: false, message: '请输入用户名' }]).props({ disabled: true }),
]
