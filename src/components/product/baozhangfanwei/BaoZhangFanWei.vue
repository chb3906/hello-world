<template>
  <div class="bzfw-wrap">
    <div class="top-wrap">
      <div class="top-title">保障范围</div>
      <div class="top-more" @click="onShowDetail" :style="{color: prdTheme}">查看保障</div>
    </div>
    <div class='bzfw-title' v-if="prdStyles.length > 1">
      <div class="title-item" @click="onTitle(prdStyle,index)" v-show="prdStyle.isShow" v-for="(prdStyle,index) in prdStyles" :class='{active:prdDutysIndex==index}' :style="{backgroundColor: (prdDutysIndex==index ? prdTheme: '#efefef'),color: (prdDutysIndex == index ? '#fff' : '#000')}" :key='index'>
        <div class="title-item-top">
          <template v-if="common.checkMsgNull(discountData.discount)">
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk2">
                <div class="top">￥{{initPriceArr[index].discountPrice}}<span>/人起</span></div>
                <div class="bottom line">￥{{initPriceArr[index].price}}<span>/人起</span></div>
              </div>
            </template>
            <template v-else>
              <div class="qk2">
                <div class="top">￥{{initPriceArr[index].discountPrice}}</div>
                <div class="bottom line">￥{{initPriceArr[index].price}}</div>
              </div>
            </template>
          </template>
          <template v-else-if="common.checkMsgNull(discountData.firstPremium)">
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk2">
                <div class="top">首月￥{{initPriceArr[index].firstMonthPrice}}</div>
                <div class="bottom">次月￥{{initPriceArr[index].otherMonthPrice}}/月/人起</div>
              </div>
            </template>
            <template v-else>
              <div class="qk2">
                <div class="top">首月￥{{initPriceArr[index].firstMonthPrice}}</div>
                <div class="bottom">次月￥{{initPriceArr[index].otherMonthPrice}}/月</div>
              </div>
            </template>
          </template>
          <template v-else-if="common.checkMsgNull(discountData.isMonthPay)">
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk1">￥{{initPriceArr[index].averageMonthPrice}}<span>/月/人起</span></div>
            </template>
            <template v-else>
              <div class="qk1">￥{{initPriceArr[index].averageMonthPrice}}<span>/月</span></div>
            </template>
          </template>
          <template v-else>
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk1">￥{{initPriceArr[index].price}}<span>/人起</span></div>
            </template>
            <template v-else>
              <div class="qk1">￥{{initPriceArr[index].price}}</div>
            </template>
          </template>
        </div>
        <div class="title-item-bottom">{{prdStyle.styleName}}</div>
      </div>
    </div>
    <div class="content">
      <div class="content-item" v-for="(item,index) in prdDutylist" :key="index" v-show="item.name != ''">
        <span v-html="item.name"></span>
        <span class="remark">{{item.remark}}</span>
      </div>
    </div>
    <transition name="bounce">
      <div class="detail" v-show="showDetail">
        <div class="detail-top">
          <!-- <div class="back" @click="onBack">
            <img style="width:.1rem;" src="../../../../static/images/fhjt.png" alt="">
          </div> -->
          <div class="detail-top-title">保障详情</div>
        </div>
        <div class='detail-title' v-if="prdStyles.length > 1">
          <div class="detail-title-item" @click="onDetailTitle(prdStyle,index)" v-show="prdStyle.isShow" v-for="(prdStyle,index) in prdStyles" :style="{backgroundColor: (prdDutysIndex==index ? prdTheme : '#fff' ), color: (prdDutysIndex==index ? '#fff' : prdTheme), border: '1px solid '}" :key='index'>
            {{prdStyle.styleName}}
          </div>
        </div>
        <div class="detail-content-wrap" :style="{paddingTop: (prdStyles.length <= 1 ? '0.5rem' : '1.1rem')}">
          <div class="detail-content" v-for="(item,index) in prdDutylist" :key="index" :class="item.name != ''? 'detail-content-border-top':''">
            <div class="detail-content-item" v-show="item.name != ''">
              <!-- <span>{{item.name}}</span> -->
              <span v-html="item.name"></span>
              <span class="remark">{{item.remark}}</span>
            </div>
            <div class="detail-content-value" v-html="item.value"></div>
          </div>
        </div>
        <div class="common-close-btn" @click="onBack">返回</div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'BaoZhangFanWei',
  props: {
    prdStyles: Array,
    prdDutylist: Array,
    initPriceArr: Array,
    prdTheme: String,
    prdName: String,
    styleList: Array,
    itemData: Object,
    discountData: Object,
    prdDutysIndex: Number,
  },
  data() {
    return {
      showDetail: false,
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    onTitle(prdStyle, index) {
      this.$emit('onSwitchPrdDutylist', {
        index: index
      })
    },
    onDetailTitle(prdStyle, index) {
      this.$emit('onSwitchPrdDutylist', {
        index: index
      })
    },
    onShowDetail() {
      this.showDetail = true
      this.noScroll()
    },
    onBack() {
      this.showDetail = false
      this.canScroll()
    }
  },
  filters: {
  },

}
</script>
<style scoped>
.bzfw-wrap {
  width: 100%;
  background-color: #efefef;
  border-bottom: 0.1rem solid #efefef;
}
.bzfw-wrap .top {
  font-size: 0.17rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
}
.bzfw-wrap .top-wrap {
  font-size: 0.17rem;
  color: #464646;
  height: 0.5rem;
  line-height: 0.5rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.2rem 0.15rem 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: #fff;
  font-weight: 700;
}
.bzfw-wrap .top-wrap .top-more {
  color: #0bc37d;
  font-size: 0.14rem;
}
.bzfw-wrap .bzfw-title {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  color: rgb(51, 51, 51);
  background-color: #fff;
  padding: 0.1rem 0;
}
.bzfw-wrap .bzfw-title .title-item {
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 0.1rem 0.1rem;
  padding: 0.1rem 0;
  min-height: 0.8rem;
  text-align: center;
  border-radius: 0.05rem;
  font-size: 0.15rem;
  background-color: #fff;
}
.bzfw-wrap .bzfw-title .title-item.active {
  color: #fff;
}
.bzfw-wrap .content {
  background-color: #fff;
  padding-bottom: 0.2rem;
}
.bzfw-wrap .bzfw-title .title-item .title-item-top {
  font-size: 0.18rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.title-item-top .qk2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.16rem;
}
.title-item-top .qk2 .bottom {
  font-size: 0.12rem;
}
.title-item-top .qk2 .bottom.line {
  text-decoration: line-through;
}
.bzfw-wrap .bzfw-title .title-item .title-item-bottom {
  font-size: 0.13rem;
}

.bzfw-wrap .content .content-item {
  display: flex;
  justify-content: space-between;
  color: rgb(51, 51, 51);
  font-size: 0.15rem;
  padding: 0.05rem 0.15rem 0;
  cursor: pointer;
}
.bzfw-wrap .content .content-item span {
  font-size: 0.15rem;
}
.bzfw-wrap .content .content-item span.remark {
  text-align: right;
}
.bzfw-wrap .detail {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 2;
}
.bzfw-wrap .detail .detail-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  border-bottom: 1px solid #eee;
  color: #464646;
  background-color: #fff;
  z-index: 1;
  text-align: center;
}
.bzfw-wrap .detail .detail-top .back {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
}
.bzfw-wrap .detail .detail-top .detail-top-title {
  font-weight: 700;
  height: 0.5rem;
  line-height: 0.5rem;
  max-width: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: auto;
  font-size: 0.17rem;
}

.bzfw-wrap .detail .detail-title {
  position: absolute;
  top: 0.5rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: rgb(51, 51, 51);
  background-color: #fff;
  height: 0.6rem;
  z-index: 1;
}
.bzfw-wrap .detail .detail-title .detail-title-item {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 0.1rem;
  height: 0.4rem;
  line-height: 0.18rem;
  text-align: center;
  border-radius: 0.025rem;
  font-size: 0.15rem;
  background-color: #fff;
}
.bzfw-wrap .detail-content-wrap {
  padding-top: 1.1rem;
  overflow: auto;
  height: 100%;
  padding-bottom: calc(0.7rem + constant(safe-area-inset-bottom));
  padding-bottom: calc(0.7rem + env(safe-area-inset-bottom));
  -webkit-overflow-scrolling: touch;
}
.bzfw-wrap .detail .detail-content {
  background-color: #fff;
  padding-bottom: 0.15rem;
  /* border-bottom: 0.1rem solid #eeeeee; */
}
.bzfw-wrap .detail .detail-content.detail-content-border-top {
  border-top: 0.1rem solid #eeeeee;
}
.bzfw-wrap .detail .detail-content:first-child {
  border-top: none;
}
.bzfw-wrap .detail .detail-content .detail-content-item {
  display: flex;
  justify-content: space-between;
  color: rgb(51, 51, 51);
  font-size: 0.15rem;
  padding: 0.05rem 0.3rem;
  cursor: pointer;
  font-weight: 700;
}
.bzfw-wrap .detail .detail-content .detail-content-item span {
  font-size: 0.15rem;
}
.bzfw-wrap .detail .detail-content .detail-content-item span.remark {
  text-align: right;
}
.bzfw-wrap .detail .detail-content .detail-content-value {
  font-size: 0.14rem;
  color: #656565;
  padding: 0 0.3rem;
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
sub {
  font-size: 0.14rem;
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