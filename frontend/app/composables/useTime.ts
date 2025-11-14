import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export function getChineseDate() {
  return dayjs().tz('Asia/Shanghai')
}

// 返回num天前的日期
export function useTime(num: number) {
  return getChineseDate().subtract(num, 'day').format('YYYY-MM-DD')
}

export function useDayParts() {
  const state = ref('')
  const hours = getChineseDate().format('HH')
  const hour = Number.parseInt(hours)
  if (hour >= 0 && hour <= 11)
    state.value = '早上好!'
  else if (hour > 11 && hour <= 14)
    state.value = '中午好!'
  else if (hour > 14 && hour <= 18)
    state.value = '下午好!'
  else if (hour > 18 && hour <= 24)
    state.value = '晚上好!'
  return state
}
