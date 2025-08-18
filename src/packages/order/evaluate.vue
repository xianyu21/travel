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
import { getEvaluate } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const orderNo = ref('')
const content = ref('')
const star = ref(0)
const tags = ref([{ name: '不满意', checked: false }, { name: '不满意', checked: false }, { name: '不满意', checked: false }])
onLoad((options) => {
  console.log('------------------------------')
  console.log(options)
  console.log('------------------------------')
  orderNo.value = options.orderNo
})
function onSubmit() {
  getEvaluate({
    orderNo: orderNo.value,
    content: content.value,
    star: Number.parseInt(star.value),
    tags: tags.value.filter(v => v.checked).map(v => v.name).join(','),
  }).then((res) => {
    if (res.code === 200) {
      toast.success('评价成功')
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
      title="订单评价" left-arrow :placeholder="true" custom-style="background-color: #5594FB !important;"
      :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />
    <view
      class="mx-[30rpx] mt-[30rpx] h-[202rpx] flex flex-col items-center justify-center gap-[40rpx] rounded-[20rpx] bg-[#fff]"
    >
      <text class="text-[40rpx] text-[#000000] font-bold">
        {{ star }}
      </text>
      <wd-rate
        v-model="star" active-color="linear-gradient( 180deg, #FF1A0A 0%, #FF7443 100%)" color="#D8DADB"
        size="36rpx" space="8rpx"
      />
    </view>
    <view class="mt-[30rpx] flex items-center justify-center gap-[20rpx]">
      <view
        v-for="(item, index) in tags" :key="index"
        class="h-[40rpx] rounded-[4rpx] p-[6rpx_12rpx] text-center text-[20rpx] leading-[40rpx]"
        :class="item.checked ? 'bg-[#D0EBFF] text-[#0667EA]' : 'bg-[#EFEFEF] text-[#000000]'"
        @click="item.checked = !item.checked"
      >
        {{ item.name }}
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] overflow-hidden rounded-[20rpx] bg-[#fff]">
      <wd-textarea v-model="content" placeholder="请简短描述下您的原因..." />
    </view>
    <view class="fixed bottom-[64rpx] left-0 right-0 z-1">
      <view
        class="mx-[48rpx] h-[82rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[82rpx]" :style="{
          background: 'linear-gradient( 118deg, #078BF3 0%, #0666EA 100%)',
        }" @click="onSubmit"
      >
        提交评价
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
:deep(.wd-navbar__arrow) {
  color: #fff !important;
}

:deep(.wd-navbar__title) {
  color: #fff !important;
}
</style>
