import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { register } from '../../serviceWorker';
import Routes from '../../routes';
import Header from "../header/Header";
import ErrorFallback from '../errorFallback/ErrorFallback';

import '../../assets/styles/style.css'

function Wrapper() {
  return (<>
    <Routes />
  </>)
}

function FallbackComponent() {

  return (<ErrorFallback message="An error has accured" />)

}
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog={true}>
          <Header />
          <Wrapper />
        </Sentry.ErrorBoundary>
      </BrowserRouter>
    );
  }
}

export default App;
register();
