import Request from "./request.js";
import store from "@/store/index.js";


const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pyhstzyy.cn/jeecg-boot';


const config = {
    baseUrl,
};
const reqInterceptor = async (options) => {
    //请求拦截器，设置header的一些内容
    options.header = {
        ...options.header,
        'X-Access-Token': `${store.getters.token}`,
    };
    if (!store.getters.token) {
        delete options.header["authorization"];
    }

    //加载提示,是否显示loading显示
    if (!options.hideLoading) {
        uni.showLoading({
            title: "正在加载中...",
            mask: options.mask,
        });
    }
    return options;
};
//定义响应拦截
const resInterceptor = (response) => {
    return statusCodeFun(response);
};
const statusCodeFun = (response) => {
    const { statusCode, errMsg, data } = response;
    // uni.hideLoading({
    //   noConflict: true
    // });
    if (statusCode == 200) {
        if (data.code === 500) {
            setTimeout(() => {
                uni.showToast({
                    title: data.message || '操作失败，请联系后台管理员',
                    mask: true,
                    icon: 'none',
                    duration: 2000
                });
            }, 0);
            // uni.showToast({
            //   icon: "none",
            //   title: data.message || '操作失败，请联系后台管理员',
            //   duration: 2000
            // });
            return;
        } else if (data.code === 510) {
            setTimeout(() => {
                uni.showToast({
                    title: data.message || '操作失败，请联系后台管理员',
                    mask: true,
                    icon: 'none',
                    duration: 2000
                });
            }, 0);
        }
        // else if (data.code === 200 && data.result?.code === '-1') {
        //   uni.showToast({
        //     icon: "none",
        //     title: data.result.msg || '操作失败，请联系后台管理员',
        //     duration: 2000
        //   });
        // } 
        else {
            return response.data;
        }
    } else if (statusCode == 204) {
        return {
            wakaryReqReject: true,
            msg: errMsg,
            res: response,
        };
    } else if (statusCode == 401) {
        store.commit('saveToken', 0)
        store.commit('saveOpenid', 0)
        store.commit('saveUserInfo', {
            data: 0,
            isSave: true
        });
        return {
            wakaryReqReject: true,
            msg: errMsg,
            res: response,
        };
    } else if (statusCode == 299) {
        uni.showToast({
            icon: "none",
            title: response.data,
            duration: 2000
        });
        return {
            wakaryReqReject: true,
            msg: errMsg,
            res: response,
        };
    } else if (statusCode >= 500) {
        uni.showToast({
            icon: "none",
            title: "网关异常",
            duration: 2000
        });
        return {
            wakaryReqReject: true,
            msg: "网关异常",
            res: response,
        };
    } else if (statusCode == 404) {
        return {
            wakaryReqReject: true,
            msg: "接口丢失了",
            res: response,
        };
    } else {
        uni.showToast({
            icon: "none",
            title: errMsg,
            duration: 2000

        });
        return {
            wakaryReqReject: true,
            msg: "服务器异常",
            res: response,
        };
    }
};
const request = new Request(config, reqInterceptor, resInterceptor);
export default request;
