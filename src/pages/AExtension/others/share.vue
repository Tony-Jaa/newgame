<template>
  <div class="vip-recruit" v-show="show">
    <div class="bg">
      <div class="bg-item" v-if="!shareFlag" style="top:0.21rem;left:auto;right:0.37rem">
        <img src="../../../assets/images/share/share-finger.png" style="width:0.63rem" alt />
      </div>
      <div class="bg-item">
        <img src="../../../assets/images/share/share-bg.png" style="width:2.15rem;" alt />
      </div>
      <div class="bg-item" style="top:38vw;right:0;left:auto">
        <img src="../../../assets/images/share/share-bg.png" width="107" alt />
      </div>
      <div class="bg-item" style="left:46.13vw;top:62.2vw">
        <img src="../../../assets/images/share/share-bg.png" width="107" alt />
      </div>
      <div class="bg-item" style="top:100.4vw;left:0">
        <img src="../../../assets/images/share/share-bg.png" width="107" alt />
      </div>
    </div>
    <div class="top-tip" v-if="!shareFlag">
      <p>
        点击右上角“
        <span class="color-1" style="font-size:0.33rem">发送给朋友</span>”
      </p>
      <p>
        <span class="color-1" style="font-size:0.33rem">VIP</span>等你来领取~
      </p>
    </div>
    <div class="main-content">
      <div class="main-content-imgs">
        <div style="margin-top:10px;">
          <img src="../../../assets/images/share-smallz.png" style="width:1.52rem;" alt />
        </div>
        <div class="position:relative">
          <img src="../../../assets/images/share/share-qipao.png" style="width:3.91rem" alt />
        </div>
      </div>

      <div class="main-content-text">
        <p>   
          教育是人生的一场革命激活革命的火种---
          <span class="color-4">思维启蒙</span>
        </p>
      </div>
      <div class="main-content-text">
        <p>父母教育水平决定孩子人生高度</p>
      </div>
      <div class="main-content-text">
        <p>思维是乘法=父母的教育</p>
        <p>知识是加法=知识的教育</p>
      </div>
      <div class="main-logo">
        <img src="../../../assets/images/share/share-logo-left.png" style="width:2.61rem;" alt />
        <div>
          <img src="../../../assets/images/share/logo.jpg" style="border-radius:6px;width:1.58rem" alt />
        </div>
      </div>
    </div>
    <!-- <div v-if="shareFlag" class="btn" @click="getUerVipInfo">接受邀请</div> -->
    <div style="font-size:0.32rem">
    </div>
    <div class="time" v-if="shareFlag">
      <img src="../../../assets/img/xiong.gif" alt />
      <span>返回首页&nbsp;{{count}}&nbsp;s...</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import urlencode from "urlencode";
import { getQueryVariable } from "../../../utils/utils";
import wxConfig from "../../../service/wx.config";
import serviceApi from "../../../service/AExtension/serviceConfig";

export default {
  name: "share",
  data() {
    return {
      userId: "",
      shareFlag: false,
      tuiguangyuanId: "",
      text: "请先关注公众号",
      show: false,
      count:""
    };
  },
  components: {
  },
  computed: {},
  mounted: function() {

    document.title = "VIP招募";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    if (!userWechatInfo) {
      this.getWXInfo();
      return;
    }
    this.getShareInfo();
    this.getPromoterBasicInfo();
  },
  
  methods: {
    //2秒后跳转首页--------------------------------------------
    threeGo() {
      const TIME_COUNT = 2;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            this.getUerVipInfo()
          }
        }, 1000);
      }
    },

    getShareInfo() {
      let query = window.location.href.split("?")[
        window.location.href.split("?").length - 1
      ];
      if (
        query &&
        query.indexOf("userId") > -1
        //  || (query && query.indexOf("state") > -1)
      ) {
        // if (
        //   getQueryVariable("userId", query) ||
        //   getQueryVariable("state", query)
        // ) {
        this.shareFlag = true;
        this.threeGo();
        this.show = true;
        const id =
          getQueryVariable("userId", query) || getQueryVariable("state", query);
        this.tuiguangyuanId = id.split("#")[0];
        // } else {
        //   this.shareFlag = false;
        //   this.show = true
        //   console.log("失败");
        // }
      } else {
        this.show = true;
        this.shareFlag = false;
      }
    },
    getWXInfo: function() {
      // 获取用户信息
      const userWechatInfo = localStorage.getItem("userWechatInfo");
      if (userWechatInfo) {
        return;
      }
      const _this = this;
      const wxData =
        location.href.indexOf("public") > -1 ? wxConfig.prd : wxConfig.test;
      const r_url = wxData.r_url + `/#${this.$route.fullPath}`;
      // alert(r_url)
      let query = window.location.href.split("?")[1];
      // this.url = url;
      if ((query && query.indexOf("code") > -1) || window.code) {
        let code = getQueryVariable("code", query);
        window.code = code;
        this.getAcessToken(code);
      } else {
        window.location.replace(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
            wxData.appId
          }&redirect_uri=${urlencode(
            r_url
          )}&response_type=code&scope=snsapi_userinfo&state=${getQueryVariable(
            "userId",
            query
          )}#wechat_redirect`
        );
      }
    },
    getAcessToken: function(code) {
      // 从后台获取授权信息
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
          _this.userId = userWechatInfo.id || "";
          localStorage.setItem(
            "userWechatInfo",
            JSON.stringify(userWechatInfo)
          );
          _this.getWXInfo();
          _this.getShareInfo();
          _this.handleShare();
        }
      });
    },
    getPromoterBasicInfo() {
      this.$http
        .get(serviceApi.getPromoterBasicInfo, {
          params: {
            userId: this.userId
          }
        })
        .then(res => {
          console.log(res);
          if (res && res.data) {
            if (res.data.resultMap) {
              // 是推广员
              this.handleShare(this.userId);
            } else {
              this.handleShare(this.$route.query.userId);
            }
          }
        });
    },
    accept: function() {
      const userWechatInfo = localStorage.getItem("userWechatInfo");
      const _this = this;
      const data = {
        userId: this.tuiguangyuanId,
        openid: userWechatInfo ? JSON.parse(userWechatInfo).openid : ""
      };
      this.$http({
        method: "post",
        url: `${serviceApi.receivePropVip}`,
        data: data
      }).then(function(response) {
        _this.$store.dispatch("getUserInfo");
        if (response.data.status == "00") {
          localStorage.setItem("sharePhoneVip", response.data.obj);
          _this.$router.push({ name: "home" });
        } else if (response.data.status == "02") {
          _this.$toast(response.data.msg)
          localStorage.setItem("sharePhoneVip", response.data.obj);
          setTimeout(() => {
            _this.$router.push({ name: "home" });
          }, 1000);
          // _this.$router.push({ path: "/xzvip/0" });
        } else {
          _this.$toast(response.data.msg)
        }
      });
    },
    // 跳转到测评
    // handleEvaluation: function() {
    //   wx.miniProgram.navigateTo({ url: "/pages/evaluation/evaluation" });
    // },
    // tohasbuy: function() {
    //   this.$router.push({ name: "hasbuy" });
    // },
    // tocollection: function() {
    //   this.$router.push({ name: "collection" });
    // },
    // 分享
    handleShare(id) {
      let wechaturl = window.location.href.split("#")[0];
      const _this = this;
      if (window.wechaturl !== undefined) {
        wechaturl = window.wechaturl;
      }
      let userWechatInfo = localStorage.getItem("userWechatInfo");
      let openid = "";
      if (userWechatInfo) {
        console.log(JSON.parse(userWechatInfo));
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
                console.log(res, "===================checkJsApi");
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              }
            });
            wx.updateTimelineShareData({
              // 分享到朋友圈及分享到QQ
              title: document.title, // 分享标题
              link: `${location.origin}/#/share?userId=${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              desc: "激活思维，成就天赋宝宝", // 分享描述
              link: `${location.origin}/?/#/share?userId=${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 设置成功
                console.log("分享成功");
              }
            });
          });
        }
      });
    },
    getUerVipInfo() {
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      this.$http
        .get(serviceApi.getUserInfo, {
          params: {
            userId
          }
        })
        .then(res => {
          if (res && res.data && res.data.resultMap) {
            let isVip = res.data.resultMap.vip; //0不是vip,1是vip
            if (isVip == 1) {
              this.$toast.success('您已经是VIP')
              setTimeout(() => {
                this.$router.push({ name: "home" });
              }, 500);
            } else {
              this.accept();
            }
          }
        });
    }
  }
};
</script>
<style scoped>
.vip-recruit {
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.9rem;
  background: linear-gradient(
    45deg,
    rgba(252, 207, 0, 1),
    rgba(255, 214, 23, 1)
  );
  position: absolute;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.vip-recruit img {
  display: block;
}
.color-1 {
  color: #ff4f2c;
}
.color-2 {
  color: #e14444;
}
.color-3 {
  color: #f7c611;
}
.color-4 {
  color: #ef3932;
}
.main-content {
  width: 88.8vw;
  margin: 0 auto;
  margin-top: 0.48rem;
  border: 0.16rem solid rgba(255, 255, 255, 1);
  border-radius: 0.4rem;
  position: relative;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(
    45deg,
    rgba(252, 207, 0, 1),
    rgba(255, 214, 23, 1)
  );
}
.bg .bg-item {
  position: absolute;
  top: 0;
  left: 0.08rem;
}
.top-tip {
  width: 49.33vw;
  margin: 0 auto;
  color: #fff;
  font-size: 0.28rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 0.48rem;
  position: relative;
}
.main-content-imgs {
  padding-top: 0.2rem;
  padding-left: 0.7rem;
  display: flex;
  margin-bottom: 0.42rem;
}
.qipao-text {
  color: #f7c611;
  position: absolute;
  width: 3.14rem;
  height: 102.1rem;
  padding: 0.46rem 0 0 0.52rem;
  font-size: 0.26rem;
}
.main-content-text {
  padding-left: 0.7rem;
  color: #fff;
  font-size: 0.4rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.46rem;
  padding-bottom: 0.44rem;
}
.main-logo {
  padding: 0 0.7rem 0 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.32rem;
}
/* .main-content-text > p:first-of-type {
  font-weight: 500;
  letter-spacing: 0.05em;
} */
.main-content-text span {
  font-weight: 800;
}
.main-content-text p {
  font-size: 0.32rem;
  width: 5rem;
}
p.color-4 {
  letter-spacing: 0.1em;
}
.btn {
  width: 66.67vw;
  height: 11.73vw;
  background: linear-gradient(
    45deg,
    rgba(239, 57, 49, 1),
    rgba(255, 72, 72, 1)
  );
  box-shadow: 0rem 0.1rem 0.22rem 0rem rgba(233, 85, 83, 0.16);
  border-radius: 0.44rem;
  margin: 0 auto;
  margin-top: 0.6rem;
  text-align: center;
  line-height: 11.73vw;
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  position: relative;
}
.time {
  margin-top: 0.5rem;
  width: 100%;
  /* background: red; */
  height: 0.97rem;
  text-align: center;
  display: flex;
  align-content: center;
}
.time img {
  margin-bottom: 0.3rem;
  width: 1.2rem;
  height: 1.5rem;
  position: absolute;
  top: 10rem;
  left: 2.1rem;
}
.time span {
  color: rgba(135, 111, 0, 1);
  font-size: 0.3rem;
  position: absolute;
  top: 10.5rem;
  left: 3.4rem;
}
</style>