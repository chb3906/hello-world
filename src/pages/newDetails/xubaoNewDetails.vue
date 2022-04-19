<template>
  <div class="newDetails-wrap">
    <mymask :loadingVisible="loadingVisible" :loadingVisibleContent="loadingVisibleContent"></mymask>
    <BbrPopPage :showBbrPopPage="showBbrPopPage" @onBbrPopPage="onBbrPopPage" @onHideBbrPopPage="onHideBbrPopPage" :channelName="channelName"></BbrPopPage>
    <!-- <Traceback></Traceback> -->
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
      <div class='bzfw-title' v-if="itemData.prdStyles && itemData.prdStyles.length > 1 && false">
        <div class="title-item" @click="onSwitchStyleIndex(index)" v-for="(prdStyle,index) in itemData.prdStyles" :class='{active:styleActiveIndexA==index}' :style="{border: (styleActiveIndexA==index ? '1px solid ' + itemData.prdTheme : '1px solid #e2e2e2'),color: (styleActiveIndexA == index ? itemData.prdTheme : '#000')}" :key="'fangan' + index">
          <div class="title-item-top" v-if="initPriceArr.length">
            <template v-if="common.checkMsgNull(discountData.discount)">
              <div class="qk2">
                <div class="top">{{initPriceArr[index].discountPrice}}</div>
                <div class="bottom line">{{initPriceArr[index].price}}</div>
              </div>
            </template>
            <template v-else-if="common.checkMsgNull(discountData.firstPremium)">
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
          <div class='detail-title' v-if="itemData.prdStyles && itemData.prdStyles.length > 1 && false">
            <div class="detail-title-item" @click="onSwitchStyleIndex(index)" v-for="(prdStyle,index) in itemData.prdStyles" :style="{backgroundColor: (styleActiveIndexA==index ? itemData.prdTheme : '#fff' ), color: (styleActiveIndexA==index ? '#fff' : itemData.prdTheme), border: '1px solid '}" :key='index'>
              {{prdStyle.styleName}}
            </div>
          </div>
          <!-- <div class="detail-content-wrap" :style="{paddingTop: (itemData.prdStyles && itemData.prdStyles.length <= 1 ? '0.5rem' : '1.1rem')}" ref="detailContentWrap"> -->
          <div class="detail-content-wrap" style="paddingTop: 0.6rem" ref="detailContentWrap">
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
    <!-- 投保人信息 -->
    <div class="mk_info" v-show="benrenItems.length">
      <h4 class="title_common title_tbr">投保人信息（本人）</h4>
      <div class="wrap">
        <!-- 投保人姓名 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 1 && item.isShow">
            <div class="item-title">投保人姓名</div>
            <div class="item-value">
              <input type="text" placeholder="请输入本人姓名" v-model="item.userName" maxlength="30" @blur="onCheckXingming(item.userName)" @click="onSensors('新模板页面-填写投保人姓名', $event)" disabled>
            </div>
          </div>
        </template>
        <div class="item">
          <!-- 证件类型 -->
          <template v-for="item in benrenItems">
            <div class="item-title" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
              {{ item.options[0].name }}
            </div>
          </template>
          <!-- 证件号码 -->
          <template v-for="item in benrenItems">
            <div class="item-value" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
              <input type="text" placeholder="请输入本人证件号码" v-model="item.userName" @blur="onTbrZjhm(item.userName)" @change="onTbrZjhmChange(item.userName)" @click="onSensors('新模板页面-填写投保人证件号', $event)" disabled>
            </div>
          </template>
        </div>
        <!-- 联系电话 -->
        <template v-for="item in benrenItems">
          <div class="item" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
            <div class="item-title">联系电话</div>
            <div class="item-value">
              <input type="text" placeholder="请输入本人手机号" v-model="item.userName" @blur="onCheckXbSjh(item.userName, holderDto.holderMobile)" @click="onSensors('新模板页面-填写投保人手机号', $event)" maxlength="11">
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
          <div v-show="idx == danBbrRelationIndex" class="itemBbrName" :style="{backgroundColor: (idx == danBbrRelationIndex ? '#FFF8F6' : '#F6F6F6'),color: (idx == danBbrRelationIndex ? itemData.prdTheme: '#444'),border: (idx == danBbrRelationIndex ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}" v-for="(itemy,idx) in item.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</div>
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
                  <input type="text" placeholder="请输入被保险人姓名" v-model="item.userName" maxlength="30" @blur="onCheckXingming(item.userName)" @click="onSensors('新模板页面-填写被保人姓名', $event)" disabled>
                </div>
              </div>
            </template>
            <div class="item">
              <!-- 证件类型 -->
              <template v-for="item in danBbrItems">
                <div class="item-title" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
                  {{ item.options[0].name }}
                </div>
              </template>
              <!-- 证件号码 -->
              <template v-for="item in danBbrItems">
                <div class="item-value" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
                  <input type="text" placeholder="请输入被保险人证件号码" v-model="item.userName" @blur="onDanBbrZjhm(item.userName)" @change="onDanBbrZjhmChange(item.userName)" @click="onSensors('新模板页面-填写被保人证件号码', $event)" disabled>
                </div>
              </template>
            </div>
            <!-- 联系电话 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
                <div class="item-title">联系电话</div>
                <div class="item-value">
                  <input type="text" placeholder="请输入被保险人手机号" v-model="item.userName" @blur="onCheckXbSjh(item.userName, insuredDtoList[0].insuredMobile)" @click="onSensors('新模板页面-填写被保人手机号', $event)" maxlength="11">
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
        <!-- <div v-if="pagedata.minGroupNum == pagedata.maxGroupNum" class="bbrrs" :style="{color: itemData.prdTheme,border: '1px solid ' + itemData.prdTheme}">被保人人数:{{pagedata.minGroupNum}}人</div>
        <div v-else class="bbrrs" :style="{color: itemData.prdTheme,border: '1px solid ' + itemData.prdTheme}">被保人人数:{{pagedata.minGroupNum}}至{{pagedata.maxGroupNum}}人</div> -->
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
                <!-- <div class="duoBbr-icon" @click="deleteDuoBbr(bbrIndex)"><img src="../../../static/images/icon_delete_btn.png" alt=""></div> -->
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
                <!-- <div class="duoBbr-icon" @click="deleteDuoBbr(bbrIndex)"><img src="../../../static/images/icon_delete_btn.png" alt=""></div> -->
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
      <!-- <div class="addBbrInfo" v-show="bbrList.length < pagedata.maxGroupNum" :style="{color: itemData.prdTheme}" @click="onShowMoreBbr">+ 添加被保险人</div> -->

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
                    <div class="itemBbrName" :style="{backgroundColor: (idx == bbrPop.relationIndex ? '#FFF8F6': '#F6F6F6'),color: (idx == bbrPop.relationIndex ? itemData.prdTheme: '#444'),border: (idx == bbrPop.relationIndex ? '1px solid ' + itemData.prdTheme : '1px solid #fff')}" v-for="(itemy,idx) in item.options" v-if="idx == bbrPop.relationIndex" :value="itemy.id" :key="idx">{{itemy.name}}</div>
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
                            <input type="text" placeholder="请输入被保险人姓名" v-model="item.userName" maxlength="30" @blur="onCheckXingming(item.userName)" @click="onSensors('新模板页面-填写被保人姓名', $event)" disabled>
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
                            <input type="text" placeholder="请输入被保险人证件号码" v-model="item.userName" @blur="onDuoBbrZjhm(item.userName)" @click="onSensors('新模板页面-填写被保人证件号码', $event)" disabled>
                          </div>
                        </template>
                      </div>
                      <!-- 联系电话 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
                          <div class="item-title">联系电话</div>
                          <div class="item-value">
                            <input type="tel" placeholder="请输入被保险人手机号" v-model="item.userName" @blur="onCheckXbSjh(item.userName, insuredDtoList[getInsuredDtoListIndex(getUserName(bbrPop.items, 4))].insuredMobile)" @click="onSensors('新模板页面-填写被保人手机号', $event)" maxlength="11">
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
                            <input type="text" placeholder="请输入详细地址" :id="'danbbr' + item.itemCode" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写详细地址', $event)">
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
        <div class="item">
          <div class="item-title">保险日期</div>
          <div class="item-value date-wrap">
            <div class="wrap-disabled">{{xubaoStartDate}}</div>
            <div class="zhi">至</div>
            <div class="wrap-disabled">{{xubaoEndDate}}</div>
            <img src="./img/icon_date_red.png" alt="">
          </div>
        </div>
        <!-- 受益人 -->
        <div class="item" v-if="false" @click="onShowSyr">
          <div class="item-title syr-wrap">
            <div>受益人</div>
            <img src="./img/icon_syr.png" alt="">
          </div>
          <div class="item-value">法定</div>
        </div>

      </div>
      <!-- 受益人弹框 -->
      <transition name="background">
        <div class="syr-popbox" v-if="showSyr" @click="onCloseSyr"></div>
      </transition>
      <transition name="syr">
        <div class="syr-pop" v-if="showSyr">
          <img class="icon_23" src="./img/icon_23.png" alt="" @click="onCloseSyr">
          <h4>受益人</h4>
          <p>受益人是指在保障事故发生或者约定的保险期限届满，依照保险合同享有保险金请求权的人。</p>
          <div class="syr-btn" @click="onCloseSyr">确定</div>
        </div>
      </transition>
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
        <a :href="itemData.customerService">
          <img :src="itemData.customerLogo" />
        </a>

        <div class="center">
          <template v-if="itemData.giveInsurance == 1">
            <div class="calcLoading" v-if="showCalcLoading">
              <span>计算中</span>
              <mt-spinner type="triple-bounce"></mt-spinner>
            </div>
            <div v-else>
              <div class="qk1" v-if="newPriceObj.qkType == 1">￥{{newPriceObj.price}}<span> /年</span></div>
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
        <div class="right" @click="handleLjtb(), onSensors('续保-续保新模板页面-点击立即续保',$event)">
          <span v-if="itemData.giveInsurance == 1">
            <template>立即续保</template>
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
  name: 'xubaoNewDetails',
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
      isBodyFixed: false, // 当前页面是否是锁定状态
      holderDto: JSON.parse(window.sessionStorage.getItem('holderDto')),// 投保人
      insuredDtoList: JSON.parse(window.sessionStorage.getItem('insuredDtoList')), // 被保人数组
      xubaoStartDate: window.sessionStorage.getItem('xubaoStartDate'),// 续保起期
      xubaoEndDate: window.sessionStorage.getItem('xubaoEndDate'),// 续保止期
      lastDateString: '00:00:00',
      endLastDateString: '23:59:59',

      prdId: this.$route.query.id, //列表id，产品id
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode, //机构Code
      carOwnerCode: this.$route.query.carOwnerCode, //列表carownerCode
      oldPolicyNo: this.$route.query.oldPolicyNo,//短信续保的上年保单号
      openid: this.$route.query.openid,//微信用户唯一标识//代扣微信用户唯一标识(分期代扣产品必传)
      carOwnerSecretId: this.$route.query.carOwnerSecretId,
      fromListPage: this.$route.query.fromListPage,// 如果是从列表页跳转过来的，则不能点击下一步
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
      /////////////////////////////////////////// 轮播部分 结束 ////////////////////////////////////////////////
      /////////////////////////////////////////// 保障范围 开始 ////////////////////////////////////////////////
      showBzfwDetail: false, // 是否展示保障范围详情
      showKxsjfa: false, // 是否展示可选升级方案部分
      excludeArr: ['年龄', '社保情况', '保险期间', '总保额', '共享免赔额', '方案被保人数', '方案被保人数范围'],
      gmxzArr: [], // 非保险条款数组，也不包括费率表
      flbContent: {}, // 费率表
      /////////////////////////////////////////// 保障范围 结束 ////////////////////////////////////////////////
      /////////////////////////////////////////// 保障详情 开始 ////////////////////////////////////////////////
      showSyr: false, // 是否展示受益人
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
      showHealth: false,// 是否展示健康告知
      payFlag: null,//null：阳光支付,"1"：微信小程序支付, "2":支付宝小程序支付
      underwritingPolicyRes: {//新保情况下,核保提示
        isShowXubaoPop: true,//是否二次调用核保接口
        reUnderwrite: 2,// 2标识续保
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
    }
  },
  created() {
    this.canScroll()
    this.getUrlParam()
    this.loadingVisible = true
    this.getAd()
    this.getCityData()
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
    ///////////////////////////////////////////// 通用列表弹框 开始 ///////////////////////////////////////////
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
    ///////////////////////////////////////////// 通用列表弹框 结束 ///////////////////////////////////////////
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
      let tbxzContent = '' // 投保声明 或 投保告知书 的内容
      for (let i = 0; i < insurances.length; i++) {
        let item = insurances[i]
        if (item.title == '投保声明' || item.title == '投保告知书') {
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
    onShowSyr() {
      this.showSyr = true
    },
    onCloseSyr() {
      this.showSyr = false
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
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
          let items = JSON.parse(JSON.stringify(this.benrenItems))
          for (let i = 0; i < items.length; i++) {
            if (items[i].itemCode == 4) {
              items[i].userName = this.holderDto.holderIdentifyNumber
            }
          }
          this.onCalc(items, this.getItemCodeArr(this.benrenItems), this.danBbrSheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.getNewPriceObj()
          })
          // }
        } else {// 如果不是本人
          // if (this.checkYinziChange(this.danBbrItems)) {
          let items = JSON.parse(JSON.stringify(this.danBbrItems))
          for (let i = 0; i < items.length; i++) {
            if (items[i].itemCode == 4) {
              items[i].userName = this.insuredDtoList[0].insuredIdentifyNumber
            }
          }
          this.onCalc(items, this.getItemCodeArr(this.danBbrItems), this.danBbrSheBaoIndex, data => {
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
            let age = this.common.GetAge(userName, this.xubaoStartDate, 1)
            let day = this.common.GetDay(userName, this.xubaoStartDate, 1)
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
            let age = this.common.GetAge(userName, this.xubaoStartDate, 2)
            let day = this.common.GetDay(userName, this.xubaoStartDate, 2)
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
    // 校验手机号
    onCheckXbSjh(userName, oldUserName) {
      if (userName == '') {
        this.onToast('手机号不能为空')
        return false
      } else if (userName == this.dataDesensitization(oldUserName, 6)) {
        return true
      } else if (userName.indexOf('*') != -1) {
        this.onToast('手机号输入有误')
        return false
      } else if (!this.common.checkMobilePhone(userName)) {
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
          let age = this.common.GetAge(userName, this.xubaoStartDate, 1)
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
      let age = this.common.GetAge(userName, this.xubaoStartDate, 2)
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
      let age = this.common.GetAge(userName, this.xubaoStartDate, type)
      let day = this.common.GetDay(userName, this.xubaoStartDate, type)
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
        let items = JSON.parse(JSON.stringify(this.benrenItems))
        this.setUserName(items, 4, this.insuredDtoList[0].insuredIdentifyNumber) // 被保人证件号码
        this.onCalc(items, [4, 2], this.danBbrSheBaoIndex, data => {
          this.benrenCalcInfo.price = data.price
          this.benrenCalcInfo.prdItemId = data.prdItemId
          this.getNewPriceObj()
        })
      } else {
        let items = JSON.parse(JSON.stringify(this.benrenItems))
        this.setUserName(items, 4, this.insuredDtoList[0].insuredIdentifyNumber) // 被保人证件号码
        this.onCalc(items, [4, 2], this.danBbrSheBaoIndex, data => {
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
    getInsuredDtoListIndex(idNum) {
      for (let i = 0; i < this.insuredDtoList.length; i++) {
        if (idNum == this.dataDesensitization(this.insuredDtoList[i].insuredIdentifyNumber, 4)) {
          return i
        }
      }
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
            if (itemCode == 5) {
              if (!this.checkAgeInRange(userName, 2)) {
                this.onToast('被保人年龄不在投保区间内，请重新输入')
                return false
              }
            } else if (itemCode == 6) {
              if (this.common.checkMsgNull(userName)) {
                if (!this.onCheckXbSjh(userName, this.insuredDtoList[this.getInsuredDtoListIndex(this.getUserName(this.bbrPop.items, 4))].insuredMobile)) {
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
          let items = JSON.parse(JSON.stringify(this.benrenItems))
          this.setUserName(items, 4, this.holderDto.holderIdentifyNumber) // 被保人证件号码
          this.onCalc(items, [4, 2], this.bbrPop.sheBaoIndex, data => {
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
          let items = JSON.parse(JSON.stringify(this.bbrPop.items))
          this.setUserName(items, 4, this.insuredDtoList[this.getInsuredDtoListIndex(this.getUserName(this.bbrPop.items, 4))].insuredIdentifyNumber) // 被保人证件号码
          this.onCalc(items, [4, 2], this.bbrPop.sheBaoIndex, data => {
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
    // 校验本人信息是否已经填写
    checkBenrenInfo() {
      for (let j = 0; j < this.benrenItems.length; j++) {
        if (this.benrenItems[j].isShow) {
          let itemCode = this.benrenItems[j].itemCode
          let itemName = this.benrenItems[j].itemName
          let userName = this.benrenItems[j].userName
          if (['41', '46', '27', '45', '30', '31'].indexOf(itemCode) == -1) {// 排除不需要校验的字段
            if (!this.common.checkMsgNull(userName)) {
              this.onToast('请将投保人信息填写完整')
              return false
            } else {
              if (itemCode == 6) {// 手机号
                if (!this.onCheckXbSjh(userName, this.holderDto.holderMobile)) {
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
              this.onToast('请将被保人信息填写完整')
              return false
            } else {
              if (itemCode == 6) {// 手机号
                if (!this.onCheckXbSjh(userName, this.insuredDtoList[0].insuredMobile)) {
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
        let items = JSON.parse(JSON.stringify(this.benrenItems))
        this.setUserName(items, 4, this.insuredDtoList[i].insuredIdentifyNumber) // 被保人证件号码
        this.onCalc(items, [4, 2], this.bbrList[i].sheBaoIndex, data => {
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
        let items = JSON.parse(JSON.stringify(this.bbrList[i].items))
        this.setUserName(items, 4, this.insuredDtoList[i].insuredIdentifyNumber) // 被保人证件号码
        this.onCalc(items, [4, 2], this.bbrList[i].sheBaoIndex, data => {
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
    getList() {
      this.$http.post("prdmc/prdmcProductDiscount/queryDiscount", {//折扣接口
        productId: this.prdId,
        channelCode: this.channelCode,
        oldPolicyNo: this.oldPolicyNo,
        orgCode: this.orgCode,
      }).then(res => {
        if (res.status == 200) {
          this.discountData = res.data
          if (this.discountData.isMonthPay) {
            this.monthPayNum = JSON.parse(this.discountData.isMonthPay)[0].value
          }
          this.getSpecification(this.discountData.renewInsurance);
        } else {
          console.log('queryDiscount')
          this.onMessageBox('获取数据失败,请稍候重试')
          return false
        }
      })
    },
    // 新保调用
    getSpecification(renewInsuranceFlag) {
      this.$http.post("/prdmc/prdmcShop/productSpecification", {
        id: this.prdId,
        renewInsurance: renewInsuranceFlag,
        channelCode: this.channelCode
      }).then(res => {
        if (res.data.code == 200) {
          this.styleList = res.data.data.prdStyleSpecification
          this.handleShowKxsjfa()
          //调用产品详情接口
          this.getProductDetail()
        } else {
          console.log('productSpecification')
          this.onMessageBox('获取数据失败,请稍候重试')
          return false
        }
      })
    },
    //产品详情接口
    getProductDetail() {
      this.$http.post("/prdmc/prdmcShop/productDetail", {
        productId: this.prdId,
        orgCode: this.orgCode
      }).then(res => {
        if (res.data.code == 200) {
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
              this.onSensors2('xubao-jinruxubaoxinmubanyemian', '续保-进入续保新模板页面')
            })

          }
          //设置页面标题
          jquery(document).find('title').text(this.itemData.prdName);

          //微信分享
          this.handleWXShare()

          this.getInsureData()
        } else {
          console.log('productDetail')
          this.onMessageBox('获取数据失败,请稍候重试')
          return false
        }
      }).catch(err => {
        console.log('productDetail2')
        this.onMessageBox('获取数据失败,请稍候重试')
        return false
      });
    },
    getInsureData() {
      //投保份数校验
      this.$http.post('/sunmc/checkProductIsSale/checkProduct', {
        productId: this.prdId,
        orgcode: this.orgCode
      }).then(res => {
        if (res.data.code !== 10006) {//除了10006状态,都不可购买
          this.onMessageBox(res.data.msg)
          return false
        } else {//可以购买
          this.$http.post("/prdmc/prdmcShop/insureData", {
            itemId: this.styleList[this.styleActiveIndexA].prdItemId,
            orgCode: this.orgCode
          }).then(res => {
            if (res.status == 200) {
              setTimeout(() => {
                this.loadingVisible = false
              }, 500)
              this.pagedata = res.data.data
              this.initPagedata()
              if (this.insuredDtoList.length > 1) {
                this.styleActiveIndexA = 1
              }
              this.getInitPriceArr()
              this.getNewPriceObj()

              this.changeMinGroupNumAndMaxGroupNum()


              this.getBenrenCalcInfo()
              this.getDanBbrCalcInfo()
              this.benrenItems = this.getItems(1)
              this.danBbrItems = this.getItems(2)
              this.petsItems = this.getItems(8)
              this.getBbrPop()


              this.setUserName(this.benrenItems, 1, this.dataDesensitization(this.holderDto.holderName, 1))
              this.setUserName(this.benrenItems, 4, this.dataDesensitization(this.holderDto.holderIdentifyNumber, 4))
              this.setUserName(this.benrenItems, 6, this.dataDesensitization(this.holderDto.holderMobile, 6))
              this.setUserName(this.benrenItems, 7, this.holderDto.holderEmail)
              if (parseInt(this.holderDto.holderIdentifyNumber.substr(16, 1)) % 2 == 1) {// 男
                this.setUserName(this.benrenItems, 2, 1)
              } else {
                this.setUserName(this.benrenItems, 2, 2)
              }


              if (this.insuredDtoList.length == 1) { // 单个被保人

                this.danBbrRelationIndex = this.getRelationIndex(this.switchRelationShip(this.insuredDtoList[0].relationShip))

                this.setUserName(this.danBbrItems, 8, this.switchRelationShip(this.insuredDtoList[0].relationShip)) // 为谁投保
                this.setUserName(this.danBbrItems, 1, this.dataDesensitization(this.insuredDtoList[0].insuredName, 1)) // 被保人姓名
                this.setUserName(this.danBbrItems, 3, 1) // 被保人证件类型
                this.setUserName(this.danBbrItems, 4, this.dataDesensitization(this.insuredDtoList[0].insuredIdentifyNumber, 4)) // 被保人证件号码
                this.setUserName(this.danBbrItems, 6, this.dataDesensitization(this.insuredDtoList[0].insuredMobile, 6)) // 被保人联系电话
                this.setUserName(this.danBbrItems, 7, this.dataDesensitization(this.insuredDtoList[0].insuredEmail, 7)) // 被保人邮箱
                if (parseInt(this.insuredDtoList[0].insuredIdentifyNumber.substr(16, 1)) % 2 == 1) {// 男
                  this.setUserName(this.danBbrItems, 2, 1)
                } else {
                  this.setUserName(this.danBbrItems, 2, 2)
                }

                let items = JSON.parse(JSON.stringify(this.benrenItems))
                this.setUserName(items, 4, this.insuredDtoList[0].insuredIdentifyNumber) // 被保人证件号码
                this.onCalc(items, [4, 2], this.danBbrSheBaoIndex, data => {
                  this.benrenCalcInfo.price = data.price
                  this.benrenCalcInfo.prdItemId = data.prdItemId
                  this.danBbrCalcInfo.price = data.price
                  this.danBbrCalcInfo.prdItemId = data.prdItemId
                  this.getNewPriceObj()
                })



              } else if (this.insuredDtoList.length > 1) { // 多个被保人

                for (let i = 0; i < this.insuredDtoList.length; i++) {
                  let isBenren = false
                  if (this.switchRelationShip(this.insuredDtoList[i].relationShip) == 1) {// 本人
                    isBenren = true
                  }

                  let itemsTemp = this.getItems(2)
                  this.setUserName(itemsTemp, 1, this.dataDesensitization(this.insuredDtoList[i].insuredName, 1)) // 被保人姓名
                  this.setUserName(itemsTemp, 3, 1) // 被保人证件类型
                  this.setUserName(itemsTemp, 4, this.dataDesensitization(this.insuredDtoList[i].insuredIdentifyNumber, 4)) // 被保人证件号码
                  this.setUserName(itemsTemp, 6, this.dataDesensitization(this.insuredDtoList[i].insuredMobile, 6)) // 被保人联系电话
                  this.setUserName(itemsTemp, 7, this.dataDesensitization(this.insuredDtoList[i].insuredEmail, 7)) // 被保人邮箱
                  this.setUserName(itemsTemp, 8, this.switchRelationShip(this.insuredDtoList[i].relationShip)) // 为谁投保
                  if (parseInt(this.insuredDtoList[i].insuredIdentifyNumber.substr(16, 1)) % 2 == 1) {// 男
                    this.setUserName(itemsTemp, 2, 1)
                  } else {
                    this.setUserName(itemsTemp, 2, 2)
                  }
                  let items = JSON.parse(JSON.stringify(itemsTemp))

                  this.bbrList.push({
                    price: 0, // 保费
                    prdItemId: '', // itemId 方案报价id
                    relationIndex: this.getRelationIndex(this.switchRelationShip(this.insuredDtoList[i].relationShip)),
                    isBenren: isBenren,
                    sheBaoIndex: 0,
                    items: items,
                  })
                }
                this.handleFabbrsChange(() => {
                  this.getNewPriceObj()
                  this.onCanScroll()
                })
              }
            } else {
              console.log('insureData1')
              this.onMessageBox('获取数据失败,请稍候重试')
              return false
            }
          }).catch(reject => {
            console.log('insureData2')
            this.onMessageBox('获取数据失败,请稍候重试')
            return false
          })
        }
      }).catch(reject => {
        console.log('insureData3')
        this.onMessageBox('获取数据失败,请稍候重试')
        return false
      })
    },
    // 获取与投保人关系在数组中的索引
    getRelationIndex(index) {
      let items = this.getItems(2)
      for (let i = 0; i < items.length; i++) {
        if (items[i].itemCode == 8) {
          for (let j = 0; j < items[i].options.length; j++) {
            if (items[i].options[j].id == index) {
              return j
            }
          }
        }
      }
    },
    //数据脱敏
    dataDesensitization(data, type) {//type:1->姓名,4->身份证,6->手机号
      var outPut = "";
      if (data != null && data != '' && data.length > 0) {
        if (type == 1) {//张* 保留1个汉字,用1*代替 
          var str = data.substr(0, 1);
          outPut = str + "*";
        } else if (type == 4) {//2202****3049,隐中间10位,用4*代替
          var len = data.length;
          var str1 = data.substring(0, 4);
          var str2 = data.substring(len - 4);
          outPut = str1 + "****" + str2;
        } else if (type == 6) {//135***6679,隐中间四位,用3*代替
          var len = data.length;
          var str1 = data.substring(0, 3);
          var str2 = data.substring(len - 4);
          outPut = str1 + "***" + str2;
        } else {
          outPut = data
        }
      }
      // console.log(outPut,835);
      return outPut;
    },
    //匹配与投保人关系
    switchRelationShip(number) {
      let relationShip;
      if (number == "50") {
        relationShip = 10;
      } else if (number == "10") {
        relationShip = 9;
      } else if (number == "40") {
        relationShip = 11;
      } else if (number == "01") {
        relationShip = 1;
      } else if (number == "11") {
        relationShip = 2;
      } else if (number == "12") {
        relationShip = 3;
      } else if (number == "51") {
        relationShip = 4;
      } else if (number == "52") {
        relationShip = 5;
      } else if (number == "20") {
        relationShip = 6;
      } else if (number == "30") {
        relationShip = 7;
      } else if (number == "99") {
        relationShip = 8;
      } else {
        relationShip = Number(number);
      }
      return relationShip;
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
    // 初始化pagedata
    initPagedata() {
      this.initUserName()
      this.setPetIsShow()
      this.setTbrIsShow()
      this.setBbrIsShow()
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
          if (this.checkYinziChange(this.benrenItems)) {
            this.onCalc(this.benrenItems, this.getItemCodeArr(this.benrenItems), this.danBbrSheBaoIndex, data => {
              this.benrenCalcInfo.price = data.price
              this.benrenCalcInfo.prdItemId = data.prdItemId
              this.getNewPriceObj()
            })
          } else {
            this.getNewPriceObj()
          }
        } else {
          if (this.checkYinziChange(this.danBbrItems)) {
            this.onCalc(this.danBbrItems, this.getItemCodeArr(this.danBbrItems), this.danBbrSheBaoIndex, data => {
              this.danBbrCalcInfo.price = data.price
              this.danBbrCalcInfo.prdItemId = data.prdItemId
              this.getNewPriceObj()
            })
          } else {
            this.getNewPriceObj()
          }
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


      if (!this.checkedFlag) {
        this.onToast('请仔细阅读并确认产品条款以及相关告知信息')
        return false
      }

      this.toPay()
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
    toPay() {
      this.loadingVisible = true
      this.loadingVisibleContent = '加载中'
      this.common.setTracebackSession()

      this.checkEnvironment()


      this.reqJson = {
        shenCeUserId: this.getShenCeUserId(),
        channelCode: this.channelCode,
        orgCode: this.orgCode,
        userSign: window.sessionStorage.getItem('userSign'),
        styleId: this.styleList[this.styleActiveIndexA].styleId,
        startDate: `${this.xubaoStartDate} ${this.lastDateString}`,
        endDate: `${this.xubaoEndDate} ${this.endLastDateString}`,
        isCustom: true,
        policyHolders: this.generateTbr(),
        insureds: this.generateBbr(),
        beneficiary: this.generateSyr(),
        petsItems: this.generatePets(),
        targets: [],
        addressCode: this.getUserCode(this.benrenItems, 12),
        urlParam: this.urlParam ? this.urlParam : '',
        payFlag: this.payFlag,
        openId: this.common.getUrlValueByName('openid'),
        instalmentNum: this.monthPayNum,//分期数
        oldpolicyNoUnid: this.underwritingPolicyRes.oldpolicyNoUnid,//上年保单号标识(二次核保时传第一次核保返回的key值)
        reUnderwrite: this.underwritingPolicyRes.reUnderwrite,//二次核保标识(默认为1，当出参status为100010时赋值2)
        renewInsurance: this.renewInsuranceFlag ? this.renewInsuranceFlag : "",//一键续保标识
        zhugeUserId: '',
        oldPolicyNo: this.oldPolicyNo,
      }

      this.underwritingPolicy()
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
          if (res.data.data.status == "100010") {
            if (this.underwritingPolicyRes.isShowXubaoPop) {
              this.underwritingPolicyRes.isShowXubaoPop = false
              this.xubaoStartDate = res.data.data.date.xubaoStartDate//更改日期
              this.xubaoEndDate = res.data.data.date.xubaoEndDate//更改日期
              this.underwritingPolicyRes.reUnderwrite = 2
              this.underwritingPolicyRes.oldpolicyNoUnid = res.data.data.date.oldpolicyNoUnid//爱健康续保上年保单号key
              this.isAvailableStartDate = true//设为不可用
              this.onMessageBox(res.data.data.msg)
              return false
            }
          } else if (res.data.data.status == "200") {//核保成功
            let signStr = res.data.data.msg
            let payMent = res.data.data.payMent // 0跳转资金收银台 1跳转非车收银台
            this.$http.post("/sunmc/ordSun/createPolicy", {
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
                    let fqs = this.monthPayNum
                    if (this.common.checkMsgNull(fqs) && fqs > 1) {//若有月缴(不包含全额缴费)
                      let myRouter = location.href.split('#')[1].split('?')[0] // 类似：/ProInsured
                      window.sessionStorage.setItem('openId', this.openid);// 
                      window.sessionStorage.setItem('signContractUser', this.getUserName(this.benrenItems, 1));// 
                      window.sessionStorage.setItem('productId', this.$route.query.id);// 
                      window.sessionStorage.setItem('myRouter', myRouter);// 
                      window.sessionStorage.setItem('proInsurUrlParam', window.location.href.split('?')[1])//获取投保页参数，类似：prdId=321&styleId=911&id=183985&channelCode=DC11WD0100030001&orgCode=CXGW
                      window.sessionStorage.setItem('isSigned', '0');// 是否签约标识
                      window.sessionStorage.setItem('orderCode', orderSn);// 订单号
                      window.sessionStorage.setItem('styleId', this.styleList[this.styleActiveIndexA].styleId)
                      window.sessionStorage.setItem('id', this.benrenCalcInfo.prdItemId)
                      window.sessionStorage.setItem('channelCode', this.$route.query.channelCode)
                      window.sessionStorage.setItem('orgCode', this.$route.query.orgCode)
                      this.loadingVisible = false//遮罩关闭
                      this.$router.push({
                        path: '/ApplySignRedirect2',
                      })
                    } else {//无月缴
                      this.$http.post("/sunmc/ordSun/getPayPolicy", {
                        orderSn: orderSn,
                        payFlag: this.payFlag //支付环境标识 null：阳光支付 ，"1"：微信小程序支付 "2":支付宝小程序支付
                      }).then(res => {
                        if (res.data.code == 200) {
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
            if (userName.indexOf('***') != -1) {
              userName = this.holderDto.holderMobile
            }
            arr.push({
              code: item.itemCode,
              value: userName
            })
          } else if (item.itemCode == 1) {
            arr.push({
              code: item.itemCode,
              value: this.holderDto.holderName
            })
          } else if (item.itemCode == 4) {
            arr.push({
              code: item.itemCode,
              value: this.holderDto.holderIdentifyNumber
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
                  if (userName.indexOf('***') != -1) {
                    userName = this.holderDto.holderMobile
                  }
                  obj.insuredItems.push({
                    code: benrenItem.itemCode,
                    value: userName
                  })
                } else if (benrenItem.itemCode == 1) {
                  obj.insuredItems.push({
                    code: benrenItem.itemCode,
                    value: this.insuredDtoList[0].insuredName
                  })
                } else if (benrenItem.itemCode == 4) {
                  obj.insuredItems.push({
                    code: benrenItem.itemCode,
                    value: this.insuredDtoList[0].insuredIdentifyNumber
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
                if (userName.indexOf('***') != -1) {
                  userName = this.insuredDtoList[0].insuredMobile
                }
                obj.insuredItems.push({
                  code: this.danBbrItems[i].itemCode,
                  value: userName
                })
              } else if (this.danBbrItems[i].itemCode == 1) {
                obj.insuredItems.push({
                  code: this.danBbrItems[i].itemCode,
                  value: this.insuredDtoList[0].insuredName
                })
              } else if (this.danBbrItems[i].itemCode == 4) {
                obj.insuredItems.push({
                  code: this.danBbrItems[i].itemCode,
                  value: this.insuredDtoList[0].insuredIdentifyNumber
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
                  } else if (bbrItem.itemCode == 1) {
                    obj.insuredItems.push({
                      code: '1',
                      value: this.insuredDtoList[i].insuredName
                    })
                  } else if (bbrItem.itemCode == 4) {
                    obj.insuredItems.push({
                      code: '4',
                      value: this.insuredDtoList[i].insuredIdentifyNumber
                    })
                  } else if (bbrItem.itemCode == 6) {
                    let userName = bbrItem.userName
                    if (userName.indexOf('***') != -1) {
                      userName = this.insuredDtoList[i].insuredMobile
                    }
                    obj.insuredItems.push({
                      code: '6',
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
          } else {// 非本人情况
            for (let k = 0; k < bbr.items.length; k++) {
              let bbrItem = bbr.items[k]
              obj.itemId = bbr.prdItemId
              if (bbrItem.isShow) {
                if (bbrItem.itemCode == 1) {
                  obj.insuredItems.push({
                    code: '1',
                    value: this.insuredDtoList[i].insuredName
                  })
                } else if (bbrItem.itemCode == 4) {
                  console.log(this.insuredDtoList[i])
                  obj.insuredItems.push({
                    code: '4',
                    value: this.insuredDtoList[i].insuredIdentifyNumber
                  })
                } else if (bbrItem.itemCode == 6) {
                  let userName = bbrItem.userName
                  if (userName.indexOf('***') != -1) {
                    userName = this.insuredDtoList[i].insuredMobile
                  }
                  obj.insuredItems.push({
                    code: '6',
                    value: userName
                  })
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