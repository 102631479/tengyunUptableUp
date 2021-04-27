<template>
  <div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button type="primary" class="mr-6" @click="$refs.formModal.userForm = true; $refs.formModal.edit = false">新增</Button>
        </div>
        <div class="flex align-center">
          <span>权限名称:</span>
          <Input type="text" class="mr-6" style="width: 200px;" placeholder="请输入权限名称" v-model="info.permissionName" />
          <Button icon="ios-search" type="primary" @click="init">搜索</Button>
        </div>
      </div>

      <Table :columns="columns" :data="tabData" :loading="loading"></Table>
      <Page class="t-center mt-10" :page-size="info.limit.pageSize" :total="total" @on-page-size-change="changePageSize" @on-change="changePage"  show-total  show-sizer />
    </Card>

    <!-- 用户表单 -->
    <formModal ref="formModal" @success="init" />
  </div>
</template>

<script>
import {getAuthorityList,delAuthority } from "@/api/platform-auth";
import formModal from "./formModal";

export default {
  components: { formModal },
  data() {
    return {
      loading: false,

      // 表头配置
      columns: [
        { title: "权限ID", key: "id", align: "center" },
        { title: "权限名称", key: "permissionName", align: "center" },
        { title: "描述", key: "memo", align: "center" },
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
                    let formData = this.$refs.formModal.formData // 表单实例
                    let fields = formData.fields() //  表单所有字段名

                    this.$refs.formModal.userForm = true 
                    this.$refs.formModal.edit = true
                      formData.setValue(params.row)
                      Object.keys(params.row).map(item => {
                        if(fields.indexOf(item) === -1) {
                          formData.append({type: 'hidden', field: item, value: params.row[item]})
                        }
                      })

                  }
                }
              },
              "编辑"
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
                      content: "确认删除么？",
                      onOk: () => {
                        delAuthority(params.row.id)
                          .then(d => {
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
      await getAuthorityList(this.info).then(d => {
        this.tabData = d.data.list;
        this.total = d.data.pagination.total
      });
      this.loading = false;
    },
    /**
     * 分页
    */
   changePage(num) {
     this.info.limit.currentPage = num
     this.init()
   },
    /**
     * 切换每页大小
    */
   changePageSize(size) {
     this.info.limit.pageSize = size
     this.init()

   }
  }
};
</script>