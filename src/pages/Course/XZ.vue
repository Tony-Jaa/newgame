<template>
  <div class="conunst" @touchmove="conunstTouch" @touchend="conunstTouchEnd">
    <div class="picture" @touchend.stop>
      <img :src="banner" alt />
    </div>
    <div class="navBra" :class="searchBarFixed == true ? 'isFixed' :''" ref="navBars">
      <div class="xzBar" @touchend.stop>
        <div class="h4"></div>
        <h4 class="h44">{{doctitle}}</h4>
      </div>
      <div class="TarBra" @touchend.stop ref="xzNavv0">
        <p class="TarBra_p" :class="[isActive=='0'?'active':'']" @click.stop="enterCheck(0)">
          课程优选
          <img v-show="isActive==0" src="../../assets/asd/004.png" alt />
        </p>
        <p class="TarBra_p" style="text-align:center" :class="[isActive=='1'?'active':'']" @click="enterCheck(1)">
          VIP专享
          <img v-show="isActive==1" src="../../assets/asd/004.png" alt />
        </p>
        <p class="TarBra_p" style="text-align:right" :class="[isActive=='2'?'active':'']" @click="enterCheck(2)">
          精品课程
          <img v-show="isActive==2" src="../../assets/asd/004.png" alt />
        </p>
      </div>
    </div>
    <div v-show="searchBarFixed" :style="{height:offheight}"></div>

    <!-- 优选课程---------------------------------------------->
    <div class="xz-nav1" ref="xzNav0" style="padding-top:0.25rem">
      <h4 class="xz-nav-h4">优选课程，快来体验~</h4>
      <p class="xz-nav-p">
        <span class="xz-nav-span" @touchend.stop @click="clickMore(2)">更多</span>
        <img class="xz-nav-img" src="../../assets/asd/003.png" alt />
      </p>
    </div>
    <div
      class="xz-main"
      v-for="(frees,index) in freeData"
      :key="frees.id"
      :class="[index==0?'child-style':'man-style']"
      v-show="frees.length>0"
    >
      <img
        :class="[index==0?'':'display']"
        class="home-child"
        src="../../assets/images/firstHome/home-child.png"
        alt
      />
      <div
        v-for="free in frees"
        :key="free.id"
        @click="godetail(free.id,free.listImage)"
        :class="[index==0?'child':'man']"
      >
        <div class="main-left">
          <img :src="free.listImage" alt />
        </div>
        <div class="main-right">
          <p class="main-right-p0">{{free.title}}</p>
          <p class="main-right-p1">{{free.describes}}</p>
          <div class="main-right-div0">
            <span :class="[free.label?'':'opc0']" class="main-left-span"
            v-for="(ele,index) in free.label" :key="index"
            >{{ele}}</span>
          </div>
          <div class="main-right-div1">
            <span class="span1">优选课程</span>
            <span class="span2">开始上课</span>
          </div>
        </div>
      </div>
    </div>

    <!-- vip专享---------------------------------------------->
    <div class="xz-nav1" ref="xzNav1">
      <h4 class="xz-nav-h4">VIP专享课程，1分钱获取VIP</h4>
      <p class="xz-nav-p">
        <span class="xz-nav-span" @click="clickMore(3)">更多</span>
        <img class="xz-nav-img" src="../../assets/asd/003.png" alt />
      </p>
    </div>
    <div
      class="xz-main"
      v-for="(values,index) in vipData"
      :key="values.id"
      :class="[index==0?'child-style':'man-style']"
      v-show="values.length>0"
    >
      <img
        :class="[index==0?'':'display']"
        class="home-child"
        src="../../assets/images/firstHome/home-child.png"
        alt
      />
      <div
        v-for="value in values"
        :key="value.id"
        :class="[index==0?'child':'man']"
        @click="godetail(value.id,value.listImage)"
      >
        <div class="main-left">
          <img :src="value.listImage" alt />
        </div>
        <div class="main-right">
          <p class="main-right-p0">{{value.title}}</p>
          <p class="main-right-p1">{{value.describes}}</p>
          <p class="main-right-div0">
            <span class="main-left-span" v-show="value.label" v-for="(ele,index) in value.label" :key="index">{{ele}}</span>
          </p>
          <div class="main-right-div1">
            <div>
              <span v-if="value.costPrice" class="right-div1-span0">{{value.costPrice}}元</span>
              <span class="right-div1-span1">VIP专享</span>
            </div>
            <span class="right-div1-span2">
              <img src="../../assets/img/bof.png" alt />
              试听
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 精品课程，VIP优惠购---------------------------------------------->
    <div class="xz-nav1" ref="xzNav2">
      <h4 class="xz-nav-h4">精品课程，VIP优惠购</h4>
      <p class="xz-nav-p">
        <span class="xz-nav-span" @click.stop="clickMore(1)">更多</span>
        <img class="xz-nav-img" src="../../assets/asd/003.png" alt />
      </p>
    </div>
    <div
      class="xz-main"
      :class="[index==0?'child-style':'man-style']"
      v-for="(items,index) in chargedData"
      :key="index"
      v-show="items.length>0"
    >
      <img
        :class="[index==0?'':'display']"
        class="home-child"
        src="../../assets/images/firstHome/home-child.png"
        alt
      />
      <div
        :class="[index==0?'child':'man']"
        @click="godetail(it.id,it.listImage)"
        v-for="it in items"
        :key="it.id"
      >
        <div class="main-left">
          <img :src="it.listImage" alt />
        </div>
        <div class="main-right">
          <p class="main-right-p0">{{it.title}}</p>
          <!--   -->
          <p class="main-right-p1">{{it.describes}}</p>
          <div class="main-right-div9">
            <p class="main-left-spans" v-show="it.label" v-for="(ele,index) in it.label" :key="index">{{ele}}</p>
          </div>
          <div class="main-right-divs1">
            <span class="right-div1-span0">{{it.costPrice}}元</span>
            <span class="right-div1-span3" v-if="it.costPrice">
              <img class="right-div1-span2-img" src="../../assets/img/ghvwef.png" alt />
              会员{{Number(it.costPrice * 0.85).toFixed(2)}}元
            </span>
            <span class="right-div1-span2">
              <img src="../../assets/img/bof.png" alt />
              试听
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serviceApi from "../../service/Course/serviceConfig";

export default {
  data() {
    return {
      doctitle: "",
      banner: "",
      isActive: 0,
      chargedData: [[], []],
      freeData: [[], []],
      vipData: [[], []],
      searchBarFixed: false,
      offheight: 0
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //进入详情页--------------------------------------
    godetail(id, listImage) {
      // this.$router.push({
      //   name: "courseDetails",
      //   params: { id: id, listImage: listImage }
      // });
      if (navigator.userAgent.indexOf("iPhone") !== -1) {
        window.wechaturl = window.location + "";
      }
      // this.$router.push({
      //   name: "courseDetails",
      //   params: { id: id }
      // });
      this.$router.push({
        name: "courseDetails",
        params: { id: id, fromvip: false }
      });
      // location.href = `${location.origin}/#/courseDetails/${id}/false`;
    },

    //获取课程数据-------------------
    fetchData() {
      this.$http
        .get(serviceApi.listcourse, {
          params: {
            type: "MAINPAGE",
            collegeId: this.$route.query.id
          }
        })
        .then(res => {
          if (res.data.status == "00") {
            // 精品课程---------------------------------------------------------
            let charge = res.data.resultMap.charge;
             charge.map(ele=>{
                let label = [];
                if(ele.label){
                  label = ele.label.split(",")
                  ele.label = label
                }
              });


            for (let i = 0; i < charge.length; i++) {
              const ele = charge[i];
              if (ele.audienceType == 1) {
                this.chargedData[0].push(ele);
              } else if (ele.audienceType == 2) {
                this.chargedData[1].push(ele);
              }
            }
            // this.chargedData.push(res.data.resultMap.charge.slice(0, manindex));
            // this.chargedData.push(res.data.resultMap.charge.slice(manindex));
            // console.log(this.chargedData)
            // 课程优选----------------------------------

            let free = res.data.resultMap.free;
             free.map(ele=>{
                let label = [];
                if(ele.label){
                  label = ele.label.split(",")
                  ele.label = label
                }
              });

            for (let i = 0; i < free.length; i++) {
              const ele = free[i];

              if (ele.audienceType == 1) {
                this.freeData[0].push(ele);
              } else if (ele.audienceType == 2) {
                this.freeData[1].push(ele);
              }
            }
            // this.freeData.push(res.data.resultMap.free.slice(arr));
            console.log(this.freeData);

            // vip专享----------------------------------
            let vip = res.data.resultMap.vip;
             vip.map(ele=>{
                let label = [];
                if(ele.label){
                  label = ele.label.split(",")
                  ele.label = label
                }
              });
            for (let i = 0; i < vip.length; i++) {
              const ele = vip[i];
              if (ele.audienceType == 1) {
                this.vipData[0].push(ele);
              } else if (ele.audienceType == 2) {
                this.vipData[1].push(ele);
              }
            }
          }
        });
    },

    handleShare() {
      let wechaturl = window.location.href.split("#")[0];
      const _this = this;
      // if (window.wechaturl !== undefined) {
      //   wechaturl = window.wechaturl;
      // }
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
              success: function(res) {}
            });
            wx.updateTimelineShareData({
              // 分享到朋友圈及分享到QQ
              title: document.title, // 分享标题
              desc: `${_this.$route.query.title}`,
              link: `${location.origin}/?/#/XZ?id=${_this.$route.query.id}&banner=${_this.$route.query.banner}&title=${_this.$route.query.title}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              desc: `${_this.$route.query.name}`, // 分享描述
              // link:window.location.href,
              link: `${location.origin}/?/#/XZ?id=${_this.$route.query.id}&banner=${_this.$route.query.banner}&title=${_this.$route.query.title}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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

    enterCheck(index) {
      this.isActive = index;

      let offsetTop = this.$refs.navBars.offsetTop;
      this.offsetTop = this.searchBarFixed = true;

      var xzNavTop;
      let height = this.$refs.xzNav0.offsetTop - 135;
      if (index == 0) {
        xzNavTop = this.$refs.xzNav0.offsetTop - 5;
      } else if (index == 1) {
        xzNavTop = this.$refs.xzNav1.offsetTop - 10;
      } else if (index == 2) {
        xzNavTop = this.$refs.xzNav2.offsetTop - 10;
      }
      let toTop = xzNavTop - height;
      document.getElementById("app").scrollTo(0, toTop);
    },
    clickMore(type) {
      // 跳转更多页面
      // alert(this.$route.query.id)
      this.$router.push({
        name: "More2",
        params: {
          id: this.$route.query.id,
          type,
          collegeId: this.$route.query.id
        }
      });
    },

    //滚动、高度---------------------------------------------------
    conunstTouch() {
      this.offheight = this.$refs.navBars.offsetHeight + "px";
      let appScroll = document.getElementById("app").scrollTop;
      // console.log(appScroll);
      let offsetTop = this.$refs.navBars.offsetTop;
      let offsetHeight = this.$refs.navBars.offsetHeight;
      // console.log(appScroll)
      if (appScroll > 135) {
        this.searchBarFixed = true;
      } else if (appScroll <= 135) {
        this.searchBarFixed = false;
      }

      let xzNavTop1 = this.$refs.xzNav0.offsetTop;
      let xzNavTop2 = this.$refs.xzNav1.offsetTop;
      let xzNavTop3 = this.$refs.xzNav2.offsetTop;
      let heightCha = xzNavTop1 - 120;
      if (appScroll + heightCha >= 0 && appScroll + heightCha <= xzNavTop2) {
        this.isActive = 0;
      } else if (
        appScroll + heightCha > xzNavTop2 &&
        appScroll + heightCha <= xzNavTop3
      ) {
        this.isActive = 1;
      } else {
        this.isActive = 2;
      }
    },

    conunstTouchEnd() {
      this.offheight = this.$refs.navBars.offsetHeight + "px";
      const that = this;
      let timeStart = 0;
      let set = setInterval(() => {
        timeStart++;
        if (timeStart >= 10) {
          window.clearInterval(set);
        }
        that.conunstTouch();
      }, 100);
    }
  },
  mounted: function() {
    this.handleShare();
    this.doctitle = this.$route.query.title;
    document.title = this.doctitle;
    this.banner = this.$route.query.banner;
    const that = this;
    window.removeEventListener("scroll", this.conunstTouch);
    window.addEventListener("scroll", this.conunstTouch(), true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.conunstTouch);
  }
};
</script>

<style lang="less" scoped>
.conunst {
  font-size: 0.3rem;
  -webkit-overflow-scrolling: touch; //IOS端解决滑动问题；
  overflow: auto;

  .picture {
    margin: 0rem 0.3rem;
    padding-top: 0.24rem;
    background: rgb(250, 250, 250);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .xzBar {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    padding-left: 0.3rem;
    background: rgb(250, 250, 250);

    z-index: 1;
  }
  .h4 {
    width: 0.1rem;
    height: 0.4rem;
    background: rgba(255, 209, 0, 1);
    border-radius: 0.05rem;
  }
  .h44 {
    padding-left: 0.1rem;
    font-size: 0.36rem;
    color: #000;
  }
  .TarBra {
    width: 7.4rem;
    height: 0.81rem;
    display: flex;
    padding: 0 0.3rem;
    background: rgb(250, 250, 250);
    border-bottom: 0.02rem solid rgba(117, 117, 117, 0.1);
    z-index: 1;
    align-items: center;
    justify-content: space-around;
    // text-align: center;
  }
  .TarBra_p {
    width: 2rem;
    // color: rgba(80, 80, 80, 0.8);
    color: rgba(17, 17, 17, 0.9);
    font-size: 0.28rem;
    position: relative;
    transition: all 0.2s linear;

    img {
      position: absolute;
      top: 0.48rem;
      left: 0.5rem;
    }
  }

  .active {
    color: #ffd100;
    font-size: 0.32rem;
    font-weight: 800;
  }
  .xz-nav1 {
    padding: 0.15rem 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .xz-nav-h4 {
    font-size: 0.32rem;
    // color: #666;
    color: rgba(17, 17, 17, 0.9);
  }
  .xz-nav-span {
    color: #ffd100;
    font-size: 0.32rem;
  }
  .xz-nav-img {
    margin-left: 0.08rem;
    width: 0.2rem;
    color: #ffd100;
    border-radius: 0.1rem;
  }
  .xz-nav-p {
    display: flex;
    align-items: center;
  }
  .main-left {
    margin-left: -0.08rem;
    width: 2.16rem;
    height: 2.02rem;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      border-radius: 0.3rem;
    }
  }
  .xz-main {
    width: 6.78rem;
    margin: auto;
  }
  .child {
    display: flex;
    margin-top: 0.3rem;
    justify-content: space-around;
    align-items: center;
    // margin: 0.25rem 0.4rem;
    background: #fff;
    border-radius: 0.35rem;
    position: relative;
  }
  .child:first-of-type,
  .man:first-of-type {
    margin-top: -0.01rem;
  }
  .man {
    // width: 6.78rem;
    // height: 2.02rem;
    display: flex;
    margin-top: 0.3rem;
    justify-content: space-around;
    align-items: center;
    // margin: 0.25rem 0.4rem;
    background: #fff;
    border-radius: 0.4rem 0.28rem 0.28rem 0.28rem;
    position: relative;
  }
  // .main_img{
  //   position: absolute;
  //   width: 1.93rem;
  //   height: .8rem;
  //   top: -.85rem;
  //   right: 0rem;
  // }
  .main-right {
    width: 65%;
    padding-left: 2%;
  }
  .main-right-p0 {
    font-size: 0.32rem;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.9);
  }
  .main-right-p1 {
    height: 0.35rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.24rem;
    color: rgba(166, 166, 166, 1);
  }
  .main-left-span {
    height: 0.3rem;
    font-size: 0.22rem;
    background: rgba(29, 169, 255, 0.2);
    padding: 0.02rem 0.14rem;
    border-radius: 0.05rem;
    color: rgba(29, 169, 255, 1);
    margin-right: 0.1rem;
  }
  .main-left-spans {
    height: 0.3rem;
    font-size: 0.22rem;
    background: rgba(29, 169, 255, 0.2);
    padding: 0.02rem 0.1rem;
    border-radius: 0.05rem;
    color: rgba(29, 169, 255, 1);
    display: flex;
    align-items: center;
    margin-right: 0.1rem;
  }
  .main-right-div9 {
    display: flex;
    align-items: center;
    height: 0.4rem;
  }
  .main-right-div1 {
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.25rem;
    position: relative;
    margin-top: 0.1rem;
    .span1 {
      font-size: 0.24rem;
      color: rgba(233, 72, 41, 1);
    }
    .span2 {
      width: 1.5rem;
      height: 0.5rem;
      color: #fff;
      background: #ffd100;
      border-radius: 0.35rem;
      padding-top: 0.07rem;
      display: flex;
      justify-content: center;
      align-content: center;
      font-size: 0.28rem;
      margin-bottom: 0.23rem;
    }
  }
  .main-right-divs1 {
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.25rem;
    .span1 {
      font-size: 0.24rem;
      color: rgba(233, 72, 41, 1);
    }
    .span2 {
      width: 1.5rem;
      height: 0.5rem;
      color: rgba(255, 209, 0, 1);
      background: rgba(255, 209, 0, 0.15);
      border-radius: 0.25rem;
      padding-top: 0.07rem;
      text-align: center;
      font-size: 0.28rem;
      margin-bottom: 0.23rem;
    }
  }
  .right-div1-span0 {
    font-size: 0.24rem;
    color: rgba(153, 153, 153, 1);
  }
  .right-div1-span1 {
    position: absolute;
    top: 0.08rem;
    left: 1rem;
    font-size: 0.28rem;
    color: rgba(255, 209, 0, 1);
    font-weight: bold;
  }
  .right-div1-span2 {
    width: 1.2rem;
    height: 0.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.16rem;
    background: #ffd100;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.28rem;
    img {
      margin-left: 0.2rem;
      margin-right: 0.1rem;
      width: 0.16rem;
      height: 0.18rem;
    }
  }
  .right-div1-span2-img {
    width: 0.27rem;
    height: 0.19rem;
  }
  .right-div1-span3 {
    font-size: 0.24rem;
    color: rgba(255, 209, 0, 0.8);
  }
}
.isFixed {
  position: fixed;
  // position: absolute;
  top: 0;
  z-index: 999;
  transition: all 1s linear;
}
.opc0 {
  opacity: 0;
}
.child-style {
  border: 0.11rem solid rgba(255, 209, 0, 1);
  box-sizing: content-box;
  border-radius: 0.4rem !important;
  margin-top: 0.7rem !important;
  position: relative;
  background: rgba(255, 247, 209, 1);
}
.man-style {
  box-sizing: content-box;
  border: 0.11rem solid rgba(80, 187, 255, 1);
  border-radius: 0.4rem;
  margin-top: 0.8rem !important;
  position: relative;
  margin-bottom: 0.4rem !important;
  background: rgba(212, 238, 255, 1);
}
.child-style::before {
  content: "宝宝课堂";
  display: block;
  position: absolute;
  left: -0.11rem;
  top: -0.7rem;
  width: 2.08rem;
  height: 0.68rem;
  background: rgba(255, 209, 0, 1);
  color: #fff;
  text-align: center;
  line-height: 0.68rem;
  border-radius: 0.33rem 0.33rem 0 0;
  font-size: 0.32rem;
}
.child-style::after {
  content: "";
  display: block;
  width: 0.14rem;
  height: 0.21rem;
  background: rgba(255, 209, 0, 1);
  position: absolute;
  left: -0.11rem;
  top: -0.025rem;
}

.man-style::before {
  content: "家长课堂";
  display: block;
  position: absolute;
  left: -0.11rem;
  top: -0.66rem;
  width: 2.08rem;
  height: 0.68rem;
  background: rgba(80, 187, 255, 1);
  color: #fff;
  text-align: center;
  line-height: 0.68rem;
  border-radius: 0.28rem 0.28rem 0 0;
  font-size: 0.32rem;
}
.man-style::after {
  content: "";
  display: block;
  width: 0.12rem;
  height: 0.22rem;
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
  display: none;
}
.main-right-div0 {
  height: 0.55rem;
}
</style>