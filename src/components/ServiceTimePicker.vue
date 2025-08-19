<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import 'dayjs/locale/zh-cn'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  defaultDate: {
    type: String,
    default: '',
  },
  defaultTimeRange: {
    type: String,
    default: '14:00-16:00',
  },
})

const emit = defineEmits(['close', 'confirm'])

// 设置 dayjs 为中文
dayjs.locale('zh-cn')

// 选中的日期和时间
const selectedDayIndex = ref(0)
const selectedTime = ref('14:00')
const currentDate = ref(dayjs())
const weekDays = ref([])

// 生成周日期数据
function generateWeekDays() {
  const days = []
  for (let i = 0; i < 7; i++) {
    const day = currentDate.value.add(i, 'day')
    days.push({
      date: day,
      name: day.format('ddd').replace('周', '周'),
      number: day.format('D'),
      fullDate: day.format('YYYY-MM-DD'),
    })
  }
  return days
}

// 初始化周日期数据
onMounted(() => {
  weekDays.value = generateWeekDays()
  // 默认选中今天
  selectedDayIndex.value = 0
})

// 时间点数据
const timePoints = [
  '0:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

// 初始化周日期数据
onMounted(() => {
  weekDays.value = generateWeekDays()
  // 默认选中今天
  selectedDayIndex.value = 0
})

// 计算选中的日期字符串
const selectedDate = computed(() => {
  if (weekDays.value.length === 0)
    return ''
  return weekDays.value[selectedDayIndex.value]?.fullDate || ''
})

// 计算选中的时间点字符串
const selectedTimeText = computed(() => selectedTime.value)

// 判断时间点是否被选中
function isTimeSelected(time) {
  return selectedTime.value === time
}

// 选择日期
function selectDay(index) {
  selectedDayIndex.value = index
}

// 选择时间点
function selectTime(time) {
  selectedTime.value = time
}

// 关闭时间选择器
function handleClose() {
  emit('close')
}

// 确认选择
function handleConfirm() {
  if (weekDays.value.length === 0)
    return
  const selectedDay = weekDays.value[selectedDayIndex.value]
  emit('confirm', {
    date: selectedDay.fullDate,
    time: selectedTime.value,
    fullTime: `${selectedDay.fullDate} ${selectedTime.value}`,
    dayjs: selectedDay.date,
  })
}
</script>

<template>
  <wd-overlay :show="show">
    <view v-if="show" class="time-picker-popup">
      <view class="time-picker-header">
        <text class="time-picker-title">
          服务时间
        </text>
        <text class="time-picker-close" @click="handleClose">
          ×
        </text>
      </view>

      <view class="selected-time">
        已选时间 {{ selectedDate }} {{ selectedTimeText }}
      </view>

      <!-- 日期选择 -->
      <view class="date-selector">
        <view
          v-for="(day, index) in weekDays"
          :key="index"
          class="date-item" :class="[selectedDayIndex === index ? 'date-selected' : '']"
          @click="selectDay(index)"
        >
          <text class="day-name">
            {{ day.name }}
          </text>
          <text class="day-number">
            {{ day.number }}
          </text>
        </view>
      </view>

      <!-- 时间点选择 -->
      <view class="time-slots-container">
        <view v-for="row in 4" :key="row" class="time-slots-row">
          <view
            v-for="(time, index) in timePoints.slice((row - 1) * 6, row * 6)"
            :key="time"
            class="time-slot" :class="[isTimeSelected(time) ? 'time-slot-selected' : '']"
            @click="selectTime(time)"
          >
            <text class="time-range">
              {{ time }}
            </text>
          </view>
        </view>
      </view>

      <!-- 底部价格和按钮 -->
      <view class="time-picker-footer">
        <view class="submit-button" @click="handleConfirm">
          确认
        </view>
      </view>
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>
.time-picker-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 30rpx;
  z-index: 91000;
}

.time-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.time-picker-title {
  font-size: 36rpx;
  font-weight: bold;
}

.time-picker-close {
  font-size: 48rpx;
  color: #999;
}

.selected-time {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.date-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40rpx;
}

.date-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rpx;
  height: 80rpx;
  border-radius: 10rpx;
  background-color: #f5f5f5;
  padding: 10rpx 0;
}

.date-selected {
  background-color: #0669eb;
  color: #fff;
}

.day-name {
  font-size: 24rpx;
}

.day-number {
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 10rpx;
}

.time-slots-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.time-slots-row {
  display: flex;
  justify-content: space-between;
}

.time-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rpx;
  //   height: 80rpx;
  border-radius: 10rpx;
  //   background-color: #f5f5f5;
  padding: 10rpx 0;
  font-size: 24rpx;
}

.time-slot-selected {
  background-color: #0669eb;
  color: #fff;
}

.time-range {
  font-size: 24rpx;
}

.time-separator {
  font-size: 20rpx;
  margin: 4rpx 0;
}

.time-picker-footer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20rpx 30rpx;
  background-color: #fff;
  //   box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.price-container {
  display: flex;
  align-items: baseline;
}

.price-label {
  font-size: 28rpx;
  color: #abaeb2;
}

.price-symbol {
  font-size: 28rpx;
  color: #ea333f;
}

.price-value {
  font-size: 48rpx;
  font-weight: bold;
  color: #ea333f;
}

.submit-button {
  height: 80rpx;
  width: 254rpx;
  border-radius: 40rpx;
  background: linear-gradient(87deg, #0788f3 0%, #0769eb 100%);
  color: #fff;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
