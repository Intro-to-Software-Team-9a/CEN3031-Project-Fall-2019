/* eslint-disable no-console */

const express = require('./config/express.js');

// Use env port or default
const port = process.env.PORT || 5000;

express.init().then((app) => {
  app.listen(port, () => console.log(`Server now running on port ${port}!`));
});
