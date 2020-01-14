<template>
  <div
    id="coursedetail"
    class="main-wrap"
    style="background:#FAFAFA;width: 100%;height: 100%;overflow: scroll;z-index:999"
  >
    <div class="detailback">
      <!-- <img class="detailbackImg" :src="resultMap.cover" /> -->
      <!-- <video
        class="backvideo"
        controls
        poster="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/backImg.png"
      >
        <source src="movie.mp4" type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />您的浏览器不支持 HTML5 video 标签。
      </video>-->
      <div style="width:100%;height:3.89rem;overflow:hidden;font-size:0.36rem">
        <div
          class="prism-player backvideo"
          id="J_prismPlayer"
          style="width:100%;height:3.89rem;overflow:hidden;font-size:0.36rem;z-index:10;"
        ></div>
        <div
          v-if="false"
          style="display:flex;width:100%;height:100%;position: relative;
              z-index: 22;background: black;align-items:center;justify-items:center;flex-direction: column;
    justify-content: center;font-size: 0.28rem;color: rgba(255, 209, 0, .8);"
        >
          <span>加载中,请稍等</span>
        </div>
      </div>
    </div>
    <!-- <div class="course-details">
      <div class="detail-tit">{{resultMap.title}}</div>
      <div>
        <div class="detail-des">{{resultMap.describes}}</div>
      </div>
    </div>-->

    <div class="course-bar">
      <!-- <tab :line-width="1" :custom-bar-width="getBarWidth" active-color="rgba(242, 200, 28, 1)">
        <tab-item selected @on-item-click="tabcheck">视频</tab-item>
        <tab-item @on-item-click="tabcheck">社群</tab-item>
      </tab>-->

      <van-tabs v-model="active" :line-width="1" :custom-bar-width="getBarWidth">
        <van-tab title="视频" :name='0'>
          <div >
            <div class="detaildiv" style="height:auto;overflow:scroll;background: #fff;">
              <div class="video-title-show">
                <p class="video-title">{{resultMap.name}}</p>
                <img  @click="$toast({message: '点击右上角分享',icon: 'share'})" src="../../../assets/images/coursebar/share.png" alt />
              </div>
              <div v-if="resultMap.label" class="icon-all">
                <div class="icon">{{resultMap.label}}</div>
              </div>
              <div class="course-list">
                <h4>课程列表</h4>
                <div
                  @click="changeVideo(item,index)"
                  v-for="(item, index) in courselist"
                  :key="index"
                  class="course-item"
                >
                  <div style="display:flex">
                    <img
                      v-if="item.id!==id&&!item.watchDuration>0"
                      src="../../../assets/images/coursebar/video.png"
                      alt
                    />
                    <img
                      v-if="item.id!==id&&item.watchDuration>0"
                      src="../../../assets/images/coursebar/video-read.png"
                      alt
                    />
                    <img v-if="item.id===id" src="../../../assets/images/coursebar/now.png" alt />
                    <p
                      class="course-title"
                      :class="[item.id===id?'active':item.watchDuration>0?'has-view':'']"
                    >{{item.name}}</p>
                  </div>
                  <div>
                    <div v-if="item.chargingStandard == 2&&vip==0" class="free-btn">试看</div>
                    <div v-if="item.chargingStandard==100&&vip==1" class="play-over">已播完</div>
                    <div
                      v-if="item.chargingStandard == 2&&vip==1&&item.watchProgress>0"
                      class="play-over"
                    >播放{{item.watchProgress}}%</div>
                    <img
                      style="width:0.26rem;height:.3rem;position: relative;left:-0.04rem;"
                      v-if="item.chargingStandard == 1"
                      src="../../../assets/images/coursebar/lock.png"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="社群" :name='1'>
          <div
            style="margin-bottom:2.3rem;overflow:scroll;background: #fff;"
          >
            <div class="comment-item" v-for="(item,i) in commentlist" :key="i">
              <div class="commentdiv">
                <div class="avtardiv">
                  <img :src="item.imageUrl" class="avtar" />
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
        </van-tab>
      </van-tabs>
    </div>
    <coursebar
      :isvideo="true"
      @addComment="addComment"
      :showComment="videoShow"
      :playing="playing"
      @shiting="$emit('shiting')"
      @handle="$emit('handle')"
      :result-map="result"
    ></coursebar>
    <!--  <div class="fixedbar">
      <div class="collectiondiv" v-if="!commentflag" @click="commentclick">
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
      <!-- <toast v-model="showcollect" text="评论成功"></toast>
      <toast v-model="showfail" :text="failtext" type="warn"></toast>-->
    </div>
  </div>
</template>



<script>
// import { Swiper, SwiperItem, Tab, TabItem, Toast } from "vux";
import serviceApi from "../../../service/Course/serviceConfig";
import coursebar from "./coursebar";

let _this;
export default {
  name: "videodetails",
  data() {
    return {
      demo_index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      active:0,
      tabindex: 0,
      commentflag: false,
      isError: false,
      load: true,
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
      comment: "",
      collecttext: "",
      commentlist: [],
      isbuyflag: false,
      nickName: "",
      playUrl: "",
      // failtext: "",
      showfail: false,
      uploadurl: [],
      player: {},
      videoInfo: {
        allTimeIt: 0, //总时长秒数,未格式化
        allTime: "00:00", //总时长格式化后
        playingTime: "00:00", //当前播放秒数
        playingTimeIt: 0 //当前播放秒数，未格式化
      }
    };
  },
  watch: {
    id: function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      if (!oldValue) {
      } else {
        this.addPlayRecord(oldValue);
      }
      this.getDetails();
      this.pageComment();
      this.isBuy();
      // this.getPlayInfo();
    }
  },
  props: [
    "id",
    "courseId",
    "videoIndex",
    "courselist",
    "videoShow",
    "result",
    "playing"
  ],
  components: {
    // Swiper,
    // SwiperItem,
    // Tab,
    // TabItem,
    // Toast,
    coursebar
  },
  computed: {
    vip() {
      return this.$store.state.userInfo.vip;
    }
  },
  mounted() {
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.nickName = userWechatInfo ? JSON.parse(userWechatInfo).nickName : "";
  },
  // 生命周期钩子函数：销毁
  destroyed() {
    let play = this.player;
    this.addPlayRecord(this.id);
    let len = Object.keys(play);
    if (!len) return;
    // 销毁播放器
    play.dispose();
  },
  methods: {
    isBuy() {
      let _this = this;
      const data = {
        courseId: this.id,
        userId: this.userId
      };
      this.$http({
        method: "post",
        url: `${serviceApi.isBuy}`,
        data: data
      })
        .then(function(response) {
          if (response.data.status == "00") {
            if (response.data.obj) {
              _this.isbuyflag = response.data.obj;
            }
          } else {
            _this.$toast(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          _this.$toast("服务器异常");
        });
    },
    toback() {
      if (window.history.length == 1 || window.history.length == 2) {
        // 1:分享链接进入 2：首页链接快速进入
        this.getCourseIdByResIdToBack();
      } else {
        this.$router.back(-1);
      }
    },
    getDetails() {
      let _this = this;
      this.$http({
        method: "get",
        url: `${serviceApi.getInfo}?id=` + this.id + "&userId=" + this.userId,
        timeout: 1000
      })
        .then(function(response) {
          if (response.data.status == "00") {
            if (response.data.obj) {
              _this.toShare(response.data.obj.costPrice, response.data.obj.id);
              _this.resultMap = response.data.obj;
              document.title = _this.resultMap.name;
              _this.getPlayInfo(response.data.obj.ossId);
              let uploadurl = [];
              if (response.data.obj.uploadUrl) {
                uploadurl = response.data.obj.uploadUrl.split(",");
              }
              _this.uploadurl = uploadurl;
            }
          } else {
            _this.$toast(response.data.msg);
            // _this.failtext = response.data.msg;
          }
        })
        .catch(err => {
          console.log(err);
          _this.$toast("服务器异常");
          // _this.failtext = "服务器异常";
        });
    },
    pageComment() {
      let _this = this;
      const params = {
        page: 1,
        rows: 999,
        courseId: this.id
      };
      this.$http({
        method: "post",
        url: `${serviceApi.pageComment}`,
        params: params,
        timeout: 1000
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.commentlist = response.data.resultMap.rows;
          }
        })
        .catch(err => {
          _this.$toast("服务器异常");
        });
    },
    subcomment() {
      let _this = this;
      if (!this.userId) {
        this.$toast("请先关注微信公共号");
        return false;
      }
      const params = {
        courseId: this.id,
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
          } else {
            _this.$toast("提交失败");
          }
        })
        .catch(err => {
          console.log(err);
          _this.$toast("服务器异常");
        });
    },
    demo_onIndexChange(index) {
      this.demo_index = index;
    },
    commentclick() {
      this.commentflag = !this.commentflag;
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
    getPlayInfo(ossId) {
      const _this = this;
      _this.load = true;
      _this.isError = false;
      const params = {
        userId: this.userId,
        resourceId: this.id
      };
      this.$http({
        method: "get",
        url: `${serviceApi.getVideoPlayAuth}`,
        params: params
      })
        .then(function(resp) {
          if (resp.data.status == "00") {
            if (resp.data.obj) {
              _this.player && _this.player.player && _this.player.dispose();
              document.getElementById("J_prismPlayer").innerHTML = "";
              _this.player = new Aliplayer(
                {
                  id: "J_prismPlayer",
                  autoplay: false, //是否自动播放
                  preload: true, //播放器自动加载
                  rePlay: false,
                  playsinline: true,
                  width: "100%",
                  videoWidth: "100%",
                  height: "100%",
                  mediaType: "video",
                  format: "mp4",
                  //支持播放地址播放,此播放优先级最高
                  // source: _this.playUrl,
                  //播放方式二：点播用户推荐
                  vid: resp.data.obj.videoMeta.videoId,
                  playauth: resp.data.obj.playAuth,
                  cover: resp.data.obj.videoMeta.coverURL
                },
                function(player) {
                  player.on("ready", _this.videoReady);
                  console.log("播放器创建好了。");
                }
              );

              _this.player.on("ready", function(r) {
                console.log("readye", r);
                _this.player.play();
                if (_this.isError == false && _this.load == true) {
                  _this.load = false;
                }
              });
              _this.player.on("canplay", function(c) {
                console.log("canplay", c);
              });
              _this.player.on("error", function(e) {
                //  _this.showfail = true;
                console.log(e.paramData.display_msg);
                // _this.failtext =  e.paramData.display_msg;
                _this.isError = true;
                _this.$toast(e.paramData.display_msg);

                console.log("error", JSON.stringify(e));
                // _this.getPlayInfo();
              });
            }
          } else {
            _this.showfail = true;
            _this.$toast(resp.data.msg);
            // _this.failtext = resp.data.msg;
          }
        })
        .catch(err => {
          console.log(err);
          _this.showfail = true;
          _this.$toast("服务器异常");
        });
    },
    videoReady() {
      let player = this.player;
      player.on("play", this.videoPlay);
    },
    videoPlay() {
      let player = this.player;
      console.log(this.courselist[this.videoIndex].watchDuration);
      // setTimeout(() => {
      //   player.seek(
      //     this.courselist[this.videoIndex].watchDuration
      //   )
      // }, 100);
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
          this.id;
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
                document.getElementsByClassName("outter")[0].click();
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
                console.log("分享设置成功");
              }
            });
          });
        }
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
    addPlayRecord(id) {
      let play = this.player;
      if(!play) return
      let playingTimeIt = Math.floor(play.getCurrentTime());
      if (playingTimeIt == 0) return;
      this.$http
        .post(serviceApi.save, {
          userId: this.userId,
          courseId: this.courseId,
          resourcesId: id,
          watchDuration: String(playingTimeIt)
        })
        .then(res => {
          if (res && res.data && res.data.status == "00") {
            console.log("播放记录保存成功");
          }
        });
    },
    changeVideo(item, index) {
      this.$emit("changeVideo", { item, index });
    },
    addComment(data) {
      this.content = data;
      this.subcomment();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.van-tabs__line{
 background-color: #ffd100;
 width: .39rem !important;
}
.prism-ErrorMessage {
  display: none !important;
}
.prism-big-play-btn {
  left: 50% !important;
  margin-left: -32px !important;
}
</style>
<style scoped>
/* .vux-tab .vux-tab-item.vux-tab-selected {
  font-size: 0.3rem !important;
  color: #191919 !important;
  font-weight: bold;
} */
.van-tab {
  font-size: 0.3rem !important;
  color: #191919 !important;
  font-weight: bold;
}

.vux-tab-bar-inner {
  display: block;
  background-color: rgba(242, 200, 28, 1) !important;
}

.inputcomment {
  width: 60%;
  height: 0.6rem;
  border-radius: 0.3rem;
  margin-left: 0.4rem;
  border: 0.02rem solid #eee;
  padding-left: 0.2rem;
}
.RemarkImg {
  width: 100%;
  height: 100%;
  display: block;
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
  border: 0.02rem solid #fdd000;
  font-size: 0.24rem;
  color: rgba(250, 250, 250, 1);
  text-align: center;
  line-height: 0.6rem;
  margin-left: 0.4rem;
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
  padding: 0.56rem 0.36rem 2rem;
}
.detailtit {
  font-size: 0.28rem;
  font-weight: 250;
  color: rgba(0, 190, 240, 1);
  line-height: 0.3rem;
}
.detailcontent {
  font-size: 0.24rem;
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
  height: 3.89rem;
  display: block;
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
  border: 0.02rem solid rgba(242, 200, 28, 1);
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
#J_prismPlayer /deep/ .prism-player /deep/ .prism-big-play-btn {
  left: 40% !important;
}
.video-title-show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.09rem;
}
.video-title-show > img {
  width: 0.54rem;
  position: relative;
  left: 0.05rem;
}
.video-title {
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 1;
}
.icon-all {
  display: flex;
  margin-bottom: 0.5rem;
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
.course-list > h4 {
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(1, 1, 1, 0.7);
  margin-bottom: 0.22rem;
}
.course-item {
  height: 0.84rem;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 0.08rem;
  font-size: 0.28rem;
  color: rgba(17, 17, 17, 1);
  padding: 0 0.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  margin-bottom: 0.14rem;
}
.course-item img {
  width: 0.34rem;
  height: 0.34rem;
  display: block;
}
.course-title {
  margin-left: 0.18rem;
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
.play-over {
  font-size: 0.22rem;
  font-weight: 500;
  color: rgba(255, 209, 0, 1);
}
.active {
  color: rgba(255, 209, 0, 1);
}
.has-view {
  color: rgba(0, 0, 0, 0.6);
}
</style>
