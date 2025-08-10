<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "精选景点详情"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getSpotCancelCollect, getSpotCollect, getSpotDetail } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const scenicDetail = ref({})
function toggleFavorite() {
  if (scenicDetail.value.isCollected === 0) {
    getSpotCollect({
      spotId: props.scenicData.spotId,
    }).then((res) => {
      if (res.code === 200) {
        scenicDetail.value.isCollected = 1
        toast.show('收藏成功')
      }
    })
  }
  else if (scenicDetail.value.isCollected === 1) {
    getSpotCancelCollect({
      spotId: props.scenicData.spotId,
    }).then((res) => {
      if (res.code === 200) {
        scenicDetail.value.isCollected = 0
        toast.show('收藏成功')
      }
    })
  }
}
onLoad((options) => {
  getSpotDetail({
    spotId: options.spotId,
  }).then((res) => {
    scenicDetail.value = res.data
  })
})
</script>

<template>
  <view class="min-h-screen bg-white">
    <wd-navbar title="精选景点" custom-style="background-color: #FAFAFA !important;" :placeholder="true" :fixed="true" left-arrow @click-left="back" />

    <view class="relative pb-[180rpx]">
      <!-- 封面图片 -->
      <view class="m-[30rpx] overflow-hidden rounded-[20rpx]">
        <image :src="scenicDetail.imgUrls" mode="aspectFill" class="h-[400rpx] w-full" />
      </view>

      <!-- 详情内容区域 -->
      <view class="p-[30rpx]">
        <!-- 标题和信息 -->
        <view class="mb-[40rpx]">
          <view class="mb-[20rpx]">
            <text class="text-[32rpx] text-[#333233] font-bold font-medium leading-[50rpx]">
              {{ scenicDetail.name }}
            </text>
          </view>
          <view class="space-y-[10rpx]">
            <view class="flex items-center">
              <image src="@img/img-102.png" mode="scaleToFill" class="mr-[10rpx] h-[22rpx] w-[22rpx]" />
              <text class="text-[28rpx] text-[#999]">
                编辑时间：{{ scenicDetail.updateTime }}
              </text>
            </view>
            <view class="flex items-center">
              <image src="@img/img-103.png" mode="scaleToFill" class="mr-[10rpx] h-[22rpx] w-[22rpx]" />
              <text class="text-[28rpx] text-[#999]">
                详细地址：{{ scenicDetail.address }}
              </text>
            </view>
          </view>
        </view>

        <!-- 景点介绍 -->
        <view>
          <view class="mb-[30rpx]">
            <text class="text-[32rpx] text-[#333] font-medium">
              景点介绍
            </text>
          </view>
          <view class="text-[28rpx] text-[#666] leading-[45rpx] space-y-[30rpx]">
            <rich-text :nodes="scenicDetail.introduction" />
          </view>
        </view>
      </view>
    </view>
    <view class="fixed bottom-0 left-0 right-0 z-1 bg-white p-[30rpx]">
      <wd-button
        block custom-class="!h-[88rpx] !rounded-[44rpx] !bg-gradient-to-r !from-[#4facfe] !to-[#00f2fe]"
        @click="toggleFavorite"
      >
        {{ !scenicDetail.isCollected ? '已收藏' : '收藏景点' }}
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
