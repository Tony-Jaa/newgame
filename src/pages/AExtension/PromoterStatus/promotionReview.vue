<template>
  <div style="background:#fafafa;width: 100%;height: 100%;">
    <div class="mine-wrap">
      <img src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/minepic.png" class="minepic" />
    </div>
    <div class="getpro-wrap">
      <div style="text-align:center;width:100%">
        <img src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/getpro.png" class="getpro" />
        <div class="gongxi">您申请的“推广员”已提交后台审核</div>
        <!-- <div class="des">推广“小Z”，赚取佣金！</div> -->
      </div>
    </div>
    <div class="apply">审核中请耐心等待</div>
    <div class="promotionrule" @click="torule">推广规则</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "promotionReview",
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted: function() {
    document.title = "推广中心";
  },
  methods: {
    torule: function() {
      this.$router.push({ name: "promotionrule" });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mine-wrap{
     margin-top: 0.4rem;
     display: flex;
     justify-content: center 
}
 .minepic{
     width: 4.14rem;
     height: 1.3rem;
}
 .apply{
     width: 5.2rem;
     height: 0.88rem;
     background: #FDD000;
     border-radius: 0.88rem;
     margin: 0.4rem auto;
     font-size: 0.34rem;
     color: rgba(255, 255, 255, 1);
     line-height: 0.88rem;
     text-align: center;
}
 .promotionrule {
     font-size: 0.26rem;
     text-decoration: underline;
     color: rgba(62, 190, 226, 1);
     line-height: 0rem;
     margin: 0.4rem auto;
     text-align: center;
}
 .getpro-wrap {
     text-align: center;
     width: 90%;
     height: 4rem;
     background: rgba(255, 255, 255, 1);
     border-radius: 0.4rem;
     display: flex;
     margin: 0 auto;
     align-items: center;
}
 .gongxi {
     font-size: 0.32rem;
     color: rgba(233, 72, 41, 1);
     padding-top: 0.2rem;
}
 .des {
     font-size: 0.28rem;
     color: rgba(34, 34, 34, 1);
     padding-top: 0.2rem;
}
 .getpro {
     width: 1.56rem;
     height: 1.56rem;
}

</style>
