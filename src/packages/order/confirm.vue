<route lang="jsonc" type="page">{
    "layout": "default",
    "style": {
        "navigationBarTitleText": ""
    }
}</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
// import {  } from '@/api/index'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const isCheck = ref(false)
</script>

<template>
    <view class="bg-base-news pb-[100rpx]">
        <wd-navbar title="确认订单" left-arrow :placeholder="true" custom-style="background-color: transparent !important;"
            :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back" />
        <view class="bg-[#fff] mx-[30rpx] mt-[30rpx] rounded-[20rpx] p-[30rpx] flex items-center justify-between">
            <view class="flex flex-col gap-[10rpx]">
                <text class="text-[#000000] text-[28rpx]">XX用户 18560604560</text>
                <text class="text-[24rpx] text-[#626364]">重庆市 沙坪坝区 微电园产业园3期研究院9栋</text>
            </view>
            <wd-icon name="chevron-right" size="28rpx" color="#717171" />
        </view>
        <view
            class="bg-[#fff] mx-[30rpx] mt-[30rpx] rounded-[20rpx] p-[30rpx] text-center text-[#000000] text-[28rpx] font-bold">
            +请添加服务地址
        </view>
        <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
            <view class="flex items-center justify-between" @click="selectServiceProject">
                <text class="text-[28rpx] text-[#000000] font-bold">
                    服务旅接
                </text>
                <view class="flex items-center">
                    <text class="text-[28rpx] text-[#000000]">
                        冯宝宝
                    </text>
                </view>
            </view>
            <view class="mt-[50rpx] flex items-center justify-between">
                <text class="text-[28rpx] text-[#000000] font-bold">
                    服务时间
                </text>
                <view class="flex items-center">
                    <text class="text-[28rpx] text-[#000000]">
                        江北区红鼎国际A栋601
                    </text>
                    <wd-icon name="chevron-right" size="28rpx" color="#717171" />
                </view>
            </view>
            <view class="mt-[50rpx] flex items-center justify-between">
                <text class="text-[28rpx] text-[#000000] font-bold">
                    服务时长
                </text>
                <view class="flex items-center">
                    <text class="text-[28rpx] text-[#000000]">
                        3小时
                    </text>
                </view>
            </view>
        </view>
        <view class="bg-[#fff] mx-[30rpx] mt-[30rpx] rounded-[20rpx] p-[30rpx]">
            <view class="flex gap-[20rpx] rounded-[8rpx] ">
                <image src="" mode="scaleToFill" class="h-[152rpx] w-[150rpx] rounded-[12rpx] bg-[#003e7e]" />
                <view class="w-full flex flex-1 flex-col justify-between">
                    <view class="flex items-center gap-[30rpx]">
                        <text
                            style="background: linear-gradient( 92deg, #FFCE8E 0%, #FFA64D 100%);border-radius: 20rpx 0rpx 20rpx 0rpx;"
                            class="block h-[36rpx] w-[108rpx] text-center text-[20rpx] text-[#FFFFFF] leading-[36rpx]">
                            限时秒杀
                        </text>
                        <text class="text-[32rpx] text-[#000000] font-bold">
                            陪玩陪拍
                        </text>
                    </view>
                    <view class="text-[24rpx] text-[#002C4F]">
                        120分钟丨全程帮拍
                    </view>
                    <view class="flex items-center justify-between">
                        <view>
                            <text class="text-price text-[#DC3A23] text-[36rpx] font-bold">
                                499
                            </text>
                        </view>
                        <wd-input-number />
                    </view>
                </view>
            </view>
            <view class="bg-[#F9F9F9] w-full h-2rpx block my-[30rpx]"></view>
            <view class="flex items-center justify-between" @click="selectServiceProject">
                <text class="text-[28rpx] text-[#000000] ">
                    预估车费(往返）
                </text>
                <view class="flex items-center">
                    <text class="text-[28rpx] text-[#EA333F]">
                        ￥20
                    </text>
                </view>
            </view>
            <view class="mt-[30rpx] flex items-center justify-between">
                <text class="text-[28rpx] text-[#000000] ">
                    优惠券
                </text>
                <view class="flex items-center">
                    <text class="text-[28rpx] text-[#EA333F]">
                        -￥10
                    </text>
                    <wd-icon name="chevron-right" size="28rpx" color="#717171" />
                </view>
            </view>
        </view>

        <view class="bg-[#fff] mx-[30rpx] mt-[30rpx] rounded-[20rpx] p-[30rpx]">1</view>
        <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
            <view class="flex items-center justify-between">
                <view class="flex items-center">
                    <image src="@img/wx.png" mode="scaleToFill" class="mr-[16rpx] h-[32rpx] w-[36rpx]" />
                    <text class="text-[28rpx] text-[#000000] font-bold">
                        微信支付
                    </text>
                </view>
                <view class="flex items-center">
                    <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
                    <wd-icon name="circle" size="40rpx" color="#0669EB" />
                </view>
            </view>
        </view>
        <!--  -->
        <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-[#fff] p-[30rpx]">
            <view class="flex items-center justify-between">
                <view class="flex items-center">
                    <image src="@img/zfb.png" mode="scaleToFill" class="mr-[16rpx] h-[34.53rpx] w-[34.53rpx]" />
                    <text class="text-[28rpx] text-[#000000] font-bold">
                        支付宝支付
                    </text>
                </view>
                <view class="flex items-center">
                    <wd-icon name="check-circle-filled" size="40rpx" color="#0669EB" />
                    <wd-icon name="circle" size="40rpx" color="#0669EB" />
                </view>
            </view>
        </view>
        <view class="mb-8 flex items-center justify-center mt-[42rpx]">
            <wd-checkbox v-model="isCheck" checked-color="#0680F0" size="26rpx" />
            <text class="text-[24rpx] text-[#181818]">
                您已阅读和同意
            </text>
            <text class="text-[24rpx] text-[#181818]" @click="go('/packages/public/rich_text', { id: 2 })">
                用户协议
            </text>
        </view>
        <view class="fixed bottom-0 left-0 right-0 z-1">
            <view class="h-[162rpx] flex items-center justify-end gap-[20rpx] bg-[#fff] pr-[30rpx] pt-[12rpx]">
                <view class="total-price">
                    <text class="text-[28rpx] text-[#ABAEB2]">
                        合计：
                    </text>
                    <text class="text-price text-[#FF0011] text-[44rpx]">
                       489
                    </text>
                </view>
                <view class="h-[80rpx] w-[254rpx] rounded-full text-center text-[28rpx] text-[#FFFFFF] leading-[80rpx]"
                    style="background: linear-gradient( 87deg, #0788F3 0%, #0769EB 100%);">
                    提交订单并支付
                </view>
            </view>
        </view>
        <!-- <view class="fixed bottom-0 left-0 right-0 z-1 bg-[#fff] h-[162rpx]">

            <view class="mx-[48rpx] h-[82rpx] rounded-[20rpx] text-center text-[28rpx] text-[#FFFFFF] leading-[82rpx]"
                :style="{
                    background: 'linear-gradient( 25deg, #51DDFF 0%, #42CBFF 100%)',
                }" @click="go('/packages/home/order_confirm')">
                立即兑换
            </view>
        </view> -->
    </view>
</template>

<style lang="scss" scoped>
//</style>
