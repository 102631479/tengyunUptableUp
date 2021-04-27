<template>
  <div>
    <Button size="default" @click="$router.go(-1)">返回</Button>
    <crudTable
      class="mt-10"
      ref="crudTable"
      :url="`${$platform.COMMON}/dict`"
      :columns="columns"
      :searchKey="searchKey"
      :addInfo="addInfo"
    >
      <formModal
        :rule="rule"
        slot="formModal"
        :url="`${$platform.COMMON}/dict`"
        :delKey="['_index','_rowKey', 'dataCreateTime', 'dataUpdateTime']"
      />
    </crudTable>
  </div>
</template>

<script>
import crudTable from "_c/crud/table";
import formModal from "_c/crud/formModal";
import { findComponentDownward } from "@/libs/util";

import rule from "./detailRule";

export default {
  components: { crudTable, formModal },
  data() {
    return {
      addInfo: {}, // 初始化追加参数
      // 表头配置
      rule,
      searchKey: [{ title: "应用名称", key: "appName" }],
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
    this.addInfo = {
      "dictType.id": this.$route.query.id
    };
    this.$nextTick(() => {
      let formModal = findComponentDownward(this, "formModal");
      let crudTable = findComponentDownward(this, "crudTable");
      formModal.setKey("dictType", { id: this.$route.query.id });
      crudTable.init();
    });
  }
};
</script>