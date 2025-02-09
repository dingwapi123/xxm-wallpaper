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
        <view
          class="box flex items-center justify-center flex-col"
          @click="popInfo"
        >
          <wd-icon name="info-circle" size="36rpx"></wd-icon>
          <view class="text font-size-26rpx text-color-#676767">信息</view>
        </view>

        <view
          class="box flex items-center justify-center flex-col"
          @click="popScore"
        >
          <wd-icon name="star" size="36rpx"></wd-icon>
          <view class="text font-size-26rpx text-color-#676767">5分</view>
        </view>

        <view
          class="box flex items-center justify-center flex-col"
          @click="popDownload"
        >
          <wd-icon name="download1" size="36rpx"></wd-icon>
          <view class="text font-size-26rpx text-color-#676767">下载</view>
        </view>
      </view>
    </view>

    <wd-popup
      v-model="infoShow"
      custom-style="border-radius:32rpx 32rpx 0 0; padding: 25rpx;"
      @close="handleInfoClose"
      position="bottom"
      closable
    >
      <view class="flex justify-center">壁纸信息</view>

      <view class="flex justify-around items-center flex-col p-4 py-30rpx">
        <view class="space-y-4 text-center max-h-60vh">
          <view class="flex">
            <view class="text-right w-140rpx">壁纸ID：</view>
            <text class="text-left w-0" selectable>12030123123</text>
          </view>

          <view class="flex">
            <view class="text-right w-140rpx">分类：</view>
            <text class="text-left flex-1">明星</text>
          </view>

          <view class="flex">
            <view class="text-right w-140rpx">发布者：</view>
            <view class="text-left">咸虾米</view>
          </view>

          <view class="flex">
            <view class="text-right w-140rpx">评分：</view>
            <wd-icon
              name="star-filled"
              size="22px"
              v-for="item in 5"
              :key="item"
            ></wd-icon>
            <view class="text-left">5分</view>
          </view>

          <view class="flex">
            <view class="text-right w-140rpx">摘要：</view>
            <text class="text-left flex-1 line-clamp-4 overflow-hidden">
              aaaaaaaaaaaaaaaaaaaaaaaaaa生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世
            </text>
          </view>

          <view class="flex flex-wrap">
            <view class="text-right w-140rpx">标签：</view>
            <view class="text-left flex justify-center items-center">
              <wd-tag custom-class="mx-10rpx h-fit w-fit">
                <text
                  class="font-size-25rpx flex justify-center items-center p-4rpx"
                >
                  标签
                </text>
              </wd-tag>

              <wd-tag custom-class="mx-10rpx h-fit w-fit">
                <text
                  class="font-size-25rpx flex justify-center items-center p-4rpx"
                >
                  标签
                </text>
              </wd-tag>

              <wd-tag custom-class="mx-10rpx h-fit w-fit">
                <text
                  class="font-size-25rpx flex justify-center items-center p-4rpx"
                >
                  标签
                </text>
              </wd-tag>
            </view>
          </view>
        </view>
      </view>
    </wd-popup>

    <wd-popup
      v-model="scoreShow"
      custom-style="border-radius:32rpx; padding: 20rpx;width:450rpx;height:300rpx;"
      @close="handleScoreClose"
      closable
    >
      <view class="flex flex-col">
        <view class="flex justify-center">壁纸评分</view>

        <view class="flex justify-center items-center py-40rpx">
          <wd-rate v-model="score" @change="handleChange" />
          <view class="pl-15rpx">{{ score }}分</view>
        </view>

        <button class="flex justify-center w-250rpx mt-10rpx">确认评分</button>
      </view>
    </wd-popup>

    <wd-popup
      v-model="downloadShow"
      custom-style="border-radius:32rpx; padding: 20rpx;width:450rpx;height:220rpx"
      @close="handleDownloadClose"
      closable
    >
      <view class="flex flex-col">
        <view class="flex justify-center">壁纸下载</view>
        <button class="flex justify-center w-200rpx my-20rpx mt-30rpx">
          确认下载
        </button>
      </view>
    </wd-popup>
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

const infoShow = ref(false)
const popInfo = () => {
  infoShow.value = true
}

const scoreShow = ref(false)
const popScore = () => {
  scoreShow.value = true
}

const downloadShow = ref(false)
const popDownload = () => {
  downloadShow.value = true
}

const handleInfoClose = () => {
  infoShow.value = false
}
const handleScoreClose = () => {
  infoShow.value = false
}
const handleDownloadClose = () => {
  infoShow.value = false
}

const score = ref(1)

const handleChange = (value: number) => {
  console.log('评分变化:', value)
  // 可以在这里添加更多处理逻辑
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'YourFontName';
  src: url('/static/fonts/font_4245058_s5cpwl25n7o.woff2') format('woff2');
}
</style>
