const config = require('./config');
let {domain, port} = config.server;

// REST 资源声明配置
module.exports = {
    // 用户
    "user":{
        rest_api: 'batch',
        // super: 'tenant',
        extend_api: [
            {name:'signup', method:'POST',url: '/api/:version/signup', statusCode:200},
            {name:'login', method:'POST',url: '/api/:version/login', statusCode:200},
        ],
        params: {
            name: {type:'string'},                      // 用户名称
            email: {type:'string'},                     // 电子邮件
            status: {type:'string', value:'enabled'},   // 状态
            createdAt: {type:'time'},                   // 创建时间
            modifiedAt:{type:'time'},                   // 修改时间
        },
    },
    // 验证码
    "verificationCode":{
        rest_api: 'batch',
        extend_api: [
            {name:'sendEmailVerificationCode', method:'POST',url: '/api/:version/sendEmailVerificationCode', statusCode:200},
        ],
        params: {
            email: {type:'string'},                     // 电子邮件
            code: {type:'string'},                      // 验证码
            expiredAt: {type:'time'},                   // 过期时间
            createdAt: {type:'time'},                   // 创建时间
            modifiedAt:{type:'time'},                   // 修改时间
        },
    },
    // 候选人
    "candidate":{
        rest_api: 'batch',
        // super: 'tenant',
        extend_api: [],
        params: {
            name: {type:'string'},                      // 候选人名称
            description: {type:'string'},               // 候选人简介或描述
            createdAt: {type:'time'},                   // 创建时间
            modifiedAt:{type:'time'},                   // 修改时间
        },
    },
    // 投票活动
    "activity":{
        rest_api: 'batch',
        // super: 'tenant',
        type: 'membershipContainer',
        abilities: ['membershipContainer'], // 容器类资源，框架自动为其加入add和remove接口
        extend_api: [
            {name:'statActivityCandidateVotes',type:'object',method:'GET', statusCode:200},
        ],
        params: {
            name: {type:'string'},                      // 活动名称
            description: {type:'string'},               // 活动相关描述
            startAt: {type:'time'},                     // 活动开始时间
            endAt:{type:'time'},                        // 活动结束时间
            status: {type:'string',value:"enabled"},    // 状态
            createdAt: {type:'time'},                   // 创建时间
            modifiedAt:{type:'time'},                   // 修改时间
        },
    },
    // 候选人与活动关系
    'candidateActivitiesMembership':{
        type: 'membership',
        rest_api: 'base',
        memberships : ['candidate','activity'],
        params:{
            candidate:{type:'url'},                   // 候选人
            activity:{type:'url'},                    // 投票活动
            createdAt: {type:'time'},                 // 创建时间
            modifiedAt:{type:'time'},                 // 修改时间
        }
    },
    // 用户参与投票活动记录
    "userActivityRecord":{
        rest_api: 'batch',
        super: 'user',
        extend_api: [],
        params: {
            user:{type:'url'},                          // 用户
            activity:{type:'url',isSaveHref:false},     // 投票活动
            createdAt: {type:'time'},                   // 创建时间
            modifiedAt:{type:'time'},                   // 修改时间
        },
    },
    // 投票
    "vote":{
        rest_api: 'batch',
        super: 'userActivityRecord',
        extend_api: [
            {name:'commitVotes', method:'POST',url: '/api/:version/commitVotes', statusCode:200},
        ],
        params: {
            user:{type:'url',isSaveHref:false},         // 用户
            candidate:{type:'url',isSaveHref:false},    // 候选人
            activity:{type:'url',isSaveHref:false},     // 投票活动
            count:{type:'number',value:1},              // 投票数量
            createdAt: {type:'time'},                   // 创建时间
            modifiedAt:{type:'time'},                   // 修改时间
        },
    },

};

