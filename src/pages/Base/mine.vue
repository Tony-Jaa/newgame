<template>
  <div style="width: 100%;height:100%;display:flex;flex-direction: column;">
    <div class="mine-wrap">
      <img v-lazy="'https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/minepic.png'" class="minepic" />
    </div>
    <div class="title-wrap">
      <div class="userinfo">
        <img :src="userWechatInfo.image" class="infoImg" />
      </div>
      <div style="margin-left:0.175rem" @click="topersonalinfo">
        <div class="username">{{userWechatInfo.nickName}}</div>
        <div class="usertext">查看或者编辑个人资料</div>
      </div>
    </div>
    <div class="collectpromotion">
      <div class="collectpromotiondiv" @click="tohasbuy">
        <img v-lazy="require('../../assets/images/buy-car.png')" class="buyimgs" />
        <div class="jieshao">我的已购</div>
      </div>
      <div class="collectpromotiondiv" @click="tocollection">
        <img v-lazy="require('../../assets/images/coursebar/collection.png')" class="buyimg" />
        <div class="jieshao">我的收藏</div>
      </div>
      <div class="collectpromotiondiv" @click="toplayHistory">
        <img v-lazy="require('../../assets/img/c2.png')" class="abuyimg" />
        <div class="jieshao">播放历史</div>
      </div>
    </div>
    <div class="hasbuy" @click="toxzvip">
      <img v-lazy="require('../../assets/images/mime-vip.png')" class="buysimg" />
      <div class="jieshao">小Z超级VIP</div>
    </div>
    <div class="hasbuy" @click="totuiguang">
      <img v-lazy="require('../../assets/images/mime-tuiguang.png')" class="buyimges" />
      <div class="jieshao">推广中心</div>
    </div>

    <div class="minejieshaodiv">
      <img v-lazy="require('../../assets/images/mime-logo.png')" class="minejieshao" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import serviceApi from "../../service/Base/serviceConfig";
import Bus from "../../assets/bus";

export default {
  name: "mine",
  data() {
    return {
      flag: false,
      userWechatInfo: { image: "", nickName: "" },
      userId: "",
      isvip: 0,
      endtime: "",
      applyStatus: 2,
      promoter: 0,
      applyType: 0
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    document.title = "我的";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userWechatInfo = JSON.parse(userWechatInfo);
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    if (this.userId) {
      this.getUserInfo();
      this.getPromoterBasicInfo();
    } else {
      Bus.$on("getUserInfo", () => {
        const userWechatInfo = localStorage.getItem("userWechatInfo");
        this.userWechatInfo = JSON.parse(userWechatInfo);
        this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
        this.getUserInfo();
        this.getPromoterBasicInfo();
      });
    }
  },
  methods: {
    // 跳转到测评
    handleEvaluation: function() {
      wx.miniProgram.navigateTo({ url: "/pages/evaluation/evaluation" });
    },
    tohasbuy: function() {
      this.$router.push({ name: "hasbuy" });
      // location.href = `${location.origin}/#/hasbuy`
    },
    tocollection: function() {
      this.$router.push({ name: "collection" });
    },
    toxzvip: function() {
      if (this.isvip == 1) {
        this.$router.push({ name: "thevip", query: { endtime: this.endtime } });
      } else {
        this.$router.push({ path: "/xzvip/0" });
      }
    },
    toplayHistory() {
      this.$router.push({ name: "playHistory" });
    },
    totuiguang: function() {
      let { applyType, applyStatus } = this;
      if (applyType == 0 && applyStatus == 0) {
        //状态0审核中
        this.$router.push({ name: "promotionReview" });
        return;
      }
      if (applyType == 0 && applyStatus == 2) {
        //
        this.$router.push({ name: "applypro" });
        return;
      }
      if (applyType == 0 && applyStatus == 1) {
        this.$router.push({ name: "promotioncenter" });
        return;
      }
      if (applyType == 1 && (applyStatus == 0 || applyStatus == 1)) {
        this.$router.push({ name: "promotioncenter" });
        return;
      }
      this.$router.push({ name: "applypro" });
    },
    topersonalinfo: function() {
      this.$router.push({ name: "personalInfo" });
    },
    getUserInfo() {
      const userWechatInfo = localStorage.getItem("userWechatInfo");
      this.userWechatInfo = JSON.parse(userWechatInfo);
      this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
      this.isvip = this.$store.state.userInfo.vip;
      this.endtime = this.$store.state.userInfo.endTime;
      this.mobile = this.$store.state.userInfo.mobile; //手机号
      this.complete = this.$store.state.userInfo.complete;
    },
    getPromoterBasicInfo() {
      let _this = this;
      this.$http
        .get(serviceApi.getPromoterBasicInfo, {
          params: { userId: _this.userId }
        })
        .then(res => {
          if (res && res.data && res.data.resultMap) {
            _this.applyType = res.data.resultMap.applyType;
            _this.applyStatus = res.data.resultMap.applyStatus;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-wrap {
  width: 90%;
  height: 1.62rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.08rem 0.38rem 0 rgba(117, 117, 117, 0.07);
  border-radius: 0.2rem;
  display: flex;
  margin: 0 auto;
  margin-bottom: 0.2rem;
  align-items: center;
  position: relative;
}
.title-wrap::after {
  content: "";
  width: 0.12rem;
  height: 0.12rem;
  border-top: 0.04rem solid gainsboro;
  border-right: 0.04rem solid gainsboro;
  transform: rotate(45deg);
  position: absolute;
  right: 0.43rem;
}
.userinfo {
  margin-left: 0.2rem;
}
.userinfo > img {
  box-shadow: 0 0.02rem 0.07rem 0 rgba(117, 117, 117, 0.13);
}
.infoImg {
  width: 1.04rem;
  height: 1.04rem;
  border-radius: 50%;
  display: block;
  box-shadow: 1rem 1rem 1rem 1rem rgba(117, 117, 117, 0.1);
}
.username {
  font-size: 0.34rem;
  font-weight: normal;
  color: rgba(17, 17, 17, 0.8);
  line-height: 0.58rem;
}
.usertext {
  font-size: 0.28rem;
  font-weight: 200;
  color: rgba(60, 60, 60, 0.6);
}
.mine-wrap {
  /* margin-top: 0.4rem; */
  display: flex;
  justify-content: center;
}
.minepic {
  width: 4.14rem;
  height: 1.3rem;
}
.hasbuy {
  width: 90%;
  height: 1rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.08rem 0.38rem 0 rgba(117, 117, 117, 0.07);
  border-radius: 0.2rem;
  display: flex;
  margin: 0rem auto;
  margin-bottom: 0.2rem;
  align-items: center;
  position: relative;
}
.hasbuy::after {
  content: "";
  width: 0.12rem;
  height: 0.12rem;
  border-top: 0.04rem solid gainsboro;
  border-right: 0.04rem solid gainsboro;
  transform: rotate(45deg);
  position: absolute;
  right: 0.43rem;
}
.buyimg {
  margin-left: 0.48rem;
  width: 0.6rem;
  height: 0.5rem;
  margin-right: 0.26rem;
}
.buyimgs {
  margin-left: 0.48rem;
  width: 0.5rem;
  height: 0.55rem;
  margin-right: 0.38rem;
}
.buyimges {
  margin-left: 0.5rem;
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.23rem;
}
.buysimg {
  margin-left: 0.48rem;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.35rem;
}
.abuyimg {
  margin-left: 0.48rem;
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.33rem;
}
.jieshao {
  font-size: 0.3rem;
  color: rgba(17, 17, 17, 0.8);
  line-height: 0.3rem;
  font-weight: normal;
}
.collectpromotion {
  margin: 0 auto;
  margin-bottom: 0.2rem;
  width: 90%;
  height: 2.7rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.08rem 0.38rem 0 rgba(117, 117, 117, 0.07);
  border-radius: 0.2rem;
}
.collectpromotiondiv {
  display: flex;
  align-items: center;
  height: 33%;
  position: relative;
}
.collectpromotiondiv::after {
  content: "";
  width: 0.12rem;
  height: 0.12rem;
  border-top: 0.04rem solid gainsboro;
  border-right: 0.04rem solid gainsboro;
  transform: rotate(45deg);
  position: absolute;
  right: 0.43rem;
}
.minejieshaodiv {
  /* margin-top: 0.8rem; */
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.minejieshao {
  width: 3.28rem;
  height: 0.3rem;
}
</style>
<style>
</style>
