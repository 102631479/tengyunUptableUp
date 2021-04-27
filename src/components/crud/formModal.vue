<template>
  <div>
    <Modal v-model="userForm" :title="isEdit? '编辑' : '新增'" :loading="loading" @on-ok="submit">
      <formCreate :rule="rule" :option="option" v-model="formData"></formCreate>
    </Modal>
  </div>
</template>

<script>
import option from "./options";
import { findComponentUpward } from "@/libs/util";
import axios from 'axios'
import crudApi from '@/libs/mixins/crud-api'
export default {
  name: "formModal",
  mixins: [crudApi],
  props: {
    url: String,
    delKey: {
      type:Array,

      default: () => []
    }, // 要删除的数组
    rule: Array
    
  },
  data() {
    return {
      isEdit: false,
      loading: true,
      userForm: false,
      formData: {},
      option // 弹框表单配置
    };
  },
  watch: {
    userForm(val) {
      if (!val) {
        this.formData.resetFields();
        this.delKey.map(key => this.formData.removeField(key))
      }
    }
  },
  methods: {
    // 提交数据
    async submit() {
      this.formData.submit(
        async data => {
          delete data._rowKey;
          delete data._index;

          if (this.isEdit) {
            await this.edit(data)
              .then(d => {
                this.$Message.success("编辑成功");
                this.$emit("success", d, this.isEdit);
              })
              .catch(err => this.$Message.error("编辑失败"));
          } else {
            await this.add(data)
              .then(d => {
                this.$Message.success("添加成功");
                this.$emit("success", d, this.isEdit);
              })
              .catch(err => this.$Message.error("添加失败"));
          }
          this.userForm = false;
        },
        () => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }
      );
    },

    // 设置表单字段
    setKey(key, val) {
        let fields = this.formData.fields()
      if(fields.includes(key)) {
        this.formData.setValue(key,val)
      }else {
        this.formData.append({type: 'hidden', field: key, value: val})
      }
      
    }

    
  }
};
</script>