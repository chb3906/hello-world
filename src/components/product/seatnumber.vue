<template>
  <div class="zxgh-wrap">
    <div class="zxgh">
      <div class="text">工号：</div>
      <input type="text" placeholder="请输入工号" v-model="zxgh" maxlength="8" >
    </div>
    <div class="btn-wrap">
      <!-- 测试环境产品id -->
      <!-- <div class="btn-item" @click="gotoPage(109)">一元出行保</div>
      <div class="btn-item" @click="gotoPage(172)">重疾险赠险</div> -->
      <!-- 生产环境产品id -->
      <div class="btn-item" @click="gotoPage(64)">一元出行保</div>
      <div class="btn-item" @click="gotoPage(93)">重疾险赠险</div>
    </div>
  </div>  
</template>
<script>
import { Toast } from "mint-ui"
export default {
  name: 'seatnumber',
  data() {
    return {
      zxgh: '', // 坐席工号
    }
  },
  methods: {
    gotoPage(id) {
      if (!this.checkMsgNull(this.zxgh)) {
        this.onToast('工号不能为空！')
        return
      }
      let path = '/Product/ProDetails'
      this.$router.push({
        path: path,
        query: {
          id: id,
          channelCode: 'DC11MD1330010006',
          orgCode: 'FCDTM',
          seatNumber: this.zxgh
        }
      })
    },
    // 判断字符串是否为空
    checkMsgNull(msg) {
      if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
        return true;
      } else {
        return false;
      }
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    }
  }
}
</script>
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
.zxgh-wrap {
  width: 100%;
  height: 100%;
  max-width: 414px;
  margin: auto;
}
.zxgh-wrap .zxgh {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
.zxgh-wrap .zxgh .text {
  font-size: 18px;
}
.zxgh-wrap .zxgh input {
  width: 150px;
  border: 1px solid #666;
  height: 44px;
  padding-left: 10px;
  border-radius: 5px;
  line-height: 44px;
  font-size: 16px;
}
.zxgh-wrap .btn-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.zxgh-wrap .btn-wrap .btn-item {
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  background-color: #fd762c;
  border-radius: 5px;
  color: #fff;
}
::placeholder {
  font-size: 16px;
}
</style>