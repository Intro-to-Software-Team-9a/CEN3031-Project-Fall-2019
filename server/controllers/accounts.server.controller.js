const bcrypt = require('bcrypt');
const Account = require('../models/Account.model');
const config = require('../config/config');

const saltRounds = config.password.saltRounds;

async function createAccount(req, res) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.params.password, salt);

  const account = new Account({ email: req.params.email, passwordHash: hash });
  await account.save().exec();

  req.session.accountId = account._id;

  return res.send({ success: true });
}

async function login(req, res) {
  const password = req.params.password;
  const account = await Account.findOne({ email }).exec();
  
  if (!bcrypt.compareSync(password, account.passwordHash)) {
    return res.status(401).send({ success: false });
  }

  req.session.accountId = account._id;
  return res.send({ success: true });
}

module.exports = {
  login,
  createAccount,
};
