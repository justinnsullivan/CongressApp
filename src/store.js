import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import DevTools from './components/Tools/DevTools';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    // middleware.push(createLogger())
}

const store = createStore(
    reducer,
    compose(
        applyMiddleware(...middleware),
        DevTools.instrument(),
    ),
);

export default store;
