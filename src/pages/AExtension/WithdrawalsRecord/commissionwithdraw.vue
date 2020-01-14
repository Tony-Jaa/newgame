<template>
  <div class="bg">
    <div class="item">
      <div class="item-title">
        <p>可提取佣金&nbsp;(元)</p>
        <p style="font-size:.64rem;font-weight:800;margin-top:0.34rem">{{money.toFixed(2)}}</p>
      </div>
      <div class="item-main">
        <div class="info-item" style="border:0;margin-bottom:.05rem;">
          <div class="info-text">提取金额</div>
          <div class="can-money" style="position: relative;text-align:left;padding-left:.4rem">
            ￥
            <input
              style="position: absolute;
            text-align: center;
            right:0;
    line-height: .58rem;
    background: rgba(0, 0, 0, 0.07);
    border-radius: .3rem;
    font-size: .28rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    outline:none;border:0
            "
              type="text"
              v-model="extractMoney"
              :placeholder="withdrawMoney.toFixed(2)"
              id
            />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">银行名称</div>
          <div class="info-right">
            <input type="text" v-model="bankName" style="text-align:left" placeholder="银行名称" id />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">开户行</div>
          <div class="info-right">
            <input
              type="text"
              v-model="bankFullName"
              style="text-align:left;padding-left:.5rem;"
              placeholder="请填写准确的开户行名称"
              id
            />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">银行卡号</div>
          <div class="info-right">
            <input type="text" v-model="carNo" style="text-align:left" placeholder="请填写准确的银行卡号" id />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">真实姓名</div>
          <div class="info-right">
            <input
              type="text"
              v-model="cardUserName"
              style="text-align:left"
              placeholder="请填写真实姓名"
              id
            />
          </div>
        </div>
        <div class="info-item">
          <div class="info-text">手机号码</div>
          <div class="info-right">
            <input
              type="text"
              v-model="realMobile"
              style="text-align:left"
              placeholder="请填写手机号码"
              id
            />
          </div>
        </div>
      </div>
    </div>
    <div class="item" style="margin-top:.3rem">
      <div
        class="item-titles"
        style="padding:0;line-height:.72rem;font-size:.32rem;font-weight:600"
      >佣金提取规则</div>
      <div
        class="item-main"
        style="padding-right:.44rem;font-size:.28rem;
color:rgba(34,34,34,1);
line-height:.48rem;"
      >
        <div class="p">
          <p>1、提取佣金金额可修改并发起提取申请；</p>
          <p>2、提现高额永久管道佣金+高额奖励金；</p>
          <p>3、发起提现---验证信息---完成提现。</p>
        </div>
      </div>
    </div>
    <div class="btn" @click="getmoney">确认并提取佣金</div>
  </div>
</template>

<script>
import serviceApi from "../../../service/AExtension/serviceConfig";

export default {
  data() {
    return {
      withdrawMoney: 0,
      money: 0,
      bankName: "",
      bankFullName: "",
      carNo: "",
      cardUserName: "",
      realMobile: "",
      extractMoney: ""
    };
  },
  mounted() {
    this.getPromoterBasicInfo();
  },
  methods: {
    getPromoterBasicInfo: function() {
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      if (!userId) {
        this.$toast({ message: "请先关注公众号", icon: "warning-o" });
        return false;
      }
      const _this = this;
      const url = `${serviceApi.getPromoterBasicInfo}` + "?userId=" + userId;
      this.$http({
        method: "get",
        url: url
        // timeout: 1000
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.money = response.data.resultMap.downMoney;
            _this.withdrawMoney = response.data.resultMap.downMoney;
            _this.carNo = response.data.resultMap.cardNo;
            _this.bankName = response.data.resultMap.bankName;
            _this.bankFullName = response.data.resultMap.bankFullName;
            _this.realMobile = response.data.resultMap.mobile;
            _this.cardUserName = response.data.resultMap.name;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
          _this.$toast("网络失败");
        });
    },
    getmoney() {
      let _this = this;
      if (
        !_this.bankName ||
        !_this.bankFullName ||
        !_this.carNo ||
        !_this.cardUserName ||
        !_this.realMobile
      ) {
        this.$toast.fail("请填写完整的信息");
        return;
      }
      let userId = JSON.parse(localStorage.getItem("userWechatInfo")).id;
      if (!userId) {
        this.$toast({ message: "请先关注公众号", icon: "warning-o" });
        return false;
      }

      this.$http
        .post(serviceApi.applyOutCash, {
          type: "1",
          promoterId: userId,
          money: _this.extractMoney ? _this.extractMoney : _this.money,
          bankName: _this.bankName,
          bankFullName: _this.bankFullName,
          carNo: _this.carNo,
          cardUserName: _this.cardUserName,
          realMobile: _this.realMobile
        })
        .then(res => {
          if (res && res.data && res.data.status == "00") {
            this.$toast.success("申请成功");
          } else {
            this.$toast(res.data.msg);
          }
        })
        .catch(err => {
          this.$toast({ message: "提取失败", icon: "cross" });
        });
    }
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  padding: 0.3rem 0.36rem 0.49rem;
  background: rgba(250, 250, 250, 1);
  line-height: 1;
}
.item {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.04rem 0.28rem 0rem rgba(70, 70, 70, 0.08);
  border-radius: 0.3rem;
}
.item > .item-title {
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  background: url("../../../assets/img/z5.png");
  color: #fff;
  text-align: center;
  padding-top: 0.35rem;
  font-size: 0.28rem;
  color: rgba(255, 255, 255, 1);
  padding-bottom: 0.35rem;
  background-size: 100% 100%;
}
.item-titles {
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  background: rgba(255, 117, 91, 1);
  color: #fff;
  text-align: center;
  padding-top: 0.35rem;
  font-size: 0.28rem;
  color: rgba(255, 255, 255, 1);
  padding-bottom: 0.35rem;
  background-size: 100% 100%;
}
.item > .item-main {
  padding: 0 0.32rem 0.16rem;
  /* background-color: #fff; */
  position: relative;
  margin-top: 0.26rem;
  border-radius: 0.3rem;
}
.info-item {
  height: 0.81rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.02rem solid rgba(34, 34, 34, 0.1);
  line-height: 0.81rem;
}
.can-money {
  width: 3.04rem;
  height: 0.58rem;
  text-align: center;
  line-height: 7.73vw;
  border-radius: 0.3rem;
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.3);
}
.info-text {
  font-size: 0.28rem;
  color: rgba(34, 34, 34, 1);
  line-height: 0.58rem;
  font-weight: normal;
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
  font-size: 0.26rem;
  padding-left: 0.2rem;
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
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(34, 34, 34, 0.4);
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(34, 34, 34, 0.4);
}
::-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(34, 34, 34, 0.4);
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
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 10.4vw;
  margin: 0.4rem auto 0;
}
.p p {
  font-weight: normal;
}
</style>