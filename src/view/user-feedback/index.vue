<template>
  <div>
      <div>
        <div>反馈列表</div>
      </div>
    <Card>
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
    <feedback ref="feedback" @success="init" />
  </div>
</template>

<script>
import feedback from "./feedback";
export default {
  components: {
    feedback
  },
  data() {
    return {
      loading: false,
      // 表头配置
      columns: [
        { title: "ID", key: "id", align: "center" },
        { title: "用户", key: "name", align: "center" },
        { title: "详情描述", key: "memo", align: "center" },
        { title: "附件图片", key: "memo", align: "center" },
        { title: "提交时间", key: "memo", align: "center" },
        { title: "回复内容", key: "memo", align: "center" },
        { title: "回复人", key: "memo", align: "center" },
        { title: "回复时间", key: "memo", align: "center" },
        { title: "状态", key: "memo", align: "center" },
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
                      // console.log("d", d);
                      this.details = d.data.data;
                      // console.log("d", this.details);
                    });
                    this.$refs.feedback.userForm = true;
                    this.$refs.feedback.edit = true;
                  }
                }
              },
              "回复"
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
                            this.init();
                            this.$Message.success("拒绝成功");
                          })
                          .catch(() => this.$Message.error("拒绝失败"));
                      }
                    });
                  }
                }
              },
              "拒绝"
            )
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
</style>
