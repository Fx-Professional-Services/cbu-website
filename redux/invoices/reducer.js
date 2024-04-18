const initialState = {
    invoices: [],
    loading: false,
    error: null,
};

import { INVOICES_FETCH_DATA_START, INVOICES_FETCH_DATA_SUCCESS, INVOICES_FETCH_DATA_FAILURE } from '../constants'

const invoicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVOICES_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case INVOICES_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, invoices: action.payload };
        case INVOICES_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default invoicesReducer;