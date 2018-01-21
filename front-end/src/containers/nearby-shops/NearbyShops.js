import React, {Component} from 'react'
import { Container, Header, Card } from 'semantic-ui-react'
import ShopCard from '../../components/shop-card/ShopCard'

export default class NearbyShops extends Component {
    shop1 = {
        "_id" : "5a0c6711fb3aac66aafe26c4",
        "picture" : "http://placehold.it/150x150",
        "name" : "Gushkool",
        "email" : "leilaware@gushkool.com",
        "city" : "Rabat"
    };
    shop2 = {
        "_id" : "5a0c6711fb3aac66aafe26c5",
        "picture" : "http://placehold.it/150x150",
        "name" : "Datagene",
        "email" : "leilaware@datagene.com",
        "city" : "Rabat"
    };

    render () {
        return (
            <Container style={{ marginTop: '4em' }}>
                <Header as='h1' textAlign='center'>Nearby Shops</Header>

                <Card.Group itemsPerRow={4} doubling stackable>
                    <ShopCard shop={this.shop1}/>
                    <ShopCard shop={this.shop2}/>
                </Card.Group>
            </Container>
        )
    }
}
