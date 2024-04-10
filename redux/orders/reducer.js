const initialState = {
    orders: [],
    loading: false,
    error: null,
};

import { ORDERS_FETCH_DATA_START, ORDERS_FETCH_DATA_SUCCESS, ORDERS_FETCH_DATA_FAILURE } from '../constants'

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDERS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case ORDERS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, orders: action.payload };
        case ORDERS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default ordersReducer;