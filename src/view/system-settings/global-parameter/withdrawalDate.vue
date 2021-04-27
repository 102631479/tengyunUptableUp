<template>
  <div>
    <crudTable
      ref="crudTable"
      :url="`${$platform.COMMON}/withdrawal-date`"
      :columns="columns"
    >
      <formModal slot="formModal" :rule="rule"  :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']" url="/withdrawal-date/"  />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from '_c/crud/formModal'
import rule from './withdrawalDateRule'
export default {
   components: { crudTable,formModal },
data(){
    return {
        // 表头配置
        rule,
      columns:[
        { title: "id", key: "id", align: "center" },
        { title: "提现日期", key: "withdrawalDate", align: "center" }
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