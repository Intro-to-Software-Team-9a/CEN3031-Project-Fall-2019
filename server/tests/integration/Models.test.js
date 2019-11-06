/* eslint-disable no-undef, no-underscore-dangle */

const mongoose = require('mongoose');
const assert = require('assert');
const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING;

const Account = require('../../models/Account.model');
const Profile = require('../../models/Profile.model');
const Document = require('../../models/Document.model');
const Template = require('../../models/Template.model');
const mockdata = require('../helpers/mockdata');

async function dropCollections() {
  await Promise.all([
    Account.remove(),
    Profile.remove(),
    Document.remove(),
    Template.remove(),
  ]);
}

describe('Model Integration Tests', () => {
  before(async () => {
    await mongoose.connect(DB_CONNECT_STRING, { useNewUrlParser: true });
  });

  beforeEach(async () => {
    await dropCollections();
  });

  after(async () => {
    await dropCollections();
    await mongoose.connection.close();
  });

  describe('Account Model', () => {
    it('can save correctly in the database', async () => {
      const account1 = new Account(mockdata.account1);
      await account1.save();

      const savedAccount1 = await Account.findById(account1._id).exec();
      assert.equal(savedAccount1.email, mockdata.account1.email);
    });

    it('saves timestamps correctly', async () => {
      const account1 = new Account(mockdata.account1);
      await account1.save();

      const savedAccount1 = await Account.findById(account1._id).exec();
      assert.ok(savedAccount1.createdAt);
      assert.ok(savedAccount1.updatedAt);
    });
  });

  describe('Foriegn Keys for Models', () => {
    it('allows documents to be saved in any order', async () => {
      const account1 = new Account(mockdata.account1);
      const document1 = new Document(mockdata.document1);
      const profile1 = new Profile(mockdata.profile1);
      const template1 = new Template(mockdata.template1);

      await assert.rejects(profile1.save(), 'should throw exception due to missing account');

      // add foreign keys
      profile1.accountId = account1;
      document1.profileId = profile1;
      document1.templateId = template1;

      // save should work
      await profile1.save();
      await account1.save();
      await document1.save();
      await template1.save();

      // populate should work
      await Account.findById(account1._id).exec();
      const savedDocument1 = await Document.findById(document1._id).populate(['profileId', 'templateId']);
      const savedProfile1 = await Profile.findById(profile1._id).populate(['accountId']);
      await Template.findById(template1._id).exec();

      // check foreign keys are dereferenced
      assert.equal(savedProfile1.accountId.email, mockdata.account1.email, 'could not dereference account');
      assert.equal(savedDocument1.templateId.template, mockdata.template1.template, 'could not dereference template');
      assert.equal(savedDocument1.profileId.name, mockdata.profile1.name, 'could not dereference profile');
    });
  });
});
