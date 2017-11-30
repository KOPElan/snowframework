const cryptoHelper = require('./cryptoHelper');

const authentication = {
    init: function (snowfSetting) {
        this.setting = snowfSetting.authentication;
    },
    signIn: function (res, user, isRemember) {
        let userStr = JSON.stringify(user);
        userStr = cryptoHelper.getEncAse192(userStr, 'snowframework-authentication');

        let cookieStr = this.setting.cookieName + '=' + userStr;
        //cookie有效期
        if (isRemember) {
            let date = new Date();
            date.setTime(date.getTime() + this.setting.expires * 1000);
            cookieStr += ';Expires=' + date.toGMTString();
        }
        cookieStr += ';domain=' + this.setting.domain;
        cookieStr += ';path=/';
        cookieStr += ';httpOnly=true';

        res.setHeader('Set-Cookie', cookieStr);
    },
    signOut: function (res) {
        let cookieStr = this.setting.cookieName + '=""';
        //cookie有效期        
        cookieStr += ';Expires=' + new Date(0).toGMTString();
        cookieStr += ';domain=' + this.setting.domain;
        cookieStr += ';path=/';
        cookieStr += ';httpOnly=true';
        
        res.setHeader('Set-Cookie', cookieStr);
    }
}

module.exports = authentication;