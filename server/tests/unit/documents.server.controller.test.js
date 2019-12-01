/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const Template = require('../../models/Template.model');
const TemplateType = require('../../models/TemplateType.model');
const Document = require('../../models/Document.model');
const QuestionnaireResponse = require('../../models/QuestionnaireResponse.model');
const { stubExec } = require('../helpers/utils');
const mockData = require('../helpers/mockdata');
const mongooseUtils = require('../../utils/mongoose');
const documents = require('../../controllers/documents.server.controller');
const Templating = require('../../utils/templating');

const templateTypeId = 'template-type-id';
const profileId = 'profile-id';
const accountId = 'account-id';

function mockRequest() {
  return {
    params: {
      templateTypeId,
    },
    session: {
      profileId,
      accountId,
    },
  };
}

function mockResponse() {
  return {
    status: sinon.spy(),
    send: sinon.stub(),
  };
}

describe('Documents Controller', () => {
  describe('generate', () => {
    // "globals" for login tests
    let req;
    let res;

    beforeEach(() => {
      // stub models to stop database access
      Template.findOne = sinon.stub().resolves({ ...mockData.template1.toObject(), templateTypeId: templateTypeId });
      TemplateType.findOne = sinon.stub().resolves({ ...mockData.templateType1.toObject(), _id: templateTypeId });
      Templating.generateDocumentFromData = sinon.stub().resolves(new Document(mockData.document1));

      Document.prototype.save = sinon.stub().resolves();
      QuestionnaireResponse.findOne = () => ({
        sort: stubExec(sinon.stub().resolves(
          new QuestionnaireResponse(mockData.questionnaireResponse1)
        )),
      });

      // reset globals
      req = mockRequest();
      res = mockResponse();
    });

    it('should return 200 if mongoose resolves', async () => {
      await documents.generate(req, res);
      assert.ok(res.status.notCalled);
    });

    it('should save document on success', async () => {
      await documents.generate(req, res);
      assert.ok(Document.prototype.save.called);
    });

    it('should return 400 if templateTypeId not provided', async () => {
      // throw error
      delete req.params.templateTypeId;

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 404 if templateTypeId does not exist', async () => {
      // throw error
      Template.findOne = sinon.stub().resolves(null);

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(404));
    });

    it('should return 500 if there is no questionnaireResponse for the user', async () => {
      // throw error
      QuestionnaireResponse.findOne = sinon.stub().returns({
        sort: stubExec(sinon.stub().resolves(null))
      });

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should return 500 if mongoose rejects during find', async () => {
      // throw error
      TemplateType.findOne = sinon.stub().rejects(new Error());

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should return 500 if Templating rejects', async () => {
      // throw error
      Templating.generateDocumentFromData = sinon.stub().rejects(new Error());

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should return 500 if mongoose rejects during save', async () => {
      // throw error
      Document.prototype.save = sinon.stub().rejects(new Error());

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(500));
    });

    it('should return 500 on other error', async () => {
      // throw error
      Document.prototype.save = sinon.stub().rejects(new Error());

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });
});
