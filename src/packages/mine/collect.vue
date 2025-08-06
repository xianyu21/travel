<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "我的收藏"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
// import {  } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const tab = ref<number>(0)
</script>

<template>
  <view class="bg-base">
    <wd-navbar
      title="权益兑换" left-arrow :placeholder="true" custom-style="background-color: transparent !important;" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    />
    <wd-tabs v-model="tab">
      <wd-tab v-for="item in 2" :key="item":title="`标签${item}`" />
    </wd-tabs>
    <template v-if="tab == 0">
      <view>1</view>
    </template>
    <template v-if="tab == 1">
      <view>2</view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.content {
  line-height: 120px;
  text-align: center;
}
</style>
