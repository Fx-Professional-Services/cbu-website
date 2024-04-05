import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/counter/reducer';

export const store = configureStore({
    reducer: {
        counterReducer: counterReducer, // Add your slice(s) to the root reducer
        // Add more slices if you have them
    },
});