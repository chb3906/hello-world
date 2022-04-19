<template>
  <div class="wrapper">
    <div class="wrap">
      <div class="zhifu">
        <h2>支付信息</h2>
        <div class="suc_infor">
          <p><span>产品信息：</span><em>{{prdName}}</em></p>
          <p><span>订单号：</span><em>{{orderNo}}</em></p>
          <p><span>支付金额：</span><i>￥</i><b>{{price}}</b></p>
        </div>
      </div>
      <div class="pay">
        <h2>选择支付方式</h2>
        <ul>
          <!-- <li :class="payType == 1 ? 'on': ''" @click="onSwitchPayType(1)">
            <span class="wx">微信支付</span>
            <b>无优惠</b>
            <i></i>
          </li> -->
          <li :class="payType == 2 ? 'on': ''" @click="onSwitchPayType(2)">
            <span class="yldz">银联网络支付</span>
            <b class="red" v-show="payDiscount != 1">享{{payDiscount * 10}}折优惠</b>
            <i></i>
          </li>
        </ul>
        <div class="fwxy"><a href="javascript:void(0)" @click="gotoXYPage">《服务协议》</a></div>
      </div>
    </div>
    <div class="btn_fix">
      <a href="javascript:void(0)" @click="topay"><span>确认支付 </span>￥{{money}}</a>
    </div>
  </div>
</template>
<script>

import { Toast } from 'mint-ui'
export default {
  name: 'orderPayCashier',
  data() {
    return {
      payType: 2, // 支付方式（1：微信支付 2：银行卡支付）
      prdName: this.$route.query.prdName,
      orderNo: this.$route.query.orderNo,
      price: this.$route.query.price,
      payDiscount: 1,// 默认折扣是1 
      money: this.$route.query.price,
    }
  },
  created() {
    this.getPayDiscount()
  },
  computed: {
  },
  methods: {
    gotoXYPage() {
      this.$router.push({
        path: '/Product/ylfwxy'
      })
    },
    getPayDiscount() {
      this.$http.post('/sunmc/sunSigninterface/payDiscount', {
        orderSn: this.orderNo
      }).then(res => {
        if (res.data.code == 200) {
          this.payDiscount = res.data.data
          this.onSwitchPayType(2)
        } else {
          this.onToast('获取折扣信息失败')
        }
      }).catch((e) => console.log(e))
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    onSwitchPayType(type) {
      this.payType = type
      if (this.payType == 1) {
        this.money = this.price
      } else if (this.payType == 2) {
        this.money = this.common.accMul(this.price, this.payDiscount)
      }
    },
    topay() {
      if (this.payType == 1) {// 微信支付
        this.$http.post('/sunmc/deduction/weChatPay', {
          orderSn: this.orderNo
        }).then(res => {
          if (res.data.code == 200) {
            window.location.href = res.data.data.payUrls // 跳转到微信支付的链接
          } else if (res.data.code == 201) {
            this.onToast('该订单号已支付,请勿重复提交')
          } else if (res.data.code == 202) {
            this.onToast('支付处理中,请勿重复提交订单')
          } else {
            this.onToast('操作失败，请稍候重试')
          }
        }).catch((e) => console.log(e))
      } else if (this.payType == 2) {// 银行卡支付
        this.$router.push({
          path: '/Product/writeBankCardInfo',
          query: {
            orderNo: this.orderNo,
            price: this.money,
            name: this.$route.query.name,
            mobile: this.$route.query.mobile,
            prdId: this.$route.query.prdId,
            channelCode: this.$route.query.channelCode,
            orgCode: this.$route.query.orgCode,
          },
        })
      }
    },
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  background: #f4f4f4;
  width: 100%;
  position: relative;
  padding-top: 0.1rem;
  height: 100%;
}
.wrap {
  width: 3.75rem;
}
.zhifu {
  width: 3.55rem;
  box-sizing: border-box;
  padding: 0.1rem;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.05rem;
}
.zhifu h2 {
  background: url(../../assets/orderPayCashier/icon-zfxx.png) left center
    no-repeat;
  height: 0.435rem;
  line-height: 0.435rem;
  color: #434343;
  font-size: 0.13rem;
  padding-left: 0.24rem;
  border-bottom: 1px solid #f0f0f0;
  margin-top: -0.1rem;
  background-size: 0.2rem;
}
.suc_infor {
  border: 1px solid #eee5c7;
  border-radius: 0.05rem;
  background-color: #fffff2;
  padding: 0.05rem 0;
}
.suc_infor p {
  line-height: 0.3rem;
  padding: 0 0.1rem;
  color: #303030;
  font-size: 0.12rem;
  word-wrap: break-word;
  word-break: break-all;
}
.suc_infor p:first-child {
  line-height: 0.3rem;
  padding: 0 0.1rem;
  color: #303030;
  font-size: 0.12rem;
  word-wrap: break-word;
  word-break: break-all;
}
.suc_infor p span {
  display: inline-block;
  width: 0.605rem;
  color: #606060;
}
.suc_infor p em {
  vertical-align: middle;
  display: inline-block;
  width: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: -0.03rem;
  font-weight: 600;
}
.suc_infor p b {
  color: #ff8400;
  font-size: 0.16rem;
}
.suc_infor p i {
  color: #ff8400;
}
.pay {
  width: 3.55rem;
  box-sizing: border-box;
  padding: 0 0.1rem;
  margin: 0.1rem 0.1rem 0.05rem 0.1rem;
  background: #fff;
  border-radius: 0.05rem;
}
.pay h2 {
  background: url(../../assets/orderPayCashier/icon-zf.png) left center
    no-repeat;
  height: 0.435rem;
  line-height: 0.435rem;
  color: #434343;
  font-size: 0.13rem;
  padding-left: 0.24rem;
  border-bottom: 1px solid #f0f0f0;
  background-size: 0.2rem;
}
.pay li {
  position: relative;
  border-bottom: 1px solid #eee;
  height: 0.435rem;
  line-height: 0.435rem;
  font-size: 0.13rem;
  box-sizing: border-box;
  padding-left: 0.05rem;
}
.pay li {
  background: url(../../assets/orderPayCashier/icon-xz3.png) right center
    no-repeat;
  background-size: 0.2rem;
}
.pay li:last-of-type {
  border-bottom: none;
}
.pay li span {
  padding: 0.05rem 0 0.05rem 0.4rem;
}
.pay li .yldz {
  background: url(../../assets/orderPayCashier/zf-ylwl.png) no-repeat;
  background-size: 0.28rem 0.28rem;
}
.pay li .wx {
  background: url(../../assets/orderPayCashier/zf-wx.png) no-repeat;
  background-size: 0.28rem 0.28rem;
}
.pay li b {
  font-weight: normal;
  padding-left: 0.05rem;
  color: #999;
  font-size: 0.11rem;
  float: right;
  padding-right: 0.275rem;
}
.pay li b.red {
  color: #ff9900;
  font-weight: bold;
}
.pay li i {
  position: absolute;
  left: 0;
  bottom: 0;
  border-bottom: 2px solid #ffbb03;
  width: 0;
}
.pay li.on {
  background-image: url(../../assets/orderPayCashier/icon-xz4.png);
  transition: all 0.6s;
}
.box_shadow {
  width: 3.55rem;
  box-sizing: border-box;
  padding: 0 0.1rem 0.1rem 0.1rem;
  background: #fff;
  box-shadow: 0 0.025rem 0.075rem 0 rgba(102, 102, 102, 0.05);
  border-radius: 0.05rem;
  margin: 0.1rem auto;
}
.box_shadow h2 {
  background: url(../../assets/orderPayCashier/icon-zf.png) left center
    no-repeat;
  height: 0.36rem;
  line-height: 0.36rem;
  color: #434343;
  font-size: 0.13rem;
  padding-left: 0.24rem;
  border-bottom: 1px solid #f0f0f0;
  background-size: 0.2rem;
}
.vehicle_owner_list li {
  height: 0.43rem;
  line-height: 0.43rem;
  font-size: 0.14rem;
  border-bottom: 1px solid #eeeeee;
}
.vehicle_owner_list li > label {
  display: inline-block;
  width: 1rem;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
  margin-right: 0.075rem;
}
.vehicle_owner_list li .vehicle_owner_li_r {
  width: 2.125rem;
  color: #303030;
  border: none;
  background: #fff;
  font-size: 0.14rem;
  font-weight: 500;
}
.car_info_list li:after,
.vehicle_owner_list li:after {
  content: "";
  display: block;
  clear: both;
}
.vehicle_owner_list li > label {
  display: inline-block;
  width: 1rem;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
  margin-right: 0.075rem;
}
.vehicle_owner_list li .vehicle_owner_li_r {
  width: 2rem;
  color: #303030;
  border: none;
  background: #fff;
  font-size: 0.14rem;
  font-weight: 500;
}
.vehicle_owner_list li .vehicle_owner_li_r_bg {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url(../../assets/orderPayCashier/ico_jt_tz.png) no-repeat;
  background-size: 0.2rem 0.2rem;
  background-position: 100% 50%;
  color: #cccccc;
}
.vehicle_owner_list {
  box-sizing: border-box;
  padding: 0.1rem;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
input::-moz-input-placeholder {
  color: #ccc;
}
input::-ms-input-placeholder {
  color: #ccc;
}
.vehicle_owner_list li .vehicle_owner_li_r.verificationCode_write {
  width: 1.15rem;
}
.verificationCode {
  float: right;
  display: block;
  color: #1582f1;
  border: none;
  outline: none;
  background: #ffffff;
  line-height: 0.435rem;
  margin-right: 0.05em;
}
.toolTips {
  width: 100%;
  position: fixed;
  top: 2.625rem;
  text-align: center;
  font-size: 0.14rem;
  z-index: 1000;
  display: none;
}
.toolTips span {
  padding: 0.1rem 0.15rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1.5rem;
  color: #fff;
  display: inline-block;
  max-width: 2.5rem;
  margin: 0 auto;
}
.btn_fix {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-bottom: constant(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  margin-bottom: env(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
}
.btn_fix a {
  display: block;
  padding: 0 0.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.15rem;
  background: -webkit-linear-gradient(left, #ff7c13, #ffc400);
  color: #fff;
}
.btn_fix a span {
  padding-right: 0.05rem;
}
.fwxy {
  margin-top: -0.05rem;
  padding: 0 0 0.2rem 0.4rem;
  font-size: 0.12rem;
}
.fwxy a {
  color: #1582f1;
}
</style>