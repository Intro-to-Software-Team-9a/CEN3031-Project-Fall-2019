const streams = require('memory-streams');
const markdownpdf = require('markdown-pdf');
const path = require('path');
const errors = require('../utils/errors');
const Document = require('../models/Document.model.js');
// import '../pdf_css/pdf.css'

/**
 * @param id {Integer}
 */
async function genPDF(req, res) {
  const document = await Document.findById(req.params.templateId).exec();

  // need to compare by value rather than by reference
  /* eslint-disable-next-line eqeqeq */
  if (!(document.profileId == req.session.profileId)) {
    res.status(403);
    return res.send({ message: errors.other.PERMISSION_DENIED });
  }

  const reader = new streams.ReadableStream();
  reader.append(document.text);
  try {
    res.setHeader('content-type', 'application/pdf');
    return reader.pipe(markdownpdf({ cssPath: path.join(__dirname, 'pdf.css') })).pipe(res);
  } catch (e) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  genPDF,
};
