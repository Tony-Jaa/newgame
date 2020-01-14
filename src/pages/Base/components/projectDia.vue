<template>
  <div class="dialog" v-if="show">
    <div class="main">
      <div class="dialog-top">
        <div>
          <img v-lazy="require('../../../assets/images/projectDia.png')" alt />
        </div>
        <span class="dialog-top-text">课程匹配完成</span>
      </div>
      <div class="dialog-main">
        <div class="dialog-main-content">
          <p>根据您的资料</p>
          <p>小Z已为您匹配专属精品课程</p>
        </div>
        <div class="dialog-main-btn" @click="toComplete">去体验</div>
      <div class="close-btn" @click="closeDialog">
        <img v-lazy="require('../../../assets/images/close-btn.png')" alt />
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show:true,
    }
  },
  methods: {
    closeDialog(){
      this.show = false
    },
    toComplete(){
      this.show = false
    }
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
     position: relative;
     top: -18vw;
}
 .dialog-top {
     width: 84vw;
     position: relative;
     left: -5.06vw;
     display: flex;
     justify-content: center;
}
 .dialog-top img {
     position: relative;
     width: 100%;
     z-index: 2;
     display: block;
}
 .dialog-top-bg {
     width: 73.6vw;
     height: 25.6vw;
     background: linear-gradient( 45deg, rgba(255, 209, 0, 1), rgba(255, 214, 25, 1) );
     border-radius: 0.36rem 0.36rem 0.06rem 0.06rem;
     position: absolute;
     bottom: 0;
}
 .dialog-main {
     width: 73.6vw;
     height: 51.73vw;
     background: rgba(255, 252, 238, 1);
     border-radius: 0.36rem;
     border-top-left-radius: 0;
     border-top-right-radius: 0;
     text-align: center;
     position: relative;
     top: -5.4vw;
}
 .dialog-main-title {
     font-size: 0.36rem;
     font-weight: bold;
     color: rgba(65, 54, 0, 1);
     line-height: 0.5rem;
     padding-top: 4.53vw;
}
 .dialog-main-content {
     font-size: 0.28rem;
     font-weight: 500;
     color: rgba(63, 52, 0, 1);
     line-height: 0.44rem;
     opacity: 0.7;
     margin: 0 0 0.56rem 0;
     padding-top: 16.26vw 
}
 .dialog-main-btn {
     width: 41.6vw;
     height: 11.73vw;
     margin: 0 auto;
     background: linear-gradient( 45deg, rgba(255, 138, 0, 1), rgba(255, 157, 0, 1) );
     box-shadow: 0rem 0.04rem 0.1rem 0rem rgba(255, 11, 137, 0.35), 0rem 0.14rem 0.3rem 0rem rgba(255, 137, 11, 0.18);
     border-radius: 0.44rem;
     display: block;
     line-height: 11.73vw;
     font-size: 0.38rem;
     font-weight: bold;
     color: rgba(255, 255, 255, 1);
     position: relative;
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
.dialog-top-text{
  position: absolute;
  font-size:0.44rem;
  color:rgba(255,255,255,1);
  line-height: 1;
  z-index: 3;
  bottom: .5rem;
}
</style>