<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '预览',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="w-100% h-100vh relative">
    <swiper class="w-100% h-100%" circular>
      <swiper-item v-for="item in 3" :key="item">
        <image
          src="../../common/images/preview_small.webp"
          mode="aspectFill"
          class="w-100% h-100%"
          @click="maskChange"
        ></image>
      </swiper-item>
    </swiper>

    <view class="mask" v-if="!maskState">
      <view class="goBack"></view>
      <view
        class="count absolute top-10vh bg-[rgba(160,100,100,0.3)] font-size-28rpx rounded-40rpx left-0 right-0 m-auto w-fit px-30rpx py-10rpx text-white backdrop-blur-10rpx"
      >
        3 / 9
      </view>
      <view
        class="time absolute top-[calc(10vh+80rpx)] font-size-150rpx font-600 text-white left-0 right-0 m-auto w-fit px-10rpx text-shadow-sm"
      >
        {{ currentTime }}
      </view>
      <view
        class="date absolute top-[calc(10vh+290rpx)] font-size-50rpx font-600 text-white left-0 right-0 m-auto w-fit px-10rpx text-shadow-sm"
      >
        {{ currentMonth }}月{{ currentDay }}日
      </view>
      <view
        class="footer absolute bottom-10vh left-0 right-0 m-auto px-10rpx bg-[rgba(255,255,255,0.8)] w-65vw h-120rpx rounded-120rpx flex justify-around items-center px-10rpx text-shadow-sm backdrop-blur-20rpx"
      >
        <view class="box flex items-center justify-center flex-col">
          <wd-icon name="info-circle" size="36rpx"></wd-icon>
          <view class="text font-size-26rpx text-color-#676767">信息</view>
        </view>

        <view class="box flex items-center justify-center flex-col">
          <wd-icon name="star" size="36rpx"></wd-icon>
          <view class="text font-size-26rpx text-color-#676767">5分</view>
        </view>

        <view class="box flex items-center justify-center flex-col">
          <wd-icon name="download1" size="36rpx"></wd-icon>
          <view class="text font-size-26rpx text-color-#676767">下载</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const maskState = ref(false)
const maskChange = () => {
  maskState.value = !maskState.value
}

const currentTime = computed(() => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
})

const currentMonth = computed(() => {
  return String(new Date().getMonth() + 1).padStart(2, '0')
})

const currentDay = computed(() => {
  return String(new Date().getDate()).padStart(2, '0')
})
</script>

<style lang="scss" scoped>
//
</style>
