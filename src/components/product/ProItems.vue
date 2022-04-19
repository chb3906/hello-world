<template>
	<div class="proItems">

			<div class="item"  v-for="(item,index) in itemList" :key='index' >
				<router-link :to="{path:'/Product/ProDetails',query:{ id:item.prdId,Code:item.channelCode}}">
					<div class="itemBorder">
						<div class="item_left">
							<h3>{{item.productName}}</h3>
							<h4>{{item.prdDesc}}</h4><!-- 简述参数prdDesc -->
							<h5>{{item.price}}元起</h5><!-- 金额price -->
						</div>
						<div class="item_right" :style="{backgroundImage:'url(' +item.prdUrl+ ')'}" >
						</div>
					</div>
				</router-link>
			</div>


	</div>
</template>

<script>
	// import 	ProDetails from './ProDetails.vue';
	export default{
		name:'ProItems',
		// props:['id'],
		data(){
			return{
				id:'35',
				Code:'ZY-BK-002',//传到下一页的数据prdId    channelCode
				itemList:[]
			}
		},
		created(){
			console.log(11111)
			console.log(this.$store.state.MyProduct.id)
 this.$http.post('/prdmc/prdmcShop/productByCateId',{
 	cateId:this.$store.state.MyProduct.id,
 	channelCode:this.$router.history.current.query.channelCode
 }).then(res=>{
 console.log(res)
            this.itemList=res.data.data
               console.log(res.data.data )

            })

		},
		computed:{
			pages(){
				const pages = [];
				this.iconList.forEach((item,index) => {
					const page = Math.floor(index / 8)
					if(!pages[page]){
						pages[page] = []
					}
					pages[page].push(item);

				})
				return pages
			}
		},
		methods:{

			todetails(){
				this.popupVisible = '';
			}
		}
	}
</script>
<style lang='scss' scoped>
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
