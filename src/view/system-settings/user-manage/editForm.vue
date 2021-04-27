<template>
  <div>
    <Modal
      v-model="userForm"
      title="编辑用户"
      @on-ok="handleSubmit('formValidate')"
      @click="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="用户名：" prop="name">
          <Input placeholder="输入用户名" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="手机号：" prop="phone">
           <Input placeholder="请输入手机号"  />
        </FormItem>
        <FormItem label="密码：" prop="password">
           <Input placeholder="请输入密码"  />
        </FormItem>
        <FormItem label="角色：" prop="role">
           <Select  placeholder="请选择角色">
            <Option value="1">财务</Option>
            <Option value="2">人事</Option>
            <Option value="3">产品</Option>
          </Select>
        </FormItem>
        <FormItem label="备注：" prop="memo">
          <Input  placeholder="请输入备注" />
        </FormItem>
         <FormItem label="状态：" prop="status">
            <Radio>启用</Radio>
            <Radio>禁用</Radio>
        </FormItem>

      </Form>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userForm: false,
      edit: false,
      formValidate:{
          name:""
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        memo: [{ required: true, message: "请输入备注", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      }
    };
  },
  mounted() {
  },
  methods: {

    handleSubmit() {
    }
  }
};
</script>
<style  scoped>
.ivu-select{
    width: 30%;
}
</style>
