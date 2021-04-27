<template>
    <div>
        <crudTable
      ref="crudTable"
      :url="`${$platform.COMMON}/agent-transaction-count`"
      :columns="columns"
    >
      <formModal slot="formModal" :rule="rule"  :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']" url="/agent-transaction-count/"  />
    </crudTable>
    </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from '_c/crud/formModal'
import rule from "./rule";
export default {
components: { crudTable,formModal },
data(){
    return {
        // 表头配置
        rule,
      columns:[
        { title: "id", key: "id", align: "center" },
        { title: "一级佣金比例", key: "oneLevelScale", align: "center" },
        { title: "二级佣金比例", key: "twoLevelScale", align: "center" },
      ]   
    };
 },
  mounted() {
            this.$refs.crudTable.init();
    }

}
</script>

<style>

</style>