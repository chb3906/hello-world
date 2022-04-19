<template>
	<div class="infor">
		<img src="../../assets/iHealthFamily/images/ajk_01.png">
		<img src="../../assets/iHealthFamily/images/ajk_02.png">
		<img src="../../assets/iHealthFamily/images/ajk_03.png">
		<img src="../../assets/iHealthFamily/images/ajk_04.png">
		<img src="../../assets/iHealthFamily/images/ajk_05.png">
		<img src="../../assets/iHealthFamily/images/ajk_06.png">
		<div class="btn">
			<a href="http://p.qiao.baidu.com/cps/chat?siteId=13388269&userId=3597057&cp=mproperty.sinosig.com&cr=&cw=">
        <img alt="人工客服" src="../../assets/iHealthFamily/images/ajk_07.png">
      </a>
			<a href="javascript:void(0)" @click="buryingPoint('buy')"><img alt="试算保费" src="../../assets/iHealthFamily/images/ajk_08.png"></a>
		</div>
		<div class="telephone">
			<a href="tel:4001002475"><img src="../../assets/iHealthFamily/images/tel.png" @click="buryingPoint('tel')"/></a>
		</div>
	</div>
</template>
<style scoped>
	body {background:#fff;}
	.infor{ width:100%;font-size: 0;}
	.infor img{ display:block; float: left; width:100%;}
	.btn{background-color:#FDDF59; text-align: center; padding-bottom: 0.2rem;}
	.btn a{display:inline-block; width: 45%;}
	.btn a:first-child{ margin-right: 0.25rem;}
	.telephone{ position:fixed; left:0; bottom:0.8rem; z-index:90;}
	.telephone img{width:55%;}
</style>
<script>
export default {
	name:'iHealthFamily',
	data(){
		return {
			channelCode:this.$route.query.channelCode,
			prdName:"爱健康家庭版落地页",
			gotoNext:false,
		}
	},
	created(){
    //隐藏微信操作菜单
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

	},
	methods:{
		//点击电话/试算保费
		buryingPoint(param){
      let action;
      if(param === 'buy'){
        action = "点击试算保费按钮";
        this.gotoNext = true;
      }else if(param === 'tel'){
        action = "点击电话图标";
      }
      //跳转到详情页
      if(this.gotoNext){
        this.$router.push({
          path:"/Product/ProDetails",
          query:{
            id:this.$route.query.id,
            channelCode:this.channelCode,
            orgCode:this.$route.query.orgCode,
          }
        });
      }

    },
    // 判断字符串是否为空
    checkMsgNull(msg) {
      if (msg != null && msg != undefined && msg != "" && msg != "undefined" && msg != "null") {
        return true;
      } else {
        return false; 
      }
    },
    
	}

}
</script>

