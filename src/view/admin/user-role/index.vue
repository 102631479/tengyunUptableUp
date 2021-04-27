<template>
  <div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button type="primary" class="mr-6" @click="$refs.formModal.userForm = true; $refs.formModal.edit = false">新增</Button>
          <Button type="primary" class="mr-6">关联用户</Button>
        </div>
        <div class="flex align-center">
          <div >角色名称:</div>
          <Input type="text" class="mr-6" style="width: 200px;" placeholder="请输入角色名称" v-model="info.userName" />
          <div >状态</div>
          <Select style="width: 200px;" >
            <Option :value="1">启用</Option>
            <Option :value="2">禁用</Option>
          </Select>
          <Button icon="ios-search" type="primary" class="ml-10" @click="init">搜索</Button>
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
import { userPage, delUser } from "@/api/platform-auth";
import { getRoleList } from '@/api/platform-auth'
import formModal from "./formModal";

// import columns from './columns'
export default {
  components: { formModal },
  data() {
    return {
      loading: false,

      // 表头配置
      columns: [
        { title: "id", key: "id", align: "center" },
        { title: "角色名", key: "roleName", align: "center" },
        { title: "功能权限", key: "roleName", align: "center" },
        { title: "创建人", key: "roleName", align: "center" },
        { title: "创建时间", key: "dataCreateTime", align: "center" },
        { title: "创建状态", key: "roleName", align: "center" },
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
                        delUser(params.row.id)
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
        userName: "",
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
      await getRoleList(this.info).then(d => {
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