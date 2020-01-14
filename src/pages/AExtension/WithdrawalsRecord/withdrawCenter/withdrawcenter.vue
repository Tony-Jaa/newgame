<template>
  <div>
    <p class="title">请选择奖励金提取类型</p>
    <div class="btn-item" v-if="outCashStatus==-1 || outCashStatus==2" @click="towithPeople">初级合伙人招募奖励金</div> 
    <div class="btn-item bg-color-3" v-if="outCashStatus==1">奖励金已发放</div>
    <div class="btn-item bg-color-3" v-if="outCashStatus==0||outCashStatus==3">奖励金发放中，请耐心等待</div>

    <div class="btn-item bg-color-2" @click="togetVipMoney" v-if="outCashStatus==-1 || outCashStatus==2">VIP招募奖励金</div>
    <div class="btn-item bg-color-2 bg-color-3" v-if="outCashStatus==1">奖励金已发放</div>
    <div class="btn-item bg-color-2 bg-color-3" v-if="outCashStatus==0||outCashStatus==3">奖励金发放中，请耐心等待</div>
  </div>
</template>
<script>
import serviceApi from "../../../../service/AExtension/serviceConfig"
export default {
  data() {
    return {
      outCashStatus: -1 //提现申请状态，0 申请中，1 完成   ，2 驳回，  3打款中，-1没有申
    };
  },
  mounted() {
    this.getPromoterBasicInfo();
  },
  methods: {
    getPromoterBasicInfo() {
      const _this = this;
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      this.$http
        .get(serviceApi.getPromoterBasicInfo, {
          params: {
            userId: userId
          }
        })
        .then(res => {
          if(res&&res.data && res.data.resultMap){
            console.log(res.data.resultMap)
            let resultMap = res.data.resultMap
            _this.outCashStatus = resultMap.outCashStatus
          }
        });
    },
    towithPeople(){
      this.$router.push({name:'withdrawPeople'})
    },
    togetVipMoney(){
      this.$router.push({name:'withdrawVip'})
    }
  }
};
</script>
<style scoped>
.title {
     margin-top: 1.32rem;
     margin-bottom: 0.74rem;
     text-align: center;
     font-size: 0.4rem;
     ;
     font-weight: 500;
     color: rgba(23, 23, 23, 0.8);
}
 .btn-item {
     width: 81.86vw;
     margin: 0 auto;
     height: 11.73vw;
     text-align: center;
     line-height: 11.73vw;
     font-size: 0.32rem;
     font-weight: bold;
     color: rgba(255, 255, 255, 1);
     background: linear-gradient( 12deg, rgba(97, 195, 255, 0.71), rgba(128, 207, 255, 0.71) );
     box-shadow: 0rem 0.12rem 0.36rem 0rem rgba(96, 140, 167, 0.13);
     border-radius: 0.2rem;
}
 .bg-color-2 {
     margin-top: 0.46rem;
     background: linear-gradient( 12deg, rgba(255, 138, 138, 0.71), rgba(255, 159, 159, 0.71) );
}
 .bg-color-3 {
     background: none;
     background-color: rgba(0, 0, 0, 0.4);
}
 
</style>