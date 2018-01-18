import React from 'react';
import ReactDOM from "react-dom";

import Login from '../containers/login/Login';

it('Login Component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Login/>,
        div
    );
});