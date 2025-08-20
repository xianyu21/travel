<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "发布需求"
  }
}
</route>

<script setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getServiceDetail, getServiceList, getTravelPunishOrder, getTravelTrade } from '@/api/index'
import ServiceProjectPicker from '@/components/ServiceProjectPicker.vue'
import ServiceTimePicker from '@/components/ServiceTimePicker.vue'
import { useUserStore } from '@/store'
import { back, go } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const isCheck = ref(false)

// 表单数据
const formData = ref({
  serviceTimeStart: '', // ?
  couponRecordId: '', // ?
  serviceCount: 1,
  addrId: '',
  address: '',
  serviceId: '',
  serviceName: '',
  durationId: '',
  durationName: '',
  gender: '',
  hasCar: '', // 是否带车
  payType: '', // 支付方式 1微信  2支付宝
  orderType: 2,
})
const payInfo = ref({
  estimateFare: '',
  maxServiceTime: '',
  totalMoney: 0,
  totalPay: 0,
})

const serviceList = ref([])
const durationList = ref([])
const addressList = ref([])
const couponInfo = ref({
  couponName: '',
  discount: '',
})
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

// 服务项目选择器相关
const showProjectPicker = ref(false)

// 选择服务项目
function selectServiceProject() {
  showProjectPicker.value = true
}

// 关闭项目选择器
function closeProjectPicker() {
  showProjectPicker.value = false
}

// 确认项目选择
function confirmProjectSelection(projectData) {
  formData.value.serviceProject = projectData.names
  showProjectPicker.value = false
  calc() // 项目选择后重新计算价格
}

// 选择优惠券
function selectCoupon() {
  toast.show('选择优惠券')
}

// 提交订单
function submitOrder() {
  console.log('------------------------------')
  console.log(formData.value)
  console.log('------------------------------')
  if (!isCheck.value) {
    toast.show('请先阅读并同意《订单发布须知》')
    return
  }
  if (!formData.value.serviceTimeStart) {
    toast.show('请选择服务时间')
    return
  }
  if (!formData.value.serviceId) {
    toast.show('请选择服务')
    return
  }

  if (!formData.value.durationId) {
    toast.show('请选择服务时长')
    return
  }
  if (!formData.value.addrId) {
    toast.show('请选择地址')
    return
  }
  if (!formData.value.gender) {
    toast.show('请选择性别')
    return
  }
  if (!formData.value.hasCar) {
    toast.show('请选择是否有车')
    return
  }
  if (!formData.value.payType) {
    toast.show('请选择支付方式')
    return
  }

  message.confirm({
    title: '确认提交',
    msg: '是否确认提交订单？',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  }).then(() => {
    getTravelPunishOrder({
      ...formData.value,
    }).then((res) => {
      console.log(res)
      toast.show('订单提交成功')
      setTimeout(() => {
        back()
      }, 1500)
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    // 取消操作
    console.log(err)
  })
}

function onProjectPicker() {
  const data = serviceList.value.filter(el => el.serviceId == formData.value.serviceId)
  formData.value.serviceName = data[0].serviceName
  showProjectPicker.value = false
  getServiceDetail({
    serviceId: formData.value.serviceId,
  }).then((res) => {
    durationList.value = res.data
  })
}
//
const show1 = ref(false)
function onDuration() {
  const data = durationList.value.filter(el => el.durationId === formData.value.durationId)
  formData.value.durationName = data[0].hour
  show1.value = false
  calc()
}
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
function genderChange(e) {
  formData.value.gender = e
  calc()
}
function hasCarChange(e) {
  formData.value.hasCar = e
  calc()
}
onLoad(async () => {
  const res = await getServiceList()
  serviceList.value = res.data
  calc()
  uni.$on('updataAddress', (data) => {
    addressList.value = data
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
</script>

<template>
  <view class="bg-base-007 pb-[162rpx]">
    <ServiceTimePicker :show="showTimePicker" @close="closeTimePicker" @confirm="confirmTimeSelection" />
    <!-- <ServiceProjectPicker
      :show="showProjectPicker" :multiple="true" @close="closeProjectPicker"
      @confirm="confirmProjectSelection"
    /> -->
    <wd-navbar
      title="发布需求" left-arrow custom-style="background-color: transparent !important;" :placeholder="true"
      :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between" @click="selectServiceTime">
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
    </view>
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
      <view class="flex items-center justify-between" @click="selectServiceProject">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务项目
        </text>
        <view class="flex items-center">
          <text class="text-[28rpx] text-[#000000]">
            {{ formData.serviceName || '' }}
          </text>
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>

      <view v-if="formData.serviceId" class="mt-[50rpx] flex items-center justify-between gap-[30rpx]" @click="show1 = true">
        <text class="text-[28rpx] text-[#000000] font-bold">
          服务时长
        </text>
        <view class="flex flex-1 items-center justify-end">
          <text v-if="formData?.durationName" class="text-[28rpx] text-[#000000]">
            {{ formData?.durationName }}小时
          </text>
          <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
      </view>
      <view
        class="mt-[50rpx] flex items-center justify-between gap-[30rpx]"
        @click="go('/packages/mine/address', { type: 2 })"
      >
        <text class="text-[28rpx] text-[#000000] font-bold">
          旅接地点
        </text>
        <view class="flex flex-1 items-center justify-end">
          <text class="text-[28rpx] text-[#000000]">
            {{ formData?.address }}
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
            ￥{{ payInfo.totalMoney }}
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
          <view class="flex items-center gap-[10rpx]" @click="genderChange('男')">
            <wd-icon v-if="formData.gender === '男'" name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon v-else name="circle" size="40rpx" color="#0669EB" />
            <text class="text-[28rpx] text-[#333333]">
              男
            </text>
          </view>
          <view class="flex items-center gap-[10rpx]" @click=" genderChange('女')">
            <wd-icon v-if="formData.gender === '女'" name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon v-else name="circle" size="40rpx" color="#0669EB" />
            <text class="text-[28rpx] text-[#333333]">
              女
            </text>
          </view>
        </view>
      </view>
      <view class="mt-[50rpx] flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
          是否带车
        </text>
        <view class="flex items-center gap-[30rpx]">
          <view class="flex items-center gap-[10rpx]" @click="hasCarChange('1')">
            <wd-icon v-if="formData.hasCar === '1'" name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon v-else name="circle" size="40rpx" color="#0669EB" />
            <text class="text-[28rpx] text-[#333333]">
              是
            </text>
          </view>
          <view class="flex items-center gap-[10rpx]" @click="hasCarChange('-1')">
            <wd-icon v-if="formData.hasCar === '-1'" name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon v-else name="circle" size="40rpx" color="#0669EB" />
            <text class="text-[28rpx] text-[#333333]">
              否
            </text>
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
            ￥{{ payInfo.estimateFare }}
          </text>
        </view>
      </view>
    </view>
    <!--  -->
    <view
      class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]"
      @click="go('/packages/mine/coupon_available')"
    >
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#000000] font-bold">
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
    <!--  -->
    <view class="mt-[130rpx] flex items-center justify-center">
      <wd-checkbox v-model="isCheck" size="large" checked-color="#0669EB" />
      <text class="text-[24rpx] text-[#6E6E6E]">
        已阅读并同意
      </text>
      <text class="text-[24rpx] text-[#43CBFF]" @click="go('/packages/public/rich_text', { adType: 7 })">
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
            ¥{{ payInfo.totalPay }}
          </text>
        </view>
        <view
          class="h-[80rpx] w-[254rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]"
          style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);" @click="submitOrder"
        >
          发布需求并支付
        </view>
      </view>
    </view>
    <!--  -->
    <wd-popup v-model="showProjectPicker" position="bottom" custom-style="border-radius:32rpx 32rpx 0 0;">
      <view class="flex flex-col p-[30rpx]">
        <view class="text-[28rpx] text-[#333333] font-bold">
          服务项目
        </view>
        <wd-radio-group v-model="formData.serviceId" cell shape="button">
          <wd-radio v-for="item in serviceList" :key="item.id" :value="item.serviceId">
            {{ item.serviceName }}
          </wd-radio>
        </wd-radio-group>
        <view class="mt-[20rpx] flex">
          <view
            class="ml-[20rpx] h-[80rpx] w-full rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]"
            style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);" @click="onProjectPicker"
          >
            确定
          </view>
        </view>
      </view>
    </wd-popup>
    <wd-popup v-model="show1" position="bottom" custom-style="border-radius:32rpx 32rpx 0 0;">
      <view class="flex flex-col p-[30rpx]">
        <view class="text-[28rpx] text-[#333333] font-bold">
          服务项目
        </view>
        <wd-radio-group v-model="formData.durationId" cell shape="button">
          <wd-radio v-for="item in durationList" :key="item.id" :value="item.durationId">
            {{ item.hour }}小时
          </wd-radio>
        </wd-radio-group>
        <view class="mt-[20rpx] flex">
          <view
            class="ml-[20rpx] h-[80rpx] w-full rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]"
            style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);" @click="onDuration"
          >
            确定
          </view>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-radio.is-button.is-checked .wd-radio__label) {
  background: #bde2ff;
}

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
