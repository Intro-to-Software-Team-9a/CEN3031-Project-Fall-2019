const mongoose = require('mongoose');
const Template = require('../models/Template.model');
const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');
const paypalLib = require('./paypalLib');

/** Returns a list of all templates */

async function get(req, res) {
  try {
    const templates = await Template.find().exec();
    return res.send({ templates });
  } catch (error) {
    res.status(500);
    return res.send({ message: errors.other.UNKNOWN });
  }
}


/** Adds templates to the user's account. */
async function purchase(req, res) {

  try {
    const purchasedTemplates = await Template.find({
      _id: { $in: req.body.templateIds.map((templateId) => mongoose.Types.ObjectId(templateId)) },
    }).exec();

    let total = 0;
    purchasedTemplates.map((x) => { total += x.priceInCents / 100 ;});

    // PAYPAL
    const order = await paypalLib.getPaypalOrderById(req.body.orderID);
    if (order === null) {
      res.status(404);
      return res.send(404);
    }

    // 5. Validate the transaction details are as expected
    if (parseFloat(order.result.purchase_units[0].amount.value) !== total) {
      res.status(400);
      return res.send(400);
    }
    // 7. Return a successful response to the client
    res.status(200);

    if (!req.body || !req.body.templateIds) {
      res.status(400);
      return res.send({ message: errors.other.MISSING_PARAMETER });
    }

    // todo: check if templateids is an array

    const profile = await Profile.findOne({ accountId: req.session.accountId }).exec();

    const ownedTemplates = profile.ownedTemplates || [];
    for (const template of purchasedTemplates) {
      if (!ownedTemplates.includes((t) => t._id === template._id)) {
        ownedTemplates.push(template);
      }
    }

    profile.ownedTemplates = ownedTemplates;
    await profile.save();

    return res.send();
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

module.exports = {
  get,
  purchase,
};
