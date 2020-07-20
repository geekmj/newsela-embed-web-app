import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import log from 'loglevel';
import * as Sentry from '@sentry/react';
import { register } from '../../serviceWorker';
import Routes from '../../routes';
import Header from "../header/Header";
import Footer from "../footer/Footer";
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
    log.info('NODE_ENV :', process.env.NODE_ENV)

    if (process.env.NODE_ENV == 'production') {
      log.setLevel('warn')
    }

    return (
      <BrowserRouter>
        <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog={true}>
          <Header />
          <Wrapper />
          {/* <Footer /> */}
        </Sentry.ErrorBoundary>
      </BrowserRouter>
    );
  }
}

export default App;
register();
