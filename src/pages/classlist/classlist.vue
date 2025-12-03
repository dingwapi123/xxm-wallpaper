<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '分类列表',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="pageBg min-h-screen">
    <custom-nav-back :title="pageTitle"></custom-nav-back>
    <view class="px-5rpx pt-5rpx">
      <view class="grid grid-cols-3 gap-5rpx pb-100rpx">
        <view
          v-for="item in wallList"
          :key="item._id"
          class="h-440rpx"
          @click="goPreview(item._id)"
        >
          <image
            :src="item.smallPicurl"
            mode="aspectFill"
            class="w-100% h-100% bg-gray-200 dark:bg-gray-700"
          />
        </view>
      </view>

      <!-- Load More / No More -->
      <view v-if="loading" class="p-20rpx text-center text-gray-400">
        加载中...
      </view>
      <view v-if="noMore" class="p-20rpx text-center text-gray-400">
        没有更多了
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { getWallList, getUserWallList } from '@/service/wallpaper'
import type { WallPaperItem } from '@/service/wallpaper'
import CustomNavBack from '@/components/custom-nav-back/custom-nav-back.vue'

const wallList = ref<WallPaperItem[]>([])
const queryParams = ref<any>({})
const pageNum = ref(1)
const pageSize = 12
const loading = ref(false)
const noMore = ref(false)
const pageTitle = ref('列表')

const getData = async () => {
  if (loading.value || noMore.value) return
  loading.value = true
  try {
    let res
    if (queryParams.value.type) {
      res = await getUserWallList({
        type: queryParams.value.type,
        pageNum: pageNum.value,
        pageSize,
      })
    } else {
      res = await getWallList({
        classid: queryParams.value.classid,
        pageNum: pageNum.value,
        pageSize,
      })
    }

    if (res.data.length < pageSize) {
      noMore.value = true
    }
    if (pageNum.value === 1) {
      wallList.value = res.data
    } else {
      wallList.value = [...wallList.value, ...res.data]
    }
    pageNum.value++
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const goPreview = (id: string) => {
  uni.setStorageSync('storgClassList', wallList.value)
  uni.navigateTo({
    url: `/pages/preview/preview?id=${id}`,
  })
}

onLoad((options) => {
  queryParams.value = options
  if (options.name) {
    pageTitle.value = options.name
  }
  getData()
})

onReachBottom(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
