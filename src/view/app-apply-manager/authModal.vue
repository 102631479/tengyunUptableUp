<!--
 * @Author: 大司马
 * @Date: 2021-01-06 14:31:19
 * @LastEditors: 大司马
 * @LastEditTime: 2021-02-05 14:54:33
 * @FilePath: \open-platform-ui\platform-console\src\view\app-apply-manager\authModal.vue
 -->
<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="userForm"
      title="同意并授权"
      :loading="loading"
      width="30%"
      @on-ok="submit"
    >
      <formCreate :rule="rule" :option="option" v-model="formData"></formCreate>
    </Modal>
  </div>
</template>

<script>
import option from './options'
import rule from './rule'
import { passAndAuth } from '@/api/applyMgr'

export default {
  data () {
    return {
      edit: false,
      uid: '',
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
      this.formData.submit(
        async (data) => {
          if (this.edit) {
            await editUser(data)
              .then((d) => {
                this.$Message.success('编辑成功')
                this.$emit('success')
              })
              .catch((err) => this.$Message.error('编辑失败'))
          } else {
            await passAndAuth({
              ...data,
              expireDateTime: data.expireDateTime[1],
              id: this.uid
            })
              .then((d) => {
                this.$Message.success('提交成功!')
                this.$emit('success')
              })
              .catch((e) => {
                this.$Message.error(e.message)
              })
          }
          this.userForm = false
        },
        () => {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }
      )
    }
  }
}
</script>
