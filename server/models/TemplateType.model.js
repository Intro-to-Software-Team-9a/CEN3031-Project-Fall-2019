const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * A template that is used to generate a document.
 */

const TemplateTypeSchema = new Schema({
  // title of the document
  title: { type: String, required: true },

  // Name of the template file
  fileName: { type: String, required: true },

  priceInCents: Number,
}, { timestamps: true });

module.exports = mongoose.model('TemplateType', TemplateTypeSchema);
