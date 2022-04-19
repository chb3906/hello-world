<template>
    <div v-show="showAlertBox">
      <div class="blackBg"></div>
      <div class="alertbox">
        <h3>{{tiaokuan.title}} <a href="javascript:void(0);" class="closeBtn" @click="closeBtn"></a></h3>
        <div class="tbxz_text" v-html="tiaokuan.content"></div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "AlertBox",
      props: {
        tiaokuan:Object,// 条款字段，包含标题title和内容content
        showAlertBox:Boolean,// 是否展示弹框字段
      },
      methods: {
        // 关闭弹框
        closeBtn() {
          this.$emit('closeAlertBox')
        }
      }
    }
</script>

<style scoped>
  .blackBg {
    filter: alpha(opacity=50);
    opacity: 0.5;
    overflow: hidden;
    background-color: #000;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 998;
  }
  .alertbox {
    width: 900px;
    background: #fff;
    border-radius: 2px;
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    margin-left: -450px;
  }
  .tbxz_text {
    height: 400px;
    padding: 20px;
    overflow-y: auto;
  }
  .alertbox h3 {
    background: #F4F4F4;
    height: 40px;
    font-size: 18px;
    color: #FF8A00;
    font-weight: 700;
    text-align: center;
    line-height: 40px;
    border-radius: 2px 2px 0 0;
  }
  .alertbox h3 .closeBtn {
    display: block;
    width: 17px;
    height: 17px;
    background: url(../../../assets/proToubaoxinxiPC/gb1.png) no-repeat;
    position: absolute;
    top: 12px;
    right: 14px;
  }
</style>
