<template>
  <div>
    <Modal
      v-model="isShow"
      :title="formData == null ? '新增企业微信' : '编辑企业微信'"
      :mask-closable="false"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="选择企业" prop="companyName">
          <Select
            v-model="formValidate.companyName"
            filterable
            :remote-method="handleKeyWordChange"
            :loading="loading"
            placeholder="请输入企业名称"
            @on-select="handleSelect"
            :default-label="formValidate.companyName"
          >
            <Option
              v-for="(item, index) in keyWordList"
              :value="item.companyName"
              :key="index"
              >{{ item.companyName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="企业ID">
          <Input
            placeholder="选择企业后显示企业ID"
            v-model="formValidate.companyId"
            readonly
          />
        </FormItem>
        <FormItem label="企业微信ID" prop="workId">
          <Input placeholder="请输入企业微信ID" v-model="formValidate.workId" />
        </FormItem>
        <FormItem label="企业通讯录秘钥（Secret）" prop="workUserSecret">
          <Input
            placeholder="请输入企业通讯录秘钥（Secret）"
            v-model="formValidate.workUserSecret"
          />
        </FormItem>
        <FormItem label="企业微信应用ID（AgentId）" prop="workAppId">
          <Input
            placeholder="请输入企业微信应用ID（AgentId）"
            v-model="formValidate.workAppId"
          />
        </FormItem>
        <FormItem label="企业微信应用秘钥（Secret）" prop="workAppSecret">
          <Input
            placeholder="请输入企业微信应用秘钥（Secret）"
            v-model="formValidate.workAppSecret"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="isShow = false">取消</Button>
        <Button
          type="primary"
          :loading="modalLoading"
          @click="handleSubmit('formValidate')"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  getWechatKeyWord,
  addWechat,
  editWechat,
} from "@/api/message-template";
export default {
  props: {
    formData: {
      type: Object,
      default: null,
    },
  },
  created() {
    this.getKeyWordList("");
  },

  data() {
    return {
      isShow: false, //是否展示弹框
      formValidate: {}, //表单
      ruleValidate: {
        companyName: [
          {
            required: true,
            message: "请根据搜索结果选择企业",
            trigger: "blur",
          },
        ],
        workId: [
          {
            required: true,
            message: "请输入企业微信ID",
            trigger: "blur",
          },
        ],
        workUserSecret: [
          {
            required: true,
            message: "请输入企业通讯录秘钥（Secret）",
            trigger: "blur",
          },
        ],
        workAppId: [
          {
            required: true,
            message: "请输入企业微信应用ID（AgentId）",
            trigger: "blur",
          },
        ],
        workAppSecret: [
          {
            required: true,
            message: "请输入企业微信应用秘钥（Secret）",
            trigger: "blur",
          },
        ],
      },
      keyWordList: [], //搜索下拉数据
      loading: false, //下拉框加载状态控制
      modalLoading: false, //确认弹框正确按钮的loading
    };
  },
  watch: {
    isShow(val) {
      if (val == false) {
        this.formValidate = {};
      }
    },
    formData(val) {
      if (val != null) {
        this.formValidate = val;
        this.getKeyWordList("");
        // console.log(this.formValidate);
      }
    },
    keyWordList(val) {
      // console.log(val);
    },
  },
  methods: {
    // 关键词输入框改变触发
    handleKeyWordChange(e) {
      this.loading = true;
      this.getKeyWordList(e);
    },
    handleSelect(e) {
      let item = this.keyWordList.filter((item) => item.companyName == e)[0];
      this.formValidate.companyId = item.id;
    },
    // 表单提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        this.modalLoading = true;
        if (this.formData == null) {
          addWechat({ ...this.formValidate })
            .then((res) => {
              if (res.ret == 0) {
                this.$Message.success(`添加成功`);
                this.$emit("success");
                this.modalLoading = false;
                this.isShow = false;
              } else {
                this.$Message.error(err.msg);
                this.modalLoading = false;
              }
            })
            .catch((err) => {
              this.$Message.error(err.msg);
              this.modalLoading = false;
            });
        } else {
          editWechat({ ...this.formValidate })
            .then((res) => {
              if (res.ret == 0) {
                this.$Message.success(`编辑成功`);
                this.$emit("success");
                this.modalLoading = false;
                this.isShow = false;
              } else {
                this.$Message.error(err.msg);
                this.modalLoading = false;
              }
            })
            .catch((err) => {
              this.$Message.error(err.msg);
              this.modalLoading = false;
            });
        }
      });
    },
    // 根据搜索获取企业名称
    getKeyWordList(e) {
      getWechatKeyWord({ companyName: e })
        .then((res) => {
          this.loading = false;
          if (res.ret == 0) {
            this.keyWordList = res.data;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style  scoped>
</style>
