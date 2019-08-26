/**
 * Created by Administrator on 2019/8/22.
 */
const request = require('common-request').request;
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const devUtils = require('develop-utils');

describe('Activity Test Case:',function () {
    describe('activity test case:',  function (){
        let activityUUID = null;
        it('create a activity test case:',  function (){
            //this.timeout(0);
            let data ={
                name: '第五届政法委员选举',                   // 活动名称
                description: '第五届政法委员选举',            // 活动相关描述
                startAt: '2019-09-01 10:00:00',             // 活动开始时间
                endAt: '2019-09-01 22:00:00',               // 活动结束时间
                status: "enabled",                          // 状态
            };

            return request.post(`${url}/activities`,data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(201);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                    activityUUID = devUtils.getResourceUUIDInURL(body.href,'activities');
                })
        });
        it('get a activity test case:',  function (){
            return request.get(`${url}/activities/${activityUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        it('update a activity test case:',  function (){
            //this.timeout(0);
            let update_data={ description: "第五届政法委员选举ABC"};
            return request.post(`${url}/activities/${activityUUID}`,update_data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });

        it('list activities test case:',  function (){
            //this.timeout(0);
            let qs={};
            return request.get(`${url}/activities`,qs)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        it('delete a activity test case:',  function (){
            //this.timeout(0);
            return request.delete(`${url}/activities/${activityUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(204);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                });
        });
    });

    describe('add candidate test case:',function () {
        let activityUUID = '4HE1tqVIQbQxmjIyEYXing';
        it('add candidate for activity test case:',  function (){
            //this.timeout(0);
            let data ={
                candidateUUID: 'h73Gn9kLoiekneI3NOdoZx'
            };

            return request.post(`${url}/activities/${activityUUID}/addCandidate`,data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(201);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });

        it('remove candidate for activity test case:',  function (){
            //this.timeout(0);
            let data ={
                candidateUUID: '3zx8R9JssRTP7et8WzKFww'
            };

            return request.post(`${url}/activities/${activityUUID}/removeCandidate`,data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(204);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
    });

    describe('stat api test case:', function () {
        it('statActivityCandidateVotes test case:',  function (){
            //this.timeout(0);
            let activityUUID = '4HE1tqVIQbQxmjIyEYXing';

            return request.get(`${url}/activities/${activityUUID}/statActivityCandidateVotes`,{})
                .then(function ({statusCode,body,headers,request}) {
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                    expect(statusCode).to.equal(200);
                })
        });
    });
});
