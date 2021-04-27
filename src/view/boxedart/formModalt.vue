<template>
  <div>
    <Modal
      v-model="userForm"
      title="添加模板"
      @on-ok="handleSubmit('formValidate')"
      @click="handleReset('formValidate')"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="文件名称：" prop="name">
          <Input placeholder="输入文件名称" v-model="formValidate.name" />
        </FormItem>
        <FormItem label="上传附件：" prop="filed">
          <Upload
            ref="upload"
            multiple
            :action="fileUrl"
            :before-upload="handleClearFiles"
            :on-success="handleSuccess"
          >
            <Button type="primary">上传文件</Button>
          </Upload>
        </FormItem>
        <FormItem label="备注：" prop="memo">
          <Input placeholder v-model="formValidate.memo" maxlength="30" show-word-limit />
        </FormItem>
        <FormItem label="状态：" prop="status">
          <Radio-group v-model="formValidate.useFlag">
            <Radio label="true">启用</Radio>
            <Radio label="false">禁用</Radio>
          </Radio-group>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>


import { getUserPage, addBoxedart } from "@/api/boxedart";
import axios from "axios";
export default {
  data() {
    return {
      fileUrl: "http://192.168.1.88:811/platform-file/file/img/upload",
      // fileUrl: actionUrl,
      itemid: [],
      fileId: [], //上传
      userForm: false,
      edit: false,
      formValidate: {
        name: "",
        filed: "",
        memo: "",
        useFlag: "true",
      },
      ruleValidate: {},
    };
  },
  mounted() {},
  methods: {
    //上传图片
    handleSuccess(res, file, fileList) {
      // console.log(fileList);
      let item = [];
      for (let i = 0; i < fileList.length; i++) {
        item.push({
          fileId: fileList[i].response.data[0].id,
        });
      }
      this.itemid = item;
      // console.log(item);
    },
    handleClearFiles() {
      // 再次点击上传之前，清空之前已上传文件
      this.$refs.upload.clearFiles();
    },
    handleSubmit() {
      for (let j = 0; j < this.itemid.length; j++) {
        // console.log(this.itemid[j]);
        let id = this.itemid[j];
        // console.log(id);
      }
      addBoxedart({
        name: this.formValidate.name,
        memo: this.formValidate.memo,
        useFlag: JSON.parse(this.formValidate.useFlag),
        annexIdList: [],
        photoIdList: this.itemid,
      })
        .then((res) => {
          // console.log("添加", res);
          this.$Message.success("添加成功");
          this.$emit("success");
          this.handleReset();
        })
        .catch((error) => {
          this.$Message.error("添加失败，重新添加");
        });
    },
    handleReset() {
      (this.formValidate.useFlag = ""), this.$refs.formValidate.resetFields();
      this.$refs.upload.clearFiles();
    },
  },
};
</script>
<style  scoped>
.ivu-select {
  width: 30%;

}
</style>
