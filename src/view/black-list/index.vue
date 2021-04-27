<template>
  <div>
    <Card>
      <div class="search">
        <searchFrom ref="searchFrom"></searchFrom>
      </div>
      <div>黑名单列表</div>
    </Card>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button
            type="primary"
            class="mr-6"
          >用户</Button>
          <Button
        
            class="mr-6"
          >代理商</Button>
          <Button
            
            class="mr-6"
          >产品商</Button>
          <Button
           
            class="mr-6"
          >核验商</Button>
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
  </div>
</template>

<script>
import searchFrom from "./searchFrom";
export default {
  components: {
    searchFrom,
  },
  data() {
    return {
      loading: false,
      // 表头配置
      columns: [
        { title: "ID", key: "id", align: "center" },
        { title: "用户名", key: "permissionName", align: "center" },
        { title: "手机号", key: "memo", align: "center" },
        { title: "保证金", key: "memo", align: "center" },
        { title: "上级代理(邀请码)", key: "memo", align: "center",width:"130" },
        { title: "账户余额", key: "memo", align: "center" },
        { title: "注册时间", key: "memo", align: "center" },
        { title: "拉黑时间", key: "memo", align: "center" },
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
                      content: "确认移除？",
                      onOk: () => {
                        delAuthority(params.row.id)
                          .then(d => {
                            this.init();
                            this.$Message.success("移除成功");
                          })
                          .catch(() => this.$Message.error("移除失败"));
                      }
                    });
                  }
                }
              },
              "移除"
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
.search {
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>
