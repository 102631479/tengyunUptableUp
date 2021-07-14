<!--
 * @Author: 大司马
 * @Date: 2021-01-04 15:40:59
 * @LastEditors: 大司马
 * @LastEditTime: 2021-02-07 10:12:42
 * @FilePath: \open-platform-ui\platform-console\src\view\app-apply-manager\index.vue
 -->
<template>
  <div>
    <!-- v-if="
              hasOneOf(
                ['common:platform:agent:offine:add'],
                this.$store.state.user.access
              )
            " -->
    <div class="title">应用申请管理</div>
    <Card>
      <div class="flex justify-between mb-10">
        <div>
          <Button type="primary" style="margin-right: 20px" @click="sercherch"
            >全部</Button
          ><!--
          <Button @click="init(1)">待审核</Button>
          <Button style="margin: 0 10px" @click="init(2)">已通过</Button>
          <Button @click="init(3)">已拒绝</Button> -->
        </div>
        <div class="flex align-center">
          <Select
            ref="clearSingleSelect"
            placeholder="请选择状态"
            v-model="info_agentType"
            @on-change="changeinit"
            style="width: 100px; margin: 0 10px"
          >
            <Option
              v-for="item in cityList"
              :value="item.value"
              :key="item.index"
              >{{ item.label }}</Option
            >
          </Select>
          <Input
            type="text"
            class="mr-6"
            style="width: 200px"
            v-model="opportUnitiesName"
            placeholder="请输入用户姓名"
            search
            enter-button
            @on-search="
              searchlist(opportUnitiesName);
              ('limit.currentPage=1');
            "
          />
        </div>
      </div>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="tabData"
      ></Table>
      <Page
        v-if="pageshow"
        class="t-center mt-10"
        :page-size="info.limit.pageSize"
        :total="total"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        show-total
        show-sizer
      />
    </Card>
    <!-- :loading="load" -->

    <Modal
      :mask-closable="false"
      v-model="showFlag"
      title="添加备注"
      width="30%"
      :loading="load"
      @on-ok="handleOk('remarkValidate')"
      @on-cancel="handleCancel('remarkValidate')"
    >
      <Form
        ref="remarkValidate"
        :model="remarkValidate"
        :rules="remarkRule"
        :label-width="70"
      >
        <FormItem label="备注：" prop="remark" :mask-closable="false">
          <i-Input
            type="textarea"
            v-model="remarkValidate.remark"
            :rows="8"
            placeholder="请输入备注信息..."
          ></i-Input>
        </FormItem>
      </Form>
    </Modal>

    <authModal ref="authModal" @success="init" />
  </div>
</template>

<script>
import { hasOneOf } from "@/libs/tools";
// import { copyTxt } from "@/libs/util";
import publicStatus from "@/config/publicStatus";
import authModal from "./authModal";
import config from "@/config";
import {
  getInit,
  getAppList,
  getAuth,
  noPass,
  passAndAuth,
  addRemark,
} from "@/api/applyMgr";

export default {
  components: {
    authModal,
  },
  data() {
    return {
      permissionIdList: [],
      info_agentType: "",
      cityList: [
        {
          value: 0,
          index: 0,
          label: "全部",
        },
        {
          value: 1,
          index: 1,
          label: "待审核",
        },
        {
          value: 2,
          index: 2,
          label: "已同意 ",
        },
        { value: 3, index: 3, label: "已拒绝" },
      ],
      hasOneOf,
      appSrc: "",
      logoSrc: "",
      // copyTxt,
      loading: false,
      load: true,
      headId: [],
      lookCodes: false,
      userStatus: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "停用",
          value: 2,
        },
        {
          label: "拉黑",
          value: 3,
        },
        {
          label: "注销",
          value: 4,
        },
      ],
      status: {
        1: "待审核",
        2: "已同意",
        3: "已拒绝",
      },
      remarkValidate: {
        remark: "",
      },
      remarkRule: {
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
      model1: "全部",
      // 表头配置
      columns: [
        {
          type: "index",
          minWidth: 60,
          align: "center",
          title: "序号",
        },
        { title: "用户帐号", key: "userCode", align: "center", width: 150 },
        { title: "用户姓名", key: "userName", align: "center", width: 150 },
        { title: "手机号", key: "phone", align: "center", width: 150 },
        { title: "所属企业", key: "companyName", align: "center", width: 200 },
        {
          title: "申请应用",
          key: "applyName",
          align: "center",
          width: 150,
          render: (h, params) => {
            let arr = [];
            for (let i = 0; i < this.appList.length; i++) {
              let item = this.appList[i];
              let appList = params.row.appListId;
              for (let j = 0; j < appList.length; j++) {
                if (item.id === appList[j]) {
                  arr.push(item.appName);
                }
              }
            }
            return h("p", {}, arr.join(","));
          },
        },
        {
          title: "申请时间",
          key: "dataCreateTime",
          align: "center",
          width: 150,
        },
        {
          title: "审核状态",
          key: "state",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("span", {}, this.status[params.row.state]);
          },
        },
        {
          title: "有效期",
          key: "expireDateTime",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.expireDateTime !== null
                ? params.row.expireDateTime
                : "--"
            );
          },
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.remark !== null ? params.row.remark : "--"
            );
          },
        },
        {
          title: "操作",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            if (params.row.state !== 1) {
              // return h("span", "--");
              return [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#0084ff",
                      cursor: "pointer",
                      display: hasOneOf(
                        ["operate:application-apply:apply-agree"],
                        this.$store.state.user.access
                      )
                        ? "inline-block"
                        : "none",
                    },
                    on: {
                      click: async () => {
                        if (params.row.permissionMap) {
                          let powerArrey = [];
                          for (var item in params.row.permissionMap) {
                            powerArrey.push(item);
                          }
                          this.permissionIdList = powerArrey;
                        }

                        this.$refs.authModal.userForm = true;
                        let data = this.$refs.authModal.formData;
                        this.$refs.authModal.edit = false;
                        await this.getAuths(params.row.appListId);
                        await this.getTags(params.row.appListId);
                        this.$refs.authModal.uid = params.row.id;

                        setTimeout(() => {
                          data.setValue({
                            ["expireDateTime"]: params.row.expireDateTime,
                            ["appListId"]: params.row.appListId,
                            // ["permissionIdList"]: powerArrey,
                          });
                        }, 1);
                        // console.log(params.row, " this.userForm = false;");
                        // console.log(
                        //   this.$refs.authModal.formData,
                        //   " this.$refs.authModal.formData;"
                        // );
                        // if (params.row.state !== 1) {
                        //   console.log("更新模板");
                        //   console.log(params.row, "params.row");
                        //   console.log(params.row.expireDateTime, "到期时间");
                        // }

                        // if (params.row.permissionMap) {
                        //   console.log(
                        //     params.row.permissionMap,
                        //     "permissionMap"
                        //   );
                        // }

                        // console.log(
                        //   this.$refs.authModal.formData.form,
                        //   "authModal"
                        // );
                      },
                    },
                  },
                  "更新授权"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginLeft: "8px",
                      marginRight: "8px",
                      color: "#0084ff",
                      cursor: "pointer",
                      display: hasOneOf(
                        ["operate:application-apply:add-remark"],
                        this.$store.state.user.access
                      )
                        ? "inline-block"
                        : "none",
                    },
                    on: {
                      click: () => {
                        // if (!params.row.state == 1) return;
                        this.showFlag = true;
                        this.columns_id = params.row.id;
                      },
                    },
                  },
                  // params.row.state == 1 ? "添加备注" : ""
                  "添加备注"
                ),
              ];
            }

            return [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#0084ff",
                    cursor: "pointer",
                    display: hasOneOf(
                      ["operate:application-apply:apply-agree"],
                      this.$store.state.user.access
                    )
                      ? "inline-block"
                      : "none",
                  },
                  on: {
                    click: () => {
                      this.$refs.authModal.edit = true;
                      // if (!params.row.state == 1) return;
                      this.$refs.authModal.userForm = true;
                      this.getAuths(params.row.appListId);
                      this.$refs.authModal.uid = params.row.id;
                      this.getTags(params.row.appListId);
                    },
                  },
                },
                "同意并授权"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    marginLeft: "8px",
                    color: "#0084ff",
                    cursor: "pointer",
                    display: hasOneOf(
                      ["operate:application-apply:apply-refuse"],
                      this.$store.state.user.access
                    )
                      ? "inline-block"
                      : "none",
                  },
                  on: {
                    click: () => {
                      console.log(params.row.state);
                      if (params.row.state == 1) {
                        this.$Modal.confirm({
                          title: "拒绝",
                          content: "确认拒绝此申请吗?",
                          onOk: () => {
                            noPass({ id: params.row.id })
                              .then((d) => {
                                this.$Message.success("拒绝成功!");
                                this.init();
                              })
                              .catch((e) => {
                                this.$Message.error(e.msg);
                              });
                          },
                        });
                      }
                    },
                  },
                },
                "拒绝"
              ),
              h(
                "span",
                {
                  style: {
                    marginLeft: "8px",
                    marginRight: "8px",
                    color: "#0084ff",
                    cursor: "pointer",
                    display: hasOneOf(
                      ["operate:application-apply:add-remark"],
                      this.$store.state.user.access
                    )
                      ? "inline-block"
                      : "none",
                  },
                  on: {
                    click: () => {
                      // if (!params.row.state == 1) return;
                      this.showFlag = true;
                      this.columns_id = params.row.id;
                    },
                  },
                },
                // params.row.state == 1 ? "添加备注" : ""
                "添加备注"
              ),
            ];
          },
        },
      ],

      total: 0,
      // 请求配置
      opportUnitiesName: "",
      info: {
        // order:desc,
        seach: "",
        limit: { currentPage: 1, pageSize: 10, startRow: 0 },
      },
      tabData: [],
      showFlag: false, // 注释弹窗
      columns_id: "",
      authlists: [],
      $fapi: {},
      pageshow: true,
    };
  },
  created() {
    this.init();
    this.getAppList();
  },

  methods: {
    sercherch() {
      this.pageshow = false;
      this.info_agentType = "";
      this.init();
      ("limit.currentPage=1");
      this.info.limit.pageSize = this.info.limit.pageSize;
      this.info.limit.currentPage = 1;
      this.info.limit.startRow = 0;
      this.$nextTick(() => {
        this.pageshow = true;
      });
      this.$refs.clearSingleSelect.clearSingleSelect();
    },
    changeinit() {
      if (this.info_agentType == 0) {
        this.init();
        ("limit.currentPage=1");
      } else {
        this.init(this.info_agentType);
      }
    },
    /**
     * 初始化数据
     */
    init(e) {
      let state = e || 0;
      this.loading = true;
      let userId = this.$store.state.user.userId;
      getInit({
        userId,
        state,
        ...this.info,
        order: "desc",
        sort: "dataCreateTime",
      })
        .then((res) => {
          // console.log(res, "res成功的时候数据");
          this.tabData = res.data.list;
          this.total = +res.data.pagination.total;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    getAuths(params) {
      getAuth({ appListId: params })
        .then((d) => {
          this.authlists = d.data;
          let arr = this.filterTreeData(d.data, null, this.permissionIdList);
          this.$nextTick(() => {
            this.$refs.authModal.formData.updateRule(
              "permissionIdList",
              {
                props: {
                  value: this.permissionIdList,
                  multiple: true,
                  showCheckbox: true,
                  type: "checked",
                  data: arr,
                },
              },
              true
            );
            this.$refs.authModal.formData.refresh(true);
          });
        })
        .catch((e) => {
          this.$Message.error(e.message);
        });
    },

    getTags(params) {
      let arr = [];
      for (let i = 0; i < this.appList.length; i++) {
        let item = this.appList[i];
        let appList = params;
        for (let j = 0; j < appList.length; j++) {
          if (item.id === appList[j]) {
            arr.push(item);
          }
        }
      }

      // this.$nextTick(() => {
      let res = arr.map((item) => {
        return {
          label: item.appName,
          value: item.id,
        };
      });
      this.$refs.authModal.formData.updateRule("appListId", {
        options: res,
      });
      // });
    },

    getAppList() {
      getAppList()
        .then((d) => {
          console.log(d.data);
          this.appList = d.data;
        })
        .catch((e) => {
          let ev = e.msg ? e.msg : e.message;
          this.$Message.error(ev);
        });
    },
    /**
     * 过滤树结构数据
     * @param {Array} data 要过滤的数据
     * @param {string} 父级id
     */
    filterTreeData(data, pid = null, list = []) {
      data.map((item) => {
        item.pid = pid;
        item.id = item.permissionId ? item.permissionId : item.id;
        item.title = item.permissionName ? item.permissionName : item.appName;
        item.checked = list.includes(item.id);
        item.hasOwnProperty("children")
          ? this.filterTreeData(item.children, null, this.permissionIdList)
          : (item.children = null);
        return item;
      });
      return data;
    },

    handleOk(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          this.load = false;
          this.$nextTick(() => {
            this.load = true;
          });
          return;
        }
        addRemark({
          ...this.remarkValidate,
          id: this.columns_id,
        })
          .then((d) => {
            this.showFlag = false;
            // this.load = false;

            this.$Message.success("添加成功");
            this.init();
          })
          .catch((e) => {
            this.$Message.error(e.msg);
          });
      });
    },
    handleCancel(name) {
      this.$refs[name].resetFields();
    },

    searchlist(opportUnitiesName) {
      if (opportUnitiesName == "") {
        this.pageshow = false;
        this.info_agentType = "";
        this.$refs.clearSingleSelect.clearSingleSelect();
        // console.log(this.$refs.clearSingleSelect);
        this.info.seach = opportUnitiesName;
        this.init();
        ("limit.currentPage=1");
        this.info.limit.pageSize = this.info.limit.pageSize;
        this.info.limit.currentPage = 1;
        this.info.limit.startRow = 0;
        this.$nextTick(() => {
          this.pageshow = true;
        });
      } else {
        this.info.seach = opportUnitiesName;
        this.init();
        ("limit.currentPage=1");
        console.log(
          this.$refs.clearSingleSelect,
          "this.$refs.clearSingleSelect"
        );
        this.info_agentType = "";

        this.$refs.clearSingleSelect.clearSingleSelect();
        console.log("过去了");
      }
      // opportUnitiesName == ""
      //   ? (this.info.limit.currentPage = 1)
      //   : (this.info.limit.currentPage = this.info.limit.currentPage);
    },

    /**
     * 分页
     */
    changePage(num) {
      this.info.limit.currentPage = num;
      this.info.limit.startRow =
        num * this.info.limit.pageSize - this.info.limit.pageSize;
      this.init();
    },
    /**
     * 切换每页大小
     */
    changePageSize(size) {
      this.info.limit.pageSize = size;
      this.init();
    },
  },
};
</script>
<style>
.title {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 0;
}
img {
  border-style: none;
  width: 150px;
}
</style>

<style lang="scss" scoped>
/deep/ .ivu-card {
  box-shadow: 0px 2px 10px #eee;
}
/deep/.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 25px 25px 30px;
  text-align: center;
}
</style>
