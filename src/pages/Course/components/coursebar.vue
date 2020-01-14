<template>
  <div v-if="resultMap" class="bar">

    <!-- <div v-if="showComment" class="comment">
      <div>
        <img src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/comment.png" alt />
        <input @blur="inputBlur" v-model="comment" type="text" placeholder="抒发一下感想" name id />
        <div class="add-comment" @click="addComment">发送</div>
      </div>
    </div> -->
    <div style="margin:0.16rem 0" v-if="!playing&&!(!jingpin&&vip==1)">
      <div  @click="$emit('shiting')" class="left">
        <img v-if="!playing" class="icon-shiting" src="../../../assets/images/coursebar/shiting.png" alt />
        <p v-if="!playing&&!isvideo">试听</p>
        <p v-if="!playing&&isvideo">试看</p>
      </div>
      <div v-if="$store.state.userInfo.vip==0" class="price">
        <p>原价{{resultMap.realPrice}}元购买</p>
      </div>
      <div @click="$emit('handle')"  class="right">
        <div :class="[jingpin?'jingpin':'']">
          <img v-if="!jingpin" src="../../../assets/images/coursebar/openvip.png" alt />
          <p v-if="!jingpin" @click="$router.push({name:'xzvip',params:{phone:0}})">开通VIP畅享</p>
          <div v-if="jingpin" style="display:flex;align-items: center;">
            <span class="now-price">￥{{resultMap.costPrice}}</span>
            <span class="pre-price">￥{{resultMap.realPrice}}</span>
          </div>
          <div v-if="jingpin">VIP精品课程八五折</div>
        </div>
      </div>
    </div>
    <div  style="margin:0.16rem 0"  v-else-if="playing&&!(!jingpin&&vip==1)">
      <div class="left normal-audio">
        <div v-if="!isvideo">免费试听中</div>
        <div v-if="isvideo">免费试看中</div>
        <p v-if="!jingpin&&vip==0" @click="$router.push({name:'xzvip',params:{phone:0}})">开通VIP畅享课程</p>
        <p
          v-if="jingpin&&vip==0"
          @click="$router.push({name:'xzvip',params:{phone:0}})"
        >开通VIP精品课程八五折</p>
        <p v-if="jingpin&&vip==1">VIP精品课程八五折</p>
      </div>
      <div @click="$emit('handle')" class="right">
        <div :class="[jingpin?'jingpin':'']">
          <img v-if="!jingpin" src="../../../assets/images/coursebar/openvip.png" alt />
          <p v-if="!jingpin&&vip==0" @click="$router.push({name:'xzvip',params:{phone:0}})">最低一分钱开通VIP</p>
          <div v-if="jingpin" style="white-space: nowrap;">
            <span class="now-price">￥{{resultMap.costPrice}}</span>
            <span class="pre-price">￥{{resultMap.realPrice}}</span>
          </div>
          <div v-if="jingpin">VIP精品课程八五折</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment: ""
      // jingpin: true, //是否是精品课程
      // isvideo: false //是否是视频
    };
  },
  props: ["isvideo", "resultMap", "showComment",'playing'],
  computed: {
    jingpin() {
      if (this.resultMap) {
        return this.resultMap.costPrice > 0 ? true : false;
      }
    },
    vip() {
      return this.$store.state.userInfo.vip;
    }
  },
  methods: {
    addComment() {
      if (this.comment.length > 0) {
        this.$emit("addComment", this.comment);
        this.comment = ''
      } else {
        this.$toast("请输入内容")
      }
    },
    inputBlur() {
      var count = 0;
      var screenHeight = window.screen.height;
      var blurInterval = setInterval(function() {
        $("body").css("min-height", (screenHeight -= 10) + "px");
        if (count >= 10) {
          clearInterval(blurInterval);
          $("body").css("min-height", "");
        }
        count++;
      }, 10);
    }
  }
};
</script>
<style scoped>
.bar {
  width: 100%;
  /* height: 1.06rem; */
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 -0.02rem 0 0 rgba(67, 67, 67, 0.05),
    0 0.02rem 0 0 rgba(67, 67, 67, 0.06);
  padding: 0 0.36rem 0 0.33rem;
}
.bar > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.left {
  display: flex;
  align-items: center;
}
.icon-shiting {
  width: 0.46rem;
  display: block;
}
.left p {
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(17, 17, 17, 0.7);
  line-height: 1;
}
.price {
  display: flex;
  line-height: 1;
  font-size: 0.3rem;
  font-weight: 500;
  color: rgba(255, 209, 0, 1);
}
.right {
  min-width: 1.08rem;
  padding: 0 0.18rem;
  height: 0.78rem;
  background: linear-gradient(
    45deg,
    rgba(255, 209, 0, 1),
    rgba(255, 215, 33, 1)
  );
  border-radius: 0.39rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.22rem;
  color: #fff;
}
.right > div {
  display: flex;
  align-items: center;
}
.right img {
  width: 0.38rem;
  height: 0.29rem;
  display: block;
}
.right p {
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-left: 0.17rem;
}
.normal-audio {
  flex-direction: column;
  font-size: 0.3rem;
  text-align: left;
}
.normal-audio > div {
  width: 100%;
  font-size: 0.3rem;
  color: rgba(146, 120, 0, 1);
  font-weight: bold;
}
.normal-audio > p {
  font-size: 0.24rem;
  color: rgba(146, 120, 0, 0.8);
  font-weight: 500;
}
.right > .jingpin {
  font-size: 0.22rem;
  color: #fff;
  flex-direction: column;
  padding: 0 0.3rem 0 0.41rem;
  line-height: 1;
}
.jingpin > div:last-of-type {
  margin-top: 0.07rem;
}
.now-price {
  font-size: 0.34rem;
  margin-right: 0.15rem;
}
.pre-price {
  text-decoration: line-through;
  font-size: 0.24rem;
}
.comment {
  width: 100%;
  height: auto!important;
  height: 1.06rem;
  position: absolute;
  left: 0;
  top: -1.06rem;
  padding: 0.16rem 0.36rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 -0.02rem 0 0 rgba(67, 67, 67, 0.05),
    0 0.02rem 0 0 rgba(67, 67, 67, 0.06);
}
.comment > div {
  width: 6.78rem;
  height: 0.74rem;
  /* background: rgba(0, 0, 0, 0.04); */
  border-radius: 0.37rem;
  display: flex;
  position: relative;
  align-items: center;
}
.comment img {
  display: block;
  width: 0.35rem;
  height: 0.38rem;
  position: absolute;
  left: 0.28rem;
  top: 0.18rem;
}
.comment input {
  border: 0;
  outline: none;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 0.37rem;
  padding-left: 0.79rem;
}
.comment .add-comment {
  font-size: 0.3rem;
  white-space: nowrap;
}
</style>