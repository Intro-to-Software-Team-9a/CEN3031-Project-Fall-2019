/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || 'AY7O6M0NDbBh3f6eaRpynKmm5v7KUgf6pWaKXJIr3UY0i10x5uPB9a6CmjUWlWD-jpZ8HWXJFuJq03fL';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'EARZHbTGFb5tyUMQG_Y5O6ScxbOeD13uxUqmOHYuylnekbR1Y8SQzH_un2XyIoU9TyxwR5k_BrEswuPF';

  return new checkoutNodeJssdk.core.SandboxEnvironment(
    clientId, clientSecret,
  );
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

//Taken from https://developer.paypal.com/docs/checkout/integrate/#6-verify-the-transaction
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
