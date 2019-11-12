const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const accountsRouter = require('../routes/accounts.server.routes');
const profilesRouter = require('../routes/profiles.server.routes');
const templatesRouter = require('../routes/templates.server.routes');
const documentsRouter = require('../routes/documents.server.routes');
const questionnaireRouter = require('../routes/questionnaire.server.routes');
const questionnaireResponseRouter = require('../routes/questionnaireResponse.server.routes');

/* eslint-disable-next-line no-console */
console.log(process.env.NODE_ENV);


// parse config depending on environment
let sessionSecret;
let dbUri;
if (process.env.NODE_ENV === 'production') {
  sessionSecret = process.env.SESSION_SECRET;
  dbUri = process.env.DB_URI;
} else {
  /* eslint-disable-next-line global-require */
  const config = require('./config');
  sessionSecret = config.session.secret;
  dbUri = config.db.uri;
}


module.exports.init = () => {
  /*
        connect to database
        - reference README for db uri
    */
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
  });
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  // initialize app
  const app = express();

  app.set('trust proxy', 1);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  }));

  // enable request logging for development debugging
  app.use(morgan('dev'));

  // add a router
  app.use('/api/accounts', accountsRouter);
  app.use('/api/profiles', profilesRouter);
  app.use('/api/templates', templatesRouter);
  app.use('/api/documents', documentsRouter);
  app.use('/api/questionnaire', questionnaireRouter);
  app.use('/api/questionnaireResponse', questionnaireResponseRouter);

  if (process.env.NODE_ENV === 'production') {
  // Serve any static files
    app.use(express.static(path.join(__dirname, '../../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
  }

  return app;
};
