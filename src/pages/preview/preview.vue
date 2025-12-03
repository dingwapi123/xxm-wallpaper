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
  <view class="w-100% h-100vh relative bg-black">
    <swiper
      class="w-100% h-100%"
      circular
      :current="currentIndex"
      @change="swiperChange"
    >
      <swiper-item v-for="(item, index) in wallList" :key="item._id">
        <image
          v-if="Math.abs(index - currentIndex) <= 2"
          :src="item.picurl || item.smallPicurl.replace('_small.webp', '.jpg')"
          mode="aspectFill"
          class="w-100% h-100%"
          @click="maskChange"
        ></image>
      </swiper-item>
    </swiper>

    <view class="mask" v-if="!maskState">
      <view
        class="goBack absolute top-100rpx left-30rpx bg-black/30 p-10rpx rounded-full backdrop-blur-sm z-10 flex items-center justify-center w-60rpx h-60rpx"
        @click="goBack"
      >
        <wd-icon name="arrow-left" color="#fff" size="20px"></wd-icon>
      </view>

      <view
        class="count absolute top-12vh bg-[rgba(0,0,0,0.3)] font-size-28rpx rounded-40rpx left-0 right-0 m-auto w-fit px-30rpx py-10rpx text-white backdrop-blur-10rpx"
      >
        {{ currentIndex + 1 }} / {{ wallList.length }}
      </view>
      <view
        class="time absolute top-[calc(12vh+80rpx)] font-size-150rpx font-600 text-white left-0 right-0 m-auto w-fit px-10rpx text-shadow-sm"
      >
        {{ currentTime }}
      </view>
      <view
        class="date absolute top-[calc(12vh+290rpx)] font-size-50rpx font-600 text-white left-0 right-0 m-auto w-fit px-10rpx text-shadow-sm"
      >
        {{ currentMonth }}月{{ currentDay }}日
      </view>
      <view
        class="footer absolute bottom-10vh left-0 right-0 m-auto px-10rpx bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(30,30,30,0.8)] w-65vw h-120rpx rounded-120rpx flex justify-around items-center px-10rpx text-shadow-sm backdrop-blur-20rpx"
      >
        <view
          class="box flex items-center justify-center flex-col"
          @click="popInfo"
        >
          <wd-icon
            name="info-circle"
            size="36rpx"
            custom-class="text-gray-600 dark:text-gray-300"
          ></wd-icon>
          <view class="text font-size-26rpx text-gray-600 dark:text-gray-300">
            信息
          </view>
        </view>

        <view
          class="box flex items-center justify-center flex-col"
          @click="popScore"
        >
          <wd-icon
            name="star"
            size="36rpx"
            custom-class="text-gray-600 dark:text-gray-300"
          ></wd-icon>
          <view class="text font-size-26rpx text-gray-600 dark:text-gray-300">
            {{ currentItem?.score || '0' }}分
          </view>
        </view>

        <view
          class="box flex items-center justify-center flex-col"
          @click="popDownload"
        >
          <wd-icon
            name="download"
            size="36rpx"
            custom-class="text-gray-600 dark:text-gray-300"
          ></wd-icon>
          <view class="text font-size-26rpx text-gray-600 dark:text-gray-300">
            下载
          </view>
        </view>
      </view>
    </view>

    <!-- Info Popup -->
    <wd-popup
      v-model="infoShow"
      custom-style="border-radius:32rpx 32rpx 0 0; padding: 25rpx;"
      position="bottom"
      closable
    >
      <view
        class="flex justify-center text-lg font-bold mb-4 text-[var(--text-primary)]"
      >
        壁纸信息
      </view>
      <view class="space-y-4 text-[var(--text-primary)]">
        <view class="flex">
          <view class="text-right w-160rpx text-[var(--text-secondary)]">
            壁纸ID：
          </view>
          <text class="text-left flex-1">{{ currentItem?._id }}</text>
        </view>
        <view class="flex">
          <view class="text-right w-160rpx text-[var(--text-secondary)]">
            昵称：
          </view>
          <text class="text-left flex-1">{{ currentItem?.nickname }}</text>
        </view>
        <view class="flex">
          <view class="text-right w-160rpx text-[var(--text-secondary)]">
            描述：
          </view>
          <text class="text-left flex-1">
            {{ currentItem?.description || '暂无描述' }}
          </text>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { WallPaperItem } from '@/service/wallpaper'

const wallList = ref<WallPaperItem[]>([])
const currentIndex = ref(0)
const maskState = ref(false)
const infoShow = ref(false)

const currentItem = computed(() => wallList.value[currentIndex.value])

const currentTime = ref('')
const currentMonth = ref(0)
const currentDay = ref(0)

const updateTime = () => {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${h}:${m}`
  currentMonth.value = now.getMonth() + 1
  currentDay.value = now.getDate()
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})

onLoad((options) => {
  const list = uni.getStorageSync('storgClassList') as WallPaperItem[]
  if (list) {
    wallList.value = list.map((item) => ({
      ...item,
      picurl: item.picurl || item.smallPicurl.replace('_small.webp', '.jpg'),
    }))
  }
  if (options.id) {
    const index = wallList.value.findIndex((item) => item._id === options.id)
    if (index !== -1) currentIndex.value = index
  }
})

const swiperChange = (e: any) => {
  currentIndex.value = e.detail.current
}

const maskChange = () => {
  maskState.value = !maskState.value
}

const goBack = () => {
  uni.navigateBack()
}

const popInfo = () => {
  infoShow.value = true
}

const popScore = () => {
  uni.showToast({ title: '评分功能开发中', icon: 'none' })
}

const popDownload = () => {
  const url = currentItem.value.picurl
  uni.showLoading({ title: '下载中...' })
  uni.downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({ title: '保存成功', icon: 'success' })
          },
          fail: () => {
            uni.showToast({
              title: '保存失败，请检查权限',
              icon: 'none',
            })
          },
        })
      }
    },
    fail: () => {
      uni.showToast({ title: '下载失败', icon: 'none' })
    },
    complete: () => uni.hideLoading(),
  })
}
</script>

<style lang="scss" scoped>
/* Additional styles if needed */
</style>
