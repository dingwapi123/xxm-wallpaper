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
  <view class="px-30rpx min-h-100vh pageBg">
    <view class="flex items-center justify-center pt-50rpx flex-col">
      <view class="rounded-50% overflow-hidden w-160rpx h-160rpx">
        <image
          class="w-100% h-100%"
          src="../../static/images/xxmLogo.png"
          mode="scaleToFill"
        />
      </view>

      <view class="font-size-33rpx pt-20rpx">ip:1002134123123</view>

      <view class="color-gray pt-30rpx">地区</view>
    </view>

    <view
      class="list my-50rpx b-1rpx b-solid b-#aaa rounded-10rpx shadow-lg shadow-op-20 shadow-#28B389 bg-white"
    >
      <view
        class="row px-30rpx py-25rpx b-solid b-#aaa b-b-1 b-l-0 b-r-0 b-t-0 flex items-center justify-between"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="download"
            size="22px"
            color="#28B389"
            class="mr-10rpx"
          ></wd-icon>
          <text>我的下载</text>
        </view>
        <view class="right flex items-center justify-center">
          <text>33</text>
          <wd-icon name="arrow-right" size="22px" color="#666666"></wd-icon>
        </view>
      </view>

      <view
        class="row px-30rpx py-25rpx b-solid b-#aaa b-b-1 b-l-0 b-r-0 b-t-0 flex items-center justify-between"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="star"
            size="22px"
            color="#28B389"
            class="mr-10rpx"
          ></wd-icon>
          <text>我的评分</text>
        </view>
        <view class="right flex items-center justify-center">
          <text>33</text>
          <wd-icon name="arrow-right" size="22px" color="#666666"></wd-icon>
        </view>
      </view>

      <view
        class="row relative px-30rpx py-25rpx flex items-center justify-between"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="chat1"
            size="22px"
            color="#28B389"
            class="mr-10rpx"
          ></wd-icon>
          <text>联系客服</text>
        </view>

        <!-- #ifdef MP -->
        <button
          open-type="contact"
          class="absolute top-0rpx left-0rpx h-100rpx w-100% opacity-0"
        >
          模拟客服
        </button>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <button
          @click="clickContact"
          class="absolute top-0rpx left-0rpx h-100rpx w-100% opacity-0"
        >
          拨打电话
        </button>
        <!-- #endif -->

        <view class="right flex items-center justify-center">
          <text>33</text>
          <wd-icon name="arrow-right" size="22px" color="#666666"></wd-icon>
        </view>
      </view>
    </view>

    <view
      class="list bg-white my-50rpx b-1rpx b-solid b-#aaa rounded-10rpx shadow-lg shadow-op-20 shadow-#28B389"
    >
      <view
        class="row px-30rpx py-25rpx b-solid b-#aaa b-b-1 b-l-0 b-r-0 b-t-0 flex items-center justify-between"
      >
        <view class="left flex items-center justify-center">
          <wd-icon
            name="notification"
            size="22px"
            color="#28B389"
            class="mr-10rpx"
          ></wd-icon>
          <text>订阅更新</text>
        </view>
        <view class="right flex items-center justify-center">
          <text>33</text>
          <wd-icon name="arrow-right" size="22px" color="#666666"></wd-icon>
        </view>
      </view>

      <view class="row px-30rpx py-25rpx flex items-center justify-between">
        <view class="left flex items-center justify-center">
          <wd-icon
            name="flag"
            size="22px"
            color="#28B389"
            class="mr-10rpx"
          ></wd-icon>
          <text>常见问题</text>
        </view>
        <view class="right flex items-center justify-center">
          <text>33</text>
          <wd-icon name="arrow-right" size="22px" color="#666666"></wd-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
//
const clickContact = () => {
  uni.makePhoneCall({
    phoneNumber: '123456789',
  })
}
</script>

<style lang="scss" scoped>
.row:last-child {
  border: 0px;
}
</style>
