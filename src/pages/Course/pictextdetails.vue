<template>
  <div
    id="coursedetail"
    class="main-wrap"
    style="background:#FAFAFA;width: 100%;height: 100%;overflow: scroll"
  >
    <div class="detailback">
      <img class="detailbackImg" :src="resultMap.courseBanner" />
    </div>

    <div class="course-details">
      <div class="detail-tit">{{resultMap.name}}</div>
      <div>
        <div class="detail-des">{{resultMap.subtitle}}</div>
      </div>
    </div>

    <div class="course-bar">
      <!-- <van- :line-width="1" :custom-bar-width="getBarWidth" active-color="rgba(242, 200, 28, 1)">
        <tab-item selected @on-item-click="tabcheck">详情</tab-item>
        <tab-item @on-item-click="tabcheck">评论</tab-item>
      </tab>-->
      <van-tabs v-model="tabindex" :line-width="'0.39rem'" :sticky="true">
        <van-tab class="remark" title="课程详情" :name="0">
          <div v-show="tabindex == 0">
            <div class="detaildiv" style="height:auto;overflow:scroll">
              <div class="detailback" v-for="(item, index) in uploadurl" :key="index">
                <img :src="item" class="RemarkImg" />
              </div>
              <div v-if="uploadurl.length<=0" style="margin:2rem auto;width:6rem;height:3.48rem">
                <img
                  src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/nulldata.png"
                  class="nulldata"
                />
                <div class="nulltext">暂无数据</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="课程列表" :name="1">
          <div v-show="tabindex == 1" style="margin-bottom:1.2rem;overflow:scroll">
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
            <div v-if="commentlist.length<=0" style="margin:2rem auto;width:6rem;height:3.48rem">
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

    <div class="fixedbar">
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
    </div>
    <div style="font-size:0.32rem">
      <!-- <toast v-model="showcollect" text="评论成功"></toast>
      <toast v-model="showfail" :text="failtext" type="warn"></toast>-->
    </div>
  </div>
</template>

<i18n>
  set bar-active-color:rgba(242, 200, 28, 1)
  zh-CN: rgba(242, 200, 28, 1)
</i18n>

<script>
// import { Swiper, SwiperItem, Tab, TabItem, Toast } from "vux";
import serviceApi from "../../service/Course/serviceConfig";

let _this;
export default {
  name: "pictextdetails",
  data() {
    return {
      demo_index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      tabindex: 0,
      commentflag: false,
      id: "",
      courselist: [],
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
      // showcollect: false,
      collecttext: "",
      commentlist: [],
      isbuyflag: false,
      nickName: "",
      failtext: "",
      uploadurl: []
    };
  },
  components: {
    // Swiper,
    // SwiperItem,
    // Tab,
    // TabItem,
    // Toast
  },
  mounted: function() {
    _this = this;
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.nickName = JSON.parse(userWechatInfo).nickName;
    this.id = this.$route.params.id;
    this.getDetails();
    this.pageComment();
    this.isBuy();
  },
  methods: {
    isBuy() {
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
              // console.log(_this.isbuyflag, "_this.isbuyflag");
            }
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;
          _this.$toast("服务器失败")
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
    demo_onIndexChange(index) {
      this.demo_index = index;
    },
    comment() {
      this.commentflag = !this.commentflag;
    },
    subcomment() {
      if (!this.userId) {
        // this.showfail = true;
        this.$toast("请先关注微信公共号")
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
          // console.log(response, "response");
          if (response.data.status == "00") {
            _this.content = "";
            // _this.collecttext = "提交成功";
            _this.$toast("提交成功")
            // _this.showcollect = true;

            _this.pageComment();

            _this.commentflag = false;
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;
          _this.$toast("服务器失败")
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
      this.$http({
        method: "get",
        url: `${serviceApi.getInfo}?id=${this.id}&userId=${this.userId}&courseId=${this.$route.query.courseId}`
      })
        .then(function(response) {
          if (response.data.status == "00") {
            if (response.data.obj) {
              _this.toShare(response.data.obj.costPrice, response.data.obj.id);
              _this.resultMap = response.data.obj;
              // console.log("课程详情", response.data.obj);
              let uploadurl = [];
              if (response.data.obj.uploadUrl) {
                uploadurl = response.data.obj.uploadUrl.split(",");
              }
              _this.uploadurl = uploadurl;
              console.log(_this.uploadurl, "uploadurl");
            }
          }
        })
        .catch(err => {
          console.log(err);
          // _this.showfail = true;
          _this.$toast("服务器失败");
        });
    },
    toShare(fee, id) {
      if (fee) {
        // 价格不为0
        this.geDetailtId(id);
      } else {
        let link = window.location.href.split("#")[1];
        this.handleShare(link);
      }
    },
    geDetailtId(id) {
      let _this = this;
      this.$http
        .get(serviceApi.getCourseIdByResId, {
          params: { id: id }
        })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.data[0]) {
            let courseId = res.data.data[0].courseId;
            let link = `/courseDetails/${courseId}/false`;
            _this.handleShare(link);
          }
        });
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
              desc: "一个更懂宝宝的教育平台", // 分享描述
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
    pageComment() {
      const params = {
        page: 1,
        rows: 999,
        courseId: this.id
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
          _this.$toast("服务器失败");
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.vux-tab .vux-tab-item.vux-tab-selected {
  color: rgba(242, 200, 28, 1) !important;
}

.vux-tab-bar-inner {
  display: block;
  background-color: rgba(242, 200, 28, 1) !important;
}

.yuan {
  width: 0.26rem;
  height: 0.26rem;
  padding-left: 0.1rem;
  line-height: 0.4rem;
  padding-top: 0.06rem;
}
.hand {
  width: 0.48rem;
  height: 0.66rem;
  position: absolute;
  bottom: 0.2rem;
  right: 1.6rem;
}
.detailback {
  position: relative;
  display: flex;
  .RemarkImg {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
.seedetail {
  position: absolute;
  bottom: 0.6rem;
  right: 0.4rem;
  width: 1.8rem;
  height: 0.4rem;
  background: rgba(232, 71, 41, 1);
  border: 0.04rem solid rgba(255, 255, 255, 1);
  border-radius: 0.34rem;
  font-size: 0.2rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.3rem;
  display: flex;
  justify-content: center;
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
.detailbackImg {
  width: 100%;
  height: 3.88rem;
  margin: 0 auto;
}
.inputcomment {
  width: 60%;
  height: 0.6rem;
  border-radius: 0.3rem;
  margin-left: 0.4rem;
  border: 0.02rem solid #eee;
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
  border: 0.02rem solid #fdd000;
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
  margin: 0.2rem 0.4rem;
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
</style>
