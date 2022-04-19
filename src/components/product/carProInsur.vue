<template>
<div class="carProInsur">
  <div class="wrap" v-if="JSON.stringify(result) != '{}'">
    <div class="ddzf">
      <ul>
        <li v-if="result.productName">
          <label>产品名称:</label>
          <span style="font-weight:bold;">{{result.productName}}</span>
        </li>
        <li class="clear">
          <label>车牌号:</label>
          <span v-if="result.plateNo">{{result.plateNo}}</span>
          <span v-else>新车</span>
        </li>
        <li class="clear">
          <label>车架号:</label>
          <span>{{result.frameNo}} </span>
        </li>
        <li class="clear" v-for="(item,index) in result.policyHolders" v-if="item.value">
          <label>{{item.name}}:</label>
          <span v-if="item.code == 33">{{item.value}}份</span>
          <span v-else>{{item.value}}</span>
        </li>
        <li class="clear" v-if="result.startDate">
          <label>保单生效日期:</label>
          <span>{{result.startDate}}</span>
        </li>
        <li class="clear" v-if="result.ordPremium">
          <label>保费:</label>
          <span style="color: #FF8400;">{{result.ordPremium}}元</span>
        </li>
      </ul>
      <div class="read">
        <p class="fontp">
          <input type="radio" name="1" @click="change" :class='{checked:flag}' :checked="checkedFlag" style="margin-left: 0.07rem;">
          <span>
            本人已阅读并同意 
            <span v-if="insurancesType3.type3Length == 1">
              <a href="javascript:void(0)" v-for="(item,q) in result.insurances" :class="'aIndex'+q" v-if="item.type == 1 || item.type == 3 || item.type == 5  || item.type == 7" :key="q">《{{item.title}}》</a>
            </span>
            <span v-else>
              <a href="javascript:void(0)" v-for="(item,q) in result.insurances" :class="'aIndex'+q" v-if="item.type == 1 || item.type == 5  || item.type == 7" :key="q">《{{item.title}}》</a>
                <a href="javascript:void(0)" v-if="insurancesType3.type3Length != 0">《保险条款》</a>
            </span>
          </span>
        </p>
      </div>
    </div>
    <div class=" payment_btn" @click="topay">去支付</div>
  </div>

  <!--当type=3的协议只有一条时,直接显示-->
    <div v-if="insurancesType3.type3Length == 1">
      <div class="shadow_div" v-for="(item,q) in result.insurances" :id="'aIndex'+q" v-if="item.type == 1 || item.type == 3 || item.type == 5 || item.type == 7" :key="item.content">
        <div class="shadow_content">
          <div class="worder_content editorStyle" v-html='item.content'>
          </div>
          <a href="javascript:void(0)" class="hide_btn">关闭</a>
        </div>
      </div>
    </div>
    <!--多条时,显示为标题列表-->
    <div v-else>
      <div class="shadow_div" v-for="(item,q) in result.insurances" :id="'aIndex'+q" v-if="item.type == 1 || item.type == 5 || item.type == 7" :key="item.content">
        <div class="shadow_content">
          <div class="worder_content editorStyle" v-html='item.content'>
          </div>
          <a href="javascript:void(0)" class="hide_btn">关闭</a>
        </div>
      </div>
      <!--type为3时,多一层标题列表-->
      <div class="shadow_div" v-if="insurancesType3.type3Title.length>0">
        <div class="shadow_content">
          <div class="worder_content editorStyle" style="height:100%;">
            <div v-for="title in insurancesType3.type3Title" class="type3Title">
              <a href="javascript:void(0)">
                <p style="color: #FF6C00;margin-top: 0.1rem;"><i class="el-icon-document"></i>&nbsp;《{{title}}》</p>
              </a>
              <!--<p><br/></p>-->
            </div>
          </div>
          <a href="javascript:void(0)" class="hide_btn">关闭</a>
        </div>
      </div>

      <!--type为3时,点击标题 显示详细内容-->
      <div class="shadow_div_insurancesType3"  v-if="insurancesType3.type3Content.length>0" v-for="content in insurancesType3.type3Content">
        <div class="shadow_content">
          <div class="worder_content editorStyle" v-html='content'>
          </div>
          <a href="javascript:void(0)" class="hide_btn">关闭</a>
        </div>
      </div>
    </div>


  <!--支付失败-->
  <div class="popup_wrap zfsb" v-if="zftsPopupShow">
    <div class="popup_">
      <div class="popup">
        <div class="popup_box">
          <header><img src="../../../static/images/ico_gb.png" alt="关闭图" @click="closeFn"  /></header>
          <div class="popup_content">
            <img class="zfts_img" src="../../../static/images/th.png" alt="图片">
            <p>{{errorMsg}}</p>
            <!-- <div class="zfts_btn">重新支付</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--loading遮罩-->
  <div class="loading" v-if="loadingVisible">
    <div class="loading_content">
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

export default {
  name: "carProInsur",
  props: [],
  data() {
    return {
      resOrdCode:"",
      result:{},
      //保险条款：类型为3时
      insurancesType3:{
        type3Length: 0,
        type3Title: [],
        type3Content: []
      },
      flag:true,//同意协议样式
      checkedFlag: false,//是否同意协议
      errorMsg: "", 
      zftsPopupShow: false,
      loadingVisible: false,
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
    //查询订单信息
    this.getList();
  },
  methods: {

    getList(){
      var ordCode = this.common.getUrlValueByName('ordCode');
      if(ordCode){
        this.loadingVisible = true;
        this.$http
        .post("/ordmc/ordShopPolicy/getPolicy", {ordCode: ordCode})
        .then(res => {
          this.loadingVisible = false;

          if(res.data.code == 200){
            if(JSON.stringify(res.data.data) != '{}'){
              this.result = res.data.data;
              this.resOrdCode = res.data.data.ordCode;//取返回值中的订单号
              //保险条款
              for(var i=0; i<res.data.data.insurances.length; i++){
                if(res.data.data.insurances[i].type == 3){
                  this.insurancesType3.type3Length ++;
                  this.insurancesType3.type3Title.push(res.data.data.insurances[i].title);
                  this.insurancesType3.type3Content.push(res.data.data.insurances[i].content);
                }
              }
              //设置页面标题
              Jquery(document).find('title').text(res.data.data.productName);
              // console.log(JSON.stringify(this.result));
            }
          }else{
            this.errorMsg = res.data.msg;
            this.zftsPopupShow = true;
            return;
          }
        });
      }else{
        this.errorMsg = '获取订单号异常';
        this.zftsPopupShow = true;
        return;
      }
    },
    change() {//是否同意协议
      this.flag = !this.flag;
      this.checkedFlag = !this.checkedFlag;
      // console.log(this.checkedFlag);
    },
    //去支付
    topay(){
      if (!this.checkedFlag) {
        this.errorMsg = '请阅读协议内容';
        this.zftsPopupShow = true;
        return;
      }

      this.loadingVisible = true;//遮罩显示
      this.$http
      .post("/sunmc/getPayLinkController/getPayHead", {
        orderCode: this.resOrdCode
      })
      .then(res => {
        // console.log(JSON.stringify(res));
        if (res.data.code == 200) {
          let params = res.data.data;
          this.$http
          .post("/sunmc/getPayLinkController/getPayLink", params)
          .then(resulst => {
            // console.log(JSON.stringify(resulst));
            if(resulst.data.errCode == '10248'){//获取支付链接成功
              window.location.href = resulst.data.data.payOrderUrl; //跳转
            }else{
              this.loadingVisible = false;
              this.errorMsg = resulst.data.errMsg;
              this.zftsPopupShow = true;
              return;
            }
          }).catch(reject=>{
            this.loadingVisible = false;
            this.errorMsg = '接口异常';
            this.zftsPopupShow = true;
            return;
          });
        }else{
          this.loadingVisible = false;
          this.errorMsg = res.data.msg;
          this.zftsPopupShow = true;
          return;
        }
      }).catch(rej=>{
        this.loadingVisible = false;
        this.errorMsg = '接口异常';
        this.zftsPopupShow = true;
        return;
      });
    },
    //关闭支付提示弹窗
    closeFn(){
      this.zftsPopupShow = false;
    },

  }
};

$(function(){
  Jquery(document).on("click", ".fontp a", function() {
    var aIndex = Jquery(this).index();
//    console.log(aIndex);
    Jquery(".shadow_div")
      .eq(aIndex)
      .show();
    Jquery(".shadow_div")
      .eq(aIndex)
      .find(".worder_content")
      .height(Jquery(window).height());
    Jquery(".shadow_div")
      .eq(aIndex)
      .find(".worder_content")
      .css("padding", "0 0.1rem");
    Jquery(".shadow_div")
      .eq(aIndex)
      .find(".worder_content img")
      .css("width", "100%");
  });
  //点击标题显示内容
  Jquery(document).on("click", ".shadow_div .worder_content>div.type3Title>a", function() {
    var aIndex = Jquery(this).parent().index();
//    console.log(aIndex);
    Jquery(".shadow_div_insurancesType3")
      .eq(aIndex)
      .show();
    Jquery(".shadow_div_insurancesType3")
      .eq(aIndex)
      .find(".worder_content")
      .height(Jquery(window).height());
    Jquery(".shadow_div_insurancesType3")
      .eq(aIndex)
      .find(".worder_content")
      .css("padding", "0 0.1rem");
    Jquery(".shadow_div_insurancesType3")
      .eq(aIndex)
      .find(".worder_content img")
      .css("width", "100%");
  });
});
</script>

<style>
/*8.5*/
.carProInsur{
  position: absolute;
  width: 3.75rem;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  height: 100%;
}
.ddzf {
  width: 100%;
  background: #fff;
  padding-top: 0.11rem;
}
.ddzf ul {
  width: 3.52rem;
  /* height: 30rem; */
  background: #FFFEEA;
  border: 1px solid #FFC674;
  border-radius: 0.05rem;
  margin: 0 auto 0.15rem;
  font-size: 0.14rem;
}
.ddzf li {
  height: 0.36rem;
  line-height: 0.36rem;
  border-bottom: 1px dashed #FFD497;
  padding: 0 0.075rem;
}
.ddzf li label {
  display: inline-block;
  width: 0.9rem;
  height: 0.35rem;
  color: #6C6C6C;
  line-height: 0.35rem;
}
.ddzf li span {
  float: right;
}
.ddzf li:last-of-type {
    border-bottom: 0;
}
.read {
  width: 3.52rem;
  margin: 0 auto;
  font-size: 0.12rem;
  color: #6C6C6C;
  padding-bottom: 0.17rem;
}
.read img {
  width: 0.16rem;
  height: 0.16rem;
  margin-right: 0.058rem;
}
img {
  border: none;
  vertical-align: top;
}
.read .fontp {
  width: 3.26rem;
  margin: 0 auto;
  display: inline-block;
  text-align: justify;
}
.read span a{
  color: #FF6C00
}
.payment_btn {
  width: 1.64rem;
  height: 0.41rem;
  background: #FF9600;
  border-radius: 0.023rem;
  font-size: 0.17rem;
  text-align: center;
  line-height: 0.41rem;
  color: #FFFFFF;
  margin: 0.17rem auto 0;
}
.popup_ {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  display: table;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.popup {
  display: table-cell;
  vertical-align: middle;
}
.popup_box {
  width: 3.17rem;
  margin: 0 auto;
  font-size: 0.15rem;
  background: #FFFFFF;
}
.zfts_img {
  width: 0.47rem;
  height: 0.47rem;
  margin-bottom: 0.23rem;
}
.zfts header, .zfsb header {
  text-align: right;
  line-height: 0.35rem;
}
.zfts header img, .zfsb header img {
  width: 0.12rem;
  height: 0.12rem;
  margin: 0.11rem 0.117rem 0 0;
}
.zfts .popup_content, .zfsb .popup_content {
  text-align: center;
  font-size: 0.14rem;
  padding: 0 0rem 0.23rem;
}
.zfts .popup_content p, .zfsb .popup_content p {
  margin-bottom: 0.29rem;
}
.zfts_btn {
  width: 1.64rem;
  height: 0.41rem;
  background: #FF9600;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  line-height: 0.41rem;
  margin: 0 auto;
}
.clear {
  zoom: 1;
}
.shadow_div,
.shadow_div_insurancesType3{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 3.75rem;
  height: 100%;
  display: none;
}
.shadow_content {
  width: 100%;
  height: 100%;
  background: #fff;
  /*border-radius: 0.14rem;*/
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
}
.loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* width: 3.75rem; */
  height:100%;
  background:rgba(0,0,0,0.4);
}
.loading_content{
  position: absolute;
  left:50%;
  top:50%;
  width:1.75rem;
  height:1.75rem;
  line-height: 1.75rem;
  margin-top:-0.875rem;
  margin-left: -0.875rem;
  color:white;
  /*font-weight: bold;*/
  text-align: center;
  font-size:20px;
}
.worder_content {
  /*height:4.5rem;*/
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.hide_btn {
  position: absolute;
  bottom: 0.2rem;
  left: 50%;
  right: 0;
  margin-left: -0.25rem;
  height: 0.5rem;
  line-height: 0.5rem;
  color: #fff;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-align: center;
}
</style>
