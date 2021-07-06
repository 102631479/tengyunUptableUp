<template>
  <div>
    <!-- <div class="search">
      <searchFrom ref="searchFrom"></searchFrom>
    </div> -->
    <div class="title">邮件模板</div>
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
              v-model="info.userName"
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
// import { getMail } from "@/api/message-Mail";
import { getMail, deletMail } from "@/api/message-template"; //调用编辑器
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
          title: "模板名称",
          key: "templateName",
          align: "center",
          width: "150",
        },
        {
          title: "邮件标题",
          key: "subject",
          align: "center",
          width: "200",
        },
        { title: "邮件内容", key: "contents", align: "center" },
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
                    // this.$Message.success("详情");
                    this.$refs.detailsPage.userForm = true;
                    this.$refs.detailsPage.htmlData = params.row.contents;
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
                      if (item == "contents") {
                        this.$refs.formModal.formValidate.content =
                          params.row.contents;
                        break;
                      }
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
                        deletMail(params.row.id)
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
  created() {
    Bus.$on("message-Mail-add", (data) => {
      this.init();
    });
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
      await getMail(this.info).then((d) => {
        _this.tabData = d.data.list;
        _this.totals = Number(d.data.pagination.total);
      });
      this.loading = false;
    },
    openadd() {
      this.$refs.formModal.edit = false;
      this.$refs.formModal.userForm = true;
    },

    changePage(num) {
      // console.log(num);
      this.info["limit.currentPage"] = num;
      this.init();
    },

    changePageSize(size) {
      // console.log(size);
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
