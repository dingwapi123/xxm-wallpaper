<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="px-30rpx min-h-100vh pageBg pt-safe">
    <view class="flex items-center justify-center pt-50rpx flex-col">
      <view class="rounded-50% overflow-hidden w-160rpx h-160rpx shadow-lg">
        <image
          class="w-100% h-100%"
          src="../../static/images/xxmLogo.png"
          mode="scaleToFill"
        />
      </view>
      <view class="font-size-33rpx pt-20rpx text-[var(--text-primary)]">
        IP: 127.0.0.1
      </view>
      <view class="text-[var(--text-secondary)] pt-10rpx">来自：未知</view>
    </view>

    <view
      class="list my-50rpx rounded-10rpx shadow-lg shadow-black/5 bg-white dark:bg-gray-800 overflow-hidden"
    >
      <!-- Theme Toggle -->
      <view
        class="row px-30rpx py-30rpx border-b-1 border-solid border-[var(--border-color)] flex items-center justify-between active:bg-gray-100 dark:active:bg-gray-700"
        @click="themeStore.toggleMode()"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="setting"
            size="22px"
            custom-class="text-[var(--brand-color)]"
            class="mr-10rpx"
          ></wd-icon>
          <text class="text-[var(--text-primary)]">主题切换</text>
        </view>
        <view class="right flex items-center justify-center">
          <text class="text-[var(--text-secondary)] mr-10rpx">
            {{
              themeStore.mode === 'auto'
                ? '自动'
                : themeStore.isDark
                  ? '深色'
                  : '浅色'
            }}
          </text>
          <wd-icon
            name="arrow-right"
            size="22px"
            custom-class="text-[var(--text-secondary)]"
          ></wd-icon>
        </view>
      </view>

      <!-- Download -->
      <view
        class="row px-30rpx py-30rpx border-b-1 border-solid border-[var(--border-color)] flex items-center justify-between active:bg-gray-100 dark:active:bg-gray-700"
        @click="goList('download')"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="download"
            size="22px"
            custom-class="text-[var(--brand-color)]"
            class="mr-10rpx"
          ></wd-icon>
          <text class="text-[var(--text-primary)]">我的下载</text>
        </view>
        <view class="right flex items-center justify-center">
          <text class="text-[var(--text-secondary)]">0</text>
          <wd-icon
            name="arrow-right"
            size="22px"
            custom-class="text-[var(--text-secondary)]"
          ></wd-icon>
        </view>
      </view>

      <!-- Score -->
      <view
        class="row px-30rpx py-30rpx border-b-1 border-solid border-[var(--border-color)] flex items-center justify-between active:bg-gray-100 dark:active:bg-gray-700"
        @click="goList('score')"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="star"
            size="22px"
            custom-class="text-[var(--brand-color)]"
            class="mr-10rpx"
          ></wd-icon>
          <text class="text-[var(--text-primary)]">我的评分</text>
        </view>
        <view class="right flex items-center justify-center">
          <text class="text-[var(--text-secondary)]">0</text>
          <wd-icon
            name="arrow-right"
            size="22px"
            custom-class="text-[var(--text-secondary)]"
          ></wd-icon>
        </view>
      </view>

      <!-- Contact -->
      <view
        class="row relative px-30rpx py-30rpx flex items-center justify-between active:bg-gray-100 dark:active:bg-gray-700"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="chat1"
            size="22px"
            custom-class="text-[var(--brand-color)]"
            class="mr-10rpx"
          ></wd-icon>
          <text class="text-[var(--text-primary)]">联系客服</text>
        </view>

        <!-- #ifdef MP -->
        <button
          open-type="contact"
          class="absolute top-0rpx left-0rpx h-100% w-100% opacity-0"
        >
          模拟客服
        </button>
        <!-- #endif -->

        <view class="right flex items-center justify-center">
          <wd-icon
            name="arrow-right"
            size="22px"
            custom-class="text-[var(--text-secondary)]"
          ></wd-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

const goList = (type: string) => {
  uni.navigateTo({
    url: `/pages/classlist/classlist?type=${type}&name=${type === 'download' ? '我的下载' : '我的评分'}`,
  })
}
</script>
