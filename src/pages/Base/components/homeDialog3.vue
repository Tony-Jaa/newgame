<template>
  <div class="dialog" v-if="show">
    <div class="main">
      <div class="content">
        <div class="logo">
          <img v-lazy="require('../../../assets/images/homeDialog3-logo.png')" alt />
        </div>
        <div class="content-text">
          <img v-lazy="require('../../../assets/images/homeDialog3-bg.png')" alt />
          <p>
            &emsp;&emsp;亲爱的小Z用户，感谢您信任我们。小Z思维专注于0-6岁宝宝，通过
            <span class="spec">场景式与行为大数据</span>
            分析认知，发现宝宝潜在的思维，真正从宝宝自身引导启蒙教育的家庭在线早教品牌。
          </p>
        </div>
        <div class="content-tip">
          <p>为了更精准得为您匹配课程</p>
          <p>请先完善个人信息</p>
        </div>
        <div class="dialog-main-btn" @click="toComplete">去完善</div>
      </div>
      <div class="feiji">
        <img v-lazy="require('../../../assets/images/homeDialog3-feiji.png')" alt="">
      </div>
            <div class="close-btn" @click="closeDialog">
        <img v-lazy="require('../../../assets/images/close-btn.png')" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  mounted() {
    document.body.style.overflowY='hidden'
  },
  methods: {
    closeDialog() {
      document.body.style.overflowY='auto'
      this.$emit("homeDialogClose3", true);
      this.show = false;
    },
    toComplete() {
      document.body.style.overflowY='auto'
      this.$router.push({
        path: "/personalInfo"
      });
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
     height: 6.62rem;
     background:rgba(255,252,238,1);
     border-radius: 0.36rem;
     text-align: center;
     position: relative;
     top: -19vw;
}
 .content {
     width: 100%;
     padding: 0.22rem 0 0 0.28rem;
}
 .content .logo {
     margin-left: 0.26rem;
     width: 2.16rem;
     margin-bottom: 0.2rem;
}
 .content .logo img {
     width: 100%;
     height: 100%;
     display: block;
}
 .content-text {
     width: 4.94rem;
     height: 3rem;
     margin: 0 auto;
     position: relative;
     left: -0.14rem;
}
 .content-text img {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
}
 .content-text > p {
     padding: 0.37rem 0 0 0.24rem;
     width: 4.48rem;
     height: 2.22rem;
     font-size: 0.28rem;
     font-weight: 500;
     color: rgba(32, 26, 0, 1);
     position: relative;
     z-index: 2;
     text-align: left;
     line-height: 1.6;
}
 span.spec {
     font-weight: Bold;
     color: #201a00;
     margin: 0 -0.1rem;
}
 .content-tip {
     font-size: 0.28rem;
     font-weight: 500;
     color: rgba(255, 157, 0, 1);
     line-height: 0.44rem;
     opacity: 0.9;
     margin-top: 0.3rem;
     margin-bottom: 0.3rem;
}
 .dialog-main-btn {
     width: 3.12rem;
     height: 0.88rem;
     margin: 0 auto;
     line-height: 0.88rem;
     background: linear-gradient( 45deg, rgba(255, 138, 0, 1), rgba(255, 157, 0, 1) );
     box-shadow: 0rem 0.04rem 0.1rem 0rem rgba(255, 11, 137, 0.35), 0rem 0.14rem 0.3rem 0rem rgba(255, 137, 11, 0.18);
     border-radius: 0.44rem;
     font-size: 0.38rem;
     font-weight: bold;
     color: rgba(255, 255, 255, 1);
}
 .feiji{
     position: absolute;
     width: 1.26rem;
     height: 1.62rem;
     bottom: 0.1rem;
     right: -0.5rem;
}
 .feiji>img{
     width: 100%;
}
 .close-btn {
     position: absolute;
     width: 8.8vw;
     bottom: -22.67vw;
     left: 50%;
     margin-left: -4.4vw;
     display: inline-block;
}
 .close-btn img {
     width: 100%;
}
 
</style>