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
  <view class="pageBg min-h-screen">
    <custom-navbar title="专题" @search="goSearch" />

    <view class="px-30rpx pt-15rpx pb-100rpx">
      <view
        v-for="item in subjectList"
        :key="item._id"
        class="mb-30rpx bg-white dark:bg-gray-800 rounded-20rpx overflow-hidden shadow-sm"
        @click="goClassList(item._id, item.theme)"
      >
        <view class="h-340rpx relative grid grid-cols-3 gap-1">
          <!-- Display first 3 images of the subject -->
          <image
            v-for="pic in item.picList.slice(0, 3)"
            :key="pic._id"
            :src="pic.smallPicurl"
            class="w-100% h-100% bg-gray-200 dark:bg-gray-700 object-cover"
            mode="aspectFill"
          ></image>

          <!-- Mask overlay for text readability if needed, or just styling -->
          <view
            class="absolute bottom-0 left-0 w-100% h-100rpx bg-gradient-to-t from-black/60 to-transparent col-span-3"
          ></view>
        </view>
        <view class="p-20rpx">
          <view
            class="text-[var(--text-primary)] font-bold text-32rpx mb-10rpx"
          >
            {{ item.theme }}
          </view>
          <view
            class="flex justify-between items-center text-[var(--text-secondary)] text-24rpx"
          >
            <text>更新于 {{ item.day }}</text>
            <view class="flex items-center">
              <wd-icon name="image" size="28rpx" class="mr-5rpx"></wd-icon>
              <text>{{ item.size }}张</text>
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
import { getSubjectList } from '@/service/wallpaper'
import type { SubjectItem } from '@/service/wallpaper'
import CustomNavbar from '@/components/custom-navbar/custom-navbar.vue'

const subjectList = ref<SubjectItem[]>([])

const getData = async () => {
  try {
    const res = await getSubjectList({ pageSize: 20 })
    subjectList.value = res.data
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
    url: `/pages/classlist/classlist?classid=${id}&name=${name}&type=subject`,
  })
}

onLoad(() => {
  getData()
})

onShareAppMessage(() => ({ title: '咸虾米壁纸-专题' }))
onShareTimeline(() => ({ title: '咸虾米壁纸-专题' }))
</script>
