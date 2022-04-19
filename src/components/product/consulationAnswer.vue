<template>
  <div class="answerbody">
    <div class="wrap">
      <div class="mod">
        <h4 class="title_h4">您本次的咨询</h4>
        <div id="content_text">
          <ul class="mod_s">
            <li>
              <time>{{askTime}}</time>
            </li>
            <li>
              <p class="color_orange">问：{{askcontent}}</p>
            </li>
            <li>
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                  <p class="color_black" v-html="'答：'+answercontent"></p>
                </div>
            </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mod">
        <div class="ewm_box">
          <b>
            更多车险服务、产品、产品解答
            <br />请关注“阳光车险”公众号
          </b>
          <img src="../../../static/images/ewm2.png" />
          <p>长按保存图片至手机，然后使用微信扫一扫</p>
        </div>
      </div>
      <p
        class="p_ts"
      >*本页面仅是对用户特定问题的针对性通俗回答，具体保险产品的完整保障范围、责任免除规定等请以保险条款为准，请您购买保险产品前务必仔细阅读和了解保险产品条款，感谢关注！</p>
    </div>
    <!-- 信息提示 3S消失 -->
      <div class="message-tip" style="display:none;"></div>
  </div>
</template>
<script>
import 'quill/dist/quill.snow.css';
export default {
  name: "consultationAnswer",
  data() {
    return {
      askNum: this.$route.query.askNum,
      sign:this.$route.query.sign,
      askTime:"",
      askcontent:"",
      answercontent:""
    };
  },
  created() {
    //隐藏微信操作菜单
    function onBridgeReady() {
      WeixinJSBridge.call("hideOptionMenu");
    }
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  },
  mounted() {
      this.selectAnswer();
  },
  methods: {
    //错误提示方法
    errorTip(text) {
      $(".message-tip")
        .html(text)
        .show();
      setTimeout(function() {
        $(".message-tip")
          .html("")
          .hide();
      }, 3000);
    },
    selectAnswer() {
      let request;
      request = this.$http.post(
        "/sunmc/consultationserver/lookDetail",
        { id: this.askNum,sign:this.sign}
      );
      request.then(
        data => {
            if (data.data.code=='200') {
                 this.askTime = data.data.askTime;
                 this.askcontent = data.data.askcontent;
                 this.answercontent =data.data.answercontent;
            }else{
                this.errorTip(data.data.msg);
            }
        },
        res => {
          this.errorTip("网络异常,请稍后重试");
        }
      );
    }
  }
};
</script>
<style scoped>
@charset "utf-8";
.answerbody {
  background: #f4f4f4;
  font-size: 0.14rem;
  color: #999999;
  height: 100%;
  display: block;
}
/* reset */

* {
  margin: 0;
  padding: 0;
}
em,
i {
  font-style: normal;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  border: none;
  vertical-align: top;
}
table {
  border-collapse: collapse;
}
input,
textarea {
  outline: none;
}
textarea {
  resize: none;
  overflow: auto;
}
body {
  font-size: 12px;
  /*	font-family: "微软雅黑";
	font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;*/
}

/*========移动端========*/
a,
img {
  -webkit-touch-callout: none;
  /* 禁止长按链接与图片弹出菜单 */
}
/*========移动端========*/

/* end reset */
/* public */

.clear {
  zoom: 1;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
/* end public */

.clear {
  display: block;
  content: "";
  clear: both;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  background: #f4f4f4;
  font-size: 0.14rem;
  color: #999999;
}
.wrap {
  width: 3.75rem;
  padding-top: 0.1rem;
}
.mod {
  width: 3.5rem;
  box-sizing: border-box;
  padding: 0.15rem;
  margin: 0 auto 0.1rem;
  background: #fff;
  border-radius: 0.05rem;
}
.sousuo img {
  display: block;
  width: 0.3rem;
  height: 0.2rem;
  border-left: 1px solid #f4f4f4;
  padding-left: 0.1rem;
}
.sousuo {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-flex: 1;
}
.sousuo_span {
  display: block;
  width: 2.85rem;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-flex: 1;
}
.sousuo_span .icon_wrong_f {
  display: none;
}
.sousuo_span .search {
  width: 2.6rem;
  min-height: 0.1rem;
  outline: 0;
  border: 1px solid #fff;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;
}
.icon_wrong {
  display: block;
  width: 0.2rem;
  height: 0.2rem;
  background: url(../../../static/images/ico_sc.png) no-repeat;
  background-size: 0.2rem 0.2rem;
  background-position: 100% 50%;
}
[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
  color: #999999;
}
.title_h4 {
  color: #303030;
  font-size: 0.16rem;
  background: url(../../../static/images/ico_qtkhzx.png) no-repeat;
  background-size: 0.2rem 0.2rem;
  background-repeat: 0 50%;
  padding-left: 0.3rem;
  margin-bottom: 0.13rem;
}
.mod_s {
  border-top: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 0.2rem 0.05rem 0;
}
.mod_s li {
  margin-bottom: 0.1rem;
}
.mod_s li .tel {
  color: #666666;
  margin-right: 0.11rem;
}
.color_orange {
  color: #ff8400;
}
.color_black {
  color: #303030;
}
.fy {
  text-align: center;
  margin: 0.2rem auto;
  font-size: 0.12rem;
}
.previous_page {
  margin: 0 0.15rem;
}
.page_number {
  margin-right: 0.15rem;
}
.next_page {
  margin-right: 0.15rem;
  color: #1599f1;
}
.last_page {
  color: #1599f1;
}
.p_ts {
  width: 3.25rem;
  margin: 0 auto;
  font-size: 0.12rem;
  padding-bottom: 0.7rem;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 3.75rem;
  height: 0.56rem;
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(102, 102, 102, 0.3);
}
footer .black {
  display: inline-block;
  height: 0.3rem;
  font-size: 0.16rem;
  color: #1599f1;
  padding-right: 0.2rem;
  line-height: 0.3rem;
  margin: 0.13rem 0.2rem 0 0.25rem;
  border-right: 1px solid #f4f4f4;
}
footer .consultation {
  font-size: 0.18rem;
  color: #fff;
  padding: 0.08rem 0.95rem;
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1) 0%,
    rgba(255, 125, 19, 1) 100%
  );
  box-shadow: 0px 0.05rem 0.15rem 0px rgba(255, 222, 0, 0.3);
  border-radius: 0.27rem;
}
/*搜索无结果*/
.jieg {
  font-size: 0.14rem;
  color: #303030;
}
.quxiao {
  color: #1599f1;
}
/*客户咨询服务*/
.textarea_zixun {
  height: 3rem;
  border: 0;
  outline: 0;
  color: #303030;
}
.consultation_gray {
  font-size: 0.18rem;
  color: #fff;
  padding: 0.08rem 0.95rem;
  background: linear-gradient(
    90deg,
    rgba(216, 216, 216, 1) 0%,
    rgba(233, 233, 233, 1) 100%
  );
  box-shadow: 0px 0.05rem 0.15rem 0px rgba(216, 216, 216, 0.3);
  border-radius: 0.27rem;
}
/*手机验证*/
.pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
.pop_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.2rem;
  background: none;
}
.title_h4_pop {
  color: #303030;
  font-size: 0.16rem;
  padding: 0.12rem;
  margin-bottom: 0.13rem;
  text-align: center;
  border-bottom: 1px solid #f4f4f4;
}
.pop_ul {
  width: 2.8rem;
  margin: 0 auto;
}
.pop_ul li {
  font-size: 0.16rem;
  color: #606060;
  height: 0.44rem;
  box-sizing: border-box;
  line-height: 0.43rem;
  border-bottom: 1px solid #eeeeee;
}
.pop_ul .li_l {
  display: inline-block;
  width: 1rem;
  height: 0.16rem;
  line-height: 0.16rem;
  padding: 0.14rem 0;
  float: left;
}
.pop_ul .li_r {
  width: 1.8rem;
  height: 0.43rem;
  border: 0;
  outline: none;
  float: right;
}
.li_r input {
  height: 0.15rem;
  padding: 0.14rem 0;
  border: 0;
  outline: 0;
}
.li_r_inp2 {
  width: 0.9rem;
  height: 0.15rem;
  padding: 0.14rem 0;
}
.verification_code {
  width: 0.7rem;
  height: 0.29rem;
  margin-top: 0.07rem;
}
.send_out_f {
  float: right;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: right;
}
.li_r .send_out {
  width: 0.8rem;
  height: 0.29rem;
  padding: 0;
  margin-top: 0.07rem;
  color: #1582f1;
  font-size: 0.16rem;
  background: #fff;
  text-align: right;
}
.zycs {
  color: #999999;
  font-size: 0.12rem;
  margin: 0.1rem auto 0.2rem;
}
.sub_pop_tel {
  width: 1.6rem;
  height: 0.44rem;
  font-size: 0.18rem;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1) 0%,
    rgba(255, 125, 19, 1) 100%
  );
  box-shadow: 0px 10px 30px 0px rgba(255, 222, 0, 0.3);
  border-radius: 0.22rem;
  text-align: center;
  line-height: 0.44rem;
  margin: 0.25rem auto 0;
}
.close_gb1_f {
  margin-top: 0.3rem;
  text-align: center;
}
.pop_box_con {
  width: 3.2rem;
  background: #ffffff;
  border-radius: 0.05rem;
  box-sizing: border-box;
  padding: 0.15rem;
}
.close_gb1_f img {
  width: 0.34rem;
  height: 0.34rem;
}

.highlight {
  color: #ff8400;
  font-size: 0.16rem;
  font-weight: bold;
}
/*信息提示*/
.message-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  min-width: 2rem;
  line-height: 0.2rem;
  padding: 0.15rem 0;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  font-size: 0.16rem;
}
.ewm_box {
  text-align: center;
}
.ewm_box b {
  display: block;
  color: #333;
}
.ewm_box img {
  width: 0.925rem;
  height: 0.925rem;
  margin: 0.3rem 0;
}
.ql-container.ql-snow {
        border: 0px solid #ccc;
}
.ql-editor {
      box-sizing: border-box;
      line-height: 1.42;
      height: 100%;
      outline: none;
      overflow-y: auto;
      padding: 8px 1px;
      -o-tab-size: 4;
      tab-size: 4;
      -moz-tab-size: 4;
      text-align: left;
      white-space: pre-wrap;
      word-wrap: break-word;
  }
  .color_black{
      color: #303030;
      font-size: 0.14rem;
  }
</style>