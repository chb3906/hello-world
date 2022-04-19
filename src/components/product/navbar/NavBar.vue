<template>
  <div class="navbar-wrap">
    <div class="nav-top" :class="navBarFixed ? 'navBarWrap' :''">
      <div :class="{active:navState === 0}" :style="{backgroundColor:(navState === 0 ? prdTheme : '#fff'),color:(navState === 0 ? '#fff' : '#4e4e4e')}" @click="onSwithNavState(0)">产品特色</div>
      <div :class="{active:navState === 1}" :style="{backgroundColor:(navState === 1 ? prdTheme : '#fff'),color:(navState === 1 ? '#fff' : '#4e4e4e')}" @click="onSwithNavState(1)">购买须知</div>
      <div :class="{active:navState === 2}" :style="{backgroundColor:(navState === 2 ? prdTheme : '#fff'),color:(navState === 2 ? '#fff' : '#4e4e4e')}" @click="onSwithNavState(2)">理赔说明</div>
    </div>
    <div class="nav-content" :class="navBarFixed ? 'paddingTop' : ''">
      <div class="content" id="cpts">
        <div v-for="(cptsItem, index) in cptsArray" :key="index" v-html="cptsItem.content"></div>
      </div>
      <div class="content" id="gmxz">
        <div class="content-title">购买须知</div>
        <template v-for="(detail, index) in gmxzkpArray">
          <div class="detail-wrap" :key="index">
            <div class="detail-title" v-show="detail.title != ''">{{detail.title}}</div>
            <div class="detail-content" v-html="detail.content"></div>
          </div>
        </template>
        <template v-if="gdgmxzTitleArray.length > 0">
          <!-- 更多购买须知，请查看：（文字支持配置） -->
          <div class="more-title" v-for="(detail, index) in gdgmxzTitleArray" :key="index + 'gdgmxz'" v-html="detail.content"></div>
        </template>
        <template v-else>
          <div class="more-title">更多购买须知，请查看：</div>
        </template>

        <div class="more-content" :style="{color: prdTheme}">
          <div @click="onShowGmxzDetail(detail)" v-for="(detail, index) in gdgmxzArray" :key="index + 'more'">《{{detail.title}}》</div>
          <div @click="onShowTK">《保险条款》</div>
        </div>
        <transition name="bounce">
          <div class="tk-list" v-show="showTkList">
            <div class="tk-title-wrap">
              <!-- <div class="back" @click="onBackTK">
                <img style="width:.1rem;height: .15rem;" src="../../../../static/images/fhjt.png" alt="">
              </div> -->
              <div class="tk-title">保险条款</div>
            </div>
            <div class="tk-content-wrap">
              <div class="tk-content" :style="{color: prdTheme}" @click="onShowGmxzDetail(item)" v-for="(item, index) in bxtkArray" :key="index">
                <div class="tk-content-title">《{{item.title}}》</div>
                <div class="jt-wrap"><img src="./img/icon_right.png" alt=""></div>
              </div>
            </div>
            <div class="common-close-btn" @click="onBackTK">返回</div>
          </div>
        </transition>
        <transition name="bounce">
          <div class="gmxz-detail" v-show="showGmxzDetail">
            <div class="gmxz-detail-title-wrap">
              <!-- <div class="back" @click="onBackGmxzDetail">
                <img style="width:.1rem;height: .15rem;" src="../../../../static/images/fhjt.png" alt="">
              </div> -->
              <div class="gmxz-detail-title">{{gmxzDetail.title}}</div>
            </div>
            <div class="gmxz-detail-content-wrap" v-html="gmxzDetail.content"></div>
            <div class="common-close-btn" @click="onBackGmxzDetail">返回</div>
          </div>
        </transition>
        <!-- PDF展示 开始 -->
        <transition name="bounce">
          <div class="pdf-wrap" v-show="showPDFPop">
            <iframe class="pdf-iframe" width="100%" :src="'../../../static/PDF/web/viewer.html?file=' + encodeURIComponent(pdfUrl)" frameborder="0"></iframe>
            <div class="pdf-close-btn" @click="onClosePDFPop">返回</div>
          </div>
        </transition>
        <!-- PDF展示 结束 -->
      </div>
      <div class="content" id="lpsm">
        <div class="content-title">理赔说明</div>
        <template v-for="(lpsm,i) in lpsmArray">
          <!-- <div v-if='flow.isUrlFormat'>
            点击下载<a v-if='flow.isUrlFormat == true' :href='flow.content' class="flow">{{flow.title}}</a>
          </div> -->
          <div :key='i'>
            <div class="lpsm-content-title" v-if="lpsm.title != '' && lpsm.title != null">{{lpsm.title}}</div>
            <div v-html="lpsm.content" class='detail' style="padding: 0 .15rem;"></div>
          </div>
        </template>

      </div>
    </div>
  </div>

</template>
<script>
import $ from "jquery"
import { setInterval, clearInterval, setTimeout } from 'timers';
import { truncate } from 'fs';
export default {
  name: 'NavBar',
  props: {
    insurances: Array,
    prdTheme: String,
  },
  comments: {

  },
  created() {
    let timer = setInterval(() => {
      if (this.insurances && this.insurances.length > 0) {
        this.insurances.forEach(item => {
          if (item.type == 10) {// 产品特色
            this.cptsArray.push(item)
          } else if (item.type == 14) {// 购买须知-卡片
            this.gmxzkpArray.push(item)
          } else if (item.type == 1 || item.type == 5 || item.type == 7 || item.type == 2 || item.type == 9 || item.type == 11) { // 更多购买须知中不包含保险条款
            this.gdgmxzArray.push(item)
          } else if (item.type == 3) {// 保险条款
            this.bxtkArray.push(item)
          } else if (item.type == 12) {// 理赔说明
            this.lpsmArray.push(item)
          } else if (item.type == 15) {// 更多购买须知文字
            this.gdgmxzTitleArray.push(item)
          }
        })
        clearInterval(timer)
      }
    }, 1000)
  },
  mounted() {
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)

  },
  data() {
    return {
      showPDFPop: false,
      pdfUrl: '',
      gdgmxzTitleArray: [],// 更多购买须知（文字支持配置）
      cptsArray: [],// 产品特色的数组
      gmxzkpArray: [],// 购买须知卡片数组
      gdgmxzArray: [],// 更多购买须知中不包含保险条款的数组
      bxtkArray: [],// 保险条款数组
      lpsmArray: [],// 理赔说明数组
      navBarFixed: false,// 导航栏是否页面顶部固定
      navState: 0,// 导航栏状态
      navTop: 0,// 导航栏距离顶部的高度
      showTkList: false,
      showGmxzDetail: false,
      gmxzDetail: {},
    }
  },
  filters: {
    onContentSub(content) {
      return content.substring(0, 200) + '...'
    },
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
    onShowGmxzDetail(detail) {
      if (!this.showTkList) {
        this.noScroll()
      }
      if (detail.content.indexOf('.pdf') != -1) {
        this.pdfUrl = detail.content
        this.showPDFPop = true
      } else {
        this.gmxzDetail = detail
        this.showGmxzDetail = true
      }
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
    watchScroll() {

      if (document.body.style.position != 'fixed') {
        if (!this.navBarFixed && $(".nav-top").offset()) {
          this.navTop = $(".nav-top").offset().top
        }
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(this.navTop + '      ' + scrollTop)
        scrollTop > this.navTop ? this.navBarFixed = true : this.navBarFixed = false
        let navTopHeight = this.$el.querySelector('.nav-top').offsetHeight
        if ($('#cpts').offset() && $('#gmxz').offset() && $('#lpsm').offset()) {
          let navArr = ['#cpts', '#gmxz', '#lpsm']
          let offsetTopArr = navArr.map((item) => {
            return $(item).offset().top - navTopHeight - 10
          })
          for (let i = 0; i < offsetTopArr.length; i++) {
            if (scrollTop >= 0 && scrollTop < offsetTopArr[1]) {
              this.navState = 0
            } else if (scrollTop >= offsetTopArr[i - 1] && scrollTop < offsetTopArr[i]) {
              this.navState = i - 1
            } else if (scrollTop >= offsetTopArr[offsetTopArr.length - 1]) {
              this.navState = offsetTopArr.length - 1
            }
          }
        }

      }
    },
    // 切换导航栏
    onSwithNavState(index) {
      setTimeout(() => {
        this.navState = index
      }, 500)
      this.goAnchor(index)
    },
    // 点击导航栏定位到相应的div
    goAnchor(index) {
      let navTopHeight = this.$el.querySelector('.nav-top').offsetHeight
      let navArr = ['#cpts', '#gmxz', '#lpsm']
      var anchor = this.$el.querySelector(navArr[index])
      // $(document).scrollTop(anchor.offsetTop - navTopHeight)
      $('html,body').animate({
        scrollTop: anchor.offsetTop - navTopHeight
      }, 500)
    },
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
  display: flex;
  align-items: center;
  border-bottom: #e6e6e6 solid 1px;
  font-size: 0.15rem;
  background-color: #fff;
}
.navbar-wrap .nav-top > div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #4e4e4e;
  margin: 0 0.1rem;
  border-radius: 0.15rem;
}
.navbar-wrap .nav-top > div.active {
}
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 1;
}
.paddingTop {
  padding-top: 0.6rem;
}
.navbar-wrap .nav-content {
}
.navbar-wrap .nav-content .content {
  width: 100%;
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
.lpsm-content-title {
  font-size: 0.14rem;
  color: #464646;
  height: 0.5rem;
  line-height: 0.5rem;
  box-sizing: border-box;
  padding: 0 0.15rem;
  font-weight: 700;
  text-align: center;
}
#gmxz .detail-wrap {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 10px;
}
#gmxz .detail-wrap .detail-title {
  font-size: 0.15rem;
  color: #464646;
  height: 0.5rem;
  line-height: 0.5rem;
  box-sizing: border-box;
  padding: 0 0.15rem;
  font-weight: 700;
  text-align: center;
}
#gmxz .detail-wrap .detail-content {
  line-height: 180%;
  font-size: 0.14rem;
  box-sizing: border-box;
  padding: 0 0.15rem;
  color: #464646;
}
#gmxz .detail-wrap .detail-content >>> p {
  text-indent: -1em;
  padding-left: 1em;
}
#gmxz .more-title {
  line-height: 180%;
  font-size: 0.14rem;
  box-sizing: border-box;
  padding-left: 0.15rem;
  color: #464646;
}
#gmxz .more-content {
}
#gmxz .more-content div {
  line-height: 1.8;
  box-sizing: border-box;
  padding: 0 0.15rem;
  font-size: 0.14rem;
  margin-right: 0.15rem;
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
.gmxz-detail {
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
.gmxz-detail .gmxz-detail-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #eee;
  overflow: auto;
  color: #464646;
  text-align: center;
  font-size: 0.17rem;
  color: #333333;
  line-height: 0.5rem;
}
.gmxz-detail .gmxz-detail-title-wrap .back {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
}
.gmxz-detail .gmxz-detail-title-wrap .gmxz-detail-title {
  font-weight: 700;
  height: 0.5rem;
  line-height: 0.5rem;
  max-width: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: auto;
}
.gmxz-detail .gmxz-detail-content-wrap {
  color: #363636;
  font-size: 0.15rem;
  box-sizing: border-box;
  padding: 0.15rem;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  overflow: auto;
  padding-bottom: 0.7rem;
}
.gmxz-detail .gmxz-detail-content-wrap >>> p {
  word-break: break-all;
  word-wrap: break-word;
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
/********************************** pdf展示框 结束 ********************************/
</style>