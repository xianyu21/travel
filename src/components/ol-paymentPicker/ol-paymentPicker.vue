<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  singlePayment: {
    type: [String, Number],
    default: null,
  },
  disabledPayments: {
    type: Array,
    default: () => [],
  },
  scene: {
    type: String,
    default: 'payment', // 'payment' 或 'recharge'
  },
})

const emit = defineEmits(['update:modelValue'])

const allPaymentOptions = [
  {
    id: 1,
    name: '微信支付',
    icon: '/static/images/wx.png',
    style: 'width: 36rpx; height: 32rpx;',
    scenes: ['payment', 'recharge'],
  },
  {
    id: 2,
    name: '支付宝支付',
    icon: '/static/images/zfb.png',
    style: 'width: 34.53rpx; height: 34.53rpx;',
    scenes: ['payment', 'recharge'],
  },
  {
    id: 3,
    name: '余额支付',
    icon: '/static/images/yue.png',
    style: 'width: 36rpx; height: 36rpx;',
    scenes: ['payment'], // 余额支付只在支付场景下显示
  },
]

// 根据场景过滤支付选项
const paymentOptions = computed(() => {
  return allPaymentOptions.filter(option => option.scenes.includes(props.scene))
})

function isPaymentDisabled(id) {
  return props.disabledPayments.includes(id)
}

function selectPayment(id) {
  // 如果支付方式被禁用，则不进行选择
  if (isPaymentDisabled(id))
    return
  emit('update:modelValue', id)
}
</script>

<template>
  <view>
    <!-- <view v-if="props.scene === 'recharge'" class="mx-[30rpx] mt-[20rpx] text-[32rpx] font-bold text-[#333333]">
      充值方式
    </view>
    <view v-else class="mx-[30rpx] mt-[20rpx] text-[32rpx] font-bold text-[#333333]">
      支付方式
    </view> -->
    <view
      v-for="item in paymentOptions" :key="item.id"
      class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]" :class="[{ 'opacity-50': isPaymentDisabled(item.id) }]"
      @click="selectPayment(item.id)"
    >
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <image :src="item.icon" mode="scaleToFill" class="mr-[16rpx]" :style="[item.style]" />
          <view>
            <text class="text-[28rpx] text-[#000000] font-bold">
              {{ item.name }}
            </text>
            <text v-if="isPaymentDisabled(item.id)" class="block text-[24rpx] text-[#999999]">
              暂时不可用
            </text>
          </view>
        </view>
        <view class="flex items-center">
          <wd-icon v-if="modelValue === item.id && !isPaymentDisabled(item.id)" name="check-circle-filled" size="40rpx" color="#0669EB" />
          <wd-icon v-else-if="!isPaymentDisabled(item.id)" name="circle" size="40rpx" color="#0669EB" />
          <wd-icon v-else name="circle" size="40rpx" color="#CCCCCC" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
