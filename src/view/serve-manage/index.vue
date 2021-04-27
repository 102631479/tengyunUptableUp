<template>
  <div>
    <div>
      <p>服务说明:停止用户正在使用的服务时,系统会自动发送站内消息进行通知用户<br/>服务停用是也会通知用户,暂停使用此服务</p>
    </div>
    <Card>
       <Collapse active-key="1">
        <Panel key="1">
           全部服务
           <ul>
             <li>工单服务</li>
             <li>权限服务</li>
             <li>消息服务</li>
             <li>支付服务</li>
             <li>系统检测服务</li>
             <li>运维服务</li>
             <li>物联网服务</li>
           </ul>
        </Panel>
    </Collapse>
    </Card>
    <Card>
      <div>服务列表</div>
      <Table border :columns="columns" :data="tabData" :loading="loading"></Table>
    </Card>

    <!-- 详情表单 -->
     <detailsFrom ref="detailsFrom" @success="init" />
  </div>
</template>

<script>
import detailsFrom from './detailsFrom'
export default {
  components: {
    detailsFrom
  },
  data() {
    return {
      loading: false,
      // 表头配置
      columns: [
        { title: "ID", key: "id", align: "center" },
        { title: "服务名称", key: "permissionName", align: "center" },
        { title: "接入数量", key: "memo", align: "center" },
        { title: "状态", key: "status", align: "center",
          render: (h, params) => {
            this.status = params.row.status;
            if (params.row.status == 2) {
              return h("span", "启用");
            } else  {
              return h("span", "禁用");
            }
          } },
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
                    this.$refs.formDetails.userForm = true;
                    this.$refs.formDetails.edit = true;
                  }
                }
              },
              "详情"
            ),
            h(
              "Button",
              {
                props: {
                  type: "success",
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
                            this.init()
                            this.$Message.success('拉黑成功')
                          })
                          .catch(() => this.$Message.error('拉黑失败'))
                      }
                    });
                  }
                }
              },
              "拉黑"
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
                            this.init()
                            this.$Message.success('拒绝成功')
                          })
                          .catch(() => this.$Message.error('拒绝失败'))
                      }
                    });
                  }
                }
              },
              "拒绝"
            ),
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
