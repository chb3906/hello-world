<template>
	<div class="product">
		<Header></Header>		
		 <ProIcons></ProIcons>	
	</div>
</template>

<script>
	import Header from './Header.vue'	
	import ProIcons from './ProIcons.vue'	
	
	export default{
		name:'Product',
		components:{
			Header,
			ProIcons,
		}
	}
</script>
<style scoped>
	.proItems{
		margin-bottom: 70px;

	}
</style>