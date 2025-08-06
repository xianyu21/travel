<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const phoneNumber = ref('')
const verificationCode = ref('')
const agreedToTerms = ref(false)
const codeSent = ref(false)
const codeSending = ref(false)
const countdown = ref(60)
let timer: NodeJS.Timeout | null = null

onLoad(() => {
  // 假设首次加载时验证码输入框不显示
  codeSent.value = false
})

function goBack() {
  uni.navigateBack()
}

function getVerificationCode() {
  if (!phoneNumber.value || codeSending.value)
    return

  codeSending.value = true
  codeSent.value = true
  countdown.value = 60

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
    else {
      clearInterval(timer!)
      codeSending.value = false
      timer = null
    }
  }, 1000)

  // 模拟发送验证码请求
  console.log('发送验证码到:', phoneNumber.value)
  uni.showToast({
    title: '验证码已发送',
    icon: 'none',
  })
}

function toggleAgreement() {
  agreedToTerms.value = !agreedToTerms.value
}

function login() {
  if (!phoneNumber.value || !verificationCode.value || !agreedToTerms.value) {
    uni.showToast({
      title: '请填写完整信息并同意用户协议',
      icon: 'none',
    })
    return
  }
  // 模拟登录请求
  console.log('登录中...', {
    phoneNumber: phoneNumber.value,
    verificationCode: verificationCode.value,
  })
  uni.showToast({
    title: '登录成功',
    icon: 'success',
  })
  // 登录成功后跳转到首页
  uni.reLaunch({
    url: '/pages/index/index',
  })
}

function wechatLogin() {
  uni.showToast({
    title: '微信登录功能待开发',
    icon: 'none',
  })
}
</script>

<template>
  <view class="login-container">
    <view class="i-ph-x-bold absolute left-4 top-4 text-2xl" @click="goBack" />
    <view class="header">
      <text class="greeting">
        你好，
      </text>
      <text class="welcome">
        欢迎来到旅接
      </text>
    </view>

    <view class="input-group">
      <view class="phone-input">
        <text class="country-code">
          +86
        </text>
        <input v-model="phoneNumber" type="number" placeholder="请输入手机号" class="flex-1">
        <button
          class="get-code-btn"
          :disabled="!phoneNumber || codeSending"
          :class="{ 'is-sending': codeSending }"
          @click="getVerificationCode"
        >
          {{ codeSending ? `${countdown}s` : '获取验证码' }}
        </button>
      </view>
      <input v-if="codeSent" v-model="verificationCode" type="number" placeholder="请输入验证码" class="verification-input">
    </view>

    <button class="login-btn" :disabled="!phoneNumber || !verificationCode" @click="login">
      登录
    </button>

    <view class="agreement">
      <label class="flex items-center">
        <radio :checked="agreedToTerms" color="#018d71" style="transform:scale(0.7)" @click="toggleAgreement" />
        <text class="text-sm">您已阅读并同意用户协议</text>
      </label>
    </view>

    <view class="third-party-login">
      <text class="text-sm text-gray-500">
        使用第三方账号登录
      </text>
      <view class="wechat-icon" @click="wechatLogin">
        <image src="@img/wechat.png" class="h-10 w-10" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  @apply flex flex-col items-center pt-20 px-8 h-screen bg-white;

  .header {
    @apply w-full text-left mb-10;
    .greeting {
      @apply text-3xl font-bold block;
    }
    .welcome {
      @apply text-2xl text-gray-700 block mt-2;
    }
  }

  .input-group {
    @apply w-full mb-8;
    .phone-input {
      @apply flex items-center bg-gray-100 rounded-lg p-3 mb-4;
      .country-code {
        @apply text-lg mr-2;
      }
      input {
        @apply text-lg;
      }
      .get-code-btn {
        @apply bg-blue-500 text-white text-sm px-4 py-2 rounded-full;
        &[disabled] {
          @apply bg-blue-200;
        }
        &.is-sending {
          @apply bg-gray-400;
        }
      }
    }
    .verification-input {
      @apply w-full bg-gray-100 rounded-lg p-3 text-lg;
    }
  }

  .login-btn {
    @apply w-full bg-blue-500 text-white text-lg py-3 rounded-full mb-4;
    &[disabled] {
      @apply bg-blue-200;
    }
  }

  .agreement {
    @apply mb-8;
  }

  .third-party-login {
    @apply flex flex-col items-center;
    .wechat-icon {
      @apply mt-4 p-3 rounded-full bg-gray-100;
    }
  }
}
</style>
