<template>
  <div class="common-question-wrap" v-if="cjwtArray.length > 0">
    <div class="title">常见问题</div>
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
            <div class="question-title">{{cjwt.title}}</div>
          </div>
          <div class="right" :class="{active: (showIndexArr[index])}"></div>
        </div>
        <div class="answer" v-show="showIndexArr[index]">
          <div class="img-wrap">
            <template v-if="cjwt.contentLogo">
              <img :src="cjwt.contentLogo" alt="">
            </template>
            <template v-else>
              <img src="./img/icon_a.png" alt="">
            </template>
          </div>
          <div class="answer-title" v-html="cjwt.content"></div>
        </div>
      </div>
      <div class="more-q" v-if="cjwtArray.length > 3 && showMoreQ" @click="onMoreQ">更多常见问题></div>
    </div>
  </div>

</template>
<script>
import $ from 'jquery'
export default {
  name: 'CommonQuestion',
  props: {
    insurances: Array
  },
  created() {
    let timer = setInterval(() => {
      if (this.insurances && this.insurances.length > 0) {
        this.insurances.forEach(item => {
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
        clearInterval(timer)
      }
    }, 1000)
  },
  mounted() {
  },
  data() {
    return {
      cjwtArray: [],// 常见问题数组
      defArray: [],// 默认要展示的数组
      showIndex: 0,
      showIndexArr: [],
      showMoreQ: false,
    }
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
  }
}
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
.common-question-wrap {
}
.common-question-wrap .title {
  font-size: 0.17rem;
  color: #464646;
  height: 0.725rem;
  line-height: 0.725rem;
  box-sizing: border-box;
  padding: 0 0.15rem;
  font-weight: 700;
}
.common-question-wrap .content {
  padding: 0 0.15rem 0.15rem 0.15rem;
}
.common-question-wrap .content .content-item {
  border-bottom: 1px solid #eee;
}
.common-question-wrap .content .content-item .question {
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.common-question-wrap .content .content-item .question .left {
  display: flex;
  align-items: flex-start;
}
.common-question-wrap .content .content-item .question .left .img-wrap {
  width: 0.19rem;
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
}
.common-question-wrap .content .content-item .question .right.active {
  background-image: url("./img/icon_top.png");
}
.common-question-wrap .content .content-item .answer {
  display: flex;
  align-items: flex-start;
  padding-bottom: 0.2rem;
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
  color: #464646;
  width: 3rem;
  text-align: justify;
}
.common-question-wrap .content .more-q {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.14rem;
  text-align: center;
  color: #464646;
}
</style>