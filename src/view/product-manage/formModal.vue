<template>
  <div>
    <Modal
      v-model="userForm"
      :title="edit ? '编辑产品商' : '新增产品商'"
      :loading="loading"
      @on-ok="submit"
      :mask-closable="false"
    >
      <formCreate :rule="rule" :option="option" v-model="formData"></formCreate>
      <div slot="footer">
        <Button type="text" @click="closes">取消</Button>
        <Button type="primary" :loading="loading" @click="submit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import option from "./options";
import rule from "./rule";
import { addProduct, editProduct } from "@/api/platform-manager";
export default {
  data() {
    return {
      userType: 1,
      edit: false,
      loading: false,
      userForm: false,
      formData: {},
      rule, // 表单配置
      option, // 弹框表单配置
    };
  },
  watch: {
    userForm(val) {
      this.loading = false;
      if (!val) {
        this.formData.resetFields();
        // this.formData.removeField("id");
        this.formData.removeField("_rowKey");
        this.formData.removeField("_index");
        this.formData.removeField("dataVersion");
        this.formData.removeField("dataUpdateTime");
        this.formData.removeField("dataCreateTime");
        this.formData.removeField("dataVersion");
      }
      this.formData.form.userTypetypes == 1
        ? this.formData.visibility(true, "supplierId")
        : this.formData.visibility(false, "supplierId");
    },
  },
  methods: {
    closes() {
      this.userForm = false;
    },
    async submit() {
      this.formData.submit(
        async (data) => {
          let {
            roleIdList,
            orgIdList,
            wechatAccount,
            wechatEnterprise,
            areaId,
            detailsAddress,
            remark,
            id,
            // identityType,
            companyId,
            email,
            password,
            phone,
            supplierId,
            userCode,
            userName,
            userStatus,
            userType,
            companyAddress,
          } = data;
          this.loading = true;
          if (this.formData.form.userTypetypes == 1) supplierId = null;

          if (this.edit) {
            await editProduct({
              roleIdList,
              orgIdList,
              wechatAccount,
              wechatEnterprise,
              areaId,
              detailsAddress,
              remark,
              id,
              // identityType,
              companyId,
              email,
              password,
              phone,
              supplierId,
              userCode,
              userName,
              userStatus,
              userType: this.userType,
              companyAddress,
            })
              .then((d) => {
                this.userForm = false;
                this.$Message.success("编辑成功");
                this.$emit("success");
              })
              .catch((err) => {
                this.$Message.error(err.msg);
                this.loading = false;
              });
          } else {
            await addProduct({
              wechatAccount,
              wechatEnterprise,
              areaId,
              detailsAddress,
              remark,
              companyId,
              email,
              password,
              phone,
              supplierId,
              userCode,
              userName,
              userStatus,
              userType: 2,
              companyAddress,
            })
              .then((d) => {
                this.userForm = false;
                console.log(d, "我是添加");
                this.$Message.success("添加成功");
                this.$emit("success");
              })
              .catch((err) => {
                this.$Message.error(err.msg);
                this.loading = false;
              });
          }
          //  this.loading = false;
        },
        () => {
          //  this.$nextTick(() => {
          //   this.loading = true;
          //   });
        }
      );
    },
  },
};
</script>
