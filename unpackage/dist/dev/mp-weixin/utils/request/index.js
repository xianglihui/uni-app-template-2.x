"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request_request = require("./request.js");
const store_index = require("../../store/index.js");
const baseUrl = "http://localhost:3000";
const config = {
  baseUrl
};
const reqInterceptor = async (options) => {
  options.header = {
    ...options.header,
    "X-Access-Token": `${store_index.store.getters.token}`
  };
  if (!store_index.store.getters.token) {
    delete options.header["authorization"];
  }
  if (!options.hideLoading) {
    common_vendor.index.showLoading({
      title: "正在加载中...",
      mask: options.mask
    });
  }
  return options;
};
const resInterceptor = (response) => {
  return statusCodeFun(response);
};
const statusCodeFun = (response) => {
  const { statusCode, errMsg, data } = response;
  if (statusCode == 200) {
    if (data.code === 500) {
      setTimeout(() => {
        common_vendor.index.showToast({
          title: data.message || "操作失败，请联系后台管理员",
          mask: true,
          icon: "none",
          duration: 2e3
        });
      }, 0);
      return;
    } else if (data.code === 510) {
      setTimeout(() => {
        common_vendor.index.showToast({
          title: data.message || "操作失败，请联系后台管理员",
          mask: true,
          icon: "none",
          duration: 2e3
        });
      }, 0);
    } else {
      return response.data;
    }
  } else if (statusCode == 204) {
    return {
      wakaryReqReject: true,
      msg: errMsg,
      res: response
    };
  } else if (statusCode == 401) {
    store_index.store.commit("saveToken", 0);
    store_index.store.commit("saveOpenid", 0);
    store_index.store.commit("saveUserInfo", {
      data: 0,
      isSave: true
    });
    return {
      wakaryReqReject: true,
      msg: errMsg,
      res: response
    };
  } else if (statusCode == 299) {
    common_vendor.index.showToast({
      icon: "none",
      title: response.data,
      duration: 2e3
    });
    return {
      wakaryReqReject: true,
      msg: errMsg,
      res: response
    };
  } else if (statusCode >= 500) {
    common_vendor.index.showToast({
      icon: "none",
      title: "网关异常",
      duration: 2e3
    });
    return {
      wakaryReqReject: true,
      msg: "网关异常",
      res: response
    };
  } else if (statusCode == 404) {
    return {
      wakaryReqReject: true,
      msg: "接口丢失了",
      res: response
    };
  } else {
    common_vendor.index.showToast({
      icon: "none",
      title: errMsg,
      duration: 2e3
    });
    return {
      wakaryReqReject: true,
      msg: "服务器异常",
      res: response
    };
  }
};
const request = new utils_request_request.Request(config, reqInterceptor, resInterceptor);
exports.request = request;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/request/index.js.map
