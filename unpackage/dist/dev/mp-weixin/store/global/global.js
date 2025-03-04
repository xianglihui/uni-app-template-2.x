"use strict";
const userinfo = {
  state: {
    userInfo: [],
    //用户信息
    curCheckInfo: {},
    token: "",
    openid: 0,
    appointInfo: null,
    appointUser: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  }
};
exports.userinfo = userinfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/store/global/global.js.map
