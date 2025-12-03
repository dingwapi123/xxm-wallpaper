<template>
  <view class="h-340rpx">
    <navigator
      v-if="!isMore && item"
      :url="
        '/pages/classlist/classlist?classid=' +
        item._id +
        '&name=' +
        item.classname
      "
      class="h-100% rounded-10rpx overflow-hidden relative"
    >
      <image
        class="w-100% h-100% bg-gray-200 dark:bg-gray-700"
        :src="item.picurl"
        mode="aspectFill"
      />
      <view
        class="absolute left-0 bottom-0 bg-black/20 text-white w-100% flex items-center justify-center h-70rpx backdrop-blur-md font-bold"
      >
        {{ item.classname }}
      </view>
      <view
        class="absolute left-0 top-0 bg-[#fa815a]/70 text-white rounded-br-20rpx px-15rpx py-5rpx font-size-22rpx"
      >
        {{ formatTime(item.createTime) }}
      </view>
    </navigator>

    <navigator
      v-if="isMore"
      url="/pages/classify/classify"
      open-type="switchTab"
      class="h-100% rounded-10rpx overflow-hidden relative"
    >
      <image
        class="w-100% h-100% bg-gray-200 dark:bg-gray-700"
        src="@/common/images/more.jpg"
        mode="aspectFill"
      />
      <view
        class="absolute left-0 bottom-0 bg-black/20 text-white w-100% flex items-center justify-center h-100% backdrop-blur-md font-bold"
      >
        更多
        <wd-icon name="more" size="22px"></wd-icon>
      </view>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import type { ClassifyItem } from '@/service/wallpaper'

defineProps<{
  isMore?: boolean
  item?: ClassifyItem
}>()

const formatTime = (time: number) => {
  if (!time) return ''
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - time
  if (diff < 86400000 * 30) return '最近更新'
  return `${date.getMonth() + 1}月${date.getDate()}日`
}
</script>
