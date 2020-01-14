const serviceApi = {
  // 获取问题标签 - completeInfo
  getLabelListByAgeBracket: '/api/wx/crs/courselabel/getLabelListByAgeBracket',
  // 修改用户信息
  updateUserInfo: '/api/wx/crs/user/updateUserInfo',
  // 获取课堂列表  -home
  getCollegeList: '/api/wx/crs/college/getCollegeList',
  // 小Z懂你
  getRecommendResources: '/api/wx/crs/user/getRecommendResources',
  // 分享
  getWxSign: '/api/wx/crs/public/getWxSign',
  // 获取授权用户信息
  doLogin: '/api/wx/crs/user/doLogin',
  // 获取轮播图信息  -homeswiper
  getList: '/api/wx/crs/banner/getList',
  // 获取资源信息
  getResourceInfo: '/api/wx/crs/resources/getInfo',
  // 获取推广信息
  getPromoterBasicInfo: '/api/wx/crs/promoter/getPromoterBasicInfo',
  //资源支付
  resUnifiedorder: '/api/wx/crs/pay/resUnifiedorder',
}



export default serviceApi