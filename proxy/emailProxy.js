/**
 * Created by Administrator on 2019/8/22.
 */

const _ = require('lodash');
const util = require('util');
const devUtils = require('develop-utils');
const request = require('common-request').request;
const config = require('../config/config');
const moment = require('moment');
const nodemailer = require('nodemailer');
let emailConfig = config.email;

class EmailProxy {
    constructor(){
        this.transporter = nodemailer.createTransport(emailConfig);
    }

    async sendEmail(email, text) {
        try {
            let mailOptions = {
                from: emailConfig.auth.user,  // 发件地址
                to: email,                    // 收件列表
                subject: '注册验证码',         // 标题
                //text和html两者只支持一种
                text: text,
                // html: '<b>Hello world ?</b>' // html 内容
            };

            let sendMail = util.promisify( this.transporter.sendMail.bind(this.transporter) );

            let info = await sendMail(mailOptions);
            console.log(`[EmailProxy] --> sendEmail ${email} success!`);
            return true
        }
        catch(e) {
            console.error(`[EmailProxy] --> sendEmail ${email} fail: `,e);
            return false;
        }
    }
}

let emailProxy = new EmailProxy();
module.exports = emailProxy;

// let email = 'keco339@sina.com';
// let text = `您好，注册验证码为123456，15分钟内有效，请立即登陆`;
// emailProxy.sendEmail(email,text).then(ret=>console.log(`ret: ${ret}`));
