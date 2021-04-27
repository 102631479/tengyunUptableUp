<template>
  <div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <Button type="primary" class="mr-6" @click="addBtn">新增</Button>
        </div>
        <div class="flex align-center">
          <div v-for="(item, index) in searchKey" :key="index" class="flex align-center">
            <div>{{item.title}}:</div>
            <Input
              type="text"
              class="mr-6"
              style="width: 200px;"
              :placeholder="`请输入${item.title}`"
              v-model="info[item.key]"
            />
          </div>
          <Button
            icon="ios-search"
            type="primary"
            class="ml-10"
            @click="init(); info['limit.currentPage'] =1;"
          >搜索</Button>
        </div>
      </div>

      <Table :columns="columns" :data="tabData" :loading="loading"></Table>
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

    <slot name="formModal"></slot>
  </div>
</template>

<script>
import formModal from "./formModal";
import axios from "@/libs/api.request";
import { findComponentDownward } from "@/libs/util";

export default {
  components: { formModal },
  name: "crudTable",

  props: {
    url: String, // 通用接口
    searchKey: {
      //搜索条件
      type: Array,
      default: () => []
    },
    columns: {
      // 表格配置
      type: Array,
      default: () => []
    },
    // 编辑追加按钮
    btns: {
      type: Array,
      default: () => []
    },
    // 初始化查询参数
    addInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      crudTable: {},
      loading: false,
      formModal: {},
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
    this.columns.push({
      title: "操作",
      key: "userCode",
      width: 200,
      align: "center",
      render: (h, params) => [
        ...this.btns.map(item =>
          h(
            "Button",
            {
              style: {
                marginRight: "5px"
              },
              props: {
                type: item.config.type || "primary",
                size: "small"
              },
              on: {
                click: () => {
                  item.config.click(params);
                }
              }
            },
            item.title
          )
        ),
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
                let formData = this.formModal.formData; // 表单实例
                let fields = formData.fields(); //  表单所有字段名
                this.formModal.userForm = true; // 显示表单
                this.formModal.isEdit = true; // 编辑状态
                formData.setValue(params.row);
                Object.keys(params.row).map(item => {
                  if (fields.indexOf(item) === -1) {
                    formData.append({
                      type: "hidden",
                      field: item,
                      value: params.row[item]
                    });
                  }
                });
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
                    this.del(params.row.id)
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
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.formModal = findComponentDownward(this, "formModal");
      // console.log(this.formModal)
      this.formModal.$on("success", this.init);
    });
  },
  methods: {
    addBtn() {
      let formModal = findComponentDownward(this, "formModal");
      formModal.userForm = true;
      formModal.isEdit = false;
      formModal.formData.resetFields();
    },
    /**
     * 初始化数据
     */
    async init() {
      this.loading = true;
      await this.get({ ...this.info, ...this.addInfo }).then(d => {
        this.tabData = d.data.list;
        this.total = parseInt(d.data.pagination.total);
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

    // 增删改查
    add(data) {
      return axios.request({
        url: this.url,
        method: "post",
        data
      });
    },

    del(id) {
      return axios.request({
        url: `${this.url}/` + id,
        method: "delete"
      });
    },

    edit(data) {
      return axios.request({
        url: this.url,
        method: "put",
        data
      });
    },

    get(params) {
      return axios.request({
        url: `${this.url}/page`,
        method: "get",
        params
      });
    }
  }
};
</script>