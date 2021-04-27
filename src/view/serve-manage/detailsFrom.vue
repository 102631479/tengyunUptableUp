<template>
  <div>
    <Modal v-model="userForm" title='活动详情'>
      <div>
        <div class="flex align-center">
          <Input type="text" class="mr-6" style="width: 200px;" placeholder="请输入用户名称" v-model="info.permissionName" />
          <Button icon="ios-search" type="primary" @click="init">搜索</Button>
        </div>
      </div>
      <Table border :columns="columns" :data="tabData" :loading="loading"></Table>
      <div class="footer">关闭</div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import {getDetails} from "@/api/active";
export default {
  data() {
    return {
      userForm: false,
      edit: false,
      loading:false,
       // 表头配置
      columns: [
        { title: "ID", key: "id", align: "center" },
        { title: "用户名称", key: "permissionName", align: "center" },
        { title: "用户身份", key: "memo", align: "center" },
        { title: "接入时间", key: "memo", align: "center" },
        { title: "接入状态", key: "status", align: "center",
          render: (h, params) => {
            this.status = params.row.status;
            if (params.row.status == 2) {
              return h("span", "启用");
            } else {
              return h("span", "未启用");
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
      tabData: []
    };
  },
  created(){
    this.init()
  },
  methods: {
     /**
     * 初始化数据
     */
    async init() {
      this.loading = true
      this.loading = false
    },
  }
};
</script>

<style>
ul li {
  list-style: none;
  font-size: 16px;
}
</style>