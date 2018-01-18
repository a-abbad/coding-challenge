import {CHANGE_PASSWORD_INPUT, CHANGE_USERNAME_INPUT, LOGIN, LOGOUT} from "./types";
import {callApi, ID_TOKEN, decodeUserProfile} from "../utils/api-utils";
import {getData, removeData, setData} from '../utils/storage-utils'
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

function loginRequest(user) {
    return {
        type: REQUEST(LOGIN),
        user
    };
}

function loginSuccess(payload) {
    const idToken = payload[ID_TOKEN];
    setData(ID_TOKEN, idToken);
    const profile = decodeUserProfile(idToken);
    return {
        type: SUCCESS(LOGIN),
        user: profile.user,
        role: profile.role
    };
}

function loginFailure(error) {
    removeData(ID_TOKEN);
    return {
        type: FAILURE(LOGIN),
        error
    };
}

export function login(user, password) {
    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user,
            password
        })
    };

    return callApi(
        "/api/login",
        config,
        loginRequest(user),
        loginSuccess,
        loginFailure
    );
}

function logoutRequest(user) {
    removeData(ID_TOKEN);
    return {
        type: REQUEST(LOGOUT),
        user
    };
}

function logoutSuccess(payload) {
    removeData(ID_TOKEN);
    return {
        type: SUCCESS(LOGOUT),
        user: payload.user
    };
}

function logoutFailure(error) {
    return {
        type: FAILURE(LOGOUT),
        error
    };
}

export function logout(user) {
    const idToken = getData(ID_TOKEN);
    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
            user
        })
    };

    return callApi(
        "/api/logout",
        config,
        logoutRequest,
        logoutSuccess,
        logoutFailure
    );
}
