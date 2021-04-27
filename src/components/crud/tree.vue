<template>
  <div>
    <!-- <Card style="min-height: 400px"> -->
    <div class="flex align-center" @click="parentAdd">
      <div>{{title}}</div>
      <i class="iconfont cup iconplus-outline"></i>
    </div>
    <Tree :data="data" :render="renderContent" />
    <!-- </Card> -->
    <slot name="formModal"></slot>
  </div>
</template>

<script>
import axios from "@/libs/api.request";
import crudApi from "@/libs/mixins/crud-api";
import { findComponentDownward } from "@/libs/util";

export default {
  props: {
    title: String,
    url: String,
    renderKey: String
  },
  mixins: [crudApi],
  data() {
    return {
      formModal: {},
      selectData: {}, // 当前选中节点
      test: "",
      data: []
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      this.formModal = findComponentDownward(this, "formModal");
      this.formModal.$on("success", this.init);
    });
  },
  methods: {
    /**
     * 父级添加按钮
     */
    parentAdd() {
      this.formModal.userForm = true;
      this.formModal.isEdit = false;
      this.formModal.setKey("parentId", 0);
      this.selectData = {};
    },
    /**
     * 初始化数据
     */
    init() {
      this.getList({ parentId: 0 }).then(d => {
        this.data = this.filterTreeData(d.data);
      });
    },

    // 渲染函数
    renderContent(h, { root, node, data }) {
      return [
        h("span", {}, data[this.renderKey]),
        // 编辑
        h("i", {
          class: "cup iconfont iconedit-outline",
          on: {
            click: () => {
              // console.log(data);
              this.formModal.userForm = true;
              this.formModal.isEdit = true;
              Object.keys(data).map(item => {
                this.formModal.setKey(item, data[item]);
              });
              this.selectData = data;
            }
          }
        }),
        // 删除
        h("i", {
          class: "cup iconfont iconclose-outline",
          on: {
            click: () => {
              this.$Modal.confirm({
                title: "提示",
                content: "确认删除么？",
                onOk: () => {
                  this.del(data.id)
                    .then(d => {
                      this.$Message.success("删除成功");
                      // this.remove(root, node, data);
                      this.init()
                    })
                    .catch(() => this.$Message.error("删除失败"));
                }
              });
            }
          }
        }),
        // 新增
        h("i", {
          class: "cup iconfont iconplus-outline",
          props: {},
          on: {
            click: () => {
              this.formModal.userForm = true;
              this.formModal.isEdit = false;
              this.formModal.setKey("parentId", data.id);
              this.selectData = {};
            }
          }
        })
      ];
    },
    /**
     * 过滤树表数据
     */
    filterTreeData(list) {
      list.map(item => {
        item.title = item.name;
        item.expand = true;
        item.children
          ? this.filterTreeData(item.children)
          : (item.children = []);
        return item;
      });
      return list;
    },

    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    getList(params) {
      return axios.request({
        url: `${this.url}/tree`,
        method: "get",
        params
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-page-container {
  position: relative;
  .amap-demo {
    position: absolute;
    top: 50px;
    height: 400px;
    width: 500px;
  }
}
</style>