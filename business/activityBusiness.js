/**
 * Created by Administrator on 2019/8/26.
 */
const _ = require('lodash');
const moment = require('moment');
const devUtils = require('develop-utils');
const restRouterModel = require('rest-router-model');
const {BaseBusiness,parse,getSchema} = restRouterModel;


class ActivityBusiness extends BaseBusiness{
    constructor(){
        super();
    }

    async statActivityCandidateVotes(data, ctx){
        let activityUUID = data.params.uuid;

        let knex = this.dbOperater;

        let [stats,candidates] = await Promise.all([
            knex('Votes').select('candidateUUID').sum('count as count').where({activityUUID:activityUUID}).groupBy('candidateUUID'),
            knex('CandidateActivitiesMemberships').select('candidateUUID').where({activityUUID:activityUUID}),
        ]);

        let candidateUUID2stat = _.keyBy(stats, 'candidateUUID');

        return candidates.map(candidate=>{
            let stat = candidateUUID2stat[candidate.candidateUUID];
            return {
                candidateUUID: candidate.candidateUUID,
                count: _.get(stat,'count') || 0,
            }
        });
    }
}

module.exports = ActivityBusiness;
