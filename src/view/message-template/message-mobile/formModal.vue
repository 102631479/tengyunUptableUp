<template>
  <div>
    <!-- :loading="loading" -->
    <Modal v-model="userForm" :title="edit ? '编辑模板' : '新增模板'">
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
        <div v-show="!edit">
          <FormItem label="选择平台：" prop="vendorType">
            <RadioGroup v-model="formValidate.vendorType">
              <Radio label="1">腾讯云</Radio>
              <Radio label="2">阿里云</Radio>
              <Radio label="3">文旅云</Radio>
            </RadioGroup>
          </FormItem>
        </div>

        <div v-show="formValidate.vendorType == 3">
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
              <label for="" class="label-with"> [{{ index }}] </label>
              <Input
                v-model="formValidate.definitions[index]"
                placeholder="输入变量备注"
                style="width: 365px"
              />
            </div>
          </FormItem>
        </div>

        <div v-show="formValidate.vendorType == 1">
          <FormItem label="变量数量：" prop="num">
            <Select
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
          </FormItem>

          <FormItem label="变量备注：" prop="definitions">
            <div v-for="(item, index) in numMerr" :key="index" class="ipt-top">
              <label for="" class="label-with"> [{{ index + 1 }}] </label>
              <Input
                v-model="formValidate.definitions[index]"
                placeholder="输入变量备注"
                style="width: 365px"
              />
            </div>
          </FormItem>
        </div>

        <FormItem label="模板内容" prop="templateContent">
          <Input
            :maxlength="templateDescribeNum"
            :placeholder="
              formValidate.vendorType == '2'
                ? '变量格式为：${变量}，${变量} 示例：您正在申请手机注册，验证码为：${变量}，5分钟内有效'
                : '变量格式为：{1}，{2} 示例：您正在申请手机注册，验证码为：{1}，5分钟内有效'
            "
            type="textarea"
            v-model="formValidate.templateContent"
            show-word-limit
          />
        </FormItem>

        <FormItem label="类型：" prop="templateType">
          <Select
            style="width: 380px"
            v-model="formValidate.templateType"
            placeholder="请选择"
          >
            <Option
              v-for="item in templateTypeList"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <div v-show="!edit">
          <div v-show="formValidate.vendorType != '2'">
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
          </div>
        </div>
        <FormItem label="申请说明：" prop="remark">
          <Input
            :maxlength="templateDescribeNum"
            placeholder="请输入模板申请说明，例如申请原因，使用场景等。"
            type="textarea"
            v-model="formValidate.remark"
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
import { addTemplate, putTemplate } from "@/api/message-template";
export default {
  data() {
    return {
      putId: "",
      templateDescribeNum: Number(200),
      animal: "",
      editorOption: {},
      numMer: Number("1"),
      numMerr: 1,
      edit: false,
      loading: true,
      userForm: false,
      formValidate: {
        remark: "",
        businessType: "",
        templateType: "",
        examineDescribe: null,
        international: "",
        templateContent: "",
        templateName: "",
        templateParameter: "",
        enableStatus: "1",
        vendorType: "1",
        definitions: [],
      },

      ruleValidate: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        templateContent: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        num: [{ required: false, message: "请选择变量数量", trigger: "blur" }],
        enableStatus: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
        templateType: [
          { required: true, message: "请选择短信类型", trigger: "blur" },
        ],
        international: [
          {
            required: false,
            message: "请选择短信类型",
            trigger: "blur",
          },
        ],
        remark: [
          { required: true, message: "请输入模板申请说明", trigger: "blur" },
        ],
      },
    };
  },

  created() {},
  computed: {
    templateTypeList() {
      if (this.formValidate.vendorType == "2") {
        let data = [
          {id: "0",name: "验证码",},
          {id: "1",name: "短信通知",},
          {id: "2",name: "推广短信",},
          {id: "3",name: "国际/港澳台短信",},
        ];
        return data;
      } else {
        let data = [
          {id: "0",name: "验证码",},
          {id: "2", name: "营销短信",},
        ];
        return data;
      }
    },
    eleDateNew() {
      return JSON.parse(JSON.stringify(this.formValidate.vendorType));
    },
  },
  watch: {
    userForm(val) {
      if (!this.edit) {
        this.$refs.formValidate.resetFields();
      }
    },

    eleDateNew(val) {
      if (this.edit) {
        console.log(this.edit ? "编辑" : "新增");
        this.formValidate.definitions = [];
      }
    },
  },
  methods: {
    resolution() {
      if (this.edit) {
        this.formValidate = "";
      }
    },
    threeTakeOne(vendorType) {
      let text = this.NUM_toString(true, this.formValidate.definitions);
      let data = JSON.parse(JSON.stringify(this.formValidate));
      data.definitions = text;

      if (this.formValidate.enableStatus == 1) {
        data.enableStatus = true;
      } else {
        data.enableStatus = false;
      }
      let _definitions = this.formValidate.definitions.length;

      if (vendorType == 1) {
        let dataText = [];
        for (let i = 0; i < _definitions; i++) {
          dataText.push(i + 1);
        }
        data.templateParameter = dataText.join(",");
      } else if (vendorType == 2) {
        data.definitions = "";
        data.templateParameter = "";
      } else {
        let dataText = [];
        for (let i = 0; i < _definitions; i++) {
          dataText.push(i);
        }
        data.templateParameter = dataText.join(",");
      }

      data.businessType = this.getSubstring();
      return data;
    },

    getnumMer() {
      this.numMerr = Number(this.numMer);
    },
    close() {
      console.log("关闭窗口");
      this.userForm = false;
    },
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
    Array_TonNum(arr, num) {
      let dataArr = JSON.parse(JSON.stringify(arr));
      let newArr = [];
      for (let i = 0; i < Number(num); i++) {
        console.log(i);
        newArr.push(dataArr[i]);
      }
      return newArr;
    },
    getSubstring() {
      var str = new Date().getTime().toString();
      let data = str.substring(str.length - 6);
      return data;
    },
    async submit() {
      if (this.edit) {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            this.formValidate.definitions = this.Array_TonNum(
              this.formValidate.definitions,
              this.numMer
            );
            let data = this.threeTakeOne(this.formValidate.vendorType);
            let putData = {
              id: this.putId,
              templateContent: data.templateContent,
              templateName: data.templateName,
              templateType: data.templateType,
              templateParameter: data.templateParameter,
              remark: data.remark,
              definitions: data.definitions,
            };
            console.log(putData, "编辑对象");
            putTemplate(putData)
              .then((res) => {
                this.$Message.success("编辑成功!");
                this.$refs.formValidate.resetFields();
                this.numMerr = 1;
                this.numMer = "1";
                this.userForm = false;
                this.formValidate.definitions = [];
              })
              .catch((err) => {
                this.$Message.error(err.msg);
              });
          } else {
            this.$Message.error("编辑表单验证失败!");
          }
        });
      } else {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            let data = this.threeTakeOne(this.formValidate.vendorType);
            addTemplate(data)
              .then((res) => {
                this.$Message.success("增加成功!");
                this.$refs.formValidate.resetFields();
                this.numMerr = 1;
                this.numMer = "1";
                this.userForm = false;
                this.formValidate.definitions = [];
              })
              .catch((err) => {
                this.$Message.error(err.msg);
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
