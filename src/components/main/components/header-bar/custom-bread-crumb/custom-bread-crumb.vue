<template>
  <transition name="fade-transform" mode="out-in">
    <div class="custom-bread-crumb" >
      <Breadcrumb :style="{ fontSize: `${fontSize}px` }">
        <!-- <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`"> -->
        <BreadcrumbItem v-for="item in list" :to="item.to" :key="item.to" >
          <common-icon style="margin-right: 4px" :type="item.icon || ''" />
          {{ showTitle(item) }}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  </transition>
</template>
<script>
import { showTitle } from "@/libs/util";
import CommonIcon from "_c/common-icon";
import "./custom-bread-crumb.less";
export default {
  data() {
    return {
      transeit: true,
    };
  },
  name: "customBreadCrumb",
  components: {
    CommonIcon,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    fontSize: {
      type: Number,
      default: 14,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    showTitle(item) {
      this.transeit = false;
      this.transeit = true;
      return showTitle(item, this);
    },
    isCustomIcon(iconName) {
      return iconName.indexOf("_") === 0;
    },
    getCustomIconName(iconName) {
      return iconName.slice(1);
    },
  },
};
</script>
<style>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  /* transform: translateX(-10px); */
  transform: translateY(-5px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(5px);
}
</style>
