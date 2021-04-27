import { maker } from '@form-create/iview'

export default [
  maker.radio('初始化标识', 'initFlag').validate([{ required: true, message: '请输入备注' }])
    .options([
      { value: true, label: '启用' },
      { value: false, label: '禁用' }
    ])
  ,
  maker.input('名称', 'paramName').validate([{ required: true, message: '请输入应用id' }]),
  maker.input('value', 'paramValue').validate([{ required: true, message: '请输入应用id' }]),
  maker.radio('是否启用', 'useFlag').validate([{ required: true, message: '请输入应用id' }])
    .options([
      { value: true, label: '启用' },
      { value: false, label: '禁用' }
    ]),
]


// initFlag	初始化标识	String	 
// paramName	名称	String	 
// paramValue	 	String	 
// useFlag	是否启用	Boolean	 
// dictType.id	主表id	int	