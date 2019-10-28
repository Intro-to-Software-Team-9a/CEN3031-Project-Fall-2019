const mongoose, { Schema } = require('mongoose');

/**
 * A template that is used to generate a document.
 */

const TemplateSchema = new mongoose.Schema({
  // title of the document
  title: { type: String, required: true },

  // string for use in template rendering
  template: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Template', TemplateSchema);
