<template>
  <div>
    <div class="search">
      <searchFrom ref="searchFrom"></searchFrom>
    </div>
    <div>核验商列表</div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button type="primary" class="mr-6"  
          @click="$refs.formModalt.userForm = true; $refs.formModalt.edit = false">新增核验商</Button>
        </div>
      </div>

      <Table border :columns="columns" :data="tabData" :loading="loading"></Table>
      <Page
        class="t-center mt-10"
        :page-size="info.limit.pageSize"
        :total="total"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        show-total
        show-sizer
      />
    </Card>

    <!-- 用户表单 -->
     <formModalt ref="formModalt" @success="init" />
  </div>
</template>

<script>
import searchFrom from "./searchFrom";
import formModalt from './formModalt'
export default {
  components: {
    searchFrom,
    formModalt
  },
  data() {
    return {
      loading: false,
      // 表头配置
      columns: [
        { title: "ID", key: "id", align: "center" },
        { title: "用户名", key: "permissionName", align: "center" },
        { title: "手机号", key: "memo", align: "center" },
        { title: "Appid", key: "memo", align: "center" },
        { title: "AppKey", key: "memo", align: "center"},
        { title: "Accesstoken", key: "memo", align: "center",width:120 },
        { title: "Header", key: "memo", align: "center" },
        { title: "Partner_id", key: "memo", align: "center",width:110  },
        { title: "核验数量", key: "memo", align: "center" },
        { title: "注册时间", key: "memo", align: "center" },
        { title: "状态", key: "status", align: "center",
          render: (h, params) => {
            this.status = params.row.status;
            if (params.row.status == 2) {
              return h("span", "已同意");
            } else if (params.row.status == 3) {
              return h("span", "已拒绝");
            } else {
              return h("span", "未审批");
            }
          } },
        {
          title: "操作",
          key: "userCode",
          width: 200,
          align: "center",
          render: (h, params) => [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    // console.log("d", params.row.id);
                    getDetails(params.row.id).then(d => {
                      console.log("d", d);
                      this.details = d.data.data;
                      // console.log("d", this.details);
                    });
                    this.$refs.formDetails.userForm = true;
                    this.$refs.formDetails.edit = true;
                  }
                }
              },
              "详情"
            ),
            h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认同意？",
                      onOk: () => {
                        delAuthority(params.row.id)
                          .then(d => {
                            this.init()
                            this.$Message.success('拉黑成功')
                          })
                          .catch(() => this.$Message.error('拉黑失败'))
                      }
                    });
                  }
                }
              },
              "拉黑"
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认同意？",
                      onOk: () => {
                       delAuthority(params.row.id)
                          .then(d => {
                            this.init()
                            this.$Message.success('拒绝成功')
                          })
                          .catch(() => this.$Message.error('拒绝失败'))
                      }
                    });
                  }
                }
              },
              "拒绝"
            ),
          ]
        }
      ],

      total: 0,
      //请求配置
      info: {
        permissionName: "",
        limit: {
          currentPage: 1,
          pageSize: 10
        }
      },
      tabData: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * 初始化数据
     */
    async init() {
      this.loading = true;
      // await getAuthorityList(this.info).then(d => {
      //   this.tabData = d.data.list;
      //   this.total = d.data.pagination.total;
      // });
      this.loading = false;
    },
    /**
     * 分页
     */
    changePage(num) {
      this.info.limit.currentPage = num;
      this.init();
    },
    /**
     * 切换每页大小
     */
    changePageSize(size) {
      this.info.limit.pageSize = size;
      this.init();
    }
  }
};
</script>

<style scoped>
.search {
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>
