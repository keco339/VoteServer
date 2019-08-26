/**
 * Created by Administrator on 2019/8/22.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const restRouterModel = require('rest-router-model');
let {BaseBusiness,parse,getSchema} = restRouterModel;
const emailProxy = require('../proxy/emailProxy');
const config = require('../config/config');

const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

class UserBusiness extends BaseBusiness{
    constructor(){
        super();
    }
    async create(data,ctx) { // 禁止调用该接口
        devUtils.Error('Error', 403, 9999, `The server refuses to execute the request!!!`);
    }
    async batchCreate(data,cxt) {  // 禁止调用该接口
        devUtils.Error('Error', 403, 9999, `The server refuses to execute the request!!!`);
    }
    async batchUpdate(data,ctx){   // 禁止调用该接口
        devUtils.Error('Error', 403, 9999, `The server refuses to execute the request!!!`);
    }
    // 注册
    async signup(data,cxt){
        devUtils.checkRequiredParams(data.body, ['email','code','password']);   // 检查必填参数
        let { email, code=null} = data.body;
        // 检查email格式是否正确
        if(!emailReg.test(email)){
            devUtils.Error('Error',400,8000,'Invalid email !');
        }
        // 判断是否已经注册
        let user0 = await this.model.getOne({email: email});
        if(user0){
            devUtils.Error('Error',400,8001,'The user had created!');
        }
        // 判定邮件验证码
        let {status} = await this.businesses['verificationCode'].verifiedEmailVerificationCode(email,code);
        if(!status){
            devUtils.Error('Error',400,8002,'code verified fail!');
        }
        // 从body中提取数据
        let userParams = _.keys(this.resourceConfig['user'].params);
        let user = _.pick(data.body, [...userParams, 'password']);
        user = parse(this.resourceConfig, this.name, user);
        // 对密码进行加密处理
        user.password = Buffer.from(user.password,'base64').toString();
        user.password = this.encryptPwdMd5(user.uuid, user.password);
        user = await super.create(user);  // 创建写入数据库


        // let ret = getSchema().generateResourceSchema(this.name, user);
        let ret = user;
        ret.token = this.genJwtToken(user);

        return ret;
    }
    // 登录
    async login(data,ctx){
        devUtils.checkRequiredParams(data.body, ['email', 'password']);

        let {email, password} = data.body;

        // 判断是否已经注册
        let user0 = await this.model.getOne({email: email});
        if(!user0){
            devUtils.Error('Error',404,8000,'user is not find!');
        }
        // 对输入的密码进行加密
        let userUUID = _.get(user0,'uuid') || 'TempUUID';
        password = Buffer.from(password,'base64').toString();
        password = this.encryptPwdMd5(userUUID, password);
        if(password !== user0.password){
            devUtils.Error('Error',404,8001,`incorrect import account or password!`);
        }

        let ret = user0;
        ret.token = this.genJwtToken(user0);

        return ret;
    }

    /*** 以下为辅助接口 ***/
    // 密码加密
    encryptPwdMd5(uuid, pwd) {
        let sha256 = crypto.createHash('sha256');
        let pwd_sha256 = sha256.update(`l6sXhQGX2a${uuid}SmIUFHFM1HerJe5K91XFbQ-123axc4128${pwd}585rf421688`).digest('base64');
        return 'sha256:' + pwd_sha256.substr(0, pwd_sha256.length-5); // 减掉后5位
    }
    // 生成JWT Token
    genJwtToken(user){
        // 生成JWT
        let userJWTInfo = {
            user:{
                uuid: _.get(user,'uuid') || null,
                email: _.get(user,'name') || null,
            }
        };
        let expiresIn = "30d"; // 有效时长 30天
        let token = jwt.sign(userJWTInfo, config.jwt.private_key,{ algorithm: 'RS256', expiresIn: expiresIn});
        return token;
    }
}

module.exports = UserBusiness;
