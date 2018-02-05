import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../misc/PrivateRoute';
import Header from '../../components/header/Header';
import NearbyShops from '../nearby-shops';
import PreferredShops from '../preferred-shops';
import LogIn from '../log-in';
import SignUp from '../sign-up';
import NotFound from '../misc/NotFound';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header
                        user={this.props.user}
                        isAuthenticated={this.props.isAuthenticated}
                        handleLogout={() => {this.props.handleLogout()}}
                    />
                    <Switch>
                        <PrivateRoute exact path='/' component={NearbyShops} isAuthenticated={this.props.isAuthenticated} />
                        <PrivateRoute path='/nearby-shops' component={NearbyShops} isAuthenticated={this.props.isAuthenticated} />
                        <PrivateRoute path='/preferred-shops' component={PreferredShops} isAuthenticated={this.props.isAuthenticated} />
                        <Route path='/log-in' component={LogIn} />
                        <Route path='/sign-up' component={SignUp} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
