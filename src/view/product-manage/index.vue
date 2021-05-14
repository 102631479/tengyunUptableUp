<template>
  <div>
    <div class="title">产品商管理</div>
    <Card dis-hover>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <div>
            <Button
              type="primary"
              class="mr-6"
              @click="addUsershop"
              v-if="
                hasOneOf(
                  ['operate:product-manage:agency-product-vendor'],
                  this.$store.state.user.access
                )
              "
              >新增产品商</Button
            >
          </div>
          <div>
            <Input
              type="text"
              class="mr-6"
              style="width: 200px"
              v-model="info.userName"
              placeholder="请输入用户名称"
              search
              enter-button
              @on-search="sercher"
            />
          </div>
        </div>
      </div>

      <Table
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

    <!-- 用户表单 -->
    <formModal ref="formModal" @success="init" />
    <impower ref="impower" @success="init" />

    <Modal v-model="formStatus" title="详情" :mask-closable="false">
      <formCreate
        :rule="ruleDetail"
        :option="option"
        v-model="formDataDetail"
      ></formCreate>
      <div slot="footer"></div>
    </Modal>

    <!-- 充值提现记录 -->
    <Modal v-model="modalShow" title="充值提现记录" :mask-closable="false">
      <Table
        :columns="rechargeColumns"
        :data="rechargeTabData"
        :loading="rechargeLoading"
      ></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import formModal from "./formModal";
import impower from "./impower";
import option from "./options";
import ruleDetail from "./ruleDetail";
import { getAgentList } from "@/api/platform-auth";
import { hasOneOf } from "@/libs/tools";

import {
  getProductLists,
  getProductlist,
  getProductID,
  upOrDownProduct,
  delProduct,
  getRecordProduct,
} from "@/api/platform-manager";
export default {
  components: {
    formModal,
    impower,
  },
  data() {
    return {
      pageshow: true,
      option,
      hasOneOf,
      ruleDetail,
      loading: false,
      formStatus: false,
      formDataDetail: {},
      statuObj: {
        0: "启用",
        1: "停用",
      },
      info: {
        userName: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },
      modalShow: false,
      rechargeLoading: false,
      rechargeColumns: [
        { title: "金额（元）", key: "expenseNumber", align: "center" },
        { title: "类型", key: "userName", align: "center" },
        { title: "操作人", key: "phone", align: "center" },
        { title: "操作时间", key: "dataUpdateTime", align: "center" },
      ],
      rechargeTabData: [],
      // 表头配置
      columns: [
        { title: "序号", align: "center", minWidth: 60, type: "index" },
        { title: "用户名", key: "userCode", minWidth: 100, align: "center" },
        { title: "姓名", key: "userName", minWidth: 100, align: "center" },
        { title: "手机号", key: "phone", minWidth: 100, align: "center" },
        {
          title: "所属企业",
          key: "companyName",
          align: "center",
          minWidth: 100,
          render: (h, params) => [
            h(
              "span",
              {},
              params.row.companyName == null ? "--" : params.row.companyName
            ),
          ],
        },
        {
          title: "是否为管理员",
          key: "phone",
          minWidth: 100,
          align: "center",
          width: "110px",
          render: (h, params) => [
            h("span", {}, params.row.adminFlag == true ? "是" : "否"),
          ],
        },
        {
          title: "保证金",
          minWidth: 100,
          key: "guaranteedAmount",
          align: "center",
          render: (h, params) => [
            h(
              "span",
              {},
              params.guaranteedAmount == null ? "--" : params.guaranteedAmount
            ),
          ],
        },
        {
          title: "上级代理(邀请码)",
          key: "code",
          minWidth: 100,
          align: "center",
          width: 130,
          render: (h, params) => [
            h("span", {}, params.row.code == null ? "--" : params.row.code),
          ],
        },
        {
          title: "账户余额",
          key: "balance",
          minWidth: 100,
          align: "center",
          render: (h, params) => [
            h("span", {}, params.balance == null ? "--" : params.balance),
          ],
        },
        {
          title: "注册时间",
          key: "registrationTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "充值提现记录",
          key: "registrationTime",
          align: "center",
          minWidth: 100,
          render: (h, params) => [
            h(
              "span",
              {
                style: {
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.modalShow = true;
                    let userId = this.$store.state.user.userId;
                    getRecordProduct(userId).then((res) => {
                      this.rechargeTabData = res.data;
                    });
                  },
                },
              },
              "查看"
            ),
          ],
        },
        {
          title: "状态",
          key: "userStatus",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            // this.status = params.row.userStatus;
            if (params.row.userStatus == 2) {
              return h("span", "停用");
            } else if (params.row.userStatus == 3) {
              return h("span", "拉黑");
            } else if (params.row.userStatus == 4) {
              return h("span", "注销");
            } else {
              return h("span", "正常");
            }
          },
        },
        {
          title: "操作",
          key: "userCode",
          minWidth: 300,
          align: "center",
          render: (h, params) => [
            h(
              "span",
              {
                props: {
                  type: "primary",
                },
                style: {
                  marginRight: "15px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:product-manage:agency-detail"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    this.formStatus = true;
                    getProductID(params.row.id)
                      .then((d) => {
                        // console.log(d.data);
                        this.formDataDetail.setValue(d.data);
                      })
                      .catch((e) => {
                        let ev = e.msg ? e.msg : e.message;
                        this.$Message.error(ev);
                      });
                  },
                },
              },
              "详情"
            ),
            h(
              "span",
              {
                props: {
                  // 视图样式
                  type: "success",
                },
                style: {
                  color: "#0084ff",
                  cursor: "pointer",
                  marginRight: "15px",
                  display: hasOneOf(
                    ["operate:product-manage:agency-edit"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: (e) => {
                    console.log(params.row.id);
                    this.$refs.formModal.formData.setValue(params.row);
                    this.$refs.formModal.userType = params.row.userType;
                    if (params.row.supplierId == null) {
                      this.$refs.formModal.formData.form.userTypetypes = 1;
                    } else {
                      this.$refs.formModal.formData.form.userTypetypes = 3;
                    }
                    this.$refs.formModal.userForm = true;
                    this.$refs.formModal.edit = true;
                  },
                },
              },
              "编辑"
            ),
            h(
              "span",
              {
                props: {
                  // 视图样式
                  type: "success",
                },
                style: {
                  color: "#0084ff",
                  cursor: "pointer",
                  // marginRight: "8px",
                  marginRight: "15px",
                  display: "none",

                  // display: hasOneOf(
                  //   ["operate:product-manage:agency-related-authorize"],
                  //   this.$store.state.user.access
                  // )
                  //   ? "inline-block"
                  //   : "none",
                },
                on: {
                  click: () => {
                    console.log(params.row.companyId, "params.row.companyId");
                    console.log(params.row.id, "params.row.id");

                    this.$refs.impower.companyIdcompanyId =
                      params.row.companyId;
                    this.$refs.impower.idid = params.row.id;

                    console.log(
                      this.$refs.impower.companyIdcompanyId,
                      "this.$refs.impower.companyIdcompanyId"
                    );
                    console.log(
                      this.$refs.impower.idid,
                      "this.$refs.impower.idid"
                    );

                    // this.$refs.impower.permissionMap =JSON.stringify(params.row.permissionMap)
                    // this.permissionMap = params.row.permissionMap;

                    // console.log(params.row.permissionMap, "index页面授权")

                    this.$refs.impower.userForm = true;
                    this.$refs.impower.adminFlag = params.row.adminFlag;
                    getProductLists({
                      adminFlag: params.row.adminFlag,
                      // companyId: this.$store.state.user.userInfo.companyId,
                      companyId: params.row.companyId,
                    })
                      .then((d) => {
                        this.$refs.impower.lists = d.data;
                      })
                      .catch((e) => {
                        let ev = e.msg ? e.msg : e.message;
                        this.$Message.error(ev);
                      });
                  },
                },
              },
              "授权"
            ),

            h(
              "span",
              {
                props: {
                  // 视图样式
                  type: "success",
                },
                style: {
                  color: "#0084ff",
                  cursor: "pointer",
                  marginRight: "15px",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "温馨提示",
                      content: "确定拉黑吗？",
                      onOk: () => {
                        // let userId = this.$store.state.user.userId;
                        upOrDownProduct(params.row.id, 3)
                          .then((d) => {
                            this.$Message.success("拉黑成功!");
                            this.init();
                          })
                          .catch((e) => {
                            let ev = e.msg ? e.msg : e.message;
                            this.$Message.error(ev);
                          });
                      },
                    });
                  },
                },
              },
              "拉黑"
            ),
            h(
              "span",
              {
                props: {
                  // 视图样式
                  type: "success",
                },
                style: {
                  color: "#0084ff",
                  cursor: "pointer",
                  marginRight: "15px",
                  display: hasOneOf(
                    ["operate:product-manage:agency-delete"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    // 用列表户配置点击删除弹窗
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认删除么？",
                      onOk: () => {
                        delProduct(params.row.id)
                          // 删除成功执行
                          .then((d) => {
                            if (this.tabData.length == 1)
                              this.info["limit.currentPage"] =
                                this.info["limit.currentPage"] - 1;
                            this.init();
                            this.$Message.success("删除成功");
                          })
                          // 失败捕捉
                          .catch(() => this.$Message.error("删除失败"));
                      },
                    });
                  },
                },
              },
              "删除"
            ),
            // h(
            //   "Button",
            //   {
            //     props: {
            //       type: "success",
            //       size: "small",
            //     },
            //     style: {
            //       marginRight: "10px",
            //     },
            //     on: {
            //       click: () => {
            // 二次确认弹窗
            //         this.$Modal.confirm({
            //           title: "提示",
            //           content: "确认同意？",
            //           onOk: () => {
            //             delAuthority(params.row.id)
            //               .then((d) => {
            //                 this.init();
            //                 this.$Message.success("同意成功");
            //               })
            //               .catch(() => this.$Message.error("同意失败"));
            //           },
            //         });
            //       },
            //     },
            //   },
            //   "同意"
            // ),
            // h(
            //   "Button",
            //   {
            //     props: {
            //       type: "error",
            //       size: "small",
            //     },
            //     style: {
            //       marginRight: "10px",
            //     },
            //     on: {
            //       click: () => {
            //         this.$Modal.confirm({
            //           title: "提示",
            //           content: "确认同意？",
            //           onOk: () => {
            //             delAuthority(params.row.id)
            //               .then((d) => {
            //                 this.init();
            //                 this.$Message.success("拒绝成功");
            //               })
            //               .catch(() => this.$Message.error("拒绝失败"));
            //           },
            //         });
            //       },
            //     },
            //   },
            //   "拒绝"
            // ),
          ],
        },
      ],

      total: 0,
      // 请求配置

      tabData: [
        // {
        //   id: 1,
        //   permissionName: 111,
        //   memo: "test",
        //   companyName: "333",
        // },
      ],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    // form 表单监控
    let $fapi = this.$refs.formModal.formData;
    // $fapi.hidden(true,'supplierId')
    $fapi.on("user-typetypes-on-change", (id) => {
      // console.log(id);
      if (id === "代理商") {
        $fapi.visibility(false, "supplierId");
      } else {
        $fapi.visibility(true, "supplierId");
      }
    });
  },

  methods: {
    sercher() {
      this.pageshow = false;
      this.init();
      ("limit.currentPage=1");
      this.info["limit.currentPage"] = 1;
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    /**
     * 初始化数据
     */
    async init() {
      this.loading = true;
      await getProductlist(this.info)
        .then((res) => {
          console.log(res);
          this.tabData = res.data.list;
          this.total = +res.data.pagination.total;
        })
        .catch((err) => {
          this.loading = false;
        });
      await getAgentList()
        .then((res) => {
          this.agentList = res.data
            .map((item) => {
              return {
                value: item.supplierId,
                label: item.userName,
              };
            })
         
          // console.log(agentList);
          let formData = this.$refs.formModal.formData; // 表单实例
          formData.updateRule("supplierId", {
            options: this.agentList,
          });
        })
        .catch((err) => {
          this.loading = false;
          return err
        });
      this.loading = false;
    },
    addUsershop() {
      this.$refs.formModal.formData.form.areaId = [];
      this.$refs.formModal.formData.form.userStatus = 1;
      this.$refs.formModal.formData.hidden(true, "cate_id");
      this.$refs.formModal.edit = false;
      this.$refs.formModal.userForm = true;
      this.$refs.formModal.formData.updateRule(
        "supplierId",
        {
          options: this.agentList,
        },
        true
      );
    },
    /**
     * 分页
     */
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

<style >
</style>
<style scoped>
/* .title {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 0;
} */

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: blue; */
}

.ios-search-input {
  margin-right: 30px;
}
</style>
