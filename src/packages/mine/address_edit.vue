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
import { useColPickerData } from '@/hooks/useColPickerData'
import { useUserStore } from '@/store'
import { back } from '@/utils/tools'

const { colPickerData, findChildrenByCode } = useColPickerData()
const toast = useToast()
const message = useMessage()
const userStore = useUserStore()
const isEdit = ref(false)
const pageTitle = computed(() => isEdit.value ? '编辑地址' : '新建地址')

// 表单数据
const formData = ref({
  contact: '',
  contactPhone: '',
  address: '',
  isDefault: 0,
  province: '',
  provinceId: '',
  city: '',
  cityId: '',
  county: '',
  countyId: '',
  detail: '',
})
const site = ref([])
const columns = ref([])
onLoad(async (options) => {
  console.log(options)
  if (options && options.addrId) {
    isEdit.value = true
    formData.value.addrId = options.addrId
    const res = await getAddrDetail({
      addrId: options.addrId,
    })
    formData.value = Object.assign(formData.value, res.data)
    site.value = [res.data.provinceId, res.data.cityId, res.data.countyId]
    columns.value = [colPickerData.map((item) => {
      return {
        value: item.value,
        label: item.text,
      }
    }), findChildrenByCode(colPickerData, formData.value?.provinceId)?.map((item) => {
      return {
        value: item.value,
        label: item.text,
      }
    }), findChildrenByCode(colPickerData, formData.value?.cityId)?.map((item) => {
      return {
        value: item.value,
        label: item.text,
      }
    })]
  }
  else {
    columns.value = [colPickerData.map((item) => {
      return {
        value: item.value,
        label: item.text,
      }
    })]
  }
})
async function saveaddress() {
  console.log('------------------------------')
  console.log(site.value)
  console.log('------------------------------')
  // 表单验证
  if (!formData.value.contact) {
    toast.show('请输入名称')
    return
  }
  if (!formData.value.contactPhone) {
    toast.show('请输入联系方式')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(formData.value.contactPhone)) {
    toast.show('请输入正确的手机号码')
    return
  }
  if (site.value.length === 0) {
    toast.show('请选择地址')
    return
  }
  if (!formData.value.detail) {
    toast.show('请输入详情地址')
    return
  }

  formData.value.provinceId = site.value[0]
  formData.value.cityId = site.value[1]
  formData.value.countyId = site.value[2]
  const siteName = getAreaNames(site.value)
  formData.value.province = siteName[0]
  formData.value.city = siteName[1]
  formData.value.county = siteName[2]

  if (isEdit.value) {
    toast.success('编辑成功')
    await getUpdateAddr({
      ...formData.value,
      address: siteName.join('') + formData.value.detail,
    })
    toast.success('保存成功')
  }
  else {
    await getAddAddr({
      ...formData.value,
      address: siteName.join('') + formData.value.detail,
    })
    toast.success('保存成功')
  }
  uni.$emit('updataSite')
  setTimeout(() => {
    back()
  }, 1500)
}
function getAreaNames(codes) {
  const result = []

  // 确保编码是字符串类型
  const strCodes = codes.map(code => String(code))
  // 查找省份
  const province = colPickerData.find(item => item.value === strCodes[0])
  if (province) {
    result.push(province.text)

    // 查找城市
    if (province.children && strCodes[1]) {
      const city = province.children.find(item => item.value === strCodes[1])
      if (city) {
        result.push(city.text)

        // 查找区县
        if (city.children && strCodes[2]) {
          const district = city.children.find(item => item.value === strCodes[2])
          if (district)
            result.push(district.text)
        }
      }
    }
  }

  return result
}
function columnChange({ selectedItem, resolve, finish }) {
  console.log('------------------------------')
  console.log(colPickerData)
  console.log('------------------------------')
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text,
        }
      }),
    )
  }
  else {
    finish()
  }
}
function handleConfirm({ value }) {
  console.log(value)
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

      <view class="flex items-center justify-between gap-[30rpx] border-b border-[#f5f5f5] py-[30rpx]">
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
        <view class="flex flex-1 items-end justify-end">
          <wd-col-picker
            v-model="site" placeholder="请选择你的地址" :columns="columns" :column-change="columnChange"
            @confirm="handleConfirm"
          />
        </view>
      </view>

      <view class="flex items-center justify-between py-[30rpx]">
        <text class="text-[28rpx] text-[#333]">
          门牌号
        </text>
        <input
          v-model="formData.detail" class="text-right text-[28rpx] text-[#333]" placeholder="例：A座3单元801"
          placeholder-class="text-[#999]"
        >
      </view>
    </view>

    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <view class="flex items-center justify-between">
        <text class="text-[28rpx] text-[#A6A7A8]" size="48rpx">
          设为默认地址
        </text>
        <wd-switch v-model="formData.isDefault" :active-value="1" :inactive-value="0" />
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
