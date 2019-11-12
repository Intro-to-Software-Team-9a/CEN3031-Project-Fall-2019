/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const Template = require('../../models/Template.model');
const mockData = require('../helpers/mockdata');

const templates = require('../../controllers/templates.server.controller');

function mockRequest() {
  return {
    session: {},
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
      Template.find = stubExec(
        async () => ({
          templates: [
            mockData.template1,
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
      Template.find = stubExec(sinon.stub().rejects());

      await templates.get(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });
});
