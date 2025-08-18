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
import { getComplete, getOrderList, getTravelRefund } from '@/api/index'
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
function handleContinue(order) {
  // 实现续单服务的逻辑
  toast.success('续单服务处理中...')
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
          v-for="item in dataList"
          :key="item.id"
          :order="item"
          @click="handleOrderClick"
          @complete="handleComplete"
          @refund="handleRefund"
          @continue="handleContinue"
          @reorder="handleReorder"
          @evaluate="handleEvaluate"
        />
      </view>
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
