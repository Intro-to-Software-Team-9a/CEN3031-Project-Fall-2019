const streams = require('memory-streams');
const markdownpdf = require('markdown-pdf');
const errors = require('../utils/errors');
const Document = require('../models/Document.model.js');
// import '../pdf_css/pdf.css'

/**
 * @param id {Integer}
 */
async function genPDF(req, res) {
  const document = await Document.findById(req.params.templateId).exec();
  if (!(document.profileId === req.session.profileId)) {
    res.status(403);
    return res.send({ message: errors.other.PERMISSION_DENIED });
  }

  const reader = new streams.ReadableStream();
  reader.append(document.text);
  try {
    res.setHeader('content-type', 'application/pdf');
    return reader.pipe(markdownpdf({ cssPath: '../pdf_css/pdf.css' })).pipe(res);
  } catch (e) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  genPDF,
};
