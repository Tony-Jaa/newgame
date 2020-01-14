<template>
  <div style="background:#fafafa;width: 100%;height: 100%;overflow:auto">
    <div class="mine-wrap">
      <img src="https://emsoss.oss-cn-hangzhou.aliyuncs.com/thinkclass/minepic.png" class="minepic" />
    </div>
    <div class="speed">
      <div class="speed-tit">小Z思维推广规则</div>
      <div class="speed-wrap">
        <div class="detail">
          <div>
            <p
              style="text-indent:0.5rem"
            >“小Z思维”分为高级合伙人和普通合伙人，您可以根据实际情况申请不同身份，不同身份对应的推广权限不一，具体推广权限如下：</p>
            <br />
            <h4>合伙人：</h4>
            <p style="font-weight:bold">获取方式：</p>合伙人可以通过缴纳198元会费申请获得；
            <p style="font-weight:bold">权益：</p>
            <p>1.N+1全额vip奖励金；永久性分润机制；管道收入+金融属性；</p>
            <p>2.合伙人将获得“小Z思维“其推荐的15位会员，以及其推荐会员过程中产生的关联用户(指通过分享用户方式获取优惠购买会员资格，其分享的用户)消费金额总额的20%的佣金；</p>
            <p>3.“小Z思维”会员获取方式：原价购买会员；合伙人链接邀请优惠价购买会员；多人团购低至0.01购买会员（详情请见会员页面）。</p>
            <br />
            <h4>高级合伙人：</h4>
            <p style="font-weight:bold">获取方式：</p>通过缴纳998元申请成为998高级合伙人或者缴纳9980元会费申请成为9980高级合伙人(股份)；
            <p style="font-weight:bold">权益（998高级合伙人版）：</p>
            <p>1.合伙制分红制度：N+1全额vip奖励金；交易永久性分润机制；管道收入+金融属性；</p>
            <p>2.998高级合伙人拥有推荐8个用户成为198初级合伙人的权限，推荐8个初级合伙人成功后，奖励其推荐的初级合伙人消费20%的佣金；并额外获得其推荐的198初级合伙人所参与分佣的消费总额5%的奖励金；</p>
            <p>3.“小Z思维”会员获取方式：原价购买会员；合伙人链接邀请优惠价购买会员；多人团购低至0.01购买会员（详情请见会员页面）。</p>
            <p style="font-weight:bold">权益【9980高级合伙人（股份）版】：</p>
            <p>1.合伙人分红制度：事业群恒定+效应；合伙制分红制度；N+1全额vip奖励金；交易永久性分润机制；管道收入+金融属性；</p>
            <p>2.9980高级合伙人（股份）将获得“小Z思维“其推荐1800位会员，以及其推荐会员过程中产生的关联用户(指通过分享用户方式获取优惠购买会员资格，其分享的用户)消费金额总额的20%的佣金；</p>
            <p>3.“小Z思维”会员获取方式：原价购买会员；合伙人链接邀请优惠价购买会员；多人团购低至0.01购买会员（详情请见会员页面）。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "promotionrule",
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted: function() {
    document.title = "推广规则";
  },
  methods: {
    // 跳转到测评
    // handleEvaluation: function() {
    //   wx.miniProgram.navigateTo({ url: "/pages/evaluation/evaluation" });
    // },
    // tohasbuy: function() {
    //   this.$router.push({ name: "hasbuy" });
    // },
    // tocollection: function() {
    //   this.$router.push({ name: "collection" });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.speed {
  position: relative;
  top: -0.14rem;
}
.speed-tit {
  width: 90%;
  height: 0.7rem;
  background: #ff755b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  margin: 0 auto;
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.speed-wrap {
  width: 90%;
  background: #fff;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 0.4rem;
  border-radius: 0.3rem;
  margin-bottom: 1.01rem;
  box-shadow:0 .14rem 1.06rem 0 rgba(41,41,41,0.12);
}
.detail {
  width: 80%;
  font-size: 0.26rem;
  color: rgba(34, 34, 34, 1);
  line-height: 0.48rem;
  text-align: left;
  margin: 0rem auto;
  padding-top: 0.3rem;
}
.mine-wrap {
  margin-top: 0.48rem;
  display: flex;
  justify-content: center;
}
.minepic {
  width: 4.09rem;
  height: 1.48rem;
}
</style>
