<template>
  <div class="slide-show-wrapper">
    <swiper :options="swiperOption" ref="mySwiper" class="banner_wrap">
      <swiper-slide v-if="videoSrc != ''">
        <div class="video_bar" id="video_bar">
          <img :src="imgSrcArr[0] ? imgSrcArr[0] : ''" class="swiper-img">
          <div v-show="showVideo" class="video-wrap">
            <video ref="video" @click="onVideoClick" @ended="onVideoEnded" :src="videoSrc" x5-playsinline="true" playsinline="true" webkit-playsinline="true" preload="auto">
            </video>
          </div>
          <img v-show="showStartBtn" @click="onStartVideo($event)" src="./img/video_btn.png" class="start_btn">
          <!-- <img v-show="showReplayBtn" @click="onStartVideo" src="./img/replay_btn.png" class="replay_btn" /> -->
        </div>
      </swiper-slide>
      <template v-if="imgSrcArr.length > 0">
        <swiper-slide v-for="(imgSrc, index) in imgSrcArr" :key="index">
          <img ref="imgFirst" :src="imgSrc" class="swiper-img" v-if="index === 0" @load="onLoadSwiperOption">
          <img :src="imgSrc" class="swiper-img" v-else>
        </swiper-slide>
      </template>

      <div v-show="showPageNum" class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!--视频/图片按钮-->
    <div class="vAndi" v-show="showBottomBtn">
      <div class="vAndiCont">
        <div class="videoBtn" :class="isActive ? 'SWactive' : ''" @click="onVideoBtnClick">
          视频
        </div>
        <div class="imgBtn" :class="!isActive ? 'SWactive' : ''" @click="onImgBtnClick">
          图片
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Jquery from 'jquery'
import { setInterval, clearInterval, setTimeout } from 'timers';
export default {
  name: 'SlideShow',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    prdImgs: Array,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            let current1 = current - 1
            let total1 = total - 1
            if (this.videoSrc) {
              return current1 + '/' + total1;
            } else {
              return current + '/' + total
            }
          }
        },
        watchOverflow: true,//因为仅有1个slide，swiper无效
        autoHeight: true, //高度随内容变化
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        on: {
          slideChangeTransitionStart: () => {
            if (this.videoSrc) {
              if (this.swiper.activeIndex == 0) {
                this.isActive = true
                this.showPageNum = false
              } else {
                this.isActive = false
                this.showPageNum = true
                this.showStartBtn = true
                this.$refs.video.pause()
              }
            }
          },
        },
      },
      showVideo: false, // 是否展示视频
      showStartBtn: true, // 是否展示播放按钮
      // showReplayBtn: false, // 是否展示重播按钮
      showBottomBtn: false, // 是否展示底部按钮组
      showPageNum: false,// 是否展示页码
      isActive: true,// true,则在视频按钮上加swactive类
      videoSrc: '',
      imgSrcArr: [],
    }
  },
  created() {
    let timer = setInterval(() => {
      if (this.prdImgs && this.prdImgs.length > 0) {
        this.prdImgs.forEach(prdImg => {
          if (prdImg.imgUrl.endsWith('.png') || prdImg.imgUrl.endsWith('.jpg')) {
            this.imgSrcArr.push(prdImg.imgUrl)
          } else if (prdImg.imgUrl.endsWith('.mp4')) {
            this.videoSrc = prdImg.imgUrl
          }
        })
        if (this.videoSrc) {
          this.showBottomBtn = true
        } else if (this.imgSrcArr.length > 1) {
          $(".swiper-pagination").show()
        } else if (this.imgSrcArr.length <= 1) {

        }
        clearInterval(timer)
      }
    }, 1000)
  },
  mounted() { },
  updated() { },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    onVideoBtnClick() {
      this.isActive = true
      this.showPageNum = false
      this.swiper.slideTo(0, 500, false);
    },
    onImgBtnClick() {
      this.isActive = false
      this.showPageNum = true
      this.showStartBtn = true
      this.swiper.slideTo(1, 500, false);
      this.$refs.video.pause();
    },
    onLoadSwiperOption() {
      this.swiperOption = {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            let current1 = current - 1
            let total1 = total - 1
            if (this.videoSrc) {
              return current1 + '/' + total1;
            } else {
              return current + '/' + total
            }
          }
        },
        watchOverflow: true,//因为仅有1个slide，swiper无效
        autoHeight: true, //高度随内容变化
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        on: {
          slideChangeTransitionStart: () => {
            console.log(this.swiper.activeIndex)
            if (this.videoSrc) {
              if (this.swiper.activeIndex == 0) {
                this.isActive = true
                this.showPageNum = false
              } else {
                this.isActive = false
                this.showPageNum = true
                this.showStartBtn = true
                this.$refs.video.pause()
              }
            }
          },
        },
      }
    },
    onVideoClick() {
      this.$refs.video.pause()
      this.showStartBtn = true
    },
    onVideoEnded() {
      this.showStartBtn = true
      this.showVideo = false
    },
    onStartVideo($event) {
      this.$emit('onVideoClick', {
        e: $event
      })
      let videoWidth = this.$refs.video.videoWidth
      let videoHeight = this.$refs.video.videoHeight
      let imgFirstWidth = this.$refs.imgFirst[0].width
      let imgFirstHeight = this.$refs.imgFirst[0].height
      // 视频在盒子中自适应
      // 视频的宽高比 > 盒子的宽高比时： 高度100%
      // 视频的宽高比 > 盒子的宽高比时： 宽度100%
      if (videoWidth / videoHeight <= imgFirstWidth / imgFirstHeight) {
        this.$refs.video.style.width = 'auto'
        this.$refs.video.style.height = '100%'
      } else if (videoWidth / videoHeight > imgFirstWidth / imgFirstHeight) {
        this.$refs.video.style.width = '100%'
        this.$refs.video.style.height = 'auto'
      }
      this.showVideo = true
      this.showStartBtn = false
      this.$refs.video.play()
    }
  }
}
</script>
<style scoped>
.slide-show-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.swiper-img {
  width: 100%;
}
.video_bar {
  width: 3.75rem;
  height: auto;
  background: #000;
  box-sizing: border-box;
  position: relative;
  text-align: center;
}
.video-wrap {
  width: 3.75rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide-show-wrapper >>> .swiper-wrapper {
  /* height: auto !important; */
}
.slide-show-wrapper >>> .swiper-pagination-custom {
  width: auto;
  left: auto;
  right: 10px;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 0.12rem;
  bottom: 0.11rem;
  height: 0.2rem;
  line-height: 0.2rem;
  border-radius: 0.1rem;
  color: #fff;
}
/*播放按钮*/
.start_btn {
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*重播按钮*/
.replay_btn {
  width: 1.25rem;
  height: 0.45rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
video {
  width: auto;
  height: 100%;
  object-fit: fill;
}
/*图片/视频切换*/

.vAndi {
  width: 1.2rem;
  height: 0.2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.11rem;
  z-index: 1;
}

.vAndiCont {
  width: 1.2rem;
  height: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vAndiCont > div {
  width: 0.45rem;
  height: 0.2rem;
  border-radius: 0.1rem;
  line-height: 0.2rem;
  background: #fff;
  color: #444444;
  font-size: 0.12rem;
  text-align: center;
  margin: 0 0.05rem;
}

.videoBtn:before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 0.07rem solid #444444;
  border-top: 0.035rem solid transparent;
  border-bottom: 0.035rem solid transparent;
}

.videoBtn.SWactive:before {
  border-left: 0.07rem solid #fff;
  border-top: 0.035rem solid transparent;
  border-bottom: 0.035rem solid transparent;
}

.videoBtn.SWactive {
  background: rgb(255, 110, 14);
  color: #fff;
}

.imgBtn.SWactive {
  background: rgb(255, 110, 14);
  color: #fff;
}
</style>