<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { useUserStore } from '@/store'
// import { go } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 筛选条件
const filters = ref({
  category: '全部',
  gender: '性别',
  singleCount: '单量',
  rating: '评分',
  hasCar: false,
})

// 旅接数据
const companions = ref([
  {
    id: 1,
    name: '冯宝宝',
    avatar: '/static/images/avatar-1.jpg',
    status: '可服务',
    statusColor: 'green',
    rating: 5.0,
    orders: 6000,
    distance: 16.8,
    tags: ['为人活泼开朗', '个性直爽大方', '会聊天找话题'],
    action: '立即下单',
    actionColor: 'blue',
    gender: 'female',
  },
  {
    id: 2,
    name: '陈子晨',
    avatar: '/static/images/avatar-2.jpg',
    status: '服务中',
    statusColor: 'red',
    availableTime: '最早可约 09:00',
    rating: 5.0,
    orders: 6000,
    distance: 16.8,
    tags: ['为人活泼开朗', '个性直爽大方', '会聊天找话题'],
    action: '预约下单',
    actionColor: 'blue',
    gender: 'male',
  },
  {
    id: 3,
    name: '绒绒豆',
    avatar: '/static/images/avatar-3.jpg',
    status: '可服务',
    statusColor: 'green',
    availableTime: '最早可约 08:00',
    rating: 5.0,
    orders: 6000,
    distance: 16.8,
    tags: ['为人活泼开朗', '个性直爽大方', '供一定的情绪价值'],
    action: '立即下单',
    actionColor: 'blue',
    gender: 'female',
  },
])

// 点击筛选
function onFilterClick(type: string) {
  // 实际应用中这里应该弹出筛选菜单
  toast.info(`点击了${type}筛选`)
}

// 点击下单
function onOrderClick(companion: any) {
  if (companion.status === '服务中') {
    toast.info('该旅接正在服务中，请预约')
  }
  else {
    // go(`/packages/order/create?companionId=${companion.id}`)
  }
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <!-- 自定义导航栏 -->
    <wd-navbar :fixed="true" :placeholder="true">
      <template #capsule>
        <view class="flex items-center">
          <view class="flex items-center">
            <text class="i-mdi-map-marker text-[32rpx] text-[#333]" />
            <text class="ml-[10rpx] text-[30rpx] text-[#333] font-medium">
              重庆
            </text>
          </view>
          <view class="ml-[20rpx] h-[60rpx] flex flex-1 items-center rounded-[30rpx] bg-white px-[20rpx]">
            <text class="i-mdi-magnify text-[32rpx] text-[#999]" />
            <text class="ml-[10rpx] text-[28rpx] text-[#999]">
              请输入您想要搜索的内容
            </text>
          </view>
        </view>
      </template>
    </wd-navbar>

    <!-- 内容区域 -->
    <view class="p-[30rpx]">
      <!-- 顶部Banner -->
      <view class="mb-[30rpx] h-[280rpx] w-full overflow-hidden rounded-[20rpx]">
        <image src="/static/images/travel-banner.jpg" mode="aspectFill" class="h-full w-full" />
      </view>

      <!-- 筛选条件 -->
      <view class="mb-[30rpx] flex items-center text-[28rpx] text-[#666] space-x-[30rpx]">
        <view class="flex items-center" @click="onFilterClick('全部')">
          <text>全部</text>
          <text class="i-mdi-chevron-down ml-[5rpx] text-[24rpx]" />
        </view>
        <view class="flex items-center" @click="onFilterClick('性别')">
          <text>性别</text>
          <text class="i-mdi-chevron-down ml-[5rpx] text-[24rpx]" />
        </view>
        <view class="flex items-center text-blue-500" @click="onFilterClick('单量')">
          <text>单量</text>
          <text class="i-mdi-chevron-down ml-[5rpx] text-[24rpx]" />
        </view>
        <view class="flex items-center" @click="onFilterClick('评分')">
          <text>评分</text>
          <text class="i-mdi-chevron-down ml-[5rpx] text-[24rpx]" />
        </view>
        <text @click="onFilterClick('带车')">
          带车
        </text>
      </view>

      <!-- 旅接列表 -->
      <view class="space-y-[30rpx]">
        <view v-for="(companion, index) in companions" :key="companion.id">
          <!-- 中间插入广告Banner -->
          <view v-if="index === 1" class="mb-[30rpx] h-[160rpx] w-full overflow-hidden rounded-[20rpx]">
            <image src="/static/images/ad-banner.jpg" mode="aspectFill" class="h-full w-full" />
          </view>

          <!-- 旅接卡片 -->
          <view class="flex rounded-[20rpx] bg-white p-[20rpx]">
            <view class="relative h-[160rpx] w-[160rpx] flex-shrink-0 overflow-hidden rounded-[15rpx]">
              <image :src="companion.avatar" mode="aspectFill" class="h-full w-full" />

              <!-- 状态标签 -->
              <view
                class="absolute left-[10rpx] top-[10rpx] rounded-[10rpx] px-[10rpx] py-[5rpx] text-[22rpx] text-white"
                :class="companion.statusColor === 'green' ? 'bg-green-500' : 'bg-red-500'"
              >
                {{ companion.status }}
              </view>

              <!-- 底部时间信息 -->
              <view
                v-if="companion.availableTime"
                class="absolute bottom-0 left-0 w-full bg-red-500 p-[5rpx] text-center text-[22rpx] text-white"
              >
                {{ companion.availableTime }}
              </view>
            </view>

            <view class="ml-[20rpx] flex-1">
              <view class="flex items-center justify-between">
                <view class="flex items-center">
                  <text class="text-[30rpx] text-[#333] font-medium">
                    {{ companion.name }}
                  </text>
                  <text
                    class="ml-[10rpx] text-[28rpx]"
                    :class="companion.gender === 'male' ? 'i-mdi-gender-male text-blue-500' : 'i-mdi-gender-female text-pink-500'"
                  />
                  <view v-if="companion.gender === 'male'" class="ml-[5rpx] rounded-[10rpx] bg-blue-100 px-[8rpx] py-[2rpx] text-[20rpx] text-blue-500">
                    认证
                  </view>
                </view>
                <text class="text-[26rpx] text-[#999]">
                  {{ companion.distance }}km
                </text>
              </view>

              <view class="my-[10rpx] flex items-center">
                <text class="border border-blue-500 rounded-[5rpx] px-[8rpx] py-[2rpx] text-[22rpx] text-blue-500">
                  {{ companion.rating }}分｜已服务{{ companion.orders }}+单
                </text>
              </view>

              <view class="text-[24rpx] text-[#999] leading-[35rpx]">
                {{ companion.tags.join('，') }}
              </view>

              <view class="mt-[15rpx] flex justify-end">
                <wd-button
                  size="small"
                  custom-class="!bg-blue-500 !text-white !rounded-[20rpx]"
                  @click="onOrderClick(companion)"
                >
                  {{ companion.action }}
                </wd-button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
