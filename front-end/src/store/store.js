import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk';

import main from '../reducers';

const loggerMiddleware = createLogger({
    predicate: (state, action) => process.env.NODE_ENV === 'development'
});

const store = createStore(
    main,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;
