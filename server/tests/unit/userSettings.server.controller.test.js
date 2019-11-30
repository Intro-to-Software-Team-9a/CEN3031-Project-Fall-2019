/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const Profile = require('../../models/Profile.model');
const Account = require('../../models/Account.model');
const mockData = require('../helpers/mockdata');
const userSettings = require('../../controllers/userSettings.server.controller');
const { stubPopulate } = require('../helpers/utils');


function mockRequest() {
  return {
    session: { profileId: 'i-am-a-profile' },
  };
}

function mockResponse() {
  return {
    status: sinon.stub().returns(),
    send: sinon.stub().returns(),
  };
}


describe('Profiles Controller', () => {
  describe('get', () => {
    // "globals" for login tests
    let req;
    let res;

    beforeEach(() => {
      Profile.findById = stubPopulate(async () => (
        new Profile({
          ...mockData.profile1,
          accountId: new Account(mockData.account1),
        })
      ));

      // reset globals
      req = mockRequest();
      res = mockResponse();
    });

    it('should return 200 if mongoose resolves', async () => {
      // arrange

      // act
      await userSettings.get(req, res);

      // assert
      assert.ok(res.status.notCalled);
    });

    it('should return 404 if no profile', async () => {
      // arrange
      Profile.findById = stubPopulate(sinon.stub().resolves(null));

      // act
      await userSettings.get(req, res);

      // assert
      assert.ok(res.status.calledWith(404));
    });

    it('should return 500 if mongo fails', async () => {
      // arrange
      Profile.findById = stubPopulate(sinon.stub().rejects(new Error('mongo failed')));

      // act
      await userSettings.get(req, res);

      // assert
      assert.ok(res.status.calledWith(500));
    });

    it('should not send profile.accountId', async () => {
      // arrange

      // act
      await userSettings.get(req, res);

      // assert
      // get returned profile
      const call = res.send.getCalls()[0];
      const profile = call.args[0].profile;

      // assert accountId is not defined (contains password hash, etc.)
      assert.ok(!profile.accountId);
    });
  
    it('should return 500 if profile has no accountId', async () => {
      // arrange
      Profile.findById = stubPopulate(async () => (
        new Profile({
          ...mockData.profile1,
          accountId: null,
        })
      ));

      // act
      await userSettings.get(req, res);

      // assert
      assert.ok(res.status.calledWith(500));
    });

  });
});
