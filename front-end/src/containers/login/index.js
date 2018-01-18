import {connect} from 'react-redux';

import Login from './Login';
import {changePassword, changeUsername, login} from '../../actions/auth';

function mapStateToProps({auth}) {
    return {
        username: auth.usernameInput,
        password: auth.passwordInput,
        loggingIn: auth.loggingIn,
        loginError: auth.loginError
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
            console.log(username, password);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)