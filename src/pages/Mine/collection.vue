<template>
  <div style="width:100%;background:#fafafa;position: absolute;height: 100%;">
    <div style="background:#fafafa" v-if="hasData && show">
      <div class="course-item-wrap">
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
            v-for="datas in item"
            :key="datas.id"
            :class="[i==0?'child':'man']"
            @click="toPageDetail(datas.courseId)"
          >
            <div class="item-img">
              <img class="course-image" :src="datas.listImage" />
              <!-- <img
              class="listen-image"
              src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/listen.png"
              @click="godetail(item.id)"
              />-->
              <!-- <div class="free-listen" @click="godetail(item.id)">免费试听</div> -->
            </div>
            <div class="item-detail">
              <div class="detail-tit">{{datas.courseName}}</div>
              <div class="detail-des">{{datas.title}}</div>
              <div class="btn-all">
                <div class="detail-btnone" v-for="(ele,index) in datas.label" :key="index">{{ele}}</div>
              </div>
              <div style="display:flex">
                <!-- <div class="buypeo">{{item.saleNumber}}人购买</div> -->
                <div
                  class="freecourse"
                  style="margin-left: .2rem;"
                  v-if="datas.someflag"
                >部分免费，点我试试看~</div>
              </div>
              <div class="last">
                <span
                  v-show="datas.chargingStandard==2"
                  style="white-space: nowrap;font-size: 0.24rem;color: #E94829;"
                >优选课程</span>

                <!-- <div class="buypeo">{{item.collectionNumber}}收藏</div> -->
                <div
                  v-show="datas.realPrice != null && datas.chargingStandard!=2"
                  class="money"
                >¥{{datas.realPrice}}</div>
                <div class="momey-real" v-show="datas.chargingStandard!=2">
                  <img class="right-div1-span2-img" src="../../assets/img/ghvwef.png" alt />
                  ¥{{datas.costPrice}}元
                </div>
                <div class="right-div1-span2">
                  <span class="right-div1-span3" v-if="datas.chargingStandard==2">开始上课</span>
                  <span class="right-div1-span2" v-if="datas.chargingStandard!=2">
                    <img style="width:.16rem;height:.18rem" src="../../assets/img/bof.png" alt />
                    试听
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!hasData && show" class="null-data">
      <img src="../../assets/images/collection-nulldata.png" class="nulldata" />
      <div class="nulltext">收藏夹空空如也~</div>
      <div class="to-see" @click="toSee">去逛逛</div>
    </div>
    <div style="font-size:0.32rem">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import { Toast } from "vux";
import serviceApi from "../../service/Mine/serviceConfig";

let _this;
export default {
  name: "collection",
  data() {
    return {
      courselists: [[],[]],
      userId: "",
      failtext: "",
      show: false,
      hasData:false
    };
  },
  // components: { Toast },
  computed: {},
  mounted: function() {
    _this = this;
    document.title = "收藏";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    // console.log(userWechatInfo, "userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.getUserCollection();
  },
  methods: {
    ...mapMutations(["settabindex", "setbarindex"]),
    toPageDetail(courseId) {
      // this.$router.push({name: 'courseDetails', params: {id: courseId}})
      // if (navigator.userAgent.indexOf("iPhone") !== -1) {
      //     window.wechaturl = window.location + "";
      // }
      // 此方法用于分享铺垫
      location.href = `${location.origin}/#/courseDetails/${courseId}/false`;
    },
    getUserCollection: function() {
      if (!this.userId) {
        this.$toast('请先关注微信公共号')
        return false;
      }
      const _this = this;
      const url =
        `${serviceApi.getUserCollection}` +
        "?userId=" +
        _this.userId +
        "&type=2";
      this.$http({
        method: "get",
        url: url
      })
        .then(function(response) {
          if (response.data.status == "00") {
            let data = response.data.data;
            if(data.length>0) _this.hasData = true
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
          this.$toast('服务器异常')
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
<style scoped>
.nulltext {
  font-size: 0.28rem;
  margin-top: 10vw;
  text-align: center;
  color: #999999;
}
.to-see {
  width: 28vw;
  height: 10.6vw;
  margin: 0 auto;
  margin-top: 3.4vw;
  background: rgba(255, 209, 0, 1);
  border-radius: 0.4rem;
  line-height: 10.6vw;
  text-align: center;
  font-size: 0.32rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
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
.nulldata {
  width: 61.33vw;
  height: 41.6vw;
  margin: 0 auto;
}
.freecourse {
  font-size: 0.2rem;
  font-weight: 250;
  color: rgba(233, 72, 41, 1);
  margin-left: 0.6rem;
}
.item-detail {
  width: 65%;
  margin-left: 0.2rem;
}
.item-img {
  width: 2.16rem;
  height: 2.05rem;
  margin-left: -0.05rem;
}
.item-img img {
  width: 100%;
  height: 100%;
}
.detail-tit {
  padding-top: 0.05rem;
  font-size: 0.3rem;
  color: rgba(17, 17, 17, 1);
  font-weight: bold;
}
.detail-des {
  font-size: 0.24rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.01rem 0;
  color: rgba(166, 166, 166, 1);
}
.btn-all {
  width: 100%;
  display: flex;
  align-items: center;
  height: 0.4rem;
}
.detail-btnone {
  font-size: 0.2rem;
  color: #1da9ff;
  text-align: center;
  background: rgba(29, 169, 255, 0.2);
  padding: 0 0.1rem;
  border-radius: 0.1rem;
  margin-right: 0.1rem;
}
.last {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.05rem;
  line-height: 0.6rem;
  padding-right: 0.3rem;
}
.money {
  font-size: 0.24rem;
  color: rgba(153, 153, 153, 1);
}
.momey-real {
  color: rgba(255, 209, 0, 1);
  font-size: 0.24rem;
}
.child {
  /* width: 6.78rem; */
  display: flex;
  margin-top: 0.3rem !important;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-radius: 0.35rem;
  position: relative;
}
.child:first-of-type,
.man:first-of-type {
  margin-top: 0 !important;
}
.man {
  display: flex;
  margin-top: 0.3rem !important;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-radius: 0.22rem;
  position: relative;
}
.child-style {
  width: 6.78rem;
  border: 0.11rem solid rgba(255, 209, 0, 1);
  box-sizing: content-box;
  border-radius: 0.36rem 0.36rem 0.38rem 0.36rem !important;
  margin-top: 1rem !important;
  position: relative;
  margin: auto;
  background: rgba(255, 247, 209, 1);
}
.man-style {
  width: 6.78rem;
  margin: auto;
  box-sizing: content-box;
  border: 0.11rem solid rgba(80, 187, 255, 1);
  border-radius: 0.36rem;
  margin-top: 1rem !important;
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
.right-div1-span2 {
  width: 1.2rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  /* margin-bottom: 0.16rem; */
  background: #ffd100;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.28rem;
}
.right-div1-span2 img {
  margin-left: 0.2rem;
  margin-right: 0.1rem;
  width: 0.16rem;
  height: 0.18rem;
}
.right-div1-span2-img {
  width: 0.27rem;
  height: 0.19rem;
}
.right-div1-span3 {
  width: 1.2rem;
  height: 0.5rem;
  display: flex;
  align-items: center;
  /* margin-bottom: 0.16rem; */
  background: #ffd100;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.26rem;
  justify-content: center;
}
</style>
