<template>
  <transition name="bounce">
    <div class="bbrPopPage-wrap" v-show="showBbrPopPage">
      <header>
        <div class="back" @click="onHideBbrPopPage">
          <img style="width:.1rem;" src="../../../../static/images/fhjt.png" alt="">
        </div>
        被保险人重要告知
      </header>
      <div class="content">
        被保险人是否同意投保人为其投保本保险产品且对本保险产品的保险金额无异议？
      </div>
      <footer>
        <div class="btn">
          <div class="have" @click="onHideBbrPopPage(),onSensors('新模板页面-不同意', $event)">不同意</div>
          <div class="no" @click="onBbrPopPage(),onSensors('新模板页面-点击同意', $event)">同意</div>
        </div>
      </footer>
      <div class="kongbai"></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'BbrPopPage',
  props: {
    showBbrPopPage: Boolean,
    channelName: String,
  },
  data() {
    return {
    }
  },
  created() { },
  mounted() {
  },
  methods: {
    onSensors(eventName, event) {
      console.log(event.target)
      this.sensors.quick('trackAllHeatMap', event.target, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title
      });
    },
    onHideBbrPopPage() {
      this.$emit('onHideBbrPopPage')
    },
    onBbrPopPage() {
      this.$emit('onBbrPopPage')
    }
  }
}
</script>
<style scoped>
.bbrPopPage-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 5;
}
.bbrPopPage-wrap header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 3.75rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #fff;
  font-size: 0.16rem;
  color: #333333;
  text-align: center;
  border-bottom: 1px solid #eee;
  font-weight: 700;
}
.bbrPopPage-wrap .content {
  font-size: 0.15rem;
  padding: 0.6rem 0.15rem 0 ;

  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(0.6rem + constant(safe-area-inset-bottom));
  padding-bottom: calc(0.6rem + env(safe-area-inset-bottom));
}
.bbrPopPage-wrap .content .content-cont {
  box-sizing: border-box;
  padding: 0 0.15rem 0.1rem;
  background: #fff;
  color: #666666;
  font-size: 0.14rem;
  border-bottom: 0.4rem solid #efefef;
}
.bbrPopPage-wrap .content .content-cont h4 {
  margin-bottom: 0.1rem;
}
.bbrPopPage-wrap .content .content-cont p {
  /* text-indent: -1em;
  padding-left: 1em; */
  text-align: justify;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 3.75rem;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: constant(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  padding-bottom: env(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
}
footer .btn {
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}
footer .btn > div {
  width: 50%;
  height: 100%;
  color: #0bc37d;
  font-size: 0.16rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
footer .btn .have {
  color: #444;
}
footer .btn .no {
  color: #fff;
  background-image: linear-gradient(270deg, #ff3d00 0, #ff8c00 100%);
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
.back {
  position: absolute;
  left: 0.15rem;
  top: 0;
  height: 0.5rem;
  line-height: 0.5rem;
  font-weight: 400;
}
.kongbai {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  background-color: #fff;
  z-index: 3;
}
</style>