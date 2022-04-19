<template>
  <div class="newDetails-wrap">
    <mymask :loadingVisible="loadingVisible" :loadingVisibleContent="loadingVisibleContent"></mymask>
    <popup-picker :show.sync="showPopupPicker" :show-cell="false" :columns=3 :data="data93Arr" v-model="current93Data" @on-hide="onPopupPickerHide"></popup-picker>
    <BbrPopPage :showBbrPopPage="showBbrPopPage" @onBbrPopPage="onBbrPopPage" @onHideBbrPopPage="onHideBbrPopPage" :channelName="channelName"></BbrPopPage>
    <Traceback></Traceback>
    <commonpop :showPDFPop="showPDFPop" :showCommonListPop="showCommonListPop" :showCommonContentPop="showCommonContentPop" :pdfUrl="pdfUrl" :commonListTitle="commonListTitle" :commonListArr="commonListArr" :commonContent="commonContent" @onHidePDFPop="onHidePDFPop" @onHideCommonListPop="onHideCommonListPop" @onHideCommonContentPop="onHideCommonContentPop" @onShowCommonContentPop="onShowCommonContentPop"></commonpop>
    <!--------------------------------------- 责任详情弹框 开始 --------------------------------------->
    <transition name="bounce">
      <div class="commonContentPop" v-show="showZerenDetailPop">
        <div class="commonContentPop-title-wrap">
          <!-- <div class="back" @click="onZerenDetailBack">
            <img style="width:.1rem;height: .15rem;" src="./img/fhjt.png" alt="">
          </div> -->
          <div class="commonContentPop-title">保障详情</div>
        </div>
        <div class="commonContentPop-content-wrap" v-if="zuheList.length > 0">
          <div class="zeren-wrap" v-for="item of zuheList[0].itemList" :key="item.descriptionTitle">
            <div class="zeren-title">{{item.descriptionTitle}}</div>
            <div class="zeren-content" v-html="item.description"></div>
          </div>
        </div>
        <div class="common-close-btn" @click="onZerenDetailBack">返回</div>
      </div>
    </transition>
    <!--------------------------------------- 责任详情弹框 结束 --------------------------------------->
    <!--------------------------------------- 返回顶部 开始 --------------------------------------->
    <div class="gotop-wrap" v-show="showGoTop" @click="onClickGoTop">
      <img src="./img/top.png" alt="">
    </div>
    <!--------------------------------------- 返回顶部 结束 --------------------------------------->
    <!-- 健康告知 -->
    <health :channelName="channelName" page="新模板页面" :showHealth='showHealth' :itemData="itemData" @hideHealth="onHideHealth" @onHealthye="healthye"></health>
    <!--------------------------------------- 轮播部分 开始 --------------------------------------->
    <div class="slide-show-wrapper">
      <swiper :options="swiperOption" ref="mySwiper">
        <template v-if="lunboImgArr.length > 0">
          <swiper-slide v-for="(imgSrc, index) in lunboImgArr" :key="'lunbo' + index">
            <img ref="imgFirst" :src="imgSrc" class="swiper-img" v-if="index === 0">
            <img :src="imgSrc" class="swiper-img" v-else>
          </swiper-slide>
        </template>
        <div v-show="showPageNum" class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div v-show="showImgBtn" class="video-wrap">
        <video ref="video" @click="onVideoClick" @ended="onVideoEnded" :src="lunboVideo" x5-playsinline="true" playsinline="true" webkit-playsinline="true" preload="auto">
        </video>
      </div>
      <div v-show="showVideoBtn" class="video-btn" @click="onShowImgBtn"><img src="./img/video-btn.png" alt=""></div>
      <div v-show="showImgBtn" class="img-btn" @click="onShowVideoBtn"><img src="./img/img-btn.png" alt=""></div>
      <img v-show="showStartBtn" @click="onStartVideo()" src="./img/video_btn.png" class="start_btn">
    </div>
    <!--------------------------------------- 轮播部分 结束 --------------------------------------->
    <!-- 轮播图下广告 -->
    <AD1 :adList="common.getAdListBySeat(adList, 3)" seat="3"></AD1>
    <!--------------------------------------- 保障范围 开始 --------------------------------------->
    <div class="bzfw-wrap" v-if="currentJCBZ">
      <div class="top">
        <div class="top-title">保障范围</div>
        <div class="top-more" @click="onShowZerenDetailPop()"><span>查看保障</span><img src="./img/icon_21.png" alt="" srcset=""></div>
      </div>
      <template v-for="item of currentJCBZ.clauseLiabilityList" v-if="item.showThisAge && item.clauseLiabilityList && item.clauseLiabilityList.length > 1">
        <div class='bzfw-title' :key="item.protectName">
          <div class="title-item" @click="onChangeCurrentName('基础保障', item2.protectName)" v-for="item2 of item.clauseLiabilityList" :key="item2.protectName" :class='{active:item.currentName==item2.protectName}' :style="{border: (item.currentName==item2.protectName ? '1px solid ' + itemData.prdTheme : '1px solid #e2e2e2'),color: (item.currentName==item2.protectName ? itemData.prdTheme : '#000')}">{{item2.protectName}}</div>
        </div>
      </template>
      <template class="content-item" v-for="item of currentJCBZ.clauseLiabilityList" v-if="item.showThisAge">
        <template class="content-item" v-for="item2 of item.clauseLiabilityList" v-if="item.currentName == item2.protectName">
          <template class="content-item" v-for="item3 of item2.clauseLiabilityList">
            <div class="content" :key="item3.protectName + 'content'">
              <div class="content-item">
                <div class="left">
                  <div class="left-top">{{item3.protectName}}</div>
                </div>
                <div class="remark" v-if="item3.clauseLiabilityList.length == 1">{{item3.clauseLiabilityList[0].showName}}</div>
                <div class="remark" v-else>
                  <select v-model="item3.currentName" @change="getNewPriceObj">
                    <option v-for="option in item3.clauseLiabilityList" :value="option.showName" :key="option.showName + item3.protectName">{{option.showName}}</option>
                  </select>
                </div>
              </div>
            </div>
          </template>
        </template>
      </template>
      <template v-for="item of currentZuheList" v-if="item.protectName == '基础保障'">
        <div class="sj-wrap" :key="item.protectName">
          <div class="sj-head">
            <div class="sj-head-icon" :style="{ backgroundColor: itemData.prdTheme }"></div>
            <span>可选升级方案</span>
          </div>
        </div>
      </template>
      <template v-for="item of currentZuheList" v-if="item.protectName != '基础保障'">
        <div class="kexuan-item-wrap" :key="item.protectName">
          <div class="kexuan-select-icon" @click="handleSelectIcon(item)" v-show="currentZuheList.length > 2">
            <img src="./img/icon07_y.png" alt="" v-if="item.hasSelected">
            <img src="./img/icon07_n.png" alt="" v-else>
          </div>
          <template v-for="item2 of item.clauseLiabilityList" v-if="item2.showThisAge">
            <div class="kexuan-item">
              <div class="kexuan-top">
                <div class="kexuan-top-left">{{item.protectName}}</div>
                <div class="kexuan-top-right" v-show="!item.hasSelected" @click="handleShowDetail(item)">查看详情<span :class="item.hasShow ? 'arrow-up' : 'arrow-down'"></span></div>
                <div class="kexuan-top-right" v-show="item.hasSelected">
                  <template v-if="item2.clauseLiabilityList.length == 1">{{item2.clauseLiabilityList[0].protectName}}</template>
                  <template v-else>
                    <select v-model="item2.currentName" @change="onChangeCurrentName(item2.protectName, item2.currentName)">
                      <option v-for="option in item2.clauseLiabilityList" :value="option.protectName" :key="option.protectName">{{option.protectName}}</option>
                    </select>
                  </template>
                </div>
              </div>
              <div class="kexuan-body" v-show="item.hasShow">
                <template v-for="item3 of item2.clauseLiabilityList" v-if="item2.currentName == item3.protectName">
                  <div class="kexuan-body-item" :key="subsubItem.protectName" v-for="subsubItem of item3.clauseLiabilityList" v-if="subsubItem.protectName != ''">
                    <div class="kexuan-body-left">{{subsubItem.protectName}}</div>
                    <div class="kexuan-body-right" v-show="item.hasSelected">
                      <template v-if="subsubItem.clauseLiabilityList.length == 1">{{subsubItem.clauseLiabilityList[0].showName}}</template>
                      <template v-else>
                        <select v-model="subsubItem.currentName" @change="getNewPriceObj">
                          <option v-for="option in subsubItem.clauseLiabilityList" :value="option.showName" :key="option.showName + 'aaa'">{{option.showName}}</option>
                        </select>
                      </template>
                    </div>
                  </div>
                </template>
              </div>

            </div>
          </template>
        </div>
      </template>
      <div class="bxtk-wrap">
        <div class="item" @click="onShowCommonListArr(1)">
          <img src="./img/bxtk.png" alt="">
          <span>保险条款</span>
        </div>
        <div class="line"></div>
        <div class="item" @click="onShowCommonListArr(2)">
          <img src="./img/gmxz.png" alt="">
          <span>购买须知</span>
        </div>
        <template v-if="JSON.stringify(flbContent) != '{}'">
          <div class="line"></div>
          <div class="item" @click="onShowCommonContentPop(flbContent)">
            <img src="./img/ckbf.png" alt="">
            <span>查看保费</span>
          </div>
        </template>
      </div>
    </div>
    <!--------------------------------------- 保障范围 结束 --------------------------------------->

    <!-- 投保人信息 -->
    <div class="mk_info" v-show="benrenItems.length">
      <h4 class="title_common title_tbr">投保人信息（本人）</h4>
      <div class="wrap">
        <!-- 投保人姓名 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 1 && item.isShow">
            <div class="item-title">投保人姓名</div>
            <div class="item-value">
              <input type="text" placeholder="请输入本人姓名" :id="'tbr' + item.itemCode" v-model="item.userName" maxlength="30" @blur="onCheckXingming(item.userName), handlePolicyInfoMiddle()" @click="onSensors('新模板页面-填写投保人姓名', $event)">
            </div>
          </div>
        </template>
        <div class="item">
          <!-- 证件类型 -->
          <template v-for="item in benrenItems">
            <div class="item-title" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
              <template v-if="item.options.length > 1">
                <select v-model="item.userName" @change="onIdTypeChange(benrenItems, item.userName), handlePolicyInfoMiddle(), onSensors('新模板页面-选择投保人证件类型', $event)">
                  <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                </select>
              </template>
              <template v-else>
                {{ item.options[0].name }}
              </template>
            </div>
          </template>
          <!-- 证件号码 -->
          <template v-for="item in benrenItems">
            <div class="item-value" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
              <input type="text" placeholder="请输入本人证件号码" :id="'tbr' + item.itemCode" v-model="item.userName" @keyup="onTbrIDKeyup(item.userName)" @blur="onTbrZjhmChange(item.userName), handlePolicyInfoMiddle()" @change="onTbrZjhmChange(item.userName)" @click="onSensors('新模板页面-填写投保人证件号', $event)">
            </div>
          </template>
        </div>
        <!-- 联系电话 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
            <div class="item-title">联系电话</div>
            <div class="item-value">
              <input type="tel" placeholder="请输入本人手机号" :id="'tbr' + item.itemCode" v-model="item.userName" @blur="onCheckSjh(item.userName), handlePolicyInfoMiddle()" @click="onSensors('新模板页面-填写投保人手机号', $event)" maxlength="11">
            </div>
          </div>
        </template>
        <!-- 邮箱 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 7 && item.isShow">
            <div class="item-title">邮箱</div>
            <div class="item-value">
              <input type="text" placeholder="请输入本人邮箱" :id="'tbr' + item.itemCode" v-model="item.userName" @blur="onCheckYouxiang(item.userName)" @click="onSensors('新模板页面-填写邮箱', $event)">
            </div>
          </div>
        </template>
        <!-- 出生日期 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 5 && item.isShow">
            <div class="item-title">出生日期</div>
            <div class="item-value">
              <input type="text" placeholder="请选择出生日期" v-model="item.userName" readonly @click="showBenrenBirthDayPop">
            </div>
          </div>
        </template>
        <!-- 性别 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 2 && item.isShow">
            <div class="item-title">性别</div>
            <div class="item-value">
              <select disabled v-model="item.userName" @change="onSensors('新模板页面-选择投保人性别', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 所在地区 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 12 && item.isShow">
            <div class="item-title">所在地区</div>
            <div class="item-value">
              <input type="text" placeholder="请选择所在地区" :id="'tbr' + item.itemCode" v-model="item.userName" readonly @click="getCity(item),onSensors('新模板页面-选择所在地区', $event)">
            </div>
          </div>
        </template>
        <!-- 职业 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 9 && item.isShow">
            <div class="item-title">职业</div>
            <div class="item-value">
              <input type="text" placeholder="请选择职业" v-model="item.userName" readonly @click="getJob(item),onSensors('新模板页面-选择职业', $event)">
            </div>
          </div>
        </template>
        <!-- 投保份数 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 33 && item.isShow">
            <div class="item-title">投保份数</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择投保份数', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 详细地址 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 15 && item.isShow">
            <div class="item-title">详细地址</div>
            <div class="item-value">
              <input type="text" placeholder="请输入详细地址" :id="'tbr' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写详细地址', $event)">
            </div>
          </div>
        </template>
        <!-- 房屋详细地址 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 40 && item.isShow">
            <div class="item-title">房屋详细地址</div>
            <div class="item-value">
              <input type="text" placeholder="请输入房屋详细地址" :id="'tbr' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写房屋详细地址', $event)">
            </div>
          </div>
        </template>
        <!-- 财产所在地地址 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 25 && item.isShow">
            <div class="item-title">财产所在地地址</div>
            <div class="item-value">
              <input type="text" placeholder="请输入财产所在地地址" :id="'tbr' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写财产所在地地址', $event)">
            </div>
          </div>
        </template>
        <!-- 房屋结构 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 88 && item.isShow">
            <div class="item-title">房屋结构</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择房屋结构', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 是否新车 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 47 && item.isShow">
            <div class="item-title">是否新车</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择是否新车', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 车牌号 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 36 && item.isShow">
            <div class="item-title">车牌号</div>
            <div class="item-value">
              <input type="text" placeholder="请输入车牌号" :id="'tbr' + item.itemCode" v-model="item.userName" maxlength="8" @blur="onCheckCph(item.userName)" @keyup="handleCphOrCjh(item)" @click="onSensors('新模板页面-填写车牌号', $event)">
            </div>
          </div>
        </template>
        <!-- 车架号 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 35 && item.isShow">
            <div class="item-title">车架号</div>
            <div class="item-value">
              <input type="text" placeholder="请输入车架号" :id="'tbr' + item.itemCode" v-model="item.userName" maxlength="17" @blur="onCheckCjh(item.userName)" @keyup="handleCphOrCjh(item)" @click="onSensors('新模板页面-填写车架号', $event)">
            </div>
          </div>
        </template>
        <!-- 证件有效期 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 19 && item.isShow">
            <div class="item-title">证件有效期</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onZjyxqChange(item.userName), onSensors('新模板页面-选择证件有效期', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 证件有效起期 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 23 && item.isShow">
            <div class="item-title">证件有效起期</div>
            <div class="item-value">
              <input type="text" placeholder="请选择证件有效起期" v-model="item.userName" @click="showZjyxqqPop" readonly>
            </div>
          </div>
        </template>
        <!-- 证件有效止期 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 22 && item.isShow">
            <div class="item-title">证件有效止期</div>
            <div class="item-value">
              <input type="text" placeholder="请选择证件有效止期" v-model="item.userName" @click="showZjyxzqPop" readonly>
            </div>
          </div>
        </template>
        <!-- 反洗钱出单传值开关 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 87 && item.isShow && false">
            <div class="item-title">反洗钱</div>
            <div class="item-value">
              <select v-model="item.userName">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 国籍 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 91 && item.isShow">
            <div class="item-title">国籍</div>
            <div class="item-value">
              <select v-model="item.userName" disabled>
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 个人职业 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 92 && item.isShow">
            <div class="item-title">个人职业</div>
            <div class="item-value">
              <select v-model="item.userName">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 是否要发票 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 41 && item.isShow">
            <div class="item-title">是否要发票</div>
            <div class="item-value invoice-wrap" @click="onSwitchInvoice(), onSensors('新模板页面-选择是否开电子发票', $event)">
              <img v-if="showInvoice" src="./img/icon07_y.png" alt="">
              <img v-else src="./img/icon07_n.png" alt="">
              <div>电子发票</div>
            </div>
          </div>
        </template>
        <!-- 发票类型 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 42 && item.isShow">
            <div class="item-title">发票类型</div>
            <div class="item-value invoiceType-wrap">
              <div class="invoiceType-item" v-for="(subItem, index) in item.options" :key="index" @click="onInvoiceType(index,subItem.id), onSensors('新模板页面-选择发票类型', $event)" :style="{backgroundColor: (index === invoiceIndex ? '#fff': '#F6F6F6'),color: (index === invoiceIndex ? itemData.prdTheme : '#444'),border: (index === invoiceIndex ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}">{{subItem.name}}</div>
            </div>
          </div>
        </template>
        <!--发票抬头-->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 46 && item.isShow">
            <div class="item-title">发票抬头</div>
            <div class="item-value">
              <input type="text" placeholder="默认为投保人姓名" :id="'tbr' + item.itemCode" v-model="item.userName" @click="onSensors('新模板页面-填写发票抬头', $event)">
            </div>
          </div>
        </template>

        <!--单位名称-->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 43 && item.isShow">
            <div class="item-title">单位名称</div>
            <div class="item-value">
              <input type="text" placeholder="请输入单位名称" :id="'tbr' + item.itemCode" v-model="item.userName" @click="onSensors('新模板页面-填写单位名称', $event)">
            </div>
          </div>
        </template>
        <!--纳税人识别号-->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 44 && item.isShow">
            <div class="item-title">纳税人识别号</div>
            <div class="item-value">
              <input type="text" placeholder="请输入纳税人识别号" :id="'tbr' + item.itemCode" v-model="item.userName" @click="onSensors('新模板页面-填写纳税人识别号', $event)">
            </div>
          </div>
        </template>
        <!--开户银行-->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 27 && item.isShow">
            <div class="item-title">开户银行</div>
            <div class="item-value">
              <input type="text" placeholder="请输入开户银行" v-model="item.userName" @click="onSensors('新模板页面-填写开户银行', $event)">
            </div>
          </div>
        </template>
        <!--开户银行地址-->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 45 && item.isShow">
            <div class="item-title">开户银行地址</div>
            <div class="item-value">
              <input type="text" placeholder="请输入开户银行地址" v-model="item.userName" @click="onSensors('新模板页面-填写开户银行地址', $event)">
            </div>
          </div>
        </template>

        <!--银行账号-->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 30 && item.isShow">
            <div class="item-title">银行账号</div>
            <div class="item-value">
              <input type="text" placeholder="请输入银行账号" v-model="item.userName" @click="onSensors('新模板页面-填写银行账号', $event)">
            </div>
          </div>
        </template>
        <!-- 31:银行预留手机号 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 31 && item.isShow">
            <div class="item-title">银行预留手机号</div>
            <div class="item-value">
              <input type="text" placeholder="请输入银行预留手机号" v-model="item.userName" @click="onSensors('新模板页面-填写银行预留手机号', $event)">
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 单被保人信息 -->
    <div class="mk_info" v-show="danBbrItems.length">
      <h4 class="title_common title_danbbr">被保人信息（为谁投保）</h4>
      <!-- 与投保人关系 展示 -->
      <template v-for="item in danBbrItems">
        <div class="itemBbrName-wrap" :key="item.itemCode + 'wai'" v-if="item.itemCode == 8">
          <div @click="onSwitchDanBbrRelation(itemy.id, idx)" class="itemBbrName" :style="{backgroundColor: (idx == danBbrRelationIndex ? '#FFF8F6' : '#F6F6F6'),color: (idx == danBbrRelationIndex ? itemData.prdTheme: '#444'),border: (idx == danBbrRelationIndex ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}" v-for="(itemy,idx) in item.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</div>
        </div>
      </template>
      <template v-for="itemWai in danBbrItems">
        <template v-if="itemWai.itemCode == 8 && itemWai.userName != 1">
          <div class="wrap" :key="itemWai.itemCode">
            <!-- 被保险人姓名 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 1 && item.isShow">
                <div class="item-title">被保险人姓名</div>
                <div class="item-value">
                  <input type="text" placeholder="请输入被保险人姓名" :id="'danbbr' + item.itemCode" v-model="item.userName" maxlength="30" @blur="onCheckXingming(item.userName)" @click="onSensors('新模板页面-填写被保人姓名', $event)">
                </div>
              </div>
            </template>
            <div class="item">
              <!-- 证件类型 -->
              <template v-for="item in danBbrItems">
                <div class="item-title" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
                  <template v-if="item.options.length > 1">
                    <select v-model="item.userName" @change="onIdTypeChange(danBbrItems, item.userName), onSensors('新模板页面-选择被保人证件类型', $event)">
                      <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                    </select>
                  </template>
                  <template v-else>
                    {{ item.options[0].name }}
                  </template>
                </div>
              </template>
              <!-- 证件号码 -->
              <template v-for="item in danBbrItems">
                <div class="item-value" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
                  <input type="text" placeholder="请输入被保险人证件号码" :id="'danbbr' + item.itemCode" v-model="item.userName" @keyup="onDbbrIDKeyup(item.userName)" @blur="onDanBbrZjhmChange(item.userName)" @change="onDanBbrZjhmChange(item.userName)" @click="onSensors('新模板页面-填写被保人证件号码', $event)">
                </div>
              </template>
            </div>
            <!-- 联系电话 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
                <div class="item-title">联系电话</div>
                <div class="item-value">
                  <input type="tel" placeholder="请输入被保险人手机号" :id="'danbbr' + item.itemCode" v-model="item.userName" @blur="onCheckSjh(item.userName)" @click="onSensors('新模板页面-填写被保人手机号', $event)" maxlength="11">
                </div>
              </div>
            </template>
            <!-- 邮箱 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 7 && item.isShow">
                <div class="item-title">邮箱</div>
                <div class="item-value">
                  <input type="text" placeholder="请输入被保险人邮箱" :id="'danbbr' + item.itemCode" v-model="item.userName" @blur="onCheckYouxiang(item.userName)" @click="onSensors('新模板页面-填写被保人邮箱', $event)">
                </div>
              </div>
            </template>
            <!-- 出生日期 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 5 && item.isShow">
                <div class="item-title">出生日期</div>
                <div class="item-value">
                  <input type="text" placeholder="请选择出生日期" v-model="item.userName" readonly @click="showDanBbrBirthDayPop">
                </div>
              </div>
            </template>
            <!-- 性别 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 2 && item.isShow">
                <div class="item-title">性别</div>
                <div class="item-value">
                  <select disabled v-model="item.userName" @change="onSensors('新模板页面-选择被保人性别', $event)">
                    <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                  </select>
                </div>
              </div>
            </template>
            <!-- 职业 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 9 && item.isShow">
                <div class="item-title">职业</div>
                <div class="item-value">
                  <input type="text" placeholder="请选择职业" v-model="item.userName" readonly @click="getJob(item),onSensors('新模板页面-选择职业', $event)">
                </div>
              </div>
            </template>
            <!-- 详细地址 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 15 && item.isShow">
                <div class="item-title">详细地址</div>
                <div class="item-value">
                  <input type="text" placeholder="请输入详细地址" :id="'danbbr' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写详细地址', $event)">
                </div>
              </div>
            </template>
            <!-- 财产所在地地址 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 25 && item.isShow">
                <div class="item-title">财产所在地地址</div>
                <div class="item-value">
                  <input type="text" placeholder="请输入财产所在地地址" :id="'danbbr' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写财产所在地地址', $event)">
                </div>
              </div>
            </template>
            <!-- 证件有效期 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 19 && item.isShow">
                <div class="item-title">证件有效期</div>
                <div class="item-value">
                  <select v-model="item.userName" @change="onDbbrZjyxqChange(item.userName), onSensors('新模板页面-选择证件有效期', $event)">
                    <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                  </select>
                </div>
              </div>
            </template>
            <!-- 证件有效起期 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 23 && item.isShow">
                <div class="item-title">证件有效起期</div>
                <div class="item-value">
                  <input type="text" placeholder="请选择证件有效起期" v-model="item.userName" @click="showDbbrZjyxqqPop" readonly>
                </div>
              </div>
            </template>
            <!-- 证件有效止期 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 22 && item.isShow">
                <div class="item-title">证件有效止期</div>
                <div class="item-value">
                  <input type="text" placeholder="请选择证件有效止期" v-model="item.userName" @click="showDbbrZjyxzqPop" readonly>
                </div>
              </div>
            </template>
            <!-- 反洗钱出单传值开关 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 87 && item.isShow && false">
                <div class="item-title">反洗钱</div>
                <div class="item-value">
                  <select v-model="item.userName">
                    <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                  </select>
                </div>
              </div>
            </template>
            <!-- 国籍 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 91 && item.isShow">
                <div class="item-title">国籍</div>
                <div class="item-value">
                  <select v-model="item.userName" disabled>
                    <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                  </select>
                </div>
              </div>
            </template>
            <!-- 个人职业 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 92 && item.isShow">
                <div class="item-title">个人职业</div>
                <div class="item-value">
                  <select v-model="item.userName">
                    <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                  </select>
                </div>
              </div>
            </template>
          </div>
        </template>
      </template>
    </div>

    <!-- 标的信息 -->
    <div class="mk_info" v-show="targetItems.length">
      <h4 class="title_common title_bzxq">标的信息</h4>
      <div class="wrap">
        <!-- 房屋结构 -->
        <template v-for="item in targetItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 88 && item.isShow">
            <div class="item-title">房屋结构</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择房屋结构', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 地址 -->
        <template v-for="item in targetItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 93 && item.isShow">
            <div class="item-title">地址</div>
            <div class="item-value">
              <input type="text" placeholder="请选择地址" :id="'target' + item.itemCode" v-model="item.userName" @click="onClick93Input(), onSensors('新模板页面-选择地址', $event)" readonly>
            </div>
          </div>
        </template>
        <!-- 详细地址 -->
        <template v-for="item in targetItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 15 && item.isShow">
            <div class="item-title">详细地址</div>
            <div class="item-value">
              <input type="text" placeholder="请输入详细地址" :id="'target' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写财产所在地地址', $event)">
            </div>
          </div>
        </template>

      </div>
    </div>
    <!--------------------------------------- 保障详情 开始 --------------------------------------->
    <div class="mk_info">
      <h4 class="title_common title_bzxq">其他</h4>
      <div class="wrap">
        <!-- 保险期间 -->
        <div class="item" v-show="zuheList.length > 1">
          <div class="item-title">保险期间</div>
          <div class="item-value">
            <!-- <div @click="onSwitchlevel1Index(index)" class="item-bxqj" :style="{backgroundColor: (index == level1Index ? '#FFF8F6' : '#F6F6F6'),color: (index == level1Index ? itemData.prdTheme: '#444'),border: (index == level1Index ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}" v-for="(item, index) in zuheList" :key="item.protectName">{{item.protectName}}</div> -->
            <select @change="onSwitchlevel1Index()" v-model="level1Index">
              <option :value="index" v-for="(item, index) in zuheList" :key="item.protectName">{{item.protectName}}</option>
            </select>
          </div>
        </div>
        <!-- 保险日期 -->
        <div class="item" v-show="JSON.stringify(dateObj) != '{}'">
          <div class="item-title">保险日期</div>
          <div class="item-value date-wrap">
            <div v-if="pagedata.takesEffect == 0" class="wrap-disabled">{{dateObj.qiBaoDate}}</div>
            <div v-else @click="showQiBaoDatePop">{{dateObj.qiBaoDate}}</div>
            <div class="zhi">至</div>
            <div v-if="pagedata.insuranceIntervalType == 0" class="wrap-disabled">{{dateObj.zhongBaoDate}}</div>
            <div v-else @click="showZhongBaoDatePop">{{dateObj.zhongBaoDate}}</div>
            <img src="./img/icon_date_red.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--------------------------------------- 保障详情 结束 --------------------------------------->
    <!-- 用户福利广告 -->
    <AD1 :adList="common.getAdListBySeat(adList, 1)" seat="1"></AD1>
    <!-- 导航栏部分 -->
    <nav-bar :itemData="itemData"></nav-bar>
    <!--------------------------------------- 说明文字部分 开始 --------------------------------------->
    <tykf></tykf>
    <!--------------------------------------- 说明文字部分 结束 --------------------------------------->

    <!-- 底部展示 -->

    <div class="footer">
      <!--------------------------------------- 底部-我已确认部分 开始 --------------------------------------->
      <!--------------------------------------- 底部-我已确认部分 结束 --------------------------------------->
      <Xieyi :checkedFlag="checkedFlag" :khsIsReadFlag="khsIsReadFlag" :khsPopShowFlag="khsPopShowFlag" :khsArr="khsArr" @onSwitchCheckedFlag="onSwitchCheckedFlag" @onClickYuqr="onClickYuqr" @onHideKhsPop="onHideKhsPop" @onClickKhsTab="onClickKhsTab" @onShowCommonContentPop="onShowCommonContentPop" @onClickTabBtn="onClickTabBtn"></Xieyi>
      <!--------------------------------------- 底部-立即投保部分 开始 --------------------------------------->
      <div class="footer-bottom">
        <a :href="itemData.customerService" @click="onClickKf">
          <img :src="itemData.customerLogo" />
        </a>

        <div class="center">
          <template v-if="itemData.giveInsurance == 1">
            <div class="calcLoading" v-if="showCalcLoading">
              <span>计算中</span>
              <mt-spinner type="triple-bounce"></mt-spinner>
            </div>
            <div v-else>
              <div class="qk1" v-if="newPriceObj.qkType == 1">￥{{newPriceObj.price}}</div>
              <!-- <div class="qk2" v-else-if="newPriceObj.qkType == 2">每月￥{{newPriceObj.monthPrice}}</div> -->
              <div class="qk2" v-else-if="newPriceObj.qkType == 2">
                <div class="top">￥{{newPriceObj.price}}</div>
                <div class="bottom line">￥{{newPriceObj.oldPrice}}</div>
              </div>
            </div>
          </template>
          <div v-else-if="itemData.giveInsurance == 0">￥0.00</div>
        </div>
        <div class="right" @click="handleLjtb(), onSensors('新模板页面-点击立即投保',$event)">
          <span v-if="itemData.giveInsurance == 1">
            立即投保
          </span>
          <span v-else>免费投保</span>
        </div>
      </div>
      <!--------------------------------------- 底部-立即投保部分 结束 --------------------------------------->
    </div>
  </div>
</template>

<script>
import weixin from 'weixin-js-sdk'
import { PopupPicker } from 'vux'
import { EXIF } from '../../../static/exif'
import { Toast, MessageBox, Spinner, Indicator } from 'mint-ui'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import AD1 from '@/components/ad/ad1.vue'
import Health from '@/components/newComponents/health/Health.vue'
import NavBar from '@/components/newComponents/navbar/NavBar.vue'
import jquery from 'jquery'
import { address } from '@/components/newComponents/city/city.js'
import { job } from '@/components/newComponents/job/job.js'
import jobData from '@/components/newComponents/job/job.json'
import Traceback from '@/components/newComponents/traceback/Traceback.vue'
import Xieyi from '@/components/newComponents/xieyi/Xieyi.vue'
import Commonpop from '@/components/newComponents/commonpop/Commonpop.vue'
import BbrPopPage from '@/components/newComponents/bbrPopPage/BbrPopPage.vue'
import Mymask from '@/components/newComponents/mymask/Mymask.vue'
import Tykf from '@/components/newComponents/tykf/Tykf.vue'
export default {
  name: 'Combination',
  components: {
    PopupPicker,
    AD1,
    Health,
    NavBar,
    swiper,
    swiperSlide,
    Traceback,
    Xieyi,
    Commonpop,
    BbrPopPage,
    Mymask,
    Tykf
  },
  data() {
    return {
      startTime: new Date().getTime(),
      currentJCBZ: {},
      currentZuheList: [],
      level1Index: 0,
      zuheList: [],
      isBodyFixed: false, // 当前页面是否是锁定状态
      showPopupPicker: false,
      data93Arr: [],
      current93Data: [],
      styleObj: {},
      prdId: this.$route.query.id, //列表id，产品id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      carOwnerCode: this.$route.query.carOwnerCode, //列表carownerCode
      openid: this.$route.query.openid,//微信用户唯一标识//代扣微信用户唯一标识(分期代扣产品必传)
      carOwnerSecretId: this.$route.query.carOwnerSecretId,
      fromListPage: this.$route.query.fromListPage,// 如果是从列表页跳转过来的，则不能点击下一步
      // 被保人重要告知弹框 开始
      showBbrPopPage: false,
      // 被保人重要告知弹框 结束
      // 返回顶部 开始
      showGoTop: false,
      // 返回顶部 结束
      showPDFPop: false,
      pdfUrl: '',
      // 通用列表弹框 开始
      showCommonListPop: false, // 是否展示通用列表弹框 标识
      commonListArr: [], // 通用列表数组
      commonListTitle: '', // 通用列表弹框中的顶部标题
      // 通用列表弹框 结束
      // 通用内容弹框 开始
      showCommonContentPop: false, // 是否展示通用内容弹框 标识
      commonContent: {}, // ；通用弹框展示内容
      // 通用内容弹框 结束
      showZerenDetailPop: false,
      // 底部-我已确认部分 开始
      bxtkArr: [], // 保险条款数组
      khsArr: [], // 可回溯数组

      insurDetail: {},
      checkedFlag: false,
      khsPopShowFlag: false,
      khsIsReadFlag: false,
      // 底部-我已确认部分 结束
      // 轮播部分 开始
      lunboImgArr: [], // 轮播图片数组
      lunboVideo: '', // 轮播中的视频
      showVideo: false, // 是否展示视频
      showStartBtn: false, // 是否展示播放按钮
      showPageNum: false,// 是否展示页码
      showVideoBtn: false,// 是否展示视频切换按钮
      showImgBtn: false,// 是否展示图片切换按钮
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
      },
      // 轮播部分 结束
      // 保障范围 开始
      gmxzArr: [], // 非保险条款数组，也不包括费率表
      flbContent: {}, // 费率表
      // 保障范围 结束
      // 保障详情 开始
      dateObj: {
        lastDateString: '00:00:00',
        endLastDateString: '23:59:59',
      },
      // 保障详情 结束
      showInvoice: false,// 是否开电子发票
      invoiceIndex: 0,// 发票类型索引
      itemData: {},
      discountData: {},// 折扣接口返回的data对象
      pagedata: {}, //page 数据
      danBbrRelationIndex: 0,// 单被保人 与投保人关系 索引
      newPriceObj: {},// 选择方案时展示的价格
      showCalcLoading: false,// 是否展示保费计算中的loading
      benrenItems: [],
      danBbrItems: [],
      targetItems: [],
      showHealth: false,// 是否展示健康告知
      payFlag: null,//null：阳光支付,"1"：微信小程序支付, "2":支付宝小程序支付
      loadingVisible: false,
      loadingVisibleContent: '',
      reqJson: {},// 核保请求报文
      monthPayNum: 1,
      cityData: {},// 接口获取的城市数据
      adList: [],
      channelName: '',
      urlParam: '',
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
    }
  },
  created() {
    this.handleChannelCodeAndOrgCode()
    this.canScroll()
    this.getUrlParam()
    this.loadingVisible = true
    this.getAd()
    this.getCityData()
    this.getDivisionAddress()
    this.getList()
  },
  mounted() {
    // 事件监听滚动条
    window.addEventListener('scroll', this.onShowGoTop)
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  filters: {
    // 根据证件类型 转换成 对应的 证件名称
    handleIDCardType(IDCardType) {
      let relation = [{ "id": "1", "name": "居民身份证" }, { "id": "2", "name": "居民户口本" }, { "id": "3", "name": "居民护照" }, { "id": "4", "name": "军官证" }, { "id": "5", "name": "驾驶执照" }, { "id": "6", "name": "返乡证" }, { "id": "7", "name": "异常身份证" }, { "id": "8", "name": "组织机构代码证" }, { "id": "9", "name": "统一社会信用代码" }, { "id": "48", "name": "港澳通行证" }, { "id": "99", "name": "其他" }]
      for (let i = 0; i < relation.length; i++) {
        if (relation[i].id == IDCardType) {
          return relation[i].name
        }
      }
    },
  },
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
    handleShowDetail(item) {
      item.hasShow = !item.hasShow
      let zuheListCopy = this.zuheList
      for (let i = 0; i < zuheListCopy.length; i++) {
        let list1 = zuheListCopy[i].clauseLiabilityList
        for (let j = 0; j < list1.length; j++) {
          if (list1[j].protectName == item.protectName) {
            list1[j].hasShow = item.hasShow
          }
        }
      }
    },
    getSelectedStatus(protectName) {
      for (let i = 0; i < this.currentZuheList.length; i++) {
        if (protectName == this.currentZuheList[i].protectName) {
          return this.currentZuheList[i].hasSelected
        }
      }
      return false
    },
    handleSelectIcon(item) {
      if (!item.hasSelected) { // 未选中状态，用户想要选中
        let flag1 = false
        let options = item.options

        if (this.common.checkMsgNull(options)) {
          options = JSON.parse(options.replace(/\'/g, '"'))
          for (let i = 0; i < options.length; i++) {
            let arr = options[i]
            let flag2 = true
            for (let j = 0; j < arr.length; j++) {
              if (!this.getSelectedStatus(arr[j])) {
                flag2 = false
              }
            }
            if (flag2) {
              flag1 = true
            }
          }
        } else {
          flag1 = true
        }

        if (!flag1) {
          this.onToast('请先选择：' + JSON.parse(item.options.replace(/\'/g, '"')).join(' 或 '))
          return
        }

      } else { // 选中状态，用户想要取消选中

        let currentArr = []
        for (let i = 0; i < this.currentZuheList.length; i++) {// 循环列表
          let flag1 = true
          let protectName = this.currentZuheList[i].protectName
          if (protectName != item.protectName) {// 除去自身
            if (this.currentZuheList[i].hasSelected) {// 除去未选中的
              let options = this.currentZuheList[i].options
              if (this.common.checkMsgNull(options)) {// 如果当前列表项中有依赖
                options = JSON.parse(options.replace(/\'/g, '"'))
                let hasSelf = false
                for (let j = 0; j < options.length; j++) {
                  let arr = options[j]
                  for (let k = 0; k < arr.length; k++) {
                    if (arr[k] == item.protectName) {
                      hasSelf = true
                      break
                    }
                  }
                  if (hasSelf) {
                    break
                  }
                }
                if (hasSelf) {// 如果有该依赖，循环其他依赖，查看是否至少有一个选中
                  let flag2 = false
                  for (let m = 0; m < options.length; m++) {
                    let arr2 = options[m]
                    let flag3 = true
                    let hasSelf2 = false
                    for (let n = 0; n < arr2.length; n++) {
                      if (arr2[n] == item.protectName) {
                        hasSelf2 = true
                      }
                    }
                    if (!hasSelf2) {
                      for (let n = 0; n < arr2.length; n++) {
                        if (!this.getSelectedStatus(arr2[n])) {
                          flag3 = false
                          break
                        }
                      }
                      if (flag3) {
                        flag2 = true
                        break
                      }
                    }
                  }
                  if (!flag2) {
                    currentArr.push(protectName)
                    flag1 = false
                  }
                } else {
                }
              } else {// 如果当前列表项中没有依赖
              }
            }
          }
        }

        if (currentArr.length) {
          this.onToast('请先取消选择：' + currentArr.join(','))
          return
        }
      }

      item.hasSelected = !item.hasSelected
      if (item.hasSelected) {
        item.hasShow = true
      }
      let zuheListCopy = this.zuheList
      for (let i = 0; i < zuheListCopy.length; i++) {
        let list1 = zuheListCopy[i].clauseLiabilityList
        for (let j = 0; j < list1.length; j++) {
          if (list1[j].protectName == item.protectName) {
            list1[j].hasSelected = item.hasSelected
            if (item.hasSelected) {
              list1[j].hasShow = true
            }
          }
        }
      }
      this.getNewPriceObj()
    },
    onChangeCurrentName(baoName, currentName) {
      let zuheListCopy = this.zuheList
      for (let i = 0; i < zuheListCopy.length; i++) {
        let list1 = zuheListCopy[i].clauseLiabilityList
        for (let j = 0; j < list1.length; j++) {
          let list2 = list1[j].clauseLiabilityList
          if (list1[j].protectName == baoName) {
            for (let k = 0; k < list2.length; k++) {
              list2[k].currentName = currentName
            }
          }
        }
      }
      this.getCurrentJCBZ()
      this.getCurrentZuheList()
      this.getNewPriceObj()

    },
    onSwitchlevel1Index() {

      // if (this.level1Index == index) {
      //   return
      // }
      // this.level1Index = index
      this.getCurrentJCBZ()
      this.getCurrentZuheList()
      this.getNewPriceObj()


      let qiBaoDate = this.dateObj.qiBaoDate
      let zhongBaoDate = ''

      let dayString = this.zuheList[this.level1Index].protectName
      if (dayString.endsWith('天')) {
        zhongBaoDate = this.getDateString(new Date(qiBaoDate), parseInt(dayString) - 1)
      } else if (dayString.endsWith('年')) {
        let aaa = `${Number(qiBaoDate.split('-')[0]) + parseInt(dayString)}-${qiBaoDate.split('-')[1]}-${qiBaoDate.split('-')[2]}`
        zhongBaoDate = this.getDateString(new Date(aaa), -1)
      }
      this.dateObj.zhongBaoDate = zhongBaoDate
    },
    onNoScroll() {
      if (!this.isBodyFixed) {
        this.noScroll()
        this.isBodyFixed = true
      }
    },
    onCanScroll() {
      this.canScroll()
      this.isBodyFixed = false
    },
    // 点击阅读确认
    onClickYuqr(index) {
      this.onChangeKhsTabActiveStatus(index)
      this.onShowKhsPop()
    },
    onShowKhsPop() {
      this.khsPopShowFlag = true
      this.onNoScroll()
    },
    onHideKhsPop() {
      this.khsPopShowFlag = false
      this.onCanScroll()
    },
    onClickTabBtn() {
      this.khsIsReadFlag = true
      // 隐藏弹框
      this.onHideKhsPop()
      this.checkedFlag = true
    },
    onClickKhsTab(index) {
      this.onChangeKhsTabActiveStatus(index)
    },
    onPopupPickerHide(closeType) {
      if (closeType) {
        let name = ''
        for (let i = 0; i < this.current93Data.length; i++) {
          for (let j = 0; j < this.data93Arr.length; j++) {
            if (this.current93Data[i] == this.data93Arr[j].value) {
              name += this.data93Arr[j].name
            }
          }
        }
        this.setUserName(this.targetItems, 93, name)
      }
    },
    onClick93Input() {
      this.showPopupPicker = true
    },
    // 保存中间表接口
    handlePolicyInfoMiddle() {
      let holderName = ''
      let holderMobile = ''
      let holderIdno = ''
      let holderIdtype = ''

      let mobile = this.getUserName(this.benrenItems, 6)
      let name = this.getUserName(this.benrenItems, 1)
      let idNo = this.getUserName(this.benrenItems, 4)
      let idType = this.getUserName(this.benrenItems, 3)
      if (this.common.checkMsgNull(mobile) && this.common.checkMobilePhone(mobile)) {

        holderMobile = mobile
        holderIdtype = idType
        if (this.common.checkMsgNull(name) && this.common.checkName(name)) {
          holderName = name
        }
        if (this.common.checkMsgNull(idNo) && this.common.checkIdCard(idNo)) {
          holderIdno = idNo
        }

        this.$http.post('/sunmc/policyInfoMiddle/createPolicyInfoMiddle', {
          userSign: window.sessionStorage.getItem('userSign'),
          holderName: holderName,
          holderMobile: holderMobile,
          holderIdno: holderIdno,
          holderIdtype: holderIdtype,
          prdId: this.prdId,
          agentCode: this.channelCode,
        }).then(res => {
        })
      }
    },
    onShowPDFPop() {
      this.showPDFPop = true
    },
    onHidePDFPop() {
      if (!this.showCommonListPop && !this.khsPopShowFlag) {
        this.onCanScroll()
      }
      this.showPDFPop = false
    },
    getNewPriceObj() {
      this.showCalcLoading = true
      let qkType = 1 //正常情况
      let price = 0
      let oldPrice = 0

      let arr = this.zuheList[this.level1Index].clauseLiabilityList
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasSelected) {
          let item1 = arr[i].clauseLiabilityList
          for (let j = 0; j < item1.length; j++) {
            let protectName = item1[j].protectName
            let currentName = item1[j].currentName
            if (item1[j].showThisAge) {
              let item2 = item1[j].clauseLiabilityList
              for (let k = 0; k < item2.length; k++) {
                if (currentName == item2[k].protectName) {
                  let item3 = item2[k].clauseLiabilityList
                  for (let m = 0; m < item3.length; m++) {
                    let currentName = item3[m].currentName
                    let item4 = item3[m].clauseLiabilityList
                    for (let n = 0; n < item4.length; n++) {
                      if (currentName == item4[n].showName) {
                        let item5 = item4[n].itemList
                        for (let p = 0; p < item5.length; p++) {
                          price = this.common.accAdd(price, item5[p].premium)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (this.common.checkMsgNull(this.discountData.discount)) {
        qkType = 2 // 折扣
        oldPrice = price
        price = price * this.discountData.discount
      }
      this.newPriceObj = {
        qkType: qkType,
        price: Math.round(this.common.accMul(price, 100)) / 100,
        oldPrice: Math.round(this.common.accMul(oldPrice, 100)) / 100,
      }
      setTimeout(() => {
        this.showCalcLoading = false
      }, 500)
    },
    ///////////////////////////////////////////// 被保人重要告知 开始 ///////////////////////////////////////////
    onBbrPopPage() {
      this.showBbrPopPage = false
      this.showHealth = false
      this.onCanScroll()
      this.toPay()
    },
    onHideBbrPopPage() {
      this.showBbrPopPage = false
      if (!this.handleHealthPopPageShowOrNo()) {
        this.onCanScroll()
      }
    },
    ///////////////////////////////////////////// 被保人重要告知 结束 ///////////////////////////////////////////
    ///////////////////////////////////////////// 返回顶部 开始 ///////////////////////////////////////////
    onShowGoTop() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        this.showGoTop = true
      } else {
        this.showGoTop = false
      }
    },
    onClickGoTop() {
      jquery('html,body').animate({
        scrollTop: 0
      }, 500)
    },
    ///////////////////////////////////////////// 返回顶部 结束 ///////////////////////////////////////////
    ///////////////////////////////////////////// 通用列表弹框 开始 ///////////////////////////////////////////
    onHideCommonListPop() {
      this.onCanScroll()
      this.showCommonListPop = false
    },
    onShowCommonListArr(type) {
      if (type == 1) {
        this.commonListArr = JSON.parse(JSON.stringify(this.bxtkArr))
        this.commonListTitle = '保险条款'
      } else if (type == 2) {
        this.commonListArr = JSON.parse(JSON.stringify(this.gmxzArr))
        this.commonListTitle = '购买须知'
      }
      this.onNoScroll()
      this.showCommonListPop = true
    },
    ///////////////////////////////////////////// 通用列表弹框 结束 ///////////////////////////////////////////
    onShowZerenDetailPop() {
      this.onNoScroll()
      this.showZerenDetailPop = true
    },
    onZerenDetailBack() {
      this.onCanScroll()
      this.showZerenDetailPop = false
    },
    ///////////////////////////////////////////// 通用内容弹框 开始 ///////////////////////////////////////////
    onHideCommonContentPop() {
      if (!this.showCommonListPop && !this.khsPopShowFlag) {
        this.onCanScroll()
      }
      this.showCommonContentPop = false
    },
    onShowCommonContentPop(detail) {
      if (!this.showCommonListPop) {
        this.onNoScroll()
      }
      if (detail.content.indexOf('.pdf') != -1) {
        this.pdfUrl = detail.content
        this.showPDFPop = true
      } else {
        this.commonContent = detail
        this.showCommonContentPop = true
      }
    },
    ///////////////////////////////////////////// 通用内容弹框 结束 ///////////////////////////////////////////
    ///////////////////////////////////////////// 底部-我已确认部分 开始 ///////////////////////////////////////////
    onSwitchCheckedFlag() {
      if (this.checkedFlag) {
        this.checkedFlag = !this.checkedFlag
      } else {
        if (this.khsIsReadFlag) {
          this.checkedFlag = !this.checkedFlag
        } else {
          this.onNoScroll()
          this.khsPopShowFlag = true
        }
      }
    },
    ///////////////////////////////////////////// 底部-我已确认部分 结束 ///////////////////////////////////////////
    ///////////////////////////////////////////// 轮播部分 开始 ///////////////////////////////////////////
    getLunboImgArr() {
      if (this.itemData.prdImgs && this.itemData.prdImgs.length > 0) {
        this.itemData.prdImgs.forEach(prdImg => {
          if (prdImg.imgUrl.endsWith('.png') || prdImg.imgUrl.endsWith('.jpg')) {
            this.lunboImgArr.push(prdImg.imgUrl)
          } else if (prdImg.imgUrl.endsWith('.mp4')) {
            this.lunboVideo = prdImg.imgUrl
          }
        })
        if (this.lunboImgArr.length > 1) {
          this.showPageNum = true
        }
        if (this.lunboVideo) {
          this.showVideoBtn = true
        }
      }
    },
    onShowImgBtn() {
      this.setVideoWH()
      this.showImgBtn = true
      this.showVideoBtn = false
      this.showStartBtn = true
    },
    onShowVideoBtn() {
      this.showVideoBtn = true
      this.showImgBtn = false
      this.$refs.video.pause()
      this.showStartBtn = false
    },
    onVideoClick() {
      this.$refs.video.pause()
      this.showStartBtn = true
    },
    onVideoEnded() {
      this.showStartBtn = true
    },
    setVideoWH() {
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
    },
    onStartVideo() {
      this.setVideoWH()

      this.showStartBtn = false
      this.$refs.video.play()
    },
    ///////////////////////////////////////////// 轮播部分 结束 ///////////////////////////////////////////
    ///////////////////////////////////////////// 保障范围 开始 ///////////////////////////////////////////
    // 获取 保险条款数组 购买须知数组 投保声明数组 责任免除内容 重要告知内容 费率表内容
    onInsurancesArr() {
      let insurances = this.itemData.insurances
      let zrmcContent = '' // 责任免除的内容
      let zygzContent = '' // 重要告知的内容
      let tbxzContent = '' // 投保声明 的内容
      for (let i = 0; i < insurances.length; i++) {
        let item = insurances[i]
        if (item.title == '投保须知' || item.title == '投保告知书' || item.title == '投保声明') {
          tbxzContent = JSON.parse(JSON.stringify(item))
          this.gmxzArr.push(item)
        } else if (item.title == '责任免除') {
          zrmcContent = JSON.parse(JSON.stringify(item))
          this.gmxzArr.push(item)
        } else if (item.title == '重要告知') {
          zygzContent = JSON.parse(JSON.stringify(item))
          this.gmxzArr.push(item)
        } else if (item.type == 1 || item.type == 5 || item.type == 7 || item.type == 2 || item.type == 11) { // 更多购买须知中不包含保险条款
          this.gmxzArr.push(item)
        } else if (item.type == 3) {// 保险条款
          this.bxtkArr.push(item)
        } else if (item.type == 9) {// 附加信息中的费率表
          this.flbContent = item
        }
      }
      let arr = []
      arr.push({
        title: '保险条款',
        isList: '1',
        content: JSON.parse(JSON.stringify(this.bxtkArr)),
        isActive: '1',
      })
      if (zrmcContent != '') {
        arr.push({
          title: '责任免除',
          isList: '0',
          content: JSON.parse(JSON.stringify(zrmcContent)),
          isActive: '0',
        })
      }
      if (zygzContent != '') {
        arr.push({
          title: '重要告知',
          isList: '0',
          content: JSON.parse(JSON.stringify(zygzContent)),
          isActive: '0',
        })
      }
      arr.push({
        title: '投保声明',
        isList: '0',
        content: JSON.parse(JSON.stringify(tbxzContent)),
        isActive: '0',
      })

      this.khsArr = arr
    },
    // 改变当前所展示的tab
    onChangeKhsTabActiveStatus(index) {
      for (let i = 0; i < this.khsArr.length; i++) {
        this.khsArr[i].isActive = '0'
        if (i == index) {
          this.khsArr[i].isActive = '1'
        }
      }
    },
    ///////////////////////////////////////////// 保障范围 结束 ///////////////////////////////////////////
    ///////////////////////////////////////////// 保障详情 开始 ///////////////////////////////////////////
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    showQiBaoDatePop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: this.dateObj.qiBaoDate,
        startDate: this.dateObj.qiBaoStartDate,
        endDate: this.dateObj.qiBaoEndDate,
        onConfirm(val) {
          that.dateObj.qiBaoDate = val
          let qiBaoDate = val
          let zhongBaoDate = ''

          let dayString = that.zuheList[that.level1Index].protectName
          if (dayString.endsWith('天')) {
            zhongBaoDate = that.getDateString(new Date(qiBaoDate), parseInt(dayString) - 1)
          } else if (dayString.endsWith('年')) {
            let aaa = `${Number(qiBaoDate.split('-')[0]) + parseInt(dayString)}-${qiBaoDate.split('-')[1]}-${qiBaoDate.split('-')[2]}`
            zhongBaoDate = that.getDateString(new Date(aaa), -1)
          }
          that.dateObj.zhongBaoDate = zhongBaoDate
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    showZhongBaoDatePop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: this.dateObj.zhongBaoDate,
        startDate: this.dateObj.zhongBaoStartDate,
        endDate: this.dateObj.zhongBaoEndDate,
        onConfirm(val) {
          that.dateObj.zhongBaoDate = val
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    ///////////////////////////////////////////// 保障详情 结束 ///////////////////////////////////////////
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
        })
      }
    },
    handleCphOrCjh(item) {
      if (!this.common.checkMsgNull(item.userName)) {
        return
      }
      item.userName = item.userName.replace(/\s+/g, "").toUpperCase()
    },
    showBenrenBirthDayPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.benrenItems, 5),
        startDate: '1900-01-01',
        endDate: that.common.commonFormatDate(new Date()),
        onConfirm(val) {
          that.setUserName(that.benrenItems, 5, val)
          that.onCheckTbrBirthDay(val)
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    showDanBbrBirthDayPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.danBbrItems, 5),
        startDate: '1900-01-01',
        endDate: that.common.commonFormatDate(new Date()),
        onConfirm(val) {
          that.setUserName(that.danBbrItems, 5, val)
          that.onCheckDanBbrBirthDay(val)
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    showZjyxqqPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.benrenItems, 23),
        startDate: '1900-01-01',
        endDate: that.common.commonFormatDate(new Date()),
        onConfirm(val) {
          that.setUserName(that.benrenItems, 23, val)
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    showDbbrZjyxqqPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.danBbrItems, 23),
        startDate: '1900-01-01',
        endDate: that.common.commonFormatDate(new Date()),
        onConfirm(val) {
          that.setUserName(that.danBbrItems, 23, val)
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    showZjyxzqPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.benrenItems, 22),
        startDate: that.common.commonFormatDate(new Date()),
        endDate: '2099-12-31',
        onConfirm(val) {
          that.setUserName(that.benrenItems, 22, val)
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    showDbbrZjyxzqPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.danBbrItems, 22),
        startDate: that.common.commonFormatDate(new Date()),
        endDate: '2099-12-31',
        onConfirm(val) {
          that.setUserName(that.danBbrItems, 22, val)
        },
        onShow() {
        },
        onHide() {
        }
      })
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
        return `insureData${this.prdId}${this.orgCode}`
      } else if (name == 'getCityJson') {
        return `getCityJson`
      } else if (name == 'getADByProductIdAndOrgId1') {
        return `getADByProductIdAndOrgId1${this.prdId}${this.orgCode}`
      } else if (name == 'getADByProductIdAndOrgId3') {
        return `getADByProductIdAndOrgId3${this.prdId}${this.orgCode}`
      } else if (name == 'getChannelAndAppkey') {
        return `getChannelAndAppkey${this.channelCode}`
      } else if (name == 'getDivisionAddress') {
        return `getDivisionAddress`
      }
    },
    handleProductDetail(success) {
      let keyName = this.getLocalStorageKey('productDetail')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        success(localKey)
      } else {
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
        window.localStorage.clear()
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
          this.onToast('获取数据失败，请稍候重试')
        })
      }
    },
    handleCheckProduct(success) {
      // let keyName = this.getLocalStorageKey('checkProduct')
      // let localKey = this.common.getMyLocalStorage(keyName)
      // if (this.common.checkMsgNull(localKey)) {
      //   success(localKey)
      // } else {
      this.$http.post("/sunmc/checkProductIsSale/checkProduct", {// 校验是否可以投保
        productId: this.prdId,
        orgcode: this.orgCode
      }).then(res => {
        if (res.data.code == 10006) {
          // this.common.setMyLocalStorage(keyName, res)
          success(res)
        } else {
          this.onToast('获取数据失败，请稍候重试')
        }
      }).catch((e) => {
        this.onToast('获取数据失败，请稍候重试')
      })
      // }
    },
    handleInsureData(success) {
      let keyName = this.getLocalStorageKey('insureData')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        success(localKey)
      } else {
        this.$http.post("/prdmc/prdmcShop/insureData", {//获取填单信息
          prdId: this.prdId,
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
          this.onToast('获取数据失败，请稍候重试')
        })
      }
    },
    getCityData() {
      let keyName = this.getLocalStorageKey('getCityJson')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        this.cityData = localKey.data
      } else {
        this.$http.get("admin/sunEcDcompany/getCityJson").then(res => {
          if (res.status == 200) {
            this.common.setMyLocalStorage(keyName, res)
            this.cityData = res.data
          }
        }).catch((e) => {
        })
      }
    },
    getDivisionAddress() {
      let keyName = this.getLocalStorageKey('getDivisionAddress')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        this.data93Arr = localKey.data
      } else {
        this.$http.get("admin/sysDivisionAddress/getDivisionAddress").then(res => {
          if (res.status == 200) {
            this.common.setMyLocalStorage(keyName, res)
            this.data93Arr = res.data
          } else {
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          this.onToast('获取数据失败，请稍候重试')
        })
      }
    },
    getCity(item) {
      this._address = new address(this.cityData.content)
      let cityNum = this._address.show(function (code, name) {
        item.userName = name
        item.userCode = code
      })
    },
    getJob(item) {
      this._job = new job(jobData.content)
      let jobNum = this._job.show(function (code, name) {
        item.userName = name
        item.userCode = code
      })
    },

    // 隐藏健康告知时，所调方法
    onHideHealth() {
      this.onCanScroll()
      this.showHealth = false
      this.onSensors2('newDetails_dianjiyouqingkuangfasheng', '新模板页面-点击有情况发生')
    },
    //有健康告知页-点击以上情况全无
    healthye() {
      this.onSensors2('newDetails_dianjiyishangqingkuangquanwu', '新模板页面-点击以上情况全无')
      if (this.handleBbrPopPageShowOrNo()) {
        this.showBbrPopPage = true
      } else {
        this.onCanScroll()
        this.toPay()
      }
    },
    setLastDateString() {
      //立即生效(逻辑：立即生效是说当天可买， 能往后选起保日期得 继续从零时起保)
      if (this.pagedata.takesEffect == 0) {//是
        let takesEffectTime = new Date().getTime() + 60 * 30 * 1000;//当前时间+30分钟后生效
        let finalDateTime = this.common.formatDateTime(takesEffectTime);//时分秒
        this.dateObj.lastDateString = finalDateTime.split(' ')[1];//时分秒  
      }
    },
    // 校验姓名
    onCheckXingming(userName) {
      if (userName == '') {
        return
      }
      if (!this.common.checkName(userName)) {
        this.onToast('姓名输入有误')
        return false
      }
      return true
    },
    // 校验手机号
    onCheckSjh(userName) {
      if (userName == '') {
        return
      }
      if (!this.common.checkMobilePhone(userName)) {
        this.onToast('手机号输入有误')
        return false
      }
      return true
    },
    // 校验邮箱
    onCheckYouxiang(userName) {
      if (userName == '') {
        return
      }
      if (!this.common.checkEmail(userName)) {
        this.onToast('邮箱输入有误')
        return false
      }
      return true

    },
    // 校验车牌号
    onCheckCph(userName) {
      if (userName == '') {
        return
      }
      if (!this.common.checkVehicleNumber(userName)) {
        this.onToast('车牌号输入有误')
        return false
      }
      return true
    },
    // 校验车架号
    onCheckCjh(userName) {
      if (userName == '') {
        return
      }
      if (!this.common.checkCjh(userName)) {
        this.onToast('车架号输入有误')
        return false
      }
      return true
    },
    // 获取items，type的值为1：投保人，2：单被保人
    getItems(type) {
      let types = this.pagedata.page[0].types
      for (let i = 0; i < types.length; i++) {
        if (types[i].pageType == type) {
          return JSON.parse(JSON.stringify(types[i].items))
        }
      }
      return []
    },
    onTbrIDKeyup(userName) {
      this.setUserName(this.benrenItems, 2, '')
      if (this.checkItemValue(this.benrenItems, 3, 1)) {
        if (this.common.checkMsgNull(userName)) {
          if (!this.common.checkIdCard(userName)) {// 身份证号校验未通过
          } else {
            if (parseInt(userName.substr(16, 1)) % 2 == 1) {// 男
              this.setUserName(this.benrenItems, 2, 1)
            } else {
              this.setUserName(this.benrenItems, 2, 2)
            }
          }
        }
      }
    },
    onDbbrIDKeyup(userName) {
      this.setUserName(this.danBbrItems, 2, '')
      if (this.checkItemValue(this.danBbrItems, 3, 1)) {
        if (this.common.checkMsgNull(userName)) {
          if (!this.common.checkIdCard(userName)) {// 身份证号校验未通过
          } else {
            if (parseInt(userName.substr(16, 1)) % 2 == 1) {// 男
              this.setUserName(this.danBbrItems, 2, 1)
            } else {
              this.setUserName(this.danBbrItems, 2, 2)
            }
          }
        }
      }
    },
    // 投保人证件号码change时所调方法
    onTbrZjhmChange(userName) {
      this.onCheckTbrZjhm(userName)
    },
    // 单被保人证件号码change时所调方法
    onDanBbrZjhmChange(userName) {
      this.onCheckDanBbrZjhm(userName)
    },
    // 校验投保人证件号码
    onCheckTbrZjhm(userName) {
      if (userName == '') {
        return
      }
      if (this.checkItemValue(this.benrenItems, 3, 1)) {// 身份证
        if (!this.common.checkIdCard(userName)) {
          this.onToast('证件号码输入有误')
          return false
        } else {
          let age = this.common.GetAge(userName, this.dateObj.qiBaoDate, 1)
          if (age < 18) {
            this.onToast('投保人年龄需大于18周岁')
            return false
          }
        }
      } else if (this.checkItemValue(this.benrenItems, 3, 8)) {// 组织机构代码
        if (!this.common.checkGroupNumber(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      } else if (this.checkItemValue(this.benrenItems, 3, 9)) {// 统一社会信用代码
        if (!this.common.checkCommonNumber(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      } else {
        if (!this.common.checkOtherCard(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      }
      return true
    },
    // 校验投保人出生日期
    onCheckTbrBirthDay(userName) {
      if (userName == '') {
        return
      }
      let age = this.common.GetAge(userName, this.dateObj.qiBaoDate, 2)
      if (age < 18) {
        this.onToast('投保人年龄需大于18周岁')
        return false
      }
      return true
    },
    // 校验单被保人出生日期
    onCheckDanBbrBirthDay(userName) {
      if (userName == '') {
        return
      }
      return true
    },

    // 校验单被保人证件号码
    onCheckDanBbrZjhm(userName) {
      if (userName == '') {
        return
      }
      if (this.checkItemValue(this.danBbrItems, 3, 1)) {// 身份证
        if (!this.common.checkIdCard(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      } else if (this.checkItemValue(this.danBbrItems, 3, 8)) {// 组织机构代码
        if (!this.common.checkGroupNumber(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      } else if (this.checkItemValue(this.danBbrItems, 3, 9)) {// 统一社会信用代码
        if (!this.common.checkCommonNumber(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      } else {
        if (!this.common.checkOtherCard(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      }
      return true
    },
    // 判断传的items中itemCode对应的项目的值是否是userName
    checkItemValue(items, itemCode, userName) {
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        if (item.itemCode == itemCode) {
          if (item.userName == userName) {
            return true
          }
        }
      }
      return false
    },
    // 改变证件类型时所调方法
    onIdTypeChange(items, userName) {
      if (userName == 1) {
        this.setShowFlag(items, ['2', '5'], false)
        this.setShowFlag(items, ['73', '74', '75'], false)
      } else if (['8', '9'].indexOf(userName) != -1) {
        this.setShowFlag(items, ['73', '74', '75'], true)
        this.setShowFlag(items, ['2', '5'], false)
      } else {
        this.setShowFlag(items, ['2', '5'], true)
        this.setShowFlag(items, ['73', '74', '75'], false)
      }
    },
    // 改变证件有效期时所调方法
    onZjyxqChange(userName) {
      if (userName == 1) {// 证件有效期为长期
        this.setShowFlag(this.benrenItems, ['22'], false)
      } else if (userName == 2) {// 证件有效期为短期
        this.setShowFlag(this.benrenItems, ['22'], true)
      }
    },
    onDbbrZjyxqChange(userName) {
      if (userName == 1) {// 证件有效期为长期
        this.setShowFlag(this.danBbrItems, ['22'], false)
      } else if (userName == 2) {// 证件有效期为短期
        this.setShowFlag(this.danBbrItems, ['22'], true)
      }
    },
    // 切换单被保人的 与投保人关系 时 所调方法
    onSwitchDanBbrRelation(id, index) {
      if (this.danBbrRelationIndex == index) {
        return false
      }
      this.danBbrRelationIndex = index
      this.setUserName(this.danBbrItems, '8', id)
    },
    // 检查是否有返回某个itemCode的录入项
    checkItemCode(items, itemCodeArr) {
      let flag = false
      for (let i = 0; i < items.length; i++) {
        if (itemCodeArr.indexOf(items[i].itemCode) != -1) {
          flag = true
        }
      }
      return flag
    },
    // 设置items中对应的itemCodeArr中对应的isShow字段对应的true或者false
    setShowFlag(items, itemCodeArr, isShow) {
      for (let i = 0; i < items.length; i++) {
        if (itemCodeArr.indexOf(items[i].itemCode) != -1) {
          items[i].isShow = isShow
        }
      }
    },
    // 为itmes中itemCode对应的字段设置userName
    setUserName(items, itemCode, userName) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].itemCode == itemCode) {
          items[i].userName = userName
        }
      }
    },
    onInvoiceType(index, id) {
      this.invoiceIndex = index
      if (id == '1') {//个人
        this.setShowFlag(this.benrenItems, ['46', '42'], true)
        this.setShowFlag(this.benrenItems, ['43', '44', '27', '30', '31', '45'], false)
      } else {//企业
        this.setShowFlag(this.benrenItems, ['42', '43', '44', '27', '30', '31', '45'], true)
        this.setShowFlag(this.benrenItems, ['46'], false)
      }
      this.setUserName(this.benrenItems, 42, id)
    },
    onSwitchInvoice() {
      this.invoiceIndex = 0
      this.showInvoice = !this.showInvoice
      if (this.showInvoice) {//选中,则显示发票相关控件
        this.setShowFlag(this.benrenItems, ['42', '46'], true)
        this.setShowFlag(this.benrenItems, ['43', '44', '27', '30', '31', '45'], false)
        this.setUserName(this.benrenItems, '41', '2')
        this.setUserName(this.benrenItems, '42', '1')
      } else {//则隐藏
        this.setShowFlag(this.benrenItems, ['42', '43', '44', '27', '30', '31', '45', '46'], false)
        this.setUserName(this.benrenItems, '41', '')
        this.setUserName(this.benrenItems, '42', '')
      }
    },
    onShowCalcLoading() {
      this.showCalcLoading = true
    },
    onHideCalcLoading() {
      setTimeout(() => {
        this.showCalcLoading = false
      }, 500)
    },
    // 校验本人信息是否已经填写
    checkBenrenInfo() {
      for (let j = 0; j < this.benrenItems.length; j++) {
        if (this.benrenItems[j].isShow) {
          let itemCode = this.benrenItems[j].itemCode
          let itemName = this.benrenItems[j].itemName
          let userName = this.benrenItems[j].userName
          if (['41', '46', '27', '45', '30', '31'].indexOf(itemCode) == -1) {// 排除不需要校验的字段
            if (!this.common.checkMsgNull(userName)) {
              if (document.getElementById('tbr' + itemCode)) {
                document.getElementById('tbr' + itemCode).focus()
              }
              this.onToast('请将投保人信息填写完整')
              return false
            } else {
              if (itemCode == 1) {// 姓名
                if (!this.onCheckXingming(userName)) {
                  return false
                }
              } else if (itemCode == 4) {// 证件号码
                if (!this.onCheckTbrZjhm(userName)) {
                  return false
                }
              } else if (itemCode == 6) {// 手机号
                if (!this.onCheckSjh(userName)) {
                  return false
                }
              } else if (itemCode == 7) {// 邮箱
                if (!this.onCheckYouxiang(userName)) {
                  return false
                }
              }
            }
          } else if (itemCode == 46) {// 发票抬头
            if (!this.common.checkMsgNull(userName)) {
              this.setUserName(this.benrenItems, 46, this.getUserName(this.benrenItems, 1))
            }
          }
        }
      }
      return true
    },
    // 校验单被保人信息是否已经填写
    checkDanBbrInfo() {
      for (let j = 0; j < this.danBbrItems.length; j++) {
        if (this.danBbrItems[j].isShow) {
          let itemCode = this.danBbrItems[j].itemCode
          let itemName = this.danBbrItems[j].itemName
          let userName = this.danBbrItems[j].userName
          if (['41'].indexOf(itemCode) == -1) {// 排除不需要校验的字段
            if (!this.common.checkMsgNull(userName)) {
              if (document.getElementById('danbbr' + itemCode)) {
                document.getElementById('danbbr' + itemCode).focus()
              }
              this.onToast('请将被保人信息填写完整')
              return false
            } else {
              if (itemCode == 1) {// 姓名
                if (!this.onCheckXingming(userName)) {
                  return false
                }
              } else if (itemCode == 4) {// 证件号码
                if (!this.onCheckDanBbrZjhm(userName)) {
                  return false
                }
              } else if (itemCode == 6) {// 手机号
                if (!this.onCheckSjh(userName)) {
                  return false
                }
              } else if (itemCode == 7) {// 邮箱
                if (!this.onCheckYouxiang(userName)) {
                  return false
                }
              }
            }
          }
        }
      }
      return true
    },
    // 校验标的信息是否已经填写
    checkTargetInfo() {
      if (this.targetItems.length) {
        for (let i = 0; i < this.targetItems.length; i++) {
          let itemCode = this.targetItems[i].itemCode
          let itemName = this.targetItems[i].itemName
          let userName = this.targetItems[i].userName
          if (!this.common.checkMsgNull(userName)) {
            if (document.getElementById('target' + itemCode)) {
              document.getElementById('target' + itemCode).focus()
            }
            this.onToast('请将标的信息填写完整')
            return false
          }
        }
      }
      return true
    },
    // 获取传入的items中，对应itemCode的userName
    getUserName(items, itemCode) {
      for (let i = 0; i < items.length; i++) {
        if (itemCode == items[i].itemCode) {
          return items[i].userName
        }
      }
      return false
    },
    // 获取传入的items中，对应itemCode的userCode
    getUserCode(items, itemCode) {
      for (let i = 0; i < items.length; i++) {
        if (itemCode == items[i].itemCode) {
          return items[i].userCode
        }
      }
      return ''
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
    onSensors3(eventClick, eventName) {
      this.sensors.track(eventClick, {
        loadTime: new Date().getTime() - this.startTime,
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
    onToast(message = '数据异常，请稍候重试', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
      this.onHideCalcLoading()
      this.loadingVisible = false//遮罩关闭
    },
    onMessageBox(message = '数据异常，请稍候重试') {
      MessageBox.alert(message, '提示')
      this.onHideCalcLoading()
      this.loadingVisible = false//遮罩关闭
      this.showHealth = false
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
        })
      }
    },
    // 处理CCH埋点
    handleCCH(obj) {
      this.$http.post('/sunmc/cch/onCCH', obj).then(res => { })
    },
    getCurrentJCBZ() {
      let arr = this.zuheList[this.level1Index].clauseLiabilityList
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].protectName == '基础保障') {
          this.currentJCBZ = arr[i]
        }
      }
    },
    getCurrentZuheList() {
      this.currentZuheList = this.zuheList[this.level1Index].clauseLiabilityList
    },
    getList() {
      this.handleQueryDiscount(res => {
        this.discountData = res.data
        if (this.discountData.isMonthPay) {
          this.monthPayNum = JSON.parse(this.discountData.isMonthPay)[0].value
        }
        this.getSpecification()
      })
    },
    // 新保调用
    getSpecification() {
      this.handleProductSpecification(res => {
        this.styleObj = res.data.data

        let zuheListCopy = JSON.parse(JSON.stringify(res.data.data.clauseLiabilityVOList))

        for (let i = 0; i < zuheListCopy.length; i++) {
          let list1 = zuheListCopy[i].clauseLiabilityList
          for (let j = 0; j < list1.length; j++) {
            let list2 = list1[j].clauseLiabilityList
            if (list1[j].protectName == '基础保障' || list1.length == 2) {
              list1[j].hasSelected = true
              list1[j].hasShow = true
              for (let k = 0; k < list2.length; k++) {
                if (k == 0) {
                  list2[k].showThisAge = true
                } else {
                  list2[k].showThisAge = false
                }
                let list3 = list2[k].clauseLiabilityList
                list2[k].currentName = list3[0].protectName
                for (let m = 0; m < list3.length; m++) {
                  let list4 = list3[m].clauseLiabilityList
                  for (let n = 0; n < list4.length; n++) {
                    let list5 = list4[n].clauseLiabilityList
                    let index = 0
                    for (let p = 0; p < list5.length; p++) {
                      if (list5[p].defaultShowFlag == 'Y') {
                        index = p
                        break
                      }
                    }
                    list4[n].currentName = list5[index].showName
                  }
                }
              }
            } else {
              list1[j].hasSelected = false
              list1[j].hasShow = false
              for (let k = 0; k < list2.length; k++) {
                if (k == 0) {
                  list2[k].showThisAge = true
                } else {
                  list2[k].showThisAge = false
                }
                let list3 = list2[k].clauseLiabilityList
                list2[k].currentName = list3[0].protectName
                for (let m = 0; m < list3.length; m++) {
                  let list4 = list3[m].clauseLiabilityList
                  for (let n = 0; n < list4.length; n++) {
                    let list5 = list4[n].clauseLiabilityList
                    let index = 0
                    for (let p = 0; p < list5.length; p++) {
                      if (list5[p].defaultShowFlag == 'Y') {
                        index = p
                        break
                      }
                    }
                    list4[n].currentName = list5[index].showName
                  }
                }
              }
            }
          }
        }

        this.zuheList = JSON.parse(JSON.stringify(zuheListCopy))

        this.getCurrentJCBZ()
        this.getCurrentZuheList()

        //调用产品详情接口
        this.getProductDetail()
      })
    },
    // 百分数转化为小数
    toPoint(percent) {
      let str = percent.replace("%", "");
      str = str / 100;
      return str;
    },
    // 小数转化为百分数
    toPercent(point) {
      let str = Number(point * 100).toFixed(1);
      str += "%";
      return str;
    },
    //产品详情接口
    getProductDetail() {

      this.handleProductDetail(res => {
        this.itemData = res.data.data
        if (!this.common.checkMsgNull(this.itemData.customerService)) {
          this.itemData.customerService = 'tel:95510'
        }
        if (!this.common.checkMsgNull(this.itemData.prdTheme)) {
          this.itemData.prdTheme = '#ff8400'
        }
        if (!this.common.checkMsgNull(this.itemData.customerLogo)) {
          this.itemData.customerLogo = '../../static/images/zixun.png'
        }
        this.onInsurancesArr()
        this.getLunboImgArr()

        if (this.itemData.status == 1) {//若产品状态正常
          if (this.common.checkMsgNull(this.itemData.productEndDate)) {
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(this.itemData.productEndDate.replace(new RegExp(/-/gm), "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//产品结束日期小于当前日期
              this.onMessageBox('系统维护中')
              return false
            }
          }
        } else {
          this.onMessageBox('系统维护中')
          return false
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
            this.onSensors2('proDetails_jinruxiangqingye', '详情页-进入详情页')
          })

        }
        //设置页面标题
        jquery(document).find('title').text(this.itemData.prdName);

        //微信分享
        this.handleWXShare()

        this.getInsureData()
      })
    },
    getInsureData() {
      this.handleInsureData(res => {
        setTimeout(() => {
          this.loadingVisible = false
        }, 500)
        this.pagedata = res.data.data
        this.initPagedata()


        this.benrenItems = this.getItems(1)
        this.danBbrItems = this.getItems(2)
        this.targetItems = this.getItems(7)

        this.putSessionData()
        this.setInsuranceDate()
        this.getNewPriceObj()
      })
    },
    // 获取 date时间 + dayNumber天 之后的时间
    getDateString(date, dayNumber) {
      date.setDate(date.getDate() + parseInt(dayNumber))
      return this.common.commonFormatDate(date)
    },
    setInsuranceDate() {
      let qiBaoDate = ''
      let qiBaoStartDate = ''
      let qiBaoEndDate = ''
      let zhongBaoDate = ''
      let zhongBaoStartDate = ''
      let zhongBaoEndDate = ''

      //是否立即生效
      if (this.pagedata.takesEffect == 0) {//是
        /* 
        (后台配置条件：必须是固定区间;不能配置起保日期)
        如果是立即生效，则起保日期为当前日期，等支付的时候再计算时分秒
      */
        qiBaoDate = this.common.commonFormatDate(new Date())
      } else {
        //判断后台是否返回起保日期:若返回则以此为准,若不返回则默认为当前日期的下一天
        if (this.common.checkMsgNull(this.pagedata.productStartDateStr)) {
          let proStartDate = new Date(this.pagedata.productStartDateStr)
          //若起保日期大于当前日期,则取返回的起保日期
          if (proStartDate.getTime() > new Date().getTime()) {
            qiBaoDate = this.pagedata.productStartDateStr
          } else {
            qiBaoDate = this.getDateString(new Date(), 1)
          }
        } else {
          qiBaoDate = this.getDateString(new Date(), 1)
        }
      }

      //若延迟生效天数不为空,则起保日期=所选的起保日期+起保日期生效延迟天数
      if (this.common.checkMsgNull(this.pagedata.startEffDelayDays)) {
        qiBaoDate = this.getDateString(new Date(qiBaoDate), this.pagedata.startEffDelayDays)
      }

      // 起保日期可选范围
      if (!this.common.checkMsgNull(this.pagedata.rangeDay)) {
        this.pagedata.rangeDay = 90
      }

      qiBaoStartDate = qiBaoDate
      qiBaoEndDate = this.getDateString(new Date(qiBaoDate), this.pagedata.rangeDay - 1)

      let dayString = this.zuheList[this.level1Index].protectName
      if (dayString.endsWith('天')) {
        zhongBaoDate = this.getDateString(new Date(qiBaoDate), parseInt(dayString) - 1)
      } else if (dayString.endsWith('年')) {
        let aaa = `${Number(qiBaoDate.split('-')[0]) + parseInt(dayString)}-${qiBaoDate.split('-')[1]}-${qiBaoDate.split('-')[2]}`
        zhongBaoDate = this.getDateString(new Date(aaa), -1)
      }

      // if (this.pagedata.insuranceIntervalType == 0) {// 固定区间
      //   let tempDate = new Date(qiBaoDate)
      //   if (this.pagedata.dayCount >= 365) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
      //     tempDate = new Date((Number(qiBaoDate.split('-')[0]) + Math.floor(this.pagedata.dayCount / 365)) + '-' + qiBaoDate.split('-')[1] + '-' + qiBaoDate.split('-')[2])
      //     tempDate.setDate(tempDate.getDate() - 1)
      //     zhongBaoDate = this.common.commonFormatDate(tempDate)
      //   } else {
      //     tempDate.setDate(tempDate.getDate() + this.pagedata.dayCount - 1)
      //     zhongBaoDate = this.common.commonFormatDate(tempDate)
      //   }
      // } else if (this.pagedata.insuranceIntervalType == 1) {//间隔区间：例1天-5天
      //   let tempDate = new Date(qiBaoDate)
      //   tempDate.setDate(tempDate.getDate() + this.pagedata.minDayCount - 1)
      //   let tempDate2 = new Date(qiBaoDate)
      //   tempDate2.setDate(tempDate2.getDate() + this.pagedata.maxDayCount - 1)
      //   zhongBaoDate = this.common.commonFormatDate(tempDate)
      //   zhongBaoStartDate = this.common.commonFormatDate(tempDate)
      //   zhongBaoEndDate = this.common.commonFormatDate(tempDate2)
      // }

      this.dateObj = {
        qiBaoDate: qiBaoDate,
        qiBaoStartDate: qiBaoStartDate,
        qiBaoEndDate: qiBaoEndDate,
        zhongBaoDate: zhongBaoDate,
        zhongBaoStartDate: zhongBaoStartDate,
        zhongBaoEndDate: zhongBaoEndDate,
        lastDateString: '00:00:00',
        endLastDateString: '23:59:59',
      }
    },
    // 初始化pagedata
    initPagedata() {
      this.initUserName()
      this.setTbrIsShow()
      this.setBbrIsShow()
      this.setTargetShow()
    },
    // 给有options选项的添加默认值
    initUserName() {
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == 1) { // 投保人
          for (let j = 0; j < type.items.length; j++) {
            let item = type.items[j]
            if (item.options != null && item.itemCode != 2) {
              item.userName = item.options[0].id
            } else {
              item.userName = ''
            }
          }
        } else if (type.pageType == 2) { // 被保人
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            if (item.options != null && item.itemCode != 2) {
              item.userName = item.options[0].id
            } else {
              item.userName = ''
            }
          }
        } else if (type.pageType == 7) { // 标的信息
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            if (item.options != null) {
              item.userName = item.options[0].id
            } else {
              item.userName = ''
            }
          }
        }
      }
    },

    // 设置投保人每一项是否展示
    setTbrIsShow() {
      let isShow2 = false
      let isShow5 = false
      let isShow22 = false
      let isShowtuanti = false
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == 1) { // 投保人
          for (let j = 0; j < type.items.length; j++) {
            let itemCode = type.items[j].itemCode
            if (itemCode == 3) {// 证件类型
              if (type.items[j].userName == 1) { // 身份证
                isShow5 = false
              } else if (['8', '9'].indexOf(type.items[j].options[0].id) != -1) { //组织机构代码或者社会统一信用代码
                isShow5 = false
                isShowtuanti = true
              } else {
                isShow5 = true
              }
            } else if (itemCode == 19) { // 证件有效期
              if (type.items[j].userName == 2) { // 如果证件有效期当前展示的是短期，则需要展示证件有效止期
                isShow22 = true
              } else {
                isShow22 = false
              }
            } else if (itemCode == 87) {
              isShow2 = true
            }
          }
        }
      }
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == 1) { // 投保人
          for (let j = 0; j < type.items.length; j++) {
            let item = type.items[j]
            let itemCode = item.itemCode
            item.isShow = true
            if (itemCode == 5) {
              if (!isShow5) {
                item.isShow = false
              }
            } else if (itemCode == 2) {
              if (!isShow2) {
                item.isShow = false
              }
            } else if (itemCode == 22) {
              if (!isShow22) {
                item.isShow = false
              }
            } else if (['73', '74', '75'].indexOf(itemCode) != -1) {
              if (!isShowtuanti) {
                item.isShow = false
              }
            } else if (['43', '44', '27', '30', '31', '45'].indexOf(itemCode) != -1) {
              item.isShow = false
            } else if (itemCode == 42) {
              if (!this.showInvoice) {
                item.isShow = false
              }
            } else if (itemCode == 46) {
              if (!this.showInvoice) {
                item.isShow = false
              }
            } else if (itemCode == 92) {
              if (this.checkItemCode(this.benrenItems, ['9'])) {
                item.isShow = false
              }
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    // 设置被保人每一项是否展示
    setBbrIsShow() {
      let isShow2 = false
      let isShow5 = false
      let isShow22 = false
      let isShowtuantiBbr = false
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == 2) { // 被保人
          for (let k = 0; k < type.items.length; k++) {
            let itemCode = type.items[k].itemCode
            if (itemCode == 3) {// 证件类型
              if (type.items[k].userName == 1) { // 身份证
                isShow5 = false
                isShowtuantiBbr = false
              } else if (['8', '9'].indexOf(type.items[k].userName) != -1) { //组织机构代码或者社会统一信用代码
                isShow5 = false
                isShowtuantiBbr = true
              } else {
                isShow5 = true
                isShowtuantiBbr = false
              }
            } else if (itemCode == 19) { // 证件有效期
              if (type.items[k].userName == 2) { // 如果证件有效期当前展示的是短期，则需要展示证件有效止期
                isShow22 = true
              } else {
                isShow22 = false
              }
            } else if (itemCode == 87) {
              isShow2 = true
            }
          }
        }
      }
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == 2) { // 被保人
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            let itemCode = item.itemCode
            item.isShow = true
            if (itemCode == 5) {
              if (!isShow5) {
                item.isShow = false
              }
            } else if (itemCode == 2) {
              if (!isShow2) {
                item.isShow = false
              }
            } else if (itemCode == 22) {
              if (!isShow22) {
                item.isShow = false
              }
            } else if (['73', '74', '75'].indexOf(itemCode) != -1) {
              if (!isShowtuantiBbr) {
                item.isShow = false
              }
            }
            if (!item.isHasOption) {
              item.userName = ''
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    // 设置标的信息每一项是否展示
    setTargetShow() {
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == 7) { // 标的信息
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            item.isShow = true
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    handleWXShare() {
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
    },
    handleLjtb() {
      // 校验投保人信息是否填写完整
      if (!this.checkBenrenInfo()) {
        return false
      }
      // 校验单被保人信息是否填写完整
      if (!this.checkItemValue(this.danBbrItems, 8, 1)) {
        if (!this.checkDanBbrInfo()) {
          return false
        }
      }

      // 校验标的信息是否填写完整
      if (!this.checkTargetInfo()) {
        return false
      }

      if (!this.checkedFlag) {
        this.onToast('请仔细阅读并确认产品条款以及相关告知信息')
        return false
      }

      //健康页面
      if (this.handleHealthPopPageShowOrNo()) {
        this.showHealth = true
        this.onNoScroll()
      } else if (this.handleBbrPopPageShowOrNo()) {
        this.showBbrPopPage = true
        this.onNoScroll()
      } else {
        this.toPay()
      }
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
    handleBbrPopPageShowOrNo() {
      if (this.itemData.healths.length) {
        for (let i = 0; i < this.itemData.healths.length; i++) {
          if (this.itemData.healths[i].type == 2) {
            if (this.getUserName(this.danBbrItems, 8) != 1) {
              return true
            }
          }
        }
      }
      return false
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
        if (aaa[i].split('=')[0] == 'orgCode' && aaa[i].split('=')[1] == 'CSH') {
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
    toPay() {
      this.startTime = new Date().getTime()
      this.loadingVisible = true
      this.loadingVisibleContent = '加载中'
      this.common.setTracebackSession()

      this.checkEnvironment()

      this.setLastDateString()

      this.reqJson = {
        shenCeUserId: this.getShenCeUserId(),
        channelCode: this.channelCode,
        orgCode: this.orgCode,
        userSign: window.sessionStorage.getItem('userSign'),
        styleId: this.styleObj.prdStyleSpecification[0].styleId,
        startDate: `${this.dateObj.qiBaoDate} ${this.dateObj.lastDateString}`,
        endDate: `${this.dateObj.zhongBaoDate} ${this.dateObj.endLastDateString}`,
        isCustom: true,
        policyHolders: this.generateTbr(),
        insureds: this.generateBbr(),
        beneficiary: this.generateSyr(),
        targets: this.generateTarget(),
        addressCode: this.getUserCode(this.benrenItems, 12),
        urlParam: this.urlParam ? this.urlParam : '',
        payFlag: this.payFlag,
        openId: this.common.getUrlValueByName('openid'),
        instalmentNum: this.monthPayNum,//分期数
        oldpolicyNoUnid: '',
        reUnderwrite: 1,
        renewInsurance: "",
        zhugeUserId: '',
        oldPolicyNo: '',
      }

      this.saveSessionData()
      this.underwritingPolicy()
    },
    getProductCodes() {
      let myArr = []
      let arr = this.zuheList[this.level1Index].clauseLiabilityList
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasSelected) {
          let item1 = arr[i].clauseLiabilityList
          for (let j = 0; j < item1.length; j++) {
            let protectName = item1[j].protectName
            let currentName = item1[j].currentName
            if (item1[j].showThisAge) {
              let item2 = item1[j].clauseLiabilityList
              for (let k = 0; k < item2.length; k++) {
                if (currentName == item2[k].protectName) {
                  let item3 = item2[k].clauseLiabilityList
                  for (let m = 0; m < item3.length; m++) {
                    let currentName = item3[m].currentName
                    let item4 = item3[m].clauseLiabilityList
                    for (let n = 0; n < item4.length; n++) {
                      if (currentName == item4[n].showName) {
                        let item5 = item4[n].itemList
                        for (let p = 0; p < item5.length; p++) {
                          myArr.push(item5[p].productCode)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return myArr
    },
    saveSessionData() {
      window.sessionStorage.setItem('urlSession', window.location.href)
      let sessionData = {
        dateObj: this.dateObj,
        showInvoice: this.showInvoice,// 是否开电子发票
        invoiceIndex: this.invoiceIndex,// 发票类型索引
        danBbrRelationIndex: this.danBbrRelationIndex,// 单被保人 与投保人关系 索引
        benrenItems: this.benrenItems,
        danBbrItems: this.danBbrItems,
        targetItems: this.targetItems,
        currentJCBZ: this.currentJCBZ,
        currentZuheList: this.currentZuheList,
        zuheList: this.zuheList,
        level1Index: this.level1Index,
      }
      window.sessionStorage.setItem('sessionData', JSON.stringify(sessionData))
    },
    //获取Url中的某个参数值
    getUrlValueByName(paraName, url) {
      var arrObj = url.split("?");
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      } else {
        return "";
      }
    },
    putSessionData() {
      let urlSession = window.sessionStorage.getItem('urlSession')
      let sessionData = window.sessionStorage.getItem('sessionData')
      // 如果链接中的参数id、channelCode、orgCode相同的话，则认为是同一个产品
      if (this.common.checkMsgNull(urlSession) &&
        this.common.getUrlValueByName('id') == this.getUrlValueByName('id', urlSession) &&
        this.common.getUrlValueByName('channelCode') == this.getUrlValueByName('channelCode', urlSession) &&
        this.common.getUrlValueByName('orgCode') == this.getUrlValueByName('orgCode', urlSession)
      ) {
        // 赋值缓存的信息
        if (this.common.checkMsgNull(sessionData)) {
          let sessionDataJson = JSON.parse(sessionData)
          this.dateObj = JSON.parse(JSON.stringify(sessionDataJson.dateObj))
          this.showInvoice = sessionDataJson.showInvoice// 是否开电子发票
          this.invoiceIndex = sessionDataJson.invoiceIndex// 发票类型索引
          this.danBbrRelationIndex = sessionDataJson.danBbrRelationIndex// 单被保人 与投保人关系 索引
          this.benrenItems = JSON.parse(JSON.stringify(sessionDataJson.benrenItems))
          this.danBbrItems = JSON.parse(JSON.stringify(sessionDataJson.danBbrItems))
          this.targetItems = JSON.parse(JSON.stringify(sessionDataJson.targetItems))

          this.currentJCBZ = JSON.parse(JSON.stringify(sessionDataJson.currentJCBZ))
          this.currentZuheList = JSON.parse(JSON.stringify(sessionDataJson.currentZuheList))
          this.zuheList = JSON.parse(JSON.stringify(sessionDataJson.zuheList))
          this.level1Index = sessionDataJson.level1Index
        }
      } else {
        window.sessionStorage.removeItem('sessionData')
        window.sessionStorage.setItem('urlSession', window.location.href)
      }
    },
    // 将 P920091615004924408 改造成 T920091615004924408 ，然后跟轨迹id进行绑定
    behaviorObjSetOrderNo(orderNo, callback) {
      let num = `T${orderNo.substring(1)}`
      window.sessionStorage.removeItem('tbdh')
      window.sessionStorage.setItem('tbdh', num)
      try {
        _behaviorObj.setorderNo(num, function (data) {
          if (data.resCode == "0000") {
            //后续逻辑
            callback()
          }
        })
      } catch (err) {
        console.log('可回溯报错：' + err)
      }
    },
    //核保接口
    underwritingPolicy() {
      //核保
      this.$http.post('/sunmc/ordSun/underwritingPolicy', this.reqJson).then(res => {
        console.dir(res)
        if (res.data.code == 200) {
          if (res.data.data.status == "200") {//核保成功
            let signStr = res.data.data.msg
            let payMent = res.data.data.payMent // 0跳转资金收银台 1跳转非车收银台
            this.$http.post("/sunmc/zuHePolicy/createZuHePolicy", {
              policy: this.reqJson,
              sign: signStr
            }).then(res => {

              if (res.data.code == 200) {
                let orderSn = res.data.data // 订单号
                this.behaviorObjSetOrderNo(orderSn, () => {
                })
                if (this.pagedata.giveInsurance == 0) {
                  this.$router.push({
                    path: "/Product/Success",
                    query: {
                      id: this.prdId,
                      channelCode: this.$route.query.channelCode,
                      orgCode: this.$route.query.orgCode,
                      ordCode: orderSn,
                    }
                  });
                } else {
                  if (payMent == 1) {// payMent=1跳转非车收银台
                    this.$router.push({
                      path: "/Product/orderPayCashier",
                      query: {
                        prdName: this.pagedata.prdName,// 产品名称
                        orderNo: orderSn,// 订单号
                        price: this.newPriceObj.price,// 展示价格
                        name: this.getUserName(this.benrenItems, 1),
                        mobile: this.getUserName(this.benrenItems, 6),
                        prdId: this.prdId,
                        channelCode: this.channelCode,
                        orgCode: this.orgCode,
                      }
                    })
                    return false
                  } else {
                    this.$http.post("/sunmc/ordSun/getPayPolicy", {
                      orderSn: orderSn,
                      payFlag: this.payFlag //支付环境标识 null：阳光支付 ，"1"：微信小程序支付 "2":支付宝小程序支付
                    }).then(res => {
                      if (res.data.code == 200) {
                        this.onSensors3('jumptime', '跳转时间')
                        if (res.data.data.payClient === 'wxxcx') {//若是微信小程序
                          this.loadingVisible = false//遮罩关闭
                          weixin.miniProgram.navigateTo({ url: res.data.data.jumpUrl + '?' + res.data.data.payUrls });
                        } else if (res.data.data.payClient === 'zfbxcx') {//若是支付宝小程序
                          this.loadingVisible = false//遮罩关闭
                          my.navigateTo({ url: res.data.data.jumpUrl });
                        } else {//阳光支付
                          this.loadingVisible = false//遮罩关闭
                          window.location.href = res.data.data.payUrls; //跳转到阳光保险界面/
                        }
                      } else {
                        this.loadingVisible = false;//遮罩关闭
                        this.onMessageBox(res.data.msg)
                      }
                    });
                  }
                }
              } else {
                this.loadingVisible = false;//遮罩关闭
                this.onMessageBox(res.data.msg)
                return
              }
            })
          } else {
            this.onMessageBox(res.data.data.msg)
            this.loadingVisible = false;//遮罩关闭
            return false
          }
        } else {
          this.onMessageBox(res.data.msg)
          this.loadingVisible = false;//遮罩关闭
          return false
        }
      }).catch(err => {
        this.onMessageBox('核保失败，请稍候重试')
        return false
      })
    },
    // 获取神策生成的userId
    getShenCeUserId() {
      let arr = decodeURIComponent(document.cookie).split(';')
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].split('=')[0].indexOf('sensorsdata2015jssdkcross') != -1) {
            // return JSON.parse(arr[i].split('=')[1]).distinct_id
            let distinct_id = ''
            try {
              distinct_id = JSON.parse(arr[i].split('=')[1]).distinct_id
            } catch (error) {
              console.log(error)
              distinct_id = this.common.getUserSign()
            }
            return distinct_id
          }
        }
      }
      return ''
    },

    // 生成请求报文需要的投保人信息
    generateTbr() {
      let arr = []
      for (let j = 0; j < this.benrenItems.length; j++) {
        let item = this.benrenItems[j]
        if (item.isShow) {
          if (item.itemCode == "12") {// 所在地区
            arr.push({
              code: '12',
              value: item.userCode
            })
          } else if (item.itemCode == "9") {// 所属职业
            arr.push({
              code: '9',
              value: item.userCode
            });
          } else if (item.itemCode == "41") {//发票介质
            arr.push({
              code: '41',
              value: this.showInvoice ? item.userName : ''
            });
          } else if (this.common.checkMsgNull(item.userId)) {// userId是性别的代码
            arr.push({
              code: item.itemCode,
              value: item.userId
            })
          } else {
            arr.push({
              code: item.itemCode,
              value: item.userName
            })
          }
        }
      }
      return arr
    },
    // 生成请求报文需要的被保人信息
    generateBbr() {
      let arr = []
      let obj = {
        linkmanId: '',
        itemId: '',
        insuredItems: [],
        productCodes: this.getProductCodes()
      }
      if (this.checkItemValue(this.danBbrItems, 8, 1)) {// 被保人是本人的情况
        obj.insuredItems.push({
          code: '8',
          value: '1'
        })
        for (let i = 0; i < this.danBbrItems.length; i++) {
          for (let j = 0; j < this.benrenItems.length; j++) {
            let danBbrItem = this.danBbrItems[i]
            let benrenItem = this.benrenItems[j]
            if (benrenItem.isShow && benrenItem.itemCode == danBbrItem.itemCode) {
              if (benrenItem.itemCode == 12) {
                obj.insuredItems.push({
                  code: '12',
                  value: benrenItem.userCode
                })
              } else if (benrenItem.itemCode == 9) {
                obj.insuredItems.push({
                  code: '9',
                  value: benrenItem.userCode
                })
              } else {
                obj.insuredItems.push({
                  code: benrenItem.itemCode,
                  value: benrenItem.userName
                })
              }
            }
          }
        }
      } else {// 单被保人 不是本人的情况
        // obj.insuredItems.push({
        //   code: '8',
        //   value: this.getUserName(this.danBbrItems, 8)
        // })
        for (let i = 0; i < this.danBbrItems.length; i++) {
          if (this.danBbrItems[i].isShow) {
            if (this.danBbrItems[i].itemCode == 12) {
              obj.insuredItems.push({
                code: '12',
                value: this.danBbrItems[i].userCode
              })
            } else if (this.danBbrItems[i].itemCode == 9) {
              obj.insuredItems.push({
                code: '9',
                value: this.danBbrItems[i].userCode
              })
            } else {
              obj.insuredItems.push({
                code: this.danBbrItems[i].itemCode,
                value: this.danBbrItems[i].userName
              })
            }
          }
        }
      }
      arr.push(obj)
      return arr
    },
    // 生成请求报文需要的受益人信息
    generateSyr() {
      return [{
        alignment: 1,
        beneficiaryItems: [{
          code: '29',
          value: '1'
        }]
      }]
    },
    // 生成标的信息
    generateTarget() {
      if (!this.targetItems.length) {
        return []
      }
      let arr = []
      let obj = {}
      obj.itemId = ''
      obj.targetItems = []
      for (let i = 0; i < this.targetItems.length; i++) {
        obj.targetItems.push({
          code: this.targetItems[i].itemCode,
          value: this.targetItems[i].userName
        })
      }
      arr.push(obj)
      return arr
    },

    // 判断是什么支付环境（payFlag null:阳光支付 1:微信支付 2：支付宝支付）
    checkEnvironment() {
      //判断是否为微信小程序环境
      if (window.__wxjs_environment === 'miniprogram') {
        this.payFlag = "1"
      }

      if (window.sessionStorage.getItem('isAlipayMiniFlag') ? window.sessionStorage.getItem('isAlipayMiniFlag') : false) {//若是在支付宝小程序环境里
        this.payFlag = "2"
      }
    },
  },

}
</script>

<style scoped>
@import "./css/combination.css";
</style>