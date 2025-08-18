<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getComplaint } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const orderNo = ref('')
const content = ref('')
onLoad((options) => {
  console.log('------------------------------')
  console.log(options)
  console.log('------------------------------')
  orderNo.value = options.orderNo
})
function onSubmit() {
  getComplaint({
    orderNo: orderNo.value,
    content: content.value,
  }).then((res) => {
    if (res.code === 200) {
      toast.success('投诉成功')
      setTimeout(() => {
        back()
      }, 1000)
    }
  })
}
</script>

<template>
  <view class="min-h-screen w-full bg-[#FAFAFA]">
    <wd-navbar
      title="订单投诉" left-arrow :placeholder="true" custom-style="background-color: #5594FB !important;" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    />
    <view class="mx-[30rpx] mt-[30rpx] overflow-hidden rounded-[20rpx] bg-[#fff]">
      <wd-textarea v-model="content" placeholder="请简短描述下您的投诉内容..." />
    </view>
    <view class="fixed bottom-[64rpx] left-0 right-0 z-1">
      <view
        class="mx-[48rpx] h-[82rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[82rpx]" :style="{
          background: 'linear-gradient( 118deg, #078BF3 0%, #0666EA 100%)',
        }"
        @click="onSubmit"
      >
        提交投诉
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
