import {loadUserProfile} from '../utils/api-utils';
import {FAILURE, REQUEST, SUCCESS} from '../utils/utils';
import {
    CHANGE_PASSWORD_INPUT,
    CHANGE_USERNAME_INPUT,
    LOGIN,
    LOGOUT
} from '../actions/types';

const initialState = {
    user: null,
    password: null,
    userRole: null,
    loggingIn: false,
    loggingOut: false,
    loginError: null,
    usernameInput: '',
    passwordInput: ''
};

function initializeState() {
    const userProfile = loadUserProfile();
    return Object.assign({}, initialState, userProfile);
}

export default function authReducer(state = initializeState(), action = {}) {
    switch (action.type) {
        case REQUEST(LOGIN):
            return Object.assign({}, state, { loggingIn: true });
        case SUCCESS(LOGIN):
            return Object.assign({}, state, {
                loggingIn: false,
                user: action.user,
                role: action.role,
                usernameInput: '',
                passwordInput: ''
            });
        case FAILURE(LOGIN):
            return {
                ...state,
                loggingIn: false,
                user: null,
                role: null,
                loginError: action.error
            };
        case REQUEST(LOGOUT):
            return {
                ...state,
                loggingOut: true
            };
        case SUCCESS(LOGOUT):
            return {
                ...state,
                loggingOut: false,
                user: null,
                userRole: null,
                loginError: null
            };
        case FAILURE(LOGOUT):
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error
            };
        case CHANGE_USERNAME_INPUT:
            return {
                ...state,
                usernameInput: action.usernameInput
            };
        case CHANGE_PASSWORD_INPUT:
            return {
                ...state,
                passwordInput: action.passwordInput
            };
        default:
            return state;
    }
}
