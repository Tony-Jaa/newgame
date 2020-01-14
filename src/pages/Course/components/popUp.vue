<template>
  <div class="popup" v-if="show">
    <div class="show">
      <img src="../../../assets/images/popupBg.png" alt="">
      <div class="slot-text">
        <slot></slot>
      </div>
    <div class="knowBtn" @click="closePop">
      知道了
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:true
    }
  },
  mounted() {
    document.body.style.overflowY='hidden'
  },
  methods: {
    closePop(){
      this.show = false
      document.body.style.overflowY='auto'
    }
  },
}
</script>

<style scoped>
.popup{
     position: absolute;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     background:rgba(0,0,0,0.6);
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 999;
}
 .show{
     width: 95.2vw;
     height: 84.26vw;
     position: relative;
     opacity: 1;
     display: flex;
     justify-content: center;
     align-items: center;
}
 .show > img{
     width: 100%;
     opacity: 1;
}
 .knowBtn{
     position: absolute;
     bottom: 12.8vw;
     width:3.12rem;
     height:0.88rem;
     background:linear-gradient(45deg,rgba(255,138,0,1),rgba(255,157,0,1));
     box-shadow:0rem 0.04rem 0.1rem 0rem rgba(255, 11, 137, 0.35), 0rem 0.14rem 0.3rem 0rem rgba(255,137,11,0.18);
     border-radius:0.44rem;
     display: flex;
     justify-content: center;
     align-items: center;
     font-size:0.38rem;
     font-weight:bold;
     color:rgba(255,255,255,1);
     line-height:2.14rem;
}
 .slot-text{
     position: absolute;
     margin-top: 2vw;
     font-size:0.36rem;
     font-weight:bold;
     color:rgba(118,64,0,1);
     text-align: center;
     line-height: 6.5vw;
}
 
</style>