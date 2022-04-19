<template>
  <transition name="bounce">
    <div class="health-wrap" v-show="showHealth && JSON.stringify(itemData) != '{}'">
      <header>
        <div class="back" @click="onBack">
          <img style="width:.1rem;" src="../../../../static/images/fhjt.png" alt="">
        </div>
        健康告知
      </header>
      <div class="content">
        <div class="zy">
          <div>
            <span class="zhongyao">重要</span>
          </div>
          <span class="cont">为保障被保险人的保险权益在理赔时不受影响，<br>请如实告知被保险人的健康状况是否符合以下投保条件！</span>
        </div>
        <div class="content-cont">
          <template v-for="(health,index) in itemData.healths">
            <h4 :key="index">{{health.title}}</h4>
            <p :key="index + 'p'" v-html="health.content"></p>
          </template>
        </div>
      </div>
      <footer>
        <div class="btn">
          <div class="have" @click="onHideHealth(),onSensors(page + '-点击有情况发生', $event)">有情况发生</div>
          <div class="no" @click="onHealthye(),onSensors(page + '-点击以上情况全无', $event)">以上情况全无</div>
        </div>
      </footer>
      <div class="kongbai"></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Health',
  props: {
    showHealth: Boolean,
    itemData: Object,
    channelName: String,
    page: String,
  },
  data() {
    return {
    }
  },
  created() { },
  mounted() {
  },
  methods: {
    onBack() {
      this.$emit('hideHealth')
    },
    onHideHealth() {
      this.$emit('hideHealth', true)
    },
    onHealthye() {
      this.$emit('onHealthye')
    },
    onSensors(eventName, event) {
      console.log(event.target)
      this.sensors.quick('trackAllHeatMap', event.target, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.itemData.prdId,
        page_ID: this.common.getPageid(1),
      });
    },
  }
}
</script>
<style scoped>
.health-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 4;
}
.health-wrap header {
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
.health-wrap .content {
  width: 100%;
  font-size: 0.15rem;
  padding-top: 0.5rem;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(0.6rem + constant(safe-area-inset-bottom));
  padding-bottom: calc(0.6rem + env(safe-area-inset-bottom));
}
.health-wrap .content .zy {
  padding: 0.2rem 0.15rem;
  font-size: 0.14rem;
  background-color: #FFFFFCF8;
  display: flex;
  align-items: center;
}
.health-wrap .content .zy .zhongyao {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  background: #ff950b;
  font-size: 0.1rem;
  color: #fff;
  border: 2px solid #ffebd2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.health-wrap .content .zy .cont {
  margin-left: 0.05rem;
  font-size: 0.12rem;
  color: #ff8f40;
}
.health-wrap .content .content-cont {
  box-sizing: border-box;
  padding: 0 0.15rem 0.1rem;
  background: #fff;
  color: #666666;
  font-size: 0.14rem;
  /* border-bottom: 0.4rem solid #efefef; */
}
.health-wrap .content .content-cont h4 {
  margin-bottom: 0.1rem;
}
.health-wrap .content .content-cont p {
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
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
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
  background-color: #0bc37d;
  color: #fff;
  background-image: url('./img/dise.png');
  background-repeat: repeat-y;
  background-size: 100%;
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