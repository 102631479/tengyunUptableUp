<template>
  <div class="main">
    <Card>
    <p class="type">合同发票配置</p>
    <figure class="payment">
      <figcaption>
        <div class="title">
          <span>电子合同配置</span>
          <i-switch @click="change" :value="open" class="switch" ></i-switch>
        </div>
        <div class="data">
          <div>
            <label for="APPID">APPID</label>
            <input type="text" placeholder="请输入APPID" />
          </div>
          <div>
            <label for="APPKEY">APPKEY</label>
            <input type="text" placeholder="请输入APPKEY" />
          </div>
          <div>
            <button @click="alipay" v-if="paypal">修改</button>
            <button @click="alipay" v-if="!paypal">保存</button>
          </div>
        </div>
      </figcaption>
    </figure>
    <figure class="payment">
      <figcaption>
        <div class="title">
          <span>电子发票配置</span>
         <i-switch @click="change" :value="open" class="switch" ></i-switch>
        </div>
        <div class="data">
          <div>
            <label for="APPID">APPID</label>
            <input type="text" placeholder="请输入APPID" />
          </div>
          <div>
            <label for="APPKEY">APPKEY</label>
            <input type="text" placeholder="请输入APPKEY" />
          </div>
          <div>
            <button @click="wechat" v-if="lishibuluo">修改</button>
            <button @click="wechat" v-if="!lishibuluo">保存</button>
          </div>
        </div>
      </figcaption>
    </figure>
    </Card>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
       paypal: true,
      lishibuluo: true
    }
  },
  created () {

  },
  methods: {
     alipay() {
      this.paypal = !this.paypal;
    },
    wechat() {
      this.lishibuluo = !this.lishibuluo;
    }
  }
}
</script>

<style scoped>
.data {
  width: 100%;
  display: flex;
  align-items: center;
}
.data  div{
  padding:10px 0;
}
.data  div label{
  font-size: 14px;
  padding: 0 15px;
}
.payment {
  width: 100%;
  margin-left: 45px;
  line-height: 2;
}
.title {
  width: 10%;
  font-size: 16px;
  display: flex;
  align-items: center;
}
figcaption {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.type {
  font-size: 16px;
  margin-left: 45px;
  padding: 10px 0;
}
input {
 width: 200px;
  height: 40px;
}
button {
  margin-left: 25px;
  padding: 6px 18px;
}
.ivu-switch-checked {
    border-color: rgb(18, 218, 18);
    background-color:rgb(18, 218, 18);
}
</style>
