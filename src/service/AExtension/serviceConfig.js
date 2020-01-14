export const serviceApi = {
  //接受邀请：
  receiveProp: '/api/wx/crs/user/receiveProp',
  getWxSign: '/api/wx/crs/public/getWxSign',
  // 获取授权用户信息
  doLogin: '/api/wx/crs/user/doLogin',
  receivePropVip: '/api/wx/crs/user/receiveVip',
  //进入页面时就会判断有没有用户数据
  getPromoterBasicInfo: '/api/wx/crs/promoter/getPromoterBasicInfo',

  // 推广人申请支付
  promoterUnifiedorder: '/api/wx/crs/pay/promoterUnifiedorder',
  //推广员申请
  promoteradd: '/api/wx/crs/promoter/add',

  upgrade: "/api/wx/crs/promoter/upgrade",
  getList: "/api/wx/crs/rule/getList",
  getUserInfo: "/api/wx/crs/user/getUserInfo",
  //推广员点击确定
  promotercheck: '/api/wx/crs/promoter/check',
  getList: "/api/wx/crs/rule/getList",
  applyOutCash: "/api/wx/crs/promoter/applyOutCash",
  //奖励金佣金提现
  getOutCashLastRecord: '/api/wx/crs/promoter/getOutCashLastRecord',
}

export default serviceApi