// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue";
import App from "./App";
import router from "./router";
import "mint-ui/lib/style.css";
import {
  Button,
  Header,
  Cell,
  Popup,
  Spinner,
  Swipe,
  SwipeItem
} from "mint-ui";
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);
Vue.component(Popup.name, Popup);
Vue.component(Spinner.name, Spinner);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import axios from "axios";
import fastClick from "fastclick";
import "./stylesheets/main.scss";
import "babel-polyfill";

import WXConfig from "../static/wx.jsapi"; //微信分享
import common from "../static/commonFun"; //公共方法

import { Datetime, DatetimePlugin, LoadingPlugin, ToastPlugin } from "vux";
import Cookies from "js-cookie";
Vue.prototype.Cookies = Cookies;
//注册全局变量
Vue.prototype.common = common;

Vue.component("datetime", Datetime);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(DatetimePlugin);

console.log(`当前环境：${process.env.NODE_ENV}`);
let myEnv = process.env.NODE_ENV == "production" ? true : false; // 环境判断 true生产 false测试或本地
var sensors = require("sa-sdk-javascript");

sensors.init({
  use_client_time: true,
  send_type: "beacon",
  server_url: `https://shence8006.ygibao.com/sa?project=${
    myEnv ? "sinosig" : "default"
  }`,
  show_log: !myEnv,
  is_track_single_page: true,
  heatmap: {
    //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
    clickmap: "default",
    //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
    scroll_notice_map: "default"
  }
});
let currentAnonymousID;
if (common.checkMsgNull(Cookies.get("currentAnonymousID"))) {
  currentAnonymousID = Cookies.get("currentAnonymousID");
} else {
  currentAnonymousID = sensors.quick("getAnonymousID");
  Cookies.set("currentAnonymousID", currentAnonymousID, { expires: 60 });
}
sensors.registerPage({
  Application: "m_mkproperty",
  BU: "P",
  currentAnonymousID: currentAnonymousID
});
sensors.quick("autoTrack"); //用于采集 $pageview 事件

// 定义axios
Vue.prototype.$http = axios;
Vue.prototype.sensors = sensors;
// 移动端300 毫秒点击延迟的问题
// fastClick.attach(document.body)
Vue.config.productionTip = false;
//注册微信分享组件
Vue.prototype.WXConfig = WXConfig;
// 规定0：移动端  1：微信 2：微信小程序 3：PC端
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  window.sessionStorage.setItem("userAgentType", 1);
} else {
  // alert('不在微信里');
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    // return true; // 移动端
    window.sessionStorage.setItem("userAgentType", 0);
    // alert("移动设备");
  } else {
    // return false; // PC端
    // alert("pc设备");
    window.sessionStorage.setItem("userAgentType", 3);
  }
}

try {
  // 处理可回溯
  let tbdh = window.sessionStorage.getItem("tbdh");
  if (typeof _behaviorObj != "undefined") {
    if (common.checkMsgNull(tbdh)) {
      _behaviorObj.getTraceIdByOrderNo(tbdh, function(traceId) {
        if (traceId) {
          _behaviorObj.manualLogin2(traceId);
        } else {
          _behaviorObj.manualLogin2().then(function(res) {
            //重新将新轨迹ID绑定订单号
            _behaviorObj.setorderNo(tbdh, function(data) {
              if (data.resCode == "0000") {
                //后续逻辑
              }
            });
          });
        }
      });
    } else {
      _behaviorObj.manualLogin2();
    }
  }
} catch (err) {
  console.log('可回溯报错：' + err)
}

// 点击弹框时
// 需要先获取去body的top值,再给body定位,否则先定位的话,top值会先变成0
Vue.prototype.noScroll = function() {
  let top = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = -top + "px";
};

// 取消弹框时再取消定位
Vue.prototype.canScroll = function() {
  let top = Math.abs(parseFloat(document.body.style.top));
  document.body.style.top = "";
  document.body.style.position = "";
  window.scrollTo(0, top);
};

//在页面头部以同步的方式加载 js 代码
var start_time = new Date();
//定义起始时间
var end_time = "";
//定义结束时间
window.onload = function() {
  end_time = new Date();
  sensors.track("pageLoadTime", {
    loadTime: end_time.getTime() - start_time.getTime()
  });
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
