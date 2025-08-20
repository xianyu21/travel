<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script setup>
import dayjs from 'dayjs'
import { useMessage, useToast } from 'wot-design-uni'
import { getComplete, getContinueOrder, getContinueTrade, getOrderList, getServiceDetail, getTravelRefund } from '@/api/index'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const tab = ref(0)
const tabs = ref([
  {
    type: '0',
    title: '全部',

  },
  {
    type: '3',
    title: '待接单',
  },
  {
    type: '4',
    title: '已接单',
  },
  {
    type: '5',
    title: '已出发',
  },
  {
    type: '6',
    title: '已到达',
  },
  {
    type: '7',
    title: '开始服务',
  },
  {
    type: '8',
    title: '完成',
  },
])
const paging = ref(null)
const dataList = ref([])
const status = ref('')
function handleTabsChange(e) {
  tab.value = e.index
  status.value = e.name
  paging.value.reload()
}
async function queryList(pageNo, pageSize) {
  const res = await getOrderList({
    page: {
      page: pageNo,
      limit: pageSize,
    },
    status: status.value === '0' ? '' : status.value,
  })
  paging.value.complete(res.data.list)
}

// 处理订单点击
function handleOrderClick(order) {
  go('/packages/order/details', { orderNo: order.orderNo })
}

// 服务完成
async function handleComplete(order) {
  const res = await getComplete({
    orderNo: order.orderNo,
  })
  if (res.code === 200) {
    toast.success('服务已完成')
    paging.value.reload()
  }
}

// 申请退款
async function handleRefund(order) {
  const ret = await message.confirm({
    msg: '确认申请退款吗？',
    title: '提示',
  })
  if (ret.action === 'confirm') {
    const res = await getTravelRefund({
      orderNo: order.orderNo,
    })
    if (res.code === 200) {
      // toast.success('退款完成')
      message.alert({
        msg: '你好,您的订单状态为开始服务,现在申请退款的话,我们将扣除往返车费哟剩余服务费用会在约2-7个工作日内原路返回给您,谢谢配合!',
        title: '申请退款',
      })
      paging.value.reload()
    }
  }
}

// 续单服务
const show = ref(false)
const durationList = ref([])
const continues = ref({
  durationId: '',
  serviceId: '',
  receiveUserId: '',
  payType: 3,
  continueTimeStart: '',
  continueTimeEnd: '',
  orderNo: '',
  serviceCount: 1,
})

async function handleContinue(order) {
  continues.value.serviceId = order.serviceId
  continues.value.receiveUserId = order.receiveUserId
  continues.value.orderNo = order.orderNo
  console.log('------------------------------')
  console.log(order)
  console.log('------------------------------')
  const res = await getServiceDetail({
    serviceId: order.serviceId,
  })
  if (res.code === 200) {
    durationList.value = res.data
    show.value = true
  }
}

//
const showTimePicker = ref(false)
function handleShowTimePicker() {
  show.value = false
  showTimePicker.value = true
}
function confirmTimeSelection(timeData) {
  console.log('------------------------------')
  console.log(`${timeData.fullTime}` + `:00`)
  console.log('------------------------------')
  continues.value.continueTimeStart = `${timeData.fullTime}` + `:00`
  showTimePicker.value = false
  show.value = true
  continueTimeEnd()
}
function onSubmit() {
  if (!continues.value.continueTimeStart) {
    return toast.show('请选择服务时间')
  }
  if (!continues.value.durationId) {
    return toast.show('请选择服务时长')
  }
  const data = durationList.value.filter(el => el.durationId === continues.value.durationId)
  const hours = data[0].hour * continues.value.serviceCount
  continues.value.continueTimeEnd = dayjs(continues.value.continueTimeStart).add(hours, 'hour').format('YYYY-MM-DD HH:mm:ss')
  getContinueOrder({ ...continues.value }).then((res) => {
    if (res.code === 200) {
      toast.show('续单成功')
      show.value = false
      paging.value.reload()
    }
  })
}
// getContinueTrade
const cost = ref(0)
function onContiueTrade() {
  getContinueTrade({ ...continues.value }).then((res) => {
    if (res.code === 200) {
      cost.value = res.data.totalPay
    }
  })
}
function onChangeDurationId() {
  continueTimeEnd()
}
function onChangeServiceCount() {
  continueTimeEnd()
}
function continueTimeEnd() {
  if (continues.value.continueTimeStart && continues.value.durationId) {
    const data = durationList.value.filter(el => el.durationId === continues.value.durationId)
    const hours = data[0].hour * continues.value.serviceCount
    continues.value.continueTimeEnd = dayjs(continues.value.continueTimeStart).add(hours, 'hour').format('YYYY-MM-DD HH:mm:ss')
    onContiueTrade()
  }
}
// 再来一单
function handleReorder(order) {
  // 实现再来一单的逻辑
  go('/packages/order/confirm', { reorder: true, serviceId: order.serviceId })
}

// 立即评价
function handleEvaluate(order) {
  // 实现立即评价的逻辑
  go('/packages/order/evaluate', { id: order.id })
}
</script>

<template>
  <view class="bg-base-order">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-navbar
          title="我的订单" custom-style="background-color: transparent !important;" left-arrow :placeholder="true"
          :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
        />
        <wd-tabs
          v-model="tab" auto-line-width custom-style="background-color: transparent !important;"
          @click="handleTabsChange"
        >
          <wd-tab v-for="(item, index) in tabs" :key="index" :title="`${item.title}`" :name="item.type" />
        </wd-tabs>
      </template>
      <view class="mx-[30rpx] mt-[34rpx] flex flex-col gap-[30rpx]">
        <ol-order-item
          v-for="item in dataList" :key="item.id" :order="item" @click="handleOrderClick"
          @complete="handleComplete" @refund="handleRefund" @continue="handleContinue" @reorder="handleReorder"
          @evaluate="handleEvaluate"
        />
      </view>

      <!--  -->
      <wd-popup
        v-model="show" position="bottom" closable
        custom-style="border-radius:32rpx 32rpx 0 0;background: linear-gradient( 180deg, #F8F8F8 0%, #EAF6FF 100%);"
        :z-index="99999" :safe-area-inset-bottom="true" @close="show = false"
      >
        <view class="px-[40rpx] pt-[40rpx] text-[32rpx] text-[#000000] font-bold">
          续单服务
        </view>
        <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
          <view class="flex items-center justify-between" @click="handleShowTimePicker">
            <text class="text-[28rpx] text-[#000000] font-bold">
              续单开始时间
            </text>
            <view class="flex items-center">
              <text class="text-[28rpx] text-[#000000]">
                {{ continues.continueTimeStart }}
              </text>
              <wd-icon name="chevron-right" size="28rpx" color="#717171" />
            </view>
          </view>
        </view>
        <view class="mx-[30rpx] mt-[30rpx] rounded-[12rpx] bg-[#fff]">
          <view class="flex flex-col p-[30rpx]">
            <view class="text-[28rpx] text-[#333333] font-bold">
              续单时长
            </view>
            <wd-radio-group v-model="continues.durationId" cell shape="button" @change="onChangeDurationId">
              <wd-radio v-for="item in durationList" :key="item.id" :value="item.durationId">
                {{ item.hour }}小时
              </wd-radio>
            </wd-radio-group>
          </view>
        </view>
        <view class="mx-[30rpx] bg-[#fff] p-[30rpx]">
          <view class="flex items-center justify-between">
            <text class="text-[28rpx] text-[#000000] font-bold">
              购买数量
            </text>
            <wd-input-number v-model="continues.serviceCount" @change="onChangeServiceCount" />
          </view>
        </view>
        <view class="mx-[30rpx] overflow-hidden bg-[#fff]">
          <ol-paymentPicker v-model="continues.payType" :disabled-payments="[1, 2]" />
        </view>
        <view class="mx-[30rpx] mb-[30rpx] flex items-center justify-end bg-[#fff] px-[30rpx] pb-[30rpx]">
          <view class="flex items-end">
            <text class="text-[28rpx] text-[#ABAEB2]">
              合计：
            </text>
            <text class="text-price text-[44rpx] text-[#FF0011]">
              {{ cost }}
            </text>
          </view>
          <view
            class="ml-[20rpx] h-[80rpx] w-[254rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]"
            style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);" @click="onSubmit"
          >
            确认下单
          </view>
        </view>
      </wd-popup>
      <!--  -->
      <ServiceTimePicker :show="showTimePicker" @close="showTimePicker = true" @confirm="confirmTimeSelection" />
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>
.bg-base-order {
  background: linear-gradient(#5b97fb 0%, #fafafa 35%, #f6f6f6 100%);
  width: 100%;
  min-height: 100vh;
}

:deep(.wd-navbar__arrow) {
  color: #fff !important;
}

:deep(.wd-navbar__title) {
  color: #fff !important;
}

:deep(.wd-tabs) {
  background: transparent !important;
}

:deep(.wd-tabs__nav) {
  background: transparent !important;
}

:deep(.wd-tabs__nav-item) {
  color: #fff !important;
  font-size: 28rpx;
}

:deep(.wd-tabs__nav-item.is-active) {
  color: #fff !important;
  font-size: 28rpx;
}

:deep(.wd-tabs__line) {
  //   background: #42cbff ;
  background: #fff !important;
}
</style>
