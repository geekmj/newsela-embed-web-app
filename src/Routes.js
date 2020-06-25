import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Demo = lazy(() => import('./Components/Demo'))
const NotFound = lazy(() => import('./Components/NotFound'))

class Routes extends Component {
    render() {
        return (<>
            <Suspense fallback={<>Loading...</>}>
                <Switch>
                    <Route
                        path='/demo' exact component={Demo} />
                    <Route
                        path='*' component={NotFound} />
                </Switch>
            </Suspense>
        </>)
    }
}

export default Routes;