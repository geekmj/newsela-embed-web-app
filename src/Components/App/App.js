import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {register} from '../../serviceWorker';
import Routes from '../../Routes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends Component {

  render() {
    console.log('NODE_ENV :', process.env.NODE_ENV)
    // console.log = function(){};

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
