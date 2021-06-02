<template>
  <div>
    <div class="title">用户列表</div>
    <div class="search">
      <searchFrom ref="searchFrom"></searchFrom>
    </div>
    <Card dis-hover>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <div>
            <Button
              type="primary"
              v-if="
                hasOneOf(
                  ['operate:user-manage:user-add'],
                  this.$store.state.user.access
                )
              "
              class="mr-6"
              @click="add"
              >新增</Button
            >
          </div>

          <div style="display: flex">
            <!-- <Button type="default" class="mr-6" @click="init(1)"
              >状态启用</Button
            >
            <Button type="default" class="mr-6" @click="init(3)"
              >状态停用</Button
            > -->

            <Select
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
              v-model="info.userName"
              placeholder="输入用户名"
              search
              enter-button
              @on-search="sercher"
            />
          </div>
        </div>
      </div>
      <Table
        :ellipsis="true"
        :minWidth="200"
        :columns="columns"
        :data="tabData"
        :loading="loading"
        :border="true"
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
    <!-- 充值提现记录 -->
    <Modal v-model="modalShow" title="充值提现记录" :mask-closable="false">
      <Table
        :columns="rechargeColumns"
        :data="rechargeTabData"
        :loading="rechargeLoading"
      ></Table>
      <div slot="footer"></div>
    </Modal>

    <!-- 详情 -->
    <Modal v-model="modalDetail" title="详情" :mask-closable="false">
      <formCreate
        :rule="ruleDetail"
        :option="option"
        v-model="formDatas"
      ></formCreate>
      <div slot="footer"></div>
    </Modal>
    <impower ref="impower" @success="init" :imporer="permissionMap" />
    <!-- 身份升级 -->
    <agentInit ref="agentInit" @success="init"></agentInit>
  </div>
</template>
   
<script>
import agentInit from "./agentInitShow";

import {
  getAgentList,
  getAuthorityList,
  rechargeRecord,
  apiDelUser,
  getDetailsById,
  getUserManageDetail,
  upOrDown,
  getLists,
} from "@/api/platform-auth";
// 拉黑接口
import { hasOneOf } from "@/libs/tools";
import Bus from "@/bus";
import { findComponentDownward } from "@/libs/util"; // 查找组建函数
import formModal from "./formModal";
import searchFrom from "./searchFrom";
import option from "./options";
import ruleDetail from "./ruleDetail";

// 授权弹窗引入
import impower from "./impower";

export default {
  components: { formModal, searchFrom, impower, agentInit },
  data() {
    return {
      pageshow: true,
      info_agentType: "",
      cityList: [
        {
          value: 4,
          index: 4,
          label: "全部",
        },
        {
          value: 1,
          index: 1,
          label: "状态启用",
        },
        { value: 3, index: 3, label: "状态停用" },
      ],
     
      permissionMap: {},
      hasOneOf,
      agentList: [],
      option,
      ruleDetail,
      formDatas: {},
      formData: {},
      impowerUpwindow_data: {},
      impowerUpwindow_Detail: false,
      formDataDetail: {},
      rechargeLoading: false,
      rechargeColumns: [
        { title: "金额（元）", key: "expenseNumber", align: "center" },
        { title: "类型", key: "userName", align: "center" },
        { title: "操作人", key: "phone", align: "center" },
        { title: "操作时间", key: "dataUpdateTime", align: "center" },
      ],
      rechargeTabData: [],
      loading: false,
      modalShow: false,
      modalDetail: false,
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入搜索内容",
            trigger: "blur",
          },
        ],
      },
      columns: [
        { title: "序号", align: "center", type: "index", width: 100 },
        { title: "用户名", key: "userCode", align: "center", width: 100 },
        { title: "姓名", key: "userName", align: "center", width: 100 },
        { title: "手机号", key: "phone", align: "center", width: 115 },
        {
          title: "所属企业",
          key: "companyName",
          align: "center",
          width: 180,
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
          align: "center",
          width: "110px",
          render: (h, params) => [
            h("span", {}, params.row.adminFlag == true ? "是" : "否"),
          ],
        },
        {
          title: "上级代理(邀请码)",
          key: "code",
          align: "center",
          width: 130,
          render: (h, params) => [
            h("span", {}, params.row.code == null ? "--" : params.row.code),
          ],
        },
        {
          title: "账户余额",
          key: "balance",
          align: "center",
          width: 130,
          render: (h, params) => [
            h(
              "span",
              {},
              params.row.balance == null ? "--" : params.row.balance
            ),
          ],
        },
        {
          title: "注册时间",
          key: "registrationTime",
          align: "center",
          width: "105px",
        },
        {
          title: "充值提现记录",
          key: "registrationTime",
          align: "center",
          width: "115px",
          render: (h, params) => [
            h(
              "span",
              {
                props: {
                  type: "md-pricetag",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                  marginRight: "15px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:user-manage:user-recharge-record"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    let power = hasOneOf(
                      ["operate:user-manage:user-recharge-record"],
                      this.$store.state.user.access
                    );
                    if (!power) return;
                    this.modalShow = true;
                    let userId = params.row.id;
                    rechargeRecord(userId).then((res) => {
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
          width: "100px",
          render: (h, params) => {
            // console.log(params.row.userStatus,'状态显示');
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
          // width: 330,
          // fixed: "right",
          minWidth: 300,
          align: "center",
          render: (h, params) => [
            // 用户列表配置详情
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  // width: "24px",
                  // marginRight: '5px'
                  marginRight: "15px",
                  color: "#0084ff",
                  cursor: "pointer",

                  display: hasOneOf(
                    ["operate:user-manage:user-detail"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    // 点击事件鉴权   双层鉴权
                    let power = hasOneOf(
                      ["operate:user-manage:user-detail"],
                      this.$store.state.user.access
                    );
                    if (!power) return;
                    this.modalDetail = true; // 弹窗
                    this.formDatas.setValue(params.row);
                    getDetailsById(params.row.id).then((res) => {
                      console.log(params.row.userName);
                      this.formDatas.setValue(res.data);
                    });
                  },
                },
              },
              "详情"
            ),
            // 用户列表配置编辑
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "15px",
                  // width: "24px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:user-manage:user-edit"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    let power = hasOneOf(
                      ["operate:user-manage:user-edit"],
                      this.$store.state.user.access
                    );
                    if (!power) return;
                    this.$refs.formModal.formData.setValue(params.row);
                    this.$refs.formModal.userType = params.row.userType;
                    if (params.row.supplierId == null) {
                      console.log(
                        this.$refs.formModal.formData.form.userTypetypes,
                        "this.$refs.formModal.formData.form.userTypetypes"
                      );
                      this.$refs.formModal.formData.form.userTypetypes = 1;
                    } else {
                      this.$refs.formModal.formData.form.userTypetypes = 3;
                      console.log(
                        this.$refs.formModal.formData.form.userTypetypes
                      );
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
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "15px",
                  // width: "24px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: "none",
                  // display: hasOneOf(
                  //   ["operate:user-manage:related-authorize"],
                  //   this.$store.state.user.access
                  // )
                  //   ? "inline-block"
                  //   : "none",
                },

                on: {
                  click: () => {
                    let power = hasOneOf(
                      ["operate:user-manage:related-authorize"],
                      this.$store.state.user.access
                    );
                    if (!power) return;
                    this.$refs.impower.companyIdcompanyId =
                      params.row.companyId;
                    this.$refs.impower.idid = params.row.id;
                    // this.$refs.impower.permissionMap =JSON.stringify(params.row.permissionMap)
                    this.permissionMap = params.row.permissionMap;
                    console.log(params.row.permissionMap, "index页面授权");
                    this.$refs.impower.userForm = true;
                    this.$refs.impower.adminFlag = params.row.adminFlag;
                    getLists({
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
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "15px",
                  color: "#0084ff",
                  // width: "48px",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:user-manage:up-grade"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    let power = hasOneOf(
                      ["operate:user-manage:up-grade"],
                      this.$store.state.user.access
                    );
                    if (!power) return;
                    // console.log(params.row, "params.row.");
                    this.$refs.agentInit.formItem.agentName =
                      params.row.userCode;
                    this.$refs.agentInit.formItem.email = params.row.email;
                    this.$refs.agentInit.formItem.contactNumber =
                      params.row.phone;
                    this.$refs.agentInit.formItem.applicationPeopleId =
                      params.row.id;
                    this.$refs.agentInit.agentInitShow = true;
                  },
                },
              },
              "身份升级"
            ),

            // 用户列表配置拉黑
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "15px",
                  color: "#0084ff",
                  cursor: "pointer",
                  // width: "24px",
                  // display: hasOneOf(
                  //   ["user:backstag:user:edit"],
                  //   this.$store.state.user.access
                  // )
                  //   ? "inline-block"
                  //   : "none"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "温馨提示",
                      content: "确定拉黑吗？",
                      onOk: () => {
                        upOrDown(params.row.id, 3)
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

            // 用户列表配置删除
            h(
              "span",
              {
                props: {
                  type: "error",
                  size: "small",
                },
                style: {
                  marginRight: "15px",
                  color: "#0084ff",
                  cursor: "pointer",
                  // width: "24px",
                  display: hasOneOf(
                    ["operate:user-manage:user-delete"],
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
                        apiDelUser(params.row.id)
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
          ],
        },
      ],
      total: 0,
      userName: "",
      // 请求配置
      info: {
        userName: "",
        userStatus: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },
      tabData: [],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    Bus.$on("userList:onSubmit", (payload) => {
      // console.log(payload);
      this.info.userName = payload.userName;
      this.info.userStatus = payload.userStatus;
      this.init();
      let $Api = this.$refs.searchFrom.formData;
      $Api.setValue("userName", payload.userName);
      $Api.setValue("userStatus", payload.userStatus);
    });
    let $fapi = this.$refs.formModal.formData;
    // $fapi.hidden(true,'supplierId')
    $fapi.on("user-typetypes-on-change", (id) => {
      // console.log(id);
      if (id === "代理商") {
        console.log("ssss");
        $fapi.visibility(false, "supplierId");
      } else {
        console.log("sssssdsadasd");
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
    changeinit() {
      if (this.info_agentType == 4) {
        this.info.userStatus = "";
        // this.info_agentType = 0;
        // console.log(this.info_agentType);
        this.init();
      } else if (this.info_agentType == 1) {
        // console.log(this.info_agentType);

        this.init(1);
      } else if (this.info_agentType == 3) {
        // console.log(this.info_agentType);

        this.init(3);
      }
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("搜索失败");
        }
      });
    },
    // 清除
    clear_form() {
      this.formData.user = "";
      this.$Message.success("已经清除输入框");
    },
    childByValue() {
      this.impowerUpwindow_Detail = false;
    },
    add() {
      this.$refs.formModal.formData.form.userStatus = 1;
      this.$refs.formModal.formData.form.areaId = [];
      console.log(this.$refs.formModal, "this.$refs.formModal11111111111");
      this.$refs.formModal.formData.hidden(true, "identityType");
      this.$refs.formModal.edit = false;
      this.$refs.formModal.userForm = true;
      this.$refs.formModal.formData;
      let formData = this.$refs.formModal.formData; // 表单实例
      this.$refs.formModal.formData;
      formData.updateRule(
        "supplierId",
        {
          options: this.agentList,
        },
        true
      );
    },
    /**
     * 初始化数据
     */
    async init(e) {
      // console.log(this.userName,'this.userName');
      // if (this.info.userName == '') {
      //   this.info["limit.currentPage"] == 1;
      // }
      let params = e || this.info.userStatus;
      this.loading = true;

      await getAgentList()
        .then((res) => {
          this.agentList = res.data.map((item) => {
            return {
              value: item.supplierId,
              label: item.userName,
            };
          });
          // console.log(agentList);\
          // console.log(
          //   "let formData = this.$refs.formModal.formDat // 表单实例"
          // );
          let formData = this.$refs.formModal.formData; // 表单实例
          formData.updateRule("supplierId", {
            options: this.agentList,
          });
        })
        .catch((err) => {
          this.loading = false;
        });
      // 数据列表
      this.info.userStatus = params;
      // this.info.userName = this.info.userName;
      await getAuthorityList(this.info).then((res) => {
        this.tabData = res.data.list;
        this.total = +res.data.pagination.total;
      });
      this.loading = false;
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
<style lang="scss" scoped>
.search {
  background-color: white;
  display: flex;
  flex-direction: column;
  // padding: 15px 0;
}
.table-user {
  border: 1px;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: blue; */
}
.ios-search-input {
  margin-right: 10px;
}
</style>
