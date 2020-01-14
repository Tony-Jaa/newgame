<template>
  <div style="background:#fafafa;width: 100%">
    <div class="bg">
      <img src="../../../assets/images/promotion/applypro-bg.png" alt />
    </div>
    <div class="main">
      <h4 class="title">恭喜您获得合伙人申请资格！</h4>
      <div class="info">
        <p>成为合伙人，您将享受以下权益：</p>
        <p style="margin-top:0.18rem">N+1全额vip奖励金</p>
        <p>永久性分润机制</p>
        <p>管道收入+金融属性</p>
      </div>
    </div>
    <div class="apply" @click="toApply">申请成为合伙人</div>
    <!-- <div class="promotionrule" @click="torule">推广规则</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "applypro",
  mounted: function() {
    document.title = "推广中心";
  },
  methods: {
    // torule: function() {
    //   this.$router.push({ name: "promotionrule" });
    // },
    toApply: function() {
      this.$router.push({ name: "payPromotioncenter" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  position: absolute;
  left: 0;
  top: -0.18rem;
}
div > img {
  display: block;
  width: 100%;
  height: 100%;
}
.main {
  width: 6.72rem;
  margin: 2.52rem auto 0;
  position: relative;
  font-size: 0.3rem;
  color: #2e2e2e;
  text-align: center;
  border-radius: 0.2rem;
  box-shadow: 0 0.01rem 0.37rem 0.06rem rgba(166, 152, 240, 0.07);
}
.main::after {
  content: "推广“小Z”，赚取佣金！";
  position: absolute;
  bottom: 0.23rem;
  font-size: 0.24rem;
  color: rgba(34, 34, 34, 0.5);
  line-height: 1;
  left: 50%;
  transform: translateX(-50%);
}
.title {
  height: 1.01rem;
  border-radius: 0.2rem 0.2rem 0 0;
  color: #e42b00;
  line-height: 1.01rem;
  font-size: 0.36rem;
  background: linear-gradient(
    -43deg,
    rgba(255, 209, 0, 1),
    rgba(255, 218, 55, 1)
  );
}
.info {
  background-color: #fff;
  border-radius: 0 0 0.2rem 0.2rem;
  padding: 0.28rem 0 0.91rem 0;
  line-height: 1;
}
.info > p:not(:first-child) {
  line-height: 0.35rem;
}
.apply {
  width: 5.33rem;
  height: 0.88rem;
  margin: 0 auto;
  text-align: center;
  line-height: 0.88rem;
  background: linear-gradient(
    45deg,
    rgba(255, 209, 0, 1),
    rgba(255, 215, 33, 1)
  );
  box-shadow: 0 0.05rem 0.16rem 0 rgba(221, 191, 54, 0.09),
    0 0.13rem 0.33rem 0 rgba(170, 140, 6, 0.08);
  border-radius: 0.44rem;
  font-size: 0.34rem;
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  margin-top: 0.75rem;
}
</style>
