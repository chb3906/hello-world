<template>
  <div>
    <!-- 雇员填写信息弹框 开始-->
    <div class="blackBg" v-show="showBeibaoren"></div>
    <div class="modify-add-insuredInfo-wrap" v-show="showBeibaoren">
      <div class="insure-title">{{ updateBbrInfoPopFlag ? '修改':'添加' }}雇员信息</div>
      <div class="content">
        <table class="tbxx_table">
          <tr v-for="(w,index) in bbrInfoPop.otherOptionitems" :key="index+'group-items-info'">
            <td class="first_td"> {{w.itemName}}：</td>
            <td>
              <!--姓名-->
              <input type="text" class="tbxx_input" v-if="!w.isHasOption && w.itemCode == 1" placeholder="请输入姓名" v-model="w.userName" @blur="onBbrInfoPopCheck(w)" maxlength="30" @click="onSensors('PC-填单页-填写雇员姓名', $event)">
              <!--证件类型-->
              <select :key="index+'group--index'" v-else-if="w.isHasOption &&  w.itemCode == 3" class="select-box" v-model="w.userName" @change="onSensors('PC-填单页-选择雇员证件类型', $event)">
                <option v-for="itemy in w.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
              </select>
              <!--证件号码-->
              <input type="text" class="tbxx_input" v-else-if="w.itemCode == 4" placeholder="请输入证件号码" v-model="w.userName" maxlength="18" @blur="onBbrInfoPopCheck(w), onZjhm(w)" @click="onSensors('PC-填单页-填写雇员证件号码', $event)">
              <!--职业类别-->
              <el-cascader v-else-if="w.itemCode == 34 || w.itemCode == 9" :options="jobTypeOptions" placeholder="请选择职业类别" v-model="jobTypeUserNameArr" separator=" " :show-all-levels="false" @change="handleJobTypeChange()"></el-cascader>
              <!-- 其他 -->
              <input type="text" class="tbxx_input" v-else :placeholder="'请输入' + w.itemName" v-model="w.userName" @blur="onBbrInfoPopCheck(w)" maxlength="30">
            </td>
          </tr>
        </table>
      </div>
      <div class="bottom">
        <div @click="cancelBeibaoren()">取消</div>
        <div @click="confirmBeibaoren()">确定</div>
      </div>
    </div>
    <!-- 被保人填写信息弹框 结束-->
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
          <!--基本信息-->
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'page'">
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico06.png" alt="">基本信息</div>
              <table class="tbxx_table">
                <!--保险期间-->
                <tr v-for='item in typeData' :key='item.name' v-if="item.name == '保险期间' && item.entries.length > 0">
                  <td class="first_td">{{item.name}}：</td>
                  <td>
                    <select v-model="item.selectValue" @change="handleClick(item)" class="select-box">
                      <option v-for="items in item.entries" :key="items.value" :value="items.id">{{items.value}}</option>
                    </select>
                    <span class="redStar">*</span>
                  </td>
                </tr>
                <!--起保日期和终保日期-->
                <tr>
                  <td class="first_td"> 起保日期：</td>
                  <td>
                    <el-date-picker class="inputP" :default-value="startDefaultValue" v-model="dataValue" type="date" placeholder="选择起保日期时间" :pickerOptions='pickerOptions' :prefix-icon='icon' value-format="yyyy-MM-dd" @change='changeStartTime'></el-date-picker>
                    零时起 至
                    <span>{{ endDate }}</span> 二十四时止
                    <span class="redStar">*</span>
                  </td>
                </tr>
                <!--年龄-->
                <tr v-for='item in typeData' :key='item.name' v-if="item.name == '年龄' && item.entries.length > 0">
                  <td class="first_td">{{item.name}}：</td>
                  <td v-if="item.entries.length > 1">
                    <select v-model="item.selectValue" @change="handleClick(item)" class="select-box">
                      <option v-for="items in item.entries" :key="items.value" :value="items.id">{{items.value}}</option>
                    </select>
                    <span class="redStar">*</span>
                  </td>
                  <td v-else-if="item.entries.length == 1">
                    <span>{{item.entries[0].value}}</span>
                  </td>
                </tr>
                <!--职业类别-->
                <tr v-for='item in typeData' :key='item.name' v-if="item.name == '职业类别' && item.entries.length > 0">
                  <td class="first_td">{{item.name}}：</td>
                  <td>
                    <!-- <div>
                      <select v-model="item.selectValue" @change="handleClick(item)" class="select-box">
                        <option v-for="items in item.entries" :key="items.value" :value="items.id">{{items.value}}</option>
                      </select>
                    </div> -->
                    <a :href="item.content" v-for="(item,q) in pagedata.insurances" :class="'aIndex'+q" v-if="item.type == 8" :key="q" style="color: #FF6C00">请点击查看《{{item.title}}》</a>
                  </td>
                </tr>
                <!--是否加购扩展24小时意外险-->
                <tr v-for='item in typeData' :key='item.name' v-if="item.name == '是否加购扩展24小时意外险' && item.entries.length > 0">
                  <td class="first_td">{{item.name}}：</td>
                  <td>
                    <div>
                      <select v-model="item.selectValue" @change="handleClick(item)" class="select-box">
                        <option v-for="items in item.entries" :key="items.value" :value="items.id">{{items.value}}</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </table>

              <!--方案比较-->
              <div class="prdStyles-wrap">
                <!-- <div class="name">
                  <div></div>
                  <div>保障类型</div>
                  <div class="type" v-for="(prdDuty,index) in btnlist[0].prdDutys" :key="index + 'prdDuty'" :title="prdDuty.dutyType ">{{ (index == 0 ||(index != 0 && prdDuty.dutyType != (btnlist[0].prdDutys)[index-1].dutyType)) ? prdDuty.dutyType : '' }}</div>
                </div> -->
                <div class="name">
                  <div></div>
                  <div>保障范围</div>
                  <div v-for="(prdDuty, index) in btnlist[0].prdDutys" :title="prdDuty.name + '\n' + prdDuty.value " :key="index + 'bzfw'">
                    <img src="../../assets/proToubaoxinxiPC/ts1.png" alt="">
                    {{ prdDuty.name }}
                  </div>
                  <!--职业类别-->
                  <div v-for='item in typeData' v-if="item.name == '职业类别' && item.entries.length > 0">
                    <template v-for="subItem in item.entries" v-if="subItem.isDefault == true">
                      {{subItem.value + '职业保费'}}
                    </template>
                  </div>
                </div>
                <div class="remark" :class="{on:i.prdItemId == prdmcShop.prdItemId}" v-for="(i,indexA) of btnlist" :key="indexA" @click="handletype(i)">
                  <div>{{ i.styleName }}<img v-show="i.prdItemId == prdmcShop.prdItemId" style="position: absolute;top: 0;right: 0;" src="../../assets/proToubaoxinxiPC/jbdh.png" /></div>
                  <div>保额</div>
                  <div v-for="(prdDuty, indexB) in i.prdDutys" :key="indexB + 'prdDutys'" v-if="prdDuty.name != '扩展24小时意外(可加购)'">{{ prdDuty.remark }}</div>
                  <!-- <div class="age-wrap" v-for="(item, indexAge) in typeData" :key="indexAge + 'age'" v-if="item.name == '年龄'" v-show="i.prdItemId == prdmcShop.prdItemId">
                    <span v-for="(haha,index) in item.entries" :key="index" style="color: #999999;">({{ haha.value }})</span>
                  </div> -->
                  <template v-for='item in typeData'>
                    <template v-if="item.name == '是否加购扩展24小时意外险'">
                      <template v-for="itemSub in item.entries">
                        <template v-if="itemSub.id == item.selectValue">
                          <template v-if="itemSub.value == '否'">
                            <div>
                              <img src="../../assets/proToubaoxinxiPC/xz-fx2.png">
                            </div>
                          </template>
                          <template v-else-if="itemSub.value == '是'">
                            <div>
                              <img src="../../assets/proToubaoxinxiPC/xz-fx1.png">
                            </div>
                          </template>
                        </template>
                      </template>
                    </template>
                  </template>
                  <div class="age-wrap" v-for="(item, indexAge) in typeData" :key="indexAge + '元'" v-if="item.name == '年龄'" v-show="i.prdItemId == prdmcShop.prdItemId">
                    <span v-for="(haha,index) in item.entries" :key="index" style="color: #999999;"><span style="color: #FF8A00;font-weight: 700;">{{prdmcShop.price}}</span>元/人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--投保人信息-->
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'qyxx'">
            <div class="tbxx" v-for="(info,index) in page.types" :key="index + 'qyxx'" v-if="info.pageType == 1">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico05.png" alt="">
                投保人信息
              </div>
              <table class="tbxx_table">
                <tr v-for="(i) in info.items" :key='i.itemName'>
                  <td class="first_td"> {{i.itemName}}：</td>
                  <td>
                    <!--姓名-->
                    <div v-if="i.itemCode == 1">
                      <input type="text" class="tbxx_input" v-model="i.userName" placeholder="请输入姓名" @blur="handleCommonCheck(i,info.pageType)" @click="onSensors('PC-填单页-填写投保人姓名', $event)">
                      <span class="redStar">*</span>
                    </div>
                    <!--证件类型-->
                    <select v-else-if="i.isHasOption && i.itemCode == 3" :key="index+'Selected'" class="select-box" v-model="i.userName" @change="onSensors('PC-填单页-选择投保人证件类型', $event)">
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--证件编号-->
                    <div v-else-if="i.itemCode == 4">
                      <input type="text" class="tbxx_input" placeholder="请填写证件号码" v-model="i.userName" @blur="handleCommonCheck(i,info.pageType)" @change="handleCardTypeForGroup(i.itemCode,i.userName)" @click="onSensors('PC-填单页-填写投保人证件号码', $event)">
                      <span class="redStar">*</span>
                    </div>
                    <!--行业类型-->
                    <select v-else-if="i.isHasOption && i.itemCode == 75" :key="index+'Selected'" class="select-box" v-model="i.userName">
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--单位性质-->
                    <select v-else-if="i.isHasOption && i.itemCode == 73" :key="index+'Selected'" class="select-box" v-model="i.userName">
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--注册类型-->
                    <select v-else-if="i.isHasOption && i.itemCode == 74" :key="index+'Selected'" class="select-box" v-model="i.userName">
                      <option v-for="itemy in i.options" :value="itemy.id" :key="itemy.id">{{itemy.name}}</option>
                    </select>
                    <!--联系电话-->
                    <div v-else-if="i.itemCode == 6">
                      <input type="text" class="tbxx_input" placeholder="请填写联系电话" v-model="i.userName" @blur="handleCommonCheck(i,info.pageType)" maxlength="16" @click="onSensors('PC-填单页-填写投保人联系电话', $event)">
                      <span class="redStar">*</span>
                    </div>
                    <!--邮箱-->
                    <div v-else-if="i.itemCode == 7">
                      <input type="text" class="tbxx_input" placeholder="请填写邮箱" v-model="i.userName" @blur="handleCommonCheck(i,info.pageType)" @click="onSensors('PC-填单页-填写邮箱', $event)">
                      <span class="redStar">*</span>
                    </div>
                    <!--所在地区-->
                    <div v-else-if="i.itemCode == 12">
                      <el-cascader :options="citySelectOptions" placeholder="请选择所在地区" v-model="enterpriseArea" separator=" " @change="handleCityChange(i,enterpriseArea)"></el-cascader>
                      <span class="redStar">*</span>
                    </div>
                    <!--详细地址-->
                    <div v-else-if="i.itemCode == 15">
                      <input type="text" class="tbxx_input" placeholder="请填写详细地址" v-model="i.userName" @blur="handleCommonCheck(i,info.pageType)" @click="onSensors('PC-填单页-选择详细地址', $event)">
                      <span class="redStar">*</span>
                    </div>
                    <!--营业执照-->
                    <div v-else-if="i.itemCode == 69" style="position: relative;top: 0;left: 0;">
                      <el-upload class="upload-demo" action="/admin/file/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <div class="upload-license">上传营业执照&gt;&gt;</div>
                      </el-upload>
                      <div class="upload-explain">支持上传JPG、PNG格式图片 ( 5M以内 )</div>
                    </div>
                  </td>
                </tr>
                <tr v-show="uploadBusinessLicenseFlag">
                  <td></td>
                  <td>
                    <div class="license-img">
                      <div class="img-wrap">
                        <img :src="businessLicenseImgUrl" alt="">
                        <!-- <object v-else :data="businessLicenseImgUrl" type="application/pdf" width="100%" height="100%">
                          <embed :src="businessLicenseImgUrl" type="application/pdf">
                          <p>这个页面不支持PDF，请下载查看: <a :href="businessLicenseImgUrl">下载PDF</a>.</p>
                          </embed>
                        </object> -->
                      </div>
                      <div class="btn">
                        <el-upload class="upload-demo" action="/admin/file/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                          <span>修改</span>
                        </el-upload>
                        <span @click="deletenBusinessLicense">删除</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!--被保险人信息-->
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'qylxr'">
            <div class="tbxx" v-for="(info,index) in page.types" :key="index + 'qylxr'" v-if="info.pageType == 2">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">被保险人信息
              </div>
              <table class="tbxx_table">
                <tr>
                  <td class="first_td"> 被保险人：</td>
                  <td>
                    <div>同投保人</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!--雇员信息-->
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'bbrxx'">
            <div class="tbxx" v-for="(info,index) in page.types" :key="index" v-if="info.pageType == 5">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">雇员信息
                <div class="addInfo-wrap">
                  <span @click="addBeibaorenInfo">逐个添加雇员信息<img src="../../assets/proToubaoxinxiPC/an-tj.png" alt=""></span>
                  <!-- <span @click="exportClick">下载模板<img src="../../assets/proToubaoxinxiPC/an-xz.png" alt=""></span> -->
                  <span v-show="minEmployeesNum > 1 && maxEmployeesNum > 1"><a href="../../../static/雇员信息录入Excel模板.xlsx" style="color: #fff;">下载模板<img src="../../assets/proToubaoxinxiPC/an-xz.png" alt=""> </a></span>
                  <!--批量上传信息-->
                  <input-excel @getResult="getMyExcelData" v-show="minEmployeesNum > 1 && maxEmployeesNum > 1"></input-excel>
                </div>
              </div>
              <div>
                <table class="insures-table" v-show="bbrInfoPopList.length >0">
                  <tr>
                    <th>编号</th>
                    <template v-for="(item, index) in bbrInfoPop.otherOptionitems">
                      <th :key="index+ 'th'">{{item.itemName}}</th>
                    </template>
                    <th>职业类别</th>
                    <th>保费</th>
                    <th>操作</th>
                  </tr>
                  <tr v-for="(item,index) in dataShow" :key="index + 'tr'">
                    <td>{{ index + 1 + ((currentPage - 1) * pageSize) }}</td>
                    <td v-for="(subItem, subIndex) in item.otherOptionitems" :key="subIndex + 'td'">{{ subItem | handleSwitchItemValue }}</td>
                    <td>{{item.jobType}}</td>
                    <td>{{item.premium}}元</td>
                    <td><span class="modify-span" @click="modifyBeibaorenInfo(index + ((currentPage - 1) * pageSize))">修改</span><span class="delete-span" @click='deleteBeibaorenInfo(index + ((currentPage - 1) * pageSize))'>删除</span></td>
                  </tr>
                </table>
                <div class="fenye" v-show="bbrInfoPopList.length > 10">
                  <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="bbrInfoPopList.length">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
          <!--受益人-->
          <div class="tbxx_content" v-for="(page,i) in pagedata.page" :key="i+'syr'">
            <div class="tbxx">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">
                受益人
              </div>
              <table class="tbxx_table">
                <tr>
                  <td class="first_td"> 受益人：</td>
                  <td>
                    <div>法定</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!--投保声明-->
          <div class="tbxx_content">
            <div class="tiaokuan-span-box">
              <div>
                <label :class="{checkbox:!checkedFlag, 'checkbox-checked':checkedFlag}" @click="chenge"></label>
                我已阅读并同意
                <a href="javascript:void(0)" v-for="(item,q) in pagedata.insurances" :class="'aIndex'+q" @click="openAlertBox(item)" v-if="(item.type == 1 || item.type == 3 || item.type == 5  || item.type == 7) && item.title != '行业分类表'" :key="q" style="color: #FF6C00">《{{item.title}}》</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--底部保费固定展示区域-->
      <div class="calculate_info">
        <div class="calculate_wrap">
          <div class="cost-wrap">
            <span class="title">保费：¥</span>
            <span class="value">{{money}}</span>
          </div>
          <div class="age-wrap">
            <span>共{{ bbrInfoPopList.length }}人</span>
          </div>
          <!-- <div class="age-wrap" v-for="(item, indexAge) in typeData" :key="indexAge + 'age'" v-if="item.name == '年龄'">
            <span v-for="(haha,index) in item.entries" :key="index">{{ haha.value }}<span style="font-weight: 700;">{{prdmcShop.price}}</span>元/人</span>
          </div> -->
          <div class="arrow-wrap">
            <span class="previous" @click="gotoIndex(),onSensors('PC-填单页-点击上一步', $event)">&lt;上一步</span>
            <span class="next" @click="gotoConfirm(),onSensors('PC-填单页-点击下一步', $event)">下一步</span>
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
          <div class="tbxx_content">
            <!--基本信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico06.png" alt="">基本信息</div>
              <div class="tb_table">
                <div class="tb_table_item" v-for="(item,i) in baseInfo" :key="i" v-if="item.name != '保额' && item.name != '年龄'">
                  <div class="title">{{item.name}}：</div>

                  <div class="content" v-if="item.name == '职业类别'">
                    <a :href="item.content" v-for="(item,q) in pagedata.insurances" :class="'aIndex'+q" v-if="item.type == 8" :key="q" style="color: #FF6C00">请点击查看《{{item.title}}》</a>
                  </div>
                  <div class="content" v-else>{{item.value}}</div>
                </div>
                <div class="tb_table_item">
                  <div class="title">起保日期：</div>
                  <div class="content">{{dataValue}} 零时起 至 {{endDate}} 二十四时 止</div>
                </div>
              </div>
            </div>
            <!--方案介绍信息-->
            <div class="prd-introduce" v-for="(item,index) in btnlist" v-if="item.prdItemId == currentItemId">
              <div class="title">
                <!-- <span>保障类型</!-->
                <span>保障范围</span>
                <span>保额/人</span>
              </div>
              <div class="content" v-for="(prd,i) in item.prdDutys" v-if="prd.name != '扩展24小时意外(可加购)'">
                <!-- <span :title="prd.dutyType">{{ (i == 0 ||(i != 0 && prd.dutyType != (btnlist[index].prdDutys)[i-1].dutyType)) ? prd.dutyType : '' }}</span> -->
                <span :title="prd.name + '\n' + prd.value">{{ prd.name }}</span>
                <span>{{ prd.remark }}</span>
              </div>
              <div class="content" v-for="(prd,i) in item.prdDutys" v-if="prd.name == '扩展24小时意外(可加购)'">
                <!-- <span :title="prd.dutyType">{{ (i == 0 ||(i != 0 && prd.dutyType != (btnlist[index].prdDutys)[i-1].dutyType)) ? prd.dutyType : '' }}</span> -->
                <span :title="prd.name + '\n' + prd.value">{{ prd.name }}</span>
                <span>
                  <template v-for='item in typeData'>
                    <template v-if="item.name == '是否加购扩展24小时意外险'">
                      <template v-for="itemSub in item.entries">
                        <template v-if="itemSub.id == item.selectValue">
                          <template v-if="itemSub.value == '否'">
                            <img src="../../assets/proToubaoxinxiPC/xz-fx2.png">
                          </template>
                          <template v-else-if="itemSub.value == '是'">
                            <img src="../../assets/proToubaoxinxiPC/xz-fx1.png">
                          </template>
                        </template>
                      </template>
                    </template>
                  </template>
                </span>
              </div>
            </div>
            <!--投保人信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico05.png" alt="">投保人信息</div>
              <div class="tb_table">
                <template v-for="(page) in pagedata.page">
                  <template v-for="(info) in page.types" v-if="info.pageType == 1">
                    <template v-for="(item, index) in info.items" v-if="item.itemCode != '69'">
                      <div class="tb_table_item" :key="index">
                        <div class="title">{{ item.itemName }}：</div>
                        <div class="content">{{ item | handleSwitchItemValue }}</div>
                      </div>
                    </template>
                  </template>
                </template>
              </div>
            </div>
            <!--被保险人信息-->
            <div class="tbxx">
              <div class="title">
                <img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">被保险人信息
              </div>
              <div class="tb_table">
                <div class="tb_table_item">
                  <div class="title">被保险人：</div>
                  <div class="content">同投保人</div>
                </div>
              </div>
            </div>
            <!--雇员信息展示-->
            <div class="tbxx">
              <div class="title"><img src="../../assets/proToubaoxinxiPC/ico04.png" alt="">雇员信息</div>
              <table class="insures-table" v-show="bbrInfoPopList.length >0">
                <tr>
                  <th>编号</th>
                  <template v-for="(item, index) in bbrInfoPop.otherOptionitems">
                    <th :key="index+ 'th'">{{item.itemName}}</th>
                  </template>
                  <th>保费</th>
                </tr>
                <tr v-for="(item,index) in dataShow" :key="index + 'tr'">
                  <td>{{ index + 1 + ((currentPage - 1) * pageSize) }}</td>
                  <td v-for="(subItem, subIndex) in item.otherOptionitems" :key="subIndex + 'td'">{{ subItem | handleSwitchItemValue }}</td>
                  <td>{{item.premium}}元</td>
                </tr>
              </table>
              <div class="fenye" v-show="bbrInfoPopList.length > 10">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="bbrInfoPopList.length">
                </el-pagination>
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
      <!--底部保费固定展示区域-->
      <div class="calculate_info">
        <div class="calculate_wrap">
          <div class="cost-wrap">
            <span class="title">保费：¥</span>
            <span class="value">{{money}}</span>
          </div>
          <div class="age-wrap">
            <span>共{{ bbrInfoPopList.length }}人</span>
          </div>
          <div class="arrow-wrap">
            <span class="previous" @click="closeConfirm(),onSensors('PC-填单页-点击返回修改', $event)">&lt;返回修改</span>
            <span class="next" @click="gotoPay(),onSensors('PC-填单页-点击确认无误，购买', $event)">确认无误，购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cityData from "./cityForPC.json"
import jobTypeOptions from './1-5job.json'
import jobData from "./jobPC.json"
import Jquery from 'jquery'
import AlertBox from './common/AlertBox.vue'
import TiaokuanAlertBox from './common/TiaokuanAlertBox.vue'
import inputExcel from '../../components/commons/uploadExcel.vue'
import XLSX from 'xlsx'

export default {
  name: "ProPCForEmployer",
  components: {
    AlertBox,
    TiaokuanAlertBox,
    inputExcel
  },
  data() {
    return {
      cityData: {},
      createPolicySign: '',
      insuredInfos: [],
      jobTypePremiumArr: [],// 每个职业类别对应当前报价因子的价格
      userSign: '',// 用户标识
      totalPage: [],// 所有页面的数据
      pageSize: 10,// 每页显示数量
      pageNum: 1,// 共几页
      dataShow: "",// 当前显示的数据
      currentPage: 1,// 默认当前显示第一页
      linkmanId: "", //常用联系人 id
      qyxxsm: {// 企业信息说明
        title: '企业信息说明',
        content: '投保人应为对被保险人有保险利益的机关、企业、事业单位和社会团体。比如为其员工投保、与保险公司签订合同、并支付保险费的企业。'
      },
      syrsm: {// 受益人说明
        title: '受益人说明',
        content: '身故受益人是指保险合同中由被保险人或者投保人指定的享有保险金请求权的人。网上投保由于身故受益人指定无法得到被保险人的书面确认，因此只接受法定继承人作为身故受益人，法定继承人指法律直接规定可以依法继承被保险人遗产的公民，保险金按照《继承法》中的继承顺序及比例分配。'
      },
      updateBbrInfoPopFlag: false,
      updateBbrInfoPopIndex: '',
      bbrPopIndex: 0, // 与投保人关系当前索引
      bbrInfoPop: {},
      bbrInfoPopList: [],
      uploadBusinessLicenseFlag: false,// 是否已上传营业执照的标识
      businessLicenseImgUrl: '',// 营业执照图片地址
      // showPDF: false,
      randomNumber: null,//随机数
      itemId: this.$route.query.id, // 支付参数 itemid
      channelCode: this.$route.query.channelCode, //渠道code
      channelName: window.sessionStorage.getItem('channelName'),
      orgCode: this.$route.query.orgCode,//机构code
      productStartDate: '',//后台配置的起保日期
      lastDateString: '00:00:00',
      endLastDateString: '23:59:59',
      enterpriseArea: [],// 企业所在地区
      citySelectOptions: {},
      jobTypeOptions: {},
      jobTypeUserNameArr: [],
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
      pagecenters: [], //条款须知集合数组
      insurednmb: 1, //被保人数量
      dayCount: null,// 保险期间天数
      giveInsurance: null,// 是否为赠险 0是 1否
      isSharedPremium: '',//是否共享保额保费 0共享 1不共享
      maxEmployeesNum: null, // 雇员最大人数
      minEmployeesNum: null, // 雇员最小人数
      maxGroupNum: null, // 被保人最大人数
      minGroupNum: null, // 被保人最小人数

      startDefaultValue: '',// 默认展示的起保日期
      dataValue: null, // 起保日期
      rangeDay: null,// 起保日期可选范围（天）
      startDateRange: '',
      startDate: "",
      endDate: "",
      guyuanInfos: [], //雇员items数组

      btnlist: [],// 方案数组prdStyleSpecification
      prdmcShop: {}, // 确认投保数据
      currentItemId: '', // 当前方案明细id
      currentStyleId: '',// 方案id
      typeData: [], // 某一个方案的数据明细prdSpecificationCalcs
      itemData: {},
      entries: [],// 某一项的明细数组
      jobTypeEntries: [],// 职业类别明细数组
      upParams: {},

      paramsTopay: {}, // 立即支付的参数
      policyHolders: [], // 投保人信息
      insureds: [], // 被保人信息
      employees: [], //雇员信息
      beneficiary: [], // 受益人信息

      baseInfo: [],// 用户所选产品方案相关信息
      addressCode: '',// 最低级的地区code

      showBeibaoren: false,// 是否展示添加或修改被保人弹框标志
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
    }
  },
  computed: {
    money() {
      let total = 0
      for (let i = 0; i < this.bbrInfoPopList.length; i++) {
        total += Number(this.bbrInfoPopList[i].premium)
      }
      return total.toFixed(2)
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
    handleCardTypeForGroup(itemCode, userName) {

      let tbrCardTypeGlobal = ''
      for (var i = 0; i < this.pagedata.page.length; i++) {
        for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
          var z = this.pagedata.page[i].types[j];
          if (z.pageType == 1) {//投保人
            for (var k = 0; k < z.items.length; k++) {
              if (z.items[k].itemCode == 3) {
                tbrCardTypeGlobal = z.items[k].userName
              }
            }
          }
        }
      }

      if (itemCode == '4') {//证件编号变化时
        if (userName != "" && userName != null && userName != undefined) {
          if (tbrCardTypeGlobal == "8") {//组织机构代码
            var orgCodeReg = /^[\w\d-]+$/i;//匹配数字、字母及中划线
            var result = orgCodeReg.test(userName);
            if (!result) {
              this.$message.error('组织机构代码证件编码不能为非法字符和中文')
              return;
            }
          } else if (tbrCardTypeGlobal == '9') {//统一社会信用代码
            var codeReg = /^([0-9A-Z]{2})([0-9]{6})([0-9A-Z]{8})([0-9X])([0-9A-Z])$/;
            var result = codeReg.test(userName);
            if (!result) {
              this.$message.error('统一社会信用代码格式不正确')
              return;
            }
          }
          if (tbrCardTypeGlobal == 8 || tbrCardTypeGlobal == 9) {
            this.$http.post('/sunmc/microShopCIFFacade/microShopCIFDubboFacade', {
              cardType: tbrCardTypeGlobal,
              cardCode: userName
            }).then(res => {
              if (res.data.code == 200) {
                let list = res.data.data;
                if (list.length > 0) {
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
                }
              } else {
                // this.$message.error(res.data.msg);
                console.log(red.data.msg)
                return;
              }
            }).catch(e => {
              console.log(e)
              return;
            });
          }
        }
      }
    },
    getCityData() {
      this.$http.get('admin/sunEcDcompany/getPcCityJson').then(res => {
        console.log(res.data)
        this.cityData = res.data
        this.getSpecification()
      })
    },
    onGoTop() {
      let docObj = document.documentElement || document.body
      docObj.scrollTop = 0
    },
    isAgeInArea(IDNo) {
      let age = GetAge(IDNo, this.dataValue, 1)
      let day = GetDay(IDNo, this.dataValue, 1)
      let isContentAge = false
      for (let j = 0; j < this.entries.length; j++) {
        if (isContent(this.entries[j].value, age, day)) {
          isContentAge = true
        }
      }
      return isContentAge
    },

    onAllJobTypePremium() {
      this.jobTypeEntries
      let upParamsCopy = JSON.parse(JSON.stringify(this.upParams))
      if (this.jobTypeEntries.length > 0) {
        for (let i = 0; i < this.jobTypeEntries.length; i++) {
          for (let j = 0; j < upParamsCopy.calcIdKeys.length; j++) {
            if (upParamsCopy.calcIdKeys[j] == this.jobTypeEntries[i].value) {
              upParamsCopy.calcIds[j] = this.jobTypeEntries[i].id
              // 请求最新的产品报价测算价格
              this.$http.post("/prdmc/prdmcShop/productCalc", {
                styleId: upParamsCopy.styleId,
                calcIds: upParamsCopy.calcIds
              }).then(res => {
                if (res.data.code == 200) {
                  this.jobTypePremiumArr.push({
                    name: this.jobTypeEntries[i].value,
                    itemId: res.data.data.prdItemId,
                    premium: res.data.data.premium
                  })
                } else {
                  this.$message.error('获取最新报价失败，请稍候重试！')
                }
              })
            }
          }
        }
      }
    },
    onFenye() {
      // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
      this.pageNum = Math.ceil(this.bbrInfoPopList.length / this.pageSize) || 1
      if (this.pageNum < this.currentPage) {
        this.currentPage = this.pageNum
      }
      this.totalPage = []
      for (let i = 0; i < this.pageNum; i++) {
        // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
        // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5(对slice操作来说是0-5)条，第二页是6-10(对slice操作来说是5-10)条...
        this.totalPage[i] = this.bbrInfoPopList.slice(this.pageSize * i, this.pageSize * (i + 1))
      }
      // 当前显示的内容
      this.dataShow = this.totalPage[this.currentPage - 1]
    },
    handleCurrentChange(index) {
      this.currentPage = index
      this.dataShow = this.totalPage[this.currentPage - 1]
    },
    // 判断字符串是否为空
    checkMsgNull(msg) {
      if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
        return true
      } else {
        return false
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
    // 校验手机号和座机号
    checkPhoneNumber(phoneNumber) {
      var regExp1 = /^1[3456789]\d{9}$/
      var regExp2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
      if (regExp1.test(phoneNumber) || regExp2.test(phoneNumber)) {
        return true
      } else {
        return false
      }
    },
    // 校验名称
    checkName(name) {
      var regExp = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}|[a-zA-Z·s]{2,20}$/
      if (regExp.test(name)) {
        return true
      } else {
        return false
      }
    },
    // 函数中的参数分别为 cookie 的名称、值以及过期天数
    // 保存cookie
    setCookie(name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    // 获取cookie
    getCookie(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.businessLicenseImgUrl = res.data.filename
        this.uploadBusinessLicenseFlag = true
        for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
            var z = this.pagedata.page[i].types[j];
            if (z.pageType == 1) {
              for (let k = 0; k < z.items.length; k++) {
                if (z.items[k].itemCode == 69) {
                  z.items[k].userName = this.businessLicenseImgUrl
                }
              }
            }
          }
        }
        // if (res.data.filename.endsWith('.pdf')) {
        //   this.showPDF = true
        // } else {
        //   this.showPDF = false
        // }
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '失败',
          message: '上传失败，请重新上传',
          type: "error",
          duration: 2000
        })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png'
      // const isPDF = file.type === 'application/pdf'
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG && !isPNG) {
        this.$message.error('只能上传JPG和PNG格式的图片!');
      }
      if (!isLt5M) {
        this.$message.error('文件大小不能超过 5MB!');
      }
      if ((isJPG || isPNG) && isLt5M) {
        this.$notify.info({
          title: '消息',
          message: '营业执照上传中...',
          duration: 2000
        })
      }
      return (isJPG || isPNG) && isLt5M;
    },
    deletenBusinessLicense() {
      this.businessLicenseImgUrl = ''
      this.uploadBusinessLicenseFlag = false
      for (var i = 0; i < this.pagedata.page.length; i++) {
          for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
            var z = this.pagedata.page[i].types[j];
            if (z.pageType == 1) {
              for (let k = 0; k < z.items.length; k++) {
                if (z.items[k].itemCode == 69) {
                  z.items[k].userName = ''
                }
              }
            }
          }
        }
    },
    isRepeat(arr) {
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i]]) {
          return true;
        }
        hash[arr[i]] = true;
      }
      return false;
    },
    // 校验导入的excel中的数据是否存在错误
    checkDataForImportExcel(data) {
      if (data.length <= 0) {
        this.$message.error("不能上传空的excel文件");
        return false
      } else {
        if ((data.length + this.bbrInfoPopList.length) > this.maxEmployeesNum) {
          this.$message.error('雇员不能超过' + this.maxEmployeesNum + '人，请删减后重新上传')
          return false
        }
        for (let i = 0; i < data.length; i++) {
          if (!this.checkMsgNull(data[i]['姓名'])) {
            this.$message.error("导入的姓名不能为空，请检查重试");
            return false
          }
          if (!this.checkMsgNull(data[i]['证件类型'])) {
            this.$message.error("导入的证件类型不能为空，请检查重试");
            return false
          }
          if (!this.checkMsgNull(data[i]['证件编号'])) {
            this.$message.error("导入的证件编号不能为空，请检查重试");
            return false
          }
          if (!this.checkMsgNull(data[i]['职业代码'])) {
            this.$message.error("导入的职业代码不能为空，请检查重试");
            return false
          }
          if (!this.checkName(data[i]['姓名'])) {
            this.$message.error("请填写正确的姓名：" + data[i]['姓名']);
            return false
          }
          if (data[i]['证件类型'] != 1) {
            this.$message.error("请填写正确的证件类型：" + data[i]['证件类型']);
            return false
          }
          if (!this.checkIdCard(data[i]['证件编号'])) {
            this.$message.error("请填写正确的证件编号：" + data[i]['证件编号']);
            return false
          }
          let upParamsCopy = JSON.parse(JSON.stringify(this.upParams))
          let age = GetAge(data[i]['证件编号'], this.dataValue, 1)
          let day = GetDay(data[i]['证件编号'], this.dataValue, 1)
          let isContentAge = false
          for (let h = 0; h < this.entries.length; h++) {
            if (isContent(this.entries[h].value, age, day)) {
              isContentAge = true
            }
          }
          if (!isContentAge) {// 雇员年龄不在年龄区间内
            this.$message.error('身份证号为：' + data[i]['证件编号'] + '的雇员年龄不在投保范围内，请重新填写！')
            return false
          }

          // 判断是否有相同的身份证号
          for (let k = 0; k < this.bbrInfoPopList.length; k++) {
            let bbrInfoPopItem = this.bbrInfoPopList[k].otherOptionitems
            for (let j = 0; j < bbrInfoPopItem.length; j++) {
              if (bbrInfoPopItem[j].itemCode == 4) {
                if (bbrInfoPopItem[j].userName == data[i]['证件编号']) {
                  this.$message.error('雇员证件号码不能重复')
                  return false
                }
              }
            }
          }

          let jobObj = this.getJobInfoByJobCode(data[i]['职业代码'])
          if (!this.checkMsgNull(jobObj)) {
            this.$message.error("导入的职业代码存在错误：" + data[i]['职业代码'] + "，请检查重试");
            return false
          }
          let jobTypeUserNameArr = jobObj.jobTypeUserNameArr
          for (let i = 0; i < jobTypeUserNameArr.length; i++) {
            if (!this.checkMsgNull(jobTypeUserNameArr[i])) {
              this.$message.error("请填写正确的职业代码");
              return false
            }
          }
          let jobType = jobObj.jobType
          if (jobType == '拒保') {
            this.$message.error("该职业类别："+jobObj.jobName+" 拒保");
            return false
          }
          if (this.prdName == '金财互联雇主责任险') {
            if (jobType == 6) {
              this.$message.error('不支持投保该职业类别！')
              return
            }
          } else if (this.prdName == '阳光雇主保') {
          }
        }
        let arr = []
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]['证件编号'])
        }
        if (this.isRepeat(arr)) {
          this.$message.error('雇员证件号码不能重复')
          return false
        }
        return true
      }
    },
    calcExcelData(index, data, arr, loading) {
      if (index < data.length) {
        let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
        let obj = {}
        for (let j = 0; j < bbrInfoPopCopy.otherOptionitems.length; j++) {
          let item = bbrInfoPopCopy.otherOptionitems[j]
          if (item.itemCode == 1) { // 姓名
            item.userName = data[index]['姓名']
          } else if (item.itemCode == 3) { // 证件类型
            item.userName = data[index]['证件类型']
          } else if (item.itemCode == 4) { // 证件编号
            item.userName = data[index]['证件编号']
          } else if (item.itemCode == 34 || item.itemCode == 9) { // 职业代码
            obj = this.getJobInfoByJobCode(data[index]['职业代码'])
            item.userName = obj.jobName
            bbrInfoPopCopy.jobType = obj.jobType
            bbrInfoPopCopy.jobCode = data[index]['职业代码'] + ''
            bbrInfoPopCopy.jobTypeUserNameArr = obj.jobTypeUserNameArr
            bbrInfoPopCopy.createdTime = new Date().getTime()
          }
        }
        let jobTypeIdArr = []
        for (let i = 0; i < this.jobTypeEntries.length; i++) {
          jobTypeIdArr[i] = this.jobTypeEntries[i].id
        }
        let upParamsCopy = JSON.parse(JSON.stringify(this.upParams))
        for (let j = 0; j < this.upParams.calcIdKeys.length; j++) {
          if (this.upParams.calcIdKeys[j] == '职业类别') {
            if (this.prdName == '金财互联雇主责任险') {
              if (obj.jobType == 1 || obj.jobType == 2) {// 1-2类
                upParamsCopy.calcIds[j] = jobTypeIdArr[0]
              } else if (obj.jobType == 3) {// 3类
                upParamsCopy.calcIds[j] = jobTypeIdArr[1]
              } else if (obj.jobType == 4) {// 4类
                upParamsCopy.calcIds[j] = jobTypeIdArr[2]
              } else if (obj.jobType == 5) {// 5类
                upParamsCopy.calcIds[j] = jobTypeIdArr[3]
              }
            } else if (this.prdName == '阳光雇主保') {
            }
          }
        }
        // 请求最新的产品报价测算价格
        this.$http.post("/prdmc/prdmcShop/productCalc", {
          styleId: upParamsCopy.styleId,
          calcIds: upParamsCopy.calcIds
        }).then(res => {
          if (res.data.code == 200) {
            bbrInfoPopCopy.premium = res.data.data.price
            bbrInfoPopCopy.itemId = res.data.data.prdItemId
            arr.push(JSON.parse(JSON.stringify(bbrInfoPopCopy)))
            index++
            this.calcExcelData(index, data, arr, loading)
          } else {
            loading.close()
            this.$message.error('导入雇员信息失败，请稍候重试！')
            return
          }
        })
      } else {
        this.bbrInfoPopList = this.bbrInfoPopList.concat(arr)
        this.bbrInfoPopList.sort(function (a, b) {
          return b.createdTime - a.createdTime
        })
        this.onFenye()
        loading.close()
      }
    },
    getMyExcelData(data) {
      // data 为读取的excel数据，在这里进行处理该数据
      console.log(data)
      let dataFilter = []
      for (let i = 0; i < data.length; i++) {
        if (data[i]['姓名'] != undefined || data[i]['证件类型'] != undefined || data[i]['证件编号'] != undefined) {
          dataFilter.push(data[i])
        }
      }
      console.log(dataFilter)
      if (!this.checkDataForImportExcel(dataFilter)) {
        return false
      }
      const loading = this.getLoading('雇员信息导入中，请稍候。。。')
      let index = 0
      let arr = []
      this.calcExcelData(index, dataFilter, arr, loading)
    },
    exportClick() {
      this.export2Excel()
    },
    getLoading(text) {
      return this.$loading({
        lock: false,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader =
          ['姓名', '证件编号', '职业信息'];
        const filterVal = ['name1', 'name2', 'name3'];
        const list = [
          {
            name1: '张明',
            name2: '410522199001295510',
            name3: '4类',
          }
        ]
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '雇员信息录入Excel模板' + (new Date()).Format('yyyyMMddHHmmss'));
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
            if (item.entries.length >= 1) {
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
        this.currentItemId = JSON.parse(window.sessionStorage.getItem('currentItemId'))// 默认方案的明细id
        this.currentStyleId = JSON.parse(window.sessionStorage.getItem('currentStyleId'))// 方案id
        this.calcIds = [];// prdSpecificationCalcs 下面entries中的"isDefault": true的id组成的数组
        this.calcIdKeys = [];// prdSpecificationCalcs下面每一项的name组成的数组
        this.typeData.forEach(z => {
          if (z.name == '年龄') {
            this.entries = z.entries
          } else if (z.name == '职业类别') {
            this.jobTypeEntries = z.entries
          }
          z.entries.forEach(i => {
            if (i.isDefault) {
              this.calcIds.push(i.id);
              this.calcIdKeys.push(z.name);
            }
          });
        });
        this.upParams = {
          styleId: this.currentStyleId,
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
              if (item.entries.length >= 1) {
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
          this.currentItemId = this.btnlist[0].prdItemId;// 默认方案的明细id
          this.currentStyleId = this.btnlist[0].styleId;// 方案id
          this.calcIds = [];// prdSpecificationCalcs 下面entries中的"isDefault": true的id组成的数组
          this.calcIdKeys = [];// prdSpecificationCalcs下面每一项的name组成的数组
          this.typeData.forEach(z => {
            if (z.name == '年龄') {
              this.entries = z.entries
            } else if (z.name == '职业类别') {
              this.jobTypeEntries = z.entries
            }
            z.entries.forEach(i => {
              if (i.isDefault) {
                this.calcIds.push(i.id);
                this.calcIdKeys.push(z.name);
              }
            });
          });
          this.upParams = {
            styleId: this.currentStyleId,
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
        if (this.currentStyleId == this.btnlist[i].styleId) {
          let calcIdsArr = this.upParams.calcIds
          for (let j = 0; j < calcIdsArr.length; j++) {
            if (this.btnlist[i].prdSpecificationCalcs[j].name != '总保额') {
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
      }
    },
    // 生成随机用户标识
    getUserSign() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate();
      if (day < 10) {
        day = '0' + day
      }
      var hour = date.getHours();
      if (hour < 10) {
        hour = '0' + hour
      }
      var minute = date.getMinutes();
      if (minute < 10) {
        minute = '0' + minute
      }
      var second = date.getSeconds();
      if (second < 10) {
        second = '0' + second
      }
      return (year + '').substring(2) + month + day + hour + minute + second + (parseInt(Math.random() * (99999 - 10000)) + 10000)
    },
    getList() {
      this.userSign = this.getUserSign()
      let res = window.sessionStorage.getItem('res');
      let that = this
      if (res && res != '{}') { // 从缓存中拿数据 。。。
        res = JSON.parse(res);
        this.res = res;
        this.globalFlag = true;

        this.productStartDate = window.sessionStorage.getItem('productStartDate')//从缓存中取后台配置的起保日期
        this.itemId = window.sessionStorage.getItem('itemId');
        this.dataValue = window.sessionStorage.getItem('startDate');
        this.endDate = window.sessionStorage.getItem('endDate');
        this.enterpriseArea = JSON.parse(window.sessionStorage.getItem('enterpriseArea'))
        this.bbrInfoPopList = JSON.parse(window.sessionStorage.getItem('bbrInfoPopList'))
        this.onFenye()
        this.businessLicenseImgUrl = window.sessionStorage.getItem('businessLicenseImgUrl')
        if (window.sessionStorage.getItem('uploadBusinessLicenseFlag') == 'true') {
          this.uploadBusinessLicenseFlag = true
        } else if (window.sessionStorage.getItem('uploadBusinessLicenseFlag') == 'false') {
          this.uploadBusinessLicenseFlag = false
        }
        if (window.sessionStorage.getItem('checkedFlag') == 'true') {
          this.checkedFlag = true
        } else if (window.sessionStorage.getItem('checkedFlag') == 'false') {
          this.checkedFlag = false
        }

        this.addressName = window.sessionStorage.getItem('addressName') ? window.sessionStorage.getItem('addressName') : "";
        this.addressCode = window.sessionStorage.getItem('addressCode') ? window.sessionStorage.getItem('addressCode') : "";
        this.insuranceIntervalType = res.data.data.insuranceIntervalType;
        this.takesEffect = res.data.data.takesEffect;
        this.citySelectOptions = this.cityData.content
        // this.citySelectOptions = cityData.content
        this.jobTypeOptions = jobTypeOptions.content
        this.maxDayCount = res.data.data.maxDayCount;
        this.minDayCount = res.data.data.minDayCount;
        this.pagedata = res.data.data; //需要展示的数据
        this.prdCode = res.data.data.prdCode;
        this.paramsTopayid = res.data.data.itemId;
        this.pagecenters = res.data.data.insurances; //协议内容
        this.prdName = res.data.data.prdName; //产品名称
        this.dayCount = res.data.data.dayCount;
        this.giveInsurance = res.data.data.giveInsurance;
        this.rangeDay = res.data.data.rangeDay;

        if (this.checkMsgNull(res.data.data.isSharedPremium)) {
          this.isSharedPremium = res.data.data.isSharedPremium
        } else {
          this.isSharedPremium = 0
        }

        if (this.checkMsgNull(res.data.data.minEmployeesNum) && this.checkMsgNull(res.data.data.maxEmployeesNum)) {
          this.maxEmployeesNum = res.data.data.maxEmployeesNum
          this.minEmployeesNum = res.data.data.minEmployeesNum
        }

        this.employees = JSON.parse(window.sessionStorage.getItem('employees'))

        //设置页面标题
        Jquery(document).find('title').text(this.prdName);

        //判断产品是否下架
        if (res.data.data.productEndDateStr != '' && res.data.data.productEndDateStr != null) {
          //此种写法兼容各浏览器new Date() invalid date问题
          var productEndDate = new Date(res.data.data.productEndDateStr.replace(new RegExp(/-/gm), "/"));
          if (productEndDate.getTime() < new Date().getTime()) {//若产品下架日期小于当前时间,则提示下架
            this.$message.error('该产品已下架！')
          }
        }

        var start_date = new Date(this.dataValue)
        var startDate = 0
        //增加起保日期可后台配置功能,起保日期、结束日期范围需随之而变
        if (this.productStartDate == '' || this.productStartDate == null) {//若后台配置的起保日期为空
          startDate = start_date.getTime() - 3600 * 8 * 1000;//则取默认的起保日期
        } else {
          startDate = new Date(this.productStartDate).getTime() - 3600 * 8 * 1000;//否则就取后台配置的起保日期
        }
        //起保日期可选范围(天)
        if (this.rangeDay == null || this.rangeDay == '') {
          this.rangeDay = 90;
        }
        this.startDateRange = startDate + (this.rangeDay * 3600 * 24 * 1000);

        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime() < startDate || time.getTime() > (that.startDateRange - 1);
          }
        }
        if (this.insuranceIntervalType == 0) {//固定区间：例1年
        } else if (this.insuranceIntervalType == 1) {//间隔区间：例1天-5天
          this.endPickerOptions = {
            disabledDate(time) {
              return (startDate + (that.minDayCount - 1) * 3600 * 24 * 1000) > time.getTime() || time.getTime() > ((startDate - 1) + that.maxDayCount * 3600 * 24 * 1000);
            }
          }
        }

        this.getGuyuanInfos()
        this.getInsuredInfos()
        this.getNewBbrInfoPop()
      } else {
        // 请求接口获取数据
        this.$http.post('/prdmc/prdmcShop/insureData', {// 调获取参保项接口
          itemId: this.currentItemId,// 方案明细id
          orgCode: this.orgCode// 机构编码
        }).then(res => {
          this.res = res
          this.globalFlag = false;

          this.takesEffect = res.data.data.takesEffect;// 保单是否立即生效 0是1否
          this.citySelectOptions = this.cityData.content
          // this.citySelectOptions = cityData.content
          this.jobTypeOptions = jobTypeOptions.content
          this.insuranceIntervalType = res.data.data.insuranceIntervalType;// 保险间隔类型  0固定区间1间隔区间
          this.maxDayCount = res.data.data.maxDayCount;// 保险间隔类型为1间隔区间时，最大保险期间天数
          this.minDayCount = res.data.data.minDayCount;// 保险间隔类型为1间隔区间时，最小保险期间天数
          this.pagedata = res.data.data; //需要展示的数据
          this.prdCode = res.data.data.prdCode;// 产品编码
          this.prdName = res.data.data.prdName; //产品名称
          this.paramsTopayid = res.data.data.itemId;// 方案明细id
          this.pagecenters = res.data.data.insurances; //协议内容，条款集合数组
          this.dayCount = res.data.data.dayCount;// 保险期间天数
          this.giveInsurance = res.data.data.giveInsurance;// 是否为赠险 0是 1否
          this.rangeDay = res.data.data.rangeDay // 起保日期可选范围
          if (this.checkMsgNull(res.data.data.isSharedPremium)) { // 是否共享保费 0共享1不共享
            this.isSharedPremium = res.data.data.isSharedPremium
          } else {
            this.isSharedPremium = 0
          }

          if (this.checkMsgNull(res.data.data.minEmployeesNum) && this.checkMsgNull(res.data.data.maxEmployeesNum)) {
            this.maxEmployeesNum = res.data.data.maxEmployeesNum
            this.minEmployeesNum = res.data.data.minEmployeesNum
          }

          //设置页面标题
          Jquery(document).find('title').text(this.prdName);

          //判断产品是否下架
          if (res.data.data.productEndDateStr != '' && res.data.data.productEndDateStr != null) {
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(res.data.data.productEndDateStr.replace(new RegExp(/-/gm), "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//若产品下架日期小于当前时间,则提示下架
              this.$message.error('该产品已下架！')
            }
          }

          var defDate = new Date();
          this.startDefaultValue = defDate.Format('yyyy-MM-dd');// 设置起保日期默认选中日期，当前value为空时有效
          defDate.setDate(defDate.getDate() + 1) //下一天开始

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

          //若延迟生效天数不为空,则起保日期=所选的起保日期+起保日期生效延迟天数
          if (res.data.data.startEffDelayDays != '' && res.data.data.startEffDelayDays != null) {
            var delayDays = res.data.data.startEffDelayDays * 3600 * 24 * 1000;
            var timeStamp = new Date(this.dataValue).getTime() + delayDays;
            this.dataValue = formatDateTime(timeStamp);//加上生效延迟天数的时间戳再转日期
          }

          //起保日期可选范围（天）
          var dataValue = new Date(this.dataValue).getTime() - 3600 * 8 * 1000;//起保日期减去8小时
          if (this.rangeDay == null || this.rangeDay == '') {
            this.rangeDay = 90;
          }
          this.startDateRange = dataValue + (this.rangeDay * 3600 * 24 * 1000);

          if (this.insuranceIntervalType == 0) {//固定区间：例1年
            var start_date = new Date(this.dataValue);
            var end_date = new Date(this.dataValue);
            if (this.dayCount > 300) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
              end_date = new Date((Number(this.dataValue.split('-')[0]) + 1) + '-' + this.dataValue.split('-')[1] + '-' + this.dataValue.split('-')[2])
              end_date.setDate(start_date.getDate() - 1)
              end_date = end_date.Format("yyyy-MM-dd");
            } else {
              end_date.setDate(start_date.getDate() + this.dayCount - 1)
              end_date = end_date.Format("yyyy-MM-dd");
            }
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

          this.getGuyuanInfos()
          this.getInsuredInfos()
          this.getNewBbrInfoPop()
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
      if (this.insuranceIntervalType == 0) { // 固定区间
        var start_date = new Date(this.dataValue);
        var end_date = new Date(this.dataValue);
        if (this.dayCount > 300) {// 如果固定区间为一年，则计算规则和其他固定区间不一样
          end_date = new Date((Number(this.dataValue.split('-')[0]) + 1) + '-' + this.dataValue.split('-')[1] + '-' + this.dataValue.split('-')[2])
          end_date.setDate(start_date.getDate() - 1)
          end_date = end_date.Format("yyyy-MM-dd");
        } else {
          end_date.setDate(start_date.getDate() + this.dayCount - 1)
          end_date = end_date.Format("yyyy-MM-dd");
        }
        this.endDate = end_date
      } else if (this.insuranceIntervalType == 1) { // 间隔区间
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
                  this.currentItemId = res.data.data.prdItemId
                  this.btnlist.forEach(btnItem => {
                    if (btnItem.styleId == this.currentStyleId) {
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
                  this.currentItemId = res.data.data.prdItemId
                  this.btnlist.forEach(btnItem => {
                    if (btnItem.styleId == this.currentStyleId) {
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
      if (pageType == 1) {// 投保人
        if (item.itemCode == 1) {// 名称
          if (!item.userName) {
            this.$message.error('请输入' + item.itemName);
            return
          } else {
            if (!this.checkName(item.userName)) {
              this.$message.error("请输入正确的姓名");
              return
            }
          }
        } else if (item.itemCode == 4) {// 证件编号
          if (!item.userName) {
            this.$message.error('请输入' + item.itemName);
            return
          } else {
            if (this.checkChinese(item.userName)) {
              this.$message.error('证件号码不能输入汉字');
              return
            }
          }
        } else if (item.itemCode == 6) {// 联系电话
          if (!item.userName) {
            this.$message.error('请输入' + item.itemName);
            return
          } else {
            if (!this.checkPhoneNumber(item.userName)) {
              this.$message.error("请输入正确的电话号码")
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
        } else if (item.itemCode == 12) {// 所在地区
          if (!this.checkMsgNull(item.userName)) {
            this.$message.error('请选择' + item.itemName);
            return
          }
        } else if (item.itemCode == 15) {// 详细地址
          if (!this.checkMsgNull(item.userName)) {
            this.$message.error('请输入' + item.itemName);
            return
          }
        }
      }
    },
    cancelBeibaoren(index) {
      this.showBeibaoren = false
    },
    isSameIDCard(isUpdate) {
      for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
        if (this.bbrInfoPop.otherOptionitems[i].itemCode == 4) {
          for (let j = 0; j < this.bbrInfoPopList.length; j++) {
            let item = this.bbrInfoPopList[j].otherOptionitems
            for (let k = 0; k < item.length; k++) {
              if (isUpdate) {
                if (item[k].itemCode == 4 && j != this.updateBbrInfoPopIndex) {
                  if (item[k].userName == this.bbrInfoPop.otherOptionitems[i].userName) {
                    return true
                  }
                }
              } else {
                if (item[k].itemCode == 4) {
                  if (item[k].userName == this.bbrInfoPop.otherOptionitems[i].userName) {
                    return true
                  }
                }
              }
            }
          }
        }
      }
      return false
    },
    confirmBeibaoren() {
      for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
        if (!this.onBbrInfoPopCheck(this.bbrInfoPop.otherOptionitems[i])) {
          return
        }
      }
      if (this.bbrInfoPop.jobType == '拒保') {
        this.$message.error("该职业类别拒保");
        return false
      }
      if (this.prdName == '金财互联雇主责任险') {
        if (this.bbrInfoPop.jobType == 6) {
          this.$message.error('不支持投保该职业类别！')
          return
        }
      } else if (this.prdName == '阳光雇主保') {
      }
      if (this.updateBbrInfoPopFlag) {// 如果是更新状态
        this.getBbrInfoPopPriceAndItemId(() => {
          if (this.isSameIDCard(true)) {
            this.$message.error('雇员证件号码不能重复！')
            return
          } else {
            this.bbrInfoPopList.splice(this.updateBbrInfoPopIndex, 1, JSON.parse(JSON.stringify(this.bbrInfoPop)))
            this.onFenye()
            this.showBeibaoren = false
          }
        })
      } else {// 新增状态
        this.getBbrInfoPopPriceAndItemId(() => {
          if (this.isSameIDCard(false)) {
            this.$message.error('雇员证件号码不能重复！')
            return
          } else {
            this.bbrInfoPop.createdTime = new Date().getTime()
            this.bbrInfoPopList.push(JSON.parse(JSON.stringify(this.bbrInfoPop)))
            this.bbrInfoPopList.sort(function (a, b) {
              return b.createdTime - a.createdTime
            })
            this.onFenye()
            this.showBeibaoren = false
          }
        })
      }
    },
    getGuyuanInfos() {
      for (var i = 0; i < this.pagedata.page.length; i++) {
        for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
          if (this.pagedata.page[i].types[j].pageType == 5) {// 雇员信息
            this.guyuanInfos = this.pagedata.page[i].types[j].items;// 雇员信息items数组
          }
        }
      }
    },
    getInsuredInfos() {
      for (var i = 0; i < this.pagedata.page.length; i++) {
        for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
          if (this.pagedata.page[i].types[j].pageType == 2) {// 雇员信息
            this.insuredInfos = this.pagedata.page[i].types[j].items;// 雇员信息items数组
          }
        }
      }
    },
    getNewBbrInfoPop() {
      let bbrInfoPopCopy = {}
      bbrInfoPopCopy.premium = 0 // 设置多被保人的初始保费为0
      bbrInfoPopCopy.itemId = '' // 设置itemId 方案报价id为空
      bbrInfoPopCopy.createdTime = 0 //创建时间
      bbrInfoPopCopy.premium = 0 // 每个雇员的保费
      bbrInfoPopCopy.jobCode = ''
      bbrInfoPopCopy.jobType = ''
      bbrInfoPopCopy.jobTypeUserNameArr = []
      bbrInfoPopCopy.otherOptionitems = this.generateOtherOptionitems()
      this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))
    },
    addBeibaorenInfo() {
      if (this.bbrInfoPopList.length >= this.maxEmployeesNum) {
        this.showBeibaoren = false
        this.$message.error('雇员人数已达上限！')
      } else {
        this.jobTypeUserNameArr = []
        this.getNewBbrInfoPop()
        this.updateBbrInfoPopFlag = false
        this.showBeibaoren = true
      }
    },
    modifyBeibaorenInfo(index) {
      this.bbrInfoPop = JSON.parse(JSON.stringify(this.bbrInfoPopList[index]))
      this.updateBbrInfoPopFlag = true
      this.updateBbrInfoPopIndex = index
      this.showBeibaoren = true
      this.jobTypeUserNameArr = JSON.parse(JSON.stringify(this.bbrInfoPop.jobTypeUserNameArr))
    },
    deleteBeibaorenInfo(index) {
      this.bbrInfoPopList.splice(index, 1)
      this.onFenye()
    },
    onZjhm(q) {
      let IDCardType = 1 // 证件类型默认为 身份证
      for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
        if (this.bbrInfoPop.otherOptionitems[i].itemCode == 3) {// 证件类型
          IDCardType = this.bbrInfoPop.otherOptionitems[i].userName
        }
      }
      if (q.itemCode == "4") {// 证件编号
        if (IDCardType == '1') { // 居民身份证
          if (!this.checkIdCard(q.userName)) {
            return false
          } else {
            for (let j = 0; j < this.bbrInfoPop.otherOptionitems.length; j++) {
              if (this.bbrInfoPop.otherOptionitems[j].itemCode == 2) {
                this.bbrInfoPop.otherOptionitems[j].userName = this.getSexByIdNO(q.userName)
              } else if (this.bbrInfoPop.otherOptionitems[j].itemCode == 5) {
                this.bbrInfoPop.otherOptionitems[j].userName = this.getBirthdayByIdNO(q.userName)
              }
            }
          }
        }
      }

    },
    getBirthdayByIdNO(IdNO) {
      let birthday = "";
      if (IdNO.length == 18) {
        birthday = IdNO.substr(6, 8);
        return birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      } else if (IdNO.length == 15) {
        birthday = "19" + IdNO.substr(6, 6);
        return birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      } else {
        return "";
      }
    },
    // (2 女,1 男)
    getSexByIdNO(IdNO) {
      if (IdNO.length == 18) {
        return IdNO.charAt(16) % 2 == 0 ? 2 : 1;
      } else if (IdNO.length == 15) {
        return IdNO.charAt(14) % 2 == 0 ? 2 : 1;
      } else {
        return "";
      }
    },
    onBbrInfoPopCheck(q) {
      let IDCardType = 1 // 证件类型默认为 身份证
      for (let i = 0; i < this.bbrInfoPop.otherOptionitems.length; i++) {
        if (this.bbrInfoPop.otherOptionitems[i].itemCode == 3) {// 证件类型
          IDCardType = this.bbrInfoPop.otherOptionitems[i].userName
        }
      }
      if (this.noRequiredField.indexOf(q.itemCode) == -1) {
        if (!q.userName) {// 校验非空(被保人手机号除外)
          this.$message.error("请输入" + q.itemName)
          return false
        } else if (q.itemCode == 1) {// 姓名
          if (!this.checkName(q.userName)) {
            this.$message.error('请输入正确的姓名')
            return false
          }
        } else if (q.itemCode == "4") {// 证件编号(不能为汉字)
          if (IDCardType == '1') { // 居民身份证
            if (!this.checkIdCard(q.userName)) {
              this.$message.error('请输入正确的证件号码')
              return false
            } else {
              if (!this.isAgeInArea(q.userName)) {
                this.$message.error('身份证号不在可投保年龄范围内，请重新输入!')
                return false
              }
            }
          } else if (IDCardType == "8") {//组织机构代码
            q.userName = q.userName.toUpperCase();
            var orgCodeReg = /^[\w\d-]+$/i;//匹配数字、字母及中划线
            var result = orgCodeReg.test(q.userName);
            if (!result) {
              this.$message.error('组织机构代码证件编码不能为非法字符和中文')
              return false
            }
          } else {// 港澳通行证/居民户口本等
            var cardNum = /^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
            if (cardNum.test(q.userName)) {
              this.$message.error('证件编号格式不正确')
              return false
            }
          }
        } else if (q.itemCode == 6) {// 联系电话
          if (!q.userName) {
            this.$message.error('请输入' + item.itemName);
            return
          } else {
            if (!this.checkPhoneNumber(q.userName)) {
              this.$message.error("请输入正确的电话号码")
              return
            }
          }
        } else if (q.itemCode == 7) {// 邮箱
          if (!q.userName) {
            this.$message.error('请输入' + q.itemName);
            return
          } else {
            if (!this.checkEmail(q.userName)) {
              this.$message.error("请输入正确的邮箱")
              return
            }
          }
        }
      }
      return true
    },
    generateOtherOptionitems() {
      var otherOptionitems = [];
      for (var j = 0; j < this.guyuanInfos.length; j++) {
        var appInfo = this.guyuanInfos[j];
        var optionsItems = {}
        // if (appInfo.itemCode != 8 && appInfo.itemCode != 5 && appInfo.itemCode != 2) {//排除出生日期和性别
        // if (appInfo.itemCode != 8 && appInfo.itemCode != 6) {//排除与投保人关系和手机号
        optionsItems.itemName = appInfo.itemName;
        optionsItems.itemCode = appInfo.itemCode;
        optionsItems.isHasOption = appInfo.isHasOption;
        optionsItems.options = appInfo.options;
        optionsItems.userName = appInfo.userName;
        otherOptionitems.push(optionsItems)
        // }
      }
      return otherOptionitems
    },
    // 用户选择方案时所调方法
    handletype(item) {
      // if (this.bbrInfoPopList.length > 0) {
      //   for (let i = 0; i < this.bbrInfoPopList.length; i++) {
      //     if (this.bbrInfoPopList[i].jobType == 5) {
      //       if (item.styleId == 696 || item.styleId == 697 || item.styleId == 698) {
      //         this.$message.error("当前所选方案不支持为5的职业类别信息，请修改重试")
      //         return
      //       }
      //     }
      //   }
      // }
      this.currentItemId = item.prdItemId // 更新当前方案默认明细id
      this.prdmcShop.prdItemId = item.prdItemId
      this.typeData = item.prdSpecificationCalcs // 更新当前方案明细数组
      this.currentStyleId = item.styleId // 更新当前方案id
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
        styleId: this.currentStyleId,
        calcIds: this.calcIds,
        calcIdKeys: this.calcIdKeys
      }
      //请求后台,实时获取价格
      this.$http.post("/prdmc/prdmcShop/productCalc", {// 产品报价测算接口
        styleId: this.currentStyleId,
        calcIds: this.calcIds
      }).then(res => {
        if (res.data.code == 200) {
          this.prdmcShop.price = res.data.data.price;// 返回产品报价测算接口中返回的最新的价格
          this.currentItemId = res.data.data.prdItemId
          this.btnlist.forEach(btnItem => {
            if (btnItem.styleId == this.currentStyleId) {
              btnItem.prdItemId = res.data.data.prdItemId
              this.prdmcShop.prdItemId = res.data.data.prdItemId
            }
          })

          this.$http.post('/prdmc/prdmcShop/insureData', {
            itemId: this.currentItemId,// 根据最新用户选择的方案明细id，调 获取参保项接口
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
      })
      let jobTypeIdArr = []
      for (let i = 0; i < this.jobTypeEntries.length; i++) {
        jobTypeIdArr[i] = this.jobTypeEntries[i].id
      }
      if (this.bbrInfoPopList.length > 0) {
        for (let i = 0; i < this.bbrInfoPopList.length; i++) {
          let upParamsCopy = JSON.parse(JSON.stringify(this.upParams))
          for (let j = 0; j < this.upParams.calcIdKeys.length; j++) {
            if (this.upParams.calcIdKeys[j] == '职业类别') {

              if (this.prdName == '金财互联雇主责任险') {
                if (this.bbrInfoPopList[i].jobType == 1 || this.bbrInfoPopList[i].jobType == 2) {// 1-2类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[0]
                } else if (this.bbrInfoPopList[i].jobType == 3) {// 3类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[1]
                } else if (this.bbrInfoPopList[i].jobType == 4) {// 4类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[2]
                } else if (this.bbrInfoPopList[i].jobType == 5) {// 5类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[3]
                }
              } else if (this.prdName == '阳光雇主保') {
              }
            }
          }
          // 请求最新的产品报价测算价格
          this.$http.post("/prdmc/prdmcShop/productCalc", {
            styleId: upParamsCopy.styleId,
            calcIds: upParamsCopy.calcIds
          }).then(res => {
            if (res.data.code == 200) {
              this.bbrInfoPopList[i].premium = res.data.data.price
              this.bbrInfoPopList[i].itemId = res.data.data.prdItemId
            } else {
              this.$message.error('获取最新报价失败，请稍候重试！')
            }
          })
        }
      }
    },

    handleClick(item) {
      // 将所有方案中相同的项目都改成一致
      let btnlistCopy = JSON.parse(JSON.stringify(this.btnlist))
      for (let j = 0; j < btnlistCopy.length; j++) {
        for (let h = 0; h < btnlistCopy[j].prdSpecificationCalcs.length; h++) {
          if (btnlistCopy[j].prdSpecificationCalcs[h].name == item.name && (item.name == '保险期间' || item.name == '是否加购扩展24小时意外险')) {
            btnlistCopy[j].prdSpecificationCalcs[h].selectValue = item.selectValue
            for (let w = 0; w < btnlistCopy[j].prdSpecificationCalcs[h].entries.length; w++) {
              if (btnlistCopy[j].prdSpecificationCalcs[h].entries[w].id == item.selectValue) {
                btnlistCopy[j].prdSpecificationCalcs[h].entries[w].isDefault = true
              } else {
                btnlistCopy[j].prdSpecificationCalcs[h].entries[w].isDefault = false
              }
            }
          }
        }
      }
      this.btnlist = JSON.parse(JSON.stringify(btnlistCopy))
      if (item.entries.length > 0) {
        for (let k = 0; k < item.entries.length; k++) {
          if (item.entries[k].id == item.selectValue) {
            item.entries[k].isDefault = true;// 将用户选择的某一项的状态改成默认选中状态，其他项的状态改成false
          } else {
            item.entries[k].isDefault = false;
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
        styleId: this.currentStyleId,
        calcIds: this.calcIds,
        calcIdKeys: this.calcIdKeys
      }
      // 请求最新的产品报价测算价格
      this.$http.post("/prdmc/prdmcShop/productCalc", {
        styleId: this.currentStyleId,
        calcIds: this.calcIds
      }).then(res => {
        if (res.data.code == 200) {
          this.prdmcShop.price = res.data.data.price;
          this.currentItemId = res.data.data.prdItemId
          this.btnlist.forEach(btnItem => {
            if (btnItem.styleId == this.currentStyleId) {
              btnItem.prdItemId = res.data.data.prdItemId
              this.prdmcShop.prdItemId = res.data.data.prdItemId
            }
          })

          this.$http.post('/prdmc/prdmcShop/insureData', {
            itemId: this.currentItemId,// 根据最新用户选择的方案明细id，调 获取参保项接口
            orgCode: this.orgCode
          }).then(res => {
            if (res.data.code == '200') {
              this.maxDayCount = res.data.data.maxDayCount;
              this.minDayCount = res.data.data.minDayCount;
              this.dayCount = res.data.data.dayCount;
              this.changeStartTime()
            } else {
              this.$message.error('获取最新报价失败，请稍候重试！')
            }
          })
        } else {
          this.$message.error('获取最新报价失败，请稍候重试！')
        }
      })

      let jobTypeIdArr = []
      for (let i = 0; i < this.jobTypeEntries.length; i++) {
        jobTypeIdArr[i] = this.jobTypeEntries[i].id
      }
      if (this.bbrInfoPopList.length > 0) {
        for (let i = 0; i < this.bbrInfoPopList.length; i++) {
          let upParamsCopy = JSON.parse(JSON.stringify(this.upParams))
          for (let j = 0; j < this.upParams.calcIdKeys.length; j++) {
            if (this.upParams.calcIdKeys[j] == '职业类别') {
              if (this.prdName == '金财互联雇主责任险') {
                if (this.bbrInfoPopList[i].jobType == 1 || this.bbrInfoPopList[i].jobType == 2) {// 1-2类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[0]
                } else if (this.bbrInfoPopList[i].jobType == 3) {// 3类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[1]
                } else if (this.bbrInfoPopList[i].jobType == 4) {// 4类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[2]
                } else if (this.bbrInfoPopList[i].jobType == 5) {// 5类
                  upParamsCopy.calcIds[j] = jobTypeIdArr[3]
                }
              } else if (this.prdName == '阳光雇主保') {
              }
            }
          }
          // 请求最新的产品报价测算价格
          this.$http.post("/prdmc/prdmcShop/productCalc", {
            styleId: upParamsCopy.styleId,
            calcIds: upParamsCopy.calcIds
          }).then(res => {
            if (res.data.code == 200) {
              this.bbrInfoPopList[i].premium = res.data.data.price
              this.bbrInfoPopList[i].itemId = res.data.data.prdItemId
            } else {
              this.$message.error('获取最新报价失败，请稍候重试！')
            }
          })
        }
      }

    },
    // 展示确认投保信息页面内容
    showConfirm() {
      this.showToubaoxinxi = false
    },
    // 隐藏确认投保信息页面内容
    closeConfirm() {
      this.onGoTop()
      this.showToubaoxinxi = true
    },
    generateInsured() {
      this.insureds = []
      var obj = {
        linkmanId: this.linkmanId,
        itemId: this.currentItemId,
        insuredItems: []
      }
      // obj.insuredItems = JSON.parse(JSON.stringify(this.policyHolders))
      obj.insuredItems.push({
        code: '8',
        value: '1'
      })
      for (let i = 0; i < this.insuredInfos.length; i++) {
        for (let j = 0; j < this.policyHolders.length; j++) {
          if (this.insuredInfos[i].itemCode == this.policyHolders[j].code) {
            obj.insuredItems.push(this.policyHolders[j])
          }
        }
      }
      this.insureds.push(obj)
    },
    // 生成请求报文需要的雇员信息
    generateGuyuanInfo() {
      this.employees = []
      for (var i = 0; i < this.bbrInfoPopList.length; i++) {
        var obj = {
          itemId: this.bbrInfoPopList[i].itemId,
          employeeItems: []
        }
        var user = this.bbrInfoPopList[i]
        for (var j = 0; j < user.otherOptionitems.length; j++) {
          var optionItem = user.otherOptionitems[j]
          if (optionItem.itemName == '职业信息' || optionItem.itemName == '所属职业') {
            obj.employeeItems.push({
              code: optionItem.itemCode,
              value: user.jobCode
            })
          } else {
            obj.employeeItems.push({
              code: optionItem.itemCode,
              value: optionItem.userName
            })
          }
        }
        this.employees.push(obj)
      }
    },
    gotoConfirm() {
      // 校验信息 开始
      for (var i = 0; i < this.pagedata.page.length; i++) {
        for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
          var pageType = this.pagedata.page[i].types[j].pageType
          if (pageType == 1) {// 投保人信息
            for (var k = 0; k < this.pagedata.page[i].types[j].items.length; k++) {
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
              } else if (item.itemCode == 4) {// 证件号码
                if (!item.userName) {
                  this.$message.error('请输入' + item.itemName);
                  return
                } else {
                  if (this.checkChinese(item.userName)) {
                    this.$message.error('企业编号不能输入汉字');
                    return
                  }
                }
              } else if (item.itemCode == 6) {// 联系电话
                if (!item.userName) {
                  this.$message.error('请输入' + item.itemName);
                  return
                } else {
                  if (!this.checkPhoneNumber(item.userName)) {
                    this.$message.error("请输入正确的电话号码")
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
              } else if (item.itemCode == 12) {// 所在地区
                if (!this.checkMsgNull(item.userName)) {
                  this.$message.error('请输入' + item.itemName);
                  return
                }
              } else if (item.itemCode == 15) {// 详细地址
                if (!this.checkMsgNull(item.userName)) {
                  this.$message.error('请输入' + item.itemName);
                  return
                }
              } else if (item.itemCode == 69) {// 营业执照
                if (!this.checkMsgNull(item.userName)) {
                  this.$message.error('请上传' + item.itemName);
                  return
                }
              }
            }
          }
        }
      }

      if (this.bbrInfoPopList.length <= 0) {
        this.$message.error("请填写或上传雇员信息")
        return
      }
      if (this.bbrInfoPopList.length < this.minEmployeesNum) {
        this.$message.error("雇员最少为" + this.minEmployeesNum + '人')
        return
      }
      if (this.bbrInfoPopList.length > this.maxEmployeesNum) {
        this.$message.error("雇员最多为" + this.maxEmployeesNum + '人')
        return
      }

      let jobType4Number = 0
      let jobType5Number = 0
      for (let i = 0; i < this.bbrInfoPopList.length; i++) {
        if (this.bbrInfoPopList[i].jobType == 4) {
          jobType4Number++
        } else if (this.bbrInfoPopList[i].jobType == 5) {
          jobType5Number++
        }
      }

      // 金财互联雇主责任险需要添加的校验逻辑
      if (this.prdName == '金财互联雇主责任险') {
        if ((jobType4Number + jobType5Number) > (0.2 * this.bbrInfoPopList.length) && this.bbrInfoPopList.length < 20) {
          this.$message.error("当前4类和5类人员占比超过20%，总雇员人数应不少于20人")
          return
        }
        if (jobType5Number > 5) {
          this.$message.error("5类职业人员不可超过5人")
          return
        }
        if (jobType5Number > (0.05 * this.bbrInfoPopList.length)) {
          this.$message.error("5类职业人员占比不可超过5%")
          return
        }

        let have5Type = false
        for (let i = 0; i < this.btnlist.length; i++) {
          if (this.btnlist[i].styleId == this.currentStyleId) {
            for (let j = 0; j < this.btnlist[i].prdSpecificationCalcs.length; j++) {
              if (this.btnlist[i].prdSpecificationCalcs[j].name == '职业类别') {
                for (let h = 0; h < this.btnlist[i].prdSpecificationCalcs[j].entries.length; h++) {
                  if (this.btnlist[i].prdSpecificationCalcs[j].entries[h].value == '5类') {
                    have5Type = true
                  }
                }
              }
            }
          }
        }
        if (!have5Type) {
          for (let i = 0; i < this.bbrInfoPopList.length; i++) {
            if (this.bbrInfoPopList[i].jobType == 5) {
              this.$message.error("当前所选方案中不允许投保5类职业，请修改相关雇员信息")
              return
            }
          }
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
      this.policyHolders = [] // 投保人信息

      for (var i = 0; i < this.pagedata.page.length; i++) {
        for (var j = 0; j < this.pagedata.page[i].types.length; j++) {
          var pageType = this.pagedata.page[i].types[j].pageType
          if (pageType == 1) {// 投保人信息
            for (var k = 0; k < this.pagedata.page[i].types[j].items.length; k++) {
              var item = this.pagedata.page[i].types[j].items[k]
              if (item.itemCode == 1) {// 名称
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName,
                })
              } else if (item.itemCode == 3) {// 证件类型
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName
                })
              } else if (item.itemCode == 4) {// 证件号码
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName
                })
              } else if (item.itemCode == 6) {// 联系电话
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName,
                })
              } else if (item.itemCode == 7) {// 邮箱
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName,
                })
              } else if (item.itemCode == 12) {// 所在地区
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userCode,
                })
              } else if (item.itemCode == 15) {// 详细地址
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName,
                })
              } else if (item.itemCode == 75) {// 行业类别
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName,
                })
              } else if (item.itemCode == 73) {// 单位性质
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName,
                })
              } else if (item.itemCode == 74) {// 注册类型
                this.policyHolders.push({
                  code: item.itemCode,
                  value: item.userName,
                })
              } else if (item.itemCode == 69) {// 营业执照
                this.policyHolders.push({
                  code: item.itemCode,
                  value: this.businessLicenseImgUrl,
                })
              }
            }
          }
        }
      }


      // 先清除缓存
      window.sessionStorage.removeItem('res');
      window.sessionStorage.removeItem('startDate');
      window.sessionStorage.removeItem('endDate');
      window.sessionStorage.removeItem('employees');
      window.sessionStorage.removeItem('itemId')
      window.sessionStorage.removeItem('channelName')
      window.sessionStorage.removeItem('productStartDate')
      window.sessionStorage.removeItem('uploadBusinessLicenseFlag')
      window.sessionStorage.removeItem('businessLicenseImgUrl')

      window.sessionStorage.removeItem('btnlist')
      window.sessionStorage.removeItem('prdmcShop')
      window.sessionStorage.removeItem('currentItemId')
      window.sessionStorage.removeItem('currentStyleId')
      window.sessionStorage.removeItem('typeData')
      window.sessionStorage.removeItem('itemData')
      window.sessionStorage.removeItem('entries')
      window.sessionStorage.removeItem('upParams')
      window.sessionStorage.removeItem('enterpriseArea')
      window.sessionStorage.removeItem('bbrInfoPopList')
      window.sessionStorage.removeItem('checkedFlag')


      // 再存入数据
      window.sessionStorage.setItem('res', JSON.stringify(this.res));
      window.sessionStorage.setItem('startDate', this.startData2);
      window.sessionStorage.setItem('endDate', this.endDate);
      window.sessionStorage.setItem('itemId', this.itemId);
      window.sessionStorage.setItem('channelName', this.channelName);
      window.sessionStorage.setItem('uploadBusinessLicenseFlag', this.uploadBusinessLicenseFlag);
      window.sessionStorage.setItem('businessLicenseImgUrl', this.businessLicenseImgUrl);
      window.sessionStorage.setItem('productStartDate', this.productStartDate);//后台配置的起保日期

      window.sessionStorage.setItem('btnlist', JSON.stringify(this.btnlist))
      window.sessionStorage.setItem('prdmcShop', JSON.stringify(this.prdmcShop))
      window.sessionStorage.setItem('currentItemId', JSON.stringify(this.currentItemId))
      window.sessionStorage.setItem('currentStyleId', JSON.stringify(this.currentStyleId))
      window.sessionStorage.setItem('typeData', JSON.stringify(this.typeData))
      window.sessionStorage.setItem('itemData', JSON.stringify(this.itemData))
      window.sessionStorage.setItem('entries', JSON.stringify(this.entries))
      window.sessionStorage.setItem('upParams', JSON.stringify(this.upParams))
      window.sessionStorage.setItem('enterpriseArea', JSON.stringify(this.enterpriseArea))
      window.sessionStorage.setItem('bbrInfoPopList', JSON.stringify(this.bbrInfoPopList))
      window.sessionStorage.setItem('checkedFlag', this.checkedFlag)

      window.sessionStorage.setItem('employees', JSON.stringify(this.employees))
      window.sessionStorage.setItem('addressCode', this.addressCode);

      this.generateInsured()
      this.generateGuyuanInfo()
      this.generateBeneficiary()

      this.paramsTopay = {
        channelCode: this.channelCode,
        orgCode: this.orgCode,
        userSign: this.userSign,
        styleId: this.currentStyleId,//方案ID
        startDate: this.startData2 + " " + this.lastDateString,
        endDate: this.endDate + " " + this.endLastDateString,
        isCustom: true,
        policyHolders: this.policyHolders,
        insureds: this.insureds,
        employees: this.employees,
        beneficiary: this.beneficiary,
        addressCode: this.addressCode ? this.addressCode : '',
        urlParam: this.urlParam ? this.urlParam : ''
      }

      // 核保
      this.$http.post("/sunmc/ordSun/underwritingPolicy", this.paramsTopay).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (res.data.data.status == 200) {
            this.generateBaseInfo()
            this.createPolicySign = res.data.data.msg
            this.onGoTop()
            this.showConfirm()
          } else {
            this.$message.error(res.data.data.msg)
          }
        } else {
          this.$message.error(res.data.data.msg)
        }
      })
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
      const loading = this.getLoading('加载中，请稍候...')
      this.$http.post("/sunmc/ordSun/createPolicy", {
        sign: this.createPolicySign,
        policy: this.paramsTopay,
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
    getLabelAndJobType() {
      for (let j = 0; j < this.jobTypeOptions.length; j++) {
        if (this.jobTypeUserNameArr[0] == this.jobTypeOptions[j].value) {
          let cityCArr = this.jobTypeOptions[j].children
          for (let k = 0; k < cityCArr.length; k++) {
            if (this.jobTypeUserNameArr[1] == cityCArr[k].value) {
              let secondName = cityCArr[k].label
              let aaa = cityCArr[k].children
              for (let h = 0; h < aaa.length; h++) {
                if (this.jobTypeUserNameArr[2] == aaa[h].value) {
                  return {
                    label: aaa[h].label,
                    jobType: aaa[h].jobType
                  }
                }
              }
            }
          }
        }
      }
    },
    getJobInfoByJobCode(jobCode) {
      for (let j = 0; j < this.jobTypeOptions.length; j++) {
        let cityCArr = this.jobTypeOptions[j].children
        let firstValue = this.jobTypeOptions[j].value
        for (let k = 0; k < cityCArr.length; k++) {
          let secondValue = cityCArr[k].value
          let aaa = cityCArr[k].children
          for (let h = 0; h < aaa.length; h++) {
            if (jobCode == aaa[h].value) {
              let threeValue = aaa[h].value
              return {
                jobName: aaa[h].label,
                jobType: aaa[h].jobType,
                jobTypeUserNameArr: [firstValue, secondValue, threeValue],
              }
            }
          }
        }
      }
    },
    getBbrInfoPopPriceAndItemId(callback) {
      let jobTypeIdArr = []
      for (let i = 0; i < this.jobTypeEntries.length; i++) {
        jobTypeIdArr[i] = this.jobTypeEntries[i].id
      }
      console.log(jobTypeIdArr)
      let upParamsCopy = JSON.parse(JSON.stringify(this.upParams))
      for (let i = 0; i < this.upParams.calcIdKeys.length; i++) {
        if (this.upParams.calcIdKeys[i] == '职业类别') {
          if (this.prdName == '金财互联雇主责任险') {
            if (this.bbrInfoPop.jobType == 1 || this.bbrInfoPop.jobType == 2) {// 1-2类
              upParamsCopy.calcIds[i] = jobTypeIdArr[0]
            } else if (this.bbrInfoPop.jobType == 3) {// 3类
              upParamsCopy.calcIds[i] = jobTypeIdArr[1]
            } else if (this.bbrInfoPop.jobType == 4) {// 4类
              upParamsCopy.calcIds[i] = jobTypeIdArr[2]
            } else if (this.bbrInfoPop.jobType == 5) {// 5类
              upParamsCopy.calcIds[i] = jobTypeIdArr[3]
            }
          } else if (this.prdName == '阳光雇主保') {
          }
        }
      }
      // 请求最新的产品报价测算价格
      this.$http.post("/prdmc/prdmcShop/productCalc", {
        styleId: upParamsCopy.styleId,
        calcIds: upParamsCopy.calcIds
      }).then(res => {
        if (res.data.code == 200) {
          let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
          bbrInfoPopCopy.premium = res.data.data.price
          bbrInfoPopCopy.itemId = res.data.data.prdItemId
          this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))
          callback()
        } else {
          this.$message.error('获取最新报价失败，请稍候重试！')
        }
      })
    },
    handleJobTypeChange() {
      let obj = this.getLabelAndJobType()
      let bbrInfoPopCopy = JSON.parse(JSON.stringify(this.bbrInfoPop))
      bbrInfoPopCopy.jobCode = this.jobTypeUserNameArr[2]
      bbrInfoPopCopy.jobType = obj.jobType
      bbrInfoPopCopy.jobTypeUserNameArr = JSON.parse(JSON.stringify(this.jobTypeUserNameArr))
      for (let i = 0; i < bbrInfoPopCopy.otherOptionitems.length; i++) {
        if (bbrInfoPopCopy.otherOptionitems[i].itemName == '职业信息' || bbrInfoPopCopy.otherOptionitems[i].itemName == '所属职业') {
          bbrInfoPopCopy.otherOptionitems[i].userName = obj.label
        }
      }
      this.bbrInfoPop = JSON.parse(JSON.stringify(bbrInfoPopCopy))
    },
  },
  filters: {
    //时间转换
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    // 根据不同的item.code和item.value展示不同的值
    handleSwitchItemValue(item) {
      var itemObj2 = { 1: '男', 2: '女' }
      var itemObj3 = { 1: '身份证', 2: '居民户口本', 3: '居民护照', 8: '组织机构代码证', 48: '港澳通行证', 99: '其他' }
      var itemObj67 = { 8: '组织机构代码证' }
      var itemObj75 = { A: '农、林、牧、渔业', B: '采矿业', C: '制造业', D: '电力、热力、燃气及水生产和供应业', E: '建筑业', F: '批发和零售业', G: '交通运输、仓储和邮政业', H: '住宿和餐饮业', I: '信息传输、软件和信息技术服务业', J: '金融业', K: '房地产业', L: '租赁和商务服务业', M: '科学研究和技术服务业', N: '水利、环境和公共设施管理业', O: '居民服务、修理和其他服务业', P: '教育', Q: '卫生和社会工作', R: '文化、体育和娱乐业', S: '公共管理、社会保障和社会组织', T: '国际组织' }
      var itemObj73 = { 1: '国家机关、团体', 2: '事业单位', 3: '企业', 9: '其它' }
      var itemObj74 = { '01': '国有企业', '02': '集体企业', '03': '股份合作企业', '04': '联营企业', '05': '有限责任公司', '06': '股份有限公司', '07': '私营企业', '08': '港、澳、台商投资企业', '09': '外商投资企业', '10': '内资企业分支机构', '11': '其他企业' }

      if (item.itemCode == 3) {// 证件类型
        return itemObj3[item.userName]
      } else if (item.itemCode == 2) {// 性别
        return itemObj2[item.userName]
      } else if (item.itemCode == 67) {// 企业证件类型
        return itemObj67[item.userName]
      } else if (item.itemCode == 75) {// 行业类别
        return itemObj75[item.userName]
      } else if (item.itemCode == 73) {// 单位性质
        return itemObj73[item.userName]
      } else if (item.itemCode == 74) {// 注册类型
        return itemObj74[item.userName]
      } else {
        return item.userName
      }
    },
  },
  created() {
    this.handleChannelCodeAndOrgCode()
    this.getCityData()
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
  margin-bottom: 150px;
}

.container {
  width: 920px;
  margin: 0 auto;
}

.tk_header {
  width: 100%;
  background-color: #f5f5f5;
  height: 36px;
}

.tk_header_con {
  width: 920px;
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
  width: 920px;
  left: 50%;
  margin-left: -460px;
  top: 154px;
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
  border-radius: 2px;
  line-height: 26px;
  font-weight: 700;
  border: 0;
  margin-left: 140px;
}

.process .container .active {
  color: #ffffff;
  background-color: #ff9619;
}

.tbxx-wrap {
}

.tbxx_content {
  width: 920px;
  border-left: 2px solid #ececec;
  border-right: 2px solid #ececec;
  padding: 40px;
  padding-bottom: 0;
}
.tbxx_content:first-child {
  margin: 41px 0 0;
  border: 2px solid #ececec;
  border-bottom: none;
  padding: 40px;
  padding-bottom: 0;
}
.tbxx_content:last-child {
  border-bottom: 2px solid #ececec;
  padding: 40px;
  padding-top: 0;
}

.tbxx_content .tbxx {
}

.tbxx_content .tbxx .title {
  height: 36px;
  padding-left: 0px;
  color: #535353;
  line-height: 36px;
  font-size: 16px;
  font-weight: 700;
  position: relative;
}

.tbxx_content .tbxx .title img {
  vertical-align: -3px;
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
  display: flex;
  align-items: center;
}
.tbxx_content .tbxx .title .addInfo-wrap span:first-child {
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
  width: 190px;
  text-align: left;
  padding-left: 40px;
  font-weight: 700;
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
  margin: 20px;
  margin-bottom: 0;
}

.prdStyles-wrap .name {
  float: left;
  border-top: 4px solid #ffffff;
  border-bottom: 4px solid #efefef;
}
.prdStyles-wrap .name .type {
  color: #ff8a00;
}

.prdStyles-wrap .name div {
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  color: #999999;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prdStyles-wrap .name:nth-child(1) div {
  width: 220px;
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
  border: 4px solid #efefef;
}

.prdStyles-wrap .remark div {
  height: 36px;
  line-height: 36px;
  width: 80px;
  color: #6c6c6c;
  font-size: 14px;
  text-align: center;
}
.prdStyles-wrap .remark div:nth-child(1) {
  position: relative;
  font-weight: 700;
  height: 36px;
  line-height: 36px;
  width: 80px;
}

.prdStyles-wrap .remark div:nth-child(2n + 1) {
  background-color: #f7f7f7;
}

.prdStyles-wrap .remark.on {
  border: 4px solid #ff9600;
  box-shadow: 0px 10px 10px 0px rgba(255, 150, 0, 0.35);
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
  border: none;
  height: 36px;
  line-height: 36px;
  width: 80px;
}

.select-box {
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  color: #444;
  cursor: pointer;
  width: 350px;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  padding-left: 15px;
  /*清楚默认样式*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("../../assets/proToubaoxinxiPC/an-xl.png") no-repeat 327px
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
  height: 40px;
  line-height: 40px;
  color: #606266;
  font-size: 16px;
  vertical-align: middle;
  width: 350px;
  padding-left: 15px;
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
  width: 920px;
  height: 60px;
  margin: 0 auto;
  background-color: #ffa200;
  border-radius: 2px;
  line-height: 60px;
}
.calculate_info .calculate_wrap .cost-wrap {
  float: left;
  margin-left: 20px;
  margin-right: 20px;
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
  margin-right: 20px;
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
  color: #ffa200;
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
  font-size: 14px;
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
  width: 200px;
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
  background-color: #ff9600;
  color: #ffffff;
  border: 1px solid #ff9600;
}

.prd-introduce {
  width: 800px;
  overflow: hidden;
  border: 2px solid #ffa200;
  border-radius: 2px;
  padding: 10px 20px;
  margin: 20px auto 30px;
}

.prd-introduce .title {
  overflow: hidden;
  padding-left: 0;
  height: auto;
}

.prd-introduce .title span {
  float: left;
  color: #999999;
  font-size: 14px;
  width: 318px;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px dashed #c9c9c9;
}

.prd-introduce .title span:nth-child(1) {
  width: 350px;
}
.prd-introduce .title span:nth-child(2) {
  text-align: right;
  width: 400px;
}

.prd-introduce .content {
  overflow: hidden;
}

.prd-introduce .content span {
  float: left;
  color: #6c6c6c;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px dashed #c9c9c9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.prd-introduce .content span:nth-child(1) {
  color: #ffa200;
  width: 350px;
}
.prd-introduce .content span:nth-child(2) {
  color: #ffa200;
  text-align: right;
  width: 400px;
}

.insures-table {
  width: 845px;
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
  position: fixed;
  top: 120px;
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
  margin: 20px auto 70px;
}
.modify-add-insuredInfo-wrap .content .tbxx_table {
}
.modify-add-insuredInfo-wrap .content .tbxx_table td {
  height: 50px;
}
.modify-add-insuredInfo-wrap .content .tbxx_table .first_td {
  width: 120px;
}
.modify-add-insuredInfo-wrap .content .tbxx_table >>> .el-input__inner {
  width: 280px !important;
}
.modify-add-insuredInfo-wrap .content .tbxx_table .select-box {
  width: 280px;
  background: url("../../assets/proToubaoxinxiPC/an-xl.png") no-repeat 260px
    center transparent;
}
.modify-add-insuredInfo-wrap .content .tbxx_table .tbxx_input {
  width: 280px;
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
  color: #ff9619;
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
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  margin: 20px auto;
  line-height: 40px;
  position: relative;
}
.shoujihao-wrap .content .title {
  padding-left: 10px;
  color: #6c6c6c;
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
  color: #ff8a00;
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
  background-color: #ffa200;
  border-radius: 2px;
  cursor: pointer;
}
.upload-license {
  position: absolute;
  top: -5px;
  left: 0;
  width: 160px;
  height: 30px;
  line-height: 30px;
  background-color: #ffa200;
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
  left: 170px;
  font-size: 14px;
  color: #535353;
  height: 30px;
  line-height: 30px;
}
.license-img {
  width: 160px;
  height: 260px;
  border: 1px solid #d7d7d7;
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
  color: #ff8a00;
  border: 2px solid #ff8a00;
}
.license-img .btn span:nth-child(2) {
  color: #ff4444;
  border: 2px solid #ff4444;
}
.redStar {
  color: #ff6f6f;
  font-size: 14px;
  font-weight: 700;
  vertical-align: -3px;
}
.fenye {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
}
.fenye div {
  padding: 0 10px;
  cursor: pointer;
}
.fenye .active {
  background-color: #ff8a00;
}
</style>
