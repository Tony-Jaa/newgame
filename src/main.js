// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
// import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import { Toast } from 'vant';
import { Tab, Tabs } from 'vant';

Vue.prototype.$http = Axios

Vue.use(Tab).use(Tabs);
Vue.config.productionTip = false
Vue.use(router);
Vue.use(VueRouter);
Vue.use(Vuex)



Vue.use(Toast);

Vue.use(VueLazyload,{
  preload:1.3,
  error:require('./assets/error.jpg'),
  loading:require('./assets/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
