<template>
  <div class="success-wrap">
    <div class="white_box_bg">
      <div class="cg_d">
        <img src="../../../static/images/success/cg.png" />
      </div>
      <h4>领取成功</h4>
      <ul class="bdxi_ul">
        <!-- <li>
          <span class="bdxi_ul_l">保单号：</span>
          <span class="bdxi_ul_r">xxxxxx</span>
        </li> -->
        <!--<li>
					<span class="bdxi_ul_l">保费：</span>
					<span class="bdxi_ul_r">xxxxxx</span>
				</li>-->
        <li>
          电子保单稍后将发送至您投保所填写的邮箱， 请注意查收~
        </li>
      </ul>
      <div class="btn-wrap">
        <div class="pingjia-wrap" @click="onPingjia">立即评价</div>
      </div>
    </div>
    <AD1 :adList="common.getAdListBySeat(adList, 4)" seat="4"></AD1>
  </div>
</template>

<script>
import AD1 from '@/components/ad/ad1.vue'
export default {
  name: 'success',
  components: {
    AD1,
  },
  data() {
    return {
      itemid: this.$route.query.id, //列表id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      adList: [],
      itemData: '',
      ordCode: this.$route.query.ordCode, // 订单号
    }
  },
  created() {

    function onBridgeReady() {
      WeixinJSBridge.call("showOptionMenu");
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

    this.getAd()
    this.getSuccessShare()
    window.sessionStorage.removeItem('userSign')
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    getAd() {
      this.$http
        .post("prdmc/prdmcShop/getADByProductIdAndOrgId", {
          productId: this.itemid,
          orgCode: this.orgCode,
          // seat: '4',
          // seat: '2',
        })
        .then(res => {
          if (res.data.code == 200000) {
            this.adList = res.data.data
          }
        });
    },
    getSuccessShare() {
      this.$http
        .post("prdmc/prdmcShop/productDetail", {
          productId: this.itemid,
          orgCode: this.orgCode,
        })
        .then(res => {
          if (res.data.code == 200) {
            this.itemData = res.data.data
            var data = {
              title: this.itemData.sunPageSharedConfig.sucPageSharedTitle,
              desc: this.itemData.sunPageSharedConfig.sucPageSharedContent,
              link: this.itemData.sunPageSharedConfig.sucPageSharedLink + '?channelCode=' + this.channelCode,
              imgUrl: this.itemData.sunPageSharedConfig.sucPageSharedLogo,
            };
            this.WXConfig.weChatShare(JSON.stringify(data));//调用微信分享功能
          }
        });
    },
    onPingjia() {
      this.loadingVisible = true
      this.$http.post("sunmc/ordSun/getEditComment", {
        ordCode: this.ordCode,
      }).then(res => {
        if (res.status == 200) {
          this.loadingVisible = false
          location.href = res.data.data
        }
      });
    },
  },
}
</script>
<style scoped>
/*首页*/
.success-wrap {
  width: 3.75rem;
  height: 100%;
  overflow: auto;
  background: #fdb155;
  padding-top: 0.15rem;
}
.white_box_bg {
  width: 3.45rem;
  height: 2.845rem;
  background: #ffffff;
  border-radius: 0.1rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 0.175rem;
  margin-bottom: 0.2rem;
}
.cg_d {
  padding-top: 0.2rem;
  margin: 0 auto;
  text-align: center;
}
.cg_d img {
  width: 0.66rem;
  height: 0.66rem;
}
.white_box_bg h4 {
  width: 3.1rem;
  padding-bottom: 0.165rem;
  border-bottom: 0.01rem solid #fdb155;
  font-size: 0.18rem;
  color: #333333;
  text-align: center;
  margin: 0.15rem auto 0.22rem;
}
.bdxi_ul {
  width: 2.82rem;
  margin: 0 auto;
  font-size: 0.14rem;
  color: #e98e44;
}
.bdxi_ul li {
  height: 0.24rem;
}
.bdxi_ul_l {
  display: inline-block;
  width: 0.6rem;
  height: 0.24rem;
}
.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 0.3rem;
}
.btn-wrap .pingjia-wrap {
  width: 1.5rem;
  height: 0.4rem;
  color: #fff;
  font-size: 0.16rem;
  line-height: 0.4rem;
  border-radius: 0.5rem;
  background-color: #ff8400;
  text-align: center;
}
</style>
