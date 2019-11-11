const streams = require('memory-streams');
const markdownpdf = require("markdown-pdf");
const mongoose = require('mongoose');
const config = require('../config/config');
const errors = require('../utils/errors');
const Document = require('../models/Document.model.js')

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * @param id {Integer}
 */
async function genPDF(req, res) {
    console.log(req.params.templateId)
    console.log(req.session.profileId)
    const document = await Document.findById(req.params.templateId).exec();
    console.log(document.profileId)
    if (!(document.profileId == req.session.profileId)) {
        res.status(403);
        return res.send({ message: errors.other.PERMISSION_DENIED });
    }

    reader = new streams.ReadableStream();
    reader.append(document.text)
    try{
        res.setHeader('content-type', 'application/pdf; charset=ISO 646');
        //res.setHeader('responseType', 'arraybuffer');
        //res.setHeader('charset', 'utf-16');
        //res.setHeader('rawr', 'kill me');
        return reader.pipe(markdownpdf()).pipe(res);

    } catch (e) {
        res.status(500);
        return res.send({ message: errors.other.UNKNOWN });
    }
    mongoose.connection.close();
}

module.exports = {
    genPDF,
};