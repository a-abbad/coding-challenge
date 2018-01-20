import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'

import './not-found.css'

export default class Login extends Component {
    render() {
        return (
            <div className='not-found'>
                <Grid
                    textAlign='center'
                    className='main-grid'
                    verticalAlign='middle'
                >
                    <Grid.Column className='grid-column'>
                        <Image src='/assets/img/404.png'/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
