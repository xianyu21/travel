<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "新建地址"
  }
}
</route>

<script setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getAddAddr, getAddrDetail, getUpdateAddr } from '@/api/index'
import { useUserStore } from '@/store'
import { back, getCurrentQuery, go, reloadUrl } from '@/utils/tools'

const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 获取路由参数，判断是编辑还是新增
const query = getCurrentQuery()
const isEdit = ref(false)
const pageTitle = computed(() => isEdit.value ? '编辑地址' : '新建地址')

// 表单数据
const formData = ref({
  contact: '',
  contactPhone: '',
  address: '',
  doorNumber: '',
  isDefault: 0,
  province: '',
  provinceId: '',
  city: '',
  cityId: '',
  county: '',
  countyId: '',
})
const site = ref([])
const province = ref([])
const city = ref([])
const county = ref([])
// , dataRegion.filter(el => el.regionLevel === 2 && el.parentId === 110000), dataRegion.filter(el => el.regionLevel === 3 && el.parentId === 110100)
const columns = ref([])
// 如果是编辑模式，加载地址数据
onLoad((options) => {
  console.log('------------------------------')
  console.log(options)
  console.log('------------------------------')
  if (options && options.addrId) {
    isEdit.value = true
    formData.value.addrId = options.addrId
    getAddrDetail({
      addrId: options.addrId,
    }).then((res) => {
      formData.value = Object.assign(formData.value, res.data)
    })
  }
  // formData.value.province = dataRegion.filter(el => el.regionLevel === 1 && el.parentId === 100000)
  // formData.value.provinceId = province.value[0].id
  // formData.value.city = dataRegion.filter(el => el.regionLevel === 2 && el.parentId === province[0].id)
  // formData.value.cityId = city.value[0].id
  // formData.value.county = dataRegion.filter(el => el.regionLevel === 3 && el.parentId === city.value[0].id)
  // formData.value.countyId = county.value[0].id
  // 缓存不存在或失效，重新处理数据
  const provinces = dataRegion.filter(el => el.regionLevel === 1 && el.parentId === 100000)
  columns.value = [provinces.map((province) => {
    const cities = dataRegion.filter(el => el.regionLevel === 2 && el.parentId === province.id)
    return {
      ...province,
      children: cities.map((city) => {
        const districts = dataRegion.filter(el => el.regionLevel === 3 && el.parentId === city.id)
        return {
          ...city,
          children: districts,
        }
      }),
    }
  })]
})

function selectaddress() {
  // message.alert('选择地址功能需要接入地图API')
}

// 保存地址
function saveaddress() {
  console.log('------------------------------')
  console.log(formData.value)
  console.log('------------------------------')
  // 表单验证
  if (!formData.value.contact) {
    toast.error('请输入名称')
    return
  }
  if (!formData.value.contactPhone) {
    toast.error('请输入联系方式')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(formData.value.contactPhone)) {
    toast.error('请输入正确的手机号码')
    return
  }
  if (!formData.value.address) {
    toast.error('请选择详细地址')
    return
  }
  if (isEdit.value) {
    toast.success('编辑成功')

    getUpdateAddr({
      ...formData.value,
    }).then((res) => {
      toast.success('保存成功')
      console.log('------------------------------')
      console.log(res)
      console.log('------------------------------')
    })
  }
  else {
    getAddAddr({
      ...formData.value,
    }).then((res) => {
      toast.success('保存成功')
      console.log('------------------------------')
      console.log(res)
      console.log('------------------------------')
    })
  }

  // setTimeout(() => {
  //   back()
  // }, 1500)
}

// 处理地址选择器的列变化
function columnChange(selectedItem, resolve, finish) {
  console.log('------------------------------')
  console.log(selectedItem)
  console.log('------------------------------')
  const { columnIndex, selectedValue } = selectedItem
  const cities = dataRegion.filter(el => el.regionLevel === 2 && el.parentId === provinceId)
  resolve(cities)
  // if (columnIndex === 0) {
  //   // 选择了省，更新市列表
  //   const provinceId = selectedValue.id
  //   formData.value.province = selectedValue.regionName
  //   formData.value.provinceId = provinceId

  //   // 获取该省下的所有市
  //   const cities = dataRegion.filter(el => el.regionLevel === 2 && el.parentId === provinceId)
  //   resolve(cities)

  //   if (cities.length > 0) {
  //     // 默认选中第一个市
  //     formData.value.city = cities[0].regionName
  //     formData.value.cityId = cities[0].id

  //     // 获取第一个市下的所有区县
  //     const counties = dataRegion.filter(el => el.regionLevel === 3 && el.parentId === cities[0].id)
  //     if (counties.length > 0) {
  //       formData.value.county = counties[0].regionName
  //       formData.value.countyId = counties[0].id
  //     }
  //   }
  // }
  // else if (columnIndex === 1) {
  //   // 选择了市，更新区县列表
  //   const cityId = selectedValue.id
  //   formData.value.city = selectedValue.regionName
  //   formData.value.cityId = cityId

  //   // 获取该市下的所有区县
  //   const counties = dataRegion.filter(el => el.regionLevel === 3 && el.parentId === cityId)
  //   resolve(counties)

  //   if (counties.length > 0) {
  //     // 默认选中第一个区县
  //     formData.value.county = counties[0].regionName
  //     formData.value.countyId = counties[0].id
  //   }
  // }
  // else if (columnIndex === 2) {
  //   // 选择了区县
  //   formData.value.county = selectedValue.regionName
  //   formData.value.countyId = selectedValue.id

  //   // 更新地址字符串
  //   formData.value.address = `${formData.value.province}${formData.value.city}${formData.value.county}`

  //   finish()
  // }
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <wd-navbar
      :title="pageTitle" custom-style="background-color: transparent !important;" left-arrow
      :placeholder="true" :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#333]">
          名称
        </text>
        <input
          v-model="formData.contact" class="text-right text-[28rpx] text-[#333]" placeholder="请输入名称"
          placeholder-class="text-[#999]"
        >
      </view>

      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#333]">
          联系方式
        </text>
        <input
          v-model="formData.contactPhone" class="text-right text-[28rpx] text-[#333]" placeholder="请输入联系方式"
          placeholder-class="text-[#999]" type="number" maxlength="11"
        >
      </view>

      <view
        class="flex items-center justify-between gap-[30rpx] border-b border-[#f5f5f5] py-[30rpx]"
        @click="selectaddress"
      >
        <text class="text-[28rpx] text-[#333]">
          详细地址
        </text>
        <!-- <view class="flex flex-1 items-center">
          <text v-if="formData.address" class="mr-[10rpx] text-[28rpx] text-[#333]">
            {{ formData.address }}
          </text>
          <text v-else class="mr-[10rpx] text-[28rpx] text-[#999]">
            请选择
          </text>
          <text class="text-[28rpx] text-[#999]">
            >
          </text>
        </view> -->
        <!-- <wd-picker
          v-model=""  :columns="columns"
          :column-change="onChangeDistrict"
        /> -->
        <wd-col-picker
          v-model="site" label="选择地址" value-key="regionName" label-key="regionName" placeholder="请选择你的地址"
          :columns="columns" :column-change="columnChange"
        />
      </view>

      <view class="flex items-center justify-between py-[30rpx]">
        <text class="text-[28rpx] text-[#333]">
          门牌号
        </text>
        <input
          v-model="formData.doorNumber" class="text-right text-[28rpx] text-[#333]" placeholder="例：A座3单元801"
          placeholder-class="text-[#999]"
        >
      </view>
    </view>

    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#A6A7A8]" size="48rpx">
          设为默认地址
        </text>
        <!-- <wd-switch v-model="formData.isDefault" /> -->
      </view>
    </view>

    <!-- 保存按钮 -->
    <view
      class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] h-[90rpx] flex items-center justify-center rounded-[45rpx] text-[28rpx] text-white"
      style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);" @click="saveaddress"
    >
      {{ isEdit ? '编辑地址' : '保存地址' }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
