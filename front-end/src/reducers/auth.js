import {loadUserProfile} from '../utils/api-utils';
import {FAILURE, REQUEST, SUCCESS} from '../utils/utils';
import {
    CHANGE_EMAIL_SIGN_UP_INPUT,
    CHANGE_FIRST_NAME_SIGN_UP_INPUT, CHANGE_LAST_NAME_SIGN_UP_INPUT, CHANGE_PASSWORD_CONFIRMATION_SIGN_UP_INPUT,
    CHANGE_PASSWORD_INPUT, CHANGE_PASSWORD_SIGN_UP_INPUT,
    CHANGE_USERNAME_INPUT,
    LOGIN,
    LOGOUT, SIGN_UP
} from '../actions/types';

const initialSignUpState = {
    signingUp: false,
    signUpError: null,
    firstName: null,
    lastName: null,
    email: null,
    signUpPassword: null,
    signUpPasswordConfirmation: null,
    signUpDirtyFields: false
};

const initialLogInState = {
    loggingIn: false,
    loginError: null,
    usernameInput: null,
    passwordInput: null,
    logInDirtyFields: false
};

const initialState = {
    user: null,
    ...initialLogInState,
    ...initialSignUpState
};

function initializeState() {
    const userProfile = loadUserProfile();
    return Object.assign({}, initialState, userProfile);
}

export default function authReducer(state = initializeState(), action = {}) {
    switch (action.type) {
        case REQUEST(LOGIN):
            return { ...state, loggingIn: true };
        case SUCCESS(LOGIN):
            return {
                ...state,
                user: action.user,
                ...initialLogInState
            };
        case FAILURE(LOGIN):
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.error
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                loginError: null,
                logInDirtyFields: false
            };
        case CHANGE_USERNAME_INPUT:
            return {
                ...state,
                usernameInput: action.usernameInput,
                logInDirtyFields: true
            };
        case CHANGE_PASSWORD_INPUT:
            return {
                ...state,
                passwordInput: action.passwordInput,
                logInDirtyFields: true
            };
        case REQUEST(SIGN_UP):
            return {
                ...state,
                signingUp: true
            };
        case SUCCESS(SIGN_UP):
            return {
                ...state,
                user: action.user,
                signingUp: false,
                signUpError: null,
                signUpDirtyFields: false,
                ...initialSignUpState
            };
        case FAILURE(SIGN_UP):
            return {
                ...state,
                user: null,
                signingUp: false,
                signUpError: action.error
            };
        case CHANGE_FIRST_NAME_SIGN_UP_INPUT:
            return {
                ...state,
                firstName: action.firstName,
                signUpDirtyFields: true
            };
        case CHANGE_LAST_NAME_SIGN_UP_INPUT:
            return {
                ...state,
                lastName: action.lastName,
                signUpDirtyFields: true
            };
        case CHANGE_EMAIL_SIGN_UP_INPUT:
            return {
                ...state,
                email: action.email,
                signUpDirtyFields: true
            };
        case CHANGE_PASSWORD_SIGN_UP_INPUT:
            return {
                ...state,
                signUpPassword: action.signUpPassword,
                signUpDirtyFields: true
            };
        case CHANGE_PASSWORD_CONFIRMATION_SIGN_UP_INPUT:
            return {
                ...state,
                signUpPasswordConfirmation: action.signUpPasswordConfirmation,
                signUpDirtyFields: true
            };
        default:
            return state;
    }
}
