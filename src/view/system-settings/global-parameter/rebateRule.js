import { maker } from '@form-create/iview'

export default [
  maker.input('	起点金额', 'startAmount').validate([ {required: true, message: '请输入起点金额'} ]),
  maker.input('	结点金额', 'endAmount').validate([ {required: true, message: '请输入结点金额'} ]),
  maker.input('	佣金比例', 'rebateScale').validate([ {required: true, message: '请输入起点金额'} ]),

]
 