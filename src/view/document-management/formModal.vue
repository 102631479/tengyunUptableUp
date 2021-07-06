<template>
  <div>
    <!-- :loading="loading" -->
    <Modal
      v-model="userForm"
      :title="edit ? '编辑文档' : '新增文档'"
      :mask-closable="false"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruless"
        :label-width="100"
      >
        <FormItem label="文件名称：" prop="fileName">
          <Input
            placeholder="输入文件名称"
            v-model="formValidate.fileName"
            :maxlength="40"
          />
        </FormItem>
        <!-- action="http://192.168.1.57:811/platform-file/file/img/upload" -->

        <FormItem label="上传附件" prop="fileId">
          <Upload
            ref="fileIdupload"
            :action="actionUrl"
            :on-success="handleSuccess"
            :before-upload="handleBeforeUpload"
            :default-file-list="updataHtml"
            :on-remove="removeUpload"
            :on-error="updataError"
          >
            <Button icon="ios-cloud-upload-outline">上传附件</Button>
          </Upload>
        </FormItem>

        <FormItem label="备注：" prop="remake">
          <Input v-model="formValidate.remake" :maxlength="40" />
        </FormItem>

        <FormItem label="状态" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio :label="1">启用</Radio>
            <Radio :label="2">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer" class="btn">
        <Button type="text" @click="close">取消</Button>
        <Button type="primary" :loading="loading" @click="submit">
          {{ edit ? "确认编辑" : "确认增加" }}</Button
        >
      </div>
    </Modal>
  </div>
</template> 

<script>
import config from "@/config";
import Bus from "@/bus";
import option from "./options";
import rule from "./rule";
import {
  getDocumentadd,
  getDocumentput,
  getDocumentfiles_delete,
} from "@/api/document-management";
// import { delete } from "vue/types/umd";

export default {
  data() {
    return {
      updataHtml: [
        // {
        //   name: "",
        //   id: "",
        // },
      ],
      actionUrl:
        process.env.NODE_ENV === "development"
          ? config.baseUrl.dev + "/platform-file/file/img/upload"
          : process.env.NODE_ENV === "testing"
          ? config.baseUrl.test + "/platform-file/file/img/upload"
          : config.baseUrl.pro + "/platform-file/file/img/upload",
      id: "",
      edit: false,
      userForm: false,
      rule, // 表单配置
      option, // 弹框表单配置
      loading: false,
      formValidate: {
        remake: "",
        fileName: "",
        status: 1,
        fileId: "",
      },
      ruless: {
        fileName: [
          { required: true, message: "请输入文件名称", trigger: "blur" },
        ],
        remake: [{ required: true, message: "请添加备注", trigger: "blur" }],
        // status: [{ required: false, message: "1", trigger: "blur" }],
        fileId: [{ required: false, message: "4", trigger: "blur" }],
      },
    };
  },

  created() {},
  watch: {
    userForm(val) {
      if (!val) this.$refs.fileIdupload.clearFiles();
      if (!this.edit) {
        this.$nextTick(() => {
          this.$refs.formValidate.resetFields();
        });
      }
    },
  },
  methods: {
    close() {
      this.userForm = false;
    },
    removeUpload() {
      if (this.userForm) {
        if (this.updataHtml.length == 1) {
          this.$Modal.confirm({
            title: "提示",
            content: "确认删除？",
            onOk: () => {
              getDocumentfiles_delete(this.updataHtml[0].id)
                .then((res) => {
                  // console.log("删除成功");
                  this.formValidate.fileId = "";
                  this.updataHtml = [];
                  this.$Message.success("已删除");
                })
                .catch((e) => {
                  // console.log("删除失败");
                  let ev = e.msg ? e.msg : e.message;
                  this.$Message.error(ev);
                });
            },
          });
        } else {
          this.formValidate.fileId = "";
        }
      } else {
        this.formValidate.fileId = "";
      }
    },

    handleBeforeUpload() {
      this.$refs.fileIdupload.clearFiles();
    },
    updataError() {
      this.$Message.error("无网络服务");
    },
    handleSuccess(res, file) {
      this.formValidate.fileId = res.data[0].id;
      console.log(res.data[0].id, "res上传成功的函数");
    },
    // false 编辑  true 增加
    // 打开窗口分辨新增还是编辑

    getnumMer() {
      this.numMerr = Number(this.numMer);
    },

    submit() {
      this.$refs.formValidate.validate((valid) => {
        if (!valid) return;
        delete this.formValidate._index;
        delete this.formValidate._rowKey;
        if (this.edit) {
          console.log("验证编辑表单");
          this.loading = true;
          getDocumentput(this.formValidate)
            .then((res) => {
              Bus.$emit("issue", this.edit);
              this.$Message.success("提交成功!");
              this.userForm = false;
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
              this.$Message.error("编辑表单验证失败!");
            });
        } else {
          console.log("验证添加表单");
          delete this.formValidate.id;
          delete this.formValidate.dataCreateTime;
          delete this.formValidate.dataUpdateTime;
          delete this.formValidate.dataVersion;
          delete this.formValidate.belong;
          delete this.formValidate.fileAddress;
          this.loading = true;
          getDocumentadd(this.formValidate)
            .then((res) => {
              Bus.$emit("issue", this.edit);
              this.$Message.success("提交成功!");
              this.userForm = false;
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.$Message.error("添加表单验证失败!");
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.ipt-top {
  margin-bottom: 10px;
  /* margin-top: 10px; */
}
/* .btn { */
/* display: flex; */
/* justify-content: center; */
/* } */
</style>
