import React from 'react';
import ReactDOM from "react-dom";

import Login from '../containers/log-in/LogIn';

it('Login Component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Login/>,
        div
    );
});