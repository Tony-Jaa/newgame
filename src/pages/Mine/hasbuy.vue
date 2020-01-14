<template>
  <div style="width:100%;background:#fafafa;position: absolute;height: 100%;">
    <div class="course-item-wrap" style="background:#fafafa;" v-if="hasData>0 && show">
      <div
        class="course-item"
        v-for="(item,i) in courselists"
        :key="i"
        :class="[i==0?'child-style':'man-style']"
        v-show="item.length>0"
      >
        <img
          :class="[i==0?'':'display']"
          class="home-child"
          src="../../assets/images/firstHome/home-child.png"
          alt
        />
        <div
          v-for="items in item"
          :key="items.id"
          @click="goclass(items.courseId)"
          :class="[i==0?'child':'man']"
        >
          <div class="item-img">
            <img class="course-image" :src="items.listImage" />
            <!-- <img
            class="listen-image"
            src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/listen.png"
            @click="godetail(item.id)"
            />-->
            <!-- <div class="free-listen" @click="godetail(item.id)">免费试听</div> -->
          </div>
          <div class="item-detail" style="position:relative">
            <div class="detail-tit">{{items.courseName}}</div>
            <div class="detail-des">{{items.title}}</div>
            <div class="btn-all">
              <div class="detail-btnone" v-for="(ele,index) in items.label" :key="index">{{ele}}</div>
            </div>
            <div class="last">
              <span class="last_span">{{items.realPrice}}元</span>

              <span class="last_spans">
                <img src="../../assets/img/ghvwef.png" alt />会员{{items.costPrice}}元
              </span>
              <div class="goclass" @click="goclass(items.courseId)">播放</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!hasData && show" class="null-data">
      <img src="../../assets/images/hasbuy-nulldata.png" class="nulldata" />
      <div class="nulltext">您目前还没有订单~</div>
      <div class="to-see" @click="toSee">去看看</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import serviceApi from "../../service/serviceConfig";

let _this;
export default {
  name: "hasbuy",
  data() {
    return {
      courselists: [[], []],
      userId: "",
      show: false,
      hasData: false
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    _this = this;
    document.title = "已购";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.getUserCollection();
  },
  methods: {
    ...mapMutations(["settabindex", "setbarindex"]),
    getUserCollection: function() {
      const _this = this;
      const url =
        `${serviceApi.getUserCollection}` +
        "?userId=" +
        _this.userId +
        "&type=1";
      this.$http({
        method: "get",
        url: url
      })
        .then(function(response) {
          if (response.data.status === "00") {
            let data = response.data.data;
            if (data.length > 0) _this.hasData = true;
            data.map(ele => {
              let label = [];
              if (ele.label) {
                label = ele.label.split("，");
                ele.label = label;
              }
            });
            for (let i = 0; i < data.length; i++) {
              const ele = data[i];
              if (ele.audienceType == 1) {
                _this.courselists[0].push(ele);
              } else if (ele.audienceType == 2) {
                _this.courselists[1].push(ele);
              }
            }
            _this.show = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goclass(id) {
      this.$router.push({
        name: "courseDetails",
        params: { id: id }
      });
    },
    // 返回首页
    toSee() {
      this.setbarindex(0);
      this.settabindex(0);
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.course-item-wrap {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  flex-direction: column;

  .course-item {
    box-sizing: border-box;
    width: 6.78rem;
    background: white;
    border-radius: 0.36rem;
    display: flex;
    align-items: center;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    position: relative;

    .item-img {
      position: relative;
      height: 2rem;
      border-radius: 0.26rem;

      .course-image {
        width: 2.15rem;
        height: 2.02rem;
        border-radius: 0.26rem;
      }
    }
  }
}
.nulldata {
  width: 61.33vw;
  height: 41.6vw;
  margin: 0 auto;
}

.goclass {
  width: 1.24rem;
  height: 0.5rem;
  // margin-right: 0.24rem;
  background: rgba(255, 209, 0, 1);
  border-radius: 0.4rem;
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.4rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: .15rem;

}
.nulltext {
  font-size: 0.32rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  opacity: 0.5;
  text-align: center;
  margin-top: 10vw;
}
.listen-image {
  width: 1.52rem;
  height: 0.4rem;
  position: absolute;
  top: 1.4rem;
  left: 0.4rem;
}
.free-listen {
  font-size: 0.24rem;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 1.44rem;
  left: 0.8rem;
}

.item-detail {
  margin-left: 0.2rem;
  background: #fff;
  // background: red;
  height: 2rem;
  width: 4rem;
  border-radius: .2rem;
}
.detail-tit {
  font-size: 0.32rem;
  color: rgba(17, 17, 17, 1);
  line-height: 0.4rem;
  padding-top: 0.1rem;
  font-weight: bold;
}
.detail-des {
  font-size: 0.24rem;
  font-weight: 250;
  color: rgba(166, 166, 166, 1);
  line-height: 0.3rem;
  padding-top: 0.08rem;
}
.detail-btnone {
  display: flex;
  padding: 0rem 0.15rem;
  border-radius: 0.1rem;
  background-color: rgba(29, 169, 255, .15);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 0.22rem;
  margin: 0.06rem 0;
  color: rgba(29, 169, 255, 1);
  margin-right: 0.1rem;
}

.detail-btntwo {
  display: flex;
  width: 1.2rem;
  height: 0.42rem;
  border-radius: 0.42rem;
  background-color: #06c3fe;
  line-height: 0.38rem;
  justify-content: center;
  font-size: 0.24rem;
  margin: 0.06rem 0.2rem;
  font-size: 0.24rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.4rem;
}
.btn-all {
  display: flex;
  margin-top: 0.08rem;
}
.buypeo {
  font-size: 0.18rem;
  color: rgba(172, 172, 172, 1);
}

.last {
  display: flex;
  width: 100%;
  justify-content: space-between;
  // background: red;
  align-items: center;
  // margin-top: -.08rem;
}
.last_spans img {
  width: 0.27rem;
  height: 0.19rem;
}
.last_span {
  font-size: 0.24rem;
  color: rgba(153, 153, 153, 1);
}
.last_spans {
  color: rgba(255, 209, 0, 1);
  font-size: 0.24rem;
}

.money {
  font-size: 0.18rem;
  color: rgba(172, 172, 172, 1);
  margin-left: 0.6rem;
}

.momey-real {
  font-size: 0.38rem;
  color: rgba(233, 72, 41, 1);
  line-height: 0.32rem;
  margin-left: 0.6rem;
}

.freecourse {
  font-size: 0.2rem;
  font-weight: 250;
  color: rgba(233, 72, 41, 1);
  margin-left: 0.6rem;
}

.freeImgdiv {
  position: absolute;
  top: 0.06rem;
  right: 0.1rem;
}

.freeImg {
  width: 24px;
  height: 24px;
}
.null-data {
  margin-left: 50%;
  margin-top: 50%;
  width: 61.33vw;
  height: 41.6vw;
  position: relative;
  left: -30.66vw;
  top: -20.8vw;
}
.to-see {
  width: 28vw;
  height: 10.6vw;
  margin: 0 auto;
  margin-top: 3.4vw;
  background: rgba(255, 209, 0, 1);
  border-radius: 20px;
  line-height: 10.6vw;
  text-align: center;
  font-size: 0.32rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
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
.home-child {
  width: 1.73rem;
  height: 0.8rem;
  position: absolute;
  top: -0.8rem;
  right: -0.11rem;
}
</style>
