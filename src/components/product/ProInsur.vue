<template>
  <div class="Pro_insur">
    <mymask :loadingVisible="loadingVisible" :loadingVisibleContent="loadingVisibleContent"></mymask>
    <commonpop :showPDFPop="showPDFPop" :showCommonListPop="showCommonListPop" :showCommonContentPop="showCommonContentPop" :pdfUrl="pdfUrl" :commonListTitle="commonListTitle" :commonListArr="commonListArr" :commonContent="commonContent" @onHidePDFPop="onHidePDFPop" @onHideCommonListPop="onHideCommonListPop" @onHideCommonContentPop="onHideCommonContentPop" @onShowCommonContentPop="onShowCommonContentPop"></commonpop>
    <div>
      <!-- 宠物信息 -->
      <div class="insur" v-for='(page,i) in pagedata.page' :key="i+'pageType8'" v-if='i+1 == num'>
        <div class="policyholderinfo" v-for="(info,index) in page.types" :key="index+'pageitem'" v-if="info.pageType == 8">
          <h1>{{info.pageType | statusFilter}}</h1>
          <div class="insur_recognizee">
            <div class="itemDiv" v-for="(i) in info.items" :key='i.itemName' v-if="i.itemCode != 61 && i.itemCode != 62">
              <span class="itemSpan">{{i.itemName}}:</span>
              <!-- 宠物昵称 -->
              <input type="text" placeholder="请输入宠物昵称" v-if="i.itemCode == 58" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写宠物昵称', $event)" maxlength="20">
              <!-- 宠物类型 -->
              <select :key="index+'Selected'" v-else-if="i.isHasOption && i.itemCode==55" class="itemSelect" v-model="i.userName" @change="swithPetVariety(i.userName),handlePagedataToSession(),onSensors('填单页-选择宠物类型', $event)">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 宠物品种 -->
              <select :key="index+'Selected'" v-else-if="i.itemCode==56" class="itemSelect" v-model="i.userName" @change="handlePagedataToSession(),onSensors('填单页-选择宠物品种', $event)">
                <option v-for="itemy in petVariety" :value="itemy.name" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 宠物性别 -->
              <select :key="index+'Selected'" v-else-if="i.isHasOption && i.itemCode==57" class="itemSelect" v-model="i.userName" @change="handlePagedataToSession(),onSensors('填单页-选择宠物性别', $event)">
                <option v-for="itemy in i.options" :value="itemy.name" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 宠物年龄 -->
              <select :key="index+'Selected'" v-else-if="i.isHasOption && i.itemCode==59" class="itemSelect" v-model="i.userName" @change="handlePagedataToSession(),onSensors('填单页-选择宠物年龄', $event)">
                <option v-for="itemy in i.options" :value="itemy.name" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 宠物毛色 -->
              <input type="text" placeholder="请描述宠物毛色,5字符以内" v-else-if="i.itemCode == 60" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写宠物毛色', $event)" maxlength="5">
            </div>
            <!-- 照片上传 -->
            <div class="upload-img">
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
                    <img v-if="headImg1" :src="headImg1">
                    <img v-else src="../../../static/images/sctp.png" alt="">
                  </div>
                  <p>上传图片</p>
                  <input type="file" name="" id="file1" @change="uploadIMGYa($event,'file1')" style="display:none;">
                </div>
              </div>
            </div>
            <div class="upload-img">
              <div class="upload-img-title">请您上传宠物主与宠物合影照片</div>
              <div class="upload-img-content">
                <div>
                  <div><img src="../../../static/images/tpsl2.png" alt=""></div>
                  <p>图片示例</p>
                </div>
                <div>
                  <div @click="showUploadImg('file2'),onSensors('填单页-上传宠物与主人照片', $event)">
                    <img v-if="headImg2" :src="headImg2">
                    <img v-else src="../../../static/images/sctp.png" alt="">
                  </div>
                  <p>上传图片</p>
                  <input type="file" name="" id="file2" @change="uploadIMGYa($event,'file2')" style="display:none;">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 投保人信息 -->
      <div class="insur" v-for='(page,i) in pagedata.page' :key="i+'pageType1'" v-if='i+1 == num'>
        <div class="policyholderinfo" v-for="(info,index) in page.types" :key="index+'pageitem'" v-if="info.pageType == 1">
          <h1>{{info.pageType | statusFilter}}</h1>
          <div class="insur_recognizee">
            <div class="itemDiv" v-for="(i) in info.items" :key='i.itemName' v-if="i.isShow">
              <span class="itemSpan" v-if="i.itemCode == 1">投保人姓名</span>
              <span class="itemSpan" v-else-if="i.itemCode == 87" v-show="false">{{i.itemName}}</span>
              <span class="itemSpan" v-else-if="i.isShow">{{i.itemName}}</span>
              <!--投保人姓名-->
              <input type="text" placeholder="请输入本人姓名" v-if="i.itemCode == 1" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写投保人姓名', $event)" :maxlength="30">
              <!--证件类型-->
              <select :key="index+'Selected'" id="" v-else-if="i.isHasOption && i.itemCode==3" class="itemSelect" v-model="i.userName" @change="numChange(i,info.pageType,0),handlePagedataToSession(),onSensors('填单页-选择投保人证件类型', $event)" ref="idType">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!--证件号码-->
              <input type="text" placeholder="请输入本人证件号码" v-else-if="i.itemCode == 4" class="itemInput" v-model="i.userName" maxlength="18" @keyup="onTbrIDKeyup(i.userName)" @change='onTbrIDNoOrAge(i.itemCode,i.userName)' @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写投保人证件号', $event)">
              <!--手机号-->
              <input type="tel" placeholder="请输入本人手机号" v-else-if='i.itemCode==6' @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写投保人手机号', $event)" class="itemInput" v-model="i.userName" maxlength="11">
              <!--邮箱-->
              <input type="text" placeholder="请输入本人邮箱" v-else-if="i.itemCode == 7" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写邮箱', $event)" :maxlength="30">
              <!-- 所在地区 -->
              <input type="text" :value="i.userName" placeholder="请选择所在地区" v-else-if="i.itemCode == 12" class="itemInput" id="button1" readonly @click="getCity('button1',i),onSensors('填单页-选择所在地区', $event)" ref="dataCitynum" @focus='lostFocus'>
              <!-- 性别 -->
              <select disabled v-else-if="i.isHasOption && i.itemCode == 2" class="itemSelect" v-model="i.userName" @change="handleTbrSex(i.userName),handlePagedataToSession(),onSensors('填单页-选择投保人性别', $event)">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 出生日期 -->
              <datetime v-else-if="!i.isHasOption && i.itemCode == 5" v-model="i.userName" start-date="1900-01-01" :end-date="birthdayEndDate" placeholder="请选择出生日期" @on-cancel="handleCommentFocus(i,info.pageType,groupRiskFlag)" @on-confirm="onTbrIDNoOrAge(i.itemCode,i.userName),handlePagedataToSession()"></datetime>
              <!--是否开电子发票-->
              <div class="invoice-wrap" v-else-if="i.isHasOption && i.itemCode==41" @click="onSwitchInvoice(),onSensors('填单页-选择是否开电子发票', $event)">
                <div class="invoice-icon">
                  <img v-if="showInvoice" src="../../../static/images/checkbox_active.png" alt="">
                  <img v-else src="../../../static/images/checkbox.png" alt="">
                </div>
                <div>{{i.options[0].name}}</div>
              </div>
              <!-- 发票类型 1个人 2企业 -->
              <div class="invoiceType-wrap" v-else-if="i.isHasOption && i.itemCode==42">
                <div class="invoiceType-item" v-for="(item, index) in i.options" :key="index" @click="onInvoiceType(index,item.id),onSensors('填单页-选择发票类型', $event)" :style="{color: (index === invoiceIndex ? prdTheme : ''),border: (index === invoiceIndex ? '1px solid ' + prdTheme : '1px solid ')}">{{item.name}}</div>
              </div>
              <!--发票抬头-->
              <input type="text" placeholder="请输入发票抬头" v-else-if="!i.isHasOption && i.itemCode == 46" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写发票抬头', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!--单位名称-->
              <input type="text" placeholder="请输入单位名称" v-else-if="!i.isHasOption && i.itemCode == 43" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写单位名称', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!--纳税人识别号-->
              <input type="text" placeholder="请输入纳税人识别号" v-else-if="!i.isHasOption && i.itemCode == 44" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写纳税人识别号', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!--开户银行-->
              <input type="text" placeholder="请输入开户银行" v-else-if="!i.isHasOption && i.itemCode == 27" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写开户银行', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!--银行账号-->
              <input type="text" placeholder="请输入银行账号" v-else-if="!i.isHasOption && i.itemCode == 30" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写银行账号', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!-- 14:监护人手机号 -->
              <input type="text" placeholder="请输入监护人手机号" v-else-if='i.itemCode == 14' @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" class="itemInput" v-model="i.userName" maxlength="11">
              <!-- 31:银行预留手机号 -->
              <input type="text" placeholder="请输入银行预留手机号" v-else-if='i.itemCode == 31' @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写银行预留手机号', $event)" class="itemInput" v-model="i.userName" maxlength="11">
              <!--开户银行地址-->
              <input type="text" placeholder="请输入开户银行地址" v-else-if="!i.isHasOption && i.itemCode == 45" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写开户银行地址', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!-- 投保份数 -->
              <select v-else-if="i.itemCode == 33" class="itemSelect" v-model="i.userName" @change="commonOptionChange(i),handlePagedataToSession(),onSensors('填单页-选择投保份数', $event)">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 职业 -->
              <input type="text" placeholder="请选择职业" v-else-if="i.itemCode == 9" class="itemInput" id="button3" readonly @click="getJob('button3',i),onSensors('填单页-选择职业', $event)" ref="datajobnum" :value="i.userName" @focus='lostFocus'>
              <!-- 房屋详细地址 -->
              <input type="text" placeholder="请输入房屋详细地址" v-else-if="!i.isHasOption && i.itemCode == 40" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写房屋详细地址', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!--是否新车-->
              <select id="" v-else-if="i.isHasOption && i.itemCode==47" class="itemSelect" v-model="i.userName" @change="carChange(i.userName),handlePagedataToSession(),onSensors('填单页-选择是否新车', $event)">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!--车牌号-->
              <input type="text" :placeholder="isNewCar ? '新车':'例 京AF5566'" v-else-if="!i.isHasOption && i.itemCode == 36" id="" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写车牌号', $event)" maxlength="8" :disabled="isNewCar" @keyup="handleCommonTypeIn(i)">
              <!--车架号-->
              <input type="text" placeholder="请输入车架号" v-else-if="!i.isHasOption && i.itemCode == 35" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写车架号', $event)" maxlength="17" @keyup="handleCommonTypeIn(i)">
              <!-- 财产所在地地址 -->
              <input type="text" placeholder="请输入财产所在地地址" v-else-if="!i.isHasOption && i.itemCode == 25" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写投保人财产所在地地址', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!--详细地址-->
              <input type="text" placeholder="请输入详细地址" v-else-if="!i.isHasOption && i.itemCode == 15" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写投保人详细地址', $event)" :maxlength="fieldLenLimit(i.itemCode)">
              <!--证件有效期-->
              <select v-else-if="i.itemCode == 19" class="itemSelect" v-model="i.userName" @change="commonOptionChange(i),handlePagedataToSession(),onSensors('填单页-选择证件有效期', $event)">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 证件有效起期 -->
              <datetime v-else-if="!i.isHasOption && i.itemCode == 23" v-model="i.userName" start-date="1900-01-01" :end-date="birthdayEndDate" :placeholder="'请选择'+i.itemName" @on-cancel="handleCommentFocus(i,info.pageType,groupRiskFlag)" @on-confirm="handlePagedataToSession()"></datetime>
              <!-- 证件有效止期 -->
              <datetime v-else-if="!i.isHasOption && i.itemCode == 22" v-model="i.userName" :start-date="birthdayEndDate" end-date="2099-12-31" :placeholder="'请选择'+i.itemName" @on-cancel="handleCommentFocus(i,info.pageType,groupRiskFlag)" @on-confirm="handlePagedataToSession()"></datetime>
              <!-- 国籍 -->
              <select :key="index+'Selected'" id="" v-else-if="i.itemCode==91" class="itemSelect" v-model="i.userName" @change="numChange(i,info.pageType,0),handlePagedataToSession(),onSensors('填单页-选择国籍', $event)" disabled>
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 个人职业 -->
              <select :key="index+'Selected'" id="" v-else-if="i.itemCode==92" class="itemSelect" v-model="i.userName" @change="numChange(i,info.pageType,0),handlePagedataToSession(),onSensors('填单页-选择个人职业', $event)">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 反洗钱出单传值开关 -->
              <select v-show="false" v-else-if="i.itemCode == 87" class="itemSelect" v-model="i.userName" @change='commonOptionChange(i),handlePagedataToSession()'>
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <input type="text" :placeholder="'请输入'+i.itemName" v-else-if="!i.isHasOption && i.itemCode != 5 && i.itemCode != 22 && i.itemCode != 23" class="itemInput" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType,groupRiskFlag),handlePagedataToSession()" :maxlength="fieldLenLimit(i.itemCode)">

              <select v-else-if="i.isHasOption" class="itemSelect" v-model="i.userName" @change='commonOptionChange(i),handlePagedataToSession()'>
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
            </div>
            <div class="itemDiv" v-if="sheBaoEntries.length > 0 && groupRiskFlag == 1">
              <span class="itemSpan">社保情况</span>
              <div class="shebao-wrap">
                <div class="shebao-item" v-for="(item, index) in sheBaoEntries" :key="index" :style="{backgroundColor: (index == tbrSheBaoIndex ? prdTheme: '#fff'),color: (index == tbrSheBaoIndex ? '#fff': '#B2B2B2'),border: (index == tbrSheBaoIndex ? '1px solid ' + prdTheme : '1px solid #B2B2B2')}" @click="onTbrSheBaoSelect(item.id, index),onSensors('填单页-选择投保人社保情况', $event)">{{item.value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 被保人信息 -->
      <div class="insur" v-for='(page,i) in pagedata.page' :key="i+'pageType2'" v-if='i+1 == num'>
        <div class="policyholderinfo" v-for="(info,index) in page.types" :key="index+'pageitem'" v-if="info.pageType == 2">
          <h1 v-if='groupRiskFlag == 1'>{{info.pageType | statusFilter}} <div v-if="pagedata.minGroupNum == pagedata.maxGroupNum" class="bbrrs" :style="{color: prdTheme,border: '1px solid ' + prdTheme}">被保人人数:{{pagedata.minGroupNum}}人</div>
            <div v-else class="bbrrs" :style="{color: prdTheme,border: '1px solid ' + prdTheme}">被保人人数:{{pagedata.minGroupNum}}至{{pagedata.maxGroupNum}}人</div>
          </h1>
          <h1 v-else>{{info.pageType | statusFilter}}</h1>
          <div class="insur_recognizee">

            <!--被保人->团险新-->
            <div v-if='groupRiskFlag == 1'>
              <div class="duoBbr-wrap">
                <div class="duoBbr-item" v-for="(bbrInfo, index) in bbrInfoPopList" :key="index">
                  <template v-if="bbrInfo.userName == 1">
                    <div class="duoBbr-self">
                      <div class="duoBbr-self-left">
                        <div class="duoBbr-self-name">本人</div>
                        <template v-if="sheBaoEntries.length > 0 && tbrSheBaoIndex == idx" v-for="(item,idx) in sheBaoEntries">
                          <div class="benren-relation">{{item.value}}</div>
                        </template>
                      </div>
                      <div class="duoBbr-icon" @click="deleteBbrInfo(index)"><img src="../../../static/images/icon_delete_btn.png" alt=""></div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="duoBbr-other">
                      <div class="duoBbr-other-left">
                        <template v-for="(item,idx) in bbrInfo.otherOptionitems" v-if="item.itemCode == 1">
                          <div class="duoBbr-name">{{item.userName}}</div>
                        </template>
                        <template v-for="(item,idx) in bbrInfo.options" v-if="item.id == bbrInfo.userName">
                          <div class="duoBbr-relation">{{item.name}}</div>
                        </template>
                        <template v-if="sheBaoEntries.length > 0 && bbrInfo.bbrSheBaoIndex == idx" v-for="(item,idx) in sheBaoEntries">
                          <div class="duoBbr-relation">{{item.value}}</div>
                        </template>
                      </div>
                      <div class="duoBbr-other-right">
                        <div class="duoBbr-icon" @click="updateBbrInfo(index)"><img src="../../../static/images/icon_change_btn.png" alt=""></div>
                        <div class="duoBbr-icon" @click="deleteBbrInfo(index)"><img src="../../../static/images/icon_delete_btn.png" alt=""></div>
                      </div>
                    </div>
                    <div class="duoBbr-another" v-for="(item,idx) in bbrInfo.otherOptionitems" :key="idx" v-if="item.itemCode != 1 && item.itemCode != 3">
                      <div class="duoBbr-another-itemName" v-if="item.itemCode == 4">
                        <template v-for="(itemx,idxx) in bbrInfo.otherOptionitems" v-if="itemx.itemCode == 3">
                          {{itemx.userName | handleIDCardType}}
                        </template>
                      </div>
                      <!-- <div class="duoBbr-another-itemName" v-else>{{item.itemName}}</div> -->
                      <div class="duoBbr-another-value" v-if="item.itemCode == 4">{{item.userName}}</div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="insur_recognizee">
                <div class="addBbrInfo" @click="onShowMoreBbr" :style="{color: prdTheme}">+ 添加被保险人</div>
              </div>
            </div>
            <!--被保人->个险-->
            <div v-else>
              <!-- 与投保人关系 展示 -->
              <div class="itemBbrName-wrap" v-for="(w,index) in info.items" :key="index + 'bbrname'" v-if="w.itemCode == 8">
                <div @click="onSwitchBbrgx(idx)" class="itemBbrName" :style="{backgroundColor: (idx == showOptionIndex ? prdTheme: '#fff'),color: (idx == showOptionIndex ? '#fff': '#B2B2B2'),border: (idx == showOptionIndex ? '1px solid ' + prdTheme : '1px solid #B2B2B2')}" v-for="(itemy,idx) in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</div>
              </div>
              <div class="itemDiv" v-for="(w,index) in info.items" :key='w.itemName' v-if="w.itemCode != 8 && w.isShow">
                <span class="itemSpan" v-if="w.itemCode == 1">被保险人姓名</span>
                <span class="itemSpan" v-else-if="w.itemCode == 87" v-show="false">{{w.itemName}}</span>
                <span class="itemSpan" v-else>{{w.itemName}}</span>
                <!-- 姓名 -->
                <input type="text" placeholder="请输入被保险人姓名" v-if="w.itemCode == 1" class="itemInput" v-model="w.userName" @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写被保人姓名', $event)" maxlength="30">
                <!-- 证件类型 -->
                <select :key="'select' + index+w.itemCode" name="" id="" v-else-if="w.itemCode == 3" v-model="w.userName" @change="numChange(w,info.pageType,0),handlePagedataToSession(),onSensors('填单页-选择被保人证件类型', $event)" class="itemSelect" ref="bBRIdType">
                  <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>
                <!-- 证件号码 -->
                <input type="text" placeholder="请输入被保险人证件号码" v-else-if="w.itemCode == 4" class="itemInput" v-model="w.userName" maxlength="18" @keyup="onDanBbrIDKeyup(w.userName)" @change='onDanBbrIDNoOrAge(w.itemCode,w.userName)' @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写被保人证件号码', $event)">
                <!-- 手机号 -->
                <input type="tel" placeholder="请输入被保险人手机号" v-else-if='w.itemCode==6' @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写被保人手机号', $event)" class="itemInput" v-model="w.userName" maxlength="11">
                <!-- 性别 -->
                <select disabled :key="'select' + index+w.itemCode" v-else-if="w.itemCode == 2" v-model="w.userName" @change="numChange(w,info.pageType,0),handlePagedataToSession(),onSensors('填单页-选择被保人性别', $event)" class="itemSelect" ref="bBRIdType">
                  <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>
                <!-- 出生日期 -->
                <datetime v-else-if="w.itemCode == 5" v-model="w.userName" start-date="1900-01-01" :end-date="birthdayEndDate" :placeholder="'请选择'+w.itemName" @on-cancel="handleCommentFocus(w,info.pageType,groupRiskFlag)" @on-confirm="onDanBbrIDNoOrAge(w.itemCode,w.userName),handlePagedataToSession()"></datetime>
                <!-- 职业 -->
                <input type="text" placeholder="请选择职业" v-else-if="w.itemCode == 9" class="itemInput" id="button4" readonly @click="getJob('button4',w),onSensors('填单页-选择职业', $event)" ref="dataCitynum" :value="w.userName">
                <!-- 详细地址 -->
                <input type="text" placeholder="请输入详细地址" v-else-if="w.itemCode == 15" class="itemInput" v-model="w.userName" @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写被保人详细地址', $event)" maxlength="30">
                <!-- 财产所在地地址 -->
                <input type="text" placeholder="请输入财产所在地地址" v-else-if="w.itemCode == 25" class="itemInput" v-model="w.userName" @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" @click="onSensors('填单页-填写被保人财产所在地地址', $event)" maxlength="30">

                <input type="tel" :placeholder="'请输入'+w.itemName" v-else-if='w.itemCode == 14 || w.itemCode == 31' @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" class="itemInput" v-model="w.userName" maxlength="11">
                <!--邮箱-->
                <input type="text" placeholder="请输入邮箱" v-else-if="w.itemCode == 7" class="itemInput" v-model="w.userName" @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" :maxlength="30" @click="onSensors('填单页-填写被保人邮箱', $event)">
                <!--证件有效期-->
                <select v-else-if="w.itemCode == 19" class="itemSelect" v-model="w.userName" @change="onChangeDanbbrzjyxq(w),handlePagedataToSession(),onSensors('填单页-选择证件有效期', $event)">
                  <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>
                <!-- 证件有效起期 -->
                <datetime v-else-if="w.itemCode == 23" v-model="w.userName" start-date="1900-01-01" :end-date="birthdayEndDate" placeholder="请选择证件有效起期" @on-cancel="handleCommentFocus(w,info.pageType,groupRiskFlag)" @on-confirm="handlePagedataToSession()"></datetime>
                <!-- 证件有效止期 -->
                <datetime v-else-if="w.itemCode == 22" v-model="w.userName" :start-date="birthdayEndDate" end-date="2099-12-31" placeholder="请选择证件有效止期" @on-cancel="handleCommentFocus(w,info.pageType,groupRiskFlag)" @on-confirm="handlePagedataToSession()"></datetime>
                <!-- 国籍 -->
                <select :key="index+'Selected'" v-else-if="w.itemCode==91" class="itemSelect" v-model="w.userName" @change="handlePagedataToSession(),onSensors('填单页-选择国籍', $event)" disabled>
                  <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>
                <!-- 个人职业 -->
                <select :key="index+'Selected'" id="" v-else-if="w.itemCode==92" class="itemSelect" v-model="w.userName" @change="handlePagedataToSession(),onSensors('填单页-选择个人职业', $event)">
                  <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>
                <!-- 反洗钱出单传值开关 -->
                <select v-else-if="w.itemCode == 87" v-show="false" class="itemSelect" v-model="w.userName" @change='commonOptionChange(w),handlePagedataToSession()'>
                  <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>

                <input type="text" :placeholder="'请输入'+w.itemName" v-else-if="!w.isHasOption && w.itemCode != 5 && w.itemCode != 22 && w.itemCode != 23" class="itemInput" v-model="w.userName" @blur="handleCommentFocus(w,info.pageType,groupRiskFlag),handlePagedataToSession()" maxlength="30">

                <select :key="'select' + index+w.itemCode" name="" id="" v-else-if="w.isHasOption &&  w.itemCode != '8'" v-model="w.userName" @change='numChange(w,info.pageType,0),handlePagedataToSession()' class="itemSelect" ref="bBRIdType">
                  <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 标的信息 -->
      <div class="insur" v-for='(page,i) in pagedata.page' :key="i+'pageType7'" v-if='i+1 == num'>
        <div class="policyholderinfo" v-for="(info,index) in page.types" :key="index+'pageitem'" v-if="info.pageType == 7">
          <h1>{{info.pageType | statusFilter}}</h1>
          <div class="insur_recognizee">
            <div class="itemDiv" v-for="(i) in info.items" :key='i.itemName' v-if="singleTargetFlag && i.itemCode != 69">
              <span class="itemSpan">{{i.itemName}}</span>
              <!-- 品牌 -->
              <input type="text" placeholder="请输入品牌" v-if="i.itemCode == 76" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" @click="onSensors('填单页-填写品牌', $event)" maxlength="20">
              <!-- 型号 -->
              <input type="text" placeholder="请输入型号" v-else-if="i.itemCode == 77" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" @click="onSensors('填单页-填写型号', $event)" maxlength="50">
              <!-- 出厂序列号 -->
              <input type="text" placeholder="请输入出厂序列号" v-else-if='i.itemCode==78' class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" @click="onSensors('填单页-填写出厂序列号', $event)" maxlength="50">
              <!-- 车牌号 -->
              <input type="text" :placeholder="isNewCar ? '新车':'请输入车牌号'" v-else-if="i.itemCode == 36 || i.itemCode == 95" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" maxlength="8" :disabled="isNewCar" @keyup="handleCommonTypeIn(i)" @click="onSensors('填单页-填写车牌号', $event)">
              <!-- 营业面积 -->
              <input type="text" placeholder="请输入营业面积" v-else-if="i.itemCode == 80" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" @click="onSensors('填单页-填写营业面积', $event)" maxlength="7">
              <!-- 详细地址 -->
              <input type="text" placeholder="请输入详细地址" v-else-if="i.itemCode == 15" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" @click="onSensors('填单页-填写标的详细地址', $event)">
              <!-- 车辆初登日期 -->
              <datetime v-else-if="!i.isHasOption && i.itemCode == 79" v-model="i.userName" start-date="1900-01-01" :end-date="birthdayEndDate" :placeholder="'请选择'+i.itemName" @on-confirm="handlePagedataToSession(),onSensors('填单页-选择车辆初登日期', $event)"></datetime>
              <!-- 宠物品种 -->
              <select :key="index+'Selected'" v-else-if="i.itemCode==56" class="itemSelect" v-model="i.userName" @change="handlePagedataToSession(),onSensors('填单页-选择宠物品种', $event)">
                <option v-for="itemy in dogType" :value="itemy.name" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 宠物芯片号 -->
              <input type="text" placeholder="请输入宠物芯片号" v-else-if="i.itemCode == 81" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" @click="onSensors('填单页-填写宠物芯片号', $event)" maxlength="20">
              <!--是否新车-->
              <select id="" v-else-if="i.isHasOption && i.itemCode==47" class="itemSelect" v-model="i.userName" @change="onIsNewCarOrNot(i.userName),handlePagedataToSession(),onSensors('填单页-选择是否新车', $event)">
                <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!--车架号-->
              <input type="text" :placeholder="isNewCar ? '请输入车架号':'非新车无需输入'" v-else-if="i.itemCode == 35" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" maxlength="17" :disabled="!isNewCar" @keyup="handleCommonTypeIn(i)" @click="onSensors('填单页-填写车架号', $event)">
              <!--车架号-->
              <input type="text" placeholder="请输入车架号" v-else-if="i.itemCode == 94" class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" maxlength="17" @keyup="handleCommonTypeIn(i)" @click="onSensors('填单页-填写车架号', $event)">
              <!--行业-->
              <input type="text" :value="i.userName" placeholder="请选择行业" v-else-if="i.itemCode == 82" class="itemInput" id="button82" readonly @click="getItemType('button82',i),onSensors('填单页-选择行业', $event)" @focus='lostFocus'>
              <!--标的细类-->
              <input type="text" :value="i.userName" placeholder="请选择标的细类" v-else-if="i.itemCode == 83" class="itemInput" id="button83" readonly @click="getItemType('button83',i),onSensors('填单页-选择标的细类', $event)" @focus='lostFocus'>
              <!--企业性质-->
              <input type="text" :value="i.userName" placeholder="请选择企业性质" v-else-if="i.itemCode == 84" class="itemInput" id="button84" readonly @click="getItemType('button84',i),onSensors('填单页-选择企业性质', $event)" @focus='lostFocus'>
              <!--建筑结构-->
              <input type="text" :value="i.userName" placeholder="请选择建筑结构" v-else-if="i.itemCode == 85" class="itemInput" id="button85" readonly @click="getItemType('button85',i),onSensors('填单页-选择建筑结构', $event)" @focus='lostFocus'>

              <input type="text" :placeholder="'请输入'+i.itemName" v-else class="itemInput" v-model="i.userName" @blur="handleCheckTarget(i),handlePagedataToSession()" maxlength="8" @keyup="i.userName = i.userName.toUpperCase()">
            </div>
            <div class="upload-img" v-for="(i) in info.items" :key='i.itemName' v-if="singleTargetFlag && i.itemCode == 69">
              <div class="upload-img-title">请上传营业执照（图片清晰，无PS，光线明亮）</div>
              <div class="upload-img-content" style="justify-content: center;">
                <!-- <div>
                <div>
                  <img src="../../../static/images/tpsl.png" alt="">
                </div>
                <p>图片示例</p>
              </div> -->
                <div>
                  <div @click="showUploadImg('yyzzFile'),onSensors('填单页-上传营业执照', $event)">
                    <img v-if="yyzzImg" :src="yyzzImg">
                    <img v-else src="../../../static/images/sctp.png" alt="">
                  </div>
                  <p>上传图片</p>
                  <input type="file" name="" id="yyzzFile" @change="uploadIMGYa($event,'yyzzFile')" style="display:none;">
                </div>
              </div>
            </div>
            <div class="target-wrap" v-if="manyTargetFlag">
              <div class="target-item" v-for="(target, index) in targetPopList" :key="index">
                <div class="target-item-top">
                  <div class="target-item-top-left">
                    <span>{{'标的' + (index + 1)}}</span>
                  </div>
                  <div class="target-item-top-right">
                    <div class="target-item-top-right-icon" @click="updateTargetInfo(index)"><img src="../../../static/images/icon_change_btn.png" alt=""></div>
                    <div class="target-item-top-right-icon" @click="deleteTargetInfo(index)"><img src="../../../static/images/icon_delete_btn.png" alt=""></div>
                  </div>
                </div>
                <div class="target-item-bottom">
                  <div class="target-item-bottom-item" v-for="(item,idx) in target.otherOptionitems">
                    <span>{{item.itemName}}：</span>
                    <span>{{item.userName}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="addBbrInfo" @click="onShowTargetPop" :style="{color: prdTheme}" v-if="manyTargetFlag">+ 添加标的信息</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 保险信息 -->
    <div class="insur">
      <div class="policyholderinfo">
        <h1>保障详情</h1>
        <div class="insur_recognizee">
          <div class="itemDiv">
            <span class="itemSpan">保障方案</span>
            <div>{{currentStyleName}}</div>
          </div>
          <div class="itemDiv">
            <span class="itemSpan">保障期限</span>
            <div class="insurDate-wrap">
              <div class="icon-data-wrap"><img src="../../../static/images/icon_date.png" alt=""></div>
              <div class="insurDate">
                <datetime v-if="isAvailableStartDate" readonly v-model="startDate" :start-date="qibaoStartDate" :end-date="qibaoEndDate" placeholder="起保日期" @on-confirm="changeStartTime()"></datetime>
                <datetime v-else v-model="startDate" :start-date="qibaoStartDate" :end-date="qibaoEndDate" placeholder="起保日期" @on-confirm="changeStartTime($event)"></datetime>
              </div>
              <div class="zhi">至</div>
              <div class="insurDate">
                <datetime v-if='pagedata.insuranceIntervalType == 0' v-model="endDate" readonly placeholder="结束日期"></datetime>
                <datetime v-else-if='pagedata.insuranceIntervalType==1' v-model="endDate" :start-date="zhongbaoStartDate" :end-date="zhongbaoEndDate" placeholder="结束日期"></datetime>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 多 标的信息 的弹框 -->
    <transition name=moreBbr>
      <div class="moreBbr-wrap" v-if="showTargetPop">
        <div class="moreBbr-title-wrap">
          <div class="back" @click="onHideTargetPop">
            <img style="width:.1rem;height: .15rem;" src="../../../static/images/fhjt.png" alt="">
          </div>
          <div class="moreBbr-title">标的信息</div>
        </div>
        <div class="moreBbr-content">
          <div class="group-item-insur">
            <div class="itemDiv" v-for="(targetItem, index) in targetPop.otherOptionitems" :key="index+'group-items-info'">
              <span class="itemSpan">{{targetItem.itemName}}</span>
              <input type="text" placeholder="请输入品牌" v-if="targetItem.itemCode == 76" class="itemInput" v-model="targetItem.userName" @blur="onScrollBottom(),onTargetPopCheck(targetItem)" @click="onSensors('填单页-填写品牌', $event)">
              <input type="text" placeholder="请输入型号" v-else-if="targetItem.itemCode == 77" class="itemInput" v-model="targetItem.userName" @blur="onScrollBottom(),onTargetPopCheck(targetItem)" @click="onSensors('填单页-填写型号', $event)">
              <input type="text" placeholder="请输入出厂序列号" v-else-if="targetItem.itemCode == 78" class="itemInput" v-model="targetItem.userName" @blur="onScrollBottom(),onTargetPopCheck(targetItem)" @click="onSensors('填单页-填写出厂序列号', $event)">
            </div>
          </div>
        </div>
        <div class="moreBbr-bottom-wrap">
          <div class="moreBbr-bottom-btn" :style="{backgroundColor: prdTheme}" @click="addTargetPopList">确定</div>
        </div>
      </div>
    </transition>
    <!-- 多个被保人信息填写弹框 -->
    <transition name=moreBbr>
      <div class="moreBbr-wrap" v-if="showMoreBbr">
        <div class="moreBbr-title-wrap">
          <div class="back" @click="onHideMoreBbr">
            <img style="width:.1rem;height: .15rem;" src="../../../static/images/fhjt.png" alt="">
          </div>
          <div class="moreBbr-title">被保人</div>
        </div>
        <div class="moreBbr-content">
          <div class="group-item-insur">
            <div class="wstb">为谁投保</div>
            <div class="itemBbrName-wrap">
              <div class="itemBbrName" :style="{backgroundColor: (idx == bbrPopIndex ? prdTheme: '#fff'),color: (idx == bbrPopIndex ? '#fff': '#B2B2B2'),border: (idx == bbrPopIndex ? '1px solid ' + prdTheme : '1px solid #B2B2B2')}" v-for="(itemy,idx) in bbrInfoPop.options" :value="itemy.id" :key="idx" @click="onSwitchBbrPop(idx, itemy.id)">{{itemy.name}}</div>
            </div>

            <div class="itemDiv" v-for="(w,indexx) in bbrInfoPop.otherOptionitems" :key="indexx+'group-items-info'" v-if="w.isShow && w.itemCode != 8">
              <span class="itemSpan" v-if="w.itemCode == 1">被保险人姓名</span>
              <span class="itemSpan" v-else-if="w.itemCode == 87" v-show="false">{{w.itemName}}</span>
              <span class="itemSpan" v-else>{{w.itemName}}</span>

              <!-- 姓名 -->
              <input type="text" placeholder="请输入被保险人姓名" v-if="w.itemCode == 1" class="itemInput" v-model="w.userName" @blur="onScrollBottom(),onBbrInfoPopCheck(w)" @click="onSensors('填单页-填写被保人姓名', $event)" maxlength="30">
              <!--证件类型-->
              <select :key="indexx+'group--index'" v-else-if="w.isHasOption &&  w.itemCode == 3" class="itemSelect" v-model="w.userName" @change="numChangeDuoBbr(w),onSensors('填单页-选择被保人证件类型', $event)">
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 证件号码 -->
              <input type="text" placeholder="请输入被保险人证件号码" v-else-if="w.itemCode == 4" class="itemInput" v-model="w.userName" maxlength="18" @keyup="onDuoBbrIDKeyup(w.userName)" @blur="onScrollBottom(),onBbrInfoPopCheck(w)" @change='onDuoBbrIDChange(w.itemCode,w.userName)' @click="onSensors('填单页-填写被保人证件号码', $event)">
              <!-- 手机号 -->
              <input type="tel" placeholder="默认为投保人手机号" v-else-if='w.itemCode==6' @blur="onScrollBottom(),onBbrInfoPopCheck(w)" @click="onSensors('填单页-填写被保人手机号', $event)" class="itemInput" v-model="w.userName" maxlength="11">
              <!-- 性别 -->
              <select disabled :key="indexx+'group--index'" v-else-if="w.isHasOption &&  w.itemCode == 2" class="itemSelect" v-model="w.userName" @change="onSensors('填单页-选择被保人性别', $event)">
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 出生日期 -->
              <datetime v-else-if="w.itemCode == 5" v-model="w.userName" start-date="1900-01-01" :end-date="birthdayEndDate" :placeholder="'请选择'+w.itemName" @on-cancel="onBbrInfoPopCheck(w)"></datetime>
              <!-- 职业 -->
              <input type="text" placeholder="请选择职业" v-else-if="w.itemCode == 9" class="itemInput" id="button6" readonly @click="getJob('button6',w),onSensors('填单页-选择职业', $event)" ref="datajobnum" :value="w.userName">
              <!-- 详细地址 -->
              <input type="text" placeholder="请输入详细地址" v-else-if="w.itemCode == 15" class="itemInput" v-model="w.userName" @blur="onScrollBottom(),onBbrInfoPopCheck(w)" @click="onSensors('proInsur_tianxiebeibaorenxiangxidizhi', '填单页-填写被保人详细地址')" maxlength="30">
              <!--邮箱-->
              <input type="text" placeholder="请输入邮箱" v-else-if="w.itemCode == 7" class="itemInput" v-model="w.userName" @blur="onScrollBottom()" :maxlength="30" @click="onSensors('填单页-填写被保人邮箱', $event)">

              <input type="text" placeholder="请选择所在地区" v-else-if="w.itemCode == 12" class="itemInput" id="button5" readonly @click="getCity('button5',w)" ref="dataCitynum" :value="w.userName">
              <!--证件有效期-->
              <select v-else-if="w.itemCode == 19" class="itemSelect" v-model="w.userName" @change="onChangeDuobbrzjyxq(w),handlePagedataToSession(),onSensors('填单页-选择证件有效期', $event)">
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 证件有效起期 -->
              <datetime v-else-if="w.itemCode == 23" v-model="w.userName" start-date="1900-01-01" :end-date="birthdayEndDate" placeholder="请选择证件有效起期" @on-cancel="handleCommentFocus(w,info.pageType,groupRiskFlag)" @on-confirm="handlePagedataToSession()"></datetime>
              <!-- 证件有效止期 -->
              <datetime v-else-if="w.itemCode == 22" v-model="w.userName" :start-date="birthdayEndDate" end-date="2099-12-31" placeholder="请选择证件有效止期" @on-cancel="handleCommentFocus(w,info.pageType,groupRiskFlag)" @on-confirm="handlePagedataToSession()"></datetime>
              <!-- 国籍 -->
              <select :key="indexx+'Selected'" v-else-if="w.itemCode==91" class="itemSelect" v-model="w.userName" @change="handlePagedataToSession(),onSensors('填单页-选择国籍', $event)" disabled>
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 个人职业 -->
              <select :key="indexx+'Selected'" id="" v-else-if="w.itemCode==92" class="itemSelect" v-model="w.userName" @change="handlePagedataToSession(),onSensors('填单页-选择个人职业', $event)">
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!-- 反洗钱出单传值开关 -->
              <select v-else-if="w.itemCode == 87" v-show="false" class="itemSelect" v-model="w.userName" @change='commonOptionChange(w),handlePagedataToSession()'>
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>

              <input type="text" :placeholder="'请输入'+w.itemName" v-else-if='w.itemCode == 14 || w.itemCode == 31' @blur="onScrollBottom(),onBbrInfoPopCheck(w)" class="itemInput" v-model="w.userName" maxlength="11">

              <input type="text" :placeholder="'请输入'+w.itemName" v-else-if="!w.isHasOption && w.itemCode != 5 && w.itemCode != 22 && w.itemCode != 23" class="itemInput" v-model="w.userName" @blur="onScrollBottom(),onBbrInfoPopCheck(w)" maxlength="30">

              <select :key="indexx+'group--index'" v-else-if="w.isHasOption &&  w.itemCode != '8'" class="itemSelect" v-model="w.userName">
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
            </div>
            <div class="itemDiv" v-if="sheBaoEntries.length > 0 && bbrInfoPop.userName != 1">
              <span class="itemSpan">社保情况</span>
              <div class="shebao-wrap">
                <div class="shebao-item" v-for="(item, index) in sheBaoEntries" :key="index" :style="{backgroundColor: (index == sheBaoIndex ? prdTheme: '#fff'),color: (index == sheBaoIndex ? '#fff': '#B2B2B2'),border: (index == sheBaoIndex ? '1px solid ' + prdTheme : '1px solid #B2B2B2')}" @click="onBbrSheBaoSelect(item.id, index),onSensors('填单页-选择被保人社保情况', $event)">{{item.value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="moreBbr-bottom-wrap">
          <div class="moreBbr-bottom-btn" :style="{backgroundColor: prdTheme}" @click="addBbrInfoList">确定</div>
        </div>
      </div>
    </transition>
    <!-- 适配iphoneX -->
    <div class="kongbai"></div>
    <transition name="background">
      <div class="syr-popbox" v-if="showBbrPriceDetail" style="z-index:1" @click="onCloseBbrPriceDetail"></div>
    </transition>
    <transition name="bbrPriceDetail">
      <!-- 多被保人不共享保费时，展示每个被保人的价格明细 -->
      <div class="bbrPriceDetail" v-if="showBbrPriceDetail">
        <div class="bbrPriceDetail-head">
          <div class="bbrPriceDetail-head-name">被保人及价格明细</div>
        </div>
        <div class="bbrPriceDetail-body">
          <div class="bbrPriceDetail-body-item" v-for="(item, index) of bbrInfoPopList" :key="index">
            <template v-if="item.userName == 1">
              <div class="bbrPriceDetail-body-item-name">本人</div>
            </template>
            <template v-else>
              <template v-for="(subItem, subIndex) of item.otherOptionitems" v-if="subItem.itemCode == 1">
                <div class="bbrPriceDetail-body-item-name" :key="subIndex">{{subItem.userName}}</div>
              </template>
            </template>
            <div class="bbrPriceDetail-body-item-value">￥{{item.premium}}</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 底部 -->
    <div class="proInsur-foot">
      <!-- 同意协议 展示部分-->
      <Xieyi :checkedFlag="checkedFlag" :khsIsReadFlag="khsIsReadFlag" :khsPopShowFlag="khsPopShowFlag" :khsArr="khsArr" @onSwitchCheckedFlag="onSwitchCheckedFlag" @onClickYuqr="onClickYuqr" @onHideKhsPop="onHideKhsPop" @onClickKhsTab="onClickKhsTab" @onShowCommonContentPop="onShowCommonContentPop" @onClickTabBtn="onClickTabBtn"></Xieyi>
      <div class="foot-wrap">
        <div class="icon-wrap">
          <a :href="customerService" @click="onClickKf">
            <img :src="customerLogo" />
          </a>
        </div>
        <div class="money-wrap">
          <!-- <div class="money-value" v-if="pagedata.giveInsurance == 1">&yen;{{money * tbNum * targetNum}}</div> -->
          <template v-if="pagedata.giveInsurance == 1">
            <template v-if="common.checkMsgNull(discount)">
              <div class="qk2">
                <div class="top">￥{{(newPriceObj.discountPrice * tbNum * targetNum).toFixed(2)}}</div>
                <div class="bottom line">￥{{(newPriceObj.price * tbNum * targetNum).toFixed(2)}}</div>
              </div>
            </template>
            <template v-else-if="common.checkMsgNull(monthPayType) && monthPayType == 1">
              <div class="qk1">￥{{(newPriceObj.price * tbNum * targetNum).toFixed(2)}}</div>
            </template>
            <template v-else-if="common.checkMsgNull(monthPayType) && monthPayType == 12 && common.checkMsgNull(firstPremium)">
              <div class="qk2">
                <div class="top">首月￥{{(newPriceObj.firstMonthPrice * tbNum).toFixed(2)}}</div>
                <div class="bottom">次月￥{{(newPriceObj.otherMonthPrice * tbNum).toFixed(2)}}/月</div>
              </div>
            </template>
            <template v-else-if="common.checkMsgNull(monthPayType) && monthPayType == 12 && !common.checkMsgNull(firstPremium)">
              <div class="qk1">￥{{(newPriceObj.averageMonthPrice * tbNum).toFixed(2)}}<span>/月</span></div>
            </template>
            <template v-else>
              <div class="qk1">￥{{(newPriceObj.price * tbNum * targetNum).toFixed(2)}}</div>
            </template>
          </template>
          <div class="money-value" v-else-if="pagedata.giveInsurance == 0">&yen;0</div>
          <div class="money-wrap-icon" @click="onShowBbrPriceDetail" v-show="false" v-if="pagedata.isSharedPremium == 1 && groupRiskFlag == 1 && monthPayType != 12">
            <img src="../../../static/images/icon_syr.png" alt="">
          </div>
        </div>
        <div class="ljzf" @click="topay(),onSensors('填单页-点击立即支付', $event)" v-if="pagedata.giveInsurance == 1" :style="{backgroundColor: prdTheme}">立即支付</div>
        <div class="ljzf" @click="topay(),onSensors('填单页-点击立即支付', $event)" v-else-if="pagedata.giveInsurance == 0" :style="{backgroundColor: prdTheme}">免费投保</div>
      </div>
    </div>
    <!--弹框提示-->
    <div class="popW" v-if="renewInsurResultPop.isShow">
      <div class="popBox">
        <p>已有理赔记录，请您续保原产品</p>
        <div class="popBtn"><button @click="gotoRenewInsurance2018">确定</button></div>
      </div>
    </div>
    <BbrPopPage :showBbrPopPage="showBbrPopPage" @onBbrPopPage="onBbrPopPage" @onHideBbrPopPage="onHideBbrPopPage" :channelName="channelName"></BbrPopPage>

  </div>
</template>

<script>

import { EXIF } from '../../../static/exif'
import { dogType, catType } from '../../../static/petType'
import Jquery from "jquery";
import {
  Toast,
  Indicator
} from "mint-ui";
import {
  itemType
} from "./itemType.js";
import {
  address
} from "./city.js";
import {
  job
} from "./job.js";
import {
  sessionOperation
} from '../../util/util.js'
import cityData from "./city.json";
import jobData from "./job.json";
import "./city.css";
import "./job.css";
import weixin from 'weixin-js-sdk';
import "./jweixin-1.4.0.js";
import { Datetime } from 'vux'
import { sign } from 'crypto';

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

//获取年龄（岁）
function GetAge(identityCard, startDate, cardType) {
  if (cardType == '1') {//大陆身份证身份证
    var len = (identityCard + "").length;
    if (len == 0) {
      return 0;
    } else {
      if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
      {
        return 0;
      }
    }
    var strBirthday = "";
    if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
    {
      strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
      strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
  } else {//非大陆身份证(户口本、护照、港澳通行证等)
    var strBirthday = identityCard.replace(new RegExp('-', 'g'), '/');//出生日期替换
  }

  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);//出生日期
  var nowDateTime = new Date(startDate);//起保日期

  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--;
  }
  return age
}
//获取年龄（天）
function GetDay(identityCard, startDate, cardType) {
  if (cardType == '1') {//大陆身份证身份证
    var len = (identityCard + "").length;
    if (len == 0) {
      return 0;
    } else {
      if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
      {
        return 0;
      }
    }
    var strBirthday = "";
    if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
    {
      strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
      strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
  } else {//非大陆身份证(户口本、护照、港澳通行证等)
    var strBirthday = identityCard.replace(new RegExp('-', 'g'), '/');//出生日期替换
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);//出生日期
  var nowDateTime = new Date(startDate);//起保日期
  //  var day = birthDate.getDate(); //获取出生总天数
  var day = parseInt((nowDateTime.getTime() - birthDate.getTime()) / (24 * 60 * 60 * 1000));//获取出生总天数

  return day
}

function getAgeIndex(upParams) {
  var calcIdKeys = [];
  calcIdKeys = upParams.calcIdKeys;
  console.log("属性" + JSON.stringify(calcIdKeys) + "**" + calcIdKeys.length);
  for (var l = 0; l < calcIdKeys.length; l++) {
    console.log("属性" + "年龄" == calcIdKeys[l] + "**" + calcIdKeys[l]);
    if ("年龄" == calcIdKeys[l]) {
      //  upParams.calcIds[l] = entry.id;
      //移除 该数组
      //delete upParams.calcIdKeys;
      console.log('年龄属性下标发送====>' + JSON.stringify(l));
      return l;
    }
  }
}
//是否符合投保
function isContent(spaceBewteen, age, day) {
  // spaceBetween => 30天-70岁 || 18岁-60岁 || 18岁
  // age = 0 || 1 || 2 || ...
  var agelist = spaceBewteen.split('-');

  //  console.log(spaceBewteen);
  //假如区间只有18岁或19岁
  if (agelist.length === 1) {
    if ((age - 0) === (agelist[0].slice(0, -1) - 0)) {
      // 满足条件
      return true
    } else {
      return false
    }
  } else {
    // 有区间范围
    let flag = true
    let num = 0
    agelist.forEach(item => {
      // 有天
      if (item.indexOf('天') !== -1) {
        flag = false
        num++
      }
    })
    if (flag) {
      // 只有岁 ['18岁', '60岁']
      if ((age - 0) >= (agelist[0].slice(0, -1) - 0) && (age - 0) <= (agelist[1].slice(0, -1) - 0)) {
        return true
      } else {
        return false
      }
    } else {
      // 有天有岁 ['30天', '60岁']
      if (num === 1) {
        if ((day - 0) >= (agelist[0].slice(0, -1) - 0) && (age - 0) <= (agelist[1].slice(0, -1) - 0)) {
          return true
        } else {
          return false
        }
      } else {
        if ((day - 0) >= (agelist[0].slice(0, -1) - 0) && (day - 0) <= (agelist[1].slice(0, -1) - 0)) {
          return true
        } else {
          return false
        }
      }
    }
  }
}

function dateMinus(sd, ed) {
  var edate = new Date(ed.replace(/-/g, "/"));//零点开始,例2018-12-28 00:00:00
  var days = edate.getTime() - (sd.getTime() - 8 * 3600 * 1000);//时区晚八小时,减去
  var day = parseInt((days / (1000 * 60 * 60 * 24)) + 1);//因为从零点开始,需要加上一天
  return day;
}
/**
 *
 * @param arr 数组，元素是对象
 * @param field 对象某个属性
 * @param value 对象某个属性的值
 * @return false 或 数字 >=0
 */
function indexOfArr(arr, field, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][field] == value) {
      return i;
    }
  }
  return false;
}

function nospace(str) {
  if (str != null && str != undefined) {
    return str.replace(/\s+/g, "");
  } else {
    return "";
  }
}


function formatDateTime(inputTime) {
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
  //  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  return y + '-' + m + '-' + d;
};


import BbrPopPage from '@/components/newComponents/bbrPopPage/BbrPopPage.vue'
import Xieyi from '@/components/newComponents/xieyi/Xieyi.vue'
import Commonpop from '@/components/newComponents/commonpop/Commonpop.vue'
import Mymask from '@/components/newComponents/mymask/Mymask.vue'
export default {
  components: {
    Datetime,
    BbrPopPage,
    Xieyi,
    Commonpop,
    Mymask
  },
  name: "ProInsur",
  props: ["id", "itemid", "Code"], //id生成订单编号
  data() {
    return {
      startTime: new Date().getTime(),
      isBodyFixed: false, // 当前页面是否是锁定状态
      showPDFPop: false,
      showCommonListPop: false, // 是否展示通用列表弹框 标识
      showCommonContentPop: false, // 是否展示通用内容弹框 标识
      pdfUrl: '',
      commonListArr: [], // 通用列表数组
      commonListTitle: '', // 通用列表弹框中的顶部标题
      commonContent: {}, // ；通用弹框展示内容
      khsArr: [], // 可回溯数组
      khsPopShowFlag: false,
      khsIsReadFlag: false,
      showBbrPopPage: false,
      newPriceObj: {},// 
      isCache: false,
      targetInfo: [],// 标的信息字段数组
      singleTargetFlag: false,// 单 标的信息 展示标识
      manyTargetFlag: false,// 多 标的信息 展示标识
      updateTargetPopFlag: false,// 多 标的信息 时，当前状态是否是更新编辑状态
      updateTargetPopIndex: '',// 多 标的信息 时，当前更新的下标
      targetPop: {},
      targetPopList: [],
      showTargetPop: false,// 是否展示 标的信息 弹框
      cityData: {},
      itemType82Data: [],
      itemType83Data: [],
      itemType84Data: [],
      itemType85Data: [],
      tbNum: 1,// 投保份数
      targetNum: 1,// 标的数量
      showBbrPriceDetail: false,
      hasClickBbrQueDingBtn: false,// 是否点击了确定按钮(防止出现多次触发的情况)
      tbrSheBaoId: '',
      tbrSheBaoIndex: 0,
      sheBaoId: '',
      sheBaoIndex: 0,
      sheBaoEntries: [],// 社保区间数组
      tbrPremium: 0,
      tbrItemId: '',
      updateBbrInfoPopFlag: false,
      updateBbrInfoPopIndex: '',
      bbrPopIndex: 0, // 与投保人关系当前索引
      bbrInfoPop: {},
      bbrInfoPopList: [],
      showMoreBbr: false,
      showOptionIndex: 0,
      clientInfo: {},
      showInvoice: false,
      prdTheme: window.sessionStorage.getItem('prdTheme'),
      customerService: window.sessionStorage.getItem('customerService'),
      customerLogo: window.sessionStorage.getItem('customerLogo'),
      currentStyleName: window.sessionStorage.getItem('currentStyleName'),
      qibaoStartDate: this.formatDate(new Date(), 'yyyy-MM-dd'),// 起保日期限定最小日期
      qibaoEndDate: this.formatDate(new Date(new Date().getTime() + 3600 * 24 * 1000 * 365), 'yyyy-MM-dd'),// 起保日期限定最大日期，
      zhongbaoStartDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
      zhongbaoEndDate: this.formatDate(new Date(new Date().getTime() + 3600 * 24 * 1000 * 365), 'yyyy-MM-dd'),
      birthdayEndDate: this.formatDate(new Date(), "yyyy-MM-dd"), // 出生日期不能超过当前时间
      petVariety: [],
      dogType: dogType,
      catType: catType,
      headImg1: '',
      headImg2: '',
      yyzzImg: '',
      lastDateString: '00:00:00',
      endLastDateString: '23:59:59',
      isEdit: false,
      time: "",
      icon: "aa.png",
      typeNum: "",
      count: 1,
      info12: {},
      value: "",
      pagedata: {}, //page 数据
      num: 1, //当前显示页数
      popupVisibleselect: false, // 下拉框弹窗
      popupVisiblecontacts: false, //常用联系人弹窗
      popup: false,
      linkvalue: "",
      linkoptions: [], // 常用联系人 radio的选项
      option: {},
      boole: "", // 是否是下拉框
      popupVisible: "",
      userName: "",
      money: "", // 立即支付金额
      petsItems: [],//宠物信息
      targets: [],//核保请求报文中的标的信息
      paramstopay: {}, // 立即支付的参数
      // paramsToCreate:{},//创建保单入参
      policyHolders: [], // 投保人信息
      insureds: [], // 被保人信息
      beneficiary: [], // 受益人信息
      // insuredItems:[],//被保人信息具体数据
      itemId: this.$route.query.id, // 支付参数 itemid
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode,//机构code
      linkmanId: "", //常用联系人 id
      linkmandata: [], //常用联系人 回显
      flag: false, // 阅读同意
      linkIf: false, //常用联系人的弹框是否显示
      indexItem: "", //input选中的下标值
      options: [{
        value: "1",
        lable: "q"
      }], // 阅读同意
      pickerValue: "",
      value: new Date(), //定义显示时间
      visible: false,
      startTime: "",
      endTime: "",
      centers: "",
      channelName: window.sessionStorage.getItem('channelName'),
      pointKey: window.sessionStorage.getItem('pointKey'),
      startDate: "",
      endDate: "",
      ordercode: "", //订单编号
      state: "",
      switch: true,
      jsonData: {},
      _json: [],
      _address: null,
      _key: ["cityList", "countyList"],
      // 日期
      jsonData: {},
      sfzHao: "",
      surnameSelf: [], //被保人本人公用内容
      unSurnameSelf: [], //被保人本人单独的内容
      insureApplicant: [], //被保人数组
      benrenShow: [], //被保人是本人的需要展示的数据
      duoyuShow: [], //被保人不是本人展示数据
      checkedFlag: false,
      startDate: null,
      isData: true, //判断输入的日期时候对
      groupRiskFlag: 0, // 1 为团险 0 为个人险
      otherShows: [],
      noBenRenInfo: {},
      sessionOper: sessionOperation(),
      res: {},
      startDateToEnd: '',
      startDateRange: '',
      loadingVisible: true,
      loadingVisibleContent: '',
      noRequiredField: ['36', '38', '39', '46', '27', '30', '31', '45'],//非必填字段
      urlParam: window.sessionStorage.getItem('urlParam'),
      payFlag: null,//null：阳光支付,"1"：微信小程序支付, "2":支付宝小程序支付
      isNewCar: false,
      invoiceIndex: 0,
      discount: window.sessionStorage.getItem("discount"),//折扣
      monthPayType: window.sessionStorage.getItem("monthPayType"),//月缴
      firstPremium: window.sessionStorage.getItem("firstPremium"),// 首期保费
      openId: "",//代扣微信用户唯一标识(分期代扣产品必传)
      ageValidateTips: "",//被保人年龄校验提示
      showOptionItemId: this.$route.query.id,
      renewInsuranceFlag: JSON.parse(window.sessionStorage.getItem('renewInsuranceFlag')),//一键续保标识值
      underwritingPolicyRes: {//新保情况下,核保提示
        isShowXubaoPop: true,//是否二次调用核保接口
        reUnderwrite: 1,//默认为1
        oldpolicyNoUnid: "",//默认为空
      },
      isAvailableStartDate: false,//起保日期是否可用
      renewInsurResultPop: {
        isShow: false,
        message: "",
        link2018: ""
      },//一键续保结果弹框
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
    };
  },
  computed: {
  },
  created() {
    this.common.setTracebackSession()
    let prdId = window.sessionStorage.getItem('prdId')
    if (this.checkMsgNull(prdId) && this.$route.query.prdId == prdId) {
      this.isCache = true
    } else {
      window.sessionStorage.setItem('prdId', this.$route.query.prdId)
    }

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
    this.handleChannelCodeAndOrgCode()

    this.getCityData()
    this.getListNew();
  },
  mounted() {
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
    //时间转换
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    statusFilter(status) {
      const statusMap = {
        1: "投保人信息（本人）",
        2: "被保险人信息（为谁投保）",
        7: "标的信息",
        8: "宠物信息",
      };
      return statusMap[status];
    }
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
    // 改变当前所展示的tab
    onChangeKhsTabActiveStatus(index) {
      for (let i = 0; i < this.khsArr.length; i++) {
        this.khsArr[i].isActive = '0'
        if (i == index) {
          this.khsArr[i].isActive = '1'
        }
      }
    },
    // 获取 保险条款数组 购买须知数组 投保声明数组 责任免除内容 重要告知内容 费率表内容
    onInsurancesArr() {
      let insurances = this.pagedata.insurances
      let zrmcContent = '' // 责任免除的内容
      let zygzContent = '' // 重要告知的内容
      let tbxzContent = '' // 投保声明 的内容
      let bxtkArr = [] // 保险条款数组
      for (let i = 0; i < insurances.length; i++) {
        let item = insurances[i]
        if (item.title == '投保须知' || item.title == '投保告知书' || item.title == '投保声明') {
          tbxzContent = JSON.parse(JSON.stringify(item))
        } else if (item.title == '责任免除') {
          zrmcContent = JSON.parse(JSON.stringify(item))
        } else if (item.title == '重要告知') {
          zygzContent = JSON.parse(JSON.stringify(item))
        } else if (item.type == 1 || item.type == 5 || item.type == 7 || item.type == 2 || item.type == 11) { // 更多购买须知中不包含保险条款
        } else if (item.type == 3) {// 保险条款
          bxtkArr.push(item)
        } else if (item.type == 9) {// 附加信息中的费率表
          this.flbContent = item
        }
      }
      let arr = []
      arr.push({
        title: '保险条款',
        isList: '1',
        content: JSON.parse(JSON.stringify(bxtkArr)),
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
    onBbrPopPage() {
      this.showBbrPopPage = false
      this.onCanScroll()
      this.underwritingPolicy(this.paramstopay)
    },
    onHideBbrPopPage() {
      this.showBbrPopPage = false
      this.onCanScroll()
    },
    onSensors(eventName, event) {
      if (!this.checkMsgNull(event.target)) {
      }
      this.sensors.quick('trackAllHeatMap', event.target, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.itemId,
        channelCode: this.first_channelCode,
        latest_channelCode: this.latest_channelCode,
        orgCode: this.first_orgCode,
        latest_orgCode: this.latest_orgCode,
        page_ID: this.common.getPageid(2),
      });
    },
    onSensors2(eventClick, eventName) {
      this.sensors.track(eventClick, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.itemId,
        channelCode: this.first_channelCode,
        latest_channelCode: this.latest_channelCode,
        orgCode: this.first_orgCode,
        latest_orgCode: this.latest_orgCode,
        page_ID: this.common.getPageid(2),
      })
    },
    onSensors3(eventClick, eventName) {
      this.sensors.track(eventClick, {
        loadTime: new Date().getTime() - this.startTime,
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.itemId,
        channelCode: this.first_channelCode,
        latest_channelCode: this.latest_channelCode,
        orgCode: this.first_orgCode,
        latest_orgCode: this.latest_orgCode,
        page_ID: this.common.getPageid(2),
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
          console.log(e)
        })
      }
    },
    getItemTypeData(dataType) {
      this.$http.post('/prdmc/sunPrpdCodeQuery/selectSunPrpdcodeListByCodeType', { type: dataType }).then(res => {
        if (dataType == 'BusinessSource') {
          this.itemType82Data = res.data
        } else if (dataType == 'SubjectDetail') {
          this.itemType83Data = res.data
        } else if (dataType == 'BusinessSort') {
          this.itemType84Data = res.data
        } else if (dataType == 'StructureType') {
          this.itemType85Data = res.data
        }
      }).catch((e) => console.log(e))
    },
    // 处理特殊信息
    onSpecialInfoInit() {
      this.pagedata.page.forEach(q => {
        q.types.forEach(w => {
          if (w.pageType == 8) {// 宠物信息
            w.items.forEach(e => {
              if (e.itemCode == 55) {// 宠物类型
                if (1 == e.userName) {
                  this.petVariety = this.dogType
                } else if (2 == e.userName) {
                  this.petVariety = this.catType
                }
              } else if (e.itemCode == 61) {// 宠物照片
                this.headImg1 = e.userName
              } else if (e.itemCode == 62) {// 宠物与主人的合照
                this.headImg2 = e.userName
              }
            })
          } else if (w.pageType == 7) {// 标的信息
            w.items.forEach(e => {
              if (e.itemCode == 69) {// 营业执照
                this.yyzzImg = e.userName
              }
            })
          }
        })
      })
    },
    onShowBbrPriceDetail() {
      this.showBbrPriceDetail = !this.showBbrPriceDetail
    },
    onCloseBbrPriceDetail() {
      this.showBbrPriceDetail = false
    },
    onTbrSheBaoSelect(id, index) {
      this.tbrSheBaoId = id
      this.tbrSheBaoIndex = index
      window.sessionStorage.setItem('tbrSheBaoId', this.tbrSheBaoId)
      window.sessionStorage.setItem('tbrSheBaoIndex', this.tbrSheBaoIndex)
      let entries = JSON.parse(window.sessionStorage.getItem("entries"))
      let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      let checkAgeFlag = false
      let checkSexFlag = false
      if (this.checkItemValue(1, 3, ['1'])) {// 如果证件类型是身份证的情况
        if (this.checkMsgNull(this.getItemUserName(1, 4))) {
          let userName = this.getItemUserName(1, 4)
          if (!this.checkIdCard(userName)) {// 身份证号校验未通过
            // this.onToast('投保人身份证号错误')
          } else {
            let age = GetAge(userName, this.startDate, 1)
            let day = GetDay(userName, this.startDate, 1)
            if (entries && entries.length > 0) {
              let isContentAge = false
              for (let j = 0; j < entries.length; j++) {
                if (isContent(entries[j].value, age, day)) {
                  isContentAge = true
                  checkAgeFlag = true
                  upParams.calcIds[getAgeIndex(upParams)] = entries[j].id
                }
              }
              if (!isContentAge && this.checkItemValue(2, 8, ['1', '12'])) {
                // this.onToast('投保人年龄不在年龄区间内，请重新输入')
              }
            } else {
              checkAgeFlag = true
            }
            if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
              for (let y = 0; y < upParams.calcIdKeys.length; y++) {
                if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                  let len = userName.length
                  let sexName = ''
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
                  if (this.checkMsgNull(this.getSexId(sexName))) {
                    upParams.calcIds[y] = this.getSexId(sexName)
                    checkSexFlag = true
                  } else {
                    if (this.checkItemValue(2, 8, ['1', '12'])) {
                      // this.onToast('当前投保人的性别与所选方案中的性别不相符！')
                    }
                  }
                }
              }
            } else {
              checkSexFlag = true
            }
          }
        }
      } else if (this.checkItemValue(1, 3, ['8', '9'])) { // 如果证件类型是组织机构代码证或者社会统一代码
        if (this.checkMsgNull(this.getItemUserName(1, 4))) {
          checkAgeFlag = true
          checkSexFlag = true
        }
      } else {
        if (this.checkMsgNull(this.getItemUserName(1, 5))) {
          let birthday = this.getItemUserName(1, 5)
          let age = GetAge(birthday, this.startDate, 2)
          let day = GetDay(birthday, this.startDate, 2)
          if (entries && entries.length > 0) {//有年龄区间
            let isContentAge = false
            for (let i = 0; i < entries.length; i++) {
              if (isContent(entries[i].value, age, day)) {//true
                upParams.calcIds[getAgeIndex(upParams)] = entries[i].id
                checkAgeFlag = true
                isContentAge = true
              }
            }
            if (!isContentAge && this.checkItemValue(2, 8, ['1', '12'])) {
              // this.onToast('投保人年龄不在年龄区间内，请重新输入')
            }
          } else {
            checkAgeFlag = true
          }

          if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
            for (let y = 0; y < upParams.calcIdKeys.length; y++) {
              if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                let sexName = ''
                if (this.checkItemValue(1, 2, ['1'])) {
                  sexName = '男'
                } else if (this.checkItemValue(1, 2, ['2'])) {
                  sexName = '女'
                }
                if (this.checkMsgNull(this.getSexId(sexName))) {
                  checkSexFlag = true
                  upParams.calcIds[y] = this.getSexId(sexName)
                } else {
                  if (this.checkItemValue(2, 8, ['1', '12'])) {
                    this.onToast('当前投保人的性别与所选方案中的性别不相符！')
                  }
                }
              }
            }
          } else {
            checkSexFlag = true
          }
        }
      }

      if (checkAgeFlag && checkSexFlag) {
        /* 处理报价因子：社保情况的id  开始 */
        if (this.sheBaoEntries.length > 0 && this.groupRiskFlag == 1) {
          for (let h = 0; h < upParams.calcIdKeys.length; h++) {
            if (upParams.calcIdKeys[h] == '社保情况') {
              upParams.calcIds[h] = this.tbrSheBaoId
            }
          }
        }
        /* 处理报价因子：社保情况的id  结束 */
        this.onProductCalc(upParams, res => {
          if (res.data.code == '200') {
            this.tbrPremium = res.data.data.price // 投保人保费
            this.tbrItemId = res.data.data.prdItemId // 投保人itemId
            if (this.groupRiskFlag == 0) {// 如果是单个被保人，则直接获取保费
              if (this.checkItemValue(2, 8, ['1', '12'])) {
                this.showOptionItemId = res.data.data.prdItemId // 单个被保人的itemId
                this.onSetMoneyShow(res.data.data.price)
              }
            } else if (this.groupRiskFlag == 1) {// 如果是（多被保人）
              if (this.bbrInfoPopList.length > 0) {
                let handlePrice = 0
                for (let i = 0; i < this.bbrInfoPopList.length; i++) {
                  if (this.bbrInfoPopList[i].userName == 1) {// 如果被保人数组中有本人，则把当前计算出的保费给本人
                    this.bbrInfoPopList[i].premium = res.data.data.price
                    this.bbrInfoPopList[i].itemId = res.data.data.prdItemId
                    this.bbrInfoPopList[i].bbrSheBaoId = this.tbrSheBaoId
                    this.bbrInfoPopList[i].bbrSheBaoIndex = this.tbrSheBaoIndex
                  }
                }
                window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
                if (this.pagedata.isSharedPremium == 1) {// 不共享保费
                  for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 再次循环被保人数组，计算当前被保人保费之和
                    handlePrice += Number(this.bbrInfoPopList[i].premium)
                  }
                } else {
                  handlePrice = res.data.data.price
                }
                this.onSetMoneyShow(handlePrice)
              }
            }
          }
        })
      }
    },
    onBbrSheBaoSelect(id, index) {
      this.sheBaoId = id
      this.sheBaoIndex = index
      window.sessionStorage.setItem('sheBaoId', id)
      window.sessionStorage.setItem('sheBaoIndex', index)
    },
    onScrollBottom() {// 解决fixed定位元素中有input框错位问题
      setTimeout(function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100)
    },
    onBbrInfoPopCheck(q) {
      if (q.isShow) {
        if (this.bbrInfoPop.otherOptionitems.length > 0) {
          let IDCardType = 1 // 证件类型默认为 身份证
          for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
            if (this.bbrInfoPop.otherOptionitems[i].itemCode == 3) { // 证件类型
              IDCardType = this.bbrInfoPop.otherOptionitems[i].userName
            }
          }
          if (this.noRequiredField.indexOf(q.itemCode) == -1) {
            if (!q.userName && q.itemCode != 6) {// 校验非空(被保人手机号除外)
              this.onToast("请输入" + q.itemName)
              return false
            } else if (q.itemCode == 1) {// 姓名
              if (!this.checkName(q.userName)) {
                this.onToast('请输入正确的姓名')
                return false
              }
            } else if (q.itemCode == "4") {// 证件编号(不能为汉字)
              if (IDCardType == '1') { // 居民身份证
                if (!this.checkIdCard(q.userName)) {
                  this.onToast('身份证号输入错误')
                  return false
                }
              } else if (IDCardType == "8") {//组织机构代码
                q.userName = q.userName.toUpperCase();
                var orgCodeReg = /^[\w\d-]+$/i;//匹配数字、字母及中划线
                var result = orgCodeReg.test(q.userName);
                if (!result) {
                  this.onToast('组织机构代码证件编码不能为非法字符和中文')
                  return false
                }
              } else {// 港澳通行证/居民户口本等
                var cardNum = /^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
                if (cardNum.test(q.userName)) {
                  this.onToast('证件编号格式不正确')
                  return false
                }
              }
            } else if (q.itemCode == 6) {// 手机号
              if (this.checkMsgNull(q.userName)) {
                if (!this.checkMobilePhone(q.userName)) {
                  this.onToast('请输入正确的手机号')
                  return false
                }
              }
            } else if (q.itemCode == 7) {// 邮箱
              if (!this.checkEmail(q.userName)) {
                this.onToast('请输入正确的邮箱')
                return false
              }
            }
          }
        }
      }
      return true
    },
    onTargetPopCheck(q) {
      if (this.targetPop.otherOptionitems.length > 0) {
        if (this.noRequiredField.indexOf(q.itemCode) == -1) {
          if (q.itemCode == 76) {// 品牌
            if (!this.checkMsgNull(q.userName)) {
              this.onToast('请输入品牌')
              return false
            }
          } else if (q.itemCode == 77) {// 型号
            if (!this.checkMsgNull(q.userName)) {
              this.onToast('请输入型号')
              return false
            }
          } else if (q.itemCode == 78) {// 出厂序列号
            if (!this.checkMsgNull(q.userName)) {
              this.onToast('请输入出厂序列号')
              return false
            }
          }
        }
      }
      return true
    },
    generateTargetOtherOptionitems() {
      var otherOptionitems = [];
      for (var j = 0; j < this.targetInfo.length; j++) {
        var appInfo = this.targetInfo[j];
        var optionsItems = {}
        optionsItems.itemName = appInfo.itemName;
        optionsItems.itemCode = appInfo.itemCode;
        optionsItems.isHasOption = appInfo.isHasOption;
        optionsItems.options = appInfo.options;
        optionsItems.userName = appInfo.userName;
        otherOptionitems.push(optionsItems)
      }
      return otherOptionitems
    },
    updateBbrInfo(index) {
      for (let i = 0; i < this.bbrInfoPopList[index].options.length; i++) {
        if (this.bbrInfoPopList[index].options[i].id == this.bbrInfoPopList[index].userName) {
          this.bbrPopIndex = i
        }
      }
      this.bbrInfoPop = JSON.parse(JSON.stringify(this.bbrInfoPopList[index]))
      this.sheBaoIndex = this.bbrInfoPop.bbrSheBaoIndex
      this.sheBaoId = this.bbrInfoPop.bbrSheBaoId
      this.updateBbrInfoPopFlag = true
      this.updateBbrInfoPopIndex = index
      this.onNoScroll()
      this.showMoreBbr = true
    },
    deleteBbrInfo(index) {
      this.bbrInfoPopList.splice(index, 1)
      if (this.pagedata.isSharedPremium == 1) {// 如果不共享保费，则删除被保人时需重新计算保费展示
        let handlePrice = 0
        for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 循环被保人数组，计算当前被保人保费之和
          handlePrice += Number(this.bbrInfoPopList[i].premium)
        }
        this.onSetMoneyShow(handlePrice)
      }
      window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
      this.onToast('删除成功')
    },
    updateTargetInfo(index) {
      this.targetPop = JSON.parse(JSON.stringify(this.targetPopList[index]))
      this.updateTargetPopFlag = true
      this.updateTargetPopIndex = index
      this.onNoScroll()
      this.showTargetPop = true
    },
    deleteTargetInfo(index) {
      this.targetPopList.splice(index, 1)
      window.sessionStorage.setItem('targetPopList', JSON.stringify(this.targetPopList))
      this.onToast('删除成功')
      if (this.targetPopList.length >= 1) {
        this.targetNum = this.targetPopList.length
      } else {
        this.targetNum = 1
      }
    },
    addTargetPopList() {
      for (let i = 0; i < this.targetPop.otherOptionitems.length; i++) {
        if (!this.onTargetPopCheck(this.targetPop.otherOptionitems[i])) {
          return
        }
      }
      if (this.updateTargetPopFlag) {// 如果是更新状态
        this.targetPopList.splice(this.updateTargetPopIndex, 1, JSON.parse(JSON.stringify(this.targetPop)))
        window.sessionStorage.setItem('targetPopList', JSON.stringify(this.targetPopList))
        this.onToast('更新标的信息成功')
        this.updateTargetPopFlag = false
        this.onCanScroll()
        this.showTargetPop = false
        if (this.targetPopList.length >= 1) {
          this.targetNum = this.targetPopList.length
        } else {
          this.targetNum = 1
        }
      } else {// 新增状态
        this.targetPopList.push(JSON.parse(JSON.stringify(this.targetPop)))
        window.sessionStorage.setItem('targetPopList', JSON.stringify(this.targetPopList))
        this.onToast('添加标的信息成功')
        this.onCanScroll()
        this.showTargetPop = false
        if (this.targetPopList.length >= 1) {
          this.targetNum = this.targetPopList.length
        } else {
          this.targetNum = 1
        }
      }
    },
    addBbrInfoList() {
      if (!this.hasClickBbrQueDingBtn) {
        this.hasClickBbrQueDingBtn = true
        setTimeout(() => {
          this.hasClickBbrQueDingBtn = false
        }, 1000)
      } else {
        return
      }
      if (this.bbrInfoPop.userName != 1) {
        for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
          if (!this.onBbrInfoPopCheck(this.bbrInfoPop.otherOptionitems[i])) {
            return
          }
        }
      }
      if (this.updateBbrInfoPopFlag) {// 如果是更新状态
        this.onDuoBbrIDNoOrAge(() => {
          this.bbrInfoPopList.splice(this.updateBbrInfoPopIndex, 1, JSON.parse(JSON.stringify(this.bbrInfoPop)))
          if (this.pagedata.isSharedPremium == 1) {
            let handlePrice = 0
            for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 循环被保人数组，计算当前被保人保费之和
              handlePrice += Number(this.bbrInfoPopList[i].premium)
            }
            this.onSetMoneyShow(handlePrice)
          } else {
            this.onSetMoneyShow(this.bbrInfoPop.premium)
          }
          window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
          this.onToast('更新被保人成功')
          this.updateBbrInfoPopFlag = false
          this.onCanScroll()
          this.showMoreBbr = false
        })
      } else {// 新增状态

        if (this.bbrInfoPopList.length >= this.pagedata.maxGroupNum) {// 如果被保人添加人数大于等于多个被保人最大人数，则不能再添加被保人
          this.onToast('被保人人数已达最大人数')
          return
        }
        if (this.bbrInfoPopList.length > 0) {
          let parentNum = 0
          for (let i = 0; i < this.bbrInfoPopList.length; i++) {
            if (this.bbrInfoPopList[i].userName == 10) {
              parentNum++
            }
          }
          if (parentNum >= 2 && this.bbrInfoPop.userName == 10) {
            this.onToast('父母最多可添加2人')
            return
          }
        }
        if (this.bbrInfoPopList.length > 0) {
          let childrenNum = 0
          for (let i = 0; i < this.bbrInfoPopList.length; i++) {
            if (this.bbrInfoPopList[i].userName == 11) {
              childrenNum++
            }
          }
          if (childrenNum >= 6 && this.bbrInfoPop.userName == 11) {
            this.onToast('子女最多可添加6人')
            return
          }
        }

        if (this.bbrInfoPopList.length > 0) {
          for (let i = 0; i < this.bbrInfoPopList.length; i++) {
            if (this.bbrInfoPopList[i].userName == 1 && this.bbrInfoPop.userName == 1) { // 如果数组中存在本人，并且又添加了本人 这种情况
              this.onToast('本人只能添加一次！')
              return
            } else if (this.bbrInfoPopList[i].userName == 9 && this.bbrInfoPop.userName == 9) { // 如果数组中存在配偶，并且又添加了配偶 这种情况
              this.onToast('配偶只能添加一次！')
              return
            } else if (this.bbrInfoPopList[i].userName == 2 && this.bbrInfoPop.userName == 2) { // 如果数组中存在丈夫，并且又添加了丈夫 这种情况
              this.onToast('丈夫只能添加一次！')
              return
            } else if (this.bbrInfoPopList[i].userName == 3 && this.bbrInfoPop.userName == 3) { // 如果数组中存在妻子，并且又添加了妻子 这种情况
              this.onToast('妻子只能添加一次！')
              return
            }
          }
        }
        if (this.bbrInfoPop.userName == 1) {// 如果是本人，则判断投保人信息是否已经填写，若没有填写，提醒填写；若已经填写，则正常往下走
          if (!this.checkTbrInfo()) {
            this.onCanScroll()
            this.showMoreBbr = false
            return
          } else {
            this.bbrInfoPop.premium = this.tbrPremium
            this.bbrInfoPop.itemId = this.tbrItemId
            if (this.sheBaoEntries.length > 0) {
              this.bbrInfoPop.bbrSheBaoId = this.tbrSheBaoId
              this.bbrInfoPop.bbrSheBaoIndex = this.tbrSheBaoIndex
            }
            this.bbrInfoPopList.push(JSON.parse(JSON.stringify(this.bbrInfoPop)))
            if (this.pagedata.isSharedPremium == 1) {
              let handlePrice = 0
              for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 循环被保人数组，计算当前被保人保费之和
                handlePrice += Number(this.bbrInfoPopList[i].premium)
              }
              this.onSetMoneyShow(handlePrice)
            } else {
              this.onSetMoneyShow(this.tbrPremium)
            }
            window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
            this.onToast('添加被保人成功')
            this.onCanScroll()
            this.showMoreBbr = false
          }
        } else {
          this.onDuoBbrIDNoOrAge(() => {
            this.bbrInfoPopList.push(JSON.parse(JSON.stringify(this.bbrInfoPop)))
            if (this.pagedata.isSharedPremium == 1) {
              let handlePrice = 0
              for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 循环被保人数组，计算当前被保人保费之和
                handlePrice += Number(this.bbrInfoPopList[i].premium)
              }
              this.onSetMoneyShow(handlePrice)
            } else {
              this.onSetMoneyShow(this.bbrInfoPop.premium)
            }
            window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
            this.onToast('添加被保人成功')
            this.onCanScroll()
            this.showMoreBbr = false
          })
        }
      }
    },
    onShowMoreBbr() {
      if (this.bbrInfoPopList.length >= this.pagedata.maxGroupNum) {
        this.onToast('被保人人数已达上限！')
        return false
      }
      if (this.bbrInfoPop.userName == 1) {
        let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
        for (let i = 0; i < bbrInfoPopCopy.otherOptionitems.length; i++) {
          if (bbrInfoPopCopy.otherOptionitems[i].itemCode != 8) {
            bbrInfoPopCopy.otherOptionitems[i].isShow = false
          }
        }
        this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))
      } else {
        this.bbrInfoPop.otherOptionitems = JSON.parse(JSON.stringify(this.insureApplicant))
      }
      this.onNoScroll()
      this.showMoreBbr = true
    },
    onHideMoreBbr() {
      this.onCanScroll()
      this.showMoreBbr = false
      this.updateBbrInfoPopFlag = false
    },
    onShowTargetPop() {
      if (this.targetPopList.length >= this.pagedata.maxTargetNum) {
        this.onToast('标的信息添加数量已达上限！')
        return
      }
      this.targetPop.otherOptionitems = this.generateTargetOtherOptionitems()
      this.onNoScroll()
      this.showTargetPop = true
    },
    onHideTargetPop() {
      this.onCanScroll()
      this.showTargetPop = false
      this.updateTargetPopFlag = false
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    setInvoiceShowFlag() {
      if (this.monthPayType && this.monthPayType == 12) {
        this.setShowFlag(1, ['41', '42', '43', '44', '27', '30', '31', '45', '46'], false)
      } else {
        this.setShowFlag(1, ['41'], true)
      }
    },
    onSwitchInvoice() {
      this.invoiceIndex = 0
      this.showInvoice = !this.showInvoice
      if (this.showInvoice) {//选中,则显示发票相关控件
        this.setShowFlag(1, ['42', '46'], true)
        this.setShowFlag(1, ['43', '44', '27', '30', '31', '45'], false)
        this.setSingleUserName(1, '42', '1')
      } else {//则隐藏
        this.setShowFlag(1, ['42', '43', '44', '27', '30', '31', '45', '46'], false)
      }
      window.sessionStorage.setItem('invoiceIndex', this.invoiceIndex)
      window.sessionStorage.setItem('showInvoice', this.showInvoice)
      this.handlePagedataToSession()
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
                  that.headImg1 = res.data.data.filename
                  that.pagedata.page.forEach(q => {
                    q.types.forEach(w => {
                      if (w.pageType == 8) {// 宠物信息
                        w.items.forEach(e => {
                          if (e.itemCode == 61) {// 宠物照片
                            e.userName = that.headImg1
                            that.handlePagedataToSession()
                          }
                        })
                      }
                    })
                  })
                } else if ('file2' == filename) {
                  that.headImg2 = res.data.data.filename
                  that.pagedata.page.forEach(q => {
                    q.types.forEach(w => {
                      if (w.pageType == 8) {// 宠物信息
                        w.items.forEach(e => {
                          if (e.itemCode == 62) {// 宠物与主人照片
                            e.userName = that.headImg2
                            that.handlePagedataToSession()
                          }
                        })
                      }
                    })
                  })
                } else if ('yyzzFile' == filename) {
                  that.yyzzImg = res.data.data.filename
                  that.pagedata.page.forEach(q => {
                    q.types.forEach(w => {
                      if (w.pageType == 7) {// 标的信息
                        w.items.forEach(e => {
                          if (e.itemCode == 69) {// 营业执照
                            e.userName = that.yyzzImg
                            that.handlePagedataToSession()
                          }
                        })
                      }
                    })
                  })
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
    swithPetVariety(petType) {
      if (1 == petType) {
        this.petVariety = this.dogType
      } else if (2 == petType) {
        this.petVariety = this.catType
      }
    },
    showUploadImg(filename) {
      document.getElementById(filename).click()
      return
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.headImg1 = res.data.filename
        this.pagedata.page.forEach(q => {
          q.types.forEach(w => {
            if (w.pageType == 8) {// 宠物信息
              w.items.forEach(e => {
                if (e.itemCode == 61) {// 宠物照片
                  e.userName = this.headImg1
                }
              })
            }
          })
        })
        Indicator.close()
        this.onToast('上传成功')
      } else {
        this.onToast('图片上传失败，请重新上传')
      }
    },
    handleAvatarSuccess2(res, file) {
      if (res.code == 200) {
        this.headImg2 = res.data.filename
        this.pagedata.page.forEach(q => {
          q.types.forEach(w => {
            if (w.pageType == 8) {// 宠物信息
              w.items.forEach(e => {
                if (e.itemCode == 62) {// 宠物与主人照片
                  e.userName = this.headImg2
                }
              })
            }
          })
        })
        Indicator.close()
        this.onToast('上传成功')
      } else {
        this.onToast('图片上传失败，请重新上传')
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.onToast('上传头像图片只能是 JPG和PNG 格式!')
      }
      // if (!isLt2M) {
      // this.onToast('上传头像图片大小不能超过 2MB!')
      // }
      if (isJPG || isPNG) {
        Indicator.open({
          text: '上传中...',
          spinnerType: 'fading-circle'
        })
      }
      return isJPG || isPNG;
    },
    // 校验是否包含非法字符和汉字
    checkIllegalString(param) {
      var regExp = /^[\w\d-]+$/i;//匹配数字、字母及中划线
      if (regExp.test(param)) {
        return true;
      } else {
        return false;
      }
    },
    // 校验邮箱
    checkEmail(email) {
      var regExp = /^[a-z0-9]+([._\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i;
      if (regExp.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    // 校验身份证格式
    checkIdCard(IDCard) {
      var regExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (regExp.test(IDCard)) {
        return true;
      } else {
        return false;
      }
    },
    // 校验包含汉字
    checkChinese(param) {
      var regExp = /^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
      if (regExp.test(param)) {
        return true;
      } else {
        return false;
      }
    },
    // 校验手机号
    checkMobilePhone(phoneNumber) {
      var regExp = /^1[3456789]\d{9}$/
      if (regExp.test(phoneNumber)) {
        return true
      } else {
        return false
      }
    },
    // 校验名称
    checkName(name) {
      // var regExp = /^[\u4E00-\u9FA5]{2,4}$/
      var regExp = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,20})$/
      if (regExp.test(name)) {
        return true
      } else {
        return false
      }
    },
    // 校验正整数
    checkZhengNum(name) {
      var regExp = /(^[1-9]\d*$)/
      if (regExp.test(name)) {
        return true
      } else {
        return false
      }
    },
    // 校验正数(如果有小数点，则前面最多4位，后面最多2位；如果没有小数点，则最多4位)
    checkZhengFloatNum(name) {
      var regExp = /(^\d{1,4}\.\d{1,2}$|^\d{1,4}$)/
      if (regExp.test(name)) {
        return true
      } else {
        return false
      }
    },
    // 校验车牌号
    checkVehicleNumber(name) {
      var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{4,6}$/
      var rehm = /^[A-Z]{2}[0-9]{4}$/
      return re.test(name) || rehm.test(name)
      // var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
      // var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
      // if (name.length == 7) {
      //   return creg.test(name);
      // } else if (name.length == 8) {
      //   return xreg.test(name);
      // } else {
      //   return false;
      // }
    },
    // 判断字符串是否为空
    checkMsgNull(msg) {
      if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
        return true;
      } else {
        return false;
      }
    },
    //字段长度限制
    fieldLenLimit(code) {
      let len;
      if (code == 43 || code == 46)//发票抬头、单位名称
        len = 15;
      else if (code == 44)//纳税人识别号
        len = 20;
      else if (code == 36)//车牌号
        len = 8;
      else if (code == 35)//车架号
        len = 17
      else
        len = 30;
      return len;
    },
    // 调报价测算接口
    onProductCalc(upParams, callback) {
      this.$http.post('/prdmc/prdmcShop/productCalc', upParams).then(res => {
        callback(res)
      }).catch((e) => console.log(e))
    },
    handleTbrSex(userName) {
      let sexName = ''
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == 1) {
          for (let j = 0; j < type.items.length; j++) {
            if (type.items[j].itemCode == 2) {
              for (let m = 0; m < type.items[j].options.length; m++) {
                if (type.items[j].options[m].id == userName) {
                  sexName = type.items[j].options[m].name
                }
              }
            }
          }
        }
      }
      let entries = JSON.parse(window.sessionStorage.getItem("entries"))
      let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
      let sheBaoEntries = JSON.parse(window.sessionStorage.getItem("sheBaoEntries"))
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      if (this.checkMsgNull(this.getItemUserName(1, 5))) {
        let birthDay = this.getItemUserName(1, 5)
        let age = GetAge(birthDay, this.startDate, 2)
        let day = GetDay(birthDay, this.startDate, 2)
        if (entries && entries.length > 0) {
          let isContentAge = false
          for (let j = 0; j < entries.length; j++) {
            if (isContent(entries[j].value, age, day)) {
              isContentAge = true
              upParams.calcIds[getAgeIndex(upParams)] = entries[j].id
            }
          }
          if (!isContentAge && this.checkItemValue(2, 8, ['1', '12'])) {
            this.onToast('投保人年龄不在年龄区间内，请重新输入')
            return false
          }
        }
      }

      if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
        for (let y = 0; y < upParams.calcIdKeys.length; y++) {
          if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
            if (this.checkMsgNull(this.getSexId(sexName))) {
              upParams.calcIds[y] = this.getSexId(sexName)
            } else {
              if (this.checkItemValue(2, 8, ['1', '12'])) {
                this.onToast('当前投保人的性别与所选方案中的性别不相符！')
                return false
              }
            }
          }
        }
      }
      /* 处理报价因子：社保 */
      if (sheBaoEntries && sheBaoEntries.length > 0 && this.groupRiskFlag == 1) {
        this.tbrSheBaoId = sheBaoEntries[this.tbrSheBaoIndex].id
        for (let h = 0; h < upParams.calcIdKeys.length; h++) {
          if (upParams.calcIdKeys[h] == '社保情况') {
            upParams.calcIds[h] = this.tbrSheBaoId
          }
        }
      }
      this.onProductCalc(upParams, res => {
        if (res.data.code == '200') {
          this.tbrItemId = res.data.data.prdItemId
          this.tbrPremium = res.data.data.price
          if (this.groupRiskFlag == 1) {
            let handlePrice = 0
            for (let i = 0; i < this.bbrInfoPopList.length; i++) {
              if (this.bbrInfoPopList[i].userName == 1) {// 如果被保人数组中有本人，则把当前计算出的保费给本人
                this.bbrInfoPopList[i].premium = res.data.data.price
                this.bbrInfoPopList[i].itemId = res.data.data.prdItemId
              }
            }
            window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
            if (this.pagedata.isSharedPremium == 1) {// 不共享保费
              for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 再次循环被保人数组，计算当前被保人保费之和
                handlePrice += Number(this.bbrInfoPopList[i].premium)
              }
            } else {
              handlePrice = res.data.data.price
            }
            this.onSetMoneyShow(handlePrice)
          } else {
            if (this.checkItemValue(2, 8, ['1', '12'])) {
              this.showOptionItemId = this.tbrItemId
              this.onSetMoneyShow(this.tbrPremium)
            }
          }
        }
      })
    },
    onTbrIDKeyup(userName) {
      this.setSingleUserName(1, 2, '')
      if (this.checkItemValue(1, 3, ['1'])) {
        if (this.checkMsgNull(userName)) {
          if (!this.checkIdCard(userName)) {// 身份证号校验未通过
          } else {
            if (parseInt(userName.substr(16, 1)) % 2 == 1) {// 男
              this.setSingleUserName(1, 2, 1)
            } else {
              this.setSingleUserName(1, 2, 2)
            }
          }
        }
      }
    },
    onDanBbrIDKeyup(userName) {
      this.setSingleUserName(2, 2, '')
      if (this.checkItemValue(2, 3, ['1'])) {
        if (this.checkMsgNull(userName)) {
          if (!this.checkIdCard(userName)) {// 身份证号校验未通过
          } else {
            if (parseInt(userName.substr(16, 1)) % 2 == 1) {// 男
              this.setSingleUserName(2, 2, 1)
            } else {
              this.setSingleUserName(2, 2, 2)
            }
          }
        }
      }
    },
    onDuoBbrIDKeyup(userName) {
      this.setBbrInfoPopUserName(2, '')
      if (this.checkItemValue(2, 3, ['1'])) {
        if (this.checkMsgNull(userName)) {
          if (!this.checkIdCard(userName)) {// 身份证号校验未通过
          } else {
            if (parseInt(userName.substr(16, 1)) % 2 == 1) {// 男
              this.setBbrInfoPopUserName(2, 1)
            } else {
              this.setBbrInfoPopUserName(2, 2)
            }
          }
        }
      }
    },
    // 当光标移出投保人的证件号码输入框时
    // 或者 选完投保人的出生日期时  所调方法
    onTbrIDNoOrAge(itemCode, userName) {
      let entries = JSON.parse(window.sessionStorage.getItem("entries"))
      let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
      let sheBaoEntries = JSON.parse(window.sessionStorage.getItem("sheBaoEntries"))
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      if (itemCode == 4) {// 证件号码blur时
        if (this.checkItemValue(1, 3, ['1'])) {
          if (this.checkMsgNull(userName)) {
            if (!this.checkIdCard(userName)) {// 身份证号校验未通过
              this.onToast('投保人身份证有误')
              return false
            } else {
              let age = GetAge(userName, this.startDate, 1)
              let day = GetDay(userName, this.startDate, 1)
              if (entries && entries.length > 0) {
                let isContentAge = false
                for (let j = 0; j < entries.length; j++) {
                  if (isContent(entries[j].value, age, day)) {
                    isContentAge = true
                    upParams.calcIds[getAgeIndex(upParams)] = entries[j].id
                  }
                }
                if (!isContentAge && this.checkItemValue(2, 8, ['1', '12'])) {
                  this.onToast('投保人年龄不在年龄区间内，请重新输入')
                  return false
                }
              }
              if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
                for (let y = 0; y < upParams.calcIdKeys.length; y++) {
                  if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                    let len = userName.length
                    let sexName = ''
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
                    if (this.checkMsgNull(this.getSexId(sexName))) {
                      upParams.calcIds[y] = this.getSexId(sexName)
                    } else {
                      if (this.checkItemValue(2, 8, ['1', '12'])) {
                        this.onToast('当前投保人的性别与所选方案中的性别不相符！')
                        return false
                      }
                    }
                  }
                }
              }
            }
          } else {
            return false
          }
        } else if (this.checkItemValue(1, 3, ['8', '9'])) {
          this.handleCardTypeForGroup(itemCode, userName, 1);
        } else {
          return false
        }
      } else if (itemCode == 5) {
        if (this.checkMsgNull(userName)) {
          let age = GetAge(userName, this.startDate, 2)
          let day = GetDay(userName, this.startDate, 2)
          if (entries && entries.length > 0) {
            let isContentAge = false
            for (let j = 0; j < entries.length; j++) {
              if (isContent(entries[j].value, age, day)) {
                isContentAge = true
                upParams.calcIds[getAgeIndex(upParams)] = entries[j].id
              }
            }
            if (!isContentAge && this.checkItemValue(2, 8, ['1', '12'])) {
              this.onToast('投保人年龄不在年龄区间内，请重新输入')
              return false
            }
          }
          if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
            for (let y = 0; y < upParams.calcIdKeys.length; y++) {
              if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                let sexName = ''
                if (this.checkItemValue(1, 2, ['1'])) {
                  sexName = '男'
                } else if (this.checkItemValue(1, 2, ['2'])) {
                  sexName = '女'
                }
                if (this.checkMsgNull(this.getSexId(sexName))) {
                  upParams.calcIds[y] = this.getSexId(sexName)
                } else {
                  if (this.checkItemValue(2, 8, ['1', '12'])) {
                    this.onToast('当前投保人的性别与所选方案中的性别不相符！')
                    return false
                  }
                }
              }
            }
          }
        } else {
          return false
        }
      }
      /* 处理报价因子：社保 */
      if (sheBaoEntries && sheBaoEntries.length > 0 && this.groupRiskFlag == 1) {
        this.tbrSheBaoId = sheBaoEntries[this.tbrSheBaoIndex].id
        for (let h = 0; h < upParams.calcIdKeys.length; h++) {
          if (upParams.calcIdKeys[h] == '社保情况') {
            upParams.calcIds[h] = this.tbrSheBaoId
          }
        }
      }
      this.onProductCalc(upParams, res => {
        if (res.data.code == '200') {
          this.tbrItemId = res.data.data.prdItemId
          this.tbrPremium = res.data.data.price
          if (this.groupRiskFlag == 1) {
            if (this.bbrInfoPopList.length > 0) {
              let handlePrice = 0
              for (let i = 0; i < this.bbrInfoPopList.length; i++) {
                if (this.bbrInfoPopList[i].userName == 1) {// 如果被保人数组中有本人，则把当前计算出的保费给本人
                  this.bbrInfoPopList[i].premium = res.data.data.price
                  this.bbrInfoPopList[i].itemId = res.data.data.prdItemId
                }
              }
              window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
              if (this.pagedata.isSharedPremium == 1) {// 不共享保费
                for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 再次循环被保人数组，计算当前被保人保费之和
                  handlePrice += Number(this.bbrInfoPopList[i].premium)
                }
              } else {
                handlePrice = res.data.data.price
              }
              this.onSetMoneyShow(handlePrice)
            }
          } else {
            if (this.checkItemValue(2, 8, ['1', '12'])) {
              this.showOptionItemId = this.tbrItemId
              this.onSetMoneyShow(this.tbrPremium)
            }
          }
        }
      })
    },
    //当是组织机构代码和统一社会信用代码时
    handleCardTypeForGroup(itemCode, userName, pageType) {
      if (itemCode == '4') {//证件编号变化时
        if (userName != "" && userName != null && userName != undefined) {
          if (this.checkItemValue(1, 3, ['8'])) {//组织机构代码
            var orgCodeReg = /^[\w\d-]+$/i;//匹配数字、字母及中划线
            var result = orgCodeReg.test(userName);
            if (!result) {
              this.onToast('组织机构代码证件编码不能为非法字符和中文')
              return;
            }
          } else if (this.checkItemValue(1, 3, ['9'])) {//统一社会信用代码
            var codeReg = /^([0-9A-Z]{2})([0-9]{6})([0-9A-Z]{8})([0-9X])([0-9A-Z])$/;
            var result = codeReg.test(userName);
            if (!result) {
              this.onToast('统一社会信用代码格式不正确')
              return;
            }
          }
        }

        let cardTypeValue = ''
        if (pageType == 1) {
          if (this.checkItemValue(1, 3, ['8'])) {
            cardTypeValue = '8'
          } else if (this.checkItemValue(1, 3, ['9'])) {
            cardTypeValue = '9'
          }
        } else if (pageType == 2) {
          if (this.checkBbrInfoPopItemValue(3, ['8'])) {
            cardTypeValue = '8'
          } else if (this.checkBbrInfoPopItemValue(3, ['9'])) {
            cardTypeValue = '9'
          }
        }

        //调用接口
        let companyParams = {
          cardType: cardTypeValue,
          cardCode: userName
        }
        this.loadingVisible = true;
        this.$http.post('/sunmc/microShopCIFFacade/microShopCIFDubboFacade', companyParams)
          .then(res => {
            if (res.data.code == 200) {
              this.loadingVisible = false;
              let list = res.data.data;
              if (list.length > 0) {
                if (pageType == 1) {
                  let newItemsArr = [];
                  for (var i = 0; i < this.pagedata.page.length; i++) {
                    for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
                      var z = this.pagedata.page[i].types[j];
                      if (z.pageType == 1) {//投保人
                        for (var k = 0; k < z.items.length; k++) {
                          for (var t = 0; t < list.length; t++) {
                            if (z.items[k].itemCode == list[t].code) {
                              if (list[t].value != "" && list[t].value.length > 0) {
                                z.items[k].userName = list[t].value;
                              }
                            }
                          }
                          newItemsArr.push(z.items[k]);
                        }
                        this.pagedata.page[i].types[j].items = newItemsArr;
                      }
                    }
                  }
                } else if (pageType == 2) {//被保人
                  if (this.groupRiskFlag == 1) {//多个
                    for (let m = 0; m < this.bbrInfoPop.otherOptionitems.length; m++) {
                      for (let n = 0; n < list.length; n++) {
                        if (this.bbrInfoPop.otherOptionitems[m].itemCode == list[n].code) {
                          if (list[n].value != "" && list[n].value.length > 0) {
                            this.bbrInfoPop.otherOptionitems[m].userName = list[n].value;
                          }
                        }
                      }
                    }
                  } else {//单个
                    let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
                    for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
                      let type = pagedataCopy.page[0].types[i]
                      if (type.pageType == 2) {
                        for (let j = 0; j < type.items.length; j++) {
                          for (let y = 0; y < list.length; y++) {
                            if (type.items[j].itemCode.itemCode == list[y].code) {
                              if (list[y].value != "" && list[y].value.length > 0) {
                                type.items[j].itemCode.userName = list[y].value;
                              }
                            }
                          }
                        }
                      }
                    }
                    this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
                  }
                }
              }

            } else {
              this.loadingVisible = false;
              this.onToast(res.data.msg);
              return;
            }
          }).catch(e => {
            console.log(e)
            this.loadingVisible = false;
            console.log(JSON.stringify(e));
            this.onToast('接口异常');
            return;
          });
      }
    },

    getSexId(sex) {
      let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
      for (let w = 0; w < sexEntries.length; w++) {
        if (sexEntries[w].value == sex) {
          return sexEntries[w].id
        }
      }
    },
    // 当光标移出多个被保人的证件号码输入框时
    // 或者 选完多个被保人的出生日期时  所调方法
    onDuoBbrIDNoOrAge(callback) {
      let entries = JSON.parse(window.sessionStorage.getItem("entries"))
      let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      if (this.checkBbrInfoPopItemValue(3, ['1'])) {// 身份证类型
        let userName = this.getBbrInfoPopItemUserName(4)
        let age = GetAge(userName, this.startDate, 1)
        let day = GetDay(userName, this.startDate, 1)
        if (entries && entries.length > 0) {
          let isContentAge = false
          for (let h = 0; h < entries.length; h++) {
            if (isContent(entries[h].value, age, day)) {
              isContentAge = true
              upParams.calcIds[getAgeIndex(upParams)] = entries[h].id
            }
          }
          if (!isContentAge) {// 被保人年龄不在年龄区间内
            this.onToast('被保人年龄不在投保范围内，请重新输入！')
            return false
          }
        }

        if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
          for (let y = 0; y < upParams.calcIdKeys.length; y++) {
            if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
              let len = userName.length
              let sexName = ''
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
              if (this.checkMsgNull(this.getSexId(sexName))) {
                upParams.calcIds[y] = this.getSexId(sexName)
              } else {
                this.onToast('当前被保人的性别与所选方案中的性别不相符！')
                return false
              }
            }
          }
        }
      } else if (this.checkBbrInfoPopItemValue(3, ['8', '9'])) {// 组织机构代码或社会统一码

      } else {
        let userName = this.getBbrInfoPopItemUserName(5)
        let age = GetAge(userName, this.startDate, 2)
        let day = GetDay(userName, this.startDate, 2)
        if (entries && entries.length > 0) {
          let isContentAge = false
          for (let h = 0; h < entries.length; h++) {
            if (isContent(entries[h].value, age, day)) {
              isContentAge = true
              upParams.calcIds[getAgeIndex(upParams)] = entries[h].id
            }
          }
          if (!isContentAge) {// 被保人年龄不在年龄区间内
            this.onToast('被保人年龄不在投保范围内，请重新输入！')
            return false
          }
        }

        if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
          for (let y = 0; y < upParams.calcIdKeys.length; y++) {
            if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
              let sexName = ''
              if (this.checkBbrInfoPopItemValue(2, ['1'])) {
                sexName = '男'
              } else if (this.checkItemValue(2, ['2'])) {
                sexName = '女'
              }
              if (this.checkMsgNull(this.getSexId(sexName))) {
                upParams.calcIds[y] = this.getSexId(sexName)
              } else {
                this.onToast('当前被保人的性别与所选方案中的性别不相符！')
                return false
              }
            }
          }
        }
      }
      // 如果有社保情况，则改变社保报价因子
      if (this.sheBaoEntries.length > 0 && this.groupRiskFlag == 1) {
        for (let h = 0; h < upParams.calcIdKeys.length; h++) {
          if (upParams.calcIdKeys[h] == '社保情况') {
            upParams.calcIds[h] = this.sheBaoId
          }
        }
      }

      this.onProductCalc(upParams, res => {
        if (res.data.code == '200') {
          this.bbrInfoPop.premium = res.data.data.price
          this.bbrInfoPop.itemId = res.data.data.prdItemId
          if (this.sheBaoEntries.length > 0) {
            this.bbrInfoPop.bbrSheBaoId = this.sheBaoId
            this.bbrInfoPop.bbrSheBaoIndex = this.sheBaoIndex
          }
          callback();
        } else {
          this.onToast('响应失败，请重试！')
          return false
        }
      })
    },
    onDuoBbrIDChange(itemCode, userName) {
      //当被保人证件类型是组织机构代码/统一社会信用代码时
      if (this.checkBbrInfoPopItemValue(3, ['8', '9'])) {
        this.handleCardTypeForGroup(itemCode, userName, 2);
      }
    },
    // 判断投保人或者被保人证件号码的类型是什么（1：身份证 8或9：组织机构代码或社会统一代码  其他 分这三类）
    // 判断投保人或者被保人某一项当前的值是不是在传入的值的数组中
    // pageType(1:投保人 2：被保人) itemCode（某一项的itemCode代码） numArr 类似这样['8','9']
    checkItemValue(pageType, itemCode, numArr) {
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == pageType) {
          for (let j = 0; j < type.items.length; j++) {
            let item = type.items[j]
            if (item.itemCode == itemCode) {
              if (numArr.indexOf(item.userName) != -1) {
                return true
              }
            }
          }
        }
      }
      return false
    },
    checkBbrInfoPopItemValue(itemCode, numArr) {
      for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
        if (this.bbrInfoPop.otherOptionitems[i].itemCode == itemCode) {
          if (numArr.indexOf(this.bbrInfoPop.otherOptionitems[i].userName) != -1) {
            return true
          }
        }
      }
      return false
    },
    // 获取某一项的userName值
    getItemUserName(pageType, itemCode) {
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == pageType) {
          for (let j = 0; j < type.items.length; j++) {
            let item = type.items[j]
            if (item.itemCode == itemCode) {
              return item.userName
            }
          }
        }
      }
      return ''
    },
    // 获取某一项的userCode值
    getItemUserCode(pageType, itemCode) {
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == pageType) {
          for (let j = 0; j < type.items.length; j++) {
            let item = type.items[j]
            if (item.itemCode == itemCode) {
              return item.userCode
            }
          }
        }
      }
      return ''
    },
    // 获取bbrInfoPop某一项的userName值
    getBbrInfoPopItemUserName(itemCode) {
      for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
        if (itemCode == this.bbrInfoPop.otherOptionitems[i].itemCode) {
          return this.bbrInfoPop.otherOptionitems[i].userName
        }
      }
      return ''
    },
    // 当光标移出单个被保人的证件号码输入框时
    // 或者 选完单个被保人的出生日期时  所调方法
    onDanBbrIDNoOrAge(itemCode, userName) {
      let entries = JSON.parse(window.sessionStorage.getItem("entries"))
      let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      if (itemCode == 4) { // 证件号码blur时
        if (this.checkItemValue(2, 3, ['1'])) {
          if (this.checkMsgNull(userName)) {
            if (!this.checkIdCard(userName)) {// 身份证号校验未通过
              this.onToast('被保人身份证号错误')
              return false
            } else {
              let age = GetAge(userName, this.startDate, 1)
              let day = GetDay(userName, this.startDate, 1)
              if (entries && entries.length > 0) {
                let isContentAge = false
                for (let j = 0; j < entries.length; j++) {
                  if (isContent(entries[j].value, age, day)) {
                    isContentAge = true
                    upParams.calcIds[getAgeIndex(upParams)] = entries[j].id
                  }
                }
                if (!isContentAge) {
                  this.onToast('被保人年龄不在可投保范围内，请重新输入')
                  return false
                }
              }
              if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
                for (let y = 0; y < upParams.calcIdKeys.length; y++) {
                  if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                    let len = userName.length
                    let sexName = ''
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
                    if (this.checkMsgNull(this.getSexId(sexName))) {
                      upParams.calcIds[y] = this.getSexId(sexName)
                    } else {
                      this.onToast('当前被保人的性别与所选方案中的性别不相符！')
                      return false
                    }
                  }
                }
              }
            }
          } else {
            return false
          }
        } else if (this.checkItemValue(2, 3, ['8', '9'])) {
          this.handleCardTypeForGroup(itemCode, userName, 2);
        } else {
          return false
        }
      } else if (itemCode == 5) {
        if (this.checkMsgNull(userName)) {
          let age = GetAge(userName, this.startDate, 2)
          let day = GetDay(userName, this.startDate, 2)
          if (entries && entries.length > 0) {
            let isContentAge = false
            for (let j = 0; j < entries.length; j++) {
              if (isContent(entries[j].value, age, day)) {
                isContentAge = true
                upParams.calcIds[getAgeIndex(upParams)] = entries[j].id
              }
            }
            if (!isContentAge) {
              this.onToast('被保人年龄不在可投保范围内，请重新输入')
              return false
            }
          }
          if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
            for (let y = 0; y < upParams.calcIdKeys.length; y++) {
              if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                let sexName = ''
                if (this.checkItemValue(2, 2, ['1'])) {
                  sexName = '男'
                } else if (this.checkItemValue(2, 2, ['2'])) {
                  sexName = '女'
                }
                if (this.checkMsgNull(this.getSexId(sexName))) {
                  upParams.calcIds[y] = this.getSexId(sexName)
                } else {
                  this.onToast('当前被保人的性别与所选方案中的性别不相符！')
                  return false
                }
              }
            }
          }
        } else {
          return false
        }
      }
      this.onProductCalc(upParams, res => {
        if (res.data.code == '200') {
          this.showOptionItemId = res.data.data.prdItemId
          window.sessionStorage.setItem('showOptionItemId', this.showOptionItemId)
          this.onSetMoneyShow(res.data.data.price)
        }
      })
    },
    // 设置底部保费展示
    onSetMoneyShow(handlePrice) {

      let price = handlePrice
      let discountPrice = 0
      let averageMonthPrice = 0
      let firstMonthPrice = 0
      let otherMonthPrice = 0

      if (this.common.checkMsgNull(this.discount)) {//若有折扣
        this.money = this.common.accMul(handlePrice, this.discount).toFixed(2);
        discountPrice = this.common.accMul(handlePrice, this.discount).toFixed(2) //价格*折扣
      }
      if (this.common.checkMsgNull(this.monthPayType) && this.monthPayType == 12) {//若有月缴
        if (this.common.checkMsgNull(this.firstPremium)) {
          this.money = Number(this.firstPremium).toFixed(2)
          firstMonthPrice = this.firstPremium
          otherMonthPrice = ((Number(price) - Number(this.firstPremium)) / 11).toFixed(2)
        } else {
          this.money = (Number(handlePrice) / Number(this.monthPayType)).toFixed(2);
          averageMonthPrice = (Number(price) / 12).toFixed(2)
        }
      } else {
        this.money = handlePrice.toFixed(2);
      }
      price = price.toFixed(2)
      this.newPriceObj = {
        price: price,
        discountPrice: discountPrice,
        averageMonthPrice: averageMonthPrice,
        firstMonthPrice: firstMonthPrice,
        otherMonthPrice: otherMonthPrice,
      }
    },

    getBbrNum() {
      if (this.checkMsgNull(window.sessionStorage.getItem('bbrNum'))) {// 如果报价方案因子中有“被保人数”，则被保人最大最小人数都调整为方案中的被保人数
        this.pagedata.minGroupNum = parseInt(window.sessionStorage.getItem('bbrNum'))
        this.pagedata.maxGroupNum = parseInt(window.sessionStorage.getItem('bbrNum'))
      }
    },
    //根据年龄计算保费
    getTbNum() {
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == 1) {
          for (let j = 0; j < type.items.length; j++) {
            if (type.items[j].itemCode == 33) {
              this.tbNum = type.items[j].userName
            }
          }
        }
      }
    },
    lostFocus() {
      document.activeElement.blur()
    },
    numChangeDuoBbr(item) {
      if (item.itemCode == '3') {//证件类型

        if (item.userName == '1') {//身份证
          this.setBbrInfoPopShowFlag(['5', '2', '73', '74', '75'], false)
        } else {//非身份证
          if (item.userName == '8' || item.userName == '9') {//证件类型为组织机构代码/统一社会信用代码时
            this.setBbrInfoPopShowFlag(['73', '74', '75'], true)
            this.setBbrInfoPopShowFlag(['5', '2'], false)
          } else {//证件类型为非组织机构代码/统一社会信用代码
            this.setBbrInfoPopShowFlag(['73', '74', '75'], false)
            this.setBbrInfoPopShowFlag(['5', '2'], true)
          }
        }
      }
    },
    numChange(item, type, index) {
      if (item.itemCode == '33') {//投保份数
        this.tbNum = Number(item.userName)
      }
      if (type == 2) {//若是被保人
        if (item.itemCode == '3') {//证件类型

          if (item.userName == '1') {//身份证
            this.setShowFlag(2, ['5', '2', '73', '74', '75'], false)
          } else {//非身份证
            if (item.userName == '8' || item.userName == '9') {//组织机构代码/统一社会信用代码
              this.setShowFlag(2, ['73', '74', '75'], true)
              this.setShowFlag(2, ['5', '2'], false)
            } else {
              this.setShowFlag(2, ['73', '74', '75'], false)
              this.setShowFlag(2, ['5', '2'], true)
            }
          }
        }
      } else {//投保人
        if (item.itemCode == '3') {//证件类型
          if (item.userName == 1) {
            this.setShowFlag(1, ['2', '5'], false)
            this.setShowFlag(1, ['73', '74', '75'], false)
          } else if (['8', '9'].indexOf(item.userName) != -1) {
            this.setShowFlag(1, ['73', '74', '75'], true)
            this.setShowFlag(1, ['2', '5'], false)
          } else {
            this.setShowFlag(1, ['2', '5'], true)
            this.setShowFlag(1, ['73', '74', '75'], false)
          }
        }
      }
    },
    onInvoiceType(index, id) {
      this.invoiceIndex = index
      if (id == '1') {//个人
        this.setShowFlag(1, ['46', '42'], true)
        this.setShowFlag(1, ['43', '44', '27', '30', '31', '45'], false)
      } else {//企业
        this.setShowFlag(1, ['42', '43', '44', '27', '30', '31', '45'], true)
        this.setShowFlag(1, ['46'], false)
      }
      this.setSingleUserName(1, '42', id)
      window.sessionStorage.setItem('invoiceIndex', this.invoiceIndex)
      this.handlePagedataToSession()
    },
    // 设置某个类型中的某个字段为某个值
    setSingleUserName(pageType, itemCode, userName) {
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == pageType) {
          for (let j = 0; j < type.items.length; j++) {
            if (type.items[j].itemCode == itemCode) {
              type.items[j].userName = userName
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    // 设置某个类型中的某个字段为某个值
    setBbrInfoPopUserName(itemCode, userName) {

      let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
      for (let i = 0; i < bbrInfoPopCopy.otherOptionitems.length; i++) {
        if (bbrInfoPopCopy.otherOptionitems[i].itemCode == itemCode) {
          bbrInfoPopCopy.otherOptionitems[i].userName = userName
        }
      }
      this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))

    },
    // 检查是否有返回某个itemCode的录入项
    checkItemCode(pageType, itemCodeArr) {
      let flag = false
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == pageType) {
          for (let j = 0; j < type.items.length; j++) {
            if (itemCodeArr.indexOf(type.items[j].itemCode) != -1) {
              flag = true
            }
          }
        }
      }
      return flag
    },
    setShowFlag(pageType, itemCodeArr, isShow) {
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == pageType) {
          for (let j = 0; j < type.items.length; j++) {
            if (itemCodeArr.indexOf(type.items[j].itemCode) != -1) {
              type.items[j].isShow = isShow
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    setBbrInfoPopShowFlag(itemCodeArr, isShow) {
      let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
      for (let i = 0; i < bbrInfoPopCopy.otherOptionitems.length; i++) {
        if (itemCodeArr.indexOf(bbrInfoPopCopy.otherOptionitems[i].itemCode) != -1) {
          bbrInfoPopCopy.otherOptionitems[i].isShow = isShow
        }
      }
      this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))
    },
    commonOptionChange(item) {
      if (item.itemCode == '33') {//投保份数
        this.tbNum = Number(item.userName)
      }
      if (item.itemCode == '19') {//证件有效期
        if (item.userName == '2') {//短期
          this.setShowFlag(1, ['22'], true)
        } else {//长期
          this.setShowFlag(1, ['22'], false)
        }
      }
    },
    // 改变单被保人证件有效期 调方法
    onChangeDanbbrzjyxq(item) {
      if (item.userName == '2') {//短期
        this.setShowFlag(2, ['22'], true)
      } else {//长期
        this.setShowFlag(2, ['22'], false)
      }
    },
    // 改变多被保人证件有效期 调方法
    onChangeDuobbrzjyxq(item) {
      if (item.userName == '2') {//短期
        this.setBbrInfoPopShowFlag(['22'], true)
      } else {//长期
        this.setBbrInfoPopShowFlag(['22'], false)
      }
    },
    carChange(value) {
      if (value == '2') {//不是新车,车牌号必填,车架号选填
        this.isNewCar = false
        this.noRequiredField = ['35', '38', '39'];
        this.clearFieldValue(['35']);//切换时清空车架号
      } else {//是新车,车架号必填，车牌号选填
        this.isNewCar = true
        this.noRequiredField = ['36', '38', '39'];
        this.clearFieldValue(['35', '36']);//切换时清空车架号及车牌号
      }
      window.sessionStorage.setItem('isNewCar', this.isNewCar)
    },
    onIsNewCarOrNot(userName) {
      if (userName == '1') {// 1为新车
        this.isNewCar = true
        this.setSingleUserName(7, '36', '') // 新车，则将车牌号置空
        this.setSingleUserName(7, '95', '') // 新车，则将车牌号置空
      } else if (userName == '2') {// 2非新车
        this.isNewCar = false
        this.setSingleUserName(7, '35', '') // 非新车，则将车架号置空
      }
      window.sessionStorage.setItem('isNewCar', this.isNewCar)
    },

    changeStartTime(dataValue) {
      if (this.startDate == '' || this.startDate == null) {
        return;
      }
      var that = this;
      //立即生效(逻辑：立即生效是说当天可买， 能往后选起保日期得 继续从零时起保)
      if (this.pagedata.takesEffect == 0) {//是
        if (new Date(dataValue).getTime() == new Date(this.formatDate(new Date(), 'yyyy-MM-dd')).getTime()) {
          var takesEffectTime = new Date().getTime() + 60 * 30 * 1000;//当前时间+30分钟后生效
          var finalDateTime = this.common.formatDateTime(takesEffectTime);//时分秒
          this.startDate = finalDateTime.split(' ')[0] // 年月日
          this.lastDateString = finalDateTime.split(' ')[1];//时分秒  
        } else {
          this.lastDateString = '00:00:00'
        }
      }

      if (this.pagedata.insuranceIntervalType == 0) {
        let tempDate = new Date(this.startDate)
        if (this.pagedata.dayCount >= 365) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
          tempDate = new Date((Number(this.startDate.split('-')[0]) + Math.floor(this.pagedata.dayCount / 365)) + '-' + this.startDate.split('-')[1] + '-' + this.startDate.split('-')[2])
          tempDate.setDate(tempDate.getDate() - 1)
          this.endDate = tempDate.Format("yyyy-MM-dd");
        } else {
          tempDate.setDate(tempDate.getDate() + this.pagedata.dayCount - 1)
          this.endDate = tempDate.Format("yyyy-MM-dd");
        }
      } else if (this.pagedata.insuranceIntervalType == 1) {
        let tempDate = new Date(this.startDate)
        tempDate.setDate(tempDate.getDate() + this.pagedata.minDayCount - 1)
        this.endDate = tempDate.Format("yyyy-MM-dd")
        this.zhongbaoStartDate = tempDate.Format("yyyy-MM-dd")
        let tempDate2 = new Date(this.startDate)
        tempDate2.setDate(tempDate2.getDate() + this.pagedata.maxDayCount - 1)
        this.zhongbaoEndDate = tempDate2.Format("yyyy-MM-dd")
      }

      // window.sessionStorage.setItem('startDate', this.startDate)

      this.handleTbrInfo(() => {
        this.handleBbrInfo()
      })
    },
    handleTbrInfo(callback) {
      let checkAgeFlag = false
      let checkSexFlag = false
      let checkShebaoFlag = false
      let entries = JSON.parse(window.sessionStorage.getItem("entries"));
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
      let sheBaoEntries = JSON.parse(window.sessionStorage.getItem("sheBaoEntries"))
      if (this.checkItemValue(1, 3, ['1'])) {// 如果证件类型是身份证时的情况
        if (this.checkMsgNull(this.getItemUserName(1, 4))) {
          let idCardNumber = this.getItemUserName(1, 4)
          if (!this.checkIdCard(idCardNumber)) {// 身份证号校验未通过
            this.onToast('投保人身份证号错误')
          } else {
            let age = GetAge(idCardNumber, this.startDate, 1)
            let day = GetDay(idCardNumber, this.startDate, 1)
            if (entries && entries.length > 0) {//有年龄区间
              let isContentAge = false
              for (let i = 0; i < entries.length; i++) {
                if (isContent(entries[i].value, age, day)) {//true
                  upParams.calcIds[getAgeIndex(upParams)] = entries[i].id
                  checkAgeFlag = true
                  isContentAge = true
                }
              }
              if (!isContentAge && this.checkItemValue(2, 8, ['1', '12'])) {
                this.onToast('被保人年龄不在年龄区间内，请重新输入')
              }
            } else {
              checkAgeFlag = true
            }

            if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
              for (let y = 0; y < upParams.calcIdKeys.length; y++) {
                if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                  let len = idCardNumber.length
                  let sexName = ''
                  if (len == 15) {
                    if (parseInt(idCardNumber.substr(14, 1)) % 2 == 1) {// 男
                      sexName = '男'
                    } else {
                      sexName = '女'
                    }
                  } else if (len == 18) {
                    if (parseInt(idCardNumber.substr(16, 1)) % 2 == 1) {// 男
                      sexName = '男'
                    } else {
                      sexName = '女'
                    }
                  }
                  if (this.checkMsgNull(this.getSexId(sexName))) {
                    checkSexFlag = true
                    upParams.calcIds[y] = this.getSexId(sexName)
                  } else {
                    if (this.checkItemValue(2, 8, ['1', '12'])) {
                      this.onToast('当前被保人的性别与所选方案中的性别不相符！')
                    }
                  }
                }
              }
            } else {
              checkSexFlag = true
            }
          }
        }
      } else if (this.checkItemValue(1, 3, ['8', '9'])) { // 如果证件类型是组织机构代码证或者社会统一代码
        if (this.checkMsgNull(this.getItemUserName(1, 4))) {
          checkAgeFlag = true
          checkSexFlag = true
        }
      } else {
        if (this.checkMsgNull(this.getItemUserName(1, 5))) {
          let birthday = this.getItemUserName(1, 5)
          let age = GetAge(birthday, this.startDate, 2)
          let day = GetDay(birthday, this.startDate, 2)
          if (entries && entries.length > 0) {//有年龄区间
            let isContentAge = false
            for (let i = 0; i < entries.length; i++) {
              if (isContent(entries[i].value, age, day)) {//true
                upParams.calcIds[getAgeIndex(upParams)] = entries[i].id
                checkAgeFlag = true
                isContentAge = true
              }
            }
            if (!isContentAge && this.checkItemValue(2, 8, ['1', '12'])) {
              this.onToast('被保人年龄不在年龄区间内，请重新输入')
            }
          } else {
            checkAgeFlag = true
          }

          if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
            for (let y = 0; y < upParams.calcIdKeys.length; y++) {
              if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                let sexName = ''
                if (this.checkItemValue(1, 2, ['1'])) {
                  sexName = '男'
                } else if (this.checkItemValue(1, 2, ['2'])) {
                  sexName = '女'
                }
                if (this.checkMsgNull(this.getSexId(sexName))) {
                  checkSexFlag = true
                  upParams.calcIds[y] = this.getSexId(sexName)
                } else {
                  if (this.checkItemValue(2, 8, ['1', '12'])) {
                    this.onToast('当前被保人的性别与所选方案中的性别不相符！')
                  }
                }
              }
            }
          } else {
            checkSexFlag = true
          }
        }
      }
      if (sheBaoEntries && sheBaoEntries.length > 0 && this.groupRiskFlag == 1) {
        for (let h = 0; h < upParams.calcIdKeys.length; h++) {
          if (upParams.calcIdKeys[h] == '社保情况') {
            upParams.calcIds[h] = this.tbrSheBaoId
            checkShebaoFlag = true
          }
        }
      } else {
        checkShebaoFlag = true
      }
      if (checkAgeFlag && checkSexFlag && checkShebaoFlag) {// 调接口
        this.onProductCalc(upParams, res => {
          if (res.data.code == '200') {
            this.tbrItemId = res.data.data.prdItemId
            this.tbrPremium = res.data.data.price
            callback()
          }
        })
      } else {
        callback()
      }
    },
    handleDuoBbrInfo(i) {
      let item = this.bbrInfoPopList[i]
      if (item.userName == 1) {// 本人
        this.bbrInfoPopList[i].itemId = this.tbrItemId
        this.bbrInfoPopList[i].premium = this.tbrPremium
        i++
        if (i < this.bbrInfoPopList.length) {
          this.handleDuoBbrInfo(i)
        } else {
          let handlePrice = 0
          if (this.pagedata.isSharedPremium == 1) {//若不共享保额保费
            for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 再次循环被保人数组，计算当前被保人保费之和
              handlePrice += Number(this.bbrInfoPopList[i].premium)
            }
          } else {
            handlePrice = this.tbrPremium
          }
          this.onSetMoneyShow(handlePrice)
        }
      } else {
        let cardType;
        let userName;
        let entries = JSON.parse(window.sessionStorage.getItem("entries"));
        let sheBaoEntries = JSON.parse(window.sessionStorage.getItem("sheBaoEntries"));
        let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
        for (let k = 0; k < item.otherOptionitems.length; k++) {
          if (item.otherOptionitems[k].itemCode == '3') {//证件类型
            if (item.otherOptionitems[k].userName == '1') {//身份证
              cardType = 1;
            } else if (item.otherOptionitems[k].userName == '8' || item.otherOptionitems[k].userName == '9') {//非身份证
              cardType = 89;
            } else {
              cardType = 2
            }
          }
        }
        if (cardType == 1) {
          for (let k = 0; k < item.otherOptionitems.length; k++) {
            if (item.otherOptionitems[k].itemCode == '4') {//身份证
              userName = item.otherOptionitems[k].userName
            }
          }
          let age = GetAge(userName, this.startDate, 1)
          let day = GetDay(userName, this.startDate, 1)
          if (entries && entries.length > 0) {//有年龄区间
            for (let i = 0; i < entries.length; i++) {
              if (isContent(entries[i].value, age, day)) {//true
                upParams.calcIds[getAgeIndex(upParams)] = entries[i].id
              }
            }
          }
        } else if (cardType == 2) {
          for (let k = 0; k < item.otherOptionitems.length; k++) {
            if (item.otherOptionitems[k].itemCode == '5') {//出生日期
              userName = item.otherOptionitems[k].userName
            }
          }
          let age = GetAge(userName, this.startDate, 2)
          let day = GetDay(userName, this.startDate, 2)
          if (entries && entries.length > 0) {//有年龄区间
            for (let i = 0; i < entries.length; i++) {
              if (isContent(entries[i].value, age, day)) {//true
                upParams.calcIds[getAgeIndex(upParams)] = entries[i].id
              }
            }
          }
        }
        if (sheBaoEntries && sheBaoEntries.length > 0) {
          for (let h = 0; h < upParams.calcIdKeys.length; h++) {
            if (upParams.calcIdKeys[h] == '社保情况') {
              upParams.calcIds[h] = item.bbrSheBaoId
            }
          }
        }
        this.onProductCalc(upParams, res => {
          if (res.data.code == '200') {
            this.bbrInfoPopList[i].itemId = res.data.data.prdItemId
            this.bbrInfoPopList[i].premium = res.data.data.price
            console.log(res.data.data.price)
            i++
            console.log(i)
            console.log(this.bbrInfoPopList.length)
            if (i < this.bbrInfoPopList.length) {
              this.handleDuoBbrInfo(i)
            } else {
              let handlePrice = 0
              if (this.pagedata.isSharedPremium == 1) {//若不共享保额保费
                for (let i = 0; i < this.bbrInfoPopList.length; i++) {// 再次循环被保人数组，计算当前被保人保费之和
                  handlePrice += Number(this.bbrInfoPopList[i].premium)
                }
              } else {
                handlePrice = res.data.data.price
              }
              this.onSetMoneyShow(handlePrice)
            }
          }
        })
      }
    },
    handleBbrInfo() {
      if (this.groupRiskFlag == 1) {//多个被保人
        if (this.bbrInfoPopList && this.bbrInfoPopList.length > 0) {
          let i = 0
          this.handleDuoBbrInfo(i)
        } else {
          this.onSetMoneyShow(this.pagedata.basePrice)
        }
      } else if (this.groupRiskFlag == 0) {// 单个被保人
        if (this.checkItemValue(2, 8, ['1', '12'])) {
          if (this.checkMsgNull(this.tbrItemId)) {
            this.showOptionItemId = this.tbrItemId
            this.onSetMoneyShow(this.tbrPremium)
          } else {
            this.onSetMoneyShow(this.pagedata.basePrice)
          }
        } else {
          let checkDanBbrAgeFlag = false
          let checkDanBbrSexFlag = false
          let entries = JSON.parse(window.sessionStorage.getItem("entries"));
          let sexEntries = JSON.parse(window.sessionStorage.getItem("sexEntries"))
          let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
          if (this.checkItemValue(2, 3, ['1'])) {// 单被保人证件类型为身份证的情况
            if (this.checkMsgNull(this.getItemUserName(2, 4))) {
              let idCardNumber = this.getItemUserName(2, 4)
              if (!this.checkIdCard(idCardNumber)) {// 身份证号校验未通过
                this.onToast('被保人身份证号错误')
              } else {
                let age = GetAge(idCardNumber, this.startDate, 1)
                let day = GetDay(idCardNumber, this.startDate, 1)
                if (entries && entries.length > 0) {//有年龄区间
                  let isContentAge = false
                  for (var i = 0; i < entries.length; i++) {
                    if (isContent(entries[i].value, age, day)) {//true
                      upParams.calcIds[getAgeIndex(upParams)] = entries[i].id
                      checkDanBbrAgeFlag = true
                      isContentAge = true
                    }
                  }
                  if (!isContentAge) {
                    this.onToast('被保人年龄不在年龄区间内，请重新输入')
                  }
                } else {
                  checkDanBbrAgeFlag = true
                }
                if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
                  for (let y = 0; y < upParams.calcIdKeys.length; y++) {
                    if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                      let len = idCardNumber.length
                      let sexName = ''
                      if (len == 15) {
                        if (parseInt(idCardNumber.substr(14, 1)) % 2 == 1) {// 男
                          sexName = '男'
                        } else {
                          sexName = '女'
                        }
                      } else if (len == 18) {
                        if (parseInt(idCardNumber.substr(16, 1)) % 2 == 1) {// 男
                          sexName = '男'
                        } else {
                          sexName = '女'
                        }
                      }
                      if (this.checkMsgNull(this.getSexId(sexName))) {
                        checkDanBbrSexFlag = true
                        upParams.calcIds[y] = this.getSexId(sexName)
                      } else {
                        this.onToast('当前被保人身份证的性别与所选方案中的性别不相符！')
                      }
                    }
                  }
                } else {
                  checkDanBbrSexFlag = true
                }
              }
            }
          } else if (this.checkItemValue(2, 3, ['8', '9'])) {
            if (this.checkMsgNull(this.getItemUserName(2, 4))) {
              checkDanBbrAgeFlag = true
              checkDanBbrSexFlag = true
            }
          } else {
            if (this.checkMsgNull(this.getItemUserName(2, 5))) {
              let birthday = this.getItemUserName(2, 5)
              let age = GetAge(birthday, this.startDate, 2)
              let day = GetDay(birthday, this.startDate, 2)
              if (entries && entries.length > 0) {//有年龄区间
                let isContentAge = false
                for (var i = 0; i < entries.length; i++) {
                  if (isContent(entries[i].value, age, day)) {//true
                    upParams.calcIds[getAgeIndex(upParams)] = entries[i].id
                    checkDanBbrAgeFlag = true
                    isContentAge = true
                  }
                }
                if (!isContentAge) {
                  this.onToast('被保人年龄不在年龄区间内，请重新输入')
                }
              } else {
                checkDanBbrAgeFlag = true
              }
              if (sexEntries && sexEntries.length > 0) {// 方案中有性别区间
                for (let y = 0; y < upParams.calcIdKeys.length; y++) {
                  if (upParams.calcIdKeys[y] == '性别') {// 如果方案字段中有性别选项，则需要根据身份证号判断性别
                    let sexName = ''
                    if (this.checkItemValue(1, 2, ['1'])) {
                      sexName = '男'
                    } else if (this.checkItemValue(1, 2, ['2'])) {
                      sexName = '女'
                    }
                    if (this.checkMsgNull(this.getSexId(sexName))) {
                      checkDanBbrSexFlag = true
                      upParams.calcIds[y] = this.getSexId(sexName)
                    } else {
                      this.onToast('当前投保人的性别与所选方案中的性别不相符！')
                    }
                  }
                }
              } else {
                checkDanBbrSexFlag = true
              }
            }
          }
          if (checkDanBbrAgeFlag && checkDanBbrSexFlag) {// 调接口
            this.onProductCalc(upParams, res => {
              if (res.data.code == '200') {
                this.showOptionItemId = res.data.data.prdItemId
                window.sessionStorage.setItem('showOptionItemId', this.showOptionItemId)
                this.onSetMoneyShow(res.data.data.price)
              }
            })
          } else {
            this.onSetMoneyShow(this.pagedata.basePrice)
          }
        }
      }
    },
    getListNew() {
      if (!this.checkMsgNull(this.currentStyleName)) {
        this.onToast('产品不存在！')
        return
      }
      if (this.checkMsgNull(window.sessionStorage.getItem('sheBaoEntries'))) {
        this.sheBaoEntries = JSON.parse(window.sessionStorage.getItem('sheBaoEntries'))
      }

      this.loadingVisible = true

      this.$http.post("/prdmc/prdmcShop/insureData", {
        itemId: this.itemId,
        orgCode: this.orgCode
      }).then(res => {
        res = this.common.myReplaceAllUrl(res)
        this.loadingVisible = false
        if (this.isCache) {
          let pagedataCache = JSON.parse(window.sessionStorage.getItem('pagedata'))
          res.data.data.page = JSON.parse(JSON.stringify(pagedataCache.page))
          this.pagedata = res.data.data
          this.onInsurancesArr()
          this.setInvoiceShowFlag()
          console.log('走缓存------')
          this.getTbNum()
          this.getBbrNum()
          this.itemId = window.sessionStorage.getItem('itemId')
          this.isNewCar = window.sessionStorage.getItem('isNewCar') == 'true' ? true : false;//是否是新车
          this.renewInsuranceFlag = JSON.parse(window.sessionStorage.getItem('renewInsuranceFlag'));//一键续保标识
          this.showInvoice = window.sessionStorage.getItem('showInvoice') == 'true' ? true : false // 发票是否打钩
          if (this.checkMsgNull(window.sessionStorage.getItem('invoiceIndex'))) {
            this.invoiceIndex = Number(window.sessionStorage.getItem('invoiceIndex'));// 发票当前索引，是个人发票还是企业发票
          }
          if (this.checkMsgNull(window.sessionStorage.getItem('targetPop'))) {
            this.targetPop = JSON.parse(window.sessionStorage.getItem('targetPop'))
          }
          if (this.checkMsgNull(window.sessionStorage.getItem('targetPopList'))) {
            this.targetPopList = JSON.parse(window.sessionStorage.getItem('targetPopList'))
            if (this.targetPopList.length > 0) {
              this.targetNum = this.targetPopList.length
            }
          }
          if (this.sheBaoEntries.length > 0 && this.groupRiskFlag == 1) {
            this.tbrSheBaoId = window.sessionStorage.getItem('tbrSheBaoId')
            this.tbrSheBaoIndex = window.sessionStorage.getItem('tbrSheBaoIndex')
          }

          if (this.checkMsgNull(this.pagedata.minGroupNum) && this.checkMsgNull(this.pagedata.maxGroupNum)) {
            this.groupRiskFlag = 1 // 多个被保人
          } else {
            this.groupRiskFlag = 0 // 单个被保人
          }

          //设置页面标题
          Jquery(document).find('title').text(this.pagedata.prdName);

          //判断产品是否下架
          if (this.pagedata.productEndDateStr != '' && this.pagedata.productEndDateStr != null) {
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(this.pagedata.productEndDateStr.replace(/-/gm, "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//若产品下架日期小于当前时间,则提示下架
              this.loadingVisible = true;
              this.onToast('系统维护中！', 'middle', -1)
            }
          }
          this.onSpecialInfoInit()

          // if (this.pagedata.takesEffect == 0) {// 是即时生效
          //   var takesEffectTime = new Date().getTime() + 60 * 30 * 1000;//当前时间+30分钟后生效
          //   var finalDateTime = this.common.formatDateTime(takesEffectTime);//时分秒
          //   this.startDate = finalDateTime.split(' ')[0] // 年月日
          //   this.lastDateString = finalDateTime.split(' ')[1];//时分秒 
          // } else {
          //   // 起保日期取缓存中
          //   this.startDate = window.sessionStorage.getItem('startDate')
          // }

          this.startDate = window.sessionStorage.getItem('startDate')

          if (!this.checkMsgNull(this.pagedata.rangeDay)) {
            this.pagedata.rangeDay = 90;
          }

          if (this.pagedata.insuranceIntervalType == 0) {//固定区间：例1年
            let tempDate = new Date(this.startDate)
            if (this.pagedata.dayCount >= 365) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
              tempDate = new Date((Number(this.startDate.split('-')[0]) + Math.floor(this.pagedata.dayCount / 365)) + '-' + this.startDate.split('-')[1] + '-' + this.startDate.split('-')[2])
              tempDate.setDate(tempDate.getDate() - 1)
              this.endDate = tempDate.Format("yyyy-MM-dd");
            } else {
              tempDate.setDate(tempDate.getDate() + this.pagedata.dayCount - 1)
              this.endDate = tempDate.Format("yyyy-MM-dd");
            }
            if (this.pagedata.takesEffect == 0) {
              // this.qibaoStartDate = this.startDate
              this.qibaoStartDate = new Date().Format('yyyy-MM-dd')
              // let tempDate = new Date(this.startDate)
              let tempDate = new Date()
              tempDate.setDate(tempDate.getDate() + this.pagedata.rangeDay - 1)
              this.qibaoEndDate = tempDate.Format('yyyy-MM-dd')
            } else {
              this.qibaoStartDate = this.startDate
              let tempDate = new Date(this.startDate)
              tempDate.setDate(tempDate.getDate() + this.pagedata.rangeDay - 1)
              this.qibaoEndDate = tempDate.Format('yyyy-MM-dd')
            }
          } else if (this.pagedata.insuranceIntervalType == 1) {//间隔区间：例1天-5天
            let tempDate = new Date(this.startDate)
            tempDate.setDate(tempDate.getDate() + this.pagedata.minDayCount - 1)
            this.endDate = tempDate.Format('yyyy-MM-dd')

            let tempDate2 = new Date()
            tempDate2.setDate(tempDate2.getDate() + 1)
            this.qibaoStartDate = tempDate2.Format('yyyy-MM-dd')

            let tempDate3 = new Date()
            tempDate3.setDate(tempDate3.getDate() + 1 + this.pagedata.rangeDay - 1)
            this.qibaoEndDate = tempDate3.Format('yyyy-MM-dd')

            let tempDate4 = new Date(this.startDate)
            tempDate4.setDate(tempDate4.getDate() + this.pagedata.minDayCount - 1)
            this.zhongbaoStartDate = tempDate4.Format('yyyy-MM-dd')

            let tempDate5 = new Date(this.startDate)
            tempDate5.setDate(tempDate5.getDate() + this.pagedata.maxDayCount - 1)
            this.zhongbaoEndDate = tempDate5.Format('yyyy-MM-dd')
          }

          window.sessionStorage.setItem('startDate', this.startDate)

          //循环查找那个被保人,投保人的选项
          for (var i = 0; i < this.pagedata.page.length; i++) {
            for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
              if (this.pagedata.page[i].types[j].pageType == 2) {//被保人
                this.insureApplicant = this.pagedata.page[i].types[j].items;
              } else if (this.pagedata.page[i].types[j].pageType == 7) { // 标的信息
                this.targetInfo = JSON.parse(JSON.stringify(this.pagedata.page[i].types[j].items));
                for (let k = 0; k < this.targetInfo.length; k++) {
                  if (this.targetInfo[k].itemCode == 82) {
                    this.getItemTypeData('BusinessSource')
                  } else if (this.targetInfo[k].itemCode == 83) {
                    this.getItemTypeData('SubjectDetail')
                  } else if (this.targetInfo[k].itemCode == 84) {
                    this.getItemTypeData('BusinessSort')
                  } else if (this.targetInfo[k].itemCode == 85) {
                    this.getItemTypeData('StructureType')
                  }
                }
                if (this.checkMsgNull(this.pagedata.minTargetNum) && this.checkMsgNull(this.pagedata.maxTargetNum)) {
                  this.singleTargetFlag = false
                  this.manyTargetFlag = true
                } else {
                  this.singleTargetFlag = true
                  this.manyTargetFlag = false
                }
              }
            }
          }
          if (this.groupRiskFlag == 1) {//多个被保人
            if (this.checkMsgNull(window.sessionStorage.getItem('bbrInfoPop'))) {
              this.bbrInfoPop = JSON.parse(window.sessionStorage.getItem('bbrInfoPop')) // 当前正在编辑的被保人
            }
            if (this.checkMsgNull(window.sessionStorage.getItem('bbrInfoPopList'))) {
              this.bbrInfoPopList = JSON.parse(window.sessionStorage.getItem('bbrInfoPopList')) // 被保人数组集合
            }
            if (this.checkMsgNull(window.sessionStorage.getItem('bbrPopIndex'))) {
              this.bbrPopIndex = window.sessionStorage.getItem('bbrPopIndex')
            }

            if (this.sheBaoEntries.length > 0) {
              if (this.checkMsgNull(window.sessionStorage.getItem('sheBaoId'))) {
                this.sheBaoId = window.sessionStorage.getItem('sheBaoId')
              }
              if (this.checkMsgNull(window.sessionStorage.getItem('sheBaoIndex'))) {
                this.sheBaoIndex = window.sessionStorage.getItem('sheBaoIndex')
              }
              if (this.checkMsgNull(window.sessionStorage.getItem('tbrSheBaoId'))) {
                this.tbrSheBaoId = window.sessionStorage.getItem('tbrSheBaoId') // 投保人社保情况在社保数组中的id
              }
              if (this.checkMsgNull(window.sessionStorage.getItem('tbrSheBaoIndex'))) {
                this.tbrSheBaoIndex = window.sessionStorage.getItem('tbrSheBaoIndex') // 投保人社保索引
              }
            }

          } else if (this.groupRiskFlag == 0) {// 单个被保人
            if (this.checkMsgNull(window.sessionStorage.getItem('showOptionIndex'))) {
              this.showOptionIndex = window.sessionStorage.getItem('showOptionIndex')
            }
            if (this.checkMsgNull(window.sessionStorage.getItem('showOptionItemId'))) {
              this.showOptionItemId = window.sessionStorage.getItem('showOptionItemId')
            }
          }

          this.handleTbrInfo(() => {
            this.handleBbrInfo()
          })
        } else {
          this.pagedata = res.data.data
          this.onInsurancesArr()
          this.getBbrNum()

          this.onSetMoneyShow(this.pagedata.basePrice)
          window.sessionStorage.setItem('itemId', this.itemId)

          if (this.checkMsgNull(this.pagedata.minGroupNum) && this.checkMsgNull(this.pagedata.maxGroupNum)) {
            this.groupRiskFlag = 1 // 多个被保人
          } else {
            this.groupRiskFlag = 0 // 单个被保人
          }

          if (this.sheBaoEntries.length > 0 && this.groupRiskFlag == 1) {
            this.tbrSheBaoId = this.sheBaoEntries[this.tbrSheBaoIndex].id
            window.sessionStorage.setItem('tbrSheBaoId', this.tbrSheBaoId)
            window.sessionStorage.setItem('tbrSheBaoIndex', this.tbrSheBaoIndex)
          }
          //设置页面标题
          Jquery(document).find('title').text(this.pagedata.prdName);

          //判断产品是否下架
          if (this.pagedata.productEndDateStr != '' && this.pagedata.productEndDateStr != null) {
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(this.pagedata.productEndDateStr.replace(/-/gm, "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//若产品下架日期小于当前时间,则提示下架
              this.loadingVisible = true;
              this.onToast('系统维护中！', 'middle', -1)
            }
          }

          var defDate = new Date();//取当前时间

          //判断后台是否返回起保日期:若返回则以此为准,若不返回则默认为当前日期的下一天
          if (this.pagedata.productStartDateStr != '' && this.pagedata.productStartDateStr != null) {//返回起保日期
            var proStartDate = new Date(this.pagedata.productStartDateStr);
            if (proStartDate.getTime() < new Date().getTime()) {//若起保日期小于当前日期,则取当前日期的下一天
              defDate.setDate(defDate.getDate() + 1) //下一天开始
              this.startDate = defDate.Format('yyyy-MM-dd');
            } else {//否则取起保日期
              this.startDate = proStartDate.Format('yyyy-MM-dd');
            }
          } else {
            //是否立即生效(后台配置条件：必须是固定区间;不能配置起保日期)
            if (this.pagedata.takesEffect == 0) {//是
              var takesEffectTime = new Date().getTime() + 60 * 30 * 1000;//当前时间+30分钟后生效
              var finalDateTime = this.common.formatDateTime(takesEffectTime);//时分秒
              this.startDate = finalDateTime.split(' ')[0] // 年月日
              this.lastDateString = finalDateTime.split(' ')[1];//时分秒  
            } else {
              defDate.setDate(defDate.getDate() + 1) //下一天开始
              this.startDate = defDate.Format('yyyy-MM-dd');
            }
          }

          //若延迟生效天数不为空,则起保日期=所选的起保日期+起保日期生效延迟天数
          if (this.pagedata.startEffDelayDays != '' && this.pagedata.startEffDelayDays != null) {
            let tempDate = new Date(this.startDate)
            tempDate.setDate(tempDate.getDate() + parseInt(this.pagedata.startEffDelayDays))

            this.startDate = tempDate.Format('yyyy-MM-dd');
          }

          if (!this.checkMsgNull(this.pagedata.rangeDay)) {
            this.pagedata.rangeDay = 90
          }
          this.qibaoStartDate = this.startDate
          let tempDate = new Date(this.startDate)
          tempDate.setDate(tempDate.getDate() + this.pagedata.rangeDay - 1)
          this.qibaoEndDate = tempDate.Format('yyyy-MM-dd')

          if (this.pagedata.insuranceIntervalType == 0) {//固定区间：例1年
            let tempDate = new Date(this.startDate)
            if (this.pagedata.dayCount >= 365) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
              tempDate = new Date((Number(this.startDate.split('-')[0]) + Math.floor(this.pagedata.dayCount / 365)) + '-' + this.startDate.split('-')[1] + '-' + this.startDate.split('-')[2])
              tempDate.setDate(tempDate.getDate() - 1)
              this.endDate = tempDate.Format("yyyy-MM-dd");
            } else {
              tempDate.setDate(tempDate.getDate() + this.pagedata.dayCount - 1)
              this.endDate = tempDate.Format("yyyy-MM-dd");
            }

          } else if (this.pagedata.insuranceIntervalType == 1) {//间隔区间：例1天-5天
            let tempDate = new Date(this.startDate)
            tempDate.setDate(tempDate.getDate() + this.pagedata.minDayCount - 1)
            let tempDate2 = new Date(this.startDate)
            tempDate2.setDate(tempDate2.getDate() + this.pagedata.maxDayCount - 1)
            this.endDate = tempDate.Format("yyyy-MM-dd")
            this.zhongbaoStartDate = tempDate.Format('yyyy-MM-dd')
            this.zhongbaoEndDate = tempDate2.Format('yyyy-MM-dd')
          }

          window.sessionStorage.setItem('startDate', this.startDate)

          this.setUserName()
          this.tbrIsShow()
          if (this.groupRiskFlag == 1) {// 多被保人
            this.bbrIsShowNotBenren()
          } else { // 单被保人
            if (this.checkItemValue(2, 8, ['1', '12'])) {
              this.bbrIsShowIsBenren()
            } else {
              this.bbrIsShowNotBenren()
            }
          }

          this.handlePagedataToSession()

          //循环查找那个被保人,投保人的选项
          for (var i = 0; i < this.pagedata.page.length; i++) {
            for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
              if (this.pagedata.page[i].types[j].pageType == 2) {//被保人
                this.insureApplicant = JSON.parse(JSON.stringify(this.pagedata.page[i].types[j].items));
              } else if (this.pagedata.page[i].types[j].pageType == 7) { // 标的信息
                this.targetInfo = JSON.parse(JSON.stringify(this.pagedata.page[i].types[j].items));
                for (let k = 0; k < this.targetInfo.length; k++) {
                  if (this.targetInfo[k].itemCode == 82) {
                    this.getItemTypeData('BusinessSource')
                  } else if (this.targetInfo[k].itemCode == 83) {
                    this.getItemTypeData('SubjectDetail')
                  } else if (this.targetInfo[k].itemCode == 84) {
                    this.getItemTypeData('BusinessSort')
                  } else if (this.targetInfo[k].itemCode == 85) {
                    this.getItemTypeData('StructureType')
                  }
                }
                if (this.checkMsgNull(this.pagedata.minTargetNum) && this.checkMsgNull(this.pagedata.maxTargetNum)) {
                  this.singleTargetFlag = false
                  this.manyTargetFlag = true
                } else {
                  this.singleTargetFlag = true
                  this.manyTargetFlag = false
                }
              }
            }
          }

          if (this.targetInfo.length > 0 && this.manyTargetFlag == true) {
            this.targetPop = {}
            this.targetPop.otherOptionitems = this.generateTargetOtherOptionitems()
          }

          if (this.groupRiskFlag == 1) {//多个被保人

            this.bbrInfoPop = {}
            this.bbrInfoPop.premium = 0 // 设置多被保人的初始保费为0
            this.bbrInfoPop.itemId = '' // 设置itemId 方案报价id为空
            if (this.sheBaoEntries.length > 0) {
              this.bbrInfoPop.bbrSheBaoId = this.sheBaoEntries[0].id // 设置被保人社保id
              this.bbrInfoPop.bbrSheBaoIndex = 0  // 设置被保人社保索引
              this.sheBaoId = this.sheBaoEntries[0].id
              this.sheBaoIndex = 0
              window.sessionStorage.setItem('sheBaoId', this.sheBaoId)
              window.sessionStorage.setItem('sheBaoIndex', this.sheBaoIndex)
            }
            this.bbrInfoPop.options = this.insureApplicant[0].options
            this.bbrInfoPop.isHasOption = this.insureApplicant[0].isHasOption
            this.bbrInfoPop.itemName = this.insureApplicant[0].itemName
            this.bbrInfoPop.itemCode = this.insureApplicant[0].itemCode
            this.bbrInfoPop.otherOptionitems = JSON.parse(JSON.stringify(this.insureApplicant))
            if (this.insureApplicant[0].options[0].id == "1") {
              let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
              for (let i = 0; i < bbrInfoPopCopy.otherOptionitems.length; i++) {
                if (bbrInfoPopCopy.otherOptionitems[i].itemCode != 8) {
                  bbrInfoPopCopy.otherOptionitems[i].isShow = false
                }
              }
              this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))
            }
            this.bbrInfoPop.userName = this.insureApplicant[0].options[0].id
            window.sessionStorage.setItem('bbrInfoPop', JSON.stringify(this.bbrInfoPop))

          } else if (this.groupRiskFlag == 0) {// 单个被保人
          }
        }
      })

    },
    // 给有options选项的添加默认值
    setUserName() {
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == 1) { // 投保人
          for (let j = 0; j < type.items.length; j++) {
            let item = type.items[j]
            if (item.options != null && item.itemCode != 2) {
              item.userName = item.options[0].id
            }
            // 是否新车
            if (item.itemCode == '47') { // 默认非新车
              if (item.options != null) {
                item.userName = '2'
                this.isNewCar = false
              }
            }
          }
        } else if (type.pageType == 2) { // 被保人
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            if (item.options != null && item.itemCode != 2) {
              item.userName = item.options[0].id
            }
          }
        } else if (type.pageType == 7) { // 标的信息
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            let itemCode = item.itemCode
            if (itemCode == 56) {
              if (!this.checkMsgNull(item.userName)) {
                item.userName = this.dogType[0].name //给宠物品种赋默认值
              }
            } else if (itemCode == 47) { // 是否新车
              // 是否新车
              if (item.itemCode == '47') {
                if (item.options != null) {// 默认非新车
                  item.userName = '2'
                  this.isNewCar = false
                }
              }
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
                  this.petVariety = this.dogType
                } else if (item.options[0].id == 2) {
                  this.petVariety = this.catType
                }
              } else {
                item.userName = item.options[0].name;//给userName赋值
              }
            } else if (item.options == null) {
              if (itemCode == 56) {
                if (!this.checkMsgNull(item.userName)) {
                  item.userName = this.petVariety[0].name //给宠物品种赋默认值
                }
              }
            }
          }
        }
      }
    },
    // 设置投保人每一项是否展示
    tbrIsShow() {
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
            } else if (itemCode == 87) { // 如果有反洗钱出单传值开关字段，则展示性别
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
            } else if (itemCode == 41) {
              this.setInvoiceShowFlag()
            } else if (itemCode == 92) {
              if (this.checkItemCode(1, ['9'])) {
                item.isShow = false
              }
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    // 设置被保人每一项是否展示(本人的情况)
    bbrIsShowIsBenren() {
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == 2) { // 被保人
          for (let k = 0; k < type.items.length; k++) {
            let item = type.items[k]
            let itemCode = item.itemCode
            item.isShow = false
            if (itemCode == 8) {
              item.isShow = true
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
    },
    // 设置被保人每一项是否展示（非本人的情况）
    bbrIsShowNotBenren() {
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
            } else if (itemCode == 87) { // 如果有反洗钱出单传值开关字段，则展示性别
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
    onSwitchBbrPop(index, id) {
      if (!this.updateBbrInfoPopFlag) {
        this.bbrPopIndex = index
        this.bbrInfoPop.userName = id
        let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
        if (id == 1) {
          for (let i = 0; i < bbrInfoPopCopy.otherOptionitems.length; i++) {
            if (bbrInfoPopCopy.otherOptionitems[i].itemCode != 8) {
              bbrInfoPopCopy.otherOptionitems[i].isShow = false
            }
          }
        } else {
          bbrInfoPopCopy.otherOptionitems = JSON.parse(JSON.stringify(this.insureApplicant))
        }
        this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))
      }
    },
    // 点击不同 被保人与投保人关系 时，所调方法
    onSwitchBbrgx(index) {
      this.showOptionIndex = index
      window.sessionStorage.setItem('showOptionIndex', this.showOptionIndex)
      let pagedataCopy = JSON.parse(JSON.stringify(this.pagedata))
      for (let i = 0; i < pagedataCopy.page[0].types.length; i++) {
        let type = pagedataCopy.page[0].types[i]
        if (type.pageType == 2) {
          for (let j = 0; j < type.items.length; j++) {
            if (type.items[j].itemCode == 8) {
              type.items[j].userName = type.items[j].options[index].id
            }
          }
        }
      }
      this.pagedata = JSON.parse(JSON.stringify(pagedataCopy))
      if (this.checkItemValue(2, 8, ['1', '12'])) {
        this.bbrIsShowIsBenren()
      } else {
        this.bbrIsShowNotBenren()
      }
      this.handlePagedataToSession()
      if (this.checkMsgNull(this.tbrPremium) && this.checkItemValue(2, 8, ['1', '12'])) {
        this.onSetMoneyShow(this.tbrPremium)
      }
    },
    //清空投保页字段值(目前只限投保人)
    clearFieldValue(fieldArr) {
      if (this.pagedata.page.length > 0) {
        for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var k = 0; k < this.pagedata.page[i].types.length; k++) {
            if (this.pagedata.page[i].types[k].pageType == 1) {
              var item = this.pagedata.page[i].types[k].items;
              for (var t = 0; t < item.length; t++) {
                for (var x = 0; x < fieldArr.length; x++) {
                  if (item[t].itemCode == fieldArr[x]) {
                    item[t].userName = '';
                  }
                }
              }
            }
          }
        }
      }
    },
    close() {
      this.popupVisibleselect = false;
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    open(picker) {
      this.$refs[picker].open(); //设置开始
    },
    // 校验标的信息
    handleCheckTarget(item) {
      if (!this.checkMsgNull(item.userName)) {
        this.onToast("请输入" + item.itemName)
        return false
      }
      if (item.itemCode == 36 || item.itemCode == 95) { // 车牌号
        if (!this.isNewCar) {// 如果是非新车
          if (!this.checkVehicleNumber(item.userName)) {
            this.onToast('请输入正确的车牌号')
            return false
          }
        }
      } else if (item.itemCode == 94) { // 车架号
        item.userName = item.userName.toUpperCase()
        if (!this.common.checkCjh(item.userName)) {
          this.onToast('请输入正确的车架号')
          return false
        }
      } else if (item.itemCode == 80) { // 营业面积
        if (!this.checkZhengFloatNum(item.userName)) {
          this.onToast('请输入正确的营业面积')
          return false
        }
      } else if (item.itemCode == 81) { // 宠物芯片号
        if (!this.checkIllegalString(item.userName)) {
          this.onToast('请输入正确的宠物芯片号')
          return false
        }
      }
    },
    // 总体校验
    handleCommentFocus(q, e, isGroup, index) {
      if (q.itemCode == '5') {
        if (e == 2) {//被保人
          if (isGroup == 1) {//多个被保人
            if (typeof q['userName' + index] == 'undefined') {
              this.onToast('请选择出生日期')
            }
          } else {//单个被保人
            if (typeof q.userName == 'undefined') {
              this.onToast('请选择出生日期')
            }
          }
        } else {//投保人
          if (!q.userName) {
            this.onToast('请选择出生日期')
          }
        }
      } else if (this.noRequiredField.indexOf(q.itemCode) == -1) {//车牌号/手机品牌/手机型号不校验
        if (!q.userName) {
          this.onToast("请输入" + q.itemName)
        } else if (q.itemCode == "4") {//证明编号(不能为汉字)
          //使用了$refs,要写在$nextTick中
          this.$nextTick(_ => {
            let cardValue;
            if (e == 2) {//被保人
              cardValue = this.$refs.bBRIdType[0].value;//证件类型值
            } else {//投保人
              cardValue = this.$refs.idType[0].value;//证件类型值
            }
            // console.log(cardValue,'cardValue');
            if (cardValue == '1') {//居民身份证
              if (!this.checkIdCard(q.userName)) {
                if (e == 2) {
                  this.onToast('被保人身份证有误')
                } else if (e == 1) {
                  this.onToast('投保人身份证有误')
                }
              }
            } else if (cardValue == "8") {//组织机构代码
              q.userName = q.userName.toUpperCase();

              //            var orgCodeReg = /^[a-zA-Z]([a-zA-Z0-9-]+)$/i;
              var orgCodeReg = /^[\w\d-]+$/i;//匹配数字、字母及中划线
              var result = orgCodeReg.test(q.userName);
              if (!result) {
                this.onToast('组织机构代码证件编码不能为非法字符和中文')
              }

            } else if (cardValue == '9') {//统一社会信用代码
              var codeReg = /^([0-9A-Z]{2})([0-9]{6})([0-9A-Z]{8})([0-9X])([0-9A-Z])$/;
              var result = codeReg.test(q.userName);
              if (!result) {
                this.onToast('统一社会信用代码格式不正确')
              }

            } else {//港澳通行证/居民户口本等
              //var cardNum = new RegExp("[\\u4E00-\\u9FFF]+","g");
              var cardNum = /^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
              console.log(cardNum.test(q.userName));
              if (cardNum.test(q.userName)) {
                this.onToast('证件编号格式不正确')
              }
            }
          })
        } else if (q.itemCode == '1') {// 姓名
          if (!this.checkName(q.userName)) {
            this.onToast('姓名输入有误')
          }
        } else if (q.itemCode == "35") {//车架号
          q.userName = q.userName.toUpperCase();//小写转大写
          if (!this.common.checkCjh(q.userName)) {
            this.onToast('车架号有误')
          }
        } else if (
          q.itemCode == "6" ||
          q.itemCode == "31" ||
          q.itemCode == "14"
        ) {
          var checkphone = /^1[3456789]\d{9}$/;
          if (q.userName != undefined && !checkphone.test(q.userName)) {
            if (e == 2) {
              this.onToast('被保人手机号有误')
            } else if (e == 1) {
              this.onToast('投保人手机号有误')
            }
          }
        } else if (q.itemCode == '58') {// 宠物昵称
          let checkNicheng = /^[\u4e00-\u9fa5A-Za-z0-9]{0,20}$/
          if (q.userName != undefined && !checkNicheng.test(q.userName)) {
            this.onToast('宠物昵称填写有误！')
          }
        } else if (q.itemCode == '60') {// 宠物毛色
          let checkMaose = /^[\u4e00-\u9fa5]{1,5}$/
          if (q.userName != undefined && !checkMaose.test(q.userName)) {
            this.onToast('宠物毛色填写有误！')
          }
        }
      }
      /* 保存保单信息中间表接口 调用 开始 */
      if (e == 1) {// 投保人
        if (q.itemCode == 1 || q.itemCode == 3 || q.itemCode == 4 || q.itemCode == 6) {

          this.pagedata.page.forEach(l => {
            l.types.forEach((m, n) => {
              if (m.pageType == 1) {
                m.items.forEach(item => {
                  if (item.itemCode == 6 && this.checkMsgNull(item.userName) && this.checkMobilePhone(item.userName)) {
                    var holderName = ''
                    var holderMobile = ''
                    var holderIdno = ''
                    var holderIdtype = ''
                    this.pagedata.page.forEach(x => {
                      x.types.forEach(y => {
                        if (y.pageType == 1) {
                          y.items.forEach(z => {
                            if (z.itemCode == 1) {
                              if (this.checkMsgNull(z.userName) && this.checkName(z.userName)) {
                                holderName = z.userName
                              }
                            } else if (z.itemCode == 3) {
                              holderIdtype = z.userName
                            } else if (z.itemCode == 4) {
                              if (this.checkMsgNull(z.userName)) {
                                holderIdno = z.userName
                              }
                            } else if (z.itemCode == 6) {
                              holderMobile = z.userName
                            }
                          })
                        }
                      })
                    })
                    this.$http.post('/sunmc/policyInfoMiddle/createPolicyInfoMiddle', {
                      userSign: window.sessionStorage.getItem('userSign'),
                      holderName: holderName,
                      holderMobile: holderMobile,
                      holderIdno: holderIdno,
                      holderIdtype: holderIdtype,
                      prdId: window.sessionStorage.getItem('prdId'),
                      agentCode: this.channelCode,
                    }).then(res => {
                    })
                  }
                })
              }
            });
          });
        }
      }
      /* 保存保单信息中间表接口 调用 结束 */
    },
    //控件通用键盘事件
    handleCommonTypeIn(i) {
      if (i.itemCode == '35' || i.itemCode == '36') {//车牌号、车架号不允许输入空格，小写字母自动转大写
        if (i.userName == undefined) {
          return
        }
        i.userName = i.userName.replace(/\s+/g, "");
        i.userName = i.userName.toUpperCase()
      }
    },
    dataFun(idValue) {
      if (idValue < this.startDate) {
        this.onToast('请选择当天以后的日期')
        this.isData = false;
      } else {
        this.isData = true;
        var date2 = new Date(idValue);
        var dayCount2 = this.pagedata.dayCount - 1;
        date2.setDate(date2.getDate() + dayCount2);
        this.endDate =
          date2.getFullYear() +
          "-" +
          (date2.getMonth() + 1) +
          "-" +
          date2.getDate()
      }
    },
    getItemType(idIcon, i) {
      window.vm = this;
      let _itemType = ''
      if (idIcon == 'button82') {
        _itemType = new itemType(eval(this.itemType82Data), ['secondTypeList', 'thirdTypeList', 'fourthTypeList']);
      } else if (idIcon == 'button83') {
        _itemType = new itemType(eval(this.itemType83Data), ['secondTypeList']);
      } else if (idIcon == 'button84') {
        _itemType = new itemType(eval(this.itemType84Data), []);
      } else if (idIcon == 'button85') {
        _itemType = new itemType(eval(this.itemType85Data), []);
      }
      var that = this;
      var cityNum = _itemType.show(idIcon, function (code, name) {
        console.log(idIcon)
        console.log(code)
        console.log(name)
        i.userName = name;
        i.userCode = code;
        window.vm.handlePagedataToSession()
        window.vm.handlePagedataToSession()
      });
    },
    getCity(idIcon, i) {
      window.vm = this;
      this._key = ["cityList", "countyList"];
      var jsonData = this.cityData.content;
      this._json = eval(jsonData);
      this._address = new address(this._json);
      console.log(this._address)
      var that = this;
      var cityNum = this._address.show(idIcon, function (code, name) {
        console.log(code)
        console.log(name)
        i.userName = name;
        i.userCode = code;
        window.vm.handlePagedataToSession()
        window.vm.handlePagedataToSession()
      });
    },
    //工作三级联动
    getJob(idIcon, i) {
      window.vm = this;
      this._key = ["firstJobList", "secondJobList"];
      var jsonData = jobData.content;
      this._json = eval(jsonData);
      this._job = new job(this._json);
      console.log(this._job)
      var that = this;
      var jobNum = this._job.show(idIcon, function (code, name) {
        console.log(code)
        that.jobCode = code;
        i.userName = name;
        i.userCode = code;
        //        console.log(i);
        window.vm.handlePagedataToSession()
        window.vm.handlePagedataToSession()
      });
    },
    showselect(value, info123, num) {
      this.popupVisibleselect = "";
      this.option = value;
      this.boole = value.isHasOption;
      this.info12 = info123;
      this.typeNum = num;
    },
    getContacts() {
      if (this.sfzHao == "") { } else {
        this.$http
          .post("/ordmc/ordShopPolicy/selectOrdLinkmanToken", {
            cadNum: this.sfzHao
          })
          .then(res => {
            this.linkoptions = res.data.data;
          });
        this.linkIf = true;
      }
    },
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      console.log(fmt);
      return fmt;
    },
    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    },
    handleConfirm(value) {
      this.startDate = value;
    },
    next() {
      this.num++;
    },
    prev() {
      this.num--;
    },
    test() {
      this.popupVisible = false;
    },
    gotoRenewInsurance2018() {
      window.location.href = this.renewInsurResultPop.link2018;
    },

    // 生成请求报文需要的受益人信息
    generateBeneficiary() {
      this.beneficiary = [{
        alignment: 1,
        beneficiaryItems: [{
          code: '29',
          value: '1'
        }]
      }]
    },
    // 生成请求报文需要的宠物信息
    generatePetsItems() {
      this.petsItems = []
      this.pagedata.page.forEach(q => {
        q.types.forEach(w => {
          if (w.pageType == 8) {// 宠物信息
            w.items.forEach(e => {
              this.petsItems.push({
                code: e.itemCode,
                value: e.userName
              })
            })
          }
        })
      })
    },
    generateTagets() {
      this.targets = []
      if (this.singleTargetFlag) {
        let obj = {}
        if (this.groupRiskFlag == 1) {
          obj.itemId = this.bbrInfoPopList[0].itemId
        } else {
          obj.itemId = this.showOptionItemId
        }
        obj.targetItems = []
        for (let i = 0; i < this.pagedata.page.length; i++) {
          for (let j = 0; j < this.pagedata.page[i].types.length; j++) {
            if (this.pagedata.page[i].types[j].pageType == 7) {
              for (let k = 0; k < this.pagedata.page[i].types[j].items.length; k++) {
                // 行业、标的细类、企业性质、建筑结构 传的是userCode
                if (['82', '83', '84', '85'].indexOf(this.pagedata.page[i].types[j].items[k].itemCode) != -1) {
                  obj.targetItems.push({
                    code: this.pagedata.page[i].types[j].items[k].itemCode,
                    value: this.pagedata.page[i].types[j].items[k].userCode
                  })
                } else {
                  obj.targetItems.push({
                    code: this.pagedata.page[i].types[j].items[k].itemCode,
                    value: this.pagedata.page[i].types[j].items[k].userName
                  })
                }
              }
              this.targets.push(obj)
            }
          }
        }
      } else if (this.manyTargetFlag) {
        for (let i = 0; i < this.targetPopList.length; i++) {
          let obj = {}
          if (this.groupRiskFlag == 1) {
            obj.itemId = this.bbrInfoPopList[0].itemId
          } else {
            obj.itemId = this.showOptionItemId
          }
          obj.targetItems = []
          for (let j = 0; j < this.targetPopList[i].otherOptionitems.length; j++) {
            obj.targetItems.push({
              code: this.targetPopList[i].otherOptionitems[j].itemCode,
              value: this.targetPopList[i].otherOptionitems[j].userName
            })
          }
          this.targets.push(obj)
        }
      }

    },
    // 生成客户信息 chh时用到
    generateClientInfo() {
      this.clientInfo = {}
      this.pagedata.page.forEach(q => {
        q.types.forEach(w => {
          if (w.pageType == 1) { // 投保人
            w.items.forEach(e => {
              if (e.itemCode == 3) {
                this.clientInfo.idcartType = e.userName;
              } else if (e.itemCode == 1) {
                this.clientInfo.name = e.userName;
              } else if (e.itemCode == 4) {
                this.clientInfo.idcart = e.userName
              } else if (e.itemCode == 6) {
                this.clientInfo.phone = e.userName
              }
            })
          }
        })
      })
    },
    // 将pagedata存入缓存中
    handlePagedataToSession() {
      window.sessionStorage.setItem('pagedata', JSON.stringify(this.pagedata))
    },
    // 生成请求报文需要的投保人信息
    generatePolicyHolders() {
      this.policyHolders = []
      for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
        let type = this.pagedata.page[0].types[i]
        if (type.pageType == 1) {
          for (let j = 0; j < type.items.length; j++) {
            let item = type.items[j]
            if (item.isShow) {
              if (item.itemCode == "12") {// 所在地区
                this.policyHolders.push({
                  code: '12',
                  value: item.userCode
                })
              } else if (item.itemCode == "9") {// 所属职业
                this.policyHolders.push({
                  code: '9',
                  value: item.userCode
                });
              } else if (item.itemCode == "41") {//发票介质
                this.policyHolders.push({
                  code: '41',
                  value: this.showInvoice ? item.userName : ''
                });
              } else if (!this.checkMsgNull(item.userId)) {// userId是性别的代码
                this.policyHolders.push({
                  code: item.itemCode,
                  value: this.noRequiredField.indexOf(item.itemCode) >= 0 ? (this.checkMsgNull(item.userName) ? item.userName : '') : item.userName
                });
              } else {
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userId
                })
              }
            }
          }
        }
      }
    },
    // 生成请求报文需要的被保人信息(新)
    generateInsuredsNew() {
      this.insureds = []
      let tbrItems = null
      let bbrItems = null
      let tbrPhone = null
      for (let i = 0; i < this.pagedata.page.length; i++) {
        for (let j = 0; j < this.pagedata.page[i].types.length; j++) {
          if (this.pagedata.page[i].types[j].pageType == 1) {
            tbrItems = this.pagedata.page[i].types[j].items
            for (let k = 0; k < this.pagedata.page[i].types[j].items.length; k++) {
              if (this.pagedata.page[i].types[j].items[k].itemCode == 6) {
                tbrPhone = this.pagedata.page[i].types[j].items[k].userName
              }
            }
          } else if (this.pagedata.page[i].types[j].pageType == 2) {
            bbrItems = this.pagedata.page[i].types[j].items
          }
        }
      }
      this.pagedata.page.forEach(q => {
        q.types.forEach(w => {
          if (w.pageType == 2) { // 被保人

            if (this.groupRiskFlag == 1) { //多个被保人
              for (var i = 0; i < this.bbrInfoPopList.length; i++) {
                var obj = {
                  linkmanId: this.linkmanId,
                  itemId: this.bbrInfoPopList[i].itemId,
                  insuredItems: []
                }
                var user = this.bbrInfoPopList[i]; // 多个被保人任务对象 。。。
                var item = {
                  code: user.itemCode,
                  value: user.userName
                }
                obj.insuredItems.push(item) // 与投保人关系那一项
                if (user.userName == '1') { //  写入本人信息。。
                  for (let m = 0; m < bbrItems.length; m++) {
                    for (let n = 0; n < tbrItems.length; n++) {
                      if (bbrItems[m].itemCode == tbrItems[n].itemCode && tbrItems[n].isShow) {
                        if (bbrItems[m].itemCode == 12) {
                          obj.insuredItems.push({
                            code: '12',
                            value: tbrItems[n].userCode
                          })
                        } else if (bbrItems[m].itemCode == 9) {
                          obj.insuredItems.push({
                            code: '9',
                            value: tbrItems[n].userCode
                          })
                        } else {
                          obj.insuredItems.push({
                            code: tbrItems[n].itemCode,
                            value: tbrItems[n].userName
                          })
                        }
                      }
                    }
                  }
                } else {
                  for (let j = 0; j < user.otherOptionitems.length; j++) {
                    let optionItem = user.otherOptionitems[j]
                    if (optionItem.isShow && optionItem.itemCode != 8) {
                      //处理日期
                      if (optionItem.itemCode == '5') {
                        obj.insuredItems.push({
                          code: optionItem.itemCode,
                          value: optionItem.userName
                        })
                      } else if (optionItem.itemCode == '6') {
                        if (!this.checkMsgNull(optionItem.userName)) {
                          obj.insuredItems.push({
                            code: optionItem.itemCode,
                            value: tbrPhone
                          })
                        } else {
                          obj.insuredItems.push({
                            code: optionItem.itemCode,
                            value: optionItem.userName
                          })
                        }
                      } else {
                        obj.insuredItems.push({
                          code: optionItem.itemCode,
                          value: optionItem.userName
                        })
                      }
                    }

                  }
                }
                this.insureds.push(obj)
              }
            } else { // 单个被保人
              var obj = {
                linkmanId: this.linkmanId,
                itemId: this.showOptionItemId,
                insuredItems: []
              }
              if (this.checkItemValue(2, 8, ['1', '12'])) {//若是本人
                obj.insuredItems.push({
                  code: '8',
                  value: this.getItemUserName(2, 8) + ''
                })
                for (let i = 0; i < bbrItems.length; i++) {
                  for (let j = 0; j < tbrItems.length; j++) {
                    if (bbrItems[i].itemCode == tbrItems[j].itemCode && tbrItems[j].isShow) {
                      if (bbrItems[i].itemCode == 12) {
                        obj.insuredItems.push({
                          code: '12',
                          value: tbrItems[j].userCode
                        })
                      } else if (bbrItems[i].itemCode == 9) {
                        obj.insuredItems.push({
                          code: '9',
                          value: tbrItems[j].userCode
                        })
                      } else {
                        obj.insuredItems.push({
                          code: tbrItems[j].itemCode,
                          value: tbrItems[j].userName
                        })
                      }
                    }
                  }
                }
              } else {//不是本人
                for (let i = 0; i < bbrItems.length; i++) {
                  if (bbrItems[i].isShow) {
                    if (bbrItems[i].itemCode == 12) {
                      obj.insuredItems.push({
                        code: '12',
                        value: bbrItems[i].userCode
                      })
                    } else if (bbrItems[i].itemCode == 9) {
                      obj.insuredItems.push({
                        code: '9',
                        value: bbrItems[i].userCode
                      });
                    } else {
                      obj.insuredItems.push({
                        code: bbrItems[i].itemCode,
                        value: bbrItems[i].userName
                      });
                    }
                  }
                }
              }
              this.insureds.push(obj);
            }
          }
        })
      })
    },
    // 校验投保人信息是否已经填写
    checkTbrInfo() {
      for (var l = 0; l < this.pagedata.page.length; l++) {
        for (var m = 0; m < this.pagedata.page[l].types.length; m++) {
          var z = this.pagedata.page[l].types[m];
          if (this.pagedata.page[l].types[m].pageType == 1) {//投保人
            for (var k = 0; k < z.items.length; k++) {
              if (z.items[k].isShow) {
                if (this.noRequiredField.indexOf(z.items[k].itemCode) == -1) {//非必填字段不校验
                  if (z.items[k].userName == undefined || z.items[k].userName == '') {
                    this.onToast(z.items[k].itemName + '不能为空')
                    return false
                  }
                  if (z.items[k].itemCode == '35') {//校验车架号
                    z.items[k].userName = z.items[k].userName.toUpperCase()
                    if (!this.common.checkCjh(z.items[k].userName)) {
                      this.onToast('车架号错误')
                      return false
                    }
                  } else if (z.items[k].itemCode == "4") {
                    if (z.items[k - 1].userName == '1') { // 开始校验身份证
                      if (!this.checkIdCard(z.items[k].userName)) {
                        this.onToast('投保人身份证有误')
                        return false
                      }
                    } else {//校验非身份证件(不能输入汉字)
                      // var cardNum = new RegExp("[\\u4E00-\\u9FFF]+","g");
                      var cardNum = /^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
                      if (cardNum.test(z.items[k].userName)) {
                        this.onToast('投保人证件号有误')
                        return false
                      }
                    }
                  } else if (z.items[k].itemCode == "6" || z.items[k].itemCode == "14") {
                    var checkphone = /^1[3456789]\d{9}$/;
                    if (z.items[k].userName != undefined && !checkphone.test(z.items[k].userName)) {
                      this.onToast('投保人手机号有误')
                      return false
                    }
                  } else if (z.items[k].itemCode == "7") {
                    if (z.items[k].userName != undefined && !this.checkEmail(z.items[k].userName)) {
                      this.onToast('投保人邮箱有误')
                      return false
                    }
                  }
                } else {
                  if (z.items[k].itemCode == "31") {//若填写银行预留手机号
                    var checkphone = /^1[3456789]\d{9}$/;
                    if (z.items[k].userName != undefined && z.items[k].userName != "" && !checkphone.test(z.items[k].userName)) {
                      this.onToast('银行预留手机号有误')
                      return false
                    }
                  }
                }
              }
            }
          }
        }
      }
      return true
    },
    // 校验信息
    checkNoError() {
      for (var m = 0; m < this.pagedata.page[0].types.length; m++) {
        var z = this.pagedata.page[0].types[m];
        if (z.pageType == 1) {//投保人
          for (var k = 0; k < z.items.length; k++) {
            if (z.items[k].isShow) {
              if (this.noRequiredField.indexOf(z.items[k].itemCode) == -1) {//非必填字段不校验
                if (z.items[k].userName == undefined || z.items[k].userName == '') {
                  this.onToast("请输入" + z.items[k].itemName)
                  return false
                }
                if (z.items[k].itemCode == '35') {//校验车架号
                  z.items[k].userName = z.items[k].userName.toUpperCase()
                  if (!this.common.checkCjh(z.items[k].userName)) {
                    this.onToast('车架号错误')
                    return false
                  }
                } else if (z.items[k].itemCode == "4") {
                  if (z.items[k - 1].userName == '1') { // 开始校验身份证
                    if (!this.checkMsgNull(z.items[k].userName)) {
                      this.onToast('身份证号输入错误')
                      return false
                    }
                  } else {//校验非身份证件(不能输入汉字)
                    // var cardNum = new RegExp("[\\u4E00-\\u9FFF]+","g");
                    var cardNum = /^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
                    if (cardNum.test(z.items[k].userName)) {
                      this.onToast('证件编号不能输入汉字')
                      return false
                    }
                  }
                } else if (z.items[k].itemCode == "6" || z.items[k].itemCode == "14") {
                  var checkphone = /^1[3456789]\d{9}$/;
                  if (z.items[k].userName != undefined && !checkphone.test(z.items[k].userName)) {
                    this.onToast("投保人手机号有误")
                    return false
                  }
                } else if (z.items[k].itemCode == "7") {
                  if (z.items[k].userName != undefined && !this.checkEmail(z.items[k].userName)) {
                    this.onToast('投保人邮箱有误')
                    return false
                  }
                }
              } else {
                if (z.items[k].itemCode == "31") {//若填写银行预留手机号
                  var checkphone = /^1[3456789]\d{9}$/;
                  if (z.items[k].userName != undefined && z.items[k].userName != "" && !checkphone.test(z.items[k].userName)) {
                    this.onToast("银行预留手机号有误")
                    return false
                  }
                }
              }
            }
          }
        } else if (z.pageType == 2) {//被保人信息

          if (this.groupRiskFlag == 1) {//多个被保人
            if (this.bbrInfoPopList.length < this.pagedata.minGroupNum) {// 如果被保人的数量小于最小多个被保人人数，则错误
              this.onToast('被保人人数不能小于' + this.pagedata.minGroupNum + '人')
              return false
            } else if (this.bbrInfoPopList.length > this.pagedata.maxGroupNum) {
              this.onToast('被保人人数不能多于' + this.pagedata.maxGroupNum + '人')
              return false
            }
          } else {//单个被保人
            if (!this.checkItemValue(2, 8, ['1', '12'])) { // 如果被保人不是本人
              for (let i = 0; i < this.pagedata.page[0].types.length; i++) {
                let type = this.pagedata.page[0].types[i]
                if (type.pageType == 2) {
                  for (let j = 0; j < type.items.length; j++) {
                    let item = type.items[j]
                    if (item.isShow) {
                      if (item.itemCode == '5') {//出生日期
                        if (!this.checkMsgNull(item.userName)) {
                          this.onToast('请选择出生日期')
                          return false
                        }
                      } else if (!this.checkMsgNull(item.userName)) {
                        this.onToast("请输入" + item.itemName)
                        return false
                      } else if (item.itemCode == 4) {
                        if (this.checkItemValue(2, 3, ['1'])) {// 如果证件类型是身份证
                          if (!this.checkIdCard(item.userName)) {
                            this.onToast('身份证输入有误!')
                            return false
                          } else {//校验非身份证(不能输入汉字)
                            var cardNum = /^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
                            if (cardNum.test(type.items[j].userName)) {
                              this.onToast('证件编号不能输入汉字')
                              return false
                            }
                          }
                        }
                      } else if (['6', '14', '31'].indexOf(item.itemCode) != -1) {
                        if (!this.checkMobilePhone(item.userName)) {
                          this.onToast(item.itemName + "格式不对")
                          return false
                        }
                      } else if (item.itemCode == 7) {
                        if (!this.checkEmail(item.userName)) {
                          this.onToast('邮箱格式不对')
                          return false
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else if (z.pageType == 8) {// 宠物信息
          for (var k = 0; k < z.items.length; k++) {
            if (z.items[k].userName == undefined || z.items[k].userName == '') {
              this.onToast("请输入" + z.items[k].itemName)
              return false
            } else if (z.items[k].itemCode == '58') {// 宠物昵称
              let checkNicheng = /^[\u4e00-\u9fa5A-Za-z0-9]{0,20}$/
              if (z.items[k].userName != undefined && !checkNicheng.test(z.items[k].userName)) {
                this.onToast('宠物昵称填写有误！')
                return false
              }
            } else if (z.items[k].itemCode == '60') {// 宠物毛色
              let checkMaose = /^[\u4e00-\u9fa5]{1,5}$/
              if (z.items[k].userName != undefined && !checkMaose.test(z.items[k].userName)) {
                this.onToast('宠物毛色填写有误！')
                return false
              }
            }
          }
        } else if (z.pageType == 7) {// 标的信息
          if (this.singleTargetFlag) {
            for (var k = 0; k < z.items.length; k++) {
              if (!this.checkMsgNull(z.items[k].userName)) {
                if (z.items[k].itemCode == 36 || z.items[k].itemCode == 95) {
                  if (!this.isNewCar) {
                    this.onToast("请输入" + z.items[k].itemName)
                    return false
                  }
                } else if (z.items[k].itemCode == 35 || z.items[k].itemCode == 94) {
                  if (this.isNewCar) {
                    this.onToast("请输入" + z.items[k].itemName)
                    return false
                  }
                } else if (z.items[k].itemCode == 69) {
                  this.onToast("请上传" + z.items[k].itemName)
                  return false
                } else {
                  this.onToast("请输入" + z.items[k].itemName)
                  return false
                }
              } else if (z.items[k].itemCode == 36 || z.items[k].itemCode == 95) {
                if (!this.checkVehicleNumber(z.items[k].userName)) {
                  this.onToast('车牌号填写有误！')
                  return false
                }
              } else if (z.items[k].itemCode == 35 || z.items[k].itemCode == 94) {
                if (!this.common.checkCjh(z.items[k].userName)) {
                  this.onToast('车架号填写有误！')
                  return false
                }
              } else if (!this.checkMsgNull(z.items[k].userName)) {
                this.onToast("请输入" + z.items[k].itemName)
                return false
              } else if (z.items[k].itemCode == 80) {
                if (!this.checkZhengFloatNum(z.items[k].userName)) {
                  this.onToast('营业面积填写有误！')
                  return false
                }
              } else if (z.items[k].itemCode == 81) { // 宠物芯片号
                if (!this.checkIllegalString(z.items[k].userName)) {
                  this.onToast('请输入正确的宠物芯片号')
                  return false
                }
              }
            }
          }
        }
      }
      return true
    },
    topay() {

      var urlP = window.location.href.split('?');
      if (urlP.length == 2) {
        urlP = urlP[0];
      }
      var finalUrl = urlP + '?' + this.urlParam;
      this.generateClientInfo()
      this.$http.post('/sunmc/cch/onCCH', {
        'channelCode': this.channelCode,
        'orgCode': this.orgCode,
        'pageName': this.channelName + this.pagedata.prdName + '-保单填写页',
        'pointKey': this.pointKey + '_保单填写页' + '_提交订单',
        'productId': this.$route.query.prdId,
        'url': finalUrl,
        'policyNo': '',
        'clientInfo': this.clientInfo
      }).then(res => { });

      if (!this.checkNoError()) {
        return
      }
      if (this.manyTargetFlag) {
        if (this.targetPopList.length < this.pagedata.minTargetNum) {
          this.onToast('标的信息数量不能少于：' + this.pagedata.minTargetNum)
          return false
        }
      }
      // 校验时间
      if (!this.startDate) {
        this.onToast('请选择起保日期')
        return false
      } else if (!this.endDate) {
        this.onToast('请选择结束日期')
        return false
      }
      if (this.pagedata.insuranceIntervalType == 1) { // 判断时间
        var start_date = new Date(this.startDate);
        var days = dateMinus(start_date, this.endDate);

        if (days < this.pagedata.minDayCount || days > this.pagedata.maxDayCount) {
          this.onToast('保险区间错误')
          return
        }
      }
      if (!this.checkedFlag) {
        this.onToast('请同意相关协议')
        return;
      }
      let sessionOper = sessionOperation()

      this.generatePolicyHolders()
      this.generateInsuredsNew()
      this.generateBeneficiary()
      this.generatePetsItems()
      this.generateTagets()

      this.startTime = new Date().getTime()

      // 首先清除了在存入。。。
      window.sessionStorage.removeItem('showOptionItemId');
      window.sessionStorage.removeItem('startDate');
      window.sessionStorage.removeItem('money');
      window.sessionStorage.removeItem('itemId')
      window.sessionStorage.removeItem('channelName')
      window.sessionStorage.removeItem('isNewCar')
      window.sessionStorage.removeItem('discount');
      window.sessionStorage.removeItem('monthPayType');
      window.sessionStorage.removeItem('firstPremium');
      window.sessionStorage.removeItem('renewInsuranceFlag');
      window.sessionStorage.removeItem('bbrPopIndex');
      window.sessionStorage.removeItem('bbrInfoPop');
      window.sessionStorage.removeItem('bbrInfoPopList');
      window.sessionStorage.removeItem('tbrSheBaoId');
      window.sessionStorage.removeItem('tbrSheBaoIndex');
      window.sessionStorage.removeItem('sheBaoId');
      window.sessionStorage.removeItem('sheBaoIndex');
      window.sessionStorage.removeItem('showInvoice');
      window.sessionStorage.removeItem('targetPop');
      window.sessionStorage.removeItem('targetPopList');
      window.sessionStorage.removeItem('pagedata');

      // 再存存入数据
      window.sessionStorage.setItem('pagedata', JSON.stringify(this.pagedata));
      window.sessionStorage.setItem('showOptionItemId', this.showOptionItemId);
      window.sessionStorage.setItem('startDate', this.startDate);
      window.sessionStorage.setItem('money', this.money);
      window.sessionStorage.setItem('itemId', this.itemId);
      window.sessionStorage.setItem('channelName', this.channelName);
      window.sessionStorage.setItem('isNewCar', this.isNewCar);
      //发票
      window.sessionStorage.setItem('discount', this.discount);//折扣
      window.sessionStorage.setItem('monthPayType', this.monthPayType);//分期数
      window.sessionStorage.setItem('firstPremium', this.firstPremium);// 首期保费
      window.sessionStorage.setItem('renewInsuranceFlag', JSON.stringify(this.renewInsuranceFlag));
      window.sessionStorage.setItem('showInvoice', this.showInvoice);
      window.sessionStorage.setItem('invoiceIndex', this.invoiceIndex);
      window.sessionStorage.setItem('showOptionIndex', this.showOptionIndex);
      window.sessionStorage.setItem('tbrSheBaoId', this.tbrSheBaoId);
      window.sessionStorage.setItem('tbrSheBaoIndex', this.tbrSheBaoIndex);
      window.sessionStorage.setItem('sheBaoId', this.sheBaoId);
      window.sessionStorage.setItem('sheBaoIndex', this.sheBaoIndex);
      window.sessionStorage.setItem('targetPop', JSON.stringify(this.targetPop))
      window.sessionStorage.setItem('targetPopList', JSON.stringify(this.targetPopList))

      if (this.groupRiskFlag == 1) {//多个被保人
        window.sessionStorage.setItem('bbrPopIndex', this.bbrPopIndex)
        window.sessionStorage.setItem('bbrInfoPop', JSON.stringify(this.bbrInfoPop))
        window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
      }


      //判断是否为微信小程序环境
      if (window.__wxjs_environment === 'miniprogram') {
        this.payFlag = "1";
      }
      console.log(window.__wxjs_environment, '是否是微信小程序环境')

      if (window.sessionStorage.getItem('isAlipayMiniFlag') ? window.sessionStorage.getItem('isAlipayMiniFlag') : false) {//若是在支付宝小程序环境里
        this.payFlag = "2";
      }

      //在url中获取openid值
      this.openId = this.common.getUrlValueByName('openid');

      this.paramstopay = {
        shenCeUserId: this.getShenCeUserId(),
        channelCode: this.channelCode,
        orgCode: this.orgCode,
        userSign: window.sessionStorage.getItem('userSign'),
        // itemId: this.itemId, //生成订单序号
        styleId: this.$route.query.styleId,//方案ID
        startDate: this.startDate + " " + this.lastDateString,
        endDate: this.endDate + " " + this.endLastDateString,
        isCustom: true,
        policyHolders: this.policyHolders,
        petsItems: this.petsItems,
        targets: this.targets,
        insureds: this.insureds,
        beneficiary: this.beneficiary,
        addressCode: this.getItemUserCode(1, 12),
        urlParam: this.urlParam ? this.urlParam : '',
        payFlag: this.payFlag,
        openId: this.openId,//代扣微信用户唯一标识(分期代扣产品必传)
        instalmentNum: this.monthPayType,//分期数
        oldpolicyNoUnid: this.underwritingPolicyRes.oldpolicyNoUnid,//上年保单号标识(二次核保时传第一次核保返回的key值)
        reUnderwrite: this.underwritingPolicyRes.reUnderwrite,//二次核保标识(默认为1，当出参status为100010时赋值2)
        renewInsurance: this.renewInsuranceFlag ? this.renewInsuranceFlag : "",//一键续保标识
        zhugeUserId: ''
      }
      // this.paramsToCreate = this.common.deepCopy(this.paramstopay);//拷贝对象
      // this.paramstopay.reUnderwrite = this.underwritingPolicyRes.reUnderwrite;//二次核保标识(默认为1，当出参status为100010时赋值2)
      // this.paramstopay.renewInsurance = this.renewInsuranceFlag ? this.renewInsuranceFlag : "";//一键续保标识

      // cch 埋点和诸葛埋点
      // 这里需要构造被保人信息给cch埋点 clientInfo----
      // {"channelCode":"DC23ZD0500140006","clientInfo":{"idcart":"110101199301010439","idcartType":"1","name":"姜军","phone":"18330232875"},"pointKey":"point1","productId":"58","urlParam":"id=58&Code=DC11CD0100030001&carownerCode=CAMS14870649600004913"}
      //渠道名称+产品名称+详情页面

      // let timer = setInterval(() => {
      //   if (this.canPayFlag) {
      //     this.canPayFlag = false
      //     this.underwritingPolicy(this.paramstopay)
      //     clearInterval(timer)
      //     console.log('timer-inner')
      //   }
      //   console.log('timer')
      // }, 1000)

      if (this.handleBbrPopPageShowOrNo()) {
        this.showBbrPopPage = true
        this.onNoScroll()
      } else {
        this.underwritingPolicy(this.paramstopay)
      }

    },
    handleBbrPopPageShowOrNo() {
      let itemData = JSON.parse(window.sessionStorage.getItem('itemData'))
      if (itemData.healths.length) {
        for (let i = 0; i < itemData.healths.length; i++) {
          if (itemData.healths[i].type == 2) {
            if (this.groupRiskFlag == 0) {
              if (this.getItemUserName(2, 8) != 1) {
                return true
              }
            } else {
              if (this.bbrInfoPopList.length == 1 && this.bbrInfoPopList[0].userName == 1) {
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
    //核保接口
    // underwritingPolicy(paramstopay) {
    //   this.loadingVisible = true
    //   //核保
    //   this.$http.post("/sunmc/ordSun/underwritingPolicy", paramstopay).then(res => {
    //     console.log(JSON.stringify(res));
    //     if (res.data.code == 200) {
    //       if (res.data.data.status == "100010") {
    //         if (this.underwritingPolicyRes.isShowXubaoPop) {
    //           this.loadingVisible = false;//遮罩关闭
    //           this.underwritingPolicyRes.isShowXubaoPop = false;
    //           let dateObj = res.data.data.date;
    //           this.startDate = dateObj.xubaoStartDate;//更改日期
    //           this.endDate = dateObj.xubaoEndDate;
    //           this.underwritingPolicyRes.reUnderwrite = 2;
    //           this.underwritingPolicyRes.oldpolicyNoUnid = dateObj.oldpolicyNoUnid;//爱健康续保上年保单号key
    //           this.isAvailableStartDate = true;//设为不可用
    //           // let insuredIndex = 0;//默认为一个被保人的情况
    //           this.changeStartTime();//重新测算保费
    //           this.onToast(res.data.data.msg)
    //           return;
    //         }
    //       } else if (res.data.data.status == '10005') {//跳转至2018版
    //         this.loadingVisible = false;//遮罩关闭
    //         this.renewInsurResultPop.isShow = true;
    //         this.renewInsurResultPop.message = res.data.data.msg;
    //         this.renewInsurResultPop.link2018 = "/#/Product/ProDetails?id=92&channelCode=DC14GD0100030004&orgCode=YGHB";//跳转至2018版一键续保
    //         return;
    //       } else if (res.data.data.status != 200 || res.data.data.status != "200") {
    //         this.loadingVisible = false;//遮罩关闭
    //         this.onToast(res.data.data.msg)
    //         return;
    //       } else if (res.data.data.status == "200") {//核保成功
    //         let signStr = res.data.data.msg;
    //         if (this.monthPayType != "" && this.monthPayType != null && this.monthPayType != 1) {//若有月缴(不包含全额缴费)
    //           this.doApplySignContract(this.clientInfo.name, signStr);//调用申请代扣签约接口
    //         } else {//无月缴
    //           this.createPolicyFun(signStr, res.data.data.payMent);//调用创建保单接口
    //         }
    //       }
    //     } else {
    //       this.loadingVisible = false;//遮罩关闭
    //       this.onToast(res.data.msg)
    //     }
    //   })
    // },

    //核保接口
    underwritingPolicy(paramstopay) {
      this.loadingVisible = true
      this.loadingVisibleContent = '加载中'
      //核保
      this.$http.post("/sunmc/ordSun/underwritingPolicy", paramstopay).then(res => {
        console.log(JSON.stringify(res));
        if (res.data.code == 200) {
          if (res.data.data.status == "100010") {
            if (this.underwritingPolicyRes.isShowXubaoPop) {
              this.loadingVisible = false;//遮罩关闭
              this.underwritingPolicyRes.isShowXubaoPop = false;
              let dateObj = res.data.data.date;
              this.startDate = dateObj.xubaoStartDate;//更改日期
              this.endDate = dateObj.xubaoEndDate;
              this.underwritingPolicyRes.reUnderwrite = 2;
              this.underwritingPolicyRes.oldpolicyNoUnid = dateObj.oldpolicyNoUnid;//爱健康续保上年保单号key
              this.isAvailableStartDate = true;//设为不可用
              // let insuredIndex = 0;//默认为一个被保人的情况
              this.changeStartTime();//重新测算保费
              this.onToast(res.data.data.msg)
              return;
            }
          } else if (res.data.data.status == '10005') {//跳转至2018版
            this.loadingVisible = false;//遮罩关闭
            this.renewInsurResultPop.isShow = true;
            this.renewInsurResultPop.message = res.data.data.msg;
            this.renewInsurResultPop.link2018 = "/#/Product/ProDetails?id=92&channelCode=DC14GD0100030004&orgCode=YGHB";//跳转至2018版一键续保
            return;
          } else if (res.data.data.status != 200 || res.data.data.status != "200") {
            this.loadingVisible = false;//遮罩关闭
            this.onToast(res.data.data.msg)
            return;
          } else if (res.data.data.status == "200") {//核保成功
            let signStr = res.data.data.msg
            let payMent = res.data.data.payMent // 0跳转资金收银台 1跳转非车收银台
            this.$http.post("/sunmc/ordSun/createPolicy", {
              policy: this.paramstopay,
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
                      id: this.$route.query.prdId,
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
                        price: this.money * this.tbNum * this.targetNum,// 展示价格
                        name: this.getItemUserName(1, 1),
                        mobile: this.getItemUserName(1, 6),
                        prdId: this.$route.query.prdId,
                        channelCode: this.$route.query.channelCode,
                        orgCode: this.$route.query.orgCode,
                      }
                    })
                    return false
                  } else {
                    if (this.monthPayType != "" && this.monthPayType != null && this.monthPayType != 1) {//若有月缴(不包含全额缴费)
                      let myRouter = location.href.split('#')[1].split('?')[0] // 类似：/ProInsured
                      window.sessionStorage.setItem('openId', this.openId);// 
                      window.sessionStorage.setItem('signContractUser', this.getItemUserName(1, 1));// 
                      window.sessionStorage.setItem('productId', this.$route.query.prdId);// 
                      window.sessionStorage.setItem('myRouter', myRouter);// 
                      window.sessionStorage.setItem('proInsurUrlParam', window.location.href.split('?')[1])//获取投保页参数，类似：prdId=321&styleId=911&id=183985&channelCode=DC11WD0100030001&orgCode=CXGW
                      window.sessionStorage.setItem('isSigned', '0');// 是否签约标识
                      window.sessionStorage.setItem('orderCode', orderSn);// 订单号
                      window.sessionStorage.setItem('styleId', this.$route.query.styleId)
                      window.sessionStorage.setItem('id', this.$route.query.id)
                      window.sessionStorage.setItem('channelCode', this.$route.query.channelCode)
                      window.sessionStorage.setItem('orgCode', this.$route.query.orgCode)
                      this.loadingVisible = false//遮罩关闭
                      let itemData = JSON.parse(window.sessionStorage.getItem('itemData'))
                      let path = ''
                      if (itemData.signupType == 0) {// 多账户签约
                        path = '/ApplySignRedirect'
                      } else if (itemData.signupType == 1) {// 支付中签约
                        path = '/ApplySignRedirect2'
                      } else {
                        path = '/ApplySignRedirect2'
                      }
                      this.$router.push({
                        path: '/ApplySignRedirect',
                      })
                    } else {//无月缴
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
                          this.onToast(res.data.msg)
                        }
                      });
                    }
                  }
                }
              } else {
                this.loadingVisible = false;//遮罩关闭
                this.onToast(res.data.msg)
                return
              }

            })
          }
        } else {
          this.loadingVisible = false;//遮罩关闭
          this.onToast(res.data.msg)
        }
      })
    },
    //申请代扣签约接口
    // doApplySignContract(name, signStr) {
    //   let applyParams = {
    //     openId: this.openId,
    //     productId: this.$route.query.prdId,//产品ID
    //     signContractUser: name //投保人姓名
    //   }
    //   this.$http.post("/sunmc/sunSignContract/applySignContract", applyParams)
    //     .then(response => {
    //       // console.log(JSON.stringify(response),3916);
    //       if (response.status == 200) {
    //         if (response.data.code == 0) {//申请代扣签约协议成功
    //           //继续调用申请代扣签约接口,调三次
    //           let applySignCon = this.applySignContractFun(applyParams);
    //           applySignCon.then(result => {//第一次
    //             if (result.data.code == 1) {//若签约成功
    //               this.createPolicyFun(signStr);//调用创建保单接口
    //             } else {
    //               if (result.data.code == 0) {
    //                 let applySignCon = this.applySignContractFun(applyParams);
    //                 applySignCon.then(result2 => {//第二次
    //                   if (result2.data.code == 1) {
    //                     this.createPolicyFun(signStr);//调用创建保单接口
    //                   } else {
    //                     if (result2.data.code == 0) {
    //                       let applySignCon = this.applySignContractFun(applyParams);
    //                       applySignCon.then(result3 => {//第三次
    //                         if (result3.data.code == 1) {
    //                           this.createPolicyFun(signStr);//调用创建保单接口
    //                         } else {
    //                           if (result3.data.code == 0) {
    //                             console.log(result3.data.data);
    //                             let applySignUrl = result3.data.data;
    //                             var proInsurUrlParam = window.location.href.split('?')[1];//获取投保页参数
    //                             window.sessionStorage.setItem('proInsurUrlParam', proInsurUrlParam);
    //                             window.sessionStorage.setItem('isSigned', '0');

    //                             let myRouter = location.href.split('#')[1].split('?')[0]
    //                             window.location.href = location.href.split('#')[0] + "static/html/applySignRedirect2019.html?applySignUrl=" + applySignUrl + "&myRouter=" + myRouter;//跳至重定向页面做处理(解决#问题)

    //                           } else {
    //                             this.loadingVisible = false;
    //                             this.onToast(result3.data.msg)
    //                             return;
    //                           }
    //                         }
    //                       });
    //                     } else {
    //                       this.loadingVisible = false;
    //                       this.onToast(result2.data.msg)
    //                       return;
    //                     }
    //                   }
    //                 });
    //               } else {
    //                 this.loadingVisible = false;
    //                 this.onToast(result.data.msg)
    //                 return;
    //               }
    //             }
    //           });
    //         } else if (response.data.code == 1) {//已签约成功
    //           this.createPolicyFun(signStr);//调用创建保单接口
    //         } else {
    //           this.loadingVisible = false;
    //           this.onToast(response.data.msg)
    //           return;
    //         }
    //       }
    //     }).catch(e => {
    //       console.log(e)
    //       this.loadingVisible = false;
    //       this.onToast(JSON.stringify(e))
    //       return;
    //     });
    // },
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
    //创建保单
    createPolicyFun(signStr, payMent) {
      // console.log(JSON.stringify(this.paramstopay),4315);
      this.$http
        .post("/sunmc/ordSun/createPolicy", { policy: this.paramstopay, sign: signStr })
        .then(res => {
          if (res.data.code != 200) {
            this.loadingVisible = false;//遮罩关闭
            this.onToast(res.data.msg)
            return;
          }
          this.behaviorObjSetOrderNo(res.data.data, () => {
          })
          if (this.pagedata.giveInsurance == 0) {
            this.$router.push({
              path: "/Product/Success",
              query: {
                id: this.$route.query.prdId,
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
                  orderNo: res.data.data,// 订单号
                  price: this.money * this.tbNum * this.targetNum,// 展示价格
                  name: this.getItemUserName(1, 1),
                  mobile: this.getItemUserName(1, 6),
                  prdId: this.$route.query.prdId,
                  channelCode: this.$route.query.channelCode,
                  orgCode: this.$route.query.orgCode,
                }
              })
              return false
            }
            this.$http
              .post("/sunmc/ordSun/getPayPolicy", {
                orderSn: res.data.data,
                payFlag: this.payFlag //null：阳光支付 ，"1"：微信小程序支付 "2":支付宝小程序支付
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.loadingVisible = false;//遮罩关闭
                  // var url ='../H5/pay/pay?'+res.data.data.payUrls;

                  if (res.data.data.payClient === 'wxxcx') {//若是微信小程序
                    weixin.miniProgram.navigateTo({ url: res.data.data.jumpUrl + '?' + res.data.data.payUrls });
                  } else if (res.data.data.payClient === 'zfbxcx') {//若是支付宝小程序
                    my.navigateTo({ url: res.data.data.jumpUrl });
                  } else {//阳光支付
                    window.location.href = res.data.data.payUrls; //跳转到阳光保险界面/
                  }
                } else {
                  this.loadingVisible = false;//遮罩关闭
                  this.onToast(res.data.msg)
                }
              });
          }
        });
    },
    //申请代扣签约接口(同步请求)
    async applySignContractFun(applyParams) {
      return await this.$http.post("/sunmc/sunSignContract/applySignContract", applyParams);
    },
    // //申请代扣签约接口(异步请求)
    // applySignContractFun(applyParams){
    //   return this.$http.post("/sunmc/sunSignContract/applySignContract",applyParams);
    // },

    //为详情页传入订单号
    snedordercodes(ordercodes) {
      // console.log(ordercodes)
      if (ordercodes) {
        // if  宏康
        if (this.pagedata.prdCode == "BKB0701") {
          this.$router.push({
            path: "/PolicySearch/hongKang",
            query: {
              ordercode: ordercodes,
              amount: this.money
            }
          });
        } else if (this.pagedata.prdCode == "TK09876789") {
          // if 泰康
          this.$router.push({
            path: "/PolicySearch/taiKang",
            query: {
              ordercode: ordercodes,
              amount: this.money
            }
          });
        } else {
          // alert(3)
          this.$router.push({
            path: "/PolicySearch/guaranNotarize",
            query: {
              ordercode: ordercodes,
              amount: this.money
            }
          });
        }
      } else {
        this.onToast('等待中')
      }
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
    }
  },
};
</script>

<style lang="scss" scoped>
$sc: 200;

input[type="date"] {
  outline: 0;
  background: url("../../../static/images/right.png") no-repeat;
  background-size: 0.2rem 0.2rem;
  background-position: center right;
  padding-right: 0.2rem;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background: #fff;
  color: #fff;
}

input[type="date"]::-webkit-clear-button {
  display: none;
}

input [type="text"] {
  padding-left: 15px;
}

body,
html {
  -webkit-overflow-scrolling: touch;
}

.inputP {
  color: red;
}

.inputP input {
  padding-left: 15px;
}

.el-input--prefix .el-input__inner {
  padding-left: 15px !important;
}

.Pro_insur {
  width: 3.75rem;
  border-bottom: 1.3rem solid #fff;
  -webkit-overflow-scrolling: touch;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.insur {
}

.insur .insur_recognizee {
  width: 3.75rem;
  margin: 0 auto;
}

.policyholderinfo > h1 {
  font-size: 0.17rem;
  color: #464646;
  padding: 0.15rem;
  text-align: left;
  background-color: #f2f2f2;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.policyholderinfo > h1 .bbrrs {
  font-size: 12px;
  padding: 0 5px;
  border-radius: 3px;
  height: 20px;
  line-height: 20px;
  border: 1px solid;
  font-weight: 400;
}

.insurinfo > h1 {
  font-size: 17px;
  font-weight: bold;
  margin: 0.15rem 0 0.15rem 0.33rem;
  text-align: left;
}

.policyinfo > h1 {
  font-size: 17px;
  font-weight: bold;
  margin: 0.15rem 0 0.15rem 0.33rem;
}

.itemTop {
  height: 0.25rem;
  line-height: 0.25rem;
  margin-bottom: 0.2rem;
  margin-top: 0.05rem;
}

.itemTop > h1 {
  height: 0.25rem;
  font-size: 17px;
  padding-left: 0.1rem;
  float: left;
  padding-right: 0.1rem;
}

.item_top_but {
  float: right;
  width: 0.9rem;
  height: 0.25rem;
  background: #fd762c;
  color: #fff;
  border-radius: 5px;
  margin-right: 0.1rem;
}

.item_bot_but {
  width: 1.5rem;
  height: 0.37rem;
  font-size: 0.15rem;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #ffffff;
  color: rgb(153, 153, 153);
  // margin-bottom: .15rem;
}

.butright {
  margin-right: 0.35rem;
}

.butadd {
  color: #fd762c;
}

.warn {
  font-size: 12px;
  color: rgb(153, 153, 153);
  text-align: center;
  margin: 0.1rem 0;
}

.sign {
  width: 3rem;
  height: 0.5rem;
  border-radius: 0.1rem;
  background: #fd762c;
  color: #fff;
  font-size: 0.18rem;
  position: relative;
}

.smallsign {
  display: inline-block;
  width: 30%;
  background: #fd762c;
  text-align: center;
  color: #fff;
  margin-left: 0.38rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 0.05rem;
  cursor: pointer;
}

.contacts {
  width: 0.85rem;
  height: 0.3rem;
  border-radius: 0.05rem;
  text-align: center;
  float: right;
  font-size: 0.15rem;
  line-height: 0.3rem;
  margin-right: 0.15rem;
}

/* 同意 */
.consent {
  width: 3.45rem;
  margin: 0.15rem auto;
  border-radius: 10px;
  -webkit-box-shadow: 0 2px 2px 2px #eee;
  box-shadow: 0 2px 2px 2px #eee;

  label {
    font-size: 15px;
    margin: 30 / $sc + rem 0;
    display: inline-block;
    line-height: 1;
    padding: 0 0.05rem;
  }

  form {
    margin-bottom: 10px;

    input[type="text"] {
      margin-left: 15px;
      border: 0.01rem solid #e1e1e1;
      padding: 0.1rem;
      display: inline-block;
      background: #fff;
    }
  }

  input[type="radio"] {
    width: 36 / $sc + rem;
    height: 36 / $sc + rem;
    background-color: #fff;
    -webkit-appearance: none;
    border: 1px solid;
    border-color: rgb(239, 120, 51);
    border-radius: 50%;
    outline: none;
    margin: 0 20 / $sc + rem 0 30 / $sc + rem;
  }

  i {
    color: #fd762c;
  }
}
.tradition_mask {
  width: 3.75rem;
  text-align: left;
}

.tradition_mask ul {
  margin-top: 0.3rem;
  margin-bottom: 0.6rem;
}

.tradition_mask ul p {
  display: inline-block;
  width: 0.7rem;
}

.tradition_mask ul li {
  margin-bottom: 0.13rem;
}

.taikang_gaozhiShadow,
.taikang_toubaoShadow,
.taikang_weituoShadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 3.75rem;
  height: 100%;
  display: none;
}

// 重构页面
.itemDiv {
  width: 3.45rem;
  margin: auto;
  font-size: 0.15rem;
  color: #666666;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
}
.insur .itemDiv:last-child {
  border-bottom: 1px solid #ffffff;
}

.insur_recognizee .itemDiv:last-child {
  margin-bottom: 0;
}

.itemSpan {
  height: 0.55rem;
  line-height: 0.55rem;
  font-weight: 700;
}

.itemInput {
  font-size: 0.15rem;
  width: 2rem;
  height: 0.5rem;
  color: #464646;
  border: 0;
  outline: none;
  text-align: right;
}

.itemSelect {
  height: 0.37rem;
  line-height: 0.37rem;
  font-size: 0.15rem;
  -webkit-appearance: none;
  background-color: transparent;
  outline: 0;
  background: url("../../../static/images/right.png") no-repeat;
  background-size: 0.2rem 0.2rem;
  background-position: center right;
  padding-right: 0.2rem;
  direction: rtl;
}
.itemCheckbox {
  height: 0.37rem;
  line-height: 0.37rem;
}
.el-checkbox__inner {
  width: 16px !important;
  height: 16px !important;
}
.el-checkbox__label {
  font-size: 16px !important;
}

.link_shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 3.75rem;
  height: 100%;
}

.link_content {
  width: 2.95rem;
  height: 5rem;
  background: #fff;
  border-radius: 0.14rem;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  text-align: left;
  padding: 0 0.15rem;
}

.link_selectContent {
  height: 4.5rem;
  overflow-y: auto;
}

.link_btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
}

.link_name {
  margin-left: 0.15rem;
}

.link_cardNum {
  margin-left: 0.15rem;
}

.item-add-insur-p {
  padding: 10px 5px;
  text-align: center;
  margin-top: 15px;
  background-color: #fd762c;
  color: #fff;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 10px;
}

.group-item-insur {
  margin: 5px;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0.1rem;
}

.group-header-title {
  display: flex;
  align-items: center;
}

.group-header-item {
  display: flex;
  align-items: center;
  // width: 20px;
  // height:20px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 50%;
  background-color: #fd762c;
  text-align: center;
  color: #fff;
}

/*日期控件*/
.el-picker-panel__icon-btn {
  font-size: 16px !important;
}
.el-date-picker__prev-btn {
  margin-right: 0.1rem;
}
.el-date-picker__next-btn {
  margin-left: 0.1rem;
}

.el-date-editor.el-input {
  width: 2rem !important;
  display: inline-block;
  height: 0.37rem;
  font-size: 0.15rem;
  border-radius: 4px;
}
.el-input__inner {
  /*height: 100%;*/
  height: 0.37rem !important;
  line-height: 0.37rem !important;
}
.upload-img {
  width: 3.25rem;
  margin: 0.1rem auto;
}
.upload-img .upload-img-title {
  font-size: 0.14rem;
  color: #333333;
}
.upload-img .upload-img-content {
  display: flex;
  justify-content: space-between;
}
.upload-img .upload-img-content > div {
  width: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-img .upload-img-content > div div {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.upload-img .upload-img-content > div > div img {
  border-radius: 5px;
  max-height: 100%;
  max-width: 100%;
}
.upload-img .upload-img-content > div > p {
  font-size: 0.14rem;
  color: #333333;
}
.email_type {
  position: absolute;
  top: 0.37rem;
  right: 0.05rem;
  font-size: 0.12rem;
  background: #fff;
  z-index: 4;
  display: none;
  box-shadow: 0 0.15rem 0.5rem 0 rgba(0, 0, 0, 0.3);
}
.email_type ul {
}
.email_type ul li {
  padding: 0 0.05rem;
  position: relative;
  cursor: pointer;
  color: rgb(153, 153, 153);
  line-height: 0.25rem;
  text-align: right;
}
.email_type ul li:nth-child(1) {
  color: #000;
  background-color: #c8d4e0;
}
.email_type ul li:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.vux-cell-placeholder {
  color: #959595 !important;
}
.weui-cell_access .weui-cell__ft:after {
  border-color: #c8c8cd00 !important;
}
.weui-cell__ft {
  text-align: left !important;
}
.vux-datetime-confirm {
  padding-right: 46px !important;
}
.vux-datetime-cancel {
  padding-left: 46px !important;
}
.dp-header .dp-item.dp-right {
  color: #fd762c !important;
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
.insurDate-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.15rem;
  color: #464646;
  height: 0.55rem;
}
.insurDate-wrap .icon-data-wrap {
  width: 0.2rem;
  height: 0.2rem;
  display: flex;
  margin-right: 0.1rem;
  align-items: center;
  justify-content: center;
}
.insurDate-wrap .icon-data-wrap img {
  width: 100%;
  height: 100%;
}
.insurDate-wrap .insurDate {
  height: 0.55rem;
}
.vux-datetime {
  color: #464646;
}
.insurDate-wrap .zhi {
  margin: 0 0.05rem;
  height: 0.55rem;
  line-height: 0.55rem;
}
.proInsur-foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 3.75rem;
  z-index: 1;
  border-top: 1px solid #eee;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
}
.bbrPriceDetail {
  width: 3.75rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0.54rem;
  padding: 0 0.1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  z-index: 1;
}
.bbrPriceDetail .bbrPriceDetail-head {
  height: 0.6rem;
  display: flex;
  align-items: center;
}
.bbrPriceDetail .bbrPriceDetail-head .bbrPriceDetail-head-name {
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 0.15rem;
  padding: 0 0.1rem;
  background-color: #eee;
  font-size: 0.13rem;
  color: #999;
}
.bbrPriceDetail .bbrPriceDetail-body {
}
.bbrPriceDetail .bbrPriceDetail-body .bbrPriceDetail-body-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.4rem;
  line-height: 0.4rem;
}
.bbrPriceDetail
  .bbrPriceDetail-body
  .bbrPriceDetail-body-item
  .bbrPriceDetail-body-item-name {
  color: #666;
  font-size: 0.14rem;
}
.bbrPriceDetail
  .bbrPriceDetail-body
  .bbrPriceDetail-body-item
  .bbrPriceDetail-body-item-value {
  color: red;
}
.proInsur-foot .foot-wrap {
  width: 3.75rem;
  height: 0.54rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
}
.proInsur-foot .foot-wrap .icon-wrap {
  width: 0.54rem;
  height: 0.54rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.proInsur-foot .foot-wrap .icon-wrap a {
  border-right: 1px solid #eee;
  width: 0.54rem;
  height: 0.54rem;
  padding: 0.08rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.proInsur-foot .foot-wrap .icon-wrap a img {
  width: 100%;
  height: 100%;
}
.proInsur-foot .foot-wrap .money-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.54rem;
  color: #f52525;
  font-weight: 700;
}
.proInsur-foot .foot-wrap .money-wrap .qk2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.16rem;
}
.proInsur-foot .foot-wrap .money-wrap .qk2 .bottom {
  font-size: 0.12rem;
  color: #9c9c9c;
}
.proInsur-foot .foot-wrap .money-wrap .qk2 .bottom.line {
  text-decoration: line-through;
}
.proInsur-foot .foot-wrap .money-wrap .money-wrap-icon {
  margin-left: 0.05rem;
  width: 0.19rem;
  height: 0.19rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.proInsur-foot .foot-wrap .money-wrap .money-wrap-icon img {
  width: 100%;
  height: 100%;
}
.proInsur-foot .foot-wrap .money-wrap .money-value {
  font-size: 0.2rem;
  font-weight: 700;
  color: #f52525;
}
.proInsur-foot .foot-wrap .ljzf {
  height: 0.54rem;
  line-height: 0.54rem;
  color: #fff;
  width: 1.7rem;
  text-align: center;
  font-size: 0.16rem;
  font-weight: 700;
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
.syr-enter-active {
  animation: detail-move-in 0.3s;
}
.syr-leave-active {
  animation: detail-move-out 0.3s;
}
@keyframes bbrPriceDetail-move-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes bbrPriceDetail-move-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
.bbrPriceDetail-enter-active {
  animation: bbrPriceDetail-move-in 0.3s;
}
.bbrPriceDetail-leave-active {
  animation: bbrPriceDetail-move-out 0.3s;
}
@keyframes moreBbr-move-in {
  0% {
    transform: translateX(3.75rem);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes moreBbr-move-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(3.75rem);
  }
}
.moreBbr-enter-active {
  animation: moreBbr-move-in 0.3s;
}
.moreBbr-leave-active {
  animation: moreBbr-move-out 0.3s;
}
@keyframes background-move-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes background-move-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.background-enter-active {
  animation: background-move-in 0.3s;
}
.background-leave-active {
  animation: background-move-out 0.3s;
}
.invoice-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.invoice-wrap .invoice-icon {
  width: 0.15rem;
  height: 0.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.1rem;
}
.invoice-wrap .invoice-icon img {
  width: 100%;
  height: 100%;
}
.invoiceType-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.invoiceType-wrap .invoiceType-item {
  height: 0.3rem;
  line-height: 0.3rem;
  padding: 0 0.15rem;
  border: 1px solid #b2b2b2;
  color: #b2b2b2;
  border-radius: 0.04rem;
  margin-right: 0.1rem;
}
.invoiceType-wrap .invoiceType-item:last-child {
  margin-right: 0;
}
.weui-cell_access .weui-cell__ft {
  padding-right: 0 !important;
}
.weui-cell {
  padding: 0 !important;
  height: 0.55rem;
  line-height: 0.55rem;
}
.itemBbrName-wrap {
  width: 3.45rem;
  margin: auto;
  font-size: 0.15rem;
  color: #666666;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding: 0.2rem 0 0.1rem;
  flex-wrap: wrap;
}
.itemBbrName {
  min-width: 0.76rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #b2b2b2;
  color: #b2b2b2;
  border-radius: 0.04rem;
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  text-align: center;
  padding: 0 0.1rem;
}
.addBbrInfo {
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.15rem;
}
.moreBbr-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 2;
  overflow-y: auto;
}
.moreBbr-wrap .moreBbr-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  border-bottom: 1px solid #eee;
  overflow: auto;
  color: #464646;
  text-align: center;
  font-size: 0.17rem;
  color: #333333;
  line-height: 0.5rem;
  background-color: #fff;
  z-index: 2;
}
.moreBbr-wrap .moreBbr-title-wrap .back {
  position: absolute;
  left: 0;
  top: 0;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
}
.moreBbr-wrap .moreBbr-title-wrap .moreBbr-title {
  font-weight: 700;
  height: 0.5rem;
  line-height: 0.5rem;
  max-width: 2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: auto;
}
.moreBbr-wrap .moreBbr-content {
  padding-top: 0.5rem;
  border-bottom: 0.7rem solid #fff;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.moreBbr-wrap .moreBbr-bottom-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  width: 100%;
  height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.moreBbr-wrap .moreBbr-bottom-wrap .moreBbr-bottom-btn {
  margin: 0 auto;
  width: 3rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.025rem;
  color: #fff;
  text-align: center;
}
.wstb {
  height: 0.5rem;
  line-height: 0.8rem;
  width: 100%;
  padding-left: 0.2rem;
}
.duoBbr-wrap {
}
.duoBbr-wrap .duoBbr-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 0.05rem;
}
.duoBbr-wrap .duoBbr-item .duoBbr-self {
  height: 0.5rem;
  padding: 0 0.2rem;
  line-height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.duoBbr-wrap .duoBbr-item .duoBbr-self .duoBbr-self-left {
  display: flex;
  align-items: center;
}
.duoBbr-wrap .duoBbr-item .duoBbr-self .duoBbr-self-name {
  margin-right: 0.1rem;
}
.duoBbr-wrap .duoBbr-item .duoBbr-other {
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
}
.duoBbr-wrap .duoBbr-item .duoBbr-other .duoBbr-other-left {
  display: flex;
  align-items: center;
}
.duoBbr-wrap .duoBbr-item .duoBbr-other .duoBbr-other-right {
  display: flex;
  align-items: center;
}
.duoBbr-wrap .duoBbr-item .duoBbr-other .duoBbr-name {
  font-size: 0.15rem;
  margin-right: 0.1rem;
}
.duoBbr-wrap .duoBbr-item .duoBbr-other .duoBbr-relation {
  font-size: 0.12rem;
  height: 0.2rem;
  line-height: 0.2rem;
  border-radius: 0.1rem;
  background-color: #eee;
  color: #333;
  padding: 0 0.1rem;
  margin-right: 0.1rem;
}
.benren-relation {
  font-size: 0.12rem;
  height: 0.2rem;
  line-height: 0.2rem;
  border-radius: 0.1rem;
  background-color: #eee;
  color: #333;
  padding: 0 0.1rem;
  margin-right: 0.1rem;
}
.duoBbr-icon {
  width: 0.18rem;
  height: 0.18rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;
}
.duoBbr-icon img {
  width: 100%;
  height: 100%;
}
.duoBbr-wrap .duoBbr-item .duoBbr-another {
  display: flex;
  align-items: center;
  font-size: 0.13rem;
  color: #666;
  padding-left: 0.2rem;
}
.duoBbr-wrap .duoBbr-item .duoBbr-another .duoBbr-another-itemName {
  width: 0.7rem;
}
.duoBbr-wrap .duoBbr-item .duoBbr-another .duoBbr-another-value {
}
.shebao-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1.7rem;
}
.shebao-wrap .shebao-item {
  width: 0.76rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #b2b2b2;
  color: #b2b2b2;
  border-radius: 0.04rem;
  text-align: center;
}
.weui-cell_access .weui-cell__ft:after {
  border-color: transparent !important;
}
.target-wrap {
}
.target-wrap .target-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}
.target-wrap .target-item .target-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
  height: 0.4rem;
}
.target-wrap .target-item .target-item-top .target-item-top-left {
}
.target-wrap .target-item .target-item-top .target-item-top-left span {
  font-size: 0.15rem;
}
.target-wrap .target-item .target-item-top .target-item-top-right {
  display: flex;
  align-items: center;
}
.target-wrap
  .target-item
  .target-item-top
  .target-item-top-right
  .target-item-top-right-icon {
  width: 0.18rem;
  height: 0.18rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;
}
.target-wrap
  .target-item
  .target-item-top
  .target-item-top-right
  .target-item-top-right-icon
  img {
  width: 100%;
  height: 100%;
}
.target-wrap .target-item .target-item-bottom {
  font-size: 0.13rem;
  color: #666;
}
.target-wrap .target-item .target-item-bottom .target-item-bottom-item {
  padding-left: 0.2rem;
}
.target-wrap .target-item .target-item-bottom .target-item-bottom-item span {
}
</style>
