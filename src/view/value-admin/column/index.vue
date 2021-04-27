<template>
  <Card>
    <div class="flex">
      <crudTree :url="url" renderKey="modelName" ref="crudTree" title="栏目">
        <formModal :rule="rule" :url="url" slot="formModal" @success="formModalSuccess" />
      </crudTree>
      <div style="width: 87%;" class="ml-40">
        <articleTemp />
      </div>
    </div>
  </Card>
</template>

<script>
import crudTree from "_c/crud/tree";
import formModal from "_c/crud/formModal";
import rule from "./rule";
import articleTemp from "../article/index";

export default {
  components: { crudTree, formModal, articleTemp },
  data() {
    return {
      rule,
      url: this.$platform.INFO + "/model"
    };
  },
  methods: {
    formModalSuccess() {
      this.$refs.crudTree.init();
    }
  }
};
</script>