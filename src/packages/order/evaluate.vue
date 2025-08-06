<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
// import {  } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const value = ref<string>('')
const value1 = ref<string>(3)
</script>

<template>
  <view class="min-h-screen w-full bg-[#FAFAFA]">
    <wd-navbar
      title="订单评价" left-arrow :placeholder="true" custom-style="background-color: #5594FB !important;" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    />
    <view class="mx-[30rpx] mt-[30rpx] h-[202rpx] flex flex-col items-center justify-center gap-[40rpx] rounded-[20rpx] bg-[#fff]">
      <text class="text-[40rpx] text-[#000000] font-bold">
        {{ value1 }}
      </text>
      <wd-rate v-model="value1" active-color="linear-gradient( 180deg, #FF1A0A 0%, #FF7443 100%)" color="#D8DADB" size="36rpx" space="8rpx" />
    </view>
    <view class="mt-[30rpx] flex items-center justify-center gap-[20rpx]">
      <view class="h-[40rpx] rounded-[4rpx] bg-[#D0EBFF] p-[6rpx_12rpx] text-center text-[20rpx] text-[#0667EA] leading-[40rpx]">
        拍照技术好
      </view>
      <view class="h-[40rpx] rounded-[4rpx] bg-[#EFEFEF] p-[6rpx_12rpx] text-center text-[20rpx] text-[#000000] leading-[40rpx]">
        拍照技术好
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] overflow-hidden rounded-[20rpx] bg-[#fff]">
      <wd-textarea v-model="value" placeholder="请简短描述下您的原因..." />
    </view>
    <view class="fixed bottom-[64rpx] left-0 right-0 z-1">
      <view
        class="mx-[48rpx] h-[82rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[82rpx]" :style="{
          background: 'linear-gradient( 118deg, #078BF3 0%, #0666EA 100%)',
        }"
        @click="go('/packages/home/order_confirm')"
      >
        提交评价
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
:deep(.wd-navbar__arrow) {
  color: #fff !important  ;
}
:deep(.wd-navbar__title) {
  color: #fff !important  ;
}
</style>
