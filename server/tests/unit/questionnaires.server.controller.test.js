/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const Questionnaire = require('../../models/Questionnaire.model');
const validation = require('../../utils/validation');
const questionnaires = require('../../controllers/questionnaires.server.controller');

const mockData = require('../helpers/mockdata');

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


describe('Questionnaires Controller', () => {
  describe('create', () => {
    // "globals" for login tests
    let req;
    let res;

    let oldIsValidQuestionnaire;

    before(() => {
      oldIsValidQuestionnaire = validation.isValidQuestionnaire;
    });

    after(() => {
      validation.isValidQuestionnaire = oldIsValidQuestionnaire;
    });

    beforeEach(() => {
      Questionnaire.prototype.save = sinon.stub().resolves();
      validation.isValidQuestionnaire = sinon.stub().returns(true);

      // reset globals
      req = mockRequest();
      res = mockResponse();

      req.body.questionnaire = mockData.questionnaire1;
    });

    it('should return 200 if mongoose resolves', async () => {
      await questionnaires.create(req, res);
      assert.ok(!res.status.called);
    });

    it('should return 400 if questionnaire not provided in body', async () => {
      delete req.body.questionnaire;
      await questionnaires.create(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 400 if questionnaire is invalid', async () => {
      validation.isValidQuestionnaire = sinon.stub().returns(false);
      await questionnaires.create(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 500 if mongoose rejects', async () => {
      Questionnaire.prototype.save = sinon.stub().rejects(new Error());
      await questionnaires.create(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });
});
