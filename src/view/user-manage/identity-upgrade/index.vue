<template>
  <div>
    <div class="title">身份升级申请</div>
    <div class="page">
      <!-- <div class="search">
      <searchFrom ref="searchFrom" @success="init"></searchFrom>
    </div> -->

      <!-- <div
      style="
        height: 60px;
        line-height: 60px;
        background: #eee;
        padding-left: 20px;
        border: 1px solid #ccc;
      "
    >
      审核列表
    </div> -->

      <Card dis-hover>
        <div class="flex justify-between mb-10">
          <div class="flex">
            <!-- 按钮点击 -->
            <Button type="primary" class="mr-6" @click="clearAll">全部</Button>
            <!-- <Button class="mr-6" @click="awaitAudit">待审核</Button>
          <Button class="mr-6" @click="awaitPay">待打款</Button>
          <Button class="mr-6" @click="overPay">已打款</Button> -->
          </div>
          <!-- v-model="formData.user" -->
          <div style="display: flex">
            <div style="margin-right: 10px">
              <!-- 隐藏1个下拉框 -->
              <Select
                placeholder="请选择类型"
                v-model="info.agentType"
                @on-change="init"
                style="width: 100px; margin: 0 10px"
              >
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.index"
                  >{{ item.label }}</Option
                >
              </Select>
              <!-- class="user-manage-Select" -->
              <Select
                v-model="info.identityType"
                @on-change="init"
                style="width: 100px"
                placeholder="请选择身份"
              >
                <Option
                  v-for="item in Lists"
                  :value="item.value"
                  :key="item.index"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div>
              <Input
                v-model="info.userName"
                type="text"
                class="mr-6"
                style="width: 200px"
                placeholder="输入申请人名称"
                search
                enter-button
                @on-search="sercher"
              />
            </div>
          </div>
        </div>
        <Table
          :ellipsis="true"
          border
          :columns="columns"
          :data="tabData"
          :loading="loading"
        ></Table>
        <Page
          v-if="pageshow"
          class="t-center mt-10"
          :page-size="info['limit.pageSize']"
          :total="total"
          @on-page-size-change="changePageSize"
          @on-change="changePage"
          show-total
          show-sizer
        />
      </Card>

      <!-- 附件@on-ok="handleSubmit('formValidate')"
      @click="handleReset('formValidate')" -->

      <Modal v-model="userForm" title="附件列表" :mask-closable="false">
        <Table border :columns="annexColumns" :data="annexTabData"></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import { hasOneOf } from "@/libs/tools";
import Bus from "@/bus";
import {
  upgradeApplication,
  downloadAnnex,
  agreeUpgrade,
  refuseUpgrade,
} from "@/api/user-admin";
import searchFrom from "./searchFrom";
export default {
  components: {
    searchFrom,
  },
  data() {
    return {
      loading: false,
      pageshow: true,
      hasOneOf,
      userForm: false,
      annexColumns: [
        { title: "附件名称", key: "name", align: "center" },
        {
          title: "操作",
          key: "userName",

          align: "center",
          render: (h, params) => [
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    let a = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
                    if (a.test(params.row.oldName)) {
                      window.open(params.row.fileAddress, "_blank");
                    } else {
                      window.open(
                        "https://view.officeapps.live.com/op/view.aspx?src=" +
                          params.row.fileAddress,
                        "_blank"
                      );
                    }
                  },
                },
              },
              "查看"
            ),
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    let a = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
                    if (a.test(params.row.oldName)) {
                      // console.log(this.$computedBaseUrl);
                      window.open(
                        `${this.$computedBaseUrl}/platform-file/file/img/download/` +
                          params.row.fileId
                      );
                    } else {
                      window.open(params.row.fileAddress);
                    }
                  },
                },
              },
              "下载"
            ),
          ],
        },
      ],
      annexTabData: [],
      loading: false,
      cityList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "企业",
        },
        {
          value: "2",
          label: "个人",
        },
      ],
      Lists: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "3",
          label: "代理商",
        },
        {
          value: "4",
          label: "产品商",
        },
      ],
      typeStatus: {
        1: "企业",
        2: "个人",
      },
      // 表头配置
      // 身份升级申请数据下拉框
      columns: [
        { title: "序号", align: "center", type: "index", width: 100 },
        // { title: "ID", key: "applicationPeopleId", align: "center" },
        { title: "申请人", key: "userName", align: "center", width: 100 },

        {
          title: "升级身份",
          key: "applicationIdentity",
          align: "center",
          width: 100,
          render: (h, params) => {
            if (params.row.applicationIdentity == 3) {
              return h("span", "代理商");
            } else if (params.row.applicationIdentity == 4) {
              return h("span", "产品商");
            } else {
              // return h("span", "未审批");
            }
          },
        },
        {
          title: "保证金",
          key: "guaranteedAmount",
          align: "center",
          width: 100,
          render: (h, params) => [h("span", {}, "--")],
        },
        {
          title: "上级代理(邀请码)",
          key: "memo",
          align: "center",
          width: 100,
          render: (h, params) => [h("span", {}, "--")],
        },
        {
          title: "代理类型",
          key: "agentType",
          align: "center",
          width: 100,
          render: (h, params) => {
            if (params.row.agentType == 1) {
              return h("span", "企业");
            } else if (params.row.agentType == 2) {
              return h("span", "个人");
            } else {
              return h("span", "未审批");
            }
          },
        },
        {
          title: "企业信息",
          key: "companyInfo",
          align: "left",
          minWidth: 130,

          render: (h, params) => [
            ...params.row.companyInfo.split(",").map((item, index) => {
              if (index === 1) {
                item =
                  item == 1
                    ? "国企"
                    : item == 2
                    ? "私企"
                    : item == 2
                    ? "民营"
                    : "null";
              }
              if (item !== "null") {
                item =
                  index === 0
                    ? "公司: " + item
                    : index === 1
                    ? "类型: " + item
                    : index === 2
                    ? "机构代码：" + item
                    : "法定代表人：" + item;
                return h("p", {}, item);
              } else {
                return h("span", {}, "-");
              }
            }),
          ],
        },
        {
          title: "银行对公账户信息",
          key: "bankInfo",
          align: "left",
          width: 200,
          render: (h, params) => [
            ...params.row.bankInfo.split(",").map((item, index) => {
              if (item !== "null") {
                item =
                  index === 0
                    ? "开户行: " + item
                    : index === 1
                    ? "银行所在地: " + item
                    : index === 2
                    ? "开户支行：" + item
                    : "银行账号：" + item;
                return h("p", {}, item);
              } else {
                return h("span", {}, "-");
              }
            }),
          ],
        },
        {
          title: "联系人信息",
          key: "contactPersonInfo",
          align: "left",
          width: 200,
          render: (h, params) => [
            ...params.row.contactPersonInfo.split(",").map((item, index) => {
              if (item !== "null") {
                item =
                  index === 0
                    ? "联系人: " + item
                    : index === 1
                    ? "电话: " + item
                    : index === 2
                    ? "邮箱：" + item
                    : "通讯地址：" + item;
                return h("p", {}, item);
              } else {
                return h("span", {}, "-");
              }
            }),
          ],
        },

        // {
        //   title: '申请详情',
        //   key: 'applicationDetail',
        //   align: 'center',
        //   width: '180'
        //   // render: (h, params) => [h("span", {}, "--")],
        //   // render: (h, params) => [
        //   // ...params.row.applicationDetails.split(",").map((item, index) => {
        //   // ...params.row.applicationDetails.map((item, index) => {
        //   //   if (index === 1) {
        //   //     item =
        //   //       item == 1
        //   //         ? "国企"
        //   //         : item == 2
        //   //         ? "私企"
        //   //         : item == 2
        //   //         ? "民营"
        //   //         : "null";
        //   //   }
        //   //   if (item !== "null") {
        //   //     item =
        //   //       index === 0
        //   //         ? "公司: " + item
        //   //         : index === 1
        //   //         ? "类型: " + item
        //   //         : index === 2
        //   //         ? "联系人: " + item
        //   //         : "电话: " + item;
        //   //     return h("p", {}, item);
        //   //   }
        //   // }),
        //   // ],
        // },
        {
          title: "附件",
          key: "memo",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.userForm = true;
                    // console.log(params.row.photoLists);
                    this.annexTabData = JSON.parse(params.row.photoLists).map(
                      (item) => {
                        if (item.type == 1) {
                          item.name = "营业执照";
                        } else if (item.type == 2) {
                          item.name = "开户证明";
                        } else if (item.type == 3) {
                          item.name = "身份证正面";
                        } else if (item.type == 4) {
                          item.name = "身份证反面";
                        }
                        return item;
                      }
                    );
                  },
                },
              },
              "附件"
            );
          },
        },
        // { title: '开户行', key: 'accountBank', align: 'center' },
        // { title: '卡号', key: 'cardNumber', align: 'center' },
        {
          title: "申请时间",
          key: "applicationTime",
          align: "center",
          width: 100,
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 100,
          render: (h, params) => {
            this.status = params.row.status;
            if (params.row.status == 2) {
              return h("span", "已同意");
            } else if (params.row.status == 3) {
              return h("span", "已拒绝");
            } else if (params.row.status == 1) {
              return h("span", "待审核");
            }
          },
        },
        {
          title: "操作",
          key: "userCode",
          minWidth: 130,
          align: "center",
          render: (h, params) => {
            if (params.row.status !== 1) {
              return h("span", "--");
            }
            return [
              h(
                "span",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                    color: "#0084ff",
                    cursor: "pointer",
                    display: hasOneOf(
                      ["operate:upgrade-application:upgrade-agree"],
                      this.$store.state.user.access
                    )
                      ? "inline-block"
                      : "none",
                  },
                  on: {
                    click: () => {
                      // console.log(params);
                      let { id, applicationPeopleId, companyId } = params.row;
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认同意？",
                        onOk: () => {
                          agreeUpgrade(id, applicationPeopleId, companyId)
                            .then((d) => {
                              // console.log(d);
                              this.init();
                              this.$Message.success("同意成功");
                            })
                            .catch(() => this.$Message.error("同意失败"));
                        },
                      });
                    },
                  },
                },
                "同意"
              ),
              h(
                "span",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                    color: "#0084ff",
                    cursor: "pointer",
                    display: hasOneOf(
                      ["operate:upgrade-application:upgrade-refuse"],
                      this.$store.state.user.access
                    )
                      ? "inline-block"
                      : "none",
                  },
                  on: {
                    click: () => {
                      let { id } = params.row;
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认拒绝？",
                        onOk: () => {
                          refuseUpgrade(id)
                            .then((d) => {
                              this.init();
                              this.$Message.success("拒绝成功");
                            })
                            .catch(() => this.$Message.error("拒绝失败"));
                        },
                      });
                    },
                  },
                },
                "拒绝"
              ),
            ];
          },
        },
      ],

      total: 0,
      // 请求配置
      info: {
        userName: "",
        identityType: "",
        agentType: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },
      tabData: [],
    };
  },
  created() {
    // upgrade:onSubmit
    Bus.$on("upgrade:onSubmit", (payload) => {
      // console.log(payload);
      this.info.userName = payload.userName;
      let $Api = this.$refs.searchFrom.formData;
      $Api.setValue("userName", payload.userName);
      this.init();
    });
    this.init();
  },
  methods: {
    sercher() {
      // this.loading=true
      this.pageshow = false;
      this.init();
      ("limit.currentPage=1");
      this.info["limit.currentPage"] = 1;
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    // 按钮点击
    clearAll() {
      this.info = {
        userName: "",
        identityType: "",
        agentType: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      };
      this.init();
    },
    awaitAudit() {
      alert("我是待审核");
    },
    awaitPay() {
      alert("我是待打款");
    },
    overPay() {
      alert("我是已打款");
    },

    /**
     * 初始化数据
     */

    init() {
      this.loading = true; // upgradeApplication
      upgradeApplication({
        ...this.info,
      })
        .then((d) => {
          this.tabData = d.data.list;
          this.total = +d.data.pagination.total;
          // this.loading=false
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    /**
     * 分页
     */
    changePage(num) {
      this.info["limit.currentPage"] = num;
      this.init();
    },
    /**
     * 切换每页大小
     */
    changePageSize(size) {
      this.info["limit.pageSize"] = size;
      this.init();
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #fff;
  height: 100%;
}
.search {
  display: flex;
  justify-content: center;
  /* padding-top: 20px; */
  flex-direction: column;
}
.user-manage-Select {
  width: 100px;
  border: 1px solid rgb(122, 120, 120);
}
</style>
