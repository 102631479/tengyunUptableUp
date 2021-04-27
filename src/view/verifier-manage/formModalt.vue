<template>
  <div>
    <Modal
      v-model="userForm"
      title="新建核验商"
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
        <FormItem label="Appid：" prop="email">
           <Input placeholder="自动生成"  />
        </FormItem>
        <FormItem label="AppKey：" prop="wechat">
           <Input placeholder="自动生成"  />
        </FormItem>
        <FormItem label="地区：">
            <Select  placeholder="请选择省份">
            <Option >河南</Option>
          </Select>
            <Select  placeholder="请选择城市">
            <Option >郑州</Option>
          </Select>
            <Select  placeholder="请选择县区">
            <Option >金水区</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址：" prop="address">
           <Input placeholder="请输入详细地址"  />
        </FormItem>
        <FormItem label="身份归属：" prop="identity">
            <Radio>平台</Radio>
            <Radio>代理商</Radio>
          <Select  placeholder="请选择上级代理">
            <Option >123</Option>
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
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        WeChat: [{ required: true, message: "请输入微信号", trigger: "blur" }],
        enterpriseWeChat: [{ required: true, message: "请输入企业微信号", trigger: "blur" }],
        address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        identity: [{ required: true, message: "请选择身份归属", trigger: "blur" }],
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
