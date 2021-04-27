import Vue from 'vue'

const vm =  new Vue({
  data: function () {
    return {
        num: this.value,
    }
  },
  props:{
    //预定义
    disabled:Boolean,
    value:Number,
  },
  watch:{
    value(n){
        //同步 value 的值
        this.num = n;
    }
  },
  methods: {
    onClick: function () {
        this.num++;
        //更新组件内部的值
        this.$emit('input',this.num);
    },
  },
});