import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeMain',
      component: resolve => require(['@/pages/Base/home'], resolve),
      redirect: '/home/0'
    }, {
      path: '/home/:index',
      name: 'home',
      component: resolve => require(['@/pages/Base/home'], resolve),
    }, {
      // path: '/courseDetails/:id/:listImage',
      path: '/courseDetails/:id/:fromvip',
      name: 'courseDetails',
      component: resolve => require(['@/pages/Course/courseDetails'], resolve)
    }, {
      path: '/More2/:collegeId/:type',
      name: 'More2',
      component: resolve => require(['@/pages/Course/More2'], resolve)
    }, {
      path: '/XZ',
      name: 'XZ',
      component: resolve => require(['@/pages/Course/XZ'], resolve)
    },{
      path: '/pictextdetails/:id',
      name: 'pictextdetails',
      component: resolve => require(['@/pages/Course/pictextdetails'], resolve)
    }, {
      path: '/hasbuy',
      name: 'hasbuy',
      component: resolve => require(['@/pages/Mine/hasbuy'], resolve)
    }, {
      path: '/collection',
      name: 'collection',
      component: resolve => require(['@/pages/Mine/collection'], resolve)
    }, {
      path: '/personalInfo',
      name: 'personalInfo',
      component: resolve => require(['@/pages/Mine/personalInfo'], resolve)
    }, {
      path: '/personalVIP',
      name: 'personalVIP',
      component: resolve => require(['@/pages/Mine/personalVIP'], resolve)
    }, {
      path: '/playHistory',
      name: 'playHistory',
      component: resolve => require(['@/pages/Mine/playHistory'], resolve)
    }, {
      path: '/thevip',
      name: 'thevip',
      component: resolve => require(['@/pages/Mine/thevip'], resolve)
    }, {
      path: '/xzvip/:phone',
      name: 'xzvip',
      component: resolve => require(['@/pages/Mine/xzvip'], resolve)
    },
    {
      path: '/poster',
      name: 'poster',
      component: resolve => require(['@/pages/poster/poster'], resolve)
    },
    {
      path: '/joinus',
      name: 'joinus',
      component: resolve => require(['@/pages/AExtension/others/joinus'], resolve)
    },
    {
      path: '/memberUp',
      name: 'memberUp',
      component: resolve => require(['@/pages/AExtension/others/memberUp'], resolve)
    },
    {
      path: '/promotionrule',
      name: 'promotionrule',
      component: resolve => require(['@/pages/AExtension/others/promotionrule'], resolve)
    },
    {
      path: '/share',
      name: 'share',
      component: resolve => require(['@/pages/AExtension/others/share'], resolve)
    },
    {
      path: '/commissionwithdraw',
      name: 'commissionwithdraw',
      component: resolve => require(['@/pages/AExtension/WithdrawalsRecord/commissionwithdraw'], resolve)
    },
    {
      path: '/withdrawRecord',
      name: 'withdrawRecord',
      component: resolve => require(['@/pages/AExtension/WithdrawalsRecord/withdrawRecord'], resolve)
    },
    {
      path: '/withdrawcenter',
      name: 'withdrawcenter',
      component: resolve => require(['@/pages/AExtension/WithdrawalsRecord/withdrawCenter/withdrawcenter'], resolve)
    },
    {
      path: '/withdrawPeople',
      name: 'withdrawPeople',
      component: resolve => require(['@/pages/AExtension/WithdrawalsRecord/withdrawCenter/withdrawPeople'], resolve)
    },
    {
      path: '/withdrawVip',
      name: 'withdrawVip',
      component: resolve => require(['@/pages/AExtension/WithdrawalsRecord/withdrawCenter/withdrawVip'], resolve)
    },
    {
      path: '/applypro',
      name: 'applypro',
      component: resolve => require(['@/pages/AExtension/PromoterStatus/applypro'], resolve)
    },
    {
      path: '/payPromotioncenter',
      name: 'payPromotioncenter',
      component: resolve => require(['@/pages/AExtension/PromoterStatus/payPromotioncenter'], resolve)
    },
    {
      path: '/promotioncenter',
      name: 'promotioncenter',
      component: resolve => require(['@/pages/AExtension/PromoterStatus/promotioncenter'], resolve)
    },
    {
      path: '/promotionReview',
      name: 'promotionReview',
      component: resolve => require(['@/pages/AExtension/PromoterStatus/promotionReview'], resolve)
    },
  ]
})
