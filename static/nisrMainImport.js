/**
	appId：应用唯一id，登录后台注册应用后获取；
	
	appKey：应用唯一秘钥，登录后台注册应用后获取；
	
	enableAnonymousLogin（Y/N）：是否自动开始采集轨迹（开启后自动创建轨迹id），默认Y；
	
	extraSegment（Y/N）：是否开启嵌入自定义投保环节功能，默认N；
		
	Array[2] importAppVersionAndVersionId：页面版本设置，可自定义实现，
		将版本号和git/svn版本Id作为方法返回值，如["1.00.01", "c8f2eb141041a373d4f125b8dcf610f0"]，
		默认为["0", "0"]，即使用后台当前最新应用版本，若配置新版本则后台会自动记录版本更新
**/

var appId = '239bdca882b4601fc516bc90d1e9637f'
var appKey = 'fa3770433f0540258e37dc908511aad2'

var enableAnonymousLogin = "N"

var extraSegment = "N"
// var extraSegment = "Y"

var sameTimePageRecord = "Y"
// var importAppVersionAndVersionId = () => {
// 	return ["0", "0"];
// }