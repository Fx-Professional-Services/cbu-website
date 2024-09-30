const initialState = {
    existingSalesOrder: null,
    loading: false,
    error: null,
};

import { CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_START, CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS, CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_FAILURE } from '../constants';

const checkIfExistSalesOrderItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, existingSalesOrder: action.payload };
        case CHECK_IFEXISTS_SALES_ORDER_ITEM_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default checkIfExistSalesOrderItemReducer;