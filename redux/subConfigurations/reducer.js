const initialState = {
    subConfigurations: [],
    loading: false,
    error: null,
};

import { SUB_CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE, SUB_CONFIGURATION_OPTIONS_FETCH_DATA_START, SUB_CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS } from '../constants';

const subConfigurationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUB_CONFIGURATION_OPTIONS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case SUB_CONFIGURATION_OPTIONS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, subConfigurations: action.payload };
        case SUB_CONFIGURATION_OPTIONS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default subConfigurationsReducer;