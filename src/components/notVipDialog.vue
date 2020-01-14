<template>
  <div class="dialog">
    <div class="main">
      <div class="vip-logo">
        <img v-lazy="require('../assets/images/notvip-logo.png')" alt />
      </div>
      <div class="vip-title">
        <p>开通小Z思维VIP</p>
        <p>
          最低只要
          <span class="yel-text">1分钱</span>
        </p>
      </div>
      <div class="vip-cen">
        <span>VIP可享有以下专属特权</span>
      </div>
      <div class="vip-show-items">
        <div class="vip-show-item">
          <div>
            <img v-lazy="require('../assets/images/icon-mian2.png')" alt />
          </div>
          <p>场景式思维丛林</p>
          <p>启蒙方案</p>
        </div>
        <div class="vip-show-item">
          <div>
            <img v-lazy="require('../assets/images/icon-quan2.png')" alt />
          </div>
          <p>付费内容八五折</p>
          <p>AI解决方案</p>
        </div>
      </div>
      <div>
        <div class="to-open" @click="toOpen">现在去开通</div>
        <div class="not-to-open" @click="notToOpen">有钱任性不需要</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(window.pageYOffset);
    // document.getElementsByClassName('dialog')[0].style.marginTop = window.pageYOffset + 'px'
    // document.body.style.overflowY='hidden'
    // document.addEventListener("touchmove",function(e){e.preventDefault();},{passive: false})
    document.body.style.overflow = "hidden";
  },
  methods: {
    notToOpen() {
      // document.body.style.overflowY='auto'
      // document.removeEventListener('touchmove',function(e){e.preventDefault();})
      document.body.style.overflow = "auto";
      this.$emit("closethis", false); //关闭付钱
    },
    toOpen() {
      document.body.style.overflow = "auto";
      console.log(this.$route.params.id);
      this.$emit("closethis", true);  //关闭去vip购买
      if (this.$route.params.id) {  
        sessionStorage.setItem("courseId", this.$route.params.id);
      } else {
      }
      document.removeEventListener("touchmove", function(e) {
        e.preventDefault();
      });
      this.$router.push({ path: "/xzvip/1" });
    }
  }
};
</script>
<style scoped>
.dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.main {
  width: 5.5rem;
  height: 6.6rem;
  background: rgba(255, 252, 238, 1);
  border-radius: 0.36rem;
  position: relative;
}
.main > .vip-logo {
  position: absolute;
  width: 1.18rem;
  left: 50%;
  margin-left: -0.59rem;
  line-height: .7;
  top: -0.48rem;
}
.vip-logo > img {
  width: 100%;
}
.vip-title {
  width: 2.85rem;
  margin: 0.53rem auto 0.32rem;
  text-align: center;
  font-size: 0.4rem;
  font-weight: bold;
  color: rgba(22, 18, 0, 1);
  line-height: 1.4;
}
.vip-title p {
  white-space: nowrap;
}
.yel-text {
  color: #ffd100;
}
.vip-cen {
  text-align: center;
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 0.48rem;
  opacity: 0.4;
  position: relative;
  margin-bottom: 0.22rem;
}
.vip-cen > span {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vip-cen > span::before {
  content: "";
  height: 0.02rem;
  width: 0.48rem;
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 1);
  opacity: 0.2;
  left: 7.2vw;
}
.vip-cen > span::after {
  content: "";
  height: 0.02rem;
  width: 0.48rem;
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 1);
  opacity: 0.2;
  right: 7.2vw;
}
.vip-show-items {
  display: flex;
  justify-content: space-between;
  line-height: .7;
}
.vip-show-items::before,
.vip-show-items::after{
  content: '';
  display: block;
}
.vip-show-item {
  height:1.5rem;
  text-align: center;
}
.vip-show-item > div {
  width: 8.8vw;
  margin: 0 auto 0.2rem;
}
.vip-show-item img {
  width: 100%;
}
.vip-show-item p {
  font-size: 0.28rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  white-space: nowrap;
  line-height: 1.4;
}
.to-open {
  width: 58.67vw;
  height: 10.67vw;
  margin: 0.4rem auto 0.18rem;
  background: linear-gradient(
    45deg,
    rgba(255, 209, 0, 1),
    rgba(255, 215, 33, 1)
  );
  border-radius: 0.4rem;
  text-align: center;
  line-height: 10.67vw;
  color: rgba(255, 255, 255, 1);
  font-size: 0.32rem;
}
.not-to-open {
  width: 58.67vw;
  height: 10.67vw;
  margin: 0 auto;
  background: rgba(255, 209, 0, 0);
  border: 1px solid #ffd100;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 10.67vw;
  font-size: 0.32rem;
  font-weight: 500;
  color: rgba(255, 215, 33, 1);
}
</style>