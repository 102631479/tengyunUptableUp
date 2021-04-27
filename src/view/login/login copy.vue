<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :loading="loading"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    async handleSubmit ({ userName, password }) {
      this.loading = true
      await this.handleLogin({ userName, password }).then(res => {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
            })
          })
      }).catch(err => this.$Message.error(err.msg))
      this.loading = false
    }
  }
}
</script>

