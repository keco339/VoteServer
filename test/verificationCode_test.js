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

describe('verificationCode test case:', function () {


    it('send email verificationCode  test case:', function () {
        //this.timeout(0);
        let data = { email: 'keco339@sina.com' };
        return request.post(`${url}/sendEmailVerificationCode`, data)
            .then(function ({statusCode, body, headers, request}) {
                console.log(`statusCode: ${statusCode} body:`, JSON.stringify(body, null, 2));
                expect(statusCode).to.equal(200);
            });

    });

});
