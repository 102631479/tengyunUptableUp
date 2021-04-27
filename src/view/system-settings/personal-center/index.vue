<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: huangfu
 * @LastEditTime: 2020-10-12 09:21:24
-->
<template>
  <!-- <div>个人中心</div> -->
  <div class="top">
    <img class="top-img" src="../../../assets/images/user.png" alt="头像">
    <div class="top-flex">
      <p class="top-p">用户名：{{ userInfo.userName }}</p>
      <p class="title-contact">账号ID：{{ userInfo.id }}</p>
      <p class="title-contact">手机号：{{ userInfo.phone }}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      userInfo:{
        userName:'huangfu',
        id:964856,
        phone:"13223906557"
      }
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.top{
  // margin: 0 auto;
  text-align: center;
  .top-flex{
    margin: 0 auto;
    width: 200px;
    text-align: left;
  }
  .top-img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
