/**
 * Created by Administrator on 2019/8/22.
 */
const request = require('common-request').request;
const expect = require('chai').expect;
const _ = require('lodash');
const common = require('./common');
const url = common.url;
const devUtils = require('develop-utils');
const moment = require('moment');

describe('user test case:', function () {


    it('signup user  test case:', function () {
        //this.timeout(0);
        let data = {
            email: 'keco339@sina.com',
            code: '136090',
            password: new Buffer.from("888888").toString('base64')
        };
        return request.post(`${url}/signup`, data)
            .then(function ({statusCode, body, headers, request}) {
                console.log(`statusCode: ${statusCode} body:`, JSON.stringify(body, null, 2));
                expect(statusCode).to.equal(200);
            });

    });

    it('login user test case:',  function (){
        let data ={
            email: "keco339@sina.com",
            password: new Buffer.from("888888").toString('base64')
        };

        return request.post(`${url}/login`,data)
            .then(function ({statusCode,body,headers,request}) {
                console.log(`statusCode: ${statusCode} body:`, JSON.stringify(body, null, 2));
                expect(statusCode).to.equal(200);
            })
    });

});
