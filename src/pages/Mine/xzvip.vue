<template>
  <div id="personalInfo" class="main-wrap" style="background:#FAFAFA">
    <div style="position: relative;">
      <img class="vip-pic" src="../../assets/xzvip/banner.png" />
      <div class="benner-text">
        <p>
          分享5位好友注册，VIP卡售价
          <span style="color:#FF8900">￥0.01/年</span>
        </p>
        <p>VIP原价为￥19.9/年</p>
      </div>
    </div>

    <div class="card-vip-title">如何1分钱成为VIP</div>
    <div class="card-help">
      <div class="card-help-icon">
        <img src="../../assets/xzvip/link.png" alt />
        <div class="card-help-text">分享链接</div>
      </div>
      <div class="card-help-icon">
        <img src="../../assets/xzvip/arrows.png" alt />
      </div>
      <div class="card-help-icon">
        <img src="../../assets/xzvip/link-to.png" alt />
        <div class="card-help-text">5位好友注册</div>
      </div>
      <div class="card-help-icon">
        <img src="../../assets/xzvip/arrows.png" alt />
      </div>
      <div class="card-help-icon">
        <img src="../../assets/xzvip/vip.png" alt />
        <div class="card-help-text">一分钱获取vip</div>
      </div>
    </div>

    <div class="card-vip-pri">
      <div class="card-vip-title">VIP特权</div>
      <div class="card-vip-pri-items">
        <div class="card-vip-pri-item">
          <div class="card-vip-pri-item-top">
            <img src="../../assets/images/icon-mian.png" alt />
            <div>VIP专享系列课程</div>
          </div>
          <div>场景式思维丛林启蒙方案</div>
        </div>
        <div class="card-vip-pri-item">
          <div class="card-vip-pri-item-top">
            <img src="../../assets/images/icon-quan.png" alt />
            <div>VIP超级用户特权</div>
          </div>
          <div>付费八五折、AI解决方案</div>
        </div>
      </div>
    </div>
    <div class="card-vip-title">我的分享进展</div>
    <div class="card-yaoqing">
      <div class="share-icon-wrap">
        <span class="share-icom" v-for="item in hassharedlen" :key="item.id">
          <img
            src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png"
            class="sharepeople"
          />
        </span>
        <span class="share-icom" v-for="(item,i) in nothasshare" :key="i">
          <img src="../../assets/images/icon-noshare.png" alt />
        </span>
      </div>
      <div class="share-number-num">{{hassharedlen}}</div>
      <div class="share-number">已成功分享(人)</div>
    </div>

    <div class="card-item-wrap">
      <div class="card-item">
        <div class="item-left-wrap">邀请码</div>
        <div class="item-center-wrap">
          <div class="input-wrap">
            <!-- <XInput 
              placeholder="请输入邀请人电话"
              placeholder-align="center"
              :show-clear="false"
              v-model="mobile"
              @on-change="mobileChange"
            /> -->
 <van-field
    v-model="mobile"
    clearable
    placeholder="请输入邀请人电话"
    :border='false'
    input-align='center'
    @input='mobileChange'
  />
          </div>
        </div>
        <div
          class="item-btn-outer"
          @click="getCode"
          :class="[mobile.length!=11?'item-btn-outer-active':'']"
        >获取邀请码</div>
      </div>
    </div>
    <div class="btn-wrap">
      <div @click="handleSubmit" v-if="hassharedlen==5" class="btn-submit">
        <div>￥{{fee}}购买VIP年卡</div>
      </div>
      <div class="btn-normal" v-if="hassharedlen!=5">
        <div class="btn-normal1" @click="handleSubmit">
           <template v-if="!newPrice">
          原价购买VIP
          </template>
          <template v-else>
            立享优惠40元
          </template>
        </div>
        <div class="btn-normal2"  @click="share">分享链接获取VIP</div>
      </div>
    </div>
    <div style="font-size:0.32rem">
      <!-- <toast v-model="showfail" :text="failmsg" type="warn"></toast>
      <toast v-model="showToast" :type="toastType">{{commonToast}}</toast> -->
    </div>
    <div
      v-if="vipshareShow"
      style="width:100%;height:100%;display:flex;justify-content: center;
    align-items: center;position: absolute;left: 0;top: 0;"
    >
      <vipShareDia @clickKnow="clickKnow"></vipShareDia>
    </div>
  </div>
</template>

<i18n>
  set bar-active-color:rgba(242, 200, 28, 1)
  zh-CN: rgba(242, 200, 28, 1)
</i18n>

<script>
// import { XInput, PopupPicker, Datetime } from "vux";
import serviceApi from "../../service/Mine/serviceConfig";
import { Field } from 'vant';
// import { Toast } from "vux";
import vipShareDia from "./components/vipShareDia";
export default {
  name: "xzvip",
  data() {
    return {
      ganderList: [
        [
          {
            name: "男",
            value: 1
          },
          {
            name: "女",
            value: 2
          }
        ]
      ],
      gander: ["男"],
      birthday: "",
      hassharedlen: 0,
      hassharelist: [],
      nothasshare: 5,
      mobile: "",
      fee: 59.9,
      showfail: false,
      failmsg: "",
      commonToast: "",
      showToast: false,
      toastType: "text",
      hasinvite: true,
      formnotVip: false,
      nospread: true, //展开
      vipshareShow: false, //vip分享弹窗
      newPrice:false
    };
  },
  components: {
    vanField:Field,
    // XInput,
    // PopupPicker,
    // Datetime,
    // Toast,
    vipShareDia
  },
  mounted: function() {
    // phone 0 没有手机号
    //       1 从vip弹窗进入购买
    //       号码 固定号码
    if (this.$route.params.phone == "1") {
      this.formnotVip = true;
    }
    if (this.$route.params.phone != "0" && this.$route.params.phone != "1") {
      this.mobile = this.$route.params.phone;
    } else {
      this.mobile = "";
    }
    let isvip = this.$store.state.userInfo.vip
    if (isvip == "1" || isvip == 1) {
      this.$router.push({ name: "thevip" });
      return;
    }
    document.title = "小Z思维VIP";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.nickname = userWechatInfo ? JSON.parse(userWechatInfo).nickName : "";
    const sharePhoneVip = localStorage.getItem("sharePhoneVip");
    this.getUserShare();
    if (sharePhoneVip) {
      this.mobile = sharePhoneVip;
    }
    this.Determine();
    this.handleShare();
  },
  methods: {
     handleInputBlur() {
      console.log('handleInputBlur');
      window.scroll(0,0);
    },
    isvipToTheVip() {
      let isvip = this.$store.state.userInfo.vip
      if (isvip == 1) {
        this.$router.push({ name: "thevip" });
      }
    },
    change: function(value) {
      this.gander = value === 1 ? ["男"] : ["女"];
    },
    handleSubmit: function() {
      this.payVIP();
    },
    handleDateTime: function(value) {},
    share: function() {
      this.vipshareShow = true;
    },
    Determine(event) {
      let mobile;
      mobile = this.mobile;
      const _this = this;
      const params = {
        mobile: mobile,
        userId: this.userId
      };
      this.$http({
        method: "post",
        url: `${serviceApi.getUserVipFee}`,
        data: params
      }).then(function(response) {
        console.log("获取用户需要支付的价格");
        if (response.data.status == "00") {
          if(_this.mobile.length==11)_this.newPrice = true
          _this.fee = response.data.resultMap.fee;
          _this.getUserShare();
        } else {
           _this.newPrice = false
          _this.showfail = true;
          _this.failmsg = response.data.msg;
        }
      });
    },
    getUserShare: function() {
      const _this = this;
      const url = `${serviceApi.getUserShare}` + "?userId=" + _this.userId;
      this.$http({
        method: "get",
        url: url
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.hassharelist = response.data.data;
            let length = response.data.data.length;
            _this.hassharedlen = length;
            _this.nothasshare = 5 - length;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    payVIP: function() {
      const _this = this;
      this.$http({
        method: "post",
        url: serviceApi.vipUnifiedorder,
        data: {
          userId: _this.userId,
          totalFee: _this.fee,
          mobile: _this.mobile
        }
      }).then(function(res) {
        _this.resultMap = res.data.obj;
        if (_this.resultMap) {
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
        } else {
          _this.commonToast =
            res.data && res.data.msg ? res.data.msg : "服务异常";
          _this.showToast = true;
        }
      });
    },
    /**
     * 微信支付api
     */
    onBridgeReady: function() {
      let _this = this;
      const { resultMap } = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: resultMap.appId, //公众号名称，由商户传入
          timeStamp: resultMap.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: resultMap.nonceStr, //随机串
          package: resultMap.package,
          signType: resultMap.signType, //微信签名方式：
          paySign: resultMap.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            localStorage.setItem("isFirst", 0);
            if (_this.formnotVip) {
              let id = sessionStorage.getItem("courseId");
              if (!id) {
                _this.getCourseIdByResId();
                return;
              }
              _this.$router.push({
                path: `/courseDetails/${id}/true`
              });
              return;
            } else {
              _this.$store.dispatch('getUserInfo')
              _this.$router.push({ name: "thevip" });
              _this.$store.dispatch('getUserInfo')
            }
          } else {
            _this.toastType = "warn";
            _this.commonToast = "支付失败";
            _this.showToast = true;
          }
        }
      );
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
              desc: "帮我给宝宝激活思维", // 分享描述
              link: `${location.origin}/?/#/personalVIP?id=${_this.userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              desc: "帮我给宝宝激活思维", // 分享描述
              link: `${location.origin}/?/#/personalVIP?id=${_this.userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
    // 根据资源id查询课程的id
    getCourseIdByResId() {
      // alert('跳转到课程页')
      let _this = this;
      let id = JSON.parse(sessionStorage.getItem("Buyinfo")).id;
      this.$http({
        method: "get",
        url: `${serviceApi.getCourseIdByResId}?id=${id}`
      })
        .then(res => {
          if (res.data && res.data.data && res.data.data[0]) {
            // alert('即将跳转')
            let courseId = res.data.data[0].courseId;
            _this.$router.push({
              path: `/courseDetails/${courseId}/true`
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    spreadEvent() {
      this.nospread = !this.nospread;
    },
    // 分享弹窗点击关闭按钮
    clickKnow(value) {
      this.vipshareShow = value;
    },
    getCode() {
      this.mobile = "17521738668";
      this.newPrice = true
      this.Determine()
    },
    mobileChange() {
      if (this.mobile.length == 11) {
        this.Determine();
      }else{
        this.newPrice = false
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0.29rem 0.38rem;
  width: 100%;
}
.benner-text {
  width: 5.3rem;
  height: 0.81rem;
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(118, 64, 0, 1);
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: absolute;
  white-space: nowrap;
  bottom: 0.47rem;
  left: 50%;
  transform: translateX(-50%);
}
.card-item {
  width: 100%;
  display: flex;
  /* justify-content: space-between;
     */
  align-items: center;
  flex: 1;
  margin-top: 0.29rem;
}
.min-height-85 {
  min-height: 1.3rem;
}
.card-item-wrap {
  border-radius: 0.2rem;
  min-height: 1.76rem;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 0.2rem;
  width: 89.86vw;
  margin-bottom: 0.12rem;
}
.icon_logo {
  width: 1.04rem;
  height: 1.04rem;
  margin-right: 0.28rem;
}
.icon_arrow_right {
  width: 0.14rem;
  height: 0.24rem;
}
.item-right-wrap,
.item-left-wrap {
  display: flex;
  align-items: center;
}
.item-btn-outer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.03rem;
  height: 0.6rem;
  background: rgba(230, 230, 230, 1);
  border-radius: 0.3rem;
  font-size: 0.24rem;
  color: rgba(154, 154, 154, 1);
  font-weight: 500;
  line-height: 1;
  margin-left: 0.16rem;
}
.item-btn-outer-active {
  background: rgba(255, 204, 27, 1);
  box-shadow: 0 0.07rem 0.21rem 0 rgba(146, 113, 0, 0.12);
  opacity: 0.72;
  color: rgba(125, 102, 0, 1);
}
.item-center-wrap {
  display: flex;
  flex-direction: column;
  padding-left: 0.29rem;
  flex: 1;
}
.item-left-wrap {
  position: relative;
  font-size: 0.32rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 1;
}
.margin-right-14 {
  margin-right: 0.28rem;
}
.icon-salse {
  width: 1.08rem;
  height: 1.08rem;
}
.left-text-wrap {
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.36rem;
}
.free {
  font-size: 0.3rem;
  color: #222222;
  font-weight: bold;
  line-height: 0.5rem;
}
.free-desc {
  color: #222222;
  font-size: 0.28rem;
}
.red {
  color: #e84729;
}
.input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  border-radius: 0.14rem;
  background-color: #f1f1f1;
  height: 0.6rem;
  font-size: 0.28rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.9);
}

.item-btn:active {
  opacity: 0.7;
}
.share-progress {
  color: #222222;
  font-size: 0.26rem;
  font-weight: 500;
}
.share-number {
  color: #999999;
  font-size: 0.22rem;
  position: absolute;
  right: 0.21rem;
  bottom: 0.31rem;
  line-height: 1;
}
.share-icon-wrap {
  flex: 1;
  display: flex;
  width: 100%;
  min-height: 1.46rem;
  align-items: center;
  position: relative;
  background-color: #fff;
  margin-top: 0.21rem;
  border-radius: 0.2rem;
  padding-left: 0.22rem;
}
.share-icom {
  width: 0.78rem;
  height: 0.78rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  font-size: 0.44rem;
  color: #cccccc;
  margin-right: 0.17rem;
}
.share-icom > img {
  width: 0.78rem;
  height: 0.78rem;
  display: block;
}
.btn-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0.06rem;
}
.btn-normal {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.34rem;
  color: rgba(255, 255, 255, 1);
}
.btn-normal > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-normal1 {
  font-size: 0.3rem;
  width: 2.31rem;
  height: 0.88rem;
  background: rgba(254, 217, 89, 1);
  border-radius: 0.44rem;
}
.btn-normal2 {
  width: 4.2rem;
  height: 0.88rem;
  background: linear-gradient(
    45deg,
    rgba(233, 81, 53, 1),
    rgba(232, 71, 41, 1)
  );
  box-shadow: 0 0.06 0.27rem 0 rgba(207, 104, 85, 0.28);
  border-radius: 0.44rem;
}
.btn-submit {
  width: 5.34rem;
  height: 0.88rem;
  position: relative;
  border-radius: 0.44rem;
  background: linear-gradient(
    45deg,
    rgba(233, 81, 53, 1),
    rgba(232, 71, 41, 1)
  );
  box-shadow: 0px 0.06rem 0.26rem 0 rgba(207, 104, 85, 0.28);
  font-size: 0.34rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-submit > div {
  position: relative;
}
.share-btn {
  display: flex;
  width: 1.36rem;
  height: 0.6rem;
  border-radius: 0.5rem;
  background-color: #fdd000;
  color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0.16rem;
  top: 0.25rem;
  font-size: 0.28rem;
  font-weight: bold;
}
.card-vip-title {
  font-size: 0.32rem;
  margin-top: 0.37rem;
  font-weight: bold;
  line-height: 1;
}
.card-vip-pri-items {
  display: flex;
  justify-content: space-between;
  margin-top: 0.21rem;
}
.card-vip-pri-item {
  width: 3.24rem;
  height: 1.34rem;
  padding: 0.11rem 0.23rem 0.28rem 0.21rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.12rem 0.26rem 0rem rgba(175, 175, 175, 0.08);
  border-radius: 0.14rem;
}
.card-vip-pri-item-top {
  display: flex;
  font-size: 0.28rem;
  align-items: center;
  justify-content: space-between;
}
.card-vip-pri-item-top > img {
  width: 0.64rem;
}
.card-vip-pri-item-top > div {
  white-space: nowrap;
  position: relative;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  line-height: 1;
}
.card-vip-pri-item-top + div {
  font-size: 0.24rem;
  white-space: nowrap;
  color: #a3a3a3;
  margin-top: 0.08rem;
  margin-left: 0.16rem;
  text-align: right;
  line-height: 1;
}
.card-yaoqing {
  position: relative;
}
.card-help {
  padding: 0.24rem 0.36rem 0.22rem 0.5rem;
  font-size: 0.24rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ff8900;
  line-height: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.11rem 0.27rem 0 rgba(175, 175, 175, 0.08);
  border-radius: 0.16rem;
  margin-top: 0.21rem;
}
.card-help-icon {
  position: relative;
  text-align: center;
}
.card-help-icon:nth-child(odd) > img {
  display: block;
  width: 0.69rem;
  margin: 0 auto;
}
.card-help-icon:nth-child(even) > img {
  display: block;
  width: 0.47rem;
  margin: 0 auto;
  position: relative;
  top: -0.19rem;
}
.card-help-text {
  margin-top: 0.18rem;
}
.share-number-num {
  position: absolute;
  top: 0.39rem;
  right: 0.8rem;
  color: rgba(232, 71, 41, 1);
  font-size: 0.4rem;
  line-height: 1;
}
</style> <style>
.weui-cell__ft {
  display: none;
}
.weui-cell__ft::after {
  display: none;
}
.btn-submit:active,
.share-btn:active {
  opacity: 0.8;
}
.vip-pic {
  width: 100%;
  display: block;
}
.vux-x-input {
  flex: 1;
  padding: 0.1rem 0.3rem !important;
}
.weui-input {
  font-size: 0.28rem !important;
  text-align: center;
}
.hide-class {
  height: 0.28rem !important;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.24rem;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.24rem;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.24rem;
}
::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.24rem;
}
#personalInfo  .van-cell{
  background-color: transparent;
  padding: 0;
}
</style>