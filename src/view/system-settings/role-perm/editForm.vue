<template>
  <div>
    <Modal
      v-model="userForm"
      title="编辑角色"
      @on-ok="handleSubmit('formValidate')"
      @click="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="角色名：" prop="name">
          <Input placeholder="输入角色名" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="角色权限" prop="role">
          <div>
            <span>平台</span>
            <div>
              <Checkbox :checked.sync="single">首页</Checkbox>
            </div>
            <div>
              <Checkbox :checked.sync="single">用户</Checkbox>
              <Checkbox :checked.sync="single">增</Checkbox>
              <Checkbox :checked.sync="single">删</Checkbox>
              <Checkbox :checked.sync="single">改</Checkbox>
              <Checkbox :checked.sync="single">查</Checkbox>
            </div>
            <div>
              <Checkbox :checked.sync="single">用户管理</Checkbox>
              <Checkbox :checked.sync="single">增</Checkbox>
              <Checkbox :checked.sync="single">删</Checkbox>
              <Checkbox :checked.sync="single">改</Checkbox>
              <Checkbox :checked.sync="single">查</Checkbox>
            </div>
          </div>
        </FormItem>
        <FormItem label="描述：" prop="memo">
          <Input placeholder="请输入描述" />
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
      formValidate: {
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        memo: [{ required: true, message: "请输入备注", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    handleSubmit() {}
  }
};
</script>
<style  scoped>
.ivu-select {
  width: 30%;
}
</style>
