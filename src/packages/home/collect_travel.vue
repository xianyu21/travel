<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "收藏旅接"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getCancelCollect, getMyCollect } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const paging = ref(null)
const dataList = ref([])
async function queryList(pageNo, pageSize) {
  const res = await getMyCollect({
    page: {
      page: pageNo,
      limit: pageSize,
    },
  })
  if (res.code === 200) {
    paging.value.complete(res.data.list)
  }
}
async function handleCloseCollect(item) {
  const res = await getCancelCollect({
    receiveUserId: item.receiveUserId,
  })
  if (res.code === 200) {
    toast.success('取消收藏')
    paging.value.reload()
  }
}
</script>

<template>
  <z-paging ref="paging" v-model="dataList" bg-color="#F6F6F6" @query="queryList">
    <template #top>
      <wd-navbar
        title="收藏旅接" left-arrow :placeholder="true" custom-style="background-color: transparent !important;"
        :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
      />
    </template>
    <view class="flex flex-col gap-[32rpx]">
      <view
        v-for="travel in dataList" :key="travel.id"
        @click="go('/packages/travel/details', { receiveUserId: travel.receiveUserId })"
      >
        <view class="travel-card gap-[18rpx] rounded-[20rpx] p-[30rpx]">
          <view class="relative w-[190rpx] overflow-hidden">
            <view
              v-if="travel?.isService === 1"
              class="absolute left-0 top-0 z-1 h-[36rpx] w-[86rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
              style="background: linear-gradient( 268deg, #FFCE8E 0%, #FFA64D 100%);border-radius:  12rpx 0rpx ;"
            >
              可服务
            </view>
            <view
              v-else
              class="absolute left-0 top-0 z-1 h-[36rpx] w-[86rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
              style="background: linear-gradient( 92deg, #FFB38E 0%, #FF774D 100%);border-radius:  12rpx 0rpx ;"
            >
              服务中
            </view>
            <image :src="travel.headUrl" mode="aspectFill" class="travel-avatar h-[190rpx] w-full rounded-[20rpx]" />
            <view
              class="absolute bottom-0 left-0 h-[36rpx] w-full text-center text-[20rpx] text-[#FFFFFF]"
              style="background: linear-gradient( 268deg, #FF8E99 0%, #FF4D54 100%);border-radius:0 0 20rpx 20rpx;"
            >
              立享服务
            </view>
          </view>
          <view class="w-full flex flex-1 flex-col justify-between">
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-[10rpx]">
                <text class="text-[32rpx] text-[#191A1D] text-[#191A1D]">
                  {{ travel.realName }}
                </text>
                <image v-if="travel.gender == '女'" src="@img/girl.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]" />
                <image v-if="travel.gender == '男'" src="@img/boy.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]" />
                <image v-if="travel.hasCar === 1" src="@img/car.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]" />
              </view>
              <view>
                <image src="@img/img-007.png" mode="scaleToFill" class="h-[22rpx] w-[22rpx]" />
                <text class="text-[24rpx] text-[#333233]">
                  {{ travel.distance || 0 }}km
                </text>
              </view>
            </view>
            <view class="bg-009 h-[40rpx] pl-[20rpx] text-[20rpx] text-[#555555] leading-[40rpx]">
              {{ travel.score || 0 }}分 I 已服务{{ travel.receiveCount || 0 }}单
            </view>
            <view class="flex items-center justify-between">
              <view class="text-[20rpx] text-[#787878]">
                {{ travel?.introduction }}
              </view>
              <view
                class="h-[52rpx] w-[140rpx] rounded-full text-center text-[24rpx] text-[#787878] leading-[52rpx]"
                style="border: 1rpx solid #4E4E4E;"
                @click.stop="handleCloseCollect(travel)"
              >
                取消收藏
              </view>
              <view
                class="h-[52rpx] w-[140rpx] rounded-full text-center text-[24rpx] text-[#fff] leading-[52rpx]"
                style="background: linear-gradient( 90deg, #078DF4 0%, #066BEB 100%);" @click.stop="onPlace(travel)"
              >
                立即下单
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
//
</style>
