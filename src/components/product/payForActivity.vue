<template>

  <div class="zhifu">
    <header>
      <img class="toubaochenggong" src="../../../static/images/icon_24.png">
      <h5>您已投保成功</h5>
      <p class="tbcd_p3">电子保单会很快发至您的邮箱</p>
    </header>
    <AD1 :adList="common.getAdListBySeat(adList, 2)" seat="2"></AD1>
    <div class="black-bg" v-show="showPop">
      <div>
        <div class="header">
          投保流程评价
          <div class="delete" @click="closePop()"><img src="../../../static/images/3.png" alt=""></div>
        </div>
        <div class="content">
          <div class="xing">
            <img v-for="(item,index) in imgArr" :src="'../../../static/images/'+item+'.png'" :key="index" alt="" @click="handleXing(index)">
          </div>
          <div class="wuxing">完成评价领e卡，满意请给五颗星呦~</div>
          <div class="beizu">注：同一微信号、会员号、证件号码和手机号最多可参加三次“爱健康客户评价送京东e卡”活动。前100名完成评价的客户，奖品会在3个工作日内发送到“投保人”手机中，请注意查收。</div>
          <div class="btn" @click="handleClick()">确定</div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import AD1 from '@/components/ad/ad1.vue'
export default {

  name: 'payForActivity',
  components: {
    AD1
  },
  data() {
    return {
      showPop: false,
      imgArr: [1, 1, 1, 1, 1],
      itemid: this.$route.query.id, //列表id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      adList: [],
      policyNo: this.$route.query.policyNo, //保单号
    }
  },

  created() {
    document.title = '支付成功页'
    if ('true' != window.sessionStorage.getItem('hasChecked')) {
      this.showPop = true
      // this.showPop = false
    }
    this.getAd()
    window.sessionStorage.removeItem('userSign')
  },
  methods: {
    getAd() {
      this.$http
        .post("prdmc/prdmcShop/getADByProductIdAndOrgId", {
          productId: this.itemid,
          orgCode: this.orgCode,
        })
        .then(res => {
          if (res.data.code == 200000) {
            this.adList = res.data.data
          }
        });
    },
    handleClick() {
      var count = 0;
      this.imgArr.forEach(item => {
        if (item == 1) {
          count++
        }
      })

      window.sessionStorage.setItem('hasChecked', 'true')
      this.closePop()
    },
    closePop() {
      this.showPop = false;
    },
    handleXing(index) {
      this.imgArr = [2, 2, 2, 2, 2]
      for (var i = 0; i <= index; i++) {
        this.imgArr[i] = 1
      }
    },
    goback() {
      this.$router.push({ path: '/Product' });
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.zhifu {
  max-width: 414px;
  margin: 0 auto;
  background-color: #efefef;
  height: 100%;
}
.black-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.black-bg > div {
  position: absolute;
  width: 3.45rem;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #ffffff;
  border-radius: 0.05rem;
}
.black-bg > div > .header {
  width: 3.45rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  font-size: 0.17rem;
  color: #2e2e2e;
  font-weight: 700;
  background-color: #f2f2f2;
  border-radius: 0.05rem 0.05rem 0 0;
  position: relative;
}
.black-bg > div > .header .delete {
  width: 0.15rem;
  height: 0.15rem;
  position: absolute;
  top: 0.19rem;
  right: 0.15rem;
  line-height: 0;
}
.black-bg > div > .content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 3rem;
}
.black-bg > div > .content .xing {
  display: flex;
  width: 2.19rem;
  justify-content: space-around;
}
.black-bg > div > .content .xing img {
  width: 0.29rem;
  height: 0.29rem;
}
.black-bg > div > .content .wuxing {
  color: #fb8927;
  text-align: center;
  font-size: 0.18rem;
}
.black-bg > div > .content .beizu {
  color: #292929;
  font-size: 0.13rem;
  text-align: justify;
  width: 2.9rem;
}
.black-bg > div > .content .btn {
  width: 2.97rem;
  height: 0.4rem;
  line-height: 0.2rem;
  text-align: center;
  background-color: #fb8927;
  color: #ffffff;
  font-size: 0.16rem;
}
.zhifu header {
  width: 3.75rem;
  height: 2.57rem;
  text-align: center;
  color: #ffffff;
  background-color: #ff9b60;
}
.zhifu .toubaochenggong {
  width: 0.79rem;
  height: 0.8rem;
  margin-top: 0.53rem;
  margin-bottom: 0.12rem;
}
.zhifu h5 {
  height: 0.23rem;
  line-height: 0.23rem;
  font-size: 0.23rem;
  text-align: center;
  box-sizing: border-box;
}
.zhifu .tbcd_p3 {
  font-size: 0.16rem;
  margin: 0.12rem auto 0;
}
</style>