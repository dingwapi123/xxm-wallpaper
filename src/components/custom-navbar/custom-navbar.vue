<template>
  <view
    class="custom-navbar w-full fixed top-0 left-0 z-50"
    :style="{ height: navbarHeight + 'px' }"
  >
    <view
      class="navbar-content w-full relative"
      :style="{
        height: navbarContentHeight + 'px',
        top: statusBarHeight + 'px',
      }"
    >
      <!-- 左侧标题（可选） -->
      <view
        v-if="title"
        class="absolute left-30rpx flex items-center"
        :style="{
          height: searchBarHeight + 'px',
          top: searchBarTop + 'px',
        }"
      >
        <text class="font-size-36rpx font-bold text-[var(--text-primary)]">
          {{ title }}
        </text>
      </view>

      <!-- 搜索框 -->
      <view
        class="absolute flex items-center bg-white/60 dark:bg-gray-800/60 rounded-32rpx px-20rpx border-1 border-solid border-gray-100/50 dark:border-gray-700/50 shadow-sm backdrop-blur-md box-border"
        :style="{
          width: searchBarWidth + 'px',
          height: searchBarHeight + 'px',
          top: searchBarTop + 'px',
          left: searchBarLeft + 'px',
        }"
        @click="onSearch"
      >
        <wd-icon name="search" size="32rpx" color="#999"></wd-icon>
        <text class="ml-10rpx text-gray-500 text-26rpx">搜索壁纸</text>
      </view>
    </view>
  </view>
  <!-- 占位符，防止内容被遮挡 -->
  <view :style="{ height: navbarHeight + 'px' }"></view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getStatusBarHeight,
  getNavBarContentHeight,
  getNavBarHeight,
  getMenuButtonLeft,
  getMenuButtonTop,
  getMenuButtonHeight,
} from '@/utils/systemInfo'

const props = defineProps<{
  title?: string
}>()

const emit = defineEmits(['search'])

const statusBarHeight = ref(getStatusBarHeight())
const navbarContentHeight = ref(getNavBarContentHeight())
const navbarHeight = ref(getNavBarHeight())
const searchBarHeight = ref(32)
const searchBarWidth = ref(0)
const searchBarTop = ref(0)
const searchBarLeft = ref(0)

// 计算搜索框宽度
const calculateLayout = () => {
  const menuButtonLeft = getMenuButtonLeft()
  const menuButtonTop = getMenuButtonTop()
  const menuButtonHeight = getMenuButtonHeight()

  // #ifdef MP
  // 搜索框高度与胶囊一致
  if (menuButtonHeight) {
    searchBarHeight.value = menuButtonHeight
  }
  // 搜索框 top 值 = 胶囊 top - 状态栏高度 (因为父容器已经 padding-top 了 statusbar)
  // 实际上父容器 navbar-content 的 top 是 statusBarHeight，所以内部元素的 top 应该是：
  // 胶囊top - 状态栏高度
  searchBarTop.value = menuButtonTop - statusBarHeight.value

  // 计算左边距
  let left = 15 // 默认左边距 15px (30rpx)
  if (props.title) {
    left += 40 + 10 // 预留标题宽度(约40px) + 间距(10px)
    // 如果标题较长，可以动态调整，这里暂按固定估算
  }
  searchBarLeft.value = left

  // 计算宽度：胶囊左侧 - 间距(10px) - 左侧位置
  searchBarWidth.value = menuButtonLeft - 10 - left
  // #endif

  // #ifndef MP
  // H5/App端
  searchBarHeight.value = 32
  // 垂直居中：(导航栏内容高度 - 搜索框高度) / 2
  searchBarTop.value = (navbarContentHeight.value - 32) / 2

  let h5Left = 15
  if (props.title) {
    h5Left += 40 + 10
  }
  searchBarLeft.value = h5Left

  const { windowWidth } = uni.getSystemInfoSync()
  // 屏幕宽度 - 左右边距(各15px) - (如果有标题占用的宽度)
  // 上面计算了 searchBarLeft，右侧也留 15px
  searchBarWidth.value = windowWidth - h5Left - 15
  // #endif
}

calculateLayout()

const onSearch = () => {
  emit('search')
}
</script>

<style scoped>
.custom-navbar {
  background: transparent;
}
</style>
