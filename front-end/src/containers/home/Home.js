import React, { Component } from 'react';
import './home.css';

export default class Home extends Component {
    componentWillMount() {
        this.props.onTest();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src='/assets/img/logo.svg' className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}
