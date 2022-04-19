<template>
	<div class="pro-show">
    <!--banner-->
    <div class="block">
      <img src="../../assets/productShow/images/banner.png" alt="" style="width:100%">
    </div>
    <!--我的团-->
    <div  v-if="myGroupInfo.data.length > 0">
      <div class="block countdown">
        <div class="countdown-bg" :style="{backgroundImage:'url( ../../../static/images/'+myGroupBgImg+')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}">
          <div class="clocks">
            <img src="../../assets/productShow/images/b02.png" alt="">
            <span>倒计时</span>&nbsp;<b>{{myGroupInfo.countdownTime}}</b>
          </div>
          <div class="users">
            <dl  v-if="myGroupInfo.data.length > 0 && index <3" v-for="(item,index) in myGroupInfo.data">
              <dt>
                <img :src="item.wxHeadUrl.length>0?item.wxHeadUrl:defaultHeadimgurl" alt="">
                <div v-if="item.isTeamHead == 0">拼主</div>
              </dt>
              <dd>{{item.wxNickName}}</dd>
            </dl>

            <dl v-if="standbyUser.length > 0" v-for="i in standbyUser">
              <dt><img src="../../assets/productShow/images/tx1.png" alt=""></dt>
              <dd></dd>
            </dl>
          </div>
        </div>
        <!-- 历史团 -->
        <div class="historyGroup" v-if="historyGroupInfo.length > 0">
          <ul style="display:none;">
            <li v-for="list in historyGroupInfo">
              <span class="spanLeft">{{list.historyMsg}}</span><span class="spanRight">{{list.endDate}}</span>
            </li>
          </ul>
          <img src="../../../static/images/x.png" alt="">
        </div>
       

      </div>
    </div>
    <!-- 历史团:当没有"我的团"并且有历史团信息时才展示 -->
    <div v-else>
      <div class="historyGroupOne" v-if="historyGroupInfo.length > 0">
        <img src="../../assets/productShow/images/wdt3.png" alt="">
        <ul>
          <li v-for="list in historyGroupInfo">
            <span class="spanLeft">{{list.historyMsg}}</span><span class="spanRight">{{list.endDate}}</span>
          </li>
        </ul>
      </div>
    </div>

      <!--去拼团-->
    <div v-if="groupUserListInfo.data.length>0">
      <div class="block userList">
        <div class="title">{{groupUserListInfo.num}}人在拼团，可直接参与</div>
        <div style="position:relative">
          <swiper :options="swiperOption"  v-if="groupUserListInfo.data.length>0">
            <swiper-slide v-for="(list,index) in groupUserListInfo.data" :key="'swiper-wrapper-'+index" :id="'swiper-wrapper-'+index">
              <ul>
                <li  v-if="list.length>0" v-for="(li,inx) in list" :key="'li'+inx" :id="'li'+inx">
                  <div class="li-left">
                    <img :src="li.data.wxHeadUrl.length>0?li.data.wxHeadUrl:defaultHeadimgurl" alt="">
                    <span>{{li.data.wxNickName}}</span>
                  </div>
                  <div class="li-middle">
                    <span>还差{{li.num}}人拼成</span><span>剩余{{li.countdownTime}}</span>
                  </div>
                  <div class="li-right">
                    <button class="btn btn-sunshine" :data-jumpurl="li.data.wxOpenId+'*'+li.data.groupBuyNum">去拼团</button>
                  </div>
                </li>
              </ul>
            </swiper-slide>
          </swiper>
          <!--分页器-->
          <div class="swiper-pagination" style="width:100%;bottom: 0.03rem;"></div>
        </div>
      </div>
    </div>

    <!-- 产品特色-理赔案例 -->
    <div class="block details">
      <div class="title">
        <span>产品特色</span>
      </div>
      <p>
        <img src="../../assets/productShow/images/cpjx_01.png" alt="" style="width:100%">
      </p>
      <p>
        <img src="../../assets/productShow/images/cpjx_02.png" alt="" style="width:100%">
      </p>
      <p>
        <img src="../../assets/productShow/images/cpjx_03.png" alt="" style="width:100%">
      </p>
    </div>
    <!--按钮组-->
    <div class="block btn-group">
      <button class="btn btn-blue" @click="joinMyGroupNow('open')" v-if="myGroupInfo.num==0 || myGroupInfo.num==''" :data-num="myGroupInfo.num">我要开团</button>
      <button class="btn btn-blue" @click="joinMyGroupNow('join')" v-else>立即参团</button>
      <button class="btn btn-sunshine" @click="inviteFriends">邀请好友参与</button>
    </div>

    <!--拼团细则按钮-->
    <div class="rules-btn">
      <img src="../../assets/productShow/images/ptxz.png" alt=""  @click="centerDialogVisible = true">
    </div>

    <!--拼团细则弹窗-->
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="80%"
      center>
      <div class="rules">
        <h1>拼团细则</h1>
        <p>
          <img src="../../assets/productShow/images/bz01.png" alt="" style="width:100%">
        </p>
        <div>
          <p><label>第一步：</label>点击活动链接购买产品参与拼团保额升级。</p>
          <p><label>第二步：</label>分享链接邀请好友参团购买。</p>
          <p><label>第三步：</label>自开团起24小时内，邀请好友从分享链接购买成功，最低保额6000元，满2人拼购成功所有成员保额涨至最高8000元，满3人拼购成功所有成员保额涨至最高10000元。</p>
        </div>
        <div>
          <h2>拼团有效期</h2>
          <p>自开团时刻起的24小时内有效，期间未邀请到好友参与投保成功，无法享受拼团活动保额加大优惠政策。</p>
        </div>
        <div>
          <h2>拼团结束</h2>
          <p>在拼团有效期24小时结束时，系统按照当前参团购买人数通知最终保额和电子保单。</p>
        </div>
        <div>
          <h2>查看拼团订单</h2>
          <p>在活动首页查看自己的拼团详情。</p>
        </div>
        <!-- <div>
          <h2>拼团次数</h2>
          <p>每期的拼团都有次数限制，如超出拼团次数将不能发起或者参与拼团。</p>
        </div> -->
        <div>
          <h2>活动限制</h2>
          <p>拼团活动产品不支持退保。</p>
          <p>本活动解释权归阳光财产保险股份有限公司所有</p>
        </div>
      </div>
    </el-dialog>

    <!-- 参与拼团 -->
    <el-dialog
      title=""
      :visible.sync="joinGroupDialogVisible"
      width="80%"
      center>
      <div class="joinGroup" v-if="oneGroupInfo.data.length>0">
        <h2 style="font-size:18px;">参与<label>{{oneGroupInfo.groupHeaderName}}</label>的拼团</h2>
        <p>仅剩<label>{{oneGroupInfo.num}}</label>个名额，{{oneGroupInfo.countdownTime}}后结束</p>
        <div>
          <dl v-if="index < 3" v-for="(list,index) in oneGroupInfo.data">
            <dt><img :src="list.wxHeadUrl.length>0?list.wxHeadUrl:defaultHeadimgurl" alt=""></dt>
            <dd>{{list.wxNickName}}</dd>
          </dl>
          <dl v-if="standbyUserDialog.length > 0" v-for="i in standbyUserDialog">
            <dt><img src="../../assets/productShow/images/tx1.png" alt=""></dt>
            <dd></dd>
          </dl>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="joinGroup" type="warning" style="font-size: 0.17rem;
    background: -webkit-linear-gradient(top,#FF8400,#FFB400);">参与拼团</el-button>
      </span>
    </el-dialog>

    <!-- 邀请参与拼团 -->
    <el-dialog
      title=""
      :visible.sync="continueJoinGroupDialogVisible"
      width="80%"
      center>
      <div class="continueJoinGroup">
        <p><img src="../../assets/productShow/images/ts02.png" alt=""></p>
        <div>您已经购买过了呦，<br/>继续参与拼团为家里人<br/>带来一份健康医疗保障吧~</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="continueJoinGroup" type="warning" style="font-size: 0.17rem;
    background: -webkit-linear-gradient(top,#FF8400,#FFB400);">邀请参与拼团</el-button>
      </span>
    </el-dialog>

    <!-- 我要开团 -->
    <el-dialog
      title=""
      :visible.sync="openGroupDialogVisible"
      width="80%"
      center>
      <div class="openGroup">
        <p><img src="../../assets/productShow/images/ts01.png" alt=""></p>
        <div>矮油，还是晚了一步，此团已结束，<br/>团内所有成员保额已升级涨至1万元，<br/>您可以发起一个新的团哦~</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openGroup" type="warning" style="font-size: 0.17rem;
    background: -webkit-linear-gradient(top,#FF8400,#FFB400);">我要开团</el-button>
      </span>
    </el-dialog>
    <!-- 邀请好友参与 -->
    <!--点击右上角-->
    <div class="share" v-if="shareShade" @click="closeShade">
      <img src="../../assets/productShow/images/fx.png" alt="">
    </div>
    <!--通用异常提示框-->
    <el-dialog
      title=""
      :visible.sync="msgBoxDialogVisible"
      width="80%"
      center>
      <div class="msgBox">
        <p><img src="../../assets/productShow/images/ts01.png" alt=""></p>
        <div>{{errorMsg}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgBoxDialogVisible = false" type="warning" style="font-size: 0.17rem;
    background: -webkit-linear-gradient(top,#FF8400,#FFB400);">关闭</el-button>
      </span>
    </el-dialog>
	</div>

</template>

<script>

import { Toast } from "mint-ui";
import Jquery from "jquery";
import wx from 'weixin-js-sdk';
import "../../assets/productShow/style/style.css";
//引入vue-awesome-swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
  name: "productShow",
  props: [],
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      id: '',
      channelCode: '',
      orgCode: '',
      stateCode: '',
      openid: '',
      groupBuyNum: '',//url中所带团号
      myGroupBuyNum:'',//我的团拼主团号
      groupBuyNumFromList:'',//拼团列表中的团号
      nickname: '',
      headimgurl: '',
      defaultHeadimgurl:location.href.split('#')[0]+'static/images/tx2.png',
      myGroupBgImg:'',
      standbyUser: [],
      standbyUserDialog: [],
      historyGroupInfo:[],
      myGroupInfo:{
        data:[],
        num:''
      },
      countdownTime: "",
      shareShade: false,
      groupUserListInfo: {
        data:[],
        num:""
      },
      oneGroupInfo: {
        data:[],
        num:''
      },
      btnLeftStr :'',
      isPassed: false,
      errorMsg: '',
      msgBoxDialogVisible: false,
      centerDialogVisible: false,
      joinGroupDialogVisible:false,//参与拼团
      continueJoinGroupDialogVisible:false,//继续参与拼团
      openGroupDialogVisible:false,//我要开团

      swiperOption: {//swiper3
        autoplay: true,
        speed: 1000,
        // loop: true,//会影响倒计时
        autoplay:{
          disableOnInteraction: false,//轮播图触摸之后可以重新播放
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true //分页器可点击
        },
        on: {
          // 使用es6的箭头函数，使this指向vue对象
          click: (e)=>{
            // 通过$refs获取对应的swiper对象
            let jumpUrl = e.target.dataset.jumpurl // jumpurl是在swiper-slide中动态绑定的data-jumpurl属性，值是从后台获取的跳转链接
            if(jumpUrl){
              let data = jumpUrl.split('*');
              this.joinGroupFromList(data[0],data[1]);//调用vue methods中的方法
            }
          }
        }
        
      }
    };
  },
  created() {

    this.getUrlParams();
    this.groupCheck(this.groupBuyNum);
    this.getHistoryGroup();
    this.getMygroupInfo();
    this.getGroupUserListInfo();

  },
  computed: {
  },
	mounted () {
    console.log('组件已经挂载到上面了。。。');
	},
  methods: {

    getUrlParams(){
      this.id = this.getUrlValueByName('id');
      this.channelCode = this.getUrlValueByName('channelCode');
      this.orgCode = this.getUrlValueByName('orgCode');
      this.stateCode = this.getUrlValueByName('stateCode');
      this.openid = this.getUrlValueByName('openid');
      this.groupBuyNum = this.getUrlValueByName('groupBuyNum');//url中的groupBuyNum
      this.nickname = this.getUrlValueByName('nickname');
      this.headimgurl = this.getUrlValueByName('headimgurl');
    },

    //参团校验
    groupCheck(groupBuyNum){
      //该团是否已过期(不超过24小时)，该团成员是否满团(3人满团),该团是否购买过
      this.$http
      .post("/sunmc/groupShopping/selectIsStatuByOpenId", {
        wxOpenId:this.openid,
        groupBuyNum:groupBuyNum
      }).then(result => {
        console.log(JSON.stringify(result),'参团校验');
        if(result.status == 200){
          console.log(result.data.code);
          if(result.data.code == '10001'){//已购买过
            this.continueJoinGroupDialogVisible = true;//弹框
          }else if(result.data.code == '10002' || result.data.code == '10003'){//已过期或已满团
            this.openGroupDialogVisible = true;//弹框
          }else if(result.data.code == 200){//校验通过
            this.isPassed = true;
          }else{//其他错误提示
            this.msgBoxDialogVisible = true;
            this.errorMsg = result.data.msg;
          }
        }
      });
      return this.isPassed;
    },
    //历史团
    getHistoryGroup(){
      this.$http
      .post("/sunmc/groupShopping/queryPeopleHistoryGroupInfo", {
        wxOpenId:this.openid,
      }).then(result => {
        console.log(JSON.stringify(result));
        if(result.status == 200){
          if(result.data.code == 200){
            this.historyGroupInfo = result.data.data;
          }else{
            this.msgBoxDialogVisible = true;
            this.errorMsg = result.data.msg;
          }
        }
      });
    },
    //我的团
    getMygroupInfo(){
      var that = this;

      this.$http
      .post("/sunmc/groupShopping/queryPeopleInformation", {
        wxOpenId:this.openid,
        groupBuyNum:this.groupBuyNum
      }).then(result => {
        // console.log(JSON.stringify(result));
        if(result.status == 200){
          if(JSON.stringify(result.data) != "{}"){
            // console.log(JSON.stringify(result.data),324);
            for(var x=0;x<result.data.data.length;x++){
              if(result.data.data[x].isTeamHead == 0){
                this.flag = true;
                this.myGroupBuyNum = result.data.data[x].groupBuyNum;//拼主团号
                result.data.countdownTime = that.countDownTime(result.data.data[x].groupBuyTime);
                result.data.timer = setInterval(function(x){
                  result.data.countdownTime = that.countDownTime(result.data.data[x].groupBuyTime); // 每秒计算
                }, 1000, x);
              }

              // if(x < 3){//最多只展示3个团员
              //   this.myGroupInfo.data.push(result.data.data[x]);
              // }
            }
            this.myGroupInfo = result.data;
            if(this.myGroupInfo.data.length > 0){
              if(this.myGroupInfo.num == 1){//剩余人数
                this.standbyUser = [0];//后补头像数量
                this.myGroupBgImg = 'wdt2.png';
              }else if(this.myGroupInfo.num == 2){
                this.standbyUser = [0,1];//后补头像数量
                this.myGroupBgImg = 'wdt.png';
              }else{
                this.myGroupBgImg = 'wdt2.png';
              }
              console.log(JSON.stringify(this.myGroupInfo),'我的团');
            }
          }
          this.doWeChatShare(this.myGroupBuyNum);//调用微信分享
        }
        
      });
    },
    //获取所有参团成员信息
    getGroupUserListInfo(){
      var that = this;

      this.$http
      .post("/sunmc/groupShopping/queryAllPeopleInformation", {}).then(result => {
        if(result.status == 200){
          if(result.data.length > 0){
            for(var x=0;x<result.data.length;x++){
                result.data[x].countdownTime = that.countDownTime(result.data[x].data.groupBuyTime);
                result.data[x].timer = setInterval(function(x){
                    result.data[x].countdownTime = that.countDownTime(result.data[x].data.groupBuyTime); // 每秒计算
                }, 1000, x);
              }

              this.groupUserListInfo.num = result.data.length;
              for(var i=0;i<result.data.length;i+=2){
                // console.log(JSON.stringify(result.data[i]),393);
                // console.log(result.data[i+1],394);
                if((result.data[i]!= undefined && result.data[i] != null) && (result.data[i+1]!= undefined && result.data[i+1] != null)){
                  this.groupUserListInfo.data.push([result.data[i],result.data[i+1]]);
                }else if(result.data[i]!= undefined && result.data[i] != null){
                  this.groupUserListInfo.data.push([result.data[i]]);
                }else if(result.data[i+1]!= undefined && result.data[i+1] != null){
                  this.groupUserListInfo.data.push([result.data[i+1]]);
                }
              }
          }
          console.log(JSON.stringify(this.groupUserListInfo),'所有参团成员信息');
        }
      });
    },
    //去拼团
    joinGroupFromList(openid,groupBuyNum){
      var that = this;
      //参团校验
      if(this.groupCheck(groupBuyNum)){//校验通过
        this.groupBuyNumFromList = groupBuyNum;//拼团列表中的团号
        //调取此团信息
        this.$http
        .post("/sunmc/groupShopping/queryPeopleInformation", {
          wxOpenId:openid,
          groupBuyNum:groupBuyNum
        }).then(result => {

          if(result.status == 200){
            if(JSON.stringify(result.data) != '{}'){
               if(result.data.num == 1){//剩余人数
                this.standbyUserDialog = [0];//后补头像数量
              }else if(result.data.num == 2){
                this.standbyUserDialog = [0,1];//后补头像数量
              }

              for(var i=0;i<result.data.data.length;i++){
                if(result.data.data[i].isTeamHead == "0"){//拼主
                  result.data.groupHeaderName = result.data.data[i].wxNickName;
                  result.data.countdownTime = that.countDownTime(result.data.data[i].groupBuyTime);
                  result.data.timer = setInterval(function(i){
                    result.data.countdownTime = that.countDownTime(result.data.data[i].groupBuyTime); // 每秒计算
                  }, 1000, i);
                }
              }
              this.oneGroupInfo = result.data;
              console.log(JSON.stringify(this.oneGroupInfo,'我的团弹框'));
            }
          }
        });
        this.joinGroupDialogVisible = true;
      }
    },
    //立即投保参团(url中的groupBuyNum)
    joinMyGroupNow(type){
      if(type == 'join'){//参团
        //参团校验
        if(this.groupCheck(this.groupBuyNum)){//校验通过
          this.gotoNext(this.groupBuyNum);
        }
      }else{//开团
        this.openGroup();
      }
      
    },

    //我要开团(清空url中的groupBuyNum)
    openGroup(){
      this.openGroupDialogVisible = false;
      this.gotoNext('');
    },
    //参与拼团(拼团列表中的groupBuyNum)
    joinGroup(){
      this.joinGroupDialogVisible = false;
      if(this.groupCheck(this.groupBuyNumFromList)){//再校验一遍
        this.gotoNext(this.groupBuyNumFromList);
      }
    },
    //邀请参与拼团(url中的groupBuyNum)
    continueJoinGroup(){
      this.continueJoinGroupDialogVisible = false;
      this.inviteFriends();
    },

    //邀请好友参与(url中的groupBuyNum)
    inviteFriends(){
      this.shareShade = true;
    },
    //关闭邀请遮罩
    closeShade(){
      this.shareShade = false;
    },
    //跳转到详情页
    gotoNext(groupBuyNum){
      this.$router.push({
        path:"/Product/ProDetails",
        query:{
          id: this.id,
          channelCode: this.channelCode,
          orgCode: this.orgCode,
          stateCode: this.stateCode,
          openid: this.openid,
          groupBuyNum: groupBuyNum,
          nickname: this.nickname,
          headimgurl: this.headimgurl
        }
      });
    },
    //微信分享
    doWeChatShare(groupBuyNum){
      this.host = window.location.host;
      var shareUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc7e0abfa8e0c728&redirect_uri=https%3a%2f%2fpw.sinosig.com%2fWxEngine%2fdhc%2fsys%2fmain.do%3fapp%3dygAuthForThirdService%26func%3dauthForThird%26authKey%3dGC1521F874954088E5B4A8477EA137ED758969B9CC%26endUrl%3dhttp%253a%252f%252f'+this.host+'%252f%2523%252fproductShow%253fid%253d'+this.id+'%2526channelCode%253d'+this.channelCode+'%2526orgCode%253d'+this.orgCode+'%2526groupBuyNum%253d'+groupBuyNum+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'//微信分享授权链接

      var link = window.location.href.split('#')[0]+"static/html/redirect.html?shareurl="+encodeURIComponent(shareUrl);
      console.log(link);

      var data = {
        title:'住院“万元保”0免赔！有无社保均可保！健康保障每一天~',
        desc:'嗯！住院1分钱也能报！戳我查看~',
        link:link,
        imgUrl:location.href.split('#')[0]+'static/images/pic.jpg',
        
      };
      this.WXConfig.weChatShare(JSON.stringify(data));//调用微信分享功能
    },

    //倒计时(剩余支付时间 - 当前时间)
    countDownTime(endDate){
      // var endDate = '2019-05-09 18:00:00';
      var diffTime = new Date(endDate.replace(/-/g,'/')).getTime() + 24*60*60*1000 - new Date().getTime();
      var result = '';
      //定义变量,h,m,s保存倒计时的时间
      var h, m, s;
      if (diffTime >= 0){
          h = Math.floor(diffTime / 1000 / 60 / 60);
          m = Math.floor(diffTime / 1000 / 60 % 60);
          s = Math.floor(diffTime / 1000 % 60);
          h = h < 10 ? ("0" + h) : h;
          m = m < 10 ? ("0" + m) : m;
          s = s < 10 ? ("0" + s) : s;
          // console.log(h +':'+ m +':'+s);
          result = h + ':' + m + ':' + s;
      }else{
        result = "00:00:00";
        // this.openGroupDialogVisible = true;//弹窗提示此团已结束
      }
      return result;
    },

    //获取Url中的某个参数值
    getUrlValueByName(paraName){
　　　var url = document.location.toString();
　　　var arrObj = url.split("?");
　　　if(arrObj.length > 1) {
　　　　var arrPara = arrObj[1].split("&");
　　　　var arr;
　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　arr = arrPara[i].split("=");
　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　return arr[1];
　　　　　}
　　　　}
　　　　return "";
　　　}else {
　　　　return "";
　　　}
　　},
    //将时间戳格式化为日期
    formatDateTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
     return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },

  }
};
Jquery(function() {
  Jquery(document).on("click", ".historyGroup img", function() {
    var ulObj = Jquery('.historyGroup ul');
    // console.log(ulObj.css('display'));
    if(ulObj.css('display') =='none'){
      ulObj.slideDown();
      Jquery(this).attr('src','../../../static/images/s.png');
    }else{
      ulObj.slideUp();
      Jquery(this).attr('src','../../../static/images/x.png');
    }
    
  });
});

</script>
<style scoped>
>>> .swiper-pagination-bullets .swiper-pagination-bullet{
  margin: 0 4px;
}
</style>
