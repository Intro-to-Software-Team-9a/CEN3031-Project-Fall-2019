const mongoose, { Schema } = require('mongoose');

/**
 * Contains user information and is the thing that "owns" all the
 * documents and questionnaire responses.
 */

const ProfileSchema = new mongoose.Schema({
  // ref of the corresponding account
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

  // user information
  name: String,
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);
