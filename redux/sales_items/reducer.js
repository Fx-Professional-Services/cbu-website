const initialState = {
    salesItems: [],
    loading: false,
    error: null,
};

import { SALES_ITEM_FETCH_DATA_FAILURE, SALES_ITEM_FETCH_DATA_START, SALES_ITEM_FETCH_DATA_SUCCESS } from '../constants';

const salesItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SALES_ITEM_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case SALES_ITEM_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, salesItems: action.payload };
        case SALES_ITEM_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default salesItemsReducer;