<template>
  <div class="bg">
    <div class="btn_d">
      <a href="javascript:void(0)" @click="gotoNext()">立即领取</a>
    </div>
    <!--微信分享所需的icon-->
    <div style="display:none">
      <img src="../../../../assets/guanaibao/images/icon.jpg" alt=""  ref="icon">
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'gabProIntroduce',
  components: {},
  data() {
    return {
      channelCode: this.$route.query.channelCode,
      prdName: "V1_关爱保产品介绍页",
    }
  },
  created() {
    document.getElementsByTagName('title')[0].innerText = "阳光关爱保";//设置页面标题
    this.reloadPage();
    this.doWeChatShare();
  },
  methods: {
    //重载页面
    reloadPage(){
      window.sessionStorage.getItem('isReload') ? window.sessionStorage.getItem('isReload'):window.sessionStorage.setItem('isReload',true);
      if(window.sessionStorage.getItem('isReload') == 'true'){//true
        window.sessionStorage.setItem('isReload',false);
        window.location.reload() ;
      }
    },
    //点击立即领取
    gotoNext() {

      //跳转到详情页
      this.$router.push({
        path: "/Product/ProDetails",
        query: {
          id: this.$route.query.id,
          channelCode: this.channelCode,
          orgCode: this.$route.query.orgCode,
        }
      });
    },
    //微信分享
    doWeChatShare(){
      this.$nextTick(_ => {
        let iconPath = this.$refs.icon.getAttribute("src").slice(2);//获取微信分享所用的icon路径(icon事先加载到页面)
        // let shareUrl = window.location.href;
        let shareUrl = "http://" + window.location.host + "/#/" + "guanaibao/index?channelCode="+this.channelCode;
        
        let link = window.location.href.split('#')[0] + "static/html/redirect.html?shareurl=" + encodeURIComponent(shareUrl);
        console.log(link);
        var data = {
          title: '【免费领】守护安康，阳光关爱保送您10万战役保障金',
          desc: '关注阳光车险，免费领取10万意外与新冠身故、全残保障！',
          link: link,
          imgUrl: window.location.href.split('#')[0] + iconPath,
        };
        console.log(data);
        this.WXConfig.weChatShare(JSON.stringify(data));//调用微信分享功能
      });
    },

    // 判断字符串是否为空
    checkMsgNull(msg) {
      if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
        return true;
      } else {
        return false;
      }
    },
  }
}

</script>
<style scoped>
  .bg{
    width: 100%;
    height: 7.2rem;
    background: url(../../../../assets/guanaibao/images/bg_haibao.png) no-repeat;
    background-size: 100% 100%;
  }
  .btn_d{
    text-align: center;
    padding-top: 5.35rem;
  }
  .btn_d a{
    display: inline-block;
    width: 3.15rem;
    height: 0.5rem;
    background: linear-gradient(left, #fe9e52, #fdbf1e);
    background: -ms-linear-gradient(left, #fe9e52, #fdbf1e);
    background: -webkit-linear-gradient(left, #fe9e52, #fdbf1e);
    background: -moz-linear-gradient(left, #fe9e52, #fdbf1e);
    border-radius: 0.3rem;
    box-shadow: 0rem 0.05rem 0.05rem #f0daa3;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.225rem;
    text-decoration: none;
    color: #fff;
    margin: 0 auto;
  }
</style>

