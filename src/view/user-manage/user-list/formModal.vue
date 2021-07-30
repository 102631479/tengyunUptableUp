
<template>
  <Modal
    v-model="userForm"
    :title="edit ? '编辑用户' : '新增用户'"
    :mask-closable="false"
  >
    <formCreate
      :rule="rule"
      :option="option"
      v-model="formData"
      ref="formData"
    ></formCreate>
    <div slot="footer">
      <Button type="text" @click="closes">取消</Button>
      <Button type="primary" @click="submit" :loading="loading">确定</Button>
    </div>
  </Modal>
</template>

<script>
import option from "./options";
import rule from "./rule";
import { apiAddUser, apiEditUser } from "@/api/platform-auth";
export default {
  // inject:['reload'],
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
        this.$nextTick(() => {
          setTimeout(() => {
            this.formData.resetFields();
          }, this.delay);
        });
        // this.formData.removeField("_rowKey");
        // this.formData.removeField("_index");
        // this.formData.removeField("dataVersion");
        // this.formData.removeField("dataUpdateTime");
        // this.formData.removeField("dataCreateTime");
        // this.formData.removeField("dataVersion");
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
            companyId,
            email,
            password,
            phone,
            supplierId,
            userCode,
            userName,
            userStatus,
          } = data;
          this.loading = true;
          // console.log(data.supplierId, "supplierId");
          // console.log("提交");
          if (this.formData.form.userTypetypes == 1) supplierId = null;
          if (this.edit) {
            await apiEditUser({
              roleIdList,
              orgIdList,
              wechatAccount,
              wechatEnterprise,
              areaId,
              detailsAddress,
              remark,
              id,
              companyId,
              email,
              password,
              phone,
              supplierId,
              userCode,
              userName,
              userStatus,
              userType: this.userType,
              userCode,
            })
              .then((d) => {
                this.userForm = false;
                this.$Message.success("编辑成功");
                this.$emit("success");
                // this.userForm = false;
              })
              .catch((err) => {
                this.$Message.error(err.msg);
                this.loading = false;
              });
          } else {
            await apiAddUser({
              wechatAccount,
              wechatEnterprise,
              areaId,
              detailsAddress,
              remark,
              email,
              password,
              phone,
              supplierId,
              userCode,
              userName,
              userStatus,
              userType: 2,
              userCode,
            })
              .then((d) => {
                this.userForm = false;
                console.log(d);
                this.$Message.success("添加成功");
                this.$emit("success");
              })
              .catch((err) => {
                this.$Message.error(err.msg);
                this.loading = false;
              });
          }
          // this.loading = false;
        },
        () => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = false;
          });
        }
      );
    },
  },
};
</script>
