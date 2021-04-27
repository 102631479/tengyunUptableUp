<template>
  <div>
    <crudTable ref="crudTable" :url="`${$platform.INFO}/model`" :columns="columns">
      <formModal
        slot="formModal"
        :rule="rule"
        :url="`${$platform.INFO}/model`"
        :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']"
      />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from "_c/crud/formModal";
import rule from "./rule";

export default {
  components: { crudTable, formModal },
  data() {
    return {
      // 表头配置
      rule,

      columns: [
        { title: "id", key: "id", align: "center" },
        { title: "创建时间", key: "dataCreateTime", align: "center" },
        // { title: "备注", key: "memo", align: "center" },
        // { title: "分类", key: "typeName", align: "center" },
        // { title: "code", key: "typeCode", align: "center" },
        {
          title: "是否启用",
          align: "center",
          render: (h, parmse) =>
            h("div", {}, parmse.row.useFlag ? "启用" : "禁用")
        }
      ]
    };
  },
  mounted() {
    this.$refs.crudTable.init();
  }
};
</script>