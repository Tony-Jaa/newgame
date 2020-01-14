<template>
  <div class="main">
    <div class="xz-nav1">
      <!-- <h4 class="xz-nav-h4" v-if="$route.params.type==1">精品课程，VIP优惠购</h4>
      <h4 class="xz-nav-h4" v-if="$route.params.type==3">VIP专享课程，1分钱获取VIP</h4>
      <h4 class="xz-nav-h4" v-if="$route.params.type==2">优选课程，快来体验~</h4>-->
      <span>共&nbsp;{{total}}&nbsp;堂场景课程</span>
    </div>
    <div class="more-main">
      <div
        class="xz-main"
        v-for="(moredata,index) in moreDAta"
        :key="moredata.id"
        v-show="moredata.length>0"
        :class="[index==0?'child-style':'man-style']"
      >
        <img
          class="home-child"
          :class="[index==0?'':'display']"
          src="../../assets/images/firstHome/home-child.png"
          alt
        />
        <div
          v-for="more in moredata"
          :key="more.id"
          @click="godetail(more.id,more.listImage)"
          :class="[index==0?'child':'man']"
        >
          <div class="main-left">
            <img :src="more.listImage" alt />
          </div>
          <div class="main-right">
            <p class="main-right-p0">{{more.title}}</p>
            <p class="main-right-p1">{{more.describes}}</p>
            <div class="main-right-div9">
              <p
                class="main-left-span"
                v-show="more.label"
                v-for="(ele,index) in more.label" :key="index"
              >{{ele}}</p>
            </div>
            <div class="main-right-div1">
              <!-- <div> -->
              <span
                v-show="$route.params.type==2"
                style="white-space: nowrap;font-size: 0.24rem;color: #E94829;"
              >优选课程</span>
              <span
                :class="[more.costPrice&&$route.params.type!=2?'':'opc0']"
                class="right-div1-span0"
              >{{more.costPrice}}元</span>
              <span
                :class="[more.costPrice&&$route.params.type!=2?'':'opc0']"
                class="right-div1-span3"
              >
                <img class="right-div1-span2-img" src="../../assets/img/ghvwef.png" alt />
                会员{{(more.costPrice*0.85).toFixed(2)}}元
              </span>
              <!-- </div> -->

              <span class="right-div1-span2">
                <img src="../../assets/img/bof.png" alt />
                试听
              </span>
            </div>
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
      moreDAta: [[], []],
      totals: [],
      total: 0
    };
  },
  created() {
    this.fetchMore();
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
      location.href = `${location.origin}/#/courseDetails/${id}/false`;
    },

    //获取更多数据-----------------------------------
    fetchMore(page = 0) {
      this.$http
        .get(serviceApi.listcourse, {
          params: {
            type: "MORE",
            collegeId: this.$route.params.collegeId,
            chargingStandard: this.$route.params.type,
            mySqlOffset: page * 10,
            rows: 999
          }
        })
        .then(res => {
          if (res.data.status == "00") {
            let more = res.data.data;
            more.map(ele=>{
                let label = [];
                if(ele.label){
                  label = ele.label.split(",")
                  ele.label = label
                }
              });
            for (let i = 0; i < more.length; i++) {
              const ele = more[i];
              if (ele.audienceType == 1) {
                this.moreDAta[0].push(ele);
              } else if (ele.audienceType == 2) {
                this.moreDAta[1].push(ele);
              }
            }
            this.total = res.data.total;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
body {
  font-size: 62.5%;
}
.main {
  font-size: 0.3rem;
  background: #f7f6f6;
  .xz-nav1 {
    height: 0.91rem;
    padding: 0.1rem 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    background: #f7f6f6;
    z-index: 1;
    border-bottom: 1px solid rgba(117, 117, 117, 0.1);
  }
  // .more-main {
  //   margin-top: 1.1rem;
  // }
  .xz-nav-h4 {
    font-size: 0.28rem;
    color: #666;
  }
  .xz-nav-span {
    color: #ffd100;
    font-size: 0.32rem;
  }
  .xz-nav-img {
    width: 0.2rem;
    color: #ffd100;
  }
  .xz-nav-p {
    display: flex;
    align-items: center;
  }
  .main-left {
    width: 2.16rem;
    height: 2.02rem;
    margin-left: -0.08rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.26rem;
    }
  }
  .xz-main {
    width: 6.78rem;
    margin: auto;
  }
  .main-right {
    width: 65%;
    padding-left: 2%;
  }
  .main-right-p0 {
    font-size: 0.32rem;
    font-weight: bold;
    color: rgba(17, 17, 17, 0.8);
    // margin-top: 0.08rem ;
  }
  .main-right-p1 {
    height: 0.38rem;
    line-height: 0.3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.24rem;
    color: rgba(166, 166, 166, 1);
  }
  .main-right-div9 {
    display: flex;
    align-items: center;
    height: 0.4rem;
  }
  .main-left-span {
    height: 0.3rem;
    font-size: 0.22rem;
    background: rgba(29, 169, 255, 0.2);
    padding: 0.02rem 0.1rem;
    border-radius: 0.05rem;
    color: rgba(29, 169, 255, 1);
    margin-right: 0.1rem;
    display: flex;
    align-items: center;
  }
  .main-right-div1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.15rem;
    .span1 {
      font-size: 0.24rem;
      color: rgba(233, 72, 41, 1);
    }
    .span2 {
      width: 1.5rem;
      height: 0.5rem;
      color: rgba(255, 209, 0, 1);
      background: rgba(255, 209, 0, 0.2);
      border-radius: 0.25rem;
      padding-top: 0.03rem;
      text-align: center;
      font-size: 0.28rem;
    }
  }
  .right-div1-span0 {
    font-size: 0.24rem;
    color: rgba(153, 153, 153, 1);
  }
  .right-div1-span1 {
    font-size: 0.28rem;
    color: rgba(255, 209, 0, 1);
    font-weight: bold;
  }
  .right-div1-span2 {
    width: 1.2rem;
    min-width: 1.2rem;
    // height: 0.5rem;
    display: flex;
    align-items: center;
    // justify-content: center;
    // background: rgba(243, 199, 0, 0.6);
    background: #ffd100;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.28rem;
    margin-bottom: 0.08rem;
    margin-top: 0.05rem;
    img {
      width: 0.16rem;
      height: 0.2rem;
      margin-left: 0.22rem;
      margin-right: 0.1rem;
    }
  }
  .right-div1-span2-img {
    width: 0.27rem;
    height: 0.19rem;
  }
  .right-div1-span3 {
    font-size: 0.24rem;
    color: rgba(255, 209, 0, 1);
  }
  .main-right-div0 {
    height: 0.34rem;
  }
  .opc0 {
    opacity: 0;
  }

  .home-child {
    width: 1.73rem;
    height: 0.8rem;
    position: absolute;
    top: -0.8rem;
    right: -0.11rem;
  }
  .child {
    display: flex;
    margin-top: 0.3rem;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-radius: 0.35rem;
    position: relative;
  }
  .child:first-of-type,
  .man:first-of-type {
    margin-top: 0;
  }
  .man {
    display: flex;
    margin-top: 0.3rem;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-radius: 0.3rem;
    position: relative;
  }
  .child-style {
    border: 0.11rem solid rgba(255, 209, 0, 1);
    box-sizing: content-box;
    border-radius: 0.36rem !important;
    margin-top: 0.9rem !important;
    position: relative;
    background: rgba(255, 247, 209, 1);
  }
  .man-style {
    box-sizing: content-box;
    border: 0.11rem solid rgba(80, 187, 255, 1);
    border-radius: 0.36rem;
    margin-top: 0.8rem !important;
    position: relative;
    background: rgba(212, 238, 255, 1);
  }
  .child-style::before {
    content: "宝宝课堂";
    display: block;
    position: absolute;
    left: -0.11rem;
    top: -0.68rem;
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
    width: 0.1rem;
    height: 0.2rem;
    background: rgba(255, 209, 0, 1);
    position: absolute;
    left: -0.11rem;
    top: 0;
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
  .display {
    display: none;
  }
}
</style>