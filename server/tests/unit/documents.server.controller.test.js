/* eslint-disable no-undef, no-underscore-dangle */

const sinon = require('sinon');
const assert = require('assert');

const Template = require('../../models/Template.model');
const Document = require('../../models/Document.model');
const QuestionnaireResponse = require('../../models/QuestionnaireResponse.model');
const { stubExec } = require('../helpers/utils');
const mockData = require('../helpers/mockdata');
const mongooseUtils = require('../../utils/mongoose');
const documents = require('../../controllers/documents.server.controller');
const TemplateRenderer = require('../../render/templateRenderer');

const templateId = 'template-id';
const profileId = 'profile-id';
const accountId = 'account-id';

function mockRequest() {
  return {
    params: {
      templateId,
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
      Template.findById = stubExec(async () => ({ ...mockData.template1, _id: templateId }));
      Document.prototype.save = sinon.stub().resolves();
      QuestionnaireResponse.findOne = () => ({
        sort: stubExec(async () => ({ ...mockData.questionnaireResponse1 })),
      });

      // reset globals
      req = mockRequest();
      res = mockResponse();

      // stub renderer
      TemplateRenderer.render = sinon.stub().returns(mockData.document1.text);
    });

    it('should return 200 if mongoose resolves', async () => {
      await documents.generate(req, res);
      assert.ok(res.status.notCalled);
    });

    it('should save document on success', async () => {
      await documents.generate(req, res);
      assert.ok(Document.prototype.save.called);
    });

    it('should use TemplateRenderer to generate document', async () => {
      await documents.generate(req, res);
      const sentDocument = res.send.getCalls()[0].args[0].document;
      assert.equal(sentDocument.text, mockData.document1.text);
    });

    it('should return 400 if mongoose rejects during find', async () => {
      // throw error
      Template.findById = stubExec(sinon.stub().rejects(new Error()));
      mongooseUtils.getErrorType = sinon.stub()
        .returns(mongooseUtils.ErrorTypes.DUPLICATE_KEY);

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 400 if mongoose rejects during save', async () => {
      // throw error
      Document.prototype.save = sinon.stub().rejects(new Error());
      mongooseUtils.getErrorType = sinon.stub()
        .returns(mongooseUtils.ErrorTypes.DUPLICATE_KEY);

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(400));
    });

    it('should return 500 on other error', async () => {
      // throw error
      Document.prototype.save = sinon.stub().rejects(new Error());
      mongooseUtils.getErrorType = sinon.stub()
        .returns(mongooseUtils.ErrorTypes.UNKNOWN);

      await documents.generate(req, res);
      assert.ok(res.status.calledWith(500));
    });
  });
});
