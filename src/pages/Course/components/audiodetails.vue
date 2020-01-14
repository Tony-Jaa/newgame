<template>
  <div
    id="audiodetail"
    class="main-wrap"
    style="background:#fff;width: 100%;z-index:999"
    @touchstart="touchStart"
  >
    <div
      @click="changelistShow"
      id="listShow"
      class="audio-hidelists"
      :class="[listShow?'audio-hidelists-show':'']"
    >
      <div :class="[listShow?'audio-hidelistsDivShow':'']">
        <div class="listShow-item">
          <div class="item-title">场景课程：《{{title}}》</div>
          <div class="items">
            <div
              class="item"
              @click="changeListen(index)"
              v-for="(item, index) in courselist"
              :key="index"
            >
              <div
                class="item-name"
                :class="[item.id==audioId?'now-listen':item.watchDuration>0?'has-read':'']"
              >{{item.name}}</div>
              <div class="item-state">
                <div v-if="item.chargingStandard==100" class="play-over">已播完</div>
                <div v-if="item.chargingStandard == 2&&vip==0" class="free-btn">试听</div>
                <div
                  v-if="item.chargingStandard == 2&&vip==1&&item.chargingStandard>0"
                  class="play-over"
                >播放{{item.watchProgress}}%</div>
                <img
                  v-if="item.chargingStandard == 1"
                  src="../../../assets/images/coursebar/lock.png"
                  alt
                />
              </div>
              <div v-if="index==courselist.length-1" class="no-more">- 到底啦 -</div>
            </div>
          </div>
        </div>
        <div class="btn-close" @click="listShow=false">关闭</div>
      </div>
    </div>
    <div class="detail-title">{{resultMap.name}}</div>
    <div v-if="resultMap.label" class="icon-all">
      <div class="icon">{{resultMap.label}}</div>
    </div>

    <div style="display: flex;margin:0 0.36rem">
      <img class="detailbackImg" :src="resultMap.courseBanner" />
    </div>

    <div class="audioplay">
      <div class="audio-autopaly">
        <audio
          id="audio"
          ref="audio"
          autoplay
          :src="playUrl"
          :paused="audioPaused"
          @ended="audioEnd"
          @play="audioWillPlay"
          @timeupdate="audioPlaying"
          style="width: 100%;height: .64rem;display:block"
        >Your browser does not support the audio element.</audio>
      </div>
      <!-- <Range
        :value="RangeValue"
        @on-change="updataPlayingTimeValue"
        @on-touchstart.stop="updataPlayingTimeStart"
        @on-touchend.stop="updataPlayingTimeEnd"
      ></Range>-->
      <van-slider
        v-model="RangeValue"
        @input="updataPlayingTimeValue"
        @drag-start="updataPlayingTimeStart"
        active-color="#FFD100"
        bar-height="0.08rem"
        @drag-end="updataPlayingTimeEnd"
      />
      <div class="audio-show-time">
        <span>{{audioInfo.playingTime}}</span>
        <span>{{audioInfo.allTime}}</span>
      </div>
      <div class="audio-control">
        <div @click="$toast('点击右上角分享')">
          <img
            style="width:0.61rem;height:0.55rem;display:block"
            src="../../../assets/images/coursebar/share.png"
            alt
          />
        </div>
        <div v-if="$refs.audio" class="audio-control-btns">
          <img
            @click="preAudio"
            class="audio-pre"
            src="../../../assets/images/coursebar/audio-pre.png"
            alt
          />
          <img
            v-show="!audioState"
            @click="conAudioPaused"
            class="audio-play"
            src="../../../assets/images/coursebar/audio-play.png"
            alt
          />
          <img
            v-show="audioState"
            @click="conAudioPaused"
            class="audio-play"
            src="../../../assets/images/coursebar/audio-pause.png"
            alt
          />
          <img
            class="audio-next"
            @click="nextAudio"
            src="../../../assets/images/coursebar/audio-next.png"
            alt
          />
        </div>
        <div @click="listShow=true" class="audio-lists">
          <img src="../../../assets/images/coursebar/audio-lists.png" alt />
        </div>
      </div>
    </div>
    <div style="width:100%;height:0.12rem;background:rgba(233,233,233,.6);"></div>
    <Sticky @scroll="scrollFixed" class="Sticky">

      <van-tabs v-model="tabindex" :line-width="'0.39rem'">
        <van-tab class="remark" title="课程介绍" :name="0"></van-tab>
        <van-tab title="社群" :name="1"></van-tab>
      </van-tabs>
    </Sticky>
    <div class="course-bar" :class="[isFixed?'course-bar-scroll':'']">
      <div v-show="tabindex == 0">
        <div class="detaildiv" style="height:auto;overflow:scroll">
          <div class="detailback" v-for="(item, index) in uploadurl" :key="index">
            <img :src="item" class="RemarkImg" />
          </div>
          <div v-if="uploadurl.length<=0" style="margin:2rem auto;width:6rem;height:3.28rem">
            <img
              v-lazy="'https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/nulldata.png'"
              class="nulldata"
            />
            <div class="nulltext">暂无数据</div>
          </div>
        </div>
      </div>
      <div v-show="tabindex == 1" style="margin-bottom:2.3rem;overflow:scroll">
        <div class="comment-item" v-for="item in commentlist" :key="item.id">
          <div class="commentdiv">
            <div class="avtardiv">
              <img v-lazy="item.imageUrl" class="avtar" />
            </div>
            <div class="info">
              <div class="info-name">{{item.nickName}}</div>
              <div class="info-time">{{item.createdTime}}</div>
            </div>
          </div>
          <div class="info-comment">{{item.content}}</div>
        </div>
        <div v-if="commentlist.length<=0" style="margin:2rem auto;width:6rem;height:3.28rem">
          <img
            src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/nulldata.png"
            class="nulldata"
          />
          <div class="nulltext">暂无数据</div>
        </div>
      </div>
    </div>
    <coursebar
      :isvideo="false"
      @addComment="addComment"
      @handle="$emit('handle')"
      :showComment="audioShow"
      :playing="playing"
      @shiting="$emit('shiting')"
      :result-map="result"
    ></coursebar>
    <!-- 注释待后期使用 -->
    <!-- <div class="fixedbar">
      <div class="collectiondiv" v-if="!commentflag" @click="comment">
        <img
          src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/comment.png"
          class="collection"
        />
        <div class="collecttit">写评论</div>
      </div>
      <div class="sub" v-if="!isbuyflag && !commentflag" @click="toback">返回课程页购买</div>
      <div v-if="commentflag" class="commentdiv">
        <input class="inputcomment" placeholder="写评论" v-model="content" />
        <div class="subcomment" @click="subcomment">提交</div>
      </div>
    </div>-->
    <div style="font-size:0.32rem">
      <!-- <toast v-model="showcollect" text="评论成功"></toast> -->
    </div>
    <div style="font-size:0.32rem">
      <!-- <toast v-model="showfail" :text="failtext" type="warn"></toast> -->
    </div>
    <!--  <div style="font-size:0.36rem">
      <Loading :show="loading" text></Loading>
    </div>-->
  </div>
</template>

<i18n>
  set bar-active-color:rgba(242, 200, 28, 1)
  zh-CN: rgba(242, 200, 28, 1)
  
</i18n>

<script>
// import { Swiper, SwiperItem, Tab, TabItem, Toast, Range } from "vux";
import { Tab, Tabs, Slider,Sticky  } from "vant";
import serviceApi from "../../../service/Course/serviceConfig";

import coursebar from "./coursebar";
let _this;
export default {
  name: "audiodetails",
  data() {
    return {
      demo_index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      tabindex: 0,
      commentflag: false,
      // id: "",
      // courselist: [],
      resultMap: {
        id: "",
        typeId: "",
        typeValue: "",
        name: "",
        subtitle: "",
        uploadUrl: "",
        ossId: "",
        ossParams1: "",
        ossParams2: "",
        url: "",
        chargingStandard: "",
        chargingStandardValue: "",
        realPrice: "",
        costPrice: 100,
        cover: "",
        label: "",
        remark: "",
        createdTime: "",
        creator: "",
        lastOperaterTime: "",
        lastOperator: "",
        ext1: "",
        ext3: "",
        ext2: "",
        source: "",
        status: ""
      },
      remarkmap: {
        title: "",
        remark: ""
      },
      content: "",
      collecttext: "",
      // showcollect: false,
      commentlist: [],
      isbuyflag: false,
      userId: "",
      nickName: "",
      playUrl: "",
      // showfail: false,
      failtext: "",
      uploadurl: [],
      audioPaused: false, //音频是否暂停
      // courseId:'' //所属课程id
      audioInfo: {
        allTimeIt: 0, //总时长秒数,未格式化
        allTime: "00:00", //总时长格式化后
        playingTime: "00:00", //当前播放秒数
        playingTimeIt: 0 //当前播放秒数，未格式化
      },
      audioChangeHandle: false,
      listShow: false, //列表详情
      audioState: true,
      audioFirst: false,
      audioReady: false,
      firstTouchByself: false,
      RangeValue: 0, //当前播放百分比
      isFixed:false
    };
  },
  props: [
    "courseId",
    "audioId",
    "courselist",
    "audioIndex",
    "title",
    "audioShow",
    "result",
    "playing"
  ],
  components: {
    vanTabs: Tabs,
    vanTab: Tab,
    coursebar,
    vanSlider: Slider,
    Sticky
    // Range
  },
  watch: {
    audioId: function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      if (!oldValue) {
      } else {
        this.addPlayRecord(oldValue);
      }
      this.audioAutoPlay("audio");
      this.getDetails();
      setTimeout(() => {
        this.$emit("getListAgain");
        this.pageComment();
        this.isBuy();
      }, 2000);
      // })
    }
  },
  computed: {
    vip() {
      return this.$store.state.userInfo.vip;
    },
    audioPlayingState() {
      return this.$refs.audio.paused;
    }
  },
  mounted: function() {
    // console.log(this.$route.path);
    _this = this;
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = JSON.parse(userWechatInfo).id;
    this.nickName = JSON.parse(userWechatInfo).nickName;
    let audio = this.$refs.audio;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        audio.play();
      },
      false
    );
  },
  beforeDestroy() {
    if (this.audioId) {
      this.addPlayRecord(this.audioId);
    }
  },
  methods: {
    isBuy() {
      if (!this.userId) {
        // this.showfail = true;
        this.$toast("请先关注微信公共号");
        return false;
      }
      const data = {
        courseId: this.audioId,
        userId: this.userId
      };
      this.$http({
        method: "post",
        url: `${serviceApi.isBuy}`,
        data: data
      })
        .then(function(response) {
          if (response.status == "00") {
            if (response.data.obj) {
              _this.isbuyflag = response.data.obj;
            }
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;
          _this.$toast("服务器异常");
        });
    },
    toShare(fee, id) {
      if (fee) {
        // 价格不为0
        let link = window.location.href.split("#")[1].split("?")[0];
        this.handleShare(link);
      } else {
        let link =
          window.location.href.split("#")[1].split("?")[0] +
          "?autoId=" +
          this.audioId;
        this.handleShare(link);
      }
    },
    // 分享
    handleShare(dataUrl) {
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
              "updateTimelineShareData",
              "navigateTo"
            ] // 需要使用的js接口列表，所有js接口列表见文档
          });
          // config 成功之后的接口处理
          wx.ready(function() {
            wx.checkJsApi({
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData",
                "navigateTo"
              ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                // console.log(res, "===================checkJsApi");
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              }
            });
            wx.updateTimelineShareData({
              // 分享到朋友圈及分享到QQ
              title: document.title, // 分享标题
              link: `${location.origin}/#${dataUrl}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 用户点击了分享后执行的回调函数
                // console.log("分享成功");
              }
            });

            wx.updateAppMessageShareData({
              // “分享到朋友圈”及“分享到QQ空间”
              title: document.title, // 分享标题
              desc: _this.result.describes ? `${_this.result.describes}` : "", // 分享描述
              link: `${location.origin}/?/#${dataUrl}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/siwei.png", // 分享图标
              success: function() {
                // 设置成功
                console.log(
                  `音频页分享设置成功${location.origin}/?/#${dataUrl}`
                );
              }
            });
          });
        }
      });
    },
    demo_onIndexChange(index) {
      this.demo_index = index;
    },
    comment() {
      this.commentflag = !this.commentflag;
    },
    toback() {
      if (window.history.length == 1 || window.history.length == 2) {
        // 1:分享链接进入 2：首页链接快速进入
        this.getCourseIdByResIdToBack();
      } else {
        this.$router.back(-1);
      }
    },
    pageComment() {
      const params = {
        page: 1,
        rows: 999,
        courseId: this.audioId
      };
      this.$http({
        method: "post",
        url: `${serviceApi.pageComment}`,
        params: params
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.commentlist = response.data.resultMap.rows;
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;
          _this.toast("服务器异常");
        });
    },
    subcomment() {
      if (!this.userId) {
        // this.showfail = true;
        this.$toast("请先关注微信公共号");
        return false;
      }
      const params = {
        courseId: this.audioId,
        userId: this.userId,
        content: this.content,
        nickName: this.nickName
      };
      this.$http({
        method: "post",
        url: `${serviceApi.addComment}`,
        timeout: 10000,
        data: params
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.content = "";
            _this.$toast("提交成功");
            _this.pageComment();
            _this.commentflag = false;
          } else {
            _this.$toast("提交失败");
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;
          _this.toast("服务器异常");
        });
    },
    onIndexChange() {
      let index = 0;
      if (this.demo_index == 0) {
        index = this.swiperList - 1;
      } else {
        index = this.demo_index - 1;
      }
      this.demo_index = index;
    },
    tabcheck(index) {
      this.tabindex = index;
    },
    getDetails() {
      // this.loading = true;
      this.$http({
        method: "get",
        url: `${serviceApi.getInfo}?id=${this.audioId}&userId=${this.userId}&courseId=${this.courseId}`
      })
        .then(response => {
          if (response.data.status == "00") {
            if (response.data.obj) {
              _this.resultMap = response.data.obj;
              document.title = response.data.obj.name;
              _this.toShare(response.data.obj.costPrice, response.data.obj.id);
              let uploadurl = [];
              if (response.data.obj.uploadUrl) {
                uploadurl = response.data.obj.uploadUrl.split(",");
              }
              _this.uploadurl = uploadurl;
              _this.getPlayInfo(response.data.obj.ossId);
            }
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;
          _this.toast("服务器异常");
        });
    },
    getPlayInfo(ossId) {
      this.audioFirst = false;
      const _this = this;
      this.audioReady = false;
      this.$http({
        method: "get",
        url: `${serviceApi.getPlayInfo}?ossId=` + ossId
      })
        .then(response => {
          if (response.data.status == "00") {
            if (response.data.resultMap) {
              _this.playUrl = response.data.resultMap.playUrl;
            } else {
              // _this.showfail = true;

              _this.toast("没有资源");
            }
          } else {
            // _this.showfail = true;

            _this.toast(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;

          _this.toast("服务器异常");
        });
    },
    getCourseIdByResIdToBack() {
      let _this = this;
      this.$http
        .get(serviceApi.getCourseIdByResId, {
          params: { id: this.resultMap.id }
        })
        .then(res => {
          if (res && res.data && res.data.data[0]) {
            let courseId = res.data.data[0].courseId;
            let link = `/courseDetails/${courseId}/false`;
            _this.$router.push({
              name: "courseDetails",
              params: { id: courseId, fromvip: false }
            });
          }
        });
    },
    // 音频播放到最后
    audioEnd() {
      this.addPlayRecord(this.audioId);
      this.$emit("nextAudio");
    },
    // 控制音频是否暂停
    conAudioPaused() {
      let audio = this.$refs.audio;
      if (!audio) {
        return;
      }
      if (!this.audioReady) {
        return;
      }
      if (audio.paused) {
        this.audioState = true;
        audio.play();
      } else {
        this.audioState = false;
        audio.pause();
      }
    },
    audioWillPlay() {
      let audio = this.$refs.audio;
      if (!audio) {
        return;
      }
      this.audioReady = true;
      if (
        this.courselist[this.audioIndex].watchProgress != 100 &&
        !this.audioFirst
      ) {
        // this.loading = false;
        this.audioFirst = true;
        audio.currentTime = this.courselist[this.audioIndex].watchDuration;
      }
      if (isNaN(Math.floor(audio.duration))) {
        setTimeout(() => {
          this.audioInfo.allTimeIt = Math.floor(audio.duration);
          this.audioInfo.allTime = this.optionTimes(Math.floor(audio.duration));
        }, 1000);
        return;
      }
      this.audioInfo.allTimeIt = Math.floor(audio.duration);
      this.audioInfo.allTime = this.optionTimes(Math.floor(audio.duration)); //获取音频播放总时长
    },
    // 音频播放中
    audioPlaying() {
      let audio = this.$refs.audio;
      if (!audio) {
        return;
      }
      this.audioInfo.playingTimeIt = Math.floor(audio.currentTime);
      this.audioInfo.playingTime = this.optionTimes(
        Math.floor(audio.currentTime)
      );
      this.RangeValue =
        100 * (this.audioInfo.playingTimeIt / this.audioInfo.allTimeIt);
    },
    optionTimes(time) {
      let minute = time / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = time % 60;
      let seconds = Math.floor(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    },
    //  拖动播放进度条
    updataPlayingTimeStart() {
      let audio = this.$refs.audio;
      if (!audio) {
        return;
      }
      audio.pause();
      this.audioState = false;
      this.audioChangeHandle = true;
    },
    // 拖动播放进度条抬起
    updataPlayingTimeEnd(data) {
      let audio = this.$refs.audio;
      if (!audio) {
        return;
      }
      audio.play();
      this.audioState = true;
      this.audioChangeHandle = false;
    },
    updataPlayingTimeValue(value) {
      if (this.audioChangeHandle) {
        this.audioInfo.playingTimeIt = Math.floor(
          (value * this.audioInfo.allTimeIt) / 100
        );
        this.audioInfo.playingTime = this.optionTimes(
          this.audioInfo.playingTimeIt
        );
        this.$refs.audio.currentTime = this.audioInfo.playingTimeIt;
      }
    },
    changelistShow(e) {
      if (e.target.id == "listShow") {
        this.listShow = false;
      }
    },
    // 添加播放记录
    addPlayRecord(id) {
      this.$http
        .post(serviceApi.save, {
          userId: this.userId,
          courseId: this.courseId,
          resourcesId: id,
          watchDuration: String(this.audioInfo.playingTimeIt)
        })
        .then(res => {
          if (res && res.data && res.data.status == "00") {
            console.log("播放记录保存成功");
          }
        });
    },
    // 下一首
    nextAudio() {
      this.audioFirst = false;
      this.audioState = true;

      this.$emit("nextAudio");
    },
    preAudio() {
      this.audioFirst = false;
      this.audioState = true;
      this.audioReady = false;
      this.$emit("preAudio");
    },
    changeListen(index) {
      this.audioFirst = false;
      this.audioState = true;
      this.audioReady = false;
      this.listShow = false;
      this.$emit("changeAudio", index);
    },
    addComment(data) {
      this.content = data;
      this.subcomment();
    },
    audioAutoPlay(id) {
      let audio = this.$refs.audio;
      if (!audio) {
        return;
      }
      // setTimeout(() => {
      // setInterval(() => {

      if (audio.paused && !this.firstTouch) {
        this.firstTouch = true;
        audio.play();
      }
      // }, 1000);
      // }, 2000);
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          audio.play();
        },
        false
      );
    },
    // 部分手机不会自动播放音频，采取触摸播放
    touchStart() {
      let audio = this.$refs.audio;
      // if (!this.audioReady) {
      //   return;
      // }
      if (!this.firstTouchByself) {
        this.firstTouchByself = true;
        let url = this.playUrl;
        this.playUrl = "";
        this.playUrl = url;
        audio.play();
        this.audioAutoPlay("audio");
      }
      // this.$refs.audio.play()
    },
    // 滚动事件scrollFixed
    scrollFixed({scrollTop,isFixed}){
      this.isFixed = isFixed
      console.log(isFixed)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#audiodetail .range-min,
#audiodetail .range-max {
  display: none;
}
#audiodetail .vux-range-input-box {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
#audiodetail .range-quantity {
  background: #ffd100 !important;
  height: 0.08rem;
}
#audiodetail .range-bar {
  height: 0.08rem !important;
  background: rgba(0, 0, 0, 0.14) !important;
  border-radius: 0.04rem !important;
  position: relative;
}
#audiodetail .van-slider__button {
  width: 0.18rem !important;
  height: 0.18rem !important;
  background: rgba(255, 255, 255, 1) !important;
  border: 0.06rem solid #ffd100 !important;
  top: -0.09rem !important;
  box-sizing: content-box;
}
#audiodetail .van-slider__button::after {
  content: "";
  display: block;
  width: 1rem;
  height: 1rem;
  position: relative;
  left: -0.5rem;
  top: -0.5rem;
}
#audiodetail .van-tabs__line{
  transform: translateX(1.7rem)
}
#audiodetail .van-sticky--fixed{
    position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>
<style scoped>
.vux-tab .vux-tab-item.vux-tab-selected {
  color: rgba(242, 200, 28, 1) !important;
}
.vux-tab-bar-inner {
  display: block;
  background-color: rgba(242, 200, 28, 1) !important;
}
.audioplay {
  margin: 0.55rem 0.36rem 0;
}
.RemarkImg {
  width: 100%;
  height: 100%;
  display: block;
}
.nulldata {
  width: 6rem;
  height: 3.28rem;
  margin: 0 auto;
}
.nulltext {
  font-size: 0.28rem;
  margin-top: 0.2rem;
  text-align: center;
  color: #999999;
}
.inputcomment {
  width: 60%;
  height: 0.6rem;
  border-radius: 0.3rem;
  margin-left: 0.4rem;
  border: 1px solid #eee;
  padding-left: 0.2rem;
}
.commentdiv {
  display: flex;
  width: 100%;
}
.subcomment {
  width: 1.6rem;
  height: 0.6rem;
  border-radius: 0.3rem;
  background: #fdd000;
  border: 1px solid #fdd000;
  font-size: 0.24rem;
  color: rgba(250, 250, 250, 1);
  text-align: center;
  line-height: 0.6rem;
  margin-left: 0.4rem;
}
.commentdiv {
  margin: 0.2rem 0.4rem;
  display: flex;
}
.comment-item {
  margin-bottom: 0.2rem;
}
.avtardiv {
  width: 0.8rem;
}
.avtar {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  display: block;
}
.info-name {
  font-size: 0.22rem;
  font-weight: 200;
  color: rgba(34, 34, 34, 1);
}
.info-time {
  font-size: 0.18rem;
  font-weight: 250;
  color: rgba(153, 153, 153, 1);
}
.info-comment {
  margin-left: 1.2rem;
  font-size: 0.24rem;
  font-weight: 200;
  color: rgba(80, 80, 80, 1);
  line-height: 0.38rem;
}
.detaildiv {
  margin: 0.2rem 0.4rem 2rem;
}
.detailtit {
  font-size: 0.28rem;
  font-weight: 250;
  color: rgba(0, 190, 240, 1);
  line-height: 0.3rem;
}
.detailcontent {
  font-weight: 150;
  color: rgba(80, 80, 80, 1);
  line-height: 0.38rem;
  margin-bottom: 1.2rem;
  padding: 0.2rem 0;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.2rem;
}
a {
  color: #42b983;
}
.detailback {
  position: relative;
}
.detailbackImg {
  width: 100%;
  height: 3.32rem;
  margin: 0 auto;
  border-radius: 0.27rem;
  box-shadow: 0 0.06rem 0.16rem 0 rgba(86, 81, 59, 0.08);
}
.backImg {
  position: absolute;
  width: 100%;
  height: 3.88rem;
  top: 0;
  left: 0.4rem;
}
.backvideo {
  position: absolute;
  width: 100%;
  height: 3.88rem;
  top: 0;
  left: 0rem;
}
.preImg {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.3rem;
  left: 0.2rem;
}
.course-details {
  margin-top: 0.2rem;
}
.buybus {
  font-size: 0.28rem;
  color: rgba(242, 200, 28, 1);
  padding: 0.06rem 0.16rem;
  border: 1px solid rgba(242, 200, 28, 1);
  border-radius: 0.4rem;
  margin-left: 2.7rem;
}
.detail-tit {
  font-size: 0.3rem;
  color: rgba(0, 0, 0, 1);
  line-height: 0.3rem;
  margin: 0.2rem 0.6rem;
}
.detail-des {
  font-size: 0.24rem;
  font-weight: 150;
  color: rgba(80, 80, 80, 1);
  line-height: 0.38rem;
  margin: 0.06rem 0.6rem;
}
.jieshao {
  font-size: 0.28rem;
  font-weight: 250;
  color: rgba(0, 190, 240, 1);
  line-height: 0.4rem;
  margin: 0.1rem 0.6rem;
}
.buy-pers {
  font-size: 0.22rem;
  color: rgba(172, 172, 172, 1);
  margin: 0.04rem 0.6rem;
}
.onebarback {
  width: 6.2rem;
  height: 2.6rem;
  background: rgba(120, 232, 205, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2rem auto;
  position: relative;
}
.oneback {
  width: 5.4rem;
  height: 2.06rem;
  position: absolute;
  top: 0.4rem;
  left: 0.28rem;
}
.fixedbar {
  width: 100%;
  height: 1.2rem;
  background: rgba(250, 250, 250, 1);
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
}
.collectiondiv {
  margin-left: 10%;
}
.collectionmiddiv {
  margin: 0 auto;
}
.collection {
  width: 0.34rem;
  height: 0.32rem;
}
.collecttit {
  font-size: 0.22rem;
  font-weight: 250;
  color: rgba(60, 60, 60, 1);
}
.sub {
  background: #e84729;
  padding: 0.1rem 0.8rem;
  border-radius: 0.4rem;
  font-size: 0.3rem;
  font-weight: 250;
  color: rgba(255, 255, 255, 1);
  margin-left: 23%;
}
.detail-title {
  line-height: 1;
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  margin: 0.26rem 0 0.19rem 0;
}
.icon-all {
  display: flex;
  margin-bottom: 0.27rem;
  justify-content: center;
}
.icon {
  width: 1.19rem;
  height: 0.34rem;
  background: rgba(29, 169, 255, 0.15);
  border-radius: 0.06rem;
  font-size: 0.21rem;
  font-weight: 500;
  color: rgba(29, 169, 255, 1);
  text-align: center;
  line-height: 0.34rem;
  margin-right: 0.2rem;
}
.audio-show-time {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.43);
  line-height: 1;
  margin-top: 0.2rem;
}
.audio-control {
  margin-top: 0.26rem;
  margin-bottom: 0.51rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.audio-play {
  width: 0.96rem;
  height: 0.96rem;
}
.audio-control-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.audio-pre,
.audio-next {
  width: 0.46rem;
  height: 0.46rem;
  position: absolute;
}
.audio-pre {
  left: -1.12rem;
}
.audio-next {
  left: 1.62rem;
}
.audio-lists > img {
  width: 0.46rem;
  display: block;
}
.audio-hidelists {
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 1); */
  position: fixed;
  transition: all 0.5s linear;
  z-index: -1;
}
.audio-hidelists > div {
  width: 7.5rem;
  height: 7.85rem;
  position: absolute;
  bottom: -7.85rem;
  background: rgba(250, 250, 250, 1);
  box-shadow: 0 -0.6rem 0.43rem 0 rgba(67, 67, 67, 0.14);
  border-radius: 0.26rem 0.26rem 0 0;
  font-size: 0.28rem;
  transition: all 0.05s linear;
}
.audio-hidelists > div.audio-hidelistsDivShow {
  bottom: 0;
}
.audio-hidelists-show {
  top: 0;
  z-index: 999;
  display: block;
  background: rgba(0, 0, 0, 0.2);
}
.listShow-item {
  color: rgba(17, 17, 17, 1);
}
.item-title {
  height: 1.08rem;
  border-bottom: 0.02rem solid rgba(0, 0, 0, 0.06);
  margin-right: 0.36rem;
  padding-left: 0.36rem;
  font-weight: bold;
  color: rgba(34, 34, 34, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
}
.listShow-item .item {
  width: 100%;
  border-bottom: 0.02rem solid rgba(0, 0, 0, 0.06);
  position: relative;
  height: 1.06rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.free-btn {
  width: 0.6rem;
  height: 0.36rem;
  background: rgba(255, 209, 0, 1);
  border-radius: 0.08rem;
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}
.item-state > img {
  display: block;
  width: 0.26rem;
  height: 0.3rem;
  margin-right: 0.13rem;
}
.no-more {
  width: 1.15rem;
  position: absolute;
  bottom: -0.47rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.24rem;
  font-weight: 500;
  color: rgba(34, 34, 34, 0.4);
}
.btn-close {
  height: 1.3rem;
  width: 100%;
  font-size: 0.32rem;
  color: rgba(34, 34, 34, 1);
  border-top: 0.02rem solid rgba(0, 0, 0, 0.06);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.items {
  height: 5.45rem;
  overflow: scroll;
  flex-wrap: wrap;
  padding: 0 0.36rem 1.12rem;
}
.play-over {
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(255, 209, 0, 1);
}
.now-listen {
  color: rgba(255, 209, 0, 1);
}
.has-read {
  color: rgba(0, 0, 0, 0.6);
}
.item-name {
  width: 5.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.course-bar-scroll{
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.Sticky{
  position: sticky;
  top: -2px;
  z-index: 500;
}
</style>
