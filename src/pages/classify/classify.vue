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
  <view class="pageBg min-h-screen">
    <custom-navbar title="分类" @search="goSearch" />

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
import CustomNavbar from '@/components/custom-navbar/custom-navbar.vue'

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
