const serviceApi = {
    // 获取问题标签 - completeInfo
    getLabelListByAgeBracket: '/api/wx/crs/courselabel/getLabelListByAgeBracket',
    // 修改用户信息
    updateUserInfo: '/api/wx/crs/user/updateUserInfo',
    // 分享
    getWxSign: '/api/wx/crs/public/getWxSign',
    // 获取授权用户信息
    doLogin: '/api/wx/crs/user/doLogin',
    // 获取轮播图信息  -homeswiper
    getList: '/api/wx/crs/banner/getList',
    // 获取资源信息
    getResourceInfo: '/api/wx/crs/resources/getInfo',
    //已购收藏
    getUserCollection: '/api/wx/crs/user/getUserCollection',
    // 获得用户信息
    getUserInfo: '/api/wx/crs/user/getUserInfo',
      // 发送短信
  sendMsg: '/api/wx/crs/user/sendMsg',
    //帮助他人
    addShare: '/api/wx/crs/user/addShare',
    // 浏览记录
    mybrowsecourselog:'/api/wx/crs/browsecourselog/mybrowsecourselog',
      //开通vip费用
  getUserVipFee:'/api/wx/crs/user/getUserVipFee',
    //分享进度
    getUserShare: '/api/wx/crs/user/getUserShare',
      // vip支付
  vipUnifiedorder: '/api/wx/crs/pay/vipUnifiedorder',
    // 根据资源查课程
    getCourseIdByResId:'/api/wx/crs/resources/getCourseIdByResId'
}

export default serviceApi