const DocxTemplater = require('docxtemplater');
const PizZip = require('pizzip');
const moment = require('moment');
const Document = require('../models/Document.model');

async function generateDocumentFromData(template, templateType, questionnaireData, profileId) {
  const zip = new PizZip(template.data);
  const doc = new DocxTemplater();

  doc.loadZip(zip);
  doc.setData(questionnaireData);
  doc.render();

  const renderedDocument = doc.getZip().generate({ type: 'nodebuffer' });
  const fileNameParts = templateType.fileName.split('.');
  const documentFileName = `${fileNameParts[0]}-${moment().format('YYYY-MM-DD')}.${fileNameParts[1]}`;

  const document = new Document({
    title: templateType.title,
    fileName: documentFileName,
    data: renderedDocument,
    profileId,
    templateId: template,
  });
  return document;
}

module.exports = {
  generateDocumentFromData,
};
