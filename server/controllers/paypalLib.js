const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const paypalClient = require('./paypalClient');

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

module.exports = { getPaypalOrderById };
