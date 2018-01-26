import {connect} from 'react-redux';

import SignUp from './SignUp';
import {
    changeEmail,
    changeFirstName, changeLastName, changeSignUpPassword,
    changeSignUpPasswordConfirmation, signUp
} from "../../actions/sign-up";

function mapStateToProps({auth}) {
    return {
        signingUp: auth.signingUp,
        signUpError: auth.signUpError,
        firstName: auth.firstName ? auth.firstName : '',
        lastName: auth.lastName ? auth.lastName : '',
        email: auth.email ? auth.email : '',
        signUpPassword: auth.signUpPassword ? auth.signUpPassword : '',
        signUpPasswordConfirmation: auth.signUpPasswordConfirmation ? auth.signUpPasswordConfirmation : ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeFirstName : (text) => {
            dispatch(changeFirstName(text))
        },
        onChangeLastName : (text) => {
            dispatch(changeLastName(text))
        },
        onChangeEmail : (text) => {
            dispatch(changeEmail(text))
        },
        onChangeSignUpPassword : (text) => {
            dispatch(changeSignUpPassword(text))
        },
        onChangeSignUpPasswordConfirmation : (text) => {
            dispatch(changeSignUpPasswordConfirmation(text))
        },
        onSignUp : (firstName, lastName, email, password) => {
            dispatch(signUp({firstName, lastName, email, password}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)