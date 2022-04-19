<template>
  <div class="pro_details" :data='itemData'>
    <mymask :loadingVisible="loadingVisible" :loadingVisibleContent="loadingVisibleContent"></mymask>
    <!-- 您即将进入投保流程 -->
    <Traceback></Traceback>
    <!-- 健康告知 -->
    <health :channelName="channelName" page="详情页" :showHealth='showHealth' :itemData="itemData" @hideHealth="onHideHealth" @onHealthye="healthye"></health>
    <!-- 返回顶部 -->
    <go-top></go-top>
    <!-- 轮播图部分 -->
    <slide-show :prdImgs="itemData.prdImgs"></slide-show>
    <template v-if="itemData.prdVersion == 2">
      <!-- 轮播图下广告 -->
      <AD1 :adList="common.getAdListBySeat(adList, 3)" seat="3"></AD1>
      <!-- 保障范围 -->
      <bao-zhang-fan-wei :discountData="discountData" :styleList="styleList" :itemData="itemData" @onSwitchPrdDutylist="onSwitchPrdDutylist" :prdName="itemData.prdName" :initPriceArr="initPriceArr" :prdStyles="itemData.prdStyles" :prdDutylist="itemData.prdStyles[prdDutysIndex].prdDutys" :prdDutysIndex="prdDutysIndex" :prdTheme="itemData.prdTheme"></bao-zhang-fan-wei>
    </template>

    <!-- 保障范围旧版样式 -->
    <template v-if="itemData.prdVersion == 1">
      <div>
        <div class="salet" style="width: 100%; ">
          <div class='proitem' style="padding-bottom: 0;width: 100%; overflow: hidden; display: flex;justify-content: space-around;align-items: stretch; text-align: center; color: rgb(51,51,51);">
            <p v-show="tit.isShow" style='display:flex;flex:1;justify-content:center;align-items:center;padding: 10px .13rem;width: 25%;' @click="chenge(tit.prdDutys,tit.styleName,index)" v-for="(tit,index) in itemData.prdStyles" :class='{background:prdDutysIndex==index}' :key='index' :id='tit.styleName'>{{tit.styleName}}</p>
          </div>
        </div>
        <div v-for="(titlist,i) in itemData.prdStyles[prdDutysIndex].prdDutys" :key='i' :title="titlist.name" :value="titlist.value">
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
    <template v-if="itemData.prdVersion == 1">
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
          <div v-html="itemData.introduce" class="introduce"></div>
        </div>
        <!-- 详细说明 -->
        <div id="2" class='proitem' v-for="(detail,index) in itemData.insurances" :key='index' v-if='detail.type == 4 && orderState === 1'>
          <div v-html="detail.content" class="detail"></div>
          <template v-for='det in itemData.insurances'>
            <template v-if="det.type == 1 || det.type == 3 || det.type == 5 || det.type == 9">
              <mt-cell :key='det.title' :title="det.title" is-link @click.native='showContent(det.isUrlFormat,det.content)' :content="maskcontent">
              </mt-cell>
            </template>
          </template>
          <mt-popup v-model="popupVisibledetail" popup-transition="popup-fade" position='center'>
            <div class="popup_content editorStyle" style='width: 3.3rem;max-height: 4rem;overflow: auto;padding: .1rem;border-radius: 10px !important;-webkit-overflow-scrolling: touch;' v-html="maskcontent"></div>
          </mt-popup>
        </div>
        <!-- 理赔流程 -->
        <template v-for="(flow,i) in itemData.introduce">
          <div id="3" class='proitem' :key='i' v-if="orderState === 2 && flow.type == 6">
            <div v-if='flow.isUrlFormat'>
              点击下载<a v-if='flow.isUrlFormat == true' :href='flow.content' class="flow">{{flow.title}}</a>
            </div>
            <div v-else>
              <div v-html="flow.content" class='detail htmlclass'>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- 新版样式 -->
    <template v-if="itemData.prdVersion == 2">
      <!-- 导航栏部分 -->
      <nav-bar :insurances="itemData.insurances" :prdTheme="itemData.prdTheme"></nav-bar>
      <!-- 常见问题部分 -->
      <common-question :insurances="itemData.insurances"></common-question>
    </template>

    <!-- 底部占位 -->
    <div class="zhanwei"></div>

    <div class="kongbai"></div>
    <!-- 底部 -->
    <div class='profoot'>
      <a :href="itemData.customerService" @click="onClickKf">
        <img :src="itemData.customerLogo" />
      </a>
      <div class="profootcontent">
        <template v-if="itemData.giveInsurance == 1">
          <template v-if="common.checkMsgNull(discountData.discount)">
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk2">
                <div class="top">￥{{initPriceArr[prdDutysIndex].discountPrice}}<span>/人起</span></div>
                <div class="bottom line">￥{{initPriceArr[prdDutysIndex].price}}<span>/人起</span></div>
              </div>
            </template>
            <template v-else>
              <div class="qk2">
                <div class="top">￥{{initPriceArr[prdDutysIndex].discountPrice}}</div>
                <div class="bottom line">￥{{initPriceArr[prdDutysIndex].price}}</div>
              </div>
            </template>
          </template>
          <template v-else-if="common.checkMsgNull(discountData.firstPremium)">
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk2">
                <div class="top">首月￥{{initPriceArr[prdDutysIndex].firstMonthPrice}}</div>
                <div class="bottom">次月￥{{initPriceArr[prdDutysIndex].otherMonthPrice}}/月/人起</div>
              </div>
            </template>
            <template v-else>
              <div class="qk2">
                <div class="top">首月￥{{initPriceArr[prdDutysIndex].firstMonthPrice}}</div>
                <div class="bottom">次月￥{{initPriceArr[prdDutysIndex].otherMonthPrice}}/月</div>
              </div>
            </template>
          </template>
          <template v-else-if="common.checkMsgNull(discountData.isMonthPay)">
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk1">￥{{initPriceArr[prdDutysIndex].averageMonthPrice}}<span>/月/人起</span></div>
            </template>
            <template v-else>
              <div class="qk1">￥{{initPriceArr[prdDutysIndex].averageMonthPrice}}<span>/月</span></div>
            </template>
          </template>
          <template v-else>
            <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
              <div class="qk1">￥{{initPriceArr[prdDutysIndex].price}}<span>/人起</span></div>
            </template>
            <template v-else>
              <div class="qk1">￥{{initPriceArr[prdDutysIndex].price}}</div>
            </template>
          </template>
        </template>
        <div v-else-if="itemData.giveInsurance == 0">￥0</div>
      </div>
      <div v-if="renewOneClick" class="profootXubao" @click="toRenewInsur">一键续保</div>
      <div class="profootright" :style="{backgroundColor: itemData.prdTheme, width: (renewOneClick ? 'auto': '1.7rem')}" @click="toinsur(),onSensors('详情页-点击立即投保',$event)">
        <template v-if="itemData.giveInsurance == 1">
          <template v-if="isXubao == 1">立即续保</template>
          <template v-else>立即投保</template>
        </template>
        <template v-else-if="itemData.giveInsurance == 0">免费投保</template>
      </div>
    </div>
    <!-- 通用遮罩层 -->
    <div class="common-mask" @click="maskClose"></div>
    <!--方案报价底部弹框-->
    <transition name="detail">
      <div class="shade_content" v-if="toInsureShade">
        <div class="insured-name">保障详情:
          <div class="title-closeImg" @click="maskClose()">
            <img src="../../../static/images/gb.png" alt="" />
          </div>
        </div>
        <div class="selected_div" v-if="styleList.length>1">
          <div class="selected_div-name">方案名称</div>
          <!-- 方案名称需要展示成下拉框的情况 -->
          <template v-if="itemData.prdName == '阳光行车无忧意外险'">
            <select v-model="styleSelectIndex" @change="handletypeSelect(styleSelectIndex)" placeholder="" class="select_option" :style="{color: itemData.prdTheme, border: '1px solid ' + itemData.prdTheme}">
              <option v-for='(i,indexA) in styleList' :key="indexA" :value="indexA">{{i.styleName}}
              </option>
            </select>
          </template>
          <!-- 方案名称默认并列显示的情况 -->
          <template v-else>
            <div class="styleList-wrap">
              <span v-show="i.isShow" v-for='(i,indexA) in styleList' :key="indexA" @click="handletype(indexA,false)" :style="{color: (indexA===styleActiveIndexA ? itemData.prdTheme : '#999'), border: (indexA == styleActiveIndexA ? '1px solid ' + itemData.prdTheme : '1px solid')}">
                {{i.styleName}}
              </span>
            </div>
          </template>
        </div>

        <div v-for='item in styleList[styleActiveIndexA].prdSpecificationCalcs' class="selected_div" :key='item.name' v-if="['方案被保人数','方案被保人数范围', '总保额'].indexOf(item.name) == -1">
          <div class="selected_div-name" v-if="item.entries.length>0">{{item.name}}</div>
          <template v-if="item.name == itemData.compoundComplex">
            <template>
              <template v-for="styleListItem in styleList" v-if="styleListItem.styleName == styleList[styleActiveIndexA].styleName">
                <template v-for="(prdItem, index) in styleListItem.prdSpecificationCalcs" v-if="prdItem.name == itemData.compoundComplex">
                  <span @click="handleComplex(prdItem.entries[0].value)" :style="{color: styleList[styleActiveIndexA].styleId == styleListItem.styleId ? itemData.prdTheme : 'rgb(153, 153, 153)', border: styleList[styleActiveIndexA].styleId == styleListItem.styleId ? '1px solid ' + itemData.prdTheme : '1px solid rgb(153, 153, 153)'}" :key="prdItem.entries[0].value">{{prdItem.entries[0].value}}</span>
                </template>
              </template>
            </template>
          </template>
          <template v-else-if="item.entries.length==1">
            <span v-for="items in item.entries" class="active" :key='items.id' :style="{color: itemData.prdTheme, border: 'none'}">
              {{items.value}}
            </span>
          </template>
          <template v-else-if="item.entries.length==2">
            <span v-for="items in item.entries" @click="item.name=='是否月缴'?monthHandleClick(item.entries,items.id,false):handleClick(item.entries,items.id,false)" :class="{active:items.isDefault}" :key='items.id' :style="{color: (items.isDefault ? itemData.prdTheme : '#999'), border: (items.isDefault ? '1px solid ' + itemData.prdTheme : '1px solid')}">
              {{items.value}}
            </span>
          </template>

          <template v-if="item.entries.length>2">
            <template v-if="itemData.ageDisplayStyle == 1 && item.name == '年龄'">
              <div class="age-input-wrap" :style="{color: itemData.prdTheme, border: '1px solid ' + itemData.prdTheme}" @click="onAgeInputFocus">
                <input type="text" name="" id="" maxlength="2" @keyup="isRealNum(inputAge)" @blur="handleInputAge(),onScrollBottom()" v-model="inputAge" :style="{color: itemData.prdTheme}">
              </div>
            </template>
            <template v-else>
              <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,false)" placeholder="" class="select_option" :style="{color: itemData.prdTheme, border: '1px solid ' + itemData.prdTheme}">
                <option v-for="items in item.entries" :key="items.id" :value="items.id">{{items.value}}
                </option>
              </select>
            </template>
          </template>

          <!-- <span v-for="items in item.entries" v-if="item.entries.length<=2" @click="item.name=='是否月缴'?monthHandleClick(item.entries,items.id,false):handleClick(item.entries,items.id,false)" :class="{active:items.isDefault}" :key='items.id'>
              {{items.value}}
            </span>
            <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,false)" placeholder="" v-if="item.entries.length>2" class="select_option">
              <option v-for="items in item.entries" :key="items.id" :value="items.id">{{items.value}}
              </option>
            </select> -->
        </div>
        <!-- <div class="selected_div">
          <div class="selected_div-name">总保额</div>
          <span :style="{color: itemData.prdTheme, border: 'none'}">{{styleList[styleActiveIndexA].amount}}</span>
        </div> -->

        <div class="profoot shade_bottom">
          <a :href="itemData.customerService">
            <img :src="itemData.customerLogo" />
          </a>
          <div class="profootcontent">
            <template v-if="itemData.giveInsurance == 1">
              <template v-if="common.checkMsgNull(discountData.discount)">
                <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
                  <div class="qk2">
                    <div class="top">￥{{newPriceObj.discountPrice}}<span>/人起</span></div>
                    <div class="bottom line">￥{{newPriceObj.price}}<span>/人起</span></div>
                  </div>
                </template>
                <template v-else>
                  <div class="qk2">
                    <div class="top">￥{{newPriceObj.discountPrice}}</div>
                    <div class="bottom line">￥{{newPriceObj.price}}</div>
                  </div>
                </template>

              </template>
              <template v-else-if="common.checkMsgNull(discountData.firstPremium) && common.checkMsgNull(monthPayType) && monthPayType == 12">
                <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
                  <div class="qk2">
                    <div class="top">首月￥{{newPriceObj.firstMonthPrice}}</div>
                    <div class="bottom">次月￥{{newPriceObj.otherMonthPrice}}/月/人起</div>
                  </div>
                </template>
                <template v-else>
                  <div class="qk2">
                    <div class="top">首月￥{{newPriceObj.firstMonthPrice}}</div>
                    <div class="bottom">次月￥{{newPriceObj.otherMonthPrice}}/月</div>
                  </div>
                </template>
              </template>
              <template v-else-if="common.checkMsgNull(monthPayType) && monthPayType == 12">
                <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
                  <div class="qk1">￥{{newPriceObj.averageMonthPrice}}<span>/月/人起</span></div>
                </template>
                <template v-else>
                  <div class="qk1">￥{{newPriceObj.averageMonthPrice}}<span>/月</span></div>
                </template>
              </template>
              <template v-else>
                <template v-if="itemData.prdName.indexOf('爱健康2020') != -1">
                  <div class="qk1">￥{{newPriceObj.price}}<span>/人起</span></div>
                </template>
                <template v-else>
                  <div class="qk1">￥{{newPriceObj.price}}</div>
                </template>
              </template>
            </template>
            <div v-else-if="itemData.giveInsurance == 0">&yen;0</div>
          </div>
          <div class="profootright" @click="test(),onSensors('详情页-点击确认投保', $event)" :style="{backgroundColor: itemData.prdTheme}">
            <template v-if="itemData.giveInsurance == 1">
              <template v-if="isXubao == 1">确认续保</template>
              <template v-else>下一步</template>
            </template>
            <template v-else-if="itemData.giveInsurance == 0">确认投保</template>
          </div>
        </div>
      </div>
    </transition>
    <!--一键续保start-->
    <transition name="detail">
      <div class="renewalInsuranceCon" v-if="renewOneClickShade">
        <h4 class="title1">爱健康一键续保 <img src="../../../static/images/gb.png" class="closeImg" @click="maskClose()" alt="" /></h4>
        <div class="xbfa">
          <h4 class="title2">续保方案</h4>
          <ul>
            <li>
              <label>方案选择:</label>
              <div class="right edition" v-if="renewStyleList.length >1">
                <span v-for="(i,indexB) in renewStyleList" @click="handletype(indexB,true)" :class="{activeSelected:indexB===styleActiveIndexB}" :key="i.styleId">
                  {{i.styleName}}
                </span>
              </div>
            </li>
            <li v-for="list in renewStyleList[styleActiveIndexB].prdSpecificationCalcs" v-if="list.entries.length>0 && list.entries.length<=2">
              <label>{{list.name}}:</label>
              <div class="right">
                <span v-for="li in list.entries" @click="list.name=='是否月缴'?monthHandleClick(list.entries,li.id,true):handleClick(list.entries,li.id,true)" :key='li.id' :class="{activeSelected:li.isDefault}">
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
                <label class="curPrice" v-html="renewDiscountPrice"></label>
                <label class="oldPrice" v-html="renewPrice"></label>
              </span>
              <span v-else>
                <label class="curPrice" v-html="renewPrice"></label>
              </span>
            </li>
            <li class="xbBtn" @click="renewInsurance(renewParams)">继续续保</li>
          </ul>
        </div>
      </div>
    </transition>
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
import Traceback from '../newComponents/traceback/Traceback.vue'
import Mymask from '@/components/newComponents/mymask/Mymask.vue'
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化

export default {
  name: "ProDetails",
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
    Traceback,
    Mymask
  },
  props: ["id", "Code"],
  data() {
    return {
      styleSelectIndex: 0,// 当方案显示为下拉框时，选中项的索引
      calcIds: [],
      calcIdKeys: [],
      renewCalcIds: [],
      renewCalcIdKeys: [],
      initPriceArr: [{}],// 底部和保障范围展示的价格（不变）
      newPriceObj: {},// 选择方案时展示的价格
      renewPrice: '',// 爱健康一键续保底部展示正常价格（计算后）
      renewDiscountPrice: '',// 爱健康一键续保底部展示折扣价格（计算后）
      fromListPage: this.$route.query.fromListPage,
      inputAge: 0,// 当年龄需要输入时的年龄
      prdId: this.$route.query.id, //列表id，产品id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      carOwnerCode: this.$route.query.carOwnerCode, //列表carownerCode
      oldPolicyNo: this.$route.query.oldPolicyNo,//保单号
      openid: this.$route.query.openid,//微信用户唯一标识
      carOwnerSecretId: this.$route.query.carOwnerSecretId,
      styleList: [{ prdSpecificationCalcs: [], amount: '' }],
      itemData: {},
      popupVisibledetail: false,
      maskcontent: "",
      prdDutysIndex: 0, // 当前所展示的方案责任集合的索引，默认为0
      orderState: 0, //标志那个tab栏的那个变量
      showHealth: false,
      entries: [],//年龄区间
      sheBaoEntries: [],// 社保区间
      sexEntries: [],// 性别区间
      fabbrsEntries: [],// 方案被保人数区间（爱健康2020用）
      entriesRenew: [],//一键续保年龄区间
      upParams: {},
      urlParam: '',
      loadingVisible: true,
      loadingVisibleContent: '',
      channelName: '',
      adList: [],
      path: '',//定义跳转路径
      isXubao: window.sessionStorage.getItem('isXubao'),
      discount: "",//折扣
      discountData: {},
      monthPayEntries: [],//月缴
      renewMonthPayEntries: [],
      monthPayType: "",//月缴方式
      renewMonthPayType: "",//一键续保月缴方式
      renewOneClick: false,//是否是一键续保
      toInsureShade: false,//立即投保遮罩
      renewOneClickShade: false,//一键续保遮罩
      styleActiveIndexA: 0,//新保方案选中
      styleActiveIndexB: 0,//续保方案选中
      renewParams: {
        name: "",
        id: ""
      },//一键续保入参
      renewStyleList: [{ prdSpecificationCalcs: [] }],//续保方案
      calculateAgeIndex: "",//根据身份证号测算出的年龄区间所在数组中的索引
      calculateAgeId: "",//根据身份证号测算出的年龄区间的ID
      renewInsurResultPop: {
        isShow: false,
        message: "",
        link2018: ""
      },//一键续保结果弹框
      baiduSearchCount: 0,//百度搜索API成功调用次数
      baiduInforFlowCount: 0,//百度信息流API成功调用次数
      douyinCount: 0,//抖音API成功调用次数
      kuaishouCount: 0,//快手API成功调用次数
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
    };
  },
  created() {
    this.handleChannelCodeAndOrgCode()
    this.canScroll()
    this.getUrlParam()
    // this.hideWxOptionMenu();//隐藏微信菜单
    // this.hideWxCopyUrlOption();//只隐藏微信菜单复制链接选项
    this.getList();
    this.getAd();


    /// 首先清除缓存吧。。。
    window.sessionStorage.removeItem('urlParam');
    window.sessionStorage.removeItem('entries');//年龄区间
    window.sessionStorage.removeItem('sheBaoEntries');//社保区间
    window.sessionStorage.removeItem('sexEntries');// 性别区间
    window.sessionStorage.removeItem('fabbrsEntries');// 性别区间
    window.sessionStorage.removeItem('upParams');//投保选择项
    window.sessionStorage.removeItem('entriesRenew');
    window.sessionStorage.removeItem('discount');
    window.sessionStorage.removeItem('monthPayType');
    window.sessionStorage.removeItem('bbrNum');// 报价因子中的被保人数（阳光关爱保家庭版用）
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
  },
  filters: {},
  methods: {
    handleChannelCodeAndOrgCode() {
      let latest_channelCode = this.Cookies.get('latest_channelCode')
      if (!this.common.checkMsgNull(latest_channelCode)) {
        this.latest_channelCode = ''
        this.Cookies.set('latest_channelCode', this.channelCode, { expires: 60 })
      } else {
        this.latest_channelCode = latest_channelCode
      }
      let latest_orgCode = this.Cookies.get('latest_orgCode')
      if (!this.common.checkMsgNull(latest_orgCode)) {
        this.latest_orgCode = ''
        this.Cookies.set('latest_orgCode', this.orgCode, { expires: 60 })
      } else {
        this.latest_orgCode = latest_orgCode
      }
      let first_channelCode = this.Cookies.get('channelCode')
      if (!this.common.checkMsgNull(first_channelCode)) {
        this.Cookies.set('channelCode', this.channelCode, { expires: 60 })
      }
      this.first_channelCode = first_channelCode

      let first_orgCode = this.Cookies.get('orgCode')
      if (!this.common.checkMsgNull(first_orgCode)) {
        this.Cookies.set('orgCode', this.orgCode, { expires: 60 })
      }
      this.first_orgCode = first_orgCode
    },
    onClickKf() {
      this.onSensors2('dianjichanpinxiangqingyezaixianzixun', '点击产品详情页在线咨询')
    },
    getLocalStorageKey(name) {
      if (name == 'queryDiscount') {
        return `queryDiscount${this.prdId}${this.channelCode}`
      } else if (name == 'productSpecification') {
        return `productSpecification${this.prdId}${this.channelCode}`
      } else if (name == 'productDetail') {
        return `productDetail${this.prdId}${this.orgCode}`
      } else if (name == 'checkProduct') {
        return `checkProduct${this.prdId}${this.orgCode}`
      } else if (name == 'insureData') {
        return `insureData${this.styleList[this.styleActiveIndexA].prdItemId}${this.orgCode}`
      } else if (name == 'getCityJson') {
        return `getCityJson`
      } else if (name == 'getADByProductIdAndOrgId1') {
        return `getADByProductIdAndOrgId1${this.prdId}${this.orgCode}`
      } else if (name == 'getADByProductIdAndOrgId3') {
        return `getADByProductIdAndOrgId3${this.prdId}${this.orgCode}`
      } else if (name == 'getChannelAndAppkey') {
        return `getChannelAndAppkey${this.channelCode}`
      }
    },
    getUrlParam() {
      var params = window.location.href.split('?');
      if (params.length == 2) {
        params = params[1];
      } else if (params.length == 3) {
        params = params[2];
      } else {
        params = '';
      }
      let aaa = params.split('&')
      let flag = false
      for (let i = 0; i < aaa.length; i++) {
        if (aaa[i].split('=')[0] == 'orgCode' && aaa[i].split('=')[1].indexOf('CSH') != -1) {
          flag = true
        }
      }
      if (flag) {
        let bbb = []
        for (let i = 0; i < aaa.length; i++) {
          if (aaa[i].split('=')[0] == 'id' || aaa[i].split('=')[0] == 'channelCode' || aaa[i].split('=')[0] == 'orgCode' || aaa[i].split('=')[0] == 'carOwnerCode' || aaa[i].split('=')[0] == 'carOwnerSecretId' || aaa[i].split('=')[0] == 'openid' || aaa[i].split('=')[0] == 'openId') {
            bbb.push(aaa[i])
          }
        }
        params = bbb.join('&')
      }
      this.urlParam = params;
      console.log(this.urlParam)
      return params
    },

    // '详情页-点击立即投保',$event
    onSensors(eventName, event) {
      this.sensors.quick('trackAllHeatMap', event.target, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.prdId,
        channelCode: this.first_channelCode,
        latest_channelCode: this.latest_channelCode,
        orgCode: this.first_orgCode,
        latest_orgCode: this.latest_orgCode,
        page_ID: this.common.getPageid(0),
      });
    },
    // 'prdDetail_jinruxiangqingye' '详情页-进入详情页'
    onSensors2(eventClick, eventName) {
      this.sensors.track(eventClick, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.prdId,
        channelCode: this.first_channelCode,
        latest_channelCode: this.latest_channelCode,
        orgCode: this.first_orgCode,
        latest_orgCode: this.latest_orgCode,
        page_ID: this.common.getPageid(0),
      })
    },

    isRealNum(val) {
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
      if (val === "" || val == null) {
        return false;
      }
      if (!isNaN(val)) {
        this.handleInputAge()
        return true;
      } else {
        this.onToast('只能输入数字')
        this.inputAge = ''
        return false;
      }
    },
    onScrollBottom() {// 解决fixed定位元素中有input框错位问题
      setTimeout(function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100)
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
      let keyName = this.getLocalStorageKey('getChannelAndAppkey')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        callback(localKey)
      } else {
        this.$http.post("/prdmc/channel/getChannelAndAppkey", {
          channelCode: this.channelCode
        }).then(res => {
          if (res.status == 200) {
            this.common.setMyLocalStorage(keyName, res)
            callback(res)
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    // 处理CCH埋点
    handleCCH(obj) {
      this.$http.post('/sunmc/cch/onCCH', obj).then(res => { })
    },
    // 隐藏健康告知时，所调方法
    onHideHealth() {
      this.canScroll()
      this.showHealth = false
      this.onSensors2('proDetails_dianjiyouqingkuangfasheng', '详情页-点击有情况发生')
      if (this.channelCode != '' && this.channelCode != null) {
        //CCH埋点
        this.handleCCH({
          'orgCode': this.orgCode,
          'channelCode': this.channelCode,
          'pageName': this.channelName + this.itemData.prdName + '-健康告知页',
          'pointKey': `V2_${this.channelName}_${this.itemData.prdName}-详情页面_健康告知页_有情况发生`,
          'productId': this.$route.query.id,
          'url': window.location.href,
          'policyNo': '',
          'clientInfo': {}
        })

      }
    },
    onSwitchPrdDutylist(data) {
      this.prdDutysIndex = data.index
    },
    // 处理方案数组中的方案名，有相同的只展示一个
    handleTheSameStyleListName() {
      let myArr = []
      this.styleList.forEach(item => {
        if (this.common.checkMsgNull(this.itemData.compoundComplex)) {
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
      this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.forEach(item => {
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
      for (let i = 0; i < this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.length; i++) {
        let item = this.styleList[this.styleActiveIndexA].prdSpecificationCalcs[i]
        if (item.name == '年龄') {
          if (!this.common.checkMsgNull(this.inputAge)) {
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
    // 需要并列显示的选项按钮点击时（compoundComplex这个字段控制哪个报价因子需要并列显示）
    handleComplex(value) {
      for (let i = 0; i < this.styleList.length; i++) {
        if (this.styleList[this.styleActiveIndexA].styleName == this.styleList[i].styleName) {
          for (let j = 0; j < this.styleList[i].prdSpecificationCalcs.length; j++) {
            if (this.styleList[i].prdSpecificationCalcs[j].name == this.itemData.compoundComplex) {
              if (this.styleList[i].prdSpecificationCalcs[j].entries[0].value == value) {
                this.styleActiveIndexA = i
                if (this.itemData.compoundComplex == '加购轻型疾病保障') {
                  this.getInputAge()
                } else if (this.itemData.compoundComplex == '被保人数') {
                  sessionStorage.setItem('bbrNum', value) // 当前方案所选择的被保人数
                }
                break
              }
            }
          }
        }
      }
      this.handleProductCalc()
    },
    // 获取当前用户选择的报价因子组合
    getCalcIdsAndCalcIdKeys() {
      let calcIds = []
      let calcIdKeys = []
      let item = this.styleList[this.styleActiveIndexA].prdSpecificationCalcs
      for (let i = 0; i < item.length; i++) {
        if (item[i].name != '是否月缴') {
          for (let j = 0; j < item[i].entries.length; j++) {
            if (item[i].entries[j].isDefault) {
              calcIds.push(item[i].entries[j].id)
              calcIdKeys.push(item[i].name)
            }
          }
        }
      }
      this.calcIds = calcIds
      this.calcIdKeys = calcIdKeys
    },
    // （爱健康一键续保用）获取当前用户选择的报价因子组合
    getRenewCalcIdsAndCalcIdKeys() {
      let calcIds = []
      let calcIdKeys = []
      let item = this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs
      for (let i = 0; i < item.length; i++) {
        if (item[i].name != '是否月缴') {
          for (let j = 0; j < item[i].entries.length; j++) {
            if (item[i].entries[j].isDefault) {
              calcIds.push(item[i].entries[j].id)
              calcIdKeys.push(item[i].name)
            }
          }
        }
      }
      this.renewCalcIds = calcIds
      this.renewCalcIdKeys = calcIdKeys
    },
    // 产品报价测算接口
    handleProductCalc() {
      this.getCalcIdsAndCalcIdKeys()
      //请求后台,实时获取价格
      this.$http.post("/prdmc/prdmcShop/productCalc", {
        styleId: this.styleList[this.styleActiveIndexA].styleId,
        calcIds: this.calcIds,
      }).then(res => {
        this.styleList[this.styleActiveIndexA].amount = res.data.data.amount
        this.styleList[this.styleActiveIndexA].price = res.data.data.price
        this.styleList[this.styleActiveIndexA].prdItemId = res.data.data.prdItemId
        this.getNewPriceObj()
      });
    },
    // 产品报价测算接口（爱健康一键续保用）
    handleRenewProductCalc(callback) {
      this.getRenewCalcIdsAndCalcIdKeys()
      //若存在根据身份证号测算出的年龄区间,则更改数组中原年龄区间的id
      if (this.common.checkMsgNull(this.calculateAgeId)) {
        this.renewCalcIds[this.calculateAgeIndex] = this.calculateAgeId
      }
      //请求后台,实时获取价格
      this.$http.post("/prdmc/prdmcShop/productCalc", {
        styleId: this.renewStyleList[this.styleActiveIndexB].styleId,
        calcIds: this.renewCalcIds,
      }).then(res => {
        this.renewStyleList[this.styleActiveIndexB].amount = res.data.data.amount
        this.renewStyleList[this.styleActiveIndexB].price = res.data.data.price
        this.renewStyleList[this.styleActiveIndexB].prdItemId = res.data.data.prdItemId
        this.getRenewPriceAndDiscountPrice()
        if (callback) {
          callback()
        }
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
    handleProductDetail(success) {
      let keyName = this.getLocalStorageKey('productDetail')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        success(localKey)
      } else {
        window.localStorage.clear()
        this.$http.post("/prdmc/prdmcShop/productDetail", {
          productId: this.prdId,
          orgCode: this.orgCode
        }).then(res => {
          if (res.status == 200) {
            res = this.common.myReplaceAllUrl(res)
            this.common.setMyLocalStorage(keyName, res)
            success(res)
          } else {
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          console.log(e)
          this.onToast('获取数据失败，请稍候重试')
        })
      }
    },
    handleQueryDiscount(success) {
      let keyName = this.getLocalStorageKey('queryDiscount')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        success(localKey)
      } else {
        this.$http.post("prdmc/prdmcProductDiscount/queryDiscount", {//折扣接口
          productId: this.prdId,
          channelCode: this.channelCode
        }).then(res => {
          if (res.status == 200) {
            this.common.setMyLocalStorage(keyName, res)
            success(res)
          } else {
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          console.log(e)
          this.onToast('获取数据失败，请稍候重试')
        })
      }
    },
    handleProductSpecification(success) {
      let keyName = this.getLocalStorageKey('productSpecification')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        success(localKey)
      } else {
        this.$http.post("/prdmc/prdmcShop/productSpecification", {// 获取方案接口
          id: this.prdId,
          renewInsurance: this.discountData.renewInsurance,
          channelCode: this.channelCode
        }).then(res => {
          if (res.status == 200) {
            this.common.setMyLocalStorage(keyName, res)
            success(res)
          } else {
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          console.log(e)
          this.onToast('获取数据失败，请稍候重试')
        })
      }
    },
    getList() {
      this.handleProductDetail(res => {
        let prdVersion = res.data.data.prdVersion

        var params = window.location.href.split('?');
        if (params.length == 2) {
          params = params[1];
        } else if (params.length == 3) {
          params = params[2];
        } else {
          params = '';
        }
        if (prdVersion == 3) {
          if (this.isXubao == 1) {
            this.$router.replace({//跳转到新模板页面
              path: "/xubaoNewDetails?" + params,
            })
          } else {
            this.$router.replace({//跳转到新模板页面
              path: "/newDetails?" + params,
            })
          }
          return false
        } else if (prdVersion == 4) {// 走组合责任险页面
          this.$router.replace({//跳转到新模板页面
            path: "/combination?" + params,
          })
          return false
        } else {
          this.handleQueryDiscount(res => {
            if (JSON.stringify(res.data) != '{}') {
              this.discountData = res.data
              if (this.common.checkMsgNull(res.data.discount)) {//折扣不为空
                this.discount = res.data.discount;
              }
              if (this.common.checkMsgNull(res.data.isMonthPay)) {//月缴不为空
                var isMonthPay = JSON.parse(res.data.isMonthPay);
                if (isMonthPay.length > 0) {
                  for (var i = 0; i < isMonthPay.length; i++) {
                    this.monthPayEntries.push({
                      id: isMonthPay[i].value,
                      value: isMonthPay[i].key,
                      isSelected: true,
                      isDefault: i == 0 ? true : false,
                    });
                  }
                  this.renewMonthPayEntries = this.common.deepCopy(this.monthPayEntries);//必须拷贝一个新数组,否则会影响月缴样式
                  this.monthPayType = isMonthPay[0].value;//默认12期
                  this.renewMonthPayType = isMonthPay[0].value;//一键续保分期,默认12期
                }
              }

              window.sessionStorage.setItem('renewInsuranceFlag', JSON.stringify(this.discountData.renewInsurance));//缓存一键续保标识

              if (this.common.checkMsgNull(this.discountData.renewInsurance)) {//若是爱健康一键续保
                this.renewOneClick = true;//显示一键续保按钮
                this.getSpecificationForXubao();//方案报价接口:参数1传空则返回续保方案报价,年龄区间[0-100]
              }
              //其他产品(包括短信续保)
              //参数1不为空,返回新保方案报价,例年龄区间[0-60]
              //其他产品:没有续保方案报价,参数this.renewInsuranceFlag为空则返回新保信息
              this.getSpecification(this.discountData.renewInsurance);
              window.sessionStorage.setItem('isReload', true)
            }
          })
        }
      })
    },
    getNewPriceObj() {
      let price = 0
      let discountPrice = 0
      let averageMonthPrice = 0
      let firstMonthPrice = 0
      let otherMonthPrice = 0
      price = this.styleList[this.styleActiveIndexA].price.toFixed(2)
      if (this.common.checkMsgNull(this.discountData.discount)) {
        discountPrice = this.common.accMul(this.styleList[this.styleActiveIndexA].price, this.discountData.discount).toFixed(2)
      }
      if (this.common.checkMsgNull(this.monthPayType) && this.monthPayType == 12) {
        if (this.common.checkMsgNull(this.discountData.firstPremium)) {
          firstMonthPrice = this.discountData.firstPremium
          otherMonthPrice = ((Number(price) - Number(this.discountData.firstPremium)) / 11).toFixed(2)
        } else {
          averageMonthPrice = (Number(price) / 12).toFixed(2)
        }
      }

      this.newPriceObj = {
        price: price,
        discountPrice: discountPrice,
        averageMonthPrice: averageMonthPrice,
        firstMonthPrice: firstMonthPrice,
        otherMonthPrice: otherMonthPrice,
      }
    },
    getRenewPriceAndDiscountPrice() {
      //判断是否月缴
      if (this.common.checkMsgNull(this.renewMonthPayType)) {
        this.renewPrice = (Number(this.renewStyleList[this.styleActiveIndexB].price) / Number(this.renewMonthPayType)).toFixed(2);
        var dcPrice = this.common.accMul(this.renewStyleList[this.styleActiveIndexB].price, this.discount);//折扣价格
        this.renewDiscountPrice = (Number(dcPrice) / Number(this.renewMonthPayType)).toFixed(2);//保留两位小数
      } else {
        this.renewPrice = this.renewStyleList[this.styleActiveIndexB].price.toFixed(2);
        var dcPrice = this.common.accMul(this.renewStyleList[this.styleActiveIndexB].price, this.discount);//折扣价格
        this.renewDiscountPrice = dcPrice.toFixed(2);//保留两位小数
      }
      if (this.common.checkMsgNull(this.renewMonthPayType) && this.renewMonthPayType == 12) {
        this.renewPrice = '&yen;' + this.renewPrice + '<sub>/月</sub>'
        this.renewDiscountPrice = '&yen;' + this.renewDiscountPrice + '<sub>/月</sub>'
      } else {
        this.renewPrice = '&yen;' + this.renewPrice
        this.renewDiscountPrice = '&yen;' + this.renewDiscountPrice
      }
    },
    getInitPriceArr() {
      let arr = []
      for (let i = 0; i < this.styleList.length; i++) {
        let price = 0
        let discountPrice = 0
        let averageMonthPrice = 0
        let firstMonthPrice = 0
        let otherMonthPrice = 0
        price = this.styleList[i].price.toFixed(2)
        if (this.common.checkMsgNull(this.discountData.discount)) {
          discountPrice = this.common.accMul(this.styleList[i].price, this.discountData.discount).toFixed(2)
        }
        if (this.common.checkMsgNull(this.discountData.isMonthPay)) {
          if (this.common.checkMsgNull(this.discountData.firstPremium)) {
            firstMonthPrice = this.discountData.firstPremium
            otherMonthPrice = ((Number(price) - Number(this.discountData.firstPremium)) / 11).toFixed(2)
          } else {
            averageMonthPrice = (Number(price) / 12).toFixed(2)
          }
        }

        arr.push({
          price: price,
          discountPrice: discountPrice,
          averageMonthPrice: averageMonthPrice,
          firstMonthPrice: firstMonthPrice,
          otherMonthPrice: otherMonthPrice,
        })
      }
      this.initPriceArr = arr
    },
    //方案报价接口:爱健康一键续保用
    getSpecificationForXubao() {
      this.$http.post("/prdmc/prdmcShop/productSpecification", {
        id: this.prdId,
        renewInsurance: '',
        channelCode: this.channelCode
      }).then(res => {
        //续保方案
        this.renewStyleList = res.data.data.prdStyleSpecification;

        if (this.renewMonthPayEntries.length > 0) {
          if (this.common.indexOfArr(this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs, 'name', '是否月缴') == false) {
            this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs.push({
              name: '是否月缴',
              order: this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs.length,
              entries: this.renewMonthPayEntries
            })
          }
        }

        //保费显示
        this.getRenewPriceAndDiscountPrice()
      });
    },
    // 新保调用
    getSpecification() {
      this.handleProductSpecification(result => {
        this.styleList = result.data.data.prdStyleSpecification

        if (this.common.checkMsgNull(this.styleList[0].prdSpecificationCalcs)) {

          if (this.styleList.length > 0) {
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

          // 如果存在月缴的json,并且当前报价因子中没有‘是否月缴’，则将‘是否月缴’加入报价因子中
          if (this.monthPayEntries.length > 0) {
            if (this.common.indexOfArr(this.styleList[this.styleActiveIndexA].prdSpecificationCalcs, 'name', '是否月缴') == false) {
              this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.push({
                name: '是否月缴',
                order: this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.length,
                entries: this.monthPayEntries
              })
            }
          }
        }
        //调用产品详情接口
        this.getProductDetail();
      })
    },
    gotoNewDetails() {
      var params = window.location.href.split('?');
      if (params.length == 2) {
        params = params[1];
      } else if (params.length == 3) {
        params = params[2];
      } else {
        params = '';
      }
      if (this.itemData.prdVersion == 3) {
        if (this.isXubao == 1) {
          this.$router.push({//跳转到新模板页面
            path: "/xubaoNewDetails?" + params,
          })
        } else {
          this.$router.push({//跳转到新模板页面
            path: "/newDetails?" + params,
          })
        }
        return false
      } else if (this.itemData.prdVersion == 4) {// 走组合责任险页面
        this.$router.push({//跳转到新模板页面
          path: "/combination?" + params,
        })
        return false
      }
    },
    //产品详情接口
    getProductDetail() {
      this.handleProductDetail(res => {
        this.itemData = res.data.data;
        this.loadingVisible = false
        // 如果续保的是家庭版，要切换下初始的方案选项
        let insuredDtoList = JSON.parse(window.sessionStorage.getItem('insuredDtoList'))
        if (insuredDtoList && insuredDtoList.length > 1 && this.itemData.prdName.indexOf('2020') != -1) {
          this.styleActiveIndexA = 1
          this.prdDutysIndex = 1
        }
        this.getInitPriceArr()
        this.getNewPriceObj()
        if (this.common.checkMsgNull(this.itemData.compoundComplex) && this.itemData.compoundComplex == '被保人数') {
          for (let i = 0; i < this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.length; i++) {
            if (this.styleList[this.styleActiveIndexA].prdSpecificationCalcs[i].name == this.itemData.compoundComplex) {
              sessionStorage.setItem('bbrNum', this.styleList[this.styleActiveIndexA].prdSpecificationCalcs[i].entries[0].value) // 当前方案所选择的被保人数
            }
          }
        }
        /* 处理方案名称相同的方案数组 start */
        let myArr = []
        this.itemData.prdStyles.forEach((item, index) => {
          if (this.common.checkMsgNull(this.itemData.compoundComplex)) {
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
        if (!this.common.checkMsgNull(this.itemData.customerService)) {
          this.itemData.customerService = 'http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw='
        }
        if (!this.common.checkMsgNull(this.itemData.prdTheme)) {
          this.itemData.prdTheme = '#ff8400'
        }
        if (!this.common.checkMsgNull(this.itemData.customerLogo)) {
          this.itemData.customerLogo = '../../../static/images/zixun.png'
        }
        console.log(JSON.stringify(this.styleList));

        if (this.itemData.status == 1) {//若产品状态正常
          if (this.common.checkMsgNull(this.itemData.productEndDate)) {
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(this.itemData.productEndDate.replace(new RegExp(/-/gm), "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//产品结束日期小于当前日期
              this.onToast("系统维护中！")
              return
            }
          }
        } else {
          this.onToast("系统维护中！")
          return
        }

        //若channelCode不为空,则执行埋点
        if (this.channelCode != '' && this.channelCode != null) {
          //获取appkey及channelName
          this.getChannelAndAppkey((res) => {
            this.channelName = res.data.channelName;
            // CCH埋点
            this.pointKey = 'V2_' + this.channelName + '_' + this.itemData.prdName + '-详情页面';//事件中文
            this.handleCCH({
              'orgCode': this.orgCode,
              'channelCode': this.channelCode,
              'pageName': this.channelName + this.itemData.prdName + '-详情页',
              'pointKey': this.pointKey,
              'productId': this.$route.query.id,
              'url': window.location.href,
              'policyNo': '',
              'clientInfo': {}
            })
            if (!this.common.checkMsgNull(window.sessionStorage.getItem('userSign'))) {
              window.sessionStorage.setItem('userSign', this.common.getUserSign())
            }
            if (this.isXubao == 1) {// 1表示续保页面
              this.onSensors2('xubao-jinruxubaoxiangqingye', '续保-进入续保详情页')
            } else {
              this.onSensors2('proDetails_jinruxiangqingye', '详情页-进入详情页')
            }
          })

        }
        //设置页面标题
        Jquery(document).find('title').text(this.itemData.prdName);

        //微信分享
        if (this.itemData.sharedConfig.sharedTitle != '' && this.itemData.sharedConfig.sharedLogo != '' && this.itemData.sharedConfig.sharedContent != '') {
          if (this.openid != null && this.openid != "") {//若存在openid(即授权链接的情况)
            var host = window.location.host;
            var authorizedHost = "testcmspay.sinosig.com";//默认测试环境域名
            console.log(host);
            if (host === "mkproperty.sinosig.com" || host === "mkproperty.ygbx.com") {//若是生产环境域名
              authorizedHost = "cmspay.sinosig.com";
            }
            var shareUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxda60d81e7d4a1ac6&redirect_uri=http%3A%2F%2F" + authorizedHost + "%2Fpays%2Fpaymentinterface%2FgetWeChatOpenid%3Fmerchantno%3D1487068902%26backurl%3Dhttp%253A%252F%252F" + host + "%252F%2523%252FProduct%252FProDetails%253Fid%253D" + this.prdId + "%2526channelCode%253D" + this.channelCode + "%2526orgCode%253D" + this.orgCode + "&response_type=code&scope=snsapi_base&agentid=AGENTID&state=STATE#wechat_redirect";
          } else {//普通微信分享
            if (this.itemData.sharedConfig.sharedLink != '') {//若管理平台配置了分享链接
              var shareUrl = this.itemData.sharedConfig.sharedLink + '?channelCode=' + this.channelCode;
            } else {//若管理平台没配置分享链接，则取当前页面链接
              var shareUrl = window.location.href;
            }
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
      })
    },
    //一键续保
    toRenewInsur() {
      this.renewOneClickShade = true;
      Jquery('.common-mask').fadeIn(300)
      if (this.channelCode != '' && this.channelCode != null) {
        console.log('this.pointKey --->' + this.pointKey + '_一键续保');
        // toccH 埋点
        this.handleCCH({
          'orgCode': this.orgCode,
          'channelCode': this.channelCode,
          'pageName': this.channelName + this.itemData.prdName + '-详情页',
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
      Jquery('.common-mask').fadeIn(300)
      if (this.channelCode != '' && this.channelCode != null) {
        console.log('this.pointKey --->' + this.pointKey + '_立即投保');
        // toccH 埋点
        this.handleCCH({
          'orgCode': this.orgCode,
          'channelCode': this.channelCode,
          'pageName': this.channelName + this.itemData.prdName + '-详情页',
          'pointKey': this.pointKey + '_立即投保',
          'productId': this.$route.query.id,
          'url': window.location.href,
          'policyNo': '',
          'clientInfo': {}
        })

        //转化数据API对接
        this.platformOCPC();
      }
    },
    // 遮罩层隐藏事件
    maskClose() {
      Jquery('.common-mask').fadeOut(300)
      this.toInsureShade = false;
      this.renewOneClickShade = false;
    },
    handletypeSelect(index) {
      this.handletype(index, false)
    },
    //点击方案
    handletype(index, isRenewInsurance) {
      if (isRenewInsurance) {//一键续保
        this.styleActiveIndexB = index;//改变方案名称选中样式

        if (this.renewMonthPayEntries.length > 0) {
          if (this.common.indexOfArr(this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs, 'name', '是否月缴') == false) {
            this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs.push({
              name: '是否月缴',
              order: this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs.length,
              entries: this.renewMonthPayEntries
            })
          }
        }

        this.handleRenewProductCalc()
      } else {//新保
        this.styleActiveIndexA = index;//改变方案名称选中样式

        // 如果存在月缴的json,并且当前报价因子中没有‘是否月缴’，则将‘是否月缴’加入当前报价因子中
        if (this.monthPayEntries.length > 0) {
          if (this.common.indexOfArr(this.styleList[this.styleActiveIndexA].prdSpecificationCalcs, 'name', '是否月缴') == false) {
            this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.push({
              name: '是否月缴',
              order: this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.length,
              entries: this.monthPayEntries
            })
          }
        }

        this.getInputAge()

        this.handleProductCalc()
      }
    },

    handleClick(items, id, isRenewInsurance) {
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
        this.handleRenewProductCalc()
      } else {//新保
        this.handleProductCalc()
      }
    },
    //月缴处理
    monthHandleClick(items, id, isRenewInsurance) {
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
        this.getRenewPriceAndDiscountPrice()
      } else {//新保
        this.monthPayType = id;
        this.getNewPriceObj()
      }
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
      this.handleRenewProductCalc(() => {
        this.upParams = {
          price: this.renewStyleList[this.styleActiveIndexB].price,
          prdItemId: this.renewStyleList[this.styleActiveIndexB].prdItemId,
          styleId: this.renewStyleList[this.styleActiveIndexB].styleId,
          calcIds: this.renewCalcIds,
          calcIdKeys: this.renewCalcIdKeys
        }
        window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams));
        window.sessionStorage.setItem('currentStyleName', this.styleList[this.styleActiveIndexA].styleName)
        window.sessionStorage.setItem('customerService', this.itemData.customerService)
        window.sessionStorage.setItem('customerLogo', this.itemData.customerLogo)
        window.sessionStorage.setItem('prdTheme', this.itemData.prdTheme)
        window.sessionStorage.setItem('productEndDate', this.itemData.productEndDate);
        window.sessionStorage.setItem('channelName', this.channelName);
        window.sessionStorage.setItem('pointKey', this.pointKey);
        window.sessionStorage.setItem('productId', this.$route.query.id);
        window.sessionStorage.setItem('urlParam', this.urlParam);
        window.sessionStorage.setItem('discount', this.discount);//折扣
        window.sessionStorage.setItem('monthPayType', this.renewMonthPayType);//月缴
        window.sessionStorage.setItem('entries', JSON.stringify(this.entriesRenew))//一键续保年龄区间
        //续保核心接口
        this.loadingVisible = true;
        this.$http.post('/sunmc/xubaoHexin/isCompareXubao', {
          insuredCardNo: renewObj.id,
          insuredName: renewObj.name,
          itemId: this.renewStyleList[this.styleActiveIndexB].prdItemId
        }).then(result => {
          if (result.status == 200) {
            if (result.data.status == "10002") {//可续保

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
                  id: this.renewStyleList[this.styleActiveIndexB].prdItemId,
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
      })



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
    //有健康告知页-点击以上情况全无,
    healthye() {
      this.canScroll()
      this.showHealth = false;
      this.onSensors2('proDetails_dianjiyishangqingkuangquanwu', '详情页-点击以上情况全无')
      //CCH埋点
      this.handleCCH({
        'orgCode': this.orgCode,
        'channelCode': this.channelCode,
        'pageName': this.channelName + this.itemData.prdName + '-健康告知页',
        'pointKey': 'V2_' + this.channelName + '_' + this.itemData.prdName + '-详情页面_健康告知页_以上情况全无',
        'productId': this.$route.query.id,
        'url': window.location.href,
        'policyNo': '',
        'clientInfo': {}
      })

      this.gotoNextPage()
    },
    //一键续保：根据年龄计算保费
    getCalculatedPrice(age, day) {
      let arr = this.renewStyleList[this.styleActiveIndexB].prdSpecificationCalcs
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == '年龄') {
          this.entriesRenew = arr[i].entries
        }
      }
      if (this.entriesRenew && this.entriesRenew.length > 0) {
        var isContentAge = false;
        for (var i = 0; i < this.entriesRenew.length; i++) {
          var entry = this.entriesRenew[i]
          // console.log('entry====>'+JSON.stringify(entry));
          if (this.common.isContent(entry.value, age, day)) {
            isContentAge = true;
            this.calculateAgeIndex = this.common.getAgeIndexByCalcIdKeys(this.renewCalcIdKeys)
            this.calculateAgeId = entry.id;
            this.handleRenewProductCalc()
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
      if (this.fromListPage == 'true') {
        return false
      }
      //判断产品是否过期或下架
      //若channelCode为空
      if (this.itemData.status == 0 || !this.common.checkMsgNull(this.channelCode)) {
        this.onToast("系统维护中！")
        return false
      }
      if (this.itemData.status == 1) {//若产品状态正常
        if (this.common.checkMsgNull(this.itemData.productEndDate)) {
          //此种写法兼容各浏览器new Date() invalid date问题
          var productEndDate = new Date(this.itemData.productEndDate.replace(new RegExp(/-/gm), "/"));
          if (productEndDate.getTime() < new Date().getTime()) {//产品结束日期小于当前日期
            this.onToast("系统维护中！")
            return false
          }
        }
      } else {
        this.onToast("系统维护中！")
        return false
      }
      // 点击确认投保时，再获取entries、sheBaoEntries、sexEntries、upParams,因为这个数据是下个页面需要的
      let arr = this.styleList[this.styleActiveIndexA].prdSpecificationCalcs
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == '年龄') {
          this.entries = arr[i].entries
        } else if (arr[i].name == '社保情况') {
          this.sheBaoEntries = arr[i].entries
        } else if (arr[i].name == '性别') {
          this.sexEntries = arr[i].entries
        } else if (arr[i].name == '方案被保人数') {
          this.fabbrsEntries = arr[i].entries
        }
      }
      this.getCalcIdsAndCalcIdKeys()
      this.upParams = {
        price: this.styleList[this.styleActiveIndexA].price,
        prdItemId: this.styleList[this.styleActiveIndexA].prdItemId,
        styleId: this.styleList[this.styleActiveIndexA].styleId,
        calcIds: this.calcIds,
        calcIdKeys: this.calcIdKeys
      }

      window.sessionStorage.setItem('currentStyleName', this.styleList[this.styleActiveIndexA].styleName)
      window.sessionStorage.setItem('customerService', this.itemData.customerService)
      window.sessionStorage.setItem('customerLogo', this.itemData.customerLogo)
      window.sessionStorage.setItem('prdTheme', this.itemData.prdTheme)
      window.sessionStorage.setItem('productEndDate', this.itemData.productEndDate);
      window.sessionStorage.setItem('itemData', JSON.stringify(this.itemData))
      window.sessionStorage.setItem('channelName', this.channelName);
      window.sessionStorage.setItem('pointKey', this.pointKey);//是对的 只精确到页面名称
      window.sessionStorage.setItem('urlParam', this.urlParam);
      window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams));
      window.sessionStorage.setItem('discount', this.discount);//折扣
      window.sessionStorage.setItem('monthPayType', this.monthPayType);//月缴
      window.sessionStorage.setItem('firstPremium', this.discountData.firstPremium);//首期保费
      window.sessionStorage.setItem('entries', JSON.stringify(this.entries))//年龄区间
      window.sessionStorage.setItem('sheBaoEntries', JSON.stringify(this.sheBaoEntries))//社保区间
      window.sessionStorage.setItem('sexEntries', JSON.stringify(this.sexEntries))//性别区间
      window.sessionStorage.setItem('fabbrsEntries', JSON.stringify(this.fabbrsEntries))//方案被保人数 区间（爱健康2020用）

      //投保份数校验
      this.$http.post('/sunmc/checkProductIsSale/checkProduct', {
        productId: this.prdId,
        orgcode: this.orgCode
      }).then(res => {
        if (res.data.code !== 10006) {//除了10006状态,都不可购买
          this.onToast(res.data.msg)
          return
        } else {//可以购买
          //CCH埋点
          this.handleCCH({
            'orgCode': this.orgCode,
            'channelCode': this.channelCode,
            'pageName': this.channelName + this.itemData.prdName + '-投保方案选择页',
            'pointKey': 'V2_' + this.channelName + '_' + this.itemData.prdName + '-详情页面_立即投保_确认投保',
            'productId': this.$route.query.id,
            'url': window.location.href,
            'policyNo': '',
            'clientInfo': {}
          })

          //健康页面
          if (this.handleHealthPopPageShowOrNo() && this.isXubao != 1) {//有健康告知并且不是续保
            this.showHealth = true;//则显示健康告知页
            this.noScroll()
          } else {//没有健康告知页的情况
            this.showHealth = false
            this.gotoNextPage()
          }
        }
      }).catch(e => {
        console.log(e)
        this.onToast(e.response.data.msg);
        return;
      });
    },
    handleHealthPopPageShowOrNo() {
      if (this.itemData.healths.length) {
        for (let i = 0; i < this.itemData.healths.length; i++) {
          if (this.itemData.healths[i].type == 1) {
            return true
          }
        }
      }
      return false
    },
    gotoNextPage() {
      let path = ''
      if (this.isXubao == 1) {
        path = "/xubaoProInsur";//续保页面
      } else if (this.fabbrsEntries.length > 0) {// 如果方案报价因子中有“方案被保人数”，则走页面：ProInsured
        path = '/ProInsured' // 爱健康2020版 走这个页面
      } else {
        path = "/ProInsur";//正常投保页面
      }

      this.$router.push({
        path: path,
        query: {
          prdId: this.prdId,
          styleId: this.styleList[this.styleActiveIndexA].styleId,
          id: this.styleList[this.styleActiveIndexA].prdItemId,
          channelCode: this.channelCode,
          orgCode: this.orgCode,
          oldPolicyNo: this.oldPolicyNo,//接收不到数据,不会传至下一页面
          openid: this.openid,
        }
      })
    },
    showContent(value, content) {
      if (!value) {
        this.popupVisibledetail = "";
        this.maskcontent = content;
      } else {
        window.location.href = content;
      }
    },
    share(itemid, itemcode) {
      this.$router.push({
        name: "productshare",
        params: { itemid: this.prdId, itemcode: this.channelCode }
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
      this.prdDutysIndex = index
    },
    getAd() {
      let keyName = this.getLocalStorageKey('getADByProductIdAndOrgId1')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        if (localKey.data.code == 200000) {
          this.adList = localKey.data.data
        }
      } else {
        this.$http.post("prdmc/prdmcShop/getADByProductIdAndOrgId", {
          productId: this.prdId,
          orgCode: this.orgCode,
        }).then(res => {
          if (res.status == 200) {
            res = this.common.myReplaceAllUrl(res)
            this.common.setMyLocalStorage(keyName, res)
            if (res.data.code == 200000) {
              this.adList = res.data.data
            }
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    //转化数据API对接
    platformOCPC() {
      let url = window.location.href;

      /*************百度搜索、信息流API(根据DC码区分)*************/
      if (this.channelCode === 'DC21MD0200050001') {//百度搜索
        let baiduParams = {
          data: {
            callback: url,
            eventType: 7,//购买按钮点击(仅支持搜索推广)
          },
          dcCode: this.channelCode
        };
        this.usePlatformAPI(baiduParams);
      }
      if (this.channelCode === 'DC21MD0200050008') {//百度信息流
        let baiduParams = {
          data: {
            callback: url + "&bd_vid={{BD_VID}}",
            eventType: 3,//表单提交成功(搜索推广,信息流推广都支持)
          },
          dcCode: this.channelCode
        };
        this.usePlatformAPI(baiduParams);
      }
      /************************抖音头条****************************/

      if (this.channelCode === "DC21MD1110040002" || this.channelCode === "DC21MD0200060001" || this.channelCode === "DC21MD0200170001") {
        // let clickid = this.common.getUrlValueByName('clickid');//在url中获取clickid值
        let douyinParams = {
          data: {
            callback: encodeURIComponent(url),
            eventType: 3//表单提交
          },
          dcCode: this.channelCode
        }
        this.usePlatformAPI(douyinParams);
      }

      /***************************快手****************************/
      if (this.channelCode === "DC21AD1110040001") {
        let callback = this.common.getUrlValueByName('callback');//在url中获取callback值
        let kuaishouParams = {
          data: {
            callback: callback,
            eventType: 9//表单提交
          },
          dcCode: this.channelCode
        }
        this.usePlatformAPI(kuaishouParams);

      }
    },
    usePlatformAPI(param) {
      //将入参对象转为键值对形式
      var params = new URLSearchParams()
      params.append('buriedDate', JSON.stringify(param))

      this.$http.post("/sunmc/buryingpointController/sendBuriedPoint", params)
        .then(result => {
          if (result.data.code == 200) {
            if (param.dcCode === 'DC21MD0200050001') {//百度搜索
              this.baiduSearchCount++;
              console.log('转数API-百度搜索' + result.data.msg + '--成功次数' + this.baiduSearchCount);
            } else if (param.dcCode === 'DC21MD0200050008') {//百度信息流
              this.baiduInforFlowCount++;
              console.log('转数API-百度信息流' + result.data.msg + '--成功次数' + this.baiduInforFlowCount);
            } else if (param.dcCode === 'DC21MD1110040002') {//抖音
              this.douyinCount++;
              console.log('转数API-抖音' + result.data.msg + '--成功次数' + this.douyinCount);
            } else if (param.dcCode === 'DC21AD1110040001') {//快手
              this.kuaishouCount++;
              console.log('转数API-快手' + result.data.msg + '--成功次数' + this.kuaishouCount);
            }

          } else {
            console.log('转数API--' + param.dcCode + '--' + "状态" + result.data.code + '--' + result.data.msg);
          }
        }).catch(e => {
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
.shade_content .insured-name {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.15rem;
  color: #333;
  font-weight: 700;
  padding-left: 0.15rem;
  position: relative;
}
.shade_content .insured-name .title-closeImg {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shade_content .insured-name .title-closeImg img {
  width: 0.13rem;
  height: 0.13rem;
}
.proitem {
  font-size: 0.14rem;
}
.proitem >>> .mint-popup {
  border-radius: 5px;
}
.profoot {
  display: flex;
  align-items: center;
  width: 100%;
  background: #ffffff;
  font-size: 0.14rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  margin-bottom: constant(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  margin-bottom: env(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
}
.profoot a {
  height: 0.54rem;
  width: 0.54rem;
  line-height: 0.54rem;
  padding: 0.08rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eee;
}
.profoot a img {
  width: 100%;
  height: 100%;
}
.profoot .profootcontent {
  font-size: 0.18rem;
  font-weight: 700;
  height: 0.54rem;
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #f52525;
}
.profoot .profootcontent .qk2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.16rem;
}
.profoot .profootcontent .qk2 .bottom {
  font-size: 0.12rem;
  color: #9c9c9c;
}
.profoot .profootcontent .qk2 .bottom.line {
  text-decoration: line-through;
}
.profoot .profootright {
  height: 0.54rem;
  text-align: center;
  line-height: 0.54rem;
  color: #ffffff;
  padding: 0 0.15rem;
  font-size: 0.16rem;
  font-weight: 700;
  width: 1.7rem;
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
.common-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 3.75rem;
  height: 100%;
  z-index: 1;
  display: none;
}
.shade_content {
  background: #fff;
  width: 3.75rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  z-index: 1;
  margin-bottom: constant(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
  margin-bottom: env(safe-area-inset-bottom); /*为底下圆弧的高度 34px*/
}

.selected_div {
  height: auto;
  overflow: hidden;
  position: relative;
  padding-left: 0.15rem;
  display: flex;
  align-items: center;
  padding-top: 0.02rem;
}
.selected_div-name {
  width: 0.8rem;
  font-size: 0.14rem;
  color: #333;
  margin-right: 0.05rem;
}
.selected_div .styleList-wrap {
  display: flex;
  flex-wrap: wrap;
  max-width: 2.6rem;
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
  background: url("../../../static/images/bottom.png") no-repeat;
  background-size: 0.16rem 0.2rem;
  background-position: 96% 50%;
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
  margin-top: 0.2rem;
  position: relative;
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
.profootcontent em {
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
  height: 0.54rem;
  text-align: center;
  line-height: 0.54rem;
  padding: 0 0.15rem;
  border: 1px solid;
  font-size: 0.16rem;
  font-weight: 700;
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
.renewalInsuranceCon h4 {
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.16rem;
  color: #434343;
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
  font-size: 0.2rem;
}
.xubao .xbBtn {
  background: #0bbd70;
  color: #ffffff;
  text-align: center;
  height: 0.54rem;
  line-height: 0.54rem;
  width: 1.7rem;
  font-size: 0.16rem;
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
  position: relative;
}
.age-input-wrap input {
  font-size: 0.15rem;
  padding-left: 0.15rem;
  border: 0;
  width: 0.8rem;
}
.age-input-wrap::after {
  content: "岁";
  position: absolute;
  right: 5px;
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
sub {
  font-size: 0.14rem;
}
@keyframes detail-move-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes detail-move-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
.detail-enter-active {
  animation: detail-move-in 0.3s;
}
.detail-leave-active {
  animation: detail-move-out 0.3s;
}
</style>