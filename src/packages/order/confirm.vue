<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "确认下单"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getMyDefaltAddr, getTravelOrder, getTravelTrade } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const isCheck = ref(false)
const addressInfo = ref({})
const couponInfo = ref({
  couponName: '',
  discount: '',
})
const formData = ref({
  couponRecordId: '', //
  durationId: '',
  serviceCount: 1,
  serviceId: '',
  receiveUserId: '',
  receiveUserName: '',
  address: '',
  addrId: '',
  hours: '',
  serviceTimeStart: '',
  serviceName: '',
  payType: 3, // 支付方式 1微信  2支付宝
  orderType: 1,
})
onLoad(async (options) => {
  console.log('------------------------------')
  console.log(options)
  console.log('------------------------------')
  formData.value = {
    ...formData.value,
    ...options,
  }
  const res = await getMyDefaltAddr()
  if (res.code === 200 && res.data) {
    addressInfo.value = res.data
    formData.value.address = res.data.address
    formData.value.addrId = res.data.addrId
  }
  uni.$on('updataAddress', (data) => {
    addressInfo.value = data
    formData.value.address = data.address
    formData.value.addrId = data.addrId
    calc()
  })
  uni.$on('updataCoupon', (data) => {
    couponInfo.value = data
    formData.value.couponRecordId = data.couponRecordId
    calc()
  })
})
onUnload(() => {
  uni.$off('updataAddress')
  uni.$off('updataCoupon')
})
// 计算价格
function calc() {
  if (!formData.value.serviceId) {
    return toast.show('请选择服务')
  }
  getTravelTrade({
    ...formData.value,
  }).then((res) => {
    console.log(res)
    payInfo.value = res.data
  })
}
function onSubmit() {
  getTravelOrder(formData.value)
}
// 时间选择器相关
const showTimePicker = ref(false)

// 选择服务时间
function selectServiceTime() {
  showTimePicker.value = true
}

// 关闭时间选择器
function closeTimePicker() {
  showTimePicker.value = false
}

// 确认时间选择
function confirmTimeSelection(timeData) {
  formData.value.serviceTimeStart = `${timeData.fullTime}` + `:00`
  showTimePicker.value = false

  calc()
}
</script>

<template>
  <view class="bg-base-news pb-[100rpx]">
    <wd-navbar
      title="确认订单" left-arrow :placeholder="true" custom-style="background-color: transparent !important;"
      :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />
    <!--  -->
    <ServiceTimePicker :show="showTimePicker" @close="closeTimePicker" @confirm="confirmTimeSelection" />
    <!--  -->
    <view
      v-if="!addressInfo"
      class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx] text-center text-[28rpx] text-[#000000] font-bold"
    >
      +请添加服务地址
    </view>
    <view
      v-else class="mx-[30rpx] mt-[30rpx] flex items-center justify-between rounded-[20rpx] bg-[#fff] p-[30rpx]"
      @click="go('/packages/mine/address', { type: 2 })"
    >
      <view class="flex flex-col gap-[10rpx]">
        <text class="text-[28rpx] text-[#000000]">
          {{ addressInfo.contact }} {{ addressInfo.contactPhone }}
        </text>
        <text class="text-[24rpx] text-[#626364]">
          {{ addressInfo.address }}
        </text>
      </view>
      <wd-icon name="chevron-right" size="28rpx" color="#717171" />
    </view>
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务旅接
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#000000]">
            {{ formData.receiveUserName }}
          </text>
        </view>
      </view>
      <view class="mt-[50rpx] flex items-center justify-between" @click="selectServiceTime">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务时间
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#000000]">
            {{ formData.serviceTimeStart || '' }}
          </text>
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>

      <view class="mt-[50rpx] flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务时长
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#000000]">
            {{ formData.hours }}小时
          </text>
        </view>
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex gap-[20rpx] rounded-[8rpx]">
        <image src="" mode="scaleToFill" class="h-[152rpx] w-[150rpx] rounded-[12rpx] bg-[#003e7e]" />
        <view class="w-full flex flex-1 flex-col justify-between">
          <view class="flex items-center gap-[30rpx]">
            <text
              style="background: linear-gradient( 92deg, #FFCE8E 0%, #FFA64D 100%);border-radius: 20rpx 0rpx 20rpx 0rpx;"
              class="block h-[36rpx] w-[108rpx] text-center text-[20rpx] text-[#FFFFFF] leading-[36rpx]"
            >
              限时秒杀
            </text>
            <text class="text-[32rpx] text-[#000000] font-bold">
              陪玩陪拍
            </text>
          </view>
          <view class="text-[24rpx] text-[#002C4F]">
            120分钟丨全程帮拍
          </view>
          <view class="flex items-center justify-between">
            <view>
              <text class="text-price text-[36rpx] text-[#DC3A23] font-bold">
                499
              </text>
            </view>
            <wd-input-number />
          </view>
        </view>
      </view>
      <view class="my-[30rpx] block h-2rpx w-full bg-[#F9F9F9]" />
      <view class="flex items-center justify-between" @click="selectServiceProject">
        <text class="text-[28rpx] text-[#000000]">
          预估车费(往返）
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#EA333F]">
            ￥{{ payInfo.estimateFare }}
          </text>
        </view>
      </view>
      <view class="mt-[30rpx] flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000]">
          优惠券
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx]" :class="couponInfo?.couponName ? 'text-[#000000]' : 'text-[#BABABA]'">
            {{ `${couponInfo?.couponName}-${couponInfo?.discount}元` || '暂无可用' }}
          </text>
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>
    </view>
    <ol-paymentPicker v-model="formData.payType" :disabled-payments="[1, 2]" />
    <view class="mb-8 mt-[42rpx] flex items-center justify-center">
      <wd-checkbox v-model="isCheck" checked-color="#0680F0" size="26rpx" />
      <text class="text-[24rpx] text-[#181818]">
        已阅读并同意
      </text>
      <text class="text-[24rpx] text-[#181818]" @click="go('/packages/public/rich_text', { adType: 6 })">
        《下单须知》
      </text>
    </view>
    <view class="fixed bottom-0 left-0 right-0 z-1">
      <view class="h-[162rpx] flex items-center justify-end gap-[20rpx] bg-[#fff] pr-[30rpx] pt-[12rpx]">
        <view class="total-price">
          <text class="text-[28rpx] text-[#ABAEB2]">
            合计：
          </text>
          <text class="text-price text-[44rpx] text-[#FF0011]">
            489
          </text>
        </view>
        <view
          class="h-[80rpx] w-[254rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]"
          style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);"
          @click="onSubmit"
        >
          提交订单并支付
        </view>
      </view>
    </view>
    <!-- <view class="fixed bottom-0 left-0 right-0 z-1 bg-[#fff] h-[162rpx]">

            <view class="mx-[48rpx] h-[82rpx] rounded-[20rpx] text-center text-[28rpx] text-[#FFFFFF] leading-[82rpx]"
                :style="{
                    background: 'linear-gradient( 25deg, #51DDFF 0%, #42CBFF 100%)',
                }" @click="go('/packages/home/order_confirm')">
                立即兑换
            </view>
        </view> -->
  </view>
</template>

<style lang="scss" scoped>
//
</style>
