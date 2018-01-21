import {connect} from 'react-redux';

import App from './App';
import {logout} from '../../actions/auth';

const mapStateToProps = ({auth}) => {
    const isAuthenticated = true && auth.user;
    return {
        isAuthenticated,
        user: auth.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleLogout : () => {
        dispatch(logout())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)