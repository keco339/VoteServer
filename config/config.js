"use strict";
const fs = require('fs');
let config = {
    //服务器配置
    server: {
        domain : 'localhost',       // 服务对外暴露的，IP或域名
        port : 6000,                // 端口
    },
    //debug 为true时，用于本地调试
    debug : false,
    //接口统计开关
    record : false,
    // knex配置
    knex: {
        client: 'mysql',
        connection: {
            host : '192.168.7.5',         // 数据库IP
            port : 3306,                  // 数据库端口

            user : 'root',                // 数据库账号
            password : '123456',          // 数据库密码

            database : 'T_VoteServerDB', // 数据库名称
        },
        pool: {min: 0, max: 20},
    },
    email: {
        service: 'qq',            // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465,                // SMTP 端口
        secureConnection: true,   // 使用 SSL
        auth: {
            user: '565126548@qq.com',
            pass: 'rnmqergqkpnzbfea'  // 此密码为QQ邮件第三方授权码
        }
    },
    //JWT
    jwt: {
        private_key : fs.readFileSync(__dirname + '/../ssl/jwt_rsa/jwt_rsa_private_key.pem'),
        public_key : fs.readFileSync(__dirname + '/../ssl/jwt_rsa/jwt_rsa_public_key.pem')
    },
    skipJwtInterfaces: [],
    //redis配置
    redis: {
        host: '192.168.7.210',
        port : 6379,
        db : 0,
        password : ''
    },

    ThirdServerByCommonConfig: [],
    cache : {
        // 缓存开关控制
        open : false,
        // 缓存失效时间,单位ms
        time : 1000,
    },
    // Apollo配置中心
    configServerUrl:'',
};

// 从全局上层CommonConfig中读取环境变量
try {
    const commonConfig = require('../../CommonConfig/serverConfig');
    let {server_domain=null,ThirdServer_domain=null,knex_connection=null,redis=null,kafkaConfig=null}=commonConfig;

    if(server_domain){config.server.domain = server_domain;}
    if(ThirdServer_domain && config.ThirdServerByCommonConfig){
        config.ThirdServerByCommonConfig.map( key=>{
            config[key].host=ThirdServer_domain;
        } );
    }
    if( knex_connection && config.knex.connection ){
        Object.keys(knex_connection).map(key=>{
            config.knex.connection[key] = knex_connection[key];
        });
    }
    if (redis && config.redis){
        Object.keys(redis).map(key=>{
            config.redis[key] = redis[key];
        });
    }
    if ( kafkaConfig && config.kafka ){
        Object.keys(kafkaConfig).map(key=>{
            config.kafka[key] = kafkaConfig[key];
        });
    }
    console.log('The read common config.');
}
catch(e) {
    console.warn('The common config does not exist!!!');
}

//从环境变量中覆盖配置参数，及默认优先使用环境变量参数
function readEnvParams( obj , prefix = null) {
    prefix = prefix ? prefix+'_' :'';
    Object.keys( obj ).map( key =>{
        let param = prefix+key;
        if( typeof obj[key] == 'object' ){
            readEnvParams( obj[key], param )
        }
        else {
            let env = param.toUpperCase();
            if( process.env[env] ){
                console.log(`Read ENV ${env}`);
                obj[key] = process.env[env];
            }
        }
    });
}
readEnvParams(config);

// 读取Apollo config
async function readConfigServerParams() {
    const _ = require('lodash');
    if(!_.isEmpty(config.configServerUrl)) {
        const apollConfig = require('apoll-config').apollConfig;
        const packageConfig = require('../package');
        console.log('read configServer URL from env configServerUrl:' + JSON.stringify(config.configServerUrl));
        return await  apollConfig.readConfigFromConfigServer(packageConfig.name,config.configServerUrl,config);
    }
}
config.readConfigServerParams = readConfigServerParams;

module.exports = config;
