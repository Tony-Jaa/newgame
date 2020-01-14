export const serviceApi = {
  //是否购买
  isBuy: '/api/wx/crs/user/isBuy',
  getWxSign: '/api/wx/crs/public/getWxSign',
  // 评论列表（分页）
  pageComment: '/api/wx/crs/course/pageComment',
  // 写评论
  addComment: '/api/wx/crs/course/addComment',
  // 获得资源详情
  getInfo: '/api/wx/crs/resources/getInfo',
  //视频音频地址
  getPlayInfo: '/api/wx/crs/public/getPlayInfo',
  getCourseIdByResId: "/api/wx/crs/resources/getCourseIdByResId",
  save: "/api/wx/crs/browsecourselog/save",
  // 收藏
  doCollection: '/api/wx/crs/user/doCollection',
  // 获取课程的详细信息
  getCourseInfoOfApp: '/api/wx/crs/course/getCourseInfoOfApp',
  // 获取课程列表（资源列表）
  getCourseResources: '/api/wx/crs/course/getCourseResources',
  getCourseRemark: '/api/wx/crs/course/getCourseRemark',
  // 购买课程
  unifiedorder: '/api/wx/crs/pay/unifiedorder',
  //资源支付
  resUnifiedorder: '/api/wx/crs/pay/resUnifiedorder ',
  //视频相关
  getVideoPlayAuth: '/api/wx/crs/public/getVideoPlayAuth',
  listcourse: "/api/wx/crs/course/listcourse",
}
export default serviceApi