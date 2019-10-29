const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Stores login credentials and links to a Profile.
 */

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.model('Account', AccountSchema);
