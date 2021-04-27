<template>
  <div>
    <Modal v-model="userForm" :title="edit? '编辑' : '新增'" :loading="loading" @on-ok="submit">
      <formCreate :rule="$parent._props.rule" :option="option" v-model="formData"></formCreate>
    </Modal>
  </div>
</template>

<script>
import option from './options'
export default {
  name: 'formModal',
  data() {
    return {
      edit: false,
      loading: true,
      userForm: false,
      formData: {},
      option // 弹框表单配置
    }
  },
  watch: {
    userForm(val) {
      if(!val) {
        this.formData.resetFields()
        this.$parent.delKey.map(key => this.formData.removeField(key))
      }
    }
  },
  methods: {
    async submit() {
        this.formData.submit(async data => {
          if(this.edit) {
            await this.$parent.edit(data).then(d => {
              this.$Message.success('编辑成功')
              this.$emit('success')
            }).catch(err => this.$Message.error('编辑失败'))
          }else {
            await this.$parent.add(data).then(d => {
              this.$Message.success('添加成功')
              this.$emit('success')
            }).catch(err => this.$Message.error('添加失败'))
          }
          this.userForm = false
        },() => {
          this.loading = false
          this.$nextTick(() => {this.loading = true;});
        })
    }
  }
}
</script>