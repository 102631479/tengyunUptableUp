<template>
  <div>
    <!-- <div class="search">
      <searchFrom ref="searchFrom"></searchFrom>
    </div> -->
    <div class="title">站内信模板</div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <div>
            <Button type="primary" class="mr-6" @click="openadd"
              >新增模板</Button
            >
          </div>
          <div>
            <Input
              type="text"
              class="mr-6"
              style="width: 200px"
              v-model="info.templateName"
              placeholder="请输入模板名称"
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
        :total="totals"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        show-total
        show-sizer
      />
    </Card>

    <!-- 用户表单 -->
    <formModal ref="formModal" @success="init" />
    <!-- 详情 -->
    <detailsPage ref="detailsPage" @success="init" />

    <!-- <formModalt ref="formModalt" @success="init" /> -->
  </div>
</template>

<script>
// import { getStandinside } from "@/api/message-Standinside";
import { getStandinside, deletStandinside } from "@/api/message-template"; //调用编辑器
import Bus from "@/bus";

import detailsPage from "./detailsPage";
import formModal from "./formModal";
export default {
  components: {
    detailsPage,
    formModal,
  },
  data() {
    return {
      pageshow: true,
      totals: 0,
      // 请求配置
      info: {
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },

      loading: false,
      // 表头配置
      columns: [
        { title: "序号", align: "center", type: "index", width: "100" },
        {
          title: "唯一标识",
          key: "id",
          align: "center",
          width: "150",
        },
        {
          title: "模板名称",
          key: "title",
          align: "center",
          width: "150",
        },
        {
          title: "消息标题",
          key: "templateName",
          align: "center",
          width: "200",
        },
        { title: "消息内容", key: "templateContents", align: "center" },
        {
          title: "模板类型",
          key: "businessType",
          align: "center",
          width: "200",
          render: (h, params) => {
            this.status = params.row.status;
            if (params.row.status == 2) {
              return h("span", "启用");
            } else {
              return h("span", "禁用");
            }
          },
        },
        {
          title: "模板描述",
          key: "templateDescribe",
          align: "center",
          width: "100",
        },
        {
          title: "操作",
          key: "userCode",
          width: 200,
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
                  marginRight: "8px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.$refs.detailsPage.userForm = true;
                    this.$refs.detailsPage.htmlData =
                      params.row.templateContent;
                  },
                },
              },
              "详情"
            ),
            h(
              "span",
              {
                props: {
                  type: "success",
                  size: "small",
                },
                style: {
                  marginRight: "8px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.$refs.formModal.edit = true;
                    this.$refs.formModal.userForm = true;
                    this.$refs.formModal.editid = params.row.id;
                    for (let item in this.$refs.formModal.formValidate) {
                      this.$refs.formModal.formValidate[item] =
                        params.row[item];
                    }
                  },
                },
              },
              "编辑"
            ),
            h(
              "span",
              {
                props: {
                  type: "error",
                  size: "small",
                },
                style: {
                  marginRight: "8px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认删除？",
                      onOk: () => {
                        deletStandinside(params.row.id)
                          .then((d) => {
                            this.init();
                            this.$Message.success(
                              params.row.templateName + " 已删除"
                            );
                          })
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
      tabData: [],
    };
  },
  mounted() {
    Bus.$on("message-Standinside-add", (data) => {
      this.init();
    });
  },
  created() {
    this.init();
  },
  methods: {
    sercher() {
      this.pageshow = false;
      this.info["limit.currentPage"] = 1;
      this.init();
      ("limit.currentPage=1");
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    async init(data) {
      this.loading = true;
      let _this = this;
      await getStandinside(this.info)
        .then((d) => {
          _this.tabData = d.data.list;
          _this.totals = Number(d.data.pagination.total);
        })
        .catch((err) => {
          this.$Message.error(err.msg);
          this.loading = false;
        });
      this.loading = false;
    },
    openadd() {
      this.$refs.formModal.edit = false;
      this.$refs.formModal.userForm = true;
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

<style scoped>
.search {
  background-color: white;
  display: flex;
  flex-direction: column;
}
.container-title {
  padding: 16px;
  background-color: #fff;
  margin: 10px auto;
  border-radius: 4px;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
