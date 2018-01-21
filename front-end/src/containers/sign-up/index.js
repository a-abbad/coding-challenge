import {connect} from 'react-redux';

import SignUp from './SignUp';

function mapStateToProps() {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // onChangeFirstName : (text) => {
        //     dispatch(changeFirstName(text))
        // },
        // onChangeLastName : (text) => {
        //     dispatch(changeLastName(text))
        // },
        // onChangeEmail : (text) => {
        //     dispatch(changeEmail(text))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)