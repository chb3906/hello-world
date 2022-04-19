<template>
  <div class="navbar-wrap">
    <Scroll class="nav-top" :class="navBarFixed ? 'navBarWrap' :''" :scrollX="true" :data="[1,2,3]">
      <div class="li-wrap" ref="scroller" :style="scrollerStyle">
        <div class="li-div" v-for="(item, index) in navArr" :key="item.title" :class="{active:navState === index}" :style="{color:(navState === index ? itemData.prdTheme : '#222')}" @click="onSwithNavState(index)">{{item.title}}</div>
      </div>
    </Scroll>
    <div class="nav-content" :class="navBarFixed ? 'paddingTop' : ''">
      <template v-for="(item, index) in navArr">
        <!-- 常见问题 -->
        <template v-if="item.relationTypes.indexOf('13') != -1">
          <div class="title" :key="'title' + index">
            <div class="icon" :style="{backgroundColor: itemData.prdTheme}"></div>
            <div class="text">{{item.title}}</div>
          </div>
          <div class="content" :key="'content' + index">
            <div class="common-question-wrap" v-if="cjwtArray.length > 0">
              <div class="content">
                <div class="content-item" v-for="(cjwt, index) in defArray" :key="index">
                  <div class="question" @click="onSwitchIndex(index)">
                    <div class="left">
                      <div class="img-wrap">
                        <template v-if="cjwt.titleLogo">
                          <img :src="cjwt.titleLogo" alt="">
                        </template>
                        <template v-else>
                          <img src="./img/icon_q.png" alt="">
                        </template>
                      </div>
                      <div class="question-title" :style="{color: itemData.prdTheme}">{{cjwt.title}}</div>
                    </div>
                    <div class="right" :class="{active: (showIndexArr[index])}"></div>
                  </div>
                  <div class="answer" v-show="showIndexArr[index]">
                    <!-- <div class="img-wrap">
            <template v-if="cjwt.contentLogo">
              <img :src="cjwt.contentLogo" alt="">
            </template>
            <template v-else>
              <img src="./img/icon_a.png" alt="">
            </template>
          </div> -->
                    <div class="answer-title" v-html="cjwt.content"></div>
                  </div>
                </div>
                <div class="more-q" v-if="cjwtArray.length > 3 && showMoreQ" @click="onMoreQ">
                  <span>更多常见问题</span>
                  <img src="./img/icon_21.png" alt="" srcset="">
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="title" :key="'title' + index" v-if="item.title != '产品特色'">
            <div class="icon" :style="{backgroundColor: itemData.prdTheme}"></div>
            <div class="text">{{item.title}}</div>
          </div>
          <div class="content" :key="'content' + index">
            <template v-for="(relation, index) in item.relationArr">
              <template v-if="relation.title != ''">
                <div class="title" :key="'subTitle' + index">
                  <div class="icon" :style="{backgroundColor: itemData.prdTheme}"></div>
                  <div class="text">{{relation.title}}</div>
                </div>
                <div v-html="relation.content" :key="'subContent' + index"></div>
              </template>
              <div v-else v-html="relation.content" :key="'subContent' + index"></div>
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>

</template>
<script>
import $ from "jquery"
import { setInterval, clearInterval, setTimeout } from 'timers';
import { truncate } from 'fs';
import Scroll from '@/components/newComponents/scroll/Scroll.vue'
export default {
  name: 'NavBar',
  props: {
    itemData: Object,
  },
  comments: {

  },
  components: {
    Scroll
  },
  mounted() {
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)
  },
  data() {
    return {
      navArr: [],// 导航栏数组 16
      bxtkArr: [],// 保险条款数组 3
      gdgmxzTitleArr: [],// 更多购买须知（文字支持配置） 15
      gmxzkpArr: [],// 购买须知卡片数组 14
      gdgmxzArr: [],// 更多购买须知中不包含保险条款的数组

      navBarFixed: false,// 导航栏是否页面顶部固定
      navState: 0,// 导航栏状态
      navTop: 0,// 导航栏距离顶部的高度
      showTkList: false,
      showGmxzDetail: false,
      gmxzDetail: {},

      duration: 0,
      offsetX: 0,
      bezier: 'cubic-bezier(.17, .89, .45, 1)',

      cjwtArray: [],// 常见问题数组
      defArray: [],// 默认要展示的数组
      showIndex: 0,
      showIndexArr: [],
      showMoreQ: false,
    }
  },
  created() {
    let timer = setInterval(() => {
      if (this.itemData.insurances) {
        clearInterval(timer)
        this.itemData.insurances.forEach(item => {
          if (item.type == 13) {// 常见问题
            this.cjwtArray.push(item)
          }
        })
        this.cjwtArray.forEach((item, index) => {
          if (index === 0) {
            this.showIndexArr.push(true)
          } else {
            this.showIndexArr.push(false)
          }
        })
        if (this.cjwtArray.length > 3) {
          this.showMoreQ = true
          this.defArray = this.cjwtArray.filter((item, index) => {
            return index < 3
          })
        } else {
          this.defArray = this.cjwtArray
        }
        this.itemData.insurances.forEach(item => {
          if (item.type == 16) {// 导航栏类型
            this.navArr.push({
              title: item.title,
              relationArr: [],
              relationTypes: item.relationTypes
            })

          }
          if (item.type == 14) {// 购买须知-卡片
            this.gmxzkpArr.push(item)
          } else if (item.type == 1 || item.type == 5 || item.type == 7 || item.type == 2 || item.type == 9 || item.type == 11) { // 更多购买须知中不包含保险条款
            this.gdgmxzArr.push(item)
          } else if (item.type == 3) {// 保险条款
            this.bxtkArr.push(item)
          } else if (item.type == 15) {// 更多购买须知文字
            this.gdgmxzTitleArr.push(item)
          }
        })

        for (let i = 0; i < this.navArr.length; i++) {
          let relationTypes = this.navArr[i].relationTypes
          for (let j = 0; j < relationTypes.length; j++) {
            for (let m = 0; m < this.itemData.insurances.length; m++) {
              let insurance = this.itemData.insurances[m]
              if (insurance.type == relationTypes[j]) {
                this.navArr[i].relationArr.push(insurance)
              }
            }
          }
        }
      }
    }, 1000)
  },
  computed: {
    scrollerStyle() {
      return {
        'transform': `translate3d(${this.offsetX}px, 0 , 0)`,
        'transition-duration': `${this.duration}ms`,
        'transition-timing-function': this.bezier,
      }
    },
  },
  filters: {
    onContentSub(content) {
      return content.substring(0, 200) + '...'
    },
  },
  watch: {
    navState() {
      this.onNavMove()
    }
  },
  updated() {
    this.$nextTick(() => {
      // if (document.querySelector('.gmxz-detail-content-wrap')) {
      //   document.querySelector('.gmxz-detail-content-wrap').scrollTop = 0
      // }
    })
  },
  methods: {
    onSwitchIndex(index) {
      this.showIndexArr[index] ? this.showIndexArr[index] = false : this.showIndexArr[index] = true
      this.$forceUpdate()
    },
    onMoreQ() {
      this.defArray = this.cjwtArray
      this.showMoreQ = false
    },
    onShowGmxzDetail(detail) {
      this.gmxzDetail = detail
      if (!this.showTkList) {
        this.noScroll()
      }
      this.showGmxzDetail = true
    },
    onBackGmxzDetail() {
      if (!this.showTkList) {
        this.canScroll()
      }
      this.showGmxzDetail = false
    },
    onShowTK() {
      this.noScroll()
      this.showTkList = true
    },
    onBackTK() {
      this.canScroll()
      this.showTkList = false
    },
    onNavMove() {
      let a = $('.li-wrap').offset().left
      let b = $('.li-div')[this.navState].offsetLeft
      let c = $('.li-div')[this.navState].offsetWidth / 2
      let d = $('.nav-top')[0].offsetWidth / 2

      let e = $('.li-wrap')[0].offsetWidth
      let f = $('.nav-top')[0].offsetWidth
      if (e <= f) {
        return false
      }
      let max = e - f
      let w1 = b + a + c
      if (w1 > d) {
        let left = - (w1 - d) + a
        if (-left > max) {
          left = -max
        } else if (left > 0) {
          left = 0
        }
        // this.duration = 500
        this.offsetX = left
        this.bezier = 'cubic-bezier(.17, .89, .45, 1)'
      } else if (w1 < d) {
        let left = a + (d - w1)
        if (-left > max) {
          left = -max
        } else if (left > 0) {
          left = 0
        }
        // this.duration = 500
        this.offsetX = left
        this.bezier = 'cubic-bezier(.17, .89, .45, 1)'
      }
    },
    watchScroll() {

      if (document.body.style.position != 'fixed') {
        if (!this.navBarFixed && $(".nav-top").offset()) {
          this.navTop = $(".nav-top").offset().top
        }
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > this.navTop ? this.navBarFixed = true : this.navBarFixed = false
        let navTopHeight = this.$el.querySelector('.nav-top').offsetHeight
        let $items = $('.nav-content > .content')
        let offsetTopArrNew = []
        for (let i = 0; i < $items.length; i++) {
          offsetTopArrNew.push(($items)[i].offsetTop)
        }
        let index = 0
        for (let i = 0; i < offsetTopArrNew.length; i++) {
          if ((scrollTop + navTopHeight) <= offsetTopArrNew[i]) {
            let currentIndex = i == 0 ? 0 : i - 1
            if (currentIndex != this.navState) {
              this.navState = currentIndex
            }
            break;
          }
          if (i == offsetTopArrNew.length - 1) {
            let currentIndex = offsetTopArrNew.length - 1
            if (currentIndex != this.navState) {
              this.navState = currentIndex
            }
          }
        }

      }
    },
    // 切换导航栏
    onSwithNavState(index) {
      // this.navState = index
      this.goAnchor(index)
    },
    // 点击导航栏定位到相应的div
    goAnchor(index) {
      let navTopHeight = this.$el.querySelector('.nav-top').offsetHeight
      var anchor = $('.nav-content > .content')[index]
      // $(document).scrollTop(anchor.offsetTop - navTopHeight)
      $('html,body').animate({
        scrollTop: anchor.offsetTop - navTopHeight + 2
      }, 300)
    },

    touchScroll(ele, fartherEle) {
      //开始触碰距离手指距离屏幕顶端的位置，初始化为0
      var startDistance = 0
      //记录再次移动ul时上次ul定位的位置
      var endDistance = 0
      //手指移动的距离
      var moveDistance = 0
      //需要移动元素的高度
      var ulWidth = ele.offsetWidth
      //容器（父元素）的高度
      var barW = fartherEle.offsetWidth
      //barHide,当ele向上滑时，ul滑到底部隐藏的距离
      var barHide = ulWidth - barW
      //开始触碰ul时
      ele.addEventListener('touchstart', function (e) {
        //手指距离屏幕顶端的距离
        startDistance = e.touches[0].clientX
      })
      //手指在屏幕上滑动
      ele.addEventListener('touchmove', function (e) {
        //这是限制ul距离上下都只能是100px，后面用到
        var maxTop = 100
        //手指在ul移动的距离（endDistance）
        moveDistance = e.touches[0].clientX - startDistance + endDistance
        //限制ul定位的位置，距离父盒子顶部不能超过100
        if (moveDistance >= maxTop) {
          moveDistance = maxTop
        }
        //限制ul定位的位置，距离父盒子底部部不能超过100
        if (moveDistance <= -(barHide + maxTop)) {
          moveDistance = -(barHide + maxTop)
        }
        //移动时取消后面的过渡效果
        this.style.transition = 'none'
        //此时，ul的移动范围（定位）已经设定，可以跟随着手指的移动而移动
        this.style.left = moveDistance + 'px'
        e.stopPropagation()
        e.preventDefault()
      })
      ele.addEventListener('touchend', function (e) {
        //当移动ul距离顶部超过0时(left>0),使其ul缓动滑动到父盒子顶部
        if (moveDistance >= 0) {
          moveDistance = 0
          this.style.transition = 'left 1s'
        }
        //当移动ul距离底部超过0时(left>0),使其ul底部缓动滑动到父盒子底部
        if (moveDistance <= -barHide) {
          moveDistance = -barHide
          this.style.transition = 'left 1s'
        }
        //记录此时ul的定位位置，用于下次
        endDistance = moveDistance
        //范围限制好。可以滑动了
        this.style.left = endDistance + 'px'
      })
    }
  }

}
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
.navbar-wrap {
  width: 100%;
}
.navbar-wrap .nav-top {
  width: 100%;
  height: 0.6rem;
  border-bottom: #f0f0f0 solid 1px;
  font-size: 0.15rem;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.navbar-wrap .nav-top .li-wrap {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 0.6rem;
}
.navbar-wrap .nav-top .li-wrap .li-div {
  width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.4rem;
  color: #222;
  font-weight: 700;
  border-right: 1px solid #f0f0f0;
}
.navbar-wrap .nav-top .li-wrap .li-div:last-child {
  border-right: none;
}
.navbar-wrap .nav-top .li-div.active {
  background: url("./img/slider.png") no-repeat;
  background-size: 0.34rem 0.02rem;
  background-position: 50% 100%;
}
.navbar-wrap .nav-top.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 1;
}
.paddingTop {
  padding-top: 0.6rem;
}
.navbar-wrap .nav-content {
}
.navbar-wrap .nav-content > .content {
  width: 100%;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-bottom: 0.1rem solid #eee;
}
.navbar-wrap .nav-content .content .content-title {
  font-size: 0.17rem;
  color: #464646;
  height: 0.5rem;
  line-height: 0.5rem;
  box-sizing: border-box;
  padding: 0 0.15rem;
  font-weight: 700;
}
.navbar-wrap .nav-content .content >>> img {
  width: 100%;
}
.common-question-wrap {
}
.common-question-wrap .content {
  padding: 0 0 0 0.15rem;
}
.common-question-wrap .content .content-item {
  border-bottom: 1px solid #f0f0f0;
}
.common-question-wrap .content .content-item .question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1rem 0;
}
.common-question-wrap .content .content-item:last-child {
  border-bottom: none;
}
.common-question-wrap .content .content-item .question .left {
  display: flex;
  align-items: flex-start;
}
.common-question-wrap .content .content-item .question .left .img-wrap {
  width: 0.16rem;
  height: 0.16rem;
  margin-right: 0.05rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.common-question-wrap .content .content-item .question .left .question-title {
  font-size: 0.14rem;
  color: #464646;
  max-width: 3rem;
}
.common-question-wrap .content .content-item .question .right {
  width: 0.09rem;
  height: 0.06rem;
  background: url("./img/icon_bottom.png") no-repeat center center / 0.09rem
    0.06rem;
  margin-left: 0.1rem;
  margin-right: 0.15rem;
}
.common-question-wrap .content .content-item .question .right.active {
  background-image: url("./img/icon_top.png");
}
.common-question-wrap .content .content-item .answer {
  display: flex;
  align-items: flex-start;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-top: 0.1rem;
}
.common-question-wrap .content .content-item .answer .img-wrap {
  width: 0.19rem;
  height: 0.16rem;
  margin-right: 0.05rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.common-question-wrap .content .content-item .answer .answer-title {
  font-size: 0.14rem;
  width: 3rem;
  text-align: justify;
  font-size: 0.14rem;
  color: #999;
}
.common-question-wrap .content .more-q {
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.14rem;
  text-align: center;
  color: #509afd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.common-question-wrap .content .more-q img {
  width: 0.065rem;
  height: 0.12rem;
  margin-left: 0.1rem;
}
.nav-content .title {
  font-size: 0.17rem;
  color: #464646;
  height: 0.52rem;
  line-height: 0.52rem;
  box-sizing: border-box;
  padding: 0 0.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.nav-content .title .icon {
  width: 0.1rem;
  height: 0.1rem;
  margin-right: 0.1rem;
}
.nav-content .title .text {
}
</style>