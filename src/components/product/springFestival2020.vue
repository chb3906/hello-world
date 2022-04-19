<template>
  <div class="wrap">
    <div>
      <img class="bg_01" src="../../assets/springFestival2020/images/bg_01.png" alt="" />
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=107&channelCode=DC11PD1330010001&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_02.png" alt="" />
      </a>
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=60&channelCode=DC11PD1330010001&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_03.png" alt="" />
      </a>
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=124&channelCode=DC11PD1330010001&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_04.png" alt="" />
      </a>
    </div>
    <div>
      <img class="bg_01" src="../../assets/springFestival2020/images/bg_05.png" alt="" />
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=91&channelCode=DC11WD0100190005&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_06.png" alt="" />
      </a>
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=123&channelCode=DC11PD1330010001&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_07.png" alt="" />
      </a>
    </div>
    <div>
      <img class="bg_01" src="../../assets/springFestival2020/images/bg_08.png" alt="" />
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=75&channelCode=DC11PD1330010001&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_09.png" alt="" />
      </a>
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=74&channelCode=DC11PD1330010001&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_10.png" alt="" />
      </a>
    </div>
    <div>
      <a href="https://mkproperty.ygbx.com/#/Product/ProDetails?id=77&channelCode=DC11PD1330010001&orgCode=DLPT">
        <img class="bg_01" src="../../assets/springFestival2020/images/bg_11.png" alt="" />
      </a>
    </div>
    <div class="bg_12">
      <img class="erweima" src="../../assets/springFestival2020/images/erweima.png" alt=""/>
    </div>
    <!--微信分享所需的icon-->
    <div style="display:none">
      <img src="../../assets/springFestival2020/images/icon.jpg" alt=""  ref="icon">
    </div>

  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
  name: "springFestival2020",
  props: [],
  data() {
    return {
    };
  },

  created() {
    this.doWeChatShare();
  },
  methods: {

    doWeChatShare(){
      this.$nextTick(_ => {
        let iconPath = this.$refs.icon.getAttribute("src").slice(2);//获取微信分享所用的icon路径(icon事先加载到页面)
        let shareUrl = window.location.href;
        let link = window.location.href.split('#')[0] + "static/html/redirect.html?shareurl=" + encodeURIComponent(shareUrl);
        console.log(link);
        var data = {
          title: '鼠来保~健康过大年',
          desc: '为家人量身定制的健康保障低至0.2元/天起，更有春节限时款特惠。',
          link: link,
          imgUrl: window.location.href.split('#')[0] + iconPath,
        };
        console.log(data);
        this.WXConfig.weChatShare(JSON.stringify(data));//调用微信分享功能
      });
    }
  }
};
</script>

<style scoped>
.bg_01{
	width: 100%;
}
.bg_12{
  height: 4.16rem;
	background: url(../../assets/springFestival2020/images/bg_12.png) no-repeat;
	background-size: 100% 4.16rem;
	text-align: center;
}
.erweima{
	width: 1.19rem;
  height: 1.19rem;
  margin-top: 2.275rem;
}
</style>
