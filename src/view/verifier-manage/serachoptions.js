export default {
    resetBtn:{
      show:true,
      long:false,
      innerText:"清除",
      icon:"none",
      // col:({labelWidth:200}),
      col:({span:0,push:0,}),
    },
    submitBtn: {
      show: true,
      long:false,
      innerText:"搜索",
      icon:"none",
      // col:({labelWidth:20}),
      col:({span:1,push:3,}),
     
      // labelWidth:200
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
