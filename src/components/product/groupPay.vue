<template>
	<div class="qpd_con fx_con">
			<div class="fx_tex">
        <p>叮咚~您已成功购买一份“万元保”住院医疗险保障！亲朋好友大家拼，保额同享升升升</p>
        <p>点击按钮分享链接邀请好友一起升保额，给家人、好友一份爱的保障吧~</p>
      </div>
			<div class="pt_btn"  @click="inviteFriends"><a href="javascript:void(0);">邀请好友参与</a></div>
    <!--点击右上角-->
    <div class="share" v-if="shareShade" @click="closeShade">
      <img src="../../assets/productShow/images/fx.png" alt="">
    </div>
		</div>

</template>

<script>
import { Toast } from "mint-ui";
import Jquery from "jquery";
import wx from 'weixin-js-sdk';
import "../../assets/productShow/style/style.css";


export default {
  name: "groupPay",
  props: [],
  data() {
    return {
      orderNo: "",
      id: '',
      channelCode: '',
      orgCode: '',
      stateCode: '',
      openid: '',
      groupBuyNum: '',//url中所带团号
      myGroupInfo:{
      },
      standbyUser: [],
      shareShade: false,
    };
  },
  created() {
    this.getUrlParams();
    this.doWeChatShare();//调用微信分享
  },
  computed: {
  },
	mounted () {

	},
  methods: {
    getUrlParams(){
      this.id = this.getUrlValueByName('id');
      this.channelCode = this.getUrlValueByName('channelCode');
      this.orgCode = this.getUrlValueByName('orgCode');
      this.stateCode = this.getUrlValueByName('stateCode');
      this.openid = this.getUrlValueByName('openid');
      this.groupBuyNum = this.getUrlValueByName('groupBuyNum');//url中的groupBuyNum
      // this.nickname = this.getUrlValueByName('nickname');
      // this.headimgurl = this.getUrlValueByName('headimgurl');
    },

    //获取Url中的某个参数值
    getUrlValueByName(paraName){
      var url = document.location.toString();
      var arrObj = url.split("?");
      if(arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      }else {
        return "";
      }
    },
    //邀请好友参与
    inviteFriends(){
      this.shareShade = true;
    },
    //关闭邀请遮罩
    closeShade(){
      this.shareShade = false;
    },
    //微信分享
    doWeChatShare(){
      this.host = window.location.host;
      var shareUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc7e0abfa8e0c728&redirect_uri=https%3a%2f%2fpw.sinosig.com%2fWxEngine%2fdhc%2fsys%2fmain.do%3fapp%3dygAuthForThirdService%26func%3dauthForThird%26authKey%3dGC1521F874954088E5B4A8477EA137ED758969B9CC%26endUrl%3dhttp%253a%252f%252f'+this.host+'%252f%2523%252fproductShow%253fid%253d'+this.id+'%2526channelCode%253d'+this.channelCode+'%2526orgCode%253d'+this.orgCode+'%2526groupBuyNum%253d'+this.groupBuyNum+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'//微信分享授权链接

      var link = window.location.href.split('#')[0]+"static/html/redirect.html?shareurl="+encodeURIComponent(shareUrl);
      console.log(link);

      var data = {
        title:'住院“万元保”0免赔！有无社保均可保！健康保障每一天~',
        desc:'嗯！住院1分钱也能报！戳我查看~',
        link:link,
        imgUrl:location.href.split('#')[0]+'static/images/pic.jpg',

      };
      this.WXConfig.weChatShare(JSON.stringify(data));//调用微信分享功能
    },

    //获取Url中的某个参数值
    getUrlValueByName(paraName){
      var url = document.location.toString();
      var arrObj = url.split("?");
      if(arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      }else {
        return "";
      }
    },
  }
};
Jquery(function() {

});

</script>
<style scoped>

</style>
