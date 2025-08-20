<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "文章详情"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getStrategyDetail } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

const articleDetail = ref({})

onLoad((options) => {
  console.log('------------------------------')
  console.log(options)
  console.log('------------------------------')
  getStrategyDetail({
    strategyId: options.strategyId,
  }).then((res) => {
    if (res.code === 200) {
      articleDetail.value = res.data
    }
  })
})
</script>

<template>
  <view class="min-h-screen bg-[#FAFAFA]">
    <wd-navbar
      title="文章详情"
      custom-style="background-color: transparent !important;"
      left-arrow
      :placeholder="true"
      :fixed="true"
      :bordered="false"
      :safe-area-inset-top="true"
      @click-left="back"
    />

    <!-- 文章内容 -->
    <view class="px-[30rpx] pt-[20rpx]">
      <!-- 封面图片 -->
      <view class="mb-[30rpx] overflow-hidden rounded-[20rpx]">
        <image
          :src="articleDetail?.imgUrls"
          mode="aspectFill"
          class="h-[400rpx] w-full"
        />
      </view>
      <view class="mb-[20rpx]">
        <text class="text-[36rpx] text-[#333] font-medium leading-[50rpx]">
          {{ articleDetail.name }}
        </text>
      </view>

      <view class="mb-[40rpx] flex items-center">
        <image src="@img/img-102.png" mode="scaleToFill" class="mr-[10rpx] h-[22rpx] w-[22rpx]" />
        <text class="text-[28rpx] text-[#999]">
          编辑时间：{{ articleDetail.updateTime }}
        </text>
      </view>

      <!-- 文章正文 -->
      <view class="rounded-[20rpx]">
        <!-- 攻略介绍标题 -->
        <view class="mb-[30rpx]">
          <text class="text-[32rpx] text-[#333] font-medium">
            攻略介绍
          </text>
        </view>

        <mp-html :content="articleDetail.introduction" />
      </view>

      <!-- 底部间距 -->
      <view class="h-[40rpx]" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
