<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getTraveCommentList, getTraveInfo } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const current = ref<number>(0)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
])
const type = ref(0)
const value1 = ref(3)
const info = ref({})
const commentInfo = ref([])
onLoad((options) => {
  console.log('------------------------------')
  console.log(options)
  console.log('------------------------------')
  getTraveInfo({
    receiveUserId: options.receiveUserId,
    longitude: '106.579093',
    latitude: '29.562026',
  }).then((res) => {
    console.log('------------------------------')
    console.log(res)
    console.log('------------------------------')
    info.value = res.data
  })
  getTraveCommentList({
    page: {
      page: 1,
      limit: 10,
    },
    receiveUserId: options.receiveUserId,
  }).then((res) => {
    console.log('------------------------------')
    console.log(res)
    console.log('------------------------------')
    commentInfo.value = res.data
  })
})
</script>

<template>
  <view class="bg-base">
    <wd-navbar
      title="" left-arrow :placeholder="false"
      custom-style="background-color: transparent !important;border-radius: 0rpx" :fixed="true" :bordered="false"
      :safe-area-inset-top="false" @click-left="back"
    />
    <wd-swiper v-model:current="current" :list="swiperList" height="728rpx" />
    <view class="bg-[#fff]">
      <view class="mx-[30rpx] mt-[32rpx] flex items-center gap-[30rpx]">
        <view class="relative">
          <image :src="info.headUrl" mode="scaleToFill" class="h-[132rpx] w-[130rpx] bg-[#eaeaea]" />
          <view
            v-if="info?.isService === 1"
            class="absolute bottom-0 left-0 z-1 h-[36rpx] w-[86rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
            style="background: linear-gradient( 268deg, #FFCE8E 0%, #FFA64D 100%);border-radius: 0rpx 12rpx  ;"
          >
            可服务
          </view>
          <view
            v-else
            class="absolute bottom-0 left-0 z-1 h-[36rpx] w-[86rpx] text-center text-[20rpx] text-[#fff] leading-[36rpx]"
            style="background: linear-gradient( 92deg, #FFB38E 0%, #FF774D 100%);border-radius:0rpx 12rpx  ;"
          >
            服务中
          </view>
        </view>
        <view class="w-full flex flex-col justify-between gap-[20rpx]">
          <view class="flex items-center gap-[20rpx]">
            <text class="text-[44rpx] text-[#000000] font-bold">
              {{ info.realName }}
            </text>
            <image v-if="info.gender == '女'" src="@img/girl-001.png" mode="scaleToFill" class="h-[50rpx] w-[50rpx]" />
            <image v-if="info.gender == '男'" src="@img/boy-001.png" mode="scaleToFill" class="h-[50rpx] w-[50rpx]" />
          </view>
          <view class="flex items-end gap-[10rpx]">
            <text class="text-[28rpx] text-[#D62929]">
              {{ info.score || 0 }}分
            </text>
            <text class="text-[28rpx] text-[#555555]">
              已服务{{ info.receiveCount || 0 }}单
            </text>
            <image src="@img/img-029.png" mode="scaleToFill" class="h-[36rpx] w-[36rpx]" />
            <text class="text-[28rpx] text-[#717171]">
              距您{{ info.distance || 0 }}km
            </text>
          </view>
        </view>
      </view>
      <view class="mx-[30rpx] flex flex-col">
        <text class="mt-[20rpx] text-[24rpx] text-[#717171]">
          {{ info?.introduction }}
        </text>
        <image src="@img/bg-008.png" mode="scaleToFill" class="mt-[26rpx] h-[76rpx] w-full" />
        <text class="mt-[30rpx] text-[32rpx] text-[#000000] font-bold">
          服务时间
        </text>
        <text class="mt-[20rpx] text-[28rpx] text-[#ABAEB2]">
          {{ info.serviceTimeStart || '' }}-{{ info.serviceTimeEnd || '' }}
        </text>
        <!-- <text class="mt-[12rpx] text-[28rpx] text-[#ABAEB2]">
          工作日周二到周五 11:00~21:00
        </text> -->
      </view>
      <wd-divider color="#F6F6F6" />
      <view class="mx-[30rpx] flex items-center gap-[30rpx]">
        <view class="flex items-center gap-[12rpx]" @click="type = 0">
          <text class="block h-[34rpx] w-[6rpx] rounded-[4rpx]" :class="type == 0 ? 'bg-[#078DF4]' : 'bg-[#fff]'" />
          <text class="text-[#000000]" :class="type == 0 ? 'text-[32rpx] font-bold' : 'text-[28rpx]'">
            服务项目
          </text>
        </view>
        <view class="flex items-center gap-[12rpx]" @click="type = 1">
          <text class="block h-[34rpx] w-[6rpx] rounded-[4rpx]" :class="type == 1 ? 'bg-[#078DF4]' : 'bg-[#fff]'" />
          <text class="text-[#000000]" :class="type == 1 ? 'text-[32rpx] font-bold' : 'text-[28rpx]'">
            用户评价
          </text>
        </view>
      </view>
      <template v-if="type == 0">
        <view class="mx-[30rpx] mt-[30rpx] flex flex-col gap-[30rpx]">
          <view v-for="item in info.serviceList" class="flex gap-[20rpx] rounded-[8rpx] bg-[#F7FCFF] p-[30rpx]">
            <image src="" mode="scaleToFill" class="h-[152rpx] w-[150rpx] rounded-[12rpx] bg-[#003e7e]" />
            <view class="w-full flex flex-1 flex-col justify-between">
              <view class="flex items-center gap-[30rpx]">
                <text
                  style="background: linear-gradient( 92deg, #FFCE8E 0%, #FFA64D 100%);border-radius: 20rpx 0rpx 20rpx 0rpx;"
                  class="block h-[36rpx] w-[108rpx] text-center text-[20rpx] text-[#FFFFFF] leading-[36rpx]"
                >
                  限时秒杀
                </text>
                <text class="text-[32rpx] text-[#000000] font-bold">
                  {{ item.serviceName }}
                </text>
              </view>
              <view class="text-[24rpx] text-[#002C4F]">
                120分钟丨全程帮拍
              </view>
              <view class="flex items-center justify-between">
                <view>
                  <text class="text-price text-[#DC3A23] font-bold">
                    499
                  </text>
                  <text class="text-[20rpx] text-[#A6A7A8] line-through">
                    原价¥699
                  </text>
                </view>
                <view
                  class="block h-[52rpx] w-[140rpx] rounded-full text-center text-[24rpx] text-[#FFFFFF] leading-[52rpx]"
                  style="background: linear-gradient( 90deg, #078DF4 0%, #066BEB 100%);"
                >
                  立即下单
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
      <template v-if="type == 1">
        <view class="mx-[30rpx] mt-[30rpx] rounded-[12rpx] bg-[#F9F9F9] p-[30rpx]">
          <view class="text-[28rpx] text-[#333333]">
            评价({{ commentInfo.total }})
          </view>
          <view class="mt-[30rpx] flex items-center justify-center gap-[30rpx]">
            <view class="rounded-[4rpx] bg-[#D0EBFF] px-[12rpx] py-[6rpx] text-[20rpx] text-[#0667EA]">
              活泼开朗
            </view>
            <view class="rounded-[4rpx] bg-[#D0EBFF] px-[12rpx] py-[6rpx] text-[20rpx] text-[#0667EA]">
              活泼开朗
            </view>
            <view class="rounded-[4rpx] bg-[#D0EBFF] px-[12rpx] py-[6rpx] text-[20rpx] text-[#0667EA]">
              活泼开朗
            </view>
            <view class="rounded-[4rpx] bg-[#D0EBFF] px-[12rpx] py-[6rpx] text-[20rpx] text-[#0667EA]">
              活泼开朗
            </view>
          </view>
          <view v-for="item in commentInfo.list" :key="item.id" class="py-[30rpx]">
            <view class="flex items-center gap-[16rpx]">
              <image :src="item.headUrl" mode="scaleToFill" class="h-[60rpx] w-[60rpx] rounded-full bg-[#eaeaea]" />
              <view class="flex flex-col justify-between">
                <text class="text-[24rpx] text-[#333333]">
                  {{ item.name }}
                </text>
                <wd-rate
                  v-model="item.isFineEvaluation" readonly
                  active-color="linear-gradient( 180deg, #FF1A0A 0%, #FF7443 100%)" color="#D8DADB" size="18rpx"
                  space="8rpx"
                />
              </view>
            </view>
            <view class="mt-[16rpx] text-[28rpx] text-[#333333]">
              {{ item.content }}
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.bg-base {
  --wot-swiper-radius: 0;
}

:deep(.wd-navbar__arrow) {
  color: #fff !important;
}

:deep(.custom-image) {
  border-radius: 0rpx;
}
</style>
