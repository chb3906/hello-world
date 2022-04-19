<template>
  <div class="sunCarOwnerGuardShare-wrap">
    <div class="share_pop" v-show="showSharePop" @click="onHideSharePop()">
      <img class="fxts" src="../../../static/images/sunCarOwnerGuardShare/fxts.png" />
    </div>
    <div class="erweima_d">
      <img class="erweima" src="../../../static/images/sunCarOwnerGuardShare/ewm.png" />
    </div>
    <p class="casb">长按识别，关注【阳光车险】，立即免费投保</p>
    <div class="btn_share">
      <a href="javascript:;" @click="onShowSharePop()">立即分享，让其他车主好友也有保障</a>
    </div>
    <div class="tbsm">
      <p>* 特别声明：上述产品及服务相关内容的简要介绍，仅供参考。具体请以条款约定为准。</p>
      <p>* 本产品是阳光财产保险股份有限公司承保、理赔并提供服务。</p>
    </div>
    <!--微信分享所需的icon-->
    <div style="display:none">
      <img src="../../../static/images/sunCarOwnerGuardShare/shareIcon.png" alt=""  ref="icon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'sunCarOwnerGuardShare',
  components: {
  },
  data() {
    return {
      showSharePop: false,
      channelCode: this.$route.query.channelCode,
      prdName: "阳光车主守护保",
    }
  },
  created() {
    this.onWeixinShare()
  },
  methods: {
    onShowSharePop() {
      this.showSharePop = true
    },
    onHideSharePop() {
      this.showSharePop = false
    },
    onWeixinShare() {
      this.$nextTick(_ => {
        let iconPath = this.$refs.icon.getAttribute("src").slice(2);//获取微信分享所用的icon路径(icon事先加载到页面)
        let shareUrl = window.location.href;
        let link = window.location.href.split('#')[0].split('?')[0] + "static/html/redirect.html?shareurl=" + encodeURIComponent(shareUrl);
        var data = {
          title: '【车主免费投保】阳光送您10万保障金，给您守护！',
          desc: '关注阳光车险，免费投保10万驾驶意外与新冠身故、全残保障。',
          link: link,
          imgUrl: window.location.href.split('#')[0].split('?')[0] + iconPath,
        };
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
/*分享页*/
.sunCarOwnerGuardShare-wrap {
  width: 3.75rem;
  height: 7.75rem;
  background: url(../../../static/images/sunCarOwnerGuardShare/bj.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.erweima_d {
  width: 3.75rem;
  margin: 0 auto 0;
  text-align: center;
}
.erweima {
  width: 1.65rem;
  height: 1.65rem;
  margin-top: 3.88rem;
}
.casb {
  margin: 0.15rem auto 0.3rem;
  font-size: 0.14rem;
  color: #333333;
  text-align: center;
}
.btn_share {
  width: 3.1rem;
  height: 0.48rem;
  background: #7a81e9;
  border: 0.015rem solid #ffffff;
  border-radius: 0.24rem;
  margin: 0 auto 0.205rem;
  text-align: center;
  line-height: 0.48rem;
}
.btn_share a {
  font-size: 0.17rem;
  font-weight: bold;
  color: #ffffff;
}
.tbsm {
  width: 2.5rem;
  height: 0.585rem;
  font-size: 0.12rem;
  font-weight: 400;
  color: #ffffff;
  margin: 0 auto;
}
.tbsm p {
  line-height: 0.14rem;
  margin-bottom: 0.05rem;
}
.share_pop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
}
.fxts {
  width: 3.14rem;
  height: 0.74rem;
  margin-top: 0.18rem;
}
</style>