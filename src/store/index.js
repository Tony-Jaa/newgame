import Vue from 'vue';
import Vuex from 'vuex';
import serviceApi from "../service/serviceConfig";
import axios from 'axios'

Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象
  tabindex: 0,
  barindex: 0,
  userInfo: {

  },
  homeClassList: [[],[]],
  homeClassIndex: {
    child: 0,
    man: 0
  },
  label_think: [],
  label_pro: [],
  age: -1,    //月份
  labelUpload: {
    label_thinkId: [],
    label_proId: []
  },
  hasLabel: true,  //默认已经填写了label
  cepingInfo: {
    age: 0,
    resultMap: {
      records: [{ level: '' }, { level: '' }, { level: '' }, { level: '' }],
      info: {

      },
      celebrity: {},
      template: {}
    },
    typeName: [],

  },
  cepingShow: false
};
const getters = {   //实时监听state值的变化(最新状态)
  tabindex(state) {  //承载变化的showFooter的值
    return state.tabindex
  },
  barindex(state) {  //承载变化的showFooter的值
    return state.barindex
  },
  hasLabel(state) {
    return state.hasLabel
  },
  cepingInfo(state) {
    return state.cepingInfo
  }
};
const mutations = {
  settabindex(state, data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.tabindex = data;
  },
  setbarindex(state, data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    if (data == 0) {
      document.title = '小Z懂你'
    } else if (data == 1) {
      document.title = '思维课堂'
    } else {
      document.title = '我的'
    }
    state.barindex = data;
  },
  changeUserInfo(state, data) {
    state.userInfo = data
    sessionStorage.setItem("endTime", data.endtime);
  },
  changeLabelSiwei(state, data) {
    state.label_think = data.label_think
    state.label_pro = data.label_pro
  },
  changeAge(state, data) {
    let mins = new Date(data).getTime()
    let nowMins = new Date().getTime()
    let age = Math.floor((nowMins - mins) / 1000 / 60 / 60 / 24 / 30)  //月份
    state.age = age
  },
  uploadLabel(state, data) {
    if (data.id == 0) {   //问题第一页
      state.labelUpload.label_thinkId = data.label
    } else if (data.id == 1) {   //标签第二页
      state.labelUpload.label_proId = data.label
    }
  },
  changehomeClassList(state, data) {
    state.homeClassList=[[],[]];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.audienceType == 1) {
        state.homeClassList[0].push(element);
      } else if (element.audienceType == 2) {
        state.homeClassList[1].push(element);
      }
    }
  },
  hasLabelChange(state, data) {
    state.hasLabel = data
  },
  // 防止IOS上拉下拉问题
  overscroll(state, el) {
    el.addEventListener("touchstart", function () {
      var top = el.scrollTop,
        totalScroll = el.scrollHeight,
        currentScroll = top + el.offsetHeight;
      if (top <= 5) {
        el.scrollTop = el.scrollTop + 1;
      } else if (currentScroll >= totalScroll - 5) {
        el.scrollTop = top - 1;
      }
    });
  },
  changeCepingInfo(state, info) {

    state.cepingShow = true
    if (!info.info) {
      // 没有测评结果
      return
    }
    let startDate = info.info.birthday
    var date = new Date();
    startDate = new Date(startDate);
    var newDate = date.getTime() - startDate.getTime();
    state.cepingInfo.age = Math.floor(newDate / 1000 / 60 / 60 / 24 / 365);
    let typeName = [];
    const records = info.records;
    records.map(ele => {
      typeName.push(ele.typeName)
    })
    state.cepingInfo.typeName = typeName
    state.cepingInfo.resultMap = info
  }

};
const actions = {
  // 小Z懂你推荐课程
  getRecommendResources({ commit }) {
    let openid = JSON.parse(localStorage.getItem('userWechatInfo')).openid
    const _this = this;
    axios.get('/api/wx/crs/course/listcoursebylabel', {
      params: { userId: state.userInfo.id, openid }
    }).then(res => {
      if (res && res.data) {
        commit('changehomeClassList', res.data.data)
        if (res.data.resultMap) {
          commit('changeCepingInfo', res.data.resultMap.appraisal.resultMap)
        }
      }
    })
  },
  // 添加用户label
  addUserLabel({ dispatch, commit, state }, openId) {
    let label = [...state.labelUpload.label_thinkId, ...state.labelUpload.label_proId]
    label = label.join(',')
    axios.post('/api/wx/crs/courselabel/saveuserlabel', {
      openId, label
    }).then(res => {
      console.log(res)
      if (res && res.data && res.data.status == '00') {
        // 标签添加完成
        dispatch('getUserInfo')
      }
    })
  },
  // 获取用户信息缓存全局
  getUserInfo({ commit, dispatch }, userId) {
    if (!userId) {
      userId = JSON.parse(localStorage.getItem('userWechatInfo')).id
    }
    axios.get(`${serviceApi.getUserInfo}?userId=${userId}`)
      .then(res => {
        if (res && res.data && res.data.resultMap) {
          commit('changeUserInfo', res.data.resultMap)
          commit('changeAge', res.data.resultMap.kidBirthday)
          if (res.data.resultMap.userLabelCount > 0) {
            dispatch('getRecommendResources')
          } else {
            commit('hasLabelChange', false)
          }
        }
      })
  },
  // 重新设置分享,修改信息即可
  newShareUse({},callback) {
    //callback放置的是新的标题等一些设置信息
    wx.updateAppMessageShareData({
      title: callback.title, // 分享标题
      link: callback.link, // 分享链接
      imgUrl: callback.imgUrl, // 分享图标
      success: function() {
        callback.ok();
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        callback.cancel();
        // 用户取消分享后执行的回调函数
      }
    });
  }
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
export default store;
