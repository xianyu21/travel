import { http } from '@/http/http'
// export function getCode() {
//   return http.get('/user/getCode')
// }
// export function login(loginForm) {
//   return http.post('/user/login', loginForm)
// }
//  客户端
//  获取验证码
export function getSendSms(data) {
  return http.post('/message/sendSms', data)
}
// 获取广告 广告类型 1首页封面 2首页中间宣传  3旅接封面  4入驻协议  5用户协议 6下单须知 7订单发布须知 8我的-推广文案 9公司简介 10隐私政策 11优惠券使用规则
export function getByType(data) {
  return http.post('/advert/getByType', data)
}
// 地址管理
export function getMyAddr(data) {
  return http.post('/addr/myAddr', data)
}
// 地址添加
export function getAddAddr(data) {
  return http.post('/addr/addAddr', data)
}
// 地址编辑
export function getUpdateAddr(data) {
  return http.post('/addr/updateAddr', data)
}
// 地址详情
export function getAddrDetail(data) {
  return http.post('/addr/detail', data)
}
// 地址删除
export function getRemoveAddr(data) {
  return http.post('/addr/removeAddr', data)
}
// 我的默认地址
export function getMyDefaltAddr(data) {
  return http.post('/addr/myDefaltAddr', data)
}
// 设置地址默认
export function getSetDefault(data) {
  return http.post('/addr/setDefault', data)
}
// 独有
// 攻略列表
export function getStrategyPage(data) {
  return http.post('/strategy/page', data)
}
// 攻略详情
export function getStrategyDetail(data) {
  return http.post('/strategy/detail', data)
}
// 景点列表
export function getSpotPage(data) {
  return http.post('/spot/page', data)
}

// 景点详情
export function getSpotDetail(data) {
  return http.post('/spot/detail', data)
}
// 景点收藏
export function getSpotCollect(data) {
  return http.post('/spot/collect', data)
}

// 景点取关
export function getSpotCancelCollect(data) {
  return http.post('/spot/cancelCollect', data)
}
// 景点我的
export function getMySpot(data) {
  return http.post('/spot/mySpot', data)
}
// 优惠券 我的
export function getCouponMy(data) {
  return http.post('/coupon/availableCoupon', data)
}
// 优惠券 可用
export function getCouponAvailable() {
  return http.post('/coupon/availableCoupon')
}
// 旅接人 推荐列表
export function getTravelList(data) {
  return http.post('/travel/receiveUserPage', data)
}

// 旅接人 详情
export function getTraveInfo(data) {
  return http.post('/travel/receiveUserDetail', data)
}

// 旅接人 评价列表
export function getTraveCommentList(data) {
  return http.post('/travel/receiveUserEvaluationPage', data)
}
// 服务列表 所有
export function getServiceList() {
  return http.post('/service/list')
}
// 服务列表 对应人
export function getServicePlace(data) {
  return http.post('/travel/userServiceList', data)
}
// 服务列表 明细
export function getServiceDetail(data) {
  return http.post('/service/detail', data)
}
