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
              v-model="info.userName"
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
        :page-size="info.pageSize"
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
import { getUserList } from "@/api/user-feedback";
import feedback from "./feedback";
import columns from "./columns";
export default {
  components: {
    feedback,
  },
  data() {
    return {
      pageshow: true,
      this: this,
      loading: false,
      columns: columns(this),
      total: 0,
      info: {
        userName: "",
        currentPage: 1,
        pageSize: 10,
      },
      tabData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    sercher() {
      this.pageshow = false;
      this.init();
      this.info.currentPage = 1;
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    /**
     * 初始化数据
     */
    async init() {
      this.loading = true;
      let _this = this;
      await getUserList(this.info).then((res) => {
        let data = res.data;
        _this.total = Number(data.pagination.total);
        _this.tabData = data.list;
        console.log(data.list);
      });
      this.loading = false;
    },
    /**
     * 分页
     */
    changePage(num) {
      this.info.currentPage = num;
      this.init();
    },
    /**
     * 切换每页大小
     */
    changePageSize(size) {
      this.info.pageSize = size;
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
