import { maker } from '@form-create/iview'

export default [
    maker.input('一级佣金比例', 'oneLevelScale').validate([ {required: true, message: '请输入一级佣金比例'} ]),
    maker.input('二级佣金比例', 'twoLevelScale').validate([ {required: true, message: '请输入二级佣金比例'} ]),
    // maker.radio('启用', 'useFlag', true).options([
    //   {value: true, label: '启用'},
    //   {value: false, label: '禁用'},
    // ]).validate([ {required: true, message: '请输入分配的应用密钥'} ]),
  ]
