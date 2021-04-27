/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: huangfu
 * @LastEditTime: 2020-10-22 10:57:37
 */
import { maker } from '@form-create/iview'
export default [
  maker.input('自建应用', 'selfBuiltApplication').validate([ { required: false, message: '请输入用户名' } ]),
  maker.input('提交工单', 'workOrderNumber').validate([ { required: false, message: '请输入用户名' } ]),
  maker.input('下单数量', 'ordersNumber').validate([ { required: false, message: '请输入用户名' } ]),
  maker.input('消费金额', 'consumptionAmount').validate([ { required: false, message: '请输入用户名' } ]),
  maker.input('账户余额', 'balance').validate([ { required: false, message: '请输入用户名' } ]),
  maker.input('提现总额', 'withdrawAmount').validate([ { required: false, message: '请输入用户名' } ]),
]
