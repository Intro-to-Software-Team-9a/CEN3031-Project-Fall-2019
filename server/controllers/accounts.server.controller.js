const bcrypt = require('bcrypt');
const validator = require('validator');

const publicConfig = require('../config/config.public');
const mongooseUtils = require('../utils/mongoose');
const errors = require('../utils/errors');
const Account = require('../models/Account.model');
const Profile = require('../models/Profile.model');

const { saltRounds } = publicConfig.password;

/**
 * @param {Object} account The user's Account
 * @param {Object} profile The user's Profile
 * @param {Object} req Express Request object
 * */
async function addToSession(account, profile, req) {
  req.session.accountId = account._id;
  req.session.profileId = profile._id;
}

/**
 * Returns if a password is acceptable for use.
 * Including:
 * - long enough
 * @param {} password Candiate password
 */
function isPasswordOk(password) {
  if (!password) return false;
  if (typeof password !== 'string') return false;
  if (password.length < 8) return false;

  return true;
}


/**
 * @param email {String}
 * @param password {String}
 */
async function createAccount(req, res) {
  // validate
  if (!req.body || !req.body.email || !req.body.password || !req.body.name) {
    res.status(400);
    return res.send({ message: errors.accounts.MISSING_CREDENTIALS });
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    return res.send({ message: errors.accounts.INVALID_EMAIL });
  }

  const { name, email, password } = req.body;

  if (!isPasswordOk(password)) {
    res.status(400);
    return res.send({ message: errors.accounts.PASSWORD_NOT_OK });
  }

  // hash the plaintext password
  // this will handle salts automatically
  const hash = await bcrypt.hash(password, saltRounds);

  try {
    // create account and profile
    const account = new Account({
      email,
      passwordHash: hash,
    });

    const profile = new Profile({
      accountId: account,
      name,
      role: { isUser: true, isAdmin: false },
    });

    await account.save();
    await profile.save();

    // update session
    addToSession(account, profile, req);

    return res.send();
  } catch (e) {
    if (mongooseUtils.getErrorType(e) === mongooseUtils.ErrorTypes.DUPLICATE_KEY) {
      res.status(400);
      return res.send({ message: errors.accounts.ACCOUNT_ALREADY_EXISTS });
    }

    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}


/**
 * @param email {String}
 * @param password {String}
 */
async function login(req, res) {
  // validate request
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400);
    return res.send({ message: errors.accounts.MISSING_CREDENTIALS });
  }


  try {
    // find account
    const { email, password } = req.body;
    const account = await Account.findOne({ email }).exec();

    if (!account) {
      res.status(404);
      return res.send({ message: errors.accounts.ACCOUNT_DOESNT_EXIST });
    }

    // check password match
    const doesMatch = await bcrypt.compare(password, account.passwordHash);
    if (!doesMatch) {
      res.status(401);
      return res.send({ message: errors.accounts.WRONG_CREDENTIALS });
    }


    const profile = await Profile.findOne({ accountId: account }).exec();

    // update session
    addToSession(account, profile, req);

    return res.send();
  } catch (e) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

async function logout(req, res) {
  req.session.destroy((error) => {
    if (error) {
      res.status(500);
      return res.send({ message: errors.other.UNKNOWN });
    }

    return res.send();
  });
}

/**
 * @param currentpassword {String}
 * @param password {String}
 */
async function changePassword(req, res) {
  if (!req.body || !req.body.currentpassword || !req.body.password) {
    res.status(400);
    return res.send({ message: errors.accounts.MISSING_CREDENTIALS });
  }
  console.log("here")
  try {
    const { currentpassword, password } = req.body;
    const account = await Account.findById(req.session.accountId).exec();
    if (!account) {
      res.status(404);
      return res.send({ message: errors.accounts.NOT_LOGGED_IN });
    }
    
    const doesMatch = await bcrypt.compare(currentpassword, account.passwordHash);
    if (!doesMatch) {
      res.status(401);
      return res.send({ message: errors.accounts.WRONG_PASSWORD });
    }
    
    if (!isPasswordOk(password)) {
      res.status(400);
      return res.send({ message: errors.accounts.PASSWORD_NOT_OK });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    account.passwordHash = hash;
    await account.save();
    return res.send();
  }
  catch (e) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}

module.exports = {
  login,
  logout,
  createAccount,
  changePassword,
};
