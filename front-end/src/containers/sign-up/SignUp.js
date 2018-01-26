import React, { Component } from 'react'
import {Button, Form, Grid, Header, Segment, Dimmer, Loader} from 'semantic-ui-react'
import { Redirect } from 'react-router'

import './sign-up.css'

export default class SignUp extends Component {
    render() {
        return (
            <div className='sign-up-form'>
                <Dimmer active={false}>
                    <Loader />
                </Dimmer>
                <Grid
                    textAlign='center'
                    className='main-grid'
                    verticalAlign='middle'
                >
                    <Grid.Column className='grid-column'>
                        <Header as='h2' color='blue' textAlign='center'>
                            {' '}Create your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    value={this.props.firstName}
                                    onChange={(event, {value}) => {this.props.onChangeFirstName(value)}}
                                    type="text"
                                    placeholder='First name'
                                    icon='user'
                                    iconPosition='left'
                                    fluid
                                    name='firstName'
                                />
                                <Form.Input
                                    value={this.props.lastName}
                                    onChange={(event, {value}) => {this.props.onChangeLastName(value)}}
                                    type="text"
                                    placeholder='Last name'
                                    icon='user'
                                    iconPosition='left'
                                    fluid
                                    name='lastName'
                                />
                                <Form.Input
                                    value={this.props.email}
                                    onChange={(event, {value}) => {this.props.onChangeEmail(value)}}
                                    type="text"
                                    placeholder='E-mail'
                                    icon='at'
                                    iconPosition='left'
                                    fluid
                                    name='email'
                                />
                                <Form.Input
                                    value={this.props.signUpPassword}
                                    onChange={(event, {value}) => {this.props.onChangeSignUpPassword(value)}}
                                    type="password"
                                    placeholder='Password'
                                    icon='lock'
                                    iconPosition='left'
                                    fluid
                                />
                                <Form.Input
                                    value={this.props.signUpPasswordConfirmation}
                                    onChange={(event, {value}) => {this.props.onChangeSignUpPasswordConfirmation(value)}}
                                    type="password"
                                    placeholder='Password confirmation'
                                    icon='repeat'
                                    iconPosition='left'
                                    fluid
                                />
                                <Button
                                    color='blue'
                                    fluid
                                    size='large'
                                    onClick={() => {this.props.onSignUp(this.props.firstName, this.props.lastName, this.props.email, this.props.signUpPassword)}}
                                >
                                    Sign Up
                                </Button>
                            </Segment>
                        </Form>
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
            </div>
        );
    }
}
