<template>
    <div>
            <mt-header title="产品详情分享页" class="headerSty">
                    <i to="/" slot="left">
                    <mt-button icon="back" @click='back'></mt-button>
                  </i>
            </mt-header>
          <h2>{{data}}</h2>
          <h2>{{award}}</h2>
          <div class="sharecode">
              <img style="width: 100%; height: 100%;" :src="httpurl">
          </div>
          <div class='profoot' >
              <div class="profootleft" >
                    <img src="../../../static/images/icon-share.png" width="21" height="21"/>
                </div>
            
                 <div class="profootright" @click='profootright'>查看产品详情</div>
              
          </div>
    </div>
</template>

    <script>
     export default {
        name: 'productshare',
        props:['memberId','itemid','itemcode'],
        data(){
            return {
                data:'长按保存二维码',
                award:'分享好友有奖励',
                httpurl:'',
              
        }
      
    },
    mounted() {
            document.title='产品详情分享页';
        },
    created(){
         this.$http.post('/usermc/loginOrReg/getShareConfig?prdId='+this.$route.params.itemid+'&channelCode='+this.$route.params.itemcode+''
           
         ).then(res=>{
             this.$http.get('/prdmc/prdmcShop/createQRcode?url='+res.data.data+'').then(res=>{
              this.httpurl=res.data
              console.log( this.httpurl)
             })
            
        })
        

    },
    methods:{
       back(){
         this.$router.go(-1);//返回上一层
       },
       profootright(){
           this.$router.push({path:'/Product/ProDetails',query:{id:this.$route.params.itemid,Code:this.$route.params.itemcode}})
       }
    }
}
</script>

<style scoped>
    h2{
    text-align: center;
    /*color: rgb(255,109,0)*/
    color: rgb(253,118,44);
    font-size:.17rem;
    }
   h2:nth-child(2){
    margin-top: .5rem;
    margin-bottom: .17rem;
   }
     h2:nth-child(3){
       margin-bottom: .35rem; 
     }
     .sharecode{
        width: 3rem;
        height: 2.7rem;
        /*background: #333;*/
        margin: 0 auto;
     }
    .profoot{
        width: 100%;
        height: .46rem;
        /*background: #FFFFFF;*/
        font-size: .14rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
        border-top: 1px solid #DDDDDD;
    }
    
    .profoot .profootleft{
        padding:.1rem .3rem .1px;
        float: left;
    }
    .profootright{
        float: right;
        width: 1.15rem;
        height: .46rem;
        background: rgb(253,118,44);
        text-align: center;
        line-height: .46rem;
        color: #FFFFFF;
    }
</style>