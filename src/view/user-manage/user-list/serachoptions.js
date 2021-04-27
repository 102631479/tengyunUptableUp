/*
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: huangfu
 * @LastEditTime: 2020-10-22 16:53:59
 */
import Bus from '@/bus'
export default {
    resetBtn:{
      show:true,
      long:false,
      innerText:"清除",
      icon:"none",
      // col:({labelWidth:200}),
      col:({span:1,push:2,}),
      click:(val) =>{
        // console.log(val);
        Bus.$emit('userList:onSubmit',{userName:'',userStatus:''} )
        return
      }
    },
    
    // 搜索框下面的按钮
    submitBtn: {
      show: true,
      long:false,
      innerText:"搜索",
      icon:"none",
      // col:({labelWidth:20}),
      col:({span:1,push:1,})
      // labelWidth:200
    },
    onSubmit(formData){
      Bus.$emit('userList:onSubmit',formData )
    },
  // form: {
  //   type:'flex',
  //   order:20
  // },

  global: {
    '*': {
      col: {
        span: 24,
        labelWidth: 100

      },
      validate: [
        { required: true }
      ]
    }
  }
}
