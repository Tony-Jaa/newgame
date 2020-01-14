<template>
  <div class="bg">
    <div class="item">
      <div class="item-title">
        <div>
          已招募初级合伙人
          <span style="font-size:0.3rem">{{downNumber}}</span> 人，已提取奖励金
          <span>{{cashPromTimes}}</span>
          次
        </div>
        <p style="margin:0.16rem 0 0.26rem 0">我的奖励金&nbsp;(元)</p>
        <p style="font-size:0.64rem;font-weight:800;">{{oMoney.toFixed(2)}}</p>
      </div>
      <div class="item-main">
        <div class="info-item">
          <div class="info-text">银行名称</div>
          <div class="info-right">
            <input type="text" v-model="bankName"  style="text-align:left" placeholder="银行名称" id />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">开户行</div>
          <div class="info-right">
            <input type="text" v-model="bankFullName"  style="text-align:left;padding-left:.5rem;" placeholder="请填写准确的开户行名称" id />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">银行卡号</div>
          <div class="info-right">
            <input type="text" v-model="cardNo" style="text-align:left" placeholder="请填写准确的银行卡号" id />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">真实姓名</div>
          <div class="info-right">
            <input type="text" v-model="cardUserName"  style="text-align:left" placeholder="请填写真实姓名" id />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">手机号码</div>
          <div class="info-right">
            <input type="text" v-model="realMobile" style="text-align:left" placeholder="请填写手机号码" id />
          </div>
        </div>
      </div>
    </div>
    <div class="item" style="margin-top:0.3rem">
      <div
        class="item-titles"
        style="padding:0;line-height:0.72rem;font-size:0.32rem;font-weight:600"
      >佣金提取规则</div>
      <div
        class="item-main"
        style="padding-right:0.44rem;font-size:0.28rem;
font-weight:500;
color:rgba(34,34,34,1);
line-height:0.48rem;"
      >
        <div class="p">
          <p>1、招募初级合伙人，提取奖励金1584元；</p>
          <p>2、推广vip，享全额vip奖励金；</p>
          <p>3、提现高额永久管道佣金+高额奖励金；</p>
          <p>4、发起提现---验证信息---完成提现。</p>
        </div>
      </div>
    </div>
    <div @click="applyOutCash" class="btn">确认并提取奖励金</div>
  </div>
</template>

<script>
import serviceApi from "../../../../service/AExtension/serviceConfig"
export default {
  data() {
    return {
      // level: 1,
      downNumber: 0,
      cangetMoneyTimes: 0,
      oMoney: 0,
      evegetMoneyNum: 8,
      bankName: "",
      bankFullName: "",
      cardNo: "",
      cardUserName: "",
      realMobile: "",
      cashPromTimes: ""
    };
  },
  components: {
  },
  mounted() {
    this.getPromoterBasicInfo();
    // this.applyOutCash()
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
          if (res && res.data && res.data.resultMap) {
            let resultMap = res.data.resultMap;
            _this.downNumber = resultMap.downNumber;
            _this.oMoney = resultMap.oMoney;
            // _this.level = resultMap.level;
            _this.cashPromTimes = resultMap.cashPromTimes;
            _this.cardNo = resultMap.cardNo;
            _this.bankName = resultMap.bankName;
            _this.bankFullName = resultMap.bankFullName;
            _this.realMobile = resultMap.mobile;
            _this.cardUserName = resultMap.name;
          }
        });
    },
    applyOutCash() {
      let _this = this;
      if (
        !_this.bankName ||
        !_this.bankFullName ||
        !_this.cardNo ||
        !_this.cardUserName ||
        !_this.realMobile
      ) {
        this.$toast.fail('请填写完整的信息')
        return;
      }
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      this.$http
        .post(serviceApi.applyOutCash, {
          type: "3",
          bonusType: "1",
          promoterId: userId,
          money: _this.oMoney,
          bankName: _this.bankName,
          bankFullName: _this.bankFullName,
          carNo: _this.cardNo,
          cardUserName: _this.cardUserName,
          realMobile: _this.realMobile
        })
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.status == "00") {
            this.$toast.success('提现申请成功')
            setTimeout(() => {
              _this.$router.push({ path: "/" });
            }, 1000);
          } else {
            this.$toast(res.data.msg);
          }
        });
    }
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  padding: 0.3rem 0.36rem 0;
  background: rgba(250, 250, 250, 1);
}
.item {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.04rem 0.28rem 0rem rgba(70, 70, 70, 0.08);
  border-radius: 0.3rem;
}
.item > .item-title {
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  background: url("../../../../assets/img/z6.png");
  color: #fff;
  text-align: center;
  padding-top: 0.3rem;
  font-size: 0.28rem;
  background-size: 100% 100%;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding-bottom: 0.2rem;
  line-height: 1;
}
.item-titles{
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  background: rgba(97, 195, 255, 1);
  color: #fff;
  text-align: center;
  padding-top: 0.3rem;
  font-size: 0.28rem;
  background-size: 100% 100%;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding-bottom: 0.2rem;
  line-height: 1;
}
.item > .item-main {
  padding: 0 0.33rem 0.17rem;
  background-color: #fff;
  position: relative;
  margin-top: 0.18rem;
  border-radius: 0.3rem;
}
.info-item {
  height: 0.88rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.02rem solid rgba(34, 34, 34, 0.1);
  line-height: 0.88rem;
}
.can-money {
  width: 40.53vw;
  height: 7.73vw;
  text-align: center;
  line-height: 7.73vw;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 0.3rem;
  font-size: 0.28rem;
  ;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.3);
}
.info-text {
  font-size: 0.28rem;
  font-weight: normal;
  color: rgba(34, 34, 34, 1);
}
.info-right {
  flex-grow: 1;
  position: relative;
  display: flex;
}
.info-right > input {
  outline: none;
  border: 0;
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  line-height: 0.68rem;
  color: rgba(34, 34, 34, 1);
  font-size: 0.28rem;
  padding-left: .2rem;
  font-weight: 550;
}
/* .info-right::after {
  content: "";
  display: inline-block;
  height: 0.12rem;
  width: 0.12rem;
  border-color: #c8c8cd;
  border-style: solid;
  border-width: 0.04rem 0.04rem 0 0;
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: absolute;
  right: 0.02rem;
  top: 50%;
  margin-top: -0.06rem;
} */
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.24rem;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.24rem;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.24rem;
}
::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(34, 34, 34, 0.4);
  font-size: 0.24rem;
}
.btn {
  width: 81.86vw;
  height: 10.4vw;
  background: linear-gradient(
    45deg,
    rgba(255, 209, 0, 1),
    rgba(255, 215, 33, 1)
  );
  box-shadow: 0rem 0.06rem 0.16rem 0rem rgba(221, 191, 54, 0.09),
    0rem 0.14rem 0.34rem 0rem rgba(170, 140, 6, 0.08);
  border-radius: 0.4rem;
  font-size: 0.32rem;
  ;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 10.4vw;
  margin: 0.4rem auto 0;
}
.p p{
  font-weight: normal ;
}
</style>