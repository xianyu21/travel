<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useQueue, useToast } from 'wot-design-uni'
import { getByType, getTravelList } from '@/api/index'
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
const paging = ref(null)
const dataList = ref([])
const gender = ref()
const hasCar = ref(0)
// 1 接单量从少到多  2接单量从多到少  3评分从低到高 4评分从高到低
const orderType = ref()
function queryList(pageNo, pageSize) {
  console.log('------------------------------')
  console.log({
    page: {
      page: pageNo,
      limit: pageSize,
    },
    gender: gender.value,
    hasCar: hasCar.value,
    orderType: orderType.value,
  })
  console.log('------------------------------')
  // const res = await getTravelList({
  //   page: {
  //     page: 1,
  //     limit: 10,
  //   },
  //   longitude: '',
  //   latitude: '',
  //   gender: '',
  //   hasCar: '',
  //   orderType: '',
  // })
  paging.value.complete(companions.value)
}
const swiperList1 = ref([])
onLoad(async () => {
  // 模拟请求数据
  const res = await getByType({
    adType: 1,
  })
  swiperList1.value = res.data
})
const show = ref(false)
const actions = ref([
  {
    name: '男',
  },
  {
    name: '女',
  },
  {
    name: '不选择',
  },
])
function select({ item, index }) {
  if (item.name == '不选择') {
    gender.value = ''
  }
  else {
    gender.value = item.name
  }
  paging.value.reload()
}
function onGender() {
  show.value = true
}
function onHasCar() {
  if (hasCar.value == 0) {
    hasCar.value = 1
  }
  else {
    hasCar.value = 0
  }
  paging.value.reload()
}

const { closeOutside } = useQueue()
const value1 = ref<number>(0)
const value2 = ref<number>(0)
const value3 = ref<number>(0)
const option1 = ref<Record<string, any>[]>([
  { label: '全部商品', value: 0 },
  { label: '新款商品', value: 1 },
  { label: '活动商品', value: 2 },
])
const option2 = ref<Record<string, any>[]>([
  { label: '综合', value: 0 },
  { label: '销量', value: 1 },
  { label: '上架时间', value: 2 },
])

function handleChange1({ value }) {
  console.log(value)
  if (value == 0) {
    orderType.value = ''
  }
  else if (value == 1) {
    orderType.value = 2
  }
  else {
    orderType.value = 1
  }
  value1.value = value
  value2.value = 0
  paging.value.reload()
}
function handleChange2({ value }) {
  console.log(value)
  if (value == 0) {
    orderType.value = ''
  }
  else if (value == 1) {
    orderType.value = 4
  }
  else {
    orderType.value = 3
  }
  value2.value = value
  value1.value = 0
}
</script>

<template>
  <z-paging ref="paging" v-model="dataList" bg-color="#f5f5f5" @query="queryList">
    <template #top>
      <wd-navbar :bordered="false" custom-style="background-color: transparent !important;">
        <template #capsule>
          <view class="flex items-center">
            <view class="location felx items-center gap-[12rpx]">
              <image src="@img/img-030.png" mode="scaleToFill" class="h-[29.36rpx] w-[26.42rpx]" />
              <text class="text-[28rpx] text-[#333333]">
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
      <view class="mx-[30rpx] mt-[30rpx]">
        <wd-swiper :list="swiperList1" value-key="imgUrls" height="202rpx" custom-class="bg-[#eaeaea]" />
      </view>
      <view class="mx-[30rpx] flex gap-[30rpx] bg-[#f5f5f5]" @click="closeOutside">
        <!-- <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="option1"/>
        </wd-drop-menu> -->
        <view class="flex items-center" :class="{ 'is-line': !!gender }" @click="onGender">
          <text class="text-[24rpx]">
            性别
          </text>
          <wd-icon name="arrow-down" color="#787878" size="24rpx" />
        </view>
        <wd-sort-button v-model="value1" allow-reset title="单量" @change="handleChange1" />
        <wd-sort-button v-model="value2" allow-reset title="评分" @change="handleChange2" />
        <view class="flex items-center" :class="{ 'is-line': hasCar == 1 }" @click="onHasCar">
          <text class="text-[24rpx]">
            带车
          </text>
          <wd-icon name="arrow-down" color="#f5f5f5" size="24rpx" />
        </view>
      </view>
    </template>
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
                <view
                  v-if="companion.gender === 'male'"
                  class="ml-[5rpx] rounded-[10rpx] bg-blue-100 px-[8rpx] py-[2rpx] text-[20rpx] text-blue-500"
                >
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
                size="small" custom-class="!bg-blue-500 !text-white !rounded-[20rpx]"
                @click="onOrderClick(companion)"
              >
                {{ companion.action }}
              </wd-button>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <wd-action-sheet v-model="show" :actions="actions" @close="show = false" @select="select" />
  </z-paging>
</template>

<style lang="scss" scoped>
//
.is-line {
  position: relative;
}

.is-line::after {
  position: absolute;
  content: '';
  width: 19px;
  height: 3px;
  bottom: 6px;
  left: calc(50% - 5px);
  transform: translate(-50%, 0);
  background: #4d80f0;
  border-radius: 12rpx;
  transition: opacity 0.15s;
  // opacity: 0;
}
</style>
