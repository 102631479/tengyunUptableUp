<template>
  <div>
    <Modal v-model="userForm" title="详情" :closable="false" :mask-closable="false">
      <div class="mail-details">
        <div class="first-hear">{{ htmlDetails }}:</div>
        <span class="boxi-text"
          >尊敬的智慧文旅云用户，您好！恭喜您通过代理商认证，我们准备了项目资料，您可下载查看</span
        >
      </div>
      <div class="mail-text">
        <div class="first-hear">{{ htmlDetails }}:</div>
        <div class="boxi-text">
          <!-- <div>
            您（账号ID：45446464646，昵称：admin123）于2020-12-31 22:56:23
            <br />
            提交的代理商认证信息已通过审核，我们准备了如下项目资料 <br />
            您可下载查看
          </div>
          -->
          <div v-html="htmlData"></div>
          <div class="dolown" style="color: #657180">
            此敬<br />智慧文旅云团队
          </div>
        </div>
      </div>

      <div class="mail-details">
        <div class="first-hear">描述</div>
        <span class="boxi-text">代理商通过后发多送的消息模板</span>
      </div>
      <div slot="footer">
        <slot name="header"> </slot>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "detailsPage",
  props: {
    htmlData: {
      type: String,
      default: () => {
        return ``;
      },
    },
    htmlDetails: {
      type: String,
      default: () => {
        return "模板";
      },
    },
    userForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // htmlData: ``,
      // userForm: false,
    };
  },
  methods: {
    submit() {
      this.$Message.success("提交");
    },
    close() {
      // this.$Message.success("关闭");
      // console.log(userForm, "this.userForm = false;");
      // this.userForm = false;
    },
  },
};
</script>

<style scoped>
.mail-details {
  display: flex;
  margin-left: 20px;
  height: 100px;
  margin-top: 20px;
}
.mail-text {
  display: flex;
  margin-left: 20px;
  /* height: 100px; */
}
.boxi-text {
  display: block;
  width: 500px;
}
.first-hear {
  width: 80px;
  text-align: center;
}
.dolown {
  display: block;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #3399ff;
}
</style>
