<template>
<div>
	<!--<div class="proIcons">
		<div class="icon" :class="{iconActive:orderState === item.id}" v-for="item in ProIconslist" :key ="item.id" @click="sendId(item.id)">
			<div class="icon-img">
				<img class = "icon-img-content" :src ="item.imgUrl" alt="">
			</div>
			<p class="icon-desc">{{item.cateName}}</p>
		</div>
	</div>-->
	<div class="proItems">
			<div class="item"  v-for="(item,index) in itemList" :key='index' >
				<router-link :to="{path:'/Product/ProDetails',query:{ id:item.prdId,orgCode:item.orgCode,channelCode: item.channelCode,fromListPage: 'true'}}">
					<div class="itemBorder">
						<div class="item_left">
							<h3>{{item.productName}}</h3>
							<!-- <h4>{{item.prdDesc}}</h4>简述参数prdDesc -->
							<h5>{{item.price}}元起</h5><!-- 金额price -->
						</div>
						<div class="item_right" :style="{backgroundImage:'url(' +item.prdUrl+ ')'}" >
						</div>
					</div>
				</router-link>
			</div>
	</div>
</div>
</template>

<script>
	export default{
		name:'ProIcons',
		props:['id'],
		data(){
			return{
				ProIconslist:[],
				// id:'35',
				// Code:'ZY-BK-002',//传到下一页的数据prdId    channelCode
				itemList:[],
				cateid:'0',
				Code:'',
				orderState:0
			}
		},
    created(){
		     //判断是否来自首页incon
		 	if(this.$route.query.id==undefined){
        this.cateid="0"
		 	}else{
		 	  this.cateid=this.$route.query.id
		 	}
//       this.getChannlCode()
      this.getitemslist();
               /*this.getProIconslist()*/
    },
    methods: {
//      // 获取渠道码
//     getChannlCode(){
//        // var channelName = '微信商城'
//      this.$http.get('/prdmc/grpChannel/getGrpChannelCodeByChannelName?channelName=微信商城（自营）').then(res=>{
//              this.Code=res.data
//          this.getitemslist(this.cateid,this.Code)
//        })
//      },
			//获取险种图标
      getProIconslist(){
       this.$http.post('/prdmc/prdmcShop/productCate').then(res=>{
           this.ProIconslist=res.data.data
        })
      },
			//获取不同险种
			getitemslist(){
        this.$http.post('/prdmc/prdmcShop/productByCateId',{
					 	cateId:this.cateid,
						orgCode:'CPK',
						channelCode: 'DC22MD1330070023',
					 }).then(res=>{
              this.itemList=res.data.data
            })
      },
		 //险种进行分类
      sendId(id){
        console.log(this.cateid)
				this.getitemslist(id,this.Code)
				this.orderState=id
			},
			todetails(){
				this.popupVisible = '';
			}
    },

	}
</script>
<style lang='scss' scoped>
	.proIcons{
		display: flex;
		flex-direction: row;
		flex-wrap:wrap;
		margin: 0 auto;
		font-size: .15rem;
		text-align: center;
		margin-top: 0.2rem;
		color: #515151;
		padding-bottom: 10px;
		border-bottom: 1px solid #eee;
		padding:0 0.15rem;
	}
	.icon{
		width: 20%;
		text-align: center;
		margin-bottom: 0.1rem;
		padding-bottom:0.05rem;

	}
	.iconActive{
		border-bottom:0.02rem solid #00AEE6;
	}
	.icon-desc{

		margin-top: .1rem;
		font-size: .15rem;
	}
	.icon-img-content{
		width:0.3rem;
		height:0.3rem;
	}
		$sc:25;
	.item{
		width: 100%;
		// height:1.3rem;
		overflow:hidden;
		border-bottom: 0.01rem solid #ddd;
		padding-bottom:0.15rem;
	}

	.itemBorder{
		// height:1.3rem;
		width: 3.5rem;
		margin: .15rem auto 0px;
	}
	.item_left{
		width: 2.35rem;
		height:1rem;
		float: right;
		// margin-top: .1rem;
		flex: 1;
		margin-left: .15rem;
	}
	.item_right{
		width: 1rem;
		height:1rem;
		/*background: red;*/
		float: left;
		// margin-top: .1rem;
		border-radius: 0.05rem;
		background-size: cover;

	}
	.item_right img{
		margin-top:-.73rem;
		border-radius: 4px;
		width: 1rem;
		height: 1rem;
	}
	.item_left h3{
		font-size: .16rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.item_left h4{
		font-size: .12rem;
		margin: 0.1rem 0 0.1rem 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.item_left h5{
		font-size: .17rem;
		color: rgb(253,118,44);
		/* margin: 10px auto 0px; */
	}

</style>
