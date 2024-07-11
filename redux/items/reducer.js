const initialState = {
    items: [],
    loading: false,
    error: null,
};

import { ITEMS_FETCH_DATA_FAILURE, ITEMS_FETCH_DATA_START, ITEMS_FETCH_DATA_SUCCESS } from '../constants';

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEMS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case ITEMS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, items: action.payload };
        case ITEMS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default itemsReducer;