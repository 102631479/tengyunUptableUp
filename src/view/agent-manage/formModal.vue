<template>
  <div>
    <Modal
      v-model="userForm"
      :title="edit ? '编辑代理商' : '新增代理商'"
      :loading="loading"
      @on-ok="submit"
      :mask-closable="false"
    >
      <formCreate :rule="rule" :option="option" v-model="formData"></formCreate>
    </Modal>
  </div>
</template>

<script>
import option from "./options";
import rule from "./getuser";
import { addFunc, editFunc } from "@/api/platform-manager";
export default {
  data() {
    return {
      userType: 1,
      edit: false,
      loading: true,
      userForm: false,
      formData: {},
      rule, // 表单配置
      option, // 弹框表单配置
    };
  },
  created() {
    // this.clonse()
  },

  watch: {
    edit() {
      if (!this.edit) {
        console.log(this.formData, "formData");
      }
    },

    userForm(val) {
      if (!val) {
        this.formData.resetFields();
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
    // clonse() {
    //   if (!this.edit) {
    //     this.formData.disabled(true, "cate_id");
    //   } else {
    //     this.formData.disabled(false, "cate_id");
    //   }
    // },
    async submit() {
      this.formData.submit(
        async (data) => {
          let {
            roleIdList,
            orgIdList,
            areaId,
            id,
            identityType,
            companyId,
            email,
            password,
            phone,
            supplierId,
            userCode,
            userName,
            userStatus,
            userType,
            detailsAddress,
            remark,
          } = data;
          if (this.formData.form.userTypetypes == 1) supplierId = null;
          if (this.edit) {
            await editFunc({
              roleIdList,
              orgIdList,
              id,
              areaId,
              identityType: identityType[0],
              companyId,
              email,
              password,
              phone,
              supplierId,
              userCode,
              userName,
              userStatus,
              userType: this.userType,
              detailsAddress,
              remark,
            })
              .then((d) => {
                this.$Message.success("编辑成功");
                this.$emit("success");
              })
              .catch((err) => {
                let ev = err.msg ? err.msg : err.message;
                this.$Message.error(ev);
              });
          } else {
            await addFunc({
              email,
              areaId,
              password,
              phone,
              supplierId,
              userCode,
              userName,
              userStatus,
              userType: 2,
              detailsAddress,
              remark,
            })
              .then((d) => {
                // console.log(d)
                this.$Message.success("添加成功");
                this.$emit("success");
              })
              .catch((err) => {
                // console.log(err)
                let ev = err.msg ? err.msg : err.message;
                this.$Message.error(ev);
              });
          }
          this.userForm = false;
        },
        () => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }
      );
    },
  },
};
</script>
