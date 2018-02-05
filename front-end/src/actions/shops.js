import _ from 'lodash';

import {LIKED_USER_SHOPS, REMOVE_ITEM_USER_SHOPS, USER_LIKE_SHOP, USER_SHOPS, USER_SHOPS_CHANGE_PAGE} from "./types";
import {callApi, prepareHeader} from "../utils/api-utils";
import {REQUEST_, SUCCESS_, FAILURE_} from "../utils/utils";

function userShopsRequest() {
    return {
        type: REQUEST_(USER_SHOPS)
    };
}

function userShopsSuccess(data) {
    return {
        type: SUCCESS_(USER_SHOPS),
        shops: data.shops,
        total: data.total
    };
}

function userShopsFailure(error) {
    return {
        type: FAILURE_(USER_SHOPS),
        error
    };
}

export function userShops(activePage, pageSize) {
    return callApi(
        `/api/b2c/user-shops?activePage=${activePage}&pageSize=${pageSize}`,
        prepareHeader('GET'),
        userShopsRequest,
        userShopsSuccess,
        userShopsFailure
    );
}

export function userShopsChangePage(page) {
    return {
        type: USER_SHOPS_CHANGE_PAGE,
        page
    }
}

function likedShopsSuccess(data) {
    return {
        type: SUCCESS_(LIKED_USER_SHOPS),
        likedShops: data.likedShops
    };
}

function likedShopsFailure(error) {
    return {
        type: FAILURE_(LIKED_USER_SHOPS),
        error
    };
}

export function likedShops() {
    return callApi(
        `/api/b2c/user-liked-shops`,
        prepareHeader('GET'),
        userShopsRequest,
        likedShopsSuccess,
        likedShopsFailure
    );
}

function removeShop(index) {
    return {
        type: REMOVE_ITEM_USER_SHOPS,
        index
    }
}

export function userLikeShop(shopId) {
    return (dispatch, getState) => {
        let {shops} = getState();

        let index = _.findIndex(shops.shops, shop => shop._id === shopId);
        if(index > -1) {
            dispatch(removeShop(index))
        }

        dispatch(likeShop(shopId));
        dispatch(userShops(shops.paginationShops.current, shops.paginationShops.pageSize))
    }
}

function userLikeShopSuccess(data) {
    return {
        type: SUCCESS_(USER_LIKE_SHOP),
        likedShops: data.likedShops,
        shops: data.shops
    }
}

function userLikeShopFailure(error) {
    return {
        type: FAILURE_(USER_LIKE_SHOP),
        error
    }
}

export function likeShop(shopId) {
    let config = {
        ...prepareHeader('POST'),
        body: JSON.stringify({shopId})
    };

    return callApi(
        `/api/b2c/like-shop`,
        config,
        null,
        userLikeShopSuccess,
        userLikeShopFailure
    );
}
