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
              v-model="info.templateName"
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
        :page-size='info["limit.pageSize"]'
        :total="totals"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        show-total
        show-sizer
      />
    </Card>
    <formModal ref="formModal" @success="init" />
  </div>
</template>

<script>
import Bus from "@/bus";
import columns from "./columns";
import { getTemplateData, deleTemplate } from "@/api/message-template";
import formModal from "./formModal";
export default {
  components: {
    formModal,
  },
  data() {
    return {
      templateDescribeNum: Number(200),
      totals: 0,
      info: {
        templateName: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },
      loading: false,
      columns: columns(this),
      tabData: [],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    Bus.$on("message-Mobile-add", (data) => {
      console.log("数据更新了");
      this.init();
    });
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
      // console.log(this.$refs.formModal.formValidate);
      this.$refs.formModal.numMerr = 1;
      this.$refs.formModal.numMer = "1";
      this.$refs.formModal.userForm = false;
      this.$refs.formModal.formValidate.definitions = [];
      this.$refs.formModal.edit = false;
      this.$refs.formModal.userForm = true;
    },
    getEidet(gs, sc) {
      if (gs == 3) return "编辑";
      if (gs == 1) {
        if (sc == 1) return "";
        return "编辑";
      } else {
        if (sc == 2) return "编辑";
        return "";
      }
    },
    changePage(num) {
      console.log(num);
      this.info["limit.currentPage"] = num;
      this.init();
    },

    changePageSize(size) {
      console.log(size);
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
