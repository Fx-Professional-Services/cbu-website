const initialState = {
    categoryItems: [],
    loading: false,
    error: null,
};

import { CATEGORY_ITEMS_FETCH_DATA_FAILURE, CATEGORY_ITEMS_FETCH_DATA_START, CATEGORY_ITEMS_FETCH_DATA_SUCCESS } from '../constants';

const categoryItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_ITEMS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case CATEGORY_ITEMS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, categoryItems: action.payload };
        case CATEGORY_ITEMS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default categoryItemsReducer;