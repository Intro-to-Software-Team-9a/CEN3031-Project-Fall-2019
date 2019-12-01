/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const bcrypt = require('bcrypt');
const Account = require('../../models/Account.model');
const Profile = require('../../models/Profile.model');
const Document = require('../../models/Document.model');
const QuestionnaireResponse = require('../../models/QuestionnaireResponse.model');
const mongooseUtils = require('../../utils/mongoose');
const { stubExec } = require('../helpers/utils');
const mockData = require('../helpers/mockdata');
const mongoose = require('mongoose');

const accounts = require('../../controllers/accounts.server.controller');

function mockRequest() {
  return {
    body: { email: 'test@gmail.com', password: 'i-am-a-complex-password', name: 'Test User' },
    session: {},
  };
}

function mockResponse() {
  return {
    status: sinon.stub(),
    send: sinon.stub().returns(),
  };
}

describe('Accounts Controller', () => {
  describe('login', () => {
    // "globals" for login tests
    let req;
    let res;

    beforeEach(() => {
      // stub .findOne() to stop database access
      // should return an account with an _id
      Account.findOne = stubExec(
        sinon.stub().resolves(new Account({ ...mockData.account1.toObject(), _id: '1' })),
      );

      Profile.findOne = stubExec(
        sinon.stub().resolves(new Account({ ...mockData.profile1.toObject(), _id: '1' })),
      );

      // reset globals
      req = mockRequest();
      res = mockResponse();

      // stub bcrypt
      bcrypt.compare = sinon.stub().resolves(true);
    });

    it('should return 200 and success if all args provided and mongoose resolves', async () => {
      await accounts.login(req, res);
      assert.ok(res.status.notCalled);
      assert.ok(req.session.accountId);
    });

    it('should return 404 and fail if no matching account found', async () => {
      Account.findOne = stubExec(sinon.stub().resolves(null));

      await accounts.login(req, res);
      assert.ok(res.status.calledWith(404));
      assert.ok(!req.session.accountId);
    });

    it('should return 401 and fail if no password is incorrect', async () => {
      // incorrect password
      bcrypt.compare = sinon.stub().returns(false);

      await accounts.login(req, res);
      assert.ok(res.status.calledWith(401));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if missing body', async () => {
      req.body = undefined;
      await accounts.login(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if missing email', async () => {
      req.body.email = undefined;
      await accounts.login(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if missing password', async () => {
      req.body.password = undefined;
      await accounts.login(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 500 and fail if mongoose rejects', async () => {
      // incorrect password
      Account.findOne = stubExec(sinon.stub().rejects());

      await accounts.login(req, res);
      assert.ok(res.status.calledWith(500));
      assert.ok(!req.session.accountId);
    });
  });

  describe('logout', () => {
    // "globals" for login tests
    let req;
    let res;

    beforeEach(() => {
      // reset globals
      req = mockRequest();
      res = mockResponse();
      req.session.accountId = 'myId'; // assume logged in
    });

    it('should return 200 if session is destroyed', async () => {
      // no error
      req.session.destroy = sinon.stub().callsFake((cb) => cb(undefined));

      await accounts.logout(req, res);
      assert.ok(res.status.notCalled);
    });

    it('should return 500 if express-session has an error', async () => {
      // no error
      req.session.destroy = sinon.stub().callsFake((cb) => cb({ message: 'I\'m an error!' }));

      await accounts.logout(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });


  describe('createAccount', () => {
    // "globals" for createAccount tests
    let req;
    let res;
    beforeEach(() => {
      // stub .save() to stop database access
      Account.prototype.save = sinon.stub().resolves();
      Profile.prototype.save = sinon.stub().resolves();

      // reset globals
      req = mockRequest();
      res = mockResponse();

      // stub bcrypt
      bcrypt.hash = sinon.stub().resolves('myHash');
    });

    it('should return 200 and success if all args provided and save resolves', async () => {
      await accounts.createAccount(req, res);
      assert.ok(res.status.notCalled);
      assert.ok(req.session.accountId);
    });

    it('should return 400 and fail if missing body', async () => {
      req.body = undefined;
      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if missing email', async () => {
      req.body.email = undefined;
      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if email is invalid', async () => {
      req.body.email = 'not an email';
      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if missing password', async () => {
      req.body.password = undefined;
      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if password is not long enougt', async () => {
      req.body.password = 'short';
      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });


    it('should return 400 and fail if missing name', async () => {
      req.body.name = undefined;
      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 400 and fail if mongoose rejects with duplicate key error', async () => {
      // assume duplicate key error
      mongooseUtils.getErrorType = sinon.stub()
        .returns(mongooseUtils.ErrorTypes.DUPLICATE_KEY);

      Account.prototype.save = sinon.stub()
        .rejects({ message: 'duplicate key' });

      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
      assert.ok(!req.session.accountId);
    });

    it('should return 500 and fail if mongoose rejects other error', async () => {
      // assume duplicate key error
      mongooseUtils.getErrorType = sinon.stub()
        .returns(undefined);

      Account.prototype.save = sinon.stub()
        .rejects({ message: 'other error' });

      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(500));
      assert.ok(!req.session.accountId);
    });
  });

  describe('deleteAccount', () => {
    // "globals" for login tests
    let req;
    let res;
    let session;

    const mockSession = () => ({
      startTransaction: sinon.stub().returns(),
      commitTransaction: sinon.stub().resolves(),
      abortTransaction: sinon.stub().resolves(),
      endSession: sinon.stub().resolves(),
    });

    beforeEach(() => {
      // reset globals
      req = mockRequest();
      res = mockResponse();
      session = mockSession();

      req.session.accountId = 'myId'; // assume logged in
      req.session.profileId = 'profileId';

      Account.findByIdAndDelete = sinon.stub().resolves();
      Profile.findByIdAndDelete = sinon.stub().resolves();
      QuestionnaireResponse.deleteMany = sinon.stub().resolves();
      Document.deleteMany = sinon.stub().resolves();
      mongoose.startSession = sinon.stub().resolves(session);
    });

    it('should return 200 if session if account was successfully deleted', async () => {
      await accounts.deleteAccount(req, res);
      assert.ok(res.status.notCalled);
    });

    it('should commit transaction if session if account was successfully deleted', async () => {
      await accounts.deleteAccount(req, res);
      assert.ok(session.commitTransaction.called);
    });

    it('should return 500 if mongoose cannot start session', async () => {
      mongoose.startSession = sinon.stub().rejects(new Error('cant start session'));

      await accounts.deleteAccount(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should return 500 if mongoose rejects', async () => {
      QuestionnaireResponse.deleteMany  = sinon.stub().rejects(new Error('error'));

      await accounts.deleteAccount(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should abort transaction if mongoose rejects', async () => {
      // arrange
      QuestionnaireResponse.deleteMany  = sinon.stub().rejects(new Error('error'));

      // act
      await accounts.deleteAccount(req, res);

      // assert
      assert.ok(session.abortTransaction.called)
    });
  });

});
