// /*
//  * @Description:
//  * @Version: 2.0
//  * @Autor: huangfu
//  * @Date: 2020-09-14 16:21:22
//  * @LastEditors: 大司马
//  * @LastEditTime: 2021-02-22 15:35:25
//  */

// // 详情页面
// import { maker } from '@form-create/iview'
// export default [
//   // maker.input('自建应用', 'selfBuiltApplication').validate([ { required: false, message: '请输入用户名' } ]).props({ disabled: true }),
//   // maker.input('用户名', 'id').validate([ { required: true, message: '请输入用户名' } ]).props({ disabled: true }),

//   maker.input('自建应用', 'selfBuiltApplication').validate([ { required: false, message: '请输入自建应用' } ]).props({ disabled: true }),
//   maker.input('提交工单', 'workOrderNumber').validate([ { required: false, message: '请输入提交工单' } ]),
//   maker.input('下单数量', 'ordersNumber').validate([ { required: false, message: '请输入下单数量' } ]),
//   maker.input('消费金额', 'consumptionAmount').validate([ { required: false, message: '请输入消费金额' } ]),
//   maker.input('账户余额', 'balance').validate([ { required: false, message: '请输入账户余额' } ]),
//   maker.input('一级下线', 'balance3').validate([ { required: false, message: '请输入一级下线' } ]),
//   maker.input('二级下线', 'balance5').validate([ { required: false, message: '请输入二级下线' } ]),
//   maker.input('提现总额', 'withdrawAmount').validate([ { required: false, message: '请输入提现总额' } ]),
//   maker.input('开户行', 'bank').validate([ { required: false, message: '请输入开户行' } ]),
//   maker.input('卡号', 'cardNumber').validate([ { required: false, message: '请输入卡号' } ]),
// ]


/*
 * @Description:
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: 大司马
 * @LastEditTime: 2021-02-21 15:25:28
 */
// 详情页面
import { maker } from '@form-create/iview'

export default [
  maker.input('自建应用', 'selfBuiltApplication').validate([ { required: false, message: '请输入自建应用' } ]).props({ disabled: true }),
  maker.input('提交工单', 'workOrderNumber').validate([ { required: false, message: '请输入提交工单' } ]).props({ disabled: true }),
  maker.input('下单数量', 'ordersNumber').validate([ { required: false, message: '请输入下单数量' } ]).props({ disabled: true }),
  maker.input('消费金额', 'consumptionAmount').validate([ { required: false, message: '请输入消费金额' } ]).props({ disabled: true }),
  maker.input('账户余额', 'balance').validate([ { required: false, message: '请输入账户余额' } ]).props({ disabled: true }),
  maker.input('提现总额', 'withdrawAmount').validate([ { required: false, message: '请输入提现总额' } ]).props({ disabled: true }),
  maker.input('开户行', 'bank').validate([ { required: false, message: '请输入开户行' } ]).props({ disabled: true }),
  maker.input('卡号', 'cardNumber').validate([ { required: false, message: '请输入卡号' } ]).props({ disabled: true }),
]

