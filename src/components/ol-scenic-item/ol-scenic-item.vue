<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": ""
  }
}
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMessage, useToast } from 'wot-design-uni'
import { getSpotCancelCollect, getSpotCollect } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const props = defineProps({
  // 景点数据
  scenicData: {
    type: Object,
    default: () => ({
      image: '',
      title: '我在解放碑丨渝中区',
      id: '',
    }),
  },
  // 是否开启收藏功能
  enableFavorite: {
    type: Boolean,
    default: true,
  },
  // 默认收藏状态
  defaultFavorite: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['favorite-change', 'click'])

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 收藏状态
const isFavorite = ref(props.defaultFavorite)

// 切换收藏状态
function toggleFavorite(event) {
  event.stopPropagation()
  if (!props.enableFavorite)
    return false
  if (isFavorite.value === 0) {
    getSpotCollect({
      spotId: props.scenicData.spotId,
    }).then((res) => {
      if (res.code === 200) {
        isFavorite.value = 1
        toast.show('收藏成功')
      }
    })
  }
  else if (isFavorite.value === 1) {
    getSpotCancelCollect({
      spotId: props.scenicData.spotId,
    }).then((res) => {
      if (res.code === 200) {
        isFavorite.value = 0
        toast.show('收藏成功')
      }
    })
  }
  // isFavorite.value = isFavorite.value === 0 ? 1 : 0
  // emit('favorite-change', {
  //   spotId: props.scenicData.spotId,
  //   isFavorite: isFavorite.value,
  // })

  // toast.show(isFavorite.value ? '已收藏' : '已取消收藏')
}

// 点击卡片
function handleClick() {
  emit('click', props.scenicData)
}
</script>

<template>
  <div class="relative overflow-hidden rounded-[20rpx] bg-[#fff]" @click="handleClick">
    <view class="relative">
      <image :src="scenicData.imgUrls || ''" mode="aspectFill" class="h-[330rpx] w-full bg-[#eaeaea]" />
      <template v-if="enableFavorite">
        <view
          class="absolute right-[20rpx] top-[20rpx] h-[60rpx] w-[60rpx] flex items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)]"
          @click="toggleFavorite"
        >
          <image
            v-if="isFavorite === 1" src="@img/img-101.png" mode="scaleToFill"
            class="h-[40rpx] w-[40rpx]"
          />
          <image
            v-if="isFavorite === 0" src="@img/img-100.png" mode="scaleToFill"
            class="h-[40rpx] w-[40rpx]"
          />
        </view>
      </template>
    </view>
    <view class="pb-[30rpx] pl-[20rpx] pt-[20rpx] text-[28rpx] text-[#333333]">
      {{ scenicData.name }}
    </view>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
