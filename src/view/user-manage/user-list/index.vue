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
} from "@/api/platform-auth";
// 拉黑接口
import { hasOneOf } from "@/libs/tools";
import Bus from "@/bus";
import { findComponentDownward } from "@/libs/util"; // 查找组建函数
import formModal from "./formModal";
import searchFrom from "./searchFrom";
import option from "./options";
import ruleDetail from "./ruleDetail";

import impower from "./impower";
import columns from "./columns";

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
      columns:columns(this),
      total: 0,
      userName: "",
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
      this.info.userName = payload.userName;
      this.info.userStatus = payload.userStatus;
      this.init();
      let $Api = this.$refs.searchFrom.formData;
      $Api.setValue("userName", payload.userName);
      $Api.setValue("userStatus", payload.userStatus);
    });
    let $fapi = this.$refs.formModal.formData;
    $fapi.on("user-typetypes-on-change", (id) => {
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
        this.init();
      } else if (this.info_agentType == 1) {
        this.init(1);
      } else if (this.info_agentType == 3) {
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

    async init(e) {

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
  
          let formData = this.$refs.formModal.formData; // 表单实例
          formData.updateRule("supplierId", {
            options: this.agentList,
          });
        })
        .catch((err) => {
          this.loading = false;
        });
      this.info.userStatus = params;
      await getAuthorityList(this.info).then((res) => {
        this.tabData = res.data.list;
        this.total = +res.data.pagination.total;
      });
      this.loading = false;
    },

    changePage(num) {
      this.info["limit.currentPage"] = num;
      this.init();
    },

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
}
.table-user {
  border: 1px;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.ios-search-input {
  margin-right: 10px;
}
</style>









