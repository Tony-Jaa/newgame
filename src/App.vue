<template>
  <div id="app">
    <keep-alive include="home">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import serviceConfig from "./service/serviceConfig";
import qs from "qs";
import urlencode from "urlencode";
import wxConfig from "./service/wx.config";
import { getQueryVariable } from "./utils/utils";
import $ from "jquery";
export default {
  name: "App",
  computed: {},
  mounted: function() {
    $("input").blur(() => {
      window.scroll(0, 0);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      document.getElementById("app").scrollTop =
        document.getElementById("app").scrollTop - 1;
    });
    // console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV == "development") {
      localStorage.setItem(
        "userWechatInfo",
        JSON.stringify({
          country: "中国",
          image:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ergInYWwsOFStS5hnbsJEEXaia1VLBIIzKHErJpDrcicQYVHkgJsZGyL88UyF0gcwBEqKCCRXIMibZUw/132",
          unionid: null,
          propMobile: null,
          city: "蚌埠",
          openid: "o0rH3s7aw9_hZ_1zEAJC-6tZj_wY",
          nickName: "A.七忘°",
          sex: "1",
          authToken: "87b66161-9236-4fd7-9b1c-89531ca13c65",
          vipMobile: "13913833199",
          province: "安徽",
          id: "10316",
          vip: "0"
        })
      );
    }
    // 测试环境数据
    // let testInfo = JSON.parse(localStorage.getItem("userWechatInfo"));
    // if (testInfo && testInfo.id == "10147") {
    //   localStorage.setItem("userWechatInfo", "");
    // }

    history.pushState(null, null, document.URL);
    window.addEventListener(
      "popstate",
      function(e) {
        if (
          (location.href.indexOf("share") != -1 ||
            location.href.indexOf("joinus") != -1) &&
          location.href.indexOf("userId") != -1
        ) {
          location.href = window.location.href.split("#")[0];
        }
      },
      false
    );
    const wxData =
      location.href.indexOf("public") > -1 ? wxConfig.prd : wxConfig.test;
    const r_url = wxData.r_url;
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      wxData.appId
    }&redirect_uri=${urlencode(
      r_url
    )}&response_type=code&scope=snsapi_userinfo&state=111#wechat_redirect`;
    let query = window.location.search.substring(1);
    this.url = url;
    const userWechatInfo = localStorage.getItem("userWechatInfo");
  },
  methods: {
    getAcessToken: function(code) {
      let _this = this;
      this.$http({
        method: "post",
        url: serviceConfig.doLogin,
        // headers:{
        //   'Content-Type':'application/x-www-form-urlencoded'
        // },
        data: {
          code
        }
      })
        .then(function(res) {
          if (res.data && res.data.resultMap) {
            const userWechatInfo = res.data.resultMap;
            localStorage.setItem(
              "userWechatInfo",
              JSON.stringify(userWechatInfo)
            );
          }
        })
        .then(function() {
          // window.location.href = window.location.origin + '/#/home'
        });
    }
  }
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

body {
  -webkit-overflow-scrolling: touch;
}
body {
  background: rgb(250, 250, 250);
}

body,
p {
  margin: 0;
  padding: 0;
}

div {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  overflow: auto;
}
html {
  font-size: 13.3333vw;
}
.weui-progress__bar {
  height: 0.3rem !important;
  border-radius: 0.16rem;
  overflow: hidden;
}
.weui-progress__inner-bar {
  /* background-color:rgb(39, 166, 245)!important; */
  border-radius: 0.16rem;
}
.vux-swiper-item div {
  background-size: 100% !important;
}
</style>
<style lang="less">
/* 从vux中提取出的初始化样式 */
@import "./assets/common/reset.less";

@import "./assets/common/common.css";
</style>
