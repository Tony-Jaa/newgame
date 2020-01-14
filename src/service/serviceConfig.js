export const serviceApi = {
  // 小Z懂你
  getRecommendResources: '/api/wx/crs/user/getRecommendResources',
  // 获取课堂列表
  getCollegeList: '/api/wx/crs/college/getCollegeList',
  getCourseList: '/api/wx/crs/course/getCourseList',
  getWxSign: '/api/wx/crs/public/getWxSign',
  getCourseResources: '/api/wx/crs/course/getCourseResources',
  getCourseRemark: '/api/wx/crs/course/getCourseRemark',
  // 获取accesstoken
  getAcessToken: '/api/wx/crs/public/getAcessToken',
  // 获取学院详情
  getCollegeInfo: '/api/wx/crs/college/getCollegeInfo',
  // 获取学院列表
  getCollegePage: '/api/wx/crs/college/page',
  // 根据学院ID查询课程列表
  getCourseList: '/api/wx/crs/course/getCourseList',
  // 获取课程的详细信息
  getCourseInfoOfApp: '/api/wx/crs/course/getCourseInfoOfApp',
  // 获取授权用户信息
  doLogin: '/api/wx/crs/user/doLogin',
  // 收藏
  doCollection: '/api/wx/crs/user/doCollection',
  // 评论列表（分页）
  pageComment: '/api/wx/crs/course/pageComment',
  // 写评论
  addComment: '/api/wx/crs/course/addComment',
  // 获取课程列表（资源列表）
  getCourseResources: '/api/wx/crs/course/getCourseResources',
  // 评论列表
  pageComment: '/api/wx/crs/course/pageComment',
  // 购买课程
  unifiedorder: '/api/wx/crs/pay/unifiedorder',
  //是否购买
  isBuy: '/api/wx/crs/user/isBuy',
  // 获得资源详情
  getInfo: '/api/wx/crs/resources/getInfo',
  // 获得用户信息
  getUserInfo: '/api/wx/crs/user/getUserInfo',
  // 修改用户信息
  updateUserInfo: '/api/wx/crs/user/updateUserInfo',
  //已购收藏
  getUserCollection: '/api/wx/crs/user/getUserCollection',
  //推广员申请
  promoteradd: '/api/wx/crs/promoter/add',
  //推广员点击确定
  promotercheck:'/api/wx/crs/promoter/check',
  //推广中心
  getPromoterBasicInfo: '/api/wx/crs/promoter/getPromoterBasicInfo',
  //奖励金佣金提现
  getOutCashLastRecord: '/api/wx/crs/promoter/getOutCashLastRecord',
  //提现申请
  applyOutCash: '/api/wx/crs/promoter/applyOutCash',
  //分享进度
  getUserShare: '/api/wx/crs/user/getUserShare',
  // 发送短信
  sendMsg: '/api/wx/crs/user/sendMsg',
  //帮助他人
  addShare: '/api/wx/crs/user/addShare',
  //视频音频地址
  getPlayInfo: '/api/wx/crs/public/getPlayInfo',
  //开通vip费用
  getUserVipFee:'/api/wx/crs/user/getUserVipFee',
  //视频相关
  getVideoPlayAuth:'/api/wx/crs/public/getVideoPlayAuth',
  // 推广人申请支付
  promoterUnifiedorder: '/api/wx/crs/pay/promoterUnifiedorder',
  // vip支付
  vipUnifiedorder: '/api/wx/crs/pay/vipUnifiedorder',
  //资源支付
  resUnifiedorder:'/api/wx/crs/pay/resUnifiedorder',
  //接受邀请：
  receiveProp:'/api/wx/crs/user/receiveProp',

  receivePropVip:'/api/wx/crs/user/receiveVip',
  // 首页轮播图
  bannerGetList:'/api/wx/crs/banner/getList',
  // 根据资源查课程
  getCourseIdByResId:'/api/wx/crs/resources/getCourseIdByResId'
 

}

export default serviceApi
