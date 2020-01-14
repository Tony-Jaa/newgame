<template>
  <div class="dialog" v-if="show">
    <div class="main">
      <div class="dialog-top">
        <div>
          <img src="../assets/images/over-userinfo.png" alt />
        </div>
        <div class="dialog-top-bg"></div>
      </div>
      <div class="dialog-main">
        <div class="dialog-main-title">完善资料</div>
        <div class="dialog-main-content">
          <p>为了更精准得为您匹配课程</p>
          <p>请先完善个人信息</p>
        </div>
        <div class="dialog-main-btn" @click="toComplete">去完善</div>
      <div class="close-btn" @click="closeDialog">
        <img src="../assets/images/close-btn.png" alt />
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
  mounted() {
    document.body.style.overflowY='hidden'
  },
  methods: {
    closeDialog(){
      document.body.style.overflowY='auto'
      this.$emit('homeDialogClose',true)
      this.show = false
    },
    toComplete(){
      document.body.style.overflowY='auto'
      this.$router.push({
        path:'/personalInfo'
      })
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
     top: -28vw;
}
 .dialog-top {
     width: 100%;
     height: 40.26vw;
     position: relative;
}
 .dialog-top img {
     position: relative;
     width: 100%;
     z-index: 2;
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
     height: 48vw;
     background: rgba(255, 252, 238, 1);
     border-radius: 0.36rem;
     border-top-left-radius: 0;
     border-top-right-radius: 0;
     text-align: center;
}
 .dialog-main-title {
     font-size: 0.36rem;
     font-weight: bold;
     color: rgba(65, 54, 0, 1);
     line-height: 0.5rem;
     padding-top: 0.34rem;
     line-height: 1;
}
 .dialog-main-content {
     font-size: 0.28rem;
     font-weight: 500;
     color: rgba(63, 52, 0, 1);
     line-height: 0.44rem;
     opacity: 0.7;
     margin: 0.44rem 0;
}
 .dialog-main-btn {
     width: 41.6vw;
     height: 11.73vw;
     margin: 0 auto;
     background: linear-gradient( 45deg, rgba(255, 138, 0, 1), rgba(255, 157, 0, 1) );
     box-shadow: 0rem 0.04rem 0.1rem 0rem rgba(255, 11, 137, 0.35), 0rem 0.14rem 0.3rem 0rem rgba(255, 137, 11, 0.18);
     border-radius: 0.44rem;
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
</style>