<template>
  <div>
    <crudTable ref="crudTable" :url="`${$platform.COMMON}/rebate`" :columns="columns">
      <formModal
        slot="formModal"
        :rule="rule"
        :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']"
        :url="`${$platform.COMMON}/rebate`"
      />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from "_c/crud/formModal";
import rule from "./rebateRule";
export default {
  components: { crudTable, formModal },
  data() {
    return {
      // 表头配置
      rule,
      columns: [
        { title: "id", key: "id", align: "center" },
        { title: "起点金额", key: "startAmount", align: "center" },
        { title: "结点金额", key: "endAmount", align: "center" },
        { title: "佣金比例", key: "rebateScale", align: "center" }
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