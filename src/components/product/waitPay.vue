<template>
<div class="Pro_insur"  v-if="JSON.stringify(result)!='{}'">
  <!--<mt-header :title="result.productName" class="headerSty">-->
    <!--&lt;!&ndash;<i to="/" slot="left">		<mt-button icon="back" @click='back'></mt-button>		</i>&ndash;&gt;-->
  <!--</mt-header>-->

  <div class="insur">
    <div class="policyholderinfo-wp">
      <h1>保单信息</h1>
      <div class="insur_recognizee" style="padding-bottom: .2rem;">
        <div class="itemDiv-wp" v-if="result.productName">
          <span class="itemSpan-wp">产品名称:</span>
          <span class="itemSpan-wp" style="width:1.9rem;">{{result.productName}}</span>
        </div>
        <div class="itemDiv-wp flexItem" v-if="result.newCar">
          <span class="itemSpan-wp">是否新车:</span>
          <span class="itemSpan-wp" style="width:1.9rem;" v-if='result.newCar==1'>是</span>
          <span class="itemSpan-wp" style="width:1.9rem;" v-else>否</span>
        </div>
        <div class="itemDiv-wp flexItem" v-if="result.frameNo">
          <span class="itemSpan-wp">车架号:</span>
          <span class="itemSpan-wp" style="width:1.9rem;">{{result.frameNo}} </span>
        </div>
        <div class="itemDiv-wp flexItem" v-if="result.plateNo">
          <span class="itemSpan-wp">车牌号:</span>
          <span class="itemSpan-wp" style="width:1.9rem;">{{result.plateNo}} </span>
        </div>
        <div class="itemDiv-wp" v-if="result.insuredAmount">
          <span class="itemSpan-wp">保额:</span>
          <span class="itemSpan-wp" style="width:1.9rem;">{{result.insuredAmount}} 元</span>
        </div>
        <div class="itemDiv-wp flexItem" v-if="result.ordCode">
          <span class="itemSpan-wp">订单编号:</span>
          <span class="itemSpan-wp" style="width:1.9rem;">{{result.ordCode}} </span>
        </div>
        <div class="itemDiv-wp flexItem" v-if="result.startDate">
          <span class="itemSpan-wp">起保日期:</span>
          <span class="itemSpan-wp" style="width:1.9rem;">{{result.startDate}} </span>
        </div>
        <div class="itemDiv-wp flexItem" v-if="result.endDate">
          <span class="itemSpan-wp">结束日期:</span>
          <span class="itemSpan-wp" style="width:1.9rem;">{{result.endDate}} </span>
        </div>
      </div>
    </div>


    <div class="policyholderinfo-wp" v-if="result.policyHolders.length>0">
      <h1>投保人信息</h1>
      <div class="insur_recognizee" >
        <div class="itemDiv-wp flexItem"  v-for="(item) in result.policyHolders" v-if="item.value">
          <span class="itemSpan-wp">{{item.name}}:</span>
          <span class="itemSpan-wp" style="width: 1.9rem;">{{item.value}}</span>
        </div>
      </div>
    </div>

    <div class="policyholderinfo-wp" v-if="result.insureds.length > 0">
      <h1>被保人信息</h1>
      <div class="insur_recognizee" >

        <div class="group-item-insur" v-for="(item,index) in result.insureds" :key="index+'group-item'">
          <div class="group-header">
            <div class="group-header-title">
              被保人
              <div class="group-header-item">{{index+1}}</div>
            </div>
          </div>
          <div class="itemDiv-wp flexItem" v-for="(i) in item" v-if="i.value">
            <span class="itemSpan-wp">{{i.name}}:</span>
            <span class="itemSpan-wp" style="width: 1.9rem;">{{i.value}}</span>
          </div>
        </div>
      </div>
    </div>

      <div class="policyholderinfo-wp">
        <h1>受益人信息</h1>
        <div class="insur_recognizee" >
          <div class="itemDiv-wp flexItem" v-if="result.isCustom">
            <span class="itemSpan-wp">受益人：</span>
            <span class="itemSpan-wp">法定</span>
          </div>
          <div v-else>
            <div class="itemDiv-wp flexItem" v-if="result.beneficiary"  v-for="(item) in result.beneficiary">
              <span class="itemSpan-wp">{{item.name}}:</span>
              <span class="itemSpan-wp" style="width: 1.9rem;">{{item.value}}</span>
            </div>
          </div>
        </div>
      </div>



      <div class="itemBot">
        <!-- 投保须知 -->
        <div style="margin-top:0.15rem;" class="xieyeDiv">
          <input type="radio" name="1" @click="change" :class='{checked:flag}' :checked="checkedFlag">
          <span>我已阅读并同意
            <span v-if="insurancesType3.type3Length == 1">
              <a href="javascript:void(0)" v-for="(item,q) in result.insurances" :class="'aIndex'+q" v-if="item.type == 1 || item.type == 3 || item.type == 5  || item.type == 7" :key="q" style="color: #FF6C00">《{{item.title}}》</a>
            </span>
            <span v-else>
              <a href="javascript:void(0)" v-for="(item,q) in result.insurances" :class="'aIndex'+q" v-if="item.type == 1 || item.type == 5  || item.type == 7" :key="q" style="color: #FF6C00">《{{item.title}}》</a>
              <a href="javascript:void(0)" v-if="insurancesType3.type3Length != 0" style="color: #FF6C00">《保险条款》</a>
            </span>
          </span>
        </div>

        <div class="itemBot" style="margin-bottom:0.15rem;">
          <button id="point1" class='item_bot_but pay sign' @click="topay">
            提交订单<span style="margin-left:0.15rem;">&yen;{{result.ordPremium}}</span>
          </button>
        </div>
      </div>

    <!-- 协议遮罩 -->
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

    <!--loading遮罩-->
    <div class="shadow_div_loading" v-if="loadingVisible">
      <div class="shadow_content_loading">
        加载中...
      </div>
    </div>

  </div>
</div>
</template>

<script>
import Jquery from "jquery";
import {
  Toast
} from "mint-ui";
import {
  sessionOperation
} from '../../util/util.js'

export default {
  name: "waitPay",
  props: [],
  data() {
    return {
      prdName:"",//产品名称
      resOrdCode : "",//订单ID
      result: {},//返回数据
//      showOption: [],//需要展示的数据
      //保险条款：类型为3时
      insurancesType3:{
        type3Length: 0,
        type3Title: [],
        type3Content: []
      },
      flag:true,//同意协议样式
      checkedFlag: true,//是否同意协议
      loadingVisible : false //loading遮罩
    };
  },

  created() {
    // console.log(this.$route.query.id)
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

    this.getList();
  },
  methods: {
    getList() {
      //获取订单号
      let ordCode = this.common.getUrlValueByName('ordCode');
      console.log(ordCode);
      if(ordCode){
        this.$http
          .post("/ordmc/ordShopPolicy/getPolicy", {ordCode: ordCode})
          .then(res => {
            if(res.data.code == 200){
              if(JSON.stringify(res.data.data) != '{}'){
                this.result = res.data.data;
                this.prdName = res.data.data.productName;
                this.resOrdCode = res.data.data.ordCode;//重赋订单编号

                //保险条款
                for(var i=0; i<res.data.data.insurances.length; i++){
                  if(res.data.data.insurances[i].type == 3){
                    this.insurancesType3.type3Length ++;
                    this.insurancesType3.type3Title.push(res.data.data.insurances[i].title);
                    this.insurancesType3.type3Content.push(res.data.data.insurances[i].content);
                  }
                }
//                console.log(JSON.stringify(this.insurancesType3));

                //设置页面标题
                Jquery(document).find('title').text(res.data.data.productName);
              }
            }else{
              Toast({
                message: res.data.msg,
                position: "middle",
                duration: -1
              });
              return;
            }
          });
      }else{
        Toast({
          message: '获取订单号异常',
          position: "middle",
          duration: 1000
        });
        return;
      }
    },
    change() {//是否同意协议
      this.flag = !this.flag;
      this.checkedFlag = !this.checkedFlag;
      // console.log(this.checkedFlag);
    },
    // 将 P920091615004924408 改造成 T920091615004924408 ，然后跟轨迹id进行绑定
    behaviorObjSetOrderNo(orderNo) {
      let num = `T${orderNo.substring(1)}`
      window.sessionStorage.removeItem('tbdh')
      window.sessionStorage.setItem('tbdh', num)
      try {
        _behaviorObj.setorderNo(num, function(data) {})
      } catch (err) {
        console.log('可回溯报错：' + err)
      }
    },
    topay() {

      if (!this.checkedFlag) {
        Toast({
          message: "请同意相关协议",
          position: "middle",
          duration: 1000
        });
        return;
      }
      this.behaviorObjSetOrderNo(this.resOrdCode)
      this.loadingVisible = true;//遮罩显示
      this.$http
        .post("/sunmc/ordSun/getPayPolicy", {
          orderSn: this.resOrdCode
        })
        .then(res => {
          if (res.data.code == 200) {
            // this.loadingVisible = false;//遮罩关闭
            window.location.href = res.data.data.payUrls; //跳转
          } else {
            this.loadingVisible = false;//遮罩关闭
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 1000
            });
          }
        });
    },

  },

};
Jquery(function() {
  Jquery(document).on("click", ".hide_btn", function() {
    Jquery(this)
      .parent()
      .parent()
      .hide();
  });

  Jquery(document).on("click", ".tishi", function() {
    Jquery(".shadow_tishidiv").show();
    Jquery(".worder_content").height(Jquery(window).height());
    Jquery(".worder_content").css("padding", "0 0.1rem");
  });
  Jquery(document).on("click", ".xieyi", function() {
    Jquery(".shadow_zizhudiv").show();
    Jquery(".worder_content").height(Jquery(window).height());
    Jquery(".worder_content").css("padding", "0 0.1rem");
  });

  Jquery(document).on("click", ".xieyeDiv a", function() {
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

<style lang="scss" scoped>
$sc: 200;
input [type='text'] {
    padding-left: 15px;
}
body,
html {
    -webkit-overflow-scrolling: touch;
}
.el-input--prefix .el-input__inner {
    padding-left: 15px !important;
}
.flexItem {
    display: flex;
}
.Pro_insur {
    position: absolute;
    width: 3.75rem;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
}
.insur .insur_recognizee {
    width: 3.45rem;
    /* height: 2.5rem; */
    margin: 0 auto;
    border-radius: 10px;
    border: 0.01rem solid #e1e1e1;
    padding: 0.2rem 0;
}
.Information > h1,
.policyholderinfo-wp > h1 {
    font-size: 17px;
    font-weight: bold;
    margin: 0.15rem 0 0.15rem 0.33rem;
    text-align: left;
}
.itemBot {
    width: 3.45rem;
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
    color: #333;
    margin-top: 0.1rem;
}
.item_bot_but {
    width: 1.5rem;
    height: 0.37rem;
    font-size: 0.15rem;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #ffffff;
    color: rgb(153, 153, 153);
    // margin-bottom: .15rem;
}
.sign {
    width: 3rem;
    height: 0.5rem;
    border-radius: 0.1rem;
    background: #fd762c;
    color: #fff;
    // margin: 20/$sc+rem 0 50/$sc+rem 0;
    font-size: 0.18rem;
    position: relative;
    // top: .05rem;
}
.shadow_div,
.shadow_div_insurancesType3,
.shadow_shishoudiv,
.shadow_tishidiv,
.shadow_xiyidiv,
.shadow_zizhudiv {
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
    // border-radius: 0.14rem;
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
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
.worder_content {
    // height:4.5rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.itemDiv-wp {
    padding-left: 0.1rem;
    width: 3.35rem;
    overflow: hidden;
    font-size: 0.15rem;
    color: rgb(51, 51, 51);
    margin-bottom: 0.15rem;
}
.insur_recognizee .itemDiv-wp:last-child {
    margin-bottom: 0;
}
.itemSpan-wp {
    width: 1.11rem;
    height: 0.37rem;
    line-height: 0.37rem;
    display: inline-block;
    float: left;
    margin-right: 0.1rem;
}
.group-item-insur {
    margin: 5px;
    border-radius: 10px;
    border: 0.01rem solid #e1e1e1;
    padding-top: 5px;
    padding-bottom: 5px;
}
.group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0.1rem;
}
.group-header-title {
    display: flex;
    align-items: center;
}
.group-header-item {
    display: flex;
    align-items: center;
    // width: 20px;
    // height:20px;
    padding-left: 7px;
    padding-right: 7px;
    border-radius: 50%;
    background-color: #fd762c;
    text-align: center;
    color: #fff;
}
// .group-header-close {}
/*loading遮罩*/
.shadow_div_loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 3.75rem;
  height:100%;
  background:rgba(0,0,0,0.4);
}
.shadow_content_loading{
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
</style>
