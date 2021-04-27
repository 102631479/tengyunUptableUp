<template>
  <div>
    <Card style="min-height: 400px">
      <Tree :data="data" :load-data="loadData"  :render="renderContent" />
    </Card>

    <formModal :rule="rule" ref="formModal" @success="init" :url="url" :delKey="[]" />
  </div>
</template>

<script>
import { getAuthorityList } from "@/api/public-server";
import formModal from "_c/crud/formModal";
import axios from "@/libs/api.request";
import rule from "./rule";
import crudApi from "@/libs/mixins/crud-api";

const editKey = [
  "cantonCode",
  "cantonName",
  "memo",
  "shortCode",
  "dataSort",
  "useFlag",
  "coordinates",
  "id",
  "parentId"
];
export default {
  mixins: [crudApi],
  components: { formModal },
  data() {
    return {
      selectData: {}, // 当前选中节点
      test: "",
      rule,
      data: [],
      url: this.$platform.COMMON + "/canton"
    };
  },
  created() {
    this.getList({ parentId: -1 }).then(d => {
      this.data = d.data.map(item => {
        item.title = item.cantonName;
        item.loading = false;
        item.children = [];
        return item;
      });
    });
  },

  methods: {
    init({ data }, isEdit) {
      data.title = data.cantonName
        this.$set(this.selectData, "loading", false);
      if (isEdit) {
        Object.keys(data).map(item=> {
          this.$set(this.selectData, item, data[item]);
        })
      } else {
        const children = this.selectData.children || [];
        children.push(data);
        this.$set(this.selectData, "children", children);
      }
    },

    // 渲染函数
    renderContent(h, { root, node, data }) {
      return [
        h("span", {}, data.title),
        // 编辑
        h("i", {
          class: "cup iconfont iconedit-outline",
          on: {
            click: () => {
              this.$refs.formModal.userForm = true;
              this.$refs.formModal.isEdit = true;
              editKey.map(item => {
                this.$refs.formModal.setKey(item, data[item]);
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
                      this.remove(root, node, data)
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
              this.$refs.formModal.userForm = true;
              this.$refs.formModal.isEdit = false;
              this.$refs.formModal.setKey("parentId", data.id);
              this.selectData = data;
            }
          }
        })
      ];
    },

    loadData(item, callback) {
      this.getList({
        parentId: item.id || -1
      }).then(d => {
        callback(
          d.data.map(item => {
            item.title = item.cantonName;
            item.loading = false;
            item.children = item.children ? item.children : [];
            return item;
          })
        );
      });
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el =>  el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
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