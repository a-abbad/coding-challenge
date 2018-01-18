import 'isomorphic-fetch';
import jwt_decode from 'jwt-decode';
import {getData, removeData} from './storage-utils';

export function checkStatus(response) {
    if (!response.ok) {
        // (response.status < 200 || response.status > 300)
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;
}

export function parseJSON(response) {
    return response.json();
}

/**
 * A utility to call a restful service.
 */
export function callApi(
    url,
    config,
    request,
    onRequestSuccess,
    onRequestFailure
) {
    return dispatch => {
        dispatch(request);

        return fetch(url, config)
            .then(checkStatus)
            .then(parseJSON)
            .then(json => {
                dispatch(onRequestSuccess(json));
            })
            .catch(error => {
                const response = error.response;
                if (response === undefined) {
                    dispatch(onRequestFailure(error));
                } else {
                    error.status = response.status;
                    error.statusText = response.statusText;
                    response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            error.message = json.message;
                        } catch (ex) {
                            error.message = text;
                        }
                        dispatch(onRequestFailure(error));
                    });
                }
            });
    };
}

export const ID_TOKEN = 'id_token';

export function decodeUserProfile(idToken) {
    try {
        return jwt_decode(idToken);
    } catch (err) {
        return null;
    }
}

export function loadUserProfile() {
    try {
        const idToken = getData(ID_TOKEN);
        const userProfile = jwt_decode(idToken);
        const now = new Date().getTime() / 1000; // Date().getTime() returns milliseconds.
        // So divide by 1000 to get seconds
        if (now > userProfile['exp']) {
            // user profile has expired.
            removeData(ID_TOKEN);
            return null;
        }
        return userProfile;
    } catch (err) {
        return null;
    }
}
