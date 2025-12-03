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
  <view class="pageBg min-h-screen pt-safe">
    <view class="h-88rpx flex items-center px-30rpx">
      <text
        class="font-size-36rpx font-bold text-[var(--text-primary)] mr-20rpx"
      >
        分类
      </text>
      <view
        class="flex-1 h-64rpx bg-gray-100 dark:bg-gray-800 rounded-32rpx flex items-center px-20rpx"
        @click="goSearch"
      >
        <wd-icon name="search" size="32rpx" color="#999"></wd-icon>
        <text class="ml-10rpx text-gray-400 text-24rpx">搜索壁纸</text>
      </view>
    </view>

    <view class="px-30rpx pt-15rpx grid grid-cols-3 gap-15rpx pb-100rpx">
      <theme-item
        v-for="item in classifyList"
        :key="item._id"
        :item="item"
      ></theme-item>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getClassify } from '@/service/wallpaper'
import type { ClassifyItem } from '@/service/wallpaper'

const classifyList = ref<ClassifyItem[]>([])

const getData = async () => {
  try {
    const res = await getClassify({ pageSize: 20 })
    classifyList.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const goSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search',
  })
}

onLoad(() => {
  getData()
})

onShareAppMessage(() => ({ title: '咸虾米壁纸-分类' }))
onShareTimeline(() => ({ title: '咸虾米壁纸-分类' }))
</script>
