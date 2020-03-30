import {createStore } from 'redux';

import rootReducer from './root-reducers';

const store = createStore(rootReducer);

export default store;

