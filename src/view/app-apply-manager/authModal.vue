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
      <formCreate
        :rule="rule"
        :option="option"
        v-model="formData"
        ref="formDataTree"
      ></formCreate>

      <Form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        :label-width="150"
      >
        <FormItem prop="timeData" label="到期时间：">
          <DatePicker
            type="datetime"
            format="yyyy-MM-dd"
            v-model="formInline.timeData"
            placeholder="请选择时间"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="权限设置：">
          <Tree :data="TreeData" show-checkbox multiple ref="appTree"></Tree>
        </FormItem>
      </Form>
      <!-- {{ TreeData }} -->
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
      roleId: "",
      TreeData: [],
      edit: false,
      uid: "",
      loading: true,
      userForm: false,
      formData: {},
      rule, // 表单配置
      option, // 弹框表单配置

      formInline: {
        timeData: "",
      },
      dataPermissionIdList: [],
      ruleInline: {
        timeData: [
          {
            required: true,
            message: "请选择时间",
          },
        ],
      },
    };
  },
  created() {
    this.$nextTick(() => {
      // this.$refs.appTree.getCheckedId(['1417367965409611776']);
    });
  },
  watch: {
    userForm(val) {
      // .getCheckedAndIndeterminateNodes();

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
    timeChina(time) {
      var str = time;
      str = str.replace(/ GMT.+$/, ""); // Or str = str.substring(0, 24)
      var d = new Date(str);
      var a = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ];
      for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] < 10) {
          a[i] = "0" + a[i];
        }
      }
      str =
        a[0] + "-" + a[1] + "-" + a[2] + " " + "23" + ":" + "59" + ":" + "59";
      // a[0] + "-" + a[1] + "-" + a[2] + " " + a[3] + ":" + a[4] + ":" + a[5];
      return str;
    },
    getCheckedId(arr) {
      let arrEy = [];
      arr.map((item) => {
        arrEy.push(item.id);
      });
      return arrEy;
    },

    handleSubmit(name) {
      return new Promise((resolve, reject) => {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.dataPermissionIdList = this.getCheckedId(
              this.$refs.appTree.getCheckedAndIndeterminateNodes()
            );
            // this.$Message.success("Success!");
            resolve(this.dataPermissionIdList);
          } else {
            reject();
          }
        });
      });
    },
    close() {
      this.userForm = false;
    },
    getData(data) {
      passAndAuth({
        ...data,
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
    },
    submit() {
      console.log("校验");
      // this.formData.submit(
      //   (data) => {
      this.handleSubmit("formInline")
        .then((res) => {
          // console.log("成功");
          let data = this.formData.form;
          // return;
          let dataArret = [];
          data.appListId.map((item) => {
            let isFalse = false;
            res.map((itemm) => {
              if (itemm == item) {
                isFalse = true;
              }
            });
            if (isFalse) {
              dataArret.push(item);
            }
          });
          if (this.roleId == "") {
            delete data.roleId;
          } else {
            data.roleId = this.roleId;
          }
          // var d = this.formInline.timeData;

          // let youWant =
          //   d.getFullYear() +
          //   "-" +
          //   (d.getMonth() + 1) +
          //   "-" +
          //   d.getDate() +
          //   " " +
          //   d.getHours() +
          //   ":" +
          //   d.getMinutes() +
          //   ":" +
          //   d.getSeconds();
          data.expireDateTime = this.timeChina(
            JSON.parse(JSON.stringify(this.formInline.timeData))
          );
          // console.log(this.formInline.timeData, "this.formInline.timeData");
          data.appListId = dataArret;
          // console.log(res, "权限列表");
          // data.permissionIdList = res;
          // return
          // console.log(data, "this.formData");
          let dataForm = JSON.parse(JSON.stringify(data));
          dataForm.permissionIdList = res;
          // console.log(dataForm.permissionIdList,'dataForm.permissionIdList');
          this.getData(dataForm);
        })
        .catch((err) => {
          this.$Message.error("请选择时间");
        });

      //   }
      // },
      () => {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      };
      // );
    },
  },
};
</script>

<style scoped>
.Tree-Style {
  width: 200px;
  margin: 0 auto;
}
</style>