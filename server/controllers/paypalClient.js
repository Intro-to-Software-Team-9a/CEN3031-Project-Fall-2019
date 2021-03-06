/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

function environment() {
  let clientId;
  let clientSecret;
  if (process.env.NODE_ENV === 'production') {
    clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
    clientSecret = process.env.REACT_APP_PAYPAL_SECRET;
  } else {
    /* eslint-disable-next-line global-require, import/no-unresolved */
    const paypalVars = require('../config/config');
    clientId = paypalVars.paypal.clientID;
    clientSecret = paypalVars.paypal.secret;
  }

  return new checkoutNodeJssdk.core.SandboxEnvironment(
    clientId, clientSecret,
  );
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

// Taken from https://developer.paypal.com/docs/checkout/integrate/#6-verify-the-transaction
async function prettyPrint(jsonData, pre = '') {
  let pretty = '';
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  for (const key in jsonData) {
    // eslint-disable-next-line no-prototype-builtins
    if (jsonData.hasOwnProperty(key)) {
      if (isNaN(key)) {
        pretty += `${pre + capitalize(key)}: `;
      // eslint-disable-next-line radix
      } else { pretty += `${pre + (parseInt(key) + 1)}: `; }
      if (typeof jsonData[key] === 'object') {
        pretty += '\n';
        // eslint-disable-next-line no-await-in-loop
        pretty += await prettyPrint(jsonData[key], `${pre}    `);
      } else {
        pretty += `${jsonData[key]}\n`;
      }
    }
  }
  return pretty;
}

module.exports = { client, prettyPrint };
