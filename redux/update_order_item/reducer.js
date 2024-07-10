const initialState = {
    updatedOrder: [],
    loading: false,
    error: null,
};

import { UPDATE_ORDERS_FETCH_DATA_START, UPDATE_ORDERS_FETCH_DATA_SUCCESS, UPDATE_ORDERS_FETCH_DATA_FAILURE } from '../constants'

const updateOrderItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDERS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case UPDATE_ORDERS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, updatedOrder: action.payload };
        case UPDATE_ORDERS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default updateOrderItemReducer;