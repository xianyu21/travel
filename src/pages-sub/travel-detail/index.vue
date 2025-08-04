<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

onLoad((options) => {
  console.log('旅接详情页面加载', options)
})
</script>

<template>
  <view class="travel-detail-page">
    <!-- 顶部图片 -->
    <image
      class="top-image"
      src="https://via.placeholder.com/750x500/ADD8E6/FFFFFF?text=Top+Image"
      mode="aspectFill"
    />

    <!-- 用户信息卡片 -->
    <view class="user-info-card">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <image
            class="avatar"
            src="https://via.placeholder.com/100x100/FFB6C1/FFFFFF?text=Avatar"
            mode="aspectFill"
          />
          <view class="ml-4">
            <view class="flex items-center">
              <text class="user-name">
                冯宝宝
              </text>
              <view class="tag ml-2">
                可服务
              </view>
            </view>
            <view class="mt-1 flex items-center text-sm text-gray-500">
              <text>5.0分</text>
              <text class="ml-2">
                已服务6000+
              </text>
              <text class="ml-2">
                距您1.5km
              </text>
            </view>
          </view>
        </view>
        <view class="heart-icon i-carbon-favorite text-2xl text-gray-400" />
      </view>
      <view class="description mt-4 text-gray-700">
        个人简单介绍个人简单介绍个人简单介绍个人简单介绍个人简单介绍个人简单介绍个人简单介绍个人简单介绍个人简单介绍
      </view>
    </view>

    <!-- 服务保障 -->
    <view class="section-card">
      <view class="section-title">
        服务保障
      </view>
      <view class="mt-2 flex flex-wrap">
        <view class="guarantee-item">
          <view class="i-carbon-checkmark-outline text-green-500" />
          <text class="ml-1">
            爽约包退
          </text>
        </view>
        <view class="guarantee-item ml-4">
          <view class="i-carbon-checkmark-outline text-green-500" />
          <text class="ml-1">
            实名认证
          </text>
        </view>
        <view class="guarantee-item ml-4">
          <view class="i-carbon-checkmark-outline text-green-500" />
          <text class="ml-1">
            资格证书
          </text>
        </view>
      </view>
    </view>

    <!-- 服务时间 -->
    <view class="section-card">
      <view class="section-title">
        服务时间
      </view>
      <view class="mt-2 text-gray-700">
        <text>周末 11:00~21:00</text>
        <view class="mt-1">
          工作日周二到周五 11:00~21:00
        </view>
      </view>
    </view>

    <!-- 服务项目 -->
    <view class="section-card">
      <view class="flex items-center border-b border-gray-200 pb-2">
        <text class="section-title active">
          服务项目
        </text>
        <text class="section-title ml-4">
          用户评价 (52)
        </text>
      </view>

      <view class="service-item mt-4">
        <view class="flex items-center">
          <image
            class="service-image"
            src="https://via.placeholder.com/150x150/FFD700/FFFFFF?text=Service+1"
            mode="aspectFill"
          />
          <view class="ml-4 flex-1">
            <view class="flex items-center justify-between">
              <text class="service-name">
                陪玩陪拍
              </text>
              <text class="text-sm text-red-500">
                限时秒杀
              </text>
            </view>
            <view class="service-duration mt-1 text-sm text-gray-500">
              120分钟 | 全程帮拍
            </view>
            <view class="mt-2 flex items-baseline justify-between">
              <view class="price-info">
                <text class="price-current">
                  ¥499
                </text>
                <text class="price-original ml-1">
                  ¥699
                </text>
              </view>
              <button class="order-button">
                立即下单
              </button>
            </view>
          </view>
        </view>
      </view>

      <view class="service-item mt-4">
        <view class="flex items-center">
          <image
            class="service-image"
            src="https://via.placeholder.com/150x150/87CEEB/FFFFFF?text=Service+2"
            mode="aspectFill"
          />
          <view class="ml-4 flex-1">
            <view class="flex items-center justify-between">
              <text class="service-name">
                陪玩陪拍
              </text>
              <text class="text-sm text-red-500">
                限时秒杀
              </text>
            </view>
            <view class="service-duration mt-1 text-sm text-gray-500">
              120分钟 | 全程帮拍
            </view>
            <view class="mt-2 flex items-baseline justify-between">
              <view class="price-info">
                <text class="price-current">
                  ¥499
                </text>
                <text class="price-original ml-1">
                  ¥699
                </text>
              </view>
              <button class="order-button">
                立即下单
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.travel-detail-page {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding-bottom: 20rpx; // 底部留白
}

.top-image {
  width: 100%;
  height: 500rpx;
}

.user-info-card,
.section-card {
  background-color: #fff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
}

.tag {
  background-color: #e0f7fa;
  color: #00bcd4;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
}

.description {
  font-size: 28rpx;
  line-height: 1.5;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;

  &.active {
    color: #007bff;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -10rpx;
      transform: translateX(-50%);
      width: 60%;
      height: 6rpx;
      background-color: #007bff;
      border-radius: 3rpx;
    }
  }
}

.guarantee-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #666;
  margin-top: 10rpx;
}

.service-item {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;

  &:last-child {
    border-bottom: none;
  }
}

.service-image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.service-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.service-duration {
  font-size: 26rpx;
  color: #666;
}

.price-info {
  display: flex;
  align-items: baseline;
}

.price-current {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff4500;
}

.price-original {
  font-size: 26rpx;
  color: #999;
  text-decoration: line-through;
}

.order-button {
  background-color: #007bff;
  color: #fff;
  font-size: 28rpx;
  padding: 10rpx 24rpx;
  border-radius: 40rpx;
  line-height: 1;
  height: auto;
  margin: 0;
}
</style>
