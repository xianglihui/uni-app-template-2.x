"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_index_api = require("./api.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages/index/index.vue:19", "启动");
    pages_index_api.test().then((res) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:21", "调用成功", res);
    });
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.t($data.title)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
