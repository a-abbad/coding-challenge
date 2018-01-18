import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import _test from './_test';
import auth from './auth';

export default combineReducers({
    router: routerReducer,
    _test,
    auth
});
