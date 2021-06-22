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
import { getTemplateData } from "@/api/message-template";
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
          key: "permissionName",
          align: "center",
          width: "150",
        },
        { title: "模板内容", key: "memo", align: "center" },
        {
          title: "变量释义",
          key: "status",
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
        { title: "类型", key: "memo", align: "center", width: "100" },
        { title: "模板描述", key: "memo", align: "center", width: "100" },
        {
          title: "操作",
          key: "userCode",
          width: 200,
          align: "center",
          render: (h, params) => [
            // h(
            //   'span',
            //   {
            //     props: {
            //       type: 'primary',
            //       size: 'small'
            //     },
            //     style: {
            //       marginRight: '8px',
            //       color: '#0084ff',
            //       cursor: 'pointer'
            //     },
            //     on: {
            //       click: () => {
            //         this.$Message.success('详情')

            //         // console.log("d", params.row.id);
            //         // getDetails(params.row.id).then((d) => {
            //         //   console.log("d", d);
            //         //   this.details = d.data.data;
            //         //   console.log("d", this.details);
            //         // });
            //         this.$refs.detailsPage.userForm = true
            //         // this.$refs.formDetails.edit = true;
            //       }
            //     }
            //   },
            //   '详情'
            // ),

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
                        this.$Message.success(
                          params.row.permissionName + " 已删除"
                        );
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
