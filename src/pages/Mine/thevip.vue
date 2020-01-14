<template>
  <div style="background:#fafafa;width: 100%;height: 100%;">
    <div class="getpro-wrap" style="position:relative">
      <div class="vipTop">
        <div>
          <img class="huangguanImg" src="../../assets/images/vip-huangguan.png" alt />
        </div>
      </div>
      <div class="vip-top">
        <div class="vip-show-info">
          <img :src="image" class="userinfo" />
          <span class="username">{{nickName}}</span>
        </div>
        <div class="vip-logo">
          <img src="../../assets/images/z_logo.png" alt />
        </div>
      </div>
      <div class="des">
        VIP有效期至
        <span style="color:#E94829">{{endtime?endtime:$store.state.userInfo.endtime}}</span>
      </div>
    </div>
    <div class="vip-item">
      <div class="vip-item-title">尊贵的小Z思维VIP，您可以享有以下专属特权</div>
      <div>
        <div class="vip-item-left">
          <div class="vip-item-show">
            <img src="../../assets/images/icon-mian2.png" alt />
            <div style="display:block">
              <div class="icon-item-top-title">VIP专享系列课程</div>
              <div class="icon-item-top-bottom">场景式思维丛林启蒙方案</div>
            </div>
          </div>
          <div class="vip-item-show">
            <img src="../../assets/images/icon-quan2.png" alt />
            <div>
              <div style="display:block">
                <div class="icon-item-top-title">VIP超级用户特权</div>
                <div class="icon-item-top-bottom">付费八五折、AI解决方案</div>
              </div>
              <img src="../../assets/images/vip-shuiying.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="back-btn-outer" @click="backToHome">
      <div class="back-btn">返回首页</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "thevip",
  data() {
    return {
      endtime: "",
      nickName: "",
      image:
        "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/userinfo.png"
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    let _this = this;
    document.title = "小ZVIP";
    this.endtime = this.$route.query.endtime || this.$store.state.userInfo.endTime;
    let wxUserInfo = localStorage.getItem("userWechatInfo");
    if (wxUserInfo && JSON.parse(wxUserInfo)) {
      wxUserInfo = JSON.parse(wxUserInfo);
      this.nickName = wxUserInfo.nickName || "";
      this.image = wxUserInfo.image || this.image;
    }
  },
  methods: {
    backToHome() {
      window.location.href = window.location.href.split('#')[0]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vipbottomimg {
     width: 1.32rem;
     height: 1.72rem;
}
 .tequaninfo {
     width: 30%;
     height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     position: relative;
}
 .tequantit {
     font-size: 0.32rem;
     ;
     font-weight: bold;
     color: rgba(34, 34, 34, 1);
}
 .tequaninfor {
     font-size: 0.28rem;
     ;
     font-weight: 200;
     color: rgba(153, 153, 153, 1);
}
 .tequanname {
     position: absolute;
     width: 100%;
     height: 100%;
     font-size: 0.36rem;
     ;
     font-weight: bold;
     color: rgba(255, 255, 255, 1);
     display: flex;
     justify-content: center;
     align-items: center;
}
 .tequanjieshao {
     width: 70%;
     height: 100%;
     display: flex;
     justify-content: flex-start;
     align-items: center;
}
 .tequanimg {
     width: 1.06rem;
     height: 1.08rem;
}
 .tequan {
     width: 90%;
     height: 1.7rem;
     background: rgba(255, 255, 255, 1);
     border-radius: 0.4rem;
     margin: 0.2rem auto;
     display: flex;
     align-items: center;
     justify-content: center;
}
 .vipbottom {
     position: absolute;
     right: 0rem;
     bottom: 0rem;
}
 .viphead {
     width: 0.88rem;
     height: 0.56rem;
}
 .userinfo {
     width: 0.78rem;
     height: 0.78rem;
     border-radius: 50%;
     position: relative;
}
 .dear {
     font-size: 0.36rem;
     ;
     font-weight: bold;
     color: rgba(253, 208, 0, 1);
}
 .mine-wrap {
     margin-top: 0.4rem;
     display: flex;
     justify-content: center;
}
 .minepic {
     width: 4.14rem;
     height: 1.3rem;
}
 .apply {
     width: 5.2rem;
     height: 0.88rem;
     background: #fdd000;
     border-radius: 0.88rem;
     margin: 0.4rem auto;
     font-size: 0.34rem;
     ;
     color: rgba(255, 255, 255, 1);
     line-height: 0.88rem;
     text-align: center;
}
 .promotionrule {
     font-size: 0.26rem;
     ;
     text-decoration: underline;
     color: rgba(62, 190, 226, 1);
     line-height: 0rem;
     margin: 0.4rem auto;
     text-align: center;
}
 .getpro-wrap {
     width: 94.4%;
     height: 2.52rem;
     border-radius: 0.4rem;
     align-items: center;
     padding-top: 0.72rem;
     margin-left: 0.08rem;
}
 .gongxi {
     font-size: 0.32rem;
     ;
     color: rgba(233, 72, 41, 1);
     padding-top: 0.2rem;
}
 .des {
     position: relative;
     z-index: 2;
     text-align: center;
     left: -0.52rem;
     top: 0.3rem;
     font-size: 0.24rem;
     ;
     font-weight: 500;
     color: rgba(146, 82, 0, 1);
     line-height: 0.36rem;
     opacity: 0.63;
}
 .getpro {
     width: 1.56rem;
     height: 1.56rem;
}
 .huangguanImg {
     width: 100%;
     position: absolute;
     left: 0;
     top: 0;
     z-index: 1;
     width: 100%;
     height: 100%;
}
 .vip-show-info {
     position: relative;
     z-index: 2;
     display: flex;
}
 .username {
     font-size: 0.28rem;
     font-weight: 500;
     color: rgba(0, 0, 0, 1);
     position: relative;
     left: 0.14rem;
     top: 0.26rem;
}
 .vip-top {
     display: flex;
     position: relative;
     left: 0.72rem;
     padding-right: 0.72rem;
     z-index: 2;
     justify-content: space-between;
}
 .vip-logo {
     width: 0.76rem;
     height: 0.84rem;
     margin-right: 0.58rem;
}
 .vip-logo > img {
     height: 100%;
     width: 100%;
}
 .vip-item {
     width: 6.78rem;
     background-color: #ffffff;
     margin: 0 auto;
     background: rgba(255, 255, 255, 1);
     box-shadow: 0rem 0.12rem 0.62rem 0rem rgba(170, 159, 109, 0.09);
     border-radius: 0rem 0rem 0.2rem 0.2rem;
     line-height: 1;
}
 .vip-item-title {
     text-align: center;
     font-size: 0.28rem;
     font-weight: 500;
     color: rgba(0, 0, 0, .4);
     padding-top: 0.42rem;
}
 .vip-item-show {
     display: flex;
     align-items: center;
     margin-bottom: 0.31rem;
}
 .vip-item-show > img {
     width: 0.7rem;
     position: relative;
     top: 0.02rem;
}
 .vip-item-show > div {
     margin-left: 0.2rem;
     font-size: 0.28rem;
     font-weight: 400;
     color: rgba(0, 0, 0, 1);
     width: 100%;
     display: flex;
     align-items: center;
     justify-content: space-between;
}
 .vip-item-show > div > img {
     width: 0.86rem;
}
 .back-btn-outer {
     margin: 0.49rem auto;
     width:5.34rem;
height:0.88rem;
     border-radius: 0.44rem;
}
 .back-btn {
     width: 100%;
     height: 100%;
     text-align: center;
     background: linear-gradient( 45deg, rgba(255, 209, 0, 1), rgba(255, 215, 33, 1) );
     border-radius: 0.4rem;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 0.34rem;
     color: rgba(255, 255, 255, 1);
     position: relative;
}
 .back-time {
     position: absolute;
     right: 0.42rem;
}
 .icon-item-top-title {
     font-size: 0.28rem;
     color: rgba(41, 34, 0, .9);
     white-space: nowrap;
}
 .icon-item-top-bottom {
     font-size: 0.28rem;
     ;
     font-weight: 400;
     color: rgba(0, 0, 0, .6);
     white-space: nowrap;
     margin-top: 0.17rem;
}
.vip-item-left{
  padding: 0 0.4rem 0 0.47rem;
  margin-top: 0.3rem;
  
}
.vip-item-show:nth-child(even){
  padding-bottom: 0.36rem;
}
</style>
