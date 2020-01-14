<template>
  <div id="personalInfo" class="main-wrap" style="background:#FAFAFA">
    <div class="card-item-wrap">
      <div class="card-item">
        <div>头像</div>
        <div class="item-right-wrap">
          <img class="icon_logo" :src="personinfor.imageUrl" />
        </div>
      </div>
    </div>
    <div class="card-item-wrap">
      <div class="card-item">
        <div>昵称</div>
        <div class="item-right-wrap">
          <span class="margin-right-14">{{personinfor.nickName}}</span>
        </div>
      </div>
      <div class="card-item">
        <div>家长姓名</div>
        <div class="item-right-wrap">
          <!-- <XInput
            
            placeholder="请输入真实姓名"
            text-align="right"
            v-model="personinfor.realName"
          />-->
          <van-field
            class="class-input"
            v-model="personinfor.realName"
            placeholder="请输入真实姓名"
            input-align="right"
            clearable
          />
        </div>
      </div>
    </div>
    <div class="card-item-wrap">
      <div class="card-item">
        <div>手机号</div>
        <div class="item-right-wrap">
          <!-- <XInput
            class="class-input"
            placeholder="请输入手机号"
            text-align="right"
            v-model="personinfor.mobile"
          />-->
          <van-field
            class="class-input"
            v-model="personinfor.mobile"
            placeholder="请输入手机号"
            input-align="right"
            clearable
          />
        </div>
      </div>
      <div class="card-item">
        <div>地址</div>
        <div class="item-right-wrap">
          <!-- <XInput placeholder="请输入地址" text-align="right" v-model="personinfor.province" /> -->
          <van-field
            class="class-input"
            v-model="personinfor.province"
            placeholder="请输入地址"
            input-align="right"
            clearable
          />
        </div>
      </div>
    </div>
    <div class="card-item-wrap">
      <div class="card-item">
        <div>宝宝性别</div>
        <div class="item-right-wrap">
          <!-- <PopupPicker
            placeholder="请选择"
            :data="ganderList"
            v-model="gander"
            @on-change="change"
            :fixed-columns="1"
          />-->
          <van-field
          :border='false'
            disabled
            right-icon="arrow"
            @click="ganderModalShow=true"
            class="class-input"
            v-model="gander"
            placeholder="请选择"
            input-align="right"
          />
          <van-popup v-model="ganderModalShow" position="bottom">
            <van-picker show-toolbar :columns="ganderList" @confirm="change" />
          </van-popup>
        </div>
      </div>
      <div class="card-item">
        <div>宝宝生日</div>
        <div class="item-right-wrap">
          <!-- <datetime
            format="YYYY-MM-DD"
            v-model="personinfor.kidBirthday"
            @on-change="change"
            :start-date="minBirthDay"
            :end-date="maxBirthDay"
          ></datetime>-->
          <van-field
          :border='false'
            disabled
            right-icon="arrow"
            @click="dataPopShow=true"
            class="class-input"
            v-model="personinfor.kidBirthday"
            placeholder="请选择"
            input-align="right"
          />
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
      </div>
    </div>
    <div class="btn-wrap">
      <div @click="updateUserInfo" class="btn-submit">保存</div>
    </div>
    <div style="font-size:0.32rem"></div>
  </div>
</template>

<i18n>
  set bar-active-color:rgba(242, 200, 28, 1)
  zh-CN: rgba(242, 200, 28, 1)
</i18n>

<script>
let _this;
import serviceApi from "../../service/serviceConfig";
import { Field, Picker, Popup, DatetimePicker } from "vant";
export default {
  name: "personalInfo",
  data() {
    return {
      ganderList: ["男", "女"],
      value1: "2015-11-12",
      date: "",
      gander: "男",
      birthday: "",
      userId: "",
      showsucess: false,
      showfail: false,
      failtext: "",
      personinfor: {
        birthday: "",
        realName: null,
        country: "",
        province: "",
        city: "",
        nickName: "",
        imageUrl: "",
        sex: "",
        mobile: null,
        id: ""
      },
      minBirthDay: new Date(2000, 0, 1),
      maxBirthDay: new Date(),
      ganderModalShow: false,
      dataPopShow: false
    };
  },
  components: {
    vanField: Field,
    vanPopup: Popup,
    vanPicker: Picker,
    vanDatetimePicker: DatetimePicker
  },
  mounted: function() {
    this.minAndMaxBirthDayChange();
    document.title = "个人信息";
    const userWechatInfo = localStorage.getItem("userWechatInfo");
    this.userId = userWechatInfo ? JSON.parse(userWechatInfo).id : "";
    this.nickname = userWechatInfo ? JSON.parse(userWechatInfo).nickName : "";
    this.getUserInfo();
  },
  methods: {
    change: function(value) {
      if (value === "男") {
        this.personinfor.kidSex = 1;
      } else {
        this.personinfor.kidSex = 0;
      }
      this.gander = value;
      this.ganderModalShow = false;
    },
    handleDateTime: function(value) {
      this.personinfor.birthday = value;
      this.date = value;
    },
    getUserInfo: function(toHome) {
      const _this = this;
      const url = `${serviceApi.getUserInfo}` + "?userId=" + _this.userId;
      this.$http({
        method: "get",
        url: url
      })
        .then(function(response) {
          if (response.data.status == "00") {
            if (response.data.resultMap) {
              _this.personinfor = response.data.resultMap;
              if (!_this.personinfor.birthday) {
                _this.personinfor.birthday = "";
              } else {
                _this.personinfor.birthday = _this.personinfor.birthday.slice(
                  0,
                  10
                );
              }
              _this.gander = _this.personinfor.kidSex === 1 ? "男" : "女";
              if (toHome) {
                window.location.href = window.location.href.split("#")[0];
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改的信息
    updateUserInfo: function() {
      const _this = this;
      const url = `${serviceApi.updateUserInfo}`;
      this.$http({
        method: "post",
        url: url,
        data: _this.personinfor
      })
        .then(function(response) {
          if (response.data.status == "00") {
            _this.showsucess = true;
            _this.$toast.success("修改成功");
            _this.getUserInfo("backToHome");
          } else {
            _this.showfail = true;
            _this.failtext = "修改失败";
            _this.$toast.fail("修改失败");
          }
        })
        .catch(err => {
          _this.showfail = true;
          _this.failtext = "网络异常";
          _this.$toast.fail("网络异常");
        });
    },
    // 设置可选时间最大最小值
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
    // 用户选择日期
    getBirthday(value) {
      this.dataPopShow = false;
      let year = value.getFullYear();
      let month = value.getMonth();
      let day = value.getDate();
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + (month + 1) : month + 1;
      this.personinfor.kidBirthday = `${year}-${month}-${day}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.main-wrap {
  flex: 1;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0.24rem 0.4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.vux-datetime-value {
  display: block;
}
.card-item-wrap {
  background-color: #ffffff;
  border-radius: 0.2rem;
  min-height: 1.6rem;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0;
  margin-bottom: 0.12rem;
  .card-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem 0 0.4rem;
    font-size: 0.32rem;
  }
  .item-right-wrap {
    display: flex;
    align-items: center;
    max-width: 64%;
  }
}
.icon_logo {
  width: 1.04rem;
  height: 1.04rem;
  margin-right: 0.28rem;
}
.icon_arrow_right {
  width: 0.14rem;
  height: 0.24rem;
}
.margin-right-14 {
  margin-right: 0.28rem;
}
</style>
<style>
.weui-cell__ft {
  display: block !important;
}
.weui-cell__ft {
  display: none;
}
.weui-cell__ft::after {
  display: none;
}
.btn-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0.34rem;
}
.btn-submit {
  width: 5.34rem;
  height: 0.88rem;
  border-radius: 0.44rem;
  background-color: #fdd000;
  font-size: 0.34rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-submit:active {
  background-color: rgba(253, 208, 0, 0.8);
}
.margin-right-14 {
  margin-right: 0.28rem;
}
.vux-datetime-value {
  display: block;
}
.form-item-wrap {
  padding: 0 0.3rem 0 0.6rem;
}
.weui-cell {
  padding: 0.2rem 0 !important;
}
.vux-cell-value {
  margin-right: 0.1rem;
}
</style>
