import axios from 'axios'
import wx from 'weixin-js-sdk';
import CryptoJS from "crypto-js";

export default {
	data(){
		this.oldTimeStamp ="";//记住timestamp，避免签名时的timestamp与传入的timestamp时不一致
		this.oldNonceStr =""; //记住nonceStr,避免签名时的nonceStr与传入的nonceStr不一致
	},

	weChatShare:function(data){
		var shareData = JSON.parse(data);//分享数据
		
		axios.get("/admin/getTicket", {params:{}}).then(result => {
			// console.log(JSON.stringify(result));
			if(result.status == 200){
				var timestamp1 =  this.getTimeStamp();
				var nonceStr1 = this.getNonceStr();
				var signature1 = this.getSign(result.data);

				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: "wx518f6ac1c229a2b8", // 必填，公众号的唯一标识
					timestamp: timestamp1, // 必填，生成签名的时间戳
					nonceStr: nonceStr1, // 必填，生成签名的随机串
					signature: signature1,// 必填，签名
					jsApiList: [	
						 'onMenuShareAppMessage',  //旧的接口，即将废弃,引用此接口声明是为了防止低版本不支持
						 'onMenuShareTimeline',//旧的接口，即将废弃,引用此接口声明是为了防止低版本不支持	
						 'updateAppMessageShareData',
						 'updateTimelineShareData',
						 'hideMenuItems'										
					] // 必填，需要使用的JS接口列表
				});
				
				wx.error(function(res){
					console.log(res,'config错误信息'); // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				});

				wx.ready(function () {//需在用户可能点击分享按钮前就先调用
					console.log(shareData);
					
					wx.checkJsApi({
					  jsApiList: [					 
					  'onMenuShareAppMessage',
					  'onMenuShareTimeline',
					  'updateAppMessageShareData',
					  'updateTimelineShareData',
					  'hideMenuItems'
					], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					  success: function(res) {
					    console.log(res,'检测接口返回信息');
					  // 以键值对的形式返回，可用的api值true，不可用为false
					  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
					  }
					});

					wx.hideMenuItems({
						menuList:[
						'menuItem:copyUrl',
						]
					});
					// 获取“分享给朋友”按钮点击状态及自定义分享内容接口 
					wx.onMenuShareAppMessage({
						title: shareData.title, // 分享标题
						desc: shareData.desc, // 分享描述
						link: shareData.link, // 分享链接
						imgUrl: shareData.imgUrl, // 分享图标
						type: 'link', // 分享类型,music、video或link，不填默认为link
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					

					wx.onMenuShareTimeline({
						title: shareData.title, // 分享标题
						desc: shareData.desc, // 分享描述
						link: shareData.link, // 分享链接
						imgUrl: shareData.imgUrl, // 分享图标
						type: 'link', // 分享类型,music、video或link，不填默认为link
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
			
				});

			}else{
				console.log(result);
			}
		});
	},
	//生成时间戳的方法
	getTimeStamp(){
		var timestamp=new Date().getTime();
		var timestampstring = timestamp.toString();//一定要转换字符串
		this.oldTimeStamp = timestampstring;
		return timestampstring;
	},
	//获得生成签名的随机串
	getNonceStr(){
		var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var maxPos = $chars.length;
		var noceStr = "";
		for (var i = 0; i < 32; i++) {
		noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		this.oldNonceStr = noceStr;
		return noceStr;
	},
	//生成签名的方法
	getSign(ticketDate){
		var noceStr = this.oldNonceStr;
		var timestampstr = this.oldTimeStamp;
		var url = location.href.split('#')[0];//获取当前页面的url（不带参数）以备生成签名时使用
		//第一步，对所有需要传入的参数加上appkey作一次key＝value字典序的排序
		var keyvaluestring = "jsapi_ticket="+ticketDate+"&noncestr="+noceStr+"&timestamp="+timestampstr+"&url="+url;
		var sign = CryptoJS.SHA1(keyvaluestring).toString();
		return sign;

	},

}
