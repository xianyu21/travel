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
import { getByType, getCouponAvailable } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage('wd-message-box-slot')
const userStore = useUserStore()
const paging = ref(null)
const dataList = ref([])
const tab = ref(0)
function handleTabsChange(index) {
  paging.value.reload()
}
function queryList(pageNo, pageSize) {
  getCouponAvailable().then((res) => {
    if (res.code === 200) {
      console.log('------------------------------')
      console.log(res)
      paging.value.complete(res.data)
      console.log('------------------------------')
    }
    else {
      paging.value.complete([])
    }
  }).catch((res) => {
    // paging.value.complete(false)
  })
}
const content = ref('')
function onTip() {
  message.alert({
    title: '规则',
  })
}
onLoad(() => {
  getByType({ adType: 11 }).then((res) => {
    content.value = res?.data[0]?.introduction
  })
})
function onSubmit(item) {
  console.log(item)
  uni.$emit('updataCoupon', item)
  back()
}
</script>

<template>
  <z-paging ref="paging" v-model="dataList" bg-color="#F6F6F6" @query="queryList">
    <template #top>
      <wd-navbar
        title="可用优惠券" left-arrow :placeholder="true" custom-style="background-color: transparent !important;"
        :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
      />
    </template>
    <view
      v-for="(item, index) in dataList" :key="index"
      class="mx-[30rpx] mt-[30rpx] flex items-stretch gap-[24rpx] rounded-[12rpx] bg-[#Fff] p-[20rpx]"
    >
      <view class="relative">
        <image
          :src="tab == 0 ? '/static/images/img-026.png' : '/static/images/img-027.png'" mode="scaleToFill"
          class="h-[148rpx] w-[152rpx]"
        />
        <view
          class="absolute left-0 top-[15rpx] z-1 w-[152rpx] text-center"
          :class="tab == 0 ? 'text-[#FF4949]' : 'text-[#C3C3C3]'"
        >
          <text class="inline-block text-[18rpx]">
            ¥
          </text>
          <text class="inline-block text-[40rpx] font-bold">
            {{ item.discount }}
          </text>
        </view>
      </view>
      <view class="w-full flex flex-col justify-between">
        <view class="text-[28rpx] text-[#000000]">
          {{ item.couponName }}
        </view>
        <view class="text-[24rpx] text-[#ABAEB2]" @click="onTip">
          有效期至{{ item.validityDate }} 规则>
        </view>
        <view class="flex justify-end">
          <view
            class="h-[54rpx] w-[144rpx] rounded-full text-center text-[24rpx] text-[#FFFFFF] leading-[54rpx]"
            :style="{
              background: tab == 0 ? 'linear-gradient( 90deg, #078AF3 0%, #0667EB 100%, #3085CC 100%)' : ' #D9D9D9',
            }" @click="onSubmit(item)"
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
