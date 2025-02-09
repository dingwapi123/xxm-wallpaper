<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '分类',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view
    class="mt-50rpx px-0 pt-15rpx grid grid-cols-[repeat(3,1fr)] gap-15rpx ml-30rpx mr-30rpx pageBg"
  >
    <theme-item v-for="item in 8" :key="item"></theme-item>
    <theme-item :isMore="true"></theme-item>
  </view>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
//
</style>
