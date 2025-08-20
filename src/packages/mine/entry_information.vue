<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "旅接入驻"
  }
}
</route>

<script lang="ts" setup>
import { useMessage, useToast } from 'wot-design-uni'
import { getReceiveUserInfo, registerReceiveUser } from '@/api/index'
import { useColPickerData } from '@/hooks/useColPickerData'
import { useUserStore } from '@/store'
import { back, go, reloadUrl } from '@/utils/tools'

const { colPickerData, findChildrenByCode } = useColPickerData()
const toast = useToast()
const message = useMessage()
const userStore = useUserStore()

// 入驻表单数据
const formData = ref({
  headUrl: '/static/images/avatar-default.png',
  realName: '冯宝宝',
  gender: '男',
  phone: '',
  province: '',
  provinceId: '',
  city: '',
  cityId: '',
  county: '',
  countyId: '',
  address: '',
  idCard: '500104199710253541',
  introduction: '人民话多爱交朋友',
})

// 证件照片
const certificates = ref([
  { type: 'idFront', name: '身份证正面', image: '' },
  { type: 'idBack', name: '身份证反面', image: '' },
  { type: 'other', name: '其他照片', image: '' },
  { type: 'personal', name: '个人生活照', image: '' },
  { type: 'personalLife', name: '个人生活照', image: '' },
  { type: 'qualification', name: '资格证', image: '' },
])

// 同意隐私协议
const agreePrivacy = ref(false)

// 选择头像
function selectAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.avatar = res.tempFilePaths[0]
      toast.success('头像已更新')
    },
  })
}

// 编辑字段
function editField(field: string, title: string) {
  const currentValue = formData.value[field as keyof typeof formData.value]
  message.prompt(`请输入${title}`, currentValue as string)
    .then((value) => {
      if (value && value.trim()) {
        (formData.value as any)[field] = value.trim()
        toast.success(`${title}已更新`)
      }
    })
    .catch(() => { })
}

// 选择性别
function genderChange(e) {
  formData.value.gender = e
}

// 上传证件照片
function uploadCertificate(index: number) {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      certificates.value[index].image = res.tempFilePaths[0]
      toast.success('照片已上传')
    },
  })
}

// 重置表单
function resetForm() {
  message.confirm('确定要重置所有信息吗？')
    .then(() => {
      // 重置表单数据
      Object.assign(formData.value, {
        gender: '',
        address: '',
        idCard: '',
        introduction: '',
        province: '',
        provinceId: '',
        city: '',
        cityId: '',
        county: '',
        countyId: '',
        address: '',
      })

      // 重置证件照片
      certificates.value.forEach((cert) => {
        cert.image = ''
      })

      agreePrivacy.value = false
      toast.success('已重置')
    })
    .catch(() => { })
}

onLoad(() => {
  formData.value = {
    ...formData.value,
    headUrl: userStore.userInfo.headUrl,
    realName: userStore.userInfo.realName,
    phone: userStore.userInfo.phone,
  }
  console.log('------------------------------')
  console.log(userStore.userInfo.phone)
  console.log('------------------------------')
  getReceiveUserInfo({
    phone: userStore.userInfo.phone,
  }).then((res) => {
    console.log('------------------------------')
    console.log(res)
    console.log('------------------------------')
  })
})
const site = ref([])
const detail = ref('')
const columns = ref([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
])
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
// 提交申请
function submitApplication() {
  if (!agreePrivacy.value)
    return toast.error('请同意隐私协议')
  if (!formData.value.headUrl)
    return toast.error('请选择头像')
  if (!formData.value.realName)
    return toast.error('请输入姓名')
  if (!formData.value.gender)
    return toast.error('请选择性别')
  if (!formData.value.phone)
    return toast.error('请输入手机号')
  if (site.value.length === 0)
    return toast.show('请选择地址')
  if (!detail.value)
    return toast.error('请输入详细地址')
  if (!formData.value.introduction)
    return toast.error('请输入个人简介')
  if (!formData.value.idCard)
    return toast.error('请输入身份证号码')
  formData.value.provinceId = site.value[0]
  formData.value.cityId = site.value[1]
  formData.value.countyId = site.value[2]
  const siteName = getAreaNames(site.value)
  formData.value.province = siteName[0]
  formData.value.city = siteName[1]
  formData.value.county = siteName[2]
  formData.value.address = `${siteName.join('')}${detail.value}`
  console.log('------------------------------')
  console.log(formData.value)
  console.log('------------------------------')
  registerReceiveUser({
    ...formData.value,
  })
  // 提交申请
  // message.confirm('确定要提交入驻申请吗？')
  //   .then(() => {
  //     // 实际项目中应该调用API提交
  //     toast.success('申请已提交，请等待审核')
  //     setTimeout(() => {
  //       back()
  //     }, 1500)
  //   })
  //   .catch(() => { })
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5] pb-[200rpx]">
    <wd-navbar
      title="旅接入驻" custom-style="background-color: transparent !important;" left-arrow :placeholder="true"
      :fixed="false" :bordered="false" :safe-area-inset-top="true" @click-left="back"
    />

    <!-- 基本信息 -->
    <view class="mx-[30rpx] mt-[30rpx] rounded-[20rpx] bg-white p-[30rpx]">
      <!-- 真实头像 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]" @click="selectAvatar">
        <text class="text-[28rpx] text-[#626364]">
          真实头像
        </text>
        <view class="flex items-center">
          <image :src="formData.headUrl" mode="aspectFill" class="mr-[10rpx] h-[124rpx] w-[124rpx] rounded-full" />
          <wd-icon name="chevron-right" size="28rpx" color="#C7C7C7" />
        </view>
      </view>

      <!-- 姓名 -->
      <view
        class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]"
        @click="editField('realName', '姓名')"
      >
        <text class="text-[28rpx] text-[#626364]">
          姓名
        </text>
        <text class="text-[28rpx] text-[#626364]">
          {{ formData.realName }}
        </text>
      </view>

      <!-- 性别 -->
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#626364]">
          性别
        </text>
        <view class="flex items-center gap-[30rpx]">
          <view class="flex items-center gap-[10rpx]" @click="genderChange('男')">
            <wd-icon v-if="formData.gender === '男'" name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon v-else name="circle" size="40rpx" color="#0669EB" />
            <text class="text-[28rpx] text-[#333333]">
              男
            </text>
          </view>
          <view class="flex items-center gap-[10rpx]" @click=" genderChange('女')">
            <wd-icon v-if="formData.gender === '女'" name="check-circle-filled" size="40rpx" color="#0669EB" />
            <wd-icon v-else name="circle" size="40rpx" color="#0669EB" />
            <text class="text-[28rpx] text-[#333333]">
              女
            </text>
          </view>
        </view>
      </view>
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#626364]">
          手机号
        </text>
        <wd-input
          v-model="formData.phone" type="number" readonly :maxlength="11" no-border placeholder="请输入手机号"
          custom-input-class="text-right"
        />
      </view>
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#626364]">
          所在地址
        </text>
        <wd-col-picker v-model="site" placeholder="请选择你的地址" :columns="columns" :column-change="columnChange" />
      </view>
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#626364]">
          详细地址
        </text>
        <wd-input v-model="detail" type="number" no-border placeholder="请输入详细地址" custom-input-class="text-right" />
      </view>
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#626364]">
          个人简介
        </text>
        <wd-input
          v-model="formData.introduction" type="number" no-border placeholder="请输入个人简介"
          custom-input-class="text-right"
        />
      </view>
      <view class="flex items-center justify-between border-b border-[#f5f5f5] py-[30rpx]">
        <text class="text-[28rpx] text-[#626364]">
          身份证号码
        </text>
        <wd-input
          v-model="formData.idCard" type="number" no-border placeholder="请输入身份证号码"
          custom-input-class="text-right"
        />
      </view>
    </view>
    <view class="mx-[30rpx] mt-[30rpx] flex items-center justify-center">
      <wd-checkbox v-model="agreePrivacy" />
      <text class="ml-[10rpx] text-[24rpx] text-[#181818]">
        您已阅读并同意入驻协议
      </text>
    </view>

    <view class="fixed bottom-[40rpx] left-[30rpx] right-[30rpx] flex gap-[20rpx]">
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center border border-[#ddd] rounded-[45rpx] bg-white text-[28rpx] text-[#666]"
        @click="resetForm"
      >
        重置
      </view>
      <view
        class="h-[90rpx] flex flex-1 items-center justify-center rounded-[45rpx] text-[28rpx] text-white"
        style="background: linear-gradient(106deg, #078af3 0%, #0668eb 100%);" @click="submitApplication"
      >
        提交申请
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 使用unocss，无需额外样式
</style>
