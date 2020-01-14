<template>
  <div
    id="coursedetail"
    class="main-wrap"
    style="background:#FAFAFA;"
  >
    <div v-show="!audioShow" class="detailback">
      <img class="detailbackImg" :src="resultMap.banner" />
    </div>

    <div  v-show="!audioShow"   class="course-details">
      <div class="detail-tit">
        <p>{{resultMap.title}}</p>
        <div class="icon">
          <div style="display: inline-block;" @click="collection(1)">
            <img
              src="../../assets/images/coursebar/collection-has.png"
              class="collection"
              v-if="hascollect"
            />
            <img
              src="../../assets/images/coursebar/collection.png"
              class="collection"
              v-if="!hascollect"
            />
          </div>
          <img
            @click="$toast({message: '点击右上角分享',icon: 'share'})"
            src="../../assets/images/coursebar/share.png"
            class="collection"
          />
        </div>
      </div>
      <div class="detail-des">{{resultMap.describes}}</div>
      <div class="detail-info">
        <div>已更新{{courselist.length}}课&emsp;|&emsp;共{{courselist.length}}课</div>
        <div class="detail-label">{{resultMap.label}}</div>
      </div>
    </div>
    <div  v-show="!audioShow"  style="height:0.12rem;background:rgba(233,233,233,.6);"></div>

    <div  v-show="!audioShow"  class="course-bar">
      <van-tabs v-model="tabindex" :line-width="'0.39rem'" :sticky="true">
        <van-tab class="remark" title="课程详情" :name="0">
          <div v-show="tabindex == 0">
            <div class="detaildiv" style="min-height:3.4rem;">
              <div style="height:100%;" class="class-desc-wrap" :class="[fixedTop?'fixedTop':'']">
                <div class="detailtit">{{remarktit}}</div>
                <div class="detailcontent" id="remark" v-html="remark">{{remark}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="课程列表" :name="1">
          <div v-show="tabindex == 1">
            <div class="class-desc-wrap" :class="[fixedTop?'fixedTop':'']">
              <div
                v-for="(item,index) in courselist"
                class="class-desc-item-wrap"
                v-bind:key="item.id"
                @click="godetail(item.typeValue,item.id,item.chargingStandard,index)"
              >
                <div class="class-icon-wrap">
                  <img
                    v-if="item.typeValue === '视频'&&nowPlayingIndex!==index&&!item.watchDuration>0"
                    class="cass-icon"
                    src="../../assets/images/coursebar/video.png"
                  />
                  <img
                    v-if="item.typeValue === '视频'&&nowPlayingIndex!==index&&item.watchDuration>0"
                    class="cass-icon"
                    src="../../assets/images/coursebar/video-read.png"
                  />
                  <img
                    v-if="item.typeValue === '音频'&&nowPlayingIndex!==index&&!item.watchDuration>0"
                    class="cass-icon"
                    src="../../assets/images/coursebar/audio.png"
                  />
                  <img
                    v-if="item.typeValue === '音频'&&nowPlayingIndex!==index&&item.watchDuration>0"
                    class="cass-icon"
                    src="../../assets/images/coursebar/audio-read.png"
                  />
                  <img
                    v-if="item.typeValue === '图文'&&nowPlayingIndex!==index&&!item.watchDuration>0"
                    class="cass-icon"
                    src="../../assets/images/coursebar/imgText.png"
                  />
                  <img
                    v-if="item.typeValue === '图文'&&nowPlayingIndex!==index&&item.watchDuration>0"
                    class="cass-icon"
                    src="../../assets/images/coursebar/imgText-read.png"
                  />
                  <!-- <img
                
                src="../../assets/images/coursebar/now.png"
                class="cass-icon"
                alt
                  />-->
                  <div class="now-icons" v-if="nowPlayingIndex===index">
                    <div
                      class="now-icon"
                      :class="[listenNum==1?'':listenNum==2?'now-icon75':listenNum==3?'now-icon100':'now-icon75']"
                    ></div>
                    <div
                      class="now-icon"
                      :class="[listenNum==1?'now-icon75':listenNum==2?'now-icon100':listenNum==3?'now-icon75':'']"
                    ></div>
                    <div
                      class="now-icon"
                      :class="[listenNum==1?'now-icon100':listenNum==2?'now-icon75':listenNum==3?'':'now-icon75']"
                    ></div>
                  </div>
                </div>
                <div class="class-desc">
                  <div class="class-desc-center">
                    <div class="desc-tit">
                      <span
                        :class="[nowPlayingIndex===index?'nowplaying':item.watchDuration>0?'has-read':'']"
                      >{{item.name}}</span>
                      <div
                        v-if="((item.typeValue === '图文'||item.typeValue === '视频')&&item.chargingStandard == 2&&vip==0)||(resultMap.costPrice>0&&item.costPrice==0&&(item.typeValue === '图文'||item.typeValue === '视频'))"
                        class="free-btn"
                      >试看</div>
                      <div
                        v-if="(item.typeValue === '音频')&&item.chargingStandard == 2&&vip==0||(resultMap.costPrice>0&&item.costPrice==0&&(item.typeValue === '音频'))"
                        class="free-btn"
                      >试听</div>
                      <div v-if="item.chargingStandard == 1" class="pay-btn">付费</div>
                    </div>
                    <!-- <div
                  class="class-sub-title"
                  v-if="item.name"
                  style="color:#040000"
                    >{{item.name || ''}}</div>-->
                    <div class="desc-num" v-if="item.playNumber">
                      <div>
                        <span>{{item.playNumber || ''}}次学习</span>
                        <span
                          v-if="item.watchProgress==100"
                          style="color:rgba(255,209,0,1);margin-left:0.15rem"
                        >已播完</span>
                        <span
                          v-if="item.watchProgress!=100&&item.watchProgress!=0"
                          style="color:rgba(255,209,0,1);margin-left:0.15rem"
                        >已播{{item.watchProgress}}%</span>
                      </div>
                      <span>时长&nbsp;{{optionTimes(item.duration)}}</span>
                    </div>
                  </div>
                  <!-- <div class="video-button-wrap">
                <span class="video-button">
                  <img
                    src="../../assets/images/video_button_blue.png"
                    v-if="item.chargingStandard == 2"
                  />
                  <span v-if="item.chargingStandard == 2">免费观看</span>
                  <img
                    src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/getfee.png"
                    v-if="item.chargingStandard == 1"
                  />
                  <span v-if="item.chargingStandard == 1">付费观看</span>
                </span>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <popUp v-if="popShow">
      <template v-slot>
        <p>尊贵的小Z思维VIP</p>
        <p>您可专享场景式思维丛林</p>
        <p>系列课程</p>
      </template>
    </popUp>
    <popUp v-if="popShow2">
      <template v-slot>
        <p>尊贵的小Z思维VIP</p>
        <p>您可享受付费内容八五折优惠</p>
        <p>及AI解决方案</p>
      </template>
    </popUp>
    <notVipDialog v-if="notVipDialogShow" @closethis="closeNotVip"></notVipDialog>
    <coursebar
      v-if="!audioShow&&!videoShow"
      :isvideo="courseType"
      :playing="playing"
      @handlePay="handlePay"
      :showComment="false"
      @shiting="godetail(courselist[0].typeValue,courselist[0].id,courselist[0].chargingStandard,0)"
      :result-map="resultMap"
    ></coursebar>
    <audioDetails
      :course-id="$route.params.id"
      :audio-id="selectAudioId"
      :audio-index="nowPlayingIndex"
      :courselist="courselist"
      :title="resultMap.title"
      :audioShow="audioShow"
      :result="resultMap"
      :playing="playing"
      @nextAudio="nextAudio(true)"
      @preAudio="nextAudio(false)"
      @changeAudio="nextAudio"
      @handle="handlePay"
      @shiting="godetail(courselist[0].typeValue,courselist[0].id,courselist[0].chargingStandard,0)"
      @getListAgain="getCourseResources"
      v-if="courselist[0]&&courselist[0].typeValue=='音频'"
      class="audio"
      :class="[audioShow?'audioShow ':'audioHide']"
    ></audioDetails>
    <videoDetails
      v-if="courselist[0]&&courselist[0].typeValue=='视频'"
      class="video"
      :courselist="courselist"
      :video-index="nowPlayingIndex"
      :course-id="$route.params.id"
      :result="resultMap"
      @handle="handlePay"
      @changeVideo="changeVideo"
      @shiting="godetail(courselist[0].typeValue,courselist[0].id,courselist[0].chargingStandard,0)"
      :id="selectedVideoId"
      :videoShow="videoShow"
      :playing="playing"
      :class="[videoShow?'videoShow ':'videoHide']"
    ></videoDetails>
  </div>
</template>

<script>
// import { Swiper, SwiperItem, Tab, TabItem, Toast } from "vux";
import { Tab, Tabs, Toast } from "vant";
import serviceApi from "../../service/Course/serviceConfig";

import { wxConfig } from "../../service/wx.config";
import urlencode from "urlencode";
import popUp from "./components/popUp";
import notVipDialog from "../../components/notVipDialog";
import homeDialog from "../../components/homeDialog";
import coursebar from "./components/coursebar";
import audioDetails from "./components/audiodetails";
import videoDetails from "./components/videodetails";
const wxdata = wxConfig.test;
let _this;
export default {
  name: "courseDetails",
  data() {
    return {
      demo_index: 0,
      source: 1, //1自产，2外包
      swiperList: [
        {
          url: "javascript:",
          img:
            "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/backImg.png"
        },
        {
          url: "javascript:",
          img:
            "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/backImg.png"
        }
      ],
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      tabindex: 1,
      id: "",
      courselist: [],
      resultMap: {},
      remark: {},
      collecttext: "",
      remarktit: "",
      collect: false,
      listImage: "",
      userId: "",
      failtext: "",
      commonToast: "",
      isBuyflag: false,
      hascollect: false,
      popShow: false,
      popShow2: false,
      notVipDialogShow: false,
      // topHeight: ,
      fixedTop: false, //是否固定在顶部
      audioShow: false,
      videoShow: false,
      selectAudioId: 0, //需要播放的id
      selectedVideoId: 0,
      nowPlayingIndex: "", //当前正在播放的索引
      playing: false, //音视频播放状态
      listenNum: 1, //听歌动画效果索引
      winScrollY:0
    };
  },
  computed: {
    courseType() {
      return this.courselist[0] && this.courselist[0].typeValue == "视频"
        ? true
        : false;
    },
    vip() {
      return this.$store.state.userInfo.vip;
    }
  },
  components: {
    // Swiper,
    // SwiperItem,
    vanTabs: Tabs,
    vanTab: Tab,
    Toast,
    // Toast,
    popUp,
    notVipDialog,
    coursebar, //底部bar
    audioDetails, //音频
    videoDetails, //视频
    autoId: 0
  },
  mounted: function() {
    setInterval(() => {
      this.listenNum == 4 ? (this.listenNum = 1) : this.listenNum++;
    }, 300);
    if (this.$route.query.autoId) {
      this.autoId = this.$route.query.autoId;
    }
    let hash = location.hash;
    window.onpopstate = e => {
      if (this.audioShow) {
        this.audioShow = false;
        this.handleShare();
      }
      if (this.videoShow) {
        this.videoShow = false;
        this.handleShare();
      }
    };
    _this = this;
    this.id = this.$route.params.id;
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.getDetails();
    this.getCourseResources();
    this.getCourseRemark();
    this.isBuy();
    if (!this.$store.state.userInfo.id) {
      this.$store.dispatch("getUserInfo");
    }
  },
  methods: {
    closeNotVip(data) {
      this.notVipDialogShow = data;
      if (data) return;
      let info = JSON.parse(sessionStorage.getItem("Buyinfo"));
      let isvip = this.$store.state.userInfo.vip;
      if (info && info.fast == 0 && isvip == 0) {
        sessionStorage.setItem("Buyinfo", JSON.stringify({ info }));
        this.godetail(
          info.typeValue,
          info.id,
          info.chargingStandard,
          info.index
        );
        return;
      }
      this.handlePay();
    },
    collection(type) {
      if (!this.userId) {
        // this.showfail = true;
        this.$toast("请先关注微信公共号");
        return false;
      }
      const params = {
        userId: this.userId,
        courseId: this.id
      };
      this.$http({
        method: "post",
        url: `${serviceApi.doCollection}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        data: params
      }).then(function(response) {
        if (response.data.status == "00") {
          if (type && response.data.obj == 1) {
            _this.hascollect = true;
            _this.$toast({ message: "收藏成功", icon: "like-o" });
          } else if (response.data.obj == 0) {
            _this.hascollect = false;
             _this.$toast({ message: "取消收藏成功", icon: "close" });
          }
        } else {
          // _this.showfail = true;
          _this.$toast(response.data.msg);
        }
      });
    },
    // 分享
    handleShare() {
      let wechaturl = window.location.href.split("#")[0];
      const _this = this;
      let userWechatInfo = localStorage.getItem("userWechatInfo");
      let openid = "";
      if (userWechatInfo) {
        // console.log(JSON.parse(userWechatInfo));
        openid = JSON.parse(userWechatInfo).openid;
      } else {
        openId = "";
      }
      this.$http({
        method: "get",
        url: `${serviceApi.getWxSign}?url=${encodeURIComponent(
          wechaturl
        )}&openId=${openid}`
        // timeout: 10000
      }).then(function(response) {
        if (
          response &&
          response.data &&
          response.data.status === "00" &&
          response.data.obj
        ) {
          const responseData = response.data.obj;
          wx.config({
            debug: false, // 在配置权限注入成功或者报错提示
            appId: responseData.appid, // 'wxc44de2076a05d8a5', // responseData.appid, // responseData.appId || "wx490e37b4e0ccbe27", // 微信公众号的
            nonceStr: responseData.nonceStr, //生成签名的随机传      后台返回
            signature: responseData.signature, // 签名      后台返回
            timestamp: responseData.timestamp, // 生成签名的时间戳    后台返回
            jsApiList: [
              "checkJsApi",
              "updateAppMessageShareData",
              "updateTimelineShareData"
            ] // 需要使用的js接口列表，所有js接口列表见文档
          });
          // config 成功之后的接口处理
          wx.ready(function() {
            wx.checkJsApi({
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData"
              ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                // console.log(res, "===================checkJsApi");
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              }
            });
            wx.updateTimelineShareData({
              // 分享到朋友圈及分享到QQ
              title: document.title, // 分享标题
              link: `${location.origin}/#/courseDetails/${_this.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 用户点击了分享后执行的回调函数
                console.log("分享成功");
              }
            });

            wx.updateAppMessageShareData({
              // “分享到朋友圈”及“分享到QQ空间”
              title: document.title, // 分享标题
              desc: _this.resultMap.describes
                ? `${_this.resultMap.describes}`
                : "", // 分享描述
              link: `${location.origin}/?/#/courseDetails/${_this.id}/false`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 设置成功
                console.log(
                  `分享成功${location.origin}/?/#/courseDetails/${_this.id}/false`
                );
              }
            });
          });
        }
      });
    },
    getDetails() {
      let _this = this;
      this.$http({
        method: "get",
        url:
          `${serviceApi.getCourseInfoOfApp}?id=` +
          this.id +
          "&userId=" +
          this.userId
      }).then(function(response) {
        if (response && response.data && response.data.resultMap) {
          _this.resultMap = response.data.resultMap;
          // 设置标题
          document.title = _this.resultMap.title;
          _this.handleShare();
        }
      });
    },
    getCourseResources() {
      let _this = this;
      this.$http({
        method: "get",
        url:
          `${serviceApi.getCourseResources}?courseId=` +
          this.id +
          "&userId=" +
          this.userId
      }).then(function(response) {
        if (response && response.data && response.data.data) {
          _this.courselist = response.data.data;
          for (let i = 0; i < _this.courselist.length; i++) {
            if (_this.autoId != 0 && _this.courselist[i].id == _this.autoId) {
              // 首页进入自动到对应资源
              _this.autoId = 0;
              if (!_this.videoShow && !_this.audioShow) {
                setTimeout(function() {
                  // alert(1)
                  _this.godetail(
                    _this.courselist[i].typeValue,
                    _this.courselist[i].id,
                    _this.courselist[i].chargingStandard,
                    i
                  );
                }, 500);
              }
              break;
            }
          }
          // if (response.data.resultMap.resourcesId) {
          //   _this.lastPlayingId = response.data.resultMap.resourcesId;

          // }
          if (
            _this.$route.params.fromvip == "true" ||
            _this.$route.params.fromvip == true
          ) {
            _this.fromVipDialog();
          }
        }
      });
    },
    fromVipDialog() {
      if (!this.$route.params.fromvip) {
        return;
      }
      if (this.courselist[this.courselist.length - 1].source == 1) {
        // 自产
        this.popShow = true;
      } else {
        // 外包
        this.popShow2 = true;
      }
    },
    getCourseRemark() {
      this.$http({
        method: "get",
        url: `${serviceApi.getCourseRemark}?id=` + this.id
      }).then(function(response) {
        if (response && response.data && response.data.resultMap) {
          _this.remark = response.data.resultMap.remark;
          // let remarkEl = document.getElementById("remark");
          // remarkEl.innerHTML = _this.remark;
          // let images = document
          //   .getElementById("remark")
          //   .getElementsByTagName("img");
          // if (images && images.length > 0) {
          //   for (let i = 0; i < images.length; i++) {
          //     images[i].style = "width: 100%;display:block;";
          //   }
          // }
          _this.remarktit = response.data.resultMap.title;
        }
      });
    },
    isBuy() {
      const _this = this;
      const data = {
        userId: this.userId,
        courseId: this.id
      };
      this.$http({
        method: "post",
        url: `${serviceApi.isBuy}`,
        data: data
      }).then(function(response) {
        if (response.data.status == "00") {
          _this.isBuyflag = response.data.resultMap.isBuy;
          if (response.data.resultMap.isCollect == 1) {
            _this.hascollect = true;
          }
        }
      });
    },
    // index需要播放的索引,value默认false，当是点击下一课或者上一课时候设置为true，true时不添加历史
    godetail(typeValue, id, chargingStandard, index, value) {
      let hasOpenNotvip = sessionStorage.getItem("hasOpenNotvip");
      let isvip = this.$store.state.userInfo.vip;
      if (isvip == "0" && hasOpenNotvip != "1" && chargingStandard != 2) {
        // 不是vip，没打开过弹窗，付费课
        sessionStorage.setItem("hasOpenNotvip", 1);
        this.notVipDialogShow = true;
        sessionStorage.setItem(
          "Buyinfo",
          JSON.stringify({ typeValue, id, chargingStandard, fast: 0, index })
        );
        return;
      }
      if (chargingStandard == "1") {
        // this.payshow = true;
        // this.$toast({ message: "请购买后观看", icon: "cross" });
        this.buyPay(typeValue, id, chargingStandard);
        return false;
      }
      if (typeValue == "视频") {
        let hash = location.hash;
        if (!value) window.history.pushState("forward", null, hash);
        this.videoShow = true;
        this.selectedVideoId = id;
        this.nowPlayingIndex = index;
        this.playing = true;
        // this.getCourseResources();
      } else if (typeValue == "音频") {
        this.winScrollY = window.scrollY
        window.scrollTo(0,0)
        let hash = location.hash;
        if (!value) window.history.pushState("forward", null, hash);
        this.audioShow = true;
        this.selectAudioId = id;
        this.nowPlayingIndex = index;
        this.playing = true;
        // this.$router.push({
        //   name: "audiodetails",
        //   params: { id: id },
        //   query: { courseId: this.id }
        // });
      } else if (typeValue == "图文") {
        this.$router.push({
          name: "pictextdetails",
          params: { id: id },
          query: { courseId: this.id }
        });
      } else {
      }
    },
    /**
     * 立刻购买
     */
    handlePay() {
      if (!this.userId) {
        // this.showfail = true;
        this.$toast("请先关注微信公共号");
        return false;
      }
      let isvip = this.$store.state.userInfo.vip;
      let hasOpen = sessionStorage.getItem("hasOpenNotvip");
      if (isvip == "0" && hasOpen != "1") {
        this.notVipDialogShow = true;
        sessionStorage.setItem("hasOpenNotvip", 1);
        return;
      }
      let userWechatInfo = localStorage.getItem("userWechatInfo");
      userWechatInfo = userWechatInfo !== "" ? JSON.parse(userWechatInfo) : "";
      const _this = this;
      this.$http({
        method: "post",
        url: serviceApi.unifiedorder,
        data: {
          userId: userWechatInfo.id || "",
          courseId: this.id || ""
        }
        // headers:{
        //   'Content-Type':'application/x-www-form-urlencoded'
        // },
        // timeout: 10000,
      }).then(function(res) {
        if (res.data && res.data.obj) {
          _this.payData = res.data.obj;
          const prepayId = _this.payData.prepayId || "";
          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener(
                "WeixinJSBridgeReady",
                _this.onBridgeReady,
                false
              );
            } else if (document.attachEvent) {
              document.attachEvent("WeixinJSBridgeReady", _this.onBridgeReady);
              document.attachEvent(
                "onWeixinJSBridgeReady",
                _this.onBridgeReady
              );
            }
          } else {
            _this.onBridgeReady();
          }
        }
      });
    },
    /*付费购买*/
    buyPay(typeValue, resourceId, chargingStandard) {
      if (!this.userId) {
        // this.showfail = true;
        this.$toast("请先关注微信公共号")
        return false;
      }
      let userWechatInfo = localStorage.getItem("userWechatInfo");
      userWechatInfo = userWechatInfo !== "" ? JSON.parse(userWechatInfo) : "";
      const _this = this;
      this.$http({
        method: "post",
        url: serviceApi.resUnifiedorder,
        data: {
          userId: userWechatInfo.id || "",
          resourceId: resourceId
        }
        // headers:{
        //   'Content-Type':'application/x-www-form-urlencoded'
        // },
        // timeout: 10000,
      }).then(function(res) {
        if (res.data && res.data.obj) {
          _this.payData = res.data.obj;
          const prepayId = _this.payData.prepayId || "";
          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener(
                "WeixinJSBridgeReady",
                _this.onBridgeReady,
                false
              );
            } else if (document.attachEvent) {
              document.attachEvent("WeixinJSBridgeReady", _this.onBridgeReady);
              document.attachEvent(
                "onWeixinJSBridgeReady",
                _this.onBridgeReady
              );
            }
          } else {
            _this.onBridgeReadyresourse(
              typeValue,
              resourceId,
              chargingStandard
            );
          }
        }
      });
    },
    /**
     * 微信支付api
     */
    onBridgeReady() {
      const { payData } = this;
      const _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payData.appId, //公众号名称，由商户传入
          timeStamp: payData.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: payData.nonceStr, //随机串
          package: payData.package,
          signType: payData.signType, //微信签名方式：
          paySign: payData.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            _this.resultMap.costPrice;
            _this.isBuyflag = true;
            _this.getCourseResources();
          }
        }
      );
    },
    onBridgeReadyresourse(typeValue, id, chargingStandard) {
      const { payData } = this;
      const _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payData.appId, //公众号名称，由商户传入
          timeStamp: payData.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: payData.nonceStr, //随机串
          package: payData.package,
          signType: payData.signType, //微信签名方式：
          paySign: payData.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            _this.resultMap.costPrice;
            _this.getCourseResources();
            if (typeValue == "视频") {
              let hash = location.hash;
              // window.history.pushState("forward", null, hash);
              _this.videoShow = true;
              _this.selectedVideoId = id;
              _this.nowPlayingIndex = index;
              _this.getCourseResources();
            } else if (typeValue == "音频") {
              // _this.$router.push({ name: "audiodetails", params: { id: id } });
              let hash = location.hash;
              // window.history.pushState("forward", null, hash);
              _this.audioShow = true;
              _this.selectAudioId = id;
              _this.nowPlayingIndex = index;
              _this.getCourseResources();
            } else if (typeValue == "图文") {
              _this.$router.push({
                name: "pictextdetails",
                params: { id: id }
              });
            } else {
            }
          }
        }
      );
    },
    handleShareTips: function() {
      // this.showToast = true;
      this.$toast("点击右上角分享");
    },
    // 下一首/上一首
    nextAudio(num) {
      if (this.nowPlayingIndex == this.courselist.length - 1 && num === true) {
        this.$toast("已经是最后一课");
        return;
      }
      if (this.nowPlayingIndex == 0 && num === false) {
        this.$toast("已经是第一课");
        return;
      }
      let course;
      if (num === true || num === false) {
        if (num === true) {
          num = 1;
        }
        if (num === false) num = -1;
        course = this.courselist[this.nowPlayingIndex + num];
        this.godetail(
          course.typeValue,
          course.id,
          course.chargingStandard,
          this.nowPlayingIndex + num,
          true
        );
      } else {
        course = this.courselist[num];
        this.godetail(
          course.typeValue,
          course.id,
          course.chargingStandard,
          num,
          true
        );
      }
    },
    // 格式化时间
    optionTimes(time) {
      let minute = time / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = time % 60;
      let seconds = Math.floor(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    },
    changeVideo({ item, index }) {
      this.godetail(
        item.typeValue,
        item.id,
        item.chargingStandard,
        index,
        true
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body,#app,html{
  height: auto;
  overflow:visible;
}
#coursedetail .van-tabs__line {
  background-color: #ffd100;
}
#coursedetail .van-sticky--fixed{
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
.remark img {
  width: 100%;
  display: block;
}
.van-tab {
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(80, 80, 80, 0.7);
}
#coursedetail  .van-tab--active {
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(25, 25, 25, 1);
}
#coursedetail .van-tabs__wrap {
  box-shadow: 0 0 0.1rem 0 rgba(67, 67, 67, 0.09);
}
</style>
<style scoped>
.fixedTop {
  overflow: scroll !important;
}
.vux-tab .vux-tab-item {
  font-size: 0.28rem !important;
  color: #505050 !important;
}
.vux-tab .vux-tab-item.vux-tab-selected {
  font-weight: bold !important;
  font-size: 0.3rem !important;
}
.vux-tab-bar-inner {
  display: block;
  background-color: rgba(242, 200, 28, 1) !important;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.2rem;
}
a {
  color: #42b983;
}
.detailback {
  position: relative;
}
.desc-tit {
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(17, 17, 17, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.desc-tit > span {
  display: inline-block;
  width: 5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.desc-tit > .free-btn {
  width: 0.6rem;
  height: 0.36rem;
  background: rgba(255, 209, 0, 1);
  border-radius: 0.08rem;
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}
.desc-tit > .pay-btn {
  width: 0.8rem;
  height: 0.36rem;
  border: 0.02rem solid rgba(255, 209, 0, 0.7);
  border-radius: 0.08rem;
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(255, 209, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.desc-num {
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(24, 24, 24, 0.5);
  display: flex;
  justify-content: space-between;
}
.detailbackImg {
  width: 100%;
  height: 3.56rem;
  display: block;
}
.detaildiv {
  height: 100%;
}
.detailtit {
  font-size: 0.28rem;
  font-weight: 250;
  color: rgba(0, 190, 240, 1);
}
.detailcontent {
  /* font-size: 0.24rem;
     font-weight: 150;
     color: rgba(80, 80, 80, 1);
     line-height: 0.38rem;
     */
  /* margin-bottom: 1.2rem; */
  /* padding: 0.2rem 0; */
  width: 100%;
}
.backImg {
  position: absolute;
  width: 100%;
  height: 3.88rem;
  top: 0;
  left: 0.4rem;
}
.preImg {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.3rem;
  left: 0.2rem;
}
.course-details {
  padding: 0.31rem 0.26rem 0.4rem 0.36rem;
  background-color: #fff;
}
.fee-det {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fee-num {
  font-size: 0.5rem;
  color: rgba(233, 72, 41, 1);
  line-height: 0.6rem;
  margin-left: 0.6rem;
}
.fee-old {
  font-size: 0.32rem;
  font-weight: 200;
  text-decoration: line-through;
  color: rgba(166, 166, 166, 1);
  line-height: 0.4rem;
  margin-left: 0.4rem;
}
.buybus {
  font-size: 0.28rem;
  color: rgba(242, 200, 28, 1);
  padding: 0.06rem 0.16rem;
  border: 1px solid rgba(242, 200, 28, 1);
  border-radius: 0.4rem;
  margin-right: 0.3rem;
}
.detail-tit {
  font-size: 0.3rem;
  color: rgba(0, 0, 0, 1);
  line-height: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-tit > p {
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.desc-tit > p {
  display: flex;
  align-items: center;
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}
.detail-des {
  height: 0.66rem;
  line-height: 0.35rem;
  font-size: 0.26rem;
  font-weight: 500;
  color: rgba(80, 80, 80, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 0.26rem;
  margin-bottom: 0.4rem;
}
.detail-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(80, 80, 80, 0.7);
  line-height: 1;
  align-items: center;
}
.detail-label {
  height: 0.34rem;
  padding: 0 0.14rem;
  display: flex;
  background: rgba(29, 169, 255, 0.15);
  border-radius: 0.06rem;
  align-items: center;
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(29, 169, 255, 1);
}
.jieshao {
  font-size: 0.28rem;
  font-weight: 250;
  color: rgba(0, 190, 240, 1);
  line-height: 0.4rem;
  margin: 0.1rem 0.6rem;
}
.buy-pers {
  font-size: 0.22rem;
  color: rgba(172, 172, 172, 1);
  margin: 0.04rem 0.6rem;
}
.onebarback {
  width: 6.2rem;
  height: 2.6rem;
  background: rgba(120, 232, 205, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem auto;
  position: relative;
}
.oneback {
  width: 5.4rem;
  height: 2.06rem;
  position: absolute;
  top: 0.4rem;
  left: 0.28rem;
}
.class-desc-wrap {
  height: 100%;
  padding: 0.2rem 0 16vw 0;
  margin-bottom: 0;
  background-color: #fff;
  overflow: hidden;
}
.class-desc-item-wrap {
  height: 1.22rem;
  margin: 0 0.36rem;
  padding: 0.29rem 0 0.25rem 0;
  color: rgba(17, 17, 17, 1);
  display: flex;
  align-items: center;
  border-bottom: 0.02rem solid rgba(0, 0, 0, 0.06);
}
.class-sub-title {
  color: #999999;
  font-size: 0.18rem;
  line-height: 0.18rem;
}
.college-title-wrap {
  height: 1rem;
  align-items: center;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 0.9rem;
}
.college-title {
  width: 2.72rem;
  height: 0.34rem;
}
.college-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.college-item-wrap {
  flex: 1;
  display: flex;
}
.college-item-content {
  border-radius: 0.16rem;
  background-color: #fff;
  min-height: 2.1rem;
  min-width: 3.3rem;
  margin-bottom: 0.2rem;
}
.college-item-wrap:nth-child(even) {
  padding-left: 0.04rem;
}
.college-item-wrap:nth-child(odd) {
  padding-right: 0.04rem;
}
.college-icon {
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.2rem;
}
.college-item-title-wrap {
  display: flex;
  padding: 0.4rem 0.34rem 0.2rem 0.34rem;
  color: #040000;
  align-items: center;
}
.college-item-title {
  font-size: 0.3rem;
  font-weight: bold;
}
.college-item-subTitle {
  font-size: 0.2rem;
  color: #ababaa;
}
.college-line {
  width: 100%;
  justify-content: center;
  display: flex;
}
.college-line > img {
  width: 2.94rem;
  height: 0.02rem;
}
.cass-icon {
  width: 0.46rem;
  height: 0.46rem;
}
.class-icon-wrap {
  display: flex;
  align-items: center;
  padding-right: 0.23rem;
}
.class-desc {
  height: 100%;
  display: flex;
  flex: 1;
  font-size: 0.22rem;
  justify-content: center;
}
.class-desc-center {
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
}
.class-tab {
  display: inline-block;
  padding: 0 0.12rem;
  color: #ffffff;
  background-color: #0bc8fd;
  border-radius: 0.12rem;
  font-size: 0.18rem;
}
.class-tab:not(:last-child) {
  margin-right: 0.12rem;
}
.video-button-wrap {
  width: 1.52rem;
  display: flex;
  padding-top: 0.2rem;
  border-bottom: 0.02rem solid #eee;
}
.video-button {
  position: relative;
}
.video-button > img {
  width: 1.52rem;
  height: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
}
.video-button > span {
  font-size: 0.24rem;
  color: #fff;
  position: absolute;
  top: 0.02rem;
  width: 1rem;
  display: flex;
  left: 0.44rem;
}
.class-sub-title {
  color: #999999;
  font-size: 0.18rem;
  line-height: 0.18rem;
}
.college-title-wrap {
  height: 1rem;
  align-items: center;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 0.9rem;
}
.college-title {
  width: 2.72rem;
  height: 0.34rem;
}
.college-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.college-item-wrap {
  flex: 1;
  display: flex;
}
.college-item-content {
  border-radius: 0.16rem;
  background-color: #fff;
  min-height: 2.1rem;
  min-width: 3.3rem;
  margin-bottom: 0.2rem;
}
.college-item-wrap:nth-child(even) {
  padding-left: 0.04rem;
}
.college-item-wrap:nth-child(odd) {
  padding-right: 0.04rem;
}
.college-icon {
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.2rem;
}
.college-item-title-wrap {
  display: flex;
  padding: 0.4rem 0.34rem 0.2rem 0.34rem;
  color: #040000;
  align-items: center;
}
.college-item-title {
  font-size: 0.3rem;
  font-weight: bold;
}
.college-item-subTitle {
  font-size: 0.2rem;
  color: #ababaa;
}
.college-line {
  width: 100%;
  justify-content: center;
  display: flex;
}
.college-line > img {
  width: 2.94rem;
  height: 0.02rem;
}
.college-join-btn-wrap {
  height: 0.6rem;
  display: flex;
  color: #ababaa;
  font-size: 0.22rem;
  padding-left: 0.38rem;
  padding-right: 0.16rem;
  align-items: center;
  justify-content: space-between;
}
.join-btn {
  display: inline-block;
  width: 0.88rem;
  height: 0.4rem;
  border-radius: 0.16rem;
  color: #fff;
  background-color: #95be32;
  text-align: center;
  line-height: 0.4rem;
}
.video-button {
  position: relative;
}
.video-button > img {
  width: 1.52rem;
  height: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
}
.video-button > span {
  font-size: 0.24rem;
  color: #fff;
  position: absolute;
  top: 0.02rem;
  width: 1rem;
  display: flex;
  left: 0.44rem;
}
.fixedbar {
  width: 100%;
  height: 1.2rem;
  background: rgba(250, 250, 250, 1);
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
}
.collectiondiv {
  margin-left: 10%;
}
.collection {
  width: 0.61rem;
  height: 0.55rem;
  margin-left: 0.49rem;
}
.collecttit {
  font-size: 0.22rem;
  font-weight: 250;
  color: rgba(60, 60, 60, 1);
}
.sub {
  background: #e84729;
  padding: 0.1rem 1.2rem;
  border-radius: 0.4rem;
  font-size: 0.3rem;
  font-weight: 250;
  color: rgba(255, 255, 255, 1);
  margin-left: 17%;
}
#remark {
  max-width: 100%;
  overflow-x: hidden;
}
.audio,
.video {
  /* position: fixed; */
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  transition: all 0.2s linear;
  display: none;
}
.audioHide,
.videoHide {
  top: 100%;
}
.audioShow,
.videoShow {
  top: 0;
  z-index: 999;
  display: block;
}
.nowplaying {
  color: rgba(255, 209, 0, 1);
}
.has-read {
  color: rgba(0, 0, 0, 0.6);
}
.now-icons {
  width: 0.46rem;
  padding: 0 0.08rem;
  height: 0.26rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.now-icon {
  width: 0.07rem;
  background-color: #ffd100;
  height: 50%;
  transition: all 0.3s linear;
}
.now-icon75 {
  height: 75%;
}
.now-icon100 {
  height: 100%;
}
.course-bar {
  background-color: #fff;
}
</style>
