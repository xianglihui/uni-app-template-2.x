"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request_requestConfig = require("./requestConfig.js");
class Request {
  constructor(config = {}, reqInterceptor = null, resInterceptor = null, successHandler = null, failHandler = null, completehandler = null) {
    this.baseUrl = config.baseUrl;
    this.header = config.header || {
      "Content-Type": "application/json;charset=UTF-8"
    };
    this.requestInterceptor = reqInterceptor;
    this.responseInterceptor = resInterceptor;
    this.success = successHandler;
    this.fail = failHandler;
    this.complete = completehandler;
  }
  async request(options, successHandler = null, failHandler = null, completeHandler = null) {
    const { type = "request", hideLoading = false } = options;
    let config = null;
    try {
      config = await utils_request_requestConfig.reqConfig(this, options, successHandler, failHandler, completeHandler);
    } catch (e) {
      common_vendor.index.__f__("error", "at utils/request/request.js:21", e);
    }
    if (!config || typeof config != "object") {
      return Promise.reject({});
    }
    const _this = this;
    return new Promise((res, rej) => {
      config["success"] = (response) => {
        let _res = null;
        if (_this.responseInterceptor) {
          _res = _this.responseInterceptor(response);
        }
        if (!_res) {
          return;
        }
        successHandler && successHandler(response);
        if (_res.wakaryReqReject) {
          delete _res.wakaryReqReject;
          _res.url = config.url;
          _res.method = config.method;
          _res.params = config.data;
          rej(_res);
        } else {
          res(_res);
        }
      };
      config["fail"] = (err) => {
        failHandler && failHandler(err);
      };
      config["complete"] = (res2) => {
        let status = [200, 204, 401];
        if (status.includes(res2.statusCode) && !hideLoading) {
          common_vendor.index.hideLoading();
        }
        completeHandler && completeHandler(res2);
      };
      requestType(type, config);
    });
  }
}
const requestType = (type, config) => {
  switch (type) {
    case "request":
      common_vendor.index.request(config);
      break;
    case "upload":
      common_vendor.index.upload(config);
      break;
    default:
      common_vendor.index.downloadFile(config);
  }
};
exports.Request = Request;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/request/request.js.map
