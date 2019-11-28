/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const validation = require('../../utils/validation');
const Questionnaire = require('../../models/Questionnaire.model');
const QuestionnaireResponse = require('../../models/QuestionnaireResponse.model');
const questionnaireResponses = require('../../controllers/questionnaireResponse.server.controller');
const { stubExec } = require('../helpers/utils');
const mockData = require('../helpers/mockdata');

function mockRequest() {
  return {
    session: {},
    body: {},
    params: {},
  };
}

function mockResponse() {
  return {
    status: sinon.spy(),
    send: sinon.stub().returns(),
  };
}


describe('Questionnaire Responses Controller', () => {

  describe('create', () => {
    // "globals" for login tests
    let req;
    let res;

    let oldIsValid;

    before(() => {
      oldIsValid = validation.isValidResponse;
    });

    after(() => {
      validation.isValidResponse = oldIsValid;
    });

    beforeEach(() => {
      Questionnaire.findById = stubExec(sinon.stub().resolves(mockData.questionnaire1));
      QuestionnaireResponse.prototype.save = sinon.stub().resolves();
      validation.isVaildResponse = sinon.stub().returns(({ isOk: true, missingResponseLabels: [] }));

      // reset globals
      req = mockRequest();
      res = mockResponse();

      req.body.questionnaireResponse = mockData.questionnaireResponse1;
      req.params.questionnaireId = '1';
    });

    it('should return 200 if mongoose resolves', async () => {
      await questionnaireResponses.create(req, res);
      assert.ok(!res.status.called);
    });

    it('should return 400 if response not provided in body', async () => {
      delete req.body.questionnaireResponse;
      await questionnaireResponses.create(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 400 if id not provided in params', async () => {
      delete req.params.questionnaireId;
      await questionnaireResponses.create(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 400 if response is invalid', async () => {
      validation.isVaildResponse = sinon.stub().returns(({ isOk: false, missingResponseLabels: [] }));
      await questionnaireResponses.create(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 500 if mongoose rejects', async () => {
      QuestionnaireResponse.prototype.save = sinon.stub().rejects(new Error());
      await questionnaireResponses.create(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });

  describe('getById', () => {
    // "globals" for login tests
    let req;
    let res;


    beforeEach(() => {
      QuestionnaireResponse.findById = stubExec(sinon.stub().resolves(mockData.questionnaireResponse1));

      // reset globals
      req = mockRequest();
      res = mockResponse();

      req.params.questionnaireResponseId = '1';
      req.session.profileId = 'id-1';
    });

    it('should return 200 if mongoose resolves', async () => {
      await questionnaireResponses.getById(req, res);
      assert.ok(!res.status.called);
    });

    it('should return 400 if id not provided in params', async () => {
      delete req.params.questionnaireResponseId;
      await questionnaireResponses.getById(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 404 if mongoose returns null', async () => {
      QuestionnaireResponse.findById = stubExec(sinon.stub().resolves(null));
      await questionnaireResponses.getById(req, res);
      assert.ok(res.status.calledWith(404));
    });

    it('should return 403 if wrong profile id', async () => {
      req.session.profileId = 'random-id';
      await questionnaireResponses.getById(req, res);
      assert.ok(res.status.calledWith(403));
    });

    it('should return 500 if mongoose rejects', async () => {
      QuestionnaireResponse.findById = stubExec(sinon.stub().rejects(new Error()));
      await questionnaireResponses.getById(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });

  describe('getAll', () => {
    // "globals" for login tests
    let req;
    let res;


    beforeEach(() => {
      // crash early
      QuestionnaireResponse.find = sinon.stub().throws();

      // reset globals
      req = mockRequest();
      res = mockResponse();

      req.session.profileId = 'id-1';
    });

    it('should pass profileId as a parameter to find', async () => {
      await questionnaireResponses.getAll(req, res);
      assert.ok(QuestionnaireResponse.find.calledWith({ profileId: 'id-1' }));
    });
  });

  describe('getMostRecent', () => {
    // "globals" for login tests
    let req;
    let res;


    beforeEach(() => {
      // crash early
      QuestionnaireResponse.findOne = sinon.stub().throws();

      // reset globals
      req = mockRequest();
      res = mockResponse();

      req.session.profileId = 'id-1';
    });

    it('should pass profileId as a parameter to find', async () => {
      await questionnaireResponses.getMostRecent(req, res);
      assert.ok(QuestionnaireResponse.findOne.calledWith({ profileId: 'id-1' }));
    });
  });
});
