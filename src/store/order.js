import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from '@/utils/toast'

export const useShopStore = defineStore(
  'shop',
  () => {
    const shopInfo = ref({})
    const setShopInfo = (val) => {
      shopInfo.value = val
    }
    const clearShopInfo = () => {
      shopInfo.value = {}
    }
    return {
      shopInfo,
      setShopInfo,
      clearShopInfo,
    }
  },
  {
    persist: true,
  },
)
