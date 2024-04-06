const initialState = {
    faqs: [],
    loading: false,
    error: null,
};

import { FAQS_FETCH_DATA_START, FAQS_FETCH_DATA_SUCCESS, FAQS_FETCH_DATA_FAILURE } from '../constants'

const faqsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAQS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case FAQS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, faqs: action.payload };
        case FAQS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default faqsReducer;