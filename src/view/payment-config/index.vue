<template>
  <div class="setting">
    <figure>
      <figcaption>
        <div>
          <p>平台手续费设置</p>
          <div class="dataTime">
            <input type="text" placeholder="设置手续费百分比" />
            <span>%</span>
            <div>
              <button @click="edit" v-if="charges">修改</button>
              <button @click="edit" v-if="!charges">保存</button>
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
    <figure class="origin">
      <figcaption>
        <div>
          <p>平台佣金设置</p>
          <div  class="origin-money" v-for="index in cust" :key="index">
            <input type="text" placeholder="输入起点金额" v-model="cust" />
            <input type="text" placeholder="输入起点金额" />
            <input type="text" placeholder="输入起点金额" />
            <span>%</span>
              <Button @click="delte(index)" >删除</Button>
          </div>
          <Button class="addSystem" @click="addCust" type="primary">新增分佣体系</Button>
        </div>
      </figcaption>
    </figure>
    <div class="trade">
      <figure>
        <figcaption>
          <div>
            <p>代理商交易累计设置</p>
            <div class="dataTime">
              <span>一级业绩计入</span>
              <input type="text" placeholder="输入累计金额百分比" />
              <span>天</span>
              <div>
                <button @click="oneAlter" v-if="oneDeal">修改</button>
                <button @click="oneAlter" v-if="!oneDeal">保存</button>
              </div>
            </div>
          </div>
        </figcaption>
      </figure>
      <figure class="enterprise">
        <figcaption>
          <div>
            <div class="dataTime">
              <span>二级业绩计入</span>
              <input type="text" placeholder="输入累计金额百分比" />
              <span>天</span>
              <div>
                <button @click="twoAlter" v-if="twoDeal">修改</button>
                <button @click="twoAlter" v-if="!twoDeal">保存</button>
              </div>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
    <figure>
      <figcaption>
        <div>
          <p>提现日期设置</p>
          <div class="dataTime">
            <input type="text" placeholder="请输入提现日期" />
            <div>
              <button @click="moneyData" v-if="dataEdit">修改</button>
              <button @click="moneyData" v-if="!dataEdit">保存</button>
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
    <figure>
      <figcaption>
        <div>
          <p>入账周期设置</p>
          <div class="dataTime">
            <input type="text" placeholder="请输入入账周期" />
            <div>
              <button @click="entry" v-if="editshow">修改</button>
              <button @click="entry" v-if="!editshow">保存</button>
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
    <figure class="money">
      <figcaption>
        <div>
          <p>自动打款设置</p>
          <div class="dataTime">
            <Radio-group v-model="single" @on-change="getStatus(single)">
              <Radio label="true">启用</Radio>
              <Radio label="false">禁用</Radio>
            </Radio-group>
            <input type="text" placeholder="设置自动打款金额" />
            <div>
              <button @click="remit" v-if="money">修改</button>
              <button @click="remit" v-if="!money">保存</button>
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
    <p class="type">支付渠道配置</p>
    <figure class="payment">
      <figcaption>
        <div class="title">
          <span>支付宝</span>
          <i-switch  class="switch"></i-switch>
        </div>
        <div class="data">
          <div>
            <label for="payType">payType</label>
            <input type="text" placeholder="请输入payType" />
          </div>
          <div>
            <label for="mchTd">mchTd</label>
            <input type="text" placeholder="请输入mchTd" />
          </div>
          <div>
            <label for="reqKey">reqKey</label>
            <input type="text" placeholder="请输入reqKey" />
          </div>
          <div>
            <label for="reqKey">reqKey</label>
            <input type="text" placeholder="请输入reqKey" />
          </div>
          <div>
            <label for="notifyUrl">notifyUrl</label>
            <input type="text" placeholder="请输入notifyUrl" />
          </div>
          <div>
            <label for="payUrl">payUrl</label>
            <input type="text" placeholder="请输入payUrl" />
          </div>
          <div>
            <label for="expireTime">expireTime</label>
            <input type="text" placeholder="请输入expireTime" />
          </div>
        </div>
        <div>
          <button @click="alipay" v-if="paypal">修改</button>
          <button @click="alipay" v-if="!paypal">保存</button>
        </div>
      </figcaption>
    </figure>
    <figure class="payment">
      <figcaption>
        <div class="title">
          <span>微信</span>
          <i-switch  class="switch"></i-switch>
        </div>
        <div class="data">
          <div>
            <label for="payType">payType</label>
            <input type="text" placeholder="请输入payType" />
          </div>
          <div>
            <label for="mchTd">mchTd</label>
            <input type="text" placeholder="请输入mchTd" />
          </div>
          <div>
            <label for="reqKey">reqKey</label>
            <input type="text" placeholder="请输入reqKey" />
          </div>
          <div>
            <label for="reqKey">reqKey</label>
            <input type="text" placeholder="请输入reqKey" />
          </div>
          <div>
            <label for="notifyUrl">notifyUrl</label>
            <input type="text" placeholder="请输入notifyUrl" />
          </div>
          <div>
            <label for="payUrl">payUrl</label>
            <input type="text" placeholder="请输入payUrl" />
          </div>
          <div>
            <label for="expireTime">expireTime</label>
            <input type="text" placeholder="请输入expireTime" />
          </div>
        </div>
        <div>
          <button @click="wechat" v-if="lishibuluo">修改</button>
          <button @click="wechat" v-if="!lishibuluo">保存</button>
        </div>
      </figcaption>
    </figure>
    <figure class="payment">
      <figcaption>
        <div class="title">
          <span>银联</span>
          <i-switch  class="switch"></i-switch>
        </div>
        <div class="data">
          <div>
            <label for="payType">payType</label>
            <input type="text" placeholder="请输入payType" />
          </div>
          <div>
            <label for="mchTd">mchTd</label>
            <input type="text" placeholder="请输入mchTd" />
          </div>
          <div>
            <label for="reqKey">reqKey</label>
            <input type="text" placeholder="请输入reqKey" />
          </div>
          <div>
            <label for="reqKey">reqKey</label>
            <input type="text" placeholder="请输入reqKey" />
          </div>
          <div>
            <label for="notifyUrl">notifyUrl</label>
            <input type="text" placeholder="请输入notifyUrl" />
          </div>
          <div>
            <label for="payUrl">payUrl</label>
            <input type="text" placeholder="请输入payUrl" />
          </div>
          <div>
            <label for="expireTime">expireTime</label>
            <input type="text" placeholder="请输入expireTime" />
          </div>
        </div>
        <div>
          <button @click="ChinaPay" v-if="unionPay">修改</button>
          <button @click="ChinaPay" v-if="!unionPay">保存</button>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cust:[1],
      charges: true,
      single: true,
      oneDeal: true,
      twoDeal: true,
      dataEdit: true,
      editshow: true,
      money: true,
      paypal: true,
      lishibuluo: true,
      unionPay: true,
      //开关
      switchShowes: true,
      switchShow: true
    };
  },
  created() {},
  methods: {
    //新增体系
    addCust(){
      this.cust.push(1)
    },
    edit() {
      this.charges = !this.charges;
    },
    delte(index) {
       this.cust.splice(index,1)
    },
    oneAlter() {
      this.oneDeal = !this.oneDeal;
    },
    twoAlter() {
      this.twoDeal = !this.twoDeal;
    },
    moneyData() {
      this.dataEdit = !this.dataEdit;
    },
    entry() {
      this.editshow = !this.editshow;
    },
    remit() {
      this.money = !this.money;
    },
    alipay() {
      this.paypal = !this.paypal;
    },
    wechat() {
      this.lishibuluo = !this.lishibuluo;
    },
    ChinaPay() {
      this.unionPay = !this.unionPay;
    }
  }
};
</script>
<style lang="scss">
p {
  padding: 10px 0;
  font-size: 16px;
}
.setting {
  width: 100%;
}
figure {
  width: 22%;
  display: flex;
  justify-content: space-around;
}
.dataTime {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.data {
  width: 75%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.data div {
  width: 25%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
input {
  height: 40px;
}
button {
  margin-left: 25px;
  padding: 6px 18px;
}
.button {
  margin-left: -20px;
}
.money {
  margin-left: 35px;
}
.payment {
  width: 100%;
  margin-left: 15px;
  padding: 10px;
}
.title {
  width: 8%;
  display: flex;
  align-items: center;
  font-size: 16px;
}
figcaption {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.type {
  margin-left: 55px;
}
.ivu-switch-checked {
  border-color: rgb(18, 218, 18);
  background-color: rgb(18, 218, 18);
}
.enterprise {
  margin-top: 20px;
}
.addSystem {
  margin-top: 20px;
}
.trade{
   margin-left: 45px;
}
.origin{
  margin-left: 145px;
}
.origin-money{
  margin-top: 20px;
  display: flex;
  align-items: center;
}
</style>
