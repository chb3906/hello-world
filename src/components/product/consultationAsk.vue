<template>
<div class="body">
  <div class="bg">
    <div class="wrap">
      <div class="mod">
        <!-- <div
          class="textarea_zixun"
          id="textarea"
          contenteditable="true"
          data-text="请输入您的问题，我们将在1个工作日回复。"
          ref="dataText"
          @keyup="textarea"
        ></div> -->
        <div class="textarea_zixun">
            <textarea placeholder="请输入您的问题，我们将在1个工作日回复。"  id="textarea" style="width:100%; border:solid 1px #f2f6fc; border-radius:3px; padding:10px;"  maxlength="500" @input="descInput"
    v-model="desc"></textarea>
        </div>
        <span>{{remnant}}/500</span>
      </div>
      <p
        class="p_ts"
      >*用户的发言不得含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的内容，若出现以上内容或其他阳光保险集团网站认为不恰当的情况，阳光保险集团网站有权不提前通知作者直接删除内容、暂停其帐号，情节严重的，还将承担相应的法律责任。</p>
      <footer>
        <span class="black" @click="black">返回</span>
        <span class="consultation_gray">提交咨询</span>
        <span class="consultation" hidden="hidden" @click="consultationsub">提交咨询</span>
      </footer>
    </div>
    <!--手机号验证-->
    <div class="pop" id="pop_tel" hidden="hidden">
      <div class="pop_box">
        <div class="pop_box_con">
          <h4 class="title_h4_pop">手机号验证</h4>
          <ul class="pop_ul">
            <li>
              <span class="li_l">手机号：</span>
              <div class="li_r">
                <input
                  type="text"
                  name="phone"
                  placeholder="请输入"
                  class="li_r_inp1"
                  v-model="model.phone"
                  @keyup="refreshcode"
                  :maxlength="11"
                  @blur="onScrollBottom"
                />
              </div>
            </li>
            <li>
              <span class="li_l">图形验证码：</span>
              <div class="li_r">
                <input
                  type="text"
                  name="imgcode"
                  placeholder="请输入"
                  class="li_r_inp2"
                  v-model="model.imgcode"
                  :maxlength="4"
                  @blur="onScrollBottom"
                />
                <div class="send_out_f" @click="getImgCode">
                  <img
                    id="authImg"
                    class="verification_code"
                    src="../../../static/images/yzm.png"
                    alt
                  />
                </div>
              </div>
            </li>
            <li>
              <span class="li_l">手机验证码：</span>
              <div class="li_r">
                <input
                  type="text"
                  name="code"
                  placeholder="请输入"
                  class="li_r_inp2"
                  v-model="model.code"
                  :maxlength="4"
                  @blur="onScrollBottom"
                />
                <div class="send_out_f">
                  <input type="button" id="bo" value="发送验证码" class="send_out" @click="sendSms()" />
                </div>
              </div>
            </li>
            <div class="zycs">*您的咨询回复后，会以短信通知您，请您注意查收</div>
            <div class="sub_pop_tel" @click="submit">确定</div>
          </ul>
        </div>
        <div class="close_gb1_f" @click="close">
          <img class="close_pop_tel" src="../../../static/images/gb1.png" alt />
        </div>
      </div>
    </div>
    <!-- 信息提示 3S消失 -->
    <div class="message-tip" style="display:none;"></div>
  </div>
</div>  
</template>

<script>
export default {
  name: "ProductconsultationAsk",
  data() {
    return {
      openid: "", //openid
      channelCode: "", //渠道code
      model: {},
      countdown: 60,
      phone: "",
      productid: "",
      askstatus: "0",
      askcontent: "",
      desc:"",
      count: "", //倒计时
      remnant:0,
      // lat:'',
      // lng:'',
      province:'',
      city:'',
      wxprovince:'',//定位省份
      wxcity:''//定位城市
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
    let useropenid = sessionStorage.getItem("openid");
    if(useropenid && useropenid!=''){
      this.phone=sessionStorage.getItem("openid");//用于获取第一次图形验证码
      this.openid = sessionStorage.getItem("openid");
    }else{
      this.openid="";
      this.phone = "0000";
    }
    this.channelCode = sessionStorage.getItem("channelCode");
    this.productid = sessionStorage.getItem("productid"); //产品ID
    // this.lat = sessionStorage.getItem("lat"); //地理位置-纬度
    // this.lng = sessionStorage.getItem("lng"); //地理位置-经度
    this.province = sessionStorage.getItem("insuredprovince");
    this.city = sessionStorage.getItem("insuredcity");
    var wx_province = sessionStorage.getItem("wxprovince");
    var wx_city = sessionStorage.getItem("wxcity");
    if(wx_province && wx_province!=""){
        this.wxprovince = wx_province;
    }
    if(wx_city && wx_city!=""){
        this.wxcity=wx_city;
    }
    this.getImgCode();
  },
  methods: {
    onScrollBottom() {// 解决fixed定位元素中有input框错位问题
      setTimeout(function(){
      var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      },100)
    },
    descInput() {
          var txtVal = this.desc.length;  //desc 是设置v-model的值
          this.remnant = txtVal;
           if (this.desc == "" || txtVal=='0') {
            $(".consultation_gray").show();
            $(".consultation").hide();
          } else {
            $(".consultation_gray").hide();
            $(".consultation").css("display", "inline");
          }
          this.askcontent = this.desc;
    },
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
    getImgCode() {
      document.getElementById("authImg").src =
        "/sunmc/imgCode/" +
        this.phone +
        "?timestamp=" +
        new Date().getTime();
    },
    //输入文本域监测
    // textarea() {
    //   if ($("#textarea").text() == "") {
    //     $(".consultation_gray").show();
    //     $(".consultation").hide();
    //   } else {
    //     $(".consultation_gray").hide();
    //     $(".consultation").css("display", "inline");
    //   }
    //   this.askcontent = this.$refs.dataText.innerText;
    // },

    refreshcode() {
      let vm = this;
      if (vm.model.phone != "" && vm.model.phone.length == 11) {
        this.phone = vm.model.phone;
        this.getImgCode();
      }
    },
    //askstatus为0 弹出手机验证 1 提交咨询服务
    consultationsub() {
      if (this.askstatus == "0") {
        $("#pop_tel").show();
        return;
      }
      let request;
      request = this.$http.post("/sunmc/consultationserver/askServerSub", {
        openid: this.openid,
        phone:this.phone,
        askcontent: this.askcontent,
        dccode: this.channelCode,
        productid: this.productid,
        // lat:this.lat,
        // lng:this.lng,
        wxProvince:this.wxprovince,
        wxCity:this.wxcity,
        insuredProvince:this.province,
        insuredCity:this.city
      });
      request.then(
        data => {
          let that = this;
          if (data.data.code == "200") {
            this.errorTip(data.data.msg);
            const timejump = 1;
            if (!this.timer) {
              this.count = timejump;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= timejump) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                  //跳转的页面写在此处
                  this.$router.push({
                    path: "/Product/Productconsultation",
                    // query: {
                    //   openid: this.openid,
                    //   channelCode: this.channelCode,
                    //   id: this.productid,
                    // }
                  });
                }
              }, 1000);
            }
          } else {
            this.errorTip(data.data.msg);
            this.refreshcode();
            //重置状态为0,可再次调起验证码弹层
            that.askstatus = 0;
          }
        },
        res => {
          this.errorTip("网络异常,请稍后重试");
        }
      );
    },
    //关闭手机验证弹层
    close() {
      $("#pop_tel").hide();
    },
    //手机验证提交
    submit() {
      let vm = this;
      // 校验手机号
      if (!vm.model.phone || vm.model.phone == "") {
        this.errorTip("请输入手机号");
        return;
      }
      if (!/^1[345789]\d{9}$/.test(vm.model.phone)) {
        this.errorTip("请输入正确的手机号");
        return;
      }
      //校验图形验证码
      if (!vm.model.imgcode || vm.model.imgcode == "") {
        this.errorTip("请输入验证码");
        return;
      }
      if (!vm.model.code || vm.model.code == "") {
        this.errorTip("请输入短信验证码");
        return;
      }
      let request;
      request = this.$http.post("/sunmc/consultationserver/checkPhone", {
        phone: vm.model.phone,
        imgcode: vm.model.imgcode,
        smscode: vm.model.code,
        openid: vm.openid
      });
      request.then(
        data => {
          let that = this;
          if (data.data.code == "200") {
            $("#pop_tel").hide();
            that.askstatus = 1;
            that.consultationsub();
          }else{
            this.errorTip(data.data.msg);
            return;
          }
        },
        res => {
          this.errorTip("网络异常,请稍后重试");
        }
      );
    },
    black() {
      this.$router.go(-1);
    },
    // 发送验证码
    sendSms() {
      let vm = this;
      // 校验手机号
      if (!vm.model.phone || vm.model.phone == "") {
        this.errorTip("请输入手机号");
        return;
      }
      if (!/^1[345789]\d{9}$/.test(vm.model.phone)) {
        this.errorTip("请输入正确的手机号");
        return;
      }
      //校验图形验证码
      if (!vm.model.imgcode || vm.model.imgcode == "") {
        this.errorTip("请输入验证码");
        return;
      }
      // 发送验证码
      if (
        $(".send_out")
          .text()
          .indexOf("s") == -1
      ) {
        let request;
        request = this.$http.post("/sunmc/consultationserver/getPhoneCode", {
          phone: vm.model.phone,
          imgcode: vm.model.imgcode
        });
        request.then(
          data => {
            if (data.data.code) {
              this.errorTip(data.data.msg);
            }
            if (data.data.code == "200") {
              this.settime();
            }else{
              this.refreshcode();
            }
          },
          res => {
            this.errorTip("网络异常,请稍后重试");
          }
        );
      }
    },
    settime() {
      //发送验证码倒计时
      if (this.countdown == 0) {
        $("#bo")
          .val("重新获取")
          .removeAttr("disabled");
        this.countdown = 60;
        return;
      } else {
        $("#bo")
          .val(this.countdown + "s")
          .attr("disabled", "true");
        this.countdown--;
      }
      var that = this;
      setTimeout(function() {
        that.settime();
      }, 1000);
    }
  }
};
</script>

<style scoped>
@charset "utf-8";
.body{
    background: #F4F4F4;
    font-size: 0.14rem;
    color: #999999;
    height: 100%;
}
/* reset */

* {
	margin: 0;
	padding: 0;
}
em , i {
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
  height: 100%;
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
	content: '';
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

.clear{
	display: block;
	content: "";
	clear: both;
}
*{
	margin: 0;
	padding: 0;
}
html,body{
	background: #F4F4F4;
	font-size: 0.14rem;
	color: #999999;
}
.wrap{
	width: 3.75rem;
	padding-top: 0.1rem;
}
.mod{
	width: 3.5rem;
	box-sizing: border-box;
	padding: 0.15rem;
	margin: 0 auto 0.1rem;
	background: #fff;
	border-radius:0.05rem;
}
.sousuo img{
	display: block;
	width: 0.3rem;
	height: 0.2rem;
	border-left: 1px solid #F4F4F4;
	padding-left: 0.1rem;
}
.sousuo{display:-webkit-box; -webkit-box-align:center; -webkit-box-flex:1;}
.sousuo_span{
	display: block;
	width: 2.85rem;
	display:-webkit-box; -webkit-box-align:center; -webkit-box-flex:1;
	
}
.sousuo_span .icon_wrong_f{ display: none;}
.sousuo_span .search{
	width: 2.6rem;
	min-height: 0.1rem;
	outline: 0;
	border: 1px solid #fff;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only;
}
.icon_wrong{
	display:block;
	width: 0.2rem;
	height: 0.2rem;
	background: url(../../../static/images/ico_sc.png) no-repeat;
	background-size: 0.2rem 0.2rem;
	background-position: 100% 50%;
}
[contentEditable=true]:empty:not(:focus):before {
    content: attr(data-text);
    color: #999999;
}
.title_h4{
	color: #303030;
	font-size: 0.16rem;
	background: url(../../../static/images/ico_qtkhzx.png) no-repeat;
	background-size: 0.2rem 0.2rem;
	background-repeat: 0 50%;
	padding-left: 0.3rem;
	margin-bottom: 0.13rem;
}
.mod_s{
	border-top: 1px solid #EEEEEE;
	box-sizing: border-box;
	padding: 0.2rem 0.05rem 0;
}
.mod_s li{
	margin-bottom: 0.1rem;
}
.mod_s li .tel{
	color: #666666;
	margin-right: 0.11rem;
}
.color_orange{
	color: #FF8400;
}
.color_black{
	color: #303030;
}
.fy{
	text-align: center;
	margin: 0.2rem auto;
	font-size: 0.12rem;
}
.previous_page{
	margin: 0 0.15rem;
}
.page_number{
	margin-right: 0.15rem;
}
.next_page{
	margin-right: 0.15rem;
	color: #1599F1;
}
.last_page{
	color: #1599F1;
}
.p_ts{
	width: 3.25rem;
	margin: 0 auto;
	font-size: 0.12rem;
	padding-bottom: 0.7rem;
}
footer{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 3.75rem;
	height: 0.56rem;
	background: #fff;
	box-shadow:0px 0px 15px 0px rgba(102,102,102,0.3);
}
footer .black{
	display: inline-block;
	height: 0.3rem;
	font-size: 0.16rem;
	color: #1599F1;
	padding-right: 0.2rem;
	line-height: 0.3rem;
	margin: 0.13rem 0.2rem 0 0.25rem;
	border-right: 1px solid #F4F4F4;
}
footer .consultation{
	font-size: 0.18rem;
	color: #fff;
	padding: 0.08rem 0.95rem;
	background:linear-gradient(90deg,rgba(255,197,0,1) 0%,rgba(255,125,19,1) 100%);
	box-shadow:0px 0.05rem 0.15rem 0px rgba(255,222,0,0.3);
	border-radius:0.27rem;	
}
/*搜索无结果*/
.jieg{
	font-size: 0.14rem;
	color: #303030;
}
.quxiao{
	color: #1599F1;
}
/*客户咨询服务*/
.textarea_zixun{
	height: 3rem;
	border: 0;
	outline: 0;
	color: #303030;
}
.consultation_gray{
	font-size: 0.18rem;
    color: #fff;
    padding: 0.08rem 0.95rem;
    background:linear-gradient(90deg,rgba(216,216,216,1) 0%,rgba(233,233,233,1) 100%);
	box-shadow:0px 0.05rem 0.15rem 0px rgba(216,216,216,0.3);
    border-radius: 0.27rem;
}
/*手机验证*/
.pop{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.8);
}
.pop_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.2rem;
    background: none;
}
.title_h4_pop{
	color: #303030;
    font-size: 0.16rem;
    padding: 0.12rem;
    margin-bottom: 0.13rem;
    text-align: center;
    border-bottom: 1px solid #F4F4F4;
}
.pop_ul{
	width: 2.8rem;
	margin: 0 auto;
}
.pop_ul li {
    font-size: 0.16rem;
    color: #606060;
    height: 0.44rem;
    box-sizing: border-box;
    line-height: 0.43rem;
    border-bottom: 1px solid #EEEEEE;
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
.li_r input{
	height: 0.15rem;
    padding: 0.14rem 0;
    border: 0;
    outline: 0;
}
.li_r_inp2{
	width: 0.6rem;
	height: 0.15rem;
    padding: 0.14rem 0;
    
}
.verification_code{
	width: 0.7rem;
	height: 0.29rem;
	margin-top: 0.07rem;
}
.send_out_f{
	float: right;
    height: 0.43rem;
    line-height: 0.43rem;
    text-align: right;
}
.li_r .send_out{
	width: 1.2rem;
	height: 0.29rem;
	padding: 0;
	margin-top: 0.07rem;
	color: #1582F1;
	font-size: 0.16rem;
	background: #fff;
	text-align: right;
}
.zycs{
	color: #999999;
	font-size: 0.12rem;
	margin: 0.1rem auto 0.2rem;
}
.sub_pop_tel{
	width: 1.6rem;
    height: 0.44rem;
    font-size: 0.18rem;
    font-weight: 500;
    color: #fff;
    background: linear-gradient(90deg,rgba(255,197,0,1) 0%,rgba(255,125,19,1) 100%);
    box-shadow: 0px 10px 30px 0px rgba(255,222,0,0.3);
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
    background: #FFFFFF;
    border-radius: 0.05rem;
    box-sizing: border-box;
    padding: 0.15rem;
}
.close_gb1_f img {
    width: 0.34rem;
    height: 0.34rem;
}

.highlight{
	color: #FF8400;
	font-size: 0.16rem;	
    font-weight: bold;
}
/*信息提示*/
.message-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  background: rgba(0,0,0,.6);
  min-width: 2rem;
  line-height: .2rem;
  padding: .15rem 0;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  font-size: .16rem;
}


</style>