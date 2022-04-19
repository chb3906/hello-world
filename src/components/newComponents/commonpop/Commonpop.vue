<template>
  <div class="commonpop-wrap">
    <!-- PDF展示 开始 -->
    <transition name="bounce">
      <div class="pdf-wrap" v-show="showPDFPop">
        <iframe class="pdf-iframe" width="100%" :src="'../../../static/PDF/web/viewer.html?file=' + encodeURIComponent(pdfUrl)" frameborder="0"></iframe>
        <div class="pdf-close-btn" @click="onHidePDFPop">返回</div>
      </div>
    </transition>
    <!-- PDF展示 结束 -->
    <!--------------------------------------- 通用列表弹框 开始 --------------------------------------->
    <transition name="bounce">
      <div class="commonListPop-wrap" v-show="showCommonListPop">
        <div class="commonListPop-title-wrap">
          <!-- <div class="back" @click="onHideCommonListPop">
            <img style="width:.1rem;height: .15rem;" src="./img/fhjt.png" alt="">
          </div> -->
          <div class="commonListPop-title">{{commonListTitle}}</div>
        </div>
        <div class="commonListPop-content-wrap">
          <div class="commonListPop-content" @click="onShowCommonContentPop(item)" v-for="(item, index) in commonListArr" :key="'commonContent' + index">
            <div class="commonListPop-content-title">《{{item.title}}》</div>
            <div class="jt-wrap"><img src="./img/icon_right.png" alt=""></div>
          </div>
        </div>
        <div class="common-close-btn" @click="onHideCommonListPop">返回</div>
      </div>
    </transition>
    <!--------------------------------------- 通用列表弹框 结束 --------------------------------------->
    <!--------------------------------------- 通用内容弹框 开始 --------------------------------------->
    <transition name="bounce">
      <div class="commonContentPop" v-show="showCommonContentPop">
        <div class="commonContentPop-title-wrap">
          <!-- <div class="back" @click="onHideCommonContentPop">
            <img style="width:.1rem;height: .15rem;" src="./img/fhjt.png" alt="">
          </div> -->
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
export default {
  name: 'commonpop',
  props: {
    showPDFPop: Boolean,
    showCommonListPop: Boolean,
    showCommonContentPop: Boolean,
    pdfUrl: String,
    commonListTitle: String,
    commonListArr: Array,
    commonContent: Object,
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    onHidePDFPop() {
      this.$emit('onHidePDFPop')
    },
    onHideCommonListPop() {
      this.$emit('onHideCommonListPop')
    },
    onHideCommonContentPop() {
      this.$emit('onHideCommonContentPop')
    },
    onShowCommonContentPop(item) {
      this.$emit('onShowCommonContentPop', item)
    },
  }
}
</script>

<style scoped>
/********************************** pdf展示框 开始 ********************************/
.pdf-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  z-index: 999;
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
/********************************** 通用列表弹框 开始 ********************************/
.commonListPop-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #efefef;
  padding-top: 0.5rem;
  z-index: 998;
}

.commonListPop-wrap .commonListPop-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #F0F0F0;
  overflow: auto;
  color: #464646;
  text-align: center;
  font-size: 0.17rem;
  color: #333333;
  z-index: 1;
}

.commonListPop-wrap .commonListPop-title-wrap .back {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
}

.commonListPop-wrap .commonListPop-title-wrap .commonListPop-title {
  font-weight: 700;
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #fff;
}

.commonListPop-wrap .commonListPop-content-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 0.5rem;
  overflow: auto;
  padding-bottom: 0.7rem;
}

.commonListPop-wrap .commonListPop-content-wrap .commonListPop-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.15rem;
  height: 0.5rem;
  color: #509AFD;
  font-size: 0.15rem;
  border-bottom: 1px solid #F0F0F0;
  line-height: 0.5rem;
  background-color: #fff;
}

.commonListPop-wrap
  .commonListPop-content-wrap
  .commonListPop-content:last-child {
  border-bottom: none;
}

.commonListPop-wrap
  .commonListPop-content-wrap
  .commonListPop-content
  .commonListPop-content-title {
  max-width: 3rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.commonListPop-wrap
  .commonListPop-content-wrap
  .commonListPop-content
  .jt-wrap
  img {
  width: 0.06rem;
  height: 0.09rem;
}

/********************************** 通用列表弹框 结束 ********************************/
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
  border-bottom: 1px solid #F0F0F0;
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
  padding-bottom: 0.7rem;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  overflow: auto;
}

.commonContentPop .commonContentPop-content-wrap >>> p {
  word-break: break-all;
  word-wrap: break-word;
}

/********************************** 通用内容弹框 结束 ********************************/

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
</style>