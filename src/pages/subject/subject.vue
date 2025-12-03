<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '专题',
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
        专题
      </text>
      <view
        class="flex-1 h-64rpx bg-gray-100 dark:bg-gray-800 rounded-32rpx flex items-center px-20rpx"
        @click="goSearch"
      >
        <wd-icon name="search" size="32rpx" color="#999"></wd-icon>
        <text class="ml-10rpx text-gray-400 text-24rpx">搜索壁纸</text>
      </view>
    </view>

    <view class="px-30rpx pt-15rpx pb-100rpx">
      <view
        v-for="item in classifyList"
        :key="item._id"
        class="mb-30rpx bg-white dark:bg-gray-800 rounded-20rpx overflow-hidden shadow-sm"
        @click="goClassList(item._id, item.name)"
      >
        <view class="h-340rpx relative">
          <image
            :src="item.picurl"
            class="w-100% h-100% bg-gray-200 dark:bg-gray-700"
            mode="aspectFill"
          ></image>
          <view
            class="absolute bottom-0 left-0 w-100% h-100rpx bg-gradient-to-t from-black/60 to-transparent"
          ></view>
        </view>
        <view class="p-20rpx">
          <view
            class="text-[var(--text-primary)] font-bold text-32rpx mb-10rpx"
          >
            {{ item.name }}
          </view>
          <view
            class="flex justify-between items-center text-[var(--text-secondary)] text-24rpx"
          >
            <text>{{ formatTime(item.createTime) }}更新</text>
            <view class="flex items-center">
              <wd-icon name="image" size="28rpx" class="mr-5rpx"></wd-icon>
              <text>精选壁纸</text>
            </view>
          </view>
        </view>
      </view>
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
    const res = await getClassify({ pageSize: 20, select: true })
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

const goClassList = (id: string, name: string) => {
  uni.navigateTo({
    url: `/pages/classlist/classlist?classid=${id}&name=${name}`,
  })
}

const formatTime = (time: number) => {
  if (!time) return ''
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - time
  if (diff < 86400000 * 30) return '最近'
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

onLoad(() => {
  getData()
})

onShareAppMessage(() => ({ title: '咸虾米壁纸-专题' }))
onShareTimeline(() => ({ title: '咸虾米壁纸-专题' }))
</script>
