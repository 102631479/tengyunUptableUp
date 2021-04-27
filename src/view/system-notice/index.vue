<template>
  <div>
    <div class="flex align-center"></div>
    <div>
      <div class="title">公告列表</div>
    </div>
    <Card dis-hover>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button
            type="primary"
            class="mr-6"
            @click="
              $refs.formModalt.userForm = true;
              $refs.formModalt.edit = false;
            "
            >添加</Button
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
      <Table
        border
        :columns="columns"
        :data="tabData"
        :loading="loading"
      ></Table>
      <Page
        class="t-center mt-10"
        :page-size="info['limit.pageSize']"
        :total="total"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        show-total
        show-sizer
      />
    </Card>
    <!-- 用户表单 -->
    <formModalt ref="formModalt" @success="init" />
    <editForm ref="editForm" @success="init" />
  </div>
</template>

<script>
import formModalt from "./formModalt";
import editForm from "./editForm";
import { getPages } from "@/api/system-notice";
export default {
  components: {
    formModalt,
    editForm,
  },
  data() {
    return {
      loading: false,
      // 表头配置
      columns: [
        { title: "ID", key: "id", align: "center" },
        { title: "标题", key: "title", align: "center" },
        { title: "内容", key: "noticeContent", align: "center" },
        { title: "创建人", key: "receiveId", align: "center" },
        { title: "创建时间", key: "dataCreateTime", align: "center" },
        {
          title: "操作",
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
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
                },   
                on: {  
                  click: () => {   
                    // getDetails(params.row.id).then(d => {
                    //   this.details = d.data.data;
                    //   console.log("d", this.details);
                    // });
                    this.$refs.editForm.userForm = true;
                    this.$refs.editForm.edit = true;
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
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认删除？",
                      onOk: () => {
                        delAuthority(params.row.id)
                          .then((d) => {
                            this.init();
                            this.$Message.success("删除成功");
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
      info: {
        permissionName: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },
      total: 0,
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
      await getPages(this.info).then((d) => {
        this.tabData = d.data.list;
        this.total = +d.data.pagination.total;
      });
      this.loading = false;
    },
    /**
     * 分页
     */
    changePage(num) {
      this.info["limit.currentPage"] = num;
      this.init();
    },
    /**
     * 切换每页大小
     */
    changePageSize(size) {
      this.info["limit.pageSize"] = size;
      this.init();
    },
  },
};
</script>

<style scoped></style>
