<template>
  <div>
    <!-- :loading="loading" -->
    <Modal v-model="userForm" :title="edit ? '编辑用户' : '新增用户'">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="模板名称：" prop="name">
          <Input placeholder="输入模板名称" v-model="formValidate.name" />
        </FormItem>
        <!-- <FormItem label="变量数量：" prop="num">
          <Select
            style="80%"
            placeholder="请选择变量备注的数量"
            v-model="numMer"
            @on-change="getnumMer"
          >
            <Option value="1">1个变量备注</Option>
            <Option value="2">2个变量备注</Option>
            <Option value="3">3个变量备注</Option>
           <Option value="4">4个变量备注</Option>
            <Option value="5">5个变量备注</Option> 
          </Select>
        </FormItem> -->
        <FormItem label="选择平台：" prop="name">
          <RadioGroup v-model="animal">
            <Radio label="腾讯云"></Radio>
            <Radio label="阿里云"></Radio>
            <Radio label="文旅云"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="变量数量：" prop="num">
          <Select
            style="width: 380px"
            placeholder="请选择变量释义的数量"
            v-model="numMer"
            @on-change="getnumMer"
          >
            <Option value="1">1个变量释义</Option>
            <Option value="2">2个变量释义</Option>
            <Option value="3">3个变量释义</Option>
            <Option value="4">4个变量释义</Option>
            <Option value="5">5个变量释义</Option>
          </Select>
        </FormItem>
        <FormItem label="变量释义：" prop="xxx">
          <div v-for="(item, index) in numMerr" :key="index" class="ipt-top">
            <label for="" class="label-with"> [{{ index + 1 }}] </label>
            <Input
              v-model="formValidate[index]"
              placeholder="输入模板名称"
              style="width: 365px"
            />
          </div>
        </FormItem>
        <!-- <Select
        label="模板名称："
          style="width: 380px"
          placeholder="请选择变量备注的数量"
          v-model="numMer"
          @on-change="getnumMer"
        >
          <Option value="1">1个变量备注</Option>
          <Option value="2">2个变量备注</Option>
          <Option value="3">3个变量备注</Option>
          <Option value="4">4个变量备注</Option>
          <Option value="5">5个变量备注</Option>
        </Select>
        <FormItem label="变量备注：" prop="xxx">
          <Input
            v-if="notShown == 5"
            v-model="formValidate.input1"
            placeholder="输入模板名称"
            style="width: 380px"
          />
          <Input
            v-if="notShown == 5 || notShown == 4 "
            v-model="formValidate.input2"
            placeholder="输入模板名称"
            style="width: 380px"
          />
          <Input
            v-if="notShown == 5 || notShown == 4 || notShown == 3"
            v-model="formValidate.input1"
            placeholder="输入模板名称"
            style="width: 380px"
          />
          <Input
            v-if="notShown == 5 || notShown == 4 || notShown == 3|| notShown == 2"
            v-model="formValidate.input2"
            placeholder="输入模板名称"
     
          />
          <Input
            v-if="notShown == 5 || notShown == 4 || notShown == 3|| notShown == 2|| notShown == 1"
            v-model="formValidate.input3"
            placeholder="输入模板名称"
            style="width: 380px"
          />
        </FormItem> -->
        <FormItem label="模板内容：" prop="memo">
          <div class="ditor-editor">
            <quill-editor
              width="380px"
              :options="editorOption"
              v-model="formValidate.noticeContent"
              ref="myQuillEditor"
            ></quill-editor>
          </div>
          <!-- 富文本 -->
          <!-- :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)" -->
          <!-- placeholder="变量格式为：{1}，{2}                                         示例：您正在申请手机注册，验证码为：{1}，5分钟内有效！" -->
        </FormItem>
        <FormItem label="类型：" prop="xxx">
          <Select style="width: 380px" placeholder="请选择">
            <Option value="1">验证码</Option>
            <Option value="2">短息通知</Option>
          </Select>
        </FormItem>
        <FormItem label="描述：" prop="status">
          <textarea
            placeholder="请输入模板内容"
            cols="40"
            rows="3"
            style="width: 380px"
          ></textarea>
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
      animal: "",
      editorOption: {},
      // notShown: 1,   // 是否显示
      numMer: 1,
      numMerr: 1,
      edit: false,
      loading: true,
      userForm: false,
      rule, // 表单配置
      option, // 弹框表单配置
      formValidate: {
        // input1: "",
        // input2: "",
        // input3: "",
        // input4: "",
        // input5: "",
        // noticeContent: "",
        // name: "",
        // num: "",
        // xxx: "",
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        num: [{ required: false, message: "请输入模板内容", trigger: "blur" }],
        xxx: [{ required: false, message: "请关联服务", trigger: "blur" }],
        memo: [{ required: false, message: "请选择状态", trigger: "blur" }],
        status: [
          { required: false, message: "请输入模板描述", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    // this.resolution();
  },
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
    // false 编辑  true 增加
    // 打开窗口分辨新增还是编辑
    resolution() {
      if (this.edit) {
        //增加置空表单元素列表
        this.formValidate = "";
      }
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
            this.$Message.success("增加提交成功!");
            this.userForm = false;
            this.$refs.formValidate.resetFields();
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
