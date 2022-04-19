<template>
  <div class="xieyi-wrap">
    <div class="xieyi-icon" @click="onSwitchCheckedFlag">
      <img v-if="checkedFlag" src="./img/icon07_y.png" alt="">
      <img v-else src="./img/icon07_n.png" alt="">
    </div>
    <div class="xieyi-content">
      我已阅读并确认
      <template v-for="(item, index) of khsArr">
        <span :key="'dibu' + item.title" @click="onClickYuqr(index)">{{item.title}}</span>
        <span class="line" :key="'line' + index" v-if="index != khsArr.length - 1"> | </span>
      </template>
    </div>
    <transition name="background">
      <div class="khs-bg" v-show="khsPopShowFlag" @click="onHideKhsPop"></div>
    </transition>
    <transition name="syr">
      <div class="khs-wrap" v-show="khsPopShowFlag">
        <div class="khs-tabs">
          <div class="khs-tab" :class="item.isActive == '1' ? 'active' : ''" v-for="(item, index) in khsArr" :key="item.title" @click="onClickKhsTab(index)">
            <div class="khs-tab-title">{{item.title}}</div>
          </div>
        </div>

        <div class="khs-content-wrap">
          <template v-for="item of khsArr">
            <div class="khs-content1" v-show="item.isActive == '1'" v-if="item.isList == '1'" :key="'khs' + item.title">
              <div class="khs-content1-item" v-for="subItem of item.content" :key="subItem.title" @click="onShowCommonContentPop(subItem)">
                <div class="left">{{subItem.title}}</div>
                <div class="right"></div>
              </div>
            </div>
            <div class="khs-content2" v-show="item.isActive == '1'" v-else-if="item.isList == '0'" :key="'khs' + item.title" v-html="item.content.content"></div>
          </template>

        </div>
        <div class="khs-btn-wrap">
          <div class="khs-btn" @click="onClickTabBtn">我已逐页阅读并同意</div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'xieyi',
  props: {
    checkedFlag: Boolean,
    khsPopShowFlag: Boolean,
    khsArr: Array,

  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    onSwitchCheckedFlag() {
      this.$emit('onSwitchCheckedFlag')
    },
    onClickYuqr(index) {
      this.$emit('onClickYuqr', index)
    },
    onHideKhsPop() {
      this.$emit('onHideKhsPop')
    },
    onClickKhsTab(index) {
      this.$emit('onClickKhsTab', index)
    },
    onShowCommonContentPop(item) {
      this.$emit('onShowCommonContentPop', item)
    },
    onClickTabBtn() {
      this.$emit('onClickTabBtn')
    },
  }
}
</script>

<style scoped>
.xieyi-wrap {
  display: flex;
  align-items: flex-start;
  padding: 0.15rem;
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

.xieyi-wrap .xieyi-content span {
  color: #509afd;
}

.xieyi-wrap .xieyi-content span.line {
  color: #f0f0f0;
}

.khs-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 997;
}

.khs-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  border-top-left-radius: 0.14rem;
  border-top-right-radius: 0.14rem;
  z-index: 997;
}

.khs-wrap .khs-tabs {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top-left-radius: 0.14rem;
  border-top-right-radius: 0.14rem;
}

.khs-wrap .khs-tabs .khs-tab {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.1rem 0;
  position: relative;
}

.khs-wrap .khs-tabs .khs-tab .khs-tab-title {
  color: #666;
  font-size: 0.15rem;
  width: 98%;
  border-right: 1px solid #d8d8d8;
  text-align: center;
  padding-bottom: 0.03rem;
  font-weight: 700;
}

.khs-wrap .khs-tabs .khs-tab.active .khs-tab-title {
  color: #ff950b;
}

.khs-wrap .khs-tabs .khs-tab:last-child .khs-tab-title {
  border-right: none;
}

.khs-wrap .khs-tabs .khs-tab.active::after {
  content: "";
  width: 0.65rem;
  height: 2px;
  border-radius: 10px;
  background-color: #ff950b;
  position: absolute;
  bottom: 0;
}

.khs-wrap .khs-content-wrap {
  height: 3rem;
  background-color: #fcfcfc;
  overflow: auto;
}

.khs-wrap .khs-content-wrap .khs-content1 {
  padding: 0 0.15rem;
}

.khs-wrap .khs-content-wrap .khs-content1 .khs-content1-item {
  padding: 0.15rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}

.khs-wrap .khs-content-wrap .khs-content1 .khs-content1-item .left {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #444;
}

.khs-wrap .khs-content-wrap .khs-content1 .khs-content1-item .right {
  width: 10px;
  height: 10px;
  border-top: 2px solid #ff7f50;
  border-right: 2px solid #ff7f50;
  transform: rotate(45deg);
}

.khs-wrap .khs-content-wrap .khs-content2 {
  padding: 0.15rem;
  color: #2a2a2a;
  font-size: 0.14rem;
  word-break: break-all;
  word-wrap: break-word;
}

.khs-wrap .khs-btn-wrap {
  height: 0.9rem;
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.khs-wrap .khs-btn-wrap .khs-btn {
  width: 3.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  color: #fff;
  font-size: 0.16rem;
  background-color: #ff7f50;
  border-radius: 5px;
}

.khs-wrap .khs-btn-wrap .khs-btn:active {
  opacity: 0.8;
}

@keyframes background-move-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes background-move-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.background-enter-active {
  animation: background-move-in 0.3s;
}

.background-leave-active {
  animation: background-move-out 0.3s;
}

@keyframes syr-move-in {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes syr-move-out {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
  }
}

.syr-enter-active {
  animation: syr-move-in 0.3s;
}

.syr-leave-active {
  animation: syr-move-out 0.3s;
}
</style>