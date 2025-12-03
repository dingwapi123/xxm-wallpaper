<template>
  <view
    class="custom-nav-back fixed top-0 left-0 w-full z-50"
    :style="{ height: navbarHeight + 'px' }"
  >
    <view
      class="navbar-content w-full relative"
      :style="{
        height: navbarContentHeight + 'px',
        top: statusBarHeight + 'px',
      }"
    >
      <view
        class="absolute flex items-center"
        :style="{
          height: menuButtonHeight + 'px',
          top: backButtonTop + 'px',
          left: '30rpx',
        }"
      >
        <view
          class="w-60rpx h-60rpx flex items-center justify-center bg-white/60 dark:bg-gray-800/60 rounded-full border-1 border-solid border-gray-100/50 dark:border-gray-700/50 backdrop-blur-md shadow-sm"
          @click="goBack"
        >
          <wd-icon name="arrow-left" size="20px" color="#333"></wd-icon>
        </view>
        <text
          v-if="title"
          class="ml-20rpx font-bold text-[var(--text-primary)] text-32rpx"
        >
          {{ title }}
        </text>
      </view>
    </view>
  </view>
  <!-- 占位符 -->
  <view :style="{ height: navbarHeight + 'px' }"></view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getStatusBarHeight,
  getNavBarContentHeight,
  getNavBarHeight,
  getMenuButtonTop,
  getMenuButtonHeight,
} from '@/utils/systemInfo'

defineProps<{
  title?: string
}>()

const statusBarHeight = ref(getStatusBarHeight())
const navbarContentHeight = ref(getNavBarContentHeight())
const navbarHeight = ref(getNavBarHeight())
const menuButtonHeight = ref(getMenuButtonHeight())
const backButtonTop = ref(0)

const calculateLayout = () => {
  const menuButtonTop = getMenuButtonTop()
  // #ifdef MP
  // 按钮顶部位置 = 胶囊顶部 - 状态栏高度
  backButtonTop.value = menuButtonTop - statusBarHeight.value
  // #endif

  // #ifndef MP
  // H5/App 垂直居中
  backButtonTop.value = (navbarContentHeight.value - menuButtonHeight.value) / 2
  // #endif
}

calculateLayout()

const goBack = () => {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  } else {
    uni.switchTab({ url: '/pages/index/index' })
  }
}
</script>

<style scoped>
.custom-nav-back {
  background: transparent;
}
</style>
