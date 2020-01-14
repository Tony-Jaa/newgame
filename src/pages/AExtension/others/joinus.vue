<template>
  <div class="vip-recruit" v-show="show">
    <div class="bg">
      <div class="bg-item" v-if="!shareFlag" style="top:0.2rem;left:6.49rem">
        <img src="../../../assets/images/share/share-finger.png" alt />
      </div>
      <div class="bg-item-radio" style="width:1.14rem;height:1.14rem;left:0.11rem;top:0.41rem;"></div>
      <div class="bg-item-radio" style="width:1.62rem;height:1.62rem;left:5.58rem;top:1.77rem;"></div>
      <div class="bg-item-radio" style="width:0.54rem;;height:0.54rem;;left:5.19rem;top:5.36rem;"></div>
      <div class="bg-item-radio" style="width:1.14rem;height:1.14rem;left:1.91rem;top:8.72rem"></div>
    </div>
    <div v-if="!shareFlag" class="top-tip">
      <p>
        点击右上角“
        <span class="color-1" style="font-size:0.33rem">发送给朋友</span>”
      </p>
      <p>
        更多
        <span class="color-1" style="font-size:0.33rem">佣金</span>等你来拿~
      </p>
    </div>
    <img class="ppao" src="../../../assets/img/ppao.png" alt />
    <img class="ppao1" src="../../../assets/img/ppao.png" alt />
    <img class="ppao2" src="../../../assets/img/ppao.png" alt />
    <img class="ppao3" src="../../../assets/img/ppao.png" alt />
    <img class="ppao4" src="../../../assets/img/ppao.png" alt />
    <div class="main-content">
      <div class="main-content-imgs">
        <div style="margin-top:0.2rem;margin-right:0.3rem">
          <img src="../../../assets/images/share-smallz.png" style="width:1.53rem" alt />
        </div>
        <div class="position:relative">
          <div class="qipao-text">
            <div style="line-height: 0.36rem;">
              <p>加入我们，</p>
              <p>就等你啦！</p>
            </div>
          </div>
          <img src="../../../assets/images/share/share-qipao1.png" style="width:2.85rem" alt />
        </div>
      </div>

      <div class="main-content-text">
        <p>
          一起赚取海量
          <span class="color-1">佣金</span>
        </p>
      </div>
      <div class="main-content-text">
        <p>
          把科学的
          <span class="color-1">宝宝教育</span>方
        </p>
        <p>式传递给更多人</p>
      </div>
      <div class="main-logo">
        <div class="kite" style="width:100%">
          <!-- <img src="../../assets/images/share/kite.png" style="width:2.59rem;" alt /> -->
        </div>
        <img src="../../../assets/images/share/share-logo-left.png" style="width:2.62rem;" alt />
        <div style="position: relative;">
          <img
            src="../../../assets/images/share/logo.jpg"
            style="border-radius:0.12rem;width:1.58rem"
            alt
          />
        </div>
      </div>
    </div>
    <!-- <div v-if="shareFlag" @click="getInvite" class="btn">接受邀请</div> -->
    <div style="font-size:0.32rem">
      <!-- <toast v-model="warnflag" :text="text" type="warn"></toast> -->
    </div>
    <div v-if="shareFlag" class="time">
      <img src="../../../assets/img/xiong.gif" alt />
      <span>返回首页&nbsp;{{count}}&nbsp;s...</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import qs from "qs";
import urlencode from "urlencode";
import { getQueryVariable } from "../../../utils/utils";
import wxConfig from "../../../service/wx.config";
import serviceConfig from "../../../service/AExtension/serviceConfig";
import serviceApi from "../../../service/AExtension/serviceConfig"





export default {
  name: "joinus",
  data() {
    return {
      userId: "",
      warnflag: false,
      shareFlag: false,
      tuiguangyuanId: "",
      text: "请先关注公众号",
      show: false,
      count: ""
    };
  },
  components: {
    // Toast
  },
  computed: {},
  mounted: function() {
    document.title = "招募合伙人";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    // this.tuiguangyuanId = window.location.href.split("?")[1];
    // if (!this.userId) {
    //   this.warnflag = true;
    // }
    if (!userWechatInfo) {
      this.getWXInfo();
      return;
    }
    this.getShareInfo();
    this.getPromoterBasicInfo();
    // this.handleShare();
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
            // console.log("跳转到111")
            this.getInvite();
          }
        }, 1000);
      }
    },

    getShareInfo() {
      let query = window.location.href.split("?")[
        window.location.href.split("?").length - 1
      ];
      if (
        (query && query.indexOf("userId") > -1) ||
        (query && query.indexOf("state") > -1)
      ) {
        if (
          getQueryVariable("userId", query) ||
          getQueryVariable("state", query)
        ) {
          this.shareFlag = true;
          this.threeGo();
          this.show = true;
          const id =
            getQueryVariable("userId", query) ||
            getQueryVariable("state", query);
          this.tuiguangyuanId = id.split("#")[0];
        } else {
          this.shareFlag = false;
          this.show = true;
          console.log("失败");
        }
      } else {
        this.shareFlag = false;
        this.show = true;
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
        url: serviceConfig.doLogin,
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
          _this.handleShare();
          _this.getShareInfo();
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
        url: `${serviceApi.receiveProp}`,
        data: data
      }).then(function(response) {
        if (response.data.status == "00") {
          localStorage.setItem("sharePhone", response.data.obj);
          _this.$router.push({ name: "payPromotioncenter" });
        } else if (response.data.status == "02") {
          // _this.warnflag = true;
          _this.$toast(response.data.msg)
          setTimeout(() => {
            _this.$router.push({ name: "payPromotioncenter" });
          }, 3000);
        } else {
          // _this.warnflag = true;
          _this.$toast(response.data.msg)
          _this.$router.push({ name: "home" });
        }
      });
    },
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
              link: `${location.origin}/#/joinus?userId=${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              desc: "思维是父母能赋予孩子最大的财富", // 分享描述
              link: `${location.origin}/?/#/joinus?userId=${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 设置成功
                console.log("分享成功");
                console.log(`${location.origin}/?/#/joinus?userId=${id}`);
              }
            });
          });
        }
      });
    },
    getInvite() {
      let _this = this;
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      // 进入页面时就会判断有没有用户数据，授权时本地存储了数据，可以直接拿用户id
      this.$http
        .get(serviceApi.getPromoterBasicInfo, {
          params: {
            userId: userId
          }
        })
        .then(res => {
          if (res && res.data) {
            if (!res.data.resultMap) {
              // 不是推广员时，resultMap为null
              this.$router.push({
                name: "payPromotioncenter",
                query: { id: this.$route.query.userId }
              });
            } else {
              if (res.data.resultMap.payStatus == 1) {
                 this.$toast.success('您已经是推广员');
                setTimeout(() => {
                  this.$router.push({ name: "home" });
                }, 500);
              } else {
                // this.$router.push({
                //   name: "payPromotioncenter",
                //   query: { id: this.$route.query.userId }
                // });
                this.accept();
              }
            }
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
    }
  }
};
</script>


<style scoped>
.vip-recruit {
  width: 100%;
  /* padding-top: 0.4rem; */
  padding-bottom: 0.68rem;
  background: linear-gradient(
    45deg,
    rgba(112, 199, 253, 1),
    rgba(124, 204, 253, 1)
  );
  position: absolute;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.color-1 {
  color: #ffd100;
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
  width: 6.65rem;
  margin: 0 auto;
  margin-top: 0.6rem;
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
    rgba(112, 199, 253, 1),
    rgba(124, 204, 253, 1)
  );
}
.bg .bg-item {
  position: absolute;
  top: 0;
  left: 0.08rem;
}
.bg-item img {
  display: block;
  width: 0.64rem;
  height: 0.81rem;
}
.bg .bg-item-radio {
  position: absolute;
  top: 0;
  left: 0.08rem;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 50%;
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
  padding-top: 0.32rem;
  padding-left: 0.7rem;
  display: flex;
  margin-bottom: 0.42rem;
}
.main-content-imgs img {
  display: block;
}
.qipao-text {
  color: #ffb400;
  position: absolute;
  width: 3.14rem;
  padding: 0.46rem 0 0 0.96rem;
  font-size: 0.26rem;
  font-weight: bold;
}
.main-content-text {
  padding-left: 0.7rem;
  color: #fff;
  font-size: 0.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
  line-height: 0.54rem;
  padding-bottom: 0.3rem;
}
.main-logo {
  padding: 0 0.7rem 0 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.32rem;
  flex-wrap: wrap;
}
.main-content-text > p {
  font-weight: 500;
  letter-spacing: 0.07em;
}
.main-content-text span {
  font-weight: 800;
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
.main-logo .kite {
  height: 0.5rem;
}
.ppao,
.ppao1,
.ppao3,
.ppao4 {
  width: 1.14rem;
  height: 1.14rem;
  position: absolute;
  border-radius: 0.57rem;
}
.ppao1 {
  top: 8.7rem;
  left: 1.2rem;
}
.ppao {
  top: 10.5rem;
  left: 3rem;
}
.ppao2 {
  width: 1.38rem;
  height: 1.38rem;
  top: 10.7rem;
  left: -0.3rem;
  position: absolute;
  border-radius: 0.57rem;
}
.ppao3 {
  top: 0.4rem;
  left: 0.1rem;
}
.ppao4 {
  top: 2.7rem;
  left: 6rem;
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
  top: 9.5rem;
  left: 2.1rem;
}
.time span {
  color: rgba(135, 111, 0, 1);
  font-size: 0.3rem;
  position: absolute;
  top: 10rem;
  left: 3.4rem;
}
</style>