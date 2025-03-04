"use strict";
const common_vendor = require("../common/vendor.js");
const store_global_global = require("./global/global.js");
const store = common_vendor.createStore({
  ...store_global_global.userinfo
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
