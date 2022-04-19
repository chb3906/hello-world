<template>
  <div class="gotop-wrap" v-show="showGoTop" @click="onClickGoTop">
    <img src="./img/top.png" alt="">
  </div>

</template>
<script>
import $ from 'jquery'
export default {
  name: 'GoTop',
  data() {
    return {
      showGoTop: false
    }
  },
  created() { },
  mounted() {
    // 事件监听滚动条
    window.addEventListener('scroll', this.onShowGoTop)
  },
  methods: {
    onShowGoTop() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        this.showGoTop = true
      } else {
        this.showGoTop = false
      }
    },
    onClickGoTop() {
      $('html,body').animate({
        scrollTop: 0
      },500)
    }
  }

}
</script>
<style scoped>
.gotop-wrap {
  width: 0.38rem;
  height: 0.38rem;
  position: fixed;
  bottom: 1.25rem;
  right: 0.3rem;
  border-radius: 50%;
  background: #fff;
  z-index: 1;
}
.gotop-wrap img {
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
}
</style>