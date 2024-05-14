const initialState = {
    configurations: [],
    loading: false,
    error: null,
};

import { CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE, CONFIGURATION_OPTIONS_FETCH_DATA_START, CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS } from '../constants';

const configurationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONFIGURATION_OPTIONS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, configurations: action.payload };
        case CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default configurationsReducer;