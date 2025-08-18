<route lang="jsonc" type="home">
{
  "layout": "tabbar",
  "style": {
    "navigationStyle": "custom",
    "navigationBarTitleText": "首页"
  }
}
</route>

<script lang="ts" setup>
import { getByType, getServiceDetail, getServicePlace, getSpotPage, getTravelList } from '@/api/index'
import { useUserStore } from '@/store'
import { go } from '@/utils/tools'

defineOptions({
  name: 'Home',
})
const userStore = useUserStore()
const safeAreaInsets = ref<UniApp.SafeAreaInsets | null>(null)

onLoad(() => {
  uni.getSystemInfo({
    success: (res) => {
      safeAreaInsets.value = res.safeAreaInsets || null
    },
  })
})

const featuredSpots = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Spot1',
    title: '大城小巷 | 寻觅美食',
    description: '寻找城市深处的美味，体验地道风情',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Spot2',
    title: '我在重庆 | 渝中区',
    description: '重庆渝中区，感受山城魅力',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Spot3',
    title: '重庆CBD中心',
    description: '重庆的现代化都市风貌',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150/FFFF33/000000?text=Spot4',
    title: '嘉陵江畔',
    description: '嘉陵江畔风光，宁静而美好',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/150/FF33FF/FFFFFF?text=Spot5',
    title: '解放碑步行街',
    description: '重庆地标，购物与美食天堂',
  },
])

const recommendedTravel = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Travel1',
    name: '冯宝宝',
    rating: 5.0,
    services: '已服务6000+单',
    distance: '16.8km',
    description: '为人活泼开朗，个性自信大方，会帮忙拍照，1...',
    tags: ['可服务'],
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100/33FF57/FFFFFF?text=Travel2',
    name: '陈子墨',
    rating: 5.0,
    services: '已服务6000+单',
    distance: '16.8km',
    description: '为人活泼开朗，个性自信大方，会帮忙拍照，1...',
    tags: ['最旱可约09:00'],
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/100/3357FF/FFFFFF?text=Travel3',
    name: '绒绒豆',
    rating: 5.0,
    services: '已服务6000+单',
    distance: '16.8km',
    description: '为人活泼开朗，个性自信大方，会帮忙拍照，1...',
    tags: ['可服务'],
  },
])

function navigateToSearch() {
  uni.showToast({
    title: '跳转到搜索页',
    icon: 'none',
  })
}

function navigateToDetail(id: number) {
  uni.showToast({
    title: `查看详情: ${id}`,
    icon: 'none',
  })
}
const spotList = ref([])
const travelList = ref([])
async function init() {
  const res = await getTravelList({
    page: {
      page: 1,
      limit: 10,
    },
    longitude: '',
    latitude: '',
    gender: '',
    hasCar: '',
    orderType: '',
  })
  console.log('------------------------------')
  console.log(res)
  console.log('------------------------------')
  travelList.value = res.data.list
}
const show = ref(false)
const value = ref(1)
const swiperList1 = ref([])
const swiperList2 = ref([])
onLoad(async () => {
  getSpotPage({
    page: {
      page: 1,
      limit: 10,
    },
  }).then((res: any) => {
    spotList.value = res.data.list
  })
  init()
  const res = await getByType({
    adType: 1,
  })
  swiperList1.value = res.data
  const ret = await getByType({
    adType: 2,
  })
  swiperList2.value = ret.data
  console.log('------------------------------')
  console.log(ret)
  console.log('------------------------------')
})
async function onPlace(travel) {
  console.log('------------------------------')
  console.log(travel)
  console.log('------------------------------')
  const res = await getServicePlace({
    receiveUserId: travel.receiveUserId,
  })
  console.log('------------------------------')
  console.log(res)
  console.log('------------------------------')
  const ret = await getServiceDetail({
    serviceId: res.data[0].serviceId,
  })
  show.value = true
}
function onNext(e) {
  console.log('------------------------------')
  console.log(e)
  console.log('------------------------------')
  show.value = false
  go('/packages/order/confirm', {
    durationId: '95c93b156dc14c0e9efb34398c8e476c',
    serviceCount: 1,
    serviceId: '031ef90569314394b604ef5b367bbffa',
    serviceName: '陪玩陪拍',
    receiveUserId: '613f35c0a34e4da6aceab895611aac83',
    receiveUserName: '夜未央',
    hours: 4,
  })
}
</script>

<template>
  <view class="home-container bg-[#FAFAFA]" :style="{ paddingTop: `${safeAreaInsets?.top || 0}px` }">
    <!-- 顶部导航栏 -->
    <view class="top-bar">
      <view class="location felx items-center gap-[12rpx]">
        <image src="@img/img-030.png" mode="scaleToFill" class="h-[29.36rpx] w-[26.42rpx]" />
        <text class="text-[28rpx] text-[#333333]">
          重庆
        </text>
      </view>
      <view class="search-input" @click="navigateToSearch">
        <text class="i-carbon-search mr-1 text-lg" />
        <text class="placeholder">
          请输入您想要搜索的内容
        </text>
      </view>
    </view>
    <view class="mx-[30rpx]">
      <!-- <image src="" mode="scaleToFill" class="h-[202rpx] w-full rounded-[20rpx] bg-[#eaeaea]" /> -->
      <wd-swiper :list="swiperList1" value-key="imgUrls" height="202rpx" custom-class="bg-[#eaeaea]" />
    </view>
    <!-- 热门功能 -->
    <view class="hot-features">
      <view class="feature-item" @click="go('/packages/home/travel_guide')">
        <image src="@img/img-001.png" mode="scaleToFill" class="h-[86rpx] w-[86rpx]" />
        <text class="mt-[14rpx] text-[24rpx] text-[#747474]">
          游玩攻略
        </text>
      </view>
      <view class="feature-item" @click="go('/packages/home/scenic_mine')">
        <image src="@img/img-002.png" mode="scaleToFill" class="h-[86rpx] w-[86rpx]" />
        <text class="mt-[14rpx] text-[24rpx] text-[#747474]">
          我的景点
        </text>
      </view>
      <view class="feature-item">
        <image src="@img/img-003.png" mode="scaleToFill" class="h-[86rpx] w-[86rpx]" />
        <text class="mt-[14rpx] text-[24rpx] text-[#747474]">
          收藏旅接
        </text>
      </view>
      <view class="feature-item">
        <image src="@img/img-004.png" mode="scaleToFill" class="h-[86rpx] w-[86rpx]" />
        <text class="mt-[14rpx] text-[24rpx] text-[#747474]">
          旅接入驻
        </text>
      </view>
    </view>
    <view class="mx-[30rpx] text-[32rpx] text-[#333333] font-bold">
      热门推荐
    </view>
    <view class="mx-[30rpx] mt-[30rpx]">
      <div class="grid grid-flow-col grid-rows-3 gap-[28rpx]">
        <div
          class="col-span-2 row-span-6 h-[352rpx] flex items-center justify-center rounded-[16rpx] bg-[#eaeaea] text-xl font-bold"
        >
          热门景点
        </div>
        <div class="row-span-3 h-[162rpx] flex items-center justify-center rounded-[16rpx] bg-[#eaeaea]">
          特色美食
        </div>
        <div class="row-span-3 h-[162rpx] flex items-center justify-center rounded-[16rpx] bg-[#eaeaea]">
          文化体验
        </div>
      </div>
    </view>
    <view class="mx-[30rpx] mt-[30rpx]">
      <image :src="swiperList2[0].imgUrls" mode="scaleToFill" class="h-[154rpx] w-full rounded-[20rpx] bg-[#eaeaea]" />
    </view>
    <view class="mx-[30rpx] mt-[32rpx] flex items-center justify-between text-[32rpx]">
      <view class="flex items-center">
        <image src="@img/img-005.png" mode="scaleToFill" class="h-[44rpx] w-[44rpx]" />
        <text class="text-[32rpx] text-[#333333] font-bold">
          精选景点
        </text>
      </view>
      <view class="flex items-center" @click="go('/packages/home/scenic_handpick')">
        <text class="text-[24rpx] text-[#717171]">
          更多景点
        </text>
        <wd-icon name="chevron-right" size="24rpx" color="#717171" />
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx]">
      <div class="grid grid-cols-2 gap-4">
        <ol-scenic-item v-for="item in spotList" :key="item.id" :scenic-data="item" :enable-favorite="false" />
      </div>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] text-[32rpx] text-[#333333] font-bold">
      旅接推荐
    </view>
    <view class="travel-recommendation">
      <view class="filter-bar">
        <text>全部</text>
        <text>性别</text>
        <text>单量</text>
        <text>评分</text>
        <text>带车</text>
      </view>
      <view class="flex flex-col gap-[32rpx]">
        <view
          v-for="(travel, index) in travelList" :key="travel.id"
          @click="go('/packages/travel/details', { receiveUserId: travel.receiveUserId })"
        >
          <!-- <template v-if="index == 1">
            <image src="" mode="scaleToFill" class="h-[154rpx] w-full rounded-[20rpx] bg-[#eaeaea]" />
          </template>
<template v-else> -->
          <view class="travel-card gap-[18rpx] rounded-[20rpx] p-[30rpx]">
            <view class="relative w-[190rpx] overflow-hidden">
              <!-- <image src="@img/img-006.png" mode="scaleToFill" class="absolute left-0 top-0 z-1 h-[36rpx] w-[86rpx]" /> -->
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
          <!-- </template> -->
        </view>
      </view>
    </view>
    <!--  -->
    <wd-popup
      v-model="show" position="bottom"
      custom-style="border-radius:32rpx 32rpx 0 0;background: linear-gradient( 180deg, #F8F8F8 0%, #EAF6FF 100%);"
      :z-index="99999" :safe-area-inset-bottom="true"
    >
      <view class="m-[30rpx] flex gap-[30rpx]">
        <view class="relative">
          <image src="" mode="scaleToFill" class="h-[132rpx] w-[130rpx] bg-[#eaeaea]" />
          <view
            class="absolute bottom-0 left-0 h-[36rpx] w-[86rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
            style="background: linear-gradient( 268deg, #FFCE8E 0%, #FFA64D 100%);border-radius:  0rpx 12rpx;"
          >
            可服务
          </view>
        </view>
        <view class="w-full flex flex-col justify-between">
          <view class="flex items-center gap-[10rpx]">
            <text class="text-[32rpx] text-[#191A1D] font-bold">
              冯宝宝
            </text>
            <image src="@img/girl.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]" />
            <image src="@img/boy.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]" />
            <image src="@img/car.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]" />
            <text class="text-[#D62929] text-[24prx]">
              5.0分
            </text>
          </view>
          <view class="w-[450rpx] truncate text-[24rpx] text-[#787878]">
            为人活泼开朗，个性自信大方，会帮忙拍照，1为人活泼开朗，个性自信大方，会帮忙拍照，1...
          </view>
          <view class="flex items-center gap-[18rpx]">
            <view class="flex items-center gap-[4rpx]">
              <image src="@img/img-028.png" mode="scaleToFill" class="h-[30rpx] w-[23rpx]" />
              <text class="text-[24rpx] text-[#002C4F]">
                爽约包退
              </text>
            </view>
            <view class="flex items-center gap-[4rpx]">
              <image src="@img/img-028.png" mode="scaleToFill" class="h-[30rpx] w-[23rpx]" />
              <text class="text-[24rpx] text-[#002C4F]">
                实名认证
              </text>
            </view>
            <view class="flex items-center gap-[4rpx]">
              <image src="@img/img-028.png" mode="scaleToFill" class="h-[30rpx] w-[23rpx]" />
              <text class="text-[24rpx] text-[#002C4F]">
                资格证书
              </text>
            </view>
          </view>
        </view>
      </view>
      <view class="m-[30rpx] rounded-[12rpx] bg-[#fff]">
        <view class="flex gap-[20rpx] p-[30rpx]" style="border-bottom: 2rpx solid #F6F6F6;">
          <image src="" mode="scaleToFill" class="h-[152rpx] w-[150rpx] rounded-[12rpx] bg-[#eaeaea]" />
          <view class="w-full flex flex-1 flex-col justify-between">
            <view class="flex items-center gap-[10rpx]">
              <text class="text-price text-[44rpx] text-[#FF0011]">
                499
              </text>
              <view
                class="h-[36rpx] w-[108rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
                style="background: linear-gradient( 268deg, #FFCE8E 0%, #FFA64D 100%);border-radius: 12rpx 0rpx;"
              >
                限时秒杀
              </view>
              <view class="flex items-center">
                <text class="text-[#A6A7A8] text-[24prx]">
                  项目详情
                </text>
                <wd-icon name="arrow-right" size="24prx" color="#A6A7A8" />
              </view>
            </view>
            <view>
              <text class="mr-[10rpx] text-[24rpx] text-[#A6A7A8] line-through">
                原价¥699
              </text>

              <text class="text-[24rpx] text-[#002C4F]">
                全程帮拍
              </text>
            </view>
            <view class="text-[24rpx] text-[#002C4F]">
              当前已选 陪玩陪拍
            </view>
          </view>
        </view>
        <view class="flex flex-col p-[30rpx]">
          <view class="text-[28rpx] text-[#333333] font-bold">
            服务项目
          </view>
          <wd-radio-group v-model="value" cell shape="button">
            <wd-radio :value="1">
              沃特
            </wd-radio>
            <wd-radio :value="2">
              商家后台
            </wd-radio>
            <wd-radio :value="3">
              沃特
            </wd-radio>
            <wd-radio :value="4">
              商家后台
            </wd-radio>
          </wd-radio-group>
          <view class="mt-[30rpx] flex items-center justify-between">
            <text class="text-[28rpx] text-[#333333] font-bold">
              购买数量
            </text>
            <wd-input-number />
          </view>
          <view class="mt-[42rpx] flex items-center justify-end">
            <view class="flex items-end">
              <text class="text-[28rpx] text-[#ABAEB2]">
                合计：
              </text>
              <text class="text-price text-[44rpx] text-[#FF0011]">
                499
              </text>
            </view>
            <view
              class="ml-[20rpx] h-[80rpx] w-[254rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]"
              style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);"
              @click="onNext"
            >
              确认下单
            </view>
          </view>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-radio-group) {
  padding: 0 !important;
}

:deep(.wd-radio.is-button.is-checked .wd-radio__label) {
  background: #bde2ff;
}

.bg-009 {
  width: 257.78rpx;
  height: 40rpx;
  background-image: url('/static/images/bg-009.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.demo {
  display: block;
  width: 190rpx;
  height: 190rpx;
  background: red;
  border-radius: 20rpx;
  // clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%);
}

.home-container {
  @apply flex flex-col min-h-screen;
}

.top-bar {
  @apply flex items-center p-4;

  .location {
    @apply flex items-center text-lg font-bold mr-4;
  }

  .search-input {
    @apply flex-1 flex items-center bg-gray-100 rounded-full py-2 px-4 text-gray-500;

    .placeholder {
      @apply text-sm;
    }
  }
}

.hot-features {
  @apply flex justify-around py-4 mt-2 rounded-lg mx-4;

  .feature-item {
    @apply flex flex-col items-center text-gray-700;
  }
}

.featured-spots {
  @apply mt-2 bg-white mx-4 rounded-lg;

  .spot-grid {
    @apply grid grid-cols-2 gap-2 p-2;

    .spot-card {
      @apply relative rounded-lg overflow-hidden;

      &.col-span-2 {
        @apply col-span-2 h-48; // Adjust height for the larger card
      }

      .spot-image {
        @apply w-full h-full object-cover;
      }

      .spot-info {
        @apply absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white;

        .spot-title {
          @apply text-base font-bold;
        }

        .spot-description {
          @apply text-xs opacity-80;
        }
      }
    }
  }
}

.travel-recommendation {
  @apply mt-2 mx-4 rounded-lg pb-4;

  .filter-bar {
    @apply flex justify-around text-sm text-gray-600 pb-2;
  }

  .travel-card {
    @apply flex bg-white shadow-sm;

    .travel-avatar {
      @apply object-cover mr-3;
    }

    .travel-content {
      @apply flex-1 flex flex-col;

      .travel-header {
        @apply flex items-center justify-between mb-1;

        .travel-name {
          @apply text-base font-bold;
        }

        .travel-rating {
          @apply flex items-center;
        }

        .travel-distance {
          @apply text-sm text-gray-500;
        }
      }

      .travel-description {
        @apply text-xs text-gray-600 mb-1 line-clamp-2;
      }

      .travel-tags {
        @apply flex flex-wrap gap-1 mb-2;

        .tag {
          @apply text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full;
        }
      }

      .action-button {
        @apply self-end bg-blue-500 text-white text-sm px-4 py-1 rounded-full;
      }
    }
  }
}
</style>
