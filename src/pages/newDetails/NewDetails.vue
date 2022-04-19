<template>
  <div class="newDetails-wrap">
    <div class="djs" v-show="showDjs">
      <div class="jdt" v-show="!djsFinish"><span :style="{ width: jdtWidth + 'rem' }"></span></div>
      <div class="jdtts" v-show="!djsFinish">
        <p>滑动浏览</p>
        <p>{{djstime}}s</p>
      </div>
      <div class="jdtts2" v-show="djsFinish">
        <p>好友获得1</p>
        <p>次拆盒机会</p>
      </div>
    </div>
    <div class="znhb-wrap" v-show="isFinish == 'Y'">
      <div class="btn-wrap">
        <template v-if="znhbResultCode == 200">
          <div class="btn" @click="onClickZnhbBack">返回</div>
          <div class="btn" @click="onClickGetPay">确认投保</div>
        </template>
        <template v-else-if="znhbResultCode ==  10001">
          <div class="btn" @click="onClickZnhbBack">否</div>
          <div class="btn" @click="onClickGetPay">是</div>
        </template>
        <div class="btn" v-else-if="znhbResultCode == 10000" @click="onClickZnhbBack">返回重新投保</div>
      </div>
      <div class="family-result" v-if="znhbResultData">
        <div class="family-result-content cb" v-if="znhbResultData.cBJsonArray && znhbResultData.cBJsonArray.length">
          <span><img src="./img/icon_1.png" alt="">可以投保</span>
          <p>感谢您提供的健康信息，恭喜被保人<b><span v-for="(item,index) of znhbResultData.cBJsonArray" :key="'znhbResultCB'+ index">{{item.ordInsuredName}} </span></b>可以正常投保本产品</p>
        </div>
        <div class="family-result-content cw" v-if="znhbResultData.cWJsonArray && znhbResultData.cWJsonArray.length">
          <span><img src="./img/icon_2.png" alt="">除去部分疾病后投保</span>
          <p>感谢您提供的健康告知，</p>
          <p v-for="(item,index) of znhbResultData.cWJsonArray" :key="'znhbResultCW'+ index">被保人<b>{{item.ordInsuredName}}</b>投保本产品的核保结论是：对{{item.diseaseType}}的治疗，不承担赔付责任。</p>
          <p>是否接受此条件继续投保？</p>
        </div>
        <div class="family-result-content jb" v-if="znhbResultData.jBJsonArray && znhbResultData.jBJsonArray.length">
          <span><img src="./img/icon_3.png" alt="">不符合投保条件</span>
          <p>非常抱歉，被保人<b><span v-for="(item,index) of znhbResultData.jBJsonArray" :key="'znhbResultjB1'+ index">{{item.ordInsuredName}}，</span></b><i>未能通过本次投保审核</i></p>
          <p v-for="(item,index) of znhbResultData.jBJsonArray" :key="'znhbResultJB2'+ index">被保人{{item.ordInsuredName}}如下病症不符合投保条件：
            <br>{{item.diseaseType}}
          </p>
        </div>
      </div>
    </div>
    <div class="dialog-personal" v-show="showDialogPersonal">
      <div class="dialog-personal__main">
        <h6>使用“智能核保”进一步</h6>
        <h5>了解被保险人是否可以投保</h5>
        <img src="./img/personal_icon.png" class="dialog-personal-main__icon">
        <button @click="onClickDialogConfirm('personal')">确定</button>
        <p>你可以为自己或家人评测，整个过程将不超过1分钟，且评估结果仅对本次评估有效</p>
        <img src="./img/close.png" class="dialog-personal-main__close" @click="showDialogPersonal = false">
      </div>
    </div>
    <div class="dialog-family" v-show="showDialogFamily">
      <div class="dialog-family__main">
        <h5>请勾选有以上情况的家属</h5>
        <h6>使用“智能核保”进一步了解他们的健康状况以确认是否可以为您承保</h6>
        <div class="dialog-family-main__name">
          <span v-for="item of dialogFamilyInfo" :key="item.insureCertNo" :class="item.selectedFlag ? 'dialog-family-main__active' : ''" @click="onClickDialogName(item)">{{item.insureName}}</span>
        </div>
        <button @click="onClickDialogConfirm('family')">确定</button>
        <p>你可以为自己或家人评测，整个过程将不超过1分钟，且评估结果仅对本次评估有效</p>
        <img src="./img/close.png" class="dialog-family-main__close" @click="showDialogFamily = false">
      </div>
    </div>
    <mymask :loadingVisible="loadingVisible" :loadingVisibleContent="loadingVisibleContent"></mymask>
    <BbrPopPage :showBbrPopPage="showBbrPopPage" @onBbrPopPage="onBbrPopPage" @onHideBbrPopPage="onHideBbrPopPage" :channelName="channelName"></BbrPopPage>
    <div v-show="isFinish != 'Y'">
      <Traceback></Traceback>
    </div>
    <commonpop :showPDFPop="showPDFPop" :showCommonListPop="showCommonListPop" :showCommonContentPop="showCommonContentPop" :pdfUrl="pdfUrl" :commonListTitle="commonListTitle" :commonListArr="commonListArr" :commonContent="commonContent" @onHidePDFPop="onHidePDFPop" @onHideCommonListPop="onHideCommonListPop" @onHideCommonContentPop="onHideCommonContentPop" @onShowCommonContentPop="onShowCommonContentPop"></commonpop>
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
    <div class="bzfw-wrap">
      <div class="top">
        <div class="top-title">保障范围</div>
        <div class="top-more" @click="onShowBzfwDetail" v-if="itemData.prdStyles && itemData.prdStyles[0].prdDutys.length"><span>查看保障</span><img src="./img/icon_21.png" alt="" srcset=""></div>
      </div>
      <div class='bzfw-title' v-if="itemData.prdStyles && itemData.prdStyles.length > 1">
        <div class="title-item" @click="onSwitchStyleIndex(index)" v-for="(prdStyle,index) in itemData.prdStyles" :class='{active:styleActiveIndexA==index}' :style="{border: (styleActiveIndexA==index ? '1px solid ' + itemData.prdTheme : '1px solid #e2e2e2'),color: (styleActiveIndexA == index ? itemData.prdTheme : '#000')}" :key="'fangan' + index">
          <div class="title-item-top" v-if="initPriceArr.length">
            <template v-if="common.checkMsgNull(discountData.discount)">
              <div class="qk2">
                <div class="top">{{initPriceArr[index].discountPrice}}<span v-show="itemData.prdPriceSuf">{{itemData.prdPriceSuf}}</span></div>
                <div class="bottom line">{{initPriceArr[index].price}}<span v-show="itemData.prdPriceSuf">{{itemData.prdPriceSuf}}</span></div>
              </div>
            </template>
            <template v-else-if="common.checkMsgNull(discountData.firstPremium) || common.checkMsgNull(discountData.styleCodeFirstPremium)">
              <template>
                <div class="qk2">
                  <div class="top">首月￥{{initPriceArr[index].firstMonthPrice}}</div>
                  <div class="bottom">次月￥{{initPriceArr[index].otherMonthPrice}}<span v-show="itemData.prdPriceSuf">{{itemData.prdPriceSuf}}</span></div>
                </div>
              </template>
            </template>
            <template v-else-if="common.checkMsgNull(discountData.isMonthPay)">
              <template>
                <div class="qk1">￥{{initPriceArr[index].averageMonthPrice}}<span v-show="itemData.prdPriceSuf">{{itemData.prdPriceSuf}}</span></div>
              </template>
            </template>
            <template v-else>
              <template>
                <div class="qk1">￥{{initPriceArr[index].price}}<span><span v-show="itemData.prdPriceSuf">{{itemData.prdPriceSuf}}</span></span></div>
              </template>
            </template>
          </div>
          <div class="title-item-bottom">{{prdStyle.styleName}}</div>
        </div>
      </div>
      <div class="content">
        <template v-if="itemData.prdStyles">
          <div class="content-item" v-for="(item,index) in itemData.prdStyles[styleActiveIndexA].prdDutys" :key="'fanganneirong' + index" v-show="item.name != ''">
            <!-- <span v-html="item.name"></span> -->
            <div class="left">
              <div class="left-top">{{ item.name }}</div>
              <div class="left-bottom" v-show="item.title">{{ item.title }}</div>
            </div>
            <div class="remark">{{item.remark}}</div>
          </div>
        </template>
      </div>
      <div class="sj-wrap">
        <div class="sj-head" v-show="showKxsjfa">
          <div class="sj-head-icon" :style="{ backgroundColor: itemData.prdTheme }"></div>
          <span>可选升级方案</span>
        </div>
        <template v-if="styleList.length">
          <template v-for="item in styleList[styleActiveIndexA].prdSpecificationCalcs">
            <template v-if="excludeArr.indexOf(item.name) == -1">
              <template v-for="subItem in item.entries">
                <template v-if="subItem.isDefault">
                  <template v-if="subItem.value == '是'">
                    <div class="sj-item active" :key="subItem.id" @click="switchStyleList(item.name, subItem.id)" :style="{border: '1px solid ' + itemData.prdTheme}">
                      <div class="left">
                        <div class="left-top">{{item.name}}</div>
                        <div class="left-bottom">{{subItem.describe}}</div>
                      </div>
                      <div class="right">
                        <img src="./img/icon07_y.png" alt="">
                      </div>
                    </div>
                  </template>
                  <template v-if="subItem.value == '否'">
                    <div class="sj-item" :key="subItem.id" @click="switchStyleList(item.name, subItem.id)">
                      <div class="left">
                        <div class="left-top">{{item.name}}</div>
                        <div class="left-bottom">{{subItem.describe}}</div>
                      </div>
                      <div class="right">
                        <img src="./img/icon07_n.png" alt="">
                      </div>
                    </div>
                  </template>
                </template>
              </template>
            </template>
          </template>
        </template>
      </div>
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
      <!-- 保障范围详情页 -->
      <transition name="bounce">
        <div class="detail" v-show="showBzfwDetail">
          <div class="detail-top">
            <!-- <div class="back" @click="onBzfwBack">
              <img style="width:.1rem;" src="./img/fhjt.png" alt="">
            </div> -->
            <div class="detail-top-title">保障详情</div>
          </div>
          <div class='detail-title' v-if="itemData.prdStyles && itemData.prdStyles.length > 1">
            <div class="detail-title-item" @click="onSwitchStyleIndex(index)" v-for="(prdStyle,index) in itemData.prdStyles" :style="{backgroundColor: (styleActiveIndexA==index ? itemData.prdTheme : '#fff' ), color: (styleActiveIndexA==index ? '#fff' : itemData.prdTheme), border: '1px solid '}" :key='index'>
              {{prdStyle.styleName}}
            </div>
          </div>
          <div class="detail-content-wrap" :style="{paddingTop: (itemData.prdStyles && itemData.prdStyles.length <= 1 ? '0.5rem' : '1.1rem')}" ref="detailContentWrap">
            <template v-if="itemData.prdStyles">
              <div class="detail-content" v-for="(item,index) in itemData.prdStyles[styleActiveIndexA].prdDutys" :key="'fanweixiangqing' + index" :class="item.name != ''? 'detail-content-border-top':''">
                <div class="detail-content-item" v-show="item.name != ''">
                  <!-- <span>{{item.name}}</span> -->
                  <span v-html="item.name"></span>
                  <span class="remark">{{item.remark}}</span>
                </div>
                <div class="detail-content-value" v-html="item.value"></div>
              </div>
            </template>
          </div>
          <div class="common-close-btn" @click="onBzfwBack">返回</div>
        </div>
      </transition>
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
              <input type="text" placeholder="请输入本人证件号码" :id="'tbr' + item.itemCode" v-model="item.userName" @keyup="onTbrIDKeyup(item.userName)" @blur="onTbrZjhm(item.userName), handlePolicyInfoMiddle()" @change="onTbrZjhmChange(item.userName)" @click="onSensors('新模板页面-填写投保人证件号', $event)">
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
              <select disabled v-model="item.userName" @change="onSensors('新模板页面-选择投保人性别', $event), onTbrXbChange(item.userName)">
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
              <select v-model="item.userName" @change="handleTbNum(), onSensors('新模板页面-选择投保份数', $event)">
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
    <div class="mk_info" v-show="groupRiskFlag == 0 && danBbrItems.length">
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
                  <input type="text" placeholder="请输入被保险人证件号码" :id="'danbbr' + item.itemCode" v-model="item.userName" @keyup="onDbbrIDKeyup(item.userName)" @blur="onDanBbrZjhm(item.userName)" @change="onDanBbrZjhmChange(item.userName)" @click="onSensors('新模板页面-填写被保人证件号码', $event)">
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
                  <select disabled v-model="item.userName" @change="onSensors('新模板页面-选择被保人性别', $event), onDanBbrXbChange(item.userName)">
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
                  <select v-model="item.userName" @change="onDbbrZjyxqChange(item.userName), onSensors('新模板页面-单被保人选择证件有效期', $event)">
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
      <template v-if="styleList.length">
        <template v-for="item in styleList[styleActiveIndexA].prdSpecificationCalcs">
          <template v-if="item.name == '社保情况'">
            <div class="wrap shebao" :key="item.name">
              <div class="item">
                <div class="item-title">社保情况</div>
                <div class="item-value shebao-wrap">
                  <div class="shebao-item" v-for="(item, index) in item.entries" :key="index" :style="{backgroundColor: (index == danBbrSheBaoIndex ? '#FFF8F6' : '#F6F6F6'),color: (index == danBbrSheBaoIndex ? itemData.prdTheme: '#444'),border: (index == danBbrSheBaoIndex ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}" @click="onDanBbrSheBaoSwitch(item.id, index), onSensors('新模板页面-选择被保人社保情况', $event)">{{item.value}}</div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </template>
    </div>
    <!-- 多被保人信息 -->
    <div class="mk_info" v-show="groupRiskFlag == 1">
      <h4 class="title_common title_dbbr">被保人信息（为谁投保）
        <div v-if="pagedata.minGroupNum == pagedata.maxGroupNum" class="bbrrs" :style="{color: itemData.prdTheme,border: '1px solid ' + itemData.prdTheme}">被保人人数:{{pagedata.minGroupNum}}人</div>
        <div v-else class="bbrrs" :style="{color: itemData.prdTheme,border: '1px solid ' + itemData.prdTheme}">被保人人数:{{pagedata.minGroupNum}}至{{pagedata.maxGroupNum}}人</div>
      </h4>

      <div class="duoBbr-wrap">
        <div class="duoBbr-item" v-for="(bbrInfo, bbrIndex) in bbrList" :key="bbrIndex + 'bbr'">
          <template v-if="checkItemValue(bbrInfo.items, 8, 1)">
            <div class="duoBbr">
              <div class="duoBbr-left">
                <div class="duoBbr-name">本人</div>
                <template v-if="styleList.length">
                  <template v-for="item in styleList[styleActiveIndexA].prdSpecificationCalcs">
                    <template v-if="item.name == '社保情况'">
                      <template v-for="(item,idx) in item.entries">
                        <div class="benren-relation" v-if="idx == bbrInfo.sheBaoIndex" :key="item.name">{{item.value}}</div>
                      </template>
                    </template>
                  </template>
                </template>
              </div>
              <div class="duoBbr-right">
                <div class="duoBbr-icon" @click="updateDuoBbr(bbrIndex)"><img src="../../../static/images/icon_change_btn.png" alt=""></div>
                <div class="duoBbr-icon" @click="deleteDuoBbr(bbrIndex)"><img src="../../../static/images/icon_delete_btn.png" alt=""></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="duoBbr">
              <div class="duoBbr-left">
                <template v-for="item in bbrInfo.items">
                  <template v-if="item.itemCode == 1">
                    <div class="duoBbr-name" :key="item.itemCode">{{item.userName}}</div>
                  </template>
                </template>
                <template v-for="item in bbrInfo.items">
                  <template v-if="item.itemCode == 8 && item.options[bbrInfo.relationIndex]">
                    <template v-for="(subItem, index) in item.options">
                      <template v-if="index == bbrInfo.relationIndex">
                        <div class="duoBbr-relation" :key="subItem.id">{{subItem.name}}</div>
                      </template>
                    </template>
                  </template>
                </template>
                <template v-if="styleList.length">
                  <template v-for="item in styleList[styleActiveIndexA].prdSpecificationCalcs">
                    <template v-if="item.name == '社保情况'">
                      <template v-for="(item,idx) in item.entries">
                        <div class="duoBbr-relation" v-if="idx == bbrInfo.sheBaoIndex" :key="item.name">{{item.value}}</div>
                      </template>
                    </template>
                  </template>
                </template>
              </div>
              <div class="duoBbr-right">
                <div class="duoBbr-icon" @click="updateDuoBbr(bbrIndex)"><img src="../../../static/images/icon_change_btn.png" alt=""></div>
                <div class="duoBbr-icon" @click="deleteDuoBbr(bbrIndex)"><img src="../../../static/images/icon_delete_btn.png" alt=""></div>
              </div>
            </div>
            <template v-for="(item,idx) in bbrInfo.items">
              <div class="duoBbr-another" :key="idx" v-if="item.itemCode == 4">
                <div class="duoBbr-another-itemName">
                  <template v-for="(itemx,idxx) in bbrInfo.items">
                    <template v-if="itemx.itemCode == 3">
                      <span :key="idxx">{{itemx.userName | handleIDCardType}}</span>
                    </template>
                  </template>
                </div>
                <!-- <div class="duoBbr-another-itemName" v-else>{{item.itemName}}</div> -->
                <div class="duoBbr-another-value">{{item.userName}}</div>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div class="addBbrInfo" v-show="bbrList.length < pagedata.maxGroupNum" :style="{color: itemData.prdTheme}" @click="onShowMoreBbr">+ 添加被保险人</div>

      <!-- 多个被保人信息填写弹框 -->
      <transition name=bounce>
        <div class="moreBbr-wrap" v-if="showMoreBbr">
          <div class="moreBbr-title-wrap">
            <div class="back" @click="onHideMoreBbr">
              <img style="width:.1rem;height: .15rem;" src="./img/fhjt.png" alt="">
            </div>
            <div class="moreBbr-title">被保险人信息</div>
          </div>
          <div class="moreBbr-content">
            <div class="group-item-insur">
              <div class="wstb">为谁投保</div>
              <div class="itemBbrName-wrap">
                <template v-for="item in bbrPop.items">
                  <template v-if="item.itemCode == 8">
                    <div class="itemBbrName" :style="{backgroundColor: (idx == bbrPop.relationIndex ? '#FFF8F6': '#F6F6F6'),color: (idx == bbrPop.relationIndex ? itemData.prdTheme: '#444'),border: (idx == bbrPop.relationIndex ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}" v-for="(itemy,idx) in item.options" :value="itemy.id" :key="idx" @click="onSwitchDuoBbrRelation(itemy.id, idx)">{{itemy.name}}</div>
                  </template>
                </template>
              </div>

              <template v-for="item in bbrPop.items">
                <template v-if="item.itemCode == 8">
                  <template v-if="item.userName != 1">
                    <div class="wrap" :key="item.itemCode">
                      <!-- 被保险人姓名 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 1 && item.isShow">
                          <div class="item-title">被保险人姓名</div>
                          <div class="item-value">
                            <input type="text" placeholder="请输入被保险人姓名" v-model="item.userName" maxlength="30" @blur="onCheckXingming(item.userName)" @click="onSensors('新模板页面-填写被保人姓名', $event)">
                          </div>
                        </div>
                      </template>
                      <div class="item">
                        <!-- 证件类型 -->
                        <template v-for="item in bbrPop.items">
                          <div class="item-title" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
                            <template v-if="item.options.length > 1">
                              <select v-model="item.userName" @change="onIdTypeChange(bbrPop.items, item.userName), onSensors('新模板页面-选择证件类型', $event)">
                                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                              </select>
                            </template>
                            <template v-else>
                              {{ item.options[0].name }}
                            </template>
                          </div>
                        </template>
                        <!-- 证件号码 -->
                        <template v-for="item in bbrPop.items">
                          <div class="item-value" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
                            <input type="text" placeholder="请输入被保险人证件号码" v-model="item.userName" @keyup="onDuoBbrIDKeyup(item.userName)" @blur="onDuoBbrZjhm(item.userName)" @click="onSensors('新模板页面-填写被保人证件号码', $event)">
                          </div>
                        </template>
                      </div>
                      <!-- 联系电话 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
                          <div class="item-title">联系电话</div>
                          <div class="item-value">
                            <input type="tel" placeholder="请输入被保险人手机号" v-model="item.userName" @blur="onCheckSjh(item.userName)" @click="onSensors('新模板页面-填写被保人手机号', $event)" maxlength="11">
                          </div>
                        </div>
                      </template>
                      <!-- 邮箱 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 7 && item.isShow">
                          <div class="item-title">邮箱</div>
                          <div class="item-value">
                            <input type="text" placeholder="请输入被保险人邮箱" v-model="item.userName" @blur="onCheckYouxiang(item.userName)" @click="onSensors('新模板页面-填写被保人邮箱', $event)">
                          </div>
                        </div>
                      </template>
                      <!-- 出生日期 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 5 && item.isShow">
                          <div class="item-title">出生日期</div>
                          <div class="item-value">
                            <input type="text" placeholder="请选择出生日期" v-model="item.userName" readonly @click="showDuoBbrBirthDayPop">
                          </div>
                        </div>
                      </template>
                      <!-- 性别 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 2 && item.isShow">
                          <div class="item-title">性别</div>
                          <div class="item-value">
                            <select disabled v-model="item.userName" @change="onSensors('新模板页面-选择被保人性别', $event)">
                              <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                            </select>
                          </div>
                        </div>
                      </template>
                      <!-- 详细地址 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 15 && item.isShow">
                          <div class="item-title">详细地址</div>
                          <div class="item-value">
                            <input type="text" placeholder="请输入详细地址" :id="'tbr' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-被保人填写详细地址', $event)">
                          </div>
                        </div>
                      </template>
                      <!-- 证件有效期 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 19 && item.isShow">
                          <div class="item-title">证件有效期</div>
                          <div class="item-value">
                            <select v-model="item.userName" @change="onDuoBbrZjyxqChange(item.userName), onSensors('新模板页面-选择证件有效期', $event)">
                              <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                            </select>
                          </div>
                        </div>
                      </template>
                      <!-- 证件有效起期 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 23 && item.isShow">
                          <div class="item-title">证件有效起期</div>
                          <div class="item-value">
                            <input type="text" placeholder="请选择证件有效起期" v-model="item.userName" @click="showDuoBbrZjyxqqPop" readonly>
                          </div>
                        </div>
                      </template>
                      <!-- 证件有效止期 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 22 && item.isShow">
                          <div class="item-title">证件有效止期</div>
                          <div class="item-value">
                            <input type="text" placeholder="请选择证件有效止期" v-model="item.userName" @click="showDuoBbrZjyxzqPop" readonly>
                          </div>
                        </div>
                      </template>
                      <!-- 反洗钱出单传值开关 -->
                      <template v-for="item in bbrPop.items">
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
                      <template v-for="item in bbrPop.items">
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
                      <template v-for="item in bbrPop.items">
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
              </template>

              <template v-if="styleList.length">
                <template v-for="item in styleList[styleActiveIndexA].prdSpecificationCalcs">
                  <template v-if="item.name == '社保情况'">
                    <div class="wrap shebao" :key="item.name">
                      <div class="item">
                        <div class="item-title">社保情况</div>
                        <div class="item-value shebao-wrap">
                          <div class="shebao-item" v-for="(item, index) in item.entries" :key="index" :style="{backgroundColor: (index == bbrPop.sheBaoIndex ? '#FFF8F6': '#F6F6F6'),color: (index == bbrPop.sheBaoIndex ? itemData.prdTheme: '#444'),border: (index == bbrPop.sheBaoIndex ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}" @click="onDuoBbrSheBaoSwitch(item.id, index),onSensors('新模板页面-选择被保人社保情况', $event)">{{item.value}}</div>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </template>
            </div>
          </div>
          <div class="moreBbr-bottom-wrap">
            <div class="moreBbr-bottom-btn" :style="{backgroundColor: itemData.prdTheme}" :class="{btnChecked: showSnakeLoading}" @click="addOrUpdateDuoBbr">
              <div v-show="showSnakeLoading">
                <mt-spinner type="snake" color="#fff" :size="25"></mt-spinner><span style="padding-left: 10px;">请稍候</span>
              </div>
              <div v-show="!showSnakeLoading">确定</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 宠物信息 开始 -->
    <div class="mk_info" v-show="petsItems.length">
      <h4 class="title_common title_tbr">宠物信息</h4>
      <div class="wrap">
        <!-- 宠物类型 -->
        <template v-for="item in petsItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 55 && item.isShow">
            <div class="item-title">宠物类型</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSwitchPetArr(item.userName), onSensors('新模板页面-选择宠物类型', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 宠物品种 -->
        <template v-for="item in petsItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 56 && item.isShow && petArr.length">
            <div class="item-title">宠物品种</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择宠物品种', $event)">
                <option v-for="option in petArr" :value="option.name" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 宠物性别 -->
        <template v-for="item in petsItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 57 && item.isShow">
            <div class="item-title">宠物性别</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择宠物性别', $event)">
                <option v-for="option in item.options" :value="option.name" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 宠物昵称 -->
        <template v-for="item in petsItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 58 && item.isShow">
            <div class="item-title">宠物昵称</div>
            <div class="item-value">
              <input type="text" placeholder="请输入宠物昵称" :id="'pet' + item.itemCode" v-model="item.userName" maxlength="20" @blur="onCheckNicheng(item.userName)" @click="onSensors('新模板页面-填写宠物昵称', $event)">
            </div>
          </div>
        </template>
        <!-- 宠物年龄 -->
        <template v-for="item in petsItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 59 && item.isShow">
            <div class="item-title">宠物年龄</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择宠物年龄', $event)">
                <option v-for="option in item.options" :value="option.name" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 宠物毛色 -->
        <template v-for="item in petsItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 60 && item.isShow">
            <div class="item-title">宠物毛色</div>
            <div class="item-value">
              <input type="text" placeholder="请输入宠物毛色" :id="'pet' + item.itemCode" v-model="item.userName" maxlength="5" @blur="onCheckMaose(item.userName)" @click="onSensors('新模板页面-填写宠物毛色', $event)">
            </div>
          </div>
        </template>
        <!-- 宠物照片 -->
        <template v-for="item in petsItems">
          <div class="upload-img" :key="item.itemCode" v-if="item.itemCode == 61 && item.isShow">
            <div class="upload-img-title">请上传您爱宠最近一周的照片（图片清晰，无PS，光线明亮），宠物正脸需面向镜头，照片要包含宠物身体</div>
            <div class="upload-img-content">
              <div>
                <div>
                  <img src="../../../static/images/tpsl.png" alt="">
                </div>
                <p>图片示例</p>
              </div>
              <div>
                <div @click="showUploadImg('file1'),onSensors('填单页-上传宠物照片', $event)">
                  <img v-if="item.userName" :src="item.userName">
                  <img v-else src="../../../static/images/sctp.png" alt="">
                </div>
                <p>上传图片</p>
                <input type="file" name="" id="file1" @change="uploadIMGYa($event,'file1')" style="display:none;">
              </div>
            </div>
          </div>
        </template>
        <!-- 宠物与主人照片 -->
        <template v-for="item in petsItems">
          <div class="upload-img" :key="item.itemCode" v-if="item.itemCode == 62 && item.isShow">
            <div class="upload-img-title">请您上传宠物主与宠物合影照片</div>
            <div class="upload-img-content">
              <div>
                <div><img src="../../../static/images/tpsl2.png" alt=""></div>
                <p>图片示例</p>
              </div>
              <div>
                <div @click="showUploadImg('file2'),onSensors('填单页-上传宠物与主人照片', $event)">
                  <img v-if="item.userName" :src="item.userName">
                  <img v-else src="../../../static/images/sctp.png" alt="">
                </div>
                <p>上传图片</p>
                <input type="file" name="" id="file2" @change="uploadIMGYa($event,'file2')" style="display:none;">
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 宠物信息 结束 -->
    <!-- 标的信息 -->
    <div class="mk_info" v-show="targetItems.length">
      <h4 class="title_common title_bzxq">标的信息</h4>
      <div class="wrap">
        <!-- 非机动车类型 -->
        <template v-for="item in targetItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 89 && item.isShow">
            <div class="item-title">非机动车类型</div>
            <div class="item-value">
              <select v-model="item.userName" @change="onSensors('新模板页面-选择非机动车类型', $event)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 非机动车号码 -->
        <template v-for="item in targetItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 90 && item.isShow">
            <div class="item-title">非机动车号码</div>
            <div class="item-value">
              <input type="text" :placeholder="checkItemValue(targetItems, 89, 1) ? '请输入车架号': '请输入车牌号'" :id="'target' + item.itemCode" :maxlength="checkItemValue(targetItems, 89, 1) ? '17': '8'" v-model="item.userName" @click="onSensors('新模板页面-填写非机动车号码', $event)" @blur="onCheck90(item.userName)" @keyup="handleCphOrCjh(item)">
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 支付方式 -->
    <div class="mk_info" v-if="this.discountData && this.discountData.isMonthPay">
      <h4 class="title_common title_payType">支付方式</h4>
      <div class="payType-wrap">
        <div class="payType-item" v-for="(item,index) in JSON.parse(this.discountData.isMonthPay)" :style="{backgroundColor: (index == monthPayIndex ? '#FFF8F6': '#fff'),color: (index == monthPayIndex ? itemData.prdTheme: '#444'),border: (index == monthPayIndex ? '1px solid ' + itemData.prdTheme : '1px solid #e2e2e2')}" :key="item.key" @click="switchMonthPay(item.value, index)">{{item.key}}</div>
      </div>
    </div>
    <!--------------------------------------- 保障详情 开始 --------------------------------------->
    <div class="mk_info">
      <h4 class="title_common title_bzxq">其他</h4>
      <div class="wrap">
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
      <Xieyi :checkedFlag="checkedFlag" :khsIsReadFlag="khsIsReadFlag" :khsPopShowFlag="khsPopShowFlag" :khsArr="khsArr" @onSwitchCheckedFlag="onSwitchCheckedFlag" @onClickYuqr="onClickYuqr" @onHideKhsPop="onHideKhsPop" @onClickKhsTab="onClickKhsTab" @onShowCommonContentPop="onShowCommonContentPop" @onClickTabBtn="onClickTabBtn"></Xieyi>
      <!--------------------------------------- 底部-我已确认部分 结束 --------------------------------------->
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
              <div class="qk1" v-if="newPriceObj.qkType == 1">￥{{newPriceObj.price}}<span>/年</span></div>
              <div class="qk2" v-else-if="newPriceObj.qkType == 2">每月￥{{newPriceObj.monthPrice}}</div>
              <div class="qk2" v-else-if="newPriceObj.qkType == 3">
                <div class="top">首月￥{{newPriceObj.firstMonthPrice}}</div>
                <div class="bottom">次月￥{{newPriceObj.otherMonthPrice}}</div>
              </div>
              <div class="qk2" v-else-if="newPriceObj.qkType == 4">
                <div class="top">￥{{newPriceObj.price}}<span>/年</span></div>
                <div class="bottom line">￥{{newPriceObj.oldPrice}}<span>/年</span></div>
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
import Cookies from 'js-cookie'
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
import { dogType, catType } from '../../../static/petType'
export default {
  name: 'NewDetails',
  components: {
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
      showDjs: false,
      hasScroll: false,
      djsFinish: false,
      jdtWidth: 0,
      djstime: 0,
      djsTimer: null,

      orderNo: '', // 创建保单接口返回的订单号
      payMent: 0, // 0跳转资金收银台 1跳转非车收银台
      znhbResultCode: '',
      znhbResultData: {},
      showDialogPersonal: false, //是否展示个人版智能核保弹框标识
      showDialogFamily: false, //是否展示家庭版智能核保弹框标识
      dialogPersonalInfo: {},
      dialogFamilyInfo: [],
      canGotoNext: true, // 表示如果主流程接口都调成功了，则点击立即支付可以往下走
      startTime: new Date().getTime(),
      isBodyFixed: false,
      prdId: this.$route.query.id, //列表id，产品id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      carOwnerCode: this.$route.query.carOwnerCode, //列表carownerCode
      openid: this.$route.query.openid,//微信用户唯一标识//代扣微信用户唯一标识(分期代扣产品必传)
      carOwnerSecretId: this.$route.query.carOwnerSecretId,
      fromListPage: this.$route.query.fromListPage,// 如果是从列表页跳转过来的，则不能点击下一步
      isFinish: this.$route.query.isFinish,// 如果是Y，标识是智能核保回调咱们的页面
      /////////////////////////////////////////// 被保人重要告知弹框 开始 ////////////////////////////////////////////////
      showBbrPopPage: false,
      /////////////////////////////////////////// 被保人重要告知弹框 结束 ////////////////////////////////////////////////
      /////////////////////////////////////////// 返回顶部 开始 ////////////////////////////////////////////////
      showGoTop: false,
      /////////////////////////////////////////// 返回顶部 结束 ////////////////////////////////////////////////
      showPDFPop: false,
      showCommonListPop: false, // 是否展示通用列表弹框 标识
      showCommonContentPop: false, // 是否展示通用内容弹框 标识
      pdfUrl: '',
      commonListArr: [], // 通用列表数组
      commonListTitle: '', // 通用列表弹框中的顶部标题
      commonContent: {}, // ；通用弹框展示内容
      /////////////////////////////////////////// 底部-我已确认部分 开始 ////////////////////////////////////////////////
      bxtkArr: [], // 保险条款数组
      khsArr: [], // 可回溯数组

      insurDetail: {},
      checkedFlag: false,
      khsPopShowFlag: false,
      khsIsReadFlag: false,
      /////////////////////////////////////////// 底部-我已确认部分 开始 ////////////////////////////////////////////////
      /////////////////////////////////////////// 轮播部分 开始 ////////////////////////////////////////////////
      lunboImgArr: [], // 轮播图片数组
      lunboVideo: '', // 轮播中的视频
      showVideo: false, // 是否展示视频
      showStartBtn: false, // 是否展示播放按钮
      showPageNum: false,// 是否展示页码
      showVideoBtn: false,// 是否展示视频切换按钮
      showImgBtn: false,// 是否展示图片切换按钮
      swiperOption: {
      },
      /////////////////////////////////////////// 轮播部分 结束 ////////////////////////////////////////////////
      /////////////////////////////////////////// 保障范围 开始 ////////////////////////////////////////////////
      showBzfwDetail: false, // 是否展示保障范围详情
      showKxsjfa: false, // 是否展示可选升级方案部分
      excludeArr: ['年龄', '性别', '社保情况', '保险期间', '总保额', '共享免赔额', '方案被保人数', '方案被保人数范围'],
      gmxzArr: [], // 非保险条款数组，也不包括费率表
      flbContent: {}, // 费率表
      /////////////////////////////////////////// 保障范围 结束 ////////////////////////////////////////////////
      /////////////////////////////////////////// 保障详情 开始 ////////////////////////////////////////////////
      dateObj: {
        lastDateString: '00:00:00',
        endLastDateString: '23:59:59',
      },
      /////////////////////////////////////////// 保障详情 结束 ////////////////////////////////////////////////
      // 宠物信息 开始
      petArr: [], // 当前宠物类别数组
      petsItems: [], // 
      // 宠物信息 结束
      groupRiskFlag: 0, // 1 为团险 0 为个险
      showInvoice: false,// 是否开电子发票
      invoiceIndex: 0,// 发票类型索引
      itemData: {},
      discountData: {},// 折扣接口返回的data对象
      styleList: [],
      styleActiveIndexA: 0,// 当前选中方案索引
      initPriceArr: [],// 保障范围中展示的价格相关
      pagedata: {}, //page 数据
      danBbrRelationIndex: 0,// 单被保人 与投保人关系 索引
      danBbrSheBaoIndex: 0,// 单被保人 社保 索引
      updateDuoBbrFlag: false,// 是否更新多被保人信息标识
      updateDuoBbrIndex: 0,// 正在更新的多被保人在数组中的索引
      showMoreBbr: false,// 
      bbrPop: {},
      bbrPopTemp: {},
      bbrList: [],
      newPriceObj: {},// 选择方案时展示的价格
      showCalcLoading: false,// 是否展示保费计算中的loading
      showSnakeLoading: false, // 多被保人添加或者修改时，点击确定按钮，是否展示loading
      benrenCalcInfo: {},
      benrenItems: [],
      danBbrCalcInfo: {},
      danBbrItems: [],
      targetItems: [],
      showHealth: false,// 是否展示健康告知
      payFlag: null,//null：阳光支付,"1"：微信小程序支付, "2":支付宝小程序支付
      underwritingPolicyRes: {//新保情况下,核保提示
        isShowXubaoPop: true,//是否二次调用核保接口
        reUnderwrite: 1,//默认为1
        oldpolicyNoUnid: "",//默认为空
      },
      loadingVisible: false,
      loadingVisibleContent: '',
      reqJson: {},// 核保请求报文

      monthPayIndex: 0,// 是否月缴的索引
      monthPayNum: 1,
      cityData: {},// 接口获取的城市数据
      adList: [],
      channelName: '',
      urlParam: '',
      baiduSearchCount: 0,//百度搜索API成功调用次数
      baiduInforFlowCount: 0,//百度信息流API成功调用次数
      douyinCount: 0,//抖音API成功调用次数
      kuaishouCount: 0,//快手API成功调用次数
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
    }
  },
  created() {

    let activityId = this.$route.query.activityId
    let openid = this.$route.query.openid
    let openidEncrypt = this.$route.query.openidEncrypt
    let shareOpenid = this.$route.query.shareOpenid
    let shareOpenidEncrypt = this.$route.query.shareOpenidEncrypt
    if (!activityId || !openid || !openidEncrypt || !shareOpenid || !shareOpenidEncrypt) {

    } else if (openid && shareOpenid && openid == shareOpenid) {
      
    } else {
      if (activityId && activityId == 'BlindBox') {
        this.$http.post('/prdmc/blindBoxActivity/display', {
          openid: shareOpenid,
          openidEncrypt: shareOpenidEncrypt,
          activityId: activityId,
        }).then(res => {
          let code = res.data.code
          if (code == 200) {
            this.showDjs = true
            window.addEventListener('scroll', this.onDjsScroll)
          }
        })
      }
    }

    this.handleChannelCodeAndOrgCode()
    this.canScroll()
    this.getUrlParam()
    this.userSign = this.common.getUserSign()
    this.loadingVisible = true
    if (this.isFinish == 'Y') {
      try {
        _behaviorObj.refreshToken(Cookies.get('huisutrackId'))
      } catch (err) {
        console.log('可回溯报错：' + err)
      }
    }
    this.selectAllProductInfo()
    // this.getProductDetail()
    // this.getAd()
    // this.getList()
    this.getCityData()
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

    onDjsScroll() {
      if (this.hasScroll) {
        return
      }
      this.hasScroll = true
      window.removeEventListener('scroll', this.onDjsScroll)
      this.djsTimer = setInterval(() => {
        this.djstime++
        this.jdtWidth = (this.djstime / 10) *0.56
        if (this.djstime >= 10) {
          clearInterval(this.djsTimer)
          this.$http.post('/prdmc/blindBoxActivity/addDrawCount', {
            openid: this.$route.query.shareOpenid,
            openidEncrypt: this.$route.query.shareOpenidEncrypt,
            activityId: this.$route.query.activityId,
          }).then(res => {
            console.log(res)
            let code = res.data.code
            if (code == 200) {
              this.djsTimer = null
              this.djsFinish = true
            }
          })
          
        }
      }, 1000)
    },
    
    selectAllProductInfo() {
      this.handleSelectAllProductInfo(res => {
        res = this.common.myReplaceAllUrl(res)
        this.onProductDetail(res.data.prdShopDetailDTO)
        this.onEnterMaidian(res.data.channelDto)
        this.handleWXShare()
        this.adList = res.data.listMap ? res.data.listMap : []
        this.discountData = res.data.prdProductChannelDiscountIsDTO
        if (this.discountData.isMonthPay) {
          this.monthPayNum = JSON.parse(this.discountData.isMonthPay)[0].value
        }
        this.styleList = res.data.prdCalcDTO.prdStyleSpecification
        this.handleShowKxsjfa()

        this.pagedata = res.data.prdInsureDTO
        this.initPagedata()

        this.setDate()

        this.getBenrenCalcInfo()
        this.getDanBbrCalcInfo()
        this.benrenItems = this.getItems(1)
        this.danBbrItems = this.getItems(2)
        this.targetItems = this.getItems(7)
        this.petsItems = this.getItems(8)
        this.getBbrPop()

        this.putSessionData()
        this.changeMinGroupNumAndMaxGroupNum()
        this.getInitPriceArr()
        this.getNewPriceObj()

        if (this.isFinish == 'Y') {
          this.toPay(true)
        }
      })
    },
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
    onClickZnhbBack() {
      this.isFinish = ''
      this.onCanScroll()
    },
    onClickGetPay() {
      this.loadingVisible = true
      this.loadingVisibleContent = '加载中'
      this.behaviorObjSetOrderNo(() => {
      })
      if (this.pagedata.giveInsurance == 0) {
        this.onGotoSuccessPage()
      } else {
        if (this.payMent == 1) {// 跳转非车收银台
          this.onGotoOrderPayCashier()
          return false
        } else {
          let fqs = this.monthPayNum
          if (this.common.checkMsgNull(fqs) && fqs > 1) {//若有月缴(不包含全额缴费)
            this.handleMonthPay()
          } else {//无月缴
            this.handleGetPayPolicy()
          }
        }
      }
    },
    onClickDialogConfirm(type) {
      let data = {
        prdId: this.prdId,
        channelCode: this.channelCode,
        orgCode: this.orgCode,
        appCertNo: this.getUserName(this.benrenItems, 4),
      }
      let insureds = []
      if (type == 'personal') {
        data.protectPlan = 1 // protectPlan: 1 表示个人版， 2表示家庭版
        insureds.push({
          insureCertNo: this.dialogPersonalInfo.insureCertNo,
          insureName: this.dialogPersonalInfo.insureName,
        })
      } else if (type == 'family') {
        data.protectPlan = 2
        let flag = false
        for (let i = 0; i < this.dialogFamilyInfo.length; i++) {
          if (this.dialogFamilyInfo[i].selectedFlag) {
            flag = true
            break
          }
        }
        if (!flag) {
          Toast('请至少选择一人')
          return false
        } else {
          for (let i = 0; i < this.dialogFamilyInfo.length; i++) {
            if (this.dialogFamilyInfo[i].selectedFlag) {
              insureds.push({
                insureCertNo: this.dialogFamilyInfo[i].insureCertNo,
                insureName: this.dialogFamilyInfo[i].insureName,
              })
            }
          }
        }
      }
      data.insureds = insureds
      try {
        Cookies.set('huisutrackId', _behaviorObj.getTraceId())
      } catch (err) {
        console.log('可回溯报错：' + err)
      }
      window.sessionStorage.setItem('znhbInsureds', JSON.stringify(insureds))
      this.loadingVisible = true
      this.loadingVisibleContent = '加载中'

      this.$http.post('sunmc/getIntelligentUnderwritingLink/getLink', data).then(res => {
        this.loadingVisible = false
        this.loadingVisibleContent = ''
        if (res.data.code == 200) {
          window.location.href = res.data.data
        } else {
          this.onMessageBox(res.data.msg)
          return
        }
      })

    },
    onClickDialogName(item) {
      item.selectedFlag = !item.selectedFlag
    },
    setDialogPersonalInfo() {
      if (this.checkItemValue(this.danBbrItems, 8, 1)) {
        this.dialogPersonalInfo = {
          insureName: this.getUserName(this.benrenItems, 1),
          insureCertNo: this.getUserName(this.benrenItems, 4),
          selectedFlag: false,
        }
      } else {
        this.dialogPersonalInfo = {
          insureName: this.getUserName(this.danBbrItems, 1),
          insureCertNo: this.getUserName(this.danBbrItems, 4),
          selectedFlag: false,
        }
      }

    },
    setDialogFamilyInfo() {
      let arr = []
      for (let i = 0; i < this.bbrList.length; i++) {
        if (this.bbrList[i].isBenren) {
          arr.push({
            insureName: this.getUserName(this.benrenItems, 1),
            insureCertNo: this.getUserName(this.benrenItems, 4),
            selectedFlag: false,
          })
        } else {
          let items = this.bbrList[i].items
          arr.push({
            insureName: this.getUserName(items, 1),
            insureCertNo: this.getUserName(items, 4),
            selectedFlag: false,
          })
        }
      }
      this.dialogFamilyInfo = arr
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
      } else if (name == 'selectAllProductInfo') {
        return `selectAllProductInfo${this.prdId}${this.channelCode}${this.orgCode}`
      }
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
      this.onNoScroll()
      this.khsPopShowFlag = true
    },
    onHideKhsPop() {
      this.onCanScroll()
      this.khsPopShowFlag = false
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
    onCheck90(userName) {
      if (this.checkItemValue(this.targetItems, 89, 1)) { // 车架号
        if (!this.onCheckCjh(userName)) {
          return false
        }
      } else { // 车牌号
        if (!this.onCheckCph(userName)) {
          return false
        }
      }
      return true
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
        }).catch(reject => {
          console.log(JSON.stringify(reject));
        });
    },
    // 保存中间表接口
    handlePolicyInfoMiddle() {
      let holderName = ''
      let holderMobile = ''
      let holderinsureCertNo = ''
      let holderIdtype = ''

      let mobile = this.getUserName(this.benrenItems, 6)
      let name = this.getUserName(this.benrenItems, 1)
      let insureCertNo = this.getUserName(this.benrenItems, 4)
      let idType = this.getUserName(this.benrenItems, 3)
      if (this.common.checkMsgNull(mobile) && this.common.checkMobilePhone(mobile)) {

        holderMobile = mobile
        holderIdtype = idType
        if (this.common.checkMsgNull(name) && this.common.checkName(name)) {
          holderName = name
        }
        if (this.common.checkMsgNull(insureCertNo) && this.common.checkIdCard(insureCertNo)) {
          holderinsureCertNo = insureCertNo
        }

        this.$http.post('/sunmc/policyInfoMiddle/createPolicyInfoMiddle', {
          userSign: window.sessionStorage.getItem('userSign'),
          holderName: holderName,
          holderMobile: holderMobile,
          holderinsureCertNo: holderinsureCertNo,
          holderIdtype: holderIdtype,
          prdId: this.prdId,
          agentCode: this.channelCode,
        }).then(res => {
        })
      }
    },
    onShowPDFPop() {
      this.onNoScroll()
      this.showPDFPop = true
    },
    onHidePDFPop() {
      if (!this.showCommonListPop && !this.khsPopShowFlag) {
        this.onCanScroll()
      }
      this.showPDFPop = false
    },
    handleTbNum() {
      this.getNewPriceObj()
    },
    ///////////////////////////////////////////// 宠物信息 开始 ///////////////////////////////////////////
    onSwitchPetArr(userName) {
      if (1 == userName) {
        this.petArr = dogType
      } else if (2 == userName) {
        this.petArr = catType
      }
      this.setUserName(this.petsItems, 56, this.petArr[0].name)
    },
    showUploadImg(filename) {
      document.getElementById(filename).click()
      return
    },
    uploadIMGYa(e, filename) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picavalue = files[0];
      console.log(this.picavalue.size / 1024);
      const isJPG = this.picavalue.type === 'image/jpeg';
      const isPNG = this.picavalue.type === 'image/png';
      if (!isJPG && !isPNG) {
        this.onToast('上传头像图片只能是 JPG和PNG 格式!')
        return
      }
      if (isJPG || isPNG) {
        Indicator.open({
          text: '上传中...',
          spinnerType: 'fading-circle'
        })
      }
      this.imgPreview(this.picavalue, filename);
    },
    //获取图片
    imgPreview(file, filename, callback) {
      let self = this;
      let that = this
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();

        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function () {
          let result = this.result;
          let img = new Image();
          img.src = result;
          console.log("********未压缩前的图片大小********");
          console.log(result.length);
          img.onload = function () {
            let data = that.compress(img);
            let fileYa = that.dataURLtoFile(data, Date.parse(Date()) + '.jpg');
            var formData = new FormData();
            formData.append("file", fileYa);
            let config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
            // 发送请求;
            that.$http.post('/admin/file/upload', formData, config).then(res => {
              if (res.data.code == 200) {
                if ('file1' == filename) {
                  that.setUserName(that.petsItems, 61, res.data.data.filename)
                } else if ('file2' == filename) {
                  that.setUserName(that.petsItems, 62, res.data.data.filename)
                }
                Indicator.close()
                that.onToast('上传成功')
              } else {
                self.$message({
                  message: "图片上传失败，请重试",
                  type: "warning"
                });
              }
            });
          };
        };
      }
    },
    // 压缩图片
    compress(image) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext('2d');
      var degree;
      EXIF.getData(image, function () {
        EXIF.getAllTags(image);
        let Orientation = EXIF.getTag(image, 'Orientation');
        console.log(Orientation)
        switch (Orientation) {
          case 6:
            canvas.width = image.height;
            canvas.height = image.width;
            degree = 90 * Math.PI / 180;
            ctx.rotate(degree);
            ctx.drawImage(image, 0, -image.height, image.width, image.height);
            break;
          case 8:
            canvas.width = image.height;
            canvas.height = image.width;
            degree = 270 * Math.PI / 180;
            ctx.rotate(degree);
            ctx.drawImage(image, -image.width, 0, image.width, image.height);
            break;
          case 3:
            canvas.width = image.width;
            canvas.height = image.height;
            degree = 180 * Math.PI / 180;
            ctx.rotate(degree);
            ctx.drawImage(image, -image.width, -image.height, image.width, image.height);
            break;
          default:
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
        }
      });

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      // console.log("*******压缩后的图片大小*******");
      // console.log(ndata)
      // console.log(ndata.length);
      return ndata;
    },
    //base64转file
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    ///////////////////////////////////////////// 宠物信息 开始 ///////////////////////////////////////////
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
    onHideCommonListPop() {
      this.onCanScroll()
      this.showCommonListPop = false
    },
    onShowCommonListPop() {
      this.onNoScroll()
      this.showCommonListPop = true
    },
    onShowCommonListArr(type) {
      if (type == 1) {
        this.commonListArr = JSON.parse(JSON.stringify(this.bxtkArr))
        this.commonListTitle = '保险条款'
      } else if (type == 2) {
        this.commonListArr = JSON.parse(JSON.stringify(this.gmxzArr))
        this.commonListTitle = '购买须知'
      }
      this.onShowCommonListPop()
    },
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
        let lunboImgArr = []
        this.itemData.prdImgs.forEach(prdImg => {
          if (prdImg.imgUrl.endsWith('.png') || prdImg.imgUrl.endsWith('.jpg')) {
            lunboImgArr.push(prdImg.imgUrl)
          } else if (prdImg.imgUrl.endsWith('.mp4')) {
            this.lunboVideo = prdImg.imgUrl
          }
        })
        this.lunboImgArr = lunboImgArr
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
    onShowBzfwDetail() {
      this.showBzfwDetail = true
      this.onNoScroll()
    },
    onBzfwBack() {
      this.showBzfwDetail = false
      this.onCanScroll()
    },
    handleShowKxsjfa() {// 判断是否展示
      for (let i = 0; i < this.styleList[this.styleActiveIndexA].prdSpecificationCalcs.length; i++) {
        if (this.excludeArr.indexOf(this.styleList[this.styleActiveIndexA].prdSpecificationCalcs[i].name) == -1) {
          this.showKxsjfa = true
        }
      }
    },
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
          let zhongBaoStartDate = ''
          let zhongBaoEndDate = ''
          console.log(qiBaoDate)
          if (that.pagedata.insuranceIntervalType == 0) {
            let tempDate = new Date(qiBaoDate)
            if (that.pagedata.dayCount >= 365) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
              tempDate = new Date((Number(qiBaoDate.split('-')[0]) + Math.floor(that.pagedata.dayCount / 365)) + '-' + qiBaoDate.split('-')[1] + '-' + qiBaoDate.split('-')[2])
              tempDate.setDate(tempDate.getDate() - 1)
              zhongBaoDate = that.common.commonFormatDate(tempDate)
            } else {
              tempDate.setDate(tempDate.getDate() + that.pagedata.dayCount - 1)
              zhongBaoDate = that.common.commonFormatDate(tempDate)
            }
          } else if (that.pagedata.insuranceIntervalType == 1) {
            let tempDate = new Date(qiBaoDate)
            tempDate.setDate(tempDate.getDate() + that.pagedata.minDayCount - 1)
            zhongBaoDate = that.common.commonFormatDate(tempDate)
            zhongBaoStartDate = that.common.commonFormatDate(tempDate)
            let tempDate2 = new Date(qiBaoDate)
            tempDate2.setDate(tempDate2.getDate() + that.pagedata.maxDayCount - 1)
            zhongBaoEndDate = that.common.commonFormatDate(tempDate2)
          }
          that.dateObj.qiBaoDate = qiBaoDate
          that.dateObj.zhongBaoDate = zhongBaoDate
          that.dateObj.zhongBaoStartDate = zhongBaoStartDate
          that.dateObj.zhongBaoEndDate = zhongBaoEndDate
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
          if (that.onCheckTbrBirthDay(val)) {
            // 如果是单被保人，并且当前被保人是本人，则调接口算价
            if (that.groupRiskFlag == 0) {
              if (that.checkItemValue(that.danBbrItems, 8, 1)) {
                that.onCalc(that.benrenItems, [5], that.danBbrSheBaoIndex, data => {
                  that.benrenCalcInfo.price = data.price
                  that.benrenCalcInfo.prdItemId = data.prdItemId
                  that.getNewPriceObj()
                })
              }
            } else if (that.groupRiskFlag == 1) {// 多被保人 如果证件类型是身份证，并且bbrList中有本人，则调接口算价
              if (that.bbrList.length) {
                for (let i = 0; i < that.bbrList.length; i++) {
                  if (that.bbrList[i].isBenren) {
                    that.onCalc(that.benrenItems, [5], that.bbrList[i].sheBaoIndex, data => {
                      that.benrenCalcInfo.price = data.price
                      that.benrenCalcInfo.prdItemId = data.prdItemId
                      that.getNewPriceObj()
                    })
                  }
                }
              }
            }
          }
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
          if (that.onCheckDanBbrBirthDay(val)) {
            // 调接口重新算价
            that.onCalc(that.danBbrItems, [5], that.danBbrSheBaoIndex, data => {
              that.danBbrCalcInfo.price = data.price
              that.danBbrCalcInfo.prdItemId = data.prdItemId
              that.getNewPriceObj()
            })
          }
        },
        onShow() {
        },
        onHide() {
        }
      })
    },
    showDuoBbrBirthDayPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.bbrPop.items, 5),
        startDate: '1900-01-01',
        endDate: that.common.commonFormatDate(new Date()),
        onConfirm(val) {
          that.setUserName(that.bbrPop.items, 5, val)
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
    showDuoBbrZjyxqqPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.bbrPop.items, 23),
        startDate: '1900-01-01',
        endDate: that.common.commonFormatDate(new Date()),
        onConfirm(val) {
          that.setUserName(that.bbrPop.items, 23, val)
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
    showDuoBbrZjyxzqPop() {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: that.getUserName(that.bbrPop.items, 22),
        startDate: that.common.commonFormatDate(new Date()),
        endDate: '2099-12-31',
        onConfirm(val) {
          that.setUserName(that.bbrPop.items, 22, val)
        },
        onShow() {
        },
        onHide() {
        }
      })
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

    switchMonthPay(value, index) {
      this.monthPayNum = Number(value)
      this.monthPayIndex = index
      this.showCalcLoading = true
      this.getNewPriceObj()
    },

    checkYinziChange(items) {
      // 判断本人的信息身份证号或者出生日期是否填写，如果填写了，则根据benrenItems调整报价因子，进行保费试算
      if (this.checkItemValue(items, 3, 1)) {// 如果本人的证件类型是身份证
        if (this.common.checkMsgNull(this.getUserName(items, 4))) {// 如果身份证号不为空
          if (this.onCheckTbrZjhm(this.getUserName(items, 4))) {
            return true
          }
        }
      } else if (this.checkItemValue(items, 3, 8) || this.checkItemValue(items, 3, 9)) {

      } else {
        if (this.common.checkMsgNull(this.getUserName(items, 5))) {// 如果出生日期不为空
          return true
        }
      }
      return false
    },

    switchStyleList(name, id) {
      let styleListCopy = JSON.parse(JSON.stringify(this.styleList))
      for (let i = 0; i < styleListCopy.length; i++) {
        let item = styleListCopy[i].prdSpecificationCalcs
        for (let j = 0; j < item.length; j++) {
          if (item[j].name == name) {
            let entries = item[j].entries
            for (let m = 0; m < entries.length; m++) {
              if (entries[m].id == id) {
                entries[m].isDefault = false
              } else {
                entries[m].isDefault = true
              }
            }
          }
        }
      }
      this.styleList = JSON.parse(JSON.stringify(styleListCopy))
      if (this.groupRiskFlag == 0) {// 单被保人
        if (this.checkItemValue(this.danBbrItems, 8, 1)) {// 如果是本人
          // if (this.checkYinziChange(this.benrenItems)) {
          this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.danBbrSheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
          // }
        } else {// 如果不是本人
          // if (this.checkYinziChange(this.danBbrItems)) {
          this.onCalc(this.danBbrItems, this.getItemCodeArr(this.danBbrItems), this.danBbrSheBaoIndex, data => {
            this.danBbrCalcInfo.price = data.price
            this.danBbrCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
          // }
        }
      } else if (this.groupRiskFlag == 1) {
        if (this.bbrList.length) {
          this.handleBbrList(0, () => {
            this.getNewPriceObj()
          })
        }
      }
    },
    // 隐藏健康告知时，所调方法
    onHideHealth(flag) {
      this.onSensors2('newDetails_dianjiyouqingkuangfasheng', '新模板页面-点击有情况发生')
      if (this.itemData.intelligenceFlag == 1) {
        if (flag) {
          if (this.groupRiskFlag == 0) {
            this.setDialogPersonalInfo()
            this.showDialogPersonal = true
          } else if (this.groupRiskFlag == 1) {
            this.setDialogFamilyInfo()
            this.showDialogFamily = true
          }
        } else {
          this.onCanScroll()
          this.showHealth = false
        }
      } else {
        this.onCanScroll()
        this.showHealth = false
      }


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
    getInitPriceArr() {
      let arr = []
      for (let i = 0; i < this.styleList.length; i++) {
        let price = this.styleList[i].price.toFixed(2)
        let discountPrice = 0
        let averageMonthPrice = 0
        let firstMonthPrice = 0
        let otherMonthPrice = 0
        if (this.common.checkMsgNull(this.discountData.discount)) {
          discountPrice = this.common.accMul(this.styleList[i].price, this.discountData.discount).toFixed(2)
        }
        if (this.common.checkMsgNull(this.discountData.isMonthPay)) {
          if (this.common.checkMsgNull(this.discountData.firstPremium)) {
            firstMonthPrice = this.discountData.firstPremium
            otherMonthPrice = ((Number(this.styleList[i].price) - Number(this.discountData.firstPremium)) / 11).toFixed(2)
          } else if (this.common.checkMsgNull(this.discountData.styleCodeFirstPremium)) {
            let firstPremiumArr = JSON.parse(this.discountData.styleCodeFirstPremium)
            for (let j = 0; j < firstPremiumArr.length; j++) {
              if (this.styleList[i].styleCode == firstPremiumArr[j].key) {
                firstMonthPrice = firstPremiumArr[j].value
              }
            }
            otherMonthPrice = ((Number(this.styleList[i].price) - Number(firstMonthPrice)) / 11).toFixed(2)
          } else {
            averageMonthPrice = (Number(this.styleList[i].price) / 12).toFixed(2)
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
    getNewPriceObj() {
      let qkType = 1 //正常情况

      let price = this.styleList[this.styleActiveIndexA].price
      let firstMonthPrice = 0
      let otherMonthPrice = 0
      let monthPrice = 0
      let oldPrice = 0
      if (this.groupRiskFlag == 0) {// 单被保人
        if (this.checkItemValue(this.danBbrItems, 8, 1)) {// 本人的情况
          if (this.common.checkMsgNull(this.benrenCalcInfo.price)) {
            price = this.benrenCalcInfo.price
          }
        } else {// 非本人的情况
          if (this.common.checkMsgNull(this.danBbrCalcInfo.price)) {
            price = this.danBbrCalcInfo.price
          }
        }
      } else if (this.groupRiskFlag == 1) {// 多被保人
        if (this.bbrList.length) {
          if (this.pagedata.isSharedPremium == 0) {// 如果是共享保费
            price = this.bbrList[0].price
          } else if (this.pagedata.isSharedPremium == 1) {// 不共享保费
            price = 0
            for (let i = 0; i < this.bbrList.length; i++) {
              if (this.bbrList[i].isBenren) {
                price += this.benrenCalcInfo.price
              } else {
                price += this.bbrList[i].price
              }
            }
          }
        }
      }
      if (this.common.checkMsgNull(this.discountData.discount)) {
        qkType = 4 // 有折扣
        oldPrice = price
        price = this.common.accMul(price, this.discountData.discount).toFixed(2)
      }
      if (this.monthPayNum != 1) {
        if (this.common.checkMsgNull(this.discountData.firstPremium)) {
          qkType = 3 // 是月缴，并且有首期
          firstMonthPrice = this.discountData.firstPremium
          otherMonthPrice = ((Number(price) - Number(this.discountData.firstPremium)) / (Number(this.monthPayNum) - 1)).toFixed(2)
        } if (this.common.checkMsgNull(this.discountData.styleCodeFirstPremium)) {
          let firstPremiumArr = JSON.parse(this.discountData.styleCodeFirstPremium)
          qkType = 3 // 是月缴，并且有首期
          for (let i = 0; i < firstPremiumArr.length; i++) {
            if (this.styleList[this.styleActiveIndexA].styleCode == firstPremiumArr[i].key) {
              firstMonthPrice = firstPremiumArr[i].value
            }
          }
          otherMonthPrice = ((Number(price) - Number(firstMonthPrice)) / (Number(this.monthPayNum) - 1)).toFixed(2)
        } else {
          qkType = 2 // 是月缴，没有首期1元
          monthPrice = (Number(price) / Number(this.monthPayNum)).toFixed(2)
        }
      }

      let tbNum = 1
      if (this.pagedata.isSharedPremium == 1) {
        if (this.getUserName(this.benrenItems, 33)) {
          tbNum = this.getUserName(this.benrenItems, 33)
        }
      }

      this.newPriceObj = {
        qkType: qkType,
        price: (Number(price) * Number(tbNum)).toFixed(2),
        firstMonthPrice: firstMonthPrice,
        otherMonthPrice: otherMonthPrice,
        monthPrice: monthPrice,
        oldPrice: oldPrice,
      }
      setTimeout(() => {
        this.showCalcLoading = false
      }, 500)
    },
    // 获取某个报价因子在因子名称数组中的下标
    getYinziIndex(name) {
      let calcIdKeys = this.getCalcIdKeys()
      for (let i = 0; i < calcIdKeys.length; i++) {
        if (calcIdKeys[i] == name) {
          return i
        }
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
    // 根据传入的items，调整报价因子，调接口计算保费
    // arr是一个数组，数组中的每一项表示需要调整哪些报价因子：如：[4,2],4表示需要调整证件号码对应的年龄，2表示需要根据性别调整性别因子等
    onCalc(items, arr, sheBaoIndex, callback) {
      this.showCalcLoading = true
      let calcIds = this.getCalcIds()
      let calcIdKeys = this.getCalcIdKeys()
      if (arr.indexOf(4) != -1) {// 证件号码
        let entries = this.getEntries('年龄')
        if (entries.length) {
          let userName = this.getUserName(items, 4)
          if (this.checkItemValue(items, 3, 1)) {// 如果证件类型是身份证
            let age = this.common.GetAge(userName, this.dateObj.qiBaoDate, 1)
            let day = this.common.GetDay(userName, this.dateObj.qiBaoDate, 1)
            for (let i = 0; i < entries.length; i++) {
              if (this.common.isContent(entries[i].value, age, day)) {
                calcIds[this.getYinziIndex('年龄')] = entries[i].id
              }
            }
          }
        }
      }
      if (arr.indexOf(5) != -1) {// 出生日期
        let entries = this.getEntries('年龄')
        if (entries.length) {
          let userName = this.getUserName(items, 5)
          if (this.common.checkMsgNull(userName)) {
            let age = this.common.GetAge(userName, this.dateObj.qiBaoDate, 2)
            let day = this.common.GetDay(userName, this.dateObj.qiBaoDate, 2)
            for (let i = 0; i < entries.length; i++) {
              if (this.common.isContent(entries[i].value, age, day)) {
                calcIds[this.getYinziIndex('年龄')] = entries[i].id
              }
            }
          }
        }
      }
      if (arr.indexOf(2) != -1) {// 性别
        let entries = this.getEntries('性别')
        if (entries.length) {
          let sexName = ''
          if (arr.indexOf(4) != -1) {
            let userName = this.getUserName(items, 4)

            let len = userName.length
            if (len == 15) {
              if (parseInt(userName.substr(14, 1)) % 2 == 1) {// 男
                sexName = '男'
              } else {
                sexName = '女'
              }
            } else if (len == 18) {
              if (parseInt(userName.substr(16, 1)) % 2 == 1) {// 男
                sexName = '男'
              } else {
                sexName = '女'
              }
            }
          } else if (arr.indexOf(5) != -1) {
            let userName = this.getUserName(items, 2)
            if (userName == 1) {
              sexName = '男'
            } else if (userName == 2) {
              sexName = '女'
            }
          }


          for (let i = 0; i < entries.length; i++) {
            if (entries[i].value == sexName) {
              calcIds[this.getYinziIndex('性别')] = entries[i].id
            }
          }
        }
      }
      let sheBaoEntries = this.getEntries('社保情况')
      if (sheBaoEntries.length) {
        calcIds[this.getYinziIndex('社保情况')] = sheBaoEntries[sheBaoIndex].id
      }
      console.log(calcIds)
      this.onProductCalc(calcIds, data => {
        callback(data)
      })
    },
    // 校验宠物昵称
    onCheckNicheng(userName) {
      if (userName == '') {
        return
      }
      if (!this.common.checkNc(userName)) {
        this.onToast('宠物昵称输入有误')
        return false
      }
      return true
    },
    // 校验宠物毛色
    onCheckMaose(userName) {
      if (userName == '') {
        return
      }
      if (!this.common.checkMs(userName)) {
        this.onToast('宠物毛色输入有误')
        return false
      }
      return true
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
        return true
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
        return true
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
    // 投保人性别change时所调方法
    onTbrXbChange(userName) {
      // 如果是单被保人，并且当前被保人是本人，证件类型是身份证，则调接口算价
      if (this.groupRiskFlag == 0) {
        if (this.checkItemValue(this.danBbrItems, 8, 1) && this.checkItemValue(this.benrenItems, 3, 1)) {
          this.onCalc(this.benrenItems, [5, 2], this.danBbrSheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
        }
      }
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
    onDuoBbrIDKeyup(userName) {
      this.setUserName(this.bbrPop.items, 2, '')
      if (this.checkItemValue(this.bbrPop.items, 3, 1)) {
        if (this.common.checkMsgNull(userName)) {
          if (!this.common.checkIdCard(userName)) {// 身份证号校验未通过
          } else {
            if (parseInt(userName.substr(16, 1)) % 2 == 1) {// 男
              this.setUserName(this.bbrPop.items, 2, 1)
            } else {
              this.setUserName(this.bbrPop.items, 2, 2)
            }
          }
        }
      }
    },
    // 投保人证件号码失去焦点时所调方法
    onTbrZjhm(userName) {
      if (this.onCheckTbrZjhm(userName)) {
      }
    },
    // 投保人证件号码change时所调方法
    onTbrZjhmChange(userName) {
      if (this.onCheckTbrZjhm(userName)) {
        // 如果是单被保人，并且当前被保人是本人，证件类型是身份证，则调接口算价
        if (this.groupRiskFlag == 0) {
          if (this.checkItemValue(this.danBbrItems, 8, 1) && this.checkItemValue(this.benrenItems, 3, 1)) {
            this.onCalc(this.benrenItems, [4, 2], this.danBbrSheBaoIndex, data => {
              this.benrenCalcInfo.price = data.price
              this.benrenCalcInfo.prdItemId = data.prdItemId
              this.danBbrCalcInfo.price = data.price
              this.danBbrCalcInfo.prdItemId = data.prdItemId
              this.getNewPriceObj()
            })
          }
        } else if (this.groupRiskFlag == 1) {// 多被保人 如果证件类型是身份证，并且bbrList中有本人，则调接口算价
          if (this.checkItemValue(this.benrenItems, 3, 1)) {
            if (this.bbrList.length) {
              for (let i = 0; i < this.bbrList.length; i++) {
                if (this.bbrList[i].isBenren) {
                  this.onCalc(this.benrenItems, [4], this.bbrList[i].sheBaoIndex, data => {
                    this.benrenCalcInfo.price = data.price
                    this.benrenCalcInfo.prdItemId = data.prdItemId
                    this.bbrList[i].price = data.price
                    this.bbrList[i].prdItemId = data.prdItemId
                    this.getNewPriceObj()
                  })
                }
              }
            }
          }
        }
      }
    },
    // 单被保人性别change时所调方法
    onDanBbrXbChange(userName) {
      // 调接口重新算价
      this.onCalc(this.danBbrItems, [5, 2], this.danBbrSheBaoIndex, data => {
        this.danBbrCalcInfo.price = data.price
        this.danBbrCalcInfo.prdItemId = data.prdItemId
        this.getNewPriceObj()
      })
    },
    // 单被保人证件号码失去焦点时所调方法
    onDanBbrZjhm(userName) {
      if (this.onCheckDanBbrZjhm(userName)) {
      }
    },
    // 单被保人证件号码change时所调方法
    onDanBbrZjhmChange(userName) {
      if (this.onCheckDanBbrZjhm(userName)) {
        if (this.checkItemValue(this.danBbrItems, 3, 1)) {// 只有证件类型是身份证，才需要调算价接口
          // 调接口重新算价
          this.onCalc(this.danBbrItems, [4, 2], this.danBbrSheBaoIndex, data => {
            this.danBbrCalcInfo.price = data.price
            this.danBbrCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
        }
      }
    },
    // 多被保人证件号码失去焦点时所调方法
    onDuoBbrZjhm(userName) {
      this.onCheckDuoBbrZjhm(userName)
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
          if (age < 16) {
            console.log(1)
            this.onToast('投保人年龄需大于16周岁')
            return false
          }
          if (!this.checkAgeInRange(userName, 1) && this.checkItemValue(this.danBbrItems, 8, 1)) {
            this.onToast('被保人年龄不在投保区间内，请重新输入')
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
      if (age < 16) {
        console.log(2)
        this.onToast('投保人年龄需大于16周岁')
        return false
      }
      if (!this.checkAgeInRange(userName, 2) && this.checkItemValue(this.danBbrItems, 8, 1)) {
        this.onToast('被保人年龄不在投保区间内，请重新输入')
        return false
      }
      return true
    },
    // 校验单被保人出生日期
    onCheckDanBbrBirthDay(userName) {
      if (userName == '') {
        return
      }
      if (!this.checkAgeInRange(userName, 2)) {
        this.onToast('被保人年龄不在投保区间内，请重新输入')
        return false
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
        } else {
          if (!this.checkAgeInRange(userName, 1)) {
            this.onToast('被保人年龄不在投保区间内，请重新输入')
            return false
          }
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
    // 校验单被保人证件号码
    onCheckDuoBbrZjhm(userName) {
      if (userName == '') {
        return
      }
      if (this.checkItemValue(this.bbrPop.items, 3, 1)) {// 身份证
        if (!this.common.checkIdCard(userName)) {
          this.onToast('证件号码输入有误')
          return false
        } else {
          if (!this.checkAgeInRange(userName, 1)) {
            this.onToast('被保人年龄不在投保区间内，请重新输入')
            return false
          }
        }
      } else if (this.checkItemValue(this.bbrPop.items, 3, 8)) {// 组织机构代码
        if (!this.common.checkGroupNumber(userName)) {
          this.onToast('证件号码输入有误')
          return false
        }
      } else if (this.checkItemValue(this.bbrPop.items, 3, 9)) {// 统一社会信用代码
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
    // 根据名称获取相应的entries，年龄、性别、社保情况、被保人数等等
    getEntries(name) {
      let arr = this.styleList[this.styleActiveIndexA].prdSpecificationCalcs
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == name) {
          return arr[i].entries
        }
      }
      return []
    },
    // 判断年龄是否在投保区间内userName：传入的身份证号，或者出生日期， type：1身份证 2：出生日期
    checkAgeInRange(userName, type) {
      let age = this.common.GetAge(userName, this.dateObj.qiBaoDate, type)
      let day = this.common.GetDay(userName, this.dateObj.qiBaoDate, type)
      let entries = this.getEntries('年龄')
      if (entries.length) {
        let isContentAge = false
        for (let j = 0; j < entries.length; j++) {
          if (this.common.isContent(entries[j].value, age, day)) {
            isContentAge = true
          }
        }
        if (!isContentAge) {
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
    // 改变单被保人证件有效期时所调方法
    onDbbrZjyxqChange(userName) {
      if (userName == 1) {// 证件有效期为长期
        this.setShowFlag(this.danBbrItems, ['22'], false)
      } else if (userName == 2) {// 证件有效期为短期
        this.setShowFlag(this.danBbrItems, ['22'], true)
      }
    },
    // 改变多被保人证件有效期时所调方法
    onDuoBbrZjyxqChange(userName) {
      if (userName == 1) {// 证件有效期为长期
        this.setShowFlag(this.bbrPop.items, ['22'], false)
      } else if (userName == 2) {// 证件有效期为短期
        this.setShowFlag(this.bbrPop.items, ['22'], true)
      }
    },
    // 切换单被保人的 与投保人关系 时 所调方法
    onSwitchDanBbrRelation(id, index) {
      if (this.danBbrRelationIndex == index) {
        return false
      }
      this.danBbrRelationIndex = index
      this.setUserName(this.danBbrItems, '8', id)
      if (id == 1) {
        if (this.checkYinziChange(this.benrenItems)) {
          this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.danBbrSheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
        }
      } else {
        // if (this.checkYinziChange(this.danBbrItems)) {
        this.onCalc(this.danBbrItems, this.getItemCodeArr(this.danBbrItems), this.danBbrSheBaoIndex, data => {
          this.danBbrCalcInfo.price = data.price
          this.danBbrCalcInfo.prdItemId = data.prdItemId
          this.getNewPriceObj()
        })
        // }
      }

    },
    onSwitchDuoBbrRelation(id, index) {
      if (this.updateDuoBbrFlag) {
        return false
      }
      let bbrPopCopy = JSON.parse(JSON.stringify(this.bbrPop))
      bbrPopCopy.relationIndex = index
      this.bbrPop = JSON.parse(JSON.stringify(bbrPopCopy))
      this.setUserName(this.bbrPop.items, 8, id)
    },
    // 切换 单被保人 社保情况 的时候所调方法
    onDanBbrSheBaoSwitch(sheBaoId, index) {
      this.danBbrSheBaoIndex = index
      if (this.checkItemValue(this.danBbrItems, 8, 1)) {
        this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.danBbrSheBaoIndex, data => {
          this.benrenCalcInfo.price = data.price
          this.benrenCalcInfo.prdItemId = data.prdItemId
          this.getNewPriceObj()
        })
      } else {
        this.onCalc(this.danBbrItems, this.getItemCodeArr(this.danBbrItems), this.danBbrSheBaoIndex, data => {
          this.danBbrCalcInfo.price = data.price
          this.danBbrCalcInfo.prdItemId = data.prdItemId
          this.getNewPriceObj()
        })
      }
    },
    onDuoBbrSheBaoSwitch(sheBaoId, index) {
      let bbrPopCopy = JSON.parse(JSON.stringify(this.bbrPop))
      bbrPopCopy.sheBaoIndex = index
      this.bbrPop = JSON.parse(JSON.stringify(bbrPopCopy))
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
    // 获取需要改变报价因子的itemCode数组
    getItemCodeArr(items) {
      let arr = []
      if (this.checkItemValue(items, 3, 1)) {
        arr = [4, 2]
      } else if (this.checkItemValue(items, 3, 8) || this.checkItemValue(items, 3, 9)) {

      } else {
        arr = [5, 2]
      }
      return arr
    },
    onShowMoreBbr() {
      this.bbrPop = JSON.parse(JSON.stringify(this.bbrPopTemp))
      this.onNoScroll()
      this.showMoreBbr = true
    },
    onHideMoreBbr() {
      this.onCanScroll()
      this.showMoreBbr = false
      this.updateDuoBbrFlag = false
    },
    onShowCalcLoading() {
      this.showCalcLoading = true
    },
    onHideCalcLoading() {
      setTimeout(() => {
        this.showCalcLoading = false
      }, 500)
    },
    onShowSnakeLoading() {
      this.showSnakeLoading = true
    },
    onHideSnakeLoading() {
      setTimeout(() => {
        this.showSnakeLoading = false
      }, 500)
    },
    // 添加或者修改多被保人时
    addOrUpdateDuoBbr() {

      if (!this.checkItemValue(this.bbrPop.items, 8, 1)) {
        for (let i = 0; i < this.bbrPop.items.length; i++) {
          let item = this.bbrPop.items[i]
          let itemCode = item.itemCode
          let userName = item.userName
          if (item.isShow) {
            if (['6'].indexOf(itemCode) == -1) {
              if (!this.common.checkMsgNull(userName)) {
                this.onToast('请将信息填写完整')
                return false
              }
            }
            if (itemCode == 1) {
              if (!this.onCheckXingming(userName)) {
                return false
              }
            } else if (itemCode == 4) {
              if (!this.onCheckDuoBbrZjhm(userName)) {
                return false
              }
            } else if (itemCode == 5) {
              if (!this.checkAgeInRange(userName, 2)) {
                this.onToast('被保人年龄不在投保区间内，请重新输入')
                return false
              }
            } else if (itemCode == 6) {
              if (this.common.checkMsgNull(userName)) {
                if (!this.onCheckSjh(userName)) {
                  return false
                }
              }
            } else if (itemCode == 7) {
              if (!this.onCheckYouxiang(userName)) {
                return false
              }
            }
          }
        }
      }

      if (this.updateDuoBbrFlag) {// 如果是更新
        this.onShowSnakeLoading()
        if (this.bbrPop.isBenren) {// 如果更新的是本人
          this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.bbrPop.sheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.bbrList.splice(this.updateDuoBbrIndex, 1, JSON.parse(JSON.stringify(this.bbrPop)))
            this.getNewPriceObj()
            this.onToast('更新被保人成功')
            this.onHideSnakeLoading()
            this.updateDuoBbrFlag = false
            this.onCanScroll()
            this.showMoreBbr = false
          })
        } else {
          this.onCalc(this.bbrPop.items, this.getItemCodeArr(this.bbrPop.items), this.bbrPop.sheBaoIndex, data => {
            this.bbrPop.price = data.price
            this.bbrPop.prdItemId = data.prdItemId
            this.bbrList.splice(this.updateDuoBbrIndex, 1, JSON.parse(JSON.stringify(this.bbrPop)))
            this.getNewPriceObj()
            this.onToast('更新被保人成功')
            this.onHideSnakeLoading()
            this.updateDuoBbrFlag = false
            this.onCanScroll()
            this.showMoreBbr = false
          })
        }
      } else { // 添加
        if (this.bbrList.length) {
          let parentNum = 0
          let childrenNum = 0
          let benrenNum = 0
          let peiouNum = 0
          let zhangfuNum = 0
          let qiziNum = 0
          for (let m = 0; m < this.bbrList.length; m++) {
            let userName = this.getUserName(this.bbrList[m].items, 8)
            console.log(userName)
            if (userName == 10) {
              parentNum++
            } else if (userName == 11) {
              childrenNum++
            } else if (userName == 1) {
              benrenNum++
            } else if (userName == 9) {
              peiouNum++
            } else if (userName == 2) {
              zhangfuNum++
            } else if (userName == 3) {
              qiziNum++
            }
          }
          if (this.checkItemValue(this.bbrPop.items, 8, 10) && parentNum >= 2) {
            this.onToast('父母最多可添加2人')
            return
          }
          if (this.checkItemValue(this.bbrPop.items, 8, 11) && childrenNum >= 6) {
            this.onToast('子女最多可添加6人')
            return
          }
          if (this.checkItemValue(this.bbrPop.items, 8, 1) && benrenNum >= 1) {
            this.onToast('本人只能添加一次！')
            return
          }
          if (this.checkItemValue(this.bbrPop.items, 8, 9) && peiouNum >= 1) {
            this.onToast('配偶只能添加一次！')
            return
          }
          if (this.checkItemValue(this.bbrPop.items, 8, 2) && zhangfuNum >= 1) {
            this.onToast('丈夫只能添加一次！')
            return
          }
          if (this.checkItemValue(this.bbrPop.items, 8, 3) && qiziNum >= 1) {
            this.onToast('妻子只能添加一次！')
            return
          }
        }

        if (this.checkItemValue(this.bbrPop.items, 8, 1)) {// 如果是本人
          if (!this.checkBenrenInfo()) {
            this.onCanScroll()
            this.showMoreBbr = false
            return false
          }
          this.onShowSnakeLoading()
          this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.bbrPop.sheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.bbrPop.price = data.price
            this.bbrPop.prdItemId = data.prdItemId
            this.bbrPop.isBenren = true
            this.bbrList.push(JSON.parse(JSON.stringify(this.bbrPop)))
            let fabbrsEntries = this.getEntries('方案被保人数')
            if (this.bbrList.length >= 3 && fabbrsEntries.length) {
              this.handleFabbrsChange(() => {
                this.getNewPriceObj()
                this.onToast('添加被保人成功')
                this.onHideSnakeLoading()
                this.onCanScroll()
                this.showMoreBbr = false
              })
            } else {
              this.getNewPriceObj()
              this.onToast('添加被保人成功')
              this.onHideSnakeLoading()
              this.onCanScroll()
              this.showMoreBbr = false
            }
          })
        } else {
          this.onShowSnakeLoading()
          this.onCalc(this.bbrPop.items, this.getItemCodeArr(this.bbrPop.items), this.bbrPop.sheBaoIndex, data => {
            this.bbrPop.price = data.price
            this.bbrPop.prdItemId = data.prdItemId
            this.bbrList.push(JSON.parse(JSON.stringify(this.bbrPop)))
            let fabbrsEntries = this.getEntries('方案被保人数')
            if (this.bbrList.length >= 3 && fabbrsEntries.length) {
              this.handleFabbrsChange(() => {
                this.getNewPriceObj()
                this.onToast('添加被保人成功')
                this.onHideSnakeLoading()
                this.onCanScroll()
                this.showMoreBbr = false
              })
            } else {
              this.getNewPriceObj()
              this.onToast('添加被保人成功')
              this.onHideSnakeLoading()
              this.onCanScroll()
              this.showMoreBbr = false
            }
          })
        }
      }
    },
    // 校验宠物信息是否已经填写
    checkPetsInfo() {
      for (let j = 0; j < this.petsItems.length; j++) {
        if (this.petsItems[j].isShow) {
          let itemCode = this.petsItems[j].itemCode
          let itemName = this.petsItems[j].itemName
          let userName = this.petsItems[j].userName
          if (!this.common.checkMsgNull(userName)) {
            if (document.getElementById('pet' + itemCode)) {
              document.getElementById('pet' + itemCode).focus()
            }
            this.onToast('请将宠物信息填写完整')
            return false
          } else {
            if (itemCode == 58) {// 宠物昵称
              if (!this.onCheckNicheng(userName)) {
                return false
              }
            } else if (itemCode == 60) {// 宠物毛色
              if (!this.onCheckMaose(userName)) {
                return false
              }
            }
          }
        }
      }
      return true
    },
    // 校验标的信息是否已经填写
    checkTargetInfo() {
      for (let j = 0; j < this.targetItems.length; j++) {
        if (this.targetItems[j].isShow) {
          let itemCode = this.targetItems[j].itemCode
          let itemName = this.targetItems[j].itemName
          let userName = this.targetItems[j].userName
          if (!this.common.checkMsgNull(userName)) {
            if (document.getElementById('target' + itemCode)) {
              document.getElementById('target' + itemCode).focus()
            }
            this.onToast('请将标的信息填写完整')
            return false
          } else {
            if (itemCode == 90) {// 非机动车号码
              if (!this.onCheck90(userName)) {
                return false
              }
            }
          }
        }
      }
      return true
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
    getSexId(sexEntries, sex) {
      for (let w = 0; w < sexEntries.length; w++) {
        if (sexEntries[w].value == sex) {
          return sexEntries[w].id
        }
      }
    },
    onProductCalc(calcIds, callback) {
      this.$http.post('/prdmc/prdmcShop/productCalc', {
        styleId: this.styleList[this.styleActiveIndexA].styleId,
        calcIds: calcIds
      }).then(res => {
        console.dir(res)
        if (res.data.code == 200) {
          callback(res.data.data)
        } else {
          this.onMessageBox('报价失败,请稍候重试')
          return false
        }
      }).catch((err) => {
        this.onMessageBox('报价失败,请稍候重试')
        return false
      })
    },
    getCalcIds() {
      let arr = []
      let item = this.styleList[this.styleActiveIndexA].prdSpecificationCalcs
      for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < item[i].entries.length; j++) {
          if (item[i].entries[j].isDefault) {
            arr.push(item[i].entries[j].id)
          }
        }
      }
      return arr
    },
    getCalcIdKeys() {
      let arr = []
      let item = this.styleList[this.styleActiveIndexA].prdSpecificationCalcs
      for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < item[i].entries.length; j++) {
          if (item[i].entries[j].isDefault) {
            arr.push(item[i].name)
          }
        }
      }
      return arr
    },
    updateDuoBbr(index) {
      this.bbrPop = JSON.parse(JSON.stringify(this.bbrList[index]))
      this.updateDuoBbrIndex = index
      this.updateDuoBbrFlag = true
      this.onNoScroll()
      this.showMoreBbr = true
    },
    deleteDuoBbr(index) {
      this.bbrList.splice(index, 1)
      let fabbrsEntries = this.getEntries('方案被保人数')
      if (this.bbrList.length >= 2 && fabbrsEntries.length > 0) {
        this.handleFabbrsChange(() => {
          this.onToast('删除成功')
          this.getNewPriceObj()
        })
      } else {
        this.onToast('删除成功')
        this.getNewPriceObj()
      }
    },
    handleFabbrsChange(callback) {
      // 先更改方案被保人数因子
      let arr = this.styleList[this.styleActiveIndexA].prdSpecificationCalcs
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == '方案被保人数') {
          for (let j = 0; j < arr[i].entries.length; j++) {
            if (arr[i].entries[j].value == this.bbrList.length) {
              arr[i].entries[j].isDefault = true
            } else {
              arr[i].entries[j].isDefault = false
            }
          }
        }
      }

      this.handleBbrList(0, () => {
        callback()
      })


    },
    handleBbrList(i, callback) {
      if (this.bbrList[i].isBenren) {
        this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.bbrList[i].sheBaoIndex, data => {
          this.benrenCalcInfo.price = data.price
          this.benrenCalcInfo.prdItemId = data.prdItemId
          this.bbrList[i].price = data.price
          this.bbrList[i].prdItemId = data.prdItemId
          i++
          if (i < this.bbrList.length) {
            this.handleBbrList(i, callback)
          } else {
            callback()
          }
        })
      } else {
        this.onCalc(this.bbrList[i].items, this.getItemCodeArr(this.bbrList[i].items), this.bbrList[i].sheBaoIndex, data => {
          this.bbrList[i].price = data.price
          this.bbrList[i].prdItemId = data.prdItemId
          i++
          if (i < this.bbrList.length) {
            this.handleBbrList(i, callback)
          } else {
            callback()
          }
        })

      }

    },
    // 改变pagedata中的minGroupNum和maxGroupNum
    changeMinGroupNumAndMaxGroupNum() {
      // 如果报价方案因子中有“被保人数”，则被保人最大最小人数都调整为方案中的被保人数
      if (this.getEntries('被保人数').length) {

      } else {// 如果有方案被保人数，则根据该因子判断是多被保人还是单被保人
        let fabbrsEntries = this.getEntries('方案被保人数')
        if (fabbrsEntries.length) {
          if (fabbrsEntries.length == 1) {
            this.pagedata.minGroupNum = null
            this.pagedata.maxGroupNum = null
          } else if (fabbrsEntries.length > 1) {
            this.pagedata.minGroupNum = fabbrsEntries[0].value
            this.pagedata.maxGroupNum = fabbrsEntries[fabbrsEntries.length - 1].value
          }
        }
      }
      if (this.common.checkMsgNull(this.pagedata.minGroupNum) && this.common.checkMsgNull(this.pagedata.maxGroupNum)) {
        this.groupRiskFlag = 1 // 多个被保人
      } else {
        this.groupRiskFlag = 0 // 单个被保人
      }
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
      this.onHideSnakeLoading()
      this.loadingVisible = false//遮罩关闭
    },
    onMessageBox(message = '数据异常，请稍候重试') {
      MessageBox.alert(message, '提示')
      this.onHideCalcLoading()
      this.onHideSnakeLoading()
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
    handleSelectAllProductInfo(success) {
      let keyName = this.getLocalStorageKey('selectAllProductInfo')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        success(localKey)
      } else {
        window.localStorage.clear()
        this.$http.post("/prdmc/prdmcShop/selectAllProductInfo", {
          productId: this.prdId,
          channelCode: this.channelCode,
          orgCode: this.orgCode
        }).then(res => {
          if (res.status == 200) {
            this.common.setMyLocalStorage(keyName, res)
            success(res)
          } else {
            this.canGotoNext = false
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          this.canGotoNext = false
          this.onToast('获取数据失败，请稍候重试')
        })
      }
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
            this.canGotoNext = false
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          this.canGotoNext = false
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
            this.canGotoNext = false
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          this.canGotoNext = false
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
            this.canGotoNext = false
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          this.canGotoNext = false
          this.onToast('获取数据失败，请稍候重试')
        })
      }
    },
    handleCheckProduct(success) {
      this.$http.post("/sunmc/checkProductIsSale/checkProduct", {// 校验是否可以投保
        productId: this.prdId,
        orgcode: this.orgCode
      }).then(res => {
        if (res.data.code == 10006) {
          success(res)
        } else {
          console.log(res)
          this.loadingVisible = false
          this.loadingVisibleContent = ''
          if (res.data.code == 10009) {
            this.onToast(res.data.msg)
          } else {
            this.onToast('获取数据失败，请稍候重试')
          }
        }
      }).catch((e) => {
        console.log(e)
        this.loadingVisible = false
        this.loadingVisibleContent = ''
        this.onToast('获取数据失败，请稍候重试')
      })
    },
    handleInsureData(success) {
      let keyName = this.getLocalStorageKey('insureData')
      let localKey = this.common.getMyLocalStorage(keyName)
      if (this.common.checkMsgNull(localKey)) {
        success(localKey)
      } else {
        this.$http.post("/prdmc/prdmcShop/insureData", {//获取填单信息
          itemId: this.styleList[this.styleActiveIndexA].prdItemId,
          orgCode: this.orgCode
        }).then(res => {
          if (res.status == 200) {
            res = this.common.myReplaceAllUrl(res)
            this.common.setMyLocalStorage(keyName, res)
            success(res)
          } else {
            this.canGotoNext = false
            this.onToast('获取数据失败，请稍候重试')
          }
        }).catch((e) => {
          this.canGotoNext = false
          this.onToast('获取数据失败，请稍候重试')
        })
      }
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
        this.styleList = res.data.data.prdStyleSpecification
        this.handleShowKxsjfa()
        this.getInsureData()
      })
    },
    // 进入页面时埋点处理
    onEnterMaidian(data) {
      this.channelName = data.channelName;
      window.sessionStorage.setItem('channelName', this.channelName);
      // CCH埋点
      this.handleCCH({
        'orgCode': this.orgCode,
        'channelCode': this.channelCode,
        'pageName': `${this.channelName}${this.itemData.prdName}-详情页`,
        'pointKey': `V2_${this.channelName}_${this.itemData.prdName}-详情页面`,
        'productId': this.$route.query.id,
        'url': window.location.href,
        'policyNo': '',
        'clientInfo': {}
      })
      if (!this.common.checkMsgNull(window.sessionStorage.getItem('userSign'))) {
        window.sessionStorage.setItem('userSign', this.common.getUserSign())
      }
      this.onSensors2('proDetails_jinruxiangqingye', '详情页-进入详情页')
    },
    onProductDetail(data) {
      this.itemData = data


      if (!this.common.checkMsgNull(this.itemData.customerService)) {
        this.itemData.customerService = 'http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw='
      }
      if (!this.common.checkMsgNull(this.itemData.prdTheme)) {
        this.itemData.prdTheme = '#ff8400'
      }
      if (!this.common.checkMsgNull(this.itemData.customerLogo)) {
        this.itemData.customerLogo = '../../static/images/zixun.png'
      }
      this.getLunboImgArr()
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
      },
        this.onInsurancesArr()

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

      this.loadingVisibleContent = ''
      this.loadingVisible = false
      //设置页面标题
      jquery(document).find('title').text(this.itemData.prdName);

    },
    //产品详情接口
    getProductDetail() {
      this.handleProductDetail(res => {
        this.itemData = res.data.data
        if (!this.common.checkMsgNull(this.itemData.customerService)) {
          this.itemData.customerService = 'http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw='
        }
        if (!this.common.checkMsgNull(this.itemData.prdTheme)) {
          this.itemData.prdTheme = '#ff8400'
        }
        if (!this.common.checkMsgNull(this.itemData.customerLogo)) {
          this.itemData.customerLogo = '../../static/images/zixun.png'
        }
        this.getLunboImgArr()
        this.onInsurancesArr()

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
            window.sessionStorage.setItem('channelName', this.channelName);
            // CCH埋点
            this.handleCCH({
              'orgCode': this.orgCode,
              'channelCode': this.channelCode,
              'pageName': `${this.channelName}${this.itemData.prdName}-详情页`,
              'pointKey': `V2_${this.channelName}_${this.itemData.prdName}-详情页面`,
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
        this.loadingVisibleContent = ''
        this.loadingVisible = false
        //设置页面标题
        jquery(document).find('title').text(this.itemData.prdName);

        //微信分享
        this.handleWXShare()
      })
    },
    getInsureData() {
      this.handleInsureData(res => {
        this.pagedata = res.data.data
        this.initPagedata()

        this.setDate()

        this.getBenrenCalcInfo()
        this.getDanBbrCalcInfo()
        this.benrenItems = this.getItems(1)
        this.danBbrItems = this.getItems(2)
        this.targetItems = this.getItems(7)
        this.petsItems = this.getItems(8)
        this.getBbrPop()

        this.putSessionData()
        this.changeMinGroupNumAndMaxGroupNum()
        this.getInitPriceArr()
        this.getNewPriceObj()


        if (this.isFinish == 'Y') {
          this.toPay(true)
        }
      })
    },
    getBenrenCalcInfo() {
      this.benrenCalcInfo.price = 0
      this.benrenCalcInfo.prdItemId = ''
    },
    getBbrPop() {
      this.bbrPop = {}
      this.bbrPop.price = 0 // 设置多被保人的初始保费为0
      this.bbrPop.prdItemId = '' // 设置itemId 方案报价id为空
      this.bbrPop.relationIndex = 0
      this.bbrPop.isBenren = false
      this.bbrPop.sheBaoIndex = 0
      this.bbrPop.items = this.getItems(2)

      this.bbrPopTemp = JSON.parse(JSON.stringify(this.bbrPop))
    },
    getDanBbrCalcInfo() {
      this.danBbrCalcInfo.price = 0
      this.danBbrCalcInfo.prdItemId = ''
    },
    setDate() {
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
            let tempDate = new Date()
            tempDate.setDate(tempDate.getDate() + 1)
            qiBaoDate = this.common.commonFormatDate(tempDate)
          }
        } else {
          let tempDate = new Date()
          tempDate.setDate(tempDate.getDate() + 1)
          qiBaoDate = this.common.commonFormatDate(tempDate)
        }
      }

      //若延迟生效天数不为空,则起保日期=所选的起保日期+起保日期生效延迟天数
      if (this.common.checkMsgNull(this.pagedata.startEffDelayDays)) {
        let tempDate = new Date(qiBaoDate)
        tempDate.setDate(tempDate.getDate() + parseInt(this.pagedata.startEffDelayDays))
        qiBaoDate = this.common.commonFormatDate(tempDate)
      }

      // 起保日期可选范围
      if (!this.common.checkMsgNull(this.pagedata.rangeDay)) {
        this.pagedata.rangeDay = 90
      }

      qiBaoStartDate = qiBaoDate
      let tempDate = new Date(qiBaoDate)
      tempDate.setDate(tempDate.getDate() + this.pagedata.rangeDay - 1)
      qiBaoEndDate = this.common.commonFormatDate(tempDate)

      if (this.pagedata.insuranceIntervalType == 0) {// 固定区间
        let tempDate = new Date(qiBaoDate)
        if (this.pagedata.dayCount >= 365) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
          tempDate = new Date((Number(qiBaoDate.split('-')[0]) + Math.floor(this.pagedata.dayCount / 365)) + '-' + qiBaoDate.split('-')[1] + '-' + qiBaoDate.split('-')[2])
          tempDate.setDate(tempDate.getDate() - 1)
          zhongBaoDate = this.common.commonFormatDate(tempDate)
        } else {
          tempDate.setDate(tempDate.getDate() + this.pagedata.dayCount - 1)
          zhongBaoDate = this.common.commonFormatDate(tempDate)
        }
      } else if (this.pagedata.insuranceIntervalType == 1) {//间隔区间：例1天-5天
        let tempDate = new Date(qiBaoDate)
        tempDate.setDate(tempDate.getDate() + this.pagedata.minDayCount - 1)
        let tempDate2 = new Date(qiBaoDate)
        tempDate2.setDate(tempDate2.getDate() + this.pagedata.maxDayCount - 1)
        zhongBaoDate = this.common.commonFormatDate(tempDate)
        zhongBaoStartDate = this.common.commonFormatDate(tempDate)
        zhongBaoEndDate = this.common.commonFormatDate(tempDate2)
      }

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
      this.setPetIsShow()
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
        } else if (type.pageType == 8) { // 宠物信息
          for (let m = 0; m < type.items.length; m++) {
            let item = type.items[m]
            let itemCode = item.itemCode
            if (item.options != null) {
              if (itemCode == 55) {
                item.userName = item.options[0].id;//给userName赋值
                if (item.options[0].id == 1) {
                  this.petArr = dogType
                } else if (item.options[0].id == 2) {
                  this.petArr = catType
                }
              } else {
                item.userName = item.options[0].name;//给userName赋值
              }
            } else if (item.options == null) {
              item.userName = ''
              if (itemCode == 56) {
                if (!this.common.checkMsgNull(item.userName)) {
                  item.userName = this.petArr[0].name //给宠物品种赋默认值
                }
              }
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
            } else if (itemCode == 9) {// 职业不展示
              item.isShow = false
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
      let isShowtuantiBbr = false
      let isShow22 = false
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
            } else if (['73', '74', '75'].indexOf(itemCode) != -1) {
              if (!isShowtuantiBbr) {
                item.isShow = false
              }
            } else if (itemCode == 22) {
              if (!isShow22) {
                item.isShow = false
              }
            } else if (itemCode == 9) {// 职业不展示
              item.isShow = false
            }
            if (!item.isHasOption) {
              item.userName = ''
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    // 设置宠物信息每一项是否展示
    setPetIsShow() {
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == 8) { // 宠物信息
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            item.isShow = true
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
    onSwitchStyleIndex(index) {
      this.showCalcLoading = true
      this.styleActiveIndexA = index
      this.changeMinGroupNumAndMaxGroupNum()
      if (this.groupRiskFlag == 0) {// 单个被保人
        if (this.checkItemValue(this.danBbrItems, 8, 1)) {
          // if (this.checkYinziChange(this.benrenItems)) {
          this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.danBbrSheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
          // } else {
          //   this.getNewPriceObj()
          // }
        } else {
          // if (this.checkYinziChange(this.danBbrItems)) {
          this.onCalc(this.danBbrItems, this.getItemCodeArr(this.danBbrItems), this.danBbrSheBaoIndex, data => {
            this.danBbrCalcInfo.price = data.price
            this.danBbrCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
          // } else {
          //   this.getNewPriceObj()
          // }
        }
      } else if (this.groupRiskFlag == 1) {//多个被保人
        if (this.bbrList.length) {
          this.handleBbrList(0, () => {
            this.getNewPriceObj()
          })
        } else {
          this.getNewPriceObj()
        }
      }
    },
    handleLjtb() {
      if (!this.canGotoNext) {
        this.onToast('请刷新页面重试！')
        return false
      }
      // 校验宠物信息是否填写完整
      if (this.petsItems.length) {
        if (!this.checkPetsInfo()) {
          return false
        }
      }
      // 校验投保人信息是否填写完整
      if (!this.checkBenrenInfo()) {
        return false
      }
      // 校验单被保人信息是否填写完整
      if (this.groupRiskFlag == 0) {
        if (!this.checkItemValue(this.danBbrItems, 8, 1)) {
          if (!this.checkDanBbrInfo()) {
            return false
          }
        }
      }
      if (this.groupRiskFlag == 1) {
        if (this.bbrList.length < this.pagedata.minGroupNum) {
          this.onToast('被保人数有误')
          return false
        }
      }
      // 校验宠物信息是否填写完整
      if (this.targetItems.length) {
        if (!this.checkTargetInfo()) {
          return false
        }
      }


      if (!this.checkedFlag) {
        this.onToast('请仔细阅读并确认产品条款以及相关告知信息')
        return false
      }

      // 将数据缓存
      this.saveSessionData()

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
            if (this.groupRiskFlag == 0) {
              if (this.getUserName(this.danBbrItems, 8) != 1) {
                return true
              }
            } else {
              if (this.bbrList.length == 1 && this.bbrList[0].isBenren) {
                return false
              } else {
                return true
              }
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
    toPay(flag) {
      this.loadingVisible = true
      if (this.isFinish == 'Y' && this.groupRiskFlag == 1) {
        this.loadingVisibleContent = '正在生成您的智能核保结果'
      } else {
        this.loadingVisibleContent = '加载中'
      }
      this.common.setTracebackSession()
      //投保份数校验
      this.handleCheckProduct(res => {
        this.startTime = new Date().getTime()

        //转化数据API对接
        this.platformOCPC()

        this.checkEnvironment()

        this.setLastDateString()

        this.reqJson = {
          shenCeUserId: this.getShenCeUserId(),
          channelCode: this.channelCode,
          orgCode: this.orgCode,
          userSign: window.sessionStorage.getItem('userSign'),
          styleId: this.styleList[this.styleActiveIndexA].styleId,
          startDate: `${this.dateObj.qiBaoDate} ${this.dateObj.lastDateString}`,
          endDate: `${this.dateObj.zhongBaoDate} ${this.dateObj.endLastDateString}`,
          isCustom: true,
          policyHolders: this.generateTbr(),
          insureds: this.generateBbr(),
          beneficiary: this.generateSyr(),
          petsItems: this.generatePets(),
          targets: this.generateTarget(),
          addressCode: this.getUserCode(this.benrenItems, 12),
          urlParam: this.urlParam ? this.urlParam : '',
          payFlag: this.payFlag,
          openId: this.common.getUrlValueByName('openid'),
          instalmentNum: this.monthPayNum,//分期数
          oldpolicyNoUnid: this.underwritingPolicyRes.oldpolicyNoUnid,//上年保单号标识(二次核保时传第一次核保返回的key值)
          reUnderwrite: this.underwritingPolicyRes.reUnderwrite,//二次核保标识(默认为1，当出参status为100010时赋值2)
          renewInsurance: this.renewInsuranceFlag ? this.renewInsuranceFlag : "",//一键续保标识
          zhugeUserId: '',
        }

        if (flag) {
          this.underwritingPolicy2()
        } else {
          this.underwritingPolicy()
        }
      })
    },
    saveSessionData() {
      window.sessionStorage.setItem('urlSession', window.location.href)
      let sessionData = {
        dateObj: this.dateObj,
        showInvoice: this.showInvoice,// 是否开电子发票
        invoiceIndex: this.invoiceIndex,// 发票类型索引
        styleActiveIndexA: this.styleActiveIndexA,// 当前选中方案索引
        danBbrRelationIndex: this.danBbrRelationIndex,// 单被保人 与投保人关系 索引
        danBbrSheBaoIndex: this.danBbrSheBaoIndex,// 单被保人 社保 索引
        bbrList: this.bbrList,
        benrenCalcInfo: this.benrenCalcInfo,
        benrenItems: this.benrenItems,
        danBbrCalcInfo: this.danBbrCalcInfo,
        danBbrItems: this.danBbrItems,
        targetItems: this.targetItems,
        styleList: this.styleList,
        checkedFlag: this.checkedFlag,
        monthPayNum: this.monthPayNum,
        monthPayIndex: this.monthPayIndex,
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
          this.styleActiveIndexA = sessionDataJson.styleActiveIndexA// 当前选中方案索引
          this.danBbrRelationIndex = sessionDataJson.danBbrRelationIndex// 单被保人 与投保人关系 索引
          this.danBbrSheBaoIndex = sessionDataJson.danBbrSheBaoIndex// 单被保人 社保 索引
          this.bbrList = JSON.parse(JSON.stringify(sessionDataJson.bbrList))
          this.benrenCalcInfo = JSON.parse(JSON.stringify(sessionDataJson.benrenCalcInfo))
          this.benrenItems = JSON.parse(JSON.stringify(sessionDataJson.benrenItems))
          this.danBbrCalcInfo = JSON.parse(JSON.stringify(sessionDataJson.danBbrCalcInfo))
          this.danBbrItems = JSON.parse(JSON.stringify(sessionDataJson.danBbrItems))
          this.targetItems = JSON.parse(JSON.stringify(sessionDataJson.targetItems))
          this.styleList = JSON.parse(JSON.stringify(sessionDataJson.styleList))
          this.checkedFlag = sessionDataJson.checkedFlag
          this.monthPayNum = sessionDataJson.monthPayNum
          this.monthPayIndex = sessionDataJson.monthPayIndex
        }
      } else {
        window.sessionStorage.removeItem('sessionData')
        window.sessionStorage.setItem('urlSession', window.location.href)
      }
    },
    // 将 P920091615004924408 改造成 T920091615004924408 ，然后跟轨迹id进行绑定
    behaviorObjSetOrderNo(callback) {
      let num = `T${this.orderNo.substring(1)}`
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
    // 智能核保调
    underwritingPolicy2() {
      let reqJsonCopy = JSON.parse(JSON.stringify(this.reqJson))
      reqJsonCopy.intelligenceFlag = '1'
      let znhbInsureds = window.sessionStorage.getItem('znhbInsureds')
      if (this.common.checkMsgNull(znhbInsureds)) {
        znhbInsureds = JSON.parse(znhbInsureds)
        for (let i = 0; i < znhbInsureds.length; i++) {
          for (let j = 0; j < reqJsonCopy.insureds.length; j++) {
            let insuredItems = reqJsonCopy.insureds[j].insuredItems
            let idno = ''
            for (let k = 0; k < insuredItems.length; k++) {
              if (insuredItems[k].code == 4) {
                idno = insuredItems[k].value
                break
              }
            }
            if (znhbInsureds[i].insureCertNo == idno) {
              reqJsonCopy.insureds[j].insuredIntelligenceFlag = 1
            }

          }
        }
      }
      window.sessionStorage.removeItem('znhbInsureds')
      Cookies.remove('huisutrackId')
      this.$http.post('/sunmc/ordSun/underwritingPolicy', reqJsonCopy).then(res => {
        if (res.data.data.status == "200") {
          let signStr = res.data.data.msg
          this.payMent = res.data.data.payMent // 0跳转资金收银台 1跳转非车收银台
          this.$http.post("/sunmc/ordSun/createPolicy", {
            policy: reqJsonCopy,
            sign: signStr,
          }).then(res => {
            this.loadingVisible = false//遮罩关闭
            console.log(res)
            if (this.groupRiskFlag == 0) {// 单个被保人
              if (res.data.code == 10001 || res.data.code == 200) {
                this.orderNo = JSON.parse(res.data.data).ordCode
                this.onClickGetPay()
              } else if (res.data.code == 10000) {
                this.isFinish = ''
                return false
              } else if (res.data.code == 10002) {// 有人没有回答问题
                this.isFinish = ''
                return false
              } else if (res.data.code == 10003) {
                this.isFinish = ''
                this.onMessageBox(res.data.msg)
                return false
              } else {
                this.isFinish = ''
                this.onMessageBox(res.data.msg)
                return false
              }
            } else {
              if (res.data.code == 10000 || res.data.code == 10001 || res.data.code == 200) {
                this.znhbResultCode = res.data.code
                this.znhbResultData = JSON.parse(res.data.data)
                this.orderNo = this.znhbResultData.ordCode
                this.onNoScroll()
              } else if (res.data.code == 10002) {// 有人没有回答问题
                return false
              } else if (res.data.code == 10003) {
                this.onMessageBox(res.data.msg)
                return false
              } else {
                this.onMessageBox(res.data.msg)
                return false
              }
            }

          })
        } else {
          this.isFinish = ''
          this.onMessageBox(res.data.data.msg)
          this.loadingVisible = false
          return false
        }
      })
    },
    // 跳转到领取成功页面
    onGotoSuccessPage() {
      this.$router.push({
        path: "/Product/Success",
        query: {
          id: this.prdId,
          channelCode: this.$route.query.channelCode,
          orgCode: this.$route.query.orgCode,
          ordCode: this.orderNo,
        }
      });
    },
    // 跳转到非车收银台
    onGotoOrderPayCashier() {
      this.loadingVisible = false
      this.loadingVisibleContent = ''
      this.$router.push({
        path: "/Product/orderPayCashier",
        query: {
          prdName: this.pagedata.prdName,// 产品名称
          orderNo: this.orderNo,// 订单号
          price: this.newPriceObj.price,// 展示价格
          name: this.getUserName(this.benrenItems, 1),
          mobile: this.getUserName(this.benrenItems, 6),
          prdId: this.prdId,
          channelCode: this.channelCode,
          orgCode: this.orgCode,
        }
      })
    },
    // 跳转到月缴逻辑
    handleMonthPay() {
      this.loadingVisible = false
      this.loadingVisibleContent = ''
      let myRouter = location.href.split('#')[1].split('?')[0] // 类似：/ProInsured
      window.sessionStorage.setItem('openId', this.openid);// 
      window.sessionStorage.setItem('signContractUser', this.getUserName(this.benrenItems, 1));// 
      window.sessionStorage.setItem('productId', this.$route.query.id);// 
      window.sessionStorage.setItem('myRouter', myRouter);// 
      window.sessionStorage.setItem('proInsurUrlParam', window.location.href.split('?')[1])//获取投保页参数，类似：prdId=321&styleId=911&id=183985&channelCode=DC11WD0100030001&orgCode=CXGW
      window.sessionStorage.setItem('isSigned', '0');// 是否签约标识
      window.sessionStorage.setItem('orderCode', this.orderNo);// 订单号
      window.sessionStorage.setItem('styleId', this.styleList[this.styleActiveIndexA].styleId)
      window.sessionStorage.setItem('id', this.benrenCalcInfo.prdItemId)
      window.sessionStorage.setItem('channelCode', this.$route.query.channelCode)
      window.sessionStorage.setItem('orgCode', this.$route.query.orgCode)
      let path = ''
      if (this.itemData.signupType == 0) {// 多账户签约
        path = '/ApplySignRedirect'
      } else if (this.itemData.signupType == 1) {// 支付中签约
        path = '/ApplySignRedirect2'
      } else {
        path = '/ApplySignRedirect2'
      }
      this.$router.push({
        path: path,
      })
    },
    // 处理 获取支付链接
    handleGetPayPolicy() {
      this.$http.post("/sunmc/ordSun/getPayPolicy", {
        orderSn: this.orderNo,// 订单号
        payFlag: this.payFlag //支付环境标识 null：阳光支付 ，"1"：微信小程序支付 "2":支付宝小程序支付
      }).then(res => {
        this.loadingVisible = false;//遮罩关闭
        this.loadingVisibleContent = ''
        if (res.data.code == 200) {
          this.onSensors3('jumptime', '跳转时间')

          let payClient = res.data.data.payClient
          let payUrls = res.data.data.payUrls
          let jumpUrl = res.data.data.jumpUrl

          if (payClient === 'wxxcx') {//若是微信小程序
            weixin.miniProgram.navigateTo({ url: jumpUrl + '?' + payUrls })
          } else if (payClient === 'zfbxcx') {//若是支付宝小程序
            my.navigateTo({ url: jumpUrl })
          } else {//阳光支付
            window.location.href = payUrls //跳转到阳光保险界面
          }
        } else {
          this.onMessageBox(res.data.msg)
        }
      });
    },
    // 处理 续保
    handleXubao() {
      if (this.underwritingPolicyRes.isShowXubaoPop) {
        this.underwritingPolicyRes.isShowXubaoPop = false
        let dateObj = res.data.data.date
        this.dateObj.qiBaoDate = dateObj.xubaoStartDate//更改日期
        this.dateObj.zhongBaoDate = dateObj.xubaoEndDate
        this.underwritingPolicyRes.reUnderwrite = 2
        this.underwritingPolicyRes.oldpolicyNoUnid = dateObj.oldpolicyNoUnid//爱健康续保上年保单号key
        this.onMessageBox(res.data.data.msg)
      }
    },
    //核保接口
    underwritingPolicy() {
      //核保
      this.$http.post('/sunmc/ordSun/underwritingPolicy', this.reqJson).then(res => {
        console.dir(res)
        if (res.data.code == 200) {
          if (res.data.data.status == "100010") {
            this.handleXubao()
          } else if (res.data.data.status == "200") {//核保成功
            let signStr = res.data.data.msg
            this.payMent = res.data.data.payMent // 0跳转资金收银台 1跳转非车收银台
            this.$http.post("/sunmc/ordSun/createPolicy", {
              policy: this.reqJson,
              sign: signStr
            }).then(res => {

              if (res.data.code == 200) {
                this.orderNo = res.data.data // 订单号
                this.behaviorObjSetOrderNo(() => {
                })
                if (this.pagedata.giveInsurance == 0) {
                  this.onGotoSuccessPage()
                } else {
                  if (this.payMent == 1) {// 跳转非车收银台
                    this.onGotoOrderPayCashier()
                    return false
                  } else {
                    let fqs = this.monthPayNum
                    if (this.common.checkMsgNull(fqs) && fqs > 1) {//若有月缴(不包含全额缴费)
                      this.handleMonthPay()
                    } else {//无月缴
                      this.handleGetPayPolicy()
                    }
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
            return false
          }
        } else {
          this.onMessageBox(res.data.msg)
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
            let distinct_id =  ''
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
          } else if (item.itemCode == 6) {// 手机号
            let userName = item.userName
            arr.push({
              code: item.itemCode,
              value: userName
            })
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
      if (this.groupRiskFlag == 0) {// 单被保人
        let obj = {
          linkmanId: '',
          itemId: '',
          insuredItems: [],
        }
        if (this.checkItemValue(this.danBbrItems, 8, 1)) {// 被保人是本人的情况
          obj.itemId = this.benrenCalcInfo.prdItemId
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
                } else if (benrenItem.itemCode == 6) {// 手机号
                  let userName = benrenItem.userName
                  obj.insuredItems.push({
                    code: benrenItem.itemCode,
                    value: userName
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
          obj.itemId = this.danBbrCalcInfo.prdItemId
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
              } else if (this.danBbrItems[i].itemCode == 6) {// 手机号
                let userName = this.danBbrItems[i].userName
                obj.insuredItems.push({
                  code: this.danBbrItems[i].itemCode,
                  value: userName
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
      } else if (this.groupRiskFlag == 1) {// 多被保人
        for (let i = 0; i < this.bbrList.length; i++) {
          let obj = {
            linkmanId: '',
            itemId: '',
            insuredItems: [],
          }
          let bbr = this.bbrList[i]
          if (bbr.isBenren) {// 如果是本人
            obj.itemId = this.benrenCalcInfo.prdItemId
            obj.insuredItems.push({
              code: '8',
              value: '1'
            })
            for (let m = 0; m < bbr.items.length; m++) {
              for (let n = 0; n < this.benrenItems.length; n++) {
                let bbrItem = bbr.items[m]
                let benrenItem = this.benrenItems[n]
                if (benrenItem.isShow && benrenItem.itemCode == bbrItem.itemCode) {
                  if (bbrItem.itemCode == 12) {
                    obj.insuredItems.push({
                      code: '12',
                      value: benrenItem.userCode
                    })
                  } else if (bbrItem.itemCode == 9) {
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
          } else {// 非本人情况
            for (let i = 0; i < bbr.items.length; i++) {
              let bbrItem = bbr.items[i]
              obj.itemId = bbr.prdItemId
              if (bbrItem.isShow) {
                if (bbrItem.itemCode == 6) {
                  if (!this.common.checkMsgNull(bbrItem.userName)) {
                    obj.insuredItems.push({
                      code: bbrItem.itemCode,
                      value: this.getUserName(this.benrenItems, 6)
                    })
                  } else {
                    obj.insuredItems.push({
                      code: bbrItem.itemCode,
                      value: bbrItem.userName
                    })
                  }
                } else {
                  obj.insuredItems.push({
                    code: bbrItem.itemCode,
                    value: bbrItem.userName
                  })
                }
              }
            }
          }
          arr.push(obj)
        }
      }
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
    generatePets() {
      let arr = []
      if (this.petsItems.length) {
        for (let i = 0; i < this.petsItems.length; i++) {
          arr.push({
            code: this.petsItems[i].itemCode,
            value: this.petsItems[i].userName
          })
        }
      }
      return arr
    },
    // 生成标的信息
    generateTarget() {
      if (!this.targetItems.length) {
        return []
      }
      let arr = []
      let obj = {}
      if (this.groupRiskFlag == 1) {
        obj.itemId = this.bbrList[0].prdItemId
      } else {
        obj.itemId = this.danBbrCalcInfo.prdItemId
      }
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
@import "./css/newDetails.css";
</style>