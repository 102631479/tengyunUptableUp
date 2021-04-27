import { maker } from '@form-create/iview'

export default [
  maker.input('权限编码', 'permissionCode').validate([ {required: true, message: '请输入权限编码'} ]),
  maker.input('权限名称', 'permissionName').validate([ {required: true, message: '请输入权限名称'} ]),
  maker.radio('权限类型', 'permissionType', 1).options([
    {value:1,label:"路径权限"},
    {value:2,label:"菜单权限"},
    {value:3,label:"资源权限亦是按钮权限"}
  ]).validate([ {required: true, message: '请输入权限类型'} ])
]
