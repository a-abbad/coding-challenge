import {connect} from 'react-redux';
import NearbyShops from './NearbyShops';
import {userShops, userShopsChangePage} from "../../actions/shops";

const mapStateToProps = ({shops}) => {
    return {
        shops: shops.shops,
        loading: shops.isFetching,
        totalPages: Math.round(shops.paginationShops.total/shops.paginationShops.pageSize),
        activePage: shops.paginationShops.current,
        pageSize: shops.paginationShops.pageSize
    }
};

const mapDispatchToProps = (dispatch) => ({
    onUserShops : (activePage, pageSize) => {
        dispatch(userShops(activePage, pageSize))
    },

    onPaginationChange : (activePage) => {
        dispatch(userShopsChangePage(activePage))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NearbyShops)