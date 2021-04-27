<template>
  <div>
    <Modal
      v-model="userForm"
      title="编辑菜单"
      @on-ok="handleSubmit('formValidate')"
      @click="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="顶级菜单" prop="name">
          <Select name="" id="">
            <Option value="1">顶级菜单</Option>
            <Option value="2">后台首页</Option>
          </Select>
        </FormItem>
        <FormItem label="标题" prop="name">
          <Input placeholder="输入标题" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="链接规则" prop="name">
          <Input placeholder="输入链接规则" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="图标" prop="name">
          <Input placeholder="输入图标" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="排序" prop="name">
          <Input placeholder="输入排序" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="是否为菜单" prop="status">
          <Radio>是</Radio>
          <Radio>否</Radio>
        </FormItem>
        <FormItem label="状态：" prop="status">
          <Radio>启用</Radio>
          <Radio>禁用</Radio>
        </FormItem>
        <FormItem label="备注" prop="memo">
          <Input placeholder="请输入备注" />
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
