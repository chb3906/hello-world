<template>
  <div class="Pro_insur">
    <mymask :loadingVisible="loadingVisible" :loadingVisibleContent="loadingVisibleContent"></mymask>
    <commonpop :showPDFPop="showPDFPop" :showCommonListPop="showCommonListPop" :showCommonContentPop="showCommonContentPop" :pdfUrl="pdfUrl" :commonListTitle="commonListTitle" :commonListArr="commonListArr" :commonContent="commonContent" @onHidePDFPop="onHidePDFPop" @onHideCommonListPop="onHideCommonListPop" @onHideCommonContentPop="onHideCommonContentPop" @onShowCommonContentPop="onShowCommonContentPop"></commonpop>
    <!-- 投保人信息 -->
    <div class="insur" v-show="benrenItems.length">
      <div class="policyholderinfo">
        <h1>投保人信息（本人）</h1>
        <div class="insur_recognizee">
          <!-- 投保人姓名 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 1 && item.isShow">
              <span class="itemSpan">投保人姓名</span>
              <input type="text" class="itemInput disabledStyle" :value="item.userName" maxlength="20" unselectable="on" onfocus="blur()" readonly>
            </div>
          </template>
          <!-- 证件类型 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
              <span class="itemSpan">证件类型</span>
              <select class="itemSelect disabledStyle" v-model="item.userName" disabled>
                <option v-for="itemy in item.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
            </div>
          </template>
          <!-- 证件号码 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
              <span class="itemSpan">证件号码</span>
              <input type="text" class="itemInput disabledStyle" :value="item.userName" maxlength="18" unselectable="on" onfocus="blur()" readonly>
            </div>
          </template>
          <!-- 联系电话 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
              <span class="itemSpan">联系电话</span>
              <input type="tel" placeholder="请输入手机号" @blur="onCheckXbSjh(item.userName, holderDto.holderMobile)" class="itemInput" v-model="item.userName" maxlength="11">
            </div>
          </template>
          <!-- 邮箱 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 7 && item.isShow">
              <span class="itemSpan">邮箱</span>
              <input type="text" placeholder="请输入邮箱" class="itemInput" v-model="item.userName" @blur="onCheckYouxiang(item.userName)" :maxlength="30">
            </div>
          </template>
          <!-- 性别 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 2 && item.isShow">
              <span class="itemSpan">性别</span>
              <select class="itemSelect" disabled v-model="item.userName">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </template>
          <!-- 所在地区 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 12 && item.isShow">
              <span class="itemSpan">所在地区</span>
              <input type="text" :value="item.userName" placeholder="请选择所在地区" class="itemInput" id="button1" readonly @click="getCity('button1',item)" onfocus="blur()">
            </div>
          </template>
          <!-- 详细地址 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 15 && item.isShow">
              <span class="itemSpan">详细地址</span>
              <input type="text" placeholder="请输入详细地址" class="itemInput" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写详细地址', $event)">
            </div>
          </template>
          <!-- 证件有效期 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 19 && item.isShow">
              <span class="itemSpan">证件有效期</span>
              <select class="itemSelect" v-model="item.userName" @change="onZjyxqChange(item.userName)">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </template>
          <!-- 证件有效起期 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 23 && item.isShow">
              <span class="itemSpan">证件有效起期</span>
              <input class="itemInput" type="text" placeholder="请选择证件有效起期" v-model="item.userName" @click="showZjyxqqPop" readonly>
            </div>
          </template>
          <!-- 证件有效止期 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 22 && item.isShow">
              <span class="itemSpan">证件有效止期</span>
              <input class="itemInput" type="text" placeholder="请选择证件有效止期" v-model="item.userName" @click="showZjyxzqPop" readonly>
            </div>
          </template>
          <!-- 反洗钱出单传值开关 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 87 && item.isShow && false">
              <span class="itemSpan">反洗钱</span>
              <div class="item-value">
                <select v-model="item.userName">
                  <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                </select>
              </div>
            </div>
          </template>
          <!-- 国籍 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 91 && item.isShow">
              <span class="itemSpan">国籍</span>
              <select class="itemSelect" v-model="item.userName" disabled>
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </template>
          <!-- 个人职业 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 92 && item.isShow">
              <span class="itemSpan">个人职业</span>
              <select class="itemSelect" v-model="item.userName">
                <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
              </select>
            </div>
          </template>
          <!-- 是否要发票 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 41 && item.isShow">
              <span class="itemSpan">是否要发票</span>
              <div class="invoice-wrap">
                <div class="invoice-icon" @click="onSwitchInvoice()">
                  <img v-if="showInvoice" src="../../../static/images/checkbox_active.png" alt="">
                  <img v-else src="../../../static/images/checkbox.png" alt="">
                </div>
                <div>电子发票</div>
              </div>
            </div>
          </template>
          <!-- 发票类型 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 42 && item.isShow">
              <span class="itemSpan">发票类型</span>
              <div class=" invoiceType-wrap">
                <div class="invoiceType-item" v-for="(subItem, index) in item.options" :key="index" @click="onInvoiceType(index,subItem.id)" :style="{backgroundColor: (index === invoiceIndex ? '#fff': '#F6F6F6'),color: (index === invoiceIndex ? prdTheme : '#444'),border: (index === invoiceIndex ? '1px solid ' + prdTheme : '1px solid #fff')}">{{subItem.name}}</div>
              </div>
            </div>
          </template>
          <!--发票抬头-->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 46 && item.isShow">
              <span class="itemSpan">发票抬头</span>
              <input class="itemInput" type="text" placeholder="默认为投保人姓名" :id="'tbr' + item.itemCode" v-model="item.userName">
            </div>
          </template>

          <!--单位名称-->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 43 && item.isShow">
              <span class="itemSpan">单位名称</span>
              <input class="itemInput" type="text" placeholder="请输入单位名称" :id="'tbr' + item.itemCode" v-model="item.userName">
            </div>
          </template>
          <!--纳税人识别号-->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 44 && item.isShow">
              <span class="itemSpan">纳税人识别号</span>
              <input class="itemInput" type="text" placeholder="请输入纳税人识别号" :id="'tbr' + item.itemCode" v-model="item.userName">
            </div>
          </template>
          <!--开户银行-->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 27 && item.isShow">
              <span class="itemSpan">开户银行</span>
              <input class="itemInput" type="text" placeholder="请输入开户银行" v-model="item.userName">
            </div>
          </template>
          <!--开户银行地址-->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 45 && item.isShow">
              <span class="itemSpan">开户银行地址</span>
              <input class="itemInput" type="text" placeholder="请输入开户银行地址" v-model="item.userName">
            </div>
          </template>

          <!--银行账号-->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 30 && item.isShow">
              <span class="itemSpan">银行账号</span>
              <input class="itemInput" type="text" placeholder="请输入银行账号" v-model="item.userName">
            </div>
          </template>
          <!-- 31:银行预留手机号 -->
          <template v-for="item in benrenItems">
            <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 31 && item.isShow">
              <span class="itemSpan">银行预留手机号</span>
              <input class="itemInput" type="text" placeholder="请输入银行预留手机号" v-model="item.userName">
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 单被保人信息 -->
    <div class="policyholderinfo" v-show="groupRiskFlag == 0 && danBbrItems.length">
      <h1>被保险人信息（为谁投保）</h1>
      <!-- 与投保人关系 展示 -->
      <template v-for="item in danBbrItems">
        <div class="itemBbrName-wrap" :key="item.itemCode + 'wai'" v-if="item.itemCode == 8">
          <div v-show="idx == danBbrRelationIndex" class="itemBbrName" v-for="(itemy,idx) in item.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</div>
        </div>
      </template>
      <template v-for="itemWai in danBbrItems">
        <template v-if="itemWai.itemCode == 8 && itemWai.userName != 1">
          <div class="wrap" :key="itemWai.itemCode">
            <!-- 被保险人姓名 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 1 && item.isShow">
                <span class="itemSpan">被保险人姓名</span>
                <input class="itemInput disabledStyle" type="text" placeholder="请输入被保险人姓名" v-model="item.userName" maxlength="30" disabled>
              </div>
            </template>
            <!-- 证件类型 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
                <span class="itemSpan">证件类型</span>
                <select class="itemSelect disabledStyle" v-model="item.userName" disabled>
                  <option v-for="itemy in item.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                </select>
              </div>
            </template>
            <!-- 证件号码 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
                <span class="itemSpan">证件号码</span>
                <input class="itemInput disabledStyle" type="text" placeholder="请输入被保险人证件号码" v-model="item.userName" disabled>
              </div>
            </template>
            <!-- 联系电话 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
                <span class="itemSpan">联系电话</span>
                <input class="itemInput" type="text" placeholder="请输入被保险人手机号" v-model="item.userName" @blur="onCheckXbSjh(item.userName, insuredDtoList[0].insuredMobile)" maxlength="11">
              </div>
            </template>
            <!-- 邮箱 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 7 && item.isShow">
                <span class="item-title">邮箱</span>
                <input class="itemInput" type="text" placeholder="请输入被保险人邮箱" :id="'danbbr' + item.itemCode" v-model="item.userName" @blur="onCheckYouxiang(item.userName)">
              </div>
            </template>
            <!-- 性别 -->
            <template v-for="item in danBbrItems">
              <div class="item" :key="item.itemCode" v-if="item.itemCode == 2 && item.isShow">
                <div class="item-title">性别</div>
                <div class="item-value">
                  <select disabled v-model="item.userName">
                    <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                  </select>
                </div>
              </div>
            </template>
            <!-- 详细地址 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 15 && item.isShow">
                <span class="itemSpan">详细地址</span>
                <input type="text" placeholder="请输入详细地址" class="itemInput" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写详细地址', $event)">
              </div>
            </template>
            <!-- 证件有效期 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 19 && item.isShow">
                <span class="itemSpan">证件有效期</span>
                <select class="itemSelect" v-model="item.userName" @change="onDbbrZjyxqChange(item.userName)">
                  <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                </select>
              </div>
            </template>
            <!-- 证件有效起期 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 23 && item.isShow">
                <span class="itemSpan">证件有效起期</span>
                <input class="itemInput" type="text" placeholder="请选择证件有效起期" v-model="item.userName" @click="showDbbrZjyxqqPop" readonly>
              </div>
            </template>
            <!-- 证件有效止期 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 22 && item.isShow">
                <span class="itemSpan">证件有效止期</span>
                <input class="itemInput" type="text" placeholder="请选择证件有效止期" v-model="item.userName" @click="showDbbrZjyxzqPop" readonly>
              </div>
            </template>
            <!-- 反洗钱出单传值开关 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 87 && item.isShow && false">
                <span class="itemSpan">反洗钱</span>
                <div class="item-value">
                  <select v-model="item.userName">
                    <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                  </select>
                </div>
              </div>
            </template>
            <!-- 国籍 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 91 && item.isShow">
                <span class="itemSpan">国籍</span>
                <select class="itemSelect" v-model="item.userName" disabled>
                  <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                </select>
              </div>
            </template>
            <!-- 个人职业 -->
            <template v-for="item in danBbrItems">
              <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 92 && item.isShow">
                <span class="itemSpan">个人职业</span>
                <select class="itemSelect" v-model="item.userName">
                  <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                </select>
              </div>
            </template>
          </div>
        </template>
      </template>
      <template v-if="sheBaoEntries && sheBaoEntries.length">
        <div class="wrap shebao">
          <div class="itemDiv flexItem">
            <span class="itemSpan">社保情况</span>
            <div class="item-value shebao-wrap">
              <div class="shebao-item" v-for="(item, index) in sheBaoEntries" :key="index" :style="{backgroundColor: (index == danBbrSheBaoIndex ? '#FFF8F6' : '#F6F6F6'),color: (index == danBbrSheBaoIndex ? prdTheme: '#444'),border: (index == danBbrSheBaoIndex ? '1px solid ' + prdTheme : '1px solid #fff')}" @click="onDanBbrSheBaoSwitch(item.id, index)">{{item.value}}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 多被保人信息 -->
    <div class="policyholderinfo" v-show="groupRiskFlag == 1">
      <h1>被保人信息（为谁投保）</h1>

      <div class="duoBbr-wrap">
        <div class="duoBbr-item" v-for="(bbrInfo, bbrIndex) in bbrList" :key="bbrIndex + 'bbr'">
          <template v-if="checkItemValue(bbrInfo.items, 8, 1)">
            <div class="duoBbr">
              <div class="duoBbr-left">
                <div class="duoBbr-name">本人</div>
                <template v-if="sheBaoEntries && sheBaoEntries.length">
                  <template v-for="(item,idx) in sheBaoEntries">
                    <div class="benren-relation" v-if="idx == bbrInfo.sheBaoIndex" :key="item.name">{{item.value}}</div>
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
                <template v-if="sheBaoEntries && sheBaoEntries.length">
                  <template v-for="(item,idx) in sheBaoEntries">
                    <div class="duoBbr-relation" v-if="idx == bbrInfo.sheBaoIndex" :key="item.name">{{item.value}}</div>
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
              <img style="width:.1rem;height: .15rem;" src="../../../static/images/fhjt.png" alt="">
            </div>
            <div class="moreBbr-title">被保险人信息</div>
          </div>
          <div class="moreBbr-content">
            <div>
              <div class="wstb">为谁投保</div>
              <div class="itemBbrName-wrap">
                <template v-for="item in bbrPop.items">
                  <template v-if="item.itemCode == 8">
                    <div class="itemBbrName" v-for="(itemy,idx) in item.options" v-if="idx == bbrPop.relationIndex" :value="itemy.id" :key="idx">{{itemy.name}}</div>
                  </template>
                </template>
              </div>

              <template v-for="item in bbrPop.items">
                <template v-if="item.itemCode == 8">
                  <template v-if="item.userName != 1">
                    <div class="wrap" :key="item.itemCode">
                      <!-- 被保险人姓名 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 1 && item.isShow">
                          <span class="itemSpan">被保险人姓名</span>
                          <input class="itemInput disabledStyle" type="text" placeholder="请输入被保险人姓名" v-model="item.userName" maxlength="30" @blur="onCheckXingming(item.userName)" disabled>
                        </div>
                      </template>
                      <!-- 证件类型 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 3 && item.isShow">
                          <span class="itemSpan">证件类型</span>
                          <select v-model="item.userName" class="itemSelect disabledStyle" disabled>
                            <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                          </select>
                        </div>
                      </template>
                      <!-- 证件号码 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 4 && item.isShow">
                          <span class="itemSpan">证件号码</span>
                          <input class="itemInput disabledStyle" type="text" placeholder="请输入被保险人证件号码" v-model="item.userName" disabled>
                        </div>
                      </template>
                      <!-- 联系电话 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 6 && item.isShow">
                          <span class="itemSpan">联系电话</span>
                          <input class="itemInput" type="tel" placeholder="请输入被保险人手机号" v-model="item.userName" @blur="onCheckXbSjh(item.userName, insuredDtoList[getInsuredDtoListIndex(getUserName(bbrPop.items, 4))].insuredMobile)" maxlength="11">
                        </div>
                      </template>
                      <!-- 邮箱 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 7 && item.isShow">
                          <span class="itemSpan">邮箱</span>
                          <input class="itemInput disabledStyle" type="text" placeholder="请输入被保险人邮箱" v-model="item.userName" @blur="onCheckYouxiang(item.userName)">
                        </div>
                      </template>
                      <!-- 性别 -->
                      <template v-for="item in bbrPop.items">
                        <div class="item" :key="item.itemCode" v-if="item.itemCode == 2 && item.isShow">
                          <div class="item-title">性别</div>
                          <div class="item-value">
                            <select disabled v-model="item.userName">
                              <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                            </select>
                          </div>
                        </div>
                      </template>
                      <!-- 详细地址 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 15 && item.isShow">
                          <span class="itemSpan">详细地址</span>
                          <input type="text" placeholder="请输入详细地址" class="itemInput" v-model="item.userName" maxlength="50" @click="onSensors('新模板页面-填写详细地址', $event)">
                        </div>
                      </template>
                      <!-- 证件有效期 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 19 && item.isShow">
                          <span class="itemSpan">证件有效期</span>
                          <select class="itemSelect" v-model="item.userName" @change="onDuoBbrZjyxqChange(item.userName)">
                            <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                          </select>
                        </div>
                      </template>
                      <!-- 证件有效起期 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 23 && item.isShow">
                          <span class="itemSpan">证件有效起期</span>
                          <input class="itemInput" type="text" placeholder="请选择证件有效起期" v-model="item.userName" @click="showDuoBbrZjyxqqPop" readonly>
                        </div>
                      </template>
                      <!-- 证件有效止期 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 22 && item.isShow">
                          <span class="itemSpan">证件有效止期</span>
                          <input class="itemInput" type="text" placeholder="请选择证件有效止期" v-model="item.userName" @click="showDuoBbrZjyxzqPop" readonly>
                        </div>
                      </template>
                      <!-- 反洗钱出单传值开关 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 87 && item.isShow && false">
                          <span class="itemSpan">反洗钱</span>
                          <div class="item-value">
                            <select v-model="item.userName">
                              <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                            </select>
                          </div>
                        </div>
                      </template>
                      <!-- 国籍 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 91 && item.isShow">
                          <span class="itemSpan">国籍</span>
                          <select class="itemSelect" v-model="item.userName" disabled>
                            <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                          </select>
                        </div>
                      </template>
                      <!-- 个人职业 -->
                      <template v-for="item in bbrPop.items">
                        <div class="itemDiv flexItem" :key="item.itemCode" v-if="item.itemCode == 92 && item.isShow">
                          <span class="itemSpan">个人职业</span>
                          <select class="itemSelect" v-model="item.userName">
                            <option v-for="option in item.options" :value="option.id" :key="option.id">{{option.name}}</option>
                          </select>
                        </div>
                      </template>
                    </div>
                  </template>

                </template>
              </template>

              <template v-if="sheBaoEntries && sheBaoEntries.length">
                <div class="wrap shebao">
                  <div class="itemDiv flexItem">
                    <span class="itemSpan">社保情况</span>
                    <div class="item-value shebao-wrap">
                      <div class="shebao-item" v-for="(item, index) in sheBaoEntries" :key="index" :style="{backgroundColor: (index == bbrPop.sheBaoIndex ? '#FFF8F6': '#F6F6F6'),color: (index == bbrPop.sheBaoIndex ? prdTheme: '#444'),border: (index == bbrPop.sheBaoIndex ? '1px solid ' + prdTheme : '1px solid #fff')}" @click="onDuoBbrSheBaoSwitch(item.id, index)">{{item.value}}</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="moreBbr-bottom-wrap">
            <div class="moreBbr-bottom-btn" :style="{backgroundColor: prdTheme}" @click="addOrUpdateDuoBbr">
              <div>确定</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 受益人弹框 -->
    <div class="syr-popbox" v-show="showSyr" @click="onCloseSyr"></div>
    <transition name="syr">
      <div class="syr-pop" v-show="showSyr">
        <p>受益人是指在保障事故发生或者约定的保险期限届满，依照保险合同享有保险金请求权的人。</p>
        <p>该保险受益人为法定受益人（一般来说为第一继承人，即配偶、子女、父母），如果您（被保险人）需要指定受益人，可以携带本人有效身份证件至最近的阳光产线柜面进行办理。</p>
        <div class="syr-btn" @click="onCloseSyr" :style="{backgroundColor: prdTheme}">确定</div>
      </div>
    </transition>
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
              <div class="insurDate disabledStyle">
                <datetime readonly v-model="xubaoStartDate" placeholder="起保日期"></datetime>
              </div>
              <div class="zhi">至</div>
              <div class="insurDate disabledStyle">
                <datetime v-model="xubaoEndDate" readonly placeholder="结束日期"></datetime>
              </div>
            </div>
          </div>
          <div class="itemDiv">
            <div class="itemSpan syr-wrap" @click="onShowSyr">
              <span>受益人</span>
              <img class="syr-icon" src="../../../static/images/icon_syr.png" alt="">
            </div>
            <input type="text" readonly value="法定" class="itemInput">
          </div>
        </div>
      </div>
    </div>

    <!-- 适配iphoneX -->
    <div class="kongbai"></div>
    <!-- 底部 -->
    <div class="proInsur-foot">
      <!-- 同意协议 展示部分-->
      <Xieyi :checkedFlag="checkedFlag" :khsIsReadFlag="khsIsReadFlag" :khsPopShowFlag="khsPopShowFlag" :khsArr="khsArr" @onSwitchCheckedFlag="onSwitchCheckedFlag" @onClickYuqr="onClickYuqr" @onHideKhsPop="onHideKhsPop" @onClickKhsTab="onClickKhsTab" @onShowCommonContentPop="onShowCommonContentPop" @onClickTabBtn="onClickTabBtn"></Xieyi>
      <div class="foot-wrap">
        <div class="icon-wrap">
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
        <div class="money-wrap">
          <div class="money-value" v-if="pagedata.giveInsurance == 1">&yen;{{money}}</div>
          <div class="money-value" v-else-if="pagedata.giveInsurance == 0">&yen;0</div>
        </div>
        <div class="ljzf" @click="topay(),onSensors('续保-填单页-点击立即支付', $event)" v-if="pagedata.giveInsurance == 1" :style="{backgroundColor: prdTheme}">立即支付</div>
        <div class="ljzf" @click="topay()" v-else-if="pagedata.giveInsurance == 0" :style="{backgroundColor: prdTheme}">免费投保</div>
      </div>
    </div>
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

import Jquery from "jquery";
import { Toast, MessageBox, Spinner, Indicator } from 'mint-ui'
import { address } from "./city.js";
import cityData from "./city.json";
import "./city.css";
import weixin from 'weixin-js-sdk';
import Xieyi from '@/components/newComponents/xieyi/Xieyi.vue'
import Commonpop from '@/components/newComponents/commonpop/Commonpop.vue'
import Mymask from '@/components/newComponents/mymask/Mymask.vue'
export default {
  components: {
    Xieyi,
    Commonpop,
    Mymask
  },
  name: "xubaoProInsur",
  data() {
    return {
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
      danBbrRelationIndex: 0,// 单被保人 与投保人关系 索引
      danBbrSheBaoIndex: 0,// 单被保人 社保 索引
      sheBaoEntries: JSON.parse(window.sessionStorage.getItem('sheBaoEntries')),// 社保区间数组
      updateDuoBbrFlag: false,// 是否更新多被保人信息标识
      updateDuoBbrIndex: 0,// 正在更新的多被保人在数组中的索引
      showMoreBbr: false,// 
      bbrPop: {},
      bbrPopTemp: {},
      bbrList: [],
      benrenCalcInfo: {},
      benrenItems: [],
      danBbrCalcInfo: {},
      danBbrItems: [],
      showSyr: false,
      prdTheme: window.sessionStorage.getItem('prdTheme'),
      customerService: window.sessionStorage.getItem('customerService'),
      customerLogo: window.sessionStorage.getItem('customerLogo'),
      currentStyleName: window.sessionStorage.getItem('currentStyleName'),
      showInvoice: false,
      holderDto: JSON.parse(window.sessionStorage.getItem('holderDto')),// 投保人
      insuredDtoList: JSON.parse(window.sessionStorage.getItem('insuredDtoList')),
      xubaoStartDate: window.sessionStorage.getItem('xubaoStartDate'),
      xubaoEndDate: window.sessionStorage.getItem('xubaoEndDate'),
      oldPolicyNo: this.$route.query.oldPolicyNo,//短信续保的上年保单号

      lastDateString: '00:00:00',
      endLastDateString: '23:59:59',
      pagedata: {}, //page 数据
      num: 1, //当前显示页数
      money: "", // 立即支付金额
      paramstopay: {}, // 立即支付的参数
      channelCode: this.$route.query.channelCode, //渠道code
      orgCode: this.$route.query.orgCode,//机构code
      // 被保人信息
      centers: "",
      channelName: window.sessionStorage.getItem('channelName'),
      pointKey: window.sessionStorage.getItem('pointKey'),
      _json: [],
      _address: null,
      _key: ["cityList", "countyList"],
      checkedFlag: false,
      addressCode: '',
      maxGroupNum: 0, //最大购买的团险个数
      minGroupNum: 0, // 最小的团险个数
      groupRiskFlag: 0, // 1 为团险 0 为个人险
      productId: window.sessionStorage.getItem('productId'),
      loadingVisible: true,
      loadingVisibleContent: '',
      noRequiredField: ['46', '27', '30', '31', '45'],//非必填字段
      urlParam: window.sessionStorage.getItem('urlParam'),
      productStartDate: '',//后台配置的起保日期
      isWxMini: false,//是否是微信小程序
      invoiceIndex: 0,
      invoiceType: '',//发票类型 1:个人  2:企业
      isRenewOneClick: window.sessionStorage.getItem("isRenewOneClick"),//是否是一键续保
      renewInsuranceFlag: JSON.parse(window.sessionStorage.getItem('renewInsuranceFlag')),//一键续保标识值
      oldpolicyNoUnid: window.sessionStorage.getItem('oldpolicyNoUnid'),//一键续保的保单key
      discount: window.sessionStorage.getItem("discount"),//折扣
      monthPayType: window.sessionStorage.getItem("monthPayType"),//月缴
      openId: this.$route.query.openid,//代扣微信用户唯一标识(分期代扣产品必传)
      renewInsurResultPop: {
        isShow: false,
        message: "",
        link2018: ""
      },//一键续保结果弹框
      birthdayEndDate: this.formatDate(new Date(), "yyyy-MM-dd"), // 出生日期不能超过当前时间
    };
  },
  computed: {
  },
  created() {
    this.hideWxShareMenu();//隐藏微信分享按钮
    this.getList();
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
    // '详情页-点击立即投保',$event
    onSensors(eventName, event) {
      this.sensors.quick('trackAllHeatMap', event.target, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.$route.query.id,
        page_ID: this.common.getPageid(2),
      });
    },
    // 'prdDetail_jinruxiangqingye' '详情页-进入详情页'
    onSensors2(eventClick, eventName) {
      this.sensors.track(eventClick, {
        ApplicationName: this.channelName,
        ProductName: eventName,
        current_url: location.href,
        title: document.title,
        product_id: this.$route.query.id,
        page_ID: this.common.getPageid(2),
      })
    },
    getInsuredDtoListIndex(idNum) {
      for (let i = 0; i < this.insuredDtoList.length; i++) {
        if (idNum == this.dataDesensitization(this.insuredDtoList[i].insuredIdentifyNumber, 4)) {
          return i
        }
      }
    },
    onDuoBbrSheBaoSwitch(sheBaoId, index) {
      let bbrPopCopy = JSON.parse(JSON.stringify(this.bbrPop))
      bbrPopCopy.sheBaoIndex = index
      this.bbrPop = JSON.parse(JSON.stringify(bbrPopCopy))
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
        if (this.bbrPop.isBenren) {// 如果更新的是本人
          let items = JSON.parse(JSON.stringify(this.benrenItems))
          this.setUserName(items, 4, this.holderDto.holderIdentifyNumber) // 被保人证件号码
          this.onCalc(items, [4, 2], this.bbrPop.sheBaoIndex, data => {
            this.benrenCalcInfo.price = data.price
            this.benrenCalcInfo.prdItemId = data.prdItemId
            this.bbrList.splice(this.updateDuoBbrIndex, 1, JSON.parse(JSON.stringify(this.bbrPop)))
            this.getNewPriceObj()
            this.onToast('更新被保人成功')
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
    onHideMoreBbr() {
      this.onCanScroll()
      this.showMoreBbr = false
      this.updateDuoBbrFlag = false
    },
    updateDuoBbr(index) {
      this.bbrPop = JSON.parse(JSON.stringify(this.bbrList[index]))
      this.updateDuoBbrIndex = index
      this.updateDuoBbrFlag = true
      this.onNoScroll()
      this.showMoreBbr = true
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
    // 切换 单被保人 社保情况 的时候所调方法
    onDanBbrSheBaoSwitch(sheBaoId, index) {
      this.danBbrSheBaoIndex = index
      if (this.checkItemValue(this.danBbrItems, 8, 1)) {
        let items = JSON.parse(JSON.stringify(this.benrenItems))
        this.setUserName(items, 4, this.insuredDtoList[0].insuredIdentifyNumber) // 被保人证件号码
        this.onCalc(items, [4], this.danBbrSheBaoIndex, data => {
          this.benrenCalcInfo.price = data.price
          this.benrenCalcInfo.prdItemId = data.prdItemId
          this.danBbrCalcInfo.price = data.price
          this.danBbrCalcInfo.prdItemId = data.prdItemId
          this.getNewPriceObj()
        })
      } else {
        let items = JSON.parse(JSON.stringify(this.benrenItems))
        this.setUserName(items, 4, this.insuredDtoList[0].insuredIdentifyNumber) // 被保人证件号码
        this.onCalc(items, [4], this.danBbrSheBaoIndex, data => {
          this.danBbrCalcInfo.price = data.price
          this.danBbrCalcInfo.prdItemId = data.prdItemId
          this.getNewPriceObj()
        })
      }
    },
    onToast(message = '发生了一些错误', position = 'middle', duration = 2000) {
      Toast({
        message: message,
        position: position,
        duration: duration
      })
    },
    // 校验手机号
    onCheckXbSjh(userName, oldSjh) {
      console.log(oldSjh)

      if (userName == '') {
        this.onToast('手机号不能为空')
        return false
      } else if (userName == this.dataDesensitization(oldSjh, 6)) {
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
        this.onToast('请输入邮箱')
        return false
      }
      if (!this.common.checkEmail(userName)) {
        this.onToast('邮箱输入有误')
        return false
      }
      return true

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
    onShowSyr() {
      this.showSyr = true
    },
    onCloseSyr() {
      this.showSyr = false
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
    //隐藏微信分享按钮
    hideWxShareMenu() {
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

    //获取配置信息
    getList() {
      this.$http.post("/prdmc/prdmcShop/insureData", {
        itemId: this.$route.query.id,
        orgCode: this.orgCode
      }).then(res => {
        res = this.common.myReplaceAllUrl(res)
        this.res = res;
        this.pagedata = res.data.data; //需要展示的数据
        this.onInsurancesArr()
        this.loadingVisible = false
        this.initDataCommon(res);

        this.initPagedata()
        this.benrenItems = this.getItems(1)
        this.danBbrItems = this.getItems(2)

        this.setUserName(this.benrenItems, 1, this.dataDesensitization(this.holderDto.holderName, 1)) // 投保人姓名
        this.setUserName(this.benrenItems, 3, 1) // 投保人证件类型（强制转为身份证）
        this.setUserName(this.benrenItems, 4, this.dataDesensitization(this.holderDto.holderIdentifyNumber, 4)) // 投保人证件号码
        this.setUserName(this.benrenItems, 6, this.dataDesensitization(this.holderDto.holderMobile, 6)) // 投保人联系电话
        this.setUserName(this.benrenItems, 7, this.holderDto.holderEmail) // 投保人邮箱
        if (parseInt(this.holderDto.holderIdentifyNumber.substr(16, 1)) % 2 == 1) {// 男
          this.setUserName(this.benrenItems, 2, 1)
        } else {
          this.setUserName(this.benrenItems, 2, 2)
        }

        if (this.insuredDtoList.length == 1) {// 单被保人
          this.danBbrRelationIndex = this.getRelationIndex(this.switchRelationShip(this.insuredDtoList[0].relationShip))

          let sheBaoEntries = JSON.parse(window.sessionStorage.getItem("sheBaoEntries"))
          let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
          if (sheBaoEntries && sheBaoEntries.length > 0) {
            for (let i = 0; i < upParams.calcIdKeys.length; i++) {
              if (upParams.calcIdKeys[i] == '社保情况') {
                upParams.calcIds[i]
                for (let j = 0; j < sheBaoEntries.length; j++) {
                  if (sheBaoEntries[j].id == upParams.calcIds[i]) {
                    this.danBbrSheBaoIndex = j
                  }
                }
              }
            }
          }

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

          this.handleBbrList(0, () => {
            this.getNewPriceObj()
          })
        }
      });
    },
    getNewPriceObj() {
      let tbNum = 1
      if (this.pagedata.isSharedPremium == 1) {
        if (this.getUserName(this.benrenItems, 33)) {
          tbNum = this.getUserName(this.benrenItems, 33)
        }
      } ``
      if (this.insuredDtoList.length == 1) { // 单个被保人
        this.money = (Number(this.danBbrCalcInfo.price) * Number(tbNum)).toFixed(2)
      } else if (this.insuredDtoList.length > 1) { // 多个被保人
        if (this.pagedata.isSharedPremium == 0) {
          this.money = (Number(this.bbrList[0].price) * Number(tbNum)).toFixed(2)
        } else {
          let moneyTemp = 0
          for (let i = 0; i < this.bbrList.length; i++) {
            moneyTemp += Number(this.bbrList[i].price)
          }
          this.money = (moneyTemp * Number(tbNum)).toFixed(2)
        }
      }
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
    // 根据传入的items，调整报价因子，调接口计算保费
    // arr是一个数组，数组中的每一项表示需要调整哪些报价因子：如：[4,2],4表示需要调整证件号码对应的年龄，2表示需要根据性别调整性别因子等
    onCalc(items, arr, sheBaoIndex, callback) {
      let entries = JSON.parse(window.sessionStorage.getItem('entries'))
      let sheBaoEntries = JSON.parse(window.sessionStorage.getItem('sheBaoEntries'))
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      let calcIds = upParams.calcIds
      let calcIdKeys = upParams.calcIdKeys
      if (arr.indexOf(4) != -1) {// 证件号码
        if (entries && entries.length) {
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

      if (sheBaoEntries && sheBaoEntries.length) {
        calcIds[this.getYinziIndex('社保情况')] = sheBaoEntries[sheBaoIndex].id
      }
      this.onProductCalc(calcIds, data => {
        callback(data)
      })
    },
    onProductCalc(calcIds, callback) {
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      this.$http.post('/prdmc/prdmcShop/productCalc', {
        styleId: upParams.styleId,
        calcIds: calcIds
      }).then(res => {
        console.dir(res)
        if (res.data.code == 200) {
          callback(res.data.data)
        } else {
          this.onMessageBox('报价失败,请稍候重试1')
          return false
        }
      }).catch((e) => {
        console.log(e)
        this.onMessageBox('报价失败,请稍候重试2')
        return false
      })
    },

    onMessageBox(message = '数据异常，请稍候重试') {
      MessageBox.alert(message, '提示')
    },

    // 初始化pagedata
    initPagedata() {
      this.initUserName()
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

    initDataCommon(res) {
      if (this.insuredDtoList.length > 1) {
        this.groupRiskFlag = 1;//多个被保人
      } else {
        this.groupRiskFlag = 0; //一个被保人
      }
      if (this.groupRiskFlag == 1) {//团险
        this.maxGroupNum = this.pagedata.maxGroupNum;
        this.minGroupNum = this.pagedata.minGroupNum;
      }

      //设置页面标题
      Jquery(document).find('title').text(this.pagedata.prdName);

      //判断产品是否下架
      if (this.pagedata.productEndDateStr != '' && this.pagedata.productEndDateStr != null) {
        //此种写法兼容各浏览器new Date() invalid date问题
        var productEndDate = new Date(this.pagedata.productEndDateStr.replace(new RegExp(/-/gm), "/"));
        if (productEndDate.getTime() < new Date().getTime()) {//若产品下架日期小于当前时间,则提示下架
          this.loadingVisible = true;
          Toast({
            message: "该产品已下架！",
            position: "middle",
            duration: -1
          });
        }
      }
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
    //格式化证件有效起、止日期
    handleCardValidityPeriod(y) {
      let date = new Date();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    getCity(idIcon, i) {
      window.vm = this;
      this._key = ["cityList", "countyList"];
      var jsonData = cityData.content;
      this._json = eval(jsonData);
      this._address = new address(this._json);
      console.log(this._address)
      var that = this;
      var cityNum = this._address.show(idIcon, function (code, name) {
        that.addressCode = code;
        i.userName = name;
        i.userCode = code;
      });
    },
    // 获取某个报价因子在因子名称数组中的下标
    getYinziIndex(name) {
      let upParams = JSON.parse(window.sessionStorage.getItem('upParams'))
      let calcIdKeys = upParams.calcIdKeys
      for (let i = 0; i < calcIdKeys.length; i++) {
        if (calcIdKeys[i] == name) {
          return i
        }
      }
    },
    //根据年龄计算保费
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
    },
    dateMinus(sd, ed) {
      var sdate = new Date(sd.replace(/-/g, "/"));//零点开始,例2018-12-28 00:00:00
      var edate = new Date(ed.replace(/-/g, "/"));//零点开始,例2018-12-28 00:00:00
      var days = edate.getTime() - (sdate.getTime() - 8 * 3600 * 1000);//时区晚八小时,减去
      var day = parseInt((days / (1000 * 60 * 60 * 24)) + 1);//因为从零点开始,需要加上一天
      return day;
    },
    gotoRenewInsurance2018() {
      window.location.href = this.renewInsurResultPop.link2018;
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


    //支付
    topay() {


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

      if (this.pagedata.insuranceIntervalType == 1) { //保险间隔类型 0:固定区间  1:间隔区间
        var days = this.dateMinus(this.xubaoStartDate, this.xubaoEndDate);
        //保险间隔类型为间隔区间[30天-60天] this.maxDayCount:最大保险期间天数,this.minDayCount:最小保险期间天数
        if (days < this.pagedata.minDayCount || days > this.pagedata.maxDayCount) {
          Toast({
            message: "错误的区间",
            position: "middle",
            duration: 2000
          });
          return
        }
      }
      if (!this.checkedFlag) {
        Toast({
          message: "请同意相关协议",
          position: "middle",
          duration: 2000
        });
        return;
      }

      this.paramstopay = {
        channelCode: this.channelCode,
        orgCode: this.orgCode,
        userSign: window.sessionStorage.getItem('userSign'),
        styleId: JSON.parse(window.sessionStorage.getItem('upParams')).styleId,//方案ID
        startDate: this.xubaoStartDate + " " + this.lastDateString,
        endDate: this.xubaoEndDate + " " + this.endLastDateString,
        isCustom: this.pagedata.isCustom,// 是否指定受益人（True:是  false:法定）
        policyHolders: this.generateTbr(),
        insureds: this.generateBbr(),
        beneficiary: this.generateSyr(),
        addressCode: this.addressCode,
        urlParam: this.urlParam ? this.urlParam : '',
        xcxFlag: this.isWxMini,
        openId: this.openId,//代扣微信用户唯一标识(分期代扣产品必传)
        instalmentNum: this.monthPayType,//分期数
        oldpolicyNoUnid: this.oldpolicyNoUnid ? this.oldpolicyNoUnid : "",//上年保单key
        reUnderwrite: 2,//二次核保标识
        renewInsurance: this.renewInsuranceFlag ? this.renewInsuranceFlag : "",
        oldPolicyNo: this.oldPolicyNo, // 上年保单号，（短信续保会传，一键续保不传）
      };

      if (this.pagedata.handlerFlag == 0) {//虚拟业务员 // 业务员取值（0虚拟业务员1指定）
        window.sessionStorage.setItem('addressCode', this.addressCode);
      }

      //判断为微信小程序环境
      if (window.__wxjs_environment === 'miniprogram') {
        this.isWxMini = true;
      }

      var urlP = window.location.href.split('?');
      if (urlP.length == 2) {
        urlP = urlP[0];
      }
      var finalUrl = urlP + '?' + this.urlParam;
      this.$http.post('/sunmc/cch/onCCH', {
        'channelCode': this.channelCode,
        'orgCode': this.orgCode,
        'pageName': this.channelName + this.pagedata.prdName + '-保单填写页',
        'pointKey': this.pointKey + '_保单填写页' + '_提交订单',
        'productId': this.productId,
        'url': finalUrl,
        'policyNo': '',
        'clientInfo': {}
      }).then(res => { });

      this.loadingVisible = true;//遮罩显示
      this.loadingVisibleContent = '加载中'
      this.$http.post("/sunmc/ordSun/underwritingPolicy", this.paramstopay).then(res => {
        console.log(JSON.stringify(res));

        if (res.data.code == 200) {
          if (res.data.data.status == 200) {
            let signStr = res.data.data.msg;
            this.createPolicyFun(signStr, res.data.data.payMent);//调用创建保单接口
          } else if (res.data.data.status == '10005') {//跳转至2018版
            this.loadingVisible = false;//遮罩关闭
            this.renewInsurResultPop.isShow = true;
            this.renewInsurResultPop.message = res.data.data.msg;
            this.renewInsurResultPop.link2018 = "/#/Product/ProDetails?id=92&channelCode=DC14GD0100030004&orgCode=YGHB";//跳转至2018版一键续保
            return;
          } else {
            this.loadingVisible = false;//遮罩关闭
            Toast({
              message: res.data.data.msg,
              position: "middle",
              duration: 2000
            });
          }
        } else {
          this.loadingVisible = false;//遮罩关闭
          Toast({
            message: res.data.msg,
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    //申请代扣签约接口
    //创建保单
    createPolicyFun(signStr, payMent) {
      this.$http
        .post("/sunmc/ordSun/createPolicy", { policy: this.paramstopay, sign: signStr })
        .then(res => {
          if (res.data.code != 200) {
            this.loadingVisible = false;//遮罩关闭
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 2000
            });
            return;
          }
          if (this.pagedata.giveInsurance == 0) {
            this.$router.push({
              path: "/Product/Success",
              query: {}
            });
          } else {
            if (payMent == 1) {// payMent=1跳转非车收银台
              this.$router.push({
                path: "/Product/orderPayCashier",
                query: {
                  prdName: this.pagedata.prdName,// 产品名称
                  orderNo: res.data.data,// 订单号
                  price: this.money,// 展示价格
                  name: this.getItemUserName(1, 1),
                  mobile: this.holderDto.holderMobile,
                  prdId: this.productId,
                  channelCode: this.$route.query.channelCode,
                  orgCode: this.$route.query.orgCode,
                }
              })
              return false
            }
            this.$http
              .post("/sunmc/ordSun/getPayPolicy", {
                orderSn: res.data.data,
                xcxFlag: this.isWxMini
              })
              .then(res => {
                if (res.data.code == 200) {
                  if (res.data.data.payClient === 'xcx') {//若是小程序
                    // var url ='../H5/pay/pay?'+res.data.data.payUrls;
                    var url = res.data.data.jumpUrl + '?' + res.data.data.payUrls;
                    console.log(url);
                    weixin.miniProgram.navigateTo({ url: url });
                  } else {
                    window.location.href = res.data.data.payUrls; //跳转到阳光保险界面/
                  }
                } else {
                  this.loadingVisible = false;//遮罩关闭
                  Toast({
                    message: res.data.msg,
                    position: "middle",
                    duration: 2000
                  });
                }
              });
          }
        });
    },
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
.Pro_insur {
  width: 3.75rem;
  border-bottom: 1.25rem solid #fff;
  -webkit-overflow-scrolling: touch;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
.insur .insur_recognizee {
  width: 3.75rem;
  margin: 0 auto;
}
// 重构页面
.itemDiv {
  width: 3.45rem;
  margin: auto;
  height: 0.55rem;
  line-height: 0.55rem;
  font-size: 0.15rem;
  color: #666666;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
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
  width: 2rem;
  height: 0.37rem;
  line-height: 0.37rem;
}
/deep/ .el-checkbox__inner {
  width: 0.15rem !important;
  height: 0.15rem !important;
}
/deep/ .el-checkbox__label {
  font-size: 0.15rem !important;
}
.disabledStyle {
  color: rgb(84, 84, 84);
  -webkit-text-fill-color: rgb(84, 84, 84);
  background-color: #ecebe4;
}
.itemBot {
  width: 3.45rem;
  margin: 0 auto;
  font-size: 14px;
  text-align: center;
  color: #333;
  margin-top: 0.1rem;
}
.item_bot_but {
  width: 1.5rem;
  height: 0.37rem;
  font-size: 0.15rem;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #ffffff;
  color: rgb(153, 153, 153);
}
.sign {
  width: 3rem;
  height: 0.5rem;
  border-radius: 0.1rem;
  background: #fd762c;
  color: #fff;
  font-size: 0.18rem;
}
.group-item-insur {
  margin: 5px;
  border-radius: 10px;
  border: 0.01rem solid #e1e1e1;

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
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 50%;
  background-color: #fd762c;
  text-align: center;
  color: #fff;
}
.shadow_content {
  width: 100%;
  height: 100%;
  background: #fff;
  // border-radius: 0.14rem;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
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
.insurDate-wrap .zhi {
  margin: 0 0.05rem;
  height: 0.55rem;
  line-height: 0.55rem;
}
.syr-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.syr-wrap .syr-icon {
  margin-left: 0.05rem;
  width: 0.19rem;
  height: 0.19rem;
}
.syr-popbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 3.75rem;
  height: 100%;
  z-index: 2;
}
.syr-pop {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 3.75rem;
  height: 2.9rem;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.45rem 0.15rem 0.25rem;
  color: #464646;
  font-size: 0.15rem;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  z-index: 2;
}
.syr-pop p {
}
.syr-pop .syr-btn {
  width: 1.25rem;
  height: 0.45rem;
  color: #ffffff;
  font-size: 0.16rem;
  border-radius: 0.04rem;
  text-align: center;
  line-height: 0.45rem;
  margin: 0.39rem auto 0;
}
@keyframes detail-move-in {
  0% {
    transform: translateY(2.9rem);
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
    transform: translateY(2.9rem);
  }
}
.syr-enter-active {
  animation: detail-move-in 0.3s;
}
.syr-leave-active {
  animation: detail-move-out 0.3s;
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
.proInsur-foot .foot-wrap {
  width: 3.75rem;
  height: 0.54rem;
  background-color: #fff;
  display: flex;
  align-items: center;
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
}
.proInsur-foot .foot-wrap .money-wrap .money-value {
  font-size: 0.2rem;
  font-weight: 700;
  color: #f52525;
}
.proInsur-foot .foot-wrap .ljzf {
  height: 0.54rem;
  line-height: 0.54rem;
  padding: 0 0.2rem;
  color: #fff;
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
  width: 0.76rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #545454;
  border-radius: 0.04rem;
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  text-align: center;
  background-color: #ecebe4;
}
.weui-cell {
  padding: 0 !important;
}
.shebao-wrap {
  min-width: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shebao-wrap .shebao-item {
  width: 1.1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border: 1px solid #f0f0f0;
  color: #f0f0f0;
  border-radius: 0.4rem;
  text-align: center;
  margin-right: 0.1rem;
}
.duoBbr-wrap {
  margin: 0 0.2rem;
}

.duoBbr-wrap .duoBbr-item {
  border-bottom: 1px solid #f0f0f0;
}

.duoBbr-wrap .duoBbr-item .duoBbr {
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.duoBbr-wrap .duoBbr-item .duoBbr .duoBbr-left {
  display: flex;
  align-items: center;
}

.duoBbr-wrap .duoBbr-item .duoBbr .duoBbr-right {
  display: flex;
  align-items: center;
}

.duoBbr-wrap .duoBbr-item .duoBbr .duoBbr-name {
  font-size: 0.15rem;
  margin-right: 0.1rem;
}

.duoBbr-wrap .duoBbr-item .duoBbr .duoBbr-relation {
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
  padding-bottom: 0.05rem;
}

.duoBbr-wrap .duoBbr-item .duoBbr-another .duoBbr-another-itemName {
  width: 0.7rem;
}

.duoBbr-wrap .duoBbr-item .duoBbr-another .duoBbr-another-value {
}

.moreBbr-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 4;
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
  border-radius: 0.25rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.moreBbr-wrap .moreBbr-bottom-wrap .moreBbr-bottom-btn:active {
  opacity: 0.8;
}

.moreBbr-wrap .moreBbr-bottom-wrap .moreBbr-bottom-btn > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes detail-move-in {
  0% {
    transform: translateX(3.75rem);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes detail-move-out {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(3.75rem);
  }
}

.bounce-enter-active {
  animation: detail-move-in 0.3s;
}

.bounce-leave-active {
  animation: detail-move-out 0.3s;
}
.wstb {
  height: 0.5rem;
  line-height: 0.8rem;
  width: 100%;
  padding-left: 0.2rem;
}
</style>