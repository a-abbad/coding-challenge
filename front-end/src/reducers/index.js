import {combineReducers} from 'redux';

import auth from './auth';
import shops from './shops'

export default combineReducers({
    auth,
    shops
});
