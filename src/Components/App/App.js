import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {register} from '../../serviceWorker';
import Routes from '../../Routes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends Component {
  dataFunction(){
    return 10;
  }
  render() {
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
