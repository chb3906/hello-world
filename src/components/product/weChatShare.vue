<template>
  <div>
    <h1>
    微信分享测试
    </h1>
    <a href="http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw=">百度商桥</a>
  </div>
</template>
<!--<script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>-->

<script>
// import "./jweixin-1.4.0.js";
import wx from 'weixin-js-sdk';

export default {
  name: "weChatShare",
  props: [],
  data() {
    return {
    };
  },

  created() {
  },
  mounted(){
    this.WXConfig.weChatShare();
  },
  methods: {
   
  },

};
</script>

<style lang="scss" scoped>
$sc: 200;


</style>
