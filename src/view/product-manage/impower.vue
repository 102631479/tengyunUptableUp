<template>
  <Modal
    v-model="userForm"
    title="授权"
    width="60%"
    :mask-closable="false"
    @on-ok="childClick('formInline')"
    @on-cancel="handleReset('formInline')"
  >
    <div class="box-big">
      <div class="left">
        <h3>已授权信息</h3>
        <Table :columns="columns" :data="tabData" :border="true"></Table>
        <h3>本次更新信息</h3>
        <Table :columns="columnsNew" :data="tabDataa" :border="true"></Table>
      </div>
      <div class="line-left"></div>

      <div class="right">
        <Form
          :model="formInline"
          ref="formInline"
          :rules="ruleFormValid"
          :label-width="100"
        >
          <FormItem label="应用列表：" prop="id">
            <Select
              @on-change="getListId"
              v-model="formInline.id"
              style="width: 200px"
            >
              <Option
                v-for="item in lists"
                :key="item.id"
                :value="item.id"
                @click="addname(item.appName)"
                >{{ item.appName }}</Option
              >>
            </Select>
            <Button
              v-if="!adminFlag"
              type="primary"
              style="margin-left: 12px"
              @click="childClick('formInline')"
              >提交</Button
            >
          </FormItem>

          <FormItem
            label="到期时间："
            v-if="adminFlag"
            prop="appExpireDateTime"
          >
            <Date-picker
              :options="options3"
              type="datetime"
              v-model="formInline.appExpireDateTime"
              placeholder="选择日期和时间"
              style="width: 200px"
            ></Date-picker>
            <!-- 
            <DatePicker
              
              type="date"
              placeholder="请选择到期时间"
              style="width: 200px"
            ></DatePicker> -->
            <Button
              type="primary"
              style="margin-left: 12px"
              @click="childClick('formInline')"
              >确认</Button
            >
          </FormItem>

          <FormItem label="应用权限：" prop="appRelatePermissions">
            <Tree
              :data="baseData"
              show-checkbox
              ref="tree"
              @on-check-change="clackTree"
            >
            </Tree>
          </FormItem>
        </Form>
      </div>
    </div>

    <div slot="footer">
      <!-- <Button type="primary" v-if="!adminFlag" @click="childClick('formInline')"
        >确认</Button
      > -->
      <Button @click="closee">取消</Button>
    </div>
  </Modal>
</template>

<script>
// 导入 树形图列表权限列表
import { hasOneOf } from "@/libs/tools";

import { getProductsList, setProduct } from "@/api/platform-manager";
import { productManage_getList, productManage_cancel } from "@/api/user-list";
export default {
  props: ["imporer"],
  // props: { imporer: Object },
  // props: {  type: Object, imporer: () => ({})  },
  watch: {
    imporer(val) {
      this.imporer = val;
      // this.baseData = this.imporer;
    },
    userForm(val) {
      // console.log(val, " userForm变化量");
      if (val) {
        this.gitapi();
        this.tabDataa = [];
      }
    },
  },
  created() {},
  data() {
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        },
      },
      hasOneOf,
      //授权成功返回
      appIdid: "",
      reurnImpowername: "",
      // 本次更新
      tabDataa: [],
      tabData: [
        // { a: "土木删除", time: "2021-06-28   23:59:59" },
        // { a: "智慧测试", time: "2021-06-28   23:59:59" },
      ],
      columns: [
        { title: "已授权应用", key: "appName", align: "center" },
        {
          title: "当前到期时间",
          key: "expireDateTime",
          align: "center",
          render: (h, params) => [
            h(
              "span",
              {},
              params.row.expireDateTime == "" ? "--" : params.row.expireDateTime
            ),
          ],
        },
        {
          title: "操作",
          key: "a",
          align: "center",
          render: (h, params) => [
            h(
              "span",
              {
                props: { type: "primary", size: "small" },
                style: {
                  marginRight: "15px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:product-manage:agency-delete-app"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "温馨提示",
                      content: "确定取消授权吗？",
                      onOk: () => {
                        // console.log(params.row.id, "sss");
                        // this.$Message.success("取消授权");
                        productManage_cancel({
                          appId: params.row.id,
                          userId: this.idid,
                        })
                          .then((res) => {
                            this.gitapi();
                            this.tabDataa.forEach((item, index) => {
                              if (params.row.appName == item.appName) {
                                this.tabDataa.splice(index, 1);
                              }
                            });
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                      },
                    });
                  },
                },
              },
              "取消授权"
            ),
          ],
        },
      ],
      columnsNew: [
        { title: "已授权应用", key: "appName", align: "center" },
        {
          title: "当前到期时间",
          key: "expireDateTime",
          align: "center",
          render: (h, params) => [
            h(
              "span",
              {},
              params.row.expireDateTime == "" ? "--" : params.row.expireDateTime
            ),
          ],
        },
        {
          title: "操作",
          key: "a",
          align: "center",
          render: (h, params) => [
            h(
              "span",
              {
                props: { type: "primary", size: "small" },
                style: {
                  marginRight: "15px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:product-manage:agency-delete-app"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "温馨提示",
                      content: "确定取消授权吗？",
                      onOk: () => {
                        productManage_cancel({
                          appId: params.row.id,
                          userId: this.idid,
                        })
                          .then((res) => {
                            this.gitapi();
                            this.tabDataa.forEach((item, index) => {
                              if (params.row.appName == item.appName) {
                                this.tabDataa.splice(index, 1);
                              }
                            });
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                      },
                    });
                  },
                },
              },
              "取消授权"
            ),
          ],
        },
      ],
      // permissionMap: {},
      treePermissionMap: [],
      // permissionMap: "",

      // 请求参数
      companyIdcompanyId: "",
      idid: "",

      userForm: false,
      adminFlag: false,
      lists: [],
      tempId: "",

      formInline: {
        id: "",
        appRelatePermissions: [],
        appExpireDateTime: "",
      },

      ruleFormValid: {
        id: [
          {
            required: true,
            message: "请选择应用",
          },
        ],
        appRelatePermissions: [
          {
            required: true,
            message: "请选择对应权限",
          },
        ],
        appExpireDateTime: [
          {
            required: true,
            message: "请选择到期时间",
          },
        ],
      },
      childValue: false,
      baseData: [],
    };
  },

  methods: {
    addname(name) {
      console.log(name, "appNameappName");
    },
    async gitapi() {
      await productManage_getList({
        id: this.idid,
        companyId: this.companyIdcompanyId,
      })
        .then((d) => {
          this.tabData = d.data;
        })
        .catch((e) => {
          let ev = e.msg ? e.msg : e.message;
          this.$Message.error(ev);
        });
    },

    closee() {
      this.userForm = false;
    },

    getListId(e) {
      if (!e) {
        this.baseData = [];
        return false;
      }
      this.tempId = e;
      getProductsList({
        applicationId: this.tempId,
        adminFlag: this.adminFlag,
        companyId: this.$store.state.user.userInfo.companyId,
      })
        .then((d) => {
          // console.log(d.data);
          this.baseData = this.filterTreeData([d.data]);
          // console.log(this.baseData[0].id, "this.baseData授权成功");
          this.appIdid = this.baseData[0].id;
          this.reurnImpowername = this.baseData[0].appName;
        })

        .catch((e) => {
          let ev = e.msg ? e.msg : e.message;
          this.$Message.error(ev);
        });

      // 收到的对象转换为数组    权限列表回显
      // this.permissionMap = JSON.parse(this.permissionMap);
      var obj = this.imporer;
      var arr = [];
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        var item = {};
        item[key] = obj[key];
        arr.push(item);
      }
      arr = arr;
      // console.log(arr);
      arr.forEach((item, index) => {
        // console.log(item);
        if (Object.values(item)[0] === true) {
          this.treePermissionMap.push(item);
        }
      });
      // console.log(this.treePermissionMap, "我是授权列表");
      // console.log(this.$set);
      //以上是授权回显处理的结果
    },
    filterTreeData(list) {
      list.map((item) => {
        item.title = item.appName || item.permissionName;
        item.expand = true;
        item.children
          ? this.filterTreeData(item.children)
          : (item.children = []);
        return item;
      });
      return list;
    },

    clackTree(e) {
      let temp = e.map((item) => item.id || item.permissionId);
      this.formInline.appRelatePermissions = temp;
    },

    timeChage(value) {
      let date = new Date(value);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      var h = date.getHours();
      var mm = date.getMinutes();
      var s = date.getSeconds();
      let time = `${this.addZero(year)}-${this.addZero(month)}-${this.addZero(
        day
      )} ${this.addZero(h)}:${this.addZero(mm)}:${this.addZero(s)}`;
      // console.log(time);
      this.formInline.appExpireDateTime = time;
    },
    addZero(v) {
      return v < 10 ? "0" + v : v;
    },

    childClick(name) {
      this.timeChage(this.formInline.appExpireDateTime);
      if (!this.adminFlag) this.formInline.appExpireDateTime = "--";
      if (this.formInline.appExpireDateTime == "NaN-NaN-NaN NaN:NaN:NaN") {
        this.$Message.error("请选择时间");
        return;
      }
      let e = null;
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        e = this.formInline.id;
        setProduct(
          {
            companyId: this.companyIdcompanyId,
            appExpireDateTime: {
              [e]: this.formInline.appExpireDateTime,
            },
            appRelatePermissions: { [e]: this.formInline.appRelatePermissions },
          },
          this.idid
        )
          .then((d) => {
            console.log(d, "授权成功返回数据");
            this.$Message.success("授权成功");
            this.$emit("success");
            this.gitapi();
            this.tabDataa.push({
              appName: this.reurnImpowername,
              expireDateTime: this.formInline.appExpireDateTime,
              userId: this.idid,
              id: this.appIdid,
              companyId: this.companyIdcompanyId,
            });
            // ****************************

            let arr = [];
            let obj = {};
            for (var i = 0; i < this.tabDataa.length; i++) {
              if (!obj[this.tabDataa[i].appName]) {
                arr.push(this.tabDataa[i]);
                obj[this.tabDataa[i].appName] = true;
              }
            }
            this.tabDataa = arr;
            // ****************************
          })
          .catch((e) => {
            let ev = e.msg ? e.msg : e.message;
            this.$Message.error(ev);
          });
      });
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 50%;
}
.right {
  width: 50%;
}
.box-big {
  display: flex;
  justify-content: space-around;
}
.line-left {
  width: 30px;
  border-right: 1px solid #e4e4e4;
}
</style>
