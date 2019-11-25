/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// 1. Set up your server to make calls to PayPal

// 1a. Import the SDK package
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const paypalClient = require('./paypalClient');

// 2. Set up your server to receive a call from the client
async function handleRequest(req, res) {
  // 2a. Get the order ID from the request body
  const { orderID } = req.body;
  const { total } = req.body;
  // 3. Call PayPal to get the transaction details
  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);
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

  // 6. Save the transaction in your database
  // await database.saveTransaction(orderID);

  // 7. Return a successful response to the client
  console.log('SUCCESS');
  return res.send(200);
}

module.exports = {
  handleRequest,
};
