<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="pageBg pb-100rpx pt-20rpx">
    <!-- Banner -->
    <view class="banner w-750rpx">
      <swiper
        circular
        indicator-dots
        indicator-color="rgba(255, 255, 255, 0.5)"
        indicator-active-color="#28B389"
        autoplay
        class="w-750rpx h-340rpx"
      >
        <swiper-item
          v-for="item in bannerList"
          :key="item._id"
          class="w-100% h-100% px-20rpx box-border"
        >
          <image
            :src="item.picurl"
            class="w-100% h-100% rounded-10rpx"
            mode="aspectFill"
            @click="goLink(item)"
          />
        </swiper-item>
      </swiper>
    </view>

    <!-- Notice -->
    <view
      class="w-690rpx h-80rpx bg-gray-100 dark:bg-gray-800 rounded-20rpx mx-auto flex items-center shadow-sm dark:shadow-none mt-30rpx"
    >
      <view class="w-140rpx flex items-center justify-center">
        <wd-icon
          name="sound"
          size="40rpx"
          custom-class="text-[var(--brand-color)]"
        ></wd-icon>
        <text
          class="text-[var(--brand-color)] font-size-28rpx font-semibold ml-10rpx"
        >
          公告
        </text>
      </view>

      <view
        class="flex-1 flex items-center justify-center overflow-hidden h-100%"
      >
        <swiper
          circular
          autoplay
          vertical
          interval="3000"
          duration="500"
          class="h-100% w-100%"
        >
          <swiper-item
            class="h-100% flex items-center font-size-30rpx text-truncate"
            v-for="item in noticeList"
            :key="item._id"
            @click="goNotice(item._id)"
          >
            <text
              class="w-100% text-truncate pl-20rpx text-[var(--text-primary)]"
            >
              {{ item.title }}
            </text>
          </swiper-item>
        </swiper>
      </view>

      <view class="w-70rpx flex items-center justify-center">
        <wd-icon
          name="arrow-right"
          size="30rpx"
          custom-class="text-[var(--text-secondary)]"
        ></wd-icon>
      </view>
    </view>

    <!-- Daily Recommend -->
    <view class="pt-50rpx">
      <common-title>
        <template #name>每日推荐</template>
        <template #custom>
          <view class="flex items-center justify-center">
            <wd-icon
              name="calendar"
              size="40rpx"
              custom-class="text-[var(--brand-color)]"
            ></wd-icon>
            <text
              class="text-[var(--brand-color)] font-size-28rpx font-semibold ml-10rpx"
            >
              {{ currentDay }}日
            </text>
          </view>
        </template>
      </common-title>
      <view class="w-720rpx ml-30rpx mt-30rpx">
        <scroll-view scroll-x class="whitespace-nowrap" enable-flex>
          <view class="flex">
            <view
              class="w-200rpx h-430rpx mr-15rpx last:mr-30rpx flex-shrink-0"
              v-for="item in randomList"
              :key="item._id"
              @click="goPreview(item._id)"
            >
              <image
                :src="item.smallPicurl"
                class="w-100% h-100% rounded-10rpx bg-gray-200 dark:bg-gray-700"
                mode="aspectFill"
              />
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- Classify Selection -->
    <view class="pt-50rpx">
      <common-title>
        <template #name>专题精选</template>
        <template #custom>
          <navigator
            url="/pages/classify/classify"
            open-type="switchTab"
            class="text-[var(--text-secondary)] text-28rpx"
          >
            More+
          </navigator>
        </template>
      </common-title>

      <view class="px-30rpx mt-30rpx">
        <view class="grid grid-cols-3 gap-15rpx">
          <view
            v-for="item in classifyList"
            :key="item._id"
            class="rounded-10rpx overflow-hidden relative h-340rpx"
            @click="goClassList(item._id, item.name)"
          >
            <image
              :src="item.picurl"
              class="w-100% h-100% bg-gray-200 dark:bg-gray-700"
              mode="aspectFill"
            ></image>
            <view
              class="absolute bottom-0 left-0 w-100% h-70rpx bg-black/30 flex items-center justify-center backdrop-blur-sm"
            >
              <text class="text-white font-size-28rpx">
                {{ item.name }}
              </text>
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
import {
  getHomeBanner,
  getWallNewsList,
  getWallList,
  getClassify,
} from '@/service/wallpaper'
import type {
  BannerItem,
  NewsItem,
  WallPaperItem,
  ClassifyItem,
} from '@/service/wallpaper'
// Component import is handled by easycom usually, but safe to import
import CommonTitle from '@/components/common-title/common-title.vue'

const bannerList = ref<BannerItem[]>([])
const noticeList = ref<NewsItem[]>([])
const randomList = ref<WallPaperItem[]>([])
const classifyList = ref<ClassifyItem[]>([])

const currentDay = ref(new Date().getDate())

const getBanner = async () => {
  try {
    const res = await getHomeBanner()
    bannerList.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const getNotice = async () => {
  try {
    const res = await getWallNewsList({ select: true })
    noticeList.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const getRandom = async () => {
  try {
    const res = await getWallList({ pageNum: 1, pageSize: 9 })
    randomList.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const getClassifyData = async () => {
  try {
    const res = await getClassify({ select: true, pageSize: 9 })
    classifyList.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const goLink = (item: BannerItem) => {
  if (item.target === 'self') {
    uni.navigateTo({
      url: `/pages/classlist/classlist?classid=${item.url}&name=精选推荐`,
    })
  }
}

const goNotice = (id: string) => {
  uni.navigateTo({ url: `/pages/notice/detail?id=${id}` })
}

const goPreview = (id: string) => {
  uni.setStorageSync('storgClassList', randomList.value)
  uni.navigateTo({
    url: `/pages/preview/preview?id=${id}`,
  })
}

const goClassList = (id: string, name: string) => {
  uni.navigateTo({
    url: `/pages/classlist/classlist?classid=${id}&name=${name}`,
  })
}

onLoad(() => {
  getBanner()
  getNotice()
  getRandom()
  getClassifyData()
})

onShareAppMessage(() => ({ title: '咸虾米壁纸', path: '/pages/index/index' }))
onShareTimeline(() => ({ title: '咸虾米壁纸' }))
</script>
