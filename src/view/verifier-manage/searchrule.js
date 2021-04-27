import { maker } from '@form-create/iview'

export default [
  maker.input('名称', 'userCode').col({span:4}),
  maker.radio('状态', 'userType', ).options([
    { value: 1, label: '启用' },
    { value: 2, label: '停用' },
  ]),
  
]
