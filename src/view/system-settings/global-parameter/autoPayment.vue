<template>
  <div>
    <crudTable
      ref="crudTable"
      :url="`${$platform.COMMON}/auto-payment`"

      :columns="columns"
    >
      <formModal slot="formModal" :rule="rule"  :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']" url="/auto-payment/"  />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from '_c/crud/formModal'
import rule from './autoPaymentRule'
export default {
   components: { crudTable,formModal },
data(){
    return {
        // 表头配置
        rule,
      columns:[
        { title: "id", key: "id", align: "center" },
        { title: "是否自动打款", align: "center",
        render:(h,parmse)=>
                  h("div", {}, parmse.row.autoFlag ? "启用" : "禁用")
         },
        { title: "打款金额", key: "amount", align: "center" },
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