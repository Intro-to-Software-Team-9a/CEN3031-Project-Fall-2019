import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

import App from './App.jsx';

// https://github.com/reduxjs/redux/blob/master/examples/async/src/index.js
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  ,
  document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
