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
// import {  } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
</script>

<template>
  <view class="bg-base">
    <wd-navbar
      title="权益兑换" left-arrow :placeholder="true" custom-style="background-color: transparent !important;" :fixed="false" :bordered="false" :safe-area-inset-top="true"
      @click-left="back"
    />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
