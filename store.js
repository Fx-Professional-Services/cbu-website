import { configureStore } from '@reduxjs/toolkit';
import faqsReducer from './redux/faqs/reducer';
import ordersReducer from './redux/orders/reducer';
import invoicesReducer from './redux/invoices/reducer';

export const store = configureStore({
    reducer: {
        faqsReducer: faqsReducer,
        ordersReducer: ordersReducer,
        invoicesReducer: invoicesReducer

    },
});