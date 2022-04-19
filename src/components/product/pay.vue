<template>
  <div class="zhifu">
    <header>
      <img class="toubaochenggong" src="../../../static/images/icon_24.png">
      <h5>您已投保成功</h5>
      <p class="tbcd_p3">电子保单会很快发至您的邮箱</p>
      <div class="btn-wrap">
        <div class="pingjia-wrap" @click="onPingjia" v-show="showPjFlag">立即评价</div>
      </div>
    </header>

    <AD3 :adList="common.getAdListBySeat(adList, 6)" seat='6'></AD3>
    <AD2 :adList="common.getAdListBySeat(adList, 5)" seat='5'></AD2>
    <AD1 :adList="common.getAdListBySeat(adList, 2)" seat='2'></AD1>

    <div class="bg" v-show="showHfFlag">
      <div class="hf-wrap">
        <div class="hf-bigTitle">在线回访</div>
        <div class="hf-content-wrap">
          <div class="hf-main-title">尊敬的{{dataInfo.insuredLastName}}<template v-if="dataInfo.sex == 1">先生</template><template v-else-if="dataInfo.sex == 2">女士</template>，您好！</div>
          <div class="hf-main-title">感谢您选择阳光保险，您在我司{{dataInfo.payTime && dataInfo.payTime | getFormatDate}}购买了<span>{{dataInfo.prdName}}</span>保险产品。为了维护您的合法权益，了解您对我们服务的满意度，对您进行回访。本次回访内容将被留存，请您理解支持。</div>
          <div class="hf-item">
            <div class="hf-title">1、您是否看过并理解了保险条款、产品说明书和投保说明书等内容，对保险责任与责任免除等相关内容是否都了解？</div>
            <div class="hf-radio-wrap">
              <input type="radio" id="a" value="0" v-model="picked1" /><label for="a">否</label>
              <input type="radio" id="b" value="1" v-model="picked1" /><label for="b">是</label>
            </div>
          </div>
          <div class="hf-item">
            <div class="hf-title" id="title21">2、您投保{{dataInfo.prdName}}保险产品保费是{{dataInfo.policyMoney}}元。</div>
            <div class="hf-radio-wrap">
              <input type="radio" id="c" value="0" v-model="picked2" /><label for="c">否</label>
              <input type="radio" id="d" value="1" v-model="picked2" /><label for="d">是</label>
            </div>
          </div>
          <div class="hf-item">
            <div class="hf-title" id="title31">3、您投保的{{dataInfo.prdName}}保险产品保单保障期间是{{dataInfo.policyStartTime && dataInfo.policyStartTime | getFormatDate}}零时起至{{dataInfo.policyEndTime && dataInfo.policyEndTime | getFormatDate}}二十四时止。</div>
            <div class="hf-radio-wrap">
              <input type="radio" id="e" value="0" v-model="picked3" /><label for="e">否</label>
              <input type="radio" id="f" value="1" v-model="picked3" /><label for="f">是</label>
            </div>
          </div>
          <div class="hf-item">
            <div class="hf-title" id="title33">4、您选择的<span v-if="dataInfo.policyType == 1">电子</span><span v-else>纸质</span>保单。</div>
            <div class="hf-title">您是否通过公司官网、电子邮箱、短信等方式查阅到您的电子保单？</div>
            <div class="hf-radio-wrap">
              <input type="radio" id="g" value="0" v-model="picked4" /><label for="g">否</label>
              <input type="radio" id="h" value="1" v-model="picked4" /><label for="h">是</label>
            </div>
          </div>
          <div class="hf-item">
            <div class="hf-title">5、基于此次投保体验，请对我们的服务进行打分：</div>
            <div class="start">
              <i @click="handleXing(index)" v-for="(item, index) of imgArr" :key="'imgArr' + index" :class="item ? 'on' : ''"></i>
            </div>
          </div>
          <div class="hf-btn" @click="onConfirm">确认提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AD1 from '@/components/ad/ad1.vue'
import AD2 from '@/components/ad/ad2.vue'
import AD3 from '@/components/ad/ad3.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'pay',
  components: {
    AD1,
    AD2,
    AD3,
  },
  data() {
    return {
      itemid: this.$route.query.id, //列表id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      ordCode: this.$route.query.ordCode, // 订单号
      ecryptRayCode: this.$route.query.ecryptRayCode,
      adList: [],
      itemData: {},
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
      channelName: window.sessionStorage.getItem('channelName'),

      picked1: '',
      picked2: '',
      picked3: '',
      picked4: '',
      imgArr: [true, true, true, true, true],
      starLength: 5,

      showHfFlag: false,
      showPjFlag: false,

      dataInfo: {},
    }
  },
  filters: {
    getFormatDate(date) {
      if (!date) {
        return false
      }
      var dateArr = date.split('-')
      return dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日'
    }
  },
  created() {
    document.title = '支付成功页'
    this.handleChannelCodeAndOrgCode()
    this.getProductDetails()
    this.getAd()
    window.sessionStorage.removeItem('userSign')
    this.init()
  },
  methods: {
    showLoading(text) {
      text = text || '加载中...'
      // 显示
      this.$vux.loading.show({
        text: text
      })
    },
    hideLoading() {
      // 隐藏
      this.$vux.loading.hide()
    },
    init() {
      this.showLoading()
      this.$http.post('/sunmc/callbackInfo/postDetailInfo', {
        prdId: this.itemid,
        channelCode: this.channelCode,
        ordCode: this.ordCode,
        ecryptRayCode: this.ecryptRayCode ? this.ecryptRayCode : '',
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.dataInfo = res.data.data
          this.showHfFlag = true
        } else {
          this.showPjFlag = true
          // this.onToast(res.data.msg)
        }
        this.hideLoading()
      }).catch(err => {
        this.showPjFlag = true
      })
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    onConfirm() {
      if (this.picked1 == '' || this.picked2 == '' || this.picked3 == '' || this.picked4 == '' || this.starLength == 0) {
        this.onToast('您的问卷还没有填写完，请继续')
        return false
      }
      this.showLoading()
      let yesAnswerArr = []
      let noAnswerArr = []
      if (this.picked1 == 0) {
        noAnswerArr.push(1)
      } else if (this.picked1 == 1) {
        yesAnswerArr.push(1)
      }
      if (this.picked2 == 0) {
        noAnswerArr.push(2)
      } else if (this.picked2 == 1) {
        yesAnswerArr.push(2)
      }
      if (this.picked3 == 0) {
        noAnswerArr.push(3)
      } else if (this.picked3 == 1) {
        yesAnswerArr.push(3)
      }
      if (this.picked4 == 0) {
        noAnswerArr.push(4)
      } else if (this.picked4 == 1) {
        yesAnswerArr.push(4)
      }

      this.$http.post('/sunmc/callbackInfo/save', {
        productId: this.dataInfo.productId,
        surveyVer: 'V1.0',
        // evaluationContent: '',
        // lable: '',
        policyNo: this.dataInfo.ordCode,
        dcCode: this.dataInfo.channelCode, // DC码
        starClass: this.starLength,
        noAnswer: noAnswerArr.join(','),
        appraiser: this.dataInfo.phone, // 手机号
        productName: this.dataInfo.prdName,
        yesAnswer: yesAnswerArr.join(','),
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          // this.onToast('提交成功')
        } else {
          // this.onToast(res.data.msg)
        }
        this.showHfFlag = false
        this.hideLoading()
      }).catch(err => {
        this.showHfFlag = false
        this.hideLoading()
      })
    },
    handleXing(index) {
      let imgArr = [false, false, false, false, false]
      for (var i = 0; i <= index; i++) {
        imgArr[i] = true
      }
      this.imgArr = imgArr
      this.starLength = index + 1
    },
    handleChannelCodeAndOrgCode() {
      let latest_channelCode = this.Cookies.get('latest_channelCode')
      if (!this.common.checkMsgNull(latest_channelCode)) {
        this.latest_channelCode = ''
        this.Cookies.set('latest_channelCode', this.channelCode, { expires: 60 })
      } else {
        this.latest_channelCode = latest_channelCode
      }
      let latest_orgCode = this.Cookies.get('latest_orgCode')
      if (!this.common.checkMsgNull(latest_orgCode)) {
        this.latest_orgCode = ''
        this.Cookies.set('latest_orgCode', this.orgCode, { expires: 60 })
      } else {
        this.latest_orgCode = latest_orgCode
      }
      let first_channelCode = this.Cookies.get('channelCode')
      if (!this.common.checkMsgNull(first_channelCode)) {
        this.Cookies.set('channelCode', this.channelCode, { expires: 60 })
      }
      this.first_channelCode = first_channelCode

      let first_orgCode = this.Cookies.get('orgCode')
      if (!this.common.checkMsgNull(first_orgCode)) {
        this.Cookies.set('orgCode', this.orgCode, { expires: 60 })
      }
      this.first_orgCode = first_orgCode
    },
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
    getProductDetails() {
      this.$http.post("/prdmc/prdmcShop/productDetail", {
        productId: this.itemid,
        orgCode: this.orgCode
      }).then(res => {
        if (res.status == 200) {
          this.itemData = res.data.data
          document.title = this.itemData.prdName
          this.onSensors2('feiche_zhifuchenggongye', '进入支付成功页')
        } else {
        }
      });
    },
    onSensors2(eventClick, eventName) {
      this.sensors.track(eventClick, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.itemid,
        channelCode: this.first_channelCode,
        latest_channelCode: this.latest_channelCode,
        orgCode: this.first_orgCode,
        latest_orgCode: this.latest_orgCode,
        page_ID: this.common.getPageid(3),
      })
    },
  }
}

</script>

<style scoped>
.zhifu {
  margin: 0 auto;
  background-color: #efefef;
  height: 100%;
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
  margin-top: 0.2rem;
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
.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 0.2rem;
}
.btn-wrap .pingjia-wrap {
  width: 1.5rem;
  height: 0.4rem;
  color: #ff8400;
  font-size: 0.16rem;
  line-height: 0.4rem;
  border-radius: 0.5rem;
  background-color: #fff;
}
.swipe {
  height: 1rem;
}
.swipe img {
  width: 100%;
}

/* 在线回访样式 开始 */
.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
}
.start {
  display: flex;
  width: 1.4rem;
  height: 0.23rem;
  margin: 0.1rem auto 0;
  text-align: center;
}
.start i {
  width: 0.24rem;
  height: 0.23rem;
  background: url("../../assets/star_init.png") no-repeat center;
  background-size: 100% 100%;
  margin-right: 0.05rem;
}
.start i.on {
  background: url("../../assets/star_select.png") no-repeat center;
  background-size: 100% 100%;
}
.btns_list {
  margin-top: 0.32rem;
  margin-left: 0.4rem;
}
.btns_list li {
  display: inline-block;
  float: left;
  font-size: 0.28rem;
  color: #303030;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border: 0.02rem solid #eeeeee;
  border-radius: 0.38rem;
  margin: 0 0.2rem 0.2rem 0;
  text-align: center;
  padding: 0.05rem 0.2rem;
}
.btns_list .btns_active {
  border: 0.02rem solid #ff9400;
  color: #ff9400;
  text-align: left;
}
.pj_box {
  position: relative;
}
.other {
  position: absolute;
  left: 3.6rem;
  bottom: 0;
  display: inline-block;
  font-size: 0.28rem;
  color: #303030;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border: 0.02rem solid #eeeeee;
  border-radius: 0.38rem;
  margin: 0 0.2rem 0.2rem 0;
  text-align: center;
  padding: 0.05rem 0.2rem;
}
.other.on {
  border: 0.02rem solid #ff9400;
  color: #ff9400;
  text-align: left;
}
.pj_box ul::after {
  display: block;
  content: "";
  clear: both;
}
.sub {
  width: 3.2rem;
  height: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1) 0%,
    rgba(255, 125, 19, 1) 100%
  );
  box-shadow: 0px 0.1rem 0.3rem 0px rgba(255, 222, 0, 0.3);
  border-radius: 0.4rem;
  font-size: 0.36rem;
  color: #fff;
  text-align: center;
  line-height: 0.8rem;
  margin: 0.25rem auto;
}
.sub:active {
  background: linear-gradient(
    90deg,
    rgb(255, 174, 0) 0%,
    rgb(255, 86, 19) 100%
  );
}
.textarea_f {
  display: none;
  width: 5.6rem;
  background: rgba(255, 255, 255, 1);
  border: 0.02rem solid #eeeeee;
  border-radius: 0.1rem;
  box-sizing: border-box;
  padding: 0 0.3rem;
  color: #999;
  margin: 0.1rem auto 0;
}
.textarea {
  width: 5rem;
  height: 0.7rem;
  border: 0;
  font-size: 0.28rem;
  color: #333;
}
h4.qingpingjia {
  font-size: 0.32rem;
  color: #303030;
  text-align: center;
  padding: 0.6rem 0;
}
.sub {
  width: 3.2rem;
  height: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1) 0%,
    rgba(255, 125, 19, 1) 100%
  );
  box-shadow: 0px 0.1rem 0.3rem 0px rgba(255, 222, 0, 0.3);
  border-radius: 0.4rem;
  font-size: 0.36rem;
  color: #fff;
  text-align: center;
  line-height: 0.8rem;
  margin: 0.25rem auto 0.5rem;
}
.hf-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.2rem;
  background: #fff;
  border-radius: 0.05rem;
  padding: 0.2rem;
}
.hf-wrap .hf-bigTitle {
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222222;
  font-size: 0.18rem;
  text-align: center;
}
.hf-content-wrap {
  max-height: 4rem;
  overflow: auto;
}
.hf-main-title {
  color: #444444ff;
  font-size: 0.14rem;
  padding: 0.1rem 0.2rem;
  text-align: justify;
}
.hf-main-title span {
  color: #ff7f50;
}
.hf-item {
  padding: 0.1rem 0.2rem;
}
.hf-item .hf-title {
  color: #666666ff;
  font-size: 0.13rem;
  text-align: justify;
}
.hf-item .hf-radio-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.1rem 0;
}
.hf-item .hf-radio-wrap input[type="radio"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
.hf-item .hf-radio-wrap input[type="radio"] + label::before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 0.16rem;
  height: 0.16rem;
  box-sizing: border-box;
  margin-bottom: 0.02rem;
  border-radius: 50%;
  background-image: url("../../assets/icon-radio-no.png");
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  left: 0.3rem;
}
.hf-item .hf-radio-wrap input[type="radio"]:checked + label::before {
  background-image: url("../../assets/icon-radio-yes.png");
}
.hf-item .hf-radio-wrap input[type="radio"] + label {
  color: #666666ff;
  font-size: 0.13rem;
  padding-left: 0.5rem;
  position: relative;
}
.hf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 0.4rem;
  border-radius: 0.3rem;
  background: linear-gradient(-90deg, #ffc500 0%, #ff7d13 100%);
  box-shadow: 0 0.05rem 0.15rem 0 #ffde004c;
  color: #ffffff;
  font-weight: medium;
  font-size: 0.18rem;
  margin: 0.2rem auto 0;
}

/* 在线回访样式 结束 */
</style>
</style>
