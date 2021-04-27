import { maker } from '@form-create/iview'

export default [
  maker.input('	手续费百分比', 'feeRatio').validate([ {required: true, message: '请输入手续费百分比:如(0.5)%）'} ]),

]
 