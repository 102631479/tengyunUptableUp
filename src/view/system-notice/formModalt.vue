<template>
  <div>
    <Modal
      width="700px"
      v-model="userForm"
      title="添加公告"
      @on-ok="handleSubmit('formValidate')"
      @on-cancel="handleReset('formValidate')"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="标题：" prop="title">
          <Input placeholder="输入标题" v-model="formValidate.title" />
        </FormItem>

        <FormItem label="文档内容：" prop="noticeContent">
          <div class="edit_container">
            <quill-editor
              v-model="formValidate.noticeContent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </div>
        </FormItem>

        <FormItem label="状态：" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio :label="1">启用</Radio>
            <Radio :label="0">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
import { addNotice } from "@/api/system-notice";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {},
      userForm: false,
      edit: false,
      content: "",
      str: "",
      formValidate: {
        title: "",
        status:1,
        noticeContent: ""
      },
      ruleValidate: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        noticeContent: [{ required: true, message: "请输入文本", trigger: "blur" }]
      }
    };
  },
  mounted() {
    let noticeContent = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(noticeContent);
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return false;
        let strs = this.escapeStringHTML(this.formValidate.noticeContent)
        console.log(strs)
        addNotice({ title: this.formValidate.title, noticeContent: strs, receiveId: this.$store.state.user.userId})
          .then(res => {
            this.$Message.success(res.msg);
            this.$emit('success');
          })
          .catch(ev => {
            this.$Message.error(ev.message);
          });
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.content = "";
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-select {
  width: 30%;
}
.edit_container {
  width: 100%;
}
/deep/.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0px;
  height: 120px;
}
/deep/.ql-toolbar.ql-snow .ql-formats {
  margin-right: 4px;
}
/deep/.ql-snow .ql-picker.ql-size {
  width: 75px;
}
/deep/.ql-snow .ql-picker.ql-header {
  width: 75px;
}
/deep/.ql-snow .ql-picker {
  color: #444;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  height: 32px;
  position: relative;
  vertical-align: middle;
}
</style>
