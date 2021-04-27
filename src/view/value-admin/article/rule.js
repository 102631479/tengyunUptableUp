import { maker } from '@form-create/iview'

export default [
  // maker.input('名称', 'typeName').validate([ {required: true, message: '请输入应用id'} ]),
  maker.input('标题', 'title').validate([ {required: true, message: '请输入标题'} ]),
  maker.input('内容', 'content').validate([ {required: true, message: '请输入内容'} ]),
  maker.input('备注', 'memo').validate([ {required: true, message: '请输入备注'} ]),
  maker.hidden('图片', 'photoIdList'),
  maker.hidden('附件', 'annexIdList'),

]


// categoryId	类别	int	 
// modelId	栏目id	int	 
// title	标题	String	 
// content	内容	String	 
// memo	备注	String	 
// photoIdList	图片id集合	int	 
// annexIdList	附件id集合	int