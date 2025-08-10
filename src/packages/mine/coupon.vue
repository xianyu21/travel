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
import { getByType, getCouponMy } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage('wd-message-box-slot')
const userStore = useUserStore()
const paging = ref(null)
const dataList = ref([])
const tab = ref(0)
const tabs = ref([
  {
    status: '0',
    title: '待使用',

  },
  {
    status: '-1',
    title: '待使用',
  },
  {
    status: '1',
    title: '已过期',
  },
])
function handleTabsChange(index) {
  paging.value.reload()
}
function queryList(pageNo, pageSize) {
  getCouponMy({
    status: tab.value,
  }).then((res) => {
    if (res.code === 200) {
      console.log('------------------------------')
      console.log(res)
      console.log('------------------------------')
    }
  })
  paging.value.complete([{}, {}, {}])
}
const content = ref('')
function onTip() {
  message.alert({
    title: '规则',
  })
}
onLoad(() => {
  getByType({ adType: 11 }).then((res) => {
    content.value = res.data[0].introduction
  })
})
</script>

<template>
  <z-paging ref="paging" v-model="dataList" bg-color="#F6F6F6" @query="queryList">
    <template #top>
      <wd-navbar
        title="权益兑换" left-arrow :placeholder="true"
        custom-style="background-color: transparent !important;" :fixed="false" :bordered="false"
        :safe-area-inset-top="true" @click-left="back"
      />
      <wd-tabs v-model="tab" auto-line-width @click="handleTabsChange">
        <wd-tab v-for="(item, index) in tabs" :key="index" :title="item.title" :name="item.status" />
      </wd-tabs>
    </template>
    <view
      v-for="(item, index) in dataList" :key="index"
      class="mx-[30rpx] mt-[30rpx] flex items-stretch gap-[24rpx] rounded-[12rpx] bg-[#Fff] p-[20rpx]"
    >
      <view class="relative">
        <image :src="tab == 0 ? '/static/images/img-026.png' : '/static/images/img-027.png'" mode="scaleToFill" class="h-[148rpx] w-[152rpx]" />
        <view class="absolute left-0 top-[15rpx] z-1 w-[152rpx] text-center" :class="tab == 0 ? 'text-[#FF4949]' : 'text-[#C3C3C3]'">
          <text class="inline-block text-[18rpx]">
            ¥
          </text>
          <text class="inline-block text-[40rpx] font-bold">
            10
          </text>
        </view>
      </view>
      <view class="w-full flex flex-col justify-between">
        <view class="text-[28rpx] text-[#000000]">
          全平台使用
        </view>
        <view class="text-[24rpx] text-[#ABAEB2]" @click="onTip">
          有效期至2025.06.29 23:59 规则>
        </view>
        <view class="flex justify-end">
          <view
            class="h-[54rpx] w-[144rpx] rounded-full text-center text-[24rpx] text-[#FFFFFF] leading-[54rpx]"
            :style="{
              background: tab == 0 ? 'linear-gradient( 90deg, #078AF3 0%, #0667EB 100%, #3085CC 100%)' : ' #D9D9D9',
            }"
          >
            立即使用
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <wd-message-box selector="wd-message-box-slot">
      <mp-html :content="content" />
    </wd-message-box>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.wd-tabs) {
  background: transparent !important;
}

:deep(.wd-tabs__nav) {
  background: transparent !important;
}
</style>
