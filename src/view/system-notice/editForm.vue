<template>
  <div>
    <Modal
      width="700px"
      v-model="userForm"
      title="编辑公告"
      @on-ok="handleSubmit('formValidate')"
      @click="handleReset('formValidate')"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="标题：" prop="name">
          <Input placeholder="输入标题" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="调用编译器：" prop="name">
          <div class="edit_container">
            <quill-editor
              width="500px"
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </div>
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
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    handleSubmit() {},
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
