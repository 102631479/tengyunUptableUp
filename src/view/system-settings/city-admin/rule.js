import formCreate, { maker, component } from '@form-create/iview'
import formCreatedMap from '_c/form-created-map/index.vue'
formCreate.component('formCreatedMap', formCreatedMap)
export default [
  maker.input('编码', 'cantonCode').validate([{ required: true, message: '请输入编码' }]),
  maker.input('名称', 'cantonName').validate([{ required: true, message: '请输入名称' }]),
  maker.input('备注', 'memo'),
  maker.input('名称缩写', 'shortCode').validate([{ required: true, message: '请输入名称缩写' }]),
  maker.hidden('dataSort', 1),
  maker.radio('是否启用', 'useFlag', true).options([
    { value: true, label: '启用' },
    { value: false, label: '禁用' },
  ]),
  {
    type: 'formCreatedMap',
    value: '',
    field: 'coordinates',
    title: '坐标'
  },
]
