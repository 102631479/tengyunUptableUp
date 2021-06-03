<template>
  <div class="mix">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
      <div class="box">
        <FormItem label="回复反馈" prop="name">
          <div>{{ details }}</div>

          <div class="edit_container" style="flex-wrap: warp">
            <div class="img-wid" v-for="item in imgData" :key="item.id">
              <img :src="item.fileAddress" alt="" />
            </div>
          </div>
        </FormItem>
      </div>
      <div style="margin-top: 50px">
        <FormItem label="回复描述" prop="name">
          <div class="edit_container">
            <quill-editor
              v-model="form.reply"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </div>
        </FormItem>
      </div>
    </Form>
    <slot></slot>
    <div class="box1"></div>
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
    quillEditor,
  },
  data() {
    return {
      form: {
        reply: "",
      },

      details: "",
      imgData: [],
      editorOption: {},
      edit: false,

      str: "",
      formValidate: {
        name: "",
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
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
    },
  },
};
</script>
<style  scoped>
.box1 {
  height: 100px;
}
.mix {
  height: 100%;
}
.box {
  margin: 0 auto;
  /* width: 690px; */

  background: #f2f2f2;
}
.edit_container {
  /* width: 550px; */
  display: flex;
  flex-wrap: wrap;
}
.img-wid {
  overflow: hidden;
  margin-top: 20px;
  width: 150px;
  max-height: 130px;

  /* background: red; */
  margin-right: 17px;
  margin-bottom: 20px;
  /* border-radius: 6px; */
}
.img-wid img {
  width: 100%;
  width: 100%;
}
</style>
