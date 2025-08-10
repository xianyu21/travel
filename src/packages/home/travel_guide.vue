<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "游玩攻略"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getStrategyPage } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const paging = ref(null)
const dataList = ref([])

function onGuideClick(guide: any) {
  // 跳转到攻略详情页面
  go('/packages/home/article_details', { strategyId: guide.strategyId })
}
async function queryList(pageNo, pageSize) {
  const res = await getStrategyPage({
    page: {
      page: pageNo,
      limit: pageSize,
    },
  })
  console.log('------------------------------')
  console.log(res)
  console.log('------------------------------')
  if (res.code == 200) {
    paging.value.complete(res.data.list)
  }
  else {

  }
}
</script>

<template>
  <z-paging ref="paging" v-model="dataList" bg-color="#FAFAFA" @query="queryList">
    <template #top>
      <wd-navbar
        title="游玩攻略" custom-style="background-color: white !important;" left-arrow :placeholder="true"
        :fixed="true" :bordered="true" :safe-area-inset-top="true" @click-left="back"
      />
    </template>
    <!-- 攻略列表 -->
    <view class="px-[30rpx] pt-[20rpx]">
      <view
        v-for="guide in dataList" :key="guide.id" class="mb-[30rpx] rounded-[20rpx] bg-white p-[30rpx] shadow-sm"
        @click="onGuideClick(guide)"
      >
        <view class="flex">
          <!-- 攻略图片 -->
          <image
            :src="guide.imgUrls" mode="aspectFill"
            class="mr-[20rpx] h-[160rpx] w-[160rpx] flex-shrink-0 rounded-[10rpx]"
          />

          <!-- 攻略内容 -->
          <view class="flex-1">
            <!-- 标题 -->
            <text class="block text-[32rpx] text-[#333] font-medium leading-[44rpx]">
              {{ guide.name }}
            </text>

            <!-- 标签 -->
            <view class="mt-[15rpx] flex flex-wrap">
              <text class="mr-[10rpx] text-[24rpx] text-[#999]">
                {{ guide.description }}
              </text>
            </view>

            <!-- 发布时间 -->
            <view class="mt-[20rpx] flex items-center">
              <view class="mr-[10rpx] h-[24rpx] w-[24rpx] flex items-center justify-center rounded-full bg-[#ddd]">
                <text class="text-[16rpx] text-[#999]">
                  🕐
                </text>
              </view>
              <text class="text-[24rpx] text-[#999]">
                {{ guide.createTime }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
