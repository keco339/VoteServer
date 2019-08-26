/**
 * Created by Administrator on 2019/8/23.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
const {BaseBusiness,parse,getSchema} = restRouterModel;


class VoteBusiness extends BaseBusiness{
    constructor(){
        super();
    }
    async commitVotes(data, ctx){
        devUtils.checkRequiredParams(data.body, ['userUUID','activityUUID','votes']);
        let {userUUID, activityUUID,votes} = data.body;
        // 判断活动是否真实有效
        let activity = await this.models['activity'].getOne({uuid:activityUUID});
        if(!activity){
            devUtils.Error('Error',404,8000,`Not find activity by activityUUID:${activityUUID}`);
        }
        // 判断时间是否有效
        let curTime = moment().format('YYYY-MM-DD HH:mm:ss');
        if(curTime < activity.startAt){
            devUtils.Error('Error',400,8002,'activity not start!')
        }
        if(curTime > activity.endAt){
            devUtils.Error('Error',400,8003,'activity had end!')
        }


        let knex = this.dbOperater; let _this = this;
        return knex.transaction( async function(trx){
            // 1、锁住用户
            let user0 = await knex('Users').where({uuid:userUUID}).transacting(trx).forUpdate().then(_.head);
            if(!user0){
                devUtils.Error('Error',404,8001,`Not find user by userUUID:${userUUID}`);
            }
            // 2、查询投票记表，判定该用户是否已经投票过
            let uar0 = await knex('UserActivityRecords').where({userUUID:userUUID,activityUUID:activityUUID}).transacting(trx).then(_.head);
            if(uar0){
                return {status: 'voted'};
            }
            // 生成投票
            let uar = parse(_this.resourceConfig, 'userActivityRecord',{userUUID, activityUUID});
            let vs = votes.map( v => {
                return parse(_this.resourceConfig, 'vote',{
                    userActivityRecordUUID:uar.uuid,
                    userUUID: userUUID,
                    activityUUID: activityUUID,
                    candidateUUID: v.candidateUUID,
                    count: v.count,
                });
            });

            return Promise.all([
                knex('UserActivityRecords').insert(uar).transacting(trx),
                knex('Votes').insert(vs).transacting(trx),
            ]).then(function (){
                return { status: "succeed" };
            })
        });

    }

}

module.exports = VoteBusiness;
