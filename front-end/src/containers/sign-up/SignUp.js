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
                                    // value={}
                                    // onChange={(event, {value}) => {this.props.onChangeUsername(value)}}
                                    type="text"
                                    placeholder='Username'
                                    icon='user'
                                    iconPosition='left'
                                    fluid
                                />
                                <Form.Input
                                    // value={this.props.password}
                                    // onChange={(event, {value}) => {this.props.onChangePassword(value)}}
                                    type="password"
                                    placeholder='Password'
                                    icon='lock'
                                    iconPosition='left'
                                    fluid
                                />
                                <Form.Input
                                    // value={this.props.password}
                                    // onChange={(event, {value}) => {this.props.onChangePassword(value)}}
                                    type="password"
                                    placeholder='Password confirmation'
                                    icon='repeat'
                                    iconPosition='left'
                                    fluid
                                />
                                <Button color='blue'
                                        fluid
                                        size='large'
                                    // onClick={() => {this.props.onLogin(this.props.username, this.props.password)}}
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
