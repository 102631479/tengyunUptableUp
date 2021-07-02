<template>
  <div>
    <div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div class="login-box" v-show="!spinShow">
      <div
        v-if="backLogo"
        class="login-left"
        :style="{ 'background-image': 'url(' + backLogo + ')' }"
      ></div>
      <div v-else class="boxLeft"><div class="logo"></div></div>
      <div class="login-center">
        <div class="dr">
          <span class="tit">{{ title }}</span>
          <div class="form-con">
            <div class="zhangHao">
              <label for>账号</label>
              <input
                placeholder="请输入账号"
                autocomplete="off"
                type="text"
                class="inputText"
                v-model="loginForm.userName"
              />
            </div>

            <div class="passWord">
              <label for>密码</label>
              <input
                placeholder="请输入密码"
                type="password"
                class="inputText"
                v-model="loginForm.password"
                @keyup.enter="submitBtn"
              />
            </div>
            <button class="submit" @click="submitBtn">登 录</button>
          </div>
        </div>
        <!-- <div class="beian">Copyright © 2002-2020 北京华夏票联 版权所有</div> -->
      </div>

      <Modal v-model="modal" title="身份选择" @on-ok="modalOk">
        <RadioGroup v-model="identitiesVal">
          <Radio
            v-for="item in identities"
            :key="item.value"
            :label="item.value"
            :false-value="1"
            >{{ identitiesMap.get(item.value) }}</Radio
          >
        </RadioGroup>
      </Modal>

      <verify
        ref="verify"
        @success="success"
        :mode="'pop'"
        :captchaType="'blockPuzzle'"
        :imgSize="{ width: '330px', height: '155px' }"
      />
    </div>
  </div>
</template>

<script>
const SM4 = require("gm-crypt").sm4;
import { login, identities, getUserInfo } from "@/api/user";
import Cookie from "js-cookie";
import { flattenDeep } from "lodash";
import { getLoginPage } from "@/api/user-admin";
import verify from "@/components/verifition/Verify";
import avatar from "./../../assets/images/user.png";
export default {
  components: { verify },
  data() {
    return {
      spinShow: true,
      title: "",
      backLogo: "",
      modal: false,
      // loginBox: true,
      identitiesMap: new Map([
        ["2", "个人账号"],
        ["7", "集团账号"],
      ]),
      identities: [], // 身份列表
      identitiesVal: "",
      loginForm: {
        userName: "",
        password: "",
      },
    };
  },
  mounted() {
    let url = this.$route.query.page;
    if (!url) {
      // this.loginBox = false;
      this.title = "智慧文旅云运营管理平台";
      return;
    }
    localStorage.setItem("loginUrl", url);
    getLoginPage(url).then((d) => {
      const that = this;
      let { backLogo, title } = d.data;
      that.backLogo = backLogo;
      that.title = title;
    });
  },
  created() {
    if (this.$router.history.current.query.account) {
      this.getclear();
      this.spinShow = true;
      let data = {
        userName: this.$router.history.current.query.account,
        password: this.$router.history.current.query.password,
      };
      this.gologin(data);
    } else {
      this.getclear();
      this.spinShow = false;
    }
  },
  methods: {
    getclear() {
      this.$store.commit("setToken", "");
      this.$store.commit("setAccess", []);
      this.$store.commit("setCertInfo", "");
    },
    gmcryptSm4(password) {
      let sm4Config = {
        key: "gph2i2xxfln0w9sj",
        // mode: "cbc",
        iv: "8r13qykaklic5su7",
        // cipherType: "base64",
      };
      let sm4 = new SM4(sm4Config);
      let newPassword = password.trim();
      let text = sm4.encrypt(newPassword);
      console.log(sm4.decrypt(text), "解密字符串");
      return sm4.encrypt(newPassword);
    },
    submitBtn() {
      if (!this.loginForm.userName) {
        this.$message({ type: "error", message: "请输入用户名" });
        return;
      }
      if (!this.loginForm.password) {
        this.$message({ type: "error", message: "请输入密码" });
        return;
      }
      // this.$refs.verify.show();
      this.success();
    },
    gologin(data) {
      this.loading = true;
      login(data)
        .then(async (d) => {
          this.$store.commit("setTagNavList", []);
          if (process.env.NODE_ENV === "development") {
            Cookie.set("token", d.data.token, { path: "", expires: 7 });
          } else {
            Cookie.set("token", d.data.token, {
              domain: ".zhihuiwenlvyun.com",
              path: "",
              expires: 7,
            });
          }
          this.$store.commit("setToken", d.data.token);
          await identities().then((d) => {
            this.identities = d.data.identities;
            this.$store.commit(
              "setAccess",
              flattenDeep(
                Object.keys(d.data.permissions).map(
                  (key) => d.data.permissions[key]
                )
              )
            );
            if (this.identities.length === 1) {
              this.$router.push({ path: "/" });
              return;
            }
            this.modal = true;
          });
        })
        .catch((err) => this.$Message.error(err.msg));
      /* 获取用户信息 */
      getUserInfo().then((d) => {
        this.$store.commit("setAvatar", avatar);
        this.$store.commit("setUserId", d.data.id);
        this.$store.commit("setUserName", d.data.userName);
        this.$store.commit("setUserInfo", d.data);
        // console.log(d.data.userName);
      });
      this.loading = false;
    },
    async success() {
      let data = JSON.parse(JSON.stringify(this.loginForm));
      data.password = this.gmcryptSm4(data.password);
      await this.gologin(data);
    },

    modalOk() {
      if (!this.identitiesVal) {
        this.$Message.error("请选择身份");
        return;
      }
      // this.$store.commit("setIdentities", this.identitiesVal);
      this.$router.push({ path: "/" });
      // this.$router.push({ path: "/integration" });
    },
  },
};
</script>

<style scoped lang="scss">
.login-box {
  display: flex;
  flex-direction: row;
  background: #fff;
  width: 100%;
  height: 100vh;
  // height: 100%;
  background: #aaa;
  .boxLeft {
    //  background-position: center;
    background: url("../../assets/images/bg.png") no-repeat;
    background-size: 100% 100%;
    //  float: left;
    width: 65%;
    height: 100%;
    position: relative;
    .logo {
      width: 46px;
      height: 46px;
      position: absolute;
      top: 40px;
      left: 40px;
      background: url("../../assets/images/logo.png") no-repeat;
    }
  }
  .login-left {
    width: 65%;
    background-size: 100% 100%;
    // background-repeat: repeat;
  }
  .login-center {
    height: 100%;
    width: 35%;
    position: absolute;
    right: 0;
    // float: right;
    width: 35%;
    min-width: 500px;
    height: 100%;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .dr {
      height: 95%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // margin-top: 80px;

      .tit {
        display: block;
        color: #000;
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 40px;
        width: 100%;
        padding: 0 15%;
      }
      .form-con {
        display: flex;
        width: 100%;
        padding: 0 15%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .form-con label {
        font-size: 16px;
        width: 11%;
        // color: #B5B5B5;
      }
      .inputText {
        // box-sizing: border-box;
        // box-shadow: inset 0 0 0 1000px #F5F5F5!important;
        // background: rgb(245, 245, 245);
        background-color: #fff;
        padding: 14px 20px;
        width: 89%;
        border-radius: 4px;
        border: 1px solid #eeeeee;
        outline: none;
        // color: #232323;
        // padding: 15px 25px;
        // font-size: 0.3rem;
        &:focus {
          box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
        }
      }
      .inputText::placeholder {
        color: #b5b5b5;
        font-size: 12px;
        // font-size: 0.3rem;
      }
      .submit {
        width: 100%;
        height: 56px;
        background-color: #65aa73;
        // background-color: #000;
        border-radius: 50px;
        border: none;
        outline: none;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        padding: 10px;
        margin-top: 70px;
      }
    }
    .beian {
      height: 5%;
      width: 100%;
      color: #aaa;
      font-size: 0.2rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.zhangHao {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 35px;
}
.passWord {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>