<template>
  <div class="bg">
    <div class="erweima_d">
      <img src="../../../../assets/guanaibao/images/erweima.png"/>
    </div>
    <!--微信分享所需的icon-->
    <div style="display:none">
      <img src="../../../../assets/guanaibao/images/icon.jpg" alt=""  ref="icon">
    </div>
  </div>
</template>
<script>
export default{
  name:"gabIndex",
  data(){
    return {
      channelCode: this.$route.query.channelCode,
      prdName: "V1_关爱保引粉落地页",
    }
  },
  created(){
    this.doWeChatShare();
  },
  methods:{

    //微信分享
    doWeChatShare(){
      this.$nextTick(_ => {
        let iconPath = this.$refs.icon.getAttribute("src").slice(2);//获取微信分享所用的icon路径(icon事先加载到页面)
        let shareUrl = window.location.href;
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
    background: url(../../../../assets/guanaibao/images/bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .erweima_d{width: 100%;text-align: center;}
  .erweima_d img{width: 1.44rem;height: 1.44rem;margin-top: 2.05rem;}
</style>

