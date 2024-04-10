const initialState = {
    menu: [],
    loading: false,
    error: null,
};

import { MENU_FETCH_DATA_START, MENU_FETCH_DATA_SUCCESS, MENU_FETCH_DATA_FAILURE } from '../constants'

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case MENU_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case MENU_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, menu: action.payload };
        case MENU_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default menuReducer;