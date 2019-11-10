const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * A template that is used to generate a document.
 */

const TemplateSchema = new Schema({
  // title of the document
  title: { type: String, required: true },

  // string for use in template rendering
  template: { type: String, required: true },

  price: Number,
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);
