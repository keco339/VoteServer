/**
 * Created by Administrator on 2019/8/22.
 */
const request = require('common-request').request;
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const devUtils = require('develop-utils');

describe('Candidate Test Case:',function () {
    describe('candidate test case:',  function (){
        let candidateUUID = null;
        it('create a candidate test case:',  function (){
            //this.timeout(0);
            let data ={
                name: '张三',                      // 候选人名称
                description: '第四届政法委员',      // 候选人简介或描述
            };

            return request.post(`${url}/candidates`,data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(201);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                    candidateUUID = devUtils.getResourceUUIDInURL(body.href,'candidates');
                })
        });
        it('get a candidate test case:',  function (){
            return request.get(`${url}/candidates/${candidateUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        it('update a candidate test case:',  function (){
            //this.timeout(0);
            let update_data={ name: "张三A"};
            return request.post(`${url}/candidates/${candidateUUID}`,update_data)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });

        it('list candidates test case:',  function (){
            //this.timeout(0);
            let qs={};
            return request.get(`${url}/candidates`,qs)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(200);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                })
        });
        it('delete a candidate test case:',  function (){
            //this.timeout(0);
            return request.delete(`${url}/candidates/${candidateUUID}`)
                .then(function ({statusCode,body,headers,request}) {
                    expect(statusCode).to.equal(204);
                    console.log('statusCode:',statusCode);
                    console.log('body:',JSON.stringify(body,null,2));
                });
        });
    });
});
