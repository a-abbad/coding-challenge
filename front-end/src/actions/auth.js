import {CHANGE_PASSWORD_INPUT, CHANGE_USERNAME_INPUT, LOGIN, LOGOUT} from "./types";
import {callApi, decodeUserProfile, prepareHeader} from "../utils/api-utils";
import {removeData, setData} from '../utils/storage-utils'
import {REQUEST_, SUCCESS_, FAILURE_} from "../utils/utils";
import {ID_TOKEN} from "../utils/global";

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
        type: REQUEST_(LOGIN)
    };
}

function loginSuccess(payload) {
    const idToken = payload[ID_TOKEN];
    setData(ID_TOKEN, idToken);
    const profile = decodeUserProfile(idToken);
    return {
        type: SUCCESS_(LOGIN),
        user: profile.user
    };
}

function loginFailure(error) {
    removeData(ID_TOKEN);
    return {
        type: FAILURE_(LOGIN),
        error
    };
}

export function login(email, password) {
    const config = {
        ...prepareHeader('POST'),
        body: JSON.stringify({
            email,
            password
        })
    };

    return callApi(
        "/api/b2c/log-in",
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
