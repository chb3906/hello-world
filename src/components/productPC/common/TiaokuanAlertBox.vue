<template>
    <div v-show="showTiaokuanAlertBox">
      <div class="blackBg"></div>
      <div class="alertbox">
        <h3>告知内容<a href="javascript:void(0);" class="closeBtn" @click="closeBtn"></a></h3>
        <div class="nav">
          <a href="javascript:void(0);" v-for="(item,index) in pagedata.insurances" :key="'item' + index" :class="{active:status==(index+1)}" @click="gotoTiaokuan(index+1)" v-if="(item.type == 1 || item.type == 3 || item.type == 5  || item.type == 7) && item.title != '行业分类表'">{{ item.title }}</a>
        </div>
        <div class="content">
          <div v-for="(item,index) in pagedata.insurances" :key="index" v-if="(item.type == 1 || item.type == 3 || item.type == 5  || item.type == 7) && item.title != '行业分类表'">
            <div :id="'tiaokuan' + (index+1)"></div>
            <div v-html="item.content"></div>
          </div>
        </div>
        <div class="btn">
          <div @click="closeBtn">确 认</div>
        </div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "TiaokuanAlertBox",
    props:{
		  showTiaokuanAlertBox:Boolean,
      pagedata:{},
    },
    data() {
		  return {
		    status:1
      }
    },
    methods: {
      // 关闭弹框
      closeBtn() {
        this.$emit('closeTiaokuanAlertBox')
      },
      gotoTiaokuan(num){
        this.status = num
        this.goAnchor(num)
      },
      // 点击导航栏定位到相应的div
      goAnchor(num) {
        var selector = '#tiaokuan' + num
        var anchor = this.$el.querySelector(selector)
        var content = this.$el.querySelector('.content')
        content.scrollTop = anchor.offsetTop-110
      },
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
    width: 700px;
    background: #fff;
    border-radius: 2px;
    position: fixed;
    z-index: 999;
    top: 10%;
    left: 50%;
    margin-left: -350px;
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
  .alertbox .nav {
    width: 640px;
    height: 60px;
    margin: auto;
    border-bottom: 1px solid #E2E2E2;
    line-height: 60px;
  }

  .alertbox .nav a {
    display: inline-block;
    font-size: 16px;
    color: #666666;
    margin-right: 10px;
  }
  .alertbox .nav a.active {
    color: #FF8A00;
  }
  .alertbox .content {
    width: 640px;
    height: 320px;
    overflow-y: auto;
    margin: 10px auto;
    padding: 10px;
  }
  .alertbox .btn {
    width: 100%;
    height: 100px;
    position: relative;

  }
  .alertbox .btn div{
    width: 160px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    background-color: #FFA200;
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left: -80px;
    cursor: pointer;

  }

</style>
