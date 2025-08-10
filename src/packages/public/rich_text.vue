<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<script lang="js" setup>
import { getByType } from '@/api/index'
import { back } from '@/utils/tools'

const content = ref(null)
const title = ref('协议')
const strategies = {
  200: renderDashboard,
  401: redirectToLogin,
  403: showForbidden,
  default: showError,
}
onLoad(async (options) => {
  const res = await getByType({
    adType: options.adType,
  })
  content.value = res.data[0].introduction
  title.value = code => (strategies[code] || strategies.default)()
})
</script>

<template>
  <view class="">
    <wd-navbar
      :title="title" left-arrow :placeholder="true" :fixed="false" :bordered="false"
      :safe-area-inset-top="true" @click-left="back"
    />
    <wd-gap bg-color="#F4F5F9" height="25rpx" />
    <view class="mx-[20rpx]">
      <mp-html :content="content" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
