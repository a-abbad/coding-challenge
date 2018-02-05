import {callApi, decodeUserProfile, prepareHeader} from "../utils/api-utils";
import {
    CHANGE_EMAIL_SIGN_UP_INPUT,
    CHANGE_FIRST_NAME_SIGN_UP_INPUT,
    CHANGE_LAST_NAME_SIGN_UP_INPUT,
    CHANGE_PASSWORD_CONFIRMATION_SIGN_UP_INPUT,
    CHANGE_PASSWORD_SIGN_UP_INPUT,
    LOGOUT
} from "./types";
import {FAILURE_, REQUEST_, SUCCESS_} from "../utils/utils";
import {removeData, setData} from "../utils/storage-utils";
import {ID_TOKEN} from "../utils/global";

export function changeFirstName (firstName) {
    return {
        type: CHANGE_FIRST_NAME_SIGN_UP_INPUT,
        firstName
    }
}

export function changeLastName (lastName) {
    return {
        type: CHANGE_LAST_NAME_SIGN_UP_INPUT,
        lastName
    }
}

export function changeEmail (email) {
    return {
        type: CHANGE_EMAIL_SIGN_UP_INPUT,
        email
    }
}

export function changeSignUpPassword (signUpPassword) {
    return {
        type: CHANGE_PASSWORD_SIGN_UP_INPUT,
        signUpPassword
    }
}

export function changeSignUpPasswordConfirmation (signUpPasswordConfirmation) {
    return {
        type: CHANGE_PASSWORD_CONFIRMATION_SIGN_UP_INPUT,
        signUpPasswordConfirmation
    }
}

function signUpRequest() {
    return {
        type: REQUEST_(LOGOUT)
    };
}

function signUpSuccess(payload) {
    const idToken = payload[ID_TOKEN];
    setData(ID_TOKEN, idToken);
    const profile = decodeUserProfile(idToken);
    return {
        type: SUCCESS_(LOGOUT),
        user: profile.user
    };
}

function signUpFailure(error) {
    removeData(ID_TOKEN);
    return {
        type: FAILURE_(LOGOUT),
        error
    };
}

export function signUp(data) {
    const config = {
        ...prepareHeader('POST'),
        body: JSON.stringify(data)
    };

    return callApi(
        "/api/b2c/sign-up",
        config,
        signUpRequest,
        signUpSuccess,
        signUpFailure
    );
}
