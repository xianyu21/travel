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
.bg-base-007 {
  background: linear-gradient(#dceef9 10%, #fafafa 20%, #f6f6f6 100%);
  width: 100%;
  min-height: 100vh;
}
</style>
