<template>
  <div class="unPayErr">
    <img src="../../assets/unPayErr.png" alt="">
    <div class="title1">订单超时已关闭</div>
    <div class="title2">请联系您的专属服务顾问重新投保</div>
  </div>
</template>

<script>
export default {
  name: 'UnPayErr',
  components: {
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
  },


}
</script>

<style scoped>
.unPayErr {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}
.unPayErr > img {
  width: 1.5rem;
  height: 1.125rem;
}
.unPayErr .title1 {
  font-size: 0.16rem;
  font-weight: 600;
}
.unPayErr .title2 {
  font-size: 0.12rem;
  color: #666;
}
</style>