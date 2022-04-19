/*
* @Author: luojunjie20120503
* @Date:   2018-09-04 17:21:37
* @Last Modified by:   luojunjie20120503
* @Last Modified time: 2018-09-04 17:37:05
*/

// 表单验证
     // 姓名校验
export  function verificationName(){
    var Name = /^[\u4e00-\u9fa5]{2,4}$/;
    if (this.userName == '') {
        Toast({
            message: '请输入用户名',
            position: 'top',
            duration: 1000
          });
        // this.Name = "请输入用户名";
    } else if (!Name.test(this.userName)) {
        Toast({
            message: '用户名不正确',
            position: 'top',
            duration: 1000
          });
        // this.Name = "用户名不正确";
    } else if (Name.test(this.userName)) {
        this.Name = "";
        this.list.push(!this.test);
    }
}
// 身份证号校验
export function verificationCard () {
    var Card = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (this.cardCode == '') {
        Toast({
            message: '请输入身份证号',
            position: 'top',
            duration: 1000
          });
        // this.card = "请输入身份证号";
    } else if (!Card.test(this.cardCode)) {
        Toast({
            message: '身份证号不正确',
            position: 'top',
            duration: 1000
          });
        // this.card = "身份证号不正确";
    } else if (Card.test(this.cardCode)) {
        this.card = "";
        this.list.push(!this.test);
    }
}
// 手机号码校验
export function verificationPhone () {
    var phones = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    if (this.userPhone == '') {
         Toast({
            message: '请输入手机号',
            position: 'top',
            duration: 1000
          });
        // this.Phone = "请输入身份证号";
    } else if (!phones.test(this.userPhone)) {
         Toast({
            message: '手机号不正确',
            position: 'top',
            duration: 1000
          });
        // this.Phone = "身份证号不正确";
    } else if (phones.test(this.userPhone)) {
        this.Phone = "";
        this.list.push(!this.test);

    }
}
// 银行卡号
export function verificationAccount() {
    var Accounts = /^\d{18}$/;
    if (this.bankAccount == '') {
         Toast({
            message: '请输入银行卡号',
            position: 'top',
            duration: 1000
          });
        // this.Account = "请输入银行卡号";
    } else if (!Accounts.test(this.bankAccount)) {
         Toast({
            message: '银行卡号不正确',
            position: 'top',
            duration: 1000
          });
        // this.Account = "银行卡号不正确";
    } else if (Accounts.test(this.bankAccount)) {
        this.Account = "";
        this.list.push(!this.test);

    }
}

export function sessionOperation(){
    return {
        get: function(key){
            let valueObj = window.sessionStorage.getItem(key)
            if (valueObj != null) {
                return JSON.parse(valueObj)
            } else {
                return false
            }
        },
        set: function (key,value={}) {
            let valueObj = JSON.stringify(value)
            window.sessionStorage.setItem(key,valueObj)
        },
        clean: function (key) {
            let valueObj = window.sessionStorage.getItem(key)
            if (valueObj != null) {
                window.sessionStorage.removeItem(key)
            } else {
                return false
            }
        }
    }
}