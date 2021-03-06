/**
 * @module store.js
 * @description Redux store
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;