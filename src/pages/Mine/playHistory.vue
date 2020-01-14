<template>
  <div ref="palyold" class="palyold" >
    <van-list
   class="palyold-list"
  v-model="loading"
  :offset='100'
  :finished="finished"
  finished-text="没有更多了"
  @load="getHistory(mySqlOffset)"
>
<div
        @click="toDetail(item)"
        v-for="(item, index) in historyList"
        :class="[item.audienceType==1?'child-style':'man-style']"
        :key="index"
        class="palyold-list-item"
      >
      
        <div class="palyold-list-left">
          <img :src="item.listImage" alt />
        </div>
        <div class="palyold-list-right">
          <p>{{item.title}}</p>
          <div class="palyold-list-right-s">
            <img
              v-if="item.resourceTypeText=='音频'"
              src="../../assets/images/coursebar/audio-read.png"
              alt
            />
            <img
              v-if="item.resourceTypeText=='视频'"
              src="../../assets/images/coursebar/video-read.png"
              alt
            />
            <span>{{item.resourceName}}</span>
          </div>
          <div class="palyold-time">
            <div class="palyold-time-s">
              <img src="../../assets/images/coursebar/time-icon.png" alt />
              <span>{{optionTimes(item.watchDuration)}}</span>
            </div>
            <span v-if="item.watchProgress==100" class="palyold-time-span">已播完</span>
            <span v-if="item.watchProgress!=100" class="palyold-time-span">已播放{{item.watchProgress}}%</span>
          </div>
        </div>
      </div>
    </van-list>
    <div class="palyold-list">
      
    </div>
  </div>
</template>

<script>
import { List , Loading } from 'vant';
import serviceApi from '../../service/Mine/serviceConfig';
export default {
  data() {
    return {
      userId: "",
      historyList: [],
      mySqlOffset: 0,
      loading: false,
      finished: false,
      loadingTip: "上拉加载更多",
      LoadMoreShow:true
    };
  },
  components: {
    vanLoading:Loading,
    vanList:List
  },
  mounted() {
    document.title = "播放历史";
    this.userId = this.$store.state.userInfo.id || JSON.parse(localStorage.getItem('userWechatInfo')).id;
    // this.getHistory();
  },
  methods: {
    async getHistory(mySqlOffset = 0) {
      let userId = this.userId;
      console.log(mySqlOffset)
      let res = await this.$http.get(
        serviceApi.mybrowsecourselog,
        {
          params: {
            userId,
            mySqlOffset: mySqlOffset * 10,
            rows: 10
          }
        }
      );
      if (res && res.data.status == "00") {
        if (res.data.data.length > 0) {
          this.mySqlOffset++;
          this.historyList.push(...res.data.data);
          this.loading = false;
          this.loadingTip = "上拉加载更多"
          if(res.data.data.length<10){
            this.finished = true
          }
        } else {
          if (this.historyList.length == 0) {
            this.loadingTip = "您还没有浏览记录哦!";
            this.$toast("您还没有浏览记录哦!");
            setTimeout(() => {
              if (this.$route.name == "playHistory") {
                this.$router.back();
              }
            }, 500);
          } else {
            this.LoadMoreShow = false
            this.loading=false
            this.finished = true
            this.$toast("没有更多了!");
          }
        }
      }
    },
    // 加载更多
    lazyLoading() {
      // 滚动到底部，再加载的处理事件
      let clientHeight = document.body.clientHeight;
      let allHeight = this.$refs.palyold.clientHeight;
      let scrollHeight = document.getElementById("app").scrollTop;
      if (scrollHeight + clientHeight >= allHeight - 25 && !this.loading) {
        // 滑动到底部
        this.loading = true;
        this.getHistory(this.mySqlOffset);
      }
    },
    // 去课程详情页
    toDetail(info) {
      if (info.resourceTypeText == "视频") {
        this.$router.push({
          name: "courseDetails",
          params: {
            id: info.courseId,
            fromvip: false
          },
          query: {
            autoId: info.resourcesId
          }
        });
      } else if (info.resourceTypeText == "音频") {
        this.$router.push({
          name: "courseDetails",
          params: {
            id: info.courseId,
            fromvip: false
          },
          query: {
            autoId: info.resourcesId
          }
        });
      } else if (info.resourceTypeText == "图文") {
        this.$router.push({
          name: "pictextdetails",
          params: { id: info.resourcesId },
          query: { courseId: info.courseId }
        });
      }
    },
    // 时间格式化
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

  }
};
</script>

<style lang="less" scoped>
.palyold {
  font-size: 40%;
  .palyold-list {
    padding: 0 0.36rem;
  }
  .palyold-list-item {
    margin-top: 0.33rem;
    background: #fff;
    box-shadow: 0 0.08rem 0.46rem 0 rgba(86, 81, 59, 0.03);
    border-radius: 0.24rem;
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  .palyold-list-left {
     width: 2rem;
      height: 1.88rem;
    display: flex;
    align-items: center;
    margin-left: -0.03rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: .3rem;
    }
  }
  .palyold-list-right {
    width: 67%;
    display: flex;
    flex-direction: column;
    p {
      font-size: 0.32rem;
      font-weight: bold;
      color: rgba(17, 17, 17, 1);
      line-height: 0.63rem;
    }
  }
  .palyold-list-right-s {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1;
    margin-top: .15rem;
    img {
      width: 0.31rem;
      height: 0.31rem;
      margin-right: 0.1rem;
    }
    span{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
  .palyold-time {
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
  .palyold-time-s {
    display: flex;
    align-items: center;
    margin-right: 0.18rem;
    color: rgba(0, 0, 0, 0.5);
    img {
      width: 0.22rem;
      height: 0.22rem;
      margin-right: 0.07rem;
    }
  }
  .palyold-time-span {
    color: rgba(255, 209, 0, 0.9);
  }
  .loading{
    display: flex;
    justify-content: center;
  }
}
.child-style {
  border: 0.11rem solid rgba(255, 209, 0, 1) ;
  box-sizing: content-box;
  border-radius: 0.36rem !important;
  // margin-top: 1rem !important;
}
.man-style {
  border: 0.11rem solid rgba(79, 185, 252, 1);
  box-sizing: content-box;
  border-radius: 0.36rem !important;
  // margin-top: 1rem !important;
}
// .child-style::before {
//   content: "宝宝课堂";
//   display: block;
//   position: absolute;
//   left: -0.11rem;
//   top: -0.68rem;
//   width: 2.08rem;
//   height: 0.68rem;
//   background: rgba(80, 187, 255, 1);
//   color: #fff;
//   text-align: center;
//   line-height: 0.68rem;
//   border-radius: 0.36rem 0.36rem 0 0;
//   font-size: 0.32rem;
// }
// .child-style::after {
//   content: "";
//   display: block;
//   width: 0.1rem;
//   height: 0.2rem;
//   background: rgba(80, 187, 255, 1);
//   position: absolute;
//   left: -0.11rem;
//   top: 0;
// }

</style>