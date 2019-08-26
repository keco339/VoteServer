/**
 * Created by Administrator on 2019/8/23.
 */
const request = require('common-request').request;
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const devUtils = require('develop-utils');

describe('UserActivityRecord Test Case:',function () {
    describe('userActivityRecord test case:',  function (){
        let userActivityRecordUUID = null;
        it('create a userActivityRecord test case:',  function (){
            //this.timeout(0);
            let data ={
                userUUID:'HC7xL43NgLJRDyeXiHNbpQ',
                activityUUID: 'AQCfakMaIu2Rn7V2OlxQKQ',
            };

            return request.post(`${url}/userActivityRecords`,data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(201);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                    userActivityRecordUUID = devUtils.getResourceUUIDInURL(body.href,'userActivityRecords');
                })
        });
        it('get a userActivityRecord test case:',  function (){
            return request.get(`${url}/userActivityRecords/${userActivityRecordUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        // it('update a userActivityRecord test case:',  function (){
        //     //this.timeout(0);
        //     let update_data={ name: "张三A"};
        //     return request.post(`${url}/userActivityRecords/${userActivityRecordUUID}`,update_data)
        //         .then(function ({statusCode,body,headers,request}) {
        //             expect(statusCode).to.equal(200);
        //             console.log('statusCode:',statusCode);
        //             console.log('body:',JSON.stringify(body,null,2));
        //         })
        // });

        it('list userActivityRecords test case:',  function (){
            //this.timeout(0);
            let qs={};
            return request.get(`${url}/userActivityRecords`,qs)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        it('delete a userActivityRecord test case:',  function (){
            //this.timeout(0);
            return request.delete(`${url}/userActivityRecords/${userActivityRecordUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(204);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                });
        });
    });
});
