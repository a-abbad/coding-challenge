import {connect} from 'react-redux';
import App from './App';

function mapStateToProps({auth}) {
    const isAuthenticated = true && auth.user;
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, null)(App)