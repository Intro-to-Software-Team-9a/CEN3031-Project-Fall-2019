const mongoose = require('mongoose');
const config = require('../config/config');
const mockdata = require('../tests/helpers/mockdata');

const Account = require('../models/Account.model');
const Profile = require('../models/Profile.model');
const Document = require('../models/Document.model');
const Template = require('../models/Template.model');

const Questionniare = require('../models/Questionnaire.model');

async function dropDb() {
  await Account.remove({}).exec();
  await Profile.remove({}).exec();
  await Document.remove({}).exec();
  await Template.remove({}).exec();
  await Questionniare.remove({}).exec();
}

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

  await dropDb();

  const account1 = new Account(mockdata.account1);
  const document1 = new Document(mockdata.document1);
  const document2 = new Document(mockdata.document2);
  const profile1 = new Profile(mockdata.profile1);
  const template1 = new Template(mockdata.template1);

  // add foreign keys
  profile1.accountId = account1;
  document1.profileId = profile1;
  document1.templateId = template1;
  document2.profileId = profile1;
  document2.templateId = template1;

  // save should work
  await profile1.save();
  await account1.save();
  await document1.save();
  await document2.save();
  await template1.save();

  const questionnaire1 = new Questionniare(mockdata.questionnaire1);

  await questionnaire1.save();
}

run().then(() => {
  mongoose.connection.close();
});
