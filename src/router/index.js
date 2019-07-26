import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history", // 访问路径不带井号 需要使用 history模式
  routes: [
    {
      path: "/",
      redirect: "/Homepage",
      component: () => import("@/components/Homepage")
    }, //这个是设置默认路由

    {
      path: "/Homepage",
      name: "Homepage",
      component: () => import("@/components/Homepage"),
      meta: {
        title: "E联农汇-主页",
        navShow: true,
        statusBgc: 1
      }
    },
    {
      path: "/RecommendDetails",
      name: "RecommendDetails",
      component: () => import("@/components/homepage/RecommendDetails"),
      meta: {
        title: "E联农汇-推荐详情",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/ActDetails",
      name: "ActDetails",
      component: () => import("@/components/homepage/ActDetails"),
      meta: {
        title: "E联农汇-详情",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/MsgList",
      name: "MsgList",
      component: () => import("@/components/MessageWall/MsgList"),
      meta: {
        title: "E联农汇-消息",
        navShow: false,
        statusBgc: 1
      }
    },

    {
      path: "/Login",
      name: "Login",
      component: () => import("@/components/Login/Login"),
      meta: { navShow: false, title: "demo-登录", statusBgc: 1 }
    },
    {
      path: "/Reg",
      name: "Reg",
      component: () => import("@/components/Login/Reg"),
      meta: { navShow: false, title: "demo-注册", statusBgc: 1 }
    },
    {
      path: "/MyCenter",
      name: "MyCenter",
      component: () => import("@/components/center/MyCenter"),
      meta: {
        title: "E联农汇-我的",
        navShow: true,
        statusBgc: 1
      }
    },
    {
      path: "/SubmitOrders",
      name: "SubmitOrders",
      component: () => import("@/components/business/SubmitOrders"),
      meta: {
        title: "E联农汇-接单页面",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/MsgHome",
      name: "MsgHome",
      component: () => import("@/components/MessageWall/MsgHome"),
      meta: {
        title: "E联农汇-WeChat",
        navShow: true,
        statusBgc: 1
      }
    },
    {
      path: "/WeChatShow",
      name: "WeChatShow",
      component: () => import("@/components/MessageWall/WeChatShow"),
      meta: {
        title: "demo-WeChatShow",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/FriendList",
      name: "FriendList",
      component: () => import("@/components/firends/FriendList"),
      meta: {
        title: "E联农汇-好友列表",
        navShow: true,
        statusBgc: 1
      }
    },

    {
      path: "/MapDemo",
      name: "MapDemo",
      component: () => import("@/components/maps/MapDemo"),
      meta: {
        title: "demo-MapDemo",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/MyAdds",
      name: "MyAdds",
      component: () => import("@/components/maps/MyAdds"),
      meta: {
        title: "demo-MyAdds",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/WorkingShow",
      name: "WorkingShow",
      component: () => import("@/components/maps/WorkingShow"),
      meta: {
        title: "demo-WorkingShow",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/Task",
      name: "Task",
      component: () => import("@/components/Task/Task"),
      meta: {
        title: "demo-Task",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/ResumeShow",
      name: "ResumeShow",
      component: () => import("@/components/center/public/ResumeShow"),
      meta: {
        title: "E联农汇-简历",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/BuyAsk",
      name: "BuyAsk",
      component: () => import("@/components/center/public/BuyAsk"),
      meta: {
        title: "E联农汇-发布求购",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/MySelfSetting",
      name: "MySelfSetting",
      component: () => import("@/components/center/public/MySelfSetting"),
      meta: {
        title: "E联农汇-个人设置",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/SettingUp",
      name: "SettingUp",
      component: () => import("@/components/center/public/SettingUp"),
      meta: {
        title: "E联农汇-个人详情",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/DataWork",
      name: "DataWork",
      component: () => import("@/components/center/public/DataWork"),
      meta: {
        title: "E联农汇-工作日程",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/Searchs",
      name: "Searchs",
      component: () => import("@/components/public/Searchs"),
      meta: {
        title: "E联农汇-搜索",
        navShow: false,
        statusBgc: 1
      }
    },
    // 分类美食
    {
      path: "/FoodList",
      name: "FoodList",
      component: () => import("@/components/foodClassification/FoodList"),
      meta: {
        title: "E联农汇-美食商城",
        navShow: true,
        statusBgc: 1
      }
    },
    {
      path: "/FoodDetails",
      name: "FoodDetails",
      component: () =>
        import("@/components/foodClassification/public/FoodDetails"),
      meta: {
        title: "E联农汇-详情",
        navShow: false,
        statusBgc: 1
      }
    },
    // 信息收集
    {
      path: "/InfoCollection",
      name: "InfoCollection",
      component: () => import("@/components/infoCollection/InfoCollection"),
      meta: {
        title: "E联农汇-商户录入",
        navShow: false,
        statusBgc: 1
      }
    },
    // 文章发布
    {
      path: "/TuWen",
      name: "TuWen",
      component: () => import("@/components/task/public/TuWen"),
      meta: {
        title: "E联农汇-图文发布",
        navShow: false,
        statusBgc: 1
      }
    },
    {
      path: "/Actives",
      name: "Actives",
      component: () => import("@/components/task/public/Actives"),
      meta: {
        title: "E联农汇-动态发布",
        navShow: false,
        statusBgc: 1
      }
    },
    //购物车订单类
    {
      path: "/ShopCarList",
      name: "ShopCarList",
      component: () => import("@/components/shopCar/ShopCarList"),
      meta: {
        title: "E联农汇-购物车",
        navShow: true,
        statusBgc: 1
      }
    },
    {
      path: "/OrderFill",
      name: "OrderFill",
      component: () => import("@/components/shopCar/public/OrderFill"),
      meta: {
        title: "E联农汇-填写订单",
        navShow: false,
        statusBgc: 1
      }
    }
  ]
});
