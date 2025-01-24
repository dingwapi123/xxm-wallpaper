<template>
  <view class="">
    <navigator
      url="/pages/classlist/classlist"
      class="h-340rpx rounded-10rpx overflow-hidden relative"
      v-if="!isMore"
    >
      <image class="w-100%" src="../../static/images/xxmLogo.png" mode="" />
      <view
        class="absolute left-0 bottom-0 bg-black bg-op-20 color-#fff w-100% flex items-center justify-center h-70rpx backdrop-blur-md font-600"
      >
        一只虾
      </view>
      <view
        class="absolute left-0 top-0 bg-[rgba(250,129,90,0.7)] rounded-br-20rpx pl-6rpx pt-6rpx font-size-18rpx w-50%"
      >
        3天前更新
      </view>
    </navigator>

    <navigator
      url="/pages/classify/classify"
      open-type="reLaunch"
      class="h-340rpx rounded-10rpx overflow-hidden relative"
      v-if="isMore"
    >
      <image class="w-100%" src="../../static/images/xxmLogo.png" mode="" />
      <view
        class="absolute left-0 bottom-0 bg-black bg-op-20 color-#fff w-100% flex items-center justify-center h-100% backdrop-blur-md font-600"
      >
        更多
        <wd-icon name="more" size="22px"></wd-icon>
      </view>
    </navigator>
  </view>
</template>

<script setup>
defineProps({
  isMore: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped></style>
