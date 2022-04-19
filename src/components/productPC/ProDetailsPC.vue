<template>
  <div class="wrap">
    <TracebackPC></TracebackPC>
    <!-- 保费试算弹框 开始-->
    <div class="blackBg" v-show="showBfss"></div>
    <div class="bfss-wrap" v-show="showBfss">
      <div class="insure-title">保费试算<a href="javascript:void(0);" class="closeBtn" @click="closeBfss"></a></div>
      <div class="content">
        <table class="tbxx_table">
          <tr v-if="styleList.length > 1">
            <td class="first_td">方案名称</td>
            <td>
              <span v-for='(i,indexA) in styleList' :key="indexA" @click="handletype(i.prdSpecificationCalcs,i.prdItemId,i.styleId,i.price,indexA)" :class="{active:indexA===styleActiveIndexA}">
                {{i.styleName}}
              </span>
            </td>
          </tr>
          <tr v-for='item in typeData' :key='item.name'>

            <td class="first_td">{{item.name}}</td>
            <td>
              <template v-if="item.entries.length == 1">
                <span class="one" v-for="items in item.entries" :key='items.id'>
                  {{items.value}}
                </span>
              </template>
              <template v-if="item.entries.length == 2">
                <span v-for="items in item.entries" :key='items.id' :class="{active:items.isDefault}" @click="handleClick(item.entries,items.id,styleId)">
                  {{items.value}}
                </span>
              </template>
              <template v-if="item.entries.length > 2">
                <select class="select-box" v-model="item.selectValue" placeholder="" @change="handleClick(item.entries,item.selectValue,styleId)">
                  <option v-for="items in item.entries" :key="items.id" :value="items.id">{{items.value}}
                  </option>
                </select>
              </template>
            </td>
          </tr>
          <tr v-if="showGyxx">
            <td class="first_td">雇员人数</td>
            <td>
              <input type="text" class="tbxx_input" placeholder="请输入雇员人数" v-model="gyNum" maxlength="5" @change="onChangeGyxx()" @keyup="onChangeGyxx()">
            </td>
          </tr>
        </table>
      </div>
      <div class="totalPremium">总保费：
        <span v-if="showGyxx">￥{{common.accMul(money, gyNum)}}</span>
        <span v-else>￥{{money}}</span>
      </div>
    </div>
    <!-- 保费试算弹框 结束-->
    <div class="container">
      <div class="header" v-for="(imgList,i) in itemData.prdImgs" :key="i">
        <img :src="imgList.imgUrl" alt="">
      </div>
    </div>
    <div class="nav" :class="navBarFixed ? 'navBarWrap' :''">
      <div class="container">
        <div class="nav-box">
          <a href="javascript:void(0)" :class="{active:orderState === 0}" @click="onSwithOrderState(0)">产品介绍</a>
          <a href="javascript:void(0)" :class="{active:orderState === 1}" @click="onSwithOrderState(1)">投保须知</a>
          <a href="javascript:void(0)" :class="{active:orderState === 2}" @click="onSwithOrderState(2)">理赔流程</a>
          <a href="javascript:void(0)" :class="{active:orderState === 3}" @click="onSwithOrderState(3)">保险条款</a>
          <button type="button" class="gm-btn" @click="gotoNextPage(),onSensors('PC-详情页-点击立即购买', $event)">立即购买</button>
          <span class="bx-price" @click="onShowBfssPopBox()" v-if="!singleStyleFlag">保费试算</span>
          <span class="bx-price money" v-else>￥{{money}}</span>
        </div>
      </div>
    </div>
    <div class="con">
      <div class="container-con">
        <div class="page_img" :class="navBarFixed ? 'paddingTop' :''">
          <div v-html="introduce" class="introduce" id="cpjs"></div>
        </div>
        <div class="page_img paddingTop85" id="tbxz"><img src="../../assets/productDetailsPC/tbxz.png"></div>
        <div>
          <div class="tbxz_con" v-for="(item,i) in detailList" :key="i">
            <h2>{{item.title}}</h2>
            <template v-if="item.title == '阳光职业分类表'">
              <p><a href="javascript:void(0)" @click="openAlertBox(item)">查看更多&gt;&gt;</a></p>
            </template>
            <template v-else>
              <p>{{item.content | handleTiaokuan}}<a href="javascript:void(0)" @click="openAlertBox(item)">查看更多&gt;&gt;</a></p>
            </template>
          </div>
        </div>
        <div class="page_img paddingTop85" id="lplc"><img src="../../assets/productDetailsPC/lplc.png"></div>
        <div>
          <div v-for="(flow,i) in process" :key='i'>
            <div v-if='flow.isUrlFormat'>
              <!--isUrlFormat:是否是URL格式 ture:content传递文件url-->
              点击下载<a v-if='flow.isUrlFormat' :href='flow.content' class="flow">{{flow.title}}</a>
            </div>
            <div v-else>
              <div v-html="flow.content" class="introduce">
              </div>
            </div>
          </div>
        </div>

        <div class="page_img" id="bxtk"><img src="../../assets/productDetailsPC/bxtk.png"></div>
        <div class="bxtk_con" v-for="(item,i) in tiaokuanList" :key="i">
          <p><a href="javascript:void(0)" @click="openAlertBox(item)">{{item.title}}&gt;&gt;</a></p>
        </div>
      </div>
    </div>

    <!--投保须知和保险条款弹框-->
    <AlertBox :showAlertBox="showAlertBox" :tiaokuan="insurance" @closeAlertBox="closeAlertBox"></AlertBox>
    <!--健康告知弹框-->
    <div class="health-box" v-show="healthShowFlag">
      <div class="blackBg"></div>
      <div class="alertbox">
        <h3>健康告知</h3>
        <div class="content" v-for="item in this.healthNotification" :key='item.content'>
          <p v-html='item.content'></p>
        </div>
        <div class="botton">
          <div class="botton-wrap">
            <div @click="handleHealthHide(),onSensors('PC-详情页-点击有情况发生', $event)">有情况发生</div>
            <div @click="handleHealth(),onSensors('PC-详情页-点击以上情况全无', $event)">以上情况全无</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Jquery from "jquery"
import AlertBox from './common/AlertBox.vue'
import TracebackPC from '../newComponents/tracebackPC/TracebackPC.vue'
export default {
  name: "ProDetailsPC",
  components: {
    AlertBox,
    TracebackPC
  },
  data() {
    return {
      singleStyleFlag: true, // 是否只有单一方案，并且报价因子中都是只有一个选项 这样的标识
      money: 0,
      gyNum: 1,//雇员人数
      showGyxx: false,// 保费试算中是否展示雇员信息
      styleActiveIndexA: 0,//新保方案选中
      policytypeId: '',
      prdmcShop: {},
      typeData: [],
      styleList: [],
      styleId: "",
      discount: '',// 折扣率
      monthPayType: '',//月缴方式
      showBfss: false,// 是否展示保费试算弹框
      navBarFixed: false,// 导航栏是否页面顶部固定
      orderState: 0,// 导航栏状态
      itemId: this.$route.query.id, //产品主键id
      channelCode: this.$route.query.channelCode, //渠道code
      channelName: '',
      orgCode: this.$route.query.orgCode, //机构Code
      companyId: this.$route.query.cId,// 公司标识码
      batchIds: this.$route.query.batchIds,// 保险批次id
      productEndDate: '',// 产品结束日期
      healthNotification: "", //健康告知
      healthShowFlag: false,// 健康告知是否展示标识
      popupVisibleFirst: false,// 这个字段控制在页面加载之后是否展示一个弹出框内容，内容可能是提前告知用户一些提示信息
      detailList: [], // 投保声明、投保须知、特别约定的数组
      tiaokuanList: [],// 保险条款数组
      process: [], //理赔流程
      introduce: '', // 产品介绍的图片
      showAlertBox: false,
      insurance: {},// 投保须知和保险条款临时存放内容的字段
      urlParam: '',// url中的参数
      itemData: {},// 响应报文中的data
      first_channelCode: '',
      first_orgCode: '',
      latest_channelCode: '',
      latest_orgCode: '',
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
        page_ID: this.common.getPageid(0),
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
        page_ID: this.common.getPageid(0),
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
    onSingleStyle() {
      if (this.styleList.length > 1) {
        this.singleStyleFlag = false
      } else if (this.styleList.length == 1) {
        for (let i = 0; i < this.typeData.length; i++) {
          if (this.typeData[i].entries.length > 1) {
            this.singleStyleFlag = false
          }
        }
      }
    },
    onChangeGyxx() {
      var data = (this.gyNum + '').replace(/[^\d]/g, '')
      if (this.gyNum == '') {

      } else if (data == '') {
        this.gyNum = 0
      } else {
        this.gyNum = parseInt(data)
      }
    },
    handleClick(items, id, styleId) {
      console.log(items)
      let calcIds = [];
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
      //  发送请求 根据选择计算价格
      this.$http
        .post("/prdmc/prdmcShop/productCalc", {
          styleId: styleId,
          calcIds: calcIds,
        })
        .then(res => {
          this.onSetMoneyShow(res.data.data.price)
          // 产品报价明细id（prdItemId）改变之后，需要同时修改policytypeId 和 styleList中对应方案里的prdItemId
          this.policytypeId = res.data.data.prdItemId
          this.styleList.forEach(item => {
            if (item.styleId == this.styleId) {
              item.prdItemId = res.data.data.prdItemId
            }
          })
        });
    },
    //点击方案
    handletype(value, prdItemId, styleId, price, index) {
      this.itemData.prdStyles.forEach((item, i) => { // 改变所选方案名称
        if (index === i) {
          this.currentStyleName = item.styleName
        }
      })
      let calcIds = [];
      this.typeData = value;
      this.styleActiveIndexA = index;//改变方案名称选中样式

      this.styleId = styleId;
      this.policytypeId = prdItemId;
      let calcIdKeys = [];
      this.typeData.forEach(z => {
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

      this.upParams = {
        styleId: this.styleId,
        calcIds: calcIds,
        calcIdKeys: calcIdKeys
      }

      //请求后台,实时获取价格
      this.$http
        .post("/prdmc/prdmcShop/productCalc", {
          styleId: this.styleId,
          calcIds: calcIds,
        })
        .then(res => {
          this.onSetMoneyShow(res.data.data.price)
          // 产品报价明细id（prdItemId）改变之后，需要同时修改policytypeId 和 styleList中对应方案里的prdItemId
          this.policytypeId = res.data.data.prdItemId
          this.styleList.forEach(item => {
            if (item.styleId == this.styleId) {
              item.prdItemId = res.data.data.prdItemId
            }
          })
        });

    },
    onShowGyxx() {
      if (this.typeData.length > 0) {
        for (let i = 0; i < this.typeData.length; i++) {
          if (this.typeData[i].name == '职业类别') {
            this.showGyxx = true
          }
        }
      }
    },
    // 保费试算弹框中保费展示展示
    onSetMoneyShow(handlePrice) {
      if (this.discount != "" && this.discount != null) {//若有折扣
        let dcPrice = this.common.accMul(handlePrice, this.discount);//价格*折扣
        if (this.monthPayType != "" && this.monthPayType != null) {//若有月缴
          this.money = (Number(dcPrice) / Number(this.monthPayType)).toFixed(2);
        } else {
          this.money = dcPrice.toFixed(2);
        }
      } else {
        if (this.monthPayType != "" && this.monthPayType != null) {//若有月缴
          this.money = (Number(handlePrice) / Number(this.monthPayType)).toFixed(2);
        } else {
          this.money = handlePrice.toFixed(2);
        }
      }
    },
    onShowBfssPopBox() {
      this.showBfss = true
    },
    closeBfss() {
      this.showBfss = false
    },
    //获取折扣(同步请求)
    async getDiscount() {
      try {
        var response = await this.$http.post("prdmc/prdmcProductDiscount/queryDiscount", {
          productId: this.itemId,
          channelCode: this.channelCode
        })
        if (response.status == 200) {
          if (JSON.stringify(response.data) != '{}') {
            if (response.data.discount != '' && response.data.discount != null) {//折扣不为空
              this.discount = response.data.discount;
            }
          }
          this.$http.post('/prdmc/prdmcShop/productSpecification', {
            id: this.itemId,
            channelCode: this.channelCode
          }).then(result => {
            this.policytypeId = result.data.data.prdItemId;
            this.prdmcShop = result.data.data;
            this.onSetMoneyShow(this.prdmcShop.price)

            this.styleList = this.prdmcShop.prdStyleSpecification;

            if (this.styleList.length > 0) {
              this.policytypeId = this.styleList[0].prdItemId;
              this.styleId = this.styleList[0].styleId;
              this.typeData = this.styleList[0].prdSpecificationCalcs;
              this.onShowGyxx()
              this.onSingleStyle()
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

            let calcIds = [];
            let calcIdKeys = [];
            this.typeData.forEach(z => {
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
            this.upParams = {
              styleId: this.styleId,
              calcIds: calcIds,
              calcIdKeys: calcIdKeys
            }
            this.getList()
          })
        }
      } catch (e) {
        console.log(e);
      }
    },
    watchScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 50 时，实现吸顶效果
      scrollTop > 390 ? this.navBarFixed = true : this.navBarFixed = false
    },
    // 切换导航栏
    onSwithOrderState(num) {
      this.orderState = num
      this.goAnchor(num)
    },
    // 点击导航栏定位到相应的div
    goAnchor(num) {
      var selector = ''
      if (num == 0) {
        selector = '#cpjs'
      } else if (num == 1) {
        selector = '#tbxz'
      } else if (num == 2) {
        selector = '#lplc'
      } else if (num == 3) {
        selector = '#bxtk'
      }
      var anchor = this.$el.querySelector(selector)
      Jquery(document).scrollTop(anchor.offsetTop)
    },
    // 投保须知和保险条款弹出框
    openAlertBox(item) {
      this.insurance = item
      this.showAlertBox = true
    },
    getList() {
      let that = this
      this.$http.post('/prdmc/prdmcShop/productDetail', {
        productId: this.itemId,// 产品主键id
        orgCode: this.orgCode // 机构编码
      }).then(res => {
        this.itemData = res.data.data
        this.productEndDate = this.itemData.productEndDate;// 产品结束日期

        if (this.itemData.status == 1) { // 如果产品状态正常 status：状态 1上架，0下架
          if (this.productEndDate != '' && this.productEndDate != null) {// 如果产品结束日期早于当前时间，则将状态置为下架状态
            //此种写法兼容各浏览器new Date() invalid date问题
            var productEndDate = new Date(this.productEndDate.replace(new RegExp(/-/gm), "/"));
            if (productEndDate.getTime() < new Date().getTime()) {//产品结束日期小于当前日期
              this.status = 0;
            }
          }
        } else {
          this.status = 0
        }

        this.healthNotification = res.data.data.healths;// 健康告知
        window.sessionStorage.setItem('prdStyles', JSON.stringify(res.data.data.prdStyles))
        // this.prdDutylist = this.itemData.prdStyles[0].prdDutys;// prdStyles:产品方案集合
        this.introduce = this.itemData.introduce;// 产品介绍的图片
        this.spreadtion = this.itemData.spread;// 备用字段

        if (this.spreadtion == "" || this.spreadtion == null) {
          this.popupVisibleFirst = false;
        } else {
          this.popupVisibleFirst = "";
        }

        //详细说明下方协议的数据
        this.itemData.insurances.forEach(item => {// 投保须知和保险条款
          if ((item.type == 1 || item.type == 5) && item.title.indexOf('条款') == -1 && item.title != '行业分类表') {// 表示投保须知相关
            this.detailList.push(item)
          } else if (item.type == 3 || item.title.indexOf('条款') != -1) {// 表示相关保险条款
            this.tiaokuanList.push(item)
          } else if (item.type == 6) {// 6:表示理赔流程
            this.process.push(item)
          }
        })

        this.prdName = this.itemData.prdName; //产品名称
        this.prdListImg = this.itemData.prdListImg;// 产品列表图片

        //设置页面标题
        Jquery(document).find('title').text(this.prdName);
      })
    },
    // 关闭弹框
    closeAlertBox() {
      this.showAlertBox = false
      this.insurance = {}
    },
    onRouterPush() {
      let path = ""
      // if (this.itemId == 168) {
      //   path = "/ProductPC/ProToubaoxinxiPCEnterprise"
      // } else 
      if (this.prdName == '金财互联雇主责任险' || this.prdName == '美联雇主责任险') {
        path = "/ProductPC/ProPCForEmployer"
      } else if (this.prdName == '阳光雇主保') {
        path = "/ProductPC/ProPCForXJGHEmployer"
      } else {
        path = "/ProductPC/ProToubaoxinxiPC"
      }
      this.$router.push({
        path: path,
        query: {
          id: this.itemId,
          channelCode: this.channelCode,
          orgCode: this.orgCode,
          companyId: this.companyId,
          batchIds: this.batchIds
        }
      });
    },
    gotoNextPage() {
      if (this.status == 0 || this.channelCode == '' || this.channelCode == null) {
        this.$message.error('该产品已下架！')
        return
      }
      window.sessionStorage.setItem('productEndDate', this.productEndDate)
      window.sessionStorage.setItem('channelName', this.channelName)
      window.sessionStorage.setItem('productId', this.$route.query.id)
      window.sessionStorage.setItem('urlParam', this.urlParam)
      if (this.healthNotification.length != 0) {
        this.healthShowFlag = true
      } else {
        this.background = false
        this.healthShowFlag = false

        this.onRouterPush()
      }
    },
    handleHealth() {
      this.healthShowFlag = false;

      this.onRouterPush()
    },
    // 隐藏健康告知弹框
    handleHealthHide() {
      this.background = true;
      this.healthShowFlag = false;
    },
  },
  filters: {
    // 投保须知中，内容的过滤器
    handleTiaokuan(value) {
      return value.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').substring(0, 100) + '......'
    }
  },
  created() {
    this.handleChannelCodeAndOrgCode()
    let params = window.location.href.split('?')
    if (params.length == 2) {
      params = params[1]
    } else {
      params = ''
    }
    this.urlParam = params // url中所带参数，格式类似这种：id=122&channelCode=DC23ZD0500140006&orgCode=KFPT

    /// 首先清除缓存吧。。。
    window.sessionStorage.removeItem('prdStyles')
    window.sessionStorage.removeItem('urlParam');
    window.sessionStorage.removeItem('res');
    window.sessionStorage.removeItem('showOption');
    window.sessionStorage.removeItem('userList');
    window.sessionStorage.removeItem('money');
    window.sessionStorage.removeItem('itemId')
    window.sessionStorage.removeItem('productEndDate')

    window.sessionStorage.removeItem('btnlist')
    window.sessionStorage.removeItem('prdmcShop')
    window.sessionStorage.removeItem('isactive')
    window.sessionStorage.removeItem('styleId')
    window.sessionStorage.removeItem('typeData')
    window.sessionStorage.removeItem('itemData')
    window.sessionStorage.removeItem('entries')
    window.sessionStorage.removeItem('upParams')
    window.sessionStorage.removeItem('upParams')
    window.sessionStorage.removeItem('applicantArea')
    window.sessionStorage.removeItem('insuranceArea')
    window.sessionStorage.removeItem('applicantJob')
    window.sessionStorage.removeItem('insuranceJob')

    this.getChannelAndAppkey((res) => {
      this.channelName = res.data.channelName;
      window.sessionStorage.setItem('channelName', this.channelName);
    })

    this.onSensors2('PC-proDetails_jinruxiangqingye', 'PC-详情页-进入详情页')

    this.getDiscount()
  },
  mounted() {
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)
  }
}
</script>

<style scoped>
.wrap {
  padding-bottom: 50px;
}
img {
  width: 100%;
}
.header {
  min-width: 920px;
  height: 390px;
  text-align: center;
}
.header img {
  height: 100%;
}
.container {
  width: 920px;
  margin: 0 auto;
}
.container-con {
  width: 645px;
  margin: 0 auto;
}
.nav {
  width: 100%;
}
.nav-box {
  background: #fff;
  width: 920px;
  padding: 15px 25px;
  border: 2px solid #edeaeb;
  font-size: 18px;
  line-height: 40px;
  border-radius: 2px;
  overflow: hidden;
}
.nav-box a {
  display: block;
  float: left;
  margin-right: 30px;
}
.nav-box a.active {
  color: #ffa200;
}
.gm-btn {
  display: block;
  float: right;
  width: 180px;
  height: 40px;
  background: #ffa200;
  line-height: 40px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  border: 0;
  border-radius: 2px;
  font-size: 18px;
}
.bx-price {
  display: block;
  float: right;
  color: #ffa200;
  margin-right: 20px;
  cursor: pointer;
  text-decoration: underline;
}
.bx-price.money {
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  cursor: text;
}
.bx-price em {
  font-weight: bold;
  font-size: 24px;
}
.bx-price .oldPrice {
  text-decoration: line-through;
  color: #999;
  padding: 10px;
  font-weight: 400;
  font-size: 20px;
}
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 9;
}
.paddingTop {
  padding-top: 82.4px;
}
.paddingTop85 {
  padding-top: 85px;
}
.tbxz_con h2 {
  font-size: 20px;
  background: url(../../assets/productDetailsPC/icon1.png) 5px center no-repeat;
  padding-left: 28px;
}
.tbxz_con p {
  font-size: 16px;
  background: url(../../assets/productDetailsPC/icon2.png) 5px 15px no-repeat;
  padding: 10px 20px 20px 28px;
  border-bottom: 1px dashed #a4e4c1;
  margin-bottom: 20px;
}
.tbxz_con p a {
  color: #6d93ff;
}
.introduce >>> img {
  width: 100%;
}
.bxtk_con p a {
  font-size: 16px;
  color: #333;
  text-decoration: underline;
}
.health-box .blackBg {
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
.health-box .alertbox {
  width: 700px;
  background: #fff;
  border-radius: 2px;
  position: fixed;
  z-index: 999;
  top: 25%;
  left: 50%;
  margin-left: -350px;
}
.health-box .alertbox h3 {
  background: #f4f4f4;
  height: 40px;
  font-size: 16px;
  color: #ffa200;
  font-weight: 700;
  text-align: center;
  line-height: 40px;
  border-radius: 2px 2px 0 0;
}
.health-box .alertbox .content {
  height: 300px;
  padding: 20px;
  overflow-y: scroll;
}
.health-box .alertbox .botton {
  overflow: hidden;
  border-top: 1px solid #e1e1e1;
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.05);
}
.health-box .alertbox .botton .botton-wrap {
  width: 50%;
  margin: 0 auto;
}
.health-box .alertbox .botton .botton-wrap div:nth-child(2) {
  width: 45%;
  height: 40px;
  float: left;
  padding: 10px;
  border-radius: 2px;
  background: #ffa200;
  color: rgb(255, 255, 255);
  text-align: center;
  margin: 5px;
  cursor: pointer;
}
.health-box .alertbox .botton .botton-wrap div:nth-child(1) {
  width: 45%;
  height: 40px;
  float: left;
  padding: 10px;
  border-radius: 2px;
  border: 1px solid #ffa200;
  background: rgb(255, 255, 255);
  color: #ffa200;
  text-align: center;
  margin: 5px;
  cursor: pointer;
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
.bfss-wrap {
  width: 580px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -280px;
  margin-left: -290px;
  background-color: #ffffff;
  z-index: 999;
  border-radius: 2px;
}
.bfss-wrap .totalPremium {
  text-align: center;
  margin-bottom: 20px;
}
.bfss-wrap .totalPremium span {
  color: #ff8a00;
  font-size: 20px;
  font-weight: 700;
}
.bfss-wrap .insure-title {
  height: 40px;
  color: #ff8a00;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background-color: #f4f4f4;
  border-radius: 2px;
}
.bfss-wrap .content {
  width: 430px;
  margin: 20px auto;
}
.bfss-wrap .content .tbxx_table {
}
.bfss-wrap .content .tbxx_table td {
  height: 50px;
}
.bfss-wrap .content .tbxx_table td span {
  display: inline-block;
  padding: 0 20px;
  border: 1px solid #999;
  margin: 10px 10px 10px 0;
  border-radius: 2px;
  color: #999;
}
.bfss-wrap .content .tbxx_table td span:hover {
  cursor: pointer;
}
.bfss-wrap .content .tbxx_table td span.one {
  display: inline-block;
  padding: 0 20px;
  margin: 10px 10px 10px 0;
  border: none;
  padding-left: 0;
  color: #ff8a00;
}
.bfss-wrap .content .tbxx_table td span.active {
  color: #fff;
  border: 1px solid #ff8a00;
  background-color: #ff8a00;
}
.bfss-wrap .content .tbxx_table .first_td {
  width: 120px;
  padding-right: 10px;
}
.bfss-wrap .content .tbxx_table >>> .el-input__inner {
  width: 280px !important;
}
.bfss-wrap .content .tbxx_table .select-box {
  width: 290px;
  background: url("../../assets/proToubaoxinxiPC/an-xl.png") no-repeat 260px
    center transparent;
}
.bfss-wrap .content .tbxx_table .tbxx_input {
  width: 290px;
}
.closeBtn {
  display: block;
  width: 17px;
  height: 17px;
  background: url("../../assets/proToubaoxinxiPC/gb1.png") no-repeat;
  position: absolute;
  top: 12px;
  right: 14px;
}
.select-box {
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  color: #ff8a00;
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
  background: url("../../assets/proToubaoxinxiPC/an-xl.png") no-repeat 327px
    center transparent;
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
  padding-left: 10px;
}
</style>
