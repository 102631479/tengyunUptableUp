<template>
  <i class="iconfont" :class="[type]"></i>
  <!-- <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"/> -->
</template>

<script>
export default {
  props: {
    type: {
      type: [String],
      required: true
    }
  }
 
}
</script>

<style>

</style>
