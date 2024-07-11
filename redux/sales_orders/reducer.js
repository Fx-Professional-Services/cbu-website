const initialState = {
    salesOrders: [],
    loading: false,
    error: null,
};

import { ALL_ORDERS_FETCH_DATA_START, ALL_ORDERS_FETCH_DATA_SUCCESS, ALL_ORDERS_FETCH_DATA_FAILURE } from '../constants'

const salesOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_ORDERS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case ALL_ORDERS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, salesOrders: action.payload };
        case ALL_ORDERS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default salesOrdersReducer;