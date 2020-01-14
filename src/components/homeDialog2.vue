<template>
  <div class="dialog" v-if="show">
    <div class="main">
      <div class="main-top">
        <div class="bgImg">
          <img lazy-loader v-lazy="require('../assets/images/homeDialog2TopBg.png')" alt="">
        </div>
        <p class="title">小Z思维测评</p>
        <div class="content">
          <p>参与测评，全方位了解孩子思维模式，</p>
          <p>我们能更准确的为您匹配专属课程</p>
        </div>
      </div>
      <div class="main-bottom">
        <img v-lazy="require('../assets/images/little_z.png')" alt="">
      <p class="">长按二维码识别去测评</p>
      </div>
            <div class="close-btn" @click="closeDialog">
        <img v-lazy="require('../assets/images/close-btn.png')" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:true
    };
  },
  mounted() {
    document.body.style.overflowY='hidden'
  },
  methods: {
      closeDialog(){
      document.body.style.overflowY='auto'
      this.$emit('homeDialogClose2',true)
      this.show = false
    },
  },
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
     width: 73.33vw;
     border-radius: 0.36rem;
     text-align: center;
     position: relative;
     top: -19vw;
}
 .bgImg{
     position: absolute;
     left: 0;
     top: 0;
     width: 68.8vw;
     margin: 0.27rem 0.13rem 0 0.21rem
}
 .bgImg img{
     width: 100%;
}
 .main-top {
     width: 100%;
     height: 2.34rem;
     background:linear-gradient(45deg,rgba(255,209,0,1),rgba(255,214,25,1));
     border-radius:0.36rem 0.36rem 0 0;
     position: relative;
}
 .main-top .title {
     padding-top: 0.49rem;
     padding-bottom: 0.41rem;
     font-size: 0.36rem;
     font-weight: 800;
     color: rgba(255, 255, 255, 1);
     line-height: 1;
}
 .main-top .content{
     font-size:0.28rem;
     font-weight:500;
     color:rgba(63,52,0,1);
     line-height:1;
}
.main-top .content> p:last-child{
  margin-top: 0.2rem;
}
 .main-bottom{
     width: 100%;
     height: 3.02rem;
     background:rgba(255,255,255,1);
     padding: 0.4rem;
     text-align: center;
     border-radius: 0 0 0.36rem 0.36rem;
     font-size: 0.24rem;
}
 .main-bottom > img{
     margin-bottom: 0.12rem;
     width: 1.75rem;
}
 .close-btn {
     position: absolute;
     width: 8.8vw;
     bottom: -22.67vw;
     left: 50%;
     margin-left: -4.4vw;
     display: inline-block;
     z-index: 2;
}
 .close-btn img {
     width: 100%;
}
</style>