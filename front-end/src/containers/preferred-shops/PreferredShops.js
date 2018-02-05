import React, {Component} from 'react'
import { Container, Dimmer, Header, Card, Loader } from 'semantic-ui-react'
import _ from 'lodash'

import RemoveShopCard from "../../components/shop-card/RemoveShopCard";

export default class PreferredShops extends Component {
    componentWillMount() {
        this.props.onFetchLikedShops()
    }

    render () {
        return (
            <Container style={{ paddingTop: '3.5em' }}>
                <Header as='h1' textAlign={'center'}>My Preferred Shops</Header>

                <Card.Group itemsPerRow={4} doubling stackable>
                    {
                        _.map(this.props.likedShops, likedShop => <RemoveShopCard shop={likedShop.shop}/>)
                    }
                </Card.Group>
            </Container>
        )
    }
}
