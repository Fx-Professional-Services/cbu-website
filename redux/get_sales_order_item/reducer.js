const initialState = {
    salesOrderItem: {},
    loading: false,
    error: null,
};

import { GET_SALES_ORDER_ITEM_FETCH_DATA_FAILURE, GET_SALES_ORDER_ITEM_FETCH_DATA_START, GET_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS } from '../constants';

const getSalesOrderItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SALES_ORDER_ITEM_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case GET_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, salesOrderItem: action.payload };
        case GET_SALES_ORDER_ITEM_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default getSalesOrderItemReducer;