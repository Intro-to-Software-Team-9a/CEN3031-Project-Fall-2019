const mongoose = require('mongoose');
const Template = require('../models/Template.model');
const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

const paypalClient = require('./paypalClient');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
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

  const purchasedTemplates = await Template.find({
    _id: { $in: req.body.templateIds.map((templateId) => mongoose.Types.ObjectId(templateId)) },
  }).exec();

  var total = 0;
  purchasedTemplates.map((x) => {total += x.priceInCents/100})

  //PAYPAL
  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(req.body.orderID);
  let order;
  try {
    order = await paypalClient.client().execute(request);
  } catch (err) {
    // 4. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }
  // 5. Validate the transaction details are as expected
  if (parseFloat(order.result.purchase_units[0].amount.value) !== total) {
    console.log('FAILURE');
    return res.send(400);
  }
  // 7. Return a successful response to the client
  console.log('PAYPAL SUCCESS');
  //return res.send(200);

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
}

module.exports = {
  get,
  purchase,
};
