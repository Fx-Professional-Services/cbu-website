const initialState = {
    deleted: {},
    loading: false,
    error: null,
};

import { DELETE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE, DELETE_SALES_ORDER_ITEM_FETCH_DATA_START, DELETE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS } from '../constants';

const deleteSalesOrderItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_SALES_ORDER_ITEM_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case DELETE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, deleted: action.payload };
        case DELETE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default deleteSalesOrderItemReducer;