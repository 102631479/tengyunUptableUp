<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: 大司马
 * @LastEditTime: 2020-12-28 17:34:52
-->
<template>
  <div>
      <formCreate :rule="rule" :option="option" v-model="formData"></formCreate>
  </div>
</template>

<script>
import option from './serachoptions'
import rule from './searchrule'
import { addUser, editUser } from '@/api/platform-auth'
export default {
  data () {
    return {
      edit: false,
      loading: true,
      userForm: false,
      formData: {},
      rule, // 表单配置
      option // 弹框表单配置
    }
  },
  watch: {
    userForm (val) {
      if (!val) {
        this.formData.resetFields()
        this.formData.removeField('id')
        this.formData.removeField('_rowKey')
        this.formData.removeField('_index')
        this.formData.removeField('dataVersion')
        this.formData.removeField('dataUpdateTime')
        this.formData.removeField('dataCreateTime')
        this.formData.removeField('dataVersion')
      }
    }
  },
  methods: {
    async submit () {
      // console.log(1111);
      this.formData.submit(async data => {
        
        if (this.edit) {
          await editUser(data).then(d => {
            this.$Message.success('编辑成功')
            this.$emit('success')
          }).catch(err => this.$Message.error('编辑失败'))
        } else {
          await addUser(data).then(d => {
            this.$Message.success('添加成功')
            this.$emit('success')
          }).catch(err => this.$Message.error('添加失败'))
        }
        this.userForm = false
      }, () => {
        this.loading = false
        this.$nextTick(() => { this.loading = true })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.ivu-col-span-24 {
    display: block;
    width: 80%;
}
/deep/.ivu-form .ivu-form-item-label {
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #515a6e;
    line-height: 1;
    padding: 10px 12px 10px 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
