<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: huangfu
 * @Date: 2020-09-14 16:21:22
 * @LastEditors: huangfu
 * @LastEditTime: 2020-12-11 16:45:26
-->
<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <img style="width:30px;height:30px;" :src="userAvatar" alt="" onerror="javascript:this.src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1971739078,3801199234&fm=26&gp=0.jpg';">
        <!-- <Avatar :src="userAvatar"/> -->
        <span style="display:inline-block;margin: 0 5px 0px 5px;color: #fff;fontSize:14px;lineHeight:60px;color:#000;">{{ this.$store.state.user.userName }}</span>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import Cookies from "js-cookie";
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        if (process.env.NODE_ENV === "development") {
          Cookies.set("token", '', { path: "", expires: 1 });
        }else{
          Cookies.set("token", '', { domain: ".zhihuiwenlvyun.com", path: "", expires: 1 });
        }
        this.$router.push('/login')
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.ivu-dropdown {
  display: flex;
  height: 100%;
}
/deep/.ivu-dropdown-rel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // margin-top: 16px;
}

/deep/ .ivu-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
img {
  border-radius: 15px;
}
</style>
