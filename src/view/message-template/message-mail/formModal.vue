<template>
  <div>
    <Modal
      v-model="userForm"
      :title="edit ? '编辑模板' : '新增模板'"
      width="680px"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <div v-show="!edit">
          <FormItem label="模板CODE：" prop="businessType">
            <div style="display: flex">
              <Input
                placeholder="模板CODE"
                :width="100"
                v-model="formValidate.businessType"
              ></Input>
              <Button style="margin-left: 10px" @click="getCODE"
                >获取随机code</Button
              >
            </div>
          </FormItem>
        </div>

        <FormItem label="模板名称：" prop="templateName">
          <Input
            placeholder="输入模板名称"
            v-model="formValidate.templateName"
          />
        </FormItem>
        <FormItem label="邮件标题：" prop="subject">
          <Input placeholder="输入消息标题" v-model="formValidate.subject" />
        </FormItem>
        <FormItem label="邮件内容：" prop="content">
          <div class="ditor-editor">
            <quill-editor
              @blur="onEditorBlur"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
              :options="editorOption"
              v-model="formValidate.content"
              ref="myQuillEditor"
            ></quill-editor>
            <div style="display: none">
              <upload
                name="file"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                :on-success="handleChange"
                @change="handleChange"
                :action="actionUrl"
              >
                <div ref="aUpload">
                  <div class="ant-upload-text">Upload</div>
                </div>
              </upload>
            </div>
          </div>
        </FormItem>
        <FormItem label="描述：" prop="remarks">
          <Input
            :maxlength="templateDescribeNum"
            placeholder="输入邮件描述"
            type="textarea"
            v-model="formValidate.remarks"
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
import config from "@/config";
import { hasOneOf } from "@/libs/tools";
import { addtMail, puttMail } from "@/api/message-template";
import Bus from "@/bus";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import option from "./options";
import rule from "./rule";
import { quillRedefine } from "vue-quill-editor-upload";

import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
// import { addUser, editUser } from "@/api/platform-auth";
export default {
  components: {
    quillEditor,
    quillRedefine,
  },
  data() {
    return {
      actionUrl:
        process.env.NODE_ENV === "development"
          ? config.baseUrl.dev + "/platform-file/file/img/upload"
          : process.env.NODE_ENV === "testing"
          ? config.baseUrl.test + "/platform-file/file/img/upload"
          : config.baseUrl.pro + "/platform-file/file/img/upload",
      editid: "",
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
        businessType: "",
        templateName: "",
        subject: "",
        content: "",
        remarks: "",
      },
      ruleValidate: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        subject: [
          { required: true, message: "请输入消息标题", trigger: "blur" },
        ],
        templateContent: [
          { required: true, message: "请输入模板内容", trigger: "blur" },
        ],

        remarks: [
          { required: false, message: "请输入模板描述", trigger: "blur" },
        ],
        businessType: [
          { required: false, message: "模板code", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    let vm = this;
    const modules = {
      imageResize: {
        displayStyles: {
          backgroundColor: "black",
          border: "none",
          color: "white",
        },
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: function (value) {
            vm.$refs.aUpload.click();
          },
        },
      },
    };
    vm.editorOption.modules = modules;
  },

  watch: {
    userForm(val) {
      if (!this.edit) {
        this.$refs.formValidate.resetFields();
      }
    },
  },
  methods: {
    getCODE() {
      this.formValidate.businessType = this.getSubstring();
    },
    getSubstring() {
      var str = new Date().getTime().toString();
      let data = str.substring(str.length - 6);
      return data;
    },
    onEditorBlur(e) {}, 
    onEditorFocus(d) {

    }, 
    onEditorChange(d) {
    }, 

    handleChange(file) {
      let url = file.data[0].fileAddress;
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index; 
      quill.insertEmbed(length, "image", url); 
      quill.setSelection(length + 1);
    },
    getnumMer() {
      this.numMerr = Number(this.numMer);
    },
    close() {
      this.userForm = false;
    },
    async submit() {
      let _this = this;
      if (this.edit) {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            _this.formValidate.id = _this.editid;
            _this.formValidate.isDelete = 1;
            puttMail(_this.formValidate)
              .then((res) => {
                delete _this.formValidate.id;
                this.$Message.success("编辑成功!");
                this.userForm = false;
                this.$refs.formValidate.resetFields();
                Bus.$emit("message-Mail-add", "ss");
              })
              .catch((ev) => {
                this.$Message.error(ev.message);
                console.log(ev);
              });
          } else {
            this.$Message.error("编辑表单验证失败!");
          }
        });
      } else {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            _this.formValidate.businessType = this.getSubstring();
            addtMail(_this.formValidate)
              .then((res) => {
                this.$Message.success("增加提交成功!");
                this.userForm = false;
                this.$refs.formValidate.resetFields();
                Bus.$emit("message-Mail-add", "ss");
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
}
.ditor-editor {
  width: 100%;
}
</style>
<style lang="less" scoped>
.ivu-select {
}
.edit_container {
  width: 100%;
}
/deep/.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0px;
  height: 400px;
}
/deep/.ql-toolbar.ql-snow .ql-formats {
  margin-right: 4px;
}
/deep/.ql-snow .ql-picker.ql-size {
}
/deep/.ql-snow .ql-picker.ql-header {
}
/deep/.ql-snow .ql-picker {
  color: #444;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  vertical-align: middle;
}
.ivu-input {
}
</style>
