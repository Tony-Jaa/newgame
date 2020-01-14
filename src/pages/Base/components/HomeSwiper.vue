<template>
  <div style="width:100%">
    <!-- <vanSwipe :list="swiper_list" :auto="true" @on-index-change="changeIndex"  :show-desc-mask="false" :loop="loopShow"></vanSwipe> -->
    <vanSwipe auto  :show-dots="true" :width='swiperWidth'>
      <vanSwipeItem v-for="(item, index) in swiper_list" :key="index">
        <img @click="clickBanner(index)" style="width:6.78rem;display: block;" :src="item.img" alt />
      </vanSwipeItem>
    </vanSwipe>
  </div>
</template>

<script>
// import { Swiper, SwiperItem } from "vux";
import { Swipe, SwipeItem } from "vant";
import serviceApi from '../../../service/Base/serviceConfig'

export default {
  components: {
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem,
  },
  data() {
    return {
      swiper_list: [],
      swiper_index: 0,
      swiperItemIndex: 0,
      loopShow: true,
      swiperData: [],
      swiperWidth:295
    };
  },
  mounted() {
    this.swiperWidth = document.body.offsetWidth*0.7867
    this.getSwiperInfo();
  },
  methods: {
    swiperChange(index) {
      this.swiper_index = index;
    },
    getSwiperInfo() {
      let _this = this;
      this.$http.get(serviceApi.getList).then(res => {
        if (res && res.data && res.data.data) {
          let swiperImgs = res.data.data;
          for (let i = 0; i < swiperImgs.length; i++) {
            if (swiperImgs[i].status == 1) {
              let objSwiper = {
                url: "javascript:;",
                img: swiperImgs[i].imgUrl
              };
              _this.swiperData.push(swiperImgs[i]);
              _this.swiper_list.push(objSwiper);
            }
          }
        }
      });
    },
    clickBanner(index) {
      let data = this.swiperData[index];
      if (data.linkType == 0) {
        // 无链接
        return;
      }
      if (data.linkType == 1) {
        // 跳转课程
        this.tocourseDetails(data.linkUrl);
        return;
      }
      if (data.linkType == 2) {
        // 跳转资源页
        this.toResDetail(data.linkUrl);
        return;
      }
      if (data.linkType == 3) {
        // 推广
        this.getApplyLevel();
        return;
      }
      if (data.linkType == 4) {
        // VIP
        let isVip = sessionStorage.getItem("isvip");
        if (isVip == "1") {
          let endTime = sessionStorage.getItem("endTime");
          this.$router.push({
            name: "thevip",
            query: { endtime: endTime }
          });
        } else {
          console.log("不是VIP");
          let phoneNum = data.propCode;
          this.$router.push({ path: `/xzvip/${phoneNum}` });
        }
        return;
      }
      if (data.linkType == 5) {
        // 海报页
        let imgurl = data.linkUrl;
        this.$router.push({ name: "poster", query: { imgurl: imgurl } });
      }
    },
    // 跳转课程
    tocourseDetails(id) {
      let url = `/courseDetails/${id}/false`;
      this.$router.push({ path: url });
    },
    // 跳转资源
    toResDetail(id) {
      let _this = this;
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      this.$http
        .get(`${serviceApi.getResourceInfo}?id=${id}&userId=${userId}`)
        .then(res => {
          if (res && res.data && res.data.obj) {
            if (res.data.obj.typeValue == "音频") {
              _this.$router.push({ path: `/audiodetails/${id}` });
            } else if (res.data.obj.typeValue == "视频") {
              _this.$router.push({ path: `/videodetails/${id}` });
            } else if (res.data.obj.typeValue == "图文") {
              _this.$router.push({ path: `/pictextdetails/${id}` });
            }
          }
        });
    },
    getApplyLevel() {
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      this.$http
        .get(serviceApi.getPromoterBasicInfo, {
          params: {
            userId: userId
          }
        })
        .then(res => {
          if (res && res.data) {
            if (!res.data.resultMap) {
              this.$router.push({ name: "applypro" });
            } else {
              this.$toast("您已经是推广员");
            }
          }
        });
    },
    toaathis() {
      this.$router.push({
        name: "aathis"
      });
    }
  }
};
</script>

<style scoped>
.copyright {
     font-size: 0.24rem;
     color: #ccc;
     text-align: center;
}
 .text-scroll {
     border: 1px solid #ddd;
     border-left: none;
     border-right: none;
}
 .text-scroll p {
     font-size: 0.24rem;
     text-align: center;
     line-height: 0.6rem;
}
 .black {
     background-color: #000;
}
 .title {
     line-height: 2rem;
     text-align: center;
     color: #fff;
}
 .animated {
     animation-duration: 1s;
     animation-fill-mode: both;
}
 .vux-indicator.custom-bottom {
     bottom: 0.6rem;
}
 @-webkit-keyframes fadeInUp {
     from {
         opacity: 0;
         transform: translate3d(0, 100%, 0);
    }
     100% {
         opacity: 1;
         transform: none;
    }
}
 @keyframes fadeInUp {
     from {
         opacity: 0;
         transform: translate3d(0, 100%, 0);
    }
     100% {
         opacity: 1;
         transform: none;
    }
}
 .fadeInUp {
     animation-name: fadeInUp;
}
 .swiper-demo-img img {
     width: 100%;
}
</style>
<style>
#home .vux-slider .vux-indicator-right{
    bottom: 0;
    line-height: 1;
  }
</style>