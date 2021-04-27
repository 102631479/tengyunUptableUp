import { maker } from '@form-create/iview'

export default [
  maker.input('	入账周期（天）', 'chargeCycle').validate([ {required: true, message: '请输入入账周期（天）'} ]),

]
 