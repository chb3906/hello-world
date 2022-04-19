<template>
  <!-- <div class="traceback" v-show="showTraceback" @touchmove="handleTouchmove($event)"> -->
  <div class="traceback" v-show="showTraceback">
    <div class="traceback-main">
      <div class="traceback-title">温馨提示，您即将进入投保流程</div>
      <div class="traceback-content">请仔细阅读<strong>保险条款、购买须知、重要告知、责任免除</strong>等内容。为了保障您的权益，您在销售页面的操作将会被记录并加密存储。</div>
      <div class="traceback-content">我已阅读并同意<span class="like-a" @click="onShowCommonContentPop">《个人信息保护政策》</span></div>
      <div class="traceback-btn-wrap">
        <div class="traceback-btn">
          <div class="traceback-btn-item" @click="onNoAgree">不同意</div>
          <div class="traceback-btn-item" @click="onClickBtn">知道并同意</div>
        </div>
      </div>
    </div>

    <!--------------------------------------- 通用内容弹框 开始 --------------------------------------->
    <transition name="bounce">
      <div class="commonContentPop" v-show="showCommonContentPop">
        <div class="commonContentPop-title-wrap">
          <!-- <div class="back" @click="onHideCommonContentPop"> -->
          <!-- <img style="width:.1rem;height: .15rem;" src="./img/fhjt.png" alt=""> -->
          <!-- </div> -->
          <div class="commonContentPop-title">{{commonContent.title}}</div>
        </div>
        <div class="commonContentPop-content-wrap" v-html="commonContent.content"></div>
        <div class="common-close-btn" @click="onHideCommonContentPop">返回</div>
      </div>
    </transition>
    <!--------------------------------------- 通用内容弹框 结束 --------------------------------------->

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import personInfo from './personInfo'
export default {
  name: 'traceback',
  data() {
    return {
      showTraceback: false,
      showCommonContentPop: false,
      commonContent: personInfo,
    }
  },
  created() {
    let traceback = window.sessionStorage.traceback
    if (this.common.checkMsgNull(traceback) && traceback == 'yes') {
      this.showTraceback = false
      window.sessionStorage.traceback = 'no'
    } else {
      this.showTraceback = true
      this.noScroll()
    }
  },
  methods: {
    onShowCommonContentPop() {
      this.showCommonContentPop = true
      this.noScroll()
    },
    onHideCommonContentPop() {
      this.showCommonContentPop = false
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    onClickBtn() {
      // window.sessionStorage.traceback = 'yes'
      this.showTraceback = false
      this.canScroll()
    },
    onNoAgree() {
      this.onToast('很抱歉，如果不同意《个人信息保护政策》，您将无法投保本产品')
    },
    handleTouchmove(e) {
      e.preventDefault()
    },
    // 点击弹框时
    // 需要先获取去body的top值,再给body定位,否则先定位的话,top值会先变成0
    noScroll() {
      let top = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = -top + "px";
    },

    // 取消弹框时再取消定位
    canScroll() {
      let top = Math.abs(parseFloat(document.body.style.top));
      document.body.style.top = "";
      document.body.style.position = "";
      window.scrollTo(0, top);
    },
  }
}
</script>

<style scoped>
.traceback {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 3;
}
.traceback .traceback-main .traceback-title {
  font-size: 0.17rem;
  color: #444;
  padding: 0.15rem 0 0.15rem 0.15rem;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 0.2rem;
}
.traceback .traceback-main {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  border-top-left-radius: 0.14rem;
  border-top-right-radius: 0.14rem;
}
.traceback .traceback-main .traceback-content {
  margin: 0 auto;
  padding: 0 0.15rem 0.15rem;
  font-size: 0.14rem;
  color: #666;
}
.traceback .traceback-main .traceback-content .like-a {
  color: #03a2ef;
}
.traceback .traceback-main .traceback-btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.traceback .traceback-main .traceback-btn-wrap .traceback-btn {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.traceback
  .traceback-main
  .traceback-btn-wrap
  .traceback-btn
  .traceback-btn-item {
  text-align: center;
  color: #fff;
  /* background-color: #ff7f50; */
  background-image: linear-gradient(270deg, #ff3d00 0, #ff8c00 100%);
  font-size: 0.16rem;
  border: none;
  height: 0.5rem;
  line-height: 0.5rem;
  width: 50%;
}
.traceback
  .traceback-main
  .traceback-btn-wrap
  .traceback-btn
  .traceback-btn-item:first-child {
  color: #444;
  background: #f2f2f2;
}

@keyframes detail-move-in {
  0% {
    transform: translateX(100%);
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
    transform: translateX(100%);
  }
}
.bounce-enter-active {
  animation: detail-move-in 0.3s;
}

.bounce-leave-active {
  animation: detail-move-out 0.3s;
}

/********************************** 通用内容弹框 开始 ********************************/
.commonContentPop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  padding-top: 0.5rem;
  z-index: 999;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.commonContentPop .commonContentPop-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  overflow: auto;
  color: #464646;
  text-align: center;
  font-size: 0.17rem;
  color: #333333;
  line-height: 0.5rem;
}

.commonContentPop .commonContentPop-title-wrap .back {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
}

.commonContentPop .commonContentPop-title-wrap .commonContentPop-title {
  font-weight: 700;
  height: 0.5rem;
  line-height: 0.5rem;
  max-width: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: auto;
}

.commonContentPop .commonContentPop-content-wrap {
  color: #363636;
  font-size: 0.15rem;
  box-sizing: border-box;
  padding: 0.15rem;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  overflow: auto;
  padding-bottom: 0.7rem;
}

.commonContentPop .commonContentPop-content-wrap >>> p {
  word-break: break-all;
  word-wrap: break-word;
}

.common-close-btn {
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

/********************************** 通用内容弹框 结束 ********************************/
</style>