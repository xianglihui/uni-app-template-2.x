// import { USERINFO, TOKEN, OPENID } from "@/common/js/storeVariable.js";
export default {
  state: {
    userInfo: [], //用户信息
    curCheckInfo: {},
    token: "",
    openid: 0,
    appointInfo: null,
    appointUser: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
};