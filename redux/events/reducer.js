const initialState = {
    events: [],
    loading: false,
    error: null,
};

import { EVENTS_FETCH_DATA_START, EVENTS_FETCH_DATA_SUCCESS, EVENTS_FETCH_DATA_FAILURE } from '../constants'

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENTS_FETCH_DATA_START:
            return { ...state, loading: true, error: null };
        case EVENTS_FETCH_DATA_SUCCESS:
            return { ...state, loading: false, events: action.payload };
        case EVENTS_FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: 'Failed to fetch data' };
        default:
            return state;
    }
};

export default eventsReducer;