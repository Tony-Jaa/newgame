<template>
  <div class="first-home" style="width: 100%;height:100%;padding-bottom:1.16rem ">
    <!-- @scroll='lazyLoading' -->
    <div id="scroll" class="main">
      <div class="top">
        <img src="../../assets/images/firstHome/banner.png" alt />
        <img
          v-if="Math.floor($store.state.age/12)==0"
          class="ageimg"
          v-lazy="require('../../assets/images/firstHome/age-0.png')"
          alt
        />
        <img
          v-if="Math.floor($store.state.age/12)==1"
          class="ageimg"
          v-lazy="require('../../assets/images/firstHome/age-1.png')"
          alt
        />
        <img
          v-if="Math.floor($store.state.age/12)==2"
          class="ageimg"
          v-lazy="require('../../assets/images/firstHome/age-2.png')"
          alt
        />
        <img
          v-if="Math.floor($store.state.age/12)==3"
          class="ageimg"
          v-lazy="require('../../assets/images/firstHome/age-3.png')"
          alt
        />
        <img
          v-if="Math.floor($store.state.age/12)==4"
          class="ageimg"
          v-lazy="require('../../assets/images/firstHome/age-4.png')"
          alt
        />
        <img
          v-if="Math.floor($store.state.age/12)==5"
          class="ageimg"
          v-lazy="require('../../assets/images/firstHome/age-5.png')"
          alt
        />
        <img
          v-if="Math.floor($store.state.age/12)>=6"
          class="ageimg"
          v-lazy="require('../../assets/images/firstHome/age-6.png')"
          alt
        />
        <!-- <p>
          你家萌宝
          <span
            style="color:#FFD100;padding: 0 0.15rem;display: inline-block;font-size: 0.38rem;"
          >{{Math.floor($store.state.age/12) }}</span>岁了
        </p>
        <p>以下是为你定制的家庭教育方案</p>-->
      </div>

      <div
        class="item"
        v-for="(item, index) in $store.state.homeClassList"
        :class="[index==0?'child-style':'man-style']"
        :key="index"
        v-show="item.length>0 "
      >
        <img
          :class="[index==0?'':'display']"
          class="home-child"
          v-lazy="require('../../assets/images/firstHome/home-child.png')"
          alt
        />

        <div
          :class="[index==0?'child':'man']"
          v-for="(it,indexItem) in item"
          :key="it.id"
          @click="changeshowBig(index==0?indexItem:indexItem+$store.state.homeClassList[0].length,it,false,indexItem)"
        >
          <div
            class="show-big firstIndex"
            v-show="showBig==(index==0?indexItem:indexItem+$store.state.homeClassList[0].length)"
          >
            <div class="iosscroll">
              <img
                style="width:100%;height:3rem;display:block;border-radius: 0.2rem 0.2rem 0 0;"
                v-lazy="it.banner"
                alt
              />
            </div>
            <div class="show-detail">
              <div class="left">
                <div
                  class="show-title"
                  :class="[hasView.includes(index==0?indexItem:indexItem+$store.state.homeClassList[0].length)?'item-hasView':'']"
                >{{it.name}}</div>
                <div v-if="it.labelName" class="icon-all">
                  <div class="icon">{{it.labelName}}</div>
                </div>
                <div class="show-remark">{{it.remark}}</div>
              </div>
              <div class="right" :class="[it.chargingStandard==1?'right-nofree':'']">
                <div class="right-content" v-if="it.chargingStandard ==0">
                  <img v-lazy="require('../../assets/images/firstHome/play.png')" alt />
                  <p class="free-text">优选</p>
                </div>
                <div class="right-content" v-if="it.chargingStandard ==1">
                  <img v-lazy="require('../../assets/images/firstHome/play.png')" alt />
                  <p class="nofree-text">精品</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="show-list"
            v-show="showBig!=(index==0?indexItem:indexItem+$store.state.homeClassList[0].length)"
          >
            <div class="left">
              <img v-lazy="it.listImage" alt />
            </div>
            <div class="main-content">
              <div
                class="title"
                :class="[hasView.includes(index==0?indexItem:indexItem+$store.state.homeClassList[0].length)?'item-hasView':'']"
              >{{it.name}}</div>
              <div class="icon-all" style="margin-top:0.24rem">
                <div v-if="it.labelName" class="icon">{{it.labelName}}</div>
              </div>
            </div>
            <div
              @click="changeshowBig(index==0?indexItem:indexItem+$store.state.homeClassList[0].length,it,true)"
              class="right"
              :class="[it.chargingStandard==1?'right-nofree':'']"
            >
              <div class="right-content" v-if="it.chargingStandard ==0">
                <img
                  v-if="it.typeValue=='音频'"
                  v-lazy="require('../../assets/images/firstHome/free-audio.png')"
                  alt
                />
                <img
                  v-else-if="it.typeValue=='视频'"
                  v-lazy="require('../../assets/images/firstHome/free-video.png')"
                  alt
                />
                <img v-else v-lazy="require('../../assets/images/firstHome/play.png')" alt />
                <p class="free-text">优选</p>
              </div>
              <div class="right-content" v-if="it.chargingStandard ==1">
                <img
                  v-if="it.typeValue=='音频'"
                  v-lazy="require('../../assets/images/firstHome/pay-audio.png')"
                  alt
                />
                <img
                  v-else-if="it.typeValue=='视频'"
                  v-lazy="require('../../assets/images/firstHome/pay-video.png')"
                  alt
                />
                <img v-else v-lazy="require('../../assets/images/firstHome/no-free.png')" alt />
                <p class="nofree-text">精品</p>
              </div>
            </div>
          </div>
        </div>

        <!-- <img
          v-if="item.audienceType==1"
          class="home-child"
          v-lazy="require('../../assets/images/firstHome/home-child.png')"
          alt
        />-->
        <!-- 点击后显示的 -->
      </div>
    </div>
    <div style="height:.14rem;background:rgba(106,106,106,.1);margin:0.57rem 0 0.43rem 0"></div>
    <div v-show="$store.state.cepingShow">
      <Cyc v-if="$store.state.cepingInfo.typeName.length==0"></Cyc>
      <cePing v-else></cePing>
    </div>
    <notVipDialog v-if="notVipDialogShow" @closethis="hasMoney"></notVipDialog>
    <div style="height:2.06rem;background: rgb(250, 250, 250);"></div>
  </div>
</template>
<script>
import serviceApi from "../../service/Base/serviceConfig";
import notVipDialog from "../../components/notVipDialog";
import cePing from "./components/cePing";
import Cyc from "./components/Cyc";
export default {
  data() {
    return {
      showBig: 0,
      classList: [],
      loading: false,
      notVipDialogShow: false,
      notVipDialogHasShow: false,
      hasView: [],
      iosClick: false,
      iosscrollHeight: 0,
      homeClassListIndex: 0,
      homeChildHeight: 0
    };
  },
  components: {
    notVipDialog,
    cePing,
    Cyc
  },
  mounted() {
    this.$store.commit("overscroll", document.querySelector("#scroll"));
    // .overscroll(document.querySelector("#scroll"));
    // document.body.addEventListener("touchmove", function(evt) {
    //   if (!evt._isScroller) {
    //     evt.preventDefault();
    //   }
    // });
  },
  methods: {
    overscroll(el) {
      el.addEventListener("touchstart", function() {
        var top = el.scrollTop,
          totalScroll = el.scrollHeight,
          currentScroll = top + el.offsetHeight;
        if (top <= 5) {
          el.scrollTop = el.scrollTop + 1;
        } else if (currentScroll >= totalScroll - 5) {
          el.scrollTop = top - 1;
        }
      });
    },
    // 索引：index 用来记录显示哪一条记录最大化
    // info,当前资源的信息
    // todetail 是否点击小图标直接进入页面，不放大
    // indexItem 0为分类下的第一个
    changeshowBig(index, info, todetail, indexItem) {
      if (index != this.showBig && !todetail) {
        // var u = navigator.userAgent;
        // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //   if (this.iosscrollHeight == 0) {
        //     this.iosscrollHeight = document.getElementsByClassName(
        //       "iosscroll"
        //     )[0].offsetHeight;
        //     this.homeChildHeight =
        //       document.getElementsByClassName("home-child")[0].offsetHeight != 0
        //         ? document.getElementsByClassName("home-child")[0].offsetHeight
        //         : document.getElementsByClassName("home-child")[1].offsetHeight;
        //   }
        // // if (isiOS) {
        //   if (this.showBig < index) {
        //     document.getElementsByClassName("mian-wrap")[0].scrollTop =
        //       document.getElementsByClassName("show-big")[index].parentElement
        //         .offsetTop +
        //       document.getElementsByClassName("show-big")[index].parentElement
        //         .parentElement.offsetTop -
        //       this.iosscrollHeight - 10
        //       ;
        //   } else {
        //     document.getElementsByClassName("mian-wrap")[0].scrollTop =
        //       document.getElementsByClassName("show-big")[index].parentElement
        //         .offsetTop +
        //       document.getElementsByClassName("show-big")[index].parentElement
        //         .parentElement.offsetTop;
        //   }
        // // }
        // // if (!isiOS) {
        // //   document.getElementsByClassName("mian-wrap")[0].scrollTop =
        // //     document.getElementsByClassName("show-big")[index].parentElement
        // //       .offsetTop +
        // //     document.getElementsByClassName("show-big")[index].parentElement
        // //       .parentElement.offsetTop -
        // //     10;
        // // }
        // if (indexItem == 0) {
        //   document.getElementsByClassName("mian-wrap")[0].scrollTop =
        //     document.getElementsByClassName("mian-wrap")[0].scrollTop -
        //     this.homeChildHeight;
        // }
        this.showBig = index;
      } else {
        // 查看详情
        if (info.chargingStandard == 0) {
          if (info.typeValue == "视频") {
            this.$router.push({
              name: "courseDetails",
              params: {
                id: info.courseId,
                fromvip: false
              },
              query: {
                autoId: info.id
              }
            });
          } else if (info.typeValue == "音频") {
            this.$router.push({
              name: "courseDetails",
              params: {
                id: info.courseId,
                fromvip: false
              },
              query: {
                autoId: info.id
              }
            });
          } else if (info.typeValue == "图文") {
            this.$router.push({
              name: "pictextdetails",
              params: { id: info.id },
              query: { courseId: info.courseId }
            });
          }
        } else {
          // 付费
          sessionStorage.setItem(
            "Buyinfo",
            JSON.stringify({
              typeValue: info.typeValue,
              id: info.id,
              chargingStandard: info.chargingStandard
            })
          );
          if (info.typeValue == "视频") {
            sessionStorage.setItem(
              "toDetails",
              JSON.stringify({ name: "videodetails", id: info.id })
            );
          } else if (info.typeValue == "音频") {
            sessionStorage.setItem(
              "toDetails",
              JSON.stringify({ name: "audiodetails", id: info.id })
            );
          } else if (info.typeValue == "图文") {
            sessionStorage.setItem(
              "toDetails",
              JSON.stringify({ name: "pictextdetails", id: info.id })
            );
          } else {
          }
          if (
            this.notVipDialogHasShow == false &&
            this.$store.state.userInfo.vip == 0
          ) {
            this.notVipDialogHasShow = true;
            this.notVipDialogShow = true;
          } else {
            this.buyPay(info.typeValue, info.id, info.chargingStandard);
          }
          return;
        }
      }
    },
    /*付费购买*/
    buyPay(typeValue, resourceId, chargingStandard) {
      if (!this.$store.state.userInfo.id) {
        this.showfail = true;
        this.failtext = "请先关注微信公共号";
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
            // _this.resultMap.costPrice;
            _this.isBuyflag = true;
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
            _this.getRecommendResources();
            if (typeValue == "视频") {
              _this.$router.push({ name: "videodetails", params: { id: id } });
            } else if (typeValue == "音频") {
              _this.$router.push({ name: "audiodetails", params: { id: id } });
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
    // 弹窗有钱任性
    hasMoney(data) {
      if (data == false) {
        this.notVipDialogShow = false;
        let buyInfo = JSON.parse(sessionStorage.getItem("Buyinfo"));
        // buyInfo
        this.handleVideo(
          buyInfo.typeValue,
          buyInfo.id,
          buyInfo.chargingStandard
        );
      } else {
        this.notVipDialogShow = false;
      }
    },
    // 视频查看
    handleVideo(typeValue, id, chargingStandard) {
      let Buyinfo = sessionStorage.getItem("Buyinfo");
      let isvip = this.$store.state.userInfo.vip;
      if (chargingStandard == "1" && !Buyinfo && (isvip != 1 && isvip != "1")) {
        console.log("建议购买vip");
        if (typeValue == "视频") {
          sessionStorage.setItem(
            "toDetails",
            JSON.stringify({ name: "videodetails", id: id })
          );
        } else if (typeValue == "音频") {
          sessionStorage.setItem(
            "toDetails",
            JSON.stringify({ name: "audiodetails", id: id })
          );
        } else if (typeValue == "图文") {
          sessionStorage.setItem(
            "toDetails",
            JSON.stringify({ name: "pictextdetails", id: id })
          );
        } else {
        }
        // this.payshow = true;
        sessionStorage.setItem(
          "Buyinfo",
          JSON.stringify({ typeValue, id, chargingStandard })
        );
        this.notVipDialogShow = true;
        return false;
      }
      if (chargingStandard == "1") {
        if (typeValue == "视频") {
          sessionStorage.setItem(
            "toDetails",
            JSON.stringify({ name: "videodetails", id: id })
          );
        } else if (typeValue == "音频") {
          sessionStorage.setItem(
            "toDetails",
            JSON.stringify({ name: "audiodetails", id: id })
          );
        } else if (typeValue == "图文") {
          sessionStorage.setItem(
            "toDetails",
            JSON.stringify({ name: "pictextdetails", id: id })
          );
        } else {
        }
        this.buyPay(typeValue, id, chargingStandard);
        return;
      }
      if (typeValue == "视频") {
        this.$router.push({ name: "videodetails", params: { id: id } });
      } else if (typeValue == "音频") {
        this.$router.push({ name: "audiodetails", params: { id: id } });
      } else if (typeValue == "图文") {
        this.$router.push({ name: "pictextdetails", params: { id: id } });
      } else {
      }
    }
  }
};
</script>
<style scoped>
.firstIndex {
  box-shadow: 0 0.04rem 0.4rem 0 rgba(180, 180, 180, 0.18);
}
.first-home {
  font-size: 0.36rem;
  color: rgba(1, 1, 1, 1);
  /* flex-direction: column; */
}
.top {
  line-height: 1;
  text-align: center;
  margin: 0 -0.36rem -0.36rem;
  position: relative;
}
.top img {
  width: 100%;
  display: block;
}
.main {
  display: flex;
  flex-direction: column;
  padding: 0 0.36rem;
  /* overflow: scroll; */
  /* -webkit-overflow-scrolling: touch; */
}
.main::-webkit-scrollbar {
  display: none;
}
.top .ageimg {
  width: 0.52rem;
  position: absolute;
  left: 3.92rem;
  top: 0.52rem;
}

.item > .child {
  margin-top: 0.28rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0.07rem 0.4rem 0 rgba(180, 180, 180, 0.17);
  border-radius: 0.2rem;
  position: relative;
}
.item > .man {
  margin-top: 0.28rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0.07rem 0.4rem 0 rgba(180, 180, 180, 0.17);
  /* border-radius: 0.2rem; */
  border-radius: 0.3rem .2rem .2rem .2rem;
  position: relative;
}
.item > .child:first-of-type,
.item > .man:first-of-type {
  margin-top: 0;
}
.item-hasView {
  color: #bbbbbb !important;
}
.show-detail {
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
}
.show-big {
  border-radius: 0.16rem;
}
.show-detail > .left {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 0.25rem;
}
.show-detail .show-title {
  width: 5rem;
  font-size: 0.28rem;
  color: rgba(23, 23, 23, 0.9);
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.1rem 0;
}
.icon-all {
  display: flex;
}
.icon {
  /* width: 1.19rem; */
  height: 0.34rem;
  background: rgba(29, 169, 255, 0.15);
  border-radius: 0.06rem;
  font-size: 0.21rem;
  font-weight: 500;
  color: rgba(29, 169, 255, 1);
  /* text-align: center; */
  line-height: 0.34rem;
  margin-right: 0.2rem;
  padding: 0 .1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.show-detail .show-remark {
  width: 5rem;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(122, 122, 122, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.1rem 0;
}
.right {
  width: 1.25rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.right::before {
  content: "";
  width: 0.03rem;
  height: 1.15rem;
  background: linear-gradient(#fff, rgba(255, 209, 0, 0.5), #fff);
  position: absolute;
  left: 0;
}
.right-nofree::before {
  background: linear-gradient(#fff, rgba(254, 183, 173, 1), #fff);
}
.right .right-content > img {
  width: 0.73rem;
  display: block;
}
.right .right-content > .free-text {
  margin-top: 0.13rem;
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(255, 209, 0, 1);
  text-align: center;
}
.right .right-content > .nofree-text {
  font-size: 0.22rem;
  font-weight: 500;
  margin-top: 0.25rem;
  color: rgba(254, 183, 173, 1);
  text-align: center;
}
.show-list {
  height: 1.33rem;
  display: flex;
  justify-content: space-between;
  /* background: yellow; */
}
.show-list .left {
  margin-left: -0.01rem;
  width: 1.43rem;
  height: 1.33rem;
  border-radius: 0.36rem;
  /* background: #fff; */
}
.show-list .left img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 0.21rem;
}
.show-list .main-content {
  flex-grow: 1;
  padding: 0.06rem 0rem 0 0.2rem;
}
.show-list .main-content .title {
  width: 3rem;
  font-size: 0.28rem;
  font-weight: bold;
  color: rgba(23, 23, 23, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1;
  padding: 0.1rem 0;
}
.show-list .right .right-content img {
  width: 0.42rem;
  /* height: 0.46rem; */
}
.show-list .right .right-content .nofree-text {
  font-size: 0.22rem;
  font-weight: 500;
  margin-top: 0.25rem;
  color: rgba(254, 183, 173, 1);
}
.child-style {
  box-sizing: content-box;
  border: 0.11rem solid rgba(255, 209, 0, 1);
  border-radius: 0.36rem 0.37rem 0.3rem 0.3rem;
  margin-top: 1rem;
  position: relative;
  background: rgba(255, 247, 209, 1);
  /* background: red; */
}
.man-style {
  box-sizing: content-box;
  border: 0.11rem solid rgba(80, 187, 255, 1);
  border-radius: 0.30rem;
  margin-top: .9rem;
  position: relative;
  background: rgba(212, 238, 255, 1);
  /* background: red; */
}
.child-style::before {
  content: "宝宝课堂";
  display: block;
  position: absolute;
  left: -0.11rem;
  top: -0.69rem;
  width: 2.08rem;
  height: 0.68rem;
  background: rgba(255, 209, 0, 1);
  color: #fff;
  text-align: center;
  line-height: 0.7rem;
  border-radius: 0.33rem 0.33rem 0 0;
  font-size: 0.32rem;
}
.child-style::after {
  content: "";
  display: block;
  width: 0.12rem;
  height: 0.22rem;
  background: rgba(255, 209, 0, 1);
  position: absolute;
  left: -0.11rem;
  top: -0.02rem;
}
.man-style::before {
  content: "家长课堂";
  display: block;
  position: absolute;
  left: -0.11rem;
  top: -0.68rem;
  width: 2.08rem;
  height: 0.68rem;
  background: rgba(80, 187, 255, 1);
  color: #fff;
  text-align: center;
  line-height: 0.68rem;
  border-radius: 0.2rem 0.2rem 0 0;
  font-size: 0.32rem;
}
.man-style::after {
  content: "";
  display: block;
  width: 0.1rem;
  height: 0.2rem;
  background: rgba(80, 187, 255, 1);
  position: absolute;
  left: -0.11rem;
  top: 0;
}
.home-child {
  width: 1.73rem;
  height: 0.8rem;
  position: absolute;
  top: -0.8rem;
  right: -0.11rem;
}
.display {
 opacity: 0;
}
</style>