<template>
  <div>
    <Card>
      <div>模板列表</div>
    </Card>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button
            type="primary"
            class="mr-6"
            @click="$refs.formModalt.userForm = true; $refs.formModalt.edit = false"
          >添加</Button>
        </div>
      </div>

      <Table border :columns="columns" :data="tabData"></Table>
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
    <!-- 附件 -->
    <accessory
      ref="accessory"
      @click=" $refs.accessory.userForm = true; "
      @success="init"
      v-bind:accessory="accessory"
    ></accessory>
  </div>
</template>

<script>
import formModalt from "./formModalt";
import accessory from "./accessory";
import { getBoxedart, deleteBoxedart,lookFiled } from "@/api/boxedart";
export default {
  components: {
    formModalt,
    accessory
  },
  data() {
    return {
      loading: false,
      accessory: "",
      // 表头配置
      columns: [
        { title: "ID", type: "index", align: "center" },
        { title: "文件名称", key: "name", align: "center" },
        {
          title: "附件",
          key: "annexIdList",
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
                    this.$refs.accessory.userForm = true;
                    lookFiled(params.row.id).then(res => {
                      this.accessory = res.data;
                    });
                  }
                }
              },
              "附件"
            )
          ]
        },
        { title: "备注", key: "memo", align: "center" },
        { title: "创建时间", key: "dataCreateTime", align: "center" },
        {
          title: "状态",
          key: "userFlag",
          align: "center",
          render: (h, params) => {
            if (params.row.useFlag == true) {
              return h("span", "已启用");
            } else {
              return h("span", "停用");
            }
          }
        },
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
                      content: "确认删除？",
                      onOk: () => {
                        deleteBoxedart(params.row.id)
                          .then(d => {
                            console.log("删除", d);
                            this.init();
                            this.$Message.success("删除成功");
                          })
                          .catch(() => this.$Message.error("删除失败"));
                      }
                    });
                  }
                }
              },
              "删除"
            )
          ]
        }
      ],

      total: 0,
      //请求配置
      info: {
        "limit.currentPage": 1,
        "limit.pageSize": 10
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
      await getBoxedart(
        {...this.info}
      ).then(d => {
        this.tabData = d.data.list;
        this.total = d.data.pagination.total * 1;
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
    }
  }
};
</script>

<style scoped>
</style>
