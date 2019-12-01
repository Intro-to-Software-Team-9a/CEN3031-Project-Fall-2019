/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const Profile = require('../../models/Profile.model');
const mockData = require('../helpers/mockdata');
const profiles = require('../../controllers/profiles.server.controller');
const { stubExec } = require('../helpers/utils');
const Plans = require('../../utils/plans');


function mockRequest() {
  return {
    session: { profileId: 'i-am-a-profile' },
    body: { plan: Plans.COMPREHENSIVE_PLAN },
  };
}

function mockResponse() {
  return {
    status: sinon.spy(),
    send: sinon.stub().returns(),
  };
}


describe('Profiles Controller', () => {
  describe('get', () => {
    // "globals" for login tests
    let req;
    let res;

    beforeEach(() => {
      Profile.findById = stubExec(
        sinon.stub().resolves(new Profile(mockData.profile1)),
      );

      // reset globals
      req = mockRequest();
      res = mockResponse();
    });

    it('should return 200 if mongoose resolves', async () => {
      await profiles.get(req, res);
      assert.ok(res.status.notCalled);
    });

    it('should return 404 if no profile', async () => {
      Profile.findById = stubExec(sinon.stub().resolves(null));

      await profiles.get(req, res);
      assert.ok(res.status.calledWith(404));
    });

    it('should return 500 if mongoose rejects', async () => {
      Profile.findById = stubExec(sinon.stub().rejects());

      await profiles.get(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });

  describe('changePlan', () => {
    // "globals" for login tests
    let req;
    let res;

    beforeEach(() => {
      Profile.findById = stubExec(sinon.stub().resolves(new Profile(mockData.profile1)));
      Profile.prototype.save = sinon.stub().resolves();


      // reset globals
      req = mockRequest();
      res = mockResponse();
    });

    it('should return 200 if mongoose resolves', async () => {
      await profiles.changePlan(req, res);
      assert.ok(res.status.notCalled);
    });

    it('should return 404 if no profile', async () => {
      Profile.findById = stubExec(sinon.stub().resolves(null));

      await profiles.changePlan(req, res);
      assert.ok(res.status.calledWith(404));
    });

    it('should return 500 if mongoose rejects', async () => {
      Profile.findById = stubExec(sinon.stub().rejects());

      await profiles.changePlan(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should return 500 if mongoose rejects', async () => {
      Profile.prototype.save = sinon.stub().rejects();

      await profiles.changePlan(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should set the plan on the profile', async () => {
      const profile = new Profile(mockData.profile1);
      Profile.findById = stubExec(sinon.stub().resolves(profile));

      const newPlan = 'cool-plan-1324';
      req.body.plan = newPlan;

      await profiles.changePlan(req, res);
      assert.equal(profile.plan, newPlan);
    });
  });
});
