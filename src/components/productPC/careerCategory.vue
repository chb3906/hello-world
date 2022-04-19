<template>
  <div class="wrap">
    <div class="container">
      <div class="header">
        <h3>阳光财产保险股份有限公司职业分类对照表</h3>
        <hr>
      </div>
      <div class="main">
        <div class="search">
          <div class="search-input">
            <el-input placeholder="请输入职业名称" class="input-with-select" v-model="keyword" @keyup.native="typeIn">
              <el-button slot="append" icon="el-icon-search" @click="doSearch(keyword)"></el-button>
            </el-input>
            <span class="delete-keyword" v-if="deleteIconVisible" @click="clearKeyWord"></span>
            <div class="search-error-tips" v-if="errorTipsObj.show">{{errorTipsObj.message}}</div>
          </div>
          <div class="tags">
            <a href="javascript:void(0)" v-for="item in keyWordList" @click="tagsClick(item)">{{item}}</a>
          </div>
        </div>
        
        <div class="" v-if="tableVisible">
          <div class="search-result" v-if="searchResultVisible">搜索结果 <span>{{resultLength}}</span>条</div>
          <table class="outside-table">
            <thead>
              <tr style="height: 0.08rem;">
                <td>大分类</td>
                <td>中分类</td>
                <td>小分类</td>
                <td>职业类别</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="first in tableData" :key="first.jobCode">
                <!--大分类-->
                <td style="width:20%" ref="levelOne">
                  {{first.jobName}}
                </td> 
                <!--中分类-->
                <td style="width:25%">
                  <table class="inside-table">
                    <tr v-for="second in first.data">
                      <td>
                        <!-- {{second.jobCode}}{{second.jobName}} -->
                        <table class="inside-table">
                          <tr v-for="(third,index) in second.data"  v-if="index==0" :key="second.data.jobCode">
                            <td  ref="levelTwo" :style="{height:Number(20*second.data.length)+'px'}" :data="second.data.length">
                              {{second.jobCode}}{{second.jobName}}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
                <!--小分类-->
                <td style="width:47%;border-right:none;">
                  <table class="inside-table">
                    <tr v-for="second in first.data">
                      <td>
                        <table class="inside-table">
                          <tr v-for="third in second.data" style="height:20px;" :key="third.jobCode+third.jobName">
                            <template v-if="third.jobCode=='' && third.jobType == ''">
                              <td colspan="2" ref="levelThree">{{third.jobName}}</td>
                            </template>
                            <template v-else>
                              <td style="border-right:1px solid #d2d2d2;width:20%">{{third.jobCode}}</td>
                              <td style="width:80%;text-align:left;padding-left:0.03rem;" ref="levelThree">{{third.jobName}}</td>
                            </template>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
                <!--职业类别-->
                <td style="width:8%;border-left:none;">
                  <table class="inside-table">
                    <tr v-for="second in first.data">
                      <td>
                        <table class="inside-table">
                          <tr v-for="third in second.data" style="height:20px;">
                            <td v-if="third.jobType == ''" style="border-left:none;">&nbsp;</td>
                            <td v-else style="border-left:1px solid #d2d2d2"  :key="third.jobCode+third.jobType">{{third.jobType}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <div class="no-result" v-if="noResultVisible">
          <div class="no-result-left"><img src="../../../static/images/bg_search_result_none@217_217.jpg" alt=""></div>
          <div class="no-result-right">
            <p>没有找到您要搜索的职业哦~</p>
            <div class="deco-line"></div>
            <ul>
              <li>不如这样试试：</li>
              <li class="common-li">职位名称换个说法</li>
              <li class="common-li">尽量减少输入字数</li>
              <li class="common-li">尝试搜索行业名称</li>
              <li class="common-li">搜索一下类似职位</li>
              <li class="common-li">拨打全国统一客户服务电话 95510</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    
    

  </div>
</template>

<script>
import Jquery from "jquery"
export default {
  name: "careerCategory",
  components: {
  },
  data () {
    return {
      tableData:[],
      tableOriginalData:[],//存储初始化数据
      tagValue:"",
      keyword:"",
      keyWordList:['内勤','儿童','无业','退休','农业','学生','工程师','教师','金融','家政','买卖'],
      resultLength:0,
      deleteIconVisible:false,
      tableVisible:true,
      searchResultVisible:false,
      noResultVisible:false,
      errorTipsObj:{
        show:false,
        message:""
      },
    }
  },
  created(){
    this.getList();
  },
  mounted () {
  },
  methods: {
    async getCareerCategoryData(jobName){
      let result = await this.$http.post("ordmc/ordEcJob/selectOrdEcJobs",{jobName:jobName});//同步请求

      // .then(result=>{
        // console.log(JSON.stringify(result));
        if(result.data.code == 200){

          if(result.data.data.length > 0){
            this.resultLength = result.data.total;
            this.tableData = result.data.data;
            this.tableVisible = true;//显示表格
            this.noResultVisible = false;//隐藏无搜索结果提示
            
            // console.log(JSON.stringify(this.tableData));
            if(jobName == "" || jobName == null || jobName.length <=0){//
              this.searchResultVisible = false;//隐藏搜索结果条数
              window.sessionStorage.setItem('tableOriginalData',JSON.stringify(result.data.data));//将初始化数据存入缓存
            }else{//按关键字检索
              this.searchResultVisible = true;//显示搜索结果条数
              this.$nextTick(_=>{
                //
                this.switchHtmlLabel(this.$refs.levelOne,jobName);
                this.switchHtmlLabel(this.$refs.levelTwo,jobName);
                this.switchHtmlLabel(this.$refs.levelThree,jobName);
                
              });
            }
          }else{
            this.tableVisible = false;
            this.noResultVisible = true;
          }
        }else{
          this.tableVisible = false;
          this.noResultVisible = true;
        }

      // }).catch(reject=>{
      //     this.tableVisible = false;
      //     this.noResultVisible = true;
      // });
    },
    //初始化职业类别列表
    getList(){
      this.tableOriginalData = JSON.parse(window.sessionStorage.getItem('tableOriginalData'));
      this.tableData = this.tableOriginalData;
      if(this.tableOriginalData == null || this.tableOriginalData == undefined || this.tableOriginalData == "" || this.tableOriginalData.length <= 0){
        this.getCareerCategoryData("");//若没有缓存，则请求接口
      }
    },
    //键盘抬起事件
    typeIn(){
      if(this.keyword != ""){
        this.deleteIconVisible = true;
        this.keyword = this.keyword.replace(/\s+/g,"");//禁止输入空格空格
      }else{
        this.deleteIconVisible = false;//隐藏删除图标
        //提示语去掉
        this.errorTipsObj.show = false;
        this.errorTipsObj.message = "";

        this.tableVisible = true;//显示表格
        this.noResultVisible = false;//隐藏无搜索结果提示
        this.searchResultVisible = false;//隐藏搜索结果条数
        this.tableData = this.tableOriginalData;//恢复展示初始列表
        //恢复样式
        this.$nextTick(_=>{
          this.hideHightLight(this.$refs.levelOne);
          this.hideHightLight(this.$refs.levelTwo);
          this.hideHightLight(this.$refs.levelThree);
        });
      }
    },
    //搜索
    doSearch(keyword){
      if(keyword == "" || keyword.length <=0 || keyword == undefined){
        return;
      }else{
        //判断是否非中文
        let res = new RegExp("^[a-zA-Z0-9]+$");//匹配英文和数字
        if(res.test(keyword)){
          this.errorTipsObj.show = true;
          this.errorTipsObj.message = "请输入中文职业名称";
          return;
        }
        //校验特殊字符
        let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");  
        if(pattern.test(this.keyword)){//若存在特殊字符
          this.errorTipsObj.show = true;
          this.errorTipsObj.message = "请输入中文职业名称";
          return;
        }

        this.errorTipsObj.show = false;
        this.errorTipsObj.message = "";
        //调接口
        this.getCareerCategoryData(keyword);
        
      }
      
    },
    //点击关键字
    tagsClick(tagValue){
      this.keyword = tagValue;
      this.deleteIconVisible = true;
      this.errorTipsObj.show = false;//提示语隐藏
      this.getCareerCategoryData(tagValue);
    },
    //点击x号
    clearKeyWord(){
      this.keyword = "";
      this.tableVisible = true;//显示表格
      this.noResultVisible = false;//隐藏无搜索结果提示
      this.searchResultVisible = false;//隐藏搜索结果条数
      this.deleteIconVisible = false;//x号隐藏
      this.errorTipsObj.show = false;//提示语隐藏
      this.tableData = this.tableOriginalData;//恢复展示初始列表
      // console.log(JSON.stringify(this.tableData),'original');
      //恢复样式
      this.$nextTick(_=>{
        this.hideHightLight(this.$refs.levelOne);
        this.hideHightLight(this.$refs.levelTwo);
        this.hideHightLight(this.$refs.levelThree);
      });
    },
    //搜索结果含有关键字的高亮显示
    keywordHighLight(string,keyword){
      let result = "";
      let subArr = string.split(keyword);//分割
      result = subArr[0]+"<span style='color:#FF790D'>"+keyword+"</span>"+subArr[1];//拼接
      return result;
    },
    //转化html标签
    switchHtmlLabel(node,jobName){
      for(let i=0;i<node.length;i++){
        if(node[i].innerText.indexOf(jobName) > -1){
          node[i].innerHTML = this.keywordHighLight(node[i].innerText,jobName);
        }
      }
    },
    //去掉高亮样式
    hideHightLight(node){
      for(let i=0;i<node.length;i++){
        if(node[i].children[0] != undefined){
          node[i].children[0].style.color = "#666";
        }
      }
    }
  },
  
}
</script>

<style scoped>
.wrap {
  padding-bottom: 50px;
  color: #666;
}
.header {
  min-width: 920px;
  text-align: center;
  padding-top: 0.05rem;
}
.header>h3{
  color:#FF790D;
  margin-bottom: 0.05rem;
}
.header>hr{
  height: 0;
  border-top:1px solid #eee;
}
.container {
  width: 920px;
  margin: 0 auto;
}
.tags{
    margin-top:0.02rem;
}
.tags a{
  font-size:14px;
  text-decoration: underline;
  padding:0 0.01rem;
}
.main>.search{
  margin-bottom: 0.1rem;
  text-align: center
}
.search-input{
  position: relative;
}
.delete-keyword{
  position: absolute;
  width: 20px;
  height: 20px;
  right: 295px;
  top: 10px;
  display: inline-block;
  background: url("../../../static/images/input_clear.jpg") no-repeat left center;
}
.main .el-input{
  width:50% !important;
}
.main table{
  text-align: center;
  width: 100%;
  height: 100%;
}
.outside-table thead td{
  background-color:#EFEFEF;
}
.outside-table tbody td,.outside-table thead td,.inside-table td{
  font-size:10px;
}
.outside-table tr>td,.outside-table tr>td{
  border:1px solid #d2d2d2;
}
.inside-table>tr>td{
  border-left: none;
  border-right:none;
  border-bottom:none;
}
.inside-table>tr:nth-of-type(1)>td{
  border-top:none;
}
>>>.main .el-input__inner{
  border:1px solid #FF790D !important;
  height: 40px !important;
  line-height: 40px !important;
}
>>> .el-input-group__append{
  background-color:#FF790D !important;
  color:#fff;
  border:1px solid #FF790D !important;
}
.search-result{
  background: #fbf9dd;
  text-align: center;
  font-size: 14px;
  height: 0.08rem;
  line-height: 0.08rem;
  margin:0 0.6rem 0.1rem 0.6rem;
}
.search-result span{
 color: #FF790D; 
}
.no-result{
  overflow: hidden;
}
.no-result-left{
  float: left;
  margin: 0.1rem 0 0 0.5rem;
}
.no-result-right{
  float: right;
  margin: 0.1rem 0.5rem 0 0;
}
.no-result-right p{
  padding-bottom: 0.05rem;
  background: url("../../../static/images/bg_border_bot@3_3.jpg") repeat-x bottom;
}
.no-result-right ul{
  font-size: 14px;
  margin:0.05rem 0;
}
.no-result-right ul>li.common-li{
  margin-top:0.01rem;
  list-style-type: disc;
  list-style-position: inside
}
.no-result-right ul>li:nth-of-type(1){
  color:#FF790D;
}
.search-error-tips{
  position: absolute;
  left: 250px;
  bottom: 35px;
  width: 174px;
  height: 34px;
  line-height: 28px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  background: url("../../../static/images/bg_search_error_tips@174_34.png") no-repeat;
}
</style>
