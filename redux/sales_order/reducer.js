const initialState = {
    salesOrder: {},
    loading: false,
    error: null,
};

import { ORDER_FETCH_DATA_FAILURE, ORDER_FETCH_DATA_START, ORDER_FETCH_DATA_SUCCESS } from '../constants';

const singleSalesOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case ORDER_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, salesOrder: action.payload };
        case ORDER_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default singleSalesOrderReducer;