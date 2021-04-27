<template>
  <div>
    <crudTable
      ref="crudTable"
      :url="`${$platform.COMMON}/charge-cycle`"
      :columns="columns"
    >
      <formModal slot="formModal" :rule="rule"  :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']" url="/charge-cycle/"  />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from '_c/crud/formModal'
import rule from './chargeCycleRule'
export default {
   components: { crudTable,formModal },
data(){
    return {
        // 表头配置
        rule,
      columns:[
        { title: "id", key: "id", align: "center" },
        { title: "入账周期（天）", key: "chargeCycle", align: "center" },
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