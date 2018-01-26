import {connect} from 'react-redux';

import Login from './LogIn';
import {changePassword, changeUsername, login} from '../../actions/auth';

function mapStateToProps({auth}) {
    const isAuthenticated = true && auth.user;
    return {
        username: auth.usernameInput ? auth.usernameInput : '',
        password: auth.passwordInput ? auth.passwordInput : '',
        loggingIn: auth.loggingIn,
        loginError: auth.loginError,
        isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername : (text) => {
            dispatch(changeUsername(text))
        },
        onChangePassword : (text) => {
            dispatch(changePassword(text))
        },
        onLogin : (username, password) => {
            dispatch(login(username, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)