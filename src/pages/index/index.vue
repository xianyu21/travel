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
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const safeAreaInsets = ref<UniApp.SafeAreaInsets | null>(null)

onLoad(() => {
  uni.getSystemInfo({
    success: (res) => {
      safeAreaInsets.value = res.safeAreaInsets || null
    },
  })
})

const hotFeatures = ref([
  { name: '热门功能', icon: 'i-carbon-fire' },
  { name: '我的景点', icon: 'i-carbon-location' },
  { name: '收藏路线', icon: 'i-carbon-star' },
  { name: '推荐入住', icon: 'i-carbon-home' },
])

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
</script>

<template>
  <view class="home-container" :style="{ paddingTop: `${safeAreaInsets?.top || 0}px` }">
    <!-- 顶部导航栏 -->
    <view class="top-bar">
      <view class="location">
        <text class="i-carbon-location mr-1 text-xl" />
        <text>重庆</text>
      </view>
      <view class="search-input" @click="navigateToSearch">
        <text class="i-carbon-search mr-1 text-lg" />
        <text class="placeholder">
          请输入您想要搜索的内容
        </text>
      </view>
    </view>

    <!-- 热门功能 -->
    <view class="hot-features">
      <view v-for="(item, index) in hotFeatures" :key="index" class="feature-item">
        <text :class="item.icon" class="text-2xl" />
        <text class="mt-1 text-sm">
          {{ item.name }}
        </text>
      </view>
    </view>

    <!-- 精选景点 -->
    <view class="featured-spots">
      <view class="section-title">
        精选景点
      </view>
      <view class="spot-grid">
        <view v-for="(spot, index) in featuredSpots" :key="spot.id" class="spot-card" :class="{ 'col-span-2': index === 0 }">
          <image :src="spot.image" mode="aspectFill" class="spot-image" />
          <view class="spot-info">
            <text class="spot-title">
              {{ spot.title }}
            </text>
            <text class="spot-description">
              {{ spot.description }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 旅接推荐 -->
    <view class="travel-recommendation">
      <view class="section-title">
        旅接推荐
      </view>
      <view class="filter-bar">
        <text>全部</text>
        <text>性别</text>
        <text>评分</text>
        <text>带车</text>
      </view>
      <view v-for="travel in recommendedTravel" :key="travel.id" class="travel-card">
        <image :src="travel.image" mode="aspectFill" class="travel-avatar" />
        <view class="travel-content">
          <view class="travel-header">
            <text class="travel-name">
              {{ travel.name }}
            </text>
            <view class="travel-rating">
              <text class="i-carbon-star-filled mr-1 text-sm text-yellow-500" />
              <text class="text-sm">
                {{ travel.rating }}
              </text>
              <text class="ml-2 text-xs text-gray-500">
                {{ travel.services }}
              </text>
            </view>
            <text class="travel-distance">
              {{ travel.distance }}
            </text>
          </view>
          <text class="travel-description">
            {{ travel.description }}
          </text>
          <view class="travel-tags">
            <text v-for="(tag, idx) in travel.tags" :key="idx" class="tag">
              {{ tag }}
            </text>
          </view>
          <button class="action-button" @click="navigateToDetail(travel.id)">
            立即下单
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  @apply flex flex-col bg-gray-100 min-h-screen;
}

.top-bar {
  @apply flex items-center p-4 bg-white;
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
  @apply flex justify-around bg-white py-4 mt-2 rounded-lg mx-4;
  .feature-item {
    @apply flex flex-col items-center text-gray-700;
  }
}

.section-title {
  @apply text-lg font-bold px-4 py-3;
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
  @apply mt-2 bg-white mx-4 rounded-lg pb-4;
  .filter-bar {
    @apply flex justify-around text-sm text-gray-600 pb-2;
  }
  .travel-card {
    @apply flex items-center bg-white p-3 mb-2 mx-2 rounded-lg shadow-sm;
    .travel-avatar {
      @apply w-20 h-20 rounded-lg object-cover mr-3;
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
