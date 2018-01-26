import {callApi, decodeUserProfile, ID_TOKEN} from "../utils/api-utils";
import {
    CHANGE_EMAIL_SIGN_UP_INPUT,
    CHANGE_FIRST_NAME_SIGN_UP_INPUT,
    CHANGE_LAST_NAME_SIGN_UP_INPUT,
    CHANGE_PASSWORD_CONFIRMATION_SIGN_UP_INPUT,
    CHANGE_PASSWORD_SIGN_UP_INPUT,
    LOGOUT
} from "./types";
import {FAILURE, REQUEST, SUCCESS} from "../utils/utils";
import {removeData, setData} from "../utils/storage-utils";

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
        type: REQUEST(LOGOUT)
    };
}

function signUpSuccess(payload) {
    const idToken = payload[ID_TOKEN];
    setData(ID_TOKEN, idToken);
    const profile = decodeUserProfile(idToken);
    return {
        type: SUCCESS(LOGOUT),
        user: profile.user
    };
}

function signUpFailure(error) {
    removeData(ID_TOKEN);
    return {
        type: FAILURE(LOGOUT),
        error
    };
}

export function signUp(data) {
    const config = {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return callApi(
        "/api/sign-up",
        config,
        signUpRequest,
        signUpSuccess,
        signUpFailure
    );
}
