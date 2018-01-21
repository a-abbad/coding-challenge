import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Card, Icon, Button } from 'semantic-ui-react'

class ShopCard extends Component {
    shop = this.props.shop;

    render() {
        return (
            <Card>
                <Card.Content textAlign='center'>
                    <Card.Header>
                        {this.shop.name}
                    </Card.Header>
                    <Card.Meta>
                        <Image src={this.shop.picture} />
                    </Card.Meta>
                    <Card.Description>
                        <Icon name='marker' />
                        {this.shop.city}
                        <br/>
                        <Icon name='at' />
                        {this.shop.email}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green' icon>
                            <Icon name='heart' />
                            {' '}Like
                        </Button>
                        <Button basic color='red' icon>
                            <Icon name='dislike outline' />
                            {' '}Dislike
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

ShopCard.propTypes = {
    shop : PropTypes.shape({
        _id: PropTypes.string,
        picture: PropTypes.string,
        name: PropTypes.string,
        city: PropTypes.string,
        email: PropTypes.string
    }).isRequired
};

export default ShopCard;
