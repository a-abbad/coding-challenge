import {CHANGE_PASSWORD_INPUT, CHANGE_USERNAME_INPUT, LOGIN, LOGOUT} from "./types";
import {callApi, ID_TOKEN, decodeUserProfile} from "../utils/api-utils";
import {removeData, setData} from '../utils/storage-utils'
import {REQUEST, SUCCESS, FAILURE} from "../utils/utils";

export function changeUsername(usernameInput) {
    return {
        type: CHANGE_USERNAME_INPUT,
        usernameInput
    }
}

export function changePassword(passwordInput) {
    return {
        type: CHANGE_PASSWORD_INPUT,
        passwordInput
    }
}

function loginRequest() {
    return {
        type: REQUEST(LOGIN)
    };
}

function loginSuccess(payload) {
    const idToken = payload[ID_TOKEN];
    setData(ID_TOKEN, idToken);
    const profile = decodeUserProfile(idToken);
    return {
        type: SUCCESS(LOGIN),
        user: profile.user
    };
}

function loginFailure(error) {
    removeData(ID_TOKEN);
    return {
        type: FAILURE(LOGIN),
        error
    };
}

export function login(email, password) {
    const config = {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    };

    return callApi(
        "/api/log-in",
        config,
        loginRequest,
        loginSuccess,
        loginFailure
    );
}

export function logout() {
    removeData(ID_TOKEN);
    return {
        type: LOGOUT
    };
}
