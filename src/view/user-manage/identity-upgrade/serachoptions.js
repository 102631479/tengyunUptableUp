/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: 大司马
 * @LastEditTime: 2020-12-28 17:41:28
 */
import Bus from '@/bus'
// import bus from ''
export default {
  resetBtn:{
    show:true,
    long:false,
    innerText:"清除",
    icon:"none",
    col:({span:1,push:2,}),
    click:(val) =>{
      // console.log(val);
      Bus.$emit('upgrade:onSubmit',{userName:''} )
    }
  },
  submitBtn: {
    show: true,
    long:false,
    innerText:"搜索",
    icon:"none",
    col:({span:1,push:1,}),
  },
  onSubmit(formData){
    Bus.$emit('upgrade:onSubmit',formData )
  },
global: {
  '*': {
    col: {
      span: 12,
      labelWidth: 100

    },
    validate: [
      { required: true }
    ]
  }
}
}
