<template>
  <div class="xieyi-wrap">
    <div class="xieyi-icon" @click="onSwitchCheckedFlag">
      <img v-if="checkedFlag" src="../../../../static/images/checkbox_active.png" alt="">
      <img v-else src="../../../../static/images/checkbox.png" alt="">
    </div>
    <div class="xieyi-content">
      本人已充分了解本保险产品，并承诺投保信息的真实性，理解并同意
      <template v-if="noBxtkArray.length > 0">
        <span @click="onShowInsurDetail(item)" v-for="(item,index) in noBxtkArray" :key="index" :style="{color: prdTheme}">《{{item.title}}》</span>
      </template>
      <template v-if="bxtkArray.length > 0">
        <span @click="onShowTK" :style="{color: prdTheme}">《保险条款》</span>
      </template>
      的全部内容。
    </div>
    <transition name="bounce">
      <div class="tk-list" v-show="showTkList">
        <div class="tk-title-wrap">
          <div class="back" @click="onBackTK">
            <img style="width:.1rem;height: .15rem;" src="../../../../static/images/fhjt.png" alt="">
          </div>
          <div class="tk-title">保险条款</div>
        </div>
        <div class="tk-content-wrap">
          <div class="tk-content" :style="{color: prdTheme}" @click="onShowInsurDetail(item)" v-for="(item, index) in bxtkArray" :key="index">
            <div class="tk-content-title">《{{item.title}}》</div>
            <div class="jt-wrap"><img src="./img/icon_right.png" alt=""></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div class="insur-detail" v-show="showInsurDetail">
        <div class="insur-detail-title-wrap">
          <div class="back" @click="onBackInsurDetail">
            <img style="width:.1rem;height: .15rem;" src="../../../../static/images/fhjt.png" alt="">
          </div>
          <div class="insur-detail-title">{{insurDetail.title}}</div>
        </div>
        <div class="insur-detail-content-wrap" v-html="insurDetail.content"></div>
      </div>
    </transition>
    <!-- PDF展示 开始 -->
    <transition name="bounce">
      <div class="pdf-wrap" v-show="showPDFPop">
        <iframe class="pdf-iframe" width="100%" :src="'../../../static/PDF/web/viewer.html?file=' + encodeURIComponent(pdfUrl)" frameborder="0"></iframe>
        <div class="pdf-close-btn" @click="onClosePDFPop">关闭</div>
      </div>
    </transition>
    <!-- PDF展示 结束 -->
  </div>
</template>
<script>
export default {
  name: 'InsurancesShow',
  props: {
    insurances: Array,
    checkedFlag: Boolean,
    prdTheme: String,
  },
  data() {
    return {
      showPDFPop: false,
      pdfUrl: '',
      noBxtkArray: [],
      bxtkArray: [],
      showTkList: false,
      showInsurDetail: false,
      insurDetail: {}
    }
  },
  created() {
    let timer = setInterval(() => {
      if (this.insurances && this.insurances.length > 0) {
        this.insurances.forEach(item => {
          if (item.type == 1) {// 1投保须知
            if (item.title.indexOf('宠物医疗费用给付表') == -1 && item.title.indexOf('偿付能力告知书') == -1) {
              this.noBxtkArray.push(item)
            }
          } else if (item.type == 2) {// 2投保声明书
            this.noBxtkArray.push(item)
          } else if (item.type == 3) {// 3保险条款
            this.bxtkArray.push(item)
          }
        })
        clearInterval(timer)
      }
    }, 1000)
  },
  mounted() {

  },
  methods: {
    onShowPDFPop() {
      this.showPDFPop = true
    },
    onClosePDFPop() {
      if (!this.showTkList) {
        this.canScroll()
      }
      this.showPDFPop = false
    },
    onSwitchCheckedFlag() {
      this.$emit('chenge')
    },
    onShowTK() {
      this.noScroll()
      this.showTkList = true
    },
    onBackTK() {
      this.canScroll()
      this.showTkList = false
    },
    onShowInsurDetail(detail) {
      if (!this.showTkList) {
        this.noScroll()
      }

      if (detail.content.indexOf('.pdf') != -1) {
        this.pdfUrl = detail.content
        this.showPDFPop = true
      } else {
        this.insurDetail = detail
        this.showInsurDetail = true
      }
    },
    onBackInsurDetail() {
      if (!this.showTkList) {
        this.canScroll()
      }
      this.showInsurDetail = false
    },
  }

}
</script>
<style scoped>
.xieyi-wrap {
  background-color: #f2f2f2;
  display: flex;
  align-items: flex-start;
  padding: 0.05rem 0.15rem 0.15rem;
}
.xieyi-wrap .xieyi-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0.12rem;
  margin-top: 0.02rem;
}
.xieyi-wrap .xieyi-icon img {
  width: 0.18rem;
  height: 0.18rem;
}
.xieyi-wrap .xieyi-content {
  font-size: 0.14rem;
}
@keyframes detail-move-in {
  0% {
    transform: translateX(3.75rem);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes detail-move-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(3.75rem);
  }
}
.bounce-enter-active {
  animation: detail-move-in 0.3s;
}
.bounce-leave-active {
  animation: detail-move-out 0.3s;
}
.tk-list {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  padding-top: 0.5rem;
  z-index: 2;
}
.tk-list .tk-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  border-bottom: 1px solid #eee;
  overflow: auto;
  color: #464646;
  text-align: center;
  font-size: 0.17rem;
  color: #333333;
}
.tk-list .tk-title-wrap .back {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
}
.tk-list .tk-title-wrap .tk-title {
  font-weight: 700;
  height: 0.5rem;
  line-height: 0.5rem;
}
.tk-list .tk-content-wrap {
}
.tk-list .tk-content-wrap .tk-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.15rem;
  height: 0.5rem;
  color: #0cc685;
  font-size: 0.15rem;
  border-bottom: 1px solid #cccccc;
  line-height: 0.5rem;
}
.tk-list .tk-content-wrap .tk-content .tk-content-title {
  max-width: 3rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.tk-list .tk-content-wrap .tk-content .jt-wrap img {
  width: 0.06rem;
  height: 0.09rem;
}
.insur-detail {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  padding-top: 0.5rem;
  z-index: 2;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.insur-detail .insur-detail-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  border-bottom: 1px solid #eee;
  overflow: auto;
  color: #464646;
  text-align: center;
  font-size: 0.17rem;
  color: #333333;
  line-height: 0.5rem;
}
.insur-detail .insur-detail-title-wrap .back {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
}
.insur-detail .insur-detail-title-wrap .insur-detail-title {
  font-weight: 700;
  height: 0.5rem;
  line-height: 0.5rem;
  max-width: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: auto;
}
.insur-detail .insur-detail-content-wrap {
  color: #363636;
  font-size: 0.15rem;
  box-sizing: border-box;
  padding: 0.15rem;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  overflow: auto;
  word-break: break-all;
  word-wrap: break-word;
}
.insur-detail .insur-detail-content-wrap >>> img {
  width: 100%;
}
/********************************** pdf展示框 开始 ********************************/
.pdf-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.pdf-iframe {
  width: 100%;
  height: 95%;
}
.pdf-close-btn {
  text-align: center;
  color: #fff;
  background-image: linear-gradient(270deg, #ff3d00 0, #ff8c00 100%);
  font-size: 0.2rem;
  border: none;
  height: 0.6rem;
  line-height: 0.6rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
/********************************** pdf展示框 结束 ********************************/
</style>