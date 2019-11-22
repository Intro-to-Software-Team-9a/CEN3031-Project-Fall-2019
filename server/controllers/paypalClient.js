/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || 'PAYPAL-SANDBOX-CLIENT-ID';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET';

  return new checkoutNodeJssdk.core.SandboxEnvironment(
    clientId, clientSecret,
  );
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

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
