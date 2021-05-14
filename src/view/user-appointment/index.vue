<template>
  <div>
    <div class="title">用户预约</div>
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
              placeholder="请输入"
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
  </div>
</template>

<script>
export default {
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
              "span",
              {
                props: {
                  //   type: "primary",
                  //   size: "small",
                },
                style: {
                  color: "#0084ff",
                  cursor: "pointer",
                  marginRight: "15px",
                },
                on: {
                  click: () => {
                    // console.log("d", params.row.id);
                    getDetails(params.row.id).then((d) => {
                      // console.log("d", d);
                      this.details = d.data.data;
                      // console.log("d", this.details);
                    });
                    this.$refs.feedback.userForm = true;
                    this.$refs.feedback.edit = true;
                  },
                },
              },
              "回复"
            ),
            h(
              "span",
              {
                props: {
                  //   type: "error",
                  //   size: "small",
                },
                style: {
                  color: "#0084ff",
                  cursor: "pointer",
                  marginRight: "15px",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认同意？",
                      onOk: () => {
                        delAuthority(params.row.id)
                          .then((d) => {
                            this.init();
                            this.$Message.success("拒绝成功");
                          })
                          .catch(() => this.$Message.error("拒绝失败"));
                      },
                    });
                  },
                },
              },
              "拒绝"
            ),
          ],
        },
      ],
      total: 0,
      //请求配置
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
