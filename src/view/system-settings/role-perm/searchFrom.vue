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
