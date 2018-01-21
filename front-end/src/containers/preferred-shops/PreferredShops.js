import React, {Component} from 'react'
import { Container, Header, Card } from 'semantic-ui-react'
import RemoveShopCard from "../../components/shop-card/RemoveShopCard";

export default class PreferredShops extends Component {
    removeShop = {
        "_id" : "5a0c6711fb3aac66aafe26d0",
        "picture" : "http://placehold.it/150x150",
        "name" : "Multiflex",
        "email" : "leilaware@multiflex.com",
        "city" : "Rabat"
    };

    render () {
        return (
            <Container style={{ marginTop: '4em' }}>
                <Header as='h1' textAlign={'center'}>My Preferred Shops</Header>

                <Card.Group itemsPerRow={4} doubling stackable>
                    <RemoveShopCard shop={this.removeShop}/>
                </Card.Group>
            </Container>
        )
    }
}
