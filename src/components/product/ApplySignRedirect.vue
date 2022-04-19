<template>
  <!--loading遮罩-->
  <div class="center_shadow">
    <div class="center_shadow_content">
      跳转中...
    </div>
  </div>
</template>

<script>
import {
  Toast
} from "mint-ui"
export default {
  name: 'ApplySignRedirect',
  data() {
    return {

    }
  },
  created() {
    let myRouter = window.sessionStorage.getItem('myRouter')
    let proInsurUrlParam = window.sessionStorage.getItem('proInsurUrlParam')//返回投保页所需参数
    let isSigned = window.sessionStorage.getItem('isSigned')//签约标记
    let orderCode = window.sessionStorage.getItem('orderCode')//订单号
    let openId = window.sessionStorage.getItem('openId');//openid
    let signContractUser = window.sessionStorage.getItem('signContractUser')//签约用户的姓名
    let productId = window.sessionStorage.getItem('productId')//产品id
    let styleId = window.sessionStorage.getItem('styleId')
    let id = window.sessionStorage.getItem('id')
    let channelCode = window.sessionStorage.getItem('channelCode')
    let orgCode = window.sessionStorage.getItem('orgCode')

    let applyParams = {
      openId: openId,
      signContractUser: signContractUser,
      productId: productId,//产品ID
      orderCode: orderCode,// 订单号
    }

    if (isSigned && isSigned == '0') {//若从填单页跳转到该页面
      this.applySignContractFun(applyParams).then(res => {
        if (res.data.code == 1) {// 已签约
          window.location.href = res.data.data
        } else {
          window.sessionStorage.setItem('applySignUrl', res.data.data)
          window.location.href = `${window.location.href.split('#')[0]}static/html/applySignRedirect.html`//跳至重定向页面做处理(解决#问题)
        }
      })
    } else {// 如果是返回的
      this.applySignContractFun(applyParams).then(res => {
        if (res.data.code == 1) {// 已签约
          window.location.href = res.data.data
        } else {
          this.applySignContractFun(applyParams).then(res => {
            if (res.data.code == 1) {// 已签约
              window.location.href = res.data.data
            } else {
              this.applySignContractFun(applyParams).then(res => {
                if (res.data.code == 1) {// 已签约
                  window.location.href = res.data.data
                } else {
                  this.$router.push({ // 返回填单页面
                    path: myRouter,
                    query: {
                      prdId: productId,
                      styleId: styleId,
                      id: id,
                      channelCode: channelCode,
                      orgCode: orgCode,
                      openid: openId,
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  },

  methods: {
    //申请代扣签约接口(同步请求)
    async applySignContractFun(applyParams) {
      // return await this.$http.post("/sunmc/sunSignContract/applySignContract", applyParams)
      return await this.$http.post("/sunmc/sunSignPureContract/applySignPureContract", applyParams)
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
  }

}
</script>

<style scoped>
.center_shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* width: 3.75rem; */
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.center_shadow_content {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 175px;
  height: 175px;
  line-height: 175px;
  margin-top: -87.5px;
  margin-left: -87.5px;
  color: white;
  /*font-weight: bold;*/
  text-align: center;
  font-size: 20px;
}
</style>