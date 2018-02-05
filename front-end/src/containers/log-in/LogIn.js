import React, { Component } from 'react'
import {Button, Form, Grid, Header, Message, Segment, Dimmer, Loader} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import './log-in.css'

export default class LogIn extends Component {
    render() {
        return (
            <div className='login-form'>
                <Grid
                    textAlign='center'
                    className='main-grid'
                    verticalAlign='middle'
                >
                    <Grid.Column className='grid-column'>
                        {
                            !this.props.loggingIn && this.props.loginError &&
                            <Message
                                warning
                                icon='lock'
                                header='Login failed!'
                                content={this.props.loginError.message}
                            />
                        }
                        <Header as='h2' color='blue' textAlign='center'>
                            {' '}Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    value={this.props.username}
                                    onChange={(event, data) => {this.props.onChangeUsername(data.value)}}
                                    type="text"
                                    name="email"
                                    placeholder='Username'
                                    icon='user'
                                    iconPosition='left'
                                    fluid
                                />
                                <Form.Input
                                    value={this.props.password}
                                    onChange={(event, data) => {this.props.onChangePassword(data.value)}}
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    icon='lock'
                                    iconPosition='left'
                                    fluid
                                />
                                <Button color='blue'
                                        fluid
                                        size='large'
                                        onClick={() => {this.props.onLogin(this.props.username, this.props.password)}}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to='/sign-up'>Sign up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
                {
                    this.props.isAuthenticated &&
                    <Redirect
                        to={{
                            pathname: "/nearby-shops",
                            state: { from: this.props.location }
                        }}
                    />
                }
                <Dimmer active={this.props.loggingIn}>
                    <Loader />
                </Dimmer>
            </div>
        );
    }
}
