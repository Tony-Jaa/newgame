<template>
  <div style="background:#fafafa;width:100%;height:100%;position: relative">
    <div class="top-banner">
      <img src="../../../assets/images/payPromotioncenter-banner.png" alt />
    </div>
    <div class="promotionback">
      <div class="promotionback-title">
        <div>选择合伙人类别</div>
      </div>
      <div class="prospeed">
        <div class="each-prospeed" @click="checktype(0)">
          <img
            v-if="normalactive"
            src="../../../assets/images/payPromotioncenter-img-1.png"
            class="promotionact"
          />
          <img
            v-if="!normalactive"
            src="../../../assets/images/payPromotioncenter-img-2.png"
            class="promotionact"
          />
          <div class="actname">
            <p>合伙人</p>
          </div>
          <img
            src="../../../assets/images/payPromotioncenter-img-gou.png"
            class="img-gou"
            style="width:0.42rem"
            alt
          />
        </div>
        <div class="each-prospeed" @click="checktype(1)">
          <img
            v-if="!oneactive"
            src="../../../assets/images/payPromotioncenter-img-2.png"
            class="promotionact"
          />
          <img
            v-if="oneactive"
            src="../../../assets/images/payPromotioncenter-img-1.png"
            class="promotionact"
          />

          <div class="actname">
            <div>998</div>
            <div>高级合伙人</div>
          </div>
          <img
            src="../../../assets/images/payPromotioncenter-img-gou.png"
            class="img-gou"
            style="width:0.42rem"
            alt
          />
        </div>
        <div class="each-prospeed" @click="checktype(2)">
          <img
            v-if="!twoactive"
            src="../../../assets/images/payPromotioncenter-img-2.png"
            class="promotionact"
          />
          <img
            v-if="twoactive"
            src="../../../assets/images/payPromotioncenter-img-1.png"
            class="promotionact"
          />
          <div class="actname">
            <div>9980</div>
            <div>高级合伙人</div>
            <div>(股份)</div>
          </div>
          <img
            src="../../../assets/images/payPromotioncenter-img-gou.png"
            class="img-gou"
            style="width:0.42rem"
            alt
          />
        </div>
      </div>
      <div class="projieshao" v-if="normalactive">
        <div class="juese">您已选择：合伙人</div>
        <div class="juese">
          申请会费：
          <span style="color:#E94829;margin-left:-0.08rem">￥{{ruleList1.salePrice.toFixed(2)}}</span>
        </div>
        <div class="juese">
          您的任务：招募
          <span style="color:#E94829">{{ruleList1.vipMax}}</span>名VIP
        </div>
      </div>
      <div class="projieshao" v-if="oneactive">
        <div class="juese">您已选择：{{ruleList2.salePrice}}高级合伙人</div>
        <div class="juese">
          申请会费：
          <span style="color:#E94829;margin-left:-0.08rem">￥{{ruleList2.salePrice.toFixed(2)}}</span>
        </div>
        <div class="juese">
          您的任务：招募
          <span style="color:#E94829">{{ruleList2.downMax}}</span>名合伙人
        </div>
      </div>
      <div class="projieshao" v-if="twoactive">
        <div class="juese">您已选择：{{ruleList3.salePrice}}高级合伙人</div>
        <div class="juese">
          申请会费：
          <span style="color:#E94829;margin-left:-0.08rem">￥{{ruleList3.salePrice.toFixed(2)}}</span>
        </div>
        <div class="juese">
          您的任务：招募
          <span style="color:#E94829">{{ruleList3.downMax}}</span>名合伙人
        </div>
      </div>
    </div>
    <div class="speed">
      <div class="speed-wrap">
        <div class="promotionback-title" style="margin-left:0.32rem">
          <div>合伙人权益</div>
        </div>
        <div class="detail" style="width:79.4vw" v-show="normalactive">
          <div>1、合伙人权益：N+1全额vip奖励金；永久性分润机制；管道收入+金融属性；</div>
          <div>
            2、
            可获得所推广VIP及其所分享普通用户消费额的20%分佣。
          </div>
        </div>
        <div class="detail" style="width:79.4vw" v-show="oneactive">
          <div>1、合伙制分红制度：N+1全额vip奖励金；交易永久性分润机制；管道收入+金融属性；</div>
          <div>2、享受998高级合伙人专属分润体系。</div>
        </div>
        <div class="detail" style="width:79.4vw" v-show="twoactive">
          <div>1、合伙制分红制度：事业群恒定+效应；合伙制分红制度；N+1全额vip奖励金；交易永久性分润机制；管道收入+金融属性；</div>
          <div>2、享受9980高级合伙人专属分润体系。</div>
        </div>
      </div>
    </div>

    <div class="speed">
      <div class="speed-wrap">
        <div class="promotionback-title" style="margin-left:0.32rem">
          <div>填写个人信息</div>
        </div>
        <div class="each-info" style="margin-top:0.22rem">
          <div class="info-tit">真实姓名</div>
          <input class="info-input" placeholder="请输入真实姓名" v-model="userinfor.name" />
        </div>
        <div class="fengediv"></div>
        <div class="each-info">
          <div class="info-tit">手机号码</div>
          <input class="info-input" placeholder="请输入真实手机号码，退押金时讲联系您" v-model="userinfor.mobile" />
        </div>
        <div class="fengediv"></div>
        <div class="each-info">
          <div class="info-tit">身份证号</div>
          <input class="info-input" placeholder="请输入真实的身份证信息" v-model="userinfor.idNo" />
        </div>
        <div class="fengediv"></div>
        <div class="each-info">
          <div class="info-tit">银行卡号</div>
          <input class="info-input" placeholder="请输入真实银行卡信息，用于奖励金提现" v-model="userinfor.cardNo" />
        </div>
        <div class="fengediv"></div>
      </div>
    </div>

    <div class="speed" v-show="normalactive">
      <div
        class="speed-wrap"
        style="display:flex;padding-right:0.46rem;justify-content: space-between;"
      >
        <div class="promotionback-title" style="margin-left:0.32rem">
          <div>我的邀请人</div>
        </div>
        <div>
          <input class="info-input-pro" placeholder="请输入邀请人电话" v-model="userinfor.code" />
        </div>
        <div style="display:flex;align-items:center;">
          <span class="item-btn" @click="applyPromotor">确定</span>
        </div>
      </div>
    </div>

    <div style="width:100%;background-color:#F5F3FF;padding-top:0.7rem">
      <div class="getmomeny" @click="promoteradd(true)">确认并支付￥{{momey}}</div>
    </div>
    <div class="read-rule-row">
      <div style="position:relative;margin-right:0.18rem">
        <input type="checkbox" class="read-rule" v-model="readRule" id="color-input-blue" />
        <label for="color-input-blue">
          <img src="../../../assets/images/payPromotioncenter-img-gou.png" alt />
        </label>
      </div>
      <p style="margin-left:0.14rem">阅读并接受小Z思维</p>
      <div class="promotionrule" @click="torule">《推广规则》</div>
    </div>
    <div style="font-size:0.32rem">
      <!-- <toast v-model="showsucess" text="绑定成功"></toast>
      <toast v-model="showfail" type="warn" :text="failtext"></toast>
      <toast v-model="payfail" type="warn" text="支付失败"></toast>
      <toast v-model="toast" type="text">{{commonToast}}</toast>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import serviceApi from "../../../service/AExtension/serviceConfig";


export default {
  name: "payPromotioncenter",
  data() {
    return {
      normalactive: true,
      oneactive: false,
      twoactive: false,
      momey: "198.00",
      userId: "",
      userinfor: {
        id: "",
        name: "",
        idNo: "",
        cardNo: "",
        mobile: "",
        code: "",
        type: 1,
        level: 1
      },
      // showsucess: false,
      // showfail: false,
      typename: "普通",
      payfail: false,
      toast: false,
      commonToast: "",
      failtext: "",
      readRule: true,
      ruleList1: {
        level: "1",
        name: "普通推广员",
        vipMax: 15,
        vipCashPerNum: 15,
        vipMoney: 298.5,
        downMax: 0,
        downCashPerNum: 0,
        downMoney: 0,
        salePrice: 198
      },
      ruleList2: {
        level: "2",
        name: "高级推广员一档",
        vipMax: 150,
        vipCashPerNum: 15,
        vipMoney: 298.5,
        downMax: 8,
        downCashPerNum: 8,
        downMoney: 1584,
        salePrice: 998
      },
      ruleList3: {
        level: "3",
        name: "高级推广员二挡",
        vipMax: 1800,
        vipCashPerNum: 15,
        vipMoney: 298.5,
        downMax: 80,
        downCashPerNum: 8,
        downMoney: 1584,
        salePrice: 9980
      }
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    let inviteId = this.$route.query.id;
    if (inviteId) {
      this.getInviteInfo(inviteId);
    }
    this.getRuleList();
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    const sharePhone = localStorage.getItem("sharePhone");
    if (sharePhone) {
      this.userinfor.code = sharePhone;
    }
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.userinfor.id = this.userId;
    document.title = "推广中心";
  },
  methods: {
    getInviteInfo(id) {
      let _this = this;
      this.$http
        .get(serviceApi.getPromoterBasicInfo, {
          params: { userId: id }
        })
        .then(res => {
          if (res && res.data && res.data.resultMap) {
            // _this.userinfor.mobile =
            _this.userinfor.code = res.data.resultMap.mobile;
          }
        });
    },
    applyPromotor() {
      this.promotercheck();
    },
    torule: function() {
      this.$router.push({ name: "promotionrule" });
    },
    paymomey: function() {
      const _this = this;
      this.$http({
        method: "post",
        url: serviceApi.promoterUnifiedorder,
        data: {
          level: String(_this.userinfor.level),
          userId: _this.userId,
          totalFee: _this.momey
        }
      })
        .then(function(res) {
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
                document.attachEvent(
                  "WeixinJSBridgeReady",
                  _this.onBridgeReady
                );
                document.attachEvent(
                  "onWeixinJSBridgeReady",
                  _this.onBridgeReady
                );
              }
            } else {
              _this.onBridgeReady();
            }
          } else {
            _this.$toast("服务异常")
            // _this.commonToast = "服务异常";
            _this.toast = true;
          }
        })
        .catch(err => {
          console.log("获取学院详情", err);
        });
      // this.promoteradd();
      // this.$router.push({ name: "promotioncenter" });
    },
    tohasbuy: function() {
      this.promoteradd();
    },
    tocollection: function() {
      this.$router.push({ name: "collection" });
    },

    promoteradd: function(isPayButton = false) {
      // console.log('isPayButton', isPayButton)
      if (!this.readRule) {
        this.$toast.fail("请先阅读协议");
        return;
      }
      if (this.userinfor.name === "") {
        this.$toast.fail("请输入真实姓名");
        return;
      }
      if (this.userinfor.mobile === "") {
        this.$toast.fail("请输入手机号码");
        return;
      }
      if (
        !this.userinfor.mobile.startsWith("1") ||
        this.userinfor.mobile.length !== 11
      ) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (this.userinfor.idNo === "") {
        this.$toast.fail("请输入身份证号");
        return;
      }
      if (this.userinfor.cardNo === "") {
        this.$toast.fail("请输入银行卡号");
        return;
      }

      const _this = this;
      const url = `${serviceApi.promoteradd}`;
      this.$http({
        method: "post",
        url: url,
        data: _this.userinfor
      })
        .then(function(response) {
          if (response.data.status == "00") {
            // _this.showsucess = true;
            _this.$toast.success("绑定成功");
            if (navigator.userAgent.indexOf("iPhone") !== -1) {
              window.wechaturl = window.location + "";
            }
            // _this.$router.push({name: "promotioncenter"});
            if (isPayButton) {
              _this.paymomey();
            }
          } else {
            // _this.showfail = true;
            _this.$toast(response.data.msg || "修改失败")
            // _this.$toast(response.data.msg)
          }
        })
        .catch(err => {
          // _this.showfail = true;
          _this.$toast("网络失败")
          // _this.failtext = "网络失败";
        });
    },

    promotercheck: function(isPayButton = false) {
      // console.log('isPayButton', isPayButton)

      if (this.userinfor.name === "") {
        this.$toast.fail("请输入真实姓名");
        return;
      }
      if (this.userinfor.mobile === "") {
        this.$toast.fail("请输入手机号码");
        return;
      }
      if (
        !this.userinfor.mobile.startsWith("1") ||
        this.userinfor.mobile.length !== 11
      ) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (this.userinfor.idNo === "") {
        this.$toast.fail("请输入身份证号");
        return;
      }
      if (this.userinfor.cardNo === "") {
        this.$toast.fail("请输入银行卡号");
        return;
      }

      const _this = this;
      const url = `${serviceApi.promotercheck}`;
      this.$http({
        method: "post",
        url: url,
        data: _this.userinfor
      })
        .then(function(response) {
          if (response.data.status == "00") {
            // _this.showsucess = true;
            _this.$toast.success("绑定成功");
            if (navigator.userAgent.indexOf("iPhone") !== -1) {
              window.wechaturl = window.location + "";
            }
            // _this.$router.push({name: "promotioncenter"});
            if (isPayButton) {
              _this.paymomey();
            }
          } else {
            // _this.showfail = true;
            _this.$toast(response.data.msg || "修改失败");
            // _this.$toast(response.data.msg)
          }
        })
        .catch(err => {
          // _this.showfail = true;
          _this.$toast("网络失败");
        });
    },

    gettype: function(type) {
      if (type == 1) {
        this.typename = "普通";
      } else if (type == 2) {
        this.typename = " 高档一";
      } else if (type == 3) {
        this.typename = " 高档二";
      }
    },
    checktype: function(type) {
      this.normalactive = false;
      this.oneactive = false;
      this.twoactive = false;
      if (type == 0) {
        this.normalactive = true;
        this.userinfor.type = 1;
        this.userinfor.level = 1;
        this.momey = this.ruleList1.salePrice;
      } else if (type == 1) {
        this.oneactive = true;
        this.userinfor.type = 2;
        this.userinfor.level = 2;
        this.momey = this.ruleList2.salePrice;
      } else if (type == 2) {
        this.twoactive = true;
        this.userinfor.type = 3;
        this.userinfor.level = 3;
        this.momey = this.ruleList3.salePrice;
      } else {
      }
    },
    /**
     * 微信支付api
     */
    onBridgeReady: function() {
      const _this = this;
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
            _this.$router.push({ name: "promotionReview" });
          } else {
            _this.payfail = true;
            _this.$toast.fail('支付失败')
          }
        }
      );
    },
    getRuleList() {
      let _this = this;
      this.$http.post(serviceApi.getList).then(res => {
        if (res && res.data && res.data.data) {
          let ruleInfo = res.data.data;
          _this.ruleList1 = ruleInfo[0];
          _this.ruleList2 = ruleInfo[1];
          _this.ruleList3 = ruleInfo[2];
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.numcolor {
  color: #e84729;
}
.info-input-pro {
  width: 39.73vw;
  height: 0.6rem;
  background: rgba(241, 241, 241, 1);
  border-radius: 0.14rem;
  border: none;
  outline: none;
  text-align: center;
  position: relative;
  display: block;
  font-size: 0.28rem;
}
.fengediv {
  width: 90%;
  height: 0.02rem;
  background: #e0e0e0;
  margin: 0 auto;
}
.info-tit {
  font-size: 0.28rem;
  color: rgba(34, 34, 34, 1);
  line-height: 0.68rem;
  margin: 0 0.32rem;
}
.each-info {
  display: flex;
  align-items: center;
  .item-right-wrap {
    font-size: 0.26rem;
    width: 4em;
  }
}
.info-input {
  width: calc(100% - 2rem);
  height: 0.98rem;
  border: 0;
  font-size: 0.28rem;
  font-weight: 500;
  line-height: 0.68rem;
  outline: none;
  color: #222222;
  font-weight: bold;
}
.actname {
  position: absolute;
  width: 100%;
  height: 1.63rem;
  top: 0;
  font-size: 0.24rem;
  line-height: 0.28rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.normalname {
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  /* display: flex;
     */
  align-items: center;
  justify-content: center;
  margin-top: 0.4rem;
}
.promotionact {
  width: 1.66rem;
  height: 1.76rem;
  display: block;
}
.prospeed {
  display: flex;
  height: 1.76rem;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.51rem;
}
.each-prospeed {
  position: relative;
}
.promotionback {
  width: 90.4vw;
  position: relative;
  z-index: 2;
  margin: -4rem auto 0;
  padding: 0.36rem 4.8vw 0.34rem 4.26vw;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.04rem 0.28rem 0rem rgba(70, 70, 70, 0.08);
  border-radius: 0.14rem;
}
.speed {
  position: relative;
  padding-top: 0.2rem;
  background-color: #f5f3ff;
}
.speed-tit {
  width: 90%;
  height: 0.7rem;
  background: #e84660;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  margin: 0 auto;
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.speed-tit-per {
  width: 90%;
  height: 0.7rem;
  background: #3ebee2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  margin: 0 auto;
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.speed-wrap {
  width: 90%;
  background: #fff;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 0.3rem;
  padding-top: 0.34rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.04rem 0.28rem 0rem rgba(70, 70, 70, 0.08);
  border-radius: 0.14rem;
}
.detail {
  width: 80.2vw;
  font-size: 0.26rem;
  color: rgba(34, 34, 34, 1);
  line-height: 0.4rem;
  text-align: left;
  margin: 0 auto;
  margin-left: 0.4rem;
  padding-top: 0.3rem;
  text-indent: 0.25rem;
}
.detail > div {
  margin-bottom: 0.08rem;
}
.juese {
  font-size: 0.28rem;
  color: rgba(34, 34, 34, 1);
}
.getmomeny {
  width: 5.2rem;
  height: 0.88rem;
  background: rgba(232, 71, 41, 1);
  border-radius: 0.88rem;
  margin: 0 auto;
  font-size: 0.34rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.88rem;
  text-align: center;
}
.promotionrule {
  font-size: 0.26rem;
  color: rgba(62, 190, 226, 1);
  line-height: 0rem;
}
.top-banner {
  width: 100%;
  position: relative;
  left: 0;
  top: -1.4rem;
}
.top-banner > img {
  width: 100%;
}
.promotionback-title {
  position: relative;
  display: flex;
  align-items: center;
}
.promotionback-title > div {
  margin-left: 4.26vw;
  font-size: 0.32rem;
  font-weight: bold;
  color: rgba(11, 11, 11, 1);
}
.promotionback-title::before {
  content: "";
  display: block;
  position: absolute;
  width: 0.08rem;
  height: 4.8vw;
  background: rgba(255, 209, 0, 1);
  border-radius: 0.04rem;
}
.img-gou {
  position: absolute;
  left: 50%;
  bottom: 0.12rem;
  margin-left: -0.21rem;
}
.read-rule-row {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.66rem;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(11, 11, 11, 1);
  line-height: 0.52rem;
  padding-top: 0.28rem;
  background-color: #f5f3ff;
}
.read-rule {
  visibility: hidden;
}
#color-input-blue + label {
  box-sizing: border-box;
  display: block;
  width: 0.36rem;
  height: 0.34rem;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 39%;
  background-color: #fff;
  border: 0.06rem solid rgba(97, 195, 255, 1);
  border-radius: 0.06rem;
}
#color-input-blue:checked + label::before {
  display: block;
  content: "";
  width: 110%;
  height: 131%;
  text-align: center;
  font-size: 0.34rem;
  color: #fff;
  line-height: 0.26rem;
  background: #61c3ff;
  position: absolute;
  left: 0;
  top: -0.06rem;
}

label > img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  font-size: 0.24rem;
  color: #cccccc;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
  font-size: 0.24rem;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
  font-size: 0.24rem;
}
::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #cccccc;
  font-size: 0.24rem;
}
.item-btn {
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(97, 195, 255, 1);
  display: block;
}
</style>
