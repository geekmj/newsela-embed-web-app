import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/react';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/app';
import store from './store/store';

import './assets/styles/style.sass';
import './assets/styles/style.css';

Sentry.init({
  dsn: 'https://ebe2ed01e569434abd2520b423dcb4a9@o6997.ingest.sentry.io/5305278'
});

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();