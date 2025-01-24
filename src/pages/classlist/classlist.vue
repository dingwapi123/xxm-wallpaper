<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '分类列表',
  },
}
</route>
<template>
  <view class="px-5rpx pt-5rpx pageBg">
    <view class="grid grid-cols-[repeat(3,1fr)] gap-5rpx">
      <navigator url="" v-for="item in 15" :key="item" class="h-440rpx">
        <image src="../../static/images/xxmLogo.png" mode="aspectFill" class="w-100% h-100%" />
      </navigator>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
