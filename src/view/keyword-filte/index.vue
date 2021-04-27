<template>
  <div>
    <crudTable ref="crudTable" :url="`${$platform.COMMON}/keyword`" :columns="columns">
      <formModal
        slot="formModal"
        :rule="rule"
        :url="`${$platform.COMMON}/keyword`"
        :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']"
      />
    </crudTable>
  </div>
</template>

<script>
import rule from "./rule";
import crudTable from "_c/crudTable";
import formModal from "_c/crud/formModal";

export default {
  components: {
    crudTable,
    formModal
  },
  data() {
    return {
      rule,
      columns: [
        { title: "id", key: "id", align: "center" },
        { title: "创建人id", key: "userId", align: "center" },
        { title: "创建人名称", key: "userName", align: "center" },
        { title: "关检词", key: "keywords", align: "center" }
      ]
    };
  },
  mounted() {
    this.$refs.crudTable.init();
  },
  methods: {}
};
</script>

<style scoped>
</style>
