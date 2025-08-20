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
const gender = ref('')
const hasCar = ref('')
// 1 接单量从少到多  2接单量从多到少  3评分从低到高 4评分从高到低
const orderType = ref()
async function queryList(pageNo, pageSize) {
  const res = await getTravelList({
    page: {
      page: 1,
      limit: 10,
    },
    gender: gender.value,
    hasCar: hasCar.value,
    orderType: orderType.value,
  })
  paging.value.complete(res.data.list)
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
    <!-- <view class="space-y-[30rpx]">
      <view v-for="(companion, index) in dataList" :key="companion.id">

      </view>
    </view> -->
    <view class="flex flex-col gap-[32rpx]">
      <view
        v-for="travel in dataList"
        :key="travel.id" class="mx-[30rpx]"
        @click="go('/packages/travel/details', { receiveUserId: travel.receiveUserId })"
      >
        <view class="flex gap-[18rpx] rounded-[20rpx] bg-white p-[30rpx]">
          <view class="relative w-[190rpx] overflow-hidden">
            <view
              v-if="travel?.isService === 1"
              class="absolute left-0 top-0 z-1 h-[36rpx] w-[86rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
              style="background: linear-gradient( 268deg, #FFCE8E 0%, #FFA64D 100%);border-radius:  12rpx 0rpx ;"
            >
              可服务
            </view>
            <view
              v-else
              class="absolute left-0 top-0 z-1 h-[36rpx] w-[86rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
              style="background: linear-gradient( 92deg, #FFB38E 0%, #FF774D 100%);border-radius:  12rpx 0rpx ;"
            >
              服务中
            </view>
            <image :src="travel.headUrl" mode="aspectFill" class="travel-avatar h-[190rpx] w-full rounded-[20rpx]" />
            <view
              class="absolute bottom-0 left-0 h-[36rpx] w-full text-center text-[20rpx] text-[#FFFFFF]"
              style="background: linear-gradient( 268deg, #FF8E99 0%, #FF4D54 100%);border-radius:0 0 20rpx 20rpx;"
            >
              立享服务
            </view>
          </view>
          <view class="w-full flex flex-1 flex-col justify-between">
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-[10rpx]">
                <text class="text-[32rpx] text-[#191A1D] text-[#191A1D]">
                  {{ travel.realName }}
                </text>
                <image
                  v-if="travel.gender == '女'" src="@img/girl.png" mode="scaleToFill"
                  class="h-[32rpx] w-[32rpx]"
                />
                <image
                  v-if="travel.gender == '男'" src="@img/boy.png" mode="scaleToFill"
                  class="h-[32rpx] w-[32rpx]"
                />
                <image v-if="travel.hasCar === 1" src="@img/car.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]" />
              </view>
              <view>
                <image src="@img/img-007.png" mode="scaleToFill" class="h-[22rpx] w-[22rpx]" />
                <text class="text-[24rpx] text-[#333233]">
                  {{ travel.distance || 0 }}km
                </text>
              </view>
            </view>
            <view class="bg-009 h-[40rpx] pl-[20rpx] text-[20rpx] text-[#555555] leading-[40rpx]">
              {{ travel.score || 0 }}分 I 已服务{{ travel.receiveCount || 0 }}单
            </view>
            <view class="flex items-center justify-between">
              <view class="text-[20rpx] text-[#787878]">
                {{ travel?.introduction }}
              </view>
              <view
                class="h-[52rpx] w-[140rpx] rounded-full text-center text-[24rpx] text-[#fff] leading-[52rpx]"
                style="background: linear-gradient( 90deg, #078DF4 0%, #066BEB 100%);" @click.stop="onPlace(travel)"
              >
                立即下单
              </view>
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
