<template>
  <div>
    <div class="title">反馈列表</div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <div>
            <Button type="primary" class="mr-6" style="display: none"
              >新增产品商</Button
            >
          </div>
          <div>
            <Input
              type="text"
              class="mr-6"
              style="width: 200px"
              placeholder="请输入用户名、详情内容"
              search
              enter-button
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
import columns from './columns'
export default {
  components: {
    feedback,
  },
  data() {
    return {
      loading: false,
      columns:columns(this),
      total: 0,
      info: {
        permissionName: "",
        limit: {
          currentPage: 1,
          pageSize: 10,
        },
      },
      tabData: [
        {
          id: 1,
          memo: "你是谁？",
          name: "迪丽热巴",
        },
      ],
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
    },
  },
};
</script>

<style scoped>
.flex {
  display: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: blue; */
}

.ios-search-input {
  margin-right: 30px;
}
</style>
