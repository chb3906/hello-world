<template>
  <div style="background-color: #f3f3f3;min-height: 100%;">
    <div class="tk_header">
      <div class="tk_header_con"><a href="#">返回首页</a></div>
    </div>
    <div class="header nav_bg04">
      <p>这里是险种名称</p>
    </div>
    <div class="tbxx_content">
      <div class="tb_zhifu" style="margin:72px 0 36px 0;">
        <img src="../../assets/proToubaoxinxiPC/zhifu_error.png">
        <p class="mt50" style="font-size: 16px; color: #333; line-height: 20px;">支付失败<br>请选择其他支付方式 </p>
      </div>
      <a href="javascript:void(0)" class="tb_btn_ok fb" style="text-align: center;">重新支付</a>
    </div>
  </div>

</template>

<script>
    export default {
        name: "ProZhifuErrorPC"
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

  .nav_bg04 {
    background-image: url(../../assets/proToubaoxinxiPC/nav_bg04.png);
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
  .tb_zhifu {
    text-align: center;
  }
  .mt50 {
    margin-top: 50px;
  }
  .tb_btn_ok {
    background-color: #ff9d2f;
  }
  .tb_btn_ok, .tb_btn_cancel {
    margin: 0px auto;
    width: 200px;
    height: 40px;
    line-height: 40px;
    display: block;
    color: #fff;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
  }
</style>
