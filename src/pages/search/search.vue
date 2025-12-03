<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '搜索',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="pageBg min-h-screen">
    <custom-nav-back title="搜索"></custom-nav-back>

    <!-- 搜索框区域 -->
    <view class="px-30rpx py-20rpx">
      <wd-search
        v-model="keyword"
        placeholder="搜索壁纸..."
        cancel-button="always"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
      />
    </view>

    <!-- 搜索历史 -->
    <view v-if="!keyword && historyList.length > 0" class="px-30rpx mt-20rpx">
      <view class="flex justify-between items-center mb-20rpx">
        <text class="text-[var(--text-primary)] font-bold">搜索历史</text>
        <wd-icon
          name="delete"
          size="18px"
          color="#999"
          @click="clearHistory"
        ></wd-icon>
      </view>
      <view class="flex flex-wrap gap-20rpx">
        <view
          v-for="(item, index) in historyList"
          :key="index"
          class="px-30rpx py-10rpx bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-[var(--text-secondary)]"
          @click="clickHistory(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view v-if="hasSearched" class="px-5rpx pt-20rpx">
      <view
        v-if="wallList.length > 0"
        class="grid grid-cols-3 gap-5rpx pb-100rpx"
      >
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
      <view v-else class="text-center text-gray-400 mt-100rpx">
        未找到相关壁纸
      </view>
    </view>

    <!-- Load More / No More -->
    <view v-if="hasSearched && wallList.length > 0">
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
import { onReachBottom, onLoad } from '@dcloudio/uni-app'
import { searchWall } from '@/service/wallpaper'
import type { WallPaperItem } from '@/service/wallpaper'
import CustomNavBack from '@/components/custom-nav-back/custom-nav-back.vue'

const keyword = ref('')
const historyList = ref<string[]>([])
const wallList = ref<WallPaperItem[]>([])
const pageNum = ref(1)
const pageSize = 12
const loading = ref(false)
const noMore = ref(false)
const hasSearched = ref(false)

// 加载历史记录
onLoad(() => {
  const history = uni.getStorageSync('searchHistory')
  if (history) {
    historyList.value = JSON.parse(history)
  }
})

const saveHistory = (key: string) => {
  if (!key) return
  const index = historyList.value.indexOf(key)
  if (index !== -1) {
    historyList.value.splice(index, 1)
  }
  historyList.value.unshift(key)
  if (historyList.value.length > 10) {
    historyList.value.pop()
  }
  uni.setStorageSync('searchHistory', JSON.stringify(historyList.value))
}

const clearHistory = () => {
  uni.showModal({
    title: '提示',
    content: '确定清空搜索历史吗？',
    success: (res) => {
      if (res.confirm) {
        historyList.value = []
        uni.removeStorageSync('searchHistory')
      }
    },
  })
}

const clickHistory = (key: string) => {
  keyword.value = key
  onSearch()
}

const onSearch = async () => {
  if (!keyword.value.trim()) return
  saveHistory(keyword.value)

  // 重置状态
  pageNum.value = 1
  wallList.value = []
  noMore.value = false
  hasSearched.value = true

  await getData()
}

const onCancel = () => {
  uni.navigateBack()
}

const onClear = () => {
  keyword.value = ''
  hasSearched.value = false
  wallList.value = []
}

const getData = async () => {
  if (loading.value || noMore.value) return
  loading.value = true

  try {
    const res = await searchWall({
      keyword: keyword.value,
      pageNum: pageNum.value,
      pageSize,
    })

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

onReachBottom(() => {
  if (hasSearched.value) {
    getData()
  }
})
</script>
