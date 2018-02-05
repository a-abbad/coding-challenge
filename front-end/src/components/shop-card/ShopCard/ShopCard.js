import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Card, Icon, Button } from 'semantic-ui-react'

class ShopCard extends Component {

    render() {
        let shop = this.props.shop;
        return (
            <Card>
                <Card.Content textAlign='center'>
                    <Card.Header>
                        {shop.name}
                    </Card.Header>
                    <Card.Meta>
                        <Image src={shop.picture} />
                    </Card.Meta>
                    <Card.Description>
                        <Icon name='marker' />
                        {shop.city}
                        <br/>
                        <Icon name='at' />
                        {shop.email}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button
                            onClick={() => {console.log('like shop by id => ' + shop._id)}}
                            basic color='green' icon>
                            <Icon name='heart' />
                            {' '}Like
                        </Button>
                        <Button
                            onClick={() => {console.log('dislike shop by id => ' + shop._id)}}
                            basic color='red' icon>
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
