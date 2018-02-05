import {connect} from 'react-redux';

import ShopCard from './ShopCard'
import {userLikeShop} from "../../../actions/shops";

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    onLikeShop : (shopId) => {
        dispatch(userLikeShop(shopId))
    },

    onDislikeShop : (shopId) => {
        // dispatch(userDislikeShop(shopId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCard)