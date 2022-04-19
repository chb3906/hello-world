<template>
  <div>
    <div class="bdxq_box" v-if="boxVisible">
      <div class="bdxq">
        <div class="sb_fail">
          <img src="../../../static/images/tsico_kf.png" />
          <div class="status">续保失败</div>
          <div>{{message}}</div>
        </div>
        <div class="btn"><a @click="gotoNext">重新投保</a></div>
      </div>
    </div>
    <div class="shadow" v-if="loadingVisible">
      <div class="content">
        加载中...
      </div>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from "mint-ui";

export default {
  name: 'xubaoIndex',
  data() {
    return {
      boxVisible: false,
      loadingVisible: false,
      message: "",
      id: this.$route.query.id, //列表id，产品id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      oldPolicyNo: this.$route.query.oldPolicyNo,// 上年保单号（加密过的）
      isXubao: 0,// 0：不符合续保条件 1：符合续保条件
      channelName: '',
    }
  },
  created() {
    this.onMaidian()
    this.getPolicyInfo()
  },

  methods: {
    onMaidian() {
      //若channelCode不为空,则执行埋点
      if (this.channelCode != '' && this.channelCode != null) {
        //获取appkey及channelName
        this.getChannelAndAppkey((res) => {
          this.channelName = res.data.channelName;
          // CCH埋点
          this.pointKey = 'V2_' + this.channelName + '_' + '短信续保页面';//事件中文
          this.handleCCH({
            'orgCode': this.orgCode,
            'channelCode': this.channelCode,
            'pageName': this.channelName + '-短信续保页面',
            'pointKey': this.pointKey,
            'productId': this.$route.query.id,
            'url': window.location.href,
            'policyNo': '',
            'clientInfo': {}
          })
        })
      }
    },
    // 判断字符串是否为空
    checkMsgNull(msg) {
      if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
        return true;
      } else {
        return false;
      }
    },
    // 根据渠道查询渠道信息接口
    getChannelAndAppkey(callback) {
      this.$http.post('/prdmc/channel/getChannelAndAppkey', {
        channelCode: this.channelCode
      }).then(res => {
        callback(res)
      }).catch((e) => console.log(e))
    },
    // 处理CCH埋点
    handleCCH(obj) {
      this.$http.post('/sunmc/cch/onCCH', obj).then(res => { })
    },

    getPolicyInfo() {
      this.loadingVisible = true;

      this.$http.post("/sunmc/xubao/renewPolicyInfo", {
        policyNoMain: this.oldPolicyNo,
      }).then(res => {
        if (res.status == 200) {
          if (JSON.stringify(res.data) != "{}" && res.data != "") {
            if (res.data.code == '1') {//符合续保条件
              this.isXubao = 1;
              let xubaoInfo = res.data.xubaoInfo;

              //先清除数据
              window.sessionStorage.removeItem('insuredDtoList');
              window.sessionStorage.removeItem('holderDto');
              window.sessionStorage.removeItem('planInterval');
              window.sessionStorage.removeItem('xubaoStartDate');
              window.sessionStorage.removeItem('xubaoEndDate');
              window.sessionStorage.removeItem('isXubao');

              //将数据存入缓存
              window.sessionStorage.setItem('isXubao', this.isXubao);//是否续保
              window.sessionStorage.setItem('insuredDtoList', JSON.stringify(xubaoInfo.insuredDtoList));//被保人
              window.sessionStorage.setItem('holderDto', JSON.stringify(xubaoInfo.holderDto));//投保人
              window.sessionStorage.setItem('planInterval', res.data.planInterval);//保险期间
              window.sessionStorage.setItem('xubaoStartDate', res.data.xubaoStartDate);//续保开始日期
              window.sessionStorage.setItem('xubaoEndDate', res.data.xubaoEndDate);//续保结束日期
              this.loadingVisible = false;
              this.gotoNext();//跳转到续保详情页
            } else {//不符合续保条件
              window.sessionStorage.removeItem('isXubao');
              window.sessionStorage.setItem('isXubao', this.isXubao);//是否续保
              this.message = res.data.message;//提示信息
              this.boxVisible = true;//弹框
            }
          } else {
            Toast({
              message: '未查询到上年保单数据',
              position: "middle",
              duration: 1500
            });
            return;
          }
        }
      }).catch(e => {
        console.log(e)
        Toast({
          message: JSON.stringify(e),
          position: "middle",
          duration: 2000
        });
        return;
      });
    },
    gotoNext() {
      let query = {}
      if (this.isXubao == 1) {//续保
        query = {
          id: this.id,
          channelCode: this.channelCode,
          orgCode: this.orgCode,
          oldPolicyNo: this.oldPolicyNo
        };
      } else {
        query = {
          id: this.id,
          channelCode: this.channelCode,
          orgCode: this.orgCode,
        }
      }

      this.$router.push({
        path: "/Product/ProDetails",
        query: query
      });
    },
    //获取Url中的某个参数值
    getUrlValueByName(paraName) {
      var url = document.location.toString();
      var arrObj = url.split("?");
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      } else {
        return "";
      }
    },
  }
}
</script>

<style scoped>
.bdxq_box {
  padding: 0 0.4rem;
  width: 100%;
  height: 2.9rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50%;
  margin-top: -1.45rem;
  z-index: 999;
}
.bdxq {
  background-color: #fff;
  border-radius: 0.1rem;
  padding: 0.1rem 0;
}
.sb_fail {
  text-align: center;
}
.sb_fail img {
  width: 35%;
}
.status {
  margin: 0.2rem 0 0.1rem 0;
  font-weight: bold;
}
.btn {
  text-align: center;
  margin-top: 0.2rem;
}
.btn a {
  display: inline-block;
  width: 1.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  color: #fff;
  font-size: 0.17rem;
  box-shadow: #eee 0 0.05rem 0.3rem;
  border-radius: 0.5rem;
  background: -webkit-linear-gradient(left, #0ac279, #0ac279);
}
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 3.75rem;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.content {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1.75rem;
  height: 1.75rem;
  line-height: 1.75rem;
  margin-top: -0.875rem;
  margin-left: -0.875rem;
  color: white;
  text-align: center;
  font-size: 20px;
}
</style>
