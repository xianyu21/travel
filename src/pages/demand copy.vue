<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "发布需求"
  }
}
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const isCheck = ref(false)
// 表单数据
const formData = ref({
  serviceTime: '', // 服务时间
  serviceProject: '', // 服务项目
  location: '江北区红鼎国际A栋601', // 旅接地点
  fee: 499, // 服务费用
  gender: '男', // 旅接性别
  hasCar: '是', // 是否带车
  fuelFee: 20, // 预估燃油费
  coupon: '暂无可用', // 优惠券
  paymentMethod: '建设银行储蓄卡', // 支付方式
  paymentAccount: '9943', // 支付账号
  agreed: true, // 是否同意协议
})

// 支付方式选项
const paymentOptions = [
  { label: '微信支付', value: '微信支付', icon: 'wechat' },
  { label: '支付宝支付', value: '支付宝支付', icon: 'alipay' },
  { label: '建设银行储蓄卡', value: '建设银行储蓄卡', icon: 'bank-card' },
]

// 选择服务时间
function selectServiceTime() {
  toast.show('选择服务时间')
}

// 选择服务项目
function selectServiceProject() {
  toast.show('选择服务项目')
}

// 选择优惠券
function selectCoupon() {
  toast.show('选择优惠券')
}

// 提交订单
function submitOrder() {
  if (!formData.value.agreed) {
    toast.show('请先阅读并同意《订单发布须知》')
    return
  }

  message.confirm({
    title: '确认提交',
    msg: '是否确认提交订单？',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  }).then(() => {
    toast.show('订单提交成功')
    setTimeout(() => {
      back()
    }, 1500)
  }).catch(() => {
    // 取消操作
  })
}
</script>

<template>
  <view class="bg-base-007 pb-[162rpx]">
    <wd-navbar
      title="发布需求" left-arrow custom-style="background-color: transparent !important;" :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    />
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务时间
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#000000]" />
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务项目
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#000000]" />
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>
      <view class="mt-[50rpx] flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          旅接地点
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#000000]">
            江北区红鼎国际A栋601
          </text>
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>
      <view class="mt-[50rpx] flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务费用
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#EA333F]">
            ￥499
          </text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          旅接性别
        </text>
        <view class="flex items-center gap-[30rpx]">
          <view>
            <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon name="circle" size="40rpx" color="#0669EB" />
            <text>男</text>
          </view>
          <view>
            <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon name="circle" size="40rpx" color="#0669EB" />
            <text>女</text>
          </view>
        </view>
      </view>
      <view class="mt-[50rpx] flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          是否带车
        </text>
        <view class="flex items-center gap-[30rpx]">
          <view>
            <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon name="circle" size="40rpx" color="#0669EB" />
            <text>是</text>
          </view>
          <view>
            <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon name="circle" size="40rpx" color="#0669EB" />
            <text>否</text>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          预估燃油费(往返）
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#EA333F]">
            ￥20
          </text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          优惠券
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#BABABA]">
            暂无可用
          </text>
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <image
            src="@img/wx.png"
            mode="scaleToFill"
            class="mr-[16rpx] h-[32rpx] w-[36rpx]"
          />
          <text class="text-[28rpx] text-[#000000] font-bold">
            微信支付
          </text>
        </view>
        <view class="flex items-center">
          <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
          <wd-icon name="circle" size="40rpx" color="#0669EB" />
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <image
            src="@img/zfb.png"
            mode="scaleToFill"
            class="mr-[16rpx] h-[34.53rpx] w-[34.53rpx]"
          />
          <text class="text-[28rpx] text-[#000000] font-bold">
            支付宝支付
          </text>
        </view>
        <view class="flex items-center">
          <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
          <wd-icon name="circle" size="40rpx" color="#0669EB" />
        </view>
      </view>
    </view>
    <!--  -->
    <view class="mt-[130rpx] flex items-center justify-center">
      <wd-checkbox v-model="isCheck" size="large" checked-color="#0669EB" />
      <text class="text-[24rpx] text-[#6E6E6E]">
        已阅读并同意
      </text>
      <text class="text-[24rpx] text-[#43CBFF]" @click="go('/packages/public/rich_text', { id: 2 })">
        《订单发布须知》
      </text>
    </view>
    <!--  -->
    <view class="fixed bottom-0 left-0 right-0 z-1">
      <view class="h-[162rpx] flex items-center justify-end gap-[20rpx] bg-[#fff] pr-[30rpx] pt-[12rpx]">
        <view class="total-price">
          <text class="text-[28rpx] text-[#ABAEB2]">
            合计：
          </text>
          <text class="price">
            ¥{{ formData.fee }}
          </text>
        </view>
        <view class="h-[80rpx] w-[254rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]" style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);">
          发布需求并支付
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demand-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.mt-10 {
  margin-top: 10rpx;
}

.mt-20 {
  margin-top: 20rpx;
}

.price-text {
  color: #ff525d;
  font-weight: bold;
}

.payment-icon {
  margin-right: 10rpx;
  display: flex;
  align-items: center;
}

.agreement-section {
  padding: 30rpx;
}

.agreement-text {
  font-size: 28rpx;
  color: #333;
}

.agreement-link {
  color: #4d80f0;
}

.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.total-price {
  font-size: 28rpx;
  color: #333;

  .price {
    color: #ff525d;
    font-size: 36rpx;
    font-weight: bold;
  }
}

:deep(.wd-button) {
  height: 80rpx;
  border-radius: 40rpx;
  padding: 0 40rpx;
}

:deep(.wd-cell__title) {
  font-size: 28rpx;
  color: #333;
}

:deep(.wd-radio__shape) {
  transform: scale(0.8);
}

:deep(.wd-checkbox__shape) {
  transform: scale(0.8);
}
</style>
