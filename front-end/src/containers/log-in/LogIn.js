import React, { Component } from 'react';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'

import './login.css'

export default class Login extends Component {
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
                                content='You might have misspelled your username or password!'
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
                                    placeholder='Username'
                                    icon='user'
                                    iconPosition='left'
                                    fluid
                                />
                                <Form.Input
                                    value={this.props.password}
                                    onChange={(event, data) => {this.props.onChangePassword(data.value)}}
                                    type="password"
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
                            New to us? <a href='/login'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
