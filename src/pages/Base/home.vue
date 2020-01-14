<template>
  <div style="background: rgb(250, 250, 250); width: 100%;height:100%">
    <div
      class="mian-wrap"
      style="display:flex;overflow:auto;width:100%;height:100%"
      v-show="tabindex == 0"
    >
      <firstHome />
    </div>
    <div id="home" class="main-wrap" v-show="tabindex == 1">
      <HomeSwiper></HomeSwiper>
      <div class="ceping">
        <h4>你知道宝宝的天赋吗？</h4>
        <p>
          快用AI天赋测评深入了解宝宝
          科学助力成长
        </p>
        <img v-lazy="require('../../assets/images/home-kite.png')" alt />
        <div @touchstart="jumpToMiniProgram">
          <img v-lazy="require('../../assets/images/home-cepingbtn.png')" alt />
        </div>
      </div>
      <div class="college-title-wrap">思维启蒙&nbsp;丛林探秘</div>
      <div class="college-wrap" style="margin-bottom:1.02rem">
        <div
          class="college-item-wrap"
          v-for="(collegeItem, collegeIndex) in collegeList"
          :key="collegeItem.id"
        >
          <div
            class="college-item-content"
            @click="handleJoinClass(collegeItem.banner,collegeItem.id,collegeItem.title, collegeItem.name)"
          >
            <div class="college-item-title-wrap">
              <img class="college-icon" v-lazy="collegeItem.icon" alt />
              <div>
                <div class="college-item-title">{{collegeItem.name}}</div>
                <p class="college-item-subTitle">{{collegeItem.title}}</p>
              </div>
            </div>
            <div class="college-line">
              <img v-lazy="require('../../assets/images/line_dotted.png')" alt />
            </div>
            <div class="college-join-btn-wrap">
              <span>
                {{collegeItem.number}}
                <span>家长已加入</span>
              </span>
              <span
                class="join-btn"
                v-bind:class="{bgpink: collegeIndex === 1 || collegeIndex === 7, bgyellow: collegeIndex === 2 || collegeIndex === 3, bgblue: collegeIndex === 5 || collegeIndex === 6}"
              >加入</span>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mian-wrap"
      v-show="tabindex == 2"
      style="width: 100%;height:calc(100% - 1.16rem);padding-top:0.4rem;"
    >
      <mine></mine>
    </div>
    <!-- 底部bar -->
    <bar></bar>
    <homeDialog3 v-if="homeDiaShow3"></homeDialog3>
    <projectDia v-if="homeDiaShow1"></projectDia>
    <!-- 图片弹框 -->
    <van-overlay :show="showDialogStyle" z-index="999">
      <div style="width:100%;height:100%" class="modal" @touchend="showDialogStyle= false">
        <img class="modal-img" @touchend.stop v-lazy="require('../../assets/images/little_z.png')" />
      </div>
    </van-overlay>
    <!-- 第一次进入没有选过标签 -->
    <div v-if="!$store.state.hasLabel">
      <completeInfo></completeInfo>
      <homeChLabel1></homeChLabel1>
      <homeChLabel></homeChLabel>
    </div>
  </div>
</template>

<script>
import bar from "./components/bar";
import mine from "./mine";
import { mapGetters, mapMutations } from "vuex";
import urlencode from "urlencode";
import serviceApi from "../../service/Base/serviceConfig";
import { getQueryVariable } from "../../utils/utils";
import wxConfig from "../../service/wx.config";
import { Overlay } from "vant";
import Bus from "../../assets/bus";
import projectDia from "./components/projectDia";
import homeDialog3 from "./components/homeDialog3";
import HomeSwiper from "./components/HomeSwiper.vue";
import firstHome from "./firstHome";
import homeChLabel1 from "./components/home-chLabel1";
import homeChLabel from "./components/home-chLabel";
import completeInfo from "./components/completeInfo";

export default {
  name: "home",
  data() {
    return {
      userId: null,
      collegeList: [],
      showDialogStyle: false,
      homeDiaShow1: false, //课程匹配完成
      homeDiaShow3: false //去完善信息
    };
  },
  components: {
    bar,
    mine,
    vanOverlay: Overlay,
    homeDialog3,
    projectDia,
    HomeSwiper,
    firstHome, //首页小Z懂你
    homeChLabel, //首页选择标签
    completeInfo, //首页完善信息
    homeChLabel1
  },
  computed: {
    ...mapGetters(["tabindex", "barindex"])
  },
  mounted: function() {
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    const userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    // alert(userId)
    this.userId = userId;
    if (this.$route.query.frompersonalVIP) {
      // 从帮它完成进入
      this.homeDiaShow3 = true;
    }
    const pageIndex = this.$route.params.index;
    if (pageIndex && this.barindex.toString() !== pageIndex) {
      this.settabindex(pageIndex);
      this.setbarindex(pageIndex);
    }

    document.title = "思维课堂";
    let _this = this;
    this.getCollegeList();
    if (!userWechatInfo) {
      this.getWXInfo();
      return;
    }
    this.queryData();
    // setTimeout(() => {
    //   let shareInfo = {
    //     title:'修改的标题',
    //     link:`${location.origin}/?/#/home/2`,
    //      imgUrl:
    //             "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
    //       ok:function(){
    //         console.log('重新设置成功')
    //       }
    //   }
    //   console.log(shareInfo)
    //   this.$store.dispatch('newShareUse',shareInfo)
    // }, 5000);
  },
  methods: {
    ...mapMutations(["settabindex", "setbarindex"]),
    jumpToMiniProgram() {
      this.showDialogStyle = true;
    },
    queryData() {
      this.handleShare();
      Bus.$emit("getUserInfo", true);
      this.$store.dispatch("getUserInfo", this.userId);

    },
    // 获取学院列表
    getCollegeList() {
      let _this = this;
      this.$http
        .get(`${serviceApi.getCollegeList}`)
        .then(function(response) {
          if (response && response.data && response.data.data) {
            _this.collegeList = response.data.data;
          }
        })
        .catch(function(err) {});
    },
    getRecommendButtonText(code) {
      switch (code) {
        case "1":
          return "付费观看";
        case "2":
          return "免费观看";
      }
    },
    // 加入学院
    handleJoinClass: function(banner, id, title, name) {
      this.$router.push({
        name: "XZ",
        query: {
          id,
          banner,
          title,
          name
        }
      });
    },
    // 授权
    getWXInfo: function() {
      const userWechatInfo = localStorage.getItem("userWechatInfo");
      if (userWechatInfo) {
        return;
      }
      const _this = this;
      const wxData =
        location.href.indexOf("public") > -1 ? wxConfig.prd : wxConfig.test;
      const r_url = wxData.r_url + "/#/home/" + this.tabindex;
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        wxData.appId
      }&redirect_uri=${urlencode(
        r_url
      )}&response_type=code&scope=snsapi_userinfo&state=111#wechat_redirect`;
      let query = window.location.search.substring(1);
      this.url = url;
      // || window.code
      if (query && query.indexOf("code") > -1) {
        let code = getQueryVariable("code", query);
        window.code = code;
        this.getAcessToken(code);
      } else if (query.indexOf("share") < 0) {
        window.location.replace(url);
      }
    },
    getAcessToken: function(code) {
      let _this = this;
      this.$http({
        method: "post",
        url: serviceApi.doLogin,
        // headers:{
        //   'Content-Type':'application/x-www-form-urlencoded'
        // },
        data: {
          code
        }
      }).then(function(res) {
        if (res.data && res.data.resultMap) {
          const userWechatInfo = res.data.resultMap;
          console.log("xxxxxx", userWechatInfo, userWechatInfo.id);
          _this.userId = userWechatInfo.id || "";
          localStorage.setItem(
            "userWechatInfo",
            JSON.stringify(userWechatInfo)
          );
          _this.queryData();
          _this.isFirstComing();
        }
      });
    },
    // 分享
    handleShare() {
      let wechaturl = window.location.href.split("#")[0];
      const _this = this;
      if (window.wechaturl !== undefined) {
        wechaturl = window.wechaturl;
      }
      let userWechatInfo = localStorage.getItem("userWechatInfo");
      let openid = "";
      if (userWechatInfo) {
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
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              }
            });
            wx.updateTimelineShareData({
              // 分享到朋友圈及分享到QQ
              title: document.title, // 分享标题
              desc: "思维启蒙权威家庭教育方案", // 分享描述
              link: `${location.origin}/?/#/home/0`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 用户点击了分享后执行的回调函数
                // console.log("分享成功");
              }
            });

            wx.updateAppMessageShareData({
              // “分享到朋友”及“分享到QQ空间”
              title: document.title, // 分享标题
              desc: "思维启蒙权威家庭教育方案", // 分享描述
              link: `${location.origin}/?/#/home/0`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 设置成功
                console.log("分享成功");
                console.log(`${location.origin}/?/#/home/0`);
              }
            });
          });
          wx.error(function(res) {
            console.log("分享出现问题");
            console.log(res);
          });
        }
      });
    },
    // 判断是否是第一次进入网页
    isFirstComing() {
      let isfirst = localStorage.getItem("isFirst");
      if (!isfirst) {
        localStorage.setItem("isFirst", 1);
        this.getUserInfo();
      } else if (isfirst == 1) {
        localStorage.setItem("isFirst", 2);
        this.getUserInfo();
      } else {
        console.log("不是第一次进入");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
  text-decoration: none;
  color: #666;
}
.recommend-title {
  font-size: 0.38rem;
  font-weight: bold;
  margin-top: 0.16rem;
}
.revaluation-wrap {
  padding: 0.2rem;
  width: 100%;
  display: flex;
  padding: 0.24rem 0.42rem 0.19rem;
  color: #595757;
  background: rgba(255, 216, 37, 1);
  box-shadow: 0rem 0.12rem 0.58rem 0rem rgba(143, 133, 87, 0.13);
  border-radius: 0.2rem;
  position: relative;
  .revaluation-icon {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .revaluation-icon-inner {
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        width: 0.84rem;
        margin-bottom: 0.13rem;
        // height: 0.76rem;
      }
      p {
        font-size: 0.18rem;
        color: rgba(89, 87, 87, 1);
      }
    }
  }
}
.revaluation-title {
  color: rgba(255, 255, 255, 1);
  font-size: 0.34rem;
  font-weight: bold;
  margin-bottom: 0.23rem;
}
.revaluation-desc {
  line-height: 0.28rem;
  width: 3.5rem;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(89, 87, 87, 1);
}
.XZ-title-wrap {
  color: #000;
  font-size: 0.36rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  line-height: 1;
  margin: 0.61rem 0 0.27rem 0;
}
.XZ-title {
  position: relative;
  font-size: 0.36rem;
  font-weight: bold;
  color: rgba(4, 0, 0, 1);
}
.title-change-wrap {
  display: inline-block;
  position: absolute;
  right: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.22rem;
  color: #3c3c3c;
}
.icon_change {
  height: 0.26rem;
  width: 0.28rem;
  margin-right: 0.08rem;
}
.class-item-wrap {
  width: 100%;
  min-height: 4rem;
  box-shadow: 0rem 0.12rem 0.68rem 0rem rgba(139, 139, 139, 0.12);
  border-radius: 0.2rem;
}
.class-title-wrap {
  width: 100%;
  height: 0.89rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  word-break: break-all;
  font-size: 0.24rem;
  font-weight: bold;
  align-items: center;
  line-height: 0.32rem;
  font-size: 0.3rem;
  color: rgba(51, 42, 1, 1);
  line-height: 0.92rem;
  text-align: center;
  background-color: rgba(255, 209, 0, 1);
  border-radius: 0.2rem 0.2rem 0rem 0rem;
}
.class-desc-item-wrap {
  width: 100%;
  padding: 0 0.18rem 0 0.4rem;
  display: flex;
  margin-bottom: 0.38rem;
}
.cass-icon {
  width: 0.64rem;
}
.class-icon-wrap {
  display: flex;
  align-items: center;
  padding-right: 0.34rem;
}
.class-desc {
  display: flex;
  flex: 1;
  color: #040000;
  font-size: 0.22rem;
  justify-content: center;
  align-items: center;
}
.class-desc-center {
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
}
.class-tab {
  display: inline-block;
  padding: 0 0.14rem;
  margin-top: 0.1rem;
  color: #ffffff;
  background-color: #ddf2ff;
  border-radius: 0.06rem;
  font-size: 0.2rem;
  font-weight: 500;
  color: #1da9ff;
}
.class-tab:not(:last-child) {
  margin-right: 0.12rem;
}
.video-button-wrap {
  width: 1.52rem;
  display: flex;
}
.video-button {
  width: 1.36rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background: rgba(29, 169, 255, 1);
  border-radius: 0.26rem;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.video-button2 {
  width: 1.36rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background: rgba(232, 71, 41, 1);
  border-radius: 0.26rem;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.video-button > img {
  width: 1.52rem;
  height: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
}
.class-desc-wrap {
  padding: 0.38rem 0 0.04rem 0;
}
.class-sub-title {
  color: #999999;
  font-size: 0.18rem;
  line-height: 0.18rem;
}
.college-title-wrap {
  align-items: center;
  margin-top: 0.61rem;
  margin-bottom: 0.28rem;
  justify-content: center;
  line-height: 1;
  align-items: center;
  display: flex;
  font-size: 0.36rem;
  color: rgba(4, 0, 0, 1);
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
  height: auto;
  box-shadow: 0rem 0.12rem 0.68rem 0rem rgba(139, 139, 139, 0.12);
  border-radius: 0.2rem;
  padding: 0.18rem 0.18rem 0;
  background: rgba(255, 255, 255, 1);
  .college-item-wrap {
    width: 3.14rem;
    display: flex;
    border-radius: 0.2rem;
    margin-bottom: 0.2rem;
    background: #f7f7f7;
    .college-item-content {
      border-radius: 0.16rem;
      width: 100%;
      padding: 0.26rem;
    }
  }
}
.college-icon {
  width: 0.48rem;
  height: 0.48rem;
  margin-right: 0.21rem;
}
.college-item-title-wrap {
  display: flex;
  color: #040000;
  align-items: center;
}
.college-item-title {
  font-size: 0.28rem;
  color: rgba(4, 0, 0, 1);
  line-height: 1;
}
.college-item-subTitle {
  font-size: 0.2rem;
  color: #ababaa;
  margin-top: 0.19rem;
  line-height: 1;
  margin-bottom: 0.22rem;
}
.college-line {
  width: 100%;
  justify-content: center;
  display: flex;
}
.college-line > img {
  width: 100%;
  height: 0.02rem;
}
.college-join-btn-wrap {
  display: flex;
  color: #ababaa;
  font-size: 0.22rem;
  align-items: center;
  justify-content: space-between;
  font-size: 0.2rem;
  color: rgba(171, 171, 170, 1);
  line-height: 0.38rem;
  margin-top: 0.19rem;
}
.join-btn {
  display: inline-block;
  width: 0.84rem;
  height: 0.38rem;
  color: #fff;
  background: rgba(165, 211, 52, 1);
  text-align: center;
  line-height: 0.38rem;
  border-radius: 0.2rem;
  font-size: 0.24rem;
}
.bgpink {
  background: rgba(255, 146, 137, 1);
}
.bgyellow {
  background: rgba(249, 207, 34, 1);
}
.bgblue {
  background-color: #42b1d2;
}
.main-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.33rem 0.36rem 0 0.36rem;
  background-color: #fafafa;
  color: #595757;
  align-items: center;
  /* overflow-y: auto; */
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  /* height: calc(100vh - 1.02rem); */
}
.title-wrap {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.1rem;
  .title-container {
    width: 100%;
    border-radius: 0.2rem;
    position: relative;
  }
}
.recommend-image {
  position: absolute;
  right: 0.08rem;
  bottom: 0;
  width: 4.66rem;
  height: 1.96rem;
}
.router-link-active {
  text-decoration: none;
}
.recommend-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  padding-left: 0.4rem;
}
.audition-btn {
  display: flex;
  width: 1.4rem;
  height: 0.42rem;
  border-radius: 0.42rem;
  background-color: #fcd13eff;
  line-height: 0.38rem;
  justify-content: center;
  font-size: 0.24rem;
  margin: 0.06rem 0;
}
.inclass-wrap > p:last-child {
  font-size: 0.18rem;
}
.inclass-wrap > p:first-child {
  font-size: 0.32rem;
}
.card-item-wrap {
  background-color: #fff;
  border-radius: 0.2rem;
  width: 100%;
  //  display: flex;
  //  flex-direction: column;
  //  justify-content: center;
  //  align-items: center;
}
.revaluation-wrap > div:first-child {
  width: 3.58rem;
  word-break: break-all;
  font-size: 0.26rem;
}
.modal-img {
  width: 80%;
  border-radius: 0.24rem;
}
.banner-img {
  width: 100%;
  height: 100%;
}
.change-some {
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(60, 60, 60, 1);
}
.class-desc-content {
  width: 47.46vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ceping {
  width: 6.77rem;
  height: 1.54rem;
  background: rgba(255, 252, 240, 1);
  box-shadow: 0 0.04rem 0.14rem 0 rgba(149, 132, 53, 0.03),
    0 0.12rem 0.57rem 0 rgba(179, 151, 25, 0.08);
  border-radius: 0.77rem;
  font-size: 0.34rem;
  line-height: 1;
  padding: 0.28rem 0.24rem 0.26rem 0.52rem;
  position: relative;
  margin-top: 0.43rem;
}
.ceping > h4 {
  font-weight: bold;
  color: rgba(255, 209, 0, 1);
}
.ceping > p {
  width: 3.39rem;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(166, 129, 14, 1);
  margin-top: 0.16rem;
}
.ceping > img {
  position: absolute;
  bottom: 0.09rem;
  width: 1.56rem;
  height: 0.74rem;
  left: 3.17rem;
}
.ceping > div {
  position: absolute;
  right: 0.24rem;
  top: 0.4rem;
  width: 1.65rem;
  height: 1.169rem;
}
.ceping > div > img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
