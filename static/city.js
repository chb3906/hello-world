export default function address(data){
    // debugger;
	this.data=data || [];
	this.keyName=["cityList"]
	this.arr=[]  //存储选中的数据
	this.num=0  //当前的层级
	this.nowData=this.data   //当前的数据
	/*this.cont"ent=document.getElementById("addressBox") || ""
	this.content?void 0 : this.render();*/
}
address.prototype={
	render:function(){
		var html='<div id="addressBox" class="show"><div class="addContent"><header>所在区域</header><nav class="tabs"><span class="cur">请选择</span></nav><ul class="addBody">'
		var arr=this.renderList(this.data)	
		html+=arr.join("")+'</ul></div></div>';
		$(".Pro_insur").append(html)
		// document.body.appendChild(html);
		this.content=document.getElementById("addressBox")
		this.body=this.content.querySelector(".addBody")
		this.nav=this.content.querySelector(".tabs")
		this.event()
	},
	show:function(icon){
		this.icon=icon
		this.arr=[]  
		this.num=0  
		this.nowData=this.data 
		this.render()
	},
	renderList:function(data){
		var arr=[]
		data.forEach(function(item,index){
			arr.push("<li data-item="+index+">"+item.regionName+"</li>")
		})
		return arr
	},
	event:function(){
		var _this=this
		$(this.content).on("click",".addBody li",function(){
			var _index=this.dataset.item - 0	
			_this.arr.splice(_this.num,1,_index)
			_this.body.scrollTop=0
			if(_this.num < 1){
				$(_this.content).find(".tabs span").eq(_this.num).nextAll().remove()
				_this.renderNav(_this.nowData[_index].regionName)
				/*if(_this.arr.length-1 <= _this.num){		//  是否重新渲染tabs
					_this.renderNav(_this.nowData[_index].regionName)	
				}else{
					$(_this.content).find(".tabs span").eq(_this.num+1).addClass("cur").siblings().removeClass("cur")
				}	*/		
				var _key=_this.keyName[_this.num]
				_this.num++
				_this.nowData=_this.nowData[_index][_key]
				var arr=_this.renderList(_this.nowData)
				$(_this.body).html(arr.join(""))			
			}else{		//没有下级

				_this.close();
			}			
		})
		$(this.content).on("click",".tabs span",function(){
			if($(this).hasClass("cur")) return;
			_this.arr.splice(_this.num,1,0)
			var _index=$(this).data("item") - 0
			$(this).addClass("cur").siblings().removeClass("cur")
			_this.nowData=_this.data	
			_this.num=_index
			_this.body.scrollTop=0

			for(var i=0;i<_index;i++){
				var _n=_this.arr[i]
				var _key=_this.keyName[i]
				_this.nowData=_this.nowData[_n][_key]
			}
			var arr=_this.renderList(_this.nowData)
			$(_this.body).html(arr.join(""))
		})
	},
	renderNav(txt){
		var $nav=$(this.nav)
		$nav.find("span").eq(this.num).removeClass("cur").text(txt).data("item",this.num)
		$nav.append("<span class='cur'>请选择</span>")
	},
	close:function(){
		var _this=this;
		this.content.classList.remove("show");
		var _selectArr=[];
	    var _cityName=[];
	    var _cityName="";
		var arr=this.arr;
		var data=this.data;
		var _key=["cityList","countyList"]
	    arr.forEach(function(item,index){
	        var nowKey=_key[index]
	        _selectArr.push(data[item].regionNum);
	        _cityName=_cityName+data[item].regionName+"    ";
	        data=data[item][nowKey];
		});
		document.getElementById(this.icon).value=_cityName;
	    document.getElementById(this.icon).setAttribute("data-cityNum",_selectArr);
		setTimeout(function(){
			$(_this.content).remove()
		},300)
		//console.log("close",this.arr);
	}
}