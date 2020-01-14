<template>
  <div class="content">
    <div class="main">
      <div class="top_img">
        <img v-lazy="require('../../../assets/img/dm1.png')" alt />
      </div>
      <div class="userName">
        <p>{{nickname}}的宝宝</p>
        <p>性别：{{$store.state.cepingInfo.resultMap.info.gender}}</p>
        <p>年龄：{{$store.state.cepingInfo.age}}岁</p>
      </div>
      <div class="bg">
        <img v-lazy="require('../../../assets/img/z22.png')" alt />
      </div>
      <div class="figure">
        <div class="figure_title">代表人物</div>
        <div class="figure_content">
          <img class="img_1" v-lazy="$store.state.cepingInfo.resultMap.celebrity.labelUrl" alt />
          <img class="img_2" v-lazy="$store.state.cepingInfo.resultMap.celebrity.celebrityPic" alt />
          <img class="img_3" v-lazy="require('../../../assets/img/tc36.png')" alt />
          <img
            class="img_4"
            v-lazy="'https://emsoss.oss-cn-hangzhou.aliyuncs.com/image/babybookthree.png'"
            alt
          />
          <img
            class="img_5"
            v-lazy="'https://emsoss.oss-cn-hangzhou.aliyuncs.com/image/babybookone.png'"
            alt
          />
          <img class="img_6" v-lazy="$store.state.cepingInfo.resultMap.celebrity.slogen" alt />
        </div>
        <div class="title_name">
          {{$store.state.cepingInfo.resultMap.template.themeLabel}}宝宝
          <div class="title_name_border"></div>
        </div>
        <div class="figure_name">
          <span class="figure_name_span">
            成长类型:
            <span>{{$store.state.cepingInfo.resultMap.template.themeLabel}}</span>
          </span>
          <span class="figure_name_span" style="margin-right: 0;">
            代表人物:
            <span>{{$store.state.cepingInfo.resultMap.celebrity.celebrityName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
          <br />
          <span class="figure_name_span span1">
            思维天赋:
            <span>{{$store.state.cepingInfo.resultMap.celebrity.talent}}</span>
          </span>
        </div>
        <div class="figure_text">{{$store.state.cepingInfo.resultMap.celebrity.content}}</div>
      </div>
      <div class="figure_s">
        <div class="figure_title">
          <span v-if="swiperIndex==0">四维成长模型</span>
          <span v-else>{{$store.state.cepingInfo.typeName[swiperIndex-1]}}能力</span>
        </div>
        <div class="swiper-page">{{swiperIndex+1}}/5</div>
        <van-swipe :width="swiperWidth"
        style="height:100%"
        :show-indicators='false' :loop='false'
        @change='swiperChange'
        >
          <van-swipe-item>
            <div class="black-view-one">
              <div class="type-result" style="margin-top:1.2rem">
                <p>1.</p>
                <p>{{$store.state.cepingInfo.typeName[0]}}</p>
                <p>能力:{{$store.state.cepingInfo.resultMap.records[0].level}}</p>
              </div>
              <div class="type-result">
                <p>2.</p>
                <p>{{$store.state.cepingInfo.typeName[1]}}</p>
                <p>能力:{{$store.state.cepingInfo.resultMap.records[1].level}}</p>
              </div>
              <div class="type-result">
                <p>3.</p>
                <p>{{$store.state.cepingInfo.typeName[2]}}</p>
                <p>能力:{{$store.state.cepingInfo.resultMap.records[2].level}}</p>
              </div>
              <div class="type-result">
                <p>4.</p>
                <p>{{$store.state.cepingInfo.typeName[3]}}</p>
                <p>能力:{{$store.state.cepingInfo.resultMap.records[3].level}}</p>
              </div>
              <div class="resultView">
                <img
                  :src="$store.state.cepingInfo.resultMap.template.themeDetialImage"
                  class="resultImg"
                />
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item style="top:-20">
            <div class="black-view-one">
              <div style="padding-top:.20rem">
                <div
                  class="sumanalysis-content"
                >{{$store.state.cepingInfo.resultMap.records[0].content}}</div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item style="top:-.20rem">
            <div class="black-view-one">
              <div style="padding-top:.20rem">
                <div
                  class="sumanalysis-content"
                >{{$store.state.cepingInfo.resultMap.records[1].content}}</div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item style="top:-.20rem">
            <div class="black-view-one">
              <div style="padding-top:.20rem">
                <div
                  class="sumanalysis-content"
                >{{$store.state.cepingInfo.resultMap.records[2].content}}</div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item style="top:-.20rem">
            <div class="black-view-one">
              <div style="padding-top:.20rem">
                <div
                  class="sumanalysis-content"
                >{{$store.state.cepingInfo.resultMap.records[3].content}}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="clack">
          <img
            class="click_left"
            @click="prePage"
            v-lazy="require('../../../assets/img/yj1kb.png')"
            alt
          />
          <img
            class="click_right"
            @click="nextPage"
            v-lazy="require('../../../assets/img/yjjx1kb.png')"
            alt
          />
        </div>
      </div>
      <div class="ceYiCe" @click="jumpToMiniProgram">再测一次</div>
    </div>
    <van-overlay
      :show="showDialogStyle"
      z-index="999"
    >
      <div style="width:100%;height:100%" class="modal"  @touchend='showDialogStyle= false'>
        <img class="modal-img" @touchend.stop v-lazy="require('../../../assets/images/little_z.png')" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Overlay } from "vant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      swiperIndex: 0,
      showDialogStyle: false,
      swiperWidth:318
    };
  },
  mounted() {
    this.swiperWidth = document.body.offsetWidth * 0.8214
  },
  computed: {
    ...mapGetters(["cepingInfo"]),
    nickname() {
      // console.log(localStorage.getItem("userWechatInfo"));
      let userInfo = JSON.parse(localStorage.getItem("userWechatInfo"));
      if (userInfo) {
        return userInfo.nickName;
      }
    }
  },
  components: {
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem,
    vanOverlay: Overlay,
  },
  methods: {
    prePage() {
      this.swiperIndex != 0 ? this.swiperIndex-- : "";
      this.$refs.swiper.swipeTo(this.swiperIndex);
    },
    nextPage() {
      this.swiperIndex != 4 ? this.swiperIndex++ : "";
      this.$refs.swiper.swipeTo(this.swiperIndex);
    },
    jumpToMiniProgram() {
      console.log(111111)
      this.showDialogStyle = true;
    },
    // 轮播图页码改变
    swiperChange(index) {
      this.swiperIndex = index;
    }
  }
};
</script>
<style >
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-img {
  width: 80%;
  border-radius: 0.24rem;
  position: relative;
  top: -0.7rem;
}
</style>
<style scoped>
.main {
  width: 6.78rem;
  height: 18.28rem;
  background: linear-gradient(0deg, #216af9, #2fa2fa);
  margin-left: 0.36rem;
  padding-top: 0.69rem;
  border-radius: 0.2rem;
  /* margin-bottom: 1.16rem; */
  position: relative;
}
.top_img {
  text-align: center;
}
.top_img img {
  width: 4.81rem;
  height: 0.38rem;
}
.userName {
  width: 6.78rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.24rem;
  color: rgba(255, 255, 255, 1);
}
.bg {
  width: 100%;
  position: absolute;
  top: 0.4rem;
  left: 0;
}
.bg img {
  margin-left: 0.31rem;
  width: 6.16rem;
  height: 5.08rem;
}
.figure {
  width: 6.16rem;
  height: 9.17rem;
  position: relative;
  background: rgba(255, 255, 255, 1);
  margin: 0.65rem auto;
  border-radius: 0.1rem;
}
.figure_title {
  width: 2.45rem;
  height: 0.63rem;
  background: rgba(255, 209, 0, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 0.3rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -0.315rem;
  left: 2rem;
  font-weight: bold;
}
.figure_content img {
  position: absolute;
}
.img_1 {
  /* width: 1.44rem; */
  height: 0.6rem;
  top: 0.75rem;
  left: 0.44rem;
  transform: rotate(6.5deg);
}
.img_2 {
  width: 1.83rem;
  height: 2.29rem;
  top: 2.31rem;
  left: 0.41rem;
}
.img_3 {
  width: 0.93rem;
  height: 0.61rem;
  top: 4.08rem;
  right: 0.25rem;
}
.img_4 {
  width: 0.52rem;
  height: 0.56rem;
  top: 1.3rem;
  right: 0.52rem;
}
.img_5 {
  width: 1.11rem;
  height: 0.74rem;
  top: 2.73rem;
  left: 2.18rem;
}
.img_6 {
  width: 4.78rem;
  height: 1.37rem;
  top: 1.4rem;
  left: 0.44rem;
  transform: rotate(6.5deg);
}
.title_name {
  position: absolute;
  font-size: 0.34rem;
  font-family: "HappyZcool-2016";
  top: 4.8rem;
  left: 2.3rem;
  color: rgba(104, 59, 16, 1);
}
.title_name_border {
  width: 1.65rem;
  height: 0.12rem;
  position: absolute;
  top: 0.32rem;
  left: 0;
  background: rgba(255, 209, 0, 0.3);
}
.figure_name {
  position: absolute;
  font-size: 0.26rem;
  font-family: "HappyZcool-2016";
  top: 5.48rem;
  left: 0.46rem;
  white-space: nowrap;
}
.figure_name_span {
  color: rgba(104, 59, 16, 1);
  margin-right: 0.5rem;
  width: 2.04rem;
  height: 0.24rem;
}
.figure_name_span span {
  color: #60c3ff;
  width: 0.5rem;
}
.figure_text {
  position: absolute;
  top: 6.55rem;
  left: 0.46rem;
  width: 5.18rem;
  height: 2.28rem;
  font-family: "HappyZcool-2016";
  color: rgba(159, 103, 49, 1);
  font-size: 0.26rem;
  line-height: 0.33rem;
}
.figure_s {
  width: 6.16rem;
  height: 4.1rem;
  position: relative;
  background: rgba(255, 255, 255, 1);
  margin: 0.65rem auto;
  border-radius: 0.1rem;
}
.swiper {
  position: absolute;
  width: 5.5rem;
  height: 3rem;
  /* border: 1px solid; */
  left: 0.32rem;
  top: 0.6rem;
  overflow: hidden;
}
.sdjks {
  width: 5.5rem;
  height: 3rem;
}
.ceYiCe {
  width: 4.27rem;
  height: 0.74rem;
  border-radius: 0.37rem;
  background: rgba(255, 209, 0, 1);
  color: #fff;
  font-size: 0.34rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.26rem;
}
.click_left {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 1.8rem;
  left: 0rem;
}
.click_right {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 1.8rem;
  right: 0rem;
}

/* 测评页轮播css */
.black-view-one {
  width: 6.16rem;
  height: 4.1rem;
}

.black-view-one-tit {
  display: flex;
  width: 100%;
  font-size: 0.34rem;
  font-family: "HappyZcool-2016";
  margin-left: 0.5rem;
  margin-top: 0.2rem;
  color: #fff;
}

.sumanalysis {
  font-size: 0.26rem;
  font-family: "HappyZcool-2016";
  color: #9f6731;
  margin-left: 0.5rem;
  margin-top: 0.3rem;
  display: flex;
}

.sumanalysis-content {
  font-size: 0.24rem;
  font-family: "HappyZcool-2016";
  color: #9f6731;
  padding: 0 0.5rem;
  display: flex;
  overflow: hidden;
  text-align: left;
  margin-top: 0.5rem;
  line-height: 0.33rem;
}

.type-result {
  font-size: 0.24rem;
  font-family: "HappyZcool-2016";
  color: #9f6731;
  margin-left: 0.5rem;
  margin-top: 0.1rem;
  display: flex;
  width: 100%;
}
.resultView {
  background: linear-gradient(0deg, #3fa0f2, #43b0f2);
  border-radius: 0.2rem;
  width: 2.7rem;
  height: 2.25rem;
  position: absolute;
  top: 0.97rem;
  right: 0.52rem;
}
.resultView > img {
  width: 100%;
  height: 100%;
}
.swiper-page {
  width: 0.8rem;
  height: 0.3rem;
  background: rgba(73, 60, 0, 0.13);
  border-radius: 0.18rem;
  color: rgba(78, 69, 0, 0.6);
  font-size: 0.2rem;
  line-height: 0.3rem;
  position: absolute;
  left: 50%;
  bottom: 0.12rem;
  transform: translateX(-50%);
  text-align: center;
}
</style>