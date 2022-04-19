<template>
  <div>


    <div class="unPayIndex-wrap" v-show="showUnPayIndexFlag">
      <h4 class="jrygtblc">您即将进入阳光财险投保流程：</h4>
      <div class="weilbzaqxx">为了保障您的权益，请仔细阅读保险条款，同时应监管要求，投保流程操作轨迹会记录存档。</div>
      <div class="dividing_line" style="width: 100%;"></div>
      <div class="weilbzaqxx">为保障您的信息安全，请进行短信验证：</div>
      <ul class="information_validation">
        <li>
          <span class="information_validation_left">验证码</span>
          <input class="information_validation_right_verification_code" v-model="validateCode" type="text" placeholder="请输入" maxlength="6">
          <button class="obtain" v-show="show" id="obtain1" @click="codeClick()">获取验证码</button>
          <button class="obtain" v-show="!show">{{count + 's'}}</button>
        </li>
      </ul>
      <div class="djqrty">验证码将发至您填写的手机号 {{phone | handlePhone}}</div>
      <div class="djqrty" style="margin: 0.32rem auto 0;line-height: 1.6;">
        <span @click="flag = !flag" :class="flag ? 'gouxuan_xieyi_y' : 'gouxuan_xieyi'"></span>
        <div class="xieyi_r">
          点击确定即同意
          <template v-if="agreeList.length">
            <a v-if="item.rzFlag == 0" v-for="(item, index) of agreeList" style="color: #0099FF;" :href="item.agreeUrl" :key="'agree' + index">{{item.agree_name}}</a>
          </template>
          <template v-if="agreeList.length">
            <a v-if="item.rzFlag == 1" v-for="(item, index) of agreeList" style="color: #0099FF;" href="https://passport.sinosig.com/protocol_app.html" :key="'agree' + index">{{item.agree_name}}</a>
          </template>
        </div>
      </div>
      <div v-if="changeArgeeList.length" style="font-size: 0.12rem;font-weight: bold;margin: 0.1rem auto 0.2rem;color: #222;">
        <span v-for="(item, index) of changeArgeeList" :key="'changeAgree' + index">{{item.agree_name}}</span>
        协议已更新，请您仔细阅读。
      </div>
      <div class="copywriting_cont">
        <div class="determine_btn" @click="onClickConfirm">确定</div>
      </div>
    </div>

    <div class="unPayPage-wrap" v-show="!showUnPayIndexFlag">
      <div class="mk_info">
        <h4 class="title_common title_tbr">投保人信息</h4>
        <div class="wrap">
          <div class="item">
            <div class="item-title">姓名</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.name"></div>
          </div>
          <div class="item">
            <div class="item-title">手机号</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.mobile"></div>
          </div>
          <div class="item">
            <div class="item-title">证件号码</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.cardCode"></div>
          </div>
          <div class="item">
            <div class="item-title">电子邮箱</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.email"></div>
          </div>
        </div>
      </div>
      <div class="mk_info">
        <h4 class="title_common title_tbr">被保险人信息</h4>
        <template v-if="dataInfo.insuredList && dataInfo.insuredList.length">
          <div class="wrap" v-for="(item, index) of dataInfo.insuredList" :key="'bbr' + index">
            <div class="item">
              <div class="item-title">姓名</div>
              <div class="item-value"><input type="text" readonly v-model="item.name"></div>
            </div>
            <div class="item">
              <div class="item-title">手机号</div>
              <div class="item-value"><input type="text" readonly v-model="item.mobile"></div>
            </div>
            <div class="item">
              <div class="item-title">证件号码</div>
              <div class="item-value"><input type="text" readonly v-model="item.cardCode"></div>
            </div>
            <div class="item">
              <div class="item-title">电子邮箱</div>
              <div class="item-value"><input type="text" readonly v-model="item.email"></div>
            </div>
          </div>
        </template>
      </div>
      <div class="mk_info">
        <h4 class="title_common title_tbr">车辆信息</h4>
        <div class="wrap">
          <div class="item">
            <div class="item-title">车牌号</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.plateNo"></div>
          </div>
          <div class="item">
            <div class="item-title">车架号</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.frameNo"></div>
          </div>
        </div>
      </div>
      <div class="mk_info">
        <h4 class="title_common title_tbr">保险信息</h4>
        <div class="wrap">
          <div class="item">
            <div class="item-title">产品名称</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.productName"></div>
          </div>
          <div class="item">
            <div class="item-title">保险起期</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.startDate"></div>
          </div>
          <div class="item">
            <div class="item-title">保险止期</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.endDate"></div>
          </div>
          <div class="item">
            <div class="item-title">保费</div>
            <div class="item-value"><input type="text" readonly v-model="dataInfo.sumPremium"></div>
          </div>
        </div>
      </div>

      <commonpop :showPDFPop="showPDFPop" :showCommonListPop="showCommonListPop" :showCommonContentPop="showCommonContentPop" :pdfUrl="pdfUrl" :commonListTitle="commonListTitle" :commonListArr="commonListArr" :commonContent="commonContent" @onHidePDFPop="onHidePDFPop" @onHideCommonListPop="onHideCommonListPop" @onHideCommonContentPop="onHideCommonContentPop" @onShowCommonContentPop="onShowCommonContentPop"></commonpop>
      <div class="footer">
        <Xieyi2 :checkedFlag="checkedFlag" :khsIsReadFlag="khsIsReadFlag" :khsPopShowFlag="khsPopShowFlag" :khsArr="khsArr" @onSwitchCheckedFlag="onSwitchCheckedFlag" @onClickYuqr="onClickYuqr" @onHideKhsPop="onHideKhsPop" @onClickKhsTab="onClickKhsTab" @onShowCommonContentPop="onShowCommonContentPop" @onClickTabBtn="onClickTabBtn"></Xieyi2>
        <div class="footer-bottom" @click="onGetPay">
          <span>确认投保，去支付</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Xieyi2 from '@/components/newComponents/xieyi/Xieyi2.vue'
import Commonpop from '@/components/newComponents/commonpop/Commonpop.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'UnPayIndex',
  components: {
    Xieyi2,
    Commonpop,
  },
  data() {
    return {
      validateCode: '',

      rayCode: this.$route.query.rayCode,// 投保单号加密串
      mechanismCode: this.$route.query.mechanismCode, // DX：电销 ZY：自营

      timer: null,
      show: true,
      count: "",//倒计时

      flag: false,
      // flag2: false,

      showUnPayIndexFlag: true,

      /////////////////////////////////////////// 底部-我已确认部分 开始 ////////////////////////////////////////////////
      bxtkArr: [], // 保险条款数组
      khsArr: [], // 可回溯数组

      insurDetail: {},
      checkedFlag: false,
      khsPopShowFlag: false,
      khsIsReadFlag: false,
      /////////////////////////////////////////// 底部-我已确认部分 开始 ////////////////////////////////////////////////
      itemData: {},
      showPDFPop: false,
      showCommonListPop: false, // 是否展示通用列表弹框 标识
      showCommonContentPop: false, // 是否展示通用内容弹框 标识
      pdfUrl: '',
      commonListArr: [], // 通用列表数组
      commonListTitle: '', // 通用列表弹框中的顶部标题
      commonContent: {}, // ；通用弹框展示内容
      gmxzArr: [], // 非保险条款数组，也不包括费率表

      dataInfo: {},

      phone: '',
      agreeList: [],
      changeArgeeList: [],

    }
  },
  created() {
    document.title = '待支付订单'
    this.init1()
  },
  filters: {
    handlePhone(phone) {
      if (phone) {
        return `${phone.substring(0, 3)}****${phone.substring(7)}`
      } else {
        return ''
      }
    },
  },
  methods: {
    init1() {
      this.showLoading('')
      this.$http.post('/sunmc/dxPayPolicyController/dxPayPolicyPhone', {
        rayCode: this.rayCode,
        mechanismCode: this.mechanismCode,
      }).then(res => {
        console.log(res)
        if (res.data.errCode == 200) {
          this.phone = res.data.phone

          this.$http.post('/sunmc/dxPayPolicyController/agreeQuery', {
            phone: this.phone
          }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
              this.agreeList = res.data.agreeList
              this.changeArgeeList = res.data.changeArgeeList
            } else {
            }
          })
        } else {
          this.$router.push({//跳转到错误页面
            path: "/unPayErr",
          })
        }
      }).catch(err => {
        console.log(err)

      }).finally(() => {
        this.hideLoading()
      })

    },
    // 可回溯绑定投保单号
    onKhs() {
      try {
        window.sessionStorage.removeItem('tbdh')
        window.sessionStorage.setItem('tbdh', this.dataInfo.rayCode)
        _behaviorObj.setorderNo(this.dataInfo.rayCode, function (data) {
          if (data.resCode == "0000") {
            //后续逻辑
          }
        })
      } catch (err) {
        console.log('可回溯报错：' + err)
      }
    },
    onAgreeConfirm() {
      this.$http.post('/sunmc/dxPayPolicyController/agreeConfirm', {
        phone: this.phone
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
        } else {
        }
      })
    },
    onClickConfirm() {
      if (!this.validateCode) {
        this.onToast('验证码不能为空')
        return false
      }

      if (this.validateCode.length < 6) {
        this.onToast('验证码不正确')
        return false
      }

      if (!this.flag) {
        this.onToast('请阅读并同意相关协议')
        return false
      }
      // if (!this.flag2) {
      //   this.onToast('请阅读并同意个人信息同步授权')
      //   return false
      // }
      this.showLoading('')

      this.onAgreeConfirm()
      this.$http.post('/sunmc/dxPayPolicyController/checkValidate', {
        rayCode: this.rayCode,
        mechanismCode: this.mechanismCode,
        validateCode: this.validateCode,
      }).then(res => {
        console.log(res)
        if (res.data.errCode == 200) {
          this.dataInfo = res.data.payPolicy
          let dataInfoCopy = JSON.parse(JSON.stringify(this.dataInfo))
          dataInfoCopy.sumPremium = dataInfoCopy.sumPremium + '元'
          this.dataInfo = JSON.parse(JSON.stringify(dataInfoCopy))

          this.init()
          this.onKhs()
          this.showUnPayIndexFlag = false
        } else {
          this.onToast(res.data.errMsg)
        }
      }).catch(err => {
        console.log(err)

      }).finally(() => {
        this.hideLoading()
      })


    },
    codeClick() {
      this.getYZM()
    },
    getYZM() {
      this.showLoading('')
      this.$http.post('/sunmc/dxPayPolicyController/dxPayPolicySendValidcode', {
        phone: this.phone
      }).then(res => {
        console.log(res)
        if (res.data.errCode == 200) {
          this.onToast('验证码发送成功')
          this.countdown()
        } if (res.data.errCode == 9999) {
          this.$router.push({//跳转到错误页面
            path: "/unPayErr",
          })
        } else {
          this.onToast(res.data.errMsg)
        }
      }).catch(err => {
        console.log(err)

      }).finally(() => {
        this.hideLoading()
      })
    },
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
    //倒计时
    countdown() {
      const TIME_COUNT = 60;
      // const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },



    onGetPay() {
      if (!this.checkedFlag) {
        this.onToast('请仔细阅读并确认产品条款以及相关告知信息')
        return false
      }

      this.showLoading('')
      this.$http.post('/sunmc/dxPayPolicyController/getPayPolicy', {
        orderSn: this.dataInfo.ordCode,
        mechanismCode: this.mechanismCode,
        payFlag: this.mechanismCode == 'DX' ? 4 : null,
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          window.location.href = res.data.data.payUrls
        } else {
          this.onToast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)

      }).finally(() => {
        this.hideLoading()
      })

    },
    onHideCommonListPop() {
      this.showCommonListPop = false
    },
    onShowCommonListPop() {
      this.showCommonListPop = true
    },
    onShowCommonListArr(type) {
      if (type == 1) {
        this.commonListArr = JSON.parse(JSON.stringify(this.bxtkArr))
        this.commonListTitle = '保险条款'
      } else if (type == 2) {
        this.commonListArr = JSON.parse(JSON.stringify(this.gmxzArr))
        this.commonListTitle = '购买须知'
      }
      this.onShowCommonListPop()
    },
    onHideCommonContentPop() {
      if (!this.showCommonListPop && !this.khsPopShowFlag) {
      }
      this.showCommonContentPop = false
    },
    onShowCommonContentPop(detail) {
      if (!this.showCommonListPop) {
      }
      if (detail.content.indexOf('.pdf') != -1) {
        this.pdfUrl = detail.content
        this.showPDFPop = true
      } else {
        this.commonContent = detail
        this.showCommonContentPop = true
      }
    },
    onShowPDFPop() {
      this.showPDFPop = true
    },
    onHidePDFPop() {
      if (!this.showCommonListPop && !this.khsPopShowFlag) {
      }
      this.showPDFPop = false
    },
    onShowCommonContentPop(detail) {
      if (!this.showCommonListPop) {
      }
      if (detail.content.indexOf('.pdf') != -1) {
        this.pdfUrl = detail.content
        this.showPDFPop = true
      } else {
        this.commonContent = detail
        this.showCommonContentPop = true
      }
    },
    onSwitchCheckedFlag() {
      if (this.checkedFlag) {
        this.checkedFlag = !this.checkedFlag
      } else {
        if (this.khsIsReadFlag) {
          this.checkedFlag = !this.checkedFlag
        } else {
          this.khsPopShowFlag = true
        }
      }
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    init() {
      this.$http.post('/prdmc/prdmcShop/productDetail', {
        orgCode: this.dataInfo.orgName,
        productId: this.dataInfo.prdId,
      }).then(res => {
        if (res.status == 200) {
          this.itemData = res.data.data
          this.onInsurancesArr()
        } else {
          this.onToast('获取数据失败，请稍候重试')
        }
      })
    },
    // 点击阅读确认
    onClickYuqr(index) {
      this.onChangeKhsTabActiveStatus(index)
      this.onShowKhsPop()
    },
    onShowKhsPop() {
      this.khsPopShowFlag = true
    },
    onHideKhsPop() {
      this.khsPopShowFlag = false
    },
    onClickTabBtn() {
      this.khsIsReadFlag = true
      // 隐藏弹框
      this.onHideKhsPop()
      this.checkedFlag = true
    },
    onClickKhsTab(index) {
      this.onChangeKhsTabActiveStatus(index)
    },
    // 获取 保险条款数组 购买须知数组 投保声明数组 责任免除内容 重要告知内容 费率表内容
    onInsurancesArr() {
      let insurances = this.itemData.insurances
      let zrmcContent = '' // 责任免除的内容
      let tbydContent = '' // 特别约定的内容
      let tbxzContent = '' // 投保声明 的内容
      let cfnlContent = '' // 偿付能力告知书 的内容
      for (let i = 0; i < insurances.length; i++) {
        let item = insurances[i]
        if (item.title == '投保须知' || item.title == '投保告知书' || item.title == '投保声明') {
          tbxzContent = JSON.parse(JSON.stringify(item))
          this.gmxzArr.push(item)
        } else if (item.title == '责任免除') {
          zrmcContent = JSON.parse(JSON.stringify(item))
          this.gmxzArr.push(item)
        } else if (item.title == '特别约定') {
          tbydContent = JSON.parse(JSON.stringify(item))
        } else if (item.title == '偿付能力告知书') {
          cfnlContent = JSON.parse(JSON.stringify(item))
        } else if (item.type == 1 || item.type == 5 || item.type == 7 || item.type == 2 || item.type == 11) { // 更多购买须知中不包含保险条款
          this.gmxzArr.push(item)
        } else if (item.type == 3) {// 保险条款
          this.bxtkArr.push(item)
        } else if (item.type == 9) {// 附加信息中的费率表
          this.flbContent = item
        }
      }
      let arr = []
      arr.push({
        title: '保险条款',
        isList: '1',
        content: JSON.parse(JSON.stringify(this.bxtkArr)),
        isActive: '1',
      })
      if (zrmcContent != '') {
        arr.push({
          title: '责任免除',
          isList: '0',
          content: JSON.parse(JSON.stringify(zrmcContent)),
          isActive: '0',
        })
      }
      if (tbydContent != '') {
        arr.push({
          title: '特别约定',
          isList: '0',
          content: JSON.parse(JSON.stringify(tbydContent)),
          isActive: '0',
        })
      }
      arr.push({
        title: '投保声明',
        isList: '0',
        content: JSON.parse(JSON.stringify(tbxzContent)),
        isActive: '0',
      })
      if (cfnlContent != '') {
        if (cfnlContent.content.endsWith('.pdf')) {
          let cfnlArr = []
          cfnlArr.push(cfnlContent)
          arr.push({
            title: '偿付能力告知书',
            isList: '1',
            content: JSON.parse(JSON.stringify(cfnlArr)),
            isActive: '0',
          })
        } else {
          arr.push({
            title: '偿付能力告知书',
            isList: '0',
            content: JSON.parse(JSON.stringify(cfnlContent)),
            isActive: '0',
          })
        }
      }

      this.khsArr = arr
    },
    // 改变当前所展示的tab
    onChangeKhsTabActiveStatus(index) {
      for (let i = 0; i < this.khsArr.length; i++) {
        this.khsArr[i].isActive = '0'
        if (i == index) {
          this.khsArr[i].isActive = '1'
        }
      }
    },
  },


}
</script>

<style scoped>
input,
button {
  border: none;
  outline: none;
  background: #ffffff;
}
[contenteditable="true"],
input,
textarea {
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
  -o-user-select: auto !important;
  user-select: auto !important;
}
.unPayIndex-wrap {
  background: #fff;
  border-radius: 0.1rem;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.3rem;
  margin: 0 auto;
  font-size: 0.24rem;
  color: #666666;
}
.jrygtblc {
  font-size: 0.14rem;
  color: #222;
}
.weilbzaqxx {
  font-size: 0.13rem;
  color: #666;
  margin-bottom: 0.15rem;
  margin-top: 0.15rem;
}
.gouxuan_xieyi {
  display: inline-block;
  width: 0.16rem;
  height: 0.16rem;
  background: url("../../assets/icon-radio-no.png") no-repeat;
  background-size: 95%;
}
.gouxuan_xieyi_y {
  display: inline-block;
  width: 0.16rem;
  height: 0.16rem;
  background: url("../../assets/icon-radio-yes.png") no-repeat;
  background-size: 95%;
}
.xieyi_r {
  width: 2.9rem;
  float: right;
  text-align: left;
  font-size: 0.12rem;
  color: #666;
}
.djqrty::after {
  display: block;
  content: "";
  clear: both;
}
.pop .tk_pop_wrap .xieyi_r a {
  display: inline;
}
.dividing_line {
  width: 100%;
  height: 0.04rem;
  background: #eeeeee;
  margin: 0 auto;
}
.information_validation {
  margin: 0 auto;
  font-size: 0.16rem;
  color: #606060;
  line-height: 0.44rem;
}
.information_validation_left {
  display: inline-block;
  width: 0.7rem;
  height: 0.44rem;
}
.information_validation_right_inp {
  width: 2rem;
  height: 0.2rem;
  padding: 0.11rem 0.05rem;
  font-size: 0.16rem;
  color: #333;
  line-height: 0.2rem;
}
.information_validation_right_verification_code {
  width: 40%;
  padding: 0.11rem 0.05rem;
  font-size: 0.16rem;
  color: #333;
  line-height: 0.2rem;
}
.information_validation li {
  height: 0.44rem;
  border-bottom: 1px solid #eeeeee;
}
.obtain {
  height: 0.42rem;
  font-size: 0.16rem;
  color: #0099ff;
  float: right;
}
.djqrty {
  font-size: 0.12rem;
  color: #999999;
  text-align: left;
  padding-top: 0.1rem;
}
.determine_btn {
  width: 1.6rem;
  height: 0.4rem;
  background: linear-gradient(90deg, #ffc500 0%, #ff7d13 100%);
  box-shadow: 0 0.05rem 0.15rem 0 rgba(255, 222, 0, 0.3);
  border-radius: 0.2rem;
  font-size: 0.18rem;
  color: #ffffff;
  line-height: 0.4rem;
  text-align: center;
  margin: 0.15rem auto 0;
}
.color_blue {
  color: #0099ff;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  z-index: 3;
}
.footer .footer-bottom {
  height: 0.5rem;
  background: #0bc37d;
  line-height: 0.5rem;
  text-align: center;
  color: #fff;
  font-size: 0.17rem;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAABCAYAAAEN9pMMAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABIqADAAQAAAABAAAAAQAAAABrSUJhAAAAlklEQVQ4Ea2SAQqAMAwDt/frl3Uu4kEoLcjYoKRNsljFPs422t3aW9fEMUsIJ8zmyreB7+P4looPZqm/vHzbFlJQLC2k4xg9ml1f9We5cFk+Wobuz3Q497E3mmF/fyMROo7eR02zHtBnESZOh5n7cBHRK1zNr/KcV69a2d9z4jsxV/l+l547ILwjvXsihwaiV7j6fZP8B8FV2/VJ11VMAAAAAElFTkSuQmCC);
  background-repeat: repeat-y;
  background-size: 100%;
}
.footer .footer-bottom:active {
  opacity: 0.7;
}

.mk_info {
  /* border-bottom: 0.1rem solid #efefef; */
}
.title_common {
  font-size: 0.16rem;
  color: #ff8400;
  text-align: left;
  height: 0.52rem;
  line-height: 0.52rem;
  padding-left: 0.1rem;
  border-bottom: 1px solid #f0f0f0;
}
.wrap {
  padding-left: 0.15rem;
  border-bottom: 0.1rem solid #efefef;
}
.wrap .item {
  height: 0.55rem;
  line-height: 0.55rem;
  font-size: 0.14rem;
  color: #666;
  position: relative;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #f0f0f0; */
}
.item .item-title {
  width: 1rem;
}
.item .item-value {
  min-width: 2.3rem;
  display: flex;
  align-items: center;
}
.item .item-value input {
  font-size: 0.14rem;
  width: 100%;
  color: #222;
}
.unPayPage-wrap {
  padding-bottom: 1.45rem;
}
</style>