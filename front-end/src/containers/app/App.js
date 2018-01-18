import React, { Component } from 'react';
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import Home from '../home';
import Login from '../login';
import PrivateRoute from '../misc/PrivateRoute';

const history = createHistory();

export default class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute
                        path="/profile"
                        isAuthenticated={this.props.isAuthenticated}
                        component={Home}
                    />
                </div>
            </ConnectedRouter>
        );
    }
}
