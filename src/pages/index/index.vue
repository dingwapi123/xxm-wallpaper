<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <view>
    <view class="banner w-750rpx py-20rpx">
      <swiper
        circular
        indicator-dots
        indicator-color="rgba(255, 255, 255, 0.5)"
        indicator-active-color="rgba(255, 255, 255, 1)"
        autoplay
        class="w-750rpx h-340rpx"
      >
        <swiper-item v-for="item in 3" :key="item" class="w-100% h-100% px-20rpx">
          <image src="@/common/images/banner1.jpg" class="w-100% h-100%" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>

    <view class="w-690rpx h-80rpx bg-gray-200 rounded-20rpx mx-auto flex line-height-80rpx">
      <view class="w-140rpx flex items-center justify-center">
        <wd-icon name="sound" size="40rpx" color="#28B389"></wd-icon>
        <text class="color-#28B389 font-size-28rpx font-semibold">公告</text>
      </view>

      <view class="flex-1 flex items-center justify-center">
        <swiper circular autoplay vertical interval="1000" duration="300" class="h-100%">
          <swiper-item class="h-100% font-size-30rpx text-truncate" v-for="item in 3" :key="item">
            <text class="w-100% text-truncate">年时都阿什顿hi吉安市打款哈卡斯就会打开</text>
          </swiper-item>
        </swiper>
      </view>

      <view class="w-70rpx flex items-center justify-center">
        <wd-icon name="arrow-right" size="30rpx" color="#28B389"></wd-icon>
      </view>
    </view>

    <view class="pt-50rpx">
      <common-title>
        <template #name>每日推荐</template>
        <template #custom>
          <view class="flex items-center justify-center">
            <wd-icon name="calendar" size="50rpx" color="#28B389"></wd-icon>
            <text class="color-#28B389 font-size-28rpx font-semibold ml-5rpx">
              {{ currentDay }}日
            </text>
          </view>
        </template>
      </common-title>
      <view class="w-720rpx ml-30rpx mt-30rpx">
        <scroll-view scroll-x class="whitespace-nowrap">
          <view
            class="w-200rpx h-430rpx inline-block mr-15rpx last:mr-[30rpx]"
            v-for="item in 8"
            :key="item"
          >
            <image
              src="@/common/images/preview_small.webp"
              class="w-100% h-100% rounded-10rpx"
              mode="aspectFill"
            />
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="pt-50rpx">
      <common-title>
        <template #name>专题精选</template>
        <template #custom>
          <navigator url="#" class="font-size-32rpx color-#28B389">More+</navigator>
        </template>
      </common-title>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
const currentDay = computed(() => {
  return new Date().getDate()
})
</script>

<style lang="scss" scoped></style>
