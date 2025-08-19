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
// 系统通知列表
export function getSystemMsgPage(data) {
  return http.post('/notice/mySystemNotice', data)
}
// 订单服务通知列表
export function getOrderMsgPage(data) {
  return http.post('/notice/myOrderNotice', data)
}
// 更改通知为已读 跳转列表或者详情前调用
export function getReadSystemNotice(data) {
  return http.post('/notice/readSystemNotice', data)
}
export function getReadOrderNotice(data) {
  return http.post('/notice/readOrderNotice', data)
}
// 一键已读
export function getReadAllSystemNotice() {
  return http.post('/notice/readAllSystemNotice')
}
export function getReadAllOrderNotice() {
  return http.post('/notice/readAllOrderNotice')
}
// 佣金明细
export function getBalanceDetails() {
  return http.post('/currentUser/balanceDetails')
}
// 提现申请
export function getDrawApply(data) {
  return http.post('/currentUser/drawApply', data)
}
// 编辑资料
export function updateBaseInfo(data) {
  return http.post('/currentUser/updateBaseInfo', data)
}
// 完善入驻资料 /currentUser/registerReceiveUser
export function registerReceiveUser(data) {
  return http.post('/currentUser/registerReceiveUser', data)
}
// 统计 /index/statis
export function getStatis() {
  return http.post('/index/statis')
}
// 续单详情 order/continueOrderDetail
export function getContinueOrderDetail(data) {
  return http.post('/order/continueOrderDetail', data)
}
// 独有
// 订单列表
export function getOrderList(data) {
  return http.post('/order/myOrder', data)
}
// 订单详情
export function getOrderDetail(data) {
  return http.post('/order/orderDetail', data)
}
// 订单退款 travel/refund
export function getTravelRefund(data) {
  return http.post('/travel/refund', data)
}
// 订单申请人列表 travel/applyList
export function getTravelApplyList(data) {
  return http.post('/travel/applyList', data)
}
// 订单申请同意 travel/agreeApply
export function getTravelAgreeApply(data) {
  return http.post('/travel/agreeApply', data)
}
// 已完成 travel/complete
export function getComplete(data) {
  return http.post('/travel/complete', data)
}
// 投诉 /order/complaint
export function getComplaint(data) {
  return http.post('/order/complaint', data)
}
// 评价 /order/evaluate
export function getEvaluate(data) {
  return http.post('/order/evaluate', data)
}
// 续单前 获取价格 travel/continueTrade
export function getContinueTrade(data) {
  return http.post('/travel/continueTrade', data)
}
// 支付前提交续单订单 travel/continueOrder
export function getContinueOrder(data) {
  return http.post('/travel/continueOrder', data)
}
// 我收藏的旅接 receiveUser/myCollect
export function getMyCollect(data) {
  return http.post('/receiveUser/myCollect', data)
}
// 收藏旅接 receiveUser/collect
export function getCollect(data) {
  return http.post('/receiveUser/collect', data)
}
// 取消收藏 travel/cancelCollect
export function getCancelCollect(data) {
  return http.post('/receiveUser/cancelCollect', data)
}
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
  return http.post('/receiveUser/page', data)
}
// 旅接人 详情
export function getTraveInfo(data) {
  return http.post('/receiveUser/detail', data)
}

// 旅接人 评价列表
export function getTraveCommentList(data) {
  return http.post('/receiveUser/evaluationPage', data)
}
// 服务列表 所有
export function getServiceList() {
  return http.post('/service/list')
}
// 服务列表 对应人
export function getServicePlace(data) {
  return http.post('/service/userServiceList', data)
}
// 服务列表 明细
export function getServiceDetail(data) {
  return http.post('/service/detail', data)
}
// 需求提交
export function getTravelPunishOrder(data) {
  return http.post('/travel/punishOrder', data)
}
// 下单提交
export function getTravelOrder(data) {
  return http.post('/travel/order', data)
}
// 获取价格
export function getTravelTrade(data) {
  return http.post('/travel/trade', data)
}
// 客户端获取入驻信息 /currentUser/getReceiveUserInfo
export function getReceiveUserInfo() {
  return http.post('/currentUser/getReceiveUserInfo')
}
