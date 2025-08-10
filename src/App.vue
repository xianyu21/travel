<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { usePageAuth } from '@/hooks/usePageAuth'
import { go } from '@/utils/tools'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

usePageAuth()

onLaunch(() => {
  console.log('App Launch')
  uni.onTabBarMidButtonTap(() => {
    console.log('点击了')
    go('/pages/demand')
  })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.text-dot-red {
  position: relative;
}

.text-dot-red::before {
  position: absolute;
  content: '';
  width: 14rpx;
  height: 14rpx;
  display: block;
  background-color: #ff0030;
  border-radius: 100%;
  right: 0;
  top: 6rpx;
  font-size: 80%;
  margin-right: 4upx;
}
.text-required::after {
  content: '*';
  // font-size: 80%;
  color: #ff3d3d;
  margin-left: 4upx;
  font-weight: bolder;
}
.text-price {
  white-space: nowrap;
  width: auto;
}
.text-price::before {
  content: '¥';
  font-size: 80%;
  margin-right: 0rpx;
}
.bg-base-007 {
  background: linear-gradient(#dceef9 10%, #fafafa 20%, #f6f6f6 100%);
  width: 100%;
  min-height: 100vh;
}
.bg-base-news {
  background: linear-gradient(#dceef9 10%, #fafafa 20%, #f6f6f6 100%);
  width: 100%;
  min-height: 100vh;
}
</style>
