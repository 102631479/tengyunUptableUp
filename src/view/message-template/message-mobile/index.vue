<template>
  <div>
    <!-- <div class="search">
      <searchFrom ref="searchFrom"></searchFrom>
    </div> -->
    <div class="title">短信模板</div>
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
              @on-search="
                init();
                ('limit.currentPage=1');
              "
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
import { getTemplateData, deleTemplate } from "@/api/message-template";
import detailsPage from "./detailsPage";
import formModal from "./formModal";
export default {
  components: {
    detailsPage,
    formModal,
    // import formModalt from "./formModalt";
  },
  data() {
    return {
      templateDescribeNum: Number(200),

      totals: 0,
      // 请求配置
      info: {
        templateName: 1,
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },
      loading: false,
      // 表头配置
      columns: [
        { title: "序号", align: "center", type: "index", width: "100" },
        {
          title: "短信商",
          // key: "vendorType",
          align: "center",
          width: "150",
          render: (h, params) => {
            this.status = params.row.vendorType;
            if (params.row.vendorType == 1) {
              return h("span", "腾讯");
            } else if (params.row.vendorType == 2) {
              return h("span", "阿里");
            } else {
              return h("span", "票联");
            }
          },
        },
        { title: "模板CODE", key: "businessType", align: "center" },
        { title: "模板名称", key: "templateName", align: "center" },
        { title: "模板内容", key: "templateContent", align: "center" },
        { title: "变量备注", key: "definitions", align: "center" },
        {
          title: "类型",
          // key: "templateType",
          align: "center",
          render: (h, params) => {
            if (params.row.templateType == 1) {
              return h("span", "短信通知");
            } else if (params.row.templateType == 2) {
              return h("span", "推广短信");
            } else if (params.row.templateType == 3) {
              return h("span", "国际/港澳台消息");
            } else {
              return h("span", "验证码");
            }
          },
        },
        { title: "模板描述", key: "remark", align: "center" },
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
                    this.$refs.formModal.formValidate.name =
                      params.row.permissionName;
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
                        deleTemplate(params.row.id)
                          .then((res) => {
                            this.$Message.success(
                              params.row.permissionName + " 已删除"
                            );
                            this.init();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
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
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let _this = this;
      await getTemplateData(this.info).then((d) => {
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
      this.info.limit.currentPage = num;
    },

    changePageSize(size) {
      this.info.limit.pageSize = size;
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
