import { maker } from '@form-create/iview'

export default [
  maker.input('名称', 'modelName').validate([ {required: true, message: '请输入名称'} ]),
  maker.input('编码', 'modelCode').validate([ {required: true, message: '请输入编码'} ]),
  maker.hidden('dataSort', 1),
  maker.hidden('parentId', 0),
]
