import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import log from 'loglevel';
import {register} from '../../serviceWorker';
import Routes from '../../routes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends Component {
                   
  render() {
    log.info('NODE_ENV :', process.env.NODE_ENV)

    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

export default App;
register();
