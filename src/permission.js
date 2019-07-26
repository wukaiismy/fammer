import router from "./router";
import store from "./store";
import { getToken } from "@/httpConfig/auth"; // getToken from cookie
const whiteList = [
  "/Homepage",
  "/RecommendDetails",
  "ActDetails",
  "/login",
  "/Reg",
  "/ForGets",
  "/MyCenter",
  "FoodList"
];

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (getToken()) {
    // console.log(1111);
    console.log(getToken());
    if (store.getters.name.length === 0) {
      // 判断当前用户是否已拉取完user_info信息
      store
        .dispatch("GetUserInfo")
        .then(res => {
          // 拉取user_info
          next();
        })
        .catch(err => {
          store.dispatch("FedLogOut").then(() => {
            console.log(err || "验证失败, 请重新登录");
            next({ path: "/login" });
          });
        });
    } else {
      // console.log(store.getters.name);
      next();
    }
  } else {
    // console.log(22222);
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({
        path: "/login?",
        query: { redirect: to.fullPath }
      });
    }
  }
});

router.afterEach(() => {});
