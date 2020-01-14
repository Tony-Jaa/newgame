<template>
  <div class="content">
    <div class="bg">
      <div class="bgimg">
        <img src="../../assets/images/personalVip/bg.png" alt />
      </div>
      <div class="top">
        <img src="../../assets/images/personalVip/icon.png" class="icon" alt />
        <div class="top-main">
          <img class="bg2" src="../../assets/images/personalVip/bg-2.png" style="width:7.08rem" alt />
          <img class="font" src="../../assets/images/personalVip/font.png" alt />
        </div>
      </div>
    </div>
    <div class="item">
      <div class="tip">
        <p>我正在小Z思维启蒙购买VIP，分享5位好友注</p>
        <p>册，VIP最低￥0.01/年</p>
      </div>
      <div class="inp">
        <i class="icon-phone">
          <img src="../../assets/images/personalVip/phone.png" alt />
        </i>
        <input
          v-model="mobile"
          type="text"
          class="shuru"
          name="phone"
          id="phone"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="inp" style="margin-top:0.27rem">
        <i class="icon-phone">
          <img src="../../assets/images/personalVip/ma.png" alt />
        </i>
        <input v-model="msgcode" type="text" class="shuru" placeholder="请输入验证码" name id />
        <div @click="sendMsg" class="getma">{{gettext}}</div>
      </div>
      <div @click="addShare" class="btn">帮TA完成</div>
    </div>
    <div class="main">
      <div class="text">
        <p>小Z思维专注于0-6岁宝宝，通过场景式与行为大数据分析</p>
        <p>认知，发现宝宝潜在思维，真正从宝宝自身引导启蒙教育</p>
        <p>的家庭在线早教品牌。</p>
      </div>
    </div>
    <div class="main main1">
      <div class="text">
        <p>小Z思维专注于0-6岁宝宝，通过场景式与行为大数据分析</p>
        <p>认知，发现宝宝潜在思维，真正从宝宝自身引导启蒙教育</p>
        <p>的家庭在线早教品牌。</p>
      </div>
    </div>
    <div class="main main2">
      <div class="text">
        <p>小Z思维专注于0-6岁宝宝，通过场景式与行为大数据分析</p>
        <p>认知，发现宝宝潜在思维，真正从宝宝自身引导启蒙教育</p>
        <p>的家庭在线早教品牌。</p>
      </div>
    </div>
    <div class="bot">
      <div>
        <p>一个懂宝宝的思维启蒙平台</p>
        <img class="z-icon" src="../../assets/images/personalVip/Z.png" alt />
      </div>
      <div>
        <img class="code-icon" src="../../assets/images/personalVip/code.png" alt />
        <i>长按识别二维码</i>
      </div>
    </div>
    <div style="font-size:0.32rem">
      <!-- <toast v-model="showsucess" text="帮助成功"></toast>
      <toast v-model="showfail" :text="failtext" type="warn"></toast> -->
    </div>
  </div>
</template>
<script>
import serviceApi from "../../service/Mine/serviceConfig";
import { getQueryVariable } from "../../utils/utils";
import urlencode from "urlencode";
export default {
  data() {
    return {
      mobile: "",
      msgcode: "",
      showfail: false,
      failtext: "",
      gettext: "获取验证码"
    };
  },
  components: {
    // Toast
  },
  mounted() {
    document.title = "小ZVIP";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    if (!userWechatInfo) {
      this.getWXInfo();
      return;
    }
    this.userId = JSON.parse(userWechatInfo).id;
    this.nickname = JSON.parse(userWechatInfo).nickName;
    this.handleShare();
  },
  methods: {
    // 发送验证码
    sendMsg: function() {
      const _this = this;
      if(this.mobile.length!=11){
        this.$toast.fail('请输入正确的手机号码')
        return
      }
      const url = `${serviceApi.sendMsg}`;
      this.$http({
        method: "post",
        url: url,
        params: { mobile: _this.mobile }
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.gettext = 60;
            const myVar = setInterval(function() {
              _this.gettext--;
              if (_this.gettext == 0) {
                _this.gettext = "获取验证码";
                clearInterval(myVar);
              }
            }, 1000);
          } else {
            _this.showfail = true;
            _this.failtext =
              response.data && response.data.msg
                ? response.data.msg
                : "帮助失败";
            _this.$toast.fail(response.data && response.data.msg
                ? response.data.msg
                : "帮助失败")
          }
        })
        .catch(err => {
          console.log(err);
          _this.showfail = true;
          _this.failtext = "网络异常";
          _this.$toast.fail('网络异常')
        });
    },
    // 按钮帮他完成
    addShare: function() {
      const _this = this;
      const query = this.$route.query;
      if(!this.mobile||!this.msgcode){
        this.$toast.fail('请先输入手机号或验证码')
        return
      }
      const params = {
        userId: query.id || "",
        mobile: this.mobile,
        code: this.msgcode
      };
      const url = `${serviceApi.addShare}`;
      this.$http({
        method: "post",
        url: url,
        data: params
      })
        .then(function(response) {
          console.log(response);
          if (response.data.status == "00") {
            _this.$toast.success('帮助成功')
            _this.$router.push({
              name: "home",
              query: { frompersonalVIP: true }
            });
          } else {
            _this.showfail = true;
            _this.failtext =
              response.data && response.data.msg
                ? response.data.msg
                : "帮助失败";
          }
        })
        .catch(err => {
          console.log(err);
          _this.showfail = true;
          _this.failtext = "网络异常";
        });
    },
    // 分享
    handleShare() {
      let wechaturl = window.location.href.split("#")[0];
      const _this = this;
      const query = _this.$route.query;
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
              link: `${location.origin}/#/personalVIP?id=${query.id || ""}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              desc: "一个更懂宝宝的教育平台", // 分享描述
              link: `${location.origin}/#/personalVIP?id=${query.id || ""}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
    getWXInfo: function() {
      const userWechatInfo = localStorage.getItem("userWechatInfo");
      if (userWechatInfo) {
        return;
      }
      const _this = this;
      const wxData =
        location.href.indexOf("public") > -1 ? wxConfig.prd : wxConfig.test;
      const r_url = wxData.r_url + "/#" + this.$route.fullPath;
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
          console.log("xxxxxx", userWechatInfo, userWechatInfo.id);
          _this.userId = userWechatInfo.id || "";
          localStorage.setItem(
            "userWechatInfo",
            JSON.stringify(userWechatInfo)
          );
          _this.queryData();
        }
      });
    }
  }
};
</script>
<style scoped>
.content {
  width: 100%;
  background: rgba(249, 202, 0, 1);
  position: absolute;
}
.bgimg > img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.top {
  position: relative;
}
.top > .icon {
  width: 1.65rem;
  height: 0.43rem;
  display: block;
  margin: 0.36rem 0 0 0.4rem;
}
.top-main {
  position: relative;
  margin-top: -0.27rem;
}
.top-main > .bg2 {
  width: 7.08rem;
  position: absolute;
  left: 0;
  top: 0;
}
.top-main > .font {
  width: 6.38rem;
  margin: 0.53rem 0 0 0.59rem;
  position: relative;
  display: block;
}
.item {
  width: 6.74rem;
  margin: 0 auto 0.15rem;
  background: rgba(255, 252, 241, 1);
  box-shadow: 0 0.06rem 0.66rem 0.16rem rgba(194, 159, 59, 0.14);
  border-radius: 0.2rem;
  line-height: 0.4rem;
  position: relative;
  padding: 0.4rem 0.47rem 0.41rem 0.51rem;
}
.tip {
  font-size: 0.28rem;
  font-weight: bold;
  color: rgba(248, 92, 64, 1);
}
.inp {
  width: 100%;
  height: 0.8rem;
  background: rgba(240, 240, 240, 1);
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  margin-top: 0.42rem;
}

.icon-phone > img {
  width: 0.31rem;
  display: block;
  margin-left: 0.4rem;
  margin-right: 0.21rem;
}
.shuru {
  outline: none;
  border: 0;
  color: rgba(21, 21, 21, 1);
  background: rgba(240, 240, 240, 1);
  height: 100%;
  width: 100%;
  font-size: 0.3rem;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.28rem;
  color: rgba(0, 0, 0, 0.3);
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.28rem;
  color: rgba(0, 0, 0, 0.3);
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.28rem;
  color: rgba(0, 0, 0, 0.3);
}
::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.28rem;
  color: rgba(0, 0, 0, 0.3);
}
.getma {
  font-size: 0.28rem;
  font-weight: 400;
  color: rgba(245, 201, 1, 1);
  white-space: nowrap;
  padding: 0 0.38rem;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
}
.getma::before {
  content: "";
  width: 0.02rem;
  height: 0.37rem;
  display: block;
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  left: 0;
}
.btn {
  flex-grow: 1;
  height: 0.8rem;
  background: rgba(255, 209, 0, 1);
  border-radius: 0.4rem;
  font-size: 0.32rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 0.8rem;
  margin-top: 0.3rem;
}
.main {
  width: 6.74rem;
  margin: 0.2rem auto;
  position: relative;
}
.main::before {
  content: "什么是小Z思维?";
  display: block;
  position: relative;
  width: 2.58rem;
  height: 0.71rem;
  background-color: #fe9287;
  border-radius: 0.2rem 0.2rem 0 0;
  border: 0.06rem solid #fff;
  border-bottom: 0;
  font-size: 0.26rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 0.71rem;
  z-index: 2;
  top: 0.06rem;
}
.main::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 0.44rem;
  background-color: #ffd2cd;
  border-radius: 0 0.2rem 0 0;
  margin-top: 0.33rem;
  top: 0;
}
.main .text {
  width: 100%;
  height: 1.46rem;
  background: rgba(255, 239, 237, 1);
  border-radius: 0 0 0.2rem 0.2rem;
  border: 0.06rem solid #fff;
  border-top-left-radius: 0;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(234, 105, 94, 1);
  line-height: 0.33rem;
  padding: 0.27rem 0.26rem 0.24rem 0.28rem;
}
.main1::before {
  content: "VIP享受哪些权益?";
  background-color: #61c3ff;
}
.main1::after {
  background-color: #c0e7ff;
}
.main1 .text {
  background-color: #e6f5ff;
  color: #42adf0;
}
.main2::before {
  content: "如何找到小Z思维?";
  background-color: #a6d330;
}
.main2::after {
  background-color: #dbf3a2;
}
.main2 .text {
  background-color: #f3fcdf;
  color: #8ab41e;
}
.bot {
  width: 6.74rem;
  margin: 0.28rem auto 0.35rem;
  display: flex;
  justify-content: space-between;
}
.bot .z-icon {
  width: 3.29rem;
}
.bot .code-icon {
  width: 1.41rem;
}
.bot div {
  position: relative;
}
.bot p {
  position: absolute;
  left: 1.41rem;
  top: 0.93rem;
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
}
.bot img {
  display: block;
}
.bot i {
  font-size: 0.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.89);
  position: absolute;
  margin-top: 0.1rem;
}
</style>