const initialState = {
    newSalesOrder: {},
    loading: false,
    error: null,
};

import { CREATE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE, CREATE_SALES_ORDER_ITEM_FETCH_DATA_START, CREATE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS } from '../constants'

const createSalesOrderItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SALES_ORDER_ITEM_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case CREATE_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, newSalesOrder: action.payload };
        case CREATE_SALES_ORDER_ITEM_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default createSalesOrderItemReducer;