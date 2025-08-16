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
  1: '首页封面',
  2: '首页中间宣传',
  3: '旅接封面',
  4: '入驻协议',
  5: '用户协议',
  6: '下单须知',
  7: '订单发布须知',
  8: '我的-推广文案',
  9: '公司简介',
  10: '隐私政策',
  11: '优惠券使用规则',
  default: '协议',
}
onLoad(async (options) => {
  const res = await getByType({
    adType: options.adType,
  })
  content.value = res.data[0]?.introduction
  title.value = strategies[options.adType] || strategies.default
  console.log('------------------------------')
  console.log(title.value)
  console.log('------------------------------')
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
