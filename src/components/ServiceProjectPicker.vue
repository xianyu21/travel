<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false, // 默认单选
  },
  defaultSelected: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'confirm'])

// 服务项目数据
const serviceProjects = [
  { id: 1, name: '陪玩陪拍' },
  { id: 2, name: '逛街陪伴' },
  { id: 3, name: '陪伴旅游' },
  { id: 4, name: '陪伴游戏' },
]

// 选中的项目
const selectedProjects = ref([...props.defaultSelected])

// 判断项目是否被选中
function isProjectSelected(project) {
  return selectedProjects.value.some(item => item.id === project.id)
}

// 选择项目
function selectProject(project) {
  if (props.multiple) {
    // 多选模式
    const index = selectedProjects.value.findIndex(item => item.id === project.id)
    if (index > -1) {
      // 已选中，取消选择
      selectedProjects.value.splice(index, 1)
    }
    else {
      // 未选中，添加选择
      selectedProjects.value.push(project)
    }
  }
  else {
    // 单选模式
    if (isProjectSelected(project)) {
      // 已选中，取消选择
      selectedProjects.value = []
    }
    else {
      // 未选中，替换选择
      selectedProjects.value = [project]
    }
  }
}

// 关闭选择器
function handleClose() {
  emit('close')
}

// 确认选择
function handleConfirm() {
  emit('confirm', {
    selected: selectedProjects.value,
    names: selectedProjects.value.map(item => item.name).join('、'),
  })
}
</script>

<template>
  <wd-overlay :show="show">
    <view v-if="show" class="service-picker-popup">
      <view class="service-picker-header">
        <text class="service-picker-title">
          服务项目
        </text>
        <text class="service-picker-close" @click="handleClose">
          ×
        </text>
      </view>

      <!-- 服务项目选择 -->
      <view class="service-projects-container">
        <view class="service-projects-row">
          <view
            v-for="project in serviceProjects.slice(0, 4)"
            :key="project.id"
            class="service-project-item"
            :class="[isProjectSelected(project) ? 'service-project-selected' : '']"
            @click="selectProject(project)"
          >
            <text class="service-project-name">
              {{ project.name }}
            </text>
          </view>
        </view>

        <view class="service-projects-row">
          <view
            v-for="project in serviceProjects.slice(4, 8)"
            :key="project.id"
            class="service-project-item"
            :class="[isProjectSelected(project) ? 'service-project-selected' : '']"
            @click="selectProject(project)"
          >
            <text class="service-project-name">
              {{ project.name }}
            </text>
          </view>
        </view>
      </view>

      <!-- 底部确认按钮 -->
      <view class="service-picker-footer">
        <view class="confirm-button" @click="handleConfirm">
          确定
        </view>
      </view>
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>
.service-picker-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 30rpx;
  z-index: 1000;
}

.service-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.service-picker-title {
  font-size: 36rpx;
  font-weight: bold;
}

.service-picker-close {
  font-size: 48rpx;
  color: #999;
}

.service-projects-container {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  margin-bottom: 60rpx;
}

.service-projects-row {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
}

.service-project-item {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid transparent;
}

.service-project-selected {
  background-color: #e6f3ff;
  border-color: #0669eb;
}

.service-project-name {
  font-size: 28rpx;
  color: #333;
}

.service-project-selected .service-project-name {
  color: #0669eb;
}

.service-picker-footer {
  display: flex;
  justify-content: center;
}

.confirm-button {
  width: 100%;
  height: 80rpx;
  border-radius: 40rpx;
  background: linear-gradient(87deg, #0788f3 0%, #0769eb 100%);
  color: #fff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
