<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "地址管理"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getMyAddr, getRemoveAddr } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const addressList = ref([])
function editAddress(item) {
  console.log('------------------------------')
  console.log(item)
  console.log('------------------------------')
  if (type.value === 1) {
    go('/packages/mine/address_edit', { addrId: item.addrId })
  }
  else {
    uni.$emit('updataAddress', item)
    setTimeout(() => {
      back()
    }, 200)
  }
}
function addNewAddress() {
  go('/packages/mine/address_edit')
}
function deladdress(addrId) {
  getRemoveAddr({ addrId }).then((res) => {
    toast.show(res.msg)
    init()
  })
}
function init() {
  getMyAddr().then((res) => {
    if (res.code === 200) {
      addressList.value = res.data || []
    }
  })
}
const type = ref(1)
onLoad((options) => {
  if (options.type) {
    type.value = Number(options.type)
  }

  init()
  uni.$on('updataSite', () => {
    init()
  })
})
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      title="地址管理" custom-style="background-color: transparent !important;" left-arrow :placeholder="true"
      :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />

    <!-- 地址列表 -->
    <view class="px-[30rpx] py-[30rpx]">
      <view
        v-for="item in addressList" :key="item.id"
        class="mb-[30rpx] flex items-center justify-between rounded-[20rpx] bg-white p-[30rpx]"
        @click.stop="editAddress(item)"
      >
        <view class="w-full">
          <view class="mb-[20rpx] flex items-center justify-between">
            <view class="flex items-center">
              <text class="mr-[20rpx] text-[28rpx] text-[#333333] font-medium">
                {{ item.contact }}
              </text>
              <text class="text-[28rpx] text-[#333333]">
                {{ item.contactPhone }}
              </text>
            </view>
          </view>
          <view class="flex items-center">
            <view
              v-if="item.isDefault == 1"
              class="mr-[10rpx] inline-block h-[26rpx] w-[58rpx] rounded-[8rpx] bg-[#0678ee] py-[4rpx] text-center text-[20rpx] text-white leading-[26rpx]"
            >
              默认
            </view>
            <text class="flex-1 text-[24rpx] text-[#999999] leading-[40rpx]">
              {{ item.address }}
            </text>
          </view>
        </view>
        <view class="flex items-center gap-[20rpx]">
          <image
            src="@img/img-104.png" mode="scaleToFill" class="h-[32rpx] w-[32rpx]"
            @click.stop="editAddress(item)"
          />
          <wd-icon name="delete" size="32rpx" color="#A6A7A8" @click.stop="deladdress(item.addrId)" />
        </view>
      </view>
      <template v-if="addressList.length === 0">
        <wd-status-tip image="search" tip="暂无内容" />
      </template>
    </view>

    <!-- 添加地址按钮 -->
    <view
      class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[32rpx] text-white"
      style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);" @click="addNewAddress"
    >
      添加地址
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
