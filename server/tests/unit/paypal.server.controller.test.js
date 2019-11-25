/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const bcrypt = require('bcrypt');
const mongooseUtils = require('../../utils/mongoose');
const { stubExec } = require('../helpers/utils');

const accounts = require('../../controllers/paypalVerification.server.controller');

function mockRequest() {
  return {
    body: {
      orderID: '12345',
      payerID: '54321',
      total: 10,
    },
    session: {},
  };
}

function mockResponse() {
    return {
      status: sinon.stub(),
      send: sinon.stub().returns(),
    };
  }

describe('Paypal Verification', () => {
  describe('Handle Request', () => {
    let req;
    let res;

    it('should return 200 and success if order id resolves', async() => {

    });

    it('should return 400 if order amount does not match order amount from api', async() => {
        //some type of attack
    });

    it('should return 404 and fail if order id does not resolve', async() => {
        //wrong order id paypal api can not find it
    });

    it('should return 500 if call made incorrectly', async() => {
        //wrong request made, exe get instead of post
    });
  });
})
;