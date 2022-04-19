<template>
  <div class="wrapper">
    <!--提示条-->
    <div id="toolTips" class="toolTips">
      <span id="popMsg">银行卡号有误，请核实</span>
    </div>
    <div class="wrap">
      <div class="box_shadow">
        <h2>填写银行卡信息</h2>
        <ul class="vehicle_owner_list">
          <li>
            <label>银行选择</label>
            <select id="bank" v-model="myObj.bankCode" class="vehicle_owner_li_r vehicle_owner_li_r_bg">
              <option v-for="item in bankArr" :key="item.bankCode" :value="item.bankCode">{{item.bankname}}</option>
            </select>
          </li>
          <li>
            <label>卡号</label>
            <input type="text" class="vehicle_owner_li_r" placeholder="请输入银行卡号" v-model="myObj.cardNo" maxlength="19">
          </li>
          <li>
            <label>姓名</label>
            <input type="text" class="vehicle_owner_li_r" placeholder="请输入姓名" v-model="myObj.cardName" readonly>
          </li>
          <li>
            <label>手机号</label>
            <input type="text" class="vehicle_owner_li_r" placeholder="请输入手机号" v-model="myObj.mobile" maxlength="11">
          </li>
          <li>
            <label>验证码</label>
            <input type="text" v-model="myObj.yzm" class="vehicle_owner_li_r verificationCode_write" placeholder="请输入短信验证码" maxlength="6">
            <button type="button" id="second" class="verificationCode fs30" @click="setTime()">{{yzmText}}</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn_fix" @click="toPay()">
      <a href="javascript:void(0)"><span>确认支付</span>￥{{price}}</a>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui'
export default {
  name: 'writeBankCardInfo',
  data() {
    return {
      time: '',// 定时器
      isClicked: false,// 是否已经点击过获取验证码
      orderNo: this.$route.query.orderNo,
      price: this.$route.query.price,
      countdown: 60,
      yzmText: '获取验证码',
      myObj: {
        bankCode: '1',
        cardNo: '',
        cardName: this.$route.query.name,
        mobile: this.$route.query.mobile,
        yzm: '',
      },
      bankArr: [
        { bankCode: 102, bankname: '中国工商银行' },
        { bankCode: 103, bankname: '中国农业银行' },
        { bankCode: 104, bankname: '中国银行' },
        { bankCode: 105, bankname: '中国建设银行' },
        { bankCode: 403, bankname: '中国邮政储蓄银行' },
        { bankCode: 301, bankname: '交通银行' },
        { bankCode: 309, bankname: '兴业银行' },
        { bankCode: 310, bankname: '浦发银行' },
        { bankCode: 302, bankname: '中信银行' },
        { bankCode: 305, bankname: '中国民生银行' },
      ],
      reqNo: ''// 签约请求流水号
    }
  },
  created() { },
  methods: {
    setTime() {
      // 判断信息是否填写完整
      if (!this.common.checkMsgNull(this.myObj.bankCode)) {
        this.onToast('请选择银行')
        return false
      } else if (!this.common.checkMsgNull(this.myObj.cardNo)) {
        this.onToast('请填写银行卡号')
        return false
      } else if (!this.common.checkMsgNull(this.myObj.mobile)) {
        this.onToast('请填写手机号')
        return false
      } else if (!this.common.checkMobilePhone(this.myObj.mobile)) {
        this.onToast('手机号填写错误')
        return false
      } else if (!this.common.checkName(this.myObj.cardName)) {
        this.onToast('姓名填写错误')
        return false
      } else if (!this.common.checkZhengNum(this.myObj.cardNo)) {
        this.onToast('银行卡填写错误')
        return false
      }
      if (!this.isClicked) {
        this.isClicked = true
        this.time = setInterval(() => {
          if (this.countdown <= 0) {
            this.isClicked = false
            clearInterval(this.time)
            this.yzmText = '重新获取'
            this.countdown = 60
          } else {
            this.yzmText = '已发送 ' + this.countdown + 's'
            this.countdown--
          }
        }, 1000)
        // 调接口
        this.$http.post('/sunmc/sunSigninterface/signinterController', {
          bankCode: this.myObj.bankCode,
          cardName: this.myObj.cardName,
          cardNo: this.myObj.cardNo,
          mobile: this.myObj.mobile,
          ordCode: this.orderNo,
          bankname: this.getBankName(this.myObj.bankCode),
          bankadd: this.getBankName(this.myObj.bankCode)
        }).then(res => {
          if (res.data.status == 200) {
            this.reqNo = res.data.reqNo
          } else {
            if (this.common.checkMsgNull(res.data.message)) {
               this.onToast(res.data.message)
            } else {
               this.onToast('获取失败，请稍候重试')
            }
          }
        }).catch((e) => console.log(e))
      }
    },
    getBankName(bankCode) {
      for (let i = 0; i < this.bankArr.length; i++) {
        if (this.bankArr[i].bankCode == bankCode) {
          return this.bankArr[i].bankname
        }
      }
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 3000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    toPay() {
      // 判断信息是否填写完整
      if (!this.common.checkMsgNull(this.myObj.bankCode)) {
        this.onToast('请选择银行')
        return false
      } else if (!this.common.checkMsgNull(this.myObj.cardNo)) {
        this.onToast('请填写银行卡号')
        return false
      } else if (!this.common.checkMsgNull(this.myObj.mobile)) {
        this.onToast('请填写手机号')
        return false
      } else if (!this.common.checkMobilePhone(this.myObj.mobile)) {
        this.onToast('手机号填写错误')
        return false
      } else if (!this.common.checkName(this.myObj.cardName)) {
        this.onToast('姓名填写错误')
        return false
      } else if (!this.common.checkMsgNull(this.reqNo) || !this.common.checkMsgNull(this.myObj.yzm)) {// 签约流水号
        this.onToast('请先获取验证码')
        return false
      }
      Indicator.open({
        text: '支付中...',
        spinnerType: 'fading-circle'
      })

      this.$http.post('/sunmc/confirmSunSigninterface/confirmSigninterController', {
        signApplySerialNum: this.reqNo,
        smscode: this.myObj.yzm,
        ordCode: this.orderNo,
        mobile: this.myObj.mobile
      }).then(res => {
        if (res.data.status == 200) {
          this.$router.push({
            path: '/Product/pay',
            query: {
              id: this.$route.prdId,
              channelCode: this.$route.channelCode,
              orgCode: this.$route.orgCode,
            }
          })
        } else {
            if (this.common.checkMsgNull(res.data.message)) {
               this.onToast(res.data.message)
            } else {
               this.onToast('获取失败，请稍候重试')
            }
          }
        Indicator.close()
      }).catch((e) => {
        console.log(e)
        Indicator.close()
      })
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
  line-height: 0.4rem;
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
</style>