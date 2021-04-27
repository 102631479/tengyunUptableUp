<template>
  <div>
    <crudTable
      ref="crudTable"
      :url="`${$platform.COMMON}/handling-fee`"
      :columns="columns"
    >
      <formModal slot="formModal" :rule="rule"  :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']" url="/handling-fee/"  />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from "_c/crud/formModal"; 
import rule from "./handFeeRule.js";
export default {
  components: { crudTable, formModal },
  data() {
    return {
      // 表头配置
      rule,
      columns: [
        { title: "id", key: "id", align: "center" },
        { title: "手续费百分比", key: "feeRatio", align: "center" }
      ]
    };
  },
  mounted() {
    this.$refs.crudTable.init();
  }
};
</script>

<style>
</style>