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
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
onLoad(() => {

})
const { loading, data, run } = useUpload<string>()
function dmeo() {
  uni.chooseImage({
    success: (chooseImageRes) => {
      const tempFilePaths = chooseImageRes.tempFilePaths
      uni.uploadFile({
        url: import.meta.env.VITE_UPLOAD_BASEURL,
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {

        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data)
        },
      })
    },
  })
}
</script>

<template>
  <view class="!min-h-screen" style="background: linear-gradient( 180deg, #F4F4F4 0%, #FBFBFB 100%);">
    <wd-navbar
      title="关于我们" left-arrow custom-style="background-color: transparent !important;" :placeholder="true"
      :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />
    <view class="mx-[30rpx] mt-[30rpx] flex flex-col items-center justify-center gap-[30rpx]" @click="run">
      <image src="" mode="scaleToFill" class="h-[150rpx] w-[150rpx] rounded-full bg-[#e6e7e6]" />
    </view>
    <view class="mx-[30rpx] mt-[30rpx] flex flex-col items-center justify-center gap-[30rpx]" @click="dmeo">
      <image src="" mode="scaleToFill" class="h-[150rpx] w-[150rpx] rounded-full bg-[#e6e7e6]" />
    </view>
    <view
      class="mx-[30rpx] mt-[30rpx] h-[102rpx] flex items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]"
      @click="go('packages/public/rich_text', { adType: 9 })"
    >
      <text class="text-[28rpx] text-[#626364]">
        公司简介
      </text>
      <wd-icon name="chevron-right" size="12rpx" color="#A6A7A8" />
    </view>
    <view
      class="mx-[30rpx] mt-[30rpx] h-[102rpx] flex items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]"
      @click="go('packages/public/rich_text', { adType: 5 })"
    >
      <text class="text-[28rpx] text-[#626364]">
        用户协议
      </text>
      <wd-icon name="chevron-right" size="12rpx" color="#A6A7A8" />
    </view>
    <view
      class="mx-[30rpx] mt-[30rpx] h-[102rpx] flex items-center justify-between rounded-[20rpx] bg-[#fff] px-[30rpx]"
      @click="go('packages/public/rich_text', { adType: 10 })"
    >
      <text class="text-[28rpx] text-[#626364]">
        隐私政策
      </text>
      <wd-icon name="chevron-right" size="12rpx" color="#A6A7A8" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
