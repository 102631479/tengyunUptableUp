<template>
  <div>
    <crudTable
      ref="crudTable"
      :url="`${$platform.COMMON}/dict-type`"
      :columns="columns"
      :btns="btns"
    >
      <formModal slot="formModal" :rule="rule"  :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']"  />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from '_c/crud/formModal'
import rule from "./rule";

export default {
  components: { crudTable,formModal },
  data() {
    return {
      // 表头配置
      rule,
      btns: [{ title: "详情", config: {
        type: 'success',
        click: (params) => {
          this.$router.push({ name: 'dict-config-detail', query: {id: params.row.id} })
        }
      } }],
      columns: [
        { title: "id", key: "id", align: "center" },
        { title: "创建时间", key: "dataCreateTime", align: "center" },
        { title: "备注", key: "memo", align: "center" },
        { title: "分类", key: "typeName", align: "center" },
        { title: "code", key: "typeCode", align: "center" },
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