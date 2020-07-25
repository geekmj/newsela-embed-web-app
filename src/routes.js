import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Main = lazy(() => import('./components/main'))
const NotFound = lazy(() => import('./components/notfound'))

class Routes extends Component {
    render() {
        return (<>
            <Suspense fallback={<></>}>
                <Switch>
                    <Route
                        path='/main' exact component={Main} />
                    <Route
                        path='*' component={NotFound} />
                </Switch>
            </Suspense>
        </>)
    }
}

export default Routes;
