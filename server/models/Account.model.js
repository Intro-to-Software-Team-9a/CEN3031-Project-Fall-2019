const mongoose = require('mongoose');

/**
 * Stores login credentials and links to a Profile.
 */

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
}, { timestamps: true });


export default mongoose.model('Account', AccountSchema);
