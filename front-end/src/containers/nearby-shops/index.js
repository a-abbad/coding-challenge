import {connect} from 'react-redux';
import NearbyShops from './NearbyShops';

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    console.log(ownProps)
    return {}
};

const mapDispatchToProps = (dispatch, router) => ({
    onTest : () => {
        console.log(router)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NearbyShops)