<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "精选景点"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getSpotPage } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const paging = ref(null)
const dataList = ref([])

// 切换收藏状态
function toggleFavorite(spot: any) {
  spot.isFavorite = !spot.isFavorite
  if (spot.isFavorite) {
    toast.success('已添加到收藏')
  }
  else {
    toast.success('已取消收藏')
  }
}

// 点击景点
function onSpotClick(spot: any) {
  go(`/packages/home/scenic_details`, {
    spotId: spot.spotId,
  })
}
async function queryList(pageNo, pageSize) {
  const res = await getSpotPage({
    page: {
      page: pageNo,
      limit: pageSize,
    },
  })
  if (res.code == 200) {
    paging.value.complete(res.data.list)
  }
  else {

  }
}
async function favoriteChange(e) {
  console.log('------------------------------')
  console.log(e)
  console.log('------------------------------')
}
</script>

<template>
  <z-paging ref="paging" v-model="dataList" bg-color="#FAFAFA" @query="queryList">
    <template #top>
      <wd-navbar
        title="精选景点" custom-style="background-color: white !important;" left-arrow :placeholder="true"
        :fixed="true" :bordered="true" :safe-area-inset-top="true" @click-left="back"
      />
    </template>
    <view class="min-h-screen bg-[#f5f5f5]">
      <view class="px-[30rpx] pt-[20rpx]">
        <view class="grid grid-cols-2 gap-[20rpx]">
          <ol-scenic-item v-for="item in dataList" :key="item.id" :scenic-data="item" :default-favorite="item.isCollected" @click="onSpotClick" @favorite-change="favoriteChange" />
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
