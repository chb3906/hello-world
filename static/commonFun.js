export default {
  dateMinus(sd, ed) {
    var edate = new Date(ed.replace(/-/g, "/")); //零点开始,例2018-12-28 00:00:00
    var days = edate.getTime() - (sd.getTime() - 8 * 3600 * 1000); //时区晚八小时,减去
    var day = parseInt(days / (1000 * 60 * 60 * 24) + 1); //因为从零点开始,需要加上一天
    return day;
  },
  accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  //解决javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显
  accMul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  },
  /**
   *
   * @param arr 数组，元素是对象
   * @param field 对象某个属性
   * @param value 对象某个属性的值
   * @return false 或 数字 >=0
   */
  indexOfArr(arr, field, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][field] == value) {
        return i;
      }
    }
    return false;
  },
  //格式化日期
  formatDateTime(inputTime) {
    var result = "";
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  },
  //获取Url中的某个参数值
  getUrlValueByName(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  },
  //校验身份证
  shenfenzheng(value) {
    var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  // 校验身份证格式
  checkIdCard(name) {
    var regExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    return regExp.test(name);
  },
  GetAge(identityCard, startDate, cardType) {
    if (cardType == "1") {
      //大陆身份证身份证
      var len = (identityCard + "").length;
      if (len == 0) {
        return 0;
      } else {
        if (len != 15 && len != 18) {
          //身份证号码只能为15位或18位其它不合法
          return 0;
        }
      }
      var strBirthday = "";
      if (len == 18) {
        //处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday =
          identityCard.substr(6, 4) +
          "/" +
          identityCard.substr(10, 2) +
          "/" +
          identityCard.substr(12, 2);
      }
      if (len == 15) {
        strBirthday =
          "19" +
          identityCard.substr(6, 2) +
          "/" +
          identityCard.substr(8, 2) +
          "/" +
          identityCard.substr(10, 2);
      }
    } else {
      //非大陆身份证(户口本、护照、港澳通行证等)
      var strBirthday = identityCard.replace(new RegExp("-", "g"), "/"); //出生日期替换
    }

    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday); //出生日期
    var nowDateTime = new Date(startDate); //起保日期

    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (
      nowDateTime.getMonth() < birthDate.getMonth() ||
      (nowDateTime.getMonth() == birthDate.getMonth() &&
        nowDateTime.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  },
  GetDay(identityCard, startDate, cardType) {
    if (cardType == "1") {
      //大陆身份证身份证
      var len = (identityCard + "").length;
      if (len == 0) {
        return 0;
      } else {
        if (len != 15 && len != 18) {
          //身份证号码只能为15位或18位其它不合法
          return 0;
        }
      }
      var strBirthday = "";
      if (len == 18) {
        //处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday =
          identityCard.substr(6, 4) +
          "/" +
          identityCard.substr(10, 2) +
          "/" +
          identityCard.substr(12, 2);
      }
      if (len == 15) {
        strBirthday =
          "19" +
          identityCard.substr(6, 2) +
          "/" +
          identityCard.substr(8, 2) +
          "/" +
          identityCard.substr(10, 2);
      }
    } else {
      //非大陆身份证(户口本、护照、港澳通行证等)
      var strBirthday = identityCard.replace(new RegExp("-", "g"), "/"); //出生日期替换
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday); //出生日期
    var nowDateTime = new Date(startDate); //起保日期
    //  var day = birthDate.getDate(); //获取出生总天数
    var day = parseInt(
      (nowDateTime.getTime() - birthDate.getTime()) / (24 * 60 * 60 * 1000)
    ); //获取出生总天数

    return day;
  },
  getAgeIndex(upParams) {
    var calcIdKeys = [];
    calcIdKeys = upParams.calcIdKeys;
    console.log("属性" + JSON.stringify(calcIdKeys) + "**" + calcIdKeys.length);
    for (var l = 0; l < calcIdKeys.length; l++) {
      console.log("属性" + "年龄" == calcIdKeys[l] + "**" + calcIdKeys[l]);
      if ("年龄" == calcIdKeys[l]) {
        //  upParams.calcIds[l] = entry.id;
        //移除 该数组
        //delete upParams.calcIdKeys;
        console.log("年龄属性下标发送====>" + JSON.stringify(l));
        return l;
      }
    }
  },
  // 获取年龄因子在calcIdKeys中的索引
  getAgeIndexByCalcIdKeys(calcIdKeys) {
    for (var l = 0; l < calcIdKeys.length; l++) {
      if ("年龄" == calcIdKeys[l]) {
        return l;
      }
    }
  },
  //是否符合投保
  isContent(spaceBewteen, age, day) {
    // spaceBetween => 30天-70岁 || 18岁-60岁 || 18岁
    // age = 0 || 1 || 2 || ...
    var agelist = spaceBewteen.split("-");

    //  console.log(spaceBewteen);
    //假如区间只有18岁或19岁
    if (agelist.length === 1) {
      if (age - 0 === agelist[0].slice(0, -1) - 0) {
        // 满足条件
        return true;
      } else {
        return false;
      }
    } else {
      // 有区间范围
      let flag = true;
      let num = 0;
      agelist.forEach(item => {
        // 有天
        if (item.indexOf("天") !== -1) {
          flag = false;
          num++;
        }
      });
      if (flag) {
        // 只有岁 ['18岁', '60岁']
        if (
          age - 0 >= agelist[0].slice(0, -1) - 0 &&
          age - 0 <= agelist[1].slice(0, -1) - 0
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        // 有天有岁 ['30天', '60岁']
        if (num === 1) {
          if (
            day - 0 >= agelist[0].slice(0, -1) - 0 &&
            age - 0 <= agelist[1].slice(0, -1) - 0
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            day - 0 >= agelist[0].slice(0, -1) - 0 &&
            day - 0 <= agelist[1].slice(0, -1) - 0
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  },
  //拷贝对象或数组
  deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object") {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  //校验手机号
  checkMobilePhone(phoneNumber) {
    var regExp = /^1[3456789]\d{9}$/;
    return regExp.test(phoneNumber);
  },
  // 校验邮箱
  checkEmail(email) {
    var regExp = /^[a-z0-9]+([._\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i;
    return regExp.test(email);
  },
  // 判断字符串是否为空
  checkMsgNull(msg) {
    if (
      msg != null &&
      msg != undefined &&
      msg != "" &&
      msg != "undefined" &&
      msg != "null"
    ) {
      return true;
    } else {
      return false;
    }
  },
  // 校验名称
  checkName(name) {
    return /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,20})$/.test(name);
  },
  // 校验正整数
  checkZhengNum(name) {
    var regExp = /^[0-9]+$/;
    if (regExp.test(name)) {
      return true;
    } else {
      return false;
    }
  },
  // 校验组织机构代码
  checkGroupNumber(name) {
    return /^[\w\d-]+$/i.test(name);
  },
  // 校验统一社会信用代码
  checkCommonNumber(name) {
    return /^([0-9A-Z]{2})([0-9]{6})([0-9A-Z]{8})([0-9X])([0-9A-Z])$/.test(
      name
    );
  },
  // 港澳通行证/居民户口本等
  checkOtherCard(name) {
    return !/^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/.test(name);
  },
  // 校验车牌号
  checkVehicleNumber(name) {
    var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{4,6}$/;
    var rehm = /^[A-Z]{2}[0-9]{4}$/;
    return re.test(name) || rehm.test(name);
    // var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    // var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    // if (name.length == 7) {
    //   return creg.test(name);
    // } else if (name.length == 8) {
    //   return xreg.test(name);
    // } else {
    //   return false;
    // }
  },
  // 校验车架号
  checkCjh(name) {
    return /^[A-HJ-NPR-Z\d]{17}$/.test(name)
  },
  nospace(str) {
    if (str != null && str != undefined) {
      return str.replace(/\s+/g, "");
    } else {
      return "";
    }
  },
  commonFormatDate(date, fmt) {
    fmt = fmt || "yyyy-MM-dd";
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
        );
      }
    }
    return fmt;
  },
  // 生成随机用户标识
  getUserSign() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var hour = date.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    var minute = date.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    var second = date.getSeconds();
    if (second < 10) {
      second = "0" + second;
    }
    return (
      (year + "").substring(2) +
      month +
      day +
      hour +
      minute +
      second +
      (parseInt(Math.random() * (99999 - 10000)) + 10000)
    );
  },
  // 校验宠物昵称
  checkNc(name) {
    return /^[\u4e00-\u9fa5A-Za-z0-9]{0,20}$/.test(name);
  },
  // 校验宠物毛色
  checkMs(name) {
    return /^[\u4e00-\u9fa5]{1,5}$/.test(name);
  },
  setMyLocalStorage(key, value) {
    var date = new Date().getTime() + 600000;
    var data = { value: value, expirse: date };
    localStorage.setItem(key, JSON.stringify(data));
  },
  getMyLocalStorage(key) {
    var data = JSON.parse(localStorage.getItem(key));
    if (data !== null) {
      if (data.expirse != null && data.expirse < new Date().getTime()) {
        localStorage.removeItem(key);
      } else {
        return data.value;
      }
    }
    return null;
  },
  myReplaceAllUrl(res) {
    return JSON.parse(
      JSON.stringify(res).replace(
        /p137-prod.oss-cn-szfinance.aliyuncs.com/g,
        "mkimg.ygbx.com"
      )
    );
  },
  setTracebackSession() {
    window.sessionStorage.traceback = "yes";
  },
  getAdListBySeat(list, seat) {
    if (list.length == 0) {
      return [];
    }
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].seat == seat) {
        arr.push(list[i]);
      }
    }
    return arr;
  },
  /**
   * 规定：
   * 0：产品详情
   * 1：健康告知
   * 2：保单填写
   * 3：支付成功
   * 
   * 规定：
   * 0：移动端
   * 1：微信
   * 2：微信小程序
   * 3：PC端
   */
  getPageid(pageType) {
    let userAgentType = window.sessionStorage.getItem('userAgentType')
    // 外层数组表示浏览器环境，内层数组表示不同页面
    let arr = [
      ['MB0000004','MB0000006','MB0000007','MB0000010'],
      ['WX0000004','WX0000006','WX0000007','WX0000010'],
      ['XCX0000004','XCX0000006','XCX0000007','XCX0000010'],
      ['PC0000004','PC0000006','PC0000007','PC0000010'],
    ]
    return arr[userAgentType][pageType]
  },
};
