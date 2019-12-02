/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const TemplateType = require('../../models/TemplateType.model');
const mockData = require('../helpers/mockdata');
const Profile = require('../../models/Profile.model');

const templates = require('../../controllers/templates.server.controller');
const paypalLib = require('../../controllers/paypalLib');

const testOrder = {
  orderId: '1',
  total: 1000,
  result: { purchase_units: [{ amount: { value: 10.00 } }] },
};

const wrongTestOrder = {
  orderId: '1',
  total: 4000,
  result: { purchase_units: [{ amount: { value: 40.00 } }] },
};

const templateIDS = {
  ids: ['5dd7808ba5cc0f35f0098b6e', '5dd7808ba5cc0f35f0098b6f'],
};

function mockRequest() {
  return {
    session: {},
    body: {},
  };
}

function mockResponse() {
  return {
    status: sinon.spy(),
    send: sinon.stub().returns(),
  };
}

/**
 * Wrapper to stub .exec() function of Model.findOne, etc.
 *
 * Usage:
 * ```
 * // resolve with something
 * MyModel.findOne = stubExec(sinon.stub().resolves(myThing))
 *
 * // reject with something
 * MyModel.findOne = stubExec(sinon.stub().rejects(myError))
 * ```
 */
function stubExec(execFn) {
  return sinon.stub().returns({
    exec: execFn,
  });
}


describe('Templates Controller', () => {
  describe('get', () => {
    // "globals" for login tests
    let req;
    let res;

    beforeEach(() => {
      TemplateType.find = stubExec(
        async () => ({
          templates: [
            mockData.templateType1,
          ],
        }),
      );

      // reset globals
      req = mockRequest();
      res = mockResponse();
    });

    it('should return 200 if mongoose resolves', async () => {
      await templates.get(req, res);
      assert.ok(res.status.notCalled);
    });

    it('should return 500 if mongoose rejects', async () => {
      TemplateType.find = stubExec(sinon.stub().rejects());

      await templates.get(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });

  describe('Paypal API', () => {
    let req;
    let res;
    beforeEach(() => {
      // stub out paypal api
      Profile.findById = stubExec(sinon.stub().resolves(mockData.profile1));
      Profile.findOne = stubExec(sinon.stub().resolves(mockData.profile1));
      paypalLib.getPaypalOrderById = sinon.stub().resolves(testOrder);
      Template.find = stubExec(
        async () => ([mockData.template1]),
      );
      // setup request
      // setup response
      req = mockRequest();
      res = mockResponse();
      req.body.accountId = '1';
      req.body.templateIds = templateIDS.ids;
    });

    it('should return 200 and success if order id resolves', async () => {
      await templates.purchase(req, res);
      assert.ok(res.status.calledWith(200));
    });

    it('should return 400 if order amount does not match order amount from api', async () => {
      // some type of attack
      paypalLib.getPaypalOrderById = sinon.stub().resolves(wrongTestOrder);
      await templates.purchase(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 404 and fail if order id does not resolve', async () => {
      // wrong order id paypal api can not find it
      paypalLib.getPaypalOrderById = sinon.stub().resolves(null);
      await templates.purchase(req, res);
      assert.ok(res.status.calledWith(404));
    });

    it('should return 500 if paypal api throws an exception', async () => {
      paypalLib.getPaypalOrderById = sinon.stub().rejects(new Error('Paypal error'));
      await templates.purchase(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });
});
