<template>
  <div style="background-color: #f3f3f3;min-height: 100%;">
    <div class="tk_header">
      <div class="tk_header_con"><a href="#">返回首页</a></div>
    </div>
    <div class="header nav_bg03">
      <p>这里是险种名称</p>
    </div>
    <div class="tbxx_content">
      <div class="tbxx">
        <div class="tb_table tb_03">
          <table border="0" cellspacing="" cellpadding="">
            <tbody><tr>
              <th>产品名称</th>
              <th>订单号</th>
              <th>支付金额</th>
            </tr>
            <tr>
              <td>高速公路意外险</td>
              <td>P8150709200254567203</td>
              <td>100元</td>
            </tr>
            </tbody></table>
        </div>
        <div class="line"></div>
        <div class="title">选择付款方式</div>
        <div class="tb_table mb15">
          <form action="" method="post">
            <table border="0" cellspacing="" cellpadding="" style="margin-bottom: 80px;">
              <tbody><tr>
                <td style="background: #fff;">
                  <label class="label-radio-checked customer-radio" data-sval="0"></label>
                  <label class="input_label2"><img src="../../assets/proToubaoxinxiPC/alipay.png"></label>&nbsp;&nbsp;
                  <label class="label-radio customer-radio" data-sval="1"></label>
                  <label class="input_label2"><img src="../../assets/proToubaoxinxiPC/weixin.png" width="160" height="40"></label>
                </td>
              </tr>
              </tbody></table>
            <a href="javascript:void(0)" class="tb_btn_ok fb" style="text-align: center;" @click="gotoPay">去付款</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ProZhifuPC",
      methods: {
        gotoPay() {
          this.$router.push('/ProductPC/ProZhifuSuccessPC')
        }
      }
    }
</script>

<style scoped>
  .tk_header {
    width: 100%;
    background: url(../../assets/proToubaoxinxiPC/tiaokuan_bg.png) repeat-x;
    height: 40px;
  }

  .tk_header_con {
    width: 891px;
    height: 40px;
    margin: 0 auto;
  }

  .tk_header_con a {
    font-size: 14px;
    line-height: 40px;
    color: #ffa60c;
    float: right;
  }

  .header {
    position: relative;
    z-index: 1;
    background-color: #36b37f;
    height: 90px;
    width: 100%;
  }

  .nav_bg03 {
    background-image: url(../../assets/proToubaoxinxiPC/nav_bg03.png);
    background-repeat: no-repeat;
    background-position: bottom center;
  }

  .header p {
    font-size: 18px;
    color: #fff;
    line-height: 50px;
    text-align: center;
  }
  .tbxx_content {
    width: 940px;
    margin: 0px auto 30px;
    background: #fff;
    padding: 24px 25px;
  }
  .tbxx {
    width: 886px;
    margin: 0 auto;
  }
  .tb_table {
    width: 890px;
    margin: 20px auto;
  }
  .tb_table table {
    width: 890px;
    margin-top: 20px;
    text-align: left;
  }
  .tb_table tr {
    border-bottom: 1px solid #fff;
  }
  .tb_03 table th, .tb_03 table td {
    border-right: 1px solid #fff;
    height: 40px;
    width: 30%;
  }
  .tb_table th {
    background: #f3f3f3;
    color: #666;
    font-size: 14px;
    height: 30px;
    padding-left: 20px;
  }
  .tb_table td {
    background: #fbfbfb;
    color: #999;
    font-size: 14px;
    height: 30px;
    padding-left: 16px;
  }
  .line {
    border: 2px solid #bebebe;
    margin: 20px 0px 0px 0px;
    line-height: 0;
  }

  .title {
    background: #bebebe;
    width: 196px;
    height: 36px;
    padding-left: 20px;
    color: #fff;
    line-height: 32px;
    font-size: 18px;
    font-weight: bold;
  }
  .tb_table {
    width: 890px;
    margin: 35px auto;
  }
  .tb_table table {
    width: 890px;
    margin-top: 20px;
    text-align: left;
  }
  .label-radio {
    display: inline-block;
    height: 29px;
    width: 29px;
    vertical-align: middle;
    cursor: pointer;
    background: transparent url(../../assets/proToubaoxinxiPC/radio.png) no-repeat 0 10px;
  }
  .label-radio-checked {
    display: inline-block;
    height: 29px;
    width: 29px;
    vertical-align: middle;
    cursor: pointer;
    background: transparent url(../../assets/proToubaoxinxiPC/radio-checked.png) no-repeat 0 10px;
  }
  .tb_btn_ok, .tb_btn_cancel {
    margin: 0 auto;
    width: 200px;
    height: 40px;
    line-height: 40px;
    display: block;
    color: #fff;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    background-color: #ff9d2f;
  }
</style>
