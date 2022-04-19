<template>
<div class="petsHealth">
  <div class="pet-bg">
		<div class="pet-title">萌宠保医疗<br>报销预售卡验证</div>
		<div class="tg_infor">
      <ul>
          <li>
            <span>预售卡订单号</span>
              <input type="text" placeholder="请输入淘宝订单号" v-model="petForm.thirdOrdCode" @blur="checkFieldCommon(petForm.thirdOrdCode,fieldName.thirdOrdCode)" @keyup="validateOrdNo(petForm.thirdOrdCode)"/>
          </li>
          <li>
            <span>手机号</span>
              <input type="tel" maxlength="11" placeholder="请输入淘宝收件人手机号" v-model="petForm.thirdPhone" @blur="checkFieldCommon(petForm.thirdPhone,fieldName.thirdPhone)"/>
          </li>
          <li>
            <span>验证码</span>
            <input style="width: 52%;" type="text" maxlength="4" placeholder="请输入验证码" v-model="petForm.validCode" @blur="checkFieldCommon(petForm.validCode,fieldName.validCode)"/>
            <input type="button" class="jishi" v-show="show" value="获取验证码" ref="getCodeBtn" @click="codeClick()"/>
            <input type="button" class="jishi" v-show="!show" :value="count+'s后重新发送'" disabled style="background:grey;"/>
          </li>
        </ul>
        <div class="pet-btn" @click="doSubmit()"><a href="javascript:void(0)" id="tj_bt">提交验证</a></div>
      </div>
    </div>
    <!--弹层开始-->
    <div class="blackBg" v-if="popBox.show">
      <div class="pop_box ysk_box">
        <p ref="popBoxMsg">{{popBox.message}}</p>
        <a class="close-pop" href="javascript:void(0)" @click="closePop">我知道了</a>
      </div>
    </div>      
    <!--弹窗结束-->
    <div class="blackBg" v-if="loadingVisible">
      <div class="blackBgcontent">
        加载中...
      </div>
    </div>
</div>
</template>

<script>
import Jquery from "jquery";
import {
  Toast
} from "mint-ui";
import { setTimeout } from 'timers';

export default {
  name: "petsHealth",
  props: [],
  data() {
    return {
      id: this.$route.query.id, //列表id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      prdName:"萌宠好医保预售卡验证页",
      loadingVisible: false,
      show:true,//控制显示获取验证码按钮
      count:"",//倒计时
      popBox: {
        show: false,
        message: ""
      },
      petForm:{
        thirdOrdCode:"",
        thirdPhone:"",
        validCode:"",
      },
      fieldName:{thirdOrdCode:'淘宝订单号',thirdPhone:'淘宝收件人手机号',validCode:'验证码'},
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

    //控制订单号输入
    validateOrdNo(value){
      this.petForm.thirdOrdCode = value.replace(/[^\w]/g,'');
    },
    //通用表单校验
    checkFieldCommon(field,fieldName){
      if(field == undefined || field == "" || field.trim().length == 0){
        Toast({
          message: "请输入"+fieldName,
          position: "middle",
          duration: 2000
        });
        return false;
      }else{
        if(fieldName == this.fieldName.thirdOrdCode){//校验订单号
          
        }else if(fieldName == this.fieldName.thirdPhone){//校验手机号
          if(!this.common.checkMobilePhone(field)){
            Toast({
              message: "请输入正确的"+this.fieldName.thirdPhone,
              position: "middle",
              duration: 2000
            });
            return false;
          }else{
            return true;
          }
        }else{//校验验证码

        }
        return true;
      }
    },
    //点击验证码
    codeClick(){
      //先校验手机号
      if(!this.checkFieldCommon(this.petForm.thirdPhone,this.fieldName.thirdPhone)){
        return;
      }else{
        //调用发送短信验证码接口
        this.loadingVisible = true;
        this.$http
        .post("/sunmc/sunThirdOrd/thirdOrderSendValidcode",{thirdPhone:this.petForm.thirdPhone})
        .then(response=>{
          console.log(JSON.stringify(response));
          if(response.status == 200){
            if(response.data.code == "200"){
              //调用倒计时
              this.countdown();

              this.loadingVisible = false;
              this.popBox.show = true;
              this.popBox.message = response.data.msg;
              //验证码
            }else{
              this.loadingVisible = false;
              this.popBox.show = true;
              this.popBox.message = response.data.msg;
              return false;
            }
          }
        }).catch(reject=>{
          this.loadingVisible = false;
          Toast({
            message: reject.response.data.msg,
            position: "middle",
            duration: 2000
          });
          return false;
        });
      }
    },
    //倒计时
    countdown(){
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    
    //提交订单
    doSubmit(){
      if(JSON.stringify(this.petForm) != '{}'){//先校验
        for(var key in this.petForm){
          if(!this.checkFieldCommon(this.petForm[key],this.fieldName[key])){
            return;
          };
        }
      }
     
      //调用第三方订单验真接口
      this.$http
      .post("/sunmc/sunThirdOrd/checkThirdOrder",{
        thirdOrdCode: this.petForm.thirdOrdCode,
        thirdPhone: this.petForm.thirdPhone,
        validateCode: this.petForm.validCode
      }).then(response=>{
        // console.log(JSON.stringify(response));
        if(response.status == 200){
          if(response.data.code == "200"){
            this.loadingVisible = false;
            this.$router.push({//跳转详情页
              path: "/Product/ProDetails",
              query: {
                id: this.id,
                channelCode: this.channelCode,
                orgCode: this.orgCode,
                thirdPhone: this.petForm.thirdPhone,
                thirdOrdCode: this.petForm.thirdOrdCode
              }
            });
          }else if(response.data.code == "1005"){
            this.loadingVisible = false;
            this.popBox.show = true;
            this.$nextTick(()=>{
              this.$refs.popBoxMsg.innerHTML = "订单号有误，请重新输入。<br/>重新投保，请关注“萌宠保”公众号进行购买"
            });
            // this.popBox.message = response.data.msg;
            return false;
          }else{
            this.loadingVisible = false;
            this.popBox.show = true;
            this.popBox.message = response.data.msg;
            return false;
          }
        }
      }).catch(rej=>{
        console.log(JSON.stringify(rej));
        this.loadingVisible = false;
        Toast({
          message: rej.response.data.msg,
          position: "middle",
          duration: 2000
        });
        return false;
      });     
    },
    closePop(){
      this.popBox.show = false;
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
.pet-bg{ padding-top:2.4rem; background:url(../../../static/images/pet-banner.png) center 0.3rem no-repeat; background-size:65%;}
.pet-title{ color: #fb406b; font-size: 0.24rem; text-align: center; padding-bottom: 0.2rem; font-weight: bold;}
.tg_infor {
   /* width:6.2rem;  */
   margin:0 auto; background-color:#fff; overflow:hidden; padding:0 .3rem;
}
.tg_infor li{  font-size:0.16rem; padding-bottom: 0.075rem;}
.tg_infor li span{ display:block; color:#fb406b; height: .4rem;line-height: 0.4rem; padding-left: 0.15rem; font-weight: bold;}
.tg_infor li input{ display:inline-block; width: 100%; color:#303030; border:1px solid #1b1b1b; font-size:0.16rem; padding: 0.075rem 0.15rem; box-sizing: border-box; border-radius: 0.5rem;}
.tg_infor li input::-webkit-input-placeholder{color: #959595;}
.tg_infor li input.jishi{ display:inline-block; color:#fff; background-color:#fff;border-radius:0.5rem; border:0; -webkit-appearance: none; background:-webkit-linear-gradient(left,#fb406b,#fb406b); width: 43%; margin-left: 3%;}
.tg_infor li input.time{ background-color:#fff; border:0;}

.pet-btn{ text-align:center; margin:0.19rem 0;}
.pet-btn a{ display:inline-block; 
/* width:3.3rem;  */
width:100%;padding: 0.09rem 0.15rem;  text-align:center; color:#fff; font-size:0.18rem; border-radius:0.5rem; background:-webkit-linear-gradient(left,#fb406b,#fb406b);}
/*弹窗*/
.blackBg{position: fixed; z-index: 998; background: rgba(0,0,0,.4); width: 100%; height: 100%; top:0; left: 0;}
.blackBgcontent{position: absolute;left:50%;top:50%;width:1.75rem;height:1.75rem;line-height: 1.75rem;margin-top:-0.875rem;margin-left: -0.875rem;color:white;text-align: center;font-size:0.18rem;
}
.pop_box {position: absolute; top:50%; left: 50%; background-color:#fff; z-index: 999;  border-radius:0.11rem;}
.pop_box a{ display:inline-block; width:1.6rem; padding: 0.09rem 0; text-align:center;  background:-webkit-linear-gradient(left,#fb406b,#fb406b); color:#fff; border-radius: 0.5rem; margin-top:.25rem;}

.ysk_box{width: 3.2rem; 
/* height: 1.6rem;  */
text-align:center;margin-top: -0.8rem;margin-left: -1.6rem;padding:0.2rem 0.1rem;font-size: 0.15rem;}
.ysk_box p{color:#fb406b; box-sizing: border-box; text-align:center; }
</style>
