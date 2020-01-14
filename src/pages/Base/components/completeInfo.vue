<template>
  <div class="complete-info" :class="[hide?'complete-hide':'']">
    <div class="top">
      <div class="bg1"></div>
      <div class="bg2"></div>
      <p class="tip1">请先完善宝贝信息</p>
      <p class="tip2">用户获取适龄内容和服务</p>
      <div class="sexdiv">
        <div class="sex-item" @click="changeGender(1)" :class="[gender==1?'boyselected':'']">
          <div class="sex-img">
            <img v-lazy="require('../../../assets/images/completeInfo/boy.png')" alt />
          </div>
          <div class="sex-name">男孩</div>
        </div>
        <div class="sex-item" @click="changeGender(2)" :class="[gender==2?'girlselected':'']">
          <div class="sex-img">
            <img v-lazy="require('../../../assets/images/completeInfo/girl.png')" alt />
          </div>
          <div class="sex-name">女孩</div>
        </div>
      </div>
    </div>
    <div class="choose-age">
      <div class="choose-age-row">
        <div style="display:flex;align-items: center;">
          <img v-lazy="require('../../../assets/images/completeInfo/birthday.png')" alt />
        </div>
        <div class="datatime" @click='dataPopShow = true'>
          <van-field v-model="birthday" placeholder="选择宝贝生日"  />
        </div>
      </div>
    </div>
    <div class="btn" @click="completeInfo">完成</div>
    <div class="icon">
      <img v-lazy="require('../../../assets/images/completeInfo/icon.png')" alt />
    </div>
    <van-popup v-model="dataPopShow" position="bottom">
      <van-datetime-picker
        type="date"
        :min-date="minBirthDay"
        :max-date="maxBirthDay"
        @cancel="dataPopShow = false"
        @confirm="getBirthday"
      />
    </van-popup>
  </div>
</template>
<script>
// import { Datetime, Group, Toast } from "vux";
import { DatetimePicker, Popup , Field  } from "vant";
import serviceApi from "../../../service/Base/serviceConfig";
export default {
  data() {
    return {
      hide: false,
      gender: 1,
      birthday: "",
      minBirthDay: new Date(2000, 0, 1),
      maxBirthDay: new Date(),
      dataPopShow: false
    };
  },
  components: {
    // Datetime,
    // Group,
    // Toast
    vanDatetimePicker: DatetimePicker,
    vanPopup: Popup,
    vanField:Field
  },
  mounted() {
    this.minAndMaxBirthDayChange();
  },
  methods: {
    changeGender(gender) {
      this.gender = gender;
    },
    minAndMaxBirthDayChange() {
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth();
      let day = nowDate.getDate();
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + (month + 1) : month + 1;
      // this.minBirthDay = `${year - 6}/${month}/${day}`;
      this.minBirthDay = new Date(year - 6, month, day);
      // this.maxBirthDay = `${year}/${month}/${day}`;
      this.maxBirthDay = new Date(year, month, day);
    },
    completeInfo() {
      if (!this.birthday) {
        this.$toast('请先填写宝贝年龄')
        return;
      }
      this.updateUserInfo();
    },
    updateUserInfo: function() {
      this.$store.commit("changeAge", this.birthday);
      const _this = this;
      const url = `${serviceApi.updateUserInfo}`;
      let userWechatInfo = JSON.parse(localStorage.getItem("userWechatInfo"));
      let openId = userWechatInfo.openid;
      this.$http
        .post(
          serviceApi.getLabelListByAgeBracket,
          { birthDate: this.birthday, openId, gender: this.gender }
        )
        .then(res => {
          if (res && res.data) {
            this.hide = true;
            let label_think = [...res.data.fixed, ...res.data.rand_thinking];
            let label_pro = [...res.data.rand_problem];
            this.$store.commit("changeLabelSiwei", { label_think, label_pro });
          }
        });
    },
    // 用户选择日期
    getBirthday(value) {
      this.dataPopShow = false;
      let year = value.getFullYear();
      let month = value.getMonth();
      let day = value.getDate();
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + (month + 1) : month + 1;
      this.birthday = `${year}-${month}-${day}`;
    }
  }
};
</script>
<style scoped>
.complete-info {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  z-index: 999;
  font-size: 0.32rem;
  transition: all 0.2s linear;
  overflow: hidden;
}
.complete-hide {
  left: -100%;
}
.bg1 {
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  background: linear-gradient(
    -85deg,
    rgba(255, 177, 0, 0.19),
    rgba(255, 232, 126, 0.19)
  );
  border-radius: 50%;
  left: 0.25rem;
  top: 0.72rem;
}
.bg2 {
  position: absolute;
  width: 1.33rem;
  height: 1.72rem;
  background: linear-gradient(
    68deg,
    rgba(255, 177, 0, 0.23),
    rgba(255, 232, 126, 0.23)
  );
  border-radius: 50%;
  right: -0.39rem;
  top: 0.72rem;
}
.top {
  width: 7.5rem;
  height: 4.21rem;
  background: linear-gradient(
    -85deg,
    rgba(255, 209, 0, 1),
    rgba(255, 219, 56, 1)
  );
  position: relative;
}
.tip1 {
  padding-top: 1rem;
  text-align: center;
  font-size: 0.44rem;
  font-weight: bold;
  color: rgba(254, 254, 254, 1);
  line-height: 1;
}
.tip2 {
  margin-top: 0.4rem;
  text-align: center;
  font-size: 0.28rem;
  font-weight: bold;
  color: rgba(254, 254, 254, 0.9);
  line-height: 1;
}
.sexdiv {
  padding: 0.55rem 0.76rem 0.62rem;
  display: flex;
  justify-content: space-between;
}
.sex-item {
  width: 2.39rem;
  height: 0.96rem;
  background-color: rgba(255, 204, 8, 1);
  border: 0.02rem solid rgba(255, 255, 255, 0.41);
  border-radius: 0.48rem;
  display: flex;
  align-items: center;
}
.sex-img {
  width: 0.79rem;
  height: 0.79rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.09rem;
}
.sex-img > img {
  width: 0.31rem;
}
.sex-name {
  flex-grow: 1;
  line-height: 1;
  text-align: center;
  font-size: 0.3rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.boyselected {
  background-color: rgba(126, 206, 255, 1);
}
.girlselected {
  background-color: #ffa49c;
}
.choose-age {
  margin-top: 0.72rem;
  padding: 0 0.76rem 0 0.87rem;
}
.choose-age-row img {
  width: 0.4rem;
  height: 0.44rem;
  display: block;
}
.choose-age-row {
  display: flex;
}
.datatime {
  flex-grow: 1;
  margin-left: 0.34rem;
  position: relative;
  display: flex;
  align-items: center;
}
.datatime::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -0.42rem;
  width: 100%;
  height: 0.02rem;
  background: rgba(0, 0, 0, 0.08);
}
.btn {
  width: 4.93rem;
  height: 0.88rem;
  background: linear-gradient(
    45deg,
    rgba(255, 209, 0, 1),
    rgba(255, 215, 33, 1)
  );
  box-shadow: 0 0.05rem 0.16rem 0 rgba(221, 191, 54, 0.09),
    0 0.13rem 0.33rem 0 rgba(170, 140, 6, 0.08);
  border-radius: 0.44rem;
  text-align: center;
  margin: 1.33rem auto 0;
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 0.88rem;
}
.icon {
  width: 3.36rem;
  height: 1.05rem;
  margin: 2.23rem auto 0;
}
.icon img {
  width: 100%;
  height: 100%;
}
.datatime-van {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
<style>
.vux-cell-placeholder {
  color: rgba(0, 0, 0, 0.3);
}
.vux-datetime {
  display: block;
  width: 100%;
}
.complete-info .van-cell{
  padding: 0;
  background-color: transparent;
  position: relative;
}
</style>