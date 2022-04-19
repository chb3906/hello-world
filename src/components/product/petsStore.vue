<template>
<div class="petsStore">
  <div class="pet-bg">
		<div class="pet-title">铲屎官的大福音<span>每天1块钱</span><br>减轻养宠医疗负担</div>
		<div class="mc_content">
			<p>•  一份保单，<b>118种</b>宠物常发疾病、宠物意外、宠物人伤责任全保障</p>
			<p>•  AI宠物照片面部识别，无需体检、无需植入芯片</p>
			<p>•  <b>60天-8岁</b>的宠物犬或宠物猫都可投保</p>
			<p>•  全国1100多家瑞鹏定点医疗机构，专业治疗更放心</p>
			<p>•  <b>7*24小时</b>全天候宠物问诊、理赔服务</p>
			<p>•  连续每年投保，赔付比例可提升</p>
		</div>
		<div class="tg_infor">
      <ul>
        <li>
          <span>推荐人手机号</span>
          <input type="tel" placeholder="请输入推荐人手机号" maxlength="11" v-model="referrerTel"/>
        </li>
      </ul>
      <div class="pet-btn">
        <!-- <a class="gray" href="javascript:void(0)" @click="buyNow()">直接购买</a> -->
        <a href="javascript:void(0)" id="tj_bt" @click="doSubmit()">下一步</a>
      </div>
    </div>
  </div>
  <!--弹层开始-->
  <div class="blackBg" style="display:none;">
    <div class="pop_box ysk_box" style="display:block;">
      <p>瑞鹏宠物医院门店编号有误<br>请重新录入</p>
      <a class="close-pop" href="#">我知道了</a>
    </div>
  </div>
  <!--弹层结束-->
</div>
</template>

<script>
import Jquery from "jquery";
import {
  Toast
} from "mint-ui";
import { setTimeout } from 'timers';

export default {
  name: "petsStore",
  props: [],
  data() {
    return {
      id: this.$route.query.id, //列表id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      prdName:"瑞鹏萌宠保落地页",
      openid: this.$route.query.openid,//openid(在授权链接中获取)
      referrerTel:"",
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
  methods: {

    checkFieldCommon(tel){
      if(!this.common.checkMobilePhone(tel)){
        Toast({
          message: "请输入正确的推荐人手机号",
          position: "middle",
          duration: 2000
        });
        return false;
      }else{
        return true;
      }  
    },
    //点击提交
    doSubmit(){
      if(!this.checkFieldCommon(this.referrerTel)){
        return;
      }else{//跳转到产品详情页
        this.$router.push({
          path: "/Product/ProDetails",
          query: {
            id: this.id,
            channelCode: this.channelCode,
            orgCode: this.orgCode,
            openid:this.openid,//若openid为空,则不会将此参数带至下一页面
            rpPetRefereeNo : this.referrerTel
          }
        });
      }
    },
  }
};

$(function(){
//手机键盘隐藏(简单粗暴版)
  $('body').on('touchend', function(el) {
    if(el.target.tagName != 'INPUT') {
      $('input').blur()
    }
  })
});
</script>

<style scoped>
/*1/2*/
.pet-bg{ padding-top:2.9rem; background:url(../../../static/images/pet-banner2.png) center 0.3rem no-repeat; background-size:65%;}
.pet-title{ color: #fb406b; font-size: 0.24rem; text-align: center; padding-bottom: 0.2rem; font-weight: bold;}
.pet-title span{font-size: 0.28rem; }
.mc_content{ border: 1px solid #fb406b;background-color: #FFF0F3; color: #fb406b; font-size:0.12rem; margin: 0 0.27rem 0.25rem; border-radius:0.05rem; padding:0.2rem 0.15rem 0.1rem;font-weight: 600;}
.mc_content p{ line-height: 0.2rem; padding-bottom: 0.1rem; text-indent: -0.8em; margin-left: 0.5em;}
.mc_content b{ font-size:0.16rem;}
.tg_infor {
  /* width:6.2rem; */
 margin:0 auto; padding-bottom:0.2rem; background-color:#fff; overflow:hidden; padding:0 .27rem;}
.tg_infor li{  font-size:0.16rem; padding-bottom: 0.15rem;}
.tg_infor li span{ display:block; color:#fb406b; height: .3rem; padding-left: 0.15rem; padding-bottom: 0.09rem;font-weight: bold;}
.tg_infor li input{ display:inline-block; width: 100%; color:#303030; border:1px solid #1b1b1b; font-size:0.16rem; padding: 0.075rem 0.15rem; box-sizing: border-box; border-radius: 0.5rem;}
.tg_infor li input::-webkit-input-placeholder{color: #959595;}
.tg_infor li input.jishi{ display:inline-block; color:#fff; background-color:#fff;border-radius:0.5rem; border:0; -webkit-appearance: none; background:-webkit-linear-gradient(left,#fb406b,#fb406b); width: 35%; margin-left: 3%;}
.tg_infor li input.time{ background-color:#fff; border:0;}

.pet-btn{ text-align:center; margin:0.19rem 0;}
.pet-btn a{ display:inline-block; width:50%; padding: 0.075rem 0;  text-align:center; color:#fff; font-size:0.16rem; border-radius:0.5rem; background:-webkit-linear-gradient(left,#fb406b,#fb406b);}
.pet-btn a.gray{border: 1px solid #fb406b; background: -webkit-linear-gradient(left,#fff,#fff);color: #fb406b; margin-right: 0.25rem;}

/*弹出窗口 ---- */
.blackBg{position: fixed; z-index: 998; background: rgba(0,0,0,.4); width: 100%; height: 100%; top:0; left: 0; display:none;}
.pop_box {position: fixed; top:50%; left: 50%; background-color:#fff; z-index: 999;  border-radius:0.22rem;}
.pop_box a{ display:inline-block; width:3.2rem; padding: 0.15rem 0; text-align:center; font-size:0.26rem;  background:-webkit-linear-gradient(left,#fb406b,#fb406b); color:#fff; border-radius: 0.5rem; margin-top:.35rem;}


.ysk_box{ display: none; width: 6.4rem; height: 3rem; text-align:center; margin: -1.5rem 0 0 -3.2rem;}
.ysk_box p{ font-size:0.3rem; color:#fb406b; padding-top:0.55rem; box-sizing: border-box; text-align:center; }
</style>
