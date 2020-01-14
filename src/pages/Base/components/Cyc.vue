<template>
  <div class="footer">
    <div class="footerBox">
      <img class="home-bg" v-lazy="require('../../../assets/images/firstHome/home-bg.png')" alt="">
      <div class="footerBox_img">
        <img v-lazy="require('../../../assets/img/zu21.png')" alt />
      </div>
      <p class="footerBox_p">你知道宝宝的天赋吗？</p>
      <p class="footerBox_po">快用AI天赋测评深入了解宝宝科学助力成长</p>
      <div class="footerBox_box">
        <img v-lazy="require('../../../assets/img/1.png')" alt />
        <p class="footerBox_span">用科学助力宝宝成长</p>
      </div>
      <div @touchstart="jumpToMiniProgram" class="footerBox_img1">
        <img v-lazy="require('../../../assets/img/ceyice.png')" alt />
      </div>
    </div>
    <!-- <x-dialog
      v-model="showDialogStyle"
      hide-on-blur
      :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}"
    >
      <p style="color:#fff;text-align:center;">
        <img class="modal-img" v-lazy="require('../../assets/images/little_z.png')" />
      </p>
    </x-dialog> -->
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
import { Overlay } from "vant";
export default {
  data() {
    return {
      showDialogStyle: false,
    };
  },
  components: {
   vanOverlay: Overlay,
  },
  methods: {
    jumpToMiniProgram() {
      this.showDialogStyle = true;
    }
  }
};
</script>

<style  scoped>
.footer {
  width: 7.5rem;
  height: 6.53rem;
  background: rgb(250, 250, 250);
  padding: 0 0 0 0.36rem;
  border-radius: 0.2rem;
}
.footerBox {
  width: 6.78rem;
  height: 5.53rem;
  /* background-image: linear-gradient(
    rgba(46, 158, 250, 0.4),
    rgba(250, 250, 250)
  ); */
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#ddeffe), color-stop(74.2%, white));
  border-radius: 0.25rem;
  position: relative;
}
.footerBox_img {
  width: 6.78rem;
  height: 1rem;
  text-align: center;
}
.footerBox_img img {
  width: 3.67rem;
  height: 0.87rem;
  margin-top: 0.3rem;
}
.footerBox_p {
  width: 6.78rem;
  text-align: center;
  margin-top: 0.52rem;
  color: rgba(50, 135, 204, 1);
  font-size: 0.34rem;
  font-weight: bold;
}
.footerBox_po {
  width: 6.78rem;
  text-align: center;
  margin-top: 0.23rem;
  color: rgba(24, 117, 193, 0.55);
  font-size: 0.24rem;
  line-height: 1;
}
.footerBox_box {
  width: 6.78rem;
  height: 0.88rem;
  display: flex;
  align-content: center;
  text-align: center;
  margin-top: 0.36rem;
}
.footerBox_box img {
  width: 0.66rem;
  height: 0.88rem;
  margin-left: 1.63rem;
}
.footerBox_span {
  color: rgba(158, 158, 158, 1);
  font-size: 0.24rem;
  margin-top: 0.25rem;
  margin-left: 0.3rem;
}
.footerBox_img1 {
  width: 6.78rem;
  height: 0.74rem;
  text-align: center;
  margin-top: 0.57rem;
  position: relative;
  z-index: 9;
}
.footerBox_img1 img {
  width: 4.27rem;
  height: 100%;
  margin-bottom: 0.5rem;
  border-radius: 0.35rem;
}
.modal-img {
  width: 80%;
  border-radius: 0.24rem;
}
.home-bg{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 6.4rem;
  height: 4.85rem;
}
</style>