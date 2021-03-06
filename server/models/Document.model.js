const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Stores the LITERAL text of a generated document.
 * Immutable -- in order to edit it, a user must create a copy.
 */

const DocumentSchema = new Schema({
  // title of the document (from template)
  title: String,

  // document file name (from template)
  fileName: String,

  // Document binary data
  data: { type: Buffer, required: true },

  // ref of the owner
  profileId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },

  // ref of the template
  templateId: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
