import { configureStore } from '@reduxjs/toolkit';
import faqsReducer from './redux/faqs/reducer';

export const store = configureStore({
    reducer: {
        faqsReducer: faqsReducer
    },
});