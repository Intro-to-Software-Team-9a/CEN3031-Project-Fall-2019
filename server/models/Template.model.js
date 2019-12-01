const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * A template that is used to generate a document.
 */

const TemplateSchema = new Schema({
  // ref of the template type
  templateTypeId: { type: Schema.Types.ObjectId, ref: 'TemplateType', required: true },

  // template binary data
  data: { type: Buffer, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);
