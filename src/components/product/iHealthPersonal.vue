<template>
  <div class="infor">
    <img src="../../assets/iHealthPersonal/images/ajk_01.png">
    <img src="../../assets/iHealthPersonal/images/ajk_02.png">
    <img src="../../assets/iHealthPersonal/images/ajk_03.png">
    <img src="../../assets/iHealthPersonal/images/ajk_04.png">
    <img src="../../assets/iHealthPersonal/images/ajk_05.png">
    <div class="bg">
      <swiper :options="swiperOption" id="slide-box">
        <swiper-slide>
          <div class="swiper-img"><img alt="" src="../../assets/iHealthPersonal/images/pic1.png"></div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiper-img"><img alt="" src="../../assets/iHealthPersonal/images/pic2.png"></div>
        </swiper-slide>
      </swiper>
      <!--分页器-->
      <div class="swiper-pagination" style="width:100%;bottom: 0.2rem;"></div>
    </div>
    <img src="../../assets/iHealthPersonal/images/ajk_07.png">
    <div class="btn">
      <a href="http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw=">
        <img alt="人工客服" src="../../assets/iHealthFamily/images/ajk_07.png">
      </a>
      <a href="javascript:void(0)" @click="buryingPoint('buy')"><img alt="试算保费" src="../../assets/iHealthFamily/images/ajk_08.png"></a>
    </div>
    <div class="telephone">
      <a href="tel:4001002475"><img src="../../assets/iHealthFamily/images/tel.png" @click="buryingPoint('tel')" /></a>
    </div>
  </div>
</template>
<script>
//引入vue-awesome-swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'iHealthPersonal',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      channelCode: this.$route.query.channelCode,
      prdName: "爱健康个人版落地页",
      gotoNext: false,
      swiperOption: {//swiper3
        autoplay: true,
        speed: 500,
        loop: true,//会影响倒计时
        autoplay: {
          disableOnInteraction: false,//轮播图触摸之后可以重新播放
          delay: 2000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true //分页器可点击
        },
      }
    }
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
    //点击电话/试算保费
    buryingPoint(param) {
      let action;
      if (param === 'buy') {
        action = "点击试算保费按钮";
        this.gotoNext = true;
      } else if (param === 'tel') {
        action = "点击电话图标";
      }
      //跳转到详情页
      if (this.gotoNext) {
        this.$router.push({
          path: "/Product/ProDetails",
          query: {
            id: this.$route.query.id,
            channelCode: this.channelCode,
            orgCode: this.$route.query.orgCode,
          }
        });
      }

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
body {
  background: #fff;
}
.infor {
  width: 100%;
  overflow: hidden;
  padding-bottom: 0.7rem;
}
.infor img {
  display: block;
  width: 100%;
}
.btn {
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  background-color: #fed151;
  text-align: center;
  padding: 0.1rem 0 0;
  border-radius: 0;
}
.btn a {
  display: inline-block;
  width: 45%;
}
.btn a:first-child {
  margin-right: 0.25rem;
}
.telephone {
  position: fixed;
  left: 0;
  bottom: 0.8rem;
  z-index: 90;
}
.telephone img {
  width: 55%;
}
.bg {
  height: 2.065rem;
  background: url(../../assets/iHealthPersonal/images/ajk_06.png) center top
    no-repeat;
  background-size: 3.75rem 2.065rem;
  position: relative;
}
/*part of slide*/
#slide-box {
  margin: 0 0.2rem;
  padding: 0.25rem 0;
}
/*part of slide*/
>>> .swiper-pagination-bullet.swiper-pagination-bullet-active{ width: 0.375rem; background: #F67D58; opacity: 1;}
>>> .swiper-pagination{ bottom:0.1rem;}
>>> .swiper-pagination-bullet{ width:0.175rem;border-radius:0.1rem; transition:all 0.3s;}
>>> .swiper-pagination-bullet{height: 5px; opacity: .5; background: #D4D4D4;}
/*part of slide*/
</style>

