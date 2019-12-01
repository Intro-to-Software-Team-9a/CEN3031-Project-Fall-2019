const mongoose = require('mongoose');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const Template = require('../models/Template.model');
const Profile = require('../models/Profile.model');
const errors = require('../utils/errors');

const paypalClient = require('./paypalClient');
/** Returns a list of all templates */

async function getPaypalOrderById(orderId) {
  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);
  let order;
  try {
    order = await paypalClient.client().execute(request);
  } catch (err) {
    return null;
  }
  return order;
}

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
  const order = await getPaypalOrderById(req.body.orderID);
  console.log(order)
  if (order === null) {
    console.log("404 ERROR")
    return res.send(404);
  }

  // 5. Validate the transaction details are as expected
  if (parseFloat(order.result.purchase_units[0].amount.value) !== total) {
    console.log('400 ERROR');
    return res.send(400);
  }
  // 7. Return a successful response to the client
  console.log('PAYPAL SUCCESS');

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
