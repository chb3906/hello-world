<template>
  <div>
    <div class="wrap" v-show="showToubaoxinxi">
      <!--顶部-->
      <div class="tk_header">
        <div class="tk_header_con">
          <span>您好，欢迎来到阳光财险! </span>
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
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'page'">
            <!--基本信息-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico06.png" alt="">基本信息</div>
              <table class="tbxx_table">
                <tr v-for='item in typeData' :key='item.name'>
                  <!-- 默认展示第一个方案的明细 -->
                  <td class="first_td" v-if="item.entries.length>0">{{item.name}}：</td>
                  <td v-if="item.entries.length > 0 && item.entries.length <= 2">
                    <span class="base-span" v-for="items in item.entries" @click="handleClick(item.entries,items.id,styleId)" :class="{active:items.isDefault}" :key='items.id'>
                      {{items.value}}
                    </span>
                  </td>
                  <td v-if="item.entries.length > 2">
                    <select v-model="item.selectValue" @change="handleClick(item.entries,item.selectValue,styleId)" class="select-box">
                      <option v-for="items in item.entries" :key="items.id" :value="items.id">{{items.value}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="first_td"> 起保日期：</td>
                  <td>
                    <el-date-picker class="inputP" :default-value="startDefaultValue" v-model="dataValue" type="date" placeholder="选择起保日期时间" :pickerOptions='pickerOptions' :prefix-icon='icon' value-format="yyyy-MM-dd" @change='changeStartTime'></el-date-picker>
                  </td>
                </tr>
                <tr v-if="insuranceIntervalType == 0">
                  <!-- 固定区间 -->
                  <td class="first_td"> 结束日期：</td>
                  <td>
                    <el-date-picker v-model="endDate" type="date" :prefix-icon='icon' value-format="yyyy-MM-dd" readonly></el-date-picker>
                  </td>
                </tr>
                <tr v-else-if="insuranceIntervalType == 1">
                  <!-- 间隔区间 -->
                  <td class="first_td"> 结束日期：</td>
                  <td>
                    <el-date-picker v-model="endDate" type="date" :pickerOptions='endPickerOptions' :prefix-icon='icon' value-format="yyyy-MM-dd"></el-date-picker>
                  </td>
                </tr>
              </table>

              <!--方案比较-->
              <div class="prdStyles-wrap">
                <!--<div class="name">
                  <div></div>
                  <div>保障类型</div>
                  <div class="type" v-for="(prdDuty,index) in btnlist[0].prdDutys" :title="prdDuty.dutyType ">{{ (index == 0 ||(index != 0 && prdDuty.dutyType != (btnlist[0].prdDutys)[index-1].dutyType)) ? prdDuty.dutyType : '' }}</div>
                </div>-->
                <div class="name">
                  <div></div>
                  <div>保障范围</div>
                  <!--:title="prdDuty.name + '\n' + prdDuty.value "-->
                  <template v-for="(prdDuty,index) in btnlist[bzfwIndex].prdDutys">
                    <div v-if="prdDuty.name == ''" :key="'bzfw' + index">
                    </div>
                    <div v-else :title="'责任名称：' + prdDuty.name + '\n' + '责任描述：' + (prdDuty.value==''?prdDuty.name : prdDuty.value)" :key="'bzfw' + index">
                      <img src="../../assets/proToubaoxinxiPC/ts1.png" alt="">
                      {{ prdDuty.name }}
                    </div>
                  </template>
                </div>
                <div class="remark" :class="{on:i.prdItemId == prdmcShop.prdItemId}" v-for="(i,indexA) of btnlist" @click="handletype(i.prdSpecificationCalcs,i.prdItemId,i.styleId,i.price,indexA)" :key="'be' + indexA">
                  <div>{{ i.styleName }}<img v-show="i.prdItemId == prdmcShop.prdItemId" style="position: absolute;top: 0;right: 0;" src="../../assets/proToubaoxinxiPC/jbdh.png" /></div>
                  <div>保额</div>
                  <div v-for="(prdDuty,index) in i.prdDutys" :key="'beItem' + index">{{ prdDuty.remark }}</div>
                </div>
              </div>
            </div>
            <!--投保人信息-->
            <div class="tbxx" v-for="(info,index) in pageType1Computed" :key="index + 'applicate'">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">{{info.pageType | statusFilter}}
              </div>
              <table class="tbxx_table">
                <tr v-for="(i) in info.items" :key='i.itemName'>
                  <td v-if="i.itemCode != 41" class="first_td"> {{i.itemName}}：</td>
                  <td v-else-if="i.itemCode == 41" class="first_td"> 电子发票：</td>
                  <td>
                    <!--姓名-->
                    <input v-if="i.itemCode == 1" type="text" class="tbxx_input" placeholder="请输入投保人" v-model="i.userName" maxlength="30" @blur="handleCommentFocus(i,info.pageType)" @click="onSensors('PC-填单页-填写投保人姓名', $event)">
                    <!--证件类型-->
                    <select v-else-if="i.isHasOption && i.itemCode==3" :key="index+'Selected'" class="select-box" v-model="i.userName" @change="numChange(i,info.pageType,0,$event),onSensors('PC-填单页-选择投保人证件类型', $event)">
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--证件号码-->
                    <input v-else-if="i.itemCode == 4" type="text" class="tbxx_input" :placeholder="'请输入'+i.itemName" v-model="i.userName" maxlength="18" @change="changeDataInfo(info.items,i.itemCode,i.userName)" @blur="handleCommentFocus(i,info.pageType)" @click="onSensors('PC-填单页-填写投保人证件号码', $event)">
                    <!-- 联系电话 -->
                    <input v-else-if="i.itemCode==6 || i.itemCode == 14 || i.itemCode == 31" type="text" class="tbxx_input" :placeholder="'请输入'+i.itemName" v-model="i.userName" maxlength="11" @blur="handleCommentFocus(i,info.pageType)" @click="onSensors('PC-填单页-填写投保人联系电话', $event)">
                    <!--邮箱-->
                    <input v-else-if="!i.isHasOption && i.itemCode == 7" type="text" class="tbxx_input" placeholder="请输入邮箱" v-model="i.userName" maxlength="30" @blur="handleCommentFocus(i,info.pageType)" @click="onSensors('PC-填单页-填写邮箱', $event)">
                    <!--所属地区-->
                    <el-cascader v-else-if="i.itemCode == 12" :options="citySelectOptions" placeholder="请选择所在地区" v-model="applicantArea" :clearable="true" separator=" " @change="handleCityChange(i,applicantArea),onSensors('PC-填单页-选择所在地区', $event)"></el-cascader>
                    <!--出生日期-->
                    <el-date-picker v-else-if="!i.isHasOption && i.itemCode == 5" class="inputP" @blur="handleCommentFocus(i,info.pageType)" @change='changeDataInfo(info.items,i.itemCode,i.userName)' :prefix-icon='icon' value-format='yyyy-MM-dd' :placeholder="'请选择'+i.itemName" v-model="i.userName" type='date' :pickerOptions='pickerOptionsAfter'></el-date-picker>
                    <!--性别-->
                    <select v-else-if="i.itemCode == 2" :key="index+'Selected'" name="dd" class="select-box" @change="commonOptionChange(i),onSensors('PC-填单页-选择投保人性别', $event)" v-model="i.userName">
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--详细地址-->
                    <input v-else-if="i.itemCode == 15" type="text" class="tbxx_input" placeholder="请输入详细地址" v-model="i.userName" maxlength="30" @blur="handleCommentFocus(i,info.pageType)" @click="onSensors('PC-填单页-选择详细地址', $event)">
                    <!--所属职业-->
                    <el-cascader v-else-if="i.itemCode == 9" :options="jobSelectOptions" placeholder="请选择所属职业" v-model="applicantJob" :show-all-levels="false" :clearable="true" @change="handleJobChange(i,applicantJob)"></el-cascader>
                    <!--是否新车-->
                    <select v-else-if="i.isHasOption && i.itemCode==47" class="select-box" v-model="i.userName" @change='carChange(i.userName)'>
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--车牌号-->
                    <input type="text" :placeholder="isNewCarVal==1?'新车':'例 京AF5566'" v-else-if="isNewCar && isNewCarVal==1 && !i.isHasOption && i.itemCode == 36" class="tbxx_input" v-model="i.userName" @blur="handleCommentFocus(i,info.pageType)" maxlength="30" :disabled="isNewCarVal==1?true:false">
                    <!--车架号-->
                    <input v-else-if="!i.isHasOption && i.itemCode == 35" type="text" class="tbxx_input" :placeholder="'请输入'+i.itemName" v-model="i.userName" maxlength="17" @blur="handleCommentFocus(i,info.pageType)">
                    <!--发票介质-->
                    <el-checkbox-group class="itemCheckbox" v-else-if="i.isHasOption && i.itemCode==41" v-model="checkedInvoice">
                      <el-checkbox v-for="op in i.options" :label="op.id" :key="op.id" @change="isCheckedInvoice">
                        {{op.name}}
                      </el-checkbox>
                    </el-checkbox-group>
                    <el-date-picker v-else-if="!i.isHasOption && (i.itemCode == 22 || i.itemCode == 23)" class="inputP" @blur="handleCommentFocus(i,info.pageType)" @change='changeDataInfo(info.items,i.itemCode,i.userName)' :prefix-icon='icon' value-format='yyyy-MM-dd' :placeholder="'请选择'+i.itemName" v-model="i.userName" type='date' :pickerOptions='pickerOptionsAfter'></el-date-picker>
                    <input v-else-if="!i.isHasOption && i.itemCode != 5 && i.itemCode != 22 && i.itemCode != 23" type="text" class="tbxx_input" :placeholder="i.itemCode==46?'为空则使用投保人姓名':'请输入'+i.itemName" v-model="i.userName" maxlength="30" @blur="handleCommentFocus(i,info.pageType)">
                    <select v-else-if="i.isHasOption" :key="index+'Selected'" name="dd" class="select-box" @change='commonOptionChange(i)' v-model="i.userName">
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
            <!--被保人信息 条件：1团险 2被保人数量大于等于10人-->
            <template v-if="minGroupNum != null && maxGroupNum != null && maxGroupNum >= 10">
              <div class="tbxx" v-for="(info,index) in pageType2Computed" :key="index + 'insurancedtx'">
                <div class="title">
                  <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">{{info.pageType | statusFilter}}
                  <div class="addInfo-wrap">
                    <span @click="exportClick">下载模板</span>
                    <!--批量上传信息-->
                    <input-excel @getResult="getMyExcelData"></input-excel>
                    <span @click="addBeibaorenInfo">逐个添加信息</span>
                  </div>
                </div>
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
                    <template v-if="insured.insuredItems.length < 7">
                      <td v-for="(i,index) in (6-insured.insuredItems.length)" :key="'tx' + index">——</td>
                    </template>
                    <td><span class="modify-span" @click="modifyBeibaorenInfo(i)">修改</span><span class="delete-span" @click='deleteBeibaorenInfo(i)'>删除</span></td>
                  </tr>
                </table>

                <div class="blackBg" v-show="showBeibaoren"></div>
                <div class="modify-add-insuredInfo-wrap" v-show="showBeibaoren" v-for="(user,index) in userListComputed" :key="index+'group-item'">
                  <div class="insure-title">{{ modifyOrAdd ? '修改':'添加' }}被保人信息</div>
                  <div class="content">
                    <table class="tbxx_table">
                      <tr>
                        <td class="first_td">{{user.itemName}}:</td>
                        <td>
                          <select :key="index+'group'" name="" id="" v-if="user.isHasOption &&  user.itemCode == '8'" class="select-box" v-model="user.userName" @change='selectOption2(user.userName,index)'>
                            <option v-for="itemy in user.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr v-for="(w,indexx) in user.otherOptionitems" :key="indexx+'group-items-info'">
                        <td class="first_td"> {{w.itemName}}：</td>
                        <td>
                          <el-cascader v-if="w.itemCode == 12" :options="citySelectOptions" placeholder="请选择所在地区" v-model="insuranceArea" :clearable="true" separator=" " @change="handleCityChange(w,insuranceArea)"></el-cascader>
                          <el-cascader v-else-if="w.itemCode == 9" :options="jobSelectOptions" placeholder="请选择所属职业" v-model="insuranceJob" :show-all-levels="false" :clearable="true" @change="handleJobChange(w,insuranceJob)"></el-cascader>
                          <input type="text" class="tbxx_input" v-else-if="w.itemCode == 4" :placeholder="'请输入'+w.itemName" v-model="w.userName" maxlength="18" @change='bBRChnageInfo(user.otherOptionitems,w.itemCode,w.userName,index)' @blur="handleCommentFocus(w,info.pageType)">
                          <input type="text" class="tbxx_input" v-else-if='w.itemCode==6 || w.itemCode == 14 || w.itemCode == 31' :placeholder="'请输入'+w.itemName" @blur="handleCommentFocus(w,info.pageType)" v-model="w.userName" maxlength="11">
                          <input type="text" class="tbxx_input" v-else-if="!w.isHasOption && w.itemCode != 5 && w.itemCode != 22 && w.itemCode != 23" :placeholder="'请输入'+w.itemName" v-model="w.userName" @blur="handleCommentFocus(w,info.pageType)" maxlength="30">
                          <el-date-picker type='date' v-else-if="!w.isHasOption && (w.itemCode == 5 || w.itemCode == 22 || w.itemCode == 23)" :prefix-icon='icon' value-format='yyyy-MM-dd' :placeholder="'请选择'+w.itemName" v-model="w['userName'+index]" @blur="handleCommentFocus(w,info.pageType,index)" @change="bBRChnageInfo(user.otherOptionitems,w.itemCode,w['userName'+index],index)" :pickerOptions='pickerOptionsAfter'></el-date-picker>
                          <select :key="indexx+'group--index'" v-else-if="w.isHasOption &&  w.itemCode != '8'" class="select-box" v-model="w.userName" @change='numChange(w,info.pageType,index,$event)'>
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
            </template>
            <!--被保人信息 条件：1团险 2被保人数量小于10人-->
            <template v-if="minGroupNum != null && maxGroupNum != null && maxGroupNum < 10">
              <div class="tbxx" v-for="(info,index) in pageType2Computed" :key="index + 'insurancedtx2'">
                <div class="title">
                  <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">{{info.pageType | statusFilter}}
                </div>
                <table class="tbxx_table" v-for="(user,index) in userList" :key="index+'group-item'">
                  <tr>
                    <td class="first_td">
                      <div class="insur-index">被保人{{ index + 1 }}</div>
                    </td>
                    <td>
                      <div style="cursor: pointer;" v-if='index > (minGroupNum-1)' @click='deleteActionIsur(index)'>
                        <img src="../../assets/proToubaoxinxiPC/del.png">
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="first_td">{{user.itemName}}:</td>
                    <td>
                      <select :key="index+'group'" name="" id="" v-if="user.isHasOption &&  user.itemCode == '8'" class="select-box" v-model="user.userName" @change='selectOption2(user.userName,index)'>
                        <option v-for="itemy in user.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr v-for="(w,indexx) in user.otherOptionitems" :key="indexx+'group-items-info'">
                    <td class="first_td"> {{w.itemName}}：</td>
                    <td>
                      <el-cascader v-if="w.itemCode == 12" :options="citySelectOptions" placeholder="请选择所在地区" v-model="insuranceArea" :clearable="true" separator=" " @change="handleCityChange(w,insuranceArea)"></el-cascader>
                      <el-cascader v-else-if="w.itemCode == 9" :options="jobSelectOptions" placeholder="请选择所属职业" v-model="insuranceJob" :show-all-levels="false" :clearable="true" @change="handleJobChange(w,insuranceJob)"></el-cascader>
                      <input type="text" class="tbxx_input" v-else-if="w.itemCode == 4" :placeholder="'请输入'+w.itemName" v-model="w.userName" maxlength="18" @change='bBRChnageInfo(user.otherOptionitems,w.itemCode,w.userName,index)' @blur="handleCommentFocus(w,info.pageType)">
                      <input type="text" class="tbxx_input" v-else-if='w.itemCode==6 || w.itemCode == 14 || w.itemCode == 31' :placeholder="'请输入'+w.itemName" @blur="handleCommentFocus(w,info.pageType)" v-model="w.userName" maxlength="11">
                      <input type="text" class="tbxx_input" v-else-if="!w.isHasOption && w.itemCode != 5 && w.itemCode != 22 && w.itemCode != 23" :placeholder="'请输入'+w.itemName" v-model="w.userName" @blur="handleCommentFocus(w,info.pageType)" maxlength="30">
                      <el-date-picker type='date' v-else-if="!w.isHasOption && (w.itemCode == 5 || w.itemCode == 22 || w.itemCode == 23)" :prefix-icon='icon' value-format='yyyy-MM-dd' :placeholder="'请选择'+w.itemName" v-model="w['userName'+index]" @blur="handleCommentFocus(w,info.pageType,index)" @change="bBRChnageInfo(user.otherOptionitems,w.itemCode,w['userName'+index],index)" :pickerOptions='pickerOptionsAfter'></el-date-picker>
                      <select :key="indexx+'group--index'" v-else-if="w.isHasOption &&  w.itemCode != '8'" class="select-box" v-model="w.userName" @change='numChange(w,info.pageType,index,$event)'>
                        <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                      </select>
                    </td>
                  </tr>
                </table>
                <table class="tbxx_table">
                  <tr>
                    <td class="first_td"></td>
                    <td class="">
                      <div class="" @click='addActionIsur' style="cursor: pointer;">
                        <img src="../../assets/proToubaoxinxiPC/add.png">
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <!--被保人信息 条件：个险-->
            <template v-if="minGroupNum == null && maxGroupNum == null">
              <div class="tbxx" v-for="(info,index) in pageType2Computed" :key="index + 'insurancedgx'">
                <div class="title">
                  <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">{{info.pageType | statusFilter}}
                </div>
                <table class="tbxx_table">
                  <tr v-for="(w,indexxx) in showOption" :key='w.itemName'>
                    <td class="first_td"> {{w.itemName}}：</td>
                    <td>
                      <!--与投保人关系-->
                      <select name="" id="" v-if="w.isHasOption &&  w.itemCode == '8'" class="select-box" v-model="w.userName" @change="selectOption(w.userName),onSensors('PC-填单页-选择与投保人关系', $event)">
                        <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                      </select>
                      <!--姓名-->
                      <input type="text" class="tbxx_input" v-else-if="w.itemCode == 1" placeholder="请输入姓名" v-model="w.userName" maxlength="30" @blur="handleCommentFocus(w,info.pageType)" @click="onSensors('PC-填单页-填写被保人姓名', $event)">
                      <!--证件类型-->
                      <select class="select-box" :key="'select' + indexxx+w.itemCode" name="" id="" v-else-if="w.itemCode == 3" v-model="w.userName" @change="numChange(w,info.pageType,0,$event),onSensors('PC-填单页-选择被保人证件类型', $event)">
                        <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                      </select>
                      <!--证件号码-->
                      <input type="text" class="tbxx_input" v-else-if="w.itemCode == 4" placeholder="证件号码" v-model="w.userName" maxlength="18" @change="bBRChnageInfo(showOption,w.itemCode,w.userName,0)" @blur="handleCommentFocus(w,info.pageType)" @click="onSensors('PC-填单页-填写被保人证件号码', $event)">
                      <!--联系电话-->
                      <input type="text" class="tbxx_input" v-else-if="w.itemCode==6 || w.itemCode == 14 || w.itemCode == 31" :placeholder="'请输入'+w.itemName" v-model="w.userName" maxlength="11" @blur="handleCommentFocus(w,info.pageType)" @click="onSensors('PC-填单页-填写被保人联系电话', $event)">
                      <!--出生日期-->
                      <el-date-picker type='date' v-else-if="!w.isHasOption && (w.itemCode == 5 || w.itemCode == 22 || w.itemCode == 23)" :prefix-icon='icon' value-format='yyyy-MM-dd' :placeholder="'请选择'+w.itemName" v-model="w.userName999" @blur="handleCommentFocus(w,info.pageType)" @change='bBRChnageInfo(showOption,w.itemCode,w.userName999,0)' :pickerOptions='pickerOptionsAfter'></el-date-picker>
                      <!--性别-->
                      <select class="select-box" :key="'select' + indexxx+w.itemCode" name="" id="" v-else-if="w.itemCode == 2" v-model="w.userName" @change="numChange(w,info.pageType,0,$event),onSensors('PC-填单页-选择被保人性别', $event)">
                        <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                      </select>
                      <el-cascader v-else-if="w.itemCode == 9" :options="jobSelectOptions" placeholder="请选择所属职业" v-model="insuranceJob" :show-all-levels="false" :clearable="true" @change="handleJobChange(w,insuranceJob)"></el-cascader>
                      <input type="text" class="tbxx_input" v-else-if="!w.isHasOption && w.itemCode != 5 && w.itemCode != 22 && w.itemCode != 23" :placeholder="'请输入'+w.itemName" v-model="w.userName" maxlength="30" @blur="handleCommentFocus(w,info.pageType)">
                      <select class="select-box" :key="'select' + indexxx+w.itemCode" name="" id="" v-else-if="w.isHasOption &&  w.itemCode != '8'" v-model="w.userName" @change='numChange(w,info.pageType,0,$event)'>
                        <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                      </select>
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <!--受益人信息-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">受益人信息</div>
              <table class="tbxx_table">
                <tr>
                  <td class="first_td"> 受益人：</td>
                  <td><input type="text" readonly value="法定" class="tbxx_input"></td>
                </tr>
              </table>
            </div>
            <!--投保声明-->
            <div class="tiaokuan-span-box">
              <div>
                <label :class="{checkbox:!checkedFlag, 'checkbox-checked':checkedFlag}" @click="chenge"></label>
                我已阅读并同意
                <a href="javascript:void(0)" v-for="(item,index) in insuranceComputed" :class="'aIndex'+index" @click="openAlertBox(item)" :key="index" style="color: #FF6C00">《{{item.title}}》</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--底部保费固定展示区域-->
      <div class="calculate_info">
        <div class="calculate_wrap">
          <span class="fl">保费：¥
            <span v-if="discount != 1">{{(common.accMul((toubaoNumber * insurednmb * Number(prdmcShop.price)),this.discount)).toFixed(2) + '元'}}</span>
            <span :class="{oldPrice : discount != 1}">{{(toubaoNumber * insurednmb * Number(prdmcShop.price)) + '元'}}</span>
          </span>
          <a href="javascript:void(0)" class="fr" @click="gotoConfirm(),onSensors('PC-填单页-点击下一步', $event)">下一步</a>
          <span class="previous" @click="gotoIndex(),onSensors('PC-填单页-点击上一步', $event)">&lt;上一步</span>
        </div>
      </div>

      <AlertBox :showAlertBox="showAlertBox" :tiaokuan="insurance" @closeAlertBox="closeAlertBox"></AlertBox>
    </div>
    <div class="wrap" v-show="!showToubaoxinxi">
      <!--顶部-->
      <div class="tk_header">
        <div class="tk_header_con">
          <span>您好，欢迎来到阳光财险! </span>
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
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'page'">
            <!--基本信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico06.png" alt="">基本信息</div>
              <div class="tb_table">
                <div class="tb_table_item" v-for="(item,i) in baseInfo" :key="i">
                  <div class="title">{{item.name}}：</div>
                  <div class="content">{{item.value}}</div>
                </div>
                <div class="tb_table_item">
                  <div class="title">起保日期：</div>
                  <div class="content">{{dataValue + ' ' + lastDateString}}</div>
                </div>
                <div class="tb_table_item">
                  <div class="title">终保日期：</div>
                  <div class="content">{{endDate + ' ' + endLastDateString}}</div>
                </div>
              </div>
            </div>
            <!--方案介绍信息-->
            <template v-for="(item,index) in btnlist">
              <div class="prd-introduce" v-if="item.prdItemId == isactive" :key="index">
                <div class="prd-introduce-title">
                  <!--<span>保障类型</span>-->
                  <span>保障范围</span>
                  <span>保额</span>
                </div>
                <template v-for="(prd,i) in item.prdDutys">
                  <div class="content" v-if="prd.name != ''" :key="i">
                    <span :title="prd.value">{{ prd.name }}</span>
                    <span>{{ prd.remark }}</span>
                  </div>
                </template>
              </div>
            </template>
            <!--投保人信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">投保人信息</div>
              <div class="tb_table">
                <div class="tb_table_item" v-for="(item,i) in policyHolders" :key="i">
                  <div class="title">{{ item.code | handleSwitchItemName }}：</div>
                  <div class="content">{{ item | handleSwitchItemValue }}</div>
                </div>
              </div>
            </div>
            <!--被保人信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">被保人信息</div>
              <div class="tb_table" v-for="(insured,i) in insureds" :key="i + 'insuredArr'">
                <div class="tb_table_item" v-for="(item,i) in insured.insuredItems" :key="i">
                  <div class="title">{{ item.code | handleSwitchItemName }}：</div>
                  <div class="content">{{ item | handleSwitchItemValue }}</div>
                </div>
              </div>
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
      <div class="bottom_wrap">
        <div class="tb_footer">
          <span>保费：¥
            <span v-if="discount != 1">{{(common.accMul((toubaoNumber * insurednmb * Number(prdmcShop.price)),this.discount)).toFixed(2) + '元'}}</span>
            <span :class="{oldPrice : discount != 1}">{{toubaoNumber * insurednmb * Number(prdmcShop.price) + '元'}}</span>
          </span>
          <a href="javascript:void(0)" @click="gotoPay(),onSensors('PC-填单页-点击确认无误，购买', $event)">确认无误，购买</a>
          <a href="javascript:void(0)" @click="closeConfirm(),onSensors('PC-填单页-点击返回修改', $event)">返回修改</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sessionOperation } from '../../util/util.js'
import cityData from "./cityForPC.json"
import jobData from "./jobPC.json"
import Jquery from 'jquery'
import AlertBox from './common/AlertBox.vue'
import inputExcel from '../../components/commons/uploadExcel.vue'
import XLSX from 'xlsx'

export default {
  name: "ProToubaoxinxiPC",
  components: {
    AlertBox,
    inputExcel
  },
  data() {
    return {
      sign: '', // 签名
      insuredItemIds: [],//被保人itemId
      bzfwIndex: 0,
      discount: 1,
      itemId: this.$route.query.id, // 支付参数 itemid
      channelCode: this.$route.query.channelCode, //渠道code
      channelName: window.sessionStorage.getItem('channelName'),
      orgCode: this.$route.query.orgCode,//机构code
      productStartDate: '',//后台配置的起保日期
      lastDateString: '00:00:00',
      endLastDateString: '23:59:59',
      sessionOper: sessionOperation(),
      applicantArea: window.sessionStorage.getItem('applicantArea') ? JSON.parse(window.sessionStorage.getItem('applicantArea')) : [],// 投保人所在地区
      insuranceArea: window.sessionStorage.getItem('insuranceArea') ? JSON.parse(window.sessionStorage.getItem('insuranceArea')) : [],// 被保人所在地区
      applicantJob: window.sessionStorage.getItem('applicantJob') ? JSON.parse(window.sessionStorage.getItem('applicantJob')) : [],// 投保人所属职业
      insuranceJob: window.sessionStorage.getItem('insuranceJob') ? JSON.parse(window.sessionStorage.getItem('insuranceJob')) : [],// 被保人所属职业
      citySelectOptions: {},
      jobSelectOptions: {},
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
      showAlertBox: false,
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
      paramstopayId: "", //支付参数 itemid
      pagelength: "", //存放页数的数组
      pagecenters: [], //条款须知集合数组
      money: "", // 立即支付金额
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

      policyindex: "", // 被保人的初始下标
      delindex: "", // 删除被保人的初始下标

      applicant: [], //投保人items数组
      insureApplicant: [], //被保人items数组
      showOption: [], //展示外面的数据

      benrenShow: [], //被保人是本人的需要展示的数据
      duoyuShow: [], //被保人不是本人展示数据

      gangaoShow: [],
      userList: [],
      otherShows: [],
      noBenRenInfo: {},
      surnameSelf: [], //被保人本人公用内容
      unSurnameSelf: [], //被保人本人单独的内容

      btnlist: [],// 方案数组prdStyleSpecification
      prdmcShop: {
        price: 0,
      }, // 确认投保数据
      isactive: '', // 方案明细id
      styleId: '',// 方案id
      typeData: [], // 某一个方案的数据明细prdSpecificationCalcs
      itemData: {},
      entries: [],// 某一项的明细数组
      upParams: {},

      paramstopay: {}, // 立即支付的参数
      policyHolders: [], // 投保人信息
      insureds: [], // 被保人信息
      beneficiary: [], // 受益人信息

      baseInfo: [],// 用户所选产品方案相关信息
      addressCode: '',// 最低级的地区code

      isNewCar: false,
      isNewCarVal: '1',

      checkedInvoice: [],//发票介质
      invoiceOption: '',
      invoiceType: '',//发票类型 1:个人  2:企业
      personalInvoiceOption: '',//个人发票选项
      businessInvoiceOption: '',//公司发票选项

      beibaorenIndex: '',// 被保人索引
      showBeibaoren: false,// 是否展示添加或修改被保人弹框标志
      modifyOrAdd: true,// 修改被保人或添加被保人标识，true:修改，false:添加
      currentUser: {},// userList中当前的user
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
    }
  },
  computed: {
    pageType1Computed() {
      return this.pagedata.page[0].types.filter(function (item) {
        return item.pageType == 1
      })
    },
    pageType2Computed() {
      return this.pagedata.page[0].types.filter(function (item) {
        return item.pageType == 2
      })
    },
    insuranceComputed() {
      return this.pagedata.insurances.filter(function (item) {
        return item.type == 1 || item.type == 3 || item.type == 5 || item.type == 7
      })
    },
    userListComputed() {
      return this.userList.filter(function (item, index) {
        return index == this.beibaorenIndex
      })
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
    onSensors(eventName, event) {
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
      // var regExp = /^[\u4E00-\u9FA5]{2,4}$/
      var regExp = /^([\u4e00-\u9fa5\·]{1,10})$/
      if (regExp.test(name)) {
        return true
      } else {
        return false
      }
    },
    //获取折扣(同步请求)
    async getDiscount() {
      var params = {
        productId: this.itemId,
        channelCode: this.channelCode
      };
      try {
        var response = await this.$http.post("prdmc/prdmcProductDiscount/queryDiscount", params)
        if (response.status == 200) {
          if (JSON.stringify(response.data) != '{}') {
            if (response.data.discount != '' && response.data.discount != null) {//折扣不为空
              this.discount = response.data.discount;
            }
          }
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
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
              itemName: appInfo.itemName,
              itemCode: appInfo.itemCode,
              isHasOption: appInfo.isHasOption,
              options: appInfo.options,
              userName: appInfo.userName,
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

        for (var i = 0; i < data.length; i++) {
          var peopleItem = []
          var obj = {}
          if (data[i]['证件类型'] == 1) {// 如果证件类型是身份证
            obj = {
              1: '姓名',
              3: '证件类型',
              4: '证件编号',
            }
            peopleItem = JSON.parse(JSON.stringify(peopleItemState))
          } else {
            obj = {
              1: '姓名',
              3: '证件类型',
              4: '证件编号',
              5: '出生日期',
              2: '性别',
            }
            peopleItem = JSON.parse(JSON.stringify(peopleItemState2))
          }
          peopleItem.userName = data[i]['与投保人关系']
          for (var j = 0; j < peopleItem.otherOptionitems.length; j++) {
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
          ['与投保人关系', '姓名', '证件类型', '证件编号', '出生日期', '性别'];
        const filterVal = ['name1', 'name2', 'name3', 'name4', 'name5', 'name6'];
        const list = [
          {
            name1: 1,
            name2: '张明',
            name3: '1',
            name4: '410522199001295510',
            name5: '1990-01-29',
            name6: '1',
          }
        ]
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '被保人模板表格' + (new Date()).Format('yyyyMMddHHmmss'));
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    isCheckedInvoice(val) {
      if (val) {//选中,则显示发票相关控件
        if (this.invoiceOption.length > 0) {
          for (var i = 0; i < this.invoiceOption.length; i++) {
            if (this.invoiceOption[i].itemCode == '42') {
              this.invoiceOption[i].userName = 1;
            }
          }
        }
        this.concatItems(new Array('42'), this.invoiceOption);
        this.concatItems(new Array('46'), this.personalInvoiceOption);

      } else {//则隐藏
        this.filterItems(['42', '43', '44', '27', '30', '31', '45', '46']);
      }

    },
    commonOptionChange(item) {
      if (item.itemCode == '33') { // 如果是投保份数
        this.toubaoNumber = Number(item.userName)
      }
      if (item.itemCode == '42') {//发票类型
        this.invoiceType = item.userName;
        if (item.userName == '1') {//个人
          this.businessInvoiceOption = this.filterItems(['43', '44', '27', '30', '31', '45']);//隐藏企业发票相关选项
          this.concatItems(new Array('46'), this.personalInvoiceOption);//显示个人发票相关选项
        } else {//企业
          this.personalInvoiceOption = this.filterItems(['46']);//隐藏个人发票相关选项
          this.concatItems(['43', '44', '27', '30', '31', '45'], this.businessInvoiceOption);//显示企业发票相关选项
        }
      }
    },
    carChange(value) {
      this.isNewCarVal = value;
      if (value == '2') {//不是新车,车牌号必填,车架号选填
        this.noRequiredField = ['35', '38', '39'];
        this.clearFieldValue(new Array('35'));//切换时清空车架号
      } else {//是新车,车架号必填，车牌号选填
        this.noRequiredField = ['36', '38', '39'];
        this.clearFieldValue(new Array('35', '36'));//切换时清空车架号及车牌号
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
    //拼接字段选项(目前只限投保人)
    concatItems(fieldArr, fieldOption) {
      var condition = '';
      if (fieldArr.length > 0) {
        for (var t = 0; t < fieldArr.length; t++) {
          condition += " indexOfArr(z.items, 'itemCode', " + fieldArr[t] + ") === false &&";//拼接条件
        }
      }
      condition = condition.substring(0, condition.length - 2);//去掉最后的&&
      //          console.log(condition,'condition');
      if (this.pagedata.page.length > 0) {
        for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
            var z = this.pagedata.page[i].types[j];
            if (z.pageType == 1) {//投保人
              //                console.log(eval(condition));
              if (eval(condition)) {//若不存在,则追加
                z.items = z.items.concat(fieldOption);
              }
            }
          }
        }
      }
    },
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
    getSpecification() {// 获取产品方案
      var prdmcShop = window.sessionStorage.getItem('prdmcShop')
      if (prdmcShop && prdmcShop != '{}') {// 走缓存
        this.prdmcShop = JSON.parse(prdmcShop)
        this.bzfwIndex = parseInt(window.sessionStorage.getItem('bzfwIndex'))
        this.btnlist = JSON.parse(window.sessionStorage.getItem('btnlist'))// 方案报价数据数组
        var preStyles = JSON.parse(window.sessionStorage.getItem('prdStyles'))
        this.btnlist.forEach((item, itemindex) => {
          item.prdDutys = preStyles[itemindex].prdDutys
          this.detailslist = item;
          item.prdSpecificationCalcs.forEach(item => {
            if (item.entries.length > 2) {
              item.entries.forEach(items => {
                if (items.isDefault) {// 是否默认选中展示该项
                  item.selectValue = items.id; //下拉框设置默认值
                }
              });
            }
          });
        });

        var myMaxlength = this.btnlist[0].prdDutys.length
        this.btnlist.forEach((item) => {
          if (item.prdDutys.length > myMaxlength) {
            myMaxlength = item.prdDutys.length
          }
        })
        this.btnlist.forEach((item) => {
          if (myMaxlength > item.prdDutys.length) {
            var myLength = myMaxlength - item.prdDutys.length
            for (let i = 0; i < myLength; i++) {
              item.prdDutys.push({
                name: '',
                value: '',
                remark: '',
                dutyType: null
              })
            }
          }
        })
        this.typeData = JSON.parse(window.sessionStorage.getItem('typeData'))// 第一个方案的数据明细
        this.itemData.startPrice = this.btnlist[0].price;//改变初始价格
        this.isactive = JSON.parse(window.sessionStorage.getItem('isactive'))// 默认方案的明细id
        this.styleId = JSON.parse(window.sessionStorage.getItem('styleId'))// 方案id
        this.insuredItemIds[0] = this.isactive
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
              if (item.entries.length > 2) {
                item.entries.forEach(items => {
                  if (items.isDefault) {// 是否默认选中展示该项
                    item.selectValue = items.id; //下拉框设置默认值
                  }
                });
              }
            });
          });
          var myMaxlength = this.btnlist[0].prdDutys.length
          this.btnlist.forEach((item) => {
            if (item.prdDutys.length > myMaxlength) {
              myMaxlength = item.prdDutys.length
            }
          })
          this.btnlist.forEach((item) => {
            if (myMaxlength > item.prdDutys.length) {
              var myLength = myMaxlength - item.prdDutys.length
              for (let i = 0; i < myLength; i++) {
                item.prdDutys.push({
                  name: '',
                  value: '',
                  remark: '',
                  dutyType: null
                })
              }
            }
          })
          this.typeData = this.btnlist[0].prdSpecificationCalcs;// 第一个方案的数据明细
          this.itemData.startPrice = this.btnlist[0].price;//改变初始价格
          this.isactive = this.btnlist[0].prdItemId;// 默认方案的明细id
          this.styleId = this.btnlist[0].styleId;// 方案id
          this.insuredItemIds[0] = this.isactive
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
          if (this.btnlist.length > 1) {
            this.baseInfo.push({
              name: '产品方案',
              value: this.btnlist[i].styleName
            })
          }
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
        res = JSON.parse(res);
        this.res = res;
        this.globalFlag = true;
        this.showOption = JSON.parse(window.sessionStorage.getItem('showOption'))
        this.insurednmb = Number(window.sessionStorage.getItem('insurednmb'));//被保人数量
        this.toubaoNumber = Number(window.sessionStorage.getItem('toubaoNumber'));//被保人数量

        this.productStartDate = window.sessionStorage.getItem('productStartDate')//从缓存中取后台配置的起保日期
        this.itemId = window.sessionStorage.getItem('itemId');
        this.dataValue = window.sessionStorage.getItem('startDate');
        this.endDate = window.sessionStorage.getItem('endDate');

        this.addressName = window.sessionStorage.getItem('addressName') ? window.sessionStorage.getItem('addressName') : "";
        this.addressCode = window.sessionStorage.getItem('addressCode') ? window.sessionStorage.getItem('addressCode') : "";
        this.gangaoShow = JSON.parse(window.sessionStorage.getItem('gangaoShow'));
        this.isNewCar = window.sessionStorage.getItem('isNewCar') === 'true' ? true : false;//是否是新车
        this.isNewCarVal = window.sessionStorage.getItem('isNewCarVal');//是否是新车标识
        this.checkedInvoice = JSON.parse(window.sessionStorage.getItem('checkedInvoice'));//发票介质
        this.invoiceOption = JSON.parse(window.sessionStorage.getItem('invoiceOption'));//发票类型
        this.businessInvoiceOption = JSON.parse(window.sessionStorage.getItem('businessInvoiceOption'));//企业发票
        this.personalInvoiceOption = JSON.parse(window.sessionStorage.getItem('personalInvoiceOption'));//个人发票

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
        this.jobSelectOptions = jobData.content
        this.maxDayCount = res.data.data.maxDayCount;
        this.minDayCount = res.data.data.minDayCount;
        this.pagedata = res.data.data; //需要展示的数据
        this.prdCode = res.data.data.prdCode;
        this.paramstopayId = res.data.data.itemId;
        this.pagelength = this.pagedata.page.length; //计算的页数
        this.pagecenters = res.data.data.insurances; //协议内容
        this.money = window.sessionStorage.getItem('money') //默认价格
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

        //判断产品是否下架
        if (checkMsgNull(res.data.data.productEndDateStr)) {
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
        if (!checkMsgNull(this.productStartDate)) {//若后台配置的起保日期为空
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
          if (!checkMsgNull(this.productStartDate)) {//若后台配置的起保日期为空
            startDate = start_date.getTime() - 3600 * 8 * 1000;//则取默认的起保日期
          } else {
            startDate = new Date(this.productStartDate).getTime() - 3600 * 8 * 1000;//否则就取后台配置的起保日期
          }

          this.pickerOptions = {
            disabledDate(time) {
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
              return time.getTime() < startDate || time.getTime() > (that.startDateRange - 1);
            }
          }
          this.endPickerOptions = {
            disabledDate(time) {
              return (startDate + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > ((startDate - 1) + that.maxDayCount * 3600 * 24 * 1000);
            }
          }
        } else {
          this.pickerOptions = {
            disabledDate(time) {
              return time.getTime() < Date.now() || time.getTime() > (that.startDateRange - 1);
            }
          }
        }


        this.pagedata.page.forEach(l => {
          //被保人在数组中的位置
          l.types.forEach((m, n) => {
            if (m.pageType == 2) {
              this.policyindex = n;
              this.delindex = n;
            }
          });
        });

        console.log(JSON.stringify(this.pagedata.page));
        //循环查找那个被保人,投保人的选项
        for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
            if (this.pagedata.page[i].types[j].pageType == 1) {
              this.applicant = this.pagedata.page[i].types[j].items;
            } else if (this.pagedata.page[i].types[j].pageType == 2) {//被保人
              this.insureApplicant = this.pagedata.page[i].types[j].items;
            }
          }
        }
        //把本人需要展示的数组加上被保人的关系
        for (var i = 0; i < this.insureApplicant.length; i++) {

          if (this.insureApplicant[i].itemCode == 8) {// itemCode==8:表示与投保人关系
            this.benrenShow.push(this.insureApplicant[i]);
            this.duoyuShow.push(this.insureApplicant[i]);
            if (checkMsgNull(this.maxGroupNum) && checkMsgNull(this.minGroupNum)) {// 如果是多个被保人
              if (this.maxGroupNum >= 10) {

              } else {
                for (var i = 0; i < this.minGroupNum; i++) {
                  var peopleItemState = {}
                  var otherOptionitems = []; //如果不是本人，来放其他的选项。。。。
                  if (i == 0) {
                    peopleItemState.userName = this.insureApplicant[0].userName;
                  } else {
                    peopleItemState.userName = this.insureApplicant[0].options.length > 1 ? this.insureApplicant[0].options[i].id : '1';//与被保人关系选项
                  }

                  for (var j = 0; j < this.insureApplicant.length; j++) {
                    var appInfo = this.insureApplicant[j];
                    var itemCodeArr = [8, 2, 5]
                    if (itemCodeArr.indexOf(appInfo.itemCode) == -1) {//排除出生日期和性别
                      otherOptionitems.push({
                        itemName: appInfo.itemName,
                        itemCode: appInfo.itemCode,
                        isHasOption: appInfo.isHasOption,
                        options: appInfo.options,
                        userName: appInfo.userName,
                      })
                    }
                  }

                  this.otherShows = otherOptionitems;// 存放的是除了（与投保人关系、出生日期和性别）之外的，被保人数组中的其他选项
                  peopleItemState.options = this.insureApplicant[0].options;
                  peopleItemState.isHasOption = this.insureApplicant[0].isHasOption;
                  peopleItemState.itemName = this.insureApplicant[0].itemName;
                  peopleItemState.itemCode = this.insureApplicant[0].itemCode;
                  if (this.insureApplicant[i].options[0].id == 1) {// 如果被保人关系是本人，则不展示其他选项
                    peopleItemState.otherOptionitems = []
                  } else {
                    peopleItemState.otherOptionitems = otherOptionitems
                    this.noBenRenInfo = peopleItemState; // 记录 投保人不是本人时候的对象。。。。
                  }
                  peopleItemState.recordOpitonitems = otherOptionitems;
                  this.userList.push(peopleItemState)// 存放的是与投保人关系这一项，里面添加了一些属性
                }
              }
            } else {// 单个被保人
              if (this.insureApplicant[i].options[0].id == 1) {// 表示 与投保人关系 中有本人选项
                this.showOption = this.benrenShow
              } else {
                this.showOption = this.duoyuShow
              }
            }
          }
        }

        //把选择不是本人的数据拼接
        for (var i = 0; i < this.insureApplicant.length; i++) {
          if (this.insureApplicant[i].itemCode != 8 && this.insureApplicant[i].itemCode != 5 && this.insureApplicant[i].itemCode != 2) {
            this.duoyuShow.push(this.insureApplicant[i]);
          }
        }
        //循环查找那个被保人和投保人相同的项
        for (var i = 0; i < this.insureApplicant.length; i++) {
          var aSelect = true;
          for (var j = 0; j < this.applicant.length; j++) {
            if (this.insureApplicant[i].itemCode == this.applicant[j].itemCode) {
              this.surnameSelf.push(this.insureApplicant[i]); //与投保人相同项
              aSelect = false;
            }
          }
          if (aSelect) {
            if (this.insureApplicant[i].itemCode != 8 && this.insureApplicant[i].itemCode != 5
              && this.insureApplicant[i].itemCode != 2 && this.insureApplicant[i].itemCode != 9) {
              this.unSurnameSelf.push(this.insureApplicant[i]);
              this.benrenShow.push(this.insureApplicant[i]); //选项为本入时展示的数据
            }
          }
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
          this.jobSelectOptions = jobData.content // 职业数据
          this.insuranceIntervalType = res.data.data.insuranceIntervalType;// 保险间隔类型  0固定区间1间隔区间
          this.maxDayCount = res.data.data.maxDayCount;// 保险间隔类型为1间隔区间时，最大保险期间天数
          this.minDayCount = res.data.data.minDayCount;// 保险间隔类型为1间隔区间时，最小保险期间天数
          this.pagedata = res.data.data; //需要展示的数据
          this.prdCode = res.data.data.prdCode;// 产品编码
          this.prdName = res.data.data.prdName; //产品名称
          this.paramstopayId = res.data.data.itemId;// 方案明细id
          this.pagelength = this.pagedata.page.length; //计算的页数
          this.pagecenters = res.data.data.insurances; //协议内容，条款集合数组
          this.money = this.pagedata.basePrice; //默认价格
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

          //判断产品是否下架
          if (checkMsgNull(res.data.data.productEndDateStr)) {
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
          if (checkMsgNull(res.data.data.productStartDateStr)) {//返回起保日期
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
          if (checkMsgNull(res.data.data.startEffDelayDays)) {
            var delayDays = res.data.data.startEffDelayDays * 3600 * 24 * 1000;
            var timeStamp = new Date(this.dataValue).getTime() + delayDays;
            this.dataValue = formatDateTime(timeStamp);//加上生效延迟天数的时间戳再转日期
          }
          console.log(new Date(this.dataValue), 'ee');

          //起保日期可选范围（天）
          //            console.log(formatDateTime(new Date(this.dataValue).getTime()),'8小时');
          var dataValue = new Date(this.dataValue).getTime() - 3600 * 8 * 1000;//起保日期减去8小时
          //            console.log(formatDateTime(dataValue),'无8小时');
          if (!checkMsgNull(this.rangeDay)) {
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
                return time.getTime() < startDate || time.getTime() > (that.startDateRange - 1);
              }
            }
            this.endPickerOptions = {
              disabledDate(time) {
                return (startDate + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > ((startDate - 1) + that.maxDayCount * 3600 * 24 * 1000);
              }
            }
          } else {
            this.pickerOptions = {
              disabledDate(time) {
                return time.getTime() < Date.now() || time.getTime() > (that.startDateRange - 1);
              }
            }
          }

          this.pagedata.page.forEach(l => {
            //被保人在数组中的位置
            l.types.forEach((m, n) => {
              if (m.pageType == 2) {
                this.policyindex = n;// 被保人的初始下标，现在是1（从0开始）
                this.delindex = n;// 删除被保人的初始下标，现在是1（从0开始）
              }
            });
          });

          // 循环select默认下标值
          for (var i = 0; i < this.pagedata.page.length; i++) {
            for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
              var z = this.pagedata.page[i].types[j];
              var newItemsArr = [];
              for (var k = 0; k < z.items.length; k++) {
                if (z.items[k].options != null) {// 给options不为空的item增加一个userName属性
                  z.items[k].userName = z.items[k].options[0].id;
                }
                //判断是否是新车
                if (z.items[k].itemName == '新车') {
                  this.isNewCar = true;
                }
                //发票类型
                if (z.items[k].itemCode == '42') {
                  this.invoiceType = z.items[k].userName;
                }
              }
            }
          }

          //循环查找那个被保人,投保人的选项
          for (var i = 0; i < this.pagedata.page.length; i++) {
            for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
              if (this.pagedata.page[i].types[j].pageType == 1) {//投保人
                this.applicant = this.pagedata.page[i].types[j].items;// 投保人信息items数组

              } else if (this.pagedata.page[i].types[j].pageType == 2) {//被保人
                this.insureApplicant = this.pagedata.page[i].types[j].items;// 被保人信息items数组
              }
            }
          }

          //把本人需要展示的数组加上被保人的关系
          for (var i = 0; i < this.insureApplicant.length; i++) {

            if (this.insureApplicant[i].itemCode == 8) {// itemCode==8:表示与投保人关系
              this.benrenShow.push(this.insureApplicant[i]);
              this.duoyuShow.push(this.insureApplicant[i]);
              if (checkMsgNull(this.maxGroupNum) && checkMsgNull(this.minGroupNum)) {// 如果是多个被保人
                for (var i = 0; i < this.minGroupNum; i++) {
                  var peopleItemState = {}
                  var otherOptionitems = []; //如果不是本人，来放其他的选项。。。。
                  if (i == 0) {
                    peopleItemState.userName = this.insureApplicant[0].userName;
                  } else {
                    peopleItemState.userName = this.insureApplicant[0].options.length > 1 ? this.insureApplicant[0].options[i].id : '1';//与被保人关系选项
                  }

                  for (var j = 0; j < this.insureApplicant.length; j++) {
                    var appInfo = this.insureApplicant[j];
                    var itemCodeArr = [8, 2, 5]
                    if (itemCodeArr.indexOf(appInfo.itemCode) == -1) {//排除出生日期和性别
                      otherOptionitems.push({
                        itemName: appInfo.itemName,
                        itemCode: appInfo.itemCode,
                        isHasOption: appInfo.isHasOption,
                        options: appInfo.options,
                        userName: appInfo.userName,
                      })
                    }
                  }

                  this.otherShows = otherOptionitems;// 存放的是除了（与投保人关系、出生日期和性别）之外的，被保人数组中的其他选项
                  peopleItemState.options = this.insureApplicant[0].options;
                  peopleItemState.isHasOption = this.insureApplicant[0].isHasOption;
                  peopleItemState.itemName = this.insureApplicant[0].itemName;
                  peopleItemState.itemCode = this.insureApplicant[0].itemCode;
                  if (this.insureApplicant[i].options[0].id == 1) {// 如果被保人关系是本人，则不展示其他选项
                    peopleItemState.otherOptionitems = []
                  } else {
                    peopleItemState.otherOptionitems = otherOptionitems
                    this.noBenRenInfo = peopleItemState; // 记录 投保人不是本人时候的对象。。。。
                  }
                  peopleItemState.recordOpitonitems = otherOptionitems;
                  this.userList.push(peopleItemState)// 存放的是与投保人关系这一项，里面添加了一些属性
                  if (this.maxGroupNum >= 10) {
                    this.userList = []

                  }
                }
              } else {// 单个被保人
                if (this.insureApplicant[i].options[0].id == 1) {// 表示 与投保人关系 中有本人选项
                  this.showOption = this.benrenShow
                } else {
                  this.showOption = this.duoyuShow
                }
              }
            }
          }
          //把选择不是本人的数据拼接
          for (var i = 0; i < this.insureApplicant.length; i++) {
            if (this.insureApplicant[i].itemCode != 8 && this.insureApplicant[i].itemCode != 5 && this.insureApplicant[i].itemCode != 2) {
              this.duoyuShow.push(this.insureApplicant[i]);
            }
          }
          //循环查找那个被保人和投保人相同的项
          for (var i = 0; i < this.insureApplicant.length; i++) {
            var aSelect = true;
            for (var j = 0; j < this.applicant.length; j++) {
              if (this.insureApplicant[i].itemCode == this.applicant[j].itemCode) {
                this.surnameSelf.push(this.insureApplicant[i]); //与投保人相同项
                aSelect = false;
              }
            }
            if (aSelect) {
              if (this.insureApplicant[i].itemCode != 8 && this.insureApplicant[i].itemCode != 5 && this.insureApplicant[i].itemCode != 2 && this.insureApplicant[i].itemCode != 9) {
                this.unSurnameSelf.push(this.insureApplicant[i]);
                this.benrenShow.push(this.insureApplicant[i]); //选项为本入时展示的数据
              }
            }
          }
          this.gangaoShow = this.filterItems(['5', '2']);//过滤出生日期和性别 gangaoShow存储出生日期和性别
          this.invoiceOption = this.filterItems(['42']);//发票介质
          this.businessInvoiceOption = this.filterItems(['43', '44', '27', '30', '31', '45']);//企业发票相关选项
          this.personalInvoiceOption = this.filterItems(['46']);//个人发票相关选项

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
      if (this.showOption.length != 1) { //非团险的情况。。。
        return;
      }
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
                  this.money = res.data.data.price;
                  this.prdmcShop.price = res.data.data.price
                  this.isactive = res.data.data.prdItemId
                  this.btnlist.forEach(btnItem => {
                    if (btnItem.styleId == this.styleId) {
                      btnItem.prdItemId = res.data.data.prdItemId
                      this.prdmcShop.prdItemId = res.data.data.prdItemId
                    }
                  })
                  //将投、被保人的itemId存入数组,投保人itemId为数组中第一项
                  this.insuredItemIds[0] = res.data.data.prdItemId;//被保人实时itemId
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
    bBRChnageInfo(items, itemCode, userName, index) {
      console.log('-------被保人信息----iteme----->' + JSON.stringify(items));
      items.forEach(item => { //遍历
        if (itemCode == '4') {
          if (item.itemCode == '3' && item.userName == '1') {//校验身份证类型 的证件编号
            var Card = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            if (!Card.test(userName)) {
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
        if (itemCode == '5') {
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
                  this.money = res.data.data.price;
                  this.prdmcShop.price = res.data.data.price
                  this.isactive = res.data.data.prdItemId
                  this.btnlist.forEach(btnItem => {
                    if (btnItem.styleId == this.styleId) {
                      btnItem.prdItemId = res.data.data.prdItemId
                      this.prdmcShop.prdItemId = res.data.data.prdItemId
                    }
                  })
                  //将投、被保人的itemId存入数组,投保人itemId为数组中第一项
                  this.insuredItemIds[index] = res.data.data.prdItemId;//被保人实时itemId
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
    handleCommentFocus(item, pageType, index) {
      if (this.noRequiredField.indexOf(item.itemCode) == -1) {// 过滤非必填项
        if (pageType == 1) {// 投保人
          if (!item.userName) {
            if (item.itemCode == 5) {// 出生日期
              this.$message.error('请选择投保人出生日期')
            } else if (item.itemCode == 9) {// 所属职业
              this.$message.error('请选择投保人所属职业')
            } else {
              this.$message.error('请输入投保人' + item.itemName)
            }
          } else if (item.itemCode == 1) {// 姓名
            if (!this.checkName(item.userName)) {
              this.$message.error('投保人姓名格式不正确')
            }
          } else if (item.itemCode == "4") {//证明编号(不能为汉字)
            console.log(this.cardValue, 'value');
            if (this.cardValue == '1') {//居民身份证
              if (!this.checkIdCard(item.userName)) {
                this.$message.error('投保人身份证格式不正确')
                return;
              }
            } else if (this.cardValue == "8") {//组织机构代码
              item.userName = item.userName.toUpperCase();
              if (!this.checkIllegalString(item.userName)) {
                this.$message.error('投保人组织机构代码不能为非法字符和中文')
              }
            } else {
              if (this.checkChinese(item.userName)) {
                this.$message.error('投保人证件编号格式不正确')
              }
            }
          } else if (item.itemCode == 6 || item.itemCode == 14 || item.itemCode == 31) {// 联系电话，监护人手机号，银行预留手机号
            if (checkMsgNull(item.userName) && !this.checkMobilePhone(item.userName)) {
              this.$message.error('投保人手机号格式不正确')
            }
          } else if (item.itemCode == 7) {// 邮箱
            if (!this.checkEmail(item.userName)) {
              this.$message.error('投保人邮箱格式不正确')
            }
          } else if (item.itemCode == "35") {//车架号
            item.userName = item.userName.toUpperCase();//小写转大写
            if (!this.common.checkCjh(item.userName)) {
              this.$message.error('车架号有误')
            }
          }
        } else if (pageType == 2) {// 被保人
          if (!item.userName) {
            if (item.itemCode == 5) {// 出生日期
              if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {// 多个被保人
                if (typeof item['userName' + index] == 'undefined') {
                  this.$message.error('请选择被保人出生日期')
                }
              } else {// 单个被保人
                if (typeof item.userName999 == 'undefined') {
                  this.$message.error('请选择被保人出生日期')
                }
              }
            } else if (item.itemCode == 9) {// 所属职业
              this.$message.error('请选择被保人所属职业')
            } else {
              this.$message.error('请输入被保人' + item.itemName)
            }
          } else if (item.itemCode == 1) {// 姓名
            if (!this.checkName(item.userName)) {
              this.$message.error('被保人姓名格式不正确')
            }
          } else if (item.itemCode == "4") {//证明编号(不能为汉字)
            console.log(this.cardValue, 'value');
            if (this.cardValue == '1') {//居民身份证
              if (!this.checkIdCard(item.userName)) {
                this.$message.error('被保人身份证格式不正确')
                return;
              }
            } else if (this.cardValue == "8") {//组织机构代码
              item.userName = item.userName.toUpperCase();
              if (!this.checkIllegalString(item.userName)) {
                this.$message.error('被保人组织机构代码不能为非法字符和中文')
              }
            } else {
              if (this.checkChinese(item.userName)) {
                this.$message.error('被保人证件编号格式不正确')
              }
            }
          }
        }
      }
    },
    // item,pageType,0,$event
    numChange(item, type, index, event) {
      console.log(item)
      if (item.itemCode == '33') { // 投保份数
        // this.prdmcShop.price = this.prdmcShop.price * item.userName;
        // this.money = this.pagedata.basePrice * item.userName;
        this.toubaoNumber = Number(item.userName)
      }
      this.cardValue = event.target.value;//证件类型值
      if (type == 2) {//若是被保人
        if (item.itemCode == '3') {//证件类型
          if (item.userName == '1') {//身份证
            this.showOption = this.duoyuShow;//个险
            this.userList.forEach((list, n) => {//团险
              if (n == index) {
                list.otherOptionitems = list.recordOpitonitems;
              }
            })
          } else {//非身份证
            this.showOption = this.duoyuShow.concat(this.gangaoShow);//个险-》显示出生日期和性别
            //团险-》显示出生日期和性别
            this.userList.forEach((list, n) => {
              if (n == index) {
                if (indexOfArr(list.otherOptionitems, 'itemCode', '5') === false && indexOfArr(list.otherOptionitems, 'itemCode', '2') === false) {
                  list.otherOptionitems = list.otherOptionitems.concat(this.gangaoShow);
                }
              }
            })
          }
        }
      } else {//投保人
        if (item.itemCode == '3') {//3表示证件类型
          if (item.userName != '1') {//非身份证，需要展示出来 出生日期和性别
            for (var i = 0; i < this.pagedata.page.length; i++) {
              for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
                var z = this.pagedata.page[i].types[j];
                if (z.pageType == 1) {//投保人
                  if (indexOfArr(z.items, 'itemCode', '5') === false && indexOfArr(z.items, 'itemCode', '2') === false) {//若不存在,则追加
                    for (var x = 0; x < this.gangaoShow.length; x++) {
                      var index = indexOfArr(this.applicant, 'itemCode', this.gangaoShow[x].itemCode);//返回索引
                      z.items.insert(index, this.gangaoShow[x]);//根据索引将元素插入数组
                    }

                  }
                }
              }
            }
          } else {// 如果是身份证，需要过滤掉 出生日期和性别
            this.filterItems(['5', '2']);//隐藏出生日期和性别
          }
        }
      }
    },
    cancelBeibaoren(index) {
      if (!this.modifyOrAdd) {// 添加
        if (this.userList.length > 0) {
          this.userList.splice(index, 1)
        }
      } else {// 修改
        this.userList[index] = this.currentUser
        this.getInsureds()
        this.currentUser = {}
      }
      this.showBeibaoren = false
    },
    //若投保人证件类型为非身份证,且被保人是本人时：拼接上出生日期及性别选项。注：只在缓存数据中做此处理
    concatBirthdayAndSex() {
      if (this.globalFlag) {
        console.log(this.globalFlag);
        for (var i = 0; i < this.insureApplicant.length; i++) {
          for (var j = 0; j < this.applicant.length; j++) {
            if (this.applicant[j].itemCode == '3') {//证件类型
              if (this.applicant[j].userName != '1') {//非身份证
                if (this.insureApplicant[i].itemCode == '8') {
                  if (this.insureApplicant[i].userName == '1') {//被保人为本人
                    if (indexOfArr(this.surnameSelf, 'itemCode', '5') === false && indexOfArr(this.surnameSelf, 'itemCode', '2') === false) {//若不存在
                      this.surnameSelf = this.surnameSelf.concat(this.gangaoShow);
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    getInsureds() { // 被保人超过10个人之后，获取被保人信息数组
      this.insureds = []
      console.log(this.insureds)
      this.pagedata.page.forEach(q => {
        var baoIndex = null;
        q.types.forEach(w => {
          if (w.pageType == 1) {//投保人
            baoIndex = w.items;
          } else if (w.pageType == 2) {//被保人

            if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) { //团险的 。。。。
              this.concatBirthdayAndSex()
              for (var i = 0; i < this.userList.length; i++) {
                var obj = {
                  linkmanId: this.linkmanId,
                  insuredItems: []
                }
                var user = this.userList[i]; // 团险任务对象 。。。
                var item = {
                  code: user.itemCode,
                  value: user.userName
                }
                obj.insuredItems.push(item)
                if (user.userName == '1') { //  写入本人信息。。

                  console.log(JSON.stringify(this.surnameSelf));

                  for (var m = 0; m < this.surnameSelf.length; m++) {
                    for (var b = 0; b < baoIndex.length; b++) {
                      if (this.surnameSelf[m].itemCode == baoIndex[b].itemCode) {
                        if (this.surnameSelf[m].itemCode == "12") {
                          let shqcityNum = this.surnameSelf[m].userCode;
                          let shqWord = this.surnameSelf[m].userName;
                          let shqName = shqWord;
                          let data3 = {
                            code: 12,
                            value: shqName
                          };
                          obj.insuredItems.push(data3);
                        } else if (this.surnameSelf[m].itemCode == "9") {
                          let shqjobNum = this.surnameSelf[m].userCode;//code
                          let shqWord = this.surnameSelf[m].userName;
                          let shqName = shqWord;
                          let data3 = {
                            code: 9,
                            value: shqjobNum
                          };
                          obj.insuredItems.push(data3);

                        } else {
                          let data2 = {
                            code: baoIndex[b].itemCode,
                            value: baoIndex[b].userName
                          };
                          obj.insuredItems.push(data2);
                        }
                      }
                    }
                  }
                  console.log('本人信息写入完成' + JSON.stringify(obj))
                } else {
                  console.log(JSON.stringify(user.otherOptionitems));
                  for (var j = 0; j < user.otherOptionitems.length; j++) {
                    var optionItem = user.otherOptionitems[j]
                    //处理日期
                    if (optionItem.itemCode == '5') {
                      var optionObj = {
                        code: optionItem.itemCode,
                        value: optionItem['userName' + i]
                      }
                      obj.insuredItems.push(optionObj)
                    } else {
                      var optionObj2 = {
                        code: optionItem.itemCode,
                        value: optionItem.userName
                      }
                      obj.insuredItems.push(optionObj2)
                    }
                  }
                }
                console.log("obj----->" + JSON.stringify(obj));
                this.insureds.push(obj)
              }
            }
          }
        })
      })
    },
    confirmBeibaoren(i) {
      // 校验信息
      var userC = this.userList[i];
      for (var j = 0; j < userC.otherOptionitems.length; j++) {
        var optionC = userC.otherOptionitems[j]
        if (optionC.itemCode == "5") {
          if (optionC['userName' + i] == undefined || optionC['userName' + i] == '' || optionC['userName' + i] == null) {
            this.$message.error("请输入" + optionC.itemName)
            return;
          }
        } else if (optionC.userName == undefined || optionC.userName == "") {
          this.$message.error("请输入" + optionC.itemName)
          return;
        } else {
          if (optionC.itemCode == "4") {// 证件编号
            if (userC.otherOptionitems[j - 1].userName == '1') { // 检验身份证
              if (!this.checkIdCard(optionC.userName)) {
                this.$message.error('身份证格式不正确')
                return;
              }
            } else {//校验非身份证件(不能输入汉字)
              if (this.checkChinese(optionC.userName)) {
                this.$message.error('证件编号不能输入汉字')
                return;
              }
            }
            //校验年龄是否在投保区间

          } else if (
            optionC.itemCode == "6" ||
            optionC.itemCode == "14" ||
            optionC.itemCode == "31"
          ) {
            if (checkMsgNull(optionC.userName) && !this.checkMobilePhone(optionC.userName)) {
              this.$message.error('手机号码格式不对')
              return;
            }
          } else if (optionC.itemCode == "7") {
            if (checkMsgNull(optionC.userName) && !this.checkEmail(optionC.userName)) {
              this.$message.error('邮箱格式不对')
              return;
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
      } else {
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
      var index = count >= user.options.length ? (user.options.length - 1) : count;
      peopleItemState.userName = user.options.length > 1 ? user.options[index].id : '1';//默认与投保人关系为本人
      for (var j = 0; j < this.insureApplicant.length; j++) {
        var appInfo = this.insureApplicant[j];
        var optionsItems = {}
        if (appInfo.itemCode != 8 && appInfo.itemCode != 5 && appInfo.itemCode != 2) {
          otherOptionitems.push({
            itemName: appInfo.itemName,
            itemCode: appInfo.itemCode,
            isHasOption: appInfo.isHasOption,
            options: appInfo.options,
            userName: appInfo.userName,
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
    // 被保人与投保人关系转变（个险）
    selectOption(id) {
      console.log(id);
      //解决从缓存中进来,被保人信息中与投保人关系选项 选择时错乱问题
      //不论从是否走缓存，都重新赋一遍当前选项的值
      for (var i = 0; i < this.duoyuShow.length; i++) {
        if (this.duoyuShow[i].itemCode == '8') {
          this.duoyuShow[i].userName = id;
        }
      }
      if (id == "1") {
        this.showOption = this.benrenShow;
      } else {
        this.showOption = this.duoyuShow;
      }
      console.log('this.showOption===>' + JSON.stringify(this.showOption));
    },
    // 选择与投保人关系时所调方法（团险）
    selectOption2(id, index) {
      console.log(id);
      console.log(index);
      if (id == "1") {// 如果选择的是本人
        if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {
          this.userList.otherOptionitems = []
        } else {
          this.showOption = this.benrenShow;
        }
      } else {
        if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {
          this.userList[index].otherOptionitems = this.userList[index].recordOpitonitems
        } else {
          this.showOption = this.duoyuShow;
        }
      }
      console.log('userlist====' + JSON.stringify(this.userList));
    },
    // 用户选择方案时所调方法
    // 参数1：prdSpecificationCalcs 参数2：prdItemId, 参数3：styleId,i 参数4：price
    handletype(value, prdItemId, styleId, price, index) {
      this.bzfwIndex = index
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
          //将投、被保人的itemId存入数组,投保人itemId为数组中第一项
          this.insuredItemIds[index] = res.data.data.prdItemId;//被保人实时itemId

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
          //将投、被保人的itemId存入数组,投保人itemId为数组中第一项
          this.insuredItemIds[0] = res.data.data.prdItemId;//被保人实时itemId
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
      var aTrue = true;
      console.log('this.pagedata.page-------->' + JSON.stringify(this.pagedata.page))
      for (var l = 0; l < this.pagedata.page.length; l++) {
        for (var m = 0; m < this.pagedata.page[l].types.length; m++) {
          var z = this.pagedata.page[l].types[m]
          if (this.pagedata.page[l].types[m].pageType == 1) {// 投保人
            for (var k = 0; k < z.items.length; k++) {
              if (this.noRequiredField.indexOf(z.items[k].itemCode) == -1) {// 非必填字段不校验
                if (!checkMsgNull(z.items[k].userName)) {
                  if (z.items[k].itemCode == 5) {// 出生日期
                    this.$message.error("请选择投保人出生日期")
                  } else if (z.items[k].itemCode == 9) {// 所属职业
                    this.$message.error("请选择投保人所属职业")
                  } else if (z.items[k].itemCode == 12) {// 所在地区
                    this.$message.error("请选择投保人所在地区")
                  } else {
                    this.$message.error("请输入投保人" + z.items[k].itemName);
                  }
                  aTrue = false;
                  return;
                } else if (z.items[k].itemCode == '35') {//校验车架号
                  z.items[k].userName = z.items[k].userName.toUpperCase()
                  if (!this.common.checkCjh(z.items[k].userName)) {
                    this.$message.error('车架号错误')
                    return false
                  }
                } else if (z.items[k].itemCode == "4") {// 身份证
                  if (z.items[k - 1].userName == '1') { // 开始校验身份证
                    var result = this.checkIdCard(z.items[k].userName)
                    if (!result) {
                      this.$message.error('投保人身份证格式不正确')
                      aTrue = false
                      return;
                    }
                  } else {//校验非身份证件(不能输入汉字)
                    if (this.checkChinese(z.items[k].userName)) {
                      this.$message.error("证件编号不能输入汉字")
                      aTrue = false
                      return;
                    }
                  }
                } else if (z.items[k].itemCode == 6 || z.items[k].itemCode == 14 || z.items[k].itemCode == 31) {// 联系电话 监护人手机号 银行预留手机号
                  if (checkMsgNull(z.items[k].userName) && !this.checkMobilePhone(z.items[k].userName)) {
                    this.$message.error("投保人手机号格式不正确")
                    aTrue = false
                    return
                  }
                } else if (z.items[k].itemCode == "7") {// 邮箱
                  if (checkMsgNull(z.items[k].userName) && !this.checkEmail(z.items[k].userName)) {
                    this.$message.error("投保人邮箱格式不正确")
                    aTrue = false
                    return
                  }
                } else if (z.items[k].itemCode == "1") {// 姓名
                  if (checkMsgNull(z.items[k].userName) && !this.checkName(z.items[k].userName)) {
                    this.$message.error("投保人姓名格式不正确")
                    aTrue = false
                    return
                  }
                }
              }
              if (!aTrue) {// 如果第一次循环校验就没有通过，则直接让k等于数组的长度，提前退出循环
                // debugger
                k = z.items.length;
              }
            }
          } else if (this.pagedata.page[l].types[m].pageType == 2) {//被保人信息
            if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {// 多个被保人（团险）
              for (var i = 0; i < this.userList.length; i++) {
                var userC = this.userList[i];
                console.log('user----->' + i + JSON.stringify(userC));
                for (var j = 0; j < userC.otherOptionitems.length; j++) {
                  var optionC = userC.otherOptionitems[j]
                  console.log('currentuserindex===>' + i);
                  console.log('userName --->' + optionC.itemName + "userCode--》" + optionC.itemCode);
                  if (optionC.itemCode == "5") {
                    console.log(optionC['userName' + i]);
                    if (optionC['userName' + i] == undefined || optionC['userName' + i] == '' || optionC['userName' + i] == null) {

                      this.$message.error("请输入" + optionC.itemName)
                      aTrue = false;
                      return;
                    }
                  } else if (optionC.userName == undefined || optionC.userName == "") {
                    this.$message.error("请输入" + optionC.itemName)
                    aTrue = false;
                    return;
                  } else {
                    if (optionC.itemCode == "4") {// 证件编号
                      if (userC.otherOptionitems[j - 1].userName == '1') { // 检验身份证
                        if (!this.checkIdCard(optionC.userName)) {
                          this.$message.error('被保人身份证格式不正确')
                          aTrue = false
                          return
                        }
                      } else {//校验非身份证件(不能输入汉字)
                        if (this.checkChinese(optionC.userName)) {
                          this.$message.error('被保人证件编号不能输入汉字')
                          aTrue = false
                          return
                        }
                      }
                      //校验年龄是否在投保区间
                    } else if (optionC.itemCode == 6 || optionC.itemCode == 14 || optionC.itemCode == 31) {// 联系电话 监护人手机号 银行预留手机号
                      if (checkMsgNull(optionC.userName) && !this.checkMobilePhone(optionC.userName)) {
                        this.$message.error("被保人手机号格式不正确")
                        aTrue = false
                        return
                      }
                    } else if (optionC.itemCode == "7") {
                      if (checkMsgNull(optionC.userName) && !this.checkEmail(optionC.userName)) {
                        this.$message.error('被保人邮箱格式不正确')
                        aTrue = false
                        return
                      }
                    }
                  }
                }
              }
            } else {//个险
              for (var a = 0; a < this.showOption.length; a++) {
                if (this.showOption[a].itemCode == '5') {//出生日期
                  if (this.showOption[a].userName999 == undefined || this.showOption[a].userName999 == '' || this.showOption[a].userName999 == null) {
                    this.$message.error("请选择被保人出生日期")
                    aTrue = false
                    return
                  }
                } else if (this.showOption[a].userName == undefined || this.showOption[a].userName == "") {
                  this.$message.error("请输入被保人" + this.showOption[a].itemName)
                  aTrue = false;
                  return;
                } else {
                  if (this.showOption[a].itemCode == "1") {// 姓名
                    if (!this.checkName(this.showOption[a].userName)) {
                      this.$message.error("被保人姓名格式不正确")
                      aTrue = false
                      return
                    }
                  } else if (this.showOption[a].itemCode == "4") {// 身份证
                    if (this.showOption[a - 1].userName == '1') { // 检验身份证
                      if (!this.checkIdCard(this.showOption[a].userName)) {
                        this.$message.error("被保人身份证格式不正确")
                        aTrue = false
                        return
                      }
                      for (var k = 0; k < this.policyHolders.length; k++) {
                        if (this.policyHolders[k].code == 3 && this.policyHolders[k].value == 1) {
                          for (var n = 0; n < this.policyHolders.length; n++) {
                            if (this.policyHolders[n].code == 4) {
                              if (this.policyHolders[n].value == this.showOption[a].userName) {
                                this.$message.error("与投保人关系不是本人时，被保人身份证不能和投保人相同！")
                                aTrue = false
                                return
                              }
                            }
                          }
                        }
                      }
                    } else {//校验非身份证(不能输入汉字)
                      if (this.checkChinese(this.showOption[a].userName)) {
                        this.$message.error("被保人证件编号不能输入汉字")
                        aTrue = false
                        return
                      }
                    }
                  } else if (this.showOption[a].itemCode == 6 || this.showOption[a].itemCode == 14 || this.showOption[a].itemCode == 31) {// 联系电话 监护人手机号 银行预留手机号
                    if (checkMsgNull(this.showOption[a].userName) && !this.checkMobilePhone(this.showOption[a].userName)) {
                      this.$message.error("被保人手机号格式不正确")
                      aTrue = false
                      return
                    }
                  } else if (this.showOption[a].itemCode == "7") {// 邮箱
                    if (checkMsgNull(this.showOption[a].userName) && !this.checkEmail(this.showOption[a].userName)) {
                      this.$message.error("被保人邮箱格式不正确")
                      aTrue = false
                      return
                    }
                  }
                }
              }
            }
          }
          if (!aTrue) {
            j = this.pagedata.page[i].types.length;
          }
        }
        if (!aTrue) {
          i = this.pagedata.page.length;
        }
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
      if (this.insuranceIntervalType == 1) { // 判断时间 1表示间隔区间
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

      this.paramstopay = {};// 立即支付的参数
      this.policyHolders = [];// 投保人信息
      this.insureds = [];// 被保人信息
      this.beneficiary = [];// 受益人信息
      console.log(JSON.stringify(this.pagedata.page));
      this.sessionOper.set('policyInfor', this.pagedata);

      var clientInfo = {};
      this.pagedata.page.forEach(q => {
        var baoIndex = null;
        q.types.forEach(w => {
          if (w.pageType == 1) {//投保人
            baoIndex = w.items;
            w.items.forEach(e => {
              if (e.itemCode == 3) {// 3是证件类型
                clientInfo.idcartType = e.userName;
              } else if (e.itemCode == 1) {// 1是姓名
                clientInfo.name = e.userName;
              } else if (e.itemCode == 4) {// 4是证件编号
                clientInfo.idcart = e.userName
              } else if (e.itemCode == 6) {// 6是联系电话
                clientInfo.phone = e.userName
              }
              if (e.itemCode == "12") {// 12是所在地区
                let shqcityNum = e.userCode;
                let shqWord = e.userName;
                let shqName = shqWord;
                let data3 = { // data3中存储着所选地区的地名和代码
                  code: 12,
                  value: shqName
                };
                this.policyHolders.push(data3);
              } else if (e.itemCode == "9") { // 9是所属职业
                let shqjobNum = e.userCode;
                let shqWord = e.userName;
                let shqName = shqWord;
                let data3 = {
                  code: 9,
                  value: shqjobNum
                };
                this.policyHolders.push(data3);// 将所属职业的职业名和代码存放到投保人信息中
              } else if (e.itemCode == "41") {//发票介质
                let val;
                if (this.checkedInvoice.length > 0) {
                  val = this.checkedInvoice[0];
                } else {
                  val = ''
                }
                let data3 = {
                  code: '41',
                  value: val//code
                };
                this.policyHolders.push(data3);
              } else if (e.itemCode == 46) {// 个人发票抬头
                if (this.checkedInvoice.length > 0) {
                  if (checkMsgNull(e.userName)) {
                    this.policyHolders.push({
                      code: '46',
                      value: e.userName,
                    })
                  } else {
                    w.items.forEach(ee => {
                      if (ee.itemCode == 1) {
                        this.policyHolders.push({
                          code: '46',
                          value: ee.userName,
                        })
                        e.userName = ee.userName
                      }
                    })
                  }
                }
              } else if (!checkMsgNull(e.userId)) {
                let val
                if (this.noRequiredField.indexOf(e.itemCode) >= 0) {//若是车牌号/手机品牌/手机型号
                  if (!checkMsgNull(e.userName)) {
                    val = '';
                  } else {
                    val = e.userName;
                  }
                } else {
                  val = e.userName;
                }

                let data1 = {
                  code: e.itemCode,
                  value: val
                };
                this.policyHolders.push(data1);
              } else {
                let data1 = {
                  code: e.itemCode,
                  value: e.userId
                };
                this.policyHolders.push(data1);
              }
              return this.policyHolders;
            });
            console.log('policyHolders------->' + JSON.stringify(this.policyHolders));
          } else if (w.pageType == 2) {//被保人

            if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) { // 多个被保人
              this.concatBirthdayAndSex()

              for (var i = 0; i < this.userList.length; i++) {
                var obj = {
                  linkmanId: this.linkmanId,
                  insuredItems: []
                }
                var user = this.userList[i]; // 团险任务对象 。。。
                var item = {
                  code: user.itemCode,
                  value: user.userName
                }
                obj.insuredItems.push(item)
                if (user.userName == '1') { //  写入本人信息。。

                  console.log(JSON.stringify(this.surnameSelf));

                  for (var m = 0; m < this.surnameSelf.length; m++) {
                    for (var b = 0; b < baoIndex.length; b++) {
                      if (this.surnameSelf[m].itemCode == baoIndex[b].itemCode) {
                        if (this.surnameSelf[m].itemCode == "12") {
                          let shqcityNum = this.surnameSelf[m].userCode;
                          let shqWord = this.surnameSelf[m].userName;
                          let shqName = shqWord;
                          let data3 = {
                            code: 12,
                            value: shqName
                          };
                          obj.insuredItems.push(data3);
                        } else if (this.surnameSelf[m].itemCode == "9") {
                          let shqjobNum = this.surnameSelf[m].userCode;//code
                          let shqWord = this.surnameSelf[m].userName;
                          let shqName = shqWord;
                          let data3 = {
                            code: 9,
                            value: shqjobNum
                          };
                          obj.insuredItems.push(data3);

                        } else {
                          let data2 = {
                            code: baoIndex[b].itemCode,
                            value: baoIndex[b].userName
                          };
                          obj.insuredItems.push(data2);
                        }
                      }
                    }
                  }
                  console.log('本人信息写入完成' + JSON.stringify(obj))
                } else {
                  console.log(JSON.stringify(user.otherOptionitems));
                  for (var j = 0; j < user.otherOptionitems.length; j++) {
                    var optionItem = user.otherOptionitems[j]
                    //处理日期
                    if (optionItem.itemCode == '5') {
                      var optionObj = {
                        code: optionItem.itemCode,
                        value: optionItem['userName' + i]
                      }
                      obj.insuredItems.push(optionObj)
                    } else {
                      var optionObj2 = {
                        code: optionItem.itemCode,
                        value: optionItem.userName
                      }
                      obj.insuredItems.push(optionObj2)
                    }
                  }
                }
                console.log("obj----->" + JSON.stringify(obj));
                this.insureds.push(obj)
              }

            } else {//个险
              var obj = {
                linkmanId: this.linkmanId,
                itemId: this.insuredItemIds[0],
                insuredItems: []
              };
              if (this.showOption[0].userName == "1") {//若是本人
                this.concatBirthdayAndSex()
                for (var q = 0; q < this.showOption.length; q++) {
                  let data2 = {
                    code: this.showOption[q].itemCode,
                    value: this.showOption[q].userName
                  };
                  obj.insuredItems.push(data2);
                }
                for (var m = 0; m < this.surnameSelf.length; m++) {
                  for (var b = 0; b < baoIndex.length; b++) {
                    if (this.surnameSelf[m].itemCode == baoIndex[b].itemCode) {
                      if (this.surnameSelf[m].itemCode == "12") {
                        let shqcityNum = this.surnameSelf[m].userCode;
                        let shqWord = this.surnameSelf[m].userName;
                        let shqName = shqWord;
                        let data3 = {
                          code: 12,
                          value: shqName
                        };
                        obj.insuredItems.push(data3);
                      }
                      //                      /*取不到所属职业的value值*/
                      //                      else if (this.surnameSelf[m].itemCode == "9") {
                      ////                        let shqjobNum = Jquery("#button3").attr("data-jobnum");//code
                      ////                        let shqWord = Jquery("#button3").val();
                      //                        let shqjobNum = this.surnameSelf[m].userCode;//code
                      //                        let shqWord = this.surnameSelf[m].userName;
                      //                        let shqName = shqWord;
                      //                        let data3 = {
                      //                          code: 9,
                      //                          value: shqjobNum
                      ////                          value: shqName
                      //                        };
                      //                        obj.insuredItems.push(data3);
                      //                      }
                      /*modified by tianjing 2018/12/10*/
                      else if (baoIndex[b].itemCode == "9") {
                        let shqjobNum = baoIndex[b].userCode;//code
                        let shqWord = baoIndex[b].userName;
                        let data3 = {
                          code: 9,
                          value: shqjobNum
                        };
                        obj.insuredItems.push(data3);
                      } else {
                        let data2 = {
                          code: baoIndex[b].itemCode,
                          value: baoIndex[b].userName
                        };
                        obj.insuredItems.push(data2);
                      }
                    }
                  }
                }
                console.log(obj);
              } else {//不是本人
                for (var q = 0; q < this.showOption.length; q++) {
                  if (this.showOption[q].itemCode == "12") {
                    let shqcityNum = this.showOption[q].userCode;
                    let shqWord = this.showOption[q].userName;
                    let shqName = shqcityNum + "-" + shqWord;
                    let data3 = {
                      code: 12,
                      value: shqName
                    };
                    obj.insuredItems.push(data3);
                  } else if (this.showOption[q].itemCode == "9") {
                    let shqjobNum = this.showOption[q].userCode;//code
                    let shqWord = this.showOption[q].userName;
                    let shqName = shqWord;
                    let data3 = {
                      code: 9,
                      value: shqjobNum
                    };
                    obj.insuredItems.push(data3);
                  } else if (this.showOption[q].itemCode == "5") {//出生日期
                    let data2 = {
                      code: this.showOption[q].itemCode,
                      value: this.showOption[q].userName999
                    };
                    obj.insuredItems.push(data2);
                  } else {
                    let data2 = {
                      code: this.showOption[q].itemCode,
                      value: this.showOption[q].userName
                    };
                    obj.insuredItems.push(data2);
                  }
                }
              }
              console.log('obj------->' + JSON.stringify(obj));
              this.insureds.push(obj);
            }
            console.log('insureds------->' + JSON.stringify(this.insureds));
          } else if (w.pageType == 3) {//受益人
            let obj = {
              alignment: 1,
              beneficiaryItems: []
            };
            w.items.forEach(t => {
              if (t.userId == "" || t.userId == undefined || t.userId == null) {
                let data3 = {
                  code: t.itemCode,
                  value: t.options[0].id //先强制受益人选项为法定
                };
                obj.beneficiaryItems.push(data3);
              } else {
                let data3 = {
                  code: t.itemCode,
                  value: t.userId
                };
                obj.beneficiaryItems.push(data3);
              }
            });
            this.beneficiary.push(obj);
            console.log('beneficiary------->' + JSON.stringify(this.beneficiary));
          }
        });
      });

      console.log('addressName' + this.addressName);
      let sessionOper = sessionOperation()

      // 首先清除了在存入。。。
      window.sessionStorage.removeItem('res');
      window.sessionStorage.removeItem('showOption');
      window.sessionStorage.removeItem('startDate');
      window.sessionStorage.removeItem('endDate');
      window.sessionStorage.removeItem('userList');
      window.sessionStorage.removeItem('insureds');
      window.sessionStorage.removeItem('money');
      window.sessionStorage.removeItem('itemId')
      window.sessionStorage.removeItem('gangaoShow')
      window.sessionStorage.removeItem('productEndDate')
      window.sessionStorage.removeItem('insurednmb')
      window.sessionStorage.removeItem('toubaoNumber')
      window.sessionStorage.removeItem('channelName')
      window.sessionStorage.removeItem('productStartDate')
      window.sessionStorage.removeItem('isNewCar')
      window.sessionStorage.removeItem('isNewCarVal')
      window.sessionStorage.removeItem('bzfwIndex')

      window.sessionStorage.removeItem('btnlist')
      window.sessionStorage.removeItem('prdmcShop')
      window.sessionStorage.removeItem('isactive')
      window.sessionStorage.removeItem('styleId')
      window.sessionStorage.removeItem('typeData')
      window.sessionStorage.removeItem('itemData')
      window.sessionStorage.removeItem('entries')
      window.sessionStorage.removeItem('upParams')
      window.sessionStorage.removeItem('applicantArea')
      window.sessionStorage.removeItem('insuranceArea')
      window.sessionStorage.removeItem('applicantJob')
      window.sessionStorage.removeItem('insuranceJob')

      window.sessionStorage.removeItem('checkedInvoice')
      window.sessionStorage.removeItem('invoiceOption')
      window.sessionStorage.removeItem('businessInvoiceOption')
      window.sessionStorage.removeItem('personalInvoiceOption')

      window.sessionStorage.removeItem('modifyOrAdd')

      // 再存入数据
      window.sessionStorage.setItem('res', JSON.stringify(this.res));
      window.sessionStorage.setItem('showOption', JSON.stringify(this.showOption));
      window.sessionStorage.setItem('startDate', this.startData2);
      window.sessionStorage.setItem('endDate', this.endDate);
      window.sessionStorage.setItem('money', this.money);
      window.sessionStorage.setItem('insurednmb', this.insurednmb);
      window.sessionStorage.setItem('toubaoNumber', this.toubaoNumber);
      window.sessionStorage.setItem('itemId', this.itemId);
      window.sessionStorage.setItem('gangaoShow', JSON.stringify(this.gangaoShow));
      window.sessionStorage.setItem('productEndDate', this.productEndDate);
      window.sessionStorage.setItem('channelName', this.channelName);
      window.sessionStorage.setItem('productStartDate', this.productStartDate);//后台配置的起保日期
      window.sessionStorage.setItem('isNewCar', this.isNewCar);
      window.sessionStorage.setItem('isNewCarVal', this.isNewCarVal);
      window.sessionStorage.setItem('bzfwIndex', this.bzfwIndex);

      window.sessionStorage.setItem('btnlist', JSON.stringify(this.btnlist))
      window.sessionStorage.setItem('prdmcShop', JSON.stringify(this.prdmcShop))
      window.sessionStorage.setItem('isactive', JSON.stringify(this.isactive))
      window.sessionStorage.setItem('styleId', JSON.stringify(this.styleId))
      window.sessionStorage.setItem('typeData', JSON.stringify(this.typeData))
      window.sessionStorage.setItem('itemData', JSON.stringify(this.itemData))
      window.sessionStorage.setItem('entries', JSON.stringify(this.entries))
      window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams))
      window.sessionStorage.setItem('applicantArea', JSON.stringify(this.applicantArea))
      window.sessionStorage.setItem('insuranceArea', JSON.stringify(this.insuranceArea))
      window.sessionStorage.setItem('applicantJob', JSON.stringify(this.applicantJob))
      window.sessionStorage.setItem('insuranceJob', JSON.stringify(this.insuranceJob))

      //发票
      window.sessionStorage.setItem('checkedInvoice', JSON.stringify(this.checkedInvoice));//发票介质
      window.sessionStorage.setItem('invoiceOption', JSON.stringify(this.invoiceOption));//发票类型
      window.sessionStorage.setItem('businessInvoiceOption', JSON.stringify(this.businessInvoiceOption));//企业发票
      window.sessionStorage.setItem('personalInvoiceOption', JSON.stringify(this.personalInvoiceOption));//个人发票

      if (checkMsgNull(this.minGroupNum) && checkMsgNull(this.maxGroupNum)) {//团险
        window.sessionStorage.setItem('userList', JSON.stringify(this.userList))
        window.sessionStorage.setItem('insureds', JSON.stringify(this.insureds))
        window.sessionStorage.setItem('modifyOrAdd', JSON.stringify(this.modifyOrAdd))
      }
      window.sessionStorage.setItem('addressCode', this.addressCode);
      let ooo = {
        channelCode: this.channelCode,
        orgCode: this.orgCode,
        styleId: this.styleId, // 方案id
        startDate: this.startData2 + " " + this.lastDateString,
        endDate: this.endDate + " " + this.endLastDateString,
        isCustom: true,
        policyHolders: this.policyHolders,
        insureds: this.insureds,
        beneficiary: this.beneficiary,
        addressCode: this.addressCode ? this.addressCode : '',
        urlParam: this.urlParam ? this.urlParam : '',
        reUnderwrite: '',
        renewInsurance: '',
      };
      console.log('ooo---->' + JSON.stringify(ooo));

      this.paramstopay = ooo;
      console.log('clientInfo---->' + JSON.stringify(clientInfo));

      this.$http.post("/sunmc/ordSun/underwritingPolicy", this.paramstopay).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (res.data.data.status == 200) {
            this.sign = res.data.data.msg
            this.generateBaseInfo()
            this.showConfirm()
          } else {
            this.$message.error(res.data.data.msg)
          }
        } else {
          this.$message.error(res.data.data.msg)
        }
      });
    },
    // 将 P920091615004924408 改造成 T920091615004924408 ，然后跟轨迹id进行绑定
    behaviorObjSetOrderNo(orderNo) {
      let num = `T${orderNo.substring(1)}`
      window.sessionStorage.removeItem('tbdh')
      window.sessionStorage.setItem('tbdh', num)
      try {
        _behaviorObj.setorderNo(num, function (data) { })
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
      this.$http.post("/sunmc/ordSun/createPolicy", {
        policy: this.paramstopay,
        sign: this.sign
      }).then(res => {
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
      i.userName = fullName
    },
    // 所属职业选择改变时，更新最新的职业名称和职业代码
    handleJobChange(i, jobArr) {
      let jobName = ''
      let firstJobArr = this.jobSelectOptions
      for (let j = 0; j < firstJobArr.length; j++) {
        if (jobArr[0] == firstJobArr[j].value) {
          let secondJobArr = firstJobArr[j].children
          for (let k = 0; k < secondJobArr.length; k++) {
            if (jobArr[1] == secondJobArr[k].value) {
              let thirdJobArr = secondJobArr[k].children
              for (let h = 0; h < thirdJobArr.length; h++) {
                if (jobArr[2] == thirdJobArr[h].value) {
                  jobName = thirdJobArr[h].label
                }
              }

            }
          }
        }
      }
      i.userName = jobName
      i.userCode = jobArr[2]
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
      }
      return itemObj[itemCode]
    },
    // 根据不同的item.code和item.value展示不同的值
    handleSwitchItemValue(item) {
      var itemObj2 = { 1: '男', 2: '女' }
      var itemObj3 = { 1: '身份证', 2: '居民户口本', 3: '居民护照', 48: '港澳通行证', 99: '其他' }
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
      var itemObj41 = { 2: '电子发票' }
      var itemObj42 = { 1: '个人', 2: '企业' }
      var itemObj47 = { 1: '是', 2: '否' }
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
        "4": "银行卡信息"
      };
      return statusMap[status];
    },
  },
  created() {
    this.handleChannelCodeAndOrgCode()
    this.getDiscount()
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
  background-color: #f5f5f5;
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
  border-bottom: 1px solid #ececec;
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
  color: #bebebe;
  background-color: #f1f1f1;
  float: left;
  margin-left: 195px;
  border-radius: 2px;
  line-height: 26px;
  font-weight: 700;
  border: 0;
}

.process .container .active {
  color: #ffffff;
  background-color: #ff9619;
}

.tbxx-wrap {
}

.tbxx_content {
  width: 1160px;
  margin: 41px 0 100px;
  border: 1px solid #ececec;
  padding: 40px;
}

.tbxx_content .tbxx {
  margin-bottom: 30px;
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
  background-color: #ffa200;
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
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  margin: 0 5px 0 0;
  cursor: pointer;
  padding: 0 20px;
  position: relative;
}

.td_ul li.active {
  color: #ffffff;
  border: 1px solid #ffa200;
  background-color: #ff9c00;
}

.prdStyles-wrap {
  overflow: hidden;
  margin: 20px 20px 50px;
}

.prdStyles-wrap .name {
  float: left;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #efefef;
}
.prdStyles-wrap .name .type {
  color: #ff8a00;
}

.prdStyles-wrap .name div {
  height: 36px;
  max-width: 200px;
  line-height: 36px;
  padding: 0 30px;
  color: #999999;
  font-size: 14px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.prdStyles-wrap .name div:nth-child(2n + 1) {
  background-color: #f7f7f7;
}

.prdStyles-wrap .name div:nth-child(1) {
  border-bottom: 1px solid #efefef;
  border-left: 1px solid #ffffff;
  background-color: #ffffff;
}

.prdStyles-wrap .remark {
  float: left;
  cursor: pointer;
  border-bottom: 1px solid #efefef;
}

.prdStyles-wrap .remark.on {
  border: 2px solid #ff9600;
  box-shadow: 0px 2px 8px 0px rgba(255, 150, 0, 0.35);
}

.prdStyles-wrap .remark.on div {
  color: #ff9600;
}

.prdStyles-wrap .remark.on div:nth-child(2) {
  color: #6c6c6c;
}

.prdStyles-wrap .remark.on div:nth-child(1) {
  background-color: #ff9600;
  color: #ffffff;
  border: 2px solid #ff9600;
}

.prdStyles-wrap .remark div {
  height: 36px;
  line-height: 36px;
  padding: 0 54px;
  color: #6c6c6c;
  font-size: 14px;
  text-align: center;
  border-right: 2px solid #fff;
}

.prdStyles-wrap .remark div:nth-child(1) {
  position: relative;
  font-weight: 700;
  border: 2px solid #efefef;
}

.prdStyles-wrap .remark div:nth-child(2n + 1) {
  background-color: #f7f7f7;
}

.select-box {
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  color: #444;
  cursor: pointer;
  width: 200px;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  padding-left: 10px;
  /*清楚默认样式*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("../../assets/proToubaoxinxiPC/an-xl.png") no-repeat 170px
    center transparent;
}

/*清楚ie下的默认样式*/
select::-ms-expand {
  display: none;
}

.tbxx_input {
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  outline: none;
  height: 36px;
  line-height: 36px;
  color: #606266;
  font-size: 16px;
  vertical-align: middle;
  width: 200px;
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
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.calculate_info .calculate_wrap {
  width: 500px;
  height: 60px;
  margin: 0 auto;
  background-color: #ffa200;
  border-radius: 2px;
  line-height: 60px;
}

.calculate_info .fl {
  font-size: 20px;
  color: #ffffff;
  float: left;
  font-weight: 700;
  padding-left: 30px;
}
.calculate_info .fl .oldPrice {
  text-decoration: line-through;
  color: #666;
  font-weight: 400;
  font-size: 16px;
}

.calculate_info .fr {
  float: right;
  width: 110px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin-top: 12px;
  color: #ffa200;
  background-color: #ffffff;
  border-radius: 2px;
  margin-right: 20px;
  font-weight: 700;
}

.calculate_info .fr:hover {
  background-color: #fff8e0;
}

.calculate_info .calculate_wrap .previous {
  font-size: 12px;
  color: #ffffff;
  float: right;
  margin-right: 20px;
  cursor: pointer;
}

.checkbox,
.checkbox-checked {
  display: inline-block;
  height: 16px;
  width: 16px;
  vertical-align: -2px;
  cursor: pointer;
}

.checkbox {
  background: transparent url(../../assets/proToubaoxinxiPC/xz-fx2.png)
    no-repeat 0 0px;
}

.checkbox-checked {
  background: transparent url(../../assets/proToubaoxinxiPC/xz-fx1.png)
    no-repeat 0 0px;
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
  border: 1px solid #d7d7d7;
}

>>> .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
  width: 200px !important;
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
  border: 1px solid #d7d7d7;
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
  width: 300px;
  line-height: 36px;
}

.bottom_wrap {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  overflow: hidden;
  border-top: 1px solid #e1e1e1;
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
}

.tb_footer {
  line-height: 60px;
  width: 500px;
  margin: 0 auto;
  height: 60px;
  color: #ffffff;
  background-color: #ffa200;
  font-size: 20px;
  border-radius: 2px;
  font-weight: 700;
}

.tb_footer > span {
  padding-left: 30px;
  float: left;
}
.tb_footer > span .oldPrice {
  font-size: 16px;
  text-decoration: line-through;
  color: #666;
  font-weight: 400;
}

.tb_footer a {
  margin-top: 12px;
  height: 36px;
  font-size: 16px;
  text-align: center;
  line-height: 36px;
  font-weight: 700;
  border-radius: 2px;
  margin-right: 20px;
  color: #ffa200;
  background-color: #ffffff;
  float: right;
  width: 100px;
}

.tb_footer a:nth-child(2) {
  width: 150px;
}

.tb_footer a:hover {
  background-color: #fff8e0;
}

.active {
  background-color: #ff9600;
  color: #ffffff;
  border: 1px solid #ff9600;
}

.prd-introduce {
  width: 1000px;
  overflow: hidden;
  border: 2px solid #ffa200;
  border-radius: 2px;
  padding: 10px 20px;
  margin: 20px auto 30px;
}

.prd-introduce .prd-introduce-title {
  overflow: hidden;
}

.prd-introduce .prd-introduce-title span {
  float: left;
  color: #999999;
  font-size: 14px;
  width: 318px;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px dashed #c9c9c9;
}

.prd-introduce .prd-introduce-title span:nth-child(3) {
  text-align: right;
}

.prd-introduce .content {
  overflow: hidden;
}

.prd-introduce .content span {
  float: left;
  color: #6c6c6c;
  font-size: 14px;
  width: 318px;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px dashed #c9c9c9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.prd-introduce .content span:nth-child(3) {
  color: #ffa200;
  text-align: right;
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
  color: #ffa200;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #cdd0d5;
  font-size: 14px;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cdd0d5;
  font-size: 14px;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cdd0d5;
  font-size: 14px;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
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
.insures-wrap table tr {
}
.insures-wrap table tr th {
  color: #999999;
  font-size: 14px;
  font-weight: 400;
}
.insures-wrap table tr td {
}

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
  height: 40px;
  color: #ff8a00;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: #f4f4f4;
  border-radius: 2px;
}
.modify-add-insuredInfo-wrap .content {
  width: 400px;
  margin: 20px auto;
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
  background-color: #cecece;
  color: #ffffff;
  cursor: pointer;
  border-radius: 2px;
}
.modify-add-insuredInfo-wrap .bottom div:nth-child(2) {
  background: #ff8a00;
}
.modify-span {
  font-size: 14px;
  color: #ff8a00;
  padding-right: 5px;
  cursor: pointer;
}
.delete-span {
  font-size: 14px;
  color: #ff4444;
  cursor: pointer;
}
>>> .itemCheckbox {
  height: 50px;
  line-height: 50px;
}
</style>
