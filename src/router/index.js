import Vue from 'vue'
import Router from 'vue-router'
import ProDetails from '@/components/product/ProDetails.vue'
import NewDetails from '@/pages/newDetails/NewDetails.vue'
import Combination from '@/pages/newDetails/Combination.vue'
Vue.use(Router)
let router =new Router({
  routes: [
    {
      path: '/Product',
      name: 'product',
      component: resolve => require(["@/components/product/Product.vue"], resolve)
    },
		{
      path: '/Product/ProDetails',
			name: 'ProDetails',
      component: ProDetails
      
		},
		{
      path: '/Product/ProIndex',
			name: 'ProIndex',
      component: resolve => require(["@/components/product/ProIndex.vue"], resolve)
		},
    {
      path: '/Product/Success',
			name: 'success',
      component: resolve => require(["@/components/product/success.vue"], resolve)
		},
    {
      path: '/Product/ProDetails/productshare',
      name: 'productshare',
      component: resolve => require(["@/components/product/productshare.vue"], resolve)
    },
		{
      path: '/Product/pay',
      name: 'pay',
      component: resolve => require(["@/components/product/pay.vue"], resolve)
    },
		{
      path: '/Product/payForActivity',
      name: 'payForActivity',
      component: resolve => require(["@/components/product/payForActivity.vue"], resolve)
    },
    {
      path: '/ProPay',
			name: 'ProPay',
      component: resolve => require(["@/components/product/ProPay.vue"], resolve)
    },
		{
      path: '/ProInsur',
      name: 'insur',
      component: resolve => require(["@/components/product/ProInsur.vue"], resolve),
  	},
		{
      path: '/ProInsured',
      name: 'ProInsured',
      component: resolve => require(["@/components/product/ProInsured.vue"], resolve),
  	},
    {
      path: '/waitPay',
      name: 'waitPay',
      component: resolve => require(["@/components/product/waitPay.vue"], resolve),
    },
    {
      path: '/carProInsur',
      name: 'carProInsur',
      component: resolve => require(["@/components/product/carProInsur.vue"], resolve),
    },
    {
      path: '/petsStore',
      name: 'petsStore',
      component: resolve => require(["@/components/product/petsStore.vue"], resolve),
    },
    {
      path: '/petsHealth',
      name: 'petsHealth',
      component: resolve => require(["@/components/product/petsHealth.vue"], resolve),
    },
    {
      path: '/errorPage',
      name: 'errorPage',
      component: resolve => require(["@/components/product/errorPage.vue"], resolve),
    },
    {
      path:'/iHealthFamily',
      name:'iHealthFamily',
      component: resolve => require(["@/components/product/iHealthFamily.vue"], resolve),
    },
    {
      path:'/iHealthPersonal',
      name:'iHealthPersonal',
      component: resolve => require(["@/components/product/iHealthPersonal.vue"], resolve),
    },
    {
      path:'/springFestival2020',
      name:'springFestival2020',
      component: resolve => require(["@/components/product/springFestival2020.vue"], resolve),
    },
    {
      path:'/guanaibao/index',
      name:'gabIndex',
      component: resolve => require(["@/components/product/activities/guanaibao/index.vue"], resolve),
    },
    {
      path:'/guanaibao/proIntroduce',
      name:'gabProIntroduce',
      component: resolve => require(["@/components/product/activities/guanaibao/proIntroduce.vue"], resolve),
    },
    {
      path:'/sunHealthFestivalPC',
      name:'sunHealthFestivalPC',
      component: resolve => require(["@/components/productPC/sunHealthFestivalPC.vue"], resolve),
    },
    {
      path: '/weChatShare',
      name: 'weChatShare',
      component: resolve => require(["@/components/product/weChatShare.vue"], resolve),
    },
    {
      path: '/productShow',
      name: 'productShow',
      component: resolve => require(["@/components/product/ProductShow.vue"], resolve),
    },
    {
      path: '/Product/groupPay',
      name: 'groupPay',
      component: resolve => require(["@/components/product/groupPay.vue"], resolve),
    },
    {
      path: '/AdPage',
      name: 'AdPage',
      component: resolve => require(["@/components/product/AdPage.vue"], resolve),
    },
    {
      path: '/xubaoIndex',
      name: 'xubaoIndex',
      component: resolve => require(["@/components/product/xubaoIndex.vue"], resolve),
    },
    {
      path: '/xubaoProInsur',
      name: 'xubaoProInsur',
      component: resolve => require(["@/components/product/xubaoProInsur.vue"], resolve),
    },
    {
      path: '/ProductPC/ProDetailsPC',
      name: 'ProDetailsPC',
      component: resolve => require(["@/components/productPC/ProDetailsPC.vue"], resolve),
    },
    {
      path: '/ProductPC/ProToubaoxinxiPC',
      name: 'proToubaoxinxiPC',
      component: resolve => require(["@/components/productPC/ProToubaoxinxiPC.vue"], resolve),
    },
    {
      path: '/ProductPC/ProToubaoxinxiPCEnterprise',
      name: 'proToubaoxinxiPCEnterprise',
      component: resolve => require(["@/components/productPC/ProToubaoxinxiPCEnterprise.vue"], resolve),
    },
    {
      path: '/ProductPC/ProZhifuPC',
      name: 'proZhifuPC',
      component: resolve => require(["@/components/productPC/ProZhifuPC.vue"], resolve),
    },
    {
      path: '/ProductPC/ProZhifuSuccessPC',
      name: 'proZhifuSuccessPC',
      component: resolve => require(["@/components/productPC/ProZhifuSuccessPC.vue"], resolve),
    },
    {
      path: '/ProductPC/ProZhifuErrorPC',
      name: 'proZhifuErrorPC',
      component: resolve => require(["@/components/productPC/ProZhifuErrorPC.vue"], resolve),
    },
    {
      path: '/ProductPC/careerCategory',
      name: 'careerCategory',
      component: resolve => require(["@/components/productPC/careerCategory.vue"], resolve),
    },
    
    {
      path: '/Product/Productconsultation',
      name: 'Productconsultation',
      component: resolve => require(["@/components/product/consultation.vue"], resolve),
      meta: {
        title: "客户咨询服务",
        content: 'width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,viewport-fit=cover',
      }
    },{
      path: '/Product/consultationAsk',
      name: 'ProductconsultationAsk',
      component: resolve => require(["@/components/product/consultationAsk.vue"], resolve),
      meta: {
        title: "我要咨询",
        content: 'width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,viewport-fit=cover',
      }
    },
    {
      path: '/Product/consultationAnswer',
      name: 'consultationAnswer',
      component: resolve => require(["@/components/product/consulationAnswer.vue"], resolve),
      meta: {
        title: "产品服务咨询",
        content: 'width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,viewport-fit=cover',
      }
    },
    {
      path: '/Product/seatnumber',
      name: 'seatnumber',
      component: resolve => require(["@/components/product/seatnumber.vue"], resolve),
    },
    {
      path: '/evaluate/evaluate',
      name: 'evaluate',
      component: resolve => require(["@/components/evaluate/evaluate.vue"], resolve),
      meta: {
        title: "产品评价",
        content: 'width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,viewport-fit=cover',
      }
    },
    {
      path: '/claimsEvaluate/claimsEvaluate',
      name: 'claimsEvaluate',
      component: resolve => require(["@/components/claimsEvaluate/claimsEvaluate.vue"], resolve),
      meta: {
        title: "产品评价",
        content: 'width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,viewport-fit=cover',
      }
    },
    {
        path: "/ProductPC/ProPCForEmployer",
        name: "ProPCForEmployer",
        component: resolve => require(["@/components/productPC/ProPCForEmployer.vue"], resolve)
      },
      {
        path: "/ProductPC/ProPCForXJGHEmployer",
        name: "ProPCForXJGHEmployer",
        component: resolve => require(["@/components/productPC/ProPCForXJGHEmployer.vue"], resolve)
      },
      {
        path: '/Product/sunCarOwnerGuardShare',
        name: 'sunCarOwnerGuardShare',
        component: resolve => require(["@/components/product/sunCarOwnerGuardShare.vue"], resolve)
      },
      {
        path: "/Product/orderPayCashier",
        name: "orderPayCashier",
        component: resolve => require(["@/components/product/orderPayCashier.vue"], resolve)
      },
      {
        path: "/Product/writeBankCardInfo",
        name: "writeBankCardInfo",
        component: resolve => require(["@/components/product/writeBankCardInfo.vue"], resolve)
      },
      {
        path: "/Product/ylfwxy",
        name: "ylfwxy",
        component: resolve => require(["@/components/product/ylfwxy.vue"], resolve)
      },{
        path: '/newDetails',
        name: 'NewDetails',
        component: NewDetails
      },{
        path: '/xubaoNewDetails',
        name: 'xubaoNewDetails',
        component: resolve => require(["@/pages/newDetails/xubaoNewDetails.vue"], resolve)
      },{
        path: '/combination',
        name: 'Combination',
        component: Combination
      },{
        path: '/applySignRedirect',
        name: 'ApplySignRedirect',
        component: resolve => require(["@/components/product/ApplySignRedirect.vue"], resolve)
      },{
        path: '/applySignRedirect2',
        name: 'ApplySignRedirect2',
        component: resolve => require(["@/components/product/ApplySignRedirect2.vue"], resolve)
      },{
        path: '/unPayIndex',
        name: 'UnPayIndex',
        component: resolve => require(["@/pages/unPay/UnPayIndex.vue"], resolve)
      },{
        path: '/unPayErr',
        name: 'UnPayErr',
        component: resolve => require(["@/pages/unPay/UnPayErr.vue"], resolve)
      },
      
      ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
export default router;
