<template>
  <div class="main" v-show="loading">
    <div class="item">
      <div class="flex-between">
        <div class="title-left">
          <img :src="image" style="border-radius:50%;width:0.98rem;height:0.98rem" alt />
          <div class="status">
            <p class="name">{{info.nickName}}</p>
            <p class="status-name" v-if="info.level == 1">198初级合伙人</p>
            <p class="status-name" v-if="info.level == 2">998高级合伙人</p>
            <p class="status-name" v-if="info.level == 3">9980高级合伙人&nbsp;(股份)</p>
          </div>
        </div>
        <div class="title-right">
          <div
            v-if="info.level != 3 &&info.applyStatus==1"
            @click="tomemberUp"
            class="title-right-up color-yellow"
          >升级</div>
          <div
            v-if="info.level != 3 &&info.applyType==1&&info.applyStatus==0"
            class="title-right-up color-yellow"
          >升级审核中</div>
          <div>
            <a href="javascript:;" @click="torule" class="color-blue">推广规则</a>
          </div>
        </div>
      </div>
    </div>

    <div class="item bg-white" style="padding:0.26rem 0.34rem 0.32rem 0.32rem;margin-top:0.26rem">
      <p class="title-item">我的收益</p>
      <div class="state-show">
        <div class="state-show-items">
          <div class="state-show-item">
            <p class="show-item-1">累计佣金&emsp;(元)</p>
            <p class="show-item-2">{{info.totalMoney}}</p>
          </div>
          <div class="state-show-item" style="position: relative;left: -0.16rem;">
            <p class="show-item-1">可提取佣金&emsp;(元)</p>
            <p class="show-item-2">{{info.usableMoney}}</p>
          </div>
        </div>
        <div class="state-show-items" style="border:0">
          <div class="state-show-item">
            <p class="show-item-1">累计招募VIP&emsp;(人)</p>
            <p class="show-item-2">{{info.vipNumber}}</p>
          </div>
          <div class="state-show-item">
            <p class="show-item-1">VIP推荐用户&emsp;(人)</p>
            <p class="show-item-2">{{info.vipNumber}}</p>
          </div>
        </div>
        <p class="title-item" style="margin-top: 0.16rem;margin-bottom: 0.2rem;">任务完成进度</p>
        <div class="flex-between">
          <p v-if="info.level == 1">
            任务:&nbsp;招募
            <span class="color-blue">{{speednum}}</span>个VIP
          </p>
          <p v-if="info.level == 2 || info.level == 3">
            任务:&nbsp;发展
            <span class="color-blue">{{speednum}}</span>个合伙人
          </p>
          <p v-if="percent!=100">
            已完成:&nbsp;
            <span v-if="info.level==1" class="color-blue">{{info.vipNumber}}</span>
            <span v-if="info.level==2|| info.level==3" class="color-blue">{{info.downNumber}}</span>
            /{{speednum}}
          </p>
          <p v-if="percent==100">已完成任务</p>
        </div>
        <!-- <box gap="10px">
          <x-progress class="show-progress" :percent="percent" :show-cancel="false"></x-progress>
        </box>-->
        <process :percentage='percent' />
        <div v-if="percent==100" style="padding:0 0.26rem;position:relative">
          <img
            src="../../../assets/images/100-success.png"
            style="position:relative;z-index:2"
            width="100%"
            alt
          />
          <p class="task-over-text" style="z-index:3">恭喜您完成任务</p>
          <div v-if="info.level!=3" class="task-over-main">您还可以点击右上角"升级"按钮进行身份升级，赚取更多奖励金和佣金</div>
        </div>
        <div
          v-show="show"
          v-if="info.level != 1"
          style="background-color:rgba(97,195,255,1);"
          @click="goshare"
          class="torecruit"
        >招募初级合伙人</div>
        <div @click="gorecruit" style="margin-top:3.4vw" class="torecruit color-yellow">招募VIP</div>
      </div>
    </div>
    <div class="btn-bottom">
      <div class="btn-bottom-text">
        <p>
          完成任务可获取奖励金:
          <span class="color-blue">￥{{returnmomey}}</span>
        </p>
        <a
          href="javascript:;"
          @click="towithdrawRecord"
          style="color:rgba(255,117,91,1);text-decoration:underline;"
        >提取记录</a>
      </div>
      <div class="btn-bottom-row">
        <div
          v-if="info.outCashStatus ==0 || info.outCashStatus ==3"
          style="font-size:14px;background:rgba(0,0,0,.4);"
          @click="toaward"
          class="btn-bottom-btn color-blue"
        >
          <div style="line-height: 0.32rem;">
            <p style="width:100%">奖励发放中</p>
            <p>请耐心等待</p>
          </div>
        </div>
        <div
          v-else-if="info.outCashStatus == 1"
          style="font-size:0.34rem;background:rgba(0,0,0,.4);"
          class="btn-bottom-btn color-blue"
        >奖励金已发放</div>
        <div v-else @click="toaward" class="btn-bottom-btn color-blue">奖励金提取</div>

        <div
          @click="toyongjin"
          class="btn-bottom-btn"
          style="background-color:rgba(255,117,91,1)"
        >佣金提取</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import process from './components/process'
import serviceApi from "../../../service/AExtension/serviceConfig";
export default {
  name: "promotioncenter",
  data() {
    return {
      loading: false,
      percent: 0,
      showsucess: false,
      showfail: false,
      userId: "",
      nickname: "",
      info: {
        vipRate: "",
        level: "",
        nickName: "",
        totalMoney: 0,
        usableMoney: 0,
        vipNumber: 0,
        downNumber: 0,
        downRate: "",
        userId: "",
        applyType: 1,
        applyStatus: 1
      },
      awardflag: false,
      speednum: 15,
      returnmomey: 298.5,
      failtext: "",
      image: "",
      rewardtext: "奖励金提现",
      rewardsuc: false,
      show: false,
      percentOverShow: false,
      processColor:'rgba(97, 195, 255, 1)'
    };
  },
  components: {
    process
  },
  mounted: function() {
    document.title = "推广中心";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.nickname = userWechatInfo ? JSON.parse(userWechatInfo).nickName : "";
    this.image = userWechatInfo ? JSON.parse(userWechatInfo).image : "";
    this.getPromoterBasicInfo();
    this.info.userId = this.userId;
  },
  methods: {
    // 跳转到测评
    handleEvaluation: function() {
      wx.miniProgram.navigateTo({ url: "/pages/evaluation/evaluation" });
    },
    torule: function() {
      this.$router.push({ name: "promotionrule" });
    },
    toaward: function() {
      this.$router.push({ name: "withdrawcenter" });

      // if (this.awardflag) {
      //   const type = this.info.level;
      //   this.$router.push({ name: "rewardcash", query: { type: type } });
      // }
    },
    towithdrawRecord: function() {
      const type = this.info.level;
      this.$router.push({ name: "withdrawRecord", query: { type: type } });
    },
    toyongjin: function() {
      this.$router.push({ name: "commissionwithdraw" });
    },
    tohasbuy: function() {
      this.$router.push({ name: "hasbuy" });
    },
    tocollection: function() {
      this.$router.push({ name: "collection" });
    },
    gorecruit: function() {
      this.$router.push({ name: "share" });
    },
    goshare: function() {
      // this.$router.push({ name: "joinus" });
      location.href = `${location.origin}/#/joinus`;
    },
    promoteradd: function() {
      if (!this.userId) {
        this.showfail = true;
        this.$toast("请先关注微信公共号")
        // this.failtext = "请先关注微信公共号";
        return false;
      }
      const _this = this;
      const url = `${serviceApi.promoteradd}` + "?userId=" + _this.userId;
      this.$http({
        method: "post",
        url: url,
        data: _this.userinfor
        // timeout: 1000
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.showsucess = true;
            _this.getUserInfo();
          } else {
            _this.showfail = true;
          }
        })
        .catch(err => {
          console.log(err);
          _this.showfail = true;
        _this.$toast("服务器失败")
          // _this.failtext = "服务器失败";
        });
    },
    tomemberUp() {
      this.$router.push({
        name: "memberUp",
        query: { level: this.info.level }
      });
    },
    getspeed: function() {
      if (this.info.level == 1) {
        this.percent = ((this.info.vipNumber / this.speednum) * 100).toFixed(2);
      } else if (this.info.level == 2 || this.info.level == 3) {
        this.percent = ((this.info.downNumber / this.speednum) * 100).toFixed(2) ;
      }
      // this.percent=100
    },
    getPromoterBasicInfo: function() {
      if (!this.userId) {
        this.$toast("请先关注微信公共号")
        return false;
      }
      const _this = this;
      const url =
        `${serviceApi.getPromoterBasicInfo}` + "?userId=" + _this.userId;
      this.$http({
        method: "get",
        url: url
        // timeout: 1000
      })
        .then((response)=> {
          if (response.data.status == "00") {
            _this.info = response.data.resultMap;
            _this.show = true;
            _this.loading = true;
            _this.getRuleList(response.data.resultMap.level);
            if (
              response.data.resultMap.outCashStatus == 0 ||
              response.data.resultMap.outCashStatus == 3
            ) {
              _this.rewardsuc = true;
              _this.awardflag = false;
            } else if (response.data.resultMap.outCashStatus == 1) {
              _this.awardflag = false;
            } else if (response.data.resultMap.outCashStatus == 2) {
              _this.awardflag = true;
            } else {
            }
          } else {
          }
        })
        .catch(err => {
          console.log(err)
          _this.$toast("网络失败") ;
        });
    },
    getRuleList(level) {
      let _this = this;
      this.$http.post(serviceApi.getList).then(res => {
        if (res && res.data && res.data.data) {
          if (level != 1) {
            _this.speednum = res.data.data[level - 1].downMax;
          } else {
            _this.speednum = res.data.data[level - 1].vipMax;
          }
          _this.getspeed();
          if (level == 2) {
            _this.returnmomey = 1584.0;
          } else if (level == 3) {
            _this.returnmomey = 15840;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  /* height: 100%; */
  background-color: #fafafa;
  padding-top: 0.36rem;
  margin-bottom: 1.78rem;
  /* padding-bottom: 1.78rem; */
  /* margin-bottom: 1.78rem;
     box-sizing: content-box; */
}
.item {
  width: 90.4vw;
  margin: 0 auto;
  position: relative;
  border-radius: 0.3rem;
}
.bg-white {
  background-color: #fff;
  box-shadow: 0rem 0.04rem 0.28rem 0rem rgba(70, 70, 70, 0.08);
}
.flex-between {
  display: flex;
  justify-content: space-between;
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(11, 11, 11, 1);
  margin-bottom: 0.23rem;
}
.title-left {
  display: flex;
}
.status {
  margin-left: 4.2vw;
}
.status > .name {
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(11, 11, 11, 1);
  margin-top: 0.06rem;
}
.status > .status-name {
  height: 4.6vw;
  border: 1px solid rgba(232, 71, 41, 0.3);
  border-radius: 0.06rem;
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(232, 71, 41, 1);
  text-align: center;
  line-height: 4.6vw;
  padding: 0 0.1rem;
}
.title-right {
  text-align: center;
}
.title-right-up {
  width: 1.42rem;
  height: 0.58rem;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 0.58rem;
  font-size: 0.28rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  position: relative;
  top: -0.08rem;
}
.color-yellow {
  background: rgba(255, 208, 0, 1);
}
.color-blue {
  color: rgba(97, 195, 255, 1);
}
a.color-blue {
  font-size: 0.28rem;
  font-weight: 500;
  text-decoration: underline;
  color: rgba(97, 195, 255, 1);
  position: relative;
  top: 0.08rem;
}
.title-item {
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(11, 11, 11, 1);
}
.state-show-items {
  display: flex;
  justify-content: space-between;
  border-bottom: 0.02rem solid rgba(89, 87, 87, 0.15);
  padding-bottom: 0.24rem;
  padding-top: 0.18rem;
}
.show-item-1 {
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(11, 11, 11, 0.6);
}
.show-item-2 {
  font-size: 0.28rem;
  font-weight: 600;
  color: rgba(11, 11, 11, 1);
}
.torecruit {
  width: 100%;
  height: 10.4vw;
  line-height: 10.4vw;
  border-radius: 0.4rem;
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  font-weight: bold;
  margin-top: 7.46vw;
}
.btn-bottom {
  position: fixed;
  bottom: 0;
  height: 17.33vw;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem -0.04rem 0.28rem 0rem rgba(70, 70, 70, 0.06);
}
.btn-bottom > .btn-bottom-text {
  position: absolute;
  top: -0.6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 0.38rem 0 0.34rem;
  font-size: 0.28rem;
  font-weight: 500;
}
.btn-bottom-row {
  display: flex;
  padding: 0.22rem 0.36rem;
  justify-content: space-between;
}
.btn-bottom-btn {
  width: 43.46vw;
  height: 11.73vw;
  border-radius: 0.18rem;
  font-size: 0.34rem;
  text-align: center;
  color: #fff;
  background-color: rgba(97, 195, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.weui-progress__inner-bar {
  background-color: red !important;
  border-radius: 0.16rem;
}
.task-over-text {
  position: absolute;
  text-align: center;
  width: 100%;
  top: 0.24rem;
  left: 0;
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(83, 68, 0, 1);
  line-height: 0.3rem;
}
.task-over-main {
  border: 2px solid #ffe366;
  position: relative;
  top: -9.46vw;
  width: 63.2vw;
  margin: 0 auto;
  margin-bottom: -8.8vw;
  padding: 7.33vw 3.46vw 5.33vw 2.4vw;
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(19, 19, 19, 1);
  text-indent: 2em;
  background-color: #fffbec;
  border-radius: 0.3rem;
}
</style>