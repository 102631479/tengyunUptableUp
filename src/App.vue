<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  // provide() {
  //   //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
  //   return {
  //     reload: this.reload,
  //   };
  // },
  // methods: {
  //   //重置表单
  //   reload() {
  //     this.isRouterAlive = false; //先关闭，
  //     this.$nextTick(function () {
  //       this.isRouterAlive = true; //再打开
  //     });
  //   },
  // },
};
</script>

<style lang="scss">
.title {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.ivu-layout-sider,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover,
.ivu-menu-dark {
  background-color: #1e222d !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background-color: #262f3e !important;
}
// .main .header-con {
//   background-color: #262f3e !important;
// }
// .main .logo-con {
//   background-color: #262f3e;
//   height: 60px !important;
//   font-style: italic;
//   font-weight: bold;
// }
.main .left-sider .ivu-layout-sider-children {
  margin-right: -19px !important;
}
//子菜单组
body .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
  background-color: #1e222d !important;
}

// iView组件自带颜色 适配 首页颜色 移上去样式
body .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
body
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active:hover {
  border-right: none;
  background: #2b3647 !important;
}
// 选中
body .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active {
  background-color: #262f3e !important;
}
// 导航栏菜单 无子项菜单样式
body
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  background-color: #2b3647 !important;
  color: #fff;
}

/* ==================
          布局
 ==================== */

/*  -- flex弹性布局 -- */

.flex {
  display: flex;
}

.basis-xs {
  flex-basis: 20%;
}

.basis-sm {
  flex-basis: 40%;
}

.basis-df {
  flex-basis: 50%;
}

.basis-lg {
  flex-basis: 60%;
}

.basis-xl {
  flex-basis: 80%;
}

.flex-sub {
  flex: 1;
}

.flex-twice {
  flex: 2;
}

.flex-treble {
  flex: 3;
}

.flex-direction {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.align-center {
  align-items: center;
}

.align-stretch {
  align-items: stretch;
}

.self-start {
  align-self: flex-start;
}

.self-center {
  align-self: flex-center;
}

.self-end {
  align-self: flex-end;
}

.self-stretch {
  align-self: stretch;
}

.align-stretch {
  align-items: stretch;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

//  ************************************************
// 工具类
//  ************************************************
@for $i from 1 through 40 {
  //  ************************************************
  // 外边距
  .mt-#{$i * 2} {
    margin-top: (2px * $i);
  }
  .mr-#{$i * 2} {
    margin-right: (2px * $i);
  }
  .mb-#{$i * 2} {
    margin-bottom: (2px * $i);
  }
  .ml-#{$i * 2} {
    margin-left: (2px * $i);
  }
  .m-#{$i * 2} {
    margin: (2px * $i);
  }
  //  ************************************************

  //  ************************************************
  //  内边距
  .pt-#{$i * 2} {
    padding-top: (2px * $i);
  }
  .pr-#{$i * 2} {
    padding-right: (2px * $i);
  }
  .pb-#{$i * 2} {
    padding-bottom: (2px * $i);
  }
  .pl-#{$i * 2} {
    padding-left: (2px * $i);
  }
  .p-#{$i * 2} {
    padding: (2px * $i);
  }
  //  ************************************************

  //  ************************************************
  // 字体大小
  .f-size-#{$i * 2} {
    font-size: (2px * $i);
  }
  //  ************************************************
}

.ma {
  margin: auto;
}
.t-center {
  text-align: center;
}
.cup {
  cursor: pointer;
}
</style>
