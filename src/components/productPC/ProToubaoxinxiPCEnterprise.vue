<template>
  <div>
    <!--手机号验证 开始-->
    <div class="blackBg" v-show="showShoujihaoYanzheng"></div>
    <div class="shoujihao-wrap" v-show="showShoujihaoYanzheng">
      <div class="title">为了更好的为企业服务，请先验证您的手机号码</div>
      <div class="content">
        <span class="title">手机号：</span>
        <input type="text" placeholder="请输入手机号" v-model="sjh" @blur="checkShoujihao" maxlength="11">
      </div>
      <div class="content" v-show="showTxyzmFlag">
        <span class="title">图形码：</span>
        <input type="text" placeholder="请输入图形码" v-model="txyzm">
        <span class="img" @click="handleCreateImageCode">
          <img :src="txImg" alt="">
        </span>
      </div>
      <div class="content">
        <span class="title">动态码：</span>
        <input type="text" placeholder="请输入手机验证码" v-model="sjyzm">
        <span class="yzm" @click="getSjyzm" id="yzmText">获取验证码</span>
      </div>
      <div class="submit" @click="submitYzm">提交</div>
    </div>
    <!--手机号验证 结束-->
    <div class="wrap" v-show="showToubaoxinxi">
      <!--顶部-->
      <div class="tk_header">
        <div class="tk_header_con">
          <span>您好，欢迎来到阳光财险!  </span>
          <a href="javascript:void(0);" @click="gotoIndex">返回首页</a>
        </div>
      </div>
      <!--logo部分-->
      <div class="logo">
        <div class="container">
          <div class="left"><img src="../../assets/proToubaoxinxiPC/logoLeft.png" alt=""></div>
          <div class="right"><img src="../../assets/proToubaoxinxiPC/logoRight.png" alt=""></div>
        </div>
      </div>
      <!--进度部分-->
      <div class="process">
        <div class="container">
          <div class="step active">填写保单信息</div>
          <div class="step">确认投保单</div>
          <div class="step">支付保费</div>
        </div>
      </div>
      <div class="tbxx-wrap">
        <div class="container">
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'page'" v-if="i+1 == num">
            <!--基本信息-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico06.png" alt="">基本信息</div>
              <table class="tbxx_table">
                <!--保险期间-->
                <tr v-for='item in typeData' :key='item.name' v-if="item.name == '保险期间' && item.entries.length > 0">
                  <td class="first_td">{{item.name}}：</td>
                  <td>
                    <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,styleId)" class="select-box">
                      <option v-for="items in item.entries" :key="items.value" :value="items.id">{{items.value}}</option>
                    </select>
                  </td>
                </tr>
                <!--起保日期和终保日期-->
                <tr>
                  <td class="first_td"> 起保日期：</td>
                  <td>
                    <el-date-picker class="inputP" :default-value="startDefaultValue" v-model="dataValue" type="date"
                                    placeholder="选择起保日期时间" :pickerOptions='pickerOptions' :prefix-icon='icon'
                                    value-format="yyyy-MM-dd" @change='changeStartTime'></el-date-picker>
                    零时起 至
                    <span>{{ endDate }}</span> 二十四时止
                  </td>
                </tr>
                <!--行业类型-->
                <tr v-for='item in typeData' :key='item.name' v-if="item.name == '行业类型' && item.entries.length > 0">
                  <td class="first_td">{{item.name}}：</td>
                  <td>
                    <div>
                      <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,styleId)" class="select-box">
                        <option v-for="items in item.entries" :key="items.value" :value="items.id">{{items.value}}</option>
                      </select>
                      <span style="font-weight: 700;">
                        请查看“
                        <span style="color: #368DF8;cursor: pointer;text-decoration: underline;" @click="openAlertBox(item)" v-for="item in pagedata.insurances" v-if="item.title == '行业分类表'">
                          行业分类表
                        </span>
                        ”，对于表中4类职业以上的人员不予承保</span>
                    </div>
                  </td>
                </tr>
                <!--<tr v-for='item in typeData' :key='item.name'>&lt;!&ndash; 默认展示第一个方案的明细 &ndash;&gt;
                  <td class="first_td" v-if="item.entries.length>0">{{item.name}}：</td>
                  <td v-if="item.entries.length>0 && item.entries.length <= 2">
                    <span class="base-span" v-for="items in item.entries" v-if="item.entries.length<=2"
                          @click="handleClick(item.entries,items.id,styleId)" :class="{active:items.isDefault}"
                          :key='items.id'>
                      {{items.value}}
                    </span>
                  </td>
                  <td v-else-if="item.entries.length > 2 && item.name != '行业类型'">
                    <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,styleId)" class="select-box">
                      <option v-for="items in item.entries" :key="items.id" :value="items.id">{{items.value}}</option>
                    </select>
                  </td>
                  <td v-else-if="item.entries.length > 2 && item.name == '行业类型'">
                    <div>
                      <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,styleId)" class="select-box">
                        <option v-for="items in item.entries" :key="items.value" :value="items.id">{{items.value}}</option>
                      </select>
                      <span>
                        请查看“
                        <span style="color: #368DF8;cursor: pointer;" @click="openAlertBox(item)" v-for="item in pagedata.insurances" v-if="item.title == '行业分类表'">
                          行业分类表
                        </span>
                        ”，对于表中4类职业以上的人员不予承保</span>
                    </div>
                  </td>
                </tr>-->

                <!--<tr v-if="insuranceIntervalType == 0">&lt;!&ndash; 固定区间 &ndash;&gt;
                  <td class="first_td"> 结束日期：</td>
                  <td>
                    <el-date-picker v-model="endDate" type="date" :prefix-icon='icon' value-format="yyyy-MM-dd"
                                    readonly></el-date-picker>
                  </td>
                </tr>
                <tr v-else-if="insuranceIntervalType == 1">&lt;!&ndash; 间隔区间 &ndash;&gt;
                  <td class="first_td"> 结束日期：</td>
                  <td>
                    <el-date-picker v-model="endDate" type="date" :pickerOptions='endPickerOptions' :prefix-icon='icon'
                                    value-format="yyyy-MM-dd"></el-date-picker>
                  </td>
                </tr>-->
              </table>

              <!--方案比较-->
              <div class="prdStyles-wrap">
                <div class="name">
                  <div></div>
                  <div>保障类型</div>
                  <div class="type" v-for="(prdDuty,index) in btnlist[0].prdDutys" :title="prdDuty.dutyType ">{{ (index == 0 ||(index != 0 && prdDuty.dutyType != (btnlist[0].prdDutys)[index-1].dutyType)) ? prdDuty.dutyType : '' }}</div>
                </div>
                <div class="name">
                  <div></div>
                  <div>保障范围</div>
                  <div v-for="prdDuty in btnlist[0].prdDutys" :title="prdDuty.name + '\n' + prdDuty.value ">
                    <img src="../../assets/proToubaoxinxiPC/ts1.png" alt="">
                    {{ prdDuty.name }}
                  </div>
                </div>
                <div class="remark" :class="{on:i.prdItemId == prdmcShop.prdItemId}" v-for="(i,indexA) of btnlist"
                     @click="handletype(i.prdSpecificationCalcs,i.prdItemId,i.styleId,i.price)">
                  <div>{{ i.styleName }}<img v-show="i.prdItemId == prdmcShop.prdItemId"
                                             style="position: absolute;top: 0;right: 0;"
                                             src="../../assets/proToubaoxinxiPC/jbdh.png"/></div>
                  <div>保额</div>
                  <div v-for="prdDuty in i.prdDutys">{{ prdDuty.remark }}</div>
                  <div class="age-wrap" v-for="item in typeData" v-if="item.name == '年龄'" v-show="i.prdItemId == prdmcShop.prdItemId">
                    <span v-for="(haha,index) in item.entries" :key="index" style="color: #999999;">{{ haha.value }}<span style="color: #FF8A00;font-weight: 700;">{{prdmcShop.price}}</span>元/人</span>
                  </div>
                </div>
              </div>
            </div>
            <!--企业信息-->
            <div class="tbxx" v-for="(info,index) in page.types" :key="index" v-if="info.pageType == 4" style="margin-bottom: 325px;">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico05.png" alt="">{{info.pageType | statusFilter}}
              </div>
              <table class="tbxx_table">
                <tr v-for="(i) in info.items" :key='i.itemName'>
                  <td class="first_td"> {{i.itemName}}：</td>
                  <td>
                    <!--企业名称-->
                    <input type="text" class="tbxx_input" v-if="i.itemCode == 50" v-model="i.userName"
                           placeholder="请填写真实完整企业抬头，该名称将默认为发票抬头"
                           @blur="handleCommonCheck(i,info.pageType)">
                    <!--企业所在地-->
                    <div v-else-if="i.itemCode == 51">
                      <el-cascader :options="citySelectOptions" placeholder="请选择所在地区"
                                   v-model="enterpriseArea" separator=" "
                                   @change="handleCityChange(i,enterpriseArea)"></el-cascader>
                      <input type="text" class="tbxx_input" placeholder="请填写详细地址，精确到门牌号" v-model="i.userNameSecond" @blur="handleCommonCheck(i,info.pageType)">
                    </div>
                    <!--企业证件类型-->
                    <select v-else-if="i.isHasOption && i.itemCode == 52" :key="index+'Selected'" class="select-box"
                            v-model="i.userName" >
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--企业证件编号-->
                    <input type="text" class="tbxx_input" v-else-if="i.itemCode == 53" placeholder="请填写证件号码"
                           v-model="i.userName"
                           @blur="handleCommonCheck(i,info.pageType)">
                    <!--营业执照-->
                    <div v-else-if="i.itemCode == 54" style="position: relative;top: 0;left: 0;">
                      <el-upload
                        class="upload-demo"
                        action="/admin/file/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <div class="upload-license">上传营业执照&gt;&gt;</div>
                      </el-upload>
                      <div class="upload-explain">支持上传PDF、JPG、PNG格式 ( 5M以内 )、( 企业名称需与营业执照中的企业名称一致 )</div>
                      <div class="license-img">
                        <div class="img-wrap">
                          <img :src="businessLicenseImgUrl" alt="" v-if="!showPDF">
                          <object v-else :data="businessLicenseImgUrl" type="application/pdf" width="100%" height="100%">
                            <embed :src="businessLicenseImgUrl" type="application/pdf">
                              <p>这个页面不支持PDF，请下载查看: <a :href="businessLicenseImgUrl">下载PDF</a>.</p>
                            </embed>
                          </object>
                        </div>
                        <div class="btn">
                          <el-upload
                              class="upload-demo"
                              action="/admin/file/upload"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                            <span>修改</span>
                          </el-upload>
                          <span @click="deletenBusinessLicense">删除</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <!--企业联系人-->
            <div class="tbxx" v-for="(info,index) in page.types" :key="index" v-if="info.pageType == 5">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">{{info.pageType | statusFilter}}
              </div>
              <table class="tbxx_table">
                <tr v-for="(i) in info.items" :key='i.itemName'>
                  <td class="first_td"> {{i.itemName}}：</td>
                  <td>
                    <!--姓名-->
                    <input type="text" class="tbxx_input" v-if="i.itemCode == 1" v-model="i.userName"
                           placeholder="请填写联系人姓名"
                           @blur="handleCommonCheck(i,info.pageType)"
                    >
                    <!--联系电话-->
                    <input type="text" class="tbxx_input" v-else-if="i.itemCode == 6" v-model="i.userName"
                           placeholder="请填写手机号码"
                           maxlength="11"
                           @blur="handleCommonCheck(i,info.pageType)"
                    >
                    <!--邮箱-->
                    <input type="text" class="tbxx_input" v-else-if="i.itemCode == 7" v-model="i.userName"
                           placeholder="请输入邮箱，电子保单将发送至此邮箱中"
                           @blur="handleCommonCheck(i,info.pageType)"
                    >
                  </td>
                </tr>
              </table>
            </div>
            <!--雇员信息-->
            <div class="tbxx" v-for="(info,index) in page.types" :key="index" v-if="info.pageType == 6">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">{{info.pageType | statusFilter}}
                <div class="addInfo-wrap">
                  <span @click="exportClick">下载模板</span>
                  <!--批量上传信息-->
                  <input-excel @getResult="getMyExcelData"></input-excel>
                  <span @click="addBeibaorenInfo">逐个添加信息</span>
                </div>
              </div>
              <div v-if="minGroupNum != null && maxGroupNum != null">
                <table class="insures-table" v-if="insureds.length > 0">
                  <tr>
                    <th>编号</th>
                    <th>与投保人关系</th>
                    <th>姓名</th>
                    <th>证件类型</th>
                    <th>证件编号</th>
                    <th>出生日期</th>
                    <th>性别</th>
                    <th>操作</th>
                  </tr>
                  <tr v-for="(insured,i) in insureds" :key="i">
                    <td>{{ i+1 }}</td>
                    <td v-for="(item,i) in insured.insuredItems" :key="i">{{ item | handleSwitchItemValue }}</td>
                    <td v-if="insured.insuredItems.length < 7" v-for="i in (6-insured.insuredItems.length)">——</td>
                    <td><span class="modify-span" @click="modifyBeibaorenInfo(i)">修改</span><span class="delete-span" @click='deleteBeibaorenInfo(i)'>删除</span></td>
                  </tr>
                </table>
                <div class="blackBg" v-show="showBeibaoren"></div>
                <div class="modify-add-insuredInfo-wrap" v-show="showBeibaoren"  v-for="(user,index) in userList" :key="index+'group-item'" v-if="index == beibaorenIndex">
                  <div class="insure-title">{{ modifyOrAdd ? '修改':'添加' }}被保人信息</div>
                  <div class="content">
                    <table class="tbxx_table">
                      <tr>
                        <td class="first_td">{{user.itemName}}:</td>
                        <td>
                          <!--与投保人关系-->
                          <select :key="index+'group'" name="" id="" v-if="user.isHasOption &&  user.itemCode == '8'"
                                  class="select-box" v-model="user.userName" @change='selectOption2(user.userName,index)'>
                            <option v-for="itemy in user.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr v-for="(w,indexx) in user.otherOptionitems" :key="indexx+'group-items-info'">
                        <td class="first_td"> {{w.itemName}}：</td>
                        <td>
                          <!--姓名-->
                          <input type="text" class="tbxx_input" v-if="!w.isHasOption && w.itemCode == 1"
                                 placeholder="请输入姓名" v-model="w.userName"
                                 @blur="handleCommonCheck(w,info.pageType)" maxlength="30">
                          <!--证件类型-->
                          <select :key="indexx+'group--index'" v-else-if="w.isHasOption &&  w.itemCode == 3"
                                  class="select-box" v-model="w.userName"
                                  @change='numChange(w,info.pageType,index,$event)'>
                            <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                          </select>
                          <!--证件号码-->
                          <input type="text" class="tbxx_input" v-else-if="w.itemCode == 4"
                                 placeholder="请输入证件号码" v-model="w.userName" maxlength="18"
                                 @blur="handleCommonCheck(w,info.pageType)">
                          <!--出生日期-->
                          <el-date-picker type='date'
                                          v-else-if="!w.isHasOption && w.itemCode == 5"
                                          :prefix-icon='icon' value-format='yyyy-MM-dd' :placeholder="'请选择'+w.itemName"
                                          v-model="w['userName'+index]"
                                          @blur="handleCommonCheck(w,info.pageType,index)"
                                          :pickerOptions='pickerOptionsAfter'></el-date-picker>
                          <!--性别-->
                          <select :key="indexx+'group--index'" v-else-if="w.isHasOption &&  w.itemCode == 2"
                                  class="select-box" v-model="w.userName"
                                  @change='numChange(w,info.pageType,index,$event)'>
                            <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                          </select>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="bottom">
                    <div @click="cancelBeibaoren(index)">取消</div>
                    <div @click="confirmBeibaoren(index)">确定</div>
                  </div>
                </div>
              </div>
            </div>
            <!--受益人-->
            <div class="tbxx" v-for="(info,index) in page.types" :key="index" v-if="info.pageType == 3">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">{{info.pageType | statusFilter}}
              </div>
              <table class="tbxx_table">
                <tr v-for="(i) in info.items" :key='i.itemName'>
                  <td class="first_td"> {{i.itemName}}：</td>
                  <td>
                    <!--受益人-->
                    <div v-if="i.itemCode == 29">法定</div>
                  </td>
                </tr>
              </table>
            </div>

            <!--投保声明-->
            <div class="tiaokuan-span-box">
              <div>
                <label :class="{checkbox:!checkedFlag, 'checkbox-checked':checkedFlag}" @click="chenge"></label>
                我已阅读并同意
                <a href="javascript:void(0)" v-for="(item,q) in pagedata.insurances" :class="'aIndex'+q"
                   @click="openTiaokuanAlertBox(item)"
                   v-if="(item.type == 1 || item.type == 3 || item.type == 5  || item.type == 7) && item.title != '行业分类表'" :key="q"
                   style="color: #FF6C00">《{{item.title}}》</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--底部保费固定展示区域-->
      <div class="calculate_info">
        <div class="calculate_wrap">
          <div class="cost-wrap">
            <span class="title">保额：¥</span>
            <span class="value" v-for="item in typeData" v-if="item.name == '保额'">{{(item.entries[0].value).replace(/\元/g,"") * insureds.length}}</span>
            <span class="title">保费：¥</span>
            <span class="value">{{toubaoNumber * insureds.length * prdmcShop.price}}</span>
          </div>
          <div class="age-wrap" v-for="item in typeData" v-if="item.name == '年龄'">
            <span v-for="(haha,index) in item.entries" :key="index">{{ haha.value }}：{{ insureds.length }}人X￥{{ prdmcShop.price }}=￥{{ insureds.length * prdmcShop.price}}</span>
          </div>
          <div class="arrow-wrap">
            <span class="previous" @click="gotoIndex">&lt;上一步</span>
            <span class="next" @click="gotoConfirm">下一步</span>
          </div>
        </div>
      </div>

      <AlertBox :showAlertBox="showAlertBox" :tiaokuan="insurance" @closeAlertBox="closeAlertBox"></AlertBox>
      <TiaokuanAlertBox :showTiaokuanAlertBox="showTiaokuanAlertBox" :pagedata="pagedata" @closeTiaokuanAlertBox="closeTiaokuanAlertBox"></TiaokuanAlertBox>
    </div>
    <div class="wrap" v-show="!showToubaoxinxi">
      <!--顶部-->
      <div class="tk_header">
        <div class="tk_header_con">
          <span>您好，欢迎来到阳光财险!  </span>
          <a href="javascript:void(0);" @click="gotoIndex">返回首页</a>
        </div>
      </div>
      <!--logo部分-->
      <div class="logo">
        <div class="container">
          <div class="left"><img src="../../assets/proToubaoxinxiPC/logoLeft.png" alt=""></div>
          <div class="right"><img src="../../assets/proToubaoxinxiPC/logoRight.png" alt=""></div>
        </div>
      </div>
      <!--进度部分-->
      <div class="process">
        <div class="container">
          <div class="step">填写保单信息</div>
          <div class="step active">确认投保单</div>
          <div class="step">支付保费</div>
        </div>
      </div>
      <div class="tbxx-wrap">
        <div class="container">
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'page'" v-if="i+1 == num">
            <!--基本信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico06.png" alt="">基本信息</div>
              <div class="tb_table">
                <div class="tb_table_item" v-for="(item,i) in baseInfo" :key="i" v-if="item.name != '保额' && item.name != '年龄'">
                  <div class="title">{{item.name}}：</div>
                  <div class="content">{{item.value}}</div>
                </div>
                <div class="tb_table_item">
                  <div class="title">起保日期：</div>
                  <div class="content">{{dataValue}} 零时起 至 {{endDate}} 二十四时 止</div>
                </div>
              </div>
            </div>
            <!--方案介绍信息-->
            <div class="prd-introduce" v-for="(item,index) in btnlist" v-if="item.prdItemId == isactive">
              <div class="title">
                <span>保障类型</span>
                <span>保障范围</span>
                <span>保额</span>
              </div>
              <div class="content" v-for="(prd,i) in item.prdDutys">
                <span :title="prd.dutyType">{{ (i == 0 ||(i != 0 && prd.dutyType != (btnlist[index].prdDutys)[i-1].dutyType)) ? prd.dutyType : '' }}</span>
                <span :title="prd.name + '\n' + prd.value">{{ prd.name }}</span>
                <span>{{ prd.remark }}</span>
              </div>
            </div>
            <!--企业信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico05.png" alt="">企业信息</div>
              <div class="tb_table">
                <div class="tb_table_item" v-for="(item,i) in businessInfo" :key="i">
                  <div class="title">{{ item.code | handleSwitchItemName }}：</div>
                  <div class="content">{{ item | handleSwitchItemValue }}</div>
                </div>
              </div>
            </div>
            <!--企业联系人展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico05.png" alt="">企业联系人</div>
              <div class="tb_table">
                <div class="tb_table_item" v-for="(item,i) in businessLinkerInfo" :key="i">
                  <div class="title">{{ item.code | handleSwitchItemName }}：</div>
                  <div class="content">{{ item | handleSwitchItemValue }}</div>
                </div>
              </div>
            </div>
            <!--被保人信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">被保人信息</div>
              <table class="insures-table">
                <tr>
                  <th>编号</th>
                  <th>与投保人关系</th>
                  <th>姓名</th>
                  <th>证件类型</th>
                  <th>证件编号</th>
                  <th>出生日期</th>
                  <th>性别</th>
                </tr>
                <tr v-for="(insured,i) in insureds" :key="i">
                  <td>{{ i+1 }}</td>
                  <td v-for="(item,i) in insured.insuredItems" :key="i">{{ item | handleSwitchItemValue }}</td>
                  <td v-if="insured.insuredItems.length < 7" v-for="i in (6-insured.insuredItems.length)">——</td>
                </tr>
              </table>
            </div>
            <!--受益人信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">受益人信息</div>
              <div class="tb_table">
                <div class="tb_table_item">
                  <div class="title">受益人：</div>
                  <div class="content">法定</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--底部保费固定展示区域-->
      <div class="calculate_info">
        <div class="calculate_wrap">
          <div class="cost-wrap">
            <span class="title">保额：¥</span>
            <span class="value" v-for="item in typeData" v-if="item.name == '保额'">{{(item.entries[0].value).replace(/\元/g,"") * insureds.length}}</span>
            <span class="title">保费：¥</span>
            <span class="value">{{toubaoNumber * insureds.length * prdmcShop.price}}</span>
          </div>
          <div class="age-wrap" v-for="item in typeData" v-if="item.name == '年龄'">
            <span v-for="(haha,index) in item.entries" :key="index">{{ haha.value }}：{{ insureds.length }}人X￥{{ prdmcShop.price }}=￥{{ insureds.length * prdmcShop.price}}</span>
          </div>
          <div class="arrow-wrap">
            <span class="previous" @click="closeConfirm">&lt;返回修改</span>
            <span class="next" @click="gotoPay">确认无误，购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cityData from "./cityForPC.json"
  import jobData from "./jobPC.json"
  import Jquery from 'jquery'
  import AlertBox from './common/AlertBox.vue'
  import TiaokuanAlertBox from './common/TiaokuanAlertBox.vue'
  import inputExcel from '../../components/commons/uploadExcel.vue'
  import XLSX from 'xlsx'

  export default {
    name: "ProToubaoxinxiPCEnterprise",
    components: {
      AlertBox,
      TiaokuanAlertBox,
      inputExcel
    },
    data() {
      return {
        uploadBusinessLicenseFlag:false,// 是否已上传营业执照的标识
        businessLicenseImgUrl:'',// 营业执照图片地址
        showPDF:false,
        randomNumber:null,//随机数
        sjh:'',// 手机号
        showTxyzmFlag:false,//是否展示图形验证码标识
        txyzm:'',// 图形验证码
        txImg:'',
        sjyzm:'',// 手机验证码
        yzmText:'获取验证码',
        showShoujihaoYanzheng:false,//是否展示手机号验证信息
        itemId: this.$route.query.id, // 支付参数 itemid
        channelCode: this.$route.query.channelCode, //渠道code
        orgCode: this.$route.query.orgCode,//机构code
        productStartDate: '',//后台配置的起保日期
        lastDateString: '00:00:00',
        endLastDateString: '23:59:59',
        enterpriseArea: [],// 企业所在地区
        citySelectOptions: {},
        showToubaoxinxi: true,// 默认展示投保信息内容
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() <= Date.now();
          }
        },
        pickerOptionsAfter: {
          disabledDate(time) {
            return time.getTime() >= Date.now();
          }
        },
        endPickerOptions: {},
        cardValue: '1',//证件类型值,默认为1,1：居民身份证
        noRequiredField: ['36', '38', '39', '46', '27', '30', '31', '45'],//非必填字段,对应的id数组
        showAlertBox: false,// 是否展示投保须知弹出框标识
        showTiaokuanAlertBox: false,// 是否展示告知内容弹出框标识
        insurance: {},
        icon: "aa.png",
        checkedFlag: false,
        res: {},
        globalFlag: false,
        insuranceIntervalType: 0,// 保险间隔类型  0固定区间1间隔区间
        takesEffect: 0,// 保单是否立即生效 0是1否
        minDayCount: 0,// 保险间隔类型为间隔区间 最小 保险期间天数
        maxDayCount: 0,// 保险间隔类型为间隔区间时 最大保险期间天数
        pagedata: {}, //page 数据
        prdCode: '',// 产品编号
        prdName: '',// 产品名称
        paramsTopayid: "", //支付参数 itemid
        pagelength: "", //存放页数的数组
        num: 1, //当前显示页数
        pagecenters: [], //条款须知集合数组
        insurednmb: 1, //被保人数量
        toubaoNumber: 1,// 投保份数，默认是1份
        dayCount: null,// 保险期间天数
        giveInsurance: null,// 是否为赠险 0是 1否
        isSharedPremium: '',//是否共享保额保费 0共享 1不共享
        maxGroupNum: null, // 被保人最大人数
        minGroupNum: null, // 被保人最小人数

        startDefaultValue: '',// 默认展示的起保日期
        dataValue: null, // 起保日期
        rangeDay: null,// 起保日期可选范围（天）
        startDateRange: '',
        startDate: "",
        endDate: "",

        insureApplicant: [], //被保人items数组

        benrenShow: [], //存的是 与投保人关系8 这一项
        duoyuShow: [], //存的是排除了 与投保人关系8 、 出生日期5 、 性别2 之后的雇员信息数组

        shouyiren: "", //受益人是否展示
        gangaoShow: [],// 存的是出生日期和性别两项
        userList: [],// 雇员信息数组

        btnlist: [],// 方案数组prdStyleSpecification
        prdmcShop: {}, // 确认投保数据
        isactive: '', // 方案明细id
        styleId: '',// 方案id
        typeData: [], // 某一个方案的数据明细prdSpecificationCalcs
        itemData: {},
        entries: [],// 某一项的明细数组
        upParams: {},

        paramsTopay: {}, // 立即支付的参数
        policyHolders: [], // 投保人信息
        insureds: [], // 被保人信息
        insuredsInfo: [], // 被保人信息
        beneficiary: [], // 受益人信息
        businessInfo:[],// 企业信息
        businessLinkerInfo:[],//企业联系人信息

        baseInfo: [],// 用户所选产品方案相关信息
        addressCode: '',// 最低级的地区code

        beibaorenIndex: '',// 被保人索引
        showBeibaoren: false,// 是否展示添加或修改被保人弹框标志
        modifyOrAdd:true,// 修改被保人或添加被保人标识，true:修改，false:添加
        currentUser:{},// userList中当前的user
      }
    },
    methods: {
      // 校验邮箱
      checkEmail(email) {
        var regExp = /^[a-z0-9]+([._\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
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
        var regExp = /^[\u4E00-\u9FA5]{2,4}$/
        if (regExp.test(name)) {
          return true
        } else {
          return false
        }
      },
      // 判断是否展示手机号验证弹出框
      showShoujihaoOrNot() {
        var sjh = this.getCookie('phoneNumber')
        if (checkMsgNull(sjh)) {

        }else {
          var flag = false
          for (var i=0;i<this.pagedata.page[0].types.length;i++) {
            if (this.pagedata.page[0].types[i].pageType == 7) {
              flag = true
            }
          }
          if (flag) {
            this.showShoujihaoYanzheng = true
            this.handleCreateImageCode()
          }
        }
      },
      // 获取或者更新图形验证码
      handleCreateImageCode() {
        this.randomNumber = parseInt(Math.random()*(9999-1000))+1000;
        var url = '/admin/code/createImageCode/' + this.randomNumber
        this.txImg = url
      },
      //校验手机号
      checkShoujihao() {
        if (!checkMsgNull(this.sjh)) {
          this.$message.error("手机号码不能为空")
        }else {
          if (!this.checkMobilePhone(this.sjh)) {
            this.$message.error("手机号码格式不对")
          }else {
            this.showTxyzmFlag = true
          }
        }
      },
      // 函数中的参数分别为 cookie 的名称、值以及过期天数
      // 保存cookie
      setCookie(name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
      },
      // 获取cookie
      getCookie(name)
      {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      },
      getSjyzm() {
        if (checkMsgNull(this.sjh) && checkMsgNull(this.txyzm)) {
          // 验证图形验证码
          var url = '/admin/code/checkImageCode?randomStr='+ this.randomNumber +'&imageCode=' + this.txyzm
          this.$http.get(url).then(res => {
            console.log(res.data)
            if (res.data) {
              if ($('#yzmText').text().indexOf('s') == -1) {
                var i = 60
                var time = setInterval(function () {
                  console.log(i)
                  $('#yzmText').text(i + 's')
                  i--
                  if (i < 0) {
                    clearInterval(time)
                    i = 60
                    $('#yzmText').text('重新获取')
                  }
                },1000)
              }
              // 获取短信验证码
              this.$http.post('/sunmc/messageValidate/sendValidcodeCollection',{
                phone:this.sjh
              }).then(res => {

              })


            } else {
              this.$message.error('图形验证码输入有误！')
            }
          })
        } else {
          this.$message.error('请先填写手机号和图形验证码！')
        }
      },
      // 验证短信验证码
      submitYzm() {
        if (checkMsgNull(this.sjh) && checkMsgNull(this.txyzm) && checkMsgNull(this.sjyzm)) {
          this.$http.post('/sunmc/messageValidate/checkValidateCodeCollection',{
            phone:this.sjh,
            validCode:this.sjyzm,
          }).then(res => {
            if (res.data) {
              this.setCookie('phoneNumber',this.sjh,7)
              this.showShoujihaoYanzheng = false
            } else {
              this.$message.error('验证码校验失败！')
              return false
            }
          })
        } else {
          this.$message.error('请先填写相关内容')
          return false
        }

        this.setCookie('phoneNumber',this.sjh,7)
        this.showShoujihaoYanzheng = false
      },
      handleAvatarSuccess(res, file) {
        if(res.code==200){
          this.businessLicenseImgUrl = res.data.filename
          this.uploadBusinessLicenseFlag = true
          if (res.data.filename.endsWith('.pdf')) {
            this.showPDF = true 
          } else {
            this.showPDF = false
          }
          this.$message({
          message: '上传成功！',
          type: 'success'
        })
        }else{
          this.$notify({
            title: '失败',
            message: '上传失败，请重新上传',
            type: "error",
          })
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png'
        const isPDF = file.type === 'application/pdf'
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG && !isPNG && !isPDF) {
          this.$message.error('只能上传 PDF、JPG和PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('文件大小不能超过 5MB!');
        }
        if ((isJPG || isPNG || isPDF) && isLt5M) {
          this.$message('营业执照上传中。。。')
        }
        return (isJPG || isPNG || isPDF) && isLt5M;
      },
      deletenBusinessLicense() {
        this.businessLicenseImgUrl = ''
        this.uploadBusinessLicenseFlag = false
      },
      getMyExcelData(data) {
        // data 为读取的excel数据，在这里进行处理该数据
        console.log(data)
        if (data.length > 0) {
          var peopleItemState = {}
          var peopleItemState2 = {}
          var otherOptionitems = []; //如果不是本人，来放其他的选项。。。。
          for (var j = 0; j < this.insureApplicant.length; j++) {
            var appInfo = this.insureApplicant[j];
            var optionsItems = {}
            if (appInfo.itemCode != 8 && appInfo.itemCode != 5 && appInfo.itemCode != 2) {
              otherOptionitems.push({
                itemName : appInfo.itemName,
                itemCode : appInfo.itemCode,
                isHasOption : appInfo.isHasOption,
                options : appInfo.options,
                userName : appInfo.userName,
              })
            }
          }
          peopleItemState.userName = '8';
          peopleItemState.options = this.insureApplicant[0].options;
          peopleItemState.isHasOption = this.insureApplicant[0].isHasOption;
          peopleItemState.itemName = this.insureApplicant[0].itemName;
          peopleItemState.itemCode = this.insureApplicant[0].itemCode;
          peopleItemState.otherOptionitems = otherOptionitems;
          peopleItemState.recordOpitonitems = otherOptionitems;
          peopleItemState2 = JSON.parse(JSON.stringify(peopleItemState))
          this.gangaoShow.forEach(item => {
            peopleItemState2.otherOptionitems.push(item)
          })
          console.log(JSON.stringify(peopleItemState))
          console.log(JSON.stringify(peopleItemState2))

          var userListLength = this.userList.length
          var userListAdd = []

          for (var i=0;i<data.length;i++) {
            var peopleItem = []
            var obj = {}
            if (data[i]['证件类型'] == 1) {// 如果证件类型是身份证
              obj = {
                1:'姓名',
                3:'证件类型',
                4:'证件编号',
              }
              peopleItem = JSON.parse(JSON.stringify(peopleItemState))
            }else {
              obj = {
                1:'姓名',
                3:'证件类型',
                4:'证件编号',
                5:'出生日期',
                2:'性别',
              }
              peopleItem = JSON.parse(JSON.stringify(peopleItemState2))
            }
            peopleItem.userName = data[i]['与投保人关系']
            for (var j=0;j<peopleItem.otherOptionitems.length;j++) {
              var item = peopleItem.otherOptionitems[j]
              if (item.itemCode == 5) {
                item['userName' + (userListLength + i)] = data[i][obj[item.itemCode]]
              } else {
                item.userName = data[i][obj[item.itemCode]]
              }
            }
            userListAdd.push(peopleItem)
          }
          if (userListAdd.length > 0) {
            userListAdd.forEach(item => {
              this.userList.push(item)
            })
          }
          this.getInsureds()
        }
      },
      exportClick() {
        this.export2Excel()
      },
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader =
            ['与投保人关系', '姓名', '证件类型','证件编号', '出生日期','性别'];
          const filterVal = ['name1', 'name2','name3','name4','name5','name6'];
          const list = [
            {
              name1:1,
              name2:'张明',
              name3:'1',
              name4:'410522199001295510',
              name5:'1990-01-29',
              name6:'1',
            }
          ]
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '被保人模板表格'+(new Date()).Format('yyyyMMddHHmmss'));
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 返回首页
      gotoIndex() {
        this.$router.push({
          path: "/ProductPC/ProDetailsPC",
          query: {
            id: this.itemId,
            channelCode: this.channelCode,
            orgCode: this.orgCode,
          }
        });
      },
      // 获取产品方案
      getSpecification() {
        var prdmcShop = window.sessionStorage.getItem('prdmcShop')
        if (prdmcShop && prdmcShop != '{}') {// 走缓存
          this.prdmcShop = JSON.parse(prdmcShop)
          this.btnlist = JSON.parse(window.sessionStorage.getItem('btnlist'))// 方案报价数据数组
          var preStyles = JSON.parse(window.sessionStorage.getItem('prdStyles'))
          this.btnlist.forEach((item, itemindex) => {
            item.prdDutys = preStyles[itemindex].prdDutys
            this.detailslist = item;
            item.prdSpecificationCalcs.forEach(item => {
              if (item.entries.length >= 2) {
                item.entries.forEach(items => {
                  if (items.isDefault) {// 是否默认选中展示该项
                    item.selectValue = items.id; //下拉框设置默认值
                  }
                });
              }
            });
          });
          this.typeData = JSON.parse(window.sessionStorage.getItem('typeData'))// 第一个方案的数据明细
          this.itemData.startPrice = this.btnlist[0].price;//改变初始价格
          this.isactive = JSON.parse(window.sessionStorage.getItem('isactive'))// 默认方案的明细id
          this.styleId = JSON.parse(window.sessionStorage.getItem('styleId'))// 方案id
          this.calcIds = [];// prdSpecificationCalcs 下面entries中的"isDefault": true的id组成的数组
          this.calcIdKeys = [];// prdSpecificationCalcs下面每一项的name组成的数组
          this.typeData.forEach(z => {
            if (z.name == '年龄') {
              this.entries = z.entries
            }
            z.entries.forEach(i => {
              if (i.isDefault) {
                this.calcIds.push(i.id);
                this.calcIdKeys.push(z.name);
              }
            });
          });
          this.upParams = {
            styleId: this.styleId,
            calcIds: this.calcIds,
            calcIdKeys: this.calcIdKeys
          }
          this.getList()
        } else {
          this.$http.post('/prdmc/prdmcShop/productSpecification', {// 调产品方案报价接口
            id: this.itemId // 产品主键
          }).then(res => {
            this.prdmcShop = res.data.data;
            this.btnlist = this.prdmcShop.prdStyleSpecification;// 方案报价数据数组
            var preStyles = JSON.parse(window.sessionStorage.getItem('prdStyles'))
            this.btnlist.forEach((item, itemindex) => {
              item.prdDutys = preStyles[itemindex].prdDutys
              this.detailslist = item;
              item.prdSpecificationCalcs.forEach(item => {
                if (item.entries.length >= 2) {
                  item.entries.forEach(items => {
                    if (items.isDefault) {// 是否默认选中展示该项
                      item.selectValue = items.id; //下拉框设置默认值
                    }
                  });
                }
              });
            });
            this.typeData = this.btnlist[0].prdSpecificationCalcs;// 第一个方案的数据明细
            this.itemData.startPrice = this.btnlist[0].price;//改变初始价格
            this.isactive = this.btnlist[0].prdItemId;// 默认方案的明细id
            this.styleId = this.btnlist[0].styleId;// 方案id
            this.calcIds = [];// prdSpecificationCalcs 下面entries中的"isDefault": true的id组成的数组
            this.calcIdKeys = [];// prdSpecificationCalcs下面每一项的name组成的数组
            this.typeData.forEach(z => {
              if (z.name == '年龄') {
                this.entries = z.entries
              }
              z.entries.forEach(i => {
                if (i.isDefault) {
                  this.calcIds.push(i.id);
                  this.calcIdKeys.push(z.name);
                }
              });
            });
            this.upParams = {
              styleId: this.styleId,
              calcIds: this.calcIds,
              calcIdKeys: this.calcIdKeys
            }
            this.getList()
          });
        }
      },
      generateBaseInfo() {
        this.baseInfo = []
        for (let i = 0; i < this.btnlist.length; i++) {
          if (this.styleId == this.btnlist[i].styleId) {
            let calcIdsArr = this.upParams.calcIds
            for (let j = 0; j < calcIdsArr.length; j++) {
              let entriesArr = this.btnlist[i].prdSpecificationCalcs[j].entries
              for (let k = 0; k < entriesArr.length; k++) {
                if (calcIdsArr[j] == entriesArr[k].id) {
                  this.baseInfo.push({
                    name: this.btnlist[i].prdSpecificationCalcs[j].name,
                    value: entriesArr[k].value
                  })
                }
              }
            }
          }
        }
      },
      getList() {
        let res = window.sessionStorage.getItem('res');
        console.log('res----->' + res);
        let that = this
        if (res && res != '{}') { // 从缓存中拿数据 。。。
          console.log('开始拉取缓存数据');
          res = JSON.parse(res);
          this.res = res;
          this.globalFlag = true;
          this.insurednmb = window.sessionStorage.getItem('insurednmb');//被保人数量
          this.toubaoNumber = window.sessionStorage.getItem('toubaoNumber');//投保份数

          this.productStartDate = window.sessionStorage.getItem('productStartDate')//从缓存中取后台配置的起保日期
          this.itemId = window.sessionStorage.getItem('itemId');
          this.dataValue = window.sessionStorage.getItem('startDate');
          this.endDate = window.sessionStorage.getItem('endDate');
          this.enterpriseArea = JSON.parse(window.sessionStorage.getItem('enterpriseArea'))
          this.businessLicenseImgUrl = window.sessionStorage.getItem('businessLicenseImgUrl')
          this.uploadBusinessLicenseFlag = window.sessionStorage.getItem('uploadBusinessLicenseFlag')

          this.addressName = window.sessionStorage.getItem('addressName') ? window.sessionStorage.getItem('addressName') : "";
          this.addressCode = window.sessionStorage.getItem('addressCode') ? window.sessionStorage.getItem('addressCode') : "";
          var gangaoShow = window.sessionStorage.getItem('gangaoShow');
          this.gangaoShow = JSON.parse(gangaoShow);
          console.log('this.gangaoShow---->' + JSON.stringify(this.gangaoShow));

          this.maxGroupNum = res.data.data.maxGroupNum;
          this.minGroupNum = res.data.data.minGroupNum;
          if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {
            this.userList = JSON.parse(window.sessionStorage.getItem('userList'))
            this.insureds = JSON.parse(window.sessionStorage.getItem('insureds'))
            this.modifyOrAdd = JSON.parse(window.sessionStorage.getItem('modifyOrAdd'))
          }

          this.insuranceIntervalType = res.data.data.insuranceIntervalType;
          this.takesEffect = res.data.data.takesEffect;
          this.citySelectOptions = cityData.content
          this.maxDayCount = res.data.data.maxDayCount;
          this.minDayCount = res.data.data.minDayCount;
          this.pagedata = res.data.data; //需要展示的数据
          this.prdCode = res.data.data.prdCode;
          this.paramsTopayid = res.data.data.itemId;
          this.pagelength = this.pagedata.page.length; //计算的页数
          this.pagecenters = res.data.data.insurances; //协议内容
          this.prdName = res.data.data.prdName; //产品名称
          this.dayCount = res.data.data.dayCount;
          this.giveInsurance = res.data.data.giveInsurance;
          this.rangeDay = res.data.data.rangeDay;
          this.isSharedPremium = res.data.data.isSharedPremium;
          if (this.isSharedPremium == null || this.isSharedPremium == '') {
            this.isSharedPremium = 0;
          }

          //设置页面标题
          Jquery(document).find('title').text(this.prdName);
          console.log(Jquery(document).find('title').text());

          this.showShoujihaoOrNot()

          //判断产品是否下架
          if (res.data.data.productEndDateStr != '' && res.data.data.productEndDateStr != null) {
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(res.data.data.productEndDateStr.replace(new RegExp(/-/gm), "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//若产品下架日期小于当前时间,则提示下架
              this.$message.error('该产品已下架！')
            }
          }

          var defDate = new Date();
          this.startDefaultValue = defDate.Format('yyyy-MM-dd');
          defDate.setDate(defDate.getDate() + 1) //下一天开始

          //起保日期可选范围（天）
          var dataValue = null
          if (this.productStartDate == '' || this.productStartDate == null) {//若后台配置的起保日期为空
            dataValue = new Date(this.dataValue).getTime() - 3600 * 8 * 1000;//则取默认的起保日期
          } else {
            dataValue = new Date(this.productStartDate).getTime() - 3600 * 8 * 1000;//否则就取后台配置的起保日期
          }

          if (this.rangeDay == null || this.rangeDay == '') {
            this.rangeDay = 90;
          }
          this.startDateRange = dataValue + (this.rangeDay * 3600 * 24 * 1000);

          if (this.insuranceIntervalType == 0) {//固定区间：例1年
            var start_date = new Date(this.dataValue);
            var end_date = new Date(this.dataValue);
            end_date.setDate(start_date.getDate() + this.dayCount - 1)
            end_date = end_date.Format("yyyy-MM-dd");
            // this.endDate = end_date //从缓存中取日期，不需重新赋值

            //增加起保日期可后台配置功能,起保日期、结束日期范围需随之而变
            var startDate = null
            if (this.productStartDate == '' || this.productStartDate == null) {//若后台配置的起保日期为空
              startDate = start_date.getTime() - 3600 * 8 * 1000;//则取默认的起保日期
            } else {
              startDate = new Date(this.productStartDate).getTime() - 3600 * 8 * 1000;//否则就取后台配置的起保日期
            }

            this.pickerOptions = {
              disabledDate(time) {
//              return time.getTime() <= Date.now() || time.getTime() > (Date.now() + (that.startDateToEnd) * 3600 * 24 * 1000);
                return time.getTime() < startDate || time.getTime() > (that.startDateRange - 1);
              }
            }
          } else if (this.insuranceIntervalType == 1) {//间隔区间：例1天-5天
            //重置结束日期
            var start_date = new Date(this.dataValue);
            var end_date = new Date(this.dataValue);
            end_date.setDate(start_date.getDate() + this.minDayCount - 1);
            end_date = end_date.Format("yyyy-MM-dd");
//          this.endDate = end_date;//从缓存中取日期，不需重新赋值

            //增加起保日期可后台配置功能,起保日期、结束日期范围需随之而变
            if (this.productStartDate == '' || this.productStartDate == null) {//若后台配置的起保日期为空
              var startDate = start_date.getTime() - 3600 * 8 * 1000;//则取默认的起保日期
            } else {
              var startDate = new Date(this.productStartDate).getTime() - 3600 * 8 * 1000;//否则就取后台配置的起保日期
            }

            this.pickerOptions = {
              disabledDate(time) {
//              return time.getTime() < Date.now() || time.getTime() > (Date.now() + (that.startDateToEnd) * 3600 * 24 * 1000);
                return time.getTime() < startDate || time.getTime() > (that.startDateRange - 1);
              }
            }

            this.endPickerOptions = {
              disabledDate(time) {
                // return  Date.now() > time.getTime() > (Date.now() + that.maxDayCount*3600*24*1000);
//              return (Date.now() + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > (Date.now() + (that.maxDayCount - 1) * 3600 * 24 * 1000);
//              return (start_date.getTime() + (that.minDayCount - 2) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > (start_date.getTime() + (that.maxDayCount -1) * 3600 * 24 * 1000);
                return (startDate + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > ((startDate - 1) + that.maxDayCount * 3600 * 24 * 1000);
              }
            }
          } else {
            this.pickerOptions = {
              disabledDate(time) {
//              return time.getTime() < Date.now() || time.getTime() > (Date.now() + (that.startDateToEnd) * 3600 * 24 * 1000);
                return time.getTime() < Date.now() || time.getTime() > (that.startDateRange - 1);
              }
            }
          }

          for (var i = 0; i < this.pagedata.page.length; i++) {
            for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
              if (this.pagedata.page[i].types[j].pageType == 6) {//雇员信息
                this.insureApplicant = this.pagedata.page[i].types[j].items;// 雇员信息items数组
              }
            }
          }

          for (var i = 0; i < this.insureApplicant.length; i++) {
            if (this.insureApplicant[i].itemCode == 8) {// itemCode==8:表示与投保人关系
              this.benrenShow.push(this.insureApplicant[i]);// 存的是 与投保人关系8 这一项
            }
            if (this.insureApplicant[i].itemCode != 5 && this.insureApplicant[i].itemCode != 2) {
              this.duoyuShow.push(this.insureApplicant[i]);// 存的是排除了 与投保人关系8 、 出生日期5 、 性别2 之后的雇员信息数组
            }
          }

          if (this.pagedata.isCustom) {
            this.shouyiren = true;
          } else {
            this.shouyiren = false;
          }
        } else {
          // 请求接口获取数据
          this.$http.post('/prdmc/prdmcShop/insureData', {// 调获取参保项接口
            itemId: this.isactive,// 方案明细id
            orgCode: this.orgCode// 机构编码
          }).then(res => {
            this.res = res
            this.globalFlag = false;

            this.takesEffect = res.data.data.takesEffect;// 保单是否立即生效 0是1否
            this.citySelectOptions = cityData.content
            this.insuranceIntervalType = res.data.data.insuranceIntervalType;// 保险间隔类型  0固定区间1间隔区间
            this.maxDayCount = res.data.data.maxDayCount;// 保险间隔类型为1间隔区间时，最大保险期间天数
            this.minDayCount = res.data.data.minDayCount;// 保险间隔类型为1间隔区间时，最小保险期间天数
            this.pagedata = res.data.data; //需要展示的数据
            this.prdCode = res.data.data.prdCode;// 产品编码
            this.prdName = res.data.data.prdName; //产品名称
            this.paramsTopayid = res.data.data.itemId;// 方案明细id
            this.pagelength = this.pagedata.page.length; //计算的页数
            this.pagecenters = res.data.data.insurances; //协议内容，条款集合数组
            this.dayCount = res.data.data.dayCount;// 保险期间天数
            this.giveInsurance = res.data.data.giveInsurance;// 是否为赠险 0是 1否
            this.rangeDay = res.data.data.rangeDay // 起保日期可选范围
            this.maxGroupNum = res.data.data.maxGroupNum// maxGroupNum:被保人最大人数
            this.minGroupNum = res.data.data.minGroupNum// minGroupNum:被保人最小人数
            this.isSharedPremium = res.data.data.isSharedPremium//是否共享保额保费 0共享 1不共享
            if (this.isSharedPremium == null || this.isSharedPremium == '') {
              this.isSharedPremium = 0
            }

            //设置页面标题
            Jquery(document).find('title').text(this.prdName);

            // 判断是否展示手机号验证信息弹出框
            this.showShoujihaoOrNot()

            //判断产品是否下架
            if (res.data.data.productEndDateStr != '' && res.data.data.productEndDateStr != null) {
              //此种写法兼容各浏览器new Date() invalid date问题
              var productEndDate = new Date(res.data.data.productEndDateStr.replace(new RegExp(/-/gm), "/"));
              if (productEndDate.getTime() < new Date().getTime()) {//若产品下架日期小于当前时间,则提示下架
                this.$message.error('该产品已下架！')
              }
            }

            var defDate = new Date();
            this.startDefaultValue = defDate.Format('yyyy-MM-dd');
            defDate.setDate(defDate.getDate() + 1) //下一天开始
//            this.dataValue = defDate.Format('yyyy-MM-dd');

            //判断后台是否返回起保日期:若返回则以此为准,若不返回则默认为当前日期的下一天
            if (res.data.data.productStartDateStr != '' && res.data.data.productStartDateStr != null) {//返回起保日期
              this.productStartDate = res.data.data.productStartDateStr;
              var proStartDate = new Date(this.productStartDate);
              if (proStartDate.getTime() < new Date().getTime()) {//若起保日期小于当前日期,则取当前日期的下一天
                this.dataValue = defDate.Format('yyyy-MM-dd');
              } else {//否则取起保日期
                this.dataValue = proStartDate.Format('yyyy-MM-dd');
              }
            } else {
              this.dataValue = defDate.Format('yyyy-MM-dd');
            }

            //起保日期+起保日期生效延迟天数
            if (res.data.data.startEffDelayDays != '' && res.data.data.startEffDelayDays != null) {
              var delayDays = res.data.data.startEffDelayDays * 3600 * 24 * 1000;
              var timeStamp = new Date(this.dataValue).getTime() + delayDays;
              this.dataValue = formatDateTime(timeStamp);//加上生效延迟天数的时间戳再转日期
            }
            console.log(new Date(this.dataValue), 'ee');

            //起保日期可选范围（天）
//            console.log(formatDateTime(new Date(this.dataValue).getTime()),'8小时');
            var dataValue = new Date(this.dataValue).getTime() - 3600 * 8 * 1000;//起保日期减去8小时
//            console.log(formatDateTime(dataValue),'无8小时');
            if (this.rangeDay == null || this.rangeDay == '') {
              this.rangeDay = 90;
            }
            this.startDateRange = dataValue + (this.rangeDay * 3600 * 24 * 1000);
//            console.log(new Date(this.startDateRange));

            if (this.insuranceIntervalType == 0) {//固定区间：例1年
              var start_date = new Date(this.dataValue);
              var end_date = new Date(this.dataValue);
              end_date.setDate(start_date.getDate() + this.dayCount - 1)
              end_date = end_date.Format("yyyy-MM-dd");
              this.endDate = end_date

              //增加起保日期可后台配置功能,起保日期、结束日期范围需随之而变
              var startDate = start_date.getTime() - 3600 * 8 * 1000;//减去8小时

              this.pickerOptions = {
                disabledDate(time) {
//                  return time.getTime() <= Date.now() || time.getTime() > (Date.now() + (that.startDateToEnd) * 3600 * 24 * 1000);
//                  return time.getTime() <= Date.now() || time.getTime() > that.startDateRange;
                  return time.getTime() < startDate || time.getTime() > (that.startDateRange - 1);
                }
              }

            } else if (this.insuranceIntervalType == 1) {//间隔区间：例1天-5天
              //重置结束日期
              var start_date = new Date(this.dataValue);
              var end_date = new Date(this.dataValue);
              end_date.setDate(start_date.getDate() + this.minDayCount - 1);
              end_date = end_date.Format("yyyy-MM-dd");
              this.endDate = end_date;

              // var that = this;
              //增加起保日期可后台配置功能,起保日期、结束日期范围需随之而变
              var startDate = start_date.getTime() - 3600 * 8 * 1000;//减去8小时

              this.pickerOptions = {
                disabledDate(time) {
//                  return time.getTime() < Date.now() || time.getTime() > (Date.now() + (that.startDateToEnd) * 3600 * 24 * 1000);
//                  return time.getTime() < Date.now() || time.getTime() > that.startDateRange;
                  return time.getTime() < startDate || time.getTime() > (that.startDateRange - 1);
                }
              }

              this.endPickerOptions = {
                disabledDate(time) {
                  // return  Date.now() > time.getTime() > (Date.now() + that.maxDayCount*3600*24*1000);
//                  return (Date.now() + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > (Date.now() + (that.maxDayCount - 1) * 3600 * 24 * 1000);
//                  return (Date.now() + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > (Date.now() + that.maxDayCount * 3600 * 24 * 1000);
                  return (startDate + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > ((startDate - 1) + that.maxDayCount * 3600 * 24 * 1000);
                }
              }
            } else {
              this.pickerOptions = {
                disabledDate(time) {
//                  return time.getTime() < Date.now() || time.getTime() > (Date.now() + (that.startDateToEnd) * 3600 * 24 * 1000);
                  return time.getTime() < Date.now() || time.getTime() > (that.startDateRange - 1);
                }
              }
            }

            // 循环select默认下标值
            for (var i = 0; i < this.pagedata.page.length; i++) {
              for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
                var z = this.pagedata.page[i].types[j];
                var newItemsArr = [];
                for (var k = 0; k < z.items.length; k++) {
                  if (z.items[k].options != null) {// 给options不为空的item增加一个userName属性
                    z.items[k].userName = z.items[k].options[0].id;
                  }
                }
              }
            }


            for (var i = 0; i < this.pagedata.page.length; i++) {
              for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
                if (this.pagedata.page[i].types[j].pageType == 6) {//雇员信息
                  this.insureApplicant = this.pagedata.page[i].types[j].items;// 雇员信息items数组
                }
              }
            }

            for (var i = 0; i < this.insureApplicant.length; i++) {
              if (this.insureApplicant[i].itemCode == 8) {// itemCode==8:表示与投保人关系
                this.benrenShow.push(this.insureApplicant[i]);// 存的是 与投保人关系8 这一项
              }
              if (this.insureApplicant[i].itemCode != 5 && this.insureApplicant[i].itemCode != 2) {
                this.duoyuShow.push(this.insureApplicant[i]);// 存的是排除了 与投保人关系8 、 出生日期5 、 性别2 之后的雇员信息数组
              }
            }

            if (this.pagedata.isCustom) {// isCustom:是否自定义受益人，true是，false否
              this.shouyiren = true;
            } else {
              this.shouyiren = false;
            }
            this.gangaoShow = this.filterItems(['5', '2']);//过滤出生日期和性别 gangaoShow存储出生日期和性别
          })
        }

      },
      filterItems(array) {
        var filterArr = [];
        for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
            var z = this.pagedata.page[i].types[j];
            var newItemsArr = [];
            for (var k = 0; k < z.items.length; k++) {
              //过滤出生日期和性别选项
              if (array.indexOf(z.items[k].itemCode) != -1) {
                filterArr.push(z.items[k]);
              } else {
                newItemsArr.push(z.items[k]);
              }
            }
            this.pagedata.page[i].types[j].items = newItemsArr;
          }
        }
        //上面filterArr数组去重
        var obj = {};
        var resultArr = [];
        for (var i = 0; i < filterArr.length; i++) {
          if (!obj[filterArr[i].itemCode]) {
            resultArr.push(filterArr[i]);
            obj[filterArr[i].itemCode] = true;
          }
        }
        return resultArr;
      },
      chenge() {
        this.checkedFlag = !this.checkedFlag;
      },
      openAlertBox(item) {
        this.insurance = item
        this.showAlertBox = true
      },
      closeAlertBox() {
        this.showAlertBox = false
        this.insurance = {}
      },
      openTiaokuanAlertBox(item) {
        this.insurance = item
        this.showTiaokuanAlertBox = true
      },
      closeTiaokuanAlertBox() {
        this.showTiaokuanAlertBox = false
        this.insurance = {}
      },
      changeStartTime() {
        if (this.dataValue == '' || this.dataValue == null) {
          return;
        }
        var that = this;
        if (this.insuranceIntervalType == 0) {
          var start_date = new Date(this.dataValue);
          var end_date = new Date(this.dataValue);
          end_date.setDate(start_date.getDate() + this.dayCount - 1)
          end_date = end_date.Format("yyyy-MM-dd");
          this.endDate = end_date
        } else if (this.insuranceIntervalType == 1) {
          var start_date = new Date(this.dataValue);
          var end_date = new Date(this.dataValue);
          end_date.setDate(start_date.getDate() + this.minDayCount - 1);
          this.endDate = end_date.Format("yyyy-MM-dd");//结束日期跟随开始日期变化

          this.pickerOptions = {
            disabledDate(time) {
              return time.getTime() < Date.now() || time.getTime() > that.startDateRange;
            }
          }
          var start_date = new Date(this.dataValue);
          console.log(start_date);
          this.endPickerOptions = {
            disabledDate(time) {
              return (start_date.getTime() + (that.minDayCount - 2) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > (start_date.getTime() + (that.maxDayCount - 1) * 3600 * 24 * 1000);
            }
          }
        } else {
          this.pickerOptions = {
            disabledDate(time) {
              return time.getTime() < Date.now() || time.getTime() > that.startDateRange;
            }
          }
        }
      },
      changeDataInfo(items, itemCode, userName) {
        items.forEach(item => {
          if (itemCode == '4') {
            if (item.itemCode == '3' && item.userName == '1') { //如果是身份证的话更新价格
              var Card = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
              if (!Card.test(userName)) {
                return;
              }
              console.log(this);
              var age = GetAge(userName, this.dataValue, item.userName);
              var day = GetDay(userName, this.dataValue, item.userName);
              console.log(age, 'age');
              console.log(day, 'day');

              this.typeData.forEach(prdItem => {
                if (prdItem.name == '年龄') {
                  prdItem.entries.forEach(entryItem => {
                    var ageArr = entryItem.value.replace(/岁/g, "").split('-')
                    if (age >= ageArr[0] && age <= ageArr[1]) {
                      entryItem.isDefault = true
                      prdItem.selectValue = entryItem.id
                    } else {
                      entryItem.isDefault = false
                    }
                  })
                }
              })
            } else {//若非身份证,则不计算,根据出生日期计算
              return;
            }
          }
          if (itemCode == '5') {
            if (item.itemCode == '3' && item.userName != '1') { //非身份证
              var age = GetAge(userName, this.dataValue, item.userName);
              var day = GetDay(userName, this.dataValue, item.userName);
              console.log(age, 'age');
              console.log(day, 'day');
            } else {
              return;
            }
          }

          if (this.entries && this.entries.length > 0) {
            var isContentAge = false;
            for (var i = 0; i < this.entries.length; i++) {
              var entry = this.entries[i]
              if (isContent(entry.value, age, day)) {
                isContentAge = true;
                var l = getAgeIndex(this.upParams);
                this.upParams.calcIds[l] = entry.id;
                this.$http.post("/prdmc/prdmcShop/productCalc", {
                  styleId: this.upParams.styleId,
                  calcIds: this.upParams.calcIds
                }).then(res => {
                  if (res.data.code == '200') {
                    this.prdmcShop.price = res.data.data.price
                    this.isactive = res.data.data.prdItemId
                    this.btnlist.forEach(btnItem => {
                      if (btnItem.styleId == this.styleId) {
                        btnItem.prdItemId = res.data.data.prdItemId
                        this.prdmcShop.prdItemId = res.data.data.prdItemId
                      }
                    })
                  } else {
                    this.$message.error('获取最新保费失败，请稍候重试！')
                  }
                });
                break;
              }
            }
            if (!isContentAge) { // 不在投保区间内
              this.$message.error('年龄不在投保区间内!');
              return;
            }
          }

        });
      },
      bBRChnageInfo(items, itemCode, userName) {
        console.log('-------被保人信息----iteme----->' + JSON.stringify(items));
        items.forEach(item => { //遍历
          if (itemCode == '4') {// 证件类型
            if (item.itemCode == '3' && item.userName == '1') {//校验身份证类型 的证件编号
              if (!this.checkIdCard(userName)) {
                return;
              }
              console.log(userName + '---' + item.userName);
              var age = GetAge(userName, this.dataValue, item.userName);
              var day = GetDay(userName, this.dataValue, item.userName);
              console.log(age, 'age');
              console.log(day, 'day');

              this.typeData.forEach(prdItem => {
                if (prdItem.name == '年龄') {
                  prdItem.entries.forEach(entryItem => {
                    var ageArr = entryItem.value.replace(/岁/g, "").split('-')
                    if (age >= ageArr[0] && age <= ageArr[1]) {
                      entryItem.isDefault = true
                      prdItem.selectValue = entryItem.id
                    } else {
                      entryItem.isDefault = false
                    }
                  })
                }
              })
            } else {
              return;
            }
          }
          if (itemCode == '5') {// 出生日期
            if (item.itemCode == '3' && item.userName != '1') {
              console.log(userName + '---' + item.userName);
              var age = GetAge(userName, this.dataValue, item.userName);
              var day = GetDay(userName, this.dataValue, item.userName);

              console.log(age, 'age');
              console.log(day, 'day');
            } else {
              return;
            }
          }

          if (this.entries && this.entries.length > 0) {
            var isContentAge = false;
            for (var i = 0; i < this.entries.length; i++) {
              var entry = this.entries[i]
              if (isContent(entry.value, age, day)) {//true
                isContentAge = true;
                var l = getAgeIndex(this.upParams);
                this.upParams.calcIds[l] = entry.id;
                this.$http.post("/prdmc/prdmcShop/productCalc", {
                  styleId: this.upParams.styleId,
                  calcIds: this.upParams.calcIds
                }).then(res => {
                  if (res.data.code == '200') {
                    this.prdmcShop.price = res.data.data.price
                    this.isactive = res.data.data.prdItemId
                    this.btnlist.forEach(btnItem => {
                      if (btnItem.styleId == this.styleId) {
                        btnItem.prdItemId = res.data.data.prdItemId
                        this.prdmcShop.prdItemId = res.data.data.prdItemId
                      }
                    })
                  } else if (res.data.code == -1) {
                    this.$message.error('获取最新保费失败，请稍候重试！')
                  }
                });
                break;
              }
            }
            if (!isContentAge) {
              this.$message.error('年龄不在投保区间内!');
              return;
            }
          }
        })
      },
      // 总体校验
      handleCommonCheck(item, pageType, index) {
        if (pageType == 4) {// 企业信息
          if (item.itemCode == 50) {// 企业名称
            if (!item.userName) {
              this.$message.error('请输入' + item.itemName);
              return
            } else {
              if (!this.checkName(item.userName)) {
                this.$message.error("请输入正确的姓名");
                return
              }
            }
          } else if (item.itemCode == 51) {// 企业所在地
            if(!checkMsgNull(item.userNameFirst) || !checkMsgNull(item.userNameSecond)) {
              this.$message.error('请输入' + item.itemName);
              return
            }
          } else if (item.itemCode == 53) {// 企业证件编号
            if (!item.userName) {
              this.$message.error('请输入' + item.itemName);
              return
            } else {
              if (this.checkChinese(item.userName)) {
                this.$message.error('企业编号不能输入汉字');
                return
              }
            }
          }
        } else if (pageType == 5) {// 企业联系人
          if (item.itemCode == 1) {// 姓名
            if (!item.userName) {
              this.$message.error('请输入' + item.itemName);
              return
            } else {
              if (!this.checkName(item.userName)) {
                this.$message.error("请输入正确的姓名");
                return
              }
            }
          } else if (item.itemCode == 6) {// 联系电话
            if (!item.userName) {
              this.$message.error('请输入' + item.itemName);
              return
            } else {
              if (!this.checkMobilePhone(item.userName)) {
                this.$message.error("请输入正确的手机号")
                return
              }
            }
          } else if (item.itemCode == 7) {// 邮箱
            if (!item.userName) {
              this.$message.error('请输入' + item.itemName);
              return
            } else {
              if (!this.checkEmail(item.userName)) {
                this.$message.error("请输入正确的邮箱")
                return
              }
            }
          }
        } else if (pageType == 6) {// 雇员信息
          if (item.itemCode == 1) {// 姓名
            if (!item.userName) {
              this.$message.error('请输入' + item.itemName);
              return
            } else {
              if (!this.checkName(item.userName)) {
                this.$message.error("请输入正确的姓名");
                return
              }
            }
          } else if (item.itemCode == 4) {// 证件号码
            if (!item.userName) {
              this.$message.error('请输入' + item.itemName);
              return
            } else {
              if (this.cardValue == 1) {// 如果证件类型是身份证
                if (!this.checkIdCard(item.userName)) {
                  this.$message.error("请输入正确的身份证号")
                  return
                }
              }
            }
          }
        }

      },
      // numChange(item, type, index, event) {
      numChange(item, pageType, index, event) {
        this.cardValue = event.target.value;//证件类型值
        if (pageType == 6) {// 雇员信息
          if (item.itemCode == '3') {//证件类型
            if (item.userName == '1') {//身份证
              this.userList.forEach((list, n) => {//团险
                if (n == index) {
                  list.otherOptionitems = list.recordOpitonitems;
                }
              })
            } else {//非身份证
              // 选择非身份证时，显示出生日期和性别
              this.userList.forEach((list, n) => {
                if (n == index) {
                  if (indexOfArr(list.otherOptionitems, 'itemCode', '5') === false && indexOfArr(list.otherOptionitems, 'itemCode', '2') === false) {
                    list.otherOptionitems = list.otherOptionitems.concat(this.gangaoShow);
                  }
                }
              })
            }
          }
        }
      },
      cancelBeibaoren(index) {
        if (!this.modifyOrAdd) {// 添加
          if (this.userList.length > 0) {
            this.userList.splice(index, 1)
          }
        }else {// 修改
          this.userList[index] = this.currentUser
          this.getInsureds()
          this.currentUser = {}
        }
        this.showBeibaoren = false
      },
      getInsureds() { // 被保人超过10个人之后，获取被保人信息数组
        this.insureds = []
        if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {
          for (var i = 0; i < this.userList.length; i++) {
            var obj = {
              insuredItems: []
            }
            var user = this.userList[i];
            var item = {
              code: user.itemCode,
              value: user.userName
            }
            obj.insuredItems.push(item)
            for (var j = 0; j < user.otherOptionitems.length; j++) {
              var optionItem = user.otherOptionitems[j]
              //处理出生日期
              if (optionItem.itemCode == '5') {
                obj.insuredItems.push({
                  code: optionItem.itemCode,
                  value: optionItem['userName' + i]
                })
              } else {
                obj.insuredItems.push({
                  code: optionItem.itemCode,
                  value: optionItem.userName
                })
              }
            }
            this.insureds.push(obj)
          }
          console.log(JSON.stringify(this.insureds))
        }
      },
      confirmBeibaoren(i) {
        // 校验信息
        var userC = this.userList[i];
        if (this.userList[i].userName != 1) {// 与投保人关系不是本人
          if (this.userList[i].otherOptionitems.length > 0) {
            for (var j = 0; j < this.userList[i].otherOptionitems.length; j++) {
              var item = this.userList[i].otherOptionitems[j]
              if (item.itemCode == 1) {// 姓名
                if (!checkMsgNull(item.userName)) {
                  this.$message.error("请输入姓名")
                  return;
                } else {
                  if (!this.checkName(item.userName)) {
                    this.$message.error("请输入正确的姓名")
                    return;
                  }
                }
              } else if (item.itemCode == 4) {// 证件编号
                if (!item.userName) {
                  this.$message.error('请输入' + item.itemName);
                  return
                } else {
                  if (this.userList[i].otherOptionitems[j - 1].userName == '1') {// 如果证件类型是身份证
                    if (!this.checkIdCard(item.userName)) {
                      this.$message.error("请输入正确的身份证号")
                      return
                    }
                  } else {
                    if (this.checkChinese(item.userName)) {
                      this.$message.error("证件编号不能输入汉字")
                      return
                    }
                  }
                }
              }if (item.itemCode == 5) {// 出生日期
                if (!checkMsgNull(item['userName' + i])) {
                  this.$message.error("请输入出生日期")
                  return;
                }
              }
            }
          }
        }
        this.showBeibaoren = false
        this.getInsureds()
      },
      addBeibaorenInfo() {
        if (this.userList.length <= this.maxGroupNum) {
          this.addActionIsur()
          this.beibaorenIndex = this.userList.length - 1
          this.showBeibaoren = true
          this.modifyOrAdd = false
        }else {
          this.showBeibaoren = false
          this.$message.error('添加已到上限！')
        }
      },
      modifyBeibaorenInfo(index) {
        console.log(index)
        console.log(this.userList.length)
        this.beibaorenIndex = index
        this.modifyOrAdd = true
        this.showBeibaoren = true
        this.currentUser = JSON.parse(JSON.stringify(this.userList[index]))
      },
      // 添加被保人
      addActionIsur() {
        var count = this.userList.length;
        if (count > this.maxGroupNum - 1) {
          this.$message.error('被保人名额已满')
          return;
        }
        //是否共享保费:0共享 1不共享
        if (this.isSharedPremium == 1) {
          this.insurednmb = Number(count + 1);
        }
        var listShow = JSON.parse(JSON.stringify(this.userList));
        var user = this.insureApplicant[0];
        var otherOptions = []
        var peopleItemState = {}
        var otherOptionitems = []; //如果不是本人，来放其他的选项。。。。
        //控制与投保人关系下拉框中默认选项
        peopleItemState.userName = this.insureApplicant[0].userName;
        // var index = count >= user.options.length ? (user.options.length - 1) : count;
        // peopleItemState.userName = user.options.length > 1 ? user.options[index].id : '1';//默认与投保人关系为本人
        for (var j = 0; j < this.insureApplicant.length; j++) {
          var appInfo = this.insureApplicant[j];
          var optionsItems = {}
          if (appInfo.itemCode != 8 && appInfo.itemCode != 5 && appInfo.itemCode != 2) {
            otherOptionitems.push({
              itemName : appInfo.itemName,
              itemCode : appInfo.itemCode,
              isHasOption : appInfo.isHasOption,
              options : appInfo.options,
              userName : appInfo.userName,
            })
          }
        }
        peopleItemState.options = user.options;
        peopleItemState.isHasOption = user.isHasOption;
        peopleItemState.itemName = user.itemName;
        peopleItemState.itemCode = user.itemCode;
        peopleItemState.otherOptionitems = otherOptionitems;
        peopleItemState.recordOpitonitems = otherOptionitems;
        listShow.push(peopleItemState);
        this.userList = listShow;
      },
      deleteBeibaorenInfo(index) {
        if (this.userList.length > 0) {
          this.deleteActionIsur(index)
          this.insureds.splice(index, 1)
        }
      },
      // 删除被保人
      deleteActionIsur(index) {
        this.userList.splice(index, 1)
        //是否共享保费
        if (this.isSharedPremium == 1) {
          this.insurednmb = this.userList.length;
        }
      },
      // 选择与投保人关系时所调方法（团险）
      selectOption2(id, index) {
        console.log(id);
        console.log(index);
        if (id == "1") {// 如果选择的是本人
          if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {
            this.userList.otherOptionitems = []
          }
        } else {
          if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {
            this.userList[index].otherOptionitems = this.userList[index].recordOpitonitems
          }
        }
        console.log('userlist====' + JSON.stringify(this.userList));
      },
      // 用户选择方案时所调方法
      // 参数1：prdSpecificationCalcs 参数2：prdItemId, 参数3：styleId,i 参数4：price
      handletype(value, prdItemId, styleId, price) {
        this.isactive = prdItemId;// 更新当前方案默认明细id
        this.prdmcShop.prdItemId = prdItemId
        this.typeData = value;// 更新当前方案明细数组
        this.styleId = styleId;// 更新当前方案id
        this.calcIds = [];
        this.calcIdKeys = [];
        this.typeData.forEach(z => {
          if (z.name == '年龄') {
            this.entries = z.entries
          }
          z.entries.forEach(i => {
            if (i.isDefault) {
              this.calcIds.push(i.id);
              this.calcIdKeys.push(z.name);
            }
          })
        });
        this.upParams = {
          styleId: this.styleId,
          calcIds: this.calcIds,
          calcIdKeys: this.calcIdKeys
        }
        //请求后台,实时获取价格
        this.$http.post("/prdmc/prdmcShop/productCalc", {// 产品报价测算接口
          styleId: this.styleId,
          calcIds: this.calcIds
        }).then(res => {
          if (res.data.code == 200) {
            this.prdmcShop.price = res.data.data.price;// 返回产品报价测算接口中返回的最新的价格
            this.isactive = res.data.data.prdItemId
            this.btnlist.forEach(btnItem => {
              if (btnItem.styleId == styleId) {
                btnItem.prdItemId = res.data.data.prdItemId
                this.prdmcShop.prdItemId = res.data.data.prdItemId
              }
            })

            this.$http.post('/prdmc/prdmcShop/insureData', {
              itemId: this.isactive,// 根据最新用户选择的方案明细id，调 获取参保项接口
              orgCode: this.orgCode
            }).then(res => {
              if (res.data.code == '200') {
                this.maxDayCount = res.data.data.maxDayCount;
                this.minDayCount = res.data.data.minDayCount;
                this.dayCount = res.data.data.dayCount;
                this.changeStartTime()
              } else {
                this.$message.error('获取最新保费信息失败，请稍候重试！')
              }
            })
          } else {
            this.$message.error('获取最新报价信息失败，请稍候重试！')
          }
        });
      },
      // 参数1：用户选择的entries，参数2：用户具体选择的entries数组中某一项的id，参数3：当前所选方案的id
      handleClick(items, id, styleId) {
        if (items.length > 0) {
          for (let k = 0; k < items.length; k++) {
            if (items[k].id == id) {
              items[k].isDefault = true;// 将用户选择的某一项的状态改成默认选中状态，其他项的状态改成false
            } else {
              items[k].isDefault = false;
            }
          }
        }
        this.calcIds = [];
        this.calcIdKeys = [];
        this.typeData.forEach(z => {
          z.entries.forEach(i => {
            if (i.isDefault) {
              this.calcIds.push(i.id);// 将用户选择的最新项目的id，更新到id数组中，
              this.calcIdKeys.push(z.name);
            }
          });
        });
        this.upParams = {
          styleId: styleId,
          calcIds: this.calcIds,
          calcIdKeys: this.calcIdKeys
        }
        // 请求最新的产品报价测算价格
        this.$http.post("/prdmc/prdmcShop/productCalc", {
          styleId: this.styleId,
          calcIds: this.calcIds
        }).then(res => {
          if (res.data.code == 200) {
            this.prdmcShop.price = res.data.data.price;
            this.isactive = res.data.data.prdItemId
            this.btnlist.forEach(btnItem => {
              if (btnItem.styleId == styleId) {
                btnItem.prdItemId = res.data.data.prdItemId
                this.prdmcShop.prdItemId = res.data.data.prdItemId
              }
            })

            this.$http.post('/prdmc/prdmcShop/insureData', {
              itemId: this.isactive,// 根据最新用户选择的方案明细id，调 获取参保项接口
              orgCode: this.orgCode
            }).then(res => {
              if (res.data.code == '200') {
                this.maxDayCount = res.data.data.maxDayCount;
                this.minDayCount = res.data.data.minDayCount;
                this.dayCount = res.data.data.dayCount;
                this.changeStartTime()
              } else {
                this.$message.error('获取最新保费信息失败，请稍候重试！')
              }
            })
          } else {
            this.$message.error('获取最新报价失败，请稍候重试！')
          }
        });
      },
      // 展示确认投保信息页面内容
      showConfirm() {
        this.showToubaoxinxi = false
      },
      // 隐藏确认投保信息页面内容
      closeConfirm() {
        this.showToubaoxinxi = true
      },
      gotoConfirm() {
        // 校验信息 开始
        for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
            var pageType = this.pagedata.page[i].types[j].pageType
            if (pageType == 4) {// 企业信息
              for (var k=0;k<this.pagedata.page[i].types[j].items.length;k++) {
                var item = this.pagedata.page[i].types[j].items[k]
                if (item.itemCode == 50) {// 企业名称
                  if (!item.userName) {
                    this.$message.error('请输入' + item.itemName);
                    return
                  } else {
                    if (!this.checkName(item.userName)) {
                      this.$message.error("请输入正确的姓名");
                      return
                    }
                  }
                } else if (item.itemCode == 51) {// 企业所在地
                  if(!checkMsgNull(item.userNameFirst) || !checkMsgNull(item.userNameSecond)) {
                    this.$message.error('请输入' + item.itemName);
                    return
                  }
                } else if (item.itemCode == 53) {// 企业证件编号
                  if (!item.userName) {
                    this.$message.error('请输入' + item.itemName);
                    return
                  } else {
                    if (this.checkChinese(item.userName)) {
                      this.$message.error('企业编号不能输入汉字');
                      return
                    }
                  }
                }
              }
            } else if (pageType == 5) {// 企业联系人
              for (var k=0;k<this.pagedata.page[i].types[j].items.length;k++) {
                var item = this.pagedata.page[i].types[j].items[k]
                if (item.itemCode == 1) {// 姓名
                  if (!item.userName) {
                    this.$message.error('请输入' + item.itemName);
                    return
                  } else {
                    if (!this.checkName(item.userName)) {
                      this.$message.error("请输入正确的姓名");
                      return
                    }
                  }
                } else if (item.itemCode == 6) {// 联系电话
                  if (!item.userName) {
                    this.$message.error('请输入' + item.itemName);
                    return
                  } else {
                    if (!this.checkMobilePhone(item.userName)) {
                      this.$message.error("请输入正确的手机号")
                      return
                    }
                  }
                } else if (item.itemCode == 7) {// 邮箱
                  if (!item.userName) {
                    this.$message.error('请输入' + item.itemName);
                    return
                  } else {
                    if (!this.checkEmail(item.userName)) {
                      this.$message.error("请输入正确的邮箱")
                      return
                    }
                  }
                }
              }
            }
          }
        }

        if (!this.uploadBusinessLicenseFlag) {
          this.$message.error("请上传营业执照")
          return
        }

        if (this.userList.length <= 0) {
          this.$message.error("请填写雇员信息")
          return
        }

        // 校验时间
        this.startData2 = this.dataValue;
        if (!this.startData2) {
          this.$message.error("请选择起保日期")
          return false
        } else if (!this.endDate) {
          this.$message.error("请选择结束日期")
          return false
        }
        if (this.insuranceIntervalType == 1) { // 判断时间
          var start_date = new Date(this.startData2);
          var days = dateMinus(start_date, this.endDate);

          if (days < this.minDayCount || days > this.maxDayCount) {
            this.$message.error("错误的保险区间，请重新选择")
            return
          }
        }
        if (!this.checkedFlag) {
          this.$message.error("请同意相关协议")
          return;
        }
        // 校验信息 结束

        this.paramsTopay = {};// 立即支付的参数
        this.businessInfo = []// 企业信息
        this.businessLinkerInfo = []// 企业联系人信息
        this.insuredsInfo = [];// 雇员信息
        this.beneficiary = [];// 受益人信息

        for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
            var pageType = this.pagedata.page[i].types[j].pageType
            if (pageType == 4) {// 企业信息
              for (var k=0;k<this.pagedata.page[i].types[j].items.length;k++) {
                var item = this.pagedata.page[i].types[j].items[k]
                if (item.itemCode == 50) {// 企业名称
                  this.businessInfo.push({
                    code:item.itemCode,
                    value:item.userName,
                  })
                } else if (item.itemCode == 51) {// 企业所在地
                  this.businessInfo.push({
                    code:item.itemCode,
                    value:item.userNameFirst + ' ' + item.userNameSecond
                  })
                }else if (item.itemCode == 52) {// 企业证件类型
                  this.businessInfo.push({
                    code:item.itemCode,
                    value:item.userName,
                  })
                } else if (item.itemCode == 53) {// 企业证件编号
                  this.businessInfo.push({
                    code:item.itemCode,
                    value:item.userName,
                  })
                }
              }
            } else if (pageType == 5) {// 企业联系人
              for (var k=0;k<this.pagedata.page[i].types[j].items.length;k++) {
                var item = this.pagedata.page[i].types[j].items[k]
                if (item.itemCode == 1) {// 姓名
                  this.businessLinkerInfo.push({
                    code:item.itemCode,
                    value:item.userName,
                  })
                } else if (item.itemCode == 6) {// 联系电话
                  this.businessLinkerInfo.push({
                    code:item.itemCode,
                    value:item.userName,
                  })
                } else if (item.itemCode == 7) {// 邮箱
                  this.businessLinkerInfo.push({
                    code:item.itemCode,
                    value:item.userName,
                  })
                }
              }
            } else if (pageType == 3) {//受益人
              let obj = {
                alignment: 1,
                beneficiaryItems: []
              };
              for (var k=0;k<this.pagedata.page[i].types[j].items.length;k++) {
                var item = this.pagedata.page[i].types[j].items[k]
                obj.beneficiaryItems.push({
                  code:item.itemCode,
                  value:item.options[0].id,
                })
                this.beneficiary.push(obj);
              }
            }
          }
        }

        this.insuredsInfo = JSON.parse(JSON.stringify(this.insureds))
        console.log('addressName' + this.addressName);

        // 先清除缓存
        window.sessionStorage.removeItem('res');
        window.sessionStorage.removeItem('startDate');
        window.sessionStorage.removeItem('endDate');
        window.sessionStorage.removeItem('userList');
        window.sessionStorage.removeItem('insureds');
        window.sessionStorage.removeItem('itemId')
        window.sessionStorage.removeItem('gangaoShow')
        window.sessionStorage.removeItem('insurednmb')
        window.sessionStorage.removeItem('toubaoNumber')
        window.sessionStorage.removeItem('channelName')
        window.sessionStorage.removeItem('productStartDate')
        window.sessionStorage.removeItem('uploadBusinessLicenseFlag')
        window.sessionStorage.removeItem('businessLicenseImgUrl')

        window.sessionStorage.removeItem('btnlist')
        window.sessionStorage.removeItem('prdmcShop')
        window.sessionStorage.removeItem('isactive')
        window.sessionStorage.removeItem('styleId')
        window.sessionStorage.removeItem('typeData')
        window.sessionStorage.removeItem('itemData')
        window.sessionStorage.removeItem('entries')
        window.sessionStorage.removeItem('upParams')
        window.sessionStorage.removeItem('enterpriseArea')

        window.sessionStorage.removeItem('modifyOrAdd')

        // 再存入数据
        window.sessionStorage.setItem('res', JSON.stringify(this.res));
        window.sessionStorage.setItem('startDate', this.startData2);
        window.sessionStorage.setItem('endDate', this.endDate);
        window.sessionStorage.setItem('insurednmb', JSON.stringify(this.insurednmb));
        window.sessionStorage.setItem('toubaoNumber', JSON.stringify(this.toubaoNumber));
        window.sessionStorage.setItem('itemId', this.itemId);
        window.sessionStorage.setItem('gangaoShow', JSON.stringify(this.gangaoShow));
        window.sessionStorage.setItem('channelName', this.channelName);
        window.sessionStorage.setItem('uploadBusinessLicenseFlag', this.uploadBusinessLicenseFlag);
        window.sessionStorage.setItem('businessLicenseImgUrl', this.businessLicenseImgUrl);
        window.sessionStorage.setItem('productStartDate', this.productStartDate);//后台配置的起保日期

        window.sessionStorage.setItem('btnlist', JSON.stringify(this.btnlist))
        window.sessionStorage.setItem('prdmcShop', JSON.stringify(this.prdmcShop))
        window.sessionStorage.setItem('isactive', JSON.stringify(this.isactive))
        window.sessionStorage.setItem('styleId', JSON.stringify(this.styleId))
        window.sessionStorage.setItem('typeData', JSON.stringify(this.typeData))
        window.sessionStorage.setItem('itemData', JSON.stringify(this.itemData))
        window.sessionStorage.setItem('entries', JSON.stringify(this.entries))
        window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams))
        window.sessionStorage.setItem('enterpriseArea', JSON.stringify(this.enterpriseArea))

        if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {//团险
          window.sessionStorage.setItem('userList', JSON.stringify(this.userList))
          window.sessionStorage.setItem('insureds', JSON.stringify(this.insureds))
          window.sessionStorage.setItem('modifyOrAdd', JSON.stringify(this.modifyOrAdd))
        }
        window.sessionStorage.setItem('addressCode', this.addressCode);

        this.paramsTopay = {
          channelCode: this.channelCode,
          orgCode: this.orgCode,
          itemId: this.isactive, //生成订单序号
          startDate: this.startData2 + " " + this.lastDateString,
          endDate: this.endDate + " " + this.endLastDateString,
          isCustom: true,
          policyHolders: this.policyHolders,
          insureds: this.insureds,
          beneficiary: this.beneficiary,
          addressCode: this.addressCode ? this.addressCode : '',
          urlParam: this.urlParam ? this.urlParam : ''
        }

        this.generateBaseInfo()
        this.showConfirm()

        // 核保
        /*this.$http.post("/sunmc/ordSun/underwritingPolicy", this.paramsTopay).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            if (res.data.data.status == 200) {
              this.generateBaseInfo()
              this.showConfirm()
            } else {
              this.$message.error(res.data.data.msg)
            }
          } else {
            this.$message.error(res.data.data.msg)
          }
        });*/
      },
// 将 P920091615004924408 改造成 T920091615004924408 ，然后跟轨迹id进行绑定
    behaviorObjSetOrderNo(orderNo) {
      let num = `T${orderNo.substring(1)}`
      window.sessionStorage.removeItem('tbdh')
      window.sessionStorage.setItem('tbdh', num)
      try {
        _behaviorObj.setorderNo(num, function(data) {})
      } catch (err) {
        console.log('可回溯报错：' + err)
      }
    },
      gotoPay() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.post("/sunmc/ordSun/createPolicy", this.paramsTopay).then(res => {
          if (res.data.code != 200) {
            loading.close();
            this.$message.error(res.data.msg)
            return;
          }
          this.behaviorObjSetOrderNo(res.data.data)
          if (this.giveInsurance == 0) {
            loading.close();
            this.$router.push({
              path: "/Product/Success",
              query: {}
            });
          } else {
            this.$http
              .post("/sunmc/ordSun/getPayPolicy", {
                orderSn: res.data.data, // 订单号
              })
              .then(res => {
                loading.close();
                if (res.data.code == 200) {
                  window.location.href = res.data.data.payUrls; //跳转到阳光保险界面
                } else {
                  this.$message.error(res.data.msg)
                }
              }, err => {
                loading.close();
                this.$message.error('获取支付链接失败！')
              });
          }
        }, err => {
          loading.close();
          this.$message.error('获取数据失败！')
        });
      },
      // 城市选择改变时，更新最新的城市名称和城市代码
      handleCityChange(i, myCityArr) {
        let fullName = ''
        let cityArr = this.citySelectOptions
        for (let j = 0; j < cityArr.length; j++) {
          if (myCityArr[0] == cityArr[j].value) {
            let firstName = cityArr[j].label
            let cityCArr = cityArr[j].children
            for (let k = 0; k < cityCArr.length; k++) {
              if (myCityArr[1] == cityCArr[k].value) {
                let secondName = cityCArr[k].label
                fullName = firstName + ' ' + secondName
              }
            }
          }
        }
        this.addressCode = myCityArr[1]
        i.userCode = myCityArr[1]
        i.userNameFirst = fullName
      },
    },
    filters: {
      //时间转换
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      },
      // 根据不同的item.code展示不同的类别名称
      handleSwitchItemName(itemCode) {
        var itemObj = {
          1: '姓名',
          2: '性别',
          3: '证件类型',
          4: '证件编号',
          5: '出生日期',
          6: '联系电话',
          7: '电子邮箱',
          8: '与投保人关系',
          9: '所属职业',
          10: '体重',
          11: '户口所在',
          12: '所在地区',
          13: '监护人姓名',
          14: '监护人手机号',
          15: '详细地址',
          16: '旅游目的地',
          17: '留学目的地',
          18: '有无社保',
          19: '证件有效期',
          20: '身高（cm）',
          21: '体重（kg）',
          22: '证件有效止期',
          23: '证件有效起期',
          24: '受益比例（%）',
          25: '财产所在地地址',
          26: '财产所在地房屋结构',
          27: '开户银行',
          28: '身故受益人',
          29: '受益人',
          30: '银行账号',
          31: '银行预留手机号',
          32: '年龄',
          33: '投保份数',
          34: '职业信息',
          35: '车架号',
          36: '车牌号',
          37: '手机IMEI码',
          38: '手机品牌',
          39: '手机型号',
          40: '房屋详细地址',
          41: '发票介质',
          42: '发票类型',
          43: '单位名称',
          44: '纳税人识别号',
          45: '开户银行地址',
          46: '发票抬头',
          47: '是否新车',
          50: '企业名称',
          51: '企业所在地',
          52: '企业证件类型',
          53: '企业证件编号',
          54: '营业执照',
        }
        return itemObj[itemCode]
      },
      // 根据不同的item.code和item.value展示不同的值
      handleSwitchItemValue(item) {
        var itemObj2 = {1: '男', 2: '女'}
        var itemObj3 = {1: '身份证', 2: '居民户口本',3:'居民护照', 48: '港澳通行证',99:'其他'}
        var itemObj8 = {
          1: '本人',
          2: '丈夫',
          3: '妻子',
          4: '父亲',
          5: '母亲',
          6: '儿子',
          7: '女儿',
          8: '其他关系',
          9: '配偶',
          10: '父母',
          11: '子女'
        }
        var itemObj41 = {2: '电子发票'}
        var itemObj42 = {1: '个人', 2: '企业'}
        var itemObj47 = {1: '是', 2: '否'}
        var itemObj52 = {8: '组织机构代码证', 99: '统一社会信用代码'}
        var itemCodeArr = ['35', '36', '27', '30', '31', '31', '45', '46']

        if (item.code == 3) {// 证件类型
          return itemObj3[item.value]
        } else if (item.code == 2) {// 性别
          return itemObj2[item.value]
        } else if (item.code == 8) {// 与被保人关系
          return itemObj8[item.value]
        } else if (item.code == 41) {// 发票介质
          if (!checkMsgNull(item.value)) {
            return '不开发票'
          } else {
            return itemObj41[item.value]
          }
        } else if (item.code == 42) {// 发票类型
          return itemObj42[item.value]
        } else if (item.code == 47) {// 是否新车
          return itemObj47[item.value]
        }  else if (item.code == 52) {// 企业证件类型
          return itemObj52[item.value]
        } else if (itemCodeArr.indexOf(item.code) > -1) {
          return checkMsgNull(item.value) ? item.value : '无'
        } else if (item.code == 9) {// 所属职业
          // 根据职业编号转换出职业名称
          var JobCode = item.value
          for (var i = 0; i < jobData.content.length; i++) {
            if (JobCode.substring(0, 2) == (jobData.content)[i].value) {
              for (var j = 0; j < (jobData.content)[i].children.length; j++) {
                if (JobCode.substring(0, 4) == ((jobData.content)[i].children)[j].value) {
                  for (var k = 0; k < ((jobData.content)[i].children)[j].children.length; k++) {
                    if (JobCode == (((jobData.content)[i].children)[j].children)[k].value) {
                      return (((jobData.content)[i].children)[j].children)[k].label
                    }
                  }
                }
              }
            }
          }
        } else {
          return item.value
        }
      },
      statusFilter(status) {
        const statusMap = {
          1: "投保人信息",
          2: "被保人信息",
          "3": "受益人信息",
          "4": "企业信息",
          "5": "企业联系人",
          "6": "被保人信息",
          "7": "标的信息",
        };
        return statusMap[status];
      },
    },
    created() {
      this.getSpecification()
    },
    mounted() {
    }
  }


  Date.prototype.Format = function (fmt) { //author: meizz 日期格式化
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

  // 去除首尾空格
  function nospace(str) {
    if (str != null && str != undefined) {
      return str.replace(/\s+/g, "");
    } else {
      return "";
    }
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

  // 判断字符串是否为空
  function checkMsgNull(msg) {
    if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
      return true;
    } else {
      return false;
    }
  }

  function dateMinus(sd, ed) {
    var edate = new Date(ed.replace(/-/g, "/"));//零点开始,例2018-12-28 00:00:00
    var days = edate.getTime() - (sd.getTime() - 8 * 3600 * 1000);//时区晚八小时,减去
    var day = parseInt((days / (1000 * 60 * 60 * 24)) + 1);//因为从零点开始,需要加上一天
    return day;
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

  Jquery(function () {
    Jquery(document).on("click", ".selected_div li", function () {
      Jquery(this)
        .parent('ul')
        .find("li")
        .removeClass("active");
      Jquery(this).addClass("active");
      return false;
    });
  });
</script>

<style scoped>
  .wrap {
    min-height: 1000px;
  }

  .container {
    width: 1160px;
    margin: 0 auto;
  }

  .tk_header {
    width: 100%;
    background-color: #F5F5F5;
    height: 36px;
  }

  .tk_header_con {
    width: 1160px;
    height: 36px;
    margin: 0 auto;
  }

  .tk_header_con span {
    float: left;
    font-size: 12px;
    color: #999999;
    line-height: 36px;
  }

  .tk_header_con a {
    font-size: 12px;
    line-height: 36px;
    color: #ffa60c;
    float: right;
  }

  .logo {
    width: 100%;
    height: 90px;
    background-color: #ffffff;
    border-bottom: 1px solid #ECECEC;
  }

  .logo .container {
    height: 90px;
  }

  .logo .container img {
    width: 100%;
    height: 100%;
  }

  .logo .container .left {
    float: left;
    width: 266px;
    height: 54px;
    margin-top: 15px;
  }

  .logo .container .right {
    float: right;
    width: 233px;
    height: 58px;
    margin-top: 15px;
  }

  .process {
    position: absolute;
    height: 26px;
    top: 154px;
    left: 50%;
    margin-left: -580px;
  }

  .process .container {
    height: 26px;
  }

  .process .container .step {
    width: 120px;
    height: 26px;
    text-align: center;
    font-size: 15px;
    color: #BEBEBE;
    background-color: #F1F1F1;
    float: left;
    margin-left: 195px;
    border-radius: 2px;
    line-height: 26px;
    font-weight: 700;
    border: 0;
  }

  .process .container .active {
    color: #ffffff;
    background-color: #FF9619;
  }

  .tbxx-wrap {
  }

  .tbxx_content {
    width: 1160px;
    margin: 41px 0 100px;
    border: 1px solid #ECECEC;
    padding: 40px;
  }

  .tbxx_content .tbxx {
    margin-bottom: 50px;
  }

  .tbxx_content .tbxx .title {
    height: 36px;
    padding-left: 20px;
    color: #535353;
    line-height: 36px;
    font-size: 16px;
    font-weight: 700;
    position: relative;
  }

  .tbxx_content .tbxx .title img {
    vertical-align: -4px;
  }
  .tbxx_content .tbxx .title .addInfo-wrap {
    position: absolute;
    top: 0;
    left: 150px;
    overflow: hidden;
  }
  .tbxx_content .tbxx .title .addInfo-wrap span {
    float: left;
    height: 30px;
    line-height: 26px;
    padding: 0 26px;
    color: #ffffff;
    background-color: #FFA200;
    border-radius: 2px;
    margin-left: 10px;
    border: 2px solid #ffa200;
    font-weight: 400;
    cursor: pointer;
  }
  .tbxx_content .tbxx .title .addInfo-wrap span:last-child {
    color: #ffa200;
    background-color: #ffffff;
  }

  .tbxx_content .tbxx .tbxx_table {
    width: 100%;
    font-size: 14px;
    color: #666;
    margin: 0;
    height: auto;
  }

  .tbxx_content .tbxx .tbxx_table td {
    height: 50px;
  }

  .tbxx_content .tbxx .tbxx_table td.first_td {
    width: 160px;
    text-align: left;
    padding-left: 40px;
  }

  .tbxx_content .tbxx .tbxx_table td .tbxx_price {
    font-size: 18px;
    color: #ff473f;
  }

  .td_ul {
    overflow: hidden;
  }

  .td_ul li {
    float: left;
    height: 38px;
    line-height: 38px;
    text-align: center;
    display: block;
    font-size: 16px;
    color: #ababab;
    border: 1px solid #D7D7D7;
    border-radius: 2px;
    margin: 0 5px 0 0;
    cursor: pointer;
    padding: 0 20px;
    position: relative;
  }

  .td_ul li.active {
    color: #ffffff;
    border: 1px solid #FFA200;
    background-color: #ff9c00;
  }

  .prdStyles-wrap {
    overflow: hidden;
    margin: 20px 20px 50px;
  }

  .prdStyles-wrap .name {
    float: left;
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #EFEFEF;
  }
  .prdStyles-wrap .name .type {
    color: #FF8A00;
  }

  .prdStyles-wrap .name div {
    height: 36px;
    line-height: 36px;
    padding: 0 20px;
    color: #999999;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
  .prdStyles-wrap .name:nth-child(1) div {
    width: 110px;
  }
  .prdStyles-wrap .name:nth-child(2) div {
    width: 340px;
  }

  .prdStyles-wrap .name div:nth-child(2n+1) {
    background-color: #F7F7F7;
  }

  .prdStyles-wrap .name div:nth-child(1) {
    border-bottom: 1px solid #EFEFEF;
    border-left: 1px solid #ffffff;
    background-color: #ffffff;
  }

  .prdStyles-wrap .remark {
    float: left;
    cursor: pointer;
    border-bottom: 1px solid #EFEFEF;
  }

  .prdStyles-wrap .remark.on {
    border: 2px solid #FF9600;
    box-shadow: 0px 2px 8px 0px rgba(255, 150, 0, 0.35);
  }

  .prdStyles-wrap .remark.on div {
    color: #FF9600;
  }

  .prdStyles-wrap .remark.on div:nth-child(2) {
    color: #6C6C6C;
  }

  .prdStyles-wrap .remark.on div:nth-child(1) {
    background-color: #FF9600;
    color: #ffffff;
    border: 2px solid #FF9600;
  }

  .prdStyles-wrap .remark div {
    height: 36px;
    line-height: 36px;
    width: 140px;
    color: #6C6C6C;
    font-size: 14px;
    text-align: center;
    border-right: 2px solid #fff;
  }

  .prdStyles-wrap .remark div:nth-child(1) {
    position: relative;
    font-weight: 700;
    border: 2px solid #EFEFEF;
  }

  .prdStyles-wrap .remark div:nth-child(2n+1) {
    background-color: #F7F7F7;
  }

  .select-box {
    border: 1px solid #D7D7D7;
    border-radius: 2px;
    color: #444;
    cursor: pointer;
    width: 350px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    padding-left: 10px;
    /*清楚默认样式*/
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url("../../assets/proToubaoxinxiPC/an-xl.png") no-repeat 327px center transparent;
  }

  /*清楚ie下的默认样式*/
  select::-ms-expand {
    display: none;
  }

  .tbxx_input {
    border: 1px solid #D7D7D7;
    border-radius: 2px;
    outline: none;
    height: 40px;
    line-height: 40px;
    color: #606266;
    font-size: 16px;
    vertical-align: middle;
    width: 350px;
    padding-left: 10px;
  }

  .calculate_info {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    background-color: #ffffff;
    font-size: 16px;
    border-top: 1px solid #e1e1e1;
    box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, .05);
    z-index: 2;
  }

  .calculate_info .calculate_wrap {
    width: 1050px;
    height: 60px;
    margin: 0 auto;
    background-color: #FFA200;
    border-radius: 2px;
    line-height: 60px;
  }
  .calculate_info .calculate_wrap .cost-wrap {
    float: left;
    margin-left: 20px;
    color: #ffffff;
    font-weight: 700;
  }
  .calculate_info .calculate_wrap .cost-wrap .title {
    font-size: 14px;
    vertical-align: middle;
     height: auto;
     line-height: 1.2;
     padding-left: 0;
  }
  .calculate_info .calculate_wrap .cost-wrap .value {
    font-size: 22px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .calculate_info .calculate_wrap .age-wrap {
    font-size: 14px;
    color: #ffffff;
    float: left;
  }
  .calculate_info .calculate_wrap .arrow-wrap {
    float: right;
  }

  .calculate_info .fl {
    font-size: 20px;
    color: #ffffff;
    float: left;
    font-weight: 700;
  }

  .calculate_info .calculate_wrap .arrow-wrap .previous {
    font-size: 12px;
    color: #ffffff;
    margin-right: 20px;
    cursor: pointer;
  }
  .calculate_info .calculate_wrap .arrow-wrap .next {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-top: 12px;
    color: #FFA200;
    background-color: #ffffff;
    border-radius: 2px;
    margin-right: 20px;
    font-weight: 700;
    padding: 0 10px;
    cursor: pointer;
  }
  .calculate_info .calculate_wrap .arrow-wrap .next:hover {
    background-color: #fff8e0;
  }

  .checkbox, .checkbox-checked {
    display: inline-block;
    height: 16px;
    width: 16px;
    vertical-align: -2px;
    cursor: pointer;
  }

  .checkbox {
    background: transparent url(../../assets/proToubaoxinxiPC/xz-fx2.png) no-repeat 0 0px;
  }

  .checkbox-checked {
    background: transparent url(../../assets/proToubaoxinxiPC/xz-fx1.png) no-repeat 0 0px;
  }

  .tiaokuan-span-box {
    color: #535353;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    margin-top: 40px;
  }

  >>> .el-input--prefix .el-input__inner {
    padding-left: 10px;
  }

  >>> .el-input__inner {
    border-radius: 2px;
    border: 1px solid #D7D7D7;
  }

  >>> .el-input__inner {
    height: 40px !important;
    line-height: 40px !important;
    width: 350px !important;
  }

  >>> .el-date-editor.el-input {
    width: auto !important;
    height: 40px !important;
    font-size: 16px !important;
  }

  .insur-index {
    display: inline-block;
    width: 70px;
    background-color: #fd762c;
    border-radius: 2px;
    text-align: center;
    color: #ffffff;
    padding: 5px 0;
  }

  .base-span {
    color: #ababab;
    border: 1px solid #D7D7D7;
    height: 38px;
    line-height: 38px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 2px;
    cursor: pointer;
    margin: 0 5px 0 0;
    padding: 0 10px;
  }

  .tb_table {
    width: 1080px;
    margin: 20px auto;
    overflow: hidden;
  }

  .tb_table .tb_table_item {
    overflow: hidden;
  }

  .tb_table .tb_table_item .title {
    float: left;
    width: 160px;
    height: 36px;
    color: #535353;
    font-size: 14px;
    padding-left: 40px;
  }

  .tb_table .tb_table_item .content {
    float: left;
    color: #535353;
    font-size: 14px;
    height: 36px;
    padding-left: 16px;
    line-height: 36px;
  }

  .active {
    background-color: #FF9600;
    color: #ffffff;
    border: 1px solid #FF9600;
  }

  .prd-introduce {
    width: 1000px;
    overflow: hidden;
    border: 2px solid #FFA200;
    border-radius: 2px;
    padding: 10px 20px;
    margin: 20px auto 30px;
  }

  .prd-introduce .title {
    overflow: hidden;
  }

  .prd-introduce .title span {
    float: left;
    color: #999999;
    font-size: 14px;
    width: 318px;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px dashed #C9C9C9;
  }

  .prd-introduce .title span:nth-child(1) {
    width: 150px;
  }
  .prd-introduce .title span:nth-child(2) {
    width: 600px;
    padding-left: 20px;
  }
  .prd-introduce .title span:nth-child(3) {
    text-align: right;
    width: 200px;
  }

  .prd-introduce .content {
    overflow: hidden;
  }

  .prd-introduce .content span {
    float: left;
    color: #6C6C6C;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px dashed #C9C9C9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prd-introduce .content span:nth-child(1) {
    color: #FFA200;
    width: 150px;
  }
  .prd-introduce .content span:nth-child(2) {
    width: 600px;
    padding-left: 20px;
  }
  .prd-introduce .content span:nth-child(3) {
    color: #FFA200;
    text-align: right;
    width: 200px;
  }

  .insures-table {
    width: 1000px;
    margin: 10px auto 30px;
  }

  .insures-table tr {
    border-bottom: 1px dashed #e5e5e5;
  }

  .insures-table tr th {
    color: #999999;
    font-size: 14px;
    padding: 5px 0;
  }
  .insures-table tr th:last-child {
    text-align: right;
  }

  .insures-table tr td {
    color: #535353;
    font-size: 14px;
    padding: 5px 0;
  }
  .insures-table tr td:last-child {
    text-align: right;
  }

  .insures-table tr td:first-child {
    color: #FFA200;
  }

  input::-webkit-input-placeholder { /* WebKit browsers */
    color: #cdd0d5;
    font-size: 14px;
  }

  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #cdd0d5;
    font-size: 14px;
  }

  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #cdd0d5;
    font-size: 14px;
  }

  input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #cdd0d5;
    font-size: 14px;
  }

  .insures-wrap {
    width: 1000px;
    margin: 10px auto 30px;
  }
  .insures-wrap table {
    width: 100%;
  }
  .insures-wrap table tr{}
  .insures-wrap table tr th{
    color: #999999;
    font-size: 14px;
    font-weight: 400;
  }
  .insures-wrap table tr td{}

  .blackBg {
    filter: alpha(opacity=50);
    opacity: 0.5;
    overflow: hidden;
    background-color: #000;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 998;
  }
  .modify-add-insuredInfo-wrap {
    width: 580px;
    height: 480px;
    position: fixed;
    top: 100px;
    left: 50%;
    margin-left: -290px;
    background-color: #ffffff;
    z-index: 999;
    border-radius: 2px;
  }
  .modify-add-insuredInfo-wrap .insure-title {
    height:40px;
    color: #FF8A00;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    background-color: #F4F4F4;
    border-radius: 2px;
  }
  .modify-add-insuredInfo-wrap .content {
    width: 400px;
    margin: 20px auto;
  }
  .modify-add-insuredInfo-wrap .content .tbxx_table {}
  .modify-add-insuredInfo-wrap .content .tbxx_table .first_td {}
  .modify-add-insuredInfo-wrap .content .tbxx_table >>> .el-input__inner {
    width: 200px!important;
  }
  .modify-add-insuredInfo-wrap .content .tbxx_table .select-box {
    width: 200px;
    background: url("../../assets/proToubaoxinxiPC/an-xl.png") no-repeat 180px center transparent;
  }
  .modify-add-insuredInfo-wrap .content .tbxx_table .tbxx_input {
    width: 200px;
  }

  .modify-add-insuredInfo-wrap .bottom {
    position: absolute;
    bottom: 0;
    width: 580px;
    height: 60px;
    overflow: hidden;
    text-align: center;
  }
  .modify-add-insuredInfo-wrap .bottom div {
    display: inline-block;
    margin: 0 10px;
    width: 160px;
    height: 40px;
    line-height: 40px;
    background-color: #CECECE;
    color: #ffffff;
    cursor: pointer;
    border-radius: 2px;
  }
  .modify-add-insuredInfo-wrap .bottom div:nth-child(2) {
    background: #FF8A00;
  }
  .modify-span {
    font-size: 14px;
    color: #FF8A00;
    padding-right: 5px;
    cursor: pointer;
  }
  .delete-span {
    font-size: 14px;
    color: #FF4444;
    cursor: pointer;
  }
  .shoujihao-wrap {
    width: 370px;
    height: 370px;
    position: fixed;
    top: 200px;
    left: 50%;
    margin-left: -185px;
    background-color: #ffffff;
    z-index: 999;
    border-radius: 2px;
  }
  .shoujihao-wrap .title {
    color: #FF9619;
    margin: 46px auto 20px;
    font-size: 14px;
    text-align: center;
    height: auto;
     line-height: 1.2;
     padding-left: 0;
  }
  .shoujihao-wrap .content {
    width: 292px;
    height: 40px;
    border: 1px solid #D7D7D7;
    border-radius: 2px;
    margin: 20px auto;
    line-height: 40px;
    position: relative;
  }
  .shoujihao-wrap .content .title {
    padding-left: 10px;
    color: #6C6C6C;
    font-size: 14px;
  }
  .shoujihao-wrap .content .img {
    width: 80px;
    height: 40px;
    position: absolute;
    right: -1px;
    top: -2px;
    cursor: pointer;
  }
  .shoujihao-wrap .content .img img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .shoujihao-wrap .content .yzm {
    color: #FF8A00;
    font-size: 14px;
    cursor: pointer;
    float: right;
    padding: 0 10px;
  }
  .shoujihao-wrap .content input {
    width: 120px;
  }
  .shoujihao-wrap .submit {
    width: 180px;
    height: 40px;
    margin: 50px auto 0;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    background-color: #FFA200;
    border-radius: 2px;
    cursor: pointer;
  }
  .upload-license {
    position: absolute;
    top: -5px;
    left: 0;
    width: 140px;
    height: 30px;
    line-height: 30px;
    background-color: #FFA200;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    border-radius: 2px;
    padding: 0 12px;
    cursor: pointer;
  }
  .upload-explain {
    position: absolute;
    top: -5px;
    left: 150px;
    font-size: 14px;
    color: #535353;
    height: 30px;
    line-height: 30px;
  }
  .license-img {
    position: absolute;
    top: 40px;
    left: 0;
    width: 160px;
    height: 260px;
    border: 1px solid #D7D7D7;
    border-radius: 2px;
    padding: 5px;
  }
  .license-img .img-wrap {
    width: 150px;
    height: 218px;
  }
  .license-img .img-wrap img {
    width: 100%;
    height: 100%;
  }
  .license-img .btn {
    padding: 0;
  }
  .license-img .btn > div {
    display: inline-block;
  }
  .license-img .btn span {
    margin-top: 2px;
    width: 71px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
  }
  .license-img .btn span:nth-child(1) {
    color: #FF8A00;
    border: 2px solid #FF8A00;
  }
  .license-img .btn span:nth-child(2) {
    color: #FF4444;
    border: 2px solid #FF4444;
  }
  .redStar {
    color: #FF6F6F;
    font-size: 14px;
    font-weight: 700;
  }
</style>
