<template>

  <div class="wrap">
    <header><a href="javascript:void(0)" class="back_icon" @click = "goBack()">返回</a></header>
    <div class="content">
      <h4 class="certificates_title">
        <span>评价{{evaluateCount}}</span>
        <em>{{proportion}}% 满意</em>
      </h4>
      <ul class="btns_ul">
        <li id="lable1" :class="lableId==1?'btns_li_active':''" @click="getListById('1')">价格实惠(<span>0</span>)</li>
        <li id="lable2" :class="lableId==2?'btns_li_active':''" @click="getListById('2')">公司靠谱(<span>0</span>)</li>
        <li id="lable3" :class="lableId==3?'btns_li_active':''" @click="getListById('3')">操作简便(<span>0</span>)</li>
        <li id="lable4" :class="lableId==4?'btns_li_active':''" @click="getListById('4')">服务好(<span>0</span>)</li>
        <li id="lable5" :class="lableId==5?'btns_li_active':''" @click="getListById('5')">保障全面(<span>0</span>)</li>
        <li id="lable6" :class="lableId==6?'btns_li_active':''" @click="getListById('6')">介绍清晰(<span>0</span>)</li>
        <li id="lable7" :class="lableId==7?'btns_li_active':''" @click="getListById('7')">客服专业(<span>0</span>)</li>
   
        <li :class="lableId==''?'btns_li_active':''" @click="getListById('')">全部</li>
      </ul>
      <ul class="btn_paixun">
					<button class="btn_paixun_active" id = "defaultPaixu" @click="paixu('defaultPaixu')">默认排序</button> | <button id = "byTimePaixu" @click="paixu('byTimePaixu')">按时间排序</button>
				</ul>
      <ul class="evaluate_ul" v-for='(item, index) in evaluateList'>
        <li>
          <span class="tel gray6_fontColor">{{item.appraiser}}</span>
          <span class="date gray9_fontColor">{{item.evaluationTime | formatDate}}</span>
          <div class="stars_f">
            <i :class="item.starClass>=1?'stars stars_active':'stars'"></i>
            <i :class="item.starClass>=2?'stars stars_active':'stars'"></i>
            <i :class="item.starClass>=3?'stars stars_active':'stars'"></i>
            <i :class="item.starClass>=4?'stars stars_active':'stars'"></i>
            <i :class="item.starClass>=5?'stars stars_active':'stars'"></i>
          </div>
        </li>
        <li class="btns_li" v-if="item.lable">
          <span v-if="item.lable&&(','+item.lable+',').indexOf(',1,')!=-1">价格实惠</span>
          <span v-if="item.lable&&(','+item.lable+',').indexOf(',2,')!=-1">公司靠谱</span>
          <span v-if="item.lable&&(','+item.lable+',').indexOf(',3,')!=-1">操作简便</span>
          <span v-if="item.lable&&(','+item.lable+',').indexOf(',4,')!=-1">服务好</span>
          <span v-if="item.lable&&(','+item.lable+',').indexOf(',5,')!=-1">保障全面</span>
          <span v-if="item.lable&&(','+item.lable+',').indexOf(',6,')!=-1">介绍清晰</span>
          <span v-if="item.lable&&(','+item.lable+',').indexOf(',7,')!=-1">客服专业</span>
        </li>
        <li v-if="item.evaluationContent" class="orange_fontColor">{{item.evaluationContent}}</li>
        <li v-if="item.replyContent">
          <span class="gray9_fontColor">阳光回复： </span>
          <span class="huifu">{{item.replyContent}}</span>
        </li>
      </ul>
      <div class="pages">
        <a :class="pageIndex==1?'':'blue_fontColor'" @click="goIndex(1)" >首页</a>
        <a :class="pageIndex==1?'':'blue_fontColor'" @click="goIndex(pageIndex-1)">上一页</a>
        <span>{{pageIndex}}/{{pageCount}}</span>
        <a :class="pageIndex==pageCount?'':'blue_fontColor'" @click="goIndex(pageIndex+1)">下一页</a>
        <a :class="pageIndex==pageCount?'':'blue_fontColor'" @click="goIndex(pageCount)">尾页</a>
      </div>
    </div>
  </div>

</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Toast } from "mint-ui";
  import Jquery from "jquery";
	export default {
		name: 'evaluate',
		data () {
			return {
        prdId: this.$route.query.prdId,
        pageSize:7,
        pageCount:1,
        lableId : '',
        pageIndex:1,
        initFlag:true,
        evaluateCount:0,
        proportion:0,
        evaluateList:[],
        queryFlag:true,
        queryWay:'defaultQuery',
			}
		},
    created() {
		  //修改页面标题
      Jquery(document).find('title').text("产品评价");
      this.pageCount = 1;
      this.lableId = '';
      this.pageIndex = 1;
      this.initFlag = true;
      this.evaluateCount = 0;
      this.proportion = 0;
      this.evaluateList = [];
      this.getList();
    },
    computed: {

    },mounted() {
      console.log('组件已经挂载到上面了。。。');
    },
    filters: {
      evaluateCountInit(con){
        if(con > 999){
          return "999+";
        }
        return con;
      },
      formatDate(time) {
        time = time.substring(0,10).replace(/\-/g, '/');
        var date = new Date(time);
        var dateStr =
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日";
        return dateStr;
      }
    },
    methods: {
		  getListById(id){
        if(id != ''){
          Jquery('.btn_paixun').hide();
         }else{
           Jquery('.btn_paixun').show();
         }
		    if(id == this.lableId){
		      return;
        }
        this.pageCount = 0;
        this.lableId = id;
        this.pageIndex = 1;
        this.evaluateList = [];
        this.getList();
      },
      goIndex(index){
		    if(index < 1 || index > this.pageCount || index == this.pageIndex){
		      return;
        }
        this.pageIndex = index;
        this.evaluateList = [];
        this.getList();

      },
      getList(){
        this.query = false;
        this.$http.post('/sunmc/productEvaluation/evaluationListByApp', {
          "prdId"   :this.prdId,
          "lableId" : this.lableId,
          "pageCount" : this.pageCount,
          "pageIndex" : this.pageIndex,
          "pageSize"  : this.pageSize,
          "initFlag"  : this.initFlag,
          "queryWay" : this.queryWay
        }).then(res => {
          this.queryFlag = true;
          if(res.status == 200){
            var data = res.data.data;
            if(this.initFlag){
              this.initFlag = false;
              this.evaluateCount = data.evaluateCount;
              this.proportion = data.proportion;
              var lableCountMap = data.lableCountMap;
              for(var i=0;i<lableCountMap.length;i++){
                var lableCount = lableCountMap[i];
                var lable_id = lableCount.lable_id;
                var con = lableCount.con;
                var txt = ""+con;
                // if(con>999){
                //   txt = '999+';
                // }
                Jquery("#lable"+lable_id+" span").text(txt);
              }
            }
            this.pageCount = data.pageCount;
            this.pageIndex = data.pageIndex;
            this.evaluateList = data.evaluateList;
            this.queryWay = data.queryWay;
          }
        }).catch((err) => {
          this.queryFlag = true;
          console.log(err);
        })
      },
      goBack(){
        window.history.back(-1);
      },
      paixu(queryWay){
        Jquery('#'+queryWay).addClass("btn_paixun_active").siblings().removeClass("btn_paixun_active");
        this.queryWay = queryWay;
        this.getList();
      }

    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  em , i {
    font-style: normal;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  img {
    border: none;
    vertical-align: middle;
  }
  table {
    border-collapse: collapse;
  }
  input,
  textarea {
    outline: none;
  }
  textarea {
    resize: none;
    overflow: auto;
  }
  body {
    font-size: 12px;
    /*	font-family: "微软雅黑";
        font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;*/
  }

  /*========移动端========*/
  a,
  img {
    -webkit-touch-callout: none;
    /* 禁止长按链接与图片弹出菜单 */
  }
  /*========移动端========*/

  /* end reset */
  /* public */

  .clear {
    zoom: 1;
  }
  .clear:after {
    content: '';
    display: block;
    clear: both;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  /* end public */

  .clear{
    display: block;
    content: "";
    clear: both;
  }

  html,body{
    background: #F4F4F4;
  }
  header{
    width: 3.75rem;
    height: 0.44rem;
    line-height: 0.44rem;
    box-sizing: border-box;
    padding-left: 0.21rem;
  }
  .back_icon{
    width: 0.2rem;
    height: 0.2rem;
    background: url(../../../static/images/ico_fh.png) no-repeat;
    background-size: 0.2rem 0.2rem;
    background-position: 0 50%;
    padding-left: 0.24rem;
    color: #1599F1;
    font-size: 0.16rem;
  }
  .content{
    width:3.55rem;
    background: #fff;
    box-shadow:0px 5px 15px 0px rgba(102,102,102,0.1);
    border-radius: 0.05rem;
    box-sizing: border-box;
    padding: 0.1rem 0.1rem 0.19rem;
    margin: 0 auto;
    color: #303030;
    font-size: 0.14rem;
  }
  .certificates_title{
    background: url(../../../static/images/ico_qtkhzx.png) no-repeat;
    background-size: 0.2rem 0.2rem;
    background-position: 0 15%;
    color: #434343;
    font-size: 0.16rem;
    box-sizing: border-box;
    padding-left: 0.25rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #EEEEEE;
    margin-bottom: 0.15rem;
  }
  .certificates_title em{
    color: #FF8400;
    font-size: 0.14rem;
    float: right;
  }
  ul li{
    padding: 0 0.05rem;
  }
  .btns_ul{
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 0.05rem;
    margin-bottom: 0.1rem;
  }
  .btns_ul li{
    font-size: 0.12rem;
    
    padding: 0.045rem 0.12rem;
    background: #fff;
    border:1px solid rgba(238,238,238,1);
    border-radius:0.2rem;
    float: left;
    margin: 0 0.1rem 0.15rem 0;
  }
  .btns_ul .btns_li_active{
    background: #FF9900;
    /*border:0.01rem solid #FF9900;*/
    box-shadow:0 0.03rem 0.09rem 0 rgba(255,222,0,0.3);
    color: #fff;
  }
  .btns_ul::after{
    display: block;
    content: "";
    clear: both;
  }
  .evaluate_ul{
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 0.05rem;
    margin-bottom: 0.2rem;
  }
  .stars_f{
    float: right;
  }
  .stars{
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    background: url(../../../static/images/ico_x4.png)no-repeat;
    background-size: 0.2rem 0.2rem;
    float: left;
  }
  .stars_active{
    background: url(../../../static/images/ico_x3.png)no-repeat;
    background-size: 0.2rem 0.2rem;
  }
  .evaluate_ul li{
    margin: 0.1rem 0;
  }
  .evaluate_ul li::after{
    display: block;
    content: "";
    clear: both;
  }
  .tel,.date{
    font-size: 0.12rem;
  }
  .btns_li span{
    float: left;
    background: #fff;
    border:0.01rem solid #FF9900;
    border-radius: 0.2rem;
    padding: 0.04rem 0.1rem;
    color: #FF9900;
    margin: 0 0.05rem 0.05rem 0;
    font-size: 0.12rem;
  }
  .gray9_fontColor{
    color: #999;
  }
  .gray6_fontColor{
    color: #666;
  }
  .orange_fontColor{
    color: #FF8400;
    word-break:break-all;
    word-wrap:break-word;
  }
  .blue_fontColor{
    color: #1599F1;
  }
  .huifu{
    font-size: 0.15rem;
    color: #303030;
    word-break:break-all;
    word-wrap:break-word;
  }
  .pages{
    text-align: center;
    padding-bottom: 0.05rem;
  }
  .pages span{
    margin-right: 0.2rem;
  }
  a{
    font-size: 0.12rem;
    color: #666666;
    margin-right: 0.2rem;
  }
  .btn_paixun{
    text-align: right;
    font-size: 0.12rem;
    color: #EEE;
  }
  .btn_paixun button{
    background: white;
    color: #666;
  }
  button{
    border: none;
    outline: none;
  }
  .btn_paixun .btn_paixun_active{
    color: #FF9900;
  }

</style>
