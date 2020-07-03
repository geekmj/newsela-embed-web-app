import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import log from 'loglevel';
import * as Sentry from '@sentry/react';
import { register } from '../../serviceWorker';
import Routes from '../../routes';

function Wrapper() {
  return (<>
    <Routes />
  </>)
}

function FallbackComponent() {
  
  return (
    <div>An error has occured</div>
  )

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
          <Wrapper/>
        </Sentry.ErrorBoundary>
      </BrowserRouter>
    );
  }
}

export default App;
register();
