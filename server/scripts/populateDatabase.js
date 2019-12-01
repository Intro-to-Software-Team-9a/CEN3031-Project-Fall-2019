const mongoose = require('mongoose');
/* eslint-disable-next-line import/no-unresolved */
const config = require('../config/config');
const mockdata = require('../tests/helpers/mockdata');

const Account = require('../models/Account.model');
const Profile = require('../models/Profile.model');
const Document = require('../models/Document.model');
const Template = require('../models/Template.model');
const TemplateType = require('../models/TemplateType.model');

const Questionniare = require('../models/Questionnaire.model');

async function dropDb() {
  await Account.remove({}).exec();
  await Profile.remove({}).exec();
  await Document.remove({}).exec();
  await Template.remove({}).exec();
  await TemplateType.remove({}).exec();
  await Questionniare.remove({}).exec();
}

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  await dropDb();

  const account1 = new Account(mockdata.account1);
  const document1 = new Document(mockdata.document1);
  const document2 = new Document(mockdata.document2);
  const profile1 = new Profile(mockdata.profile1);
  const templateType1 = new TemplateType(mockdata.templateType1);
  const template1 = new Template(mockdata.template1);
  const template2 = new Template(mockdata.template2);

  // add foreign keys
  profile1.accountId = account1;
  document1.profileId = profile1;
  document1.templateId = template1;
  document2.profileId = profile1;
  document2.templateId = template1;

  template1.templateTypeId = templateType1;
  template2.templateTypeId = templateType1;

  // save should work
  await profile1.save();
  await account1.save();
  await document1.save();
  await document2.save();
  await templateType1.save();
  await template1.save();
  await template2.save();

  const account2 = new Account(mockdata.account2);
  const profile2 = new Profile(mockdata.profile2);
  profile2.accountId = account2;

  await account2.save();
  await profile2.save();

  const questionnaire1 = new Questionniare(mockdata.questionnaire1);
  await questionnaire1.save();
}

run().then(() => {
  mongoose.connection.close();
});
