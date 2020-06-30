import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

import { createLogger } from 'redux-logger';

const logger = createLogger({});
let middleware = [thunk, logger];

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
)

// const store = createStore(rootReducer, applyMiddleware(thunk))

const store = createStore(combineReducers({
    rootReducer
}), enhancer)

export default store;
