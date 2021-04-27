<template>
  <div>
    <div class="title">企业微信管理</div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button
            v-if="
              hasOneOf(['operate:wechat:add'], this.$store.state.user.access)
            "
            type="primary"
            class="mr-6"
            @click="
              $refs.formModal.isShow = true;
              formData = null;
            "
            >新增</Button
          >
        </div>
        <div class="flex align-center">
          <Input
            type="text"
            class="mr-6"
            style="width: 200px"
            v-model="info.companyName"
            placeholder="请输入企业名称"
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
        :data="listData"
        :loading="isLoading"
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
    <formModal ref="formModal" @success="init" :formData="formData" />
  </div>
</template>

<script>
import { hasOneOf } from "@/libs/tools";

import formModal from "./formModal";
import {
  getWechatInt,
  deleteWechat,
  getWechatKeyWord,
} from "@/api/message-template";
export default {
  components: {
    formModal,
  },
  data() {
    return {
      hasOneOf,
      isLoading: false, //是否开启加载动画
      // 表头配置
      columns: [
        { title: "序号", align: "center", type: "index" },
        { title: "企业ID", key: "companyId", align: "center" },
        { title: "企业名称", key: "companyName", align: "center" },
        { title: "企业微信ID", key: "workId", align: "center" },
        {
          title: "企业通讯录秘钥（Secret）",
          key: "workUserSecret",
          align: "center",
        },
        {
          title: "企业微信应用ID（AgentId）",
          key: "workAppId",
          align: "center",
        },
        {
          title: "企业微信应用秘钥（Secret）",
          key: "workAppSecret",
          align: "center",
        },
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
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "8px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:wechat:edit"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    this.$refs.formModal.isShow = true;
                    this.formData = (({
                      companyId,
                      workId,
                      workAppId,
                      workUserSecret,
                      workAppSecret,
                      id,
                      companyName,
                    }) => ({
                      companyId,
                      workId,
                      workAppId,
                      workUserSecret,
                      workAppSecret,
                      id,
                      companyName,
                    }))(params.row);
                  },
                },
              },
              "编辑"
            ),
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "8px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:wechat:delete"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认删除？",
                      onOk: () => {
                        deleteWechat(params.row.id)
                          .then((res) => {
                            if (res.ret == 0) {
                              this.$Message.success("删除成功");
                              this.init();
                            } else {
                              this.$Message.error(err.msg);
                            }
                          })
                          .catch((err) => {
                            this.$Message.error(err.msg);
                          });
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
      total: 0, //总条数
      //请求配置
      info: {
        companyName: "",
        limit: {
          currentPage: 1,
          pageSize: 10,
        },
      },
      listData: [
        // {
        //   id: 1,
        //   permissionName: "123",
        //   memo: "123456",
        // },
      ], //列表数据
      formData: null, //表单操作数据
      keyWordList: [], //删选名称对应列表数据
    };
  },
  created() {
    this.getKeyWordList();
  },
  methods: {
    // 获取所有列表数据
    getKeyWordList() {
      getWechatKeyWord()
        .then((res) => {
          if (res.ret == 0) {
            this.keyWordList = res.data;
            this.init();
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    /**
     * 初始化数据
     */
    init() {
      getWechatInt({ ...this.info })
        .then((res) => {
          if (res.ret == 0) {
            res.data.list.map((item) => {
              this.keyWordList.map((child) => {
                if (item.companyId == child.id) {
                  item.companyName = child.companyName;
                }
              });
            });
            this.listData = res.data.list;
            this.total = +res.data.pagination.total;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
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
.container-title {
  padding: 16px;
  background-color: #fff;
  margin: 10px auto;
  border-radius: 4px;
}
</style>
