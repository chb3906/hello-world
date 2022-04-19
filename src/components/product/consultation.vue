<template>
  <div class="body">
    <!-- 定位组件 -->
    <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no"
        src="https://apis.map.qq.com/tools/geolocation?key=GZDBZ-2WS36-NYWS5-MBDUV-4AEIZ-FVF5O&referer=myapp">
    </iframe>
    <div class="wrap">
      <div class="mod">
				<div class="sousuo">
					<span class="sousuo_span">
						<div class="search" id="searchText" contenteditable="true" data-text="搜索其他客户的咨询，请输入关键字" @blur="searchask"></div>
						<div class="icon_wrong_f" id="clear" @click="clearSelection"><em class="icon_wrong"></em></div>
					</span>
					<img id="search" src="../../../static/images/ico_ss.png" @click="requestinterface(1)"/>
				</div>
      </div>
      <div class="mod1" style="display:none">
				<div class="jieg">
					<span>没有您要搜索的咨询，请更换关键词或</span>
					<a href="javascript:void(0)" class="quxiao" @click="clearsearch">取消搜索</a>
				</div>
			</div>
      <div class="mod2">
        <h4 class="title_h4">其他客户咨询</h4>
        <div id="content_text">
          <ul class="mod_s" v-for="(item, index) in dataList" :key="index">
            <li>
              <span class="tel">{{item.phone}}</span>
              <time>{{item.date | formatDate}}</time>
            </li>
            <li>
              <p class="color_orange">问：{{item.wenti}}</p>
            </li>
            <li>
              <div class="ql-container ql-snow">
                <div class="ql-editor">
                  <p class="color_black" v-html="'答：'+item.result"></p>
                </div>
            </div>
              <!-- <p class="color_black">答：{{item.result}}</p> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="fy">
        <span :class="currentPage ==1 ? 'home_page not_page':'home_page'" @click="goPage('s')">首页</span>
        <span :class="currentPage ==1 ? 'previous_page not_page':'previous_page'" @click="goPage(-1)">上一页</span>
        <span class="page_number">
          <em>{{currentPage}}</em> /
          <i>{{totalPage}}</i>
        </span>
        <span :class="currentPage ==totalPage ? 'next_page not_page':'next_page'" @click="goPage(1)">下一页</span>
        <span :class="currentPage ==totalPage ? 'last_page not_page':'last_page'" @click="goPage('w')">尾页</span>
      </div>
      <p
        class="p_ts"
      >*本页面仅是对用户特定问题的针对性通俗回答，具体保险产品的完整保障范围、责任免除规定等请以保险条款为准，请您购买保险产品前务必仔细阅读和了解保险产品条款，感谢关注！</p>
      <footer>
        <span class="black" @click="black">返回</span>
        <span class="consultation" @click="ask">我要咨询</span>
      </footer>

      <!-- 信息提示 3S消失 -->
      <div class="message-tip" style="display:none;"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Productconsultation",
  props: [],
  data() {
    return {
      openid: this.$route.query.openid, //openid
      //openid: "", //测试用,联调时传openid
      channelCode: this.$route.query.channelCode, //渠道code
      //channelCode: "",
      productid: this.$route.query.id, //产品ID码
      orgCode: this.$route.query.orgCode, //渠道编码
      askcontent:"",
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 7, // 每页显示数量
      dataList: [],
      insuredprovince:this.$route.query.insuredprovince,//投保省份
      insuredcity:this.$route.query.insuredcity//投保城市
    };
  },
  watch:{
    dataList: function() {
      var that = this;
      this.$nextTick(function(){
        if(that.dataList != null&&that.dataList.length > 0){
          var askcontent = $('#searchText').text().trim();
          if(askcontent==''){
            return;
          }
          var regExp = new RegExp(askcontent, 'g');
          $('#content_text p').each(function() {
              var html = $(this).html();
              var newHtml = html.replace(regExp, '<span class="highlight">' +  askcontent + '</span>');
              $(this).html(newHtml);
          });
        }
        /*现在数据已经渲染完毕*/
      })
    }
  },
  created() {
    //隐藏微信操作菜单
    function onBridgeReady() {
      WeixinJSBridge.call("hideOptionMenu");
    }
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
     this.mapTX();
  },
  mounted() {
    this.requestinterface();
    var  openid = this.openid;
    if(openid && openid!=''){
          sessionStorage.setItem("openid",openid);
    }
    var channelCode = this.channelCode;
    if(channelCode && channelCode!=''){
        sessionStorage.setItem("channelCode",channelCode);
    }
   var  productid = this.productid;
   if(productid && productid!=''){
        sessionStorage.setItem("productid",productid);
    }
    // sessionStorage.setItem(
    //   "openid",
    //   this.openid == "" ? sessionStorage.getItem("openid") : this.openid
    // );
    // sessionStorage.setItem(
    //   "channelCode",
    //   this.channelCode == ""
    //     ? sessionStorage.getItem("channelCode")
    //     : this.channelCode
    // );
    // sessionStorage.setItem(
    //   "productid",
    //   this.productid == ""
    //     ? sessionStorage.getItem("productid")
    //     : this.productid
    // );
    var province = this.insuredprovince;
    var city = this.insuredcity;
    if(province && province!=""){
        sessionStorage.setItem("insuredprovince",province);
    }
    if(city && city!=""){
        sessionStorage.setItem("insuredcity",city);
    }
  },
  methods: {
    clearsearch(){
          $(".search").text("");
          this.requestinterface(1);
          $(".mod1").css("display","none");
          $('.mod2').show();
          $('.fy').show();
    },
    //错误提示方法
    errorTip(text) {
      $(".message-tip")
        .html(text)
        .show();
      setTimeout(function() {
        $(".message-tip")
          .html("")
          .hide();
      }, 3000);
    },
    //点击"我要咨询"
    ask() {
      //跳转到咨询页
      // sessionStorage.setItem("openid", this.openid);
      // sessionStorage.setItem("channelCode", this.channelCode);
      // sessionStorage.setItem("productid", this.productid);
      // sessionStorage.setItem("orgCode", this.orgCode);
      this.$router.push({
        path: "/Product/consultationAsk"
      });
    },
    goPage(val) {
      var index = this.currentPage;

      if (val == "s") {
        index = 1;
      } else if (val == "w") {
        index = this.totalPage;
      } else {
        index += val;
      }
      if(index < 1 || index > this.totalPage || index == this.currentPage){
        return;
      }
      //调用后台接口
      this.currentPage = index;
      this.requestinterface();
      //屏幕置顶
      window.scroll(0, 0);
    },
    requestinterface(status) {
      this.askcontent = $('#searchText').text().trim();
      if(status==1){
          this.currentPage=1;
      }
      this.dataList = [];
      let request;
      request = this.$http.post(
        "/sunmc/consultationserver/getConsultationServerPage",
        { pageCurrent: this.currentPage, pageSize: this.pageSize,askcontent: this.askcontent}
      );
      request.then(
        data => {
          this.currentPage = data.data.current;
          this.pageSize = data.data.size;
          this.totalPage = data.data.pages;
          let list = data.data.records;
          if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
              this.dataList.push({
                phone: list[i].phone,
                date: list[i].asktime,
                wenti: list[i].askcontent,
                result: list[i].answercontent
              });
            }
            $(".mod1").css("display","none");
            $('.mod2').show();
            $('.fy').show();
            // if(this.askcontent!=""){
            //   var that =this;
            //   setTimeout(function() {
            //     that.hightshow();
            //   }, 500);       
            // }
          } else {
             this.errorTip("暂无数据");
             $(".mod1").css("display","block");
             $('.mod2').hide();
             $('.fy').hide();
             return;
          }
          
        },
        res => {
          this.errorTip("网络异常,请稍后重试");
          $(".fy").hide();
        }
      );
    },
    black() {
      this.$router.go(-1);
    },
    //搜索框搜索
    searchask(){
         $(".search").on("focus",function(){
          if($(".search").text() == ''){
            $(".icon_wrong_f").show();
          }
        });
        $(".search").on("blur",function(){
          if($(".search").text() == ''){
            $(".icon_wrong_f").hide();
          }else{
            $(".icon_wrong_f").show();
          }
        });
        $(".icon_wrong").on("click",function(){
          $(".search").text("");
          $(".icon_wrong_f").hide();
        });
        var askcontent = $('#searchText').text().trim();
        if(askcontent==''){
          return;
        }
        var askcontent = askcontent.replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?\？\=\+\.\。\,]/g, '');// 去掉特殊字符
        $('#searchText').text(askcontent);
    },
    // 搜索高亮
    // hightshow(){
    //       this.clearSelection();
    //       var searchText = $('#searchText').text().trim();
    //       var regExp = new RegExp(searchText, 'g');
    //       //遍历段落
    //       $('#content_text p').each(function() {
    //           var html = $(this).html();
    //           var newHtml = html.replace(regExp, '<span class="highlight">' + searchText + '</span>');
    //           $(this).html(newHtml);
    //       });
    //       $(".mod1").css("display","none");
    //       $('.mod2').show();
    //       $('.fy').show();
    //     },
        //搜索关键词关闭
        clearSelection() {
                $('#content_text p').each(function() {
                    $(this).find('.highlight').each(function() {
                        $(this).replaceWith($(this).html());
                    });
                });
               this.requestinterface();
        },
    mapTX() {
       var that =this;
      window.addEventListener('message', function(event) {
          // 接收位置信息
          var loc = event.data;
          console.log('location', loc);
           if(loc  && loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
                //  alert(loc.lat);
                //  alert(loc.lng);
                sessionStorage.setItem("lat",loc.lat);
                sessionStorage.setItem("lng",loc.lng);
                sessionStorage.setItem("wxprovince",loc.province);
                sessionStorage.setItem("wxcity",loc.city);
            }
      }, false);
    }
  },
  filters: {
    formatDate(time) {
      time = time.substring(0,10).replace(/\-/g, '/');
      var date = new Date(time);
      var dateStr =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate()+"日";
      return dateStr;
    }
  }
};
</script>

<style scoped>
@charset "utf-8";
.body {
  background: #f4f4f4;
  font-size: 0.14rem;
  color: #999999;
  height: 100%;
}
/* reset */

* {
  margin: 0;
  padding: 0;
}
em,
i {
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
  vertical-align: top;
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
  content: "";
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

.clear {
  display: block;
  content: "";
  clear: both;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  background: #f4f4f4;
  font-size: 0.14rem;
  color: #999999;
}
.wrap {
  width: 3.75rem;
  padding-top: 0.1rem;
}
.mod {
  width: 3.5rem;
  box-sizing: border-box;
  padding: 0.15rem;
  margin: 0 auto 0.1rem;
  background: #fff;
  border-radius: 0.05rem;
}
.mod1 {
  width: 3.5rem;
  box-sizing: border-box;
  padding: 0.15rem;
  margin: 0 auto 0.1rem;
  background: #fff;
  border-radius: 0.05rem;
}
.mod2 {
  width: 3.5rem;
  box-sizing: border-box;
  padding: 0.15rem;
  margin: 0 auto 0.1rem;
  background: #fff;
  border-radius: 0.05rem;
}
.sousuo img {
  display: block;
  width: 0.3rem;
  height: 0.2rem;
  border-left: 1px solid #f4f4f4;
  padding-left: 0.1rem;
}
.sousuo {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-flex: 1;
}
.sousuo_span {
  display: block;
  width: 2.85rem;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-flex: 1;
}
.sousuo_span .icon_wrong_f {
  display: none;
}
.sousuo_span .search {
  width: 2.6rem;
  min-height: 0.1rem;
  outline: 0;
  border: 1px solid #fff;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;
}
.icon_wrong {
  display: block;
  width: 0.2rem;
  height: 0.2rem;
  background: url(../../../static/images/ico_sc.png) no-repeat;
  background-size: 0.2rem 0.2rem;
  background-position: 100% 50%;
}
[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
  color: #999999;
}
.title_h4 {
  color: #303030;
  font-size: 0.16rem;
  background: url(../../../static/images/ico_qtkhzx.png) no-repeat;
  background-size: 0.2rem 0.2rem;
  background-repeat: 0 50%;
  padding-left: 0.3rem;
  margin-bottom: 0.13rem;
}
.mod_s {
  border-top: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 0.2rem 0.05rem 0;
}
.mod_s li {
  margin-bottom: 0.1rem;
}
.mod_s li .tel {
  color: #666666;
  margin-right: 0.11rem;
}
.color_orange {
  color: #ff8400;
}
.color_black {
  color: #303030;
  word-break:break-all;
  word-wrap:break-word;
}
.fy {
  text-align: center;
  margin: 0.2rem auto;
  font-size: 0.12rem;
}
.previous_page {
  margin: 0 0.15rem;
  color: #1599f1;
}
.page_number {
  margin-right: 0.15rem;
}
.home_page{
  color: #1599f1;
}
.next_page {
  margin-right: 0.15rem;
  color: #1599f1;
}
.last_page {
  color: #1599f1;
}
.p_ts {
  width: 3.25rem;
  margin: 0 auto;
  font-size: 0.12rem;
  padding-bottom: 0.7rem;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 3.75rem;
  height: 0.56rem;
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(102, 102, 102, 0.3);
}
footer .black {
  display: inline-block;
  height: 0.3rem;
  font-size: 0.16rem;
  color: #1599f1;
  padding-right: 0.2rem;
  line-height: 0.3rem;
  margin: 0.13rem 0.2rem 0 0.25rem;
  border-right: 1px solid #f4f4f4;
}
footer .consultation {
  font-size: 0.18rem;
  color: #fff;
  padding: 0.08rem 0.95rem;
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1) 0%,
    rgba(255, 125, 19, 1) 100%
  );
  box-shadow: 0px 0.05rem 0.15rem 0px rgba(255, 222, 0, 0.3);
  border-radius: 0.27rem;
}
/*搜索无结果*/
.jieg {
  font-size: 0.14rem;
  color: #303030;
}
.quxiao {
  color: #1599f1;
}
/*客户咨询服务*/
.textarea_zixun {
  height: 3rem;
  border: 0;
  outline: 0;
  color: #303030;
}
.consultation_gray {
  font-size: 0.18rem;
  color: #fff;
  padding: 0.08rem 0.95rem;
  background: linear-gradient(
    90deg,
    rgba(216, 216, 216, 1) 0%,
    rgba(233, 233, 233, 1) 100%
  );
  box-shadow: 0px 0.05rem 0.15rem 0px rgba(216, 216, 216, 0.3);
  border-radius: 0.27rem;
}
/*手机验证*/
.pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
.pop_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.8rem;
  background: none;
}
.title_h4_pop {
  color: #303030;
  font-size: 0.16rem;
  padding: 0.12rem;
  margin-bottom: 0.13rem;
  text-align: center;
  border-bottom: 1px solid #f4f4f4;
}
.pop_ul {
  width: 1.3rem;
  margin: 0 auto;
}
.pop_ul li {
  font-size: 0.16rem;
  color: #606060;
  height: 0.44rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
}
.pop_ul .li_l {
  display: inline-block;
  width: 1rem;
  height: 0.16rem;
  line-height: 0.16rem;
  padding: 0.14rem 0;
  float: left;
}
.pop_ul .li_r {
  width: 1.8rem;
  height: 0.43rem;
  border: 0;
  outline: none;
  float: right;
}
.li_r input {
  height: 0.15rem;
  padding: 0.14rem 0;
  border: 0;
  outline: 0;
}
.li_r_inp2 {
  width: 0.9rem;
  height: 0.15rem;
  padding: 0.14rem 0;
}
.verification_code {
  width: 0.7rem;
  height: 0.29rem;
  margin-top: 0.07rem;
}
.send_out_f {
  float: right;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: right;
}
.li_r .send_out {
  width: 0.8rem;
  height: 0.29rem;
  padding: 0;
  margin-top: 0.07rem;
  color: #1582f1;
  font-size: 0.16rem;
  background: #fff;
  text-align: right;
}
.zycs {
  color: #999999;
  font-size: 0.12rem;
  margin: 0.1rem auto 0.2rem;
}
.sub_pop_tel {
  width: 1.6rem;
  height: 0.44rem;
  font-size: 0.18rem;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1) 0%,
    rgba(255, 125, 19, 1) 100%
  );
  box-shadow: 0px 10px 30px 0px rgba(255, 222, 0, 0.3);
  border-radius: 0.22rem;
  text-align: center;
  line-height: 0.44rem;
  margin: 0.25rem auto 0;
}
.close_gb1_f {
  margin-top: 0.3rem;
  text-align: center;
}
.pop_box_con {
  width: 3.2rem;
  background: #ffffff;
  border-radius: 0.05rem;
  box-sizing: border-box;
  padding: 0.15rem;
}
.close_gb1_f img {
  width: 0.34rem;
  height: 0.34rem;
}

.color_black >>>.highlight {
  color: #ff8400;
  font-size: 0.16rem;
  font-weight: bold;
}
.color_orange >>>.highlight {
  color: #ff8400;
  font-size: 0.16rem;
  font-weight: bold;
}
/*信息提示*/
.message-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  min-width: 2rem;
  line-height: 0.2rem;
  padding: 0.15rem 0;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  font-size: 0.16rem;
}
.not_page{
  color:#999999;
}
.ql-container.ql-snow {
        border: 0px solid #ccc;
}
.ql-editor {
      box-sizing: border-box;
      line-height: 1.42;
      height: 100%;
      outline: none;
      overflow-y: auto;
      padding: 8px 1px;
      -o-tab-size: 4;
      tab-size: 4;
      -moz-tab-size: 4;
      text-align: left;
      white-space: pre-wrap;
      word-wrap: break-word;
  }
  .color_black{
      color: #303030;
      font-size: 0.14rem;
  }
</style>