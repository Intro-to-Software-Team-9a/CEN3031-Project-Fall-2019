const assert = require('assert');
const templating = require('../../utils/templating');
const { mockTemplate, expectedDocument, mockResponse } = require('../helpers/mocktemplate');

describe('docxtemplater smoke tests', () => {
  it('should correctly render a document', async () => {
    const templateType = {
      title: 'title1',
      fileName: 'test1.docx',
    };

    const profileId = '1';
    const document = await templating.generateDocumentFromData(({ data: mockTemplate }), templateType, mockResponse, profileId);
    assert.equal(document.data.toString('base64').length, expectedDocument.length);
  });
});
