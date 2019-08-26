/**
 * Created by Administrator on 2019/8/22.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
let {BaseBusiness,parse,getSchema} = restRouterModel;
const emailProxy = require('../proxy/emailProxy');

const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

class VerificationCodeBusiness extends BaseBusiness{
    constructor(){
        super();
        this.validTime = 15;                    // 有效时长15分钟
    }
    async create(data, cxt){
        devUtils.checkRequiredParams(data, ['email']);   // 检查必填参数
        let { email,code=null} = data;
        if(!emailReg.test(email)){           // 检查email格式是否正确
            devUtils.Error('Error',400,8000,'Invalid email !');
        }
        if(!code){
            code = _.random(100100,999999).toString(); // 生成6位随机验证码
        }
        let expiredAt = moment().add(this.validTime, 'minutes').format('YYYY-MM-DD HH:mm:ss');     // 有效时间点
        let verificationCode = await this.model.getOne({email: email});
        // 数据库没有，则创建，有则更新
        if(verificationCode){
            verificationCode = {
                uuid: verificationCode.uuid,
                code: code,
                expiredAt: expiredAt,
                modifiedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            };
            verificationCode = await this.model.update(verificationCode);   // 更新数据
        }
        else{
            verificationCode = parse(this.resourceConfig,this.name,{email, code, expiredAt}); // 数据可格式化数据库
            verificationCode = await this.model.create(verificationCode);
        }
        return verificationCode;
    }

    async sendEmailVerificationCode(data,ctx){
        devUtils.checkRequiredParams(data.body, ['email']);   // 检查必填参数
        let { email } = data.body;
        if(!emailReg.test(email)){   // 检查email格式是否正确
            devUtils.Error('Error',400,8000,'Invalid email !');
        }
        let verificationCode = await this.create({email});   // 写入数据库
        // 发送email验证码
        let text = `您的注册验证码为${verificationCode.code}，${this.validTime}分钟内有效，请立即登陆`;
        let isSend = await emailProxy.sendEmail(email,text);
        // let isSend = true;
        return {ret: isSend};
    }

    async verifiedEmailVerificationCode(email, code){
        let verificationCode = await this.model.getOne({email: email});
        if(!verificationCode){  // 数据库中没有记录直接返回失败
            return { status: false};
        }
        let curTime = moment().format('YYYY-MM-DD HH:mm:ss');
        let expiredAt = verificationCode.expiredAt;
        if( (code !== verificationCode.code) || (curTime > expiredAt)){
            return { status: false};
        }
        return { status: true};
    }
}

module.exports = VerificationCodeBusiness;

