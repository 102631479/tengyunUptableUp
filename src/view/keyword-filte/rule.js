import { maker } from '@form-create/iview'

export default [
  maker.input('创建人id',   'userId').validate([ {required: true, message: '请输入创建人id'} ]),
  maker.input('创建人名称', 'userName').validate([ {required: true, message: '请输入创建人名称'} ]),
  maker.hidden('dataSort', 1),
  maker.input('关键词',     'keywords').validate([ {required: true, message: '请输入关键词'} ]),
]
