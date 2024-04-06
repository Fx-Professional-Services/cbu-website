import { configureStore } from '@reduxjs/toolkit';
import faqsReducer from './redux/faqs/reducer';
import ordersReducer from './redux/orders/reducer';

export const store = configureStore({
    reducer: {
        faqsReducer: faqsReducer,
        ordersReducer: ordersReducer
    },
});