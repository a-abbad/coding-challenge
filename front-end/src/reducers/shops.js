import {FAILURE_, REQUEST_, SUCCESS_} from '../utils/utils';
import {
    LIKED_USER_SHOPS, REMOVE_ITEM_USER_SHOPS, USER_LIKE_SHOP, USER_SHOPS,
    USER_SHOPS_CHANGE_PAGE
} from "../actions/types";

const initialState = {
    isFetching: false,
    likedShops : [],
    shops : [],
    paginationShops : {
        current: 1,
        pageSize: 8,
        total: 0
    },
    error: null
};


export default function shopsReducer(state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_(USER_SHOPS):
            return {
                ...state,
                isFetching: true
            };
        case SUCCESS_(USER_SHOPS):
            return {
                ...state,
                isFetching: false,
                shops: action.shops,
                paginationShops: {
                    ...state.paginationShops,
                    total: action.total
                }
            };
        case FAILURE_(USER_SHOPS):
            return {
                ...state,
                isFetching: false,
                shops: [],
                paginationShops: {
                    current: 1,
                    pageSize: 8,
                    total: 0
                },
                error: action.error
            };
        case USER_SHOPS_CHANGE_PAGE:
            return {
                ...state,
                paginationShops: {
                    ...state.paginationShops,
                    current: action.page
                }
            };
        case REMOVE_ITEM_USER_SHOPS:
            return {
                ...state,
                shops: [
                    ...state.shops.slice(0, action.index),
                    ...state.shops.slice(action.index + 1)
                ],
                paginationShops: {
                    ...state.paginationShops,
                    total: state.paginationShops.total--
                }
            };
        case SUCCESS_(LIKED_USER_SHOPS):
            return {
                ...state,
                isFetching: false,
                likedShops: action.likedShops
            };
        case FAILURE_(LIKED_USER_SHOPS):
            return {
                ...state,
                isFetching: false,
                likedShops: [],
                error: action.error
            };
        case SUCCESS_(USER_LIKE_SHOP):
            return {
                ...state,
                isFetching: false,
                likedShops: action.likedShops
            };
        case FAILURE_(USER_LIKE_SHOP):
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}
