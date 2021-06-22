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
        <FormItem label="模板名称：" prop="templateName">
          <Input
            placeholder="输入模板名称"
            v-model="formValidate.templateName"
          />
        </FormItem>

        <FormItem label="选择平台：" prop="vendorType">
          <RadioGroup v-model="formValidate.vendorType">
            <Radio label="1">腾讯云</Radio>
            <Radio label="2">阿里云</Radio>
            <Radio label="3">文旅云</Radio>
          </RadioGroup>
        </FormItem>
        <div v-show="formValidate.vendorType != 2">
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

          <FormItem label="变量备注：" prop="definitions">
            <div v-for="(item, index) in numMerr" :key="index" class="ipt-top">
              <label for="" class="label-with"> [{{ index + 1 }}] </label>
              <Input
                v-model="formValidate.definitions[index]"
                placeholder="输入模板名称"
                style="width: 365px"
              />
            </div>
          </FormItem>
        </div>
        <FormItem label="模板审核描述：" prop="remark">
          <Input
            :maxlength="templateDescribeNum"
            placeholder="输入模板描述"
            type="textarea"
            v-model="formValidate.remark"
            show-word-limit
          />
        </FormItem>

        <FormItem label="类型：" prop="templateType">
          <Select
            style="width: 380px"
            v-model="formValidate.templateType"
            placeholder="请选择"
          >
            <Option value="0">验证码</Option>
            <Option value="2">营销短信</Option>
          </Select>
        </FormItem>
        <FormItem label="短信类型：" prop="international">
          <Select
            style="width: 380px"
            v-model="formValidate.international"
            placeholder="请选择"
          >
            <Option value="0">国内短信</Option>
            <Option value="1">国际/港澳台短信</Option>
          </Select>
        </FormItem>
        <FormItem label="审核描述：" prop="examineDescribe">
          <Input
            :maxlength="templateDescribeNum"
            placeholder="输入模板描述"
            type="textarea"
            v-model="formValidate.examineDescribe"
            show-word-limit
          />
        </FormItem>
        <FormItem label="状态：" prop="enableStatus">
          <RadioGroup v-model="formValidate.enableStatus">
            <Radio label="1">启用</Radio>
            <Radio label="2">禁用</Radio>
          </RadioGroup>
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
import { addTemplate } from "@/api/message-template";
import option from "./options";
import rule from "./rule";
export default {
  data() {
    return {
      templateDescribeNum: Number(200),
      animal: "",
      editorOption: {},
      numMer: "1",
      numMerr: 1,
      edit: false,
      loading: true,
      userForm: false,
      rule, // 表单配置
      option, // 弹框表单配置
      formValidate: {
        templateParameter: "",
        templateType: "0",
        examineDescribe: "审核类型",
        international: "1",
        remark: "模板审核",
        templateName: "模板名称",
        templateParameter: "",
        enableStatus: "1",
        vendorType: "1",
        definitions: [],
      },
      ruleValidate: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        num: [{ required: false, message: "请选择变量数量", trigger: "blur" }],
        // definitions: [
        //   { required: false, message: "请输入变asdasdsa量释义", trigger: "blur" },
        // ],
        enableStatus: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
        templateType: [
          { required: true, message: "请选择短信类型", trigger: "blur" },
        ],
        international: [
          { required: true, message: "请选择短信类型", trigger: "blur" },
        ],
        examineDescribe: [
          { required: true, message: "请选择短信类型", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请选择短信类型", trigger: "blur" },
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

    /*
    true  
    @prams :   Arrey    返回字符串

    false
    @prams :   String    返回数组
    */
    NUM_toString(buler, Arrey) {
      if (buler) {
        let arr = [];
        Arrey.map((item, index) => {
          arr.push({ [index]: item });
        });
        let data = JSON.stringify(arr);
        return data;
      }
    },

    async submit() {
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
          // console.log(valid);
          if (valid) {
            let text = this.NUM_toString(true, this.formValidate.definitions);
            let data = JSON.parse(JSON.stringify(this.formValidate));
            data.definitions = text;
            if (this.formValidate.enableStatus == 1) {
              data.enableStatus = true;
            } else {
              data.enableStatus = false;
            }
            let _definitions = this.formValidate.definitions.length;
            // 票联  变量是从 0开始     腾云是从 1 开始
            if (this.formValidate.vendorType == 1) {
              let dataText = [];
              for (let i = 0; i < _definitions; i++) {
                dataText.push(i + 1);
              }
              data.templateParameter = dataText.join(",");
            }
            addTemplate(data)
              .then((res) => {
                console.log(res);
                this.$Message.success("增加提交成功!");
              })
              .catch((err) => {
                console.log(err);
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
