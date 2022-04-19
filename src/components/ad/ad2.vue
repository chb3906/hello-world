<template>
  <!-- 左右排列形式的广告 -->
  <div class="ad-wrap" v-if="adList.length">
    <div class="ad-item" v-for="item of adList" :key="item.code" @click="onClickAdItem(item)">
      <img :src="item.image" alt="">
    </div>

    <div class="pop-wrap" v-show="showDetail" @click="showDetail = false">
      <div class="pop" v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    adList: Array,
    seat: String,
  },
  data() {
    return {
      content: '',
      showDetail: false,
      funArr: [, this.onHandleType1, this.onHandleType2, this.onHandleType3],
    }
  },
  methods: {
    onClickAdItem(item) {
      this.funArr[item.type](item)
    },
    // 静态展示 点击图片处理方法
    onHandleType1() {
      return false
    },
    // 弹框展示 点击图片处理方法
    onHandleType2(item) {
      this.content = item.content
      this.showDetail = true
    },
    // 跳转链接 点击图片处理方法
    onHandleType3(item) {
      window.location.href = item.previewImg
      setTimeout(function () {
        window.location.reload()
      }, 100)
    },
  },

}
</script>

<style scoped>
.ad-wrap {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: #ffffff;
}
.ad-wrap .ad-item {
  margin: 0.15rem 0;
  width: 1.7rem;
  height: 1.7rem;
}
.ad-wrap .ad-item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.pop-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.pop-wrap .pop {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.3rem;
  background: #ffffff;
  text-align: center;
  border-radius: 10px;
  max-height: 90%;
  overflow: auto;
}
.pop-wrap .pop >>> img {
  width: 100%;
  border-radius: 10px;
}
</style>