/**
 * Created by Administrator on 2019/8/23.
 */
const request = require('common-request').request;
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const devUtils = require('develop-utils');

describe('Vote Test Case:',function () {
    describe('vote test case:',  function (){
        let voteUUID = null;
        it('create a vote test case:',  function (){
            //this.timeout(0);
            let data ={
                userActivityRecordUUID: "e4IlHZER6wv3WAhMz3F9FA",
                userUUID:'HC7xL43NgLJRDyeXiHNbpQ',
                activityUUID: 'AQCfakMaIu2Rn7V2OlxQKQ',
                candidateUUID: "3zx8R9JssRTP7et8WzKFww",
            };

            return request.post(`${url}/votes`,data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(201);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                    voteUUID = devUtils.getResourceUUIDInURL(body.href,'votes');
                })
        });
        it('get a vote test case:',  function (){
            return request.get(`${url}/votes/${voteUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        // it('update a vote test case:',  function (){
        //     //this.timeout(0);
        //     let update_data={ name: "张三A"};
        //     return request.post(`${url}/votes/${voteUUID}`,update_data)
        //         .then(function ({statusCode,body,headers,request}) {
        //             expect(statusCode).to.equal(200);
        //             console.log('statusCode:',statusCode);
        //             console.log('body:',JSON.stringify(body,null,2));
        //         })
        // });
        it('list votes test case:',  function (){
            //this.timeout(0);
            let qs={};
            return request.get(`${url}/votes`,qs)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        it('delete a vote test case:',  function (){
            //this.timeout(0);
            return request.delete(`${url}/votes/${voteUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(204);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                });
        });
    });

    describe('api test case:', function () {
        it('commitVotes test case:',  function (){
            //this.timeout(0);
            let data ={
                userUUID:'LaZpdfsOfH6O3ZMmOUBw9w',
                activityUUID: '4HE1tqVIQbQxmjIyEYXing',
                votes:[
                    {candidateUUID: "3zx8R9JssRTP7et8WzKFww",count:1},
                    {candidateUUID: "h73Gn9kLoiekneI3NOdoZx",count:1},
                ],
            };

            return request.post(`${url}/commitVotes`,data)
                .then(function ({statusCode,body,headers,request}) {
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                    expect(statusCode).to.equal(200);
                })
        });

    })
});
