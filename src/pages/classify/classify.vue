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
    <view class="h-88rpx flex items-center justify-center">
      <text class="font-size-36rpx font-bold text-[var(--text-primary)]">
        分类
      </text>
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

onLoad(() => {
  getData()
})

onShareAppMessage(() => ({ title: '咸虾米壁纸-分类' }))
onShareTimeline(() => ({ title: '咸虾米壁纸-分类' }))
</script>
