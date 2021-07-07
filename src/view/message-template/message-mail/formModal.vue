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
    getSubstring() {
      var str = new Date().getTime().toString();
      let data = str.substring(str.length - 6);
      return data;
    },
    onEditorBlur(e) {}, // 失去焦点事件
    onEditorFocus(d) {
      // this.$refs.myQuillEditor._options.placeholder = "sss";
      console.log(d, "获得焦点事件");
    }, // 获得焦点事件
    onEditorChange(d) {
      console.log(d, "内容改变事件");
    }, //
    // false 编辑  true 增加
    // 打开窗口分辨新增还是编辑
    handleChange(file) {
      let url = file.data[0].fileAddress;
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index; // 获取当前鼠标焦点位置
      quill.insertEmbed(length, "image", url); // 插入<img src='url'/>
      quill.setSelection(length + 1);
    },
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
  height: 400px;
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
