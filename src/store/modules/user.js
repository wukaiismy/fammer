import Cookies from "js-cookie";
import { getToken, setToken, removeToken } from "@/httpConfig/auth";
import { post, get } from "@/httpConfig/http";

import axios from "axios";
const user = {
  state: {
    user: "",
    status: "",
    code: "",
    token: getToken(),
    name: "",
    ids: "",
    tel: "",
    rgbs: "background: #43B02A;",
    admin_id: "",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    introduction: "",
    // roles: true,
    roles: false,
    u_type: "",
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_ID: (state, ids) => {
      state.ids = ids;
    },
    SET_ADMINID: (state, ID) => {
      state.admin_id = ID;
    },
    SET_TEL: (state, tel) => {
      state.tel = tel;
    },
    SET_UTYPE: (state, u_type) => {
      state.u_type = u_type;
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      console.log(userInfo);
      return new Promise((resolve, reject) => {
        var datalist = {};
        var url = "";
        if (userInfo.login_way == "a02") {
          datalist = {
            mobile: userInfo.mobile,
            verify_code: userInfo.verify_code
          };
          url = "/wangtian/api/v1/index_show/login/";
        } else if (userInfo.login_way == "a01") {
          url = "/wangtian/api/v1/index_show/login/";
        }
        axios
          .post(url, userInfo)
          .then(response => {
            console.log("token信息");
            console.log(response);
            if (response.data.code == "1") {
              const data = response.data.token;
              var token = "Bearer " + data;
              console.log(data);
              setToken(data);
              commit("SET_TOKEN", data);
              commit("SET_ID", response.data.mobile);
              commit("SET_TEL", response.data.mobile);
              resolve(response);
            } else {
              console.log("token信息有误，重新跳转到登录页面");
              resolve(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      var url = "/wangtian/api/v1/index_show/user_login_file/";
      return new Promise((resolve, reject) => {
        get(url)
          .then(response => {
            console.log("+++++用户信息+++++++++");
            console.log(response);
            const data = response;
            //如果用户信息存在
            if (data.code == "1") {
              console.log("+++++jinlai le ma +++++++++");
              console.log(data);
              commit("SET_NAME", data.data.nick_name);
              commit("SET_ADMINID", data.data.u_id);
              commit("SET_TEL", data.data.mobile);
              commit("SET_AVATAR", data.data.avatar);
              commit("SET_UTYPE", data.data.u_type);
            } else {
              //如果用户信息不存在
              // console.log("用户未注册");
              commit("SET_NAME", data.data.nick_name);
              commit("SET_ADMINID", data.data.u_id);
              commit("SET_TEL", data.data.mobile);
              commit("SET_AVATAR", data.data.avatar);
              commit("SET_UTYPE", data.data.u_type);
            }
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .get(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //修改密码退出到首页
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
    //个人中心修改昵称等
    changeNames({ commit }, userInfo) {
      var urlName = "/api/merchant/info/";
      console.log(userInfo);
      return new Promise((resolve, reject) => {
        axios
          .get(urlName, userInfo)
          .then(response => {
            commit("SET_NAME", response.name);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //保存token
    changeTokens({ commit }, userInfo) {
      console.log(userInfo);
      return new Promise((resolve, reject) => {
        if (userInfo.code == "1") {
          const data = userInfo.token;
          var token = "Bearer " + data;
          console.log(data);
          setToken(data);
          commit("SET_TOKEN", data);
          commit("SET_ID", userInfo.mobile);
          commit("SET_TEL", userInfo.mobile);
          resolve(userInfo);
        } else {
          console.log("token信息有误，重新跳转到登录页面");
          reject(userInfo);
        }
      });
    }
  }
};

export default user;
