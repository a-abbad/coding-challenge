import {connect} from 'react-redux';
import PreferredShops from './PreferredShops';
import {likedShops, userShops} from "../../actions/shops";

const mapStateToProps = ({shops}) => {
    return {
        loading: shops.isFetching,
        likedShops: shops.likedShops
    }
};

const mapDispatchToProps = (dispatch) => ({
    onFetchLikedShops : () => {
        dispatch(likedShops())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferredShops)