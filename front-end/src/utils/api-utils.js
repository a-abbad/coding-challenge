import 'isomorphic-fetch';
import jwt_decode from 'jwt-decode';
import {getData, removeData} from './storage-utils';
import env from '../config/env'
import {ID_TOKEN} from "./global";

export function prepareHeader(method) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    const token = getData(ID_TOKEN);
    if(token) {
        headers.append("token", token);
    }

    return {
        method,
        headers: headers
    };
}

export function checkStatus(response) {
    if (!response.ok) {
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
        request && dispatch(request());

        return fetch(`${env.API_HOST}:${env.API_PORT}` + url, config)
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
                    let err = {};
                    err.status = response.status;
                    err.statusText = response.statusText;
                    response.text()
                        .then(text => {
                            try {
                                const json = JSON.parse(text);
                                err.message = json.message;
                                err.details = json.details;
                            } catch (ex) {
                                err.message = text;
                            }
                            dispatch(onRequestFailure(err));
                    });
                }
            });
    };
}

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
