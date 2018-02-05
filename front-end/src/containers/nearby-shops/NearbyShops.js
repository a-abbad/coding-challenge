import React, {Component} from 'react'
import { Container, Header, Card, Pagination } from 'semantic-ui-react'
import _ from 'lodash'

import ShopCard from '../../components/shop-card/ShopCard/'

export default class NearbyShops extends Component {
    componentWillMount() {
        this.props.onUserShops(this.props.activePage, this.props.pageSize)
    }

    handlePaginationChange = (e, { activePage }) => {
        this.props.onPaginationChange(activePage);
        this.props.onUserShops(activePage, this.props.pageSize);
    };

    render () {
        return (
            <Container style={{ paddingTop: '3.5em' }}>
                <Header as='h1' textAlign='center'>Nearby Shops</Header>

                <Card.Group itemsPerRow={4} doubling stackable>
                    {
                        _.map(this.props.shops, likedShop => <ShopCard shop={likedShop}/>)
                    }
                </Card.Group>

                <Pagination
                    style={{marginTop: 20, marginBottom: 20}}
                    activePage={this.props.activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={this.props.totalPages}
                />
            </Container>
        )
    }
}
