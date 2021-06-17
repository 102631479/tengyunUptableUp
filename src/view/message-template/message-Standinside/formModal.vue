<template>
  <div>
    <Modal
      v-model="userForm"
      :title="edit ? '编辑用户' : '新增用户'"
      width="680px"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="模板名称：" prop="templateName">
          <Input
            placeholder="输入模板名称"
            v-model="formValidate.templateName"
          />
        </FormItem>
        <FormItem label="消息标题：" prop="title">
          <Input placeholder="输入消息标题" v-model="formValidate.title" />
        </FormItem>
        <FormItem label="模板内容：" prop="templateContent">
          <div class="ditor-editor">
            <quill-editor
              @blur="onEditorBlur"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
              :options="editorOption"
              v-model="formValidate.templateContent"
              ref="myQuillEditor"
            ></quill-editor>
          </div>
        </FormItem>
        <FormItem label="类型：" prop="relevanceServe">
          <Select placeholder="选择类型" v-model="formValidate.relevanceServe">
            <Option value="2">审核消息</Option>
            <Option value="3">订单消息</Option>
            <Option value="4">财务消息</Option>
          </Select>
        </FormItem>
        <FormItem label="模板描述：" prop="templateDescribe">
          <Input
            :maxlength="templateDescribeNum"
            placeholder="输入模板描述"
            type="textarea"
            v-model="formValidate.templateDescribe"
            show-word-limit
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="close">取消</Button>
        <Button type="primary" @click="submit">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { addtStandinside } from "@/api/message-template";

import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import option from "./options";
import rule from "./rule";
// import { addUser, editUser } from "@/api/platform-auth";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      templateDescribeNum: Number(200),
      editorOption: {
        placeholder:
          "变量格式为：${name}，示例示例：您正在申请手机注册，验证码为：${name}，5分钟内有效！", // 可选参数 富文本框内的提示语
      },
      numMer: 1,
      numMerr: 1,
      edit: false,
      loading: true,
      userForm: false,
      rule, // 表单配置
      option, // 弹框表单配置
      formValidate: {
        templateName: "",
        title: "",
        templateContent: "",
        relevanceServe: "",
        templateDescribe: "",
        state: "1",
      },
      ruleValidate: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        templateContent: [
          { required: true, message: "请输入模板内容", trigger: "blur" },
        ],
        relevanceServe: [
          { required: true, message: "请选择类型", trigger: "blur" },
        ],
        templateDescribe: [
          { required: false, message: "请输入模板描述", trigger: "blur" },
        ],
      },
    };
  },

  created() {},

  watch: {
    userForm(val) {
      // this.$refs.formValidate.resetFields();
      if (!val) {
        // this.formValidate.resetFields();
        // this.$refs.xxx.resetFields();
        // 删除parms 传过来的
        // this.formData.removeField("id");
      }
    },
  },
  methods: {
    onEditorBlur(e) {}, // 失去焦点事件
    onEditorFocus(d) {
      this.$refs.myQuillEditor._options.placeholder = "sss";
      console.log(d, "获得焦点事件");
    }, // 获得焦点事件
    onEditorChange(d) {
      console.log(d, "内容改变事件");
    }, //
    // false 编辑  true 增加
    // 打开窗口分辨新增还是编辑

    getnumMer() {
      // JSON.parse(JSON.stringify(this.numMer))
      this.numMerr = Number(this.numMer);
      // this.notShown = Number(this.numMer);
    },
    close() {
      console.log("关闭窗口");
      this.userForm = false;
    },
    async submit() {
      // console.log(this.formValidate[0]);
      let _this = this;
      if (this.edit) {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            console.log(valid);
            this.$Message.success("编辑提交成功!");
            this.userForm = false;
            this.$refs.formValidate.resetFields();
          } else {
            this.$Message.error("编辑表单验证失败!");
          }
        });
      } else {
        this.$refs.formValidate.validate((valid) => {
          console.log(valid);
          if (valid) {
            addtStandinside(_this.formValidate)
              .then((res) => {
                console.log(res, "ssssss");
                this.$Message.success("增加提交成功!");
                this.userForm = false;
                this.$refs.formValidate.resetFields();
                Bus.$emit("message-Standinside-add", "ss");
              })
              .catch((ev) => {
                this.$Message.error(ev.message);
                console.log(ev);
              });
          } else {
            this.$Message.error("增加表单验证失败!");
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.ipt-top {
  margin-bottom: 10px;
  /* margin-top: 10px; */
}
.ditor-editor {
  width: 100%;
}
</style>
<style lang="less" scoped>
.ivu-select {
  // width: 30%;
}
.edit_container {
  width: 100%;
}
/deep/.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0px;
  height: 150px;
}
/deep/.ql-toolbar.ql-snow .ql-formats {
  margin-right: 4px;
}
/deep/.ql-snow .ql-picker.ql-size {
  // width: 75px;
}
/deep/.ql-snow .ql-picker.ql-header {
  // width: 75px;
}
/deep/.ql-snow .ql-picker {
  color: #444;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  // height: 32px;
  position: relative;
  vertical-align: middle;
}
.ivu-input {
}
</style>
