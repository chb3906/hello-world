export function address(data) {
  this.data = data || [];
  this.keyName = ["cityList", "countyList"];
  this.arr = []; //存储选中的数据
  this.num = 0; //当前的层级
  this.nowData = this.data; //当前的数据
}
address.prototype = {
  render: function() {
    var html =
      '<div id="addressBox" class="show"><div class="addContent"><header>所在区域</header><nav class="tabs"><span class="cur">请选择</span></nav><ul class="addBody">';
    var arr = this.renderList(this.data);
    html += arr.join("") + "</ul></div></div>";
    $(".newDetails-wrap").append(html);
    this.content = document.getElementById("addressBox");
    this.body = this.content.querySelector(".addBody");
    this.nav = this.content.querySelector(".tabs");
    this.event();
  },
  show: function(result) {
    this.arr = [];
    this.num = 0;
    this.nowData = this.data;
    this.render();
    this.result = result;
  },
  renderList: function(data) {
    var arr = [];
    data.forEach(function(item, index) {
      arr.push("<li data-item=" + index + ">" + item.regionName + "</li>");
    });
    return arr;
  },
  event: function() {
    var _this = this;
    $(this.content).on("click", ".addBody li", function() {
      console.log("点击 obdy -----》");
      var _index = this.dataset.item - 0;
      _this.arr.splice(_this.num, 1, _index);
      _this.body.scrollTop = 0;
      if (_this.num < 1) {
        $(_this.content)
          .find(".tabs span")
          .eq(_this.num)
          .nextAll()
          .remove();
        _this.renderNav(_this.nowData[_index].regionName);
        var _key = _this.keyName[_this.num];
        _this.num++;
        _this.nowData = _this.nowData[_index][_key];
        var arr = _this.renderList(_this.nowData);
        $(_this.body).html(arr.join(""));
      } else {
        //没有下级

        _this.close();
      }
    });
    $(this.content).on("click", ".tabs span", function() {
      console.log("item is tip is ");
      if ($(this).hasClass("cur")) return;
      _this.arr.splice(_this.num, 1, 0);
      var _index = $(this).data("item") - 0;
      $(this)
        .addClass("cur")
        .siblings()
        .removeClass("cur");
      _this.nowData = _this.data;
      _this.num = _index;
      _this.body.scrollTop = 0;

      for (var i = 0; i < _index; i++) {
        var _n = _this.arr[i];
        var _key = _this.keyName[i];
        _this.nowData = _this.nowData[_n][_key];
      }
      var arr = _this.renderList(_this.nowData);
      $(_this.body).html(arr.join(""));
    });
  },
  renderNav(txt) {
    var $nav = $(this.nav);
    $nav
      .find("span")
      .eq(this.num)
      .removeClass("cur")
      .text(txt)
      .data("item", this.num);
    $nav.append("<span class='cur'>请选择</span>");
  },
  close: function() {
    var _this = this;
    this.content.classList.remove("show");
    var _selectArr = [];
    var _cityName = [];
    var _cityName = "";
    var cityCode = "";
    var arr = this.arr;
    var data = this.data;

    var _key = ["cityList", "countyList"];
    arr.forEach(function(item, index) {
      var nowKey = _key[index];
      cityCode = data[item].regionNum;
      _selectArr.push(data[item].regionNum);
      if (index == arr.length - 1) {
        _cityName = _cityName + data[item].regionName;
      } else {
        _cityName = _cityName + data[item].regionName + " ";
      }
      data = data[item][nowKey];
    });
    console.log(_selectArr);
    $(_this.content).remove();
    if (this.result) {
      this.result(cityCode, _cityName);
    } else {
    }
  }
};