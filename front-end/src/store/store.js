import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux';

import main from '../reducers';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger({
    predicate: (state, action) => process.env.NODE_ENV === 'development'
});

const store = createStore(
    main,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        historyMiddleware
    )
);

export default store;