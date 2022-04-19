<template>
  <div class="pro_details" :data='itemData'>
    <mymask :loadingVisible="loadingVisible" :loadingVisibleContent="loadingVisibleContent"></mymask>
    <!-- 健康告知 -->
    <health :channelName="channelName" page="详情页" :showHealth='showHealth' :itemData="itemData" @hideHealth="onHideHealth" @onHealthye="healthye"></health>
    <!-- 返回顶部 -->
    <go-top></go-top>
    <!-- 轮播图部分 -->
    <slide-show :prdImgs="prdImgs"></slide-show>
    <template v-if="prdVersion == 2">
      <!-- 轮播图下广告 -->
      <AD1 :adList="common.getAdListBySeat(adList, 3)" seat="3"></AD1>
      <!-- 保障范围 -->
      <!-- <bao-zhang-fan-wei @onSwitchPrdDutylist="onSwitchPrdDutylist" :prdName="prdName" :styleList="styleList" :prdStyles="itemData.prdStyles" :prdDutylist="prdDutylist" :prdTheme="prdTheme"></bao-zhang-fan-wei> -->
    </template>

    <!-- 保障范围旧版样式 -->
    <template v-if="prdVersion == 1">
      <div>
        <div class="salet" style="width: 100%; ">
          <div class='proitem' style="padding-bottom: 0;width: 100%; overflow: hidden; display: flex;justify-content: space-around;align-items: stretch; text-align: center; color: rgb(51,51,51);">
            <p v-show="tit.isShow" style='display:flex;flex:1;justify-content:center;align-items:center;padding: 10px .13rem;width: 25%;' @click="chenge(tit.prdDutys,tit.styleName,index)" v-for="(tit,index) in itemData.prdStyles" :class='{background:backs==index}' :key='index' :id='tit.styleName'>{{tit.styleName}}</p>
          </div>
        </div>
        <div v-for="(titlist,i) in prdDutylist" :key='i' :title="titlist.name" :value="titlist.value">
          <h2 style="display: flex;justify-content: space-between;color:rgb(51,51,51);font-size:0.15rem;padding:0.15rem;border:0.01rem solid #e1e1e1;cursor:pointer;" class="textH2">{{titlist.name}}
            <span style="display: inline-block;color:rgb(102,102,102);font-size:0.15rem;">{{titlist.remark}}
              <img class="select" src="../../../static/images/bottom.png" v-if="titlist.value != ''">
            </span>
          </h2>
          <p class="titcent" v-if="titlist.value != ''" style="padding:0.1rem 0.15rem;font-size:0.14rem;">{{titlist.value}}</p>
        </div>
      </div>
    </template>

    <!-- 用户福利广告 -->
    <AD1 :adList="common.getAdListBySeat(adList, 1)" seat="1"></AD1>

    <!-- 导航栏部分旧版样式 -->
    <template v-if="prdVersion == 1">
      <div class="nav_tab">
        <a :class="{spanActive:orderState === 0}" @click="myWealth" href="javascript:void(0)">
          产品介绍
        </a>
        <a :class="{spanActive:orderState === 1}" @click="History" href="javascript:void(0)">
          详细说明
        </a>
        <a :class="{spanActive:orderState === 2}" @click="record" href="javascript:void(0)">
          理赔流程
        </a>
      </div>
      <!-- tab-container -->
      <div>
        <!-- 产品介绍 -->
        <div id="pro_introduce" class='proitem' v-if="orderState === 0">
          <div v-html="introduce" class="introduce"></div>
        </div>
        <!-- 详细说明 -->
        <div id="2" class='proitem' v-for="(detail,index) in itemData.insurances" :key='index' v-if='detail.type == 4 && orderState === 1'>
          <div v-html="detail.content" class="detail"></div>
          <mt-cell v-for='det in detailList' :key='det.title' :title="det.title" is-link @click.native='showContent(det.isUrlFormat,det.content)' :content="maskcontent">
          </mt-cell>
          <mt-popup v-model="popupVisibledetail" popup-transition="popup-fade" position='center'>
            <div class="popup_content editorStyle" style='width: 3.3rem;max-height: 4rem;overflow: auto;padding: .1rem;border-radius: 10px !important;-webkit-overflow-scrolling: touch;' v-html="maskcontent"></div>
          </mt-popup>
        </div>
        <!-- 理赔流程 -->
        <div id="3" class='proitem' v-for="(flow,i) in process" :key='i' v-if="orderState === 2">
          <div v-if='flow.isUrlFormat'>
            点击下载<a v-if='flow.isUrlFormat == true' :href='flow.content' class="flow">{{flow.title}}</a>
          </div>
          <div v-else>
            <div v-html="flow.content" class='detail htmlclass'>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 新版样式 -->
    <template v-if="prdVersion == 2">
      <!-- 导航栏部分 -->
      <nav-bar :insurances="insurances" :prdTheme="prdTheme"></nav-bar>
      <!-- 常见问题部分 -->
      <common-question :insurances="insurances"></common-question>
    </template>

    <!-- 底部占位 -->
    <div class="zhanwei"></div>

    <div class="kongbai"></div>
    <!-- 底部 -->
    <div class='profoot'>
      <div class="profootright" :style="{backgroundColor: prdTheme, width: '100%'}" @click="toinsur">
        <span v-if="giveInsurance == 1">
          <label v-if="isXubao == 1">立即续保</label>
          <label v-else>{{itemData.startPrice}}元开启特权</label>
        </span>
        <span v-else-if="giveInsurance == 0">免费投保</span>
      </div>
    </div>
    <!--立即投保-->
    <div v-show="toInsureShade" class="show_shade" @click="shadowClose('insure')">
      <!--@click.stop=""阻止触发父元素的点击事件-->
      <div class="shade_content" @click.stop="">
        <div class="tradition_mask">
          <div class="insured-name">保障详情：</div>
          <dl class="selected_div" v-if="styleList.length>1">
            <dd class="dt">方案名称</dd>
            <dt style="flex:1;">
              <span v-show="i.isShow" v-for='(i,indexA) in styleList' :key="indexA" @click="handletype(i.prdSpecificationCalcs,i.prdItemId,i.styleId,i.price,indexA,false)" :style="{color: (indexA===styleActiveIndexA ? prdTheme : '#999'), border: (indexA == styleActiveIndexA ? '1px solid ' + prdTheme : '1px solid')}">
                {{i.styleName}}
              </span>
            </dt>
          </dl>

          <div v-for='item in typeData' class="selected_div" :key='item.name'>
            <p class="dt" v-if="item.entries.length>0">{{item.name}}</p>
            <template v-if="item.name == itemData.compoundComplex">
              <template v-if="item.entries[0].value == '是'">
                <span :style="{color: prdTheme, border: '1px solid ' + prdTheme}">是</span>
                <span @click="handlePlus()">否</span>
              </template>
              <template v-else>
                <span @click="handlePlus()">是</span>
                <span :style="{color: prdTheme, border: '1px solid ' + prdTheme}">否</span>
              </template>
            </template>
            <template v-else-if="item.entries.length==1">
              <span v-for="items in item.entries" class="active" :key='items.id' :style="{color: prdTheme, border: 'none'}">
                {{items.value}}
              </span>
            </template>
            <template v-else-if="item.entries.length==2">
              <span v-for="items in item.entries" @click="item.name=='是否月缴'?monthHandleClick(item.entries,items.id,false):handleClick(item.entries,items.id,styleId,false)" :class="{active:items.isDefault}" :key='items.id' :style="{color: (items.isDefault ? prdTheme : '#999'), border: (items.isDefault ? '1px solid ' + prdTheme : '1px solid')}">
                {{items.value}}
              </span>
            </template>

            <template v-if="item.entries.length>2">
              <template v-if="itemData.ageDisplayStyle == 1 && item.name == '年龄'">
                <div class="age-input-wrap" :style="{color: prdTheme, border: '1px solid ' + prdTheme}" @click="onAgeInputFocus">
                  <input type="text" name="" id="" maxlength="2" @keyup="isRealNum(inputAge)" @blur="handleInputAge(),onScrollBottom()" v-model="inputAge" :style="{color: prdTheme}">
                  <i class="sui">岁</i>
                </div>
              </template>
              <template v-else>
                <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,styleId,false)" placeholder="" class="select_option" :style="{color: prdTheme, border: '1px solid ' + prdTheme}">
                  <option v-for="items in item.entries" :key="items.id" :value="items.id">{{items.value}}
                  </option>
                </select>
                <img src="../../../static/images/bottom.png" alt="" class="select_bottom">
              </template>
            </template>

            <!-- <span v-for="items in item.entries" v-if="item.entries.length<=2" @click="item.name=='是否月缴'?monthHandleClick(item.entries,items.id,false):handleClick(item.entries,items.id,styleId,false)" :class="{active:items.isDefault}" :key='items.id'>
              {{items.value}}
            </span>
            <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,styleId,false)" placeholder="" v-if="item.entries.length>2" class="select_option">
              <option v-for="items in item.entries" :key="items.id" :value="items.id">{{items.value}}
              </option>
            </select>
            <img src="../../../static/images/bottom.png" alt="" class="select_bottom" v-if="item.entries.length>2"> -->
          </div>

          <div class="shade_bottom">
            <div class="shade_bottom_left">
              <div class="profootleft">
                <template v-if="customerService != ''">
                  <a :href="customerService">
                    <template v-if="customerLogo != null && customerLogo != ''">
                      <img :src="customerLogo" />
                    </template>
                    <template v-else>
                      <img src="../../../static/images/zixun.png" />
                    </template>
                  </a>
                </template>
                <template v-else>
                  <a href="http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw=">
                    <template v-if="customerLogo != null && customerLogo != ''">
                      <img :src="customerLogo" />
                    </template>
                    <template v-else>
                      <img src="../../../static/images/zixun.png" />
                    </template>
                  </a>
                </template>
              </div>
              <div class="yuan_word">
                <template v-if="giveInsurance == 1">
                  <template v-if="discount">
                    <div>&yen;{{prdmcShop.disCountPrice}}</div>
                    <div class="oldPrice">&yen;{{prdmcShop.price}}</div>
                  </template>
                  <div v-else>
                    &yen;{{prdmcShop.price}}
                  </div>
                </template>
                <div v-else-if="giveInsurance == 0">&yen;0</div>
              </div>
            </div>
            <div class="shade_bottom_right" @click="test" :style="{backgroundColor: prdTheme}">
              <span v-if="giveInsurance == 1">
                <label v-if="isXubao == 1">确认续保</label>
                <label v-else>下一步</label>
              </span>
              <span v-else-if="giveInsurance == 0">确认投保</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--一键续保start-->
    <div v-show="renewOneClickShade" class="renewalInsurancePop" @click="shadowClose('renewInsure')">
      <div class="renewalInsuranceCon" @click.stop="">
        <h4 class="title1">爱健康一键续保 <img src="../../../static/images/gb.png" class="closeImg" @click="shadowClose('renewInsure')" alt="" /></h4>
        <div class="xbfa">
          <h4 class="title2">续保方案</h4>
          <ul>
            <li>
              <label>方案选择:</label>
              <div class="right edition" v-if="renewStyleList.length >1">
                <span v-for="(i,indexB) in renewStyleList" @click="handletype(i.prdSpecificationCalcs,i.prdItemId,i.styleId,i.price,indexB,true)" :class="{activeSelected:indexB===styleActiveIndexB}" :key="i.styleId">
                  {{i.styleName}}
                </span>
              </div>
            </li>
            <li v-for="list in renewTypeData" v-if="list.entries.length>0 && list.entries.length<=2">
              <label>{{list.name}}:</label>
              <div class="right">
                <span v-for="li in list.entries" @click="list.name=='是否月缴'?monthHandleClick(list.entries,li.id,true):handleClick(list.entries,li.id,styleIdRenew,true)" :key='li.id' :class="{activeSelected:li.isDefault}">
                  {{li.value}}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="xbfa">
          <h4 class="title2 renewalInfo">续保人信息</h4>
          <ul>
            <li>
              <label>姓名:</label>
              <div class="right">
                <input type="text" placeholder="请输入上年被保险人姓名" v-model="renewParams.name" autocomplete="on" maxlength="15" @blur="checkFieldCommon(renewParams.name,'姓名')" />
              </div>
            </li>
            <li>
              <label>身份证号:</label>
              <div class="right">
                <input type="text" placeholder="请输入上年被保险人身份证号" v-model="renewParams.id" autocomplete="on" @blur="checkFieldCommon(renewParams.id,'身份证')" @change="changeDataInfo(renewParams.id)" maxlength="18" />
              </div>
            </li>
          </ul>
        </div>
        <div class="continue">
          <ul class="xubao clear">
            <li class="priceF">
              <span>保费:</span>
              <span v-if="discount">
                <label class="curPrice">&yen;{{renewData.disCountPrice}}</label>
                <label class="oldPrice">&yen;{{renewData.price}}</label>
              </span>
              <span v-else>
                <label class="curPrice">&yen;{{renewData.price}}</label>
              </span>
            </li>
            <li class="xbBtn" @click="renewInsurance(renewParams)">继续续保</li>
          </ul>
        </div>
      </div>
    </div>
    <!--一键续保end-->

    <!--弹框提示-->
    <div class="popW" v-if="renewInsurResultPop.isShow">
      <div class="popBox">
        <p>已有理赔记录，请您续保原产品</p>
        <div class="popBtn"><button @click="gotoRenewInsurance2018">确定</button></div>
      </div>
    </div>

  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Toast } from "mint-ui";
import Jquery from "jquery";
import wx from 'weixin-js-sdk';
import SlideShow from './slideShow/SlideShow.vue'
import AD1 from '@/components/ad/ad1.vue'
import BaoZhangFanWei from './baozhangfanwei/BaoZhangFanWei.vue'
import NavBar from './navbar/NavBar.vue'
import GoTop from './gotop/GoTop.vue'
import Health from '@/components/newComponents/health/Health.vue'
import CommonQuestion from './CommonQuestion/CommonQuestion.vue'
import Mymask from '@/components/newComponents/mymask/Mymask.vue'
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化

export default {
  name: "ProIndex",
  components: {
    swiper,
    swiperSlide,
    SlideShow,
    AD1,
    BaoZhangFanWei,
    NavBar,
    GoTop,
    Health,
    CommonQuestion,
    Mymask
  },
  props: ["id", "Code"],
  data() {
    return {
      currentStyleName: '', // 当前所选方案名称
      inputAge: 0,// 当年龄需要输入时的年龄
      prdTheme: '#ff8400',// 主题色
      prdVersion: 1,// 标识展示新版样式还是旧版样式 1旧版 2新版
      customerLogo: '../../../static/images/zixun.png',// 咨询图标
      prdImgs: [],// 轮播图数组
      insurances: [],// 产品特色、购买须知、理赔说明、常见问题等的数组集合
      introduce: "", //产品特色（暂时）
      giveInsurance: 1,// 是否赠险标识 0：是  1：否
      customerService: 'http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw=',// 咨询字段
      detailList: [], // 协议下方的数据
      prdmcShop: {}, // 确认投保数据
      typeData: [], // 按钮款式
      insureId: "", // 判断是否自己搭配款式
      policytypeId: "1", //选中款式id，popupVisible投保需要的
      policytypeIdRenew: "",//一键续保选中款式id
      itemid: this.$route.query.id, //列表id，产品id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      carOwnerCode: this.$route.query.carOwnerCode, //列表carownerCode
      oldPolicyNo: this.$route.query.oldPolicyNo,//保单号
      openid: this.$route.query.openid,//微信用户唯一标识
      styleList: [],
      popupVisibleFirst: false,
      itemData: {},
      popupVisibledetail: false,
      maskcontent: "",
      process: [], //流程
      prdDutylist: [], //产品分类
      orderState: 0, //标志那个tab栏的那个变量
      styleId: "",
      styleIdRenew: "",//一键续保方案ID
      healths: [], //健康告知
      showHealth: false,
      backs: "0",
      spreadtion: "",
      prdSpecificationCalcs: [],
      entries: [],//年龄区间
      sheBaoEntries: [],// 社保区间
      sexEntries: [],// 性别区间
      entriesRenew: [],//一键续保年龄区间
      upParams: {},
      upParamsRenew: {},//一键续保投保选项
      urlParam: '',
      loadingVisible: true,
      loadingVisibleContent: '',
      productEndDate: '',
      status: 1,//产品状态：0已下架 1正常
      channelName: '',
      adList: [],
      path: '',//定义跳转路径
      isXubao: window.sessionStorage.getItem('isXubao'),
      discount: "",//折扣
      priceStore: "",//存储价格变动
      renewPriceStore: "",//一键续保,存储价格变动
      monthPayEntries: [],//月缴
      renewMonthPayEntries: [],
      monthPayType: "",//月缴方式
      renewMonthPayType: "",//一键续保月缴方式
      renewInsuranceFlag: "",//一键续保标识值
      renewOneClick: false,//是否是一键续保
      toInsureShade: false,//立即投保遮罩
      renewOneClickShade: false,//一键续保遮罩
      styleActiveIndexA: 0,//新保方案选中
      styleActiveIndexB: 0,//续保方案选中
      renewParams: {
        name: "",
        id: ""
      },//一键续保入参
      renewData: {},
      renewStyleList: [],//续保方案
      renewTypeData: [],
      calculateAgeIndex: "",//根据身份证号测算出的年龄区间所在数组中的索引
      calculateAgeId: "",//根据身份证号测算出的年龄区间的ID
      renewInsurResultPop: {
        isShow: false,
        message: "",
        link2018: ""
      },//一键续保结果弹框
      baiduSearchCount:0,
      baiduInforFlowCount:0,
      douyinCount:0,
      kuaishouCount:0,
    };
  },
  created() {
    // this.hideWxOptionMenu();//隐藏微信菜单
    // this.hideWxCopyUrlOption();//只隐藏微信菜单复制链接选项
    this.getList();
    this.getAd();

    var params = window.location.href.split('?');
    console.log(params, 236);
    if (params.length == 2) {
      params = params[1];
    } else {
      params = '';
    }
    this.urlParam = params;
    /// 首先清除缓存吧。。。
    window.sessionStorage.removeItem('urlParam');
    window.sessionStorage.removeItem('res');
    window.sessionStorage.removeItem('startDate');
    window.sessionStorage.removeItem('endDate');
    window.sessionStorage.removeItem('userList');
    window.sessionStorage.removeItem('money');
    window.sessionStorage.removeItem('itemId')
    window.sessionStorage.removeItem('productEndDate');
    window.sessionStorage.removeItem('entries');//年龄区间
    window.sessionStorage.removeItem('sheBaoEntries');//社保区间
    window.sessionStorage.removeItem('sexEntries');// 性别区间
    window.sessionStorage.removeItem('entriesRenew');
    window.sessionStorage.removeItem('upParams');//投保选择项
    window.sessionStorage.removeItem('upParamsRenew');
    window.sessionStorage.removeItem('discount');
    window.sessionStorage.removeItem('monthPayType');
    window.sessionStorage.removeItem('styleId');
    window.sessionStorage.removeItem('renewInsuranceFlag');
    window.sessionStorage.removeItem('currentStyleName');
  },
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  },
  mounted() {
    console.log('组件已经挂载到上面了。。。');
  },
  filters: {},
  methods: {
    isRealNum(val){
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        this.handleInputAge()
        return true;
    }else{
        this.onToast('只能输入数字')
        this.inputAge = ''
        return false;
    }
},
    onScrollBottom() {// 解决fixed定位元素中有input框错位问题
      setTimeout(function(){
      var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      },100)
    },
    onAgeInputFocus() {
      Jquery('.age-input-wrap input')[0].focus()
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    // 根据渠道查询渠道信息接口
    getChannelAndAppkey(callback) {
      this.$http.post('/prdmc/channel/getChannelAndAppkey', {
        channelCode: this.channelCode
      }).then(res => {
        callback(res)
      }).catch((e) => console.log(e))
    },
    // 处理CCH埋点
    handleCCH(obj) {
      this.$http.post('/sunmc/cch/onCCH', obj).then(res => { })
    },
    // 隐藏健康告知时，所调方法
    onHideHealth() {
      this.showHealth = false
      this.canScroll()
      if (this.channelCode != '' && this.channelCode != null) {
        this.pointKey = 'V2_' + this.channelName + '_' + this.prdName + '-详情页面_健康告知页'; //需存入session的
        console.log('this.pointKey --->' + this.pointKey);

        //CCH埋点
        this.handleCCH({
          'orgCode': this.orgCode,
          'channelCode': this.channelCode,
          'pageName': this.channelName + this.prdName + '-健康告知页',
          'pointKey': 'V2_' + this.channelName + '_' + this.prdName + '-详情页面_健康告知页_有情况发生',
          'productId': this.$route.query.id,
          'url': window.location.href,
          'policyNo': '',
          'clientInfo': {}
        })
      }
    },
    onSwitchPrdDutylist(data) {
      this.prdDutylist = data.prdStyle.prdDutys
      let index = data.index
      //选项卡切换时,价格变动
      for (var x = 0; x < this.styleList.length; x++) {
        if (index == x) {
          if (this.monthPayType != "" && this.monthPayType != null) {//若有月缴
            var unit = this.monthPayType == 12 ? "/月" : "";
            this.itemData.startPrice = (Number(this.styleList[x].price) / Number(this.monthPayType)) + unit;
            var dcPrice = this.common.accMul(this.styleList[x].price, this.discount);//折扣价格
            this.itemData.disCountPrice = (Number(dcPrice) / Number(this.monthPayType)) + unit;//保留两位小数
          } else {
            this.itemData.startPrice = this.styleList[x].price;
            var dcPrice = this.common.accMul(this.itemData.startPrice, this.discount);//折扣价格
            this.itemData.disCountPrice = dcPrice;//保留两位小数
          }
        }
      }
    },
    // 处理方案数组中的方案名，有相同的只展示一个
    handleTheSameStyleListName() {
      let myArr = []
      this.styleList.forEach(item => {
        if (this.checkMsgNull(this.itemData.compoundComplex)) {
          if (myArr.length > 0) {
            if (!myArr.includes(item.styleName)) {
              myArr.push(item.styleName)
              item.isShow = true
            } else {
              item.isShow = false
            }
          } else {
            myArr.push(item.styleName)
            item.isShow = true
          }
        } else {
          myArr.push(item.styleName)
          item.isShow = true
        }
      })
    },
    getInputAge() {
      this.typeData.forEach(item => {
        if (item.name == '年龄') {
          item.entries.forEach(subItem => {
            if (subItem.isDefault) {
              let head = subItem.value.split('-')[0].replace('岁', '')
              let foot = subItem.value.split('-')[subItem.value.split('-').length - 1].replace('岁', '')
              if (Number(this.inputAge) < Number(head) || Number(this.inputAge) > Number(foot)) {
                this.inputAge = subItem.value.split('-')[0].replace('岁', '')
              }
            }
          })
        }
      })
    },
    // 用户输入完年龄blur的时候所调方法
    handleInputAge() {
      for (let i = 0; i < this.typeData.length; i++) {
        let item = this.typeData[i]
        if (item.name == '年龄') {
          if (!this.checkMsgNull(this.inputAge)) {
            this.inputAge = '0'
          }
          let head = item.entries[0].value.split('-')[0].replace('岁', '')
          let foot = item.entries[item.entries.length - 1].value.split('-')[item.entries[item.entries.length - 1].value.split('-').length - 1].replace('岁', '')
          console.log(head + ' ' + this.inputAge + ' ' + foot)
          if (Number(this.inputAge) < Number(head) || Number(this.inputAge) > Number(foot)) {
            this.onToast('被保人年龄范围是' + head + '-' + foot + '周岁，请重新输入')
            this.getInputAge()
            break
          } else {
            let idx = 0
            item.entries.forEach((subItem, index) => {
              let head = subItem.value.split('-')[0].replace('岁', '')
              let foot = subItem.value.split('-')[subItem.value.split('-').length - 1].replace('岁', '')
              console.log(head + ' ' + this.inputAge + ' ' + foot)
              if (Number(this.inputAge) >= Number(head) && Number(this.inputAge) <= Number(foot)) {
                subItem.isDefault = true
                idx = index
              } else {
                subItem.isDefault = false
              }
            })
            // 将所有方案中的年龄都改成一致
            for (let j = 0; j < this.styleList.length; j++) {
              for (let h = 0; h < this.styleList[j].prdSpecificationCalcs.length; h++) {
                if (this.styleList[j].prdSpecificationCalcs[h].name == '年龄') {
                  for (let w = 0; w < this.styleList[j].prdSpecificationCalcs[h].entries.length; w++) {
                    if (w == idx) {
                      this.styleList[j].prdSpecificationCalcs[h].entries[w].isDefault = true
                    } else {
                      this.styleList[j].prdSpecificationCalcs[h].entries[w].isDefault = false
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.handleProductCalc()
    },
    // 点击是否加购按钮所调方法
    handlePlus() {
      console.log('handlePlus')
      let styleName = ''
      this.styleList.forEach(item => {
        if (this.styleId == item.styleId) {
          styleName = item.styleName
        }
      })
      for (let i = 0; i < this.styleList.length; i++) {
        let item = this.styleList[i]
        if (item.styleName == styleName && this.styleId != item.styleId) {
          this.styleId = item.styleId
          this.policytypeId = item.prdItemId
          this.typeData = item.prdSpecificationCalcs
          this.getInputAge()
          break
        }
      }
      this.handleProductCalc()
    },
    // 产品报价测算接口
    handleProductCalc() {
      this.calcIds = [];
      this.calcIdKeys = [];
      this.typeData.forEach(z => {
        if (z.name == '年龄') {
          this.entries = z.entries
        }
        if (z.name != "是否月缴") {//月缴在前端计算,无需接口测算
          z.entries.forEach(i => {
            if (i.isDefault) {
              this.calcIds.push(i.id);
              this.calcIdKeys.push(z.name);
            }
          });
        }
      });
      //  发送请求 根据选择计算价格
      this.upParams = {
        styleId: this.styleId,
        calcIds: this.calcIds,
        calcIdKeys: this.calcIdKeys
      }
      window.sessionStorage.setItem('entries', JSON.stringify(this.entries))
      window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams))

      //请求后台,实时获取价格
      var params = {
        styleId: this.styleId,
        calcIds: this.calcIds,
      }
      this.$http
        .post("/prdmc/prdmcShop/productCalc", params)
        .then(res => {
          //判断是否月缴
          if (this.monthPayType != "" && this.monthPayType != null) {
            var unit = this.monthPayType == 12 ? "/月" : "";
            this.prdmcShop.price = (Number(res.data.data.price) / Number(this.monthPayType)) + unit;
            var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
            this.prdmcShop.disCountPrice = (Number(dcPrice) / Number(this.monthPayType)) + unit;//四舍五入保留两位小数
            this.priceStore = res.data.data.price;//实时价格,计算月缴时用到
          } else {
            this.prdmcShop.price = res.data.data.price;
            var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
            this.prdmcShop.disCountPrice = dcPrice;//四舍五入保留两位小数
          }
          // 产品报价明细id（prdItemId）改变之后，需要同时修改policytypeId 和 styleList中对应方案里的prdItemId
          this.policytypeId = res.data.data.prdItemId
          this.styleList.forEach(item => {
            if (item.styleId == this.styleId) {
              item.prdItemId = res.data.data.prdItemId
            }
          })
        });
    },
    //隐藏微信菜单
    hideWxOptionMenu() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener("WeixinJSBridgeReady", this.onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady);
        }
      } else {
        this.onBridgeReady();
      }
    },
    onBridgeReady() {
      WeixinJSBridge.call("hideOptionMenu");
    },
    // 判断字符串是否为空
    checkMsgNull(msg) {
      if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
        return true;
      } else {
        return false; 
      }
    },
    getList() {
      this.$http.post("prdmc/prdmcProductDiscount/queryDiscount", {//折扣接口
        productId: this.itemid,
        channelCode: this.channelCode
      }).then(response => {
        if (response.status == 200) {
          if (JSON.stringify(response.data) != '{}') {
            if (response.data.discount != '' && response.data.discount != null) {//折扣不为空
              this.discount = response.data.discount;
            }
            if (response.data.isMonthPay != '' && response.data.isMonthPay != null) {//月缴不为空
              var isMonthPay = JSON.parse(response.data.isMonthPay);
              console.log(JSON.stringify(isMonthPay), 480);
              if (isMonthPay.length > 0) {
                for (var i = 0; i < isMonthPay.length; i++) {
                  var temObj = {};
                  temObj.id = isMonthPay[i].value;
                  temObj.value = isMonthPay[i].key;
                  temObj.isSelected = true;
                  temObj.isDefault = i == 0 ? true : false;
                  this.monthPayEntries.push(temObj);
                  // this.renewMonthPayEntries.push(temObj);
                }
                this.renewMonthPayEntries = this.common.deepCopy(this.monthPayEntries);//必须拷贝一个新数组,否则会影响月缴样式
                this.monthPayType = isMonthPay[0].value;//默认12期
                this.renewMonthPayType = isMonthPay[0].value;//一键续保分期,默认12期
              }
            }
            this.renewInsuranceFlag = response.data.renewInsurance;
            window.sessionStorage.setItem('renewInsuranceFlag', JSON.stringify(this.renewInsuranceFlag));//缓存一键续保标识

            if (this.renewInsuranceFlag != "" && this.renewInsuranceFlag != null) {//若是爱健康一键续保
              this.renewOneClick = true;//显示一键续保按钮
              this.getSpecification("", false);//方案报价接口:参数1传空则返回续保方案报价,年龄区间[0-100]
              this.getSpecification(this.renewInsuranceFlag, true);//参数1不为空,返回新保方案报价,例年龄区间[0-60];参数2 true:表示需要调用产品详情接口
            } else {//其他产品(包括短信续保)
              this.getSpecification(this.renewInsuranceFlag, true);//其他产品:没有续保方案报价,参数this.renewInsuranceFlag为空则返回新保信息
            }
          }
        }
      });
    },
    //方案报价接口(true:表示需要调用产品详情接口)
    getSpecification(renewInsuranceFlag, isNeedProDetail) {
      this.$http
        .post("/prdmc/prdmcShop/productSpecification", {
          id: this.itemid,
          renewInsurance: renewInsuranceFlag,
          channelCode: this.channelCode
        })
        .then(result => {
          // console.log('result.data.data---->'+JSON.stringify(result.data.data));
          //***************************/爱健康一键续保*************************************/
          if (this.renewOneClick && renewInsuranceFlag == "") {
            console.log(JSON.stringify(result), '续保');
            this.renewData = result.data.data;
            this.policytypeIdRenew = result.data.data.prdItemId;

            //续保方案
            this.renewStyleList = this.renewData.prdStyleSpecification;
            // console.log(this.renewStyleList.length);
            // if (this.renewStyleList.length == 1) {//只有一个方案时,赋styleId值
            this.styleIdRenew = this.renewStyleList[0].styleId;//默认取第一个方案值
            // }

            //续保方案选项
            this.renewTypeData = this.renewStyleList[0].prdSpecificationCalcs;
            //截取年龄
            // var index = this.common.indexOfArr(this.renewTypeData,'name','年龄');
            // let renewAgeRange = this.renewTypeData.splice(index,1);
            if (this.renewMonthPayEntries.length > 0 && (this.common.indexOfArr(this.renewTypeData, 'name', '是否月缴') == false)) {//是否月缴
              var monthPay = {
                name: '是否月缴',
                order: this.renewTypeData.length,
                entries: this.renewMonthPayEntries
              };
              this.renewTypeData.push(monthPay);
            }

            //保费显示
            let renewInitPrice = result.data.data.price;
            this.renewPriceStore = renewInitPrice;//赋初始价格
            //判断是否月缴
            if (this.renewMonthPayType != "" && this.renewMonthPayType != null) {
              var unit = this.renewMonthPayType == 12 ? "/月" : "";
              this.renewData.price = (Number(renewInitPrice) / Number(this.renewMonthPayType)) + unit;
              var dcPrice = this.common.accMul(renewInitPrice, this.discount);//折扣价格
              this.renewData.disCountPrice = (Number(dcPrice) / Number(this.renewMonthPayType)) + unit;//保留两位小数
            } else {
              this.renewData.price = renewInitPrice;
              var dcPrice = this.common.accMul(renewInitPrice, this.discount);//折扣价格
              this.renewData.disCountPrice = dcPrice;//保留两位小数
            }

            let calcIds = [];
            let calcIdKeys = [];
            this.renewTypeData.forEach(z => {
              if (z.name == '年龄') {
                this.entriesRenew = z.entries
              }
              z.entries.forEach(i => {
                if (i.isDefault) {
                  calcIds.push(i.id);
                  calcIdKeys.push(z.name);
                }
              });
            });

            this.upParamsRenew = {
              styleId: this.styleIdRenew,
              calcIds: calcIds,
              calcIdKeys: calcIdKeys
            }
            console.log("this.upParamsRenew==>" + JSON.stringify(this.upParamsRenew));
            window.sessionStorage.setItem('upParams', JSON.stringify(this.upParamsRenew));//若用户不点击,则取此缓存数据

          } else {
            //******************************/新保************************************/
            console.log(JSON.stringify(result), '新保');
            this.policytypeId = result.data.data.prdItemId;
            this.prdmcShop = result.data.data;
            let initPrice = result.data.data.price;
            this.priceStore = initPrice;//赋初始价格

            //判断是否月缴
            if (this.monthPayType != "" && this.monthPayType != null) {
              var unit = this.monthPayType == 12 ? "/月" : "";
              this.prdmcShop.price = (Number(initPrice) / Number(this.monthPayType)) + unit;
              var dcPrice = this.common.accMul(initPrice, this.discount);//折扣价格
              this.prdmcShop.disCountPrice = (Number(dcPrice) / Number(this.monthPayType)) + unit;//保留两位小数
            } else {
              this.prdmcShop.price = initPrice;
              var dcPrice = this.common.accMul(initPrice, this.discount);//折扣价格
              this.prdmcShop.disCountPrice = dcPrice;//保留两位小数
            }

            this.styleList = this.prdmcShop.prdStyleSpecification;

            if (this.styleList.length > 0) {
              this.policytypeId = this.styleList[0].prdItemId;
              this.styleId = this.styleList[0].styleId;
              this.typeData = this.styleList[0].prdSpecificationCalcs;
              this.getInputAge()
            }

            this.styleList.forEach((item, itemindex) => {
              this.detailslist = item;
              item.prdSpecificationCalcs.forEach(item => {
                if (item.entries.length > 2) {
                  item.entries.forEach(items => {
                    if (items.isDefault) {
                      item.selectValue = items.id; //下拉框设置默认值
                    }
                  });
                }
              });
            });

            if (this.monthPayEntries.length > 0 && (this.common.indexOfArr(this.typeData, 'name', '是否月缴') == false)) {//是否月缴
              var monthPay = {
                name: '是否月缴',
                order: this.typeData.length,
                entries: this.monthPayEntries
              };
              this.typeData.push(monthPay);
            }

            let calcIds = [];
            let calcIdKeys = [];
            this.typeData.forEach(z => {
              // console.log('z---->'+JSON.stringify(z));
              if (z.name == '年龄') {
                this.entries = z.entries
              }
              if (z.name == '社保情况') {
                this.sheBaoEntries = z.entries
              }
              if (z.name == '性别') {
                this.sexEntries = z.entries
              }
              if (z.name != "是否月缴") {//月缴在前端计算,无需接口测算
                z.entries.forEach(i => {
                  if (i.isDefault) {
                    calcIds.push(i.id);
                    calcIdKeys.push(z.name);
                  }
                });
              }
            });
            this.upParams = {
              styleId: this.styleId,
              calcIds: calcIds,
              calcIdKeys: calcIdKeys
            }
            console.log("this.upParams==>" + JSON.stringify(this.upParams));
            window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams))
          }

          //调用产品详情接口
          if (isNeedProDetail) {
            this.getProductDetail();
          }
        });
    },
    //产品详情接口
    getProductDetail() {
      this.$http.post("/prdmc/prdmcShop/productDetail", {
        productId: this.itemid,
        orgCode: this.orgCode
      }).then(res => {
        this.loadingVisible = false
        this.itemData = res.data.data;
        /* 处理方案名称相同的方案数组 start */
        let myArr = []
        this.itemData.prdStyles.forEach((item, index) => {
          if (index === 0) {
            this.currentStyleName = item.styleName // 默认为第一个方案的名称
          }
          if (this.checkMsgNull(this.itemData.compoundComplex)) {
            if (myArr.length > 0) {
              if (!myArr.includes(item.styleName)) {
                myArr.push(item.styleName)
                item.isShow = true
              } else {
                item.isShow = false
              }
            } else {
              myArr.push(item.styleName)
              item.isShow = true
            }
          } else {
              myArr.push(item.styleName)
              item.isShow = true
          }
        })
        /* 处理方案名称相同的方案数组 end */
        this.handleTheSameStyleListName()
        this.prdImgs = this.itemData.prdImgs
        this.insurances = this.itemData.insurances
        var customerService = this.itemData.customerService
        if (this.checkMsgNull(customerService)) {
          this.customerService = customerService
        }
        if (this.itemData.giveInsurance != null) {
          this.giveInsurance = this.itemData.giveInsurance
        }
        if (this.checkMsgNull(this.itemData.prdTheme)) {
          this.prdTheme = this.itemData.prdTheme
        }
        if (this.checkMsgNull(this.itemData.prdVersion)) {
          this.prdVersion = this.itemData.prdVersion
        }
        if (this.checkMsgNull(this.itemData.customerLogo)) {
          this.customerLogo = this.itemData.customerLogo
        }
        console.log(JSON.stringify(this.styleList));
        if (this.styleList.length > 0) {
          //判断是否月缴
          if (this.monthPayType != "" && this.monthPayType != null) {
            var unit = this.monthPayType == 12 ? "/月" : "";
            this.itemData.startPrice = (Number(this.styleList[0].price) / Number(this.monthPayType)) + unit;
            var dcPrice = this.common.accMul(this.styleList[0].price, this.discount);//折扣价格
            this.itemData.disCountPrice = (Number(dcPrice) / Number(this.monthPayType)) + unit;//保留两位小数
          } else {
            this.itemData.startPrice = this.styleList[0].price;
            var dcPrice = this.common.accMul(this.styleList[0].price, this.discount);//折扣价格
            this.itemData.disCountPrice = dcPrice;//保留两位小数
          }
        }
        this.productEndDate = this.itemData.productEndDate;

        if (this.itemData.status == 1) {//若产品状态正常
          if (this.productEndDate != '' && this.productEndDate != null) {
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(this.productEndDate.replace(new RegExp(/-/gm), "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//产品结束日期小于当前日期
              this.status = 0;
            }
          }
        } else {
          this.status = 0;
        }

        this.healths = res.data.data.healths;// 健康告知
        this.prdDutylist = this.itemData.prdStyles[0].prdDutys;// 产品责任集合
        this.introduce = this.itemData.introduce;// 产品介绍图片
        this.spreadtion = this.itemData.spread;// 备用字段
        if (this.spreadtion == "" || this.spreadtion == null) {
          this.popupVisibleFirst = false;
        } else {
          this.popupVisibleFirst = "";
        }

        //详细说明下方协议的数据
        this.itemData.insurances.forEach(item => {
          if (item.type == 1 || item.type == 3 || item.type == 5 || item.type == 9) {
            this.detailList.push(item);
          } else if (item.type == 6) {
            this.process.push(item);
          }
        });
        this.prdName = this.itemData.prdName; //产品名称
        this.prdListImg = this.itemData.prdListImg;
        console.log(this.itemData);

        //若channelCode不为空,则执行埋点
        if (this.channelCode != '' && this.channelCode != null) {
          //获取appkey及channelName
          this.getChannelAndAppkey((res) => {
            this.channelName = res.data.channelName;
            // CCH埋点
            this.pointKey = 'V2_' + this.channelName + '_' + this.prdName + '-详情页面';//事件中文
            this.handleCCH({
              'orgCode': this.orgCode,
              'channelCode': this.channelCode,
              'pageName': this.channelName + this.prdName + '-详情页',
              'pointKey': this.pointKey,
              'productId': this.$route.query.id,
              'url': window.location.href,
              'policyNo': '',
              'clientInfo': {}
            })
          })

        }
        //设置页面标题
        Jquery(document).find('title').text(this.prdName);

        //微信分享
        if (this.itemData.sharedConfig.sharedTitle != '' && this.itemData.sharedConfig.sharedLogo != '' && this.itemData.sharedConfig.sharedContent != '') {
          var host = window.location.host;
          if (this.openid != null && this.openid != "") {
            var shareUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxda60d81e7d4a1ac6&redirect_uri=http%3A%2F%2Ftestcmspay.sinosig.com%2Fpays%2Fpaymentinterface%2FgetWeChatOpenid%3Fmerchantno%3D1487068902%26backurl%3Dhttp%253A%252F%252F" + host + "%252F%2523%252FProduct%252FProDetails%253Fid%253D" + this.itemid + "%2526channelCode%253D" + this.channelCode + "%2526orgCode%253D" + this.orgCode + "&response_type=code&scope=snsapi_base&agentid=AGENTID&state=STATE#wechat_redirect";
          } else {
            var shareUrl = window.location.href;
          }
          var link = window.location.href.split('#')[0] + "static/html/redirect.html?shareurl=" + encodeURIComponent(shareUrl);
          console.log(link);
          var data = {
            title: this.itemData.sharedConfig.sharedTitle,
            desc: this.itemData.sharedConfig.sharedContent,
            link: link,
            imgUrl: this.itemData.sharedConfig.sharedLogo,
          };
          this.WXConfig.weChatShare(JSON.stringify(data));//调用微信分享功能
        } else {
          this.hideWxOptionMenu();//隐藏微信分享按钮
        }
      }).catch(e => {
        console.log(e)
        this.onToast(e.response.data.msg)
      });
    },
    //一键续保
    toRenewInsur() {
      this.renewOneClickShade = true;
      if (this.channelCode != '' && this.channelCode != null) {
        console.log('this.pointKey --->' + this.pointKey + '_一键续保');
        // toccH 埋点
        this.handleCCH({
          'orgCode': this.orgCode,
          'channelCode': this.channelCode,
          'pageName': this.channelName + this.prdName + '-详情页',
          'pointKey': this.pointKey + '_一键续保',
          'productId': this.$route.query.id,
          'url': window.location.href,
          'policyNo': '',
          'clientInfo': {}
        })
      }
    },
    toinsur() {
      this.toInsureShade = true;
      if (this.channelCode != '' && this.channelCode != null) {
        console.log('this.pointKey --->' + this.pointKey + '_立即投保');
        // toccH 埋点
        this.handleCCH({
          'orgCode': this.orgCode,
          'channelCode': this.channelCode,
          'pageName': this.channelName + this.prdName + '-详情页',
          'pointKey': this.pointKey + '_立即投保',
          'productId': this.$route.query.id,
          'url': window.location.href,
          'policyNo': '',
          'clientInfo': {}
        })

        //转化数据API对接
        this.platformOCPC();
      }

      if (this.typeData.length == 0) { // 如果已经请求过就不在请求。。。。
        this.getSpecification(this.renewInsuranceFlag, false);
      } else {
      }
    },
    shadowClose(type) {
      if (type == 'insure')
        this.toInsureShade = false;
      else
        this.renewOneClickShade = false;
    },
    //点击方案
    handletype(value, prdItemId, styleId, price, index, isRenewInsurance) {
      this.itemData.prdStyles.forEach((item, i) => { // 改变所选方案名称
        if (index === i) {
          this.currentStyleName = item.styleName
        }
      })
      let finalStyleId;
      let calcIds = [];
      if (isRenewInsurance) {//一键续保
        this.renewTypeData = value;
        this.styleActiveIndexB = index;//改变方案名称选中样式
        if (this.renewMonthPayEntries.length > 0 && (this.common.indexOfArr(this.renewTypeData, 'name', '是否月缴') == false)) {//是否月缴
          var monthPay = {
            name: '是否月缴',
            order: this.renewTypeData.length,
            entries: this.renewMonthPayEntries
          };
          this.renewTypeData.push(monthPay);
        }

        this.styleIdRenew = styleId;
        this.policytypeIdRenew = prdItemId;
        let calcIdKeys = [];
        this.renewTypeData.forEach(z => {
          if (z.name == '年龄') {
            this.entries = z.entries
          }
          if (z.name != "是否月缴") {//月缴在前端计算,无需接口测算
            z.entries.forEach(i => {
              if (i.isDefault) {
                calcIds.push(i.id);
                calcIdKeys.push(z.name);
              }
            });
          }
        });
        //若存在根据身份证号测算出的年龄区间,则更改数组中原年龄区间的id
        if (this.calculateAgeId != "" && this.calculateAgeId != null) {
          calcIds[this.calculateAgeIndex] = this.calculateAgeId;
        }
        this.upParamsRenew = {
          styleId: this.styleIdRenew,
          calcIds: calcIds,
          calcIdKeys: calcIdKeys
        }
        finalStyleId = this.styleIdRenew;
        window.sessionStorage.setItem('upParams', JSON.stringify(this.upParamsRenew))

      } else {//新保
        this.typeData = value;
        this.styleActiveIndexA = index;//改变方案名称选中样式

        if (this.monthPayEntries.length > 0 && (this.common.indexOfArr(this.typeData, 'name', '是否月缴') == false)) {//是否月缴
          var monthPay = {
            name: '是否月缴',
            order: this.typeData.length,
            entries: this.monthPayEntries
          };
          this.typeData.push(monthPay);
        }

        this.styleId = styleId;
        this.policytypeId = prdItemId;
        this.getInputAge()
        let calcIdKeys = [];
        this.typeData.forEach(z => {
          if (z.name == '年龄') {
            this.entries = z.entries
          }
          if (z.name == '社保情况') {
            this.sheBaoEntries = z.entries
          }
          if (z.name == '性别') {
            this.sexEntries = z.entries
          }
          if (z.name != "是否月缴") {//月缴在前端计算,无需接口测算
            z.entries.forEach(i => {
              if (i.isDefault) {
                calcIds.push(i.id);
                calcIdKeys.push(z.name);
              }
            });
          }

        });

        this.upParams = {
          styleId: this.styleId,
          calcIds: calcIds,
          calcIdKeys: calcIdKeys
        }
        finalStyleId = this.styleId;
        window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams))
      }

      //请求后台,实时获取价格
      var params = {
        styleId: finalStyleId,
        calcIds: calcIds,
      }

      this.$http
        .post("/prdmc/prdmcShop/productCalc", params)
        .then(res => {
          if (isRenewInsurance) {//一键续保
            //判断是否月缴
            this.renewPriceStore = res.data.data.price;//实时价格,计算月缴时用到
            if (this.renewMonthPayType != "" && this.renewMonthPayType != null) {
              var unit = this.renewMonthPayType == 12 ? "/月" : "";
              this.renewData.price = (Number(res.data.data.price) / Number(this.renewMonthPayType)) + unit;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.renewData.disCountPrice = (Number(dcPrice) / Number(this.renewMonthPayType)) + unit;//四舍五入保留两位小数
            } else {
              this.renewData.price = res.data.data.price;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.renewData.disCountPrice = dcPrice;//四舍五入保留两位小数
            }
          } else {
            //判断是否月缴
            this.priceStore = res.data.data.price;//实时价格,计算月缴时用到
            if (this.monthPayType != "" && this.monthPayType != null) {
              var unit = this.monthPayType == 12 ? "/月" : "";
              this.prdmcShop.price = (Number(res.data.data.price) / Number(this.monthPayType)) + unit;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.prdmcShop.disCountPrice = (Number(dcPrice) / Number(this.monthPayType)) + unit;//四舍五入保留两位小数
            } else {
              this.prdmcShop.price = res.data.data.price;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.prdmcShop.disCountPrice = dcPrice;//四舍五入保留两位小数
            }
          }
          // 产品报价明细id（prdItemId）改变之后，需要同时修改policytypeId 和 styleList中对应方案里的prdItemId
          this.policytypeId = res.data.data.prdItemId
          this.styleList.forEach(item => {
            if (item.styleId == this.styleId) {
              item.prdItemId = res.data.data.prdItemId
            }
          })
        });

    },

    handleClick(items, id, styleId, isRenewInsurance) {
      // console.log(JSON.stringify(items));
      let finalStyleId;
      let calcIds = [];
      if (isRenewInsurance) {//一键续保
        this.styleIdRenew = styleId;
        let calcIdKeys = [];
        if (items.length > 0) {//改变样式
          for (let k = 0; k < items.length; k++) {
            if (items[k].id == id) {
              items[k].isDefault = true;
            } else {
              items[k].isDefault = false;
            }
          }
        }

        this.renewTypeData.forEach(z => {
          if (z.name != "是否月缴") {//月缴在前端计算,无需接口测算
            z.entries.forEach(i => {
              if (i.isDefault) {
                calcIds.push(i.id);
                calcIdKeys.push(z.name);
              }
            });
          }
        });
        //续保：若存在根据身份证号测算出的年龄区间,则更改数组中原年龄区间的id
        if (this.calculateAgeId != "" && this.calculateAgeId != null) {
          calcIds[this.calculateAgeIndex] = this.calculateAgeId;
        }

        this.upParamsRenew = {
          styleId: this.styleIdRenew,
          calcIds: calcIds,
          calcIdKeys: calcIdKeys
        };
        finalStyleId = this.styleIdRenew;
        console.log('upParamsRenew=====>' + JSON.stringify(this.upParamsRenew));
        window.sessionStorage.setItem('upParams', JSON.stringify(this.upParamsRenew))
      } else {//新保
        this.styleId = styleId;
        let calcIdKeys = [];
        if (items.length > 0) {
          for (let k = 0; k < items.length; k++) {
            if (items[k].id == id) {
              items[k].isDefault = true;
            } else {
              items[k].isDefault = false;
            }
          }
        }

        this.typeData.forEach(z => {
          if (z.name != "是否月缴") {//月缴在前端计算,无需接口测算
            z.entries.forEach(i => {
              if (i.isDefault) {
                calcIds.push(i.id);
                calcIdKeys.push(z.name);
              }
            });
          }
        });

        this.upParams = {
          styleId: this.styleId,
          calcIds: calcIds,
          calcIdKeys: calcIdKeys
        };
        finalStyleId = this.styleId;
        console.log('upParams=====>' + JSON.stringify(this.upParams));
        window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams))
      }

      //  发送请求 根据选择计算价格
      var param = {
        styleId: finalStyleId,
        calcIds: calcIds,
      }
      this.$http
        .post("/prdmc/prdmcShop/productCalc", param)
        .then(res => {
          if (isRenewInsurance) {//若是一键续保
            this.policytypeIdRenew = res.data.data.prdItemId;
            this.renewPriceStore = res.data.data.price;//实时价格,计算月缴时用到
            //判断是否月缴
            if (this.renewMonthPayType != "" && this.renewMonthPayType != null) {
              var unit = this.renewMonthPayType == 12 ? "/月" : "";
              this.renewData.price = (Number(res.data.data.price) / Number(this.renewMonthPayType)) + unit;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.renewData.disCountPrice = (Number(dcPrice) / Number(this.renewMonthPayType)) + unit;//保留两位小数
            } else {
              this.renewData.price = res.data.data.price;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.renewData.disCountPrice = dcPrice;//保留两位小数
            }
          } else {
            this.policytypeId = res.data.data.prdItemId;
            this.priceStore = res.data.data.price;//实时价格,计算月缴时用到
            //判断是否月缴
            if (this.monthPayType != "" && this.monthPayType != null) {
              var unit = this.monthPayType == 12 ? "/月" : "";
              this.prdmcShop.price = (Number(res.data.data.price) / Number(this.monthPayType)) + unit;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.prdmcShop.disCountPrice = (Number(dcPrice) / Number(this.monthPayType)) + unit;//保留两位小数
            } else {
              this.prdmcShop.price = res.data.data.price;
              var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
              this.prdmcShop.disCountPrice = dcPrice;//保留两位小数
            }
          }
          // 产品报价明细id（prdItemId）改变之后，需要同时修改policytypeId 和 styleList中对应方案里的prdItemId
          this.policytypeId = res.data.data.prdItemId
          this.styleList.forEach(item => {
            if (item.styleId == this.styleId) {
              item.prdItemId = res.data.data.prdItemId
            }
          })
        });

    },
    //月缴处理
    monthHandleClick(items, id, isRenewInsurance) {
      var unit = id == 12 ? "/月" : "";
      //改变样式
      if (items.length > 0) {
        for (let k = 0; k < items.length; k++) {
          if (items[k].id == id) {
            items[k].isDefault = true;
          } else {
            items[k].isDefault = false;
          }
        }
      }

      if (isRenewInsurance) {//一键续保
        this.renewMonthPayType = id;
        if (this.renewPriceStore != "" && this.renewPriceStore != null) {
          this.renewData.price = (Number(this.renewPriceStore) / Number(id)) + unit;
          var dcPrice = this.common.accMul(this.renewPriceStore, this.discount);
          this.renewData.disCountPrice = (Number(dcPrice) / Number(id)) + unit;
        }
      } else {//新保
        this.monthPayType = id;
        if (this.priceStore != "" && this.priceStore != null) {
          this.prdmcShop.price = (Number(this.priceStore) / Number(id)) + unit;
          var dcPrice = this.common.accMul(this.priceStore, this.discount);
          this.prdmcShop.disCountPrice = (Number(dcPrice) / Number(id)) + unit;
        }
      }
    },
    closetransition() {
      this.popupVisibleFirst = false;
    },

    //测算报价
    changeDataInfo(value) {
      if (!this.checkFieldCommon(value, '身份证')) {
        return;
      }
    },
    //点击继续续保
    renewInsurance(renewObj) {
      //校验
      let strArr = { name: '姓名', id: '身份证' };
      if (JSON.stringify(renewObj) != '{}') {
        for (var key in renewObj) {
          if (!this.checkFieldCommon(renewObj[key], strArr[key])) {
            return;
          };
        }
      }
      window.sessionStorage.setItem('currentStyleName', this.currentStyleName)
      window.sessionStorage.setItem('customerService', this.customerService)
      window.sessionStorage.setItem('customerLogo', this.customerLogo)
      window.sessionStorage.setItem('prdTheme', this.prdTheme)
      //续保核心接口
      let inputParams = {
        insuredCardNo: renewObj.id, 
        insuredName: renewObj.name,
        itemId: this.policytypeIdRenew
      };
      this.loadingVisible = true;
      this.$http.post('/sunmc/xubaoHexin/isCompareXubao', inputParams).then(result => {
        // console.log(JSON.stringify(result));
        if (result.status == 200) {
          if (result.data.status == "10002") {//可续保

            window.sessionStorage.setItem('productEndDate', this.productEndDate);
            window.sessionStorage.setItem('channelName', this.channelName);
            window.sessionStorage.setItem('pointKey', this.pointKey);
            window.sessionStorage.setItem('productId', this.$route.query.id);
            window.sessionStorage.setItem('urlParam', this.urlParam);
            window.sessionStorage.setItem('discount', this.discount);//折扣
            window.sessionStorage.setItem('monthPayType', this.renewMonthPayType);//月缴
            window.sessionStorage.setItem('styleId', this.styleIdRenew)//方案ID
            window.sessionStorage.setItem('entries', JSON.stringify(this.entriesRenew))//一键续保年龄区间

            //存储上年保单信息
            let xubaoInfo = result.data.data.xubaoInfo;
            window.sessionStorage.setItem('isRenewOneClick', this.renewOneClick);//是否是一键续保
            window.sessionStorage.setItem('insuredDtoList', JSON.stringify(xubaoInfo.insuredDtoList));//被保人
            window.sessionStorage.setItem('holderDto', JSON.stringify(xubaoInfo.holderDto));//投保人
            window.sessionStorage.setItem('xubaoStartDate', result.data.data.xubaoStartDate);//续保开始日期
            window.sessionStorage.setItem('xubaoEndDate', result.data.data.xubaoEndDate);//续保结束日期
            window.sessionStorage.setItem('oldpolicyNoUnid', result.data.unid);//上年保单号标识

            this.$router.push({//跳转
              path: "/xubaoProInsur",
              query: {
                id: this.policytypeIdRenew,
                channelCode: this.channelCode,
                orgCode: this.orgCode,
                openid: this.openid,//接收不到数据,不会传至下一页面
              }
            });
          } else if (result.data.status == "10005") {
            this.loadingVisible = false;
            this.renewInsurResultPop.isShow = true;
            this.renewInsurResultPop.message = result.data.msg;
            // this.renewInsurResultPop.link2018 = "/#/Product/ProDetails?id=179&channelCode=DC14GD0100030004&orgCode=YGHB";//跳转至2018版一键续保
            return;
          } else {//不符合条件
            this.loadingVisible = false;
            this.onToast(result.data.msg)
            return;
          }
        } else {
          this.loadingVisible = false;
          this.onToast("接口状态异常" + result.status)
          return;
        }

      }).catch(e => {
        console.log(e)
        this.loadingVisible = false;
        this.onToast(JSON.stringify(e))
        return;
      });

    },

    //一键续保通用校验
    checkFieldCommon(field, str) {
      if (field == undefined || field == "" || field.trim().length == 0) {
        this.onToast("请输入上年被保险人" + str)
        return false;
      } else {
        if (str == '身份证') {
          if (!this.common.shenfenzheng(field)) {
            this.onToast("被保险人身份证号格式不正确")
            return false;
          } else {//测算年龄
            let startDate = new Date();//取当前时间
            let age = this.common.GetAge(field, startDate, '1');
            let day = this.common.GetDay(field, startDate, '1');
            console.log(age, 'age');
            console.log(day, 'day');
            let result = this.getCalculatedPrice(age, day);//根据年龄计算保费
            if (!result) {
              return false;
            } else {
              return true;
            }
          }
        }
        return true;
      }
    },
    nowToPay() {//确认投保
      //判断产品是否过期或下架
      if (this.status == 0) {
        this.onToast("系统维护中！")
        return;
      }

      if (this.channelCode == '' || this.channelCode == null) {//若channelCode为空
        this.onToast("系统维护中！")
        return;

      } else {
        console.log('this.pointKey --->' + 'V2_' + this.channelName + '_' + this.prdName + '-详情页面_立即投保_确认投保');
        //CCH埋点
        this.handleCCH({
          'orgCode': this.orgCode,
          'channelCode': this.channelCode,
          'pageName': this.channelName + this.prdName + '-投保方案选择页',
          'pointKey': 'V2_' + this.channelName + '_' + this.prdName + '-详情页面_立即投保_确认投保',
          'productId': this.$route.query.id,
          'url': window.location.href,
          'policyNo': '',
          'clientInfo': {}
        })
      }

      console.log(this.healths.length);//结果为1
      console.log(this.isXubao, 'isXubao');
      //健康页面
      if (this.healths.length != 0 && this.isXubao != 1) {//有健康告知并且不是续保
        this.showHealth = true;//则显示健康告知页
        this.noScroll()
      } else {//没有健康告知页的情况
        this.showHealth = false;
        window.sessionStorage.setItem('productEndDate', this.productEndDate);
        window.sessionStorage.setItem('channelName', this.channelName);
        window.sessionStorage.setItem('pointKey', this.pointKey);//是对的 只精确到页面名称
        window.sessionStorage.setItem('productId', this.$route.query.id);
        window.sessionStorage.setItem('urlParam', this.urlParam);
        window.sessionStorage.setItem('discount', this.discount);//折扣
        window.sessionStorage.setItem('monthPayType', this.monthPayType);//月缴
        window.sessionStorage.setItem('styleId', this.styleId)//方案ID
        window.sessionStorage.setItem('entries', JSON.stringify(this.entries))//年龄区间
        window.sessionStorage.setItem('sheBaoEntries', JSON.stringify(this.sheBaoEntries))//社保区间
        window.sessionStorage.setItem('sexEntries', JSON.stringify(this.sexEntries))//性别区间

        let path = ''
        if (this.isXubao == 1) {
          path = "/xubaoProInsur";//续保页面
        } else {
          path = "/ProInsur";//正常投保页面
        }

        this.$router.push({
          path: path,
          query: {
            prdId: this.itemid,
            styleId: this.styleList[this.styleActiveIndexA].styleId,
            id: this.policytypeId,
            channelCode: this.channelCode,
            orgCode: this.orgCode,
            oldPolicyNo: this.oldPolicyNo,//接收不到数据,不会传至下一页面
            openid: this.openid,
          }
        });
      }
    },
    //有健康告知页-点击以上情况全无,
    healthye() {
      this.pointKey = 'V2_' + this.channelName + '_' + this.prdName + '-详情页面_健康告知页'; //需要存入session的
      console.log('this.pointKey --->' + this.pointKey);
      this.canScroll()
      this.showHealth = false;
      //CCH埋点
      this.handleCCH({
        'orgCode': this.orgCode,
        'channelCode': this.channelCode,
        'pageName': this.channelName + this.prdName + '-健康告知页',
        'pointKey': 'V2_' + this.channelName + '_' + this.prdName + '-详情页面_健康告知页_以上情况全无',
        'productId': this.$route.query.id,
        'url': window.location.href,
        'policyNo': '',
        'clientInfo': {}
      })

      window.sessionStorage.setItem('productEndDate', this.productEndDate);
      window.sessionStorage.setItem('channelName', this.channelName);
      window.sessionStorage.setItem('pointKey', this.pointKey);
      window.sessionStorage.setItem('productId', this.$route.query.id);
      window.sessionStorage.setItem('urlParam', this.urlParam);
      window.sessionStorage.setItem('discount', this.discount);//折扣
      window.sessionStorage.setItem('monthPayType', this.monthPayType);//月缴
      window.sessionStorage.setItem('styleId', this.styleId)//方案ID
      window.sessionStorage.setItem('entries', JSON.stringify(this.entries))//年龄区间
      window.sessionStorage.setItem('sheBaoEntries', JSON.stringify(this.sheBaoEntries))//社保区间
      window.sessionStorage.setItem('sexEntries', JSON.stringify(this.sexEntries))//性别区间

      this.$router.push({
        path: "/ProInsur",
        query: {
          id: this.policytypeId,
          channelCode: this.channelCode,
          orgCode: this.orgCode,
          oldPolicyNo: this.oldPolicyNo, //接收不到数据,不会传至下一页面
          openid: this.openid,
        }
      });
    },
    //一键续保：根据年龄计算保费
    getCalculatedPrice(age, day) {
      if (this.entriesRenew && this.entriesRenew.length > 0) {
        var isContentAge = false;
        for (var i = 0; i < this.entriesRenew.length; i++) {
          var entry = this.entriesRenew[i]
          // console.log('entry====>'+JSON.stringify(entry));
          if (this.common.isContent(entry.value, age, day)) {//true
            isContentAge = true;
            var l = this.common.getAgeIndex(this.upParamsRenew);
            this.upParamsRenew.calcIds[l] = entry.id;
            this.calculateAgeIndex = l;
            this.calculateAgeId = entry.id;
            // console.log(JSON.stringify(this.upParamsRenew),1482);
            var param = {
              styleId: this.upParamsRenew.styleId,
              calcIds: this.upParamsRenew.calcIds,
            }
            console.log('upParamsRenew===发送==>' + JSON.stringify(param));
            this.$http
              .post("/prdmc/prdmcShop/productCalc", param)
              .then(res => {
                if (res.data.code == '200') {
                  this.policytypeIdRenew = res.data.data.prdItemId;
                  this.renewPriceStore = res.data.data.price;//存储根据身份证号测算出的价格
                  if (this.renewMonthPayType != "" && this.renewMonthPayType != null) {
                    var unit = this.renewMonthPayType == 12 ? "/月" : "";
                    this.renewData.price = (Number(res.data.data.price) / Number(this.renewMonthPayType)) + unit;
                    var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
                    this.renewData.disCountPrice = (Number(dcPrice) / Number(this.renewMonthPayType)) + unit;//保留两位小数
                  } else {
                    this.renewData.price = res.data.data.price;
                    var dcPrice = this.common.accMul(res.data.data.price, this.discount);//折扣价格
                    this.renewData.disCountPrice = dcPrice;//保留两位小数
                  }
                }
              });
            break;
          }
        }

        if (!isContentAge) {
          this.onToast("上年被保险人年龄不再投保区间内")
          return false;
        } else {
          return true;
        }
      }
    },
    gotoRenewInsurance2018() {
      this.$router.push({//2018版一键续保链接
        path: "/Product/ProDetails",
        query: {
          id: 92,
          channelCode: "DC14GD0100030004",
          orgCode: "YGHB",
        }
      });
      window.location.reload();//不刷新不跳转
    },
    test() {
      window.sessionStorage.setItem('currentStyleName', this.currentStyleName)
      window.sessionStorage.setItem('customerService', this.customerService)
      window.sessionStorage.setItem('customerLogo', this.customerLogo)
      window.sessionStorage.setItem('prdTheme', this.prdTheme)
      this.nowToPay();
    },
    showContent(value, content) {
      if (!value) {
        this.popupVisibledetail = "";
        this.maskcontent = content;
      } else {
        window.location.href = content;
      }
    },
    // 下载
    down() { },
    share(itemid, itemcode) {
      this.$router.push({
        name: "productshare",
        params: { itemid: this.itemid, itemcode: this.channelCode }
      });
    },
    //选项卡的事件
    myWealth() {
      this.orderState = 0;
    },
    History() {
      this.orderState = 1;
    },
    record() {
      this.orderState = 2;
    },
    chenge(prdDutys, i, index) {
      this.backs = index;
      this.prdDutylist = prdDutys;
      //选项卡切换时,价格变动
      //      console.log(JSON.stringify(this.itemData));
      // console.log(JSON.stringify(this.styleList));
      for (var x = 0; x < this.styleList.length; x++) {
        if (index == x) {
          if (this.monthPayType != "" && this.monthPayType != null) {//若有月缴
            var unit = this.monthPayType == 12 ? "/月" : "";
            this.itemData.startPrice = (Number(this.styleList[x].price) / Number(this.monthPayType)) + unit;
            var dcPrice = this.common.accMul(this.styleList[x].price, this.discount);//折扣价格
            this.itemData.disCountPrice = (Number(dcPrice) / Number(this.monthPayType)) + unit;//保留两位小数
          } else {
            this.itemData.startPrice = this.styleList[x].price;
            var dcPrice = this.common.accMul(this.itemData.startPrice, this.discount);//折扣价格
            this.itemData.disCountPrice = dcPrice;//保留两位小数
          }
        }
      }
    },
    getAd() {
      this.$http.post("prdmc/prdmcShop/getADByProductIdAndOrgId", {
        productId: this.itemid,
        orgCode: this.orgCode,
      }).then(res => {
        if (res.data.code == 200000) {
          this.adList = res.data.data
        }
      })
    },
    //转化数据API对接
    platformOCPC(){
      let url = window.location.href;

      /*************百度搜索、信息流API(根据DC码区分)*************/
      if(this.channelCode === 'DC21MD0200050001'){//百度搜索
        let baiduParams = {
          data:{
            callback:url,
            eventType:7,//购买按钮点击(仅支持搜索推广)
          },
          dcCode:this.channelCode
        };
        this.usePlatformAPI(baiduParams);
      }
      if(this.channelCode === 'DC21MD0200050008'){//百度信息流
        let baiduParams = {
          data:{
            callback:url + "&bd_vid={{BD_VID}}",
            eventType:3,//表单提交成功(搜索推广,信息流推广都支持)
          },
          dcCode:this.channelCode
        };
        this.usePlatformAPI(baiduParams);
      }
      /************************抖音头条****************************/
      
      if(this.channelCode === "DC21MD1110040002"){
        // let clickid = this.common.getUrlValueByName('clickid');//在url中获取clickid值
        let douyinParams = {
          data:{
            callback:encodeURIComponent(url),
            eventType:3//表单提交
          },
          dcCode:this.channelCode
        }
        this.usePlatformAPI(douyinParams);
      }

      /***************************快手****************************/
      if(this.channelCode === "DC21AD1110040001"){
        let callback = this.common.getUrlValueByName('callback');//在url中获取callback值
        let kuaishouParams = {
          data:{
            callback:callback
          },
          dcCode:this.channelCode
        }
        this.usePlatformAPI(kuaishouParams);

      }
    },
    usePlatformAPI(params){
      this.$http.post("/sunmc/buryingpointController/sendBuriedPoint",params)
      .then(result=>{
        if(result.data.code == 200){
          if(params.dcCode === 'DC21MD0200050001'){//百度搜索
            this.baiduSearchCount++;
            console.log('转数API-百度搜索'+result.data.msg+'--成功次数'+this.baiduSearchCount);
          }else if(params.dcCode === 'DC21MD0200050008'){//百度信息流
            this.baiduInforFlowCount++;
            console.log('转数API-百度信息流'+result.data.msg+'--成功次数'+this.baiduInforFlowCount);
          }else if(params.dcCode === 'DC21MD1110040002'){
            this.douyinCount++;
            console.log('转数API-抖音'+result.data.msg+'--成功次数'+this.douyinCount);
          }else if(params.dcCode === 'DC21AD1110040001'){
            this.kuaishouCount++;
            console.log('转数API-快手'+result.data.msg+'--成功次数'+this.kuaishouCount);
          }
          
        }else{
          console.log('转数API--'+params.dcCode +'--'+"状态"+result.data.code +'--'+ result.data.msg);
        }
      }).catch(e=>{
        console.log(e)
        console.log(JSON.stringify(e));
      });
    },



  }
};
Jquery(function () {
  Jquery(document).off("click", '.textH2').on("click", ".textH2", function (e) {
    var _this = Jquery(this);
    if (_this.find(".select").length != 0) {
      if (
        _this.find(".select").attr("src") == "../../../static/images/top.png"
      ) {
        console.log('隐藏')
        /*展开图片路径*/
        _this
          .parent()
          .find(".titcent")
          .hide();
        _this.find(".select").attr("src", "../../../static/images/bottom.png");
        _this
          .parent()
          .find(".titcent")
          .hide();
      } else {
        console.log('显示')
        _this
          .parent()
          .siblings()
          .find(".select")
          .attr("src", "../../../static/images/bottom.png");
        _this
          .parent()
          .siblings()
          .find(".titcent")
          .hide();
        _this.find(".select").attr("src", "../../../static/images/top.png");
        _this
          .parent()
          .find(".titcent")
          .show();
      }
    }
  });
});

</script>
<style scoped>
.background {
  border-bottom: 1px solid rgb(253, 118, 44);
  color: rgb(253, 118, 44);
}
.tradition_mask {
  padding-top: .2rem;
}
.tradition_mask .insured-name {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.15rem;
  color: #333;
  font-weight: 700;
  padding-left: 0.15rem;
}
.proitem {
  font-size: 0.14rem;
}
.proitem >>> .mint-popup {
  border-radius: 5px;
}
.profoot {
  height: 0.54rem;
  display: flex;
  align-items: center;
  width: 100%;
  background: #ffffff;
  font-size: 0.14rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  border-top: 1px solid #eeeeee;
  margin-bottom: constant(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  margin-bottom: env(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  overflow: hidden;
}
.profoot .profootleft {
  height: 0.54rem;
  line-height: 0.54rem;
}
.profoot .profootleft a {
  height: 0.54rem;
  width: 0.54rem;
  line-height: 0.54rem;
  padding: 0.08rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profoot .profootleft a img {
  width: 100%;
  height: 100%;
}
.profoot .profootcontent {
  font-size: 0.2rem;
  font-weight: 700;
  height: 0.54rem;
  line-height: 0.54rem;
  border-left: 0.01rem solid #f1f1f1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #f52525;
}
.profoot .profootcontent .jine-value {
  line-height: 0.2rem;
  height: 0.54rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.profoot .profootright,
.shade_bottom .profootright {
  height: 0.54rem;
  text-align: center;
  line-height: 0.54rem;
  color: #ffffff;
  padding: 0 0.15rem;
  font-size: .16rem;
  font-weight: 700;
}
.mint-button--primary.is-plain {
  color: red;
}
/*上下切换按钮*/
.select {
  margin-left: 0.05rem;
  width: 0.2rem;
  height: 0.2rem;
  cursor: pointer;
}
.introduce {
  width: 3.75rem;
}
.introduce >>> img {
  width: 100%;
}
.detail >>> img {
  width: 100%;
}
.flow {
  color: #fd762c;
}
.htmlclass {
  padding: 0.1rem 0.2rem;
}
.titcent {
  display: none;
}
.nav_tab {
  width: 3.75rem;
  overflow: hidden;
}
.nav_tab a {
  font-size: 0.15rem;
  color: rgb(51, 51, 51);
  display: block;
  width: 1.25rem;
  height: 0.41rem;
  line-height: 0.41rem;
  float: left;
  text-align: center;
  text-decoration: none;
}
.spanActive {
  color: rgb(237, 125, 65);
  border-bottom: 0.01rem solid #ed7d41;
  height: 0.4rem;
  line-height: 0.4rem;
}
/* 遮罩样式 */
.show_shade {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 3.75rem;
  height: 100%;
  z-index: 1;
}
.shade_content {
  background: #fff;
  width: 3.75rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  z-index: 1;
  margin-bottom: constant(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  margin-bottom: env(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
}
.dt {
  width: 0.8rem;
  font-size: 0.15rem;
  color: #333;
  margin-right: 0.05rem;
  text-align: right;
}
.selected_div {
  height: auto;
  overflow: hidden;
  position: relative;
  padding-left: 0.15rem;
  display: flex;
  align-items: center;
}
.selected_div span {
  display: inline-block;
  padding: 0.06rem 0.15rem;
  font-size: 0.15rem;
  color: rgb(153, 153, 153);
  border-radius: 0.025rem;
  border: 1px solid rgb(153, 153, 153);
  margin-left: 0.12rem;
  cursor: pointer;
  margin-bottom: 5px;
  margin-top: 5px;
}
.select_option {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: none;
  margin-left: 0.12rem;
  border-radius: 0.025rem;
  padding: 0.06rem 0.15rem;
  font-size: 0.15rem;
  text-align: left;
  text-align-last: left;
  position: relative;
  width: 1.1rem;
  margin-bottom: 5px;
  margin-top: 5px;
}
.select_option option {
  background-color: #ffffff;
}
.select_bottom {
  position: absolute;
  left: 2.02rem;
  top: 0.15rem;
  width: 0.15rem;
  height: 0.15rem;
}
em {
  font-style: normal;
}
.shade_bottom {
  width: 3.75rem;
  height: 0.54rem;
  overflow: hidden;
  line-height: 0.54rem;
  border-top: 0.01rem solid #dcdcdc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: .2rem;
}
.shade_bottom .shade_bottom_left {
  display: flex;
  height: 0.54rem;
  line-height: 0.15rem;
  align-items: center;
  flex: 1;
  font-weight: 700;
  font-size: .2rem;
}
.shade_bottom .shade_bottom_right {
  height: 0.54rem;
  text-align: center;
  line-height: 0.54rem;
  color: #ffffff;
  font-size: 0.14rem;
  width: 1.7rem;
  font-size: .16rem;
  font-weight: 700;
}
.pay_now {
  float: left;
  display: block;
  width: 1.15rem;
  height: 0.49rem;
  line-height: 0.49rem;
  color: #fff;
  background: #ed7d41;
  text-align: center;
  font-size: 0.15rem;
}
.yuan_word {
  display: flex;
  flex-direction: column;
  height: 0.54rem;
  justify-content: center;
  line-height: 0.2rem;
  flex: 1;
  text-align: center;
  border-left: 0.01rem solid #f1f1f1;
  color: #f52525;
}
.yuan_word em {
  margin-left: 0.05rem;
}
.popup_content h1,
.popup_content h2,
.popup_content h3,
.popup_content h4,
.popup_content h5,
.popup_content h6,
.popup_content b,
.popup_content strong {
  font-weight: bold;
  font-size: normal;
}
.closeBtn {
  position: absolute;
  bottom: 0.2rem;
  color: #fff;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-align: center;
  font-size: 0.15rem;
  line-height: 0.5rem;
  left: 1.6rem;
}
strong {
  font-weight: bold !important;
}
.oldPrice {
  text-decoration: line-through;
  color: #999;
}
/*续保样式*/
.profootXubao {
    color: #0bbd70;
    height: 0.53rem;
    text-align: center;
    line-height: 0.53rem;
    padding: 0 0.15rem;
    border: .01rem solid;
    font-size: .16rem;
    font-weight: 700;
}
.renewalInsurancePop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 7.5rem;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.renewalInsurancePop h4 {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.16rem;
  color: #434343;
}
.renewalInsuranceCon {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: #fff;
  width: 100%;
  margin-bottom: constant(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  margin-bottom: env(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
}
.title1 {
  text-align: center;
}
.closeImg {
  width: 0.13rem;
  height: 0.13rem;
  float: right;
  margin: 0.13rem 0.15rem 0.13rem 0;
}
.xbfa {
  font-size: 0.15rem;
}
.xbfa h4 {
  background: url("../../../static/images/ico_xbfa.png") no-repeat;
  background-size: 0.25rem 0.25rem;
  background-position: 0.14rem 50%;
  background-color: #f2f2f2;
}
.title2 {
  text-align: left;
  text-indent: 1.5em;
  padding-left: 0.24rem;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.xbfa li {
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.19rem;
}
.xbfa li label {
  display: inline-block;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: left;
  color: #606060;
}
.xbfa .right {
  float: right;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: right;
  color: #939393;
}
.xbfa .right span {
  display: inline-block;
  height: 0.28rem;
  color: #949494;
  background: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 0.025rem;
  text-align: center;
  line-height: 0.28rem;
  margin-left: 0.1rem;
  padding: 0 0.1rem;
}
.xbfa .right .activeSelected {
  color: #0bbd70;
  border: 1px solid #0bbd70;
}
.spanL {
  margin-right: 0.2rem;
}
.xbfa .right img {
  width: 0.43rem;
  height: 0.21rem;
}
.xbfa .right em {
  color: #303030;
  font-weight: 900;
}
.xbfa .renewalInfo {
  background: url("../../../static/images/ico_xbrxx.png") no-repeat;
  background-size: 0.25rem 0.25rem;
  background-position: 0.14rem 50%;
  background-color: #f2f2f2;
}
.xbfa .right input {
  width: 2rem;
  height: 0.3rem;
  padding: 0.1rem 0;
  border: none;
  outline: none;
  text-align: left;
  font-size: 0.15rem;
}
.continue {
  font-size: 0.14rem;
  background: #fff;
  border-top: 1px solid #eeeeee;
}
.clear {
  display: block;
  content: "";
  clear: both;
  zoom: 1;
}
.xubao {
  display: flex;
  align-items: center;
}
.xubao li {
  height: 0.54rem;
  line-height: 0.54rem;
}
.priceF {
  flex: 1;
}
.priceF span:nth-of-type(1) {
  float: left;
  padding: 0 0.19rem;
}
.priceF .curPrice {
  color: #f52525;
  font-weight: 700;
  font-size: .2rem;
}
.xubao .xbBtn {
  background: #0bbd70;
  color: #ffffff;
  text-align: center;
  height: 0.54rem;
  line-height: 0.54rem;
  width: 1.7rem;
  font-size: .16rem;
  font-weight: 700;
}
.popW {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.popW .popBox {
  width: 3.2rem;
  height: 1.65rem;
  background: #fff;
  border-radius: 0.1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.popW p {
  color: #303030;
  font-size: 0.16rem;
  margin: 0.39rem auto 0.3rem;
  text-align: center;
}
.popW .popBtn {
  width: 1.3rem;
  height: 0.4rem;
  text-align: center;
  margin: 0 auto;
}
.popW .popBtn button {
  width: 1.3rem;
  height: 0.4rem;
  background: #08bc6c;
  font-size: 0.17rem;
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 0.2rem;
}
.age-input-wrap {
  font-size: 0.15rem;
  margin-left: 0.1rem;
  width: 0.9rem;
  height: 0.35rem;
  line-height: 0.35rem;
  border-radius: 0.025rem;
  display: flex;
  align-items: center;
}
.age-input-wrap input {
  font-size: 0.15rem;
  padding-left: 0.15rem;
  border: 0;
  width: 0.65rem;
}
.kongbai {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  background-color: #fff;
  z-index: 2;
}
.zhanwei {
  border-bottom: 0.54rem solid #fff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.shade_bottom_left .profootleft {
  height: 0.54rem;
  line-height: 0.54rem;
}
.shade_bottom_left .profootleft a {
  height: 0.54rem;
  width: 0.54rem;
  line-height: 0.54rem;
  padding: 0.08rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shade_bottom_left .profootleft a img {
  width: 100%;
  height: 100%;
}
sub {
  font-size: .14rem;
}
</style>