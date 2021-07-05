<template>
  <div>
    <Modal v-model="userForm" title="详情">
      <div class="mail-details">
        <div class="first-hear">邮件详情:</div>
        <span class="boxi-text"
          >尊敬的智慧文旅云用户，您好！恭喜您通过代理商认证，我们准备了项目资料，您可下载查看</span
        >
      </div>

      <div class="mail-text">
        <div class="first-hear">邮件详情:</div>
        <div class="boxi-text">
          <div v-html="htmlData"></div>
          <!-- <div>
            您（账号ID：45446464646，昵称：admin123）于2020-12-31 22:56:23
            <br />
            提交的代理商认证信息已通过审核，我们准备了如下项目资料 <br />
            您可下载查看
          </div>

          <a href="/user/test/xxxx.txt" class="dolown" download="1.txt"
            >文件名xx.PDF</a
          >
          <a href="/user/test/xxxx.txt" class="dolown" download="2.txt"
            >文件名xx.PDF</a
          >
          <a href="/user/test/xxxx.txt" class="dolown" download="3.txt"
            >文件名xx.PDF</a
          >
          <a href="/user/test/xxxx.txt" class="dolown" download="4.txt"
            >文件名xx.PDF</a
          >
          <a href="/user/test/xxxx.txt" class="dolown" download="5.txt"
            >文件名xx.PDF</a
          >
          <a href="/user/test/xxxx.txt" class="dolown" download="6.txt"
            >文件名xx.PDF</a
          >
          <a href="/user/test/xxxx.txt" class="dolown" download="7.txt"
            >文件名xx.PDF</a
          > -->
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
        <Button type="primary" @click="close">关闭窗口</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlData: ``,
      userForm: false,
    };
  },
  methods: {
    submit() {
      this.$Message.success("提交");
    },
    close() {
      this.$Message.success("关闭");
      this.userForm = false;
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
