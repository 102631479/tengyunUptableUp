<!--
 * @Author: 大司马
 * @Date: 2021-01-06 14:31:19
 * @LastEditors: 大司马
 * @LastEditTime: 2021-02-05 14:54:33
 * @FilePath: \open-platform-ui\platform-console\src\view\app-apply-manager\authModal.vue
 -->
<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="userForm"
      :title="edit ? '同意并授权' : '更新授权'"
      :loading="loading"
      width="30%"
    >
      <formCreate :rule="rule" :option="option" v-model="formData"></formCreate>
      <Tree :data="TreeData" show-checkbox></Tree>
      <div slot="footer">
        <Button type="text" @click="close">取消</Button>
        <Button type="primary" @click="submit">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import option from "./options";
import rule from "./rule";
import { passAndAuth } from "@/api/applyMgr";
export default {
  data() {
    return {
      TreeData: [],
      edit: true,
      uid: "",
      loading: true,
      userForm: false,
      formData: {},
      rule, // 表单配置
      option, // 弹框表单配置
    };
  },
  watch: {
    userForm(val) {
      if (!val) {
        this.formData.resetFields();
        this.formData.removeField("id");
        this.formData.removeField("_rowKey");
        this.formData.removeField("_index");
        this.formData.removeField("dataVersion");
        this.formData.removeField("dataUpdateTime");
        // this.formData.removeField("dataCreateTime");
        this.formData.removeField("dataVersion");
      }
    },
  },
  methods: {
    close() {
      this.userForm = false;
    },
    async submit() {
      // console.log(data,'data');
      this.formData.submit(
        async (data) => {
          // console.log(data, "data");
          // return
          // if (!this.edit) {
          //   await editUser(data)
          //     .then((d) => {
          //       this.loading = false;
          //       this.$Message.success("编辑成功");
          //       this.$emit("success");
          //       this.userForm = false;
          //     })
          //     .catch((err) => {
          //       this.loading = false;
          //       this.$Message.error(err.msg);
          //     });
          // } else {
          // console.log(data.permissionIdList,'FormattedMessage');
          // console.log(data.permissionIdList, "data");
          let dataArret = [];
          data.appListId.map((item) => {
            let isFalse = false;
            data.permissionIdList.map((itemm) => {
              if (itemm == item) {
                isFalse = true;
              }
            });
            if (isFalse) {
              dataArret.push(item);
            }
          });
          data.appListId = dataArret;
          // console.log(data, "dataArretdataArret");
          // return;
          await passAndAuth({
            ...data,
            // expireDateTime: data.expireDateTime[1],
            id: this.uid,
          })
            .then((d) => {
              this.loading = false;
              this.$Message.success("提交成功!");
              this.$emit("success");
              this.userForm = false;
            })
            .catch((e) => {
              this.loading = false;
              this.$Message.error(e.msg);
            });
          // }
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
