import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './containers/app';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
